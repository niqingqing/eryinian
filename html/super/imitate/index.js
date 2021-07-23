/**
 * Created by xuanyu on 2017/7/03 0028.
 */



$(function(){
    init();
});

function init(){
    vueInit();
}

function checkHas (rule, value, callback) {
    if(ME.vm.form.msgType!='coord'){
        callback();
        return
    }
    if (value === '') {
          callback(new Error(lang['selectMap']));
          return;
        }
    var imitates = $('#imitate').bootstrapTable('getData');
        var id = ME.vm.form.id;
        var flag = true;
        // 同一项目地图只允许模拟一条定位数据
        var map=ME.vm.form.projectCode+'_'+value;
    imitates.forEach(function(imitate){
            if(map == imitate.map && id!=imitate.id){
                callback(new Error(lang['checkHasNote']));
                return;
            }
        });
        if(!flag) return;
        callback();
}
function pageInit(){
    var Vue = window.Vue;
    $('#imitate').bootstrapTable({
        url:ME.host+'/super/imitate/list',
        method:'get',
        queryParams:function(params){
            return params;
        },
        search:true,
        showRefresh:true,
        idField:'id',
        uniqueId:'id',
        clickToSelect:true,
        singleSelect:false,
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
        toolbar:'#imitatetoolbar',
        onDblClickRow:function(row, $element){
            ME.vm.imitateUpdate();
        },

    columns: [
        {checkbox:true ,width:'2%'},
        {field: 'id',title: 'ID', width:'2%', sortable:true,  searchable:true},
        {field: 'map', title: lang['map'], width:'5%', sortable:true, searchable:true,
            formatter: function (value, row, index) {
                if(value){
                    var html = '<a href="javascript:void(0);" onclick=" UBIT.openMapBySuper(\''+value+'\');" >'+value+'</a>';
                    return '<div>'+html+'</div>';
                }
                return value;
            }
        },
        {field: 'msgType', title: lang['msgType'], width:'5%', sortable:true, searchable:true},
        {field: 'isStarted', title: lang['isStarted'], width:'5%', sortable:true, searchable:true,
        formatter: function (value, row, index) {
            if (value) {
                return `<span style="color:green;">${lang["isStartedStart"]}</span>`;
            }
            return `<span style="color:gray;">${lang['isStartedStop']}</span>`;
            }
        },
        {field: 'anchor',title: lang['anchor'],width:'6%', sortable:true, searchable:true},
        {field: 'tag',title: lang['tag'],width:'6%', sortable:true, searchable:true},

        {field: 'coord_tagNum',title: '标签数量',width:'6%', sortable:true, searchable:true},
        {field: 'coord_xStart',title: lang['coord_xStart'],width:'6%', sortable:true, searchable:true},
        {field: 'coord_yStart',title: lang['coord_yStart'],width:'6%', sortable:true, searchable:true},
        {field: 'coord_xEnd',title: lang['coord_xEnd'],width:'6%', sortable:true, searchable:true},
        {field: 'coord_yEnd',title: lang['coord_yEnd'],width:'6%', sortable:true, searchable:true},
        {field: 'coord_xStep',title: lang['coord_xStep'],width:'6%', sortable:true, searchable:true},
        {field: 'coord_yStep',title: lang['coord_yStep'],width:'6%', sortable:true, searchable:true},
        {field: 'coord_interval',title: lang['coord_interval'],width:'6%', sortable:true, searchable:true},

        {field: 'sos_type',title: lang['sos_type'],width:'6%', sortable:true, searchable:true},
        {field: 'power_power',title: lang['power'],width:'6%', sortable:true, searchable:true},
        {field: 'addTime',title: lang['addTime'],width:'10%', sortable:true,searchable:true,
            formatter: function (value, row, index) {
                if (value) {
                    var date = new Date(value);
                    return date.toLocaleString();
                }
                return value;
            }
        },
        {field: 'upTime',title: lang['upTime'],width:'6%', sortable:true, searchable:true},
        {field: 'upUser',title: lang['upUser'],width:'6%', sortable:true, searchable:true},
        // {field: 'addUser',title: '添加人',width:'10%', sortable:true, searchable:true},
        // {field: 'upTime',title: '更新时间',width:'10%', sodrtable:true, searchable:true,
        //     formatter: function (value, row, index) {
        //         if (value) {
        //             var date = new Date(value);
        //             return date.toLocaleString();
        //         }
        //         return value;
        //     }
        // }
    ]

});

}

