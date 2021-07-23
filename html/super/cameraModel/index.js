/**
 * Created by luozuzhu 2018年09月25日11:32:26
 */

$(function(){
    init();
});

function init(){
    vueInit();

}
function vueInit(){
    ME.vm = new Vue({
        el:'#app',
        data:{
            cameraModelDeleteBtnDisable:false,
            dialog:{
                brand:'',
                class:'',
                maxangle:'',
                model:'',
                totalpan:'',
                totaltilt:'',
                type:'',
                usualtilt:'',
                id:null,
                title:'',
            },
            dialogVisible:false,
            selected:false,
            fields:[
                {
                    name:lang['brand'],
                    model:'brand',
                    type:'text'
                },
                {
                    name:lang['class'],
                    model:'class',
                    type:'text'
                },
                {
                    name:lang['maxangle'],
                    model:'maxangle',
                    type:'number'
                },
                {
                    name:lang['model'],
                    model:'model',
                    type:'text'
                },
                {
                    name:lang['totalpan'],
                    model:'totalpan',
                    type:'number'
                },
                {
                    name:lang['totaltilt'],
                    model:'totaltilt',
                    type:'number'
                },
                {
                    name:lang['usualtilt'],
                    model:'usualtilt',
                    type:'number'
                }
            ]
        },
        methods:{
            cameraModelAdd:function(){
                this.dialog.title = lang['add'];
                this.dialog.brand = '';
                this.dialog.class = '';
                this.dialog.maxangle = '';
                this.dialog.model = '';
                this.dialog.totalpan = '';
                this.dialog.totaltilt = '';
                this.dialog.type = '';
                this.dialog.usualtilt = '';
                this.dialog.id = null;
                this.dialogVisible = true;
            },
            cameraModelUpdate:function(){
                if(!this.selected){
                    return this.$message.warning(lang['selectOne']);
                }
                var self = this;
                var row = $('#cameraTabletable').bootstrapTable('getSelections')[0];
                for(var i in row){
                    if(i === 0){
                        continue;
                    }
                    self.dialog[i] = row[i];
                }
                this.dialogVisible = true;
                this.dialog.title = lang['update'];
            },
            cameraModelDelete:function(){
                if(!this.selected){
                    return this.$message.warning(lang['selectOne']);
                }
                var self = this;
                var row = $('#cameraTabletable').bootstrapTable('getSelections')[0];
                this.$confirm(lang['cameraModelDeleteNote'],lang['prompt'],{ }).then(function() {
                    self.$http.get(ME.host + '/cameraModel/delete?id=' + row.id).then((res) => {
                        self.$message(lang['deleteSuccess']);
                        location.reload();
                    })
                })
            },
            dialogClose:function(){
                this.dialogVisible = false;
            },
            confirm:function(){
                var data = this.dialog;
                if(this.dialog.title === lang['add']){
                    if(!data.brand || !data.class || !data.maxangle || !data.model || !data.totalpan || !data.totaltilt || !data.type || !data.usualtilt){
                        return this.$message.warning(lang['confirmNote']);
                    }
                    this.$http.post(ME.host + '/cameraModel/add',data).then(function(res){
                        location.reload();
                    })
                }else{
                    this.$http.post(ME.host + '/cameraModel/update',data).then(function(res){
                        location.reload();
                    })
                }

            },
            cancel:function(){
                this.dialogVisible = false;
            }
        },
        mounted:function(){
            pageInit.call(this);
        }
    })
}

function pageInit(){
    var self = this;
    $('#cameraTabletable').bootstrapTable({
        url:ME.host + '/cameraModel/list',
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
        toolbar:'#cameraModelbar',
        onDblClickRow:function(row, $element){
            self.cameraModelUpdate();
        },
        onCheck:function(row){
            self.selected = true;
            for(var i in row){
                if(i === 0){
                    continue;
                }
                self.dialog[i] = row[i];
            }
        },
        columns:[
            {radio:true},
            {field: 'id',title: 'ID', width:'5%', searchable:true,sortable:true},
            {field:'brand',title:lang['brand'],wdith:'20%',searchable:true,sortable:true},
            {field:'class',title:lang['class'],wdith:'20%',searchable:true,sortable:true},
            {field:'maxangle',title:lang['maxangle'],wdith:'20%',searchable:true,sortable:true},
            {field:'model',title:lang['model'],wdith:'20%',searchable:true,sortable:true},
            {field:'totalpan',title:lang['totalpan'],wdith:'20%',searchable:true,sortable:true},
            {field:'totaltilt',title:lang['totaltilt'],wdith:'20%',searchable:true,sortable:true},
            {field:'type',title:lang['type'],wdith:'20%',searchable:true,sortable:true},
            {field:'usualtilt',title:lang['usualtilt'],wdith:'20%',searchable:true,sortable:true},
            {field: 'upTime',title: lang['upTime'],width:'6%', sortable:true, searchable:true},
            {field: 'upUser',title: lang['upUser'],width:'6%', sortable:true, searchable:true},
        ]
    })
}