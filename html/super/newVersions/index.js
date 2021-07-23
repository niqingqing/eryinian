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

        var versionss = $('#versionstable').bootstrapTable('getData');
        var id = ME.vm.form.id;
        var flag = true;
        if(!flag) return;
        callback();
}




function pageInit(){

    $('#versionstable').bootstrapTable({
        url:ME.host+'/versions/list',
        method:'get',
        queryParams:function(params){
            return params;
        },
        search:true,
        showRefresh:true,
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
        pageList:[5, 10, 25, 50, 100, 200],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#versionstoolbar',
        onDblClickRow:function(row, $element){
            ME.vm.versionsUpdate();
        },

    columns: [
        {radio:true},
        {field: 'id',title: 'ID', width:'4%',sortable:true,  searchable:true},
        {field: 'ver_name',title: lang['ver_name'],width:'12%', sortable:true, searchable:true},
        {field: 'ver_type',title: lang['ver_type'],width:'8%', sortable:true, searchable:true},
        {field: 'anchor_category',title: lang['anchor_category'],width:'8%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value){
                    var anchor_category_flag =false;
                    for(var i=0;i<ME.vm.options_anchor_category.length;i++){
                        if(value == ME.vm.options_anchor_category[i].value){
                            anchor_category_flag =true;
                            break;
                        }
                    }
                    if(!anchor_category_flag){
                        value = value+":未知";
                    }else{
                        value = ME.vm.options_anchor_category[i].label;
                    }
                }
                return value;
            }
        },
        {field: 'function_coding',title: lang['function_coding'],width:'8%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value){
                    var flag =false;
                    for(var i=0;i<ME.vm.options_anchor_function.length;i++){
                        if(value == ME.vm.options_anchor_function[i].value){
                            flag =true;
                            break;
                        }
                    }
                    if(!flag){
                        value = value+":未知";
                    }else{
                        value = ME.vm.options_anchor_function[i].label;
                    }
                }
                return value;
            }
        },
        {field: 'soft_version',title: lang['soft_version'],width:'8%', sortable:true, searchable:true},
        {field: 'soft_ver_commit',title: lang['soft_ver_commit'],width:'8%', sortable:true, searchable:true},
        {field: 'hard_version',title: lang['hard_version'],width:'8%', sortable:true, searchable:true},
        {field: 'kernel_version',title: lang['kernel_version'],width:'8%', sortable:true, searchable:true},
        {field: 'ver_cate',title: lang['ver_cate'],width:'6%', sortable:true, searchable:true},
        {field: 'ver_path',title: lang['ver_path'],width:'10%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value){
                    var html = '<a href="'+ (ME.imgHost+"versions_"+value) +'" target="_blank" >'+value+'</a>';
                    return '<div>'+html+'</div>';
                }
                return value;
            }
        },
        {field: 'ver_size',title: lang['ver_size'],width:'8%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value){
                    return (value/1024).toFixed(2);
                }
                return value;
            }
        },
        {field: 'is_active',title: lang['is_active'],width:'6%', sortable:true, searchable:true, 
            formatter:function(value, row, index){
                    return value>0?lang['true']:lang['false'];
            },
        },
        {field: 'addTime',title: lang['addTime'],width:'22%', sortable:true, searchable:true},
        {field: 'addUser',title: lang['addUser'],width:'11%', sortable:true, searchable:true},
        {field: 'upTime',title: lang['upTime'],width:'6%', sortable:true, searchable:true},
        {field: 'upUser',title: lang['upUser'],width:'6%', sortable:true, searchable:true},
    ]

});

}

