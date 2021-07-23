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
        {field: 'soft_version',title: lang['soft_version'],width:'8%', sortable:true, searchable:true},
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
        data:{
            dialogFormVisible:false,
            submitBtnDisable:false,
            versionsDeleteBtnDisable:false,

            fileUpload:{
                multiple:false,
                url:ME.host + '/versions/anchorFileUpload',
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
                ver_name : '',
                ver_type : 'app',
                is_active : 1,
                soft_version : '',
                hard_version : '',
                kernel_version:'',
                ver_cate : 'anchor_v1',
                ver_path:'',
                ver_size:'',
            },
            modefiyPwdRule: {
                filePath:[
                    { required: true, message: lang['filePathRule'] },
                ],
                ver_name : [
                    { required: true, message: lang['ver_nameRule'], trigger: 'blur' },
                ],
                soft_version : [
                    { required: true, message: lang['soft_version_rule'], trigger: 'blur' },
                ],
                hard_version : [
                    { required: true, message: lang['hard_versionRule'], trigger: 'blur' },
                ]
            },
            formLabelWidth: '120px',
            ver_cates:[
                {code:'anchor_v1'},
                {code:'anchor_v2'},
                {code:'anchor_v3'},
                {code:'anchor_v4'},
                {code:'anchor_v5'},

                {code:'ble_v1'},
                {code:'ble_v2'},
                {code:'ble_v3'},
                {code:'ble_v4'},
            ],
        },
        created:function(){

        },
        methods:{
            handleRemove:function(file, fileList){
                var fileName = '';
                if(file.response){
                    fileName = file.response.fileName;
                }else {
                    fileName = file.url;
                }
                ME.vm.$http.post('versions/fileDel', {fileName:fileName}).then(function(rep){
                    var res = rep.body;
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
            handlefileUpload:function(response, file, fileList){
                if(response.isOk){
                    ME.vm.form.ver_name = file.name;
                    ME.vm.form.ver_path = response.fileName;
                    // ME.vm.form.ver_size = file.size;
                    ME.vm.form.ver_size = response.file_size;
                    ME.vm.form.filePath = response.fileName;
                    ME.vm.fileUpload.disabled = true;
                }else{
                    this.$alert(response.msg, lang['prompt']);
                    ME.vm.fileUpload.disabled = true;
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
                this.form.ver_type = 'kernel';
                this.form.ver_cate = 'anchor_v1';
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
