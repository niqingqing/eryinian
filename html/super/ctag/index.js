/**
 * Created by LiuTao on 2017/7/03 0028.
 */



$(function(){
    init();
});

function init(){
    vueInit();

}


function check (rule, value, callback) {
        if (value === '') {
          callback(new Error(lang['enterContent']));
          return;
        }

        var tags = $('#tagtable').bootstrapTable('getData');
        var id = ME.vm.form.id;
        tags.forEach(function(tag){
            if(value==tag.mac && id!=tag.id){
                callback(new Error(lang['checkNotePre']+'('+tag.id+')'+tag.cname+lang['checkNoteAfter']));
                return;
            }
        });
        callback();
}


function pageInit(){
    $('#tagtable').bootstrapTable({
        url:ME.host+'/app/tag/listAll',
        method:'get',
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
            ME.vm.tagUpdate();
        },

    columns: [
        {checkbox:true,width:'1%'},
        {field: 'id',title: 'ID', width:'2%', sortable:true,  searchable:true},
        {field: 'userId',title: lang['userId'],width:'6%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value){
                    if(ME.vm.users){
                        for(var i=0;i<ME.vm.users.length;i++){
                            if(value == ME.vm.users[i].id){
                                return ME.vm.users[i].nickname;
                            }
                        }
                    }
                }
                return value;
            },
        },
        {field: 'cname', title: lang['cname'], width:'5%', sortable:true, searchable:true},
        {field: 'ctype', title: lang['ctype'], width:'5%', sortable:true, searchable:true},
        {field: 'mac',title: lang['mac'],width:'6%', sortable:true, searchable:true},
        {field: 'isMaster',title: lang['isMaster'],width:'6%', sortable:true, searchable:true,
            formatter:function(value, row, index){
               return value == 1 ? lang['true']:lang['false'];
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
            tagBtnDisable:false,
            tagDeleteBtnDisable:false,

            dialogFormVisible:false,
            users:[],
            ctypes:[1,2,3,4,5,6],
            form: {
                id:'',
                userId:'',
                cname:'',
                ctype:'',
                mac:'',
                isMaster:'0'
            },
            modefiyPwdRule: {
                  cname: [
                      { required: true, message: lang['cnameRule'], trigger: 'blur' },
                      { min: 3, max: 25, message: lang['cnameRule2'], trigger: 'blur' },
                  ],
                   mac : [
                       { required: true, message: lang['macRule'], trigger: 'blur' },
                       { min: 3, max: 16, message: lang['macRule2'], trigger: 'blur' },
                       { validator: check, trigger: 'blur' }
                   ]
            },
            formLabelWidth: '120px',
        },

        created:function(){
            //获取用户id下拉列表信息
            this.$http.get('model/list?model=cusers').then(function(data){
                this.users = data.body;
                pageInit();
            });
        },

        methods: {
            selecttag: function () {
                var a = $('#tagtable').bootstrapTable('getSelections');
                if (!a || a.length < 1) {
                    this.$alert(lang['selectOne'], lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                    return false;
                }
                return a;
            },
            refresh: function () {
                $('#tagtable').bootstrapTable('refresh');
            },
            tagAdd: function () {
                util.emptyObj(ME.vm.form);
                this.dialogFormVisible = true;
                this.form.isMaster='1';
            },
            tagUpdate: function () {
                var rows = this.selecttag();
                if (!rows) return;
                if (rows.length > 1) {
                    this.$alert(lang['onlySelectOne'], lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                    return false;
                }

                this.dialogFormVisible = true;
                this.form.title = lang['modifyInfo'];
                util.deepCopy(rows[0], ME.vm.form);
                ME.vm.form.isMaster = ME.vm.form.isMaster+'';
                // this.form.isMaster = "1";
            },
            tagDelete: function () {
                var rows = this.selecttag();
                if (!rows) return;

                var ids = []
                rows.forEach(function (r) {
                    ids.push(r.id);
                });
                this.$confirm(lang['tagDeleteNote'], lang['prompt'], {}).then(function () {

                    ME.vm.$http.post('app/tag/delete', {ids: ids}).then(function (res) {
                        var result = res.body;
                        if (result.isOk) {
                            this.refresh();
                            this.$alert(lang['deleteSuccess'], lang['prompt']);
                        } else {
                            this.$alert(lang['deleteFail'] + result.msg, lang['prompt'], {
                                confirmButtonText: lang['confirm']
                            });
                        }
                        ME.vm.tagDeleteBtnDisable = false;
                    });
                    ME.vm.tagDeleteBtnDisable = true;
                }).catch(function () {

                });

            },
            submitForm: function (formName) {
                this.$refs[formName].validate(function (valid) {
                    if (valid) {
                        var url = 'app/tag/';
                        url += (ME.vm.form.id > 0 ? 'update' : 'add');
                        var msg = (ME.vm.form.id > 0 ? lang['update'] : lang['add']);

                        var params = {};
                        util.deepCopy(ME.vm.form,params);

                        delete params['upTime'];
                        delete params['addTime'];
                        delete params['addUser'];

                        ME.vm.$http.post(url, params).then(function (res) {
                            var result = res.body;
                            if (result.isOk) {
                                this.refresh();
                                this.dialogFormVisible = false;
                                this.$alert(msg + lang['success'], lang['prompt']);
                            } else {
                                this.$alert(msg + lang['fail'] + result.msg, lang['prompt'], {
                                    confirmButtonText: lang['confirm']
                                });
                            }
                            ME.vm.tagBtnDisable = false;
                        });
                        ME.vm.tagBtnDisable = true;
                    } else {
                        ME.vm.$alert(lang['enterError'], lang['prompt'], {
                            confirmButtonText: lang['confirm']
                        });
                        return false;
                    }
                })
            },
        }
    });

}
