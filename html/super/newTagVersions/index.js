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

        var versions = $('#versionstable').bootstrapTable('getData');
        var flag = true;
        if(!flag) return;
        callback();
}




function pageInit(){

    $('#versionstable').bootstrapTable({
        url:ME.host+'/tag/versions/list',
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
        {field: 'id',title: 'ID', width:'4%', sortable:true, searchable:true},
        {field: 'ver_type',title: lang['ver_type'],width:'8%', sortable:true, searchable:true},
        {field: 'tag_type',title: lang['tag_type'],width:'8%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value){
                    var tag_type_flag =false;
                    for(var i=0;i<ME.vm.options_tag_category.length;i++){
                        if(value == ME.vm.options_tag_category[i].value){
                            tag_type_flag =true;
                            break;
                        }
                    }
                    if(!tag_type_flag){
                       value = value+":未知";
                    }else{
                        value = ME.vm.options_tag_category[i].label;
                    }
                }
                return value;
            }
        },
        {field: 'function_coding',title: lang['function_coding'],width:'8%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value){
                    var flag =false;
                    for(var i=0;i<ME.vm.options_tag_function.length;i++){
                        if(value == ME.vm.options_tag_function[i].value){
                            flag =true;
                            break;
                        }
                    }
                    if(!flag){
                        value = value+":未知";
                    }else{
                        value = ME.vm.options_tag_function[i].label;
                    }
                }
                return value;
            }
        },
        {field: 'soft_version',title: lang['soft_version'],width:'8%', sortable:true, searchable:true},
        {field: 'soft_ver_commit',title: lang['soft_ver_commit'],width:'8%', sortable:true, searchable:true},
        {field: 'hard_version',title: lang['hard_version'],width:'8%', sortable:true, searchable:true},
        // {field: 'dat_name',title: lang['dat_name'],width:'12%', sortable:true, searchable:true},
        {field: 'dat_name',title: 'zip文件',width:'12%', sortable:true, searchable:true},
        {field: 'bin_name',title: 'zip路径',width:'12%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value){
                    var html = '<a href="'+ (ME.imgHost+"versions_"+value) +'" target="_blank" >'+value+'</a>';
                    return '<div>'+html+'</div>';
                }
                return value;
            }
        },
        {field: 'dat_path',title: lang['dat_path'],width:'10%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value){
                    var html = '<a href="'+ (ME.imgHost+"versions_"+value) +'" target="_blank" >'+value+'</a>';
                    return '<div>'+html+'</div>';
                }
                return value;
            }
        },
        {field: 'dat_size',title: lang['dat_size'],width:'8%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value){
                    return (value/1024).toFixed(2);
                }
                return value;
            }
        },

        // {field: 'bin_name',title: lang['bin_name'],width:'12%', sortable:true, searchable:true},
        {field: 'bin_path',title: lang['bin_path'],width:'10%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value){
                    var html = '<a href="'+ (ME.imgHost+"versions_"+value) +'" target="_blank" >'+value+'</a>';
                    return '<div>'+html+'</div>';
                }
                return value;
            }
        },
        {field: 'bin_size',title: lang['bin_size'],width:'8%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value){
                    return (value/1024).toFixed(2);
                }
                return value;
            }
        },

        // {field: 'is_active',title: lang['is_active'],width:'6%', sortable:true, searchable:true,
        //     formatter:function(value, row, index){
        //             return value>0?lang['true']:lang['false'];
        //     },
        // },
        {field: 'addTime',title: lang['addTime'],width:'22%', sortable:true, searchable:true},
        {field: 'addUser',title: lang['addUser'],width:'11%', sortable:true, searchable:true},
        // {field: 'upTime',title: lang['upTime'],width:'6%', sortable:true, searchable:true},
        // {field: 'upUser',title: lang['upUser'],width:'6%', sortable:true, searchable:true},
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
            return{
                otaBtnDisable: false,
                otaVisible: false,
                otaStart: '0000',
                otaEnd: '0000',
                otaProgress: false,
                otaAnchors: '9000',
                otaProgressAnchors: [],
                options_tag_type: {
                    'TA': '01',
                    'TB': '02',
                    'TC': '08',
                    'TD': '03',
                    'TF': '09',
                    'TR': '05',
                    'TT': '0D',
                    'TW': '04',
                    'TE1': '06',
                    'TH-GN': '0A',
                    'TA-GN': '0B',
                    'TW-GN': '0C'
                },
                options_tag_category: [{
                    value: '0100',
                    label: 'TA00:薄工卡'
                }, {
                    value: '0101',
                    label: 'TA01:52832厚工卡'
                }, {
                    value: '0102',
                    label: 'TA02:STM32厚工卡'
                }, {
                    value: '0200',
                    label: 'TB00:资产标签'
                }, {
                    value: '0800',
                    label: 'TC00:小资产标签'
                }, {
                    value: '0900',
                    label: 'TF00:普通金属壳手环'
                }, {
                    value: '0901',
                    label: 'TF01:鼎信小手环'
                }, {
                    value: '0400',
                    label: 'TW00:防拆心率手环'
                }],
                options_tag_function: [{
                    value: '0100',
                    label: '0100:标准定位标签'
                }, {
                    value: '0200',
                    label: '0200:标准UWB报警器'
                }, {
                    value: '0201',
                    label: '0201:互测型UWB报警器'
                }, {
                    value: '0202',
                    label: '0202:标准UWB测距标签'
                }, {
                    value: '0203',
                    label: '0203:标准蓝牙报警器'
                }, {
                    value: '0204',
                    label: '0204:互测型蓝牙报警器'
                }, {
                    value: '0205',
                    label: '0205:标准蓝牙测距标签'
                }, {
                    value: '0206',
                    label: '0206:互测型蓝牙测距标签'
                }],
                dialogFormVisible: false,
                submitBtnDisable: false,
                versionsDeleteBtnDisable: false,
                fileUpload: {
                    multiple: true,
                    url: ME.host + '/versions/tagFileUpload',
                    disabled: false,
                    headers: {
                        api_token: ME.api_token,
                    },
                    auto: true,
                    fileList: [],
                },

                form: {
                    title: lang['formTitle'],
                    id: '',
                    ver_type: 'app',
                    tag_type: '',
                    // tag_category:'',
                    function_coding: '',
                    soft_version: '',
                    soft_ver_commit: '',
                    hard_version: '',
                    dat_name: '',
                    dat_path: '',
                    dat_size: '',
                    bin_name: '',
                    bin_path: '',
                    bin_size: '',
                },
                modefiyPwdRule: {
                    soft_version: [
                        {required: true, message: lang['soft_version_rule']},
                    ],
                    hard_version: [
                        {required: true, message: lang['hard_versionRule']},
                    ],
                    tag_type: [
                        {required: true, message: lang['tag_typeRule']},
                    ],
                    function_coding: [
                        {required: true, message: lang['function_coding']},
                    ],
                    soft_ver_commit: [
                        {validator: checkCommit, trigger: 'blur'},
                    ],
                    dat_path: [
                        {required: true, message: lang['filePathRule']},
                    ],
                    bin_path: [
                        {required: true, message: lang['filePathRule']},
                    ]
                },
                formLabelWidth: '120px',
            }
        },
        created:function(){

        },
        methods:{

            getVersion:function (obj, fileName,t1) {
                var fileNew = fileName.replace(t1,'');
                var arr = fileNew.split('-');
                // var t1=arr[0].match(/T[A-Z]/)[0];
                var t2 = arr[0].match(/[0-9]{2}/)[0];
                if(this.options_tag_type[t1]===undefined){
                    return false;
                }
                var tag_type = this.options_tag_type[t1]+t2;
                var tag_type_flag =false;
                for(var i=0;i<this.options_tag_category.length;i++){
                    if(tag_type == this.options_tag_category[i].value){
                        tag_type_flag =true;
                        break;
                    }
                }
                if(!tag_type_flag){
                    var lable1 = t1+t2+":未知";
                    this.options_tag_category.push({value: tag_type, label: lable1});
                }
                obj.tag_type=tag_type;
                var function_flag = false;
                var func_code = arr[1];
                for(var j=0;j<this.options_tag_function.length;j++){
                    if(func_code == this.options_tag_function[j].value){
                        function_flag = true;
                        break;
                    }
                }
                if(!function_flag){
                    var lable2 = arr[1]+":未知";
                    this.options_tag_function.push({value: func_code, label: lable2});
                }
                obj.function_coding = func_code;
                obj.soft_version = arr[2].replace('SV','');
                obj.hard_version = arr[3].replace('HV','');
                return true;
                // var name = fileName.replace('.bin','');
                //
                // var t1 = name.split('_sv');
                // if(t1.length > 1){
                //     obj.soft_version = t1[1].split('_')[0];
                // }
                // t1 = name.split('_hv');
                // if(t1.length > 1){
                //     obj.hard_version = t1[1].split('_')[0];
                // }
                // t1 = name.split('_type');
                // if(t1.length > 1){
                //     obj.tag_type = t1[1].split('_')[0];
                // }
            },
            handlefileUpload:function(response, file){
                if(response.isOk){
                    // if(file.name.indexOf('.dat')>0){
                    //     ME.vm.form.dat_name = file.name;
                    //     ME.vm.form.dat_path = response.fileName;
                    //     ME.vm.form.dat_size = file.size;
                    // }else  if(file.name.indexOf('.bin')>0){
                    //     this.getVersion(ME.vm.form, file.name);
                    //     ME.vm.form.bin_name = file.name;
                    //     ME.vm.form.bin_path = response.fileName;
                    //     ME.vm.form.bin_size = file.size;
                    // }
                    var reg = /^(T[A-Z]{1}|T[A-Z]{1}-GN|TE1)[0-9]{2}-[0-9]{4}-SV[0-9]{2}\.[0-9]{2}\.[0-9]{2}-HV[0-9]{2}\.[0-9]{2}/;
                    // var reg = /^T[A-Z]{1}[0-9]{2}-[0-9]{4}-SV[0-9]{2}\.[0-9]{2}\.[0-9]{2}-HV[0-9]{2}\.[0-9]{2}/;
                    if(reg.test(file.name) && file.name.indexOf('.zip') > 0) {
                        var str = file.name.match(reg);
                        // var zipfile = file.name.replace('.zip', '')
                        if(!this.getVersion(ME.vm.form, str[0],str[1])){
                            this.$alert('该版本文件名解析失败', lang['prompt']);
                            return;
                        }
                        ME.vm.form.dat_name = file.name;
                        ME.vm.form.bin_name = response.fileName;
                        ME.vm.form.dat_path = response.data.dat_path;
                        ME.vm.form.dat_size = response.data.dat_size || "";
                        ME.vm.form.bin_path = response.data.bin_path;
                        ME.vm.form.bin_size = response.data.bin_size || "";
                    }else{
                        this.$alert("文件名错误", lang['prompt']);
                    }
                    ME.vm.fileUpload.disabled = true;
                }else{
                    this.$alert(response.msg, lang['prompt']);
                    // ME.vm.fileUpload.disabled = false;

                    ME.vm.fileUpload = {
                        multiple: true,
                        url: ME.host + '/versions/tagFileUpload',
                        disabled: false,
                        headers: {
                            api_token: ME.api_token,
                        },
                        auto: true,
                        fileList: [],
                    }
                }
            },

            handleRemove:function(file){
                var fileName = '';
                if(file.response){
                    fileName = file.response.fileName;
                }else {
                    fileName = file.url;
                }
                ME.vm.$http.post('versions/fileDel', {fileName:fileName}).then(function(rep){
                    var res = rep.body;

                    ME.vm.form.soft_version = '';
                    ME.vm.form.function_coding = '';
                    ME.vm.form.hard_version = '';
                    ME.vm.form.tag_type = '';
                    ME.vm.form.bin_name = '';
                    ME.vm.form.bin_path = '';
                    ME.vm.form.bin_size = '';
                    ME.vm.form.dat_name = '';
                    ME.vm.form.dat_path = '';
                    ME.vm.form.dat_size = '';

                    // ME.vm.form.filePath = '';
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
                this.form.ver_type = 'app';
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
                
                // this.fileUpload.fileList = [{
                //     'name':ME.vm.form.ver_name,
                //     'url':ME.vm.form.ver_path,
                // }];

            },
            versionsDelete:function(){
                var rows = this.selectversions();

                if(!rows) return;
                var row = rows[0];
                this.$confirm(lang['versionsDeleteNote'],lang['prompt'],{ }).then(function()  {

                    ME.vm.$http.post('tag/versions/delete', {id:row.id}).then(function(res){
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
                      if(ME.vm.form.dat_size<1 || !ME.vm.form.dat_path){
                          ME.vm.$alert(lang['submitFormNote'], lang['prompt']);
                          return ;
                      }
                      if(ME.vm.form.bin_size<1 || !ME.vm.form.bin_path){
                          ME.vm.$alert(lang['submitFormNote'], lang['prompt']);
                          return ;
                      }

                      var url = 'tag/versions/save/';
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


            openDialog: function () {
                var rows = this.selectversions();
                if(!rows) return;

                this.otaProgress = false;
                // this.otaBtnDisable = true;
                this.otaVisible = true;
            },

            startOTA: function () {
                var rows = this.selectversions();
                if(!rows) return;
                var row = rows[0];
                var tagReg = /^0000[0-9a-fA-F]{4}$/;
                var anchorReg = /^9000[0-9a-fA-F]{4}$/;
                if(!tagReg.test(this.otaStart)||!tagReg.test(this.otaEnd)){
                    ME.vm.$alert('标签的起止格式错误');
                    return;
                }
                if(this.otaStart>this.otaEnd){
                    ME.vm.$alert('标签的起始不应大于结束');
                    return;
                }
                if(!anchorReg.test(this.otaAnchors)){
                    ME.vm.$alert('负责升级的基站格式错误');
                    return;
                }

                this.otaProgress = true;
                this.otaBtnDisable = true;
                var self = this;

                var msg=lang['startOTAUpdateMore'];
                var params={id:row.id, start:this.otaStart, end:this.otaEnd, anchors:this.otaAnchors};
                this.$confirm(msg+lang['startOTANoteAfter'] + '请确保标签在升级基站的信号覆盖范围内！', lang['prompt'], {confirmButtonText: lang['confirm'], cancelButtonText: lang['cancel'], type: 'warning'})
                    .then(function(){
                        ME.vm.otaProgressAnchors=[];
                        ME.vm.$http['post']('super/tag/otaMore',params).then(function (res) {
                            ME.vm.otaBtnDisable = false;
                            var result = res.body;

                            var flag = false;
                            for(var rs of result){
                                if(rs.isOk){
                                    flag = true;
                                }
                            }

                            if(flag){
                                this.getOtaProgress(0,() => {
                                    ME.vm.$alert("标签OTA是通过基站进行间接升级的，由于标签间接性进行监听，所以每个标签的升级时间将在1分钟到1小时之间（具体取决于标签的监听周期）。升级后通过对比标签的版本号，来确定是否升级成功");
                                })
                            }

                        });
                    }).
                catch(function(){
                    ME.vm.otaBtnDisable = false;
                    ME.vm.otaProgressAnchors=[];
                })
                ;
            },
            getOtaProgress(count = 0,cb){
                const self = this;
                const anchors = this.otaAnchors;
                if(count > 100){
                    cb()
                    return;
                }
                const url = `${ME.host}/super/tag/otaSendFileProgress?anchors=${anchors}`
                return ME.vm.$http.get(url).then((res) => {
                    if(res && res.data && res.data.isOk && res.data.data){
                        self.otaProgressAnchors = []
                        Object.keys(res.data.data).forEach((key) => {
                            let ratio = res.data.data[key];
                            ratio = ratio?parseFloat(ratio):0;
                            ratio = ratio * 100;
                            msg = ratio >= 1?key + '文件传输成功！' :key + '文件正在传输中...';
                            self.otaProgressAnchors.push({
                                mac:key,
                                ratio:ratio,
                                status:ratio >= 1?"success":"",
                                msg
                            })
                        })
                        if(Object.values(res.data.data).every((val) => {
                            return val && Number(val) >= 1;
                        })){
                            return cb();
                        }
                    }
                    setTimeout(() => {
                        count++;
                        return self.getOtaProgress(count,cb)
                    },300)
                })
            }
        },
    });

}


function getProgressAnchors(anchors) {
    var ans = anchors.split(',');
    var params = [];
    for(var i=0;i<ans.length;i++){
        var value = {mac:ans[i]};
        value.ratio = 0;
        value.msg = '(' + value.mac + ')文件正在传输中...' ;
        params.push(value);
    }
    return params;
}