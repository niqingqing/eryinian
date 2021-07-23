/**
 * Created by LiuTao on 2017/7/03 0028.
 */



$(function(){
    init();
});

function init(){
    vueInit();
    pageInit();
}

function checks (rule, value, callback) {
        if (value === '') {
          callback(new Error(lang['enterContent']));
          return;
        }

        var maps = $('#maptable').bootstrapTable('getData');
        var id = ME.vm.form.id;
        var flag = true;
        maps.forEach(function(map){
            if(value == map.cname && id!=map.id){
                callback(new Error(lang['checksNotePre']+map.cname+lang['checksNoteAfter']));
                return;
            }
        });
        if(!flag) return;
        callback();
}




function pageInit(){

    $('#maptable').bootstrapTable({
        url:ME.host+'/super/map/list',
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
        pageList:[5, 10, 25, 50, 100, 200],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#maptoolbar',
        onDblClickRow:function(row, $element){
            ME.vm.mapUpdate();
        },

    columns: [
        {checkbox:true},
        {field: 'id',title: 'ID', width:'8%', sortable:true, searchable:true},
        {field: 'cname',title: lang['cname'],width:'20%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value){
                    var html = '<a href="javascript:void(0);" onclick=" UBIT.openMap('+row.id+');" >'+value+'</a>';
                    return '<div>'+html+'</div>';
                }
                return value;
            },
        },
        {field: 'sort',title: lang['sort'],width:'10%', sortable:true, searchable:true},
        {field: 'isActive',title: lang['isActive'],width:'6%', sortable:true, searchable:true, 
            formatter:function(value, row, index){
                    return value>0?lang['true']:lang['false'];
            },
        },
        {field: 'filePath',title: lang['filePath'],width:'25%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value){
                    var html = '<a href="'+(ME.imgHost+"maps_"+ value) +'" target="_blank" >'+value+'</a>';
                    return '<div>'+html+'</div>';
                }
                return value;
            },
        },

        {field: 'pixelWidth',title: lang['pixelWidth'],width:'20%', sortable:true, searchable:true},
        {field: 'pixelLength',title: lang['pixelLength'],width:'20%', sortable:true, searchable:true},
        {field: 'realWidth',title: lang['realWidth'],width:'20%', sortable:true, searchable:true,formatter:function(value){return (value/100).toFixed(2)}},
        {field: 'realLength',title: lang['realLength'],width:'20%', sortable:true, searchable:true,formatter:function(value){return (value/100).toFixed(2)}},
        {field: 'northAngle',title: lang['northAngle'],width:'20%', sortable:true,visible:true, searchable:true},
        {field: 'longitude',title: '原点经度',width:'20%', sortable:true,visible:true, searchable:true},
        {field: 'latitude',title: '原点纬度',width:'20%', sortable:true,visible:true, searchable:true},

        {field: 'cfgMap',title: lang['cfgMap'],width:'20%', sortable:true,visible:false, searchable:true},

        {field: 'addTime',title: lang['addTime'],width:'22%', sortable:true, searchable:true},
        {field: 'addUser',title: lang['addUser'],width:'11%', sortable:true, searchable:true},
        {field: 'upTime',title: lang['upTime'],width:'6%', sortable:true, searchable:true},
        {field: 'upUser',title: lang['upUser'],width:'6%', sortable:true, searchable:true},
    ]

});

}

