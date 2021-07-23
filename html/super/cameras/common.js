/**
 * Created by zwt on 2017/9/9 0009.
 */
/*
 常量
 */
var VUE_DATA = {
    dialogFormVisible:false,
    deleteBtnDisable:false,
    user: ME.user,
    form: {
        title : lang['addCamera'],
        ip: '',
        port: '',
        interfacePort:'',
        username:'',
        password:'',
        productModel:'',
        seqNum:'',
        mapId: '',
        x: '',
        y: '',
        z: '',
        initAngleX:'',
        rotateMax:'',
        interfaceAgreement:'',
        networkAgreement: '',
        manu : '',
        // visual_radius : '',
        sort : ''
    },
    modefiyPwdRule: {
        ip: [
            { required: true, message: lang['ipRule'], trigger: 'blur' },
        ],
        mapId: [
            { required: true, message: lang['mapRule'], trigger: 'blur' },
        ]
    },
    formLabelWidth: '120px',

}


var VUE_METHODS = {
    selectCamera:function(){
        var a = $('#cameraTable').bootstrapTable('getSelections');
        if (!a || a.length<1){
            this.$alert(lang['selectOne'], lang['prompt'], {
                confirmButtonText: lang['confirm']
            });
            return false;
        }
        return a;
    },
    refresh:function(){
        return refreshTable('cameraTable');
    },
    updateCamera:function(){
        var rows = this.selectCamera();
        if(!rows) return;
        if(rows.length>1){
            this.$alert(lang['onlySelectOne'], lang['prompt'], {
                confirmButtonText: lang['confirm']
            });
            return false;
        }

        this.dialogFormVisible = true;
        this.form.title = lang['modifyInfo'];

        this.form.id = 0;

        util.deepCopy(rows[0],ME.vm.form,1);
    },

    submitForm:function (formName,actionType) {
        var msg = (ME.vm.form.id>0?lang['update']:lang['add']);
        var url = 'camera/save';
        var form = ME.vm.form;
        this.$confirm(lang['submitFormNotePre']+msg+lang['submitFormNoteAfter'],lang['prompt'],{ }).then( function(){
            ME.vm.$refs[formName].validate(function(valid){
                    if (valid) {

                        ME.vm.btnDisable = true;
                        var params = UBIT.deepCopy(ME.vm.form);
                        delete params.action;
                        delete params.title;
                        //设置默认值
                        if(!(params.x)) params.x=0;
                        if(!(params.y)) params.y=0;
                        if(!(params.z)) params.z=0;
                        if(!(params.port)) params.port=5000;
                        if(!(params.interfaceAgreement)) params.interfaceAgreement='onvif';
                        if(!(params.networkAgreement)) params.networkAgreement='RTSP';
                        if(!(params.initAngleX)) params.initAngleX=0;
                        if(!(params.rotateMax)) params.rotateMax=0;
                        if(!(params.visual_radius)) params.visual_radius=3000;

                        ME.vm.$http.post(url, params).then(function(res){
                            ME.vm.btnDisable = false;
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

        }).catch( function(){

        });
    }
    };


//function getTableColumns(pageType){
//    var tableColumns = [];
//    for(var i=0;i<TABLE_COLUMNS.length;i++){
//        var item = TABLE_COLUMNS[i];
//        if(!item.pageType){
//            tableColumns.push(item);
//        }else if(item.pageType == pageType){
//            tableColumns.push(item);
//        }
//    }
//    return tableColumns;
//}

//function selectOne(tableId,vm){
//    var a = $('#'+tableId).bootstrapTable('getSelections');
//    if (!a || a.length<1){
//        vm.$alert('请选择一行记录！', lang['prompt'], {
//            confirmButtonText: lang['confirm']
//        });
//        return false;
//    }
//    return a;
//}

function refreshTable(tableId){
    $('#'+tableId).bootstrapTable('refresh');
}



