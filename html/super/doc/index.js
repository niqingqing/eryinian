window.onload = function(){
    init()
};

function init(){
    ME.vm = new Vue({
        el:"#app",
        data:{
            visible:false,
            title:"",
            get uploadUrl(){
                var url = ME.host + '/super/doc/add?api_token=' + ME.api_token;
                if(this.name){
                    url += '&name=' + this.name;
                }
                return url;
            },
            selectRow:{},
            fileList:[],
            name:"",
            get isSuper(){
                return ME.user.userType === 'super';
                // return ME.user.projectId === 0;
            }
        },
        methods:{
            tableInit:function(){
                var self = this;
                $('#table').bootstrapTable({
                    url:ME.host + '/doc/list',
                    // data:[],
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
                    clickToSelect:true,
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
                        { field: 'name', title: '名称', width: '10%', searchable: true, sortable: true },
                        { field: 'size', title: '大小', width: '10%', searchable: true, sortable: true ,formatter:function(value,row,index){
                            var mark;
                            if(value >= 1024 * 1024 * 1024){
                                return (value / 1.0 / (1024 * 1024 * 1024)).toFixed(2) + " GB"
                            }
                            if(value >= 1024 * 1024){
                                return (value / 1.0 / (1024 * 1024)).toFixed(2) + " MB"
                            }
                            return (value / 1.0 / 1024).toFixed(2) + " KB"
                        }},
                        { field: 'time', title: '上传时间', width: '10%', searchable: true, sortable: true },
                        {  title: '下载', width: '10%', searchable: true, sortable: true ,formatter:function(value,row,index){
                                return `<button style="width:80px;" class="el-button el-button--primary" onclick="ME.vm.download('${row.name}')">下载</button>`
                            }
                        },
                    ]
                })
            },
            add:function(){
                this.visible = true;
            },
            remove:function(){
                var self = this;
                var name = this.selectRow.name;
                if(!name){
                    return this.$alert("请至少选择一行",'提示');
                }
                var url = ME.host + '/super/doc/remove';
                this.$http.post(url,{name}).then((res) => {
                    if(!res || !res.body || !res.body.isOk){
                        return self.$message.warning("删除失败!");
                    }
                    $('#table').bootstrapTable("refresh");
                })
            },
            success:function(){
                this.cancel();
                $('#table').bootstrapTable("refresh");
            },
            upload:function(){
                this.$refs.upload.submit();
            },
            handleChange:function(file,fileList){
                fileList.length = 1
            },
            close:function(){
                this.cancel();
            },
            cancel:function(){
                this.visible = false;
                this.name = '';
                this.$refs.upload.clearFiles();
            },
            download:function(fileName){
                var url = ME.host + '/doc/download?fileName=' + fileName + '&api_token=' + ME.api_token;
                var self = this;
                var a = document.createElement('a');
                a.download = fileName;
                a.href = url;
                a.target = ' blank';
                $("body").append(a);  // 修复firefox中无法触发click
                a.click();
                $(a).remove();
            }
        },
        mounted:function(){
            this.tableInit()
        }
    })
}