
/**
 * Created by xuanyu on 2019/01/17 0028.
 */



$(function(){
    init();
});

function init(){
    vueInit();
    pageInit();
}


function pageInit(){

    $('#routestable').bootstrapTable({
        url:ME.host+'/super/route/list',
        method:'get',
        queryParams:function(params){
            return params;
        },
        search:true,
        showRefresh:true,
        idField:'id',
        uniqueId:'id',
        clickToSelect:true,
        // singleSelect:true,
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
        toolbar:'#routestoolbar',
        onDblClickRow:function(row, $element){
            ME.vm.routesUpdate();
        },
        // onLoadSuccess:function(data){
        //     if(!data||data.length<1) return;
        //     ME.vm.allData=data;
        // },
        columns: [
            {checkbox:true},
            {field: 'id',title: 'ID', width:'8%', sortable:true},
            {field: 'method',title: lang['method'],width:'10%', sortable:true, searchable:true},
            {field: 'path',title: lang['path'],width:'20%', sortable:true, searchable:true},
            {field: 'pathName',title: lang['pathName'],width:'10%', sortable:true, searchable:true},
            {field: 'view_user',title: lang['view_user'],width:'10%', sortable:true, searchable:true},
            {field: 'remarks',title: lang['remarks'],width:'20%', sortable:true, searchable:true},
            {field: 'addTime',title: lang['addTime'],width:'22%', sortable:true, searchable:true},
            {field: 'upUser',title: lang['upUser'],width:'6%', sortable:true, searchable:true}
        ]
    });
}

function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            dialogFormVisible:false,
            routesOneBtnDisable:false,
            routesDeleteBtnDisable:false,
            disabled :true,
            allData:[],
            form: {
                title: '',
                id: '',
                method:'get',
                path : '',
                pathName : '',
                view_user : '0',
                remarks : '',
            },
            modefiyPwdRule: {
                method:[
                    { required: true, message: lang['mustRequireMethod'], trigger: 'blur' }
                ],
                path:[
                    { required: true, message: lang['mustRequirePath'], trigger: 'blur' }
                ],
                pathName:[
                    { required: true, message: lang['mustRequirePathName'], trigger: 'blur' }
                ]
            },
            formLabelWidth: '120px',
        },
        created:function(){
            
        },
        methods:{
            selectroutes:function(){
                var a = $('#routestable').bootstrapTable('getSelections');
                if (!a || a.length<1){
                    this.$alert(lang['selectRowNote'], lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                    return false;
                }
                return a;
            },
            refresh:function(){
                $('#routestable').bootstrapTable('refresh');
            },
            routesAdd:function(){
                util.emptyObj(ME.vm.form);
                this.dialogFormVisible = true;
                this.form.title = lang['addInfo'];
                this.form.method = "get";
                this.form.view_user = "0";
            },
            routesUpdate:function(){
                var rows = this.selectroutes();
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

            routesDelete:function(){
                var rows = this.selectroutes();

                if(!rows) return;
                // var row = rows[0];
                var ids=[];
                for(var i=0;i<rows.length;i++){
                    ids.push(rows[i].id);
                }
                this.$confirm(lang['deleteRoute'],lang['prompt'],{ }).then(function()  {

                    ME.vm.$http.post('super/route/del', {id:ids}).then(function(res){
                        var result = res.body;
                        if(result.isOk){
                            this.refresh();
                            this.$alert(lang['delSuccessful'], lang['prompt']);
                        }else {
                            this.$alert(lang['delFail']+result.msg, lang['prompt'], {
                                confirmButtonText: lang['confirm']
                            });
                        }
                        ME.vm.routesDeleteBtnDisable = false;

                    });
                    ME.vm.routesDeleteBtnDisable = true;
                }).catch(function(){

                });
            },
            submitForm:function (formName) {
                this.$refs[formName].validate(function(valid){
                    if (valid) {
                        var url = 'super/route/save/';
                        var msg = (ME.vm.form.id>0?lang['add']:lang['update']);
                        var params=ME.vm.form;
                        delete params.title;
                        ME.vm.$http.post(url, params).then(function(res){
                            var result = res.body;
                            if(result.isOk){
                                this.refresh();
                                this.dialogFormVisible = false;
                                this.$alert(msg+lang['successful']+"！", lang['prompt']);
                            }else {
                                this.$alert(msg+lang['fail']+"！"+result.msg, lang['prompt'], {
                                  confirmButtonText: lang['confirm']
                                });
                            }
                            ME.vm.routesOneBtnDisable = false;
                        });
                        ME.vm.routesOneBtnDisable = true;
                    } else {
                        ME.vm.$alert(lang['messageError'], lang['prompt'], {
                            confirmButtonText: lang['confirm']
                        });
                        return false;
                    }
                })
            }
        }
    });
}


















