/**
 * Created by LiuTao on 2017/7/03 0028.
 */



$(function(){
    init();
});

function init(){
    vueInit();
}

function checks (rule, value, callback) {
        if (value === '') {
          callback(new Error(lang['enterContent']));
          return;
        }

        var anchorGroups = $('#anchorGrouptable').bootstrapTable('getData');
        var id = ME.vm.form.id;
        var flag = true;
        anchorGroups.forEach(function(anchorGroup){
            if(value == anchorGroup.code && id!=anchorGroup.id){
                callback(new Error(lang['checksNotePre']+anchorGroup.cname+lang['checksNoteAfter']));
                return;
            }
        });
        if(!flag) return;
        callback();
}




function pageInit(){

    $('#anchorGrouptable').bootstrapTable({
        url:ME.host+'/super/anchorGroup/list',
        method:'get',
        queryParams:function(params){
            return params;
        },
        search:true,
        showRefresh:true,
        detailView : true,
        idField:'id',
        uniqueId:'id',
        clickToSelect:true,
        singleSelect:true,
        sortable:true,
        striped:true,
        showColumns:true,
        sortName:'id',
        sortOrder:'desc',
        pagination:true,
        pageSize:10,
        pageList:[2, 10, 25, 50, 100, 200],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#anchorGrouptoolbar',
        onDblClickRow:function(row, $element){
            ME.vm.anchorGroupUpdate();
        },
        detailFormatter : function(index,row){
          var html = detailGrid(row);
          return html;
        },

    columns: [
        {radio:true},
        {field: 'id',title: 'ID', width:'5%', sortable:true, searchable:true},
        {field: 'code', title: lang['code'], width:'15%', sortable:true, searchable:true},
        {field: 'projectId',title: lang['projectId'],width:'15%', sortable:true, searchable:true,
                formatter:function(value, row, index){
                if(value && row.project){
                    return row.project.cname+"("+row.project.code+")";
                }
                return '';
            },
        },
        {field: 'mapId',title: lang['mapId'],width:'15%', sortable:true, searchable:true,
            formatter:function(value,row,index){
                if(!value){
                    return;
                }
                var maps = ME.vm.allMaps[row.projectId];
                if(!maps) return;
                for(var i=0;i<maps.length;i++){
                    if(value==maps[i].id){
                        return maps[i].cname;
                    }
                }
                return '';
            }
        },
        {
            field: 'zoneId', title: lang['zoneId'], width: '10%', sortable: true, searchable: true,
            formatter: function (value, row, index) {
                if (value&&row.zone) {
                    return row.zone.cname+'('+row.zone.id+')';
                }
                return '';
            }
        },

        // {field: 'showType',title: lang['showType'],width:'10%', sortable:true, searchable:true,
        //     formatter:function(value, row, index){
        //             if(value=='0D'){
        //                 return '0D';
        //             }
        //             if(value=='1D'){
        //                 return '1D';
        //             }
        //             if(value=='2D'){
        //                 return '2D';
        //             }
        //             if(value=='2.5D'){
        //                 return '2.5D';
        //             }
        //             if(value=='3D'){
        //                 return '3D';
        //             }
        //             return '未知';
        //     }
        // },
        {field: 'algorithm',title: lang['algorithm'],width:'10%', sortable:true, searchable:true},
        // {field: 'serverIp',title: lang['serverIp'],width:'10%', sortable:true, searchable:true},
        // {field: 'memo',title: lang['memo'],width:'15%', sortable:true, searchable:true},
        {field: 'upTime',title: lang['upTime'],width:'10%', sortable:true, searchable:true},

        {field: 'addTime',title:lang['addTime'],width:'10%', sortable:true, searchable:true},
        {field: 'addUser',title: lang['addUser'],width:'10%', sortable:true, searchable:true},
        {field: 'upUser',title: lang['upUser'],width:'6%', sortable:true, searchable:true},
    ]

});

}



function detailGrid(row){
    if(!row.anchors){
        return getAnchors(row);//同步
    }
    return detailGridHtml(row, row.anchors);
}


function getAnchors(row){
  var html = '';
    $.ajax({
        url:ME.host+'/super/anchorGroupDetail/list?groupId='+row.id,
        method:'get',
        dataType:'json',
        async:false,
        success:function(res){
            row.anchors = res;
            html = detailGridHtml(row, row.anchors);
        }
    });
    return html;
}


