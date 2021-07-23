/**
 * Created by chengtao on 2017/6/30 0028.
 */



$(function(){
    init();
});

function init(){
    vueInit();
    pageInit();
}

function pageInit(){

    $('#servertable').bootstrapTable({
        url:ME.host+'/super/syncServer/list',
        method:'get',
        queryParams:function(params){
            return params;
        },
        search:true,
        showRefresh:true,
        idField:'ip',
        uniqueId:'ip',
        clickToSelect:true,
        // height:700,
        singleSelect:false,
        sortable:true,
        striped:true,
        showColumns:true,
        sortName:'status',
        sortOrder:'desc',
        pagination:true,
        pageSize:10,
        pageList:[10, 25, 50, 100, 200],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#serverbar',
        onDblClickRow:function(row, $element){
            ME.vm.goToServer(row);
        },

    columns: [
        {checkbox:true,width:'2%'},
        {field: 'ip',title: 'IP', width:'2%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value){
                    if(!row.ip||row.status<1) {
                        return value;
                    }
                    return `<a src="javascript:void(0);" onclick="ME.vm.openServers('${row.ip}');" target="_blank">${value}</a>`;
                }
            },
        },
        {field: 'status', title: '状态', width:'4%', sortable:true, searchable:true,
        formatter:function(value, row, index){
            if(value>0){
                return `<span style="color:green;">在线</span>`;
                }
                return `<span style="color:gray">离线</span>`
            },
        },
        {field: 'onlineTime',title: '在线时间',width:'6%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value){
                    return (new Date(parseInt(value))).Format('yyyy-MM-dd hh:mm:ss');
                }
                return value;
            }
        },

    ]

});

}

function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            remoteSyncBtnDisable:false,
            deleteCliemBtnDisable:false,
        },
        methods:{
            selectRows:function () {
                var rows = $('#servertable').bootstrapTable('getSelections');
                if (!rows || rows.length<1){
                    this.$alert('至少选择一行记录！');
                    return false;
                }
                return rows;
            },
            selectOneRow:function () {
                var rows = this.selectRows();
                if(rows.length != 1){
                    this.$alert('请选择一行记录！');
                    return false;
                }
                return rows[0];
            },

            goToCliem:function () {
                var row = this.selectOneRow();
                if(!row){
                    return;
                }
                this.openServers(row.ip);
            },

            deleteCliem:function () {
                var rows = this.selectRows();
                if (!rows){
                    return false;
                }
                var ips = [];
                for(var r of rows){
                    ips.push(r.ip);
                }
                this.$confirm("确认删除么？", "提示", {}).then(function () {
                    ME.vm.$http.post('super/syncServer/deleteCliem', {ips}).then(function(res){
                        var resp=res.body;
                        if(resp.isOk){
                            ME.vm.refresh();
                            ME.vm.$message({
                                message: '删除成功!',
                                type: 'success'
                            });
                        }else {
                            ME.vm.$alert("删除失败！"+resp.msg, '提示', {
                                confirmButtonText: '确定'
                            });
                        }
                        ME.vm.deleteCliemBtnDisable = false;
                    });
                    ME.vm.deleteCliemBtnDisable = true;

                }).catch(function(){

                });
            },
            goToServer:function(server){
                if(!server||!server.ip||server.status>0) {
                    this.$alert('缺少ip或服务离线！');
                    return;
                };
                this.openServers(server.ip);
            },
            openServers:function (ip) {
                window.open('./syncBase.html?ip='+ip);
            },
            refresh:function(){
                $('#servertable').bootstrapTable('refresh');
            },

            remoteSync:function () {
                var rows = this.selectRows();
                if(!rows) return;

                var ips=[];
                // 检查状态，获取ip
                for(var i=0;i<rows.length;i++){
                    if(rows[i].status<1) {
                        this.$alert(rows[i].ip + '离线！');
                        return false;
                    }
                    ips.push(rows[i].ip);
                }

                //验证选择， 
                var msg = '同步基础库数据';
                this.$confirm("确认"+msg+"么？", "提示", {}).then(function () {
                        ME.vm.$http.post('super/syncServer/setOption', {ips, optionType:'syncBasicDb'}).then(function(res){
                            var resp=res.body;
                            if(resp.isOk){
                                ME.vm.refresh();
                                ME.vm.$message({
                                    message: msg+"成功！",
                                    type: 'success'
                                });

                            }else {
                                ME.vm.$alert(msg+"失败！"+resp.msg, '提示', {
                                    confirmButtonText: '确定'
                                });
                            }
                            ME.vm.remoteSyncBtnDisable = false;
                        });
                        ME.vm.remoteSyncBtnDisable = true;
                }).catch(function(){

                });
            }
        },
    });

}

