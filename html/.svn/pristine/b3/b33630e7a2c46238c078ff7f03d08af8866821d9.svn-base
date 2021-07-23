/**
 * Created by LiuTao on 2017/6/28 0028.
 */


$(function(){
    init();
});

function init(){
    // pageInit();
    // dataInit();
    vueInit();
    eventListenerInit();
}

function dataInit(){
    $.ajax({
        url:'./data/menus.js',
        method:'get',
        dataType:'json',
        async:false,
        success:function(res){
            ME.menus = res;
        }
    });
}

function eventListenerInit(){
    $(window).on('resize', function () {
        ME.vm.initFrameHeight();
    });
}

function validatePwd (rule, value, callback) {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          // if (this.ruleForm2.checkPass !== '') {
          //   this.$refs.ruleForm2.validateField('checkPass');
          // }
      callback();
    }
}

function validateNewPwd (rule, value, callback) {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (ME.vm.form.checkPwd !== '') {
            ME.vm.$refs.form.validateField('checkPwd');
        }
      callback();
    }
}


             
      
function  validateCheckPwd  (rule, value, callback) {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== ME.vm.form.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
    }
}

/**
 * 初始化Vue
 */
function vueInit(){


    Vue.http.options.emulateJSON = true;
    Vue.http.options.root = ME.host;
    Vue.http.options.xhr = { withCredentials: true };
    Vue.http.headers.common.api_token = ME.api_token;


    ME.vm = new Vue({
        el :　"#app",
        data : {
            sysName : '全迹科技',
            collapsed : false,
            uniqueOpen: true,
            dialogFormVisible:false,
            user: ME.user,
            photoPath:'',
            imgUpload:{
                multiple:false,
                url:ME.host + '/super/user/uploadImg',
                headers:{
                    api_token:ME.api_token, 

                },
                auto:true,
                dialogVisible:false,
                imgUrl:'',
            },
            form: {
                id: ME.user.id,
              pwd: '',
              newPwd: '',
              checkPwd: '',
            },
            modefiyPwdRule: {
                  pwd: [
                    { validator: validatePwd, trigger: 'blur' }
                  ],
                  newPwd: [
                    { validator: validateNewPwd, trigger: 'blur' }
                  ],
                  checkPwd: [
                    { validator: validateCheckPwd, trigger: 'blur' }
                  ]
            },
            dialogPersonVisible : false,
            form1 : {
                id: ME.user.id,
                api_token:ME.api_token,
                code:ME.user.code,
                cname :  ME.user.cname,
                cellphone :  ME.user.cellphone,
                email :  ME.user.email,
                birthDate :  ME.user.birthDate,
                address :  ME.user.address,
                img :  ME.user.img
            },
            modefiyPreRule : {
                cname: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' },

                ],
                cellphone: [
                    { required: true, message: '请输入电话', trigger: 'blur' },
                    { min: 0, max: 15, message: '长度在 0 到 15个字符', trigger: 'blur' },

                ],
                email : [
                    { min: 0, max: 64, message: '长度在 0 到 64个字符', trigger: 'blur' },
                ],
                address : [
                    { min: 0, max: 127, message: '长度在 1 到 127个字符', trigger: 'blur' },
                ]
            },
            formLabelWidth: '120px',
            activeIndex: "1",
            openedMenu:[],
            defaultIcon: 'el-icon-circle-check',
            menus: [],
            currentMenu: null,
            defaultNagTab: 'home',
            nagTabs : [],
            frameHeight:400,
            footerMsg : UBIT.footerMsg
        },
        created:function(){
            //获取所有菜单
            this.$http.get('tplatform/menu/list').then(function(res){
                this.menus = res.body;
                //默认展开第一个福彩的
                if(this.menus && this.menus.length>0){
                    var menu = this.menus[0];
                    this.activeIndex = menu.code;
                    if(menu.children && menu.children.length>0){
                        this.openedMenu = [menu.code];
                    }
                }
            });
            //默认嵌入home页面
            this.nagTabs.push({id:0, cname:"首页", code:"home",path:"home.html", closable:false});
            //frame自适应屏幕的高度
            this.initFrameHeight();
            if(this.user.img){
                this.updateImg(this.user.img);
                this.imgUpload.dialogVisible = true;
            }else {
                this.updateImg('user.png');
            }

        },
        methods : {
            handlePictureCardPreview:function(file){
                this.imgUpload.imgUrl = file.url;
                this.imgUpload.dialogVisible = true;
            },
            updateImg:function(imgName){
                this.imgUpload.imgUrl = ME.imgHost + 'user_' + imgName;
                this.photoPath = ME.imgHost + 'user_' + imgName;
            },
            handleImgUpload:function(response, file, fileList){
                if(response.isOk){
                    ME.vm.form1.img = response.fileName;
                }
            },
            submitProfileForm:function(formName){
                this.$refs[formName].validate(function(valid){
                  if (valid) {
                    // alert('submit!');
                    ME.vm.form1.birthDate = new Date(ME.vm.form1.birthDate).Format("yyyy-MM-dd");
                    ME.vm.$http.post('super/user/updateProfile', ME.vm.form1).then(function(res){
                        var result = res.body;
                        if(result.isOk){
                            
                            //modify cookie
                             var userData = ME.vm.user;
                             userData.cname = ME.vm.form1.cname;
                             userData.cellphone = ME.vm.form1.cellphone;
                             userData.email = ME.vm.form1.email;
                             userData.birthDate = ME.vm.form1.birthDate;
                             userData.address = ME.vm.form1.address;
                             userData.img = ME.vm.form1.img;
                             
                             if(userData.img){
                                this.updateImg(userData.img);
                             }
                             localStorage.setItem('userData', JSON.stringify(userData));

                            this.$alert('个人信息修改成功！');

                            this.dialogPersonVisible = false;
                        }else {
                            this.$alert("个人信息修改失败！"+result.msg, '提示', {
                                  confirmButtonText: '确定'
                            });
                        }
                    })
                  } else {
                    ME.vm.$alert('您修改个人信息失败，请重新修改！', '提示', {
                      confirmButtonText: '确定'
                    });
                    return false;
                  }
                })
            },
            collapse : function(){
                this.collapsed = !this.collapsed;
            },
            nagdbclick:function(o, e){
                //TODO
                window.open(this.currentMenu.path);
            },
            goHome:function(){
                this.defaultNagTab = 'home';
            },
            showMenu: function(i,status){
                var div = this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i);
                div[0].style.display=status?'block':'none';
            },
            nagTabClick:function(nag){
                this.currentMenu = this.getMenuByCode(this.nagTabs, nag.name);
            },
            handleselect: function (menuCode) {
                return this.selectMenu(menuCode);
            },
            selectMenu:function(menuCode, e){
                this.currentMenu = this.getMenuByCode(this.menus, menuCode);
                //console.log(this.currentMenu);
                this.addTab(this.currentMenu);
            },
            logout:function(){
                this.$confirm("确认退出么?","提示",{

                }).then(function() {

                    UBIT.logout();
                    window.location.href= UBIT.selfHost + '/login/index.html';

                }).catch(function()  {

                });
            },

            projectManage:function(){
                //跳转
                window.location.href = UBIT.selfHost + '/super/index/';
            },
            pwd:function(){
                this.dialogFormVisible = true;
            },
            submitForm:function (formName) {
                this.$refs[formName].validate(function(valid){
                  if (valid) {
                    // alert('submit!');
                    ME.vm.$http.post('super/user/changePwd', ME.vm.form).then(function(res){
                        var result = res.body;
                        if(result.isOk){
                            this.$alert('密码修改成功！');
                            this.dialogFormVisible = false;
                        }else {
                            this.$alert("密码修改失败！"+result.msg, '提示', {
                                  confirmButtonText: '确定'
                            });
                        }
                    })
                  } else {
                    ME.vm.$alert('您修改密码失败，请重新修改！', '提示', {
                      confirmButtonText: '确定'
                    });
                    return false;
                  }
                })
              },
              resetForm:function(formName) {
                this.$refs[formName].resetFields()
              },
            getMenuByCode:function(menu, menuCode){
                for(var i=0;i<menu.length;i++){
                    var fmenu = menu[i];
                    if(fmenu.children){
                        var result = this.getMenuByCode(fmenu.children, menuCode);
                        if(result){
                            return result;
                        }
                    }else if(fmenu.code==menuCode){
                        return fmenu;
                    }
                }
                return null;
            },
            initFrameHeight:function(){
                this.screenHeight= document.documentElement.clientHeight;
                this.frameHeight = this.screenHeight - 195;
            },
            addTab:function(menu) {
                var flag = false;
                this.nagTabs.forEach(function(tab, index){
                    if(tab.code == menu.code){
                        flag = true;
                    }
                });
                if(!flag){
                    menu.closable = true;
                    this.nagTabs.push(menu);
                }
                this.defaultNagTab = menu.code;
            },
            removeTab(targetName) {
                var tabs = this.nagTabs;
                var activeName = this.defaultNagTab;
                if (activeName === targetName) {
                    tabs.forEach(function(tab, index)  {
                        if (tab.code === targetName) {
                            var nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.code;
                            }
                        }
                    });
                }

                this.defaultNagTab = activeName;
                for(var i=0;i<tabs.length;i++){
                    if(tabs[i].code === targetName){
                        break;
                    }
                }
                this.nagTabs.splice(i,1);

            }

        }
    })


}



