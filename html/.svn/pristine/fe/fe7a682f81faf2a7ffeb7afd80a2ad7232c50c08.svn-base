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
          callback(new Error('请输入编码'));
          return;
        }

        var sims = $('#sim').bootstrapTable('getData');
        var id = ME.vm.form.id;
        var flag = true;
    sims.forEach(function(sim){
            if(value == sim.num && id!=sim.id){
                callback(new Error('您的卡号2和('+sim.id+')冲突，请确保唯一'));
                return;
            }
        });
        if(!flag) return;
        callback();
}
function pageInit(){
    var Vue = window.Vue;
    $('#sim').bootstrapTable({
        url:ME.host+'/super/sim/list',
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
        toolbar:'#tagtoolbar',
        onDblClickRow:function(row, $element){
            ME.vm.simUpdate();
        },

    columns: [
        {checkbox:true ,width:'2%'},
        {field: 'id',title: 'ID', width:'2%', sortable:true,  searchable:true},
        {field: 'num', title: '卡号', width:'5%', sortable:true, searchable:true},
        {field: 'iccid',title: 'iccid号',width:'6%', sortable:true, visible:false, searchable:true},
        {field: 'anchor',title: '所属基站',width:'6%', sortable:true, searchable:true},
        {field: 'operator',title: '运营商',width:'6%', sortable:true, searchable:true},
        {field: 'supplier',title: '供应商',width:'6%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                var suppliers=ME.vm.suppliers;
                for(var i=0;i<suppliers.length;i++){
                    if(value==suppliers[i].cname){
                        return '<a href="'+suppliers[i].link+'" target="_blank">'+value+'</a>';
                    }
                }
                return value;
            }
        },
        {field: 'flowtotal',title: '流量总量(M)',width:'10%', sortable:true, visible:false,searchable:true},
        {field: 'flowused',title: '流量花费(M)',width:'10%', sortable:true, visible:false,searchable:true},
        {field: 'upTime',title: lang['upTime'],width:'6%', sortable:true, searchable:true},
        {field: 'upUser',title: lang['upUser'],width:'6%', sortable:true, searchable:true},
    ]

});

}

function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            anchors : [],
            suppliers:[
                {
                    cname:'百悟科技',
                    code:'baiwu',
                    link:'http://iot.hbsmservice.com:8088/iot_platform_client/'
                },
                {
                    cname:'极一科技',
                    code:'jiyi',
                    link:'http://ec.iot.10086.cn'
                },
            ],    //供应商
            operators:['移动','联通','电信'],
            simBtnDisable:false,
            simDeleteBtnDisable:false,
            dialogFormVisible:false,
            disable:false,
            form: {
              action: '',
              title : '添加手机卡',
              id: '',
              num: '',
              iccid : 0,
              anchor:'',
              operator:'',
              supplier:''
            },
            modefiyPwdRule: {
                num: [
                      { required: true, message: 'SIM必填', trigger: 'blur' },
                      { min: 0, max: 40, message: '长度不符合0-40字符', trigger: 'blur' },
                      { validator: checkCode, trigger: 'blur' }
                  ],
                operator : [
                      { required: true, message: '请选择运营商', trigger: 'change' },
                  ],
            },
            formLabelWidth: '120px',
        },
        created:function(){
            this.$http.get('super/sim/listBaseAnchor').then(function(res){
                this.anchors = res.body;
                    pageInit();
                });
            },
        methods:{
            selectsim:function(){
                var a = $('#sim').bootstrapTable('getSelections');
                if (!a || a.length<1){
                    this.$alert('请选择一行记录！', '提示', {
                        confirmButtonText: '确定'
                    });
                    return false;
                }
                return a;
            },
            refresh:function(){
                $('#sim').bootstrapTable('refresh');
            },
            simAdd:function(){
                UBIT.emptyObj(ME.vm.form);
                this.dialogFormVisible = true;
                this.disable = false;
                this.form.title = "添加信息";
                this.form.action = "add";
            },
            simUpdate:function(){
                var rows = this.selectsim();
                if(!rows) return;
                if(rows.length>1){
                     this.$alert('只能选择一行记录进行修改！', '提示', {
                        confirmButtonText: '确定'
                    });
                    return false;
                }

                this.dialogFormVisible = true;
                this.disable = true;
                this.form.title = "修改信息";
                UBIT.deepCopy(rows[0],ME.vm.form,1);
                this.form.action = 'update';
            },
            simDelete:function(){
                var rows = this.selectsim();
                if(!rows) return;

                var ids = []
                rows.forEach(function(r){
                  ids.push(r.id);
                });
                this.$confirm("确认删除么？","提示",{ }).then(function()  {

                    ME.vm.$http.post('super/sim/delete', {ids:ids}).then(function(res){
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
                      var url = 'super/sim/';
                      var msg= '';
                      var type=ME.vm.form.action;
                      switch(type){
                          case 'add' :url+='add';
                          msg+='添加SIM卡';break;
                          case 'update': url+='update';
                          msg+='更新SIM卡';break;
                      }
                      var params = UBIT.deepCopy(ME.vm.form);

                      delete params.action;
                      delete params.title;
                        ME.vm.$http.post(url, params).then(function(res){
                          var result = res.body;
                          if(result.isOk){
                              this.refresh();
                              this.dialogFormVisible = false;
                              this.$alert(msg+"成功！", '提示');
                          }else {
                              this.$alert(msg+"失败！"+result.msg, '提示', {
                                  confirmButtonText: '确定'
                              });
                          }
                          ME.vm.tagBtnDisable = false;
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
