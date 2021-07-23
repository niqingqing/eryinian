/**
 * Created by LiuTao on 2017/7/03 0028.
 */



$(function(){
    init();
});

function init(){
    vueInit();
}

function checkCode (rule, value, callback) {

        if (value === '') {
          callback(new Error('请输入名称'));
          return;
        }

        var outliers = $('#outlier').bootstrapTable('getData');
        var id = ME.vm.form.id;
        var flag = true;
        outliers.forEach(function(outlier){
            if(value == outlier.cname && id!=outlier.id){
                callback(new Error('您的离群组和('+outlier.id+')冲突，请确保唯一'));
                return;
            }
        });
        if(!flag) return;
        callback();
}
function pageInit(){
    var Vue = window.Vue;
    $('#outlier').bootstrapTable({
        url:ME.host+'/moreMonitor/list?projectCode='+ME.user.projectCode,
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
        pageList:[2, 10, 25, 50, 100, 200],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#outliertoolbar',
        onDblClickRow:function(row, $element){
            ME.vm.outlierUpdate();
        },
        onLoadSuccess:function(data){
            ME.vm.isGraps=data;
        //     if(!data||data.length<1) return;
        //     var isNotGrapCodes=[];
        //     for(var i=0;i<data.length;i++){
        //         var item=data[i];
        //         for(var j=0;j<item.tags.length;j++){
        //             isNotGrapCodes.push(item.tags[j].code);
        //         }
        //     }
        //     ME.vm.isNotGrap(isNotGrapCodes);
        },

    columns: [
        {checkbox:true ,width:'2%'},
        {field: 'id',title: 'ID', width:'2%', sortable:true,  searchable:true},
        {field: 'cname', title: '名称', width:'5%', sortable:true, searchable:true},
        {field: 'model',title: '监管模式',width:'6%', sortable:true,  searchable:true,
            formatter:function(value){
                var showText='';
                switch(value){
                    case 'moreMonitorOne':showText='主监';break;
                    case 'moreMonitorAll':showText='互监';break;
                }
                return showText;
            }
        },
        {field: 'watchman',title: '被监人',width:'6%', sortable:true, searchable:true},
        {field: 'distance',title: '距离(M)',width:'10%', sortable:true, visible:false,searchable:true},
        {field: 'startTime',title: '开始时间',width:'6%', sortable:true, searchable:true},
        {field: 'endTime',title: '结束时间',width:'6%', sortable:true, searchable:true},
        {field: 'color',title: '颜色',width:'10%', sortable:true, visible:false,searchable:true},
    ]

});

}

