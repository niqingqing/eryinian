window.onload = function(){
    ME.vm = new Vue({
        el:"#app",
        data:{
            btnDisable:false,
            dialogVisible:false,
            text:"",
            title:"执行成功"
        },
        methods:{
            initTable:function(){
                $('#natTable').bootstrapTable({
                    url:ME.host+'/super/nat/list',
                    method:'get',
                    queryParams:function(params){
                    },
                    responseHandler:function(res){
                        console.log(res);
                        return res.data;
                    },
                    search:true,
                    showRefresh:true,
                    // idField:'id',
                    // uniqueId:'id',
                    // clickToSelect:true,
                    // singleSelect:false,
                    sortable:true,
                    striped:true,
                    height:750,
                    showColumns:true,
                    // sortName:'id',
                    sortOrder:'desc',
                    pagination:true,
                    pageSize:25,
                    pageList:[10, 25, 50, 100, 200],
                    sidePagination:'client',
                    toolbarAlign:'left',
                    toolbar:'',
                    columns: [
                        {field:"code","title":"编码", width:'4%', sortable:true, searchable:true},
                        {field:"cname","title":"名称", width:'4%', sortable:true, searchable:true},
                        {field:"","title":"地址", width:'4%', sortable:true, searchable:true,formatter:function(value,row,index){
                                return `<a href="http://${row.code}.ubitraq.com" target="_blank">${row.code}.ubitraq.com</a>`
                            }},
                        {field:"","title":"地址", width:'4%', sortable:true, searchable:true,formatter:function(value,row,index){
                                var str = `<button class="el-button el-button--info el-button--small" onclick="ME.vm.updateCode('${row.code}')">代码升级</button>`;
                                str += `<button class="el-button el-button--info el-button--small" onclick="ME.vm.restartProject('${row.code}')">重启服务</button>`;
                                return str
                            }},
                    ]

                });
            },
            updateCode:function(code){
                var self = this;
                var url = `http://${code}.ubitraq.com:8082/nat/updateCode`;
                this.$http.get(url).then((res) => {
                    self.dialogVisible = true;
                    if(!res || !res.body.isOk){
                        self.title = "更新失败";
                    }else{
                        self.title = "执行成功";
                    }
                    self.text = res.body.data;
                })
            },
            restartProject:function(code){
                var self = this;
                var url = `http://${code}.ubitraq.com:8082/nat/restartProject`;
                this.$http.post(url).then((res) => {
                    self.dialogVisible = true;
                    console.log(res);
                    if(!res || !res.body.isOk){
                        self.title = "更新失败";
                    }else{
                        self.title = "执行成功";
                    }
                    self.text = res.body.data;
                })
            },
            closeHandle:function(){
                this.dialogVisible = false;
            },
        },
        mounted:function(){
            var self = this;
            self.initTable.call(self);
        }
    });
}