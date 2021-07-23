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
        if (value === '') {
          callback(new Error(lang['codeRule']));
          return;
        }

        var projects = $('#projecttable').bootstrapTable('getData');
        var id = ME.vm.form.id;
        var flag = true;
        projects.forEach(function(project){
            if(value.toLowerCase() == project.code.toLowerCase() && id!=project.id){
                callback(new Error(lang['checksNote2']));
                return;
            }
        });
        if(!flag) return;
        ME.vm.form.code=value.toLowerCase();
        callback();
}


function checkCname (rule, value, callback) {
    if (value === '') {
        callback(new Error(lang['cnameRule']));
        return;
    }

    var projects = $('#projecttable').bootstrapTable('getData');
    var id = ME.vm.form.id;
    projects.forEach(function(project){
        if(value == project.cname && id!=project.id){
            callback(new Error(lang['checkCnameNote2']));
            return;
        }
    });
    callback();
}







function pageInit(){
    var self = this;
    $('#projecttable').bootstrapTable({
        url:ME.host+'/project/list',
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
        toolbar:'#projecttoolbar',
        responseHandler:(res) => {
            self.projectList = res
            return res;
        },
        onDblClickRow:function(row, $element){
            ME.vm.projectUpdate();
        },
        rowStyle:function(row, index){
          if(row.status=='cancel'){
            return {
              css:{"color": "#c7bdbd"}
            };
          }
          return {
              css:{"color": "#333"}
            };
        },

    columns: [
        {radio:true},
        {field: 'id',title: 'ID', width:'2%', sortable:true, searchable:true},
        {field: 'code', title: '编码', width:'5%', sortable:true, searchable:true,formatter:function(value,row,index){
            if(self.natList.includes(value)){
                return `<a href="http://${value}.ubitraq.com" target="_blank">${value}</a>`;
            }else{
                return `<a href="#" class="nat-offline" onclick="return false">${value}</a>`;
            }

        }},

        {field: 'cname',title: lang['cname'],width:'6%', sortable:true, searchable:true,
        formatter:function(value,row,index){
            return '<a onClick="projectManage('+row.id+')">'+value+'</a>'
            }
        },

        {field: 'projType',title: lang['projType'],width:'6%', sortable:true, searchable:true},

        {field: 'status',title: lang['status'],width:'6%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                    if(value=='init'){
                        return lang['init'];
                    }
                    if(value=='plan'){
                        return lang['plan'];
                    }
                    if(value=='exec'){
                        return lang['exec'];
                    }
                    if(value=='cancel'){
                        return lang['cancel'];
                    }
                    if(value=='close'){
                        return lang['close'];
                    }
                    return lang['unknown'];
            },
        },
        {field: 'managerId',title: lang['managerId'],width:'6%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value>0){
                    for(var i=0;i<ME.vm.users.length;i++){
                        if(value == ME.vm.users[i].id){
                            return ME.vm.users[i].cname;
                        }
                    }
                }
                return value;
            },
        },
        {field: 'userId',title: lang['userId'],width:'6%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value>0){
                    for(var i=0;i<ME.vm.users.length;i++){
                        if(value == ME.vm.users[i].id){
                            return ME.vm.users[i].cname;
                        }
                    }
                }
                return value;
            },
        },

        {field: 'tel',title: lang['cellPhone'],width:'10%', sortable:true, searchable:true},

        {field: 'email',title: lang['email'],width:'10%', sortable:true, searchable:true},
        {field: 'address',title: lang['address'],width:'25%', sortable:true, searchable:true},
        {field: 'company',title: lang['company'],width:'10%', sortable:true, searchable:true},

        {field: 'logo', title: lang['logo'], width:'5%', sortable:true, searchable:true},
        {field: 'description',title: lang['description'],width:'6%', sortable:true, searchable:true},

        {field: 'addTime',title: lang['addTime'],width:'6%', sortable:true, searchable:true},
        {field: 'addUser',title: lang['addUser'],width:'6%', sortable:true, searchable:true},
        {field: 'upTime',title: lang['upTime'],width:'6%', sortable:true, searchable:true},
        {field: 'upUser',title: lang['upUser'],width:'6%', sortable:true, searchable:true},

    ]

});

}

function projectManage(projectId){

    ME.vm.$confirm(lang['projectManageNotePre'] +
        lang['projectManageNoteAfter'],lang['prompt'],{ }).then(function() {

        var params = {projectId:projectId,api_token:ME.api_token};
        ME.vm.$http.post('super/user/changeSuper2Admin', params).then(function(res){
            var result = res.body;
            if(result.isOk){

                var userData = result.entity;
                localStorage.setItem('userData', JSON.stringify(userData));

                top.location.href='../index/';

            }else {
                ME.vm.$alert(lang['projectManageNote2']+result.msg, lang['prompt'], {
                    confirmButtonText: lang['confirm']
                });
            }
        });
    }).catch(function(){

    });
}