function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            outlierBtnDisable:false,
            outlierDeleteBtnDisable:false,
            dialogFormVisible:false,
            disable:false,
            projTags:[],
            isGraps:[],
            tagCodes:[],
            form: {
              action: '',
              title : '添加离群组',
              id: '',
              cname: '',
              tags : [],
              model:'moreMonitorOne',
              watchman:'',
              distance:3,
              datetimeRange:[new Date(),new Date()],
              color:'red'
            },
            modefiyPwdRule: {
                cname: [
                      { required: true, message: '名称必填', trigger: 'blur' },
                      { min: 0, max: 40, message: '长度不符合0-40字符', trigger: 'blur' },
                      { validator: checkCode, trigger: 'blur' }
                  ],
            },
            formLabelWidth: '120px',
        },
        created:function(){
            this.$http.get('project/tag/list?projectId='+ME.user.projectId).then(function(res){
                this.projTags = res.body;
                    pageInit();
                });
            },
        methods:{

            // isNotGrap:function(inGroupDatas){
            //     if(!inGroupDatas||inGroupDatas.length<1) return;
            //     var isNotGrapTags=this.projTags.filter(function(tag){
            //         if(inGroupDatas.indexOf(tag.code)<0) return true;
            //     });
            //     this.isNotAtherGrapTags
            // },
            selectoutlier:function(){
                var a = $('#outlier').bootstrapTable('getSelections');
                if (!a || a.length<1){
                    this.$alert('请选择一行记录！', '提示', {
                        confirmButtonText: '确定'
                    });
                    return false;
                }
                return a;
            },
            refresh:function(){
                $('#outlier').bootstrapTable('refresh');
            },
            getTagsByCodes:function(){
                if(!this.tagCodes||this.tagCodes<1) return;
                ME.vm.form.tags=[];
                ME.vm.form.tags=this.projTags.filter(function(item){
                    for(var i=0;i<ME.vm.tagCodes.length;i++){
                        var code=ME.vm.tagCodes[i];
                        if(item.code==code) return true;
                    }
                });

            },
            checkIsInOtherGroup:function(currentGid){
                var inOtherGoup=[];
                for(var i=0;i<ME.vm.form.tags.length;i++){
                    var tag=ME.vm.form.tags[i];
                    for(var j=0;j<ME.vm.isGraps.length;j++){
                        var item=ME.vm.isGraps[j];
                        if(currentGid==item.id) continue;
                        for(var z=0;z<item.tags.length;z++){
                            if(tag.code==item.tags[z].code) 
                            inOtherGoup.push({groupName:item.cname,code:tag.code});
                        }
                    }
                }
                return inOtherGoup;
            },
            outlierAdd:function(){
                UBIT.emptyObj(ME.vm.form);
                this.tagCodes=[];
                this.dialogFormVisible = true;
                this.disable = false;
                this.form.title = "添加信息";
                this.form.action = "add";
                this.form.model='moreMonitorOne';
            },
            outlierUpdate:function(){
                var rows = this.selectoutlier();
                if(!rows) return;
                if(rows.length>1){
                     this.$alert('只能选择一行记录进行修改！', '提示', {
                        confirmButtonText: '确定'
                    });
                    return false;
                }
                UBIT.emptyObj(ME.vm.form);
                this.tagCodes=[];
                this.dialogFormVisible = true;
                this.disable = true;
                this.form.title = "修改信息";
                UBIT.deepCopy(rows[0],ME.vm.form,1);
                if(ME.vm.form.tags&&ME.vm.form.tags.length>0){
                    for(var i=0;i<ME.vm.form.tags.length;i++){
                        var item=ME.vm.form.tags[i];
                        this.tagCodes.push(item.code);
                    }
                    // ME.vm.form.tags=[];
                    
                }
                this.form.action = 'update';
            },
            outlierDelete:function(){
                var rows = this.selectoutlier();
                if(!rows) return;
                if(rows.length>1){
                    this.$alert('只能选择一行记录进行修改！', '提示', {
                       confirmButtonText: '确定'
                   });
                   return false;
               }
                var id = rows[0].id;
                this.$confirm("确认删除么？","提示",{ }).then(function()  {

                    ME.vm.$http.post('moreMonitor/delete', {id:id}).then(function(res){
                    var result = res.body;
                    if(result.isOk){
                        this.refresh();
                        this.$alert("删除成功！", '提示');
                    }else {
                        this.$alert("删除失败！"+result.msg, '提示', {
                            confirmButtonText: '确定'
                        });
                    }
                        ME.vm.simDeleteBtnDisable = false;
                });
                    ME.vm.simDeleteBtnDisable = true;
            }).catch(function(){

                });

            },
            submitForm:function (formName) {

                var formModel = ME.vm.$refs[formName];
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                      var url = 'moreMonitor/';
                      var msg= '';
                      var type=ME.vm.form.action;
                      switch(type){
                          case 'add' :url+='add';
                          msg+='添加离群组';break;
                          case 'update': url+='update';
                          msg+='更新离群组';break;
                      }
                      var params = UBIT.deepCopy(ME.vm.form);
                      delete params.action;
                      delete params.title;
                        //   检查是否存在于其他群组
                      var status=ME.vm.checkIsInOtherGroup(params.id);
                      if(status.length>0){
                      var text='标签'+status[0].code+'已存在于'+status[0].groupName+'群组，是否继续?';
                      }
                      var showMsg=text?text:'确认'+msg+'吗？'; 
                      ME.vm.$confirm(showMsg, '提示', {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}).then(() => {
                        ME.vm.$http.post(url, params).then(function(res){
                            var result = res.body;
                            if(result.isOk){
                                ME.vm.refresh();
                                ME.vm.dialogFormVisible = false;
                                ME.vm.$alert(msg+"成功！", '提示');
                            }else {
                                ME.vm.$alert(msg+"失败！"+result.msg, '提示', {
                                    confirmButtonText: '确定'
                                });
                            }
                            ME.vm.tagBtnDisable = false;
                        });
                      }).catch(() => {
                      return false;         
                      });
                      ME.vm.tagBtnDisable = true;
                  } else {
                    ME.vm.$alert('您输入的有错误，请注意查看！', '提示', {
                      confirmButtonText: '确定'
                    }); 
                    return false;
                  }
                })
              },
        },
    });

}