function vueInit(){

    var VUE_DATA = Object.assign(getCfgData(MAP_CONF),{
        dialogFormVisible:false,
        mapBtnDisable:false,
        mapDeleteBtnDisable:false,
        mapAddBtnDisable:false,
        innerSaveMapCfgVisible:false,
        innerLoadMapCfgVisible:false,
        saveMapCfgBtnDisable:false,
        upload_warn:'',
        EKF_RATIO:0.8,
        imgUpload:{
            multiple:false,
            disabled:false,
            url:ME.host + '/map/uploadImg',
            headers:{
                api_token:ME.api_token,
            },
            auto:true,
            imgUrl:[],
        },
        form: {
            title : lang['addFence'],
            id: '',
            cname : '',
            isActive : 1,
            sort : '',
            filePath : '',
            pixelWidth:'',
            pixelLength:'',
            realLength : '',
            realWidth : '',
            northAngle:0,
            longitude:0,
            latitude:0
        },
        mapCfgList:[],
        saveForm:{
            name:''
        },
        loadForm:{
            name:''
        },
        cfFromRule:{
            key:[
                { required: true, message: lang['keyRule'], trigger: 'blur' },
            ],
            value:[
                { required: true, message: lang['valueRule'], trigger: 'blur' },
            ]
        },
        modefiyPwdRule: {
            cname: [
                { validator: checks, trigger: 'blur' },
                { required: true, message: lang['cnameRule'], trigger: 'blur' },
                { min: 1, max: 50, message: lang['cnameRule2'], trigger: 'blur' },
            ],
            realLength:[
                { required: true, message: lang['realLengthRule'], trigger: 'blur' },
            ]
        },
        formLabelWidth: '120px',
    });
    var VUE_METHODS = Object.assign(CONF_VUE_METHODS,{
        updateImg:function(imgName){
            if(imgName){
                this.imgUpload.imgUrl = [{name:imgName,url:ME.imgHost + 'maps_' + imgName}];
                ME.vm.imgUpload.disabled = true;

                var img=new Image();
                img.src=ME.imgHost+'maps_'+imgName;
                img.onload=function() {
                    ME.vm.form.pixelWidth = this.height;
                    ME.vm.form.pixelLength = this.width;
                };

            }else{
                this.imgUpload.imgUrl = [];
                ME.vm.imgUpload.disabled = false;
            }
        },
        showSaveMapCfgDialog:function () {
            this.innerSaveMapCfgVisible=true;
        },
        saveMapCfg:function () {
            var that = this;
            if(that.saveForm.name == ''){
                that.$alert("名字不能为空！", lang['prompt']);
                return;
            }
            that.$refs['cfForm'].validate(function(valid){
                if (valid) {
                    if(!that.cfForm.ids||that.cfForm.ids.length<1){
                        alert(lang['selectRowNote'], lang['prompt']);
                        return;
                    }
                    //拼接第一行参数配置
                    if(that.cfForm.key){
                        var firstCf=that.cfForm.cfg.find(function(v){return v.key==that.cfForm.key});
                        if(!firstCf){
                            var cfOthor={};
                            cfOthor.key=that.cfForm.key;
                            cfOthor.value=that.cfForm.value;
                            cfOthor.desc=that.cfForm.desc;
                            that.cfForm.cfg.push(cfOthor);
                        }
                    }
                    //过滤掉未做修改的无用项,去除无效/重复数据
                    if(!that.cfForm.cfg)return;
                    //检查 测量距离配置是否正确
                    for(var i=0;i<that.cfForm.cfg.length;i++){
                        if(that.cfForm.cfg[i].key === "cfg_anchor_distances"){
                            try{
                                JSON.parse(that.cfForm.cfg[i].value);
                            }catch(e){
                                console.log(e);
                                that.$alert("到其他基站的飞行距离:不是JSON", lang['prompt']);
                                return
                            }
                        }
                    }
                    var cfgMapData=that.cfForm.cfg.filter(function(item){
                        if(item.key){
                            return true;
                        }
                    });
                    var params = {};
                    params.name = that.saveForm.name;
                    params.cfgMap = JSON.stringify(cfgMapData);
                    try {
                        params.projectCode = JSON.parse(localStorage.userData).projectCode;
                        params.mapId = that.cfForm.id;
                    }catch (e){
                        console.log(e);
                    }
                    that.saveMapCfgBtnDisable = true;
                    that.$http.post(ME.host +'/map/mapCfgToSave', params).then(function(res){
                        that.saveMapCfgBtnDisable = false;
                        var result = res.body;
                        if(result.isOk){
                            that.saveForm.name='';
                            that.innerSaveMapCfgVisible = false;
                            that.getMapCfgList();
                            that.$alert(lang['success'], lang['prompt']);
                        }else {
                            that.$alert(lang['updateCfgFail']+result.msg, lang['prompt'], {
                                confirmButtonText: lang['confirm']
                            });
                        }
                    });
                } else {
                    that.$alert(lang['enterError'], lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                    return false;
                }
            })
        },
        showLoadMapCfgDialog:function () {
            this.innerLoadMapCfgVisible=true;
        },
        loadMapCfg:function () {
            if(!this.loadForm.name){
                return;
            }
            var flag = false;
            for(var i=0;i<this.mapCfgList.length;i++){
                if(this.loadForm.name==this.mapCfgList[i].name){
                    flag =true;
                    this.showLoadMapCfg(this.mapCfgList[i].cfgMap);
                    break;
                }
            }
            if(!flag){
                return;
            }
            this.innerLoadMapCfgVisible=false;
        },
        showLoadMapCfg:function (cfg) {
            if(!cfg){
                return;
            }
            var rows = this.selectRows();
            if(!rows) return;
            UBIT.emptyObj(ME.vm.cfForm);
            this.cfForm.cfg=[];
            this.cfForm.title = "配置参数信息";
            this.cfFormVisible=true;
            for(var i=0;i<rows.length;i++){
                this.cfForm.ids.push(rows[i].id);
            }
            var rowCfconf=JSON.parse(cfg);
            this.cfForm.cfg=rowCfconf.filter(function(item){
                if(item.key){
                    return true;
                }
            });
            this.filterSelectedCfconf();
        },
        getMapCfgList:function () {
            var that = this;
            that.$http.get(ME.host +'/map/mapCfgList',).then(function (res) {
                var result = res.body;
                that.mapCfgList = result;
            });
        },
        handleImgUpload:function(response, file, fileList){
            if(response.isOk){
                ME.vm.form.filePath = response.fileName;
                ME.vm.imgUpload.disabled = true;
                var img=new Image();
                img.src=ME.imgHost+'maps_'+response.fileName;
                img.onload=function() {

                    ME.vm.form.pixelWidth = this.height;
                    ME.vm.form.pixelLength = this.width;


                };
            }
        },
        handleRemove:function(file, fileList){
            var fileName = '';
            if(file.response){
                fileName = file.response.fileName;
            }else {
                fileName = file.name;
            }
            ME.vm.$http.post(ME.host + '/map/deleteImg', {fileName:fileName}).then(function(rep){
                var res = rep.body;
                ME.vm.form.img = '';
                ME.vm.imgUpload.disabled = false;
                if(res.isOk){
                    this.$alert(res.msg, lang['prompt']);
                }else {
                    this.$alert(lang['deleteFail']+res.msg, lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                }
            });
        },

        selectRows:function(){
            var a = $('#maptable').bootstrapTable('getSelections');
            if (!a || a.length<1){
                this.$alert(lang['selectOne'], lang['prompt'], {
                    confirmButtonText: lang['confirm']
                });
                return false;
            }
            return a;
        },
        refresh:function(){
            $('#maptable').bootstrapTable('refresh');
        },
        mapAdd:function(){
            util.emptyObj(ME.vm.form);
            this.dialogFormVisible = true;
            this.form.title = lang['addInfo'];
            this.form.isActive = "1";
            this.form.sort = "1";
            this.updateImg('',false);
        },
        mapUpdate:function(){
            var rows = this.selectRows();
            if(!rows) return;
            if(rows.length>1){
                this.$alert(lang['onlySelectOne'], lang['prompt'], {
                    confirmButtonText: lang['confirm']
                });
                return false;
            }
            util.emptyObj(ME.vm.form);
            this.dialogFormVisible = true;
            this.form.title = lang['updateInfo'];
            util.deepCopy(rows[0],ME.vm.form,1);

            ME.vm.form.realLength = (ME.vm.form.realLength / 100).toFixed(2);
            this.updateImg(ME.vm.form.filePath);
        },
        mapLook:function(){
            var rows = this.selectRows();
            if(!rows) return;
            if(rows.length>1){
                this.$alert(lang['onlySelectOne'], lang['prompt'], {
                    confirmButtonText: lang['confirm']
                });
                return false;
            }
            var row = rows[0];
            UBIT.openMap(row.id);
        },
        mapDelete:function(){
            var rows = this.selectRows();
            if(!rows) return;
            if(rows.length>1){
                this.$alert(lang['onlySelectOne'], lang['prompt'], {
                    confirmButtonText: lang['confirm']
                });
                return false;
            }

            var row = rows[0];
            this.$confirm(lang['mapDeleteNote'],lang['prompt'],{ }).then(function()  {

                ME.vm.$http.post('super/map/delete', {id:row.id}).then(function(res){
                    var result = res.body;
                    if(result.isOk){
                        this.refresh();
                        this.$alert(lang['deleteSuccess'], lang['prompt']);
                    }else {
                        this.$alert(lang['deleteFail']+result.msg, lang['prompt'], {
                            confirmButtonText: lang['confirm']
                        });
                    }
                    ME.vm.mapDeleteBtnDisable = false;

                });
                ME.vm.mapDeleteBtnDisable = true;

            }).catch(function(){

            });

        },
        submitForm:function (formName) {
            var _this=this;
            this.$refs[formName].validate(function(valid){
                if (valid) {
                    if(!ME.vm.form.pixelWidth || !ME.vm.form.pixelLength){
                        ME.vm.$alert(lang['submitFormNote'], lang['prompt']);
                        return;
                    }

                    var params = {};
                    params.id = ME.vm.form.id;
                    params.cname = ME.vm.form.cname;
                    params.sort = ME.vm.form.sort;
                    params.filePath = ME.vm.form.filePath;
                    params.isActive = ME.vm.form.isActive;
                    params.northAngle = ME.vm.form.northAngle;


                    params.pixelWidth = ME.vm.form.pixelWidth;
                    params.pixelLength = ME.vm.form.pixelLength;
                    params.realLength = ME.vm.form.realLength * 100;
                    params.realWidth = params.realLength / params.pixelLength * params.pixelWidth;
                    params.longitude = ME.vm.form.longitude;
                    params.latitude = ME.vm.form.latitude;


                    var url = 'super/map/save/';
                    var msg = (ME.vm.form.id > 0 ? lang['update'] : lang['add']);
                    if(ME.vm.form.pixelLength<800||ME.vm.form.pixelLength>1500){
                        _this.$confirm(lang['submitFormNote2'],lang['prompt'],{ }).then(function() {

                            ME.vm.$http.post(url, params).then(function (res) {
                                ME.vm.mapBtnDisable = false;

                                var result = res.body;
                                if (result.isOk) {
                                    this.refresh();
                                    this.dialogFormVisible = false;
                                    this.$alert(msg + lang['success'], lang['prompt']);
                                } else {
                                    this.$alert(msg + lang['fail'] + result.msg, lang['prompt'], {
                                        confirmButtonText: lang['confirm']
                                    });
                                }
                                ME.vm.mapAddBtnDisable = false;
                            });
                            ME.vm.mapAddBtnDisable = true;

                        }).catch(function(){

                        });
                    }else{
                        ME.vm.$http.post(url, params).then(function (res) {
                            ME.vm.mapBtnDisable = false;

                            var result = res.body;
                            if (result.isOk) {
                                this.refresh();
                                this.dialogFormVisible = false;
                                this.$alert(msg + lang['success'], lang['prompt']);
                            } else {
                                this.$alert(msg + lang['fail'] + result.msg, lang['prompt'], {
                                    confirmButtonText: lang['confirm']
                                });
                            }
                            ME.vm.mapAddBtnDisable = false;
                        });
                    }

                } else {
                    ME.vm.$alert(lang['cfSubmitNote2'], lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                    return false;
                }
            })
        },

    });

    ME.vm = new Vue({
        el:'#app',
        data:VUE_DATA,
        created:function(){
            this.getMapCfgList();
        },
        methods:VUE_METHODS,
    });

}