function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            noSubmit: false,
            users : [],
            proj_users:[],
            managers:[],
            natList:[],
            isShow:false,
            pixelLength:0,
            status : [
                {
                    code : "init",
                    cname : lang['init']
                },
                {
                    code : "plan",
                    cname : lang['plan']
                },
                {
                    code : "exec",
                    cname : lang['exec']
                },
                {
                    code : "cancel",
                    cname : lang['cancel']
                },
                {
                    code : "close",
                    cname : lang['close']
                }
            ],
            dialogFormVisible:false,
            projectBtnDisable:false,
            projectDeleteBtnDisable:false,
            form: {
              title : lang['addInfo'],
              code: '',
              id: '',
              cname: '',
              projectType : '',
              status : "",
              managerId:0,
              userId:0,
              tel : '',
              email : '',
              company : '',
              description: '' ,
              address: '' ,
              img  : '',
              projectId : '',
              addUser : ""
            },
            imgUpload:{
                multiple:false,
                disabled:false,
                url:ME.host + '/project/uploadImg',
                headers:{
                    api_token:ME.api_token,
                },
                auto:true,
                imgUrl:[],
            },
            modefiyPwdRule: {
                  code: [
                      { required: true, message: lang['codeRule'], trigger: 'blur' },
                      { min: 3, max: 32, message: lang['codeRule2'], trigger: 'blur' },
                      { pattern: /^[0-9a-z]{3,32}$/, message: lang['codeRule2']},
                      { validator: checks, trigger: 'blur' }
                  ],
                  cname: [
                      { required: true, message: lang['cnameRule'], trigger: 'blur' },
                      { validator: checkCname, trigger: 'blur' },
                  ],
                  managerId : [
                      { required: true, message: lang['managerIdRule'], trigger: 'change' },
                  ]
            },
            formLabelWidth: '120px',
            importDataForm:{
                title:'导入数据',
                visible:false,
                projects:[],
                data:{},
                file:null
            },
            exportsDataForm:{
                title:'导出数据',
                visible:false,
                projects:[]
            },
            projectList:[]
        },
        created:function(){
            var self = this;
            this.$http.get('super/user/list').then(function(res){
                this.users = res.body;
                this.users.forEach(function(user){
                    if(user.isActive<1) return;
                    user.id += '';
                  if(user.userType=='proj_user'){
                     ME.vm.proj_users.push(user);
                  }else {
                     ME.vm.managers.push(user);
                  }
                });
                self.$http.get("project/natList").then((res) => {
                    if(!res || !res.ok){
                        return;
                    }
                    self.natList = res.body;
                    pageInit.call(self);
                })

            });
        },
        methods:{
            updateImg:function(imgName){
                if(imgName){
                    this.imgUpload.imgUrl = [{name:imgName,url:UBIT.getImgSrc('project' ,imgName)}];
                    ME.vm.imgUpload.disabled = true;

                    var img=new Image();
                    img.src=UBIT.getImgSrc('project' ,imgName);
                    img.onload=function() {
                        ME.vm.pixelWidth = this.width;
                        ME.vm.pixelLength = this.height;
                    };

                }else{
                    this.imgUpload.imgUrl = [];
                    ME.vm.imgUpload.disabled = false;
                }
            },
            selectproject:function(){
                var a = $('#projecttable').bootstrapTable('getSelections');
                if (!a || a.length<1){
                    this.$alert(lang['selectOne'], lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                    return false;
                }
                return a[0];
            },
            refresh:function(){
                $('#projecttable').bootstrapTable('refresh');
            },
            projectAdd:function(){
                util.emptyObj(ME.vm.form);
                this.isShow=false;
                this.dialogFormVisible = true;
                this.form.title = lang['addInfo'];
                this.updateImg();
            },
            projectUpdate:function(){
                var row = this.selectproject();
                this.isShow=true;
                if(!row) return;
                this.dialogFormVisible = true;
                this.form.title = lang['updateInfo'];
                util.deepCopy(row,ME.vm.form,1);
                this.updateImg(ME.vm.form.logo);
            },
            projectDelete:function(){
                var row = this.selectproject();
                if(!row) return;
                this.$confirm(lang['projectDeleteNote'],lang['prompt'],{ }).then(function() {

                    ME.vm.$http.post('project/del', {id:row.id,code:row.code}).then(function(res){
                    var result = res.body;
                    if(result.isOk){
                        this.refresh();
                        this.$alert(lang['deleteSuccess'], lang['prompt']);
                    }else {
                        this.$alert(lang['deleteFail']+result.msg, lang['prompt'], {
                            confirmButtonText: lang['confirm']
                        });
                    }
                        ME.vm.projectDeleteBtnDisable = false;
                    });
                    ME.vm.projectDeleteBtnDisable = true;
            }).catch(function(){

                });

            },
            projectManage:function(){
                var row = this.selectproject();
                if(!row) return;
                projectManage(row.id);

            },

            handleImgUpload:function(response, file, fileList){
                if(response.isOk){
                    ME.vm.form.img = response.fileName;
                    ME.vm.imgUpload.disabled = true;
                    var img=new Image();
                    img.src= UBIT.getImgSrc('project' ,response.fileName);
                    img.onload=function() {

                        ME.vm.pixelWidth = this.width;
                        ME.vm.pixelLength = this.height;


                    };
                }
            },

            beforeAvatarUpload:function beforeAvatarUpload(file) {
                var isJPG = file.type === 'image/jpeg';
                var isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error(lang['beforeAvatarUploadNote']);
                }
                if (!isLt2M) {
                    this.$message.error(lang['beforeAvatarUploadNote2']);
                }
                return isJPG && isLt2M;
            },

            handleRemove:function(file, fileList){
                if(!file) return ;

                var fileName = '';
                if(file.response){
                    fileName = file.response.fileName;
                }else {
                    fileName = file.name;
                }
                ME.vm.$http.post(ME.host + '/project/deleteImg', {fileName:fileName}).then(function(rep){
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
            submitForm:function (formName) {
                this.$refs[formName].validate(function(valid){
                  if (valid) {
                      var url = 'project/save';
                      var msg = (ME.vm.form.id>0?lang['update']:lang['add']);
                      ME.vm.form.id>0?'':ME.vm.form.pswd=ME.vm.form.code;

                      var params = UBIT.deepCopy(ME.vm.form);

                      delete params['upTime'];
                      if(params.img) params.logo = params.img;
                      params.projType = 'normal';

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
                          ME.vm.projectBtnDisable = false;
                      });
                          ME.vm.projectBtnDisable = true;
                  } else {
                    ME.vm.$alert(lang['enterError'], lang['prompt'], {
                      confirmButtonText: lang['confirm']
                    });
                    return false;
                  }
                })
            },
            startExportsData(){
                this.exportsDataForm.visible = true
            },
            exportsData(){
                this.$http.post(ME.host + '/project/exportsData',{
                    projects:this.exportsDataForm.projects
                }).then((res) => {
                    if(!res || !res.body || !res.body.isOk){
                        return this.$message.error("导出失败!")
                    }
                    const downloadFilename = `${this.exportsDataForm.projects.join('_') || 'ubiData'}.json`
                    this.exportsDataForm.visible = false;
                    this.exportsDataForm.projects = [];
                    const blob = new Blob([JSON.stringify(res.body.data)])
                    var reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = (e) => {
                        const a = document.createElement('a');
                        a.download = downloadFilename;
                        a.href = e.target.result;
                        $("body").append(a);
                        a.click();
                        $(a).remove();
                    }
                })
            },
            importData(){
                try{
                    const fileInput = document.getElementById("importDataInput")
                    fileInput.oninput = async (e) => {
                        const [file] = e.target.files;
                        const reader = new FileReader()
                        reader.onload = (e) => {
                            // console.log(e.target.result)
                            // const text = await file.text();
                            const data = JSON.parse(e.target.result)
                            const projects = Object.keys(data).filter(o => o !== 'basic')
                            this.importDataForm.data = data
                            this.importDataForm.file = file
                            this.importDataForm.projects = projects.map(o => {
                                return {
                                    source:o,
                                    target:''
                                }
                            });
                            this.importDataForm.visible = true
                        }
                        reader.readAsText(file);

                    }
                    fileInput.click()
                }catch(e){
                    console.error(e)
                    this.$message.error('解析失败')
                }

            },
            submitImportData(){
                this.noSubmit = true;
                const projects = this.importDataForm.projects
                for(let i=0;i<projects.length;i++){
                    const newProjectName = projects[i].target;
                    if(!newProjectName || !/[a-zA-Z0-9]+/.test(newProjectName)){
                        return this.$message.error(`项目${projects[i].source}的新项目编码设置失败`)
                    }
                }
                const formData = new FormData();
                formData.append('file',this.importDataForm.file)
                formData.append("projects",JSON.stringify(projects))
                this.$http.post(ME.host + '/project/importData',formData,{
                    headers: {
						'Content-Type': 'multipart/form-data'
					}
                }).then((res) => {
                    this.importDataForm.visible = false;
                    if(res && res.body && res.body.isOk){
                        this.$message.success("数据导入成功");

                    }else{
                        this.$message.error("数据导入失败")
                    }
                    this.noSubmit = false;
                    this.importDataClose()
                })
            },
            importDataClose(){
                const fileInput = document.getElementById("importDataInput")
                fileInput.value = '';
                this.refresh()
            }
        },
    });

}