function detailGridHtml(row, anchors){
   //div 嵌入
   var html = '';
   html += '<div>';
   html += '<button type="button" class="btn btn-info" onclick="anchorAdd('+row.id+','+row.mapId+')">' + lang['setAnchorGroup'] + '</button>'
   html += '<table  class="detailGridHtml" >';

    html += '<tr>';
       html += '<th>ID';
       html += '</th>';
       html += '<th>' + lang['code'];
       html += '</th>';
       html += '<th>' + lang['macAddress'];
       html += '</th>';
       html += '<th>' + lang['projectId'];
       html += '</th>';
       html += '<th>' + lang['mapId'];
       html += '</th>';
       html += '<th>' + lang['isMaster'];
       html += '</th>';
       html += '<th>' + lang['algorithm'];
       html += '</th>';
       html += '<th>' + lang['status'];
       html += '</th>';
       html += '<th>' + lang['netType'];
       html += '</th>';
    html += '</tr>';

   anchors.forEach(function(anchor){

       html += '<tr>';
         html += '<th>';
         html += anchor.id;
         html += '</th>';
         html += '<th>';
         html += anchor.code;
         html += '</th>';
         html += '<th>';
         html += anchor.mac;
         html += '</th>';
         html += '<th>';
         html += anchor.project? anchor.project.cname : '';
         html += '</th>';
         html += '<th>';
         html += anchor.mapId;
         html += '</th>';
         html += '<th>';
         html += (anchor.isMaster>0?lang['true']:lang['false']);
         html += '</th>';
       html += '<th>';
       html += anchor.algorithm;
       html += '</th>';
         html += '<th>';
         
         var value =  anchor.status;
       if(value=='online'){
           html += '<font style="color:green;">'+lang['online']+'</font>';
       }else if(value=='offline'){
           html += '<font style="color:red;">'+ lang['offline'] +'</font>';
       }else if(value=='disable'){
           html += '<font style="color:gray;">'+ lang['disable'] +'</font>';
       }else {
           html += lang['unknown'];
       }


         html += '</th>';
         html += '<th>';
         html += anchor.netType;
         html += '</th>';
       html += '</tr>';

   })



   html += '</table>';
   html += '</div>';


   
   return html;
}

function getGroupById(groupId){
    var groups = $('#anchorGrouptable').bootstrapTable('getData');
    for(var i=0;i<groups.length;i++){
      var g = groups[i];
      if(g.id==groupId){
          g.index = i;
          return g ;
      }
    }
    return false;
}

function anchorAdd(groupId,mapId){
//   alert(mapId);
  ME.vm.anchorList.groupId = groupId;
  var group = getGroupById(groupId);
  ME.vm.loadAnchorsByProjectId(group,mapId);
}



