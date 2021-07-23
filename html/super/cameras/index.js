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
    if (!value) {
        callback(new Error(lang['enterIp']));
        return;
    }

    var cameras = $('#cameraTable').bootstrapTable('getData');
    var id = ME.vm.form.id;
    cameras.forEach(function(camera){
        if(value == camera.mapId && id!=camera.id){
            callback(new Error(lang['enterIpNotePre']+camera.id+lang['enterIpNoteAfter']));
            return;
        }
    });
    callback();
}
function pageInit(){
    $('#cameraTable').bootstrapTable({
        url:ME.host+'/camera/listAll',
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
        pageList:[2,5, 10, 25, 50, 100, 200],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#cameratoolbar',
        onDblClickRow:function(row, $element){
            ME.vm.updateCamera();
        },
        columns:[
            {checkbox:true, pageType:'super'},
            {field: 'id',title: 'ID', width:'2%', sortable:true,searchable:true},
            {field: 'ip',title: lang['ip'],width:'6%', pageType:'project', sortable:true, searchable:true,
                formatter:function(value,row,index){
                    var html = '';
                    if(value){
                        html += '<a href="javascript:void(0);"  onclick="openVideo('+row.id+');">';
                        html += value;
                        html += '</a>';
                        return html;
                    }
                    return html;
                }
            },
            {field: 'port', title: lang['port'], width:'5%', sortable:true, searchable:true},
            {field: 'interfacePort', title: lang['interfacePort'], width:'5%', sortable:true, searchable:true},
            {field: 'username', title: lang['username'], width:'5%', sortable:true, searchable:true},
            {field: 'password', title: lang['password'], width:'5%', sortable:true, searchable:true},
            {field: 'productModel', title: lang['productModel'], width:'5%', sortable:true, searchable:true},
            {field: 'seqNum', title: lang['seqNum'], width:'5%', sortable:true, searchable:true},

            {field: 'mapId',title: lang['mapId'],width:'10%', pageType:'project', sortable:true, searchable:true},
            {field: 'x',title: lang['x'],width:'6%', sortable:true, searchable:true},
            {field: 'y',title: lang['y'],width:'6%', sortable:true, searchable:true},

            {field: 'z',title: lang['z'],width:'6%', sortable:true, searchable:true},
            {field: 'initAngleX',title: lang['initAngleX'],width:'6%', pageType:'super', sortable:true, searchable:true},
            {field: 'rotateMax',title: lang['rotateMax'],width:'6%', pageType:'super', sortable:true, searchable:true},

            {field: 'interfaceAgreement',title: lang['interfaceAgreement'],width:'6%', sortable:true, searchable:true},
            {field: 'networkAgreement',title: lang['networkAgreement'],width:'6%', sortable:true, searchable:true},
            {field: 'manu',title: lang['manu'],width:'6%', sortable:true, searchable:true},
            {field: 'sort',title: lang['sort'],width:'6%', sortable:true, searchable:true},
            {field: 'addTime',title: lang['addTime'],width:'6%', sortable:true, searchable:true,
                formatter:function(value, row, index){
                    if(value){
                        var date = new Date(value);
                        return date.toLocaleString();
                    }
                    return value;
                }
            },
            {field: 'upTime',title: lang['upTime'],width:'10%', sortable:true, searchable:true,
                formatter:function(value, row, index){
                    if(value){
                        var date = new Date(value);
                        return date.toLocaleString();
                    }
                    return value;
                }
            },
            {field: 'addUser',title: lang['addUser'],width:'6%', sortable:true, searchable:true}
        ]
    });

}


function openVideo(cameraId){
    window.open(UBIT.selfHost + '/super/camera/?cameraId='+cameraId, cameraId + Date.now(),
        // 'dialogWidth:400px;dialogHeight:300px;center:yes; top=0, left=0, toolbar=no, resizable:yes;status:yes'
        "height=600, width=800, top=60, left=300, center:true，toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no"
    );//dialogLeft:200px;dialogTop:150px;
}


function vueInit(){
    VUE_DATA = Object.assign(VUE_DATA,{
        allMaps: {},
        maps:[],
        btnDisable:false

    });

    VUE_DATA.modefiyPwdRule = {
        ip: [
            { min: 6, max: 20, message: lang['ipRule'], trigger: 'blur' },
            { validator: checks, trigger: 'blur' }
        ]
    };

    VUE_METHODS = Object.assign(VUE_METHODS,{
        changeMaps:function(value, noClear){
                this.form.mapId=value;
        },
        addCamera:function(){
            util.emptyObj(ME.vm.form);
            this.dialogFormVisible = true;
            this.form.title = lang['addInfo'];
            this.form.ip = '0.0.0.0';
            this.form.port = 5000;
            this.form.x = 0;
            this.form.y = 0;
            this.form.z = 0;
            this.form.initAngleX = 0;
            this.form.rotateMax = 120;
            this.form.interfaceAgreement = "onvif";
            this.form.networkAgreement = "RTSP";
            this.form.manu = "google";
            this.form.visual_radius = 3000;
        },

        deleteCamera:function(){
            console.log(this.maps);
            var rows = this.selectCamera();
            if(!rows) return;

            var ids = []
            rows.forEach(function(r){
                ids.push(r.id);
            });
            this.$confirm(lang['deleteCameraNote'],lang['prompt'],{ }).then(function () {
                //屏蔽按钮
                ME.vm.deleteBtnDisable = true;
                ME.vm.$http.post('camera/delete', {ids:ids}).then(function(res){
                    //屏蔽按钮
                    ME.vm.deleteBtnDisable = false;

                    var result = res.body;
                    if(result.isOk){
                        this.refresh();
                        this.$alert(lang['deleteSuccess'], lang['prompt']);
                    }else {
                        this.$alert(lang['deleteFail']+result.msg, lang['prompt'], {
                            confirmButtonText: lang['confirm']
                        });
                    }
                });
            }).catch(function (){ });

        },
    });


    ME.vm = new Vue({
        el:'#app',
        data: VUE_DATA,
        created:function(){
                this.$http.get('map/all').then(function(res){
                    this.allMaps = res.body;
                    pageInit();
                });
        },
        methods:VUE_METHODS,
    });

}
