window.onload = function(){
    init();
};

function init(){
    ME.vm = new Vue({
        el:"#app",
        data:{
            visible:false,
            title:"",
            tags:[],
            mac:'',
            cardId:"",
            rfid:"",
            dialogType:"",
            selectRow:{},
            name:""
        },
        methods:{
            initTable:function(){
                var self = this;
                $('#table').bootstrapTable({
                    url:ME.host + '/personnel/list',
                    method:"get",
                    search: true,
                    showRefresh: true,
                    idField: 'code',
                    uniqueId: 'code',
                    sortStable:true,
                    sortable: true,
                    striped: true,
                    showColumns: true,
                    sortName: 'code',
                    sortOrder: 'desc',
                    pagination: true,
                    pageSize: 10,
                    pageList: [10, 25, 50, 100, 200],
                    sidePagination: 'client',
                    toolbarAlign: 'left',
                    toolbar: '#toolbar',
                    onRefresh:function(){
                        self.selectRow = {};
                    },
                    responseHandler:function(res){
                        return res;
                    },
                    onDblClickRow: function (row, $element) {
                    },
                    onCheck: function (row) {
                        self.selectRow = row;
                    },
                    columns: [
                        { radio: true, width: '4%' },
                        { field: 'code', title: 'code', width: '10%', searchable: true, sortable: true },
                        {field:"name",title:"姓名",width: '10%', searchable: true, sortable: true },
                        { field: 'cardId', title: '身份证', width: '10%', searchable: true, sortable: true },
                        { field: 'rfid', title: 'RFID', width: '10%', searchable: true, sortable: true },
                    ]
                })
            },
            add:function(){
                var self = this;
                this.title = lang['addBind'];
                this.visible = true;
                this.dialogType = "add";
            },
            update:function(){
                if(Object.keys(this.selectRow).length < 1){
                    return this.$alert(lang['selectRowNote'],lang['prompt']);
                }
                this.mac = this.selectRow.code;
                this.cardId = this.selectRow.cardId;
                this.rfid = this.selectRow.rfid;
                this.title = lang['updateBind'];
                this.visible = true;
                this.dialogType = "update";
            },
            cancel:function(){
                this.visible = false;
            },
            commit:function(){
                var self = this;
                var type = this.dialogType;
                var mac = this.mac;
                var cardId = this.cardId;
                var rfid = this.rfid;
                var name = this.name;
                if(!mac){
                    return self.$message.error("请选择标签");
                }

                if(!rfid && !cardId && !name){
                    return self.$message.warning("请完整填写绑定数据");
                }
                var data = {
                    code:mac,cardId,rfid,name
                };
                var url = ME.host + '/personnel/add';
                if(type !== 'add'){
                    url = ME.host + '/personnel/update'
                }
                this.$http.post(url,data).then((res) => {
                    $('#table').bootstrapTable("refresh");
                    self.visible = false;
                    if(!res.body.isOk){
                        self.$message.error(res.body.msg);
                    }
                })
            },
            close:function(){
                this.mac = "";
                this.title = "";
                this.cardId = "";
                this.rfid = "";
            },
            remove:function(){
                var self = this;
                if(Object.keys(this.selectRow).length < 1){
                    return this.$alert(lang['selectRowNote'],lang['prompt']);
                }
                this.$confirm(lang['confirmDelete'],lang['prompt']).then(() => {
                    var url = ME.host + '/personnel/remove';
                    var data = {
                        code:self.selectRow.code
                    }
                    self.$http.post(url,data).then((res) => {
                        if(!res || !res.body.isOk){
                            return self.$message.warning(lang['delFail'])
                        }
                        $('#table').bootstrapTable("refresh");
                    })
                }).catch(() => {
                    console.log("cancel");
                })
            },
        },
        mounted:function(){
            var self = this;
            this.initTable();
            this.$http.get(ME.host + "/project/tag/list").then((res) => {
                if(!res){
                    return;
                }
                self.tags = res.body;
            })
        }
    })
}