function vueInit(){

    var VUE_DATA = Object.assign(getCfgData(GROUP_CONF),{

        projects : [],
        maps:[],
        zones:[],
        allMaps:{},
        algs : UBIT.algorithms,// ['TDOA_2D_V10','TDOA_1D_V10','TOF_2D_V10'],
        showType : [
            {
                code : "0D",
                cname : "0D"
            },
            {
                code : "1D",
                cname : "1D"
            },
            {
                code : "2D",
                cname : "2D"
            },
            {
                code : "2.5D",
                cname : "2.5D"
            },
            {
                code : "3D",
                cname : "3D"
            }
        ],
        dialogFormVisible:false,
        anchorGroupDeleteBtnDisable:false,
        anchorGroupBtnDisable : false,
        anchorList:{
            title:lang['setAnchorGroup'],
            transfer:false,
            anchors:[],
            data: [],
            groupId:0,
        },
        form: {
            title : lang['addAnchorGroup'],
            code: '',
            id: '',
            projectId : 0,
            mapId : '',
            zoneId: '',
            showType : '2D',
            algorithm:'',
            serverIp:'',
            memo:'',
        },
        modefiyPwdRule: {
            code: [
                { required: true, message: lang['modefiyPwdRuleCode'], trigger: 'blur' },
                { min: 1, max: 25, message: lang['modefiyPwdRuleCodeLength'], trigger: 'blur' },
            ],
            projectId : [
                { required: true, message: lang['modefiyPwdRuleProjectId'], trigger: 'change' },
            ]
        },
        formLabelWidth: '120px',
    });

    var VUE_METHODS = Object.assign(CONF_VUE_METHODS,{
        selectRows:function(){
            var a = $('#anchorGrouptable').bootstrapTable('getSelections');
            if (!a || a.length<1){
                this.$alert(lang['selectOne'], lang['prompt'], {
                    confirmButtonText: lang['confirm']
                });
                return false;
            }
            return a;
        },
        changeMaps:function(value,noClear){
            if(!noClear) this.form.mapId = '';
            if(this.allMaps[value]) {
                this.maps = this.allMaps[value];
            }else {
                this.maps = [];
            }
        },
        getFences: function (value, noClear) {
            if(!noClear) this.form.zoneId = '';
            if (this.form.projectId === 0) return;
            var project = this.projects.filter(p => p.id == this.form.projectId);
            if (project.length < 1) return;
            this.$http.get('specialZone/list', {
                params: {
                    projectCode: project[0].code,
                    mapId: value
                }
            }).then(function (res) {
                this.zones = res.body;
                this.zones.unshift({id: 0, cname: "无"});

            });
        },
        loadAnchorsByProjectId:function(group,mapId){
            if(!group.projectId) return;
            this.$http.get('super/anchorGroup/loadAnchorsByProjectId?projectId='+group.projectId+'&mapId='+mapId).then(function(res){
                var data = [];
                for (var i = 0; i < res.body.length; i++) {
                    var a = res.body[i];
                    data.push({
                        key: a.id,
                        label: a.code,
                        disabled: false
                    });
                }
                this.anchorList.data = data;

                if(group.anchors){
                    var data = [];
                    for (var i = 0; i < group.anchors.length; i++) {
                        var a = group.anchors[i];
                        data.push(a.anchorId);
                    }
                    ME.vm.anchorList.anchors = data;
                }

                this.anchorList.transfer = true;
            });
        },
        submitAnchorList:function() {

            this.$http.post('super/anchorGroup/configAnchorGroup',
                {groupId:this.anchorList.groupId, anchorIds: this.anchorList.anchors}).then(function(res){

                var result = res.body;
                if(result.isOk){
                    this.draw(this.anchorList.groupId);
                    this.anchorList.transfer = false;
                    this.$alert(lang['setSuccess'], lang['prompt']);
                }else {
                    this.$alert(lang['setFail']+result.msg, lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                }
            });

        },
        draw : function(groupId){
            var row = getGroupById(groupId);
            row.anchors= null;
            $('#anchorGrouptable').bootstrapTable('collapseAllRows');
            $('#anchorGrouptable').bootstrapTable('expandRow', row.index);
        },
        refresh:function(){
            $('#anchorGrouptable').bootstrapTable('refresh');
        },
        anchorGroupAdd:function(){
            util.emptyObj(ME.vm.form);
            this.dialogFormVisible = true;
            this.form.title = lang['addInfo'];
        },
        anchorGroupUpdate:function(){
            var rows = this.selectRows();
            if(!rows) return;
            if(rows.length>1){
                this.$alert(lang['onlySelectOne'], lang['prompt'], {
                    confirmButtonText: lang['confirm']
                });
                return false;
            }

            this.dialogFormVisible = true;
            this.form.title = lang['modifyInfo'];
            util.deepCopy(rows[0],ME.vm.form,1);
            if(this.changeMaps) this.changeMaps(ME.vm.form.projectId, true);
            if(this.getFences) this.getFences(ME.vm.form.mapId, true)
        },
        anchorGroupDelete:function(){
            var rows = this.selectRows();
            if(!rows) return;

            var ids = []
            rows.forEach(function(r){
                ids.push(r.id);
            });

            this.$confirm(lang['anchorGroupDeleteNote'],lang['prompt'],{ }).then(function() {

                ME.vm.$http.post('super/anchorGroup/delete', {ids:ids}).then(function(res){

                    var result = res.body;
                    if(result.isOk){
                        this.refresh();
                        this.$alert(lang['deleteSuccess'], lang['prompt']);
                    }else {
                        this.$alert(lang['deleteFail']+result.msg, lang['prompt'], {
                            confirmButtonText: lang['confirm']
                        });
                    }
                    ME.vm.anchorGroupDeleteBtnDisable = false;

                });
                ME.vm.anchorGroupDeleteBtnDisable = true;

            }).catch(function(f) {
                    console.log(f);
                }
            );

        },
        submitForm:function (formName) {
            this.$refs[formName].validate(function(valid){
                if (valid) {
                    var url = 'super/anchorGroup/';
                    url+= (ME.vm.form.id>0?'update':'add');
                    var msg = (ME.vm.form.id>0?lang['update']:lang['add']);

                    ME.vm.anchorGroupBtnDisable = true;

                    ME.vm.$http.post(url, ME.vm.form).then(function(res){

                        ME.vm.anchorGroupBtnDisable = false;

                        var result = res.body;
                        if(result.isOk){
                            this.refresh();
                            this.dialogFormVisible = false;
                            this.$alert(msg+lang['success'], lang['prompt']);
                        }else {
                            this.$alert(msg+lang['fail']+result.msg, lang['prompt'], {
                                confirmButtonText: lang['confirm']
                            });
                        }
                    });
                } else {
                    ME.vm.$alert(lang['enterError'], lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                    return false;
                }
            })
        },


    });

    ME.vm = new Vue({
        el:'#app',
        data: VUE_DATA,
        created:function(){
            this.$http.get('project/listActive').then(function(res){
                this.projects = res.body;
                this.$http.get('map/all').then(function(res){
                    this.allMaps = res.body;
                    pageInit();
                });
            });
        },
        methods:VUE_METHODS,
    });

}
