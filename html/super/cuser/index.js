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
          callback(new Error(lang['checksEnterContent']));
          return;
        }

        var users = $('#usertable').bootstrapTable('getData');
        var id = ME.vm.form.id;
        users.forEach(function(user){
            if(value == user.unionid && id!=user.id){
                callback(new Error(lang['checksNotePre']+user.nickname+lang['checksNoteAfter']));
                return;
            }
        });
        callback();
}




function pageInit(){

    $('#usertable').bootstrapTable({
        url:ME.host+'/app/user/list',
        method:'get',
        search:true,
        showRefresh:true,
        idField:'id',
        uniqueId:'id',
        clickToSelect:true,
        // height:700,
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
        {field: 'unionid', title: 'UNIONID', width:'4%', sortable:true, searchable:true},
        {field: 'openid',title: 'OPENID',width:'6%', sortable:true, searchable:true},
        {field: 'nickname',title: lang['nickname'],width:'6%', sortable:true, searchable:true},
        {field: 'sex',title: lang['sex'],width:'6%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                return value==1?lang['male']:lang['female'];
            },
        },
        {field: 'province',title: lang['province'],width:'6%', sortable:true, searchable:true},
        {field: 'city',title: lang['city'],width:'6%', sortable:true, searchable:true},
        {field: 'country',title: lang['country'],width:'6%', sortable:true, searchable:true},
        {field: 'privilege',title: lang['privilege'],width:'6%', sortable:true, searchable:true},
        {field: 'phone',title: lang['phone'],width:'6%', sortable:true, searchable:true},
        {field: 'email',title: lang['email'],width:'6%', sortable:true, searchable:true},
        {field: 'address',title: lang['address'],width:'6%', sortable:true, searchable:true},
        {field: 'isActive',title: lang['isActive'],width:'6%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                return value==1?lang['true']:lang['false'];
            },
        },
        {field: 'addTime',title: lang['addTime'],width:'6%', sortable:true, searchable:true},
    ]

});

}

function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            dialogFormVisible:false,
            userBtnDisable:false,
            userDeleteBtnDisable:false,


            form: {
              unionid:'',
              nickname: '',
              openid:'',
              sex : 1,
              isActive : 1,
              address: '' ,
              phone : '',
              email : '',
              img  : '',
              id: ''
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
                unionid: [
                    { required: true, message: lang['unionidRule1'], trigger: 'blur' },
                    { min: 3, max: 120, message: lang['unionidRule2'], trigger: 'blur' },
                    { validator: checks, trigger: 'blur' }
                ],
                  nickname: [
                      { required: true, message: lang['nicknameRule1'], trigger: 'blur' },
                      { min: 3, max: 25, message: lang['nicknameRule2'], trigger: 'blur' },
                  ],
                phone : [
                    { min: 0, max: 15, message: lang['phoneRule'], trigger: 'blur' },
                ],
                email : [
                    { min: 0, max: 64, message: lang['emailRule'], trigger: 'blur' },
                ],
                address : [
                    { min: 0, max: 127, message: lang['addressRule'], trigger: 'blur' },
                ]

            },
            formLabelWidth: '120px',
        },

        created:function(){

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
                this.form.isActive = "1";
                this.form.sex =  "1";
                this.updateImg(false);
            },
            userDelete:function(){
                var row = this.selectUser();
                if(!row) return;
                this.$confirm(lang['userDeleteNote'] +"“"+row.nickname+"”？",lang['prompt'],{ }).then(function() {

                    ME.vm.$http.post('app/user/del', row).then(function(res){
                    var result = res.body;
                    if(result.isOk){
                        this.refresh();
                        this.$alert(lang['userDeleteSuccess'], lang['prompt']);
                    }else {
                        this.$alert(lang['userDeleteFail']+result.msg, lang['prompt'], {
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
                //this.form.title = "修改信息";
                util.deepCopy(row,ME.vm.form,false);
                ME.vm.form.isActive>0?ME.vm.form.isActive='1':ME.vm.form.isActive='0';
                ME.vm.form.sex>0?ME.vm.form.sex='1':ME.vm.form.sex='0';
                this.updateImg(row.img);
            },
            resetPwd : function(){
                var row = this.selectUser();
                if(!row) return;
                this.$confirm(lang['resetPwdNotePre'] + "“"+row.nickname+"”" + lang['resetPwdNoteAfter'],lang['prompt'],{ }).then(function()  {
                    var params = {id:row.id,newPassword:123456};
                    ME.vm.$http.post('app/user/resetPwd', params).then(function(res){
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
                      var url='app/user/save';
                      var msg = (ME.vm.form.id>0?lang['update']:lang['add']);
                      var params = {};
                      util.deepCopy(ME.vm.form,params);

                      delete params['upTime'];
                      delete params['addTime'];
                      delete params['addUser'];

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

