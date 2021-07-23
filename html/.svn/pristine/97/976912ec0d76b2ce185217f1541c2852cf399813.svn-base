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

function checkCode (rule, value, callback) {
        if (value === '') {
          callback(new Error(lang['enterNote']));
          return;
        }

        var products = $('#producttable').bootstrapTable('getData');
        var id = ME.vm.form.id;
        products.forEach(function(product){
            if(value == product.cname && id!=product.id){
                callback(new Error(lang['checkCodeNote']));
                return;
            }
        });
        callback();
}

function pageInit(){

    $('#producttable').bootstrapTable({
        url:ME.host+'/super/product/list',
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
        pageSize:25,
        pageList:[2, 10, 25, 50, 100, 200],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#producttoolbar',
        onDblClickRow:function(row, $element){
            ME.vm.productUpdate();
        },

    columns: [
        {checkbox:true, width:'1%'},
        {field: 'id',title: 'ID', width:'2%', sortable:true,  searchable:true},
        {field: 'cname', title: lang['cname'], width:'5%', sortable:true, searchable:true},
        {field: 'mtype', title: lang['mtype'], width:'5%', sortable:true, searchable:true,
            formatter:function (value) {
            if(value){
                for(var i=0;i<ME.vm.mtype_source.length;i++){
                    if(value == ME.vm.mtype_source[i].code){
                        return  ME.vm.mtype_source[i].label;
                    }
                }
            }
                return value;
            }
        },
        {field: 'weight',title: lang['weight'],width:'4%', sortable:true, searchable:true},
        {field: 'description',title: lang['description'],width:'12%', sortable:true, searchable:true},
        {field: 'remark',title: lang['remark'],width:'12%', sortable:true, searchable:true},
        {field: 'upUser',title: lang['upUser'],width:'6%', sortable:true, searchable:true},
    ]
});

}

function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            productBtnDisable:false,
            productDeleteBtnDisable:false,
            dialogFormVisible:false,
            mtype_source:[
                {code:'tag',label:lang['tag']},
                {code:'anchor',label:lang['anchor']},
                {code:'software',label:lang['software']},
            ],
            form: {
              id: '',
              title : lang['formTitle'],
              cname:'',
              mtype:lang['formMtype'],
              weight:'',
              description:'',
              remark:''
            },
            modefiyPwdRule: {
                  cname: [
                      { validator: checkCode, trigger: 'blur' }
                  ],
            },
            formLabelWidth: '120px',
        },
        created:function(){
        },
        methods:{
            selecttag:function(){
                var a = $('#producttable').bootstrapTable('getSelections');
                if (!a || a.length<1){
                    this.$alert(lang['selectOne'], lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                    return false;
                }
                return a;
            },
            refresh:function(){
                $('#producttable').bootstrapTable('refresh');
            },
            productAdd:function(){
                util.emptyObj(ME.vm.form);
                this.dialogFormVisible = true;
                this.form.title = lang['addInfo'];
            },
            productUpdate:function(){
                var rows = this.selecttag();
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
            },
            productDelete:function(){
                var rows = this.selecttag();
                if(!rows) return;

                var ids = []
                rows.forEach(function(r){
                  ids.push(r.id);
                });
                console.dir(ids);
                this.$confirm(lang['productDeleteNote'],lang['prompt'],{ }).then(function()  {

                    ME.vm.$http.post('super/product/delete', {ids:ids}).then(function(res){
                    var result = res.body;
                    if(result.isOk){
                        this.refresh();
                        this.$alert(lang['productDeleteSuccess'], lang['prompt']);
                    }else {
                        this.$alert(lang['productDeleteFail']+result.msg, lang['prompt'], {
                            confirmButtonText: lang['confirm']
                        });
                    }
                        ME.vm.productDeleteBtnDisable = false;
                });
                    ME.vm.productDeleteBtnDisable = true;
            }).catch(function(){

                });

            },
            submitForm:function (formName) {

                var formModel = ME.vm.$refs[formName];
                console.log(formName, formModel);

                this.$refs[formName].validate(function(valid){
                    if (valid) {
                      var url = 'super/product/save';
                      var msg = (ME.vm.form.id>0?lang['update']:lang['add']);
                      var params = UBIT.deepCopy(ME.vm.form);
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
                          ME.vm.productBtnDisable = false;
                      });
                      ME.vm.productBtnDisable = true;
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
