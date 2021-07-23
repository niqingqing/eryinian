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
        {field: 'tag_type',title: lang['tag_type'],width:'8%', sortable:true, searchable:true},
        {field: 'soft_version',title: lang['soft_version'],width:'8%', sortable:true, searchable:true},
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
        data:{
            otaBtnDisable:false,
            otaVisible:false,
            otaStart:'00000001',
            otaEnd:'0000ffff',
            otaProgress:false,
            otaAnchors:'',
            otaProgressAnchors:[],

            dialogFormVisible:false,
            submitBtnDisable:false,
            versionsDeleteBtnDisable:false,
            fileUpload:{
                multiple:true,
                url:ME.host + '/versions/tagFileUpload',
                disabled:false,
                headers:{
                    api_token:ME.api_token,
                },
                auto:true,
                fileList:[],
            },

            form: {
                title : lang['formTitle'],
                id: '',
                ver_type : 'app',
                tag_type :'08',
                soft_version : '',
                hard_version : '',
                dat_name : '',
                dat_path : '',
                dat_size : '',
                bin_name : '',
                bin_path : '',
                bin_size : '',
            },
            modefiyPwdRule: {
                soft_version:[
                    { required: true, message: lang['soft_version_rule'] },
                ],
                hard_version:[
                    { required: true, message: lang['hard_versionRule'] },
                ],
                tag_type:[
                    { required: true, message: lang['tag_typeRule'] },
                ],
                dat_path : [
                    { required: true, message: lang['filePathRule'] },
                ],
                bin_path : [
                    { required: true, message: lang['filePathRule'] },
                ]
            },
            formLabelWidth: '120px',
        },
        created:function(){

        },
        methods:{
            getVersion:function (obj, fileName) {
                var name = fileName.replace('.bin','');

                var t1 = name.split('_sv');
                if(t1.length > 1){
                    obj.soft_version = t1[1].split('_')[0];
                }
                t1 = name.split('_hv');
                if(t1.length > 1){
                    obj.hard_version = t1[1].split('_')[0];
                }
                t1 = name.split('_type');
                if(t1.length > 1){
                    obj.tag_type = t1[1].split('_')[0];
                }
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
                    if(file.name.indexOf('.zip')>0){
                        var zipfile = file.name.replace('.zip','')
                        this.getVersion(ME.vm.form, zipfile);
                        ME.vm.form.dat_name = file.name;
                        ME.vm.form.bin_name = response.fileName;
                        ME.vm.form.dat_path = response.data.dat_path;
                        ME.vm.form.dat_size = response.data.dat_size||"";
                        ME.vm.form.bin_path = response.data.bin_path;
                        ME.vm.form.bin_size = response.data.bin_size||"";
                    }
                    ME.vm.fileUpload.disabled = true;
                }else{
                    this.$alert(response.msg, lang['prompt']);
                    ME.vm.fileUpload.disabled = true;
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

                if(!this.otaStart || !this.otaEnd){
                    ME.vm.$alert('请输入需要升级的标签的起止范围');
                    return;
                }
                if(this.otaStart.length != 8 || this.otaEnd.length != 8){
                    ME.vm.$alert('标签的起止范围输入有误');
                    return;
                }
                if(!this.otaAnchors || this.otaAnchors.length < 8){
                    ME.vm.$alert('请指定负责升级的基站');
                    return;
                }

                this.otaProgress = true;
                this.otaBtnDisable = true;
                var self = this;

                var msg=lang['startOTAUpdateMore'];
                var params={id:row.id, start:this.otaStart, end:this.otaEnd, anchors:this.otaAnchors};
                this.$confirm(msg+lang['startOTANoteAfter'] + '请确保标签在升级基站的信号覆盖范围内！', lang['prompt'], {confirmButtonText: lang['confirm'], cancelButtonText: lang['cancel'], type: 'warning'})
                    .then(function(){
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