function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            msgTypes:[
                {code:'coord',name:lang['定位']},
                {code:'power',name:lang['power']},
                // {code:'fenceAlert',name:'围栏报警'},
                // {code:'passthrough',name:'用户透传'},
                {code:'sos',name:'SOS'},
                {code:'distanceAlert',name:lang['distanceAlert']},
                {code:'lifeStatus',name:lang['lifeStatus']},
                {code:'forceRemove',name:lang['forceRemove']},
            ],
            sos_types:[1,2],
            projects : [],
            maps:{},   //获取过的项目下地图
            projMaps:[], //当前项目下地图
            imitateBtnDisable:false,
            imitateDeleteBtnDisable:false,
            dialogFormVisible:false,
            disable:false,
            form: {
              action: '',
              title : lang['formTitle'],
              id: '',
              msgType:'coord',
              projectId:'',
              projectCode:'',
              mapId:'',
              anchor:'',
              tag:'',
              coord_interval:200,
              power_power:'',
              passthrough_data:'',
              fenceAlert_fenceId:'',
              sos_type:1,
              coord_tagNum:'',
              coord_xStart:'',
              coord_yStart:'',
              coord_xEnd:'',
              coord_yEnd:'',
              coord_xStep:'',
              coord_yStep:'',
            },
            formLabelWidth: '120px',
        },
        created:function(){
            this.$http.get(ME.host+'/project/list').then(function(res){
                this.projects = res.body;
                    pageInit();
                });
            },
        methods:{
            getProjDatas:function(){
                if(!this.form.projectCode){return}
                if(!this.maps.hasOwnProperty(this.form.projectCode)){
                //    获取项目下所有地图
                    this.$http.get('map/list?projectCode='+this.form.projectCode).then(function(res){
                        this.maps[this.form.projectCode]=res.body;
                        this.projMaps=res.body;
                    });
                }else{
                    this.projMaps=this.maps[this.form.projectCode];
                }
            },
            getFenceAbout:function(){
                if(!this.form.msgType||!this.form.projectCode||this.form.msgType!='fenceAlert') return;
                // 获取项目下围栏和触发类型
                this.$http.get('/model/list?model='+this.form.projectCode+'_db.fence').then(function(res){
                    this.projFences=res.body;
                });

            },
            selectimitate:function(){
                var a = $('#imitate').bootstrapTable('getSelections');
                if (!a || a.length<1){
                    this.$alert(lang['selectOne'], lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                    return false;
                }
                return a;
            },
            refresh:function(){
                $('#imitate').bootstrapTable('refresh');
            },
            imitateAdd:function(){
                UBIT.emptyObj(ME.vm.form);
                this.dialogFormVisible = true;
                this.disable = false;
                this.form.title = lang['addTitle'];
                this.form.action = "add";
                this.form.anchor = '90000122';
                this.form.tag = '00000111';
            },
            imitateAction:function(action){
                if(!action){return}
                var rows = this.selectimitate();
                var msg='';
                var url='super/imitate/imitateAction';
                switch(action){
                    case 'start': msg=lang['isStartedStart'];break;
                    case 'stop':  msg=lang['isStartedStop'];break;
                }
                if(!rows) {
                    // this.$alert('至少需要选择一条数据'+msg+'！', lang['prompt'], {
                    //     confirmButtonText: lang['confirm']
                    // });

                    this.$message({
                        showClose: true,
                        message: lang['onlySelectOne']+msg+'！',
                        type: 'warning'
                    });

                    return false;
                };
                var ids = []
                rows.forEach(function(r){
                    ids.push(r.id);
                });
                var params={
                    action:action,
                    ids:ids
                }
                //请求后端执行操作
                ME.vm.$http.post(url, params).then(function(res){
                    var result = res.body;
                    if(result.isOk){
                        // this.$alert(msg+"成功！", lang['prompt']);
                        ME.vm.refresh();
                        this.$message({
                            showClose: true,
                            message: msg+lang['success'],
                            type: 'success'
                        });
                      
                    }else {
                        this.$alert(msg+lang['fail']+result.msg, lang['prompt'], {
                            confirmButtonText: lang['confirm']
                        });
                    }
                    ME.vm.imitateBtnDisable = false;
                });
            },
            imitateUpdate:function(){
                var rows = this.selectimitate();
                if(!rows) return;
                if(rows.length>1){
                    //  this.$alert('只能选择一行记录进行修改！', lang['prompt'], {
                    //     confirmButtonText: lang['confirm']
                    // });
                    this.$message({
                        showClose: true,
                        message: lang['imitateUpdateNote'],
                        type: 'warning'
                    });
                    return false;
                }

                this.dialogFormVisible = true;
                this.disable = true;
                this.form.title = lang['imitateUpdateTitle'];
                UBIT.deepCopy(rows[0],ME.vm.form,1);
                var projMap=rows[0].map;
                this.form.projectCode=projMap.split('_')[0];
                this.form.mapId=projMap.split('_')[1];
                this.getProjDatas();
                this.form.action = 'update';
            },
            imitateDelete:function(){
                var rows = this.selectimitate();
                if(!rows) return;
                //只有非启动状态才允许删除 
                var ids = []
                var isHaveStarted=false;
                for(var i=0;i<rows.length;i++){
                    var row=rows[i];
                    if(row.isStarted){
                        isHaveStarted=true;
                        break;
                    }
                    ids.push(row.id);

                }
                if(isHaveStarted){
                    this.$message.error({
                        showClose: true,
                        message: lang['imitateDeleteNote'],
                    });
                    return false;
                }
                this.$confirm(lang['imitateDeleteNote2'],lang['prompt'],{ }).then(function()  {

                    ME.vm.$http.post('super/imitate/delete', {ids:ids}).then(function(res){
                    var result = res.body;
                    if(result.isOk){
                        this.refresh();
                        this.$message({
                            showClose: true,
                            message: lang['deleteSuccess'],
                            type: 'success'
                        });

                    }else {
                        this.$alert(lang['deleteFail']+result.msg, lang['prompt'], {
                            confirmButtonText: lang['confirm']
                        });
                    }
                        ME.vm.imitateDeleteBtnDisable = false;
                });
                    ME.vm.imitateDeleteBtnDisable = true;
            }).catch(function(){

                });

            },
            submitForm:function (formName) {
                var formModel = ME.vm.$refs[formName];

                this.$refs[formName].validate(function(valid){
                    if (valid) {
                      var url = 'super/imitate/';
                      var msg= '';
                      var type=ME.vm.form.action;
                      switch(type){
                          case 'add' :url+='add';
                          msg+=lang['formTitle'];break;
                          case 'update': url+='update';
                          msg+=lang['imitateUpdateTitle'];break;
                      }
                      var params = UBIT.deepCopy(ME.vm.form);

                      delete params.action;
                      delete params.title;
                        ME.vm.$http.post(url, params).then(function(res){
                          var result = res.body;
                          if(result.isOk){
                              this.refresh();
                              this.dialogFormVisible = false;
                              // this.$alert(msg+"成功！", lang['prompt']);
                              this.$message({
                                  showClose: true,
                                  message: msg+lang['success'],
                                  type: 'success'
                              });

                          }else {
                              this.$alert(msg+lang['fail']+result.msg, lang['prompt'], {
                                  confirmButtonText: lang['confirm']
                              });
                          }
                          ME.vm.tagBtnDisable = false;
                      });
                      ME.vm.tagBtnDisable = true;
                  } else {
                    ME.vm.$alert(lang['enterError'], lang['prompt'], {
                      confirmButtonText: lang['confirm']
                    }); 
                    return false;
                  }
                })
              },
        },
    });

}