function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data() {
            var checkCommit=function (rule, value, callback) {
                var reg = /^[0-9a-zA-Z]{0,16}$/;
                if(reg.test(value)){
                    callback();
                }else{
                    callback(new Error('只能填写字母和数字,最多16个字符'));
                }
            };
            return {
                dialogFormVisible: false,
                submitBtnDisable: false,
                versionsDeleteBtnDisable: false,

                fileUpload: {
                    multiple: false,
                    url: ME.host + '/versions/anchorFileUpload',
                    disabled: false,
                    headers: {
                        api_token: ME.api_token,
                    },
                    auto: true,
                    fileList: [],
                },
                category_num: {
                    'AE': '20',
                    'AL': '22',
                    'AEI': '23',
                    'ALI': '24',
                    'AEX': '25',
                    'AET': '26',
                    'AA': '27',
                    'AM': '28',
                    'AES': '29',
                    'AEIS': '2A',
                    'AEXS': '2B',
                    'AETF': '2C'
                },
                options_anchor_category: [{
                    value: '20',
                    label: 'AE:MTK室内基站'
                }, {
                    value: '22',
                    label: 'AL:MTK室内4G基站'
                }, {
                    value: '23',
                    label: 'AEI:MTK室外基站'
                }, {
                    value: '24',
                    label: 'ALI:MTK室外4G基站'
                }, {
                    value: '25',
                    label: 'AEX:MTK防爆基站'
                }, {
                    value: '26',
                    label: 'AET:隧道基站'
                }, {
                    value: '27',
                    label: 'AA:AOA室内基站（三角形2天线）'
                }, {
                    value: '28',
                    label: 'AM:AOA室内基站（正方形4天线）'
                }, {
                    value: '29',
                    label: 'AES:STM室内基站'
                }, {
                    value: '2A',
                    label: 'AEIS:STM室外基站'
                }, {
                    value: '2B',
                    label: 'AEXS:STM防爆基站'
                }, {
                    value: '2C',
                    label: 'AETF:煤矿隧道专用基站（富力通定制带SD卡和RTC）'
                }],
                options_anchor_function: [{
                    value: '0100',
                    label: '0100:非大容量标准定位'
                }, {
                    value: '0101',
                    label: '0101:大容量标准定位'
                }, {
                    value: '0102',
                    label: '0102:大容量隧道单基站双UWB，一次poll同时跟两个UWB测距'
                }, {
                    value: '0200',
                    label: '0200:标签与基站测距，基站通过网口上报数据'
                }],
                form: {
                    title: lang['formTitle'],
                    id: '',
                    ver_name: '',
                    ver_type: '',
                    anchor_category: '',
                    function_coding: '',
                    is_active: 1,
                    soft_version: '',
                    soft_ver_commit: '',
                    hard_version: '',
                    kernel_version: '',
                    ver_cate: 'anchor_v1',
                    ver_path: '',
                    ver_size: '',
                },
                radioDisable: {
                    appDisable: true,
                    kernelDisable: true,
                    driverDisable: true
                },
                modefiyPwdRule: {
                    // filePath:[
                    //     { required: true, message: lang['filePathRule'] },
                    // ],
                    ver_name: [
                        {required: true, message: lang['ver_nameRule']},
                    ],
                    anchor_category: [
                        {required: true, message: lang['anchor_category']},
                    ],
                    function_coding: [
                        {required: true, message: lang['function_coding']},
                    ],
                    soft_version: [
                        {required: true, message: lang['soft_version_rule']},
                    ],
                    hard_version: [
                        {required: true, message: lang['hard_versionRule']},
                    ],
                    soft_ver_commit: [
                        {validator: checkCommit, trigger: 'blur'},
                    ],
                },
                formLabelWidth: '120px',
                ver_cates: [
                    {code: 'anchor_v1'},
                    {code: 'anchor_v2'},
                    {code: 'anchor_v3'},
                    {code: 'anchor_v4'},
                    {code: 'anchor_v5'},

                    {code: 'ble_v1'},
                    {code: 'ble_v2'},
                    {code: 'ble_v3'},
                    {code: 'ble_v4'},
                ],
            }
        },
        created:function(){

        },
        methods:{
            setRadioDisable:function (val) {
                if(val == 'app'){
                    this.radioDisable.appDisable = false;
                    this.radioDisable.kernelDisable = true;
                    this.radioDisable.driverDisable = true;
                }else if(val == 'kernel'){
                    this.radioDisable.appDisable = true;
                    this.radioDisable.kernelDisable = false;
                    this.radioDisable.driverDisable = true;
                }else if(val == 'driver'){
                    this.radioDisable.appDisable = true;
                    this.radioDisable.kernelDisable = true;
                    this.radioDisable.driverDisable = false;
                }else{
                    this.radioDisable.appDisable = true;
                    this.radioDisable.kernelDisable = true;
                    this.radioDisable.driverDisable = true;
                }
            },
            getVersion:function (obj, fileName) {
                var arr = fileName.split('-');
                if(this.category_num[arr[0]]===undefined){
                    return false;
                }
                var anchor_category = this.category_num[arr[0]];
                var anchor_category_flag =false;
                for(var i=0;i<this.options_anchor_category.length;i++){
                    if(anchor_category == this.options_anchor_category[i].value){
                        anchor_category_flag =true;
                        break;
                    }
                }
                if(!anchor_category_flag){
                    var lable1 = arr[0]+":未知";
                    this.options_anchor_category.push({value: anchor_category, label: lable1});
                }
                obj.anchor_category=anchor_category;
                if(arr[1]*1 == 1){
                    this.setRadioDisable('kernel');
                    obj.ver_type = 'kernel';
                }else if(arr[1]*1 == 2){
                    this.setRadioDisable('app');
                    obj.ver_type = 'app';
                }else if(arr[1]*1 == 3){
                    this.setRadioDisable('driver');
                    obj.ver_type = 'driver';
                }else{
                    return false;
                }
                var function_flag = false;
                var func_code = arr[2];
                for(var j=0;j<this.options_anchor_function.length;j++){
                    if(func_code == this.options_anchor_function[j].value){
                        function_flag = true;
                        break;
                    }
                }
                if(!function_flag){
                    var lable2 = arr[1]+":未知";
                    this.options_anchor_function.push({value: func_code, label: lable2});
                }
                obj.function_coding = func_code;
                obj.soft_version = arr[3].replace('SV','');
                obj.hard_version = arr[4].replace('HV','');
                return true;
            },
            handleRemove:function(file, fileList){
                var fileName = '';
                if(file.response){
                    fileName = file.response.fileName;
                }else {
                    fileName = file.url;
                }
                ME.vm.$http.post('versions/fileDel', {fileName:fileName}).then(function(rep){
                    var res = rep.body;
                    ME.vm.form.ver_type = '';
                    ME.vm.setRadioDisable();
                    ME.vm.form.anchor_category = '';
                    ME.vm.form.function_coding = '';
                    ME.vm.form.soft_version = '';
                    ME.vm.form.hard_version = '';
                    ME.vm.form.ver_name = '';
                    ME.vm.form.ver_path = '';
                    ME.vm.form.ver_size = '';
                    ME.vm.form.filePath = '';
                    ME.vm.fileUpload.disabled = false;
                    if(res.isOk){
                        this.$alert(res.msg, lang['prompt']);
                    }else {
                        this.$alert(lang['deleteFail']+res.msg, lang['prompt'], {
                            confirmButtonText: lang['confirm']
                        });
                    }
                });
            },
            handlefileUpload:function(response, file, fileList) {
                if (response.isOk) {
                    var reg = /^[A-Z]{1,6}-[0-9]{2}-[0-9]{4}-SV[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2}-HV[0-9]{1,2}\.[0-9]{1,2}/;
                    if (reg.test(file.name)) {
                        var str = file.name.match(reg);
                        // var zipfile = file.name.replace('.zip', '')
                        if (!this.getVersion(ME.vm.form, str[0])) {
                            this.$alert('该版本文件名解析失败', lang['prompt']);
                            return;
                        }
                        ME.vm.form.ver_name = file.name;
                        ME.vm.form.ver_path = response.fileName;
                        // ME.vm.form.ver_size = file.size;
                        ME.vm.form.ver_size = response.file_size;
                        ME.vm.form.filePath = response.fileName;
                        ME.vm.fileUpload.disabled = true;
                    } else {
                        this.$alert("文件名错误", lang['prompt']);
                        ME.vm.fileUpload.disabled = true;

                        ME.vm.fileUpload =  {
                            multiple: false,
                            url: ME.host + '/versions/anchorFileUpload',
                            disabled: false,
                            headers: {
                                api_token: ME.api_token,
                            },
                            auto: true,
                            fileList: [],
                        }
                    }
                }
            },
            selectversions:function(){
                var a = $('#versionstable').bootstrapTable('getSelections');
                if (!a || a.length<1){
                    this.$alert(lang['selectOne'], lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                    return false;
                }
                return a;
            },
            refresh:function(){
                $('#versionstable').bootstrapTable('refresh');
            },
            versionsAdd:function(){
                util.emptyObj(ME.vm.form);
                this.dialogFormVisible = true;
                this.form.title = lang['addInfo'];
                this.form.is_active = "1";
                this.form.ver_type = '';
                this.form.ver_cate = 'anchor_v1';
                this.fileUpload.disabled = false;
                this.fileUpload.fileList = [];
            },
            versionsUpdate:function(){
                var rows = this.selectversions();
                if(!rows) return;
                if(rows.length>1){
                     this.$alert(lang['onlySelectOne'], lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                    return false;
                }

                this.dialogFormVisible = true;
                this.form.title = lang['updateInfo'];

                util.deepCopy(rows[0],ME.vm.form,1);
                
                this.fileUpload.fileList = [{
                    'name':ME.vm.form.ver_name,
                    'url':ME.vm.form.ver_path,
                }];

            },
            versionsDelete:function(){
                var rows = this.selectversions();

                if(!rows) return;
                var row = rows[0];
                this.$confirm(lang['versionsDeleteNote'],lang['prompt'],{ }).then(function()  {

                    ME.vm.$http.post('versions/delete', {id:row.id}).then(function(res){
                    var result = res.body;
                    if(result.isOk){
                        this.refresh();
                        this.$alert(lang['deleteSuccess'], lang['prompt']);
                    }else {
                        this.$alert(lang['deleteFail']+result.msg, lang['prompt'], {
                            confirmButtonText: lang['confirm']
                        });
                    }
                        ME.vm.versionsDeleteBtnDisable = false;

                    });
                        ME.vm.versionsDeleteBtnDisable = true;

            }).catch(function(){

                });

            },
            submitForm:function (formName) {
                this.$refs[formName].validate(function(valid){
                  if (valid) {
                      if(ME.vm.form.ver_size<1 || !ME.vm.form.ver_path){
                          ME.vm.$alert(lang['submitFormNote'], lang['prompt']);
                          return ;
                      }

                      var url = 'versions/save/';
                      var msg = (ME.vm.form.id>0?lang['update']:lang['add']);
                      ME.vm.submitBtnDisable = true;
                      ME.vm.$http.post(url, ME.vm.form).then(function(res){
                          ME.vm.submitBtnDisable = false;
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


        },
    });

}
