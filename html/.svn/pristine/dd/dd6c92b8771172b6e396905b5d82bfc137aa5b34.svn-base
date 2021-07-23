/**
 * Created by LiuTao on 2017/6/30 0028.
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

        var users = $('#usertable').bootstrapTable('getData');
        var id = ME.vm.form.id;
        var flag = true;
        users.forEach(function(user){
            if(value.toLowerCase() == user.code.toLowerCase() && id!=user.id){
                callback(new Error(lang['checksNote']));
                return;
            }
        });
        if(!flag) return;
        callback();
}


function checkCname (rule, value, callback) {
    if (value === '') {
        callback(new Error(lang['checkCnameNote']));
        return;
    }

    var users = $('#usertable').bootstrapTable('getData');
    var id = ME.vm.form.id;
    users.forEach(function(user){
        if(value == user.cname && id!=user.id){
            callback(new Error(lang['checkCnameNote2']));
            return;
        }
    });
    callback();
}
function needCheckProject(rule, value, callback) {
    if(value != 'super') {
        ME.vm.modefiyPwdRule['projectId'] = [
            {required: true, validator: checkProject, trigger: 'change'},
        ];
    }else{
        ME.vm.modefiyPwdRule['projectId'] = [];
    }
    callback();
}
function checkProject (rule, value, callback) {
    if (value == '' && ME.vm.form.userType!='super') {
        callback(new Error(lang['enterContent']));
        return;
    }
    callback();
}



function pageInit(){

    $('#usertable').bootstrapTable({
        url:ME.host+'/super/user/list',
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
        pageList:[2, 10, 25, 50, 100, 200],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#usertoolbar',
        onDblClickRow:function(row, $element){
            ME.vm.userUpdate();
        },

    columns: [
        {radio:true},
        {field: 'id',title: 'ID', width:'2%', sortable:true, searchable:true},
        {field: 'code', title: lang['code'], width:'4%', sortable:true, searchable:true},
        {field: 'cname',title: lang['cname'],width:'6%', sortable:true, searchable:true},
        {field: 'userType',title: lang['userType'],width:'6%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value == 'super'){
                    return lang['superUser']
                }
                if(value == 'proj_user'){
                    return lang['projUser']
                }
                if(value == 'view_user'){
                    return lang['viewUser']
                }
            },
        },
        {field: 'isActive',title: lang['isActive'],width:'5%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                    return value>0?lang['true']:lang['false'];
            },
        },
        {field: 'validity',title: lang['validity'],width:'15%', sortable:true, searchable:true},
        {field: 'cellphone',title: lang['cellphone'],width:'10%', sortable:true, searchable:true},
        {field: 'email',title: lang['email'],width:'10%', sortable:true, searchable:true},
        {field: 'birthDate',title: lang['birthDate'],width:'8%', sortable:true, searchable:true},
        {field: 'address',title: lang['address'],width:'40%', sortable:true, searchable:true},
        {field: 'img',title: lang['img'],width:'10%', sortable:true, searchable:true},
        {field: 'projectId',title: lang['projectId'],width:'6%', sortable:true, searchable:true, 
            formatter:function(value, row, index){
                if(value>0){
                    return row.projectName+"("+row.projectCode+")";
                }
                return '';
            },
        },
        {field: 'addTime',title: lang['addTime'],width:'6%', sortable:true, searchable:true},
        {field: 'upTime',title: lang['upTime'],width:'6%', sortable:true, searchable:true},
        {field: 'upUser',title: lang['upUser'],width:'6%', sortable:true, searchable:true},

    ]

});

}

function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            projects : [],
            
            pickerOptions:{
                shortcuts:[
                    {
                        text:lang['oneDay'],
                        onClick:function onClick(picker){
                            var start=new Date();
                            start.setTime(start.getTime() + 3600*1000*24);
                            picker.$emit('pick', start);
                        }
                    },
                    {
                        text:lang['threeDay'],
                        onClick:function onClick(picker){
                            var start=new Date();
                            start.setTime(start.getTime() + 3600*1000*24*3);
                            picker.$emit('pick', start);
                        }
                    },
                    {
                        text:lang['sevenDay'],
                        onClick:function onClick(picker){
                            var start=new Date();
                            start.setTime(start.getTime() + 3600*1000*24*7);
                            picker.$emit('pick', start);
                        }
                    },
                    {
                        text:lang['fifteenDay'],
                        onClick:function onClick(picker){
                            var start=new Date();
                            start.setTime(start.getTime() + 3600*1000*24*15);
                            picker.$emit('pick', start);
                        }
                    },
                    {
                        text:lang['oneMonth'],
                        onClick:function onClick(picker){
                            var start=new Date();
                            start.setTime(start.getTime() + 3600*1000*24*30);
                            picker.$emit('pick', start);
                        }
                    },
                    {
                        text:lang['twoMonth'],
                        onClick:function onClick(picker){
                            var start=new Date();
                            start.setTime(start.getTime() + 3600*1000*24*60);
                            picker.$emit('pick', start);
                        }
                    },
                    {
                        text:lang['threeMonth'],
                        onClick:function onClick(picker){
                            var start=new Date();
                            start.setTime(start.getTime() + 3600*1000*24*90);
                            picker.$emit('pick', start);
                        }
                    },
                    {
                        text:lang['sixMonth'],
                        onClick:function onClick(picker){
                            var start=new Date();
                            start.setTime(start.getTime() + 3600*1000*24*30*6);
                            picker.$emit('pick', start);
                        }
                    },
                    {
                        text:lang['oneYear'],
                        onClick:function onClick(picker){
                            var start=new Date();
                            start.setTime(start.getTime() + 3600*1000*24*30*12);
                            picker.$emit('pick', start);
                        }
                    },
                    {
                        text:lang['twoYear'],
                        onClick:function onClick(picker){
                            var start=new Date();
                            start.setTime(start.getTime() + 3600*1000*24*30*24);
                            picker.$emit('pick', start);
                        }
                    },
                    {
                        text:lang['forever'],
                        onClick:function onClick(picker){
                            var start=new Date(0);
                            start.setTime(start.getTime());
                            picker.$emit('pick', start);
                        }
                    }
                ]
            },
            userType : [
                {
                    code : "super",
                    cname : lang['superUser']
                },
                {
                    code : "proj_user",
                    cname : lang['projUser']
                },

                {
                    code : "view_user",
                    cname : lang['viewUser']
                },
                
                
                
                
                
                
            ],
            dialogFormVisible:false,
            userBtnDisable:false,
            userDeleteBtnDisable:false,
            form: {
              title : lang['addInfo'],
              code: '',
              id: '',
              cname: '',
              userType : '',
              isActive : 1,
              validity:'',
              cellphone : '',
              email : '',
              birthDate : '',
              address: '' ,
              img  : '',
              projectId : ''
            },
            imgUpload:{
                multiple:false,
                disabled:false,
                url:ME.host + '/super/user/uploadImg',
                headers:{
                    api_token:ME.api_token,
                },
                auto:true,
                imgUrl:[],
            },

            modefiyPwdRule: {
                  code: [
                      { required: true, message: lang['codeRule'], trigger: 'blur' },
                      { min: 3, max: 25, message: lang['codeRule2'], trigger: 'blur' },
                      { validator: checks, trigger: 'blur' }
                  ],
                  userType : [
                    { required: true, message: lang['userTypeRule'], trigger: 'change' },
                    { validator: needCheckProject, trigger: 'change' },
                  ],
                  cname: [
                    { required: true, message: lang['checkCnameNote'], trigger: 'blur' },
                    { min: 1, max: 16, message: lang['cnameRule2'], trigger: 'blur' },
                    { validator: checkCname, trigger: 'blur' },
                  ],
                cellphone : [
                    { min: 0, max: 15, message: lang['cellPhoneRule'], trigger: 'blur' },
                ],
                email : [
                    { min: 0, max: 64, message: lang['emailRule'], trigger: 'blur' },
                ],
                address : [
                    { min: 0, max: 127, message: lang['addressRule'], trigger: 'blur' },
                ],
                projectId: [
                    {required: true, validator: checkProject, trigger: 'change' },
                ],

            },
            formLabelWidth: '120px',
        },
        created:function(){
            this.$http.get('project/list').then(function(res){
                this.projects = res.body;
                this.projects.unshift({id:0,cname:lang['none']});
            });
        },
        methods:{
            updateImg:function(imgName){
                if(imgName!='user.png'){
                    this.imgUpload.imgUrl = [{name:imgName,url:ME.imgHost + 'user_' + imgName}];
                    ME.vm.imgUpload.disabled = true;
                }
                if(!imgName){
                    this.imgUpload.imgUrl = [];
                    ME.vm.imgUpload.disabled = false;
                }
            },
            handleImgUpload:function(response, file, fileList){
                if(response.isOk){
                    ME.vm.form.img = response.fileName;
                    ME.vm.imgUpload.disabled = true;
                }
            },
            handleRemove:function(file, fileList){
                var fileName = '';
                if(file.response){
                    fileName = file.response.fileName;
                }else {
                    fileName = file.name;
                }
                ME.vm.$http.post(ME.host + '/super/user/deleteImg', {fileName:fileName}).then(function(rep){
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

            selectUser:function(){
                var a = $('#usertable').bootstrapTable('getSelections');
                if (!a || a.length<1){
                    this.$alert(lang['selectOne'], lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                    return false;
                }
                return a[0];
            },
            refresh:function(){
                $('#usertable').bootstrapTable('refresh');
            },
            userAdd:function(){
                util.emptyObj(ME.vm.form);
                this.dialogFormVisible = true;
                this.form.title = lang['addInfo'];
                this.form.isActive = "1";
                this.updateImg(false);
            },
            userDelete:function(){
                var row = this.selectUser();
                if(!row) return;
                this.$confirm(lang['userDeleteNotePre']+row.cname+lang['userDeleteNoteAfter'],lang['prompt'],{ }).then(function() {

                    ME.vm.$http.post('super/user/delete', row).then(function(res){
                    var result = res.body;
                    if(result.isOk){
                        this.refresh();
                        this.$alert(lang['deleteSuccess'], lang['prompt']);
                    }else {
                        this.$alert(lang['deleteFail']+result.msg, lang['prompt'], {
                            confirmButtonText: lang['confirm']
                        });
                    }
                        ME.vm.userDeleteBtnDisable = false;

                    });
                    ME.vm.userDeleteBtnDisable = true;

            }).catch(function(){

                });

            },
            userUpdate:function(){
                var row = this.selectUser();
                if(!row) return;
                util.emptyObj(ME.vm.form);
                this.dialogFormVisible = true;
                this.form.title = lang['updateInfo'];
                util.deepCopy(row,ME.vm.form,false);
                ME.vm.form.isActive>0?ME.vm.form.isActive='1':ME.vm.form.isActive='0';
                ME.vm.form.validity=new Date(ME.vm.form.validity.replace(/-/g,  "/"));
                this.updateImg(row.img);
            },
            resetPwd : function(){
                var row = this.selectUser();
                if(!row) return;
                this.$confirm(lang['resetPwdNotePre']+row.cname+lang['resetPwdMid']+row.code+lang['resetPwdAfter'],lang['prompt'],{ }).then(function()  {
                    var params = {id:row.id,newPassword:row.code};
                    ME.vm.$http.post('super/user/resetPwd', params).then(function(res){
                        var result = res.body;
                        if(result.isOk){
                            this.$alert(lang['resetPwdSuccess'], lang['prompt']);
                        }else {
                            this.$alert(lang['resetPwdFail']+result.msg, lang['prompt'], {
                                confirmButtonText: lang['confirm']
                            });
                        }
                    });
                }).catch(function(){

                });
            },
            submitForm:function (formName) {
                this.$refs[formName].validate(function(valid){
                  if (valid) {
                      var url = 'super/user/';
                      url+= (ME.vm.form.id>0?'update':'add');
                      var msg = (ME.vm.form.id>0?lang['update']:lang['add']);
                      ME.vm.form.id>0?'':ME.vm.form.pswd=ME.vm.form.code;
                      var params = {};
                      util.deepCopy(ME.vm.form,params);
                      
                      if(ME.vm.form.validity){
                          var date = ME.vm.form.validity.getTime();
                          
                          params.validity = date;
                      }
                      
                      if(ME.vm.form.birthDate){
                          var date = new Date(ME.vm.form.birthDate);
                          params.birthDate = date.Format('yyyy-MM-dd');
                      }
                      ME.vm.$http.post(url, params).then(function(res){
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
                          ME.vm.userBtnDisable = false;
                      });
                      ME.vm.userBtnDisable = true;
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

