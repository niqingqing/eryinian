/**
 * Created by LiuTao on 2017/7/03 0028.
 */



$(function(){
    init();
});

function init(){
    vueInit();
    bufTableInit();
    // sourceTableInit();
    // syncTableInit();
    tdoaTableInit();
}


function bufTableInit(){

    $('#sourceBuftable').bootstrapTable({
        url:ME.host+'/tplatform/source/listByPage',
        method:'get',
        queryParams:function(params){
            params.type = ME.vm.type;
            return params;
        },
        search:true,
        showRefresh:true,
        height:360,
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
        pageSize:100,
        pageList:[2, 10, 25, 50, 100, 200, 500, 1000,2000, 10000, 20000, 50000],
        sidePagination:'server',
        toolbarAlign:'left',
        toolbar:'#sourceBufToolbar',

    columns: [
        {field: 'buf',title: '原始数据',width:'90%', searchable:true},
    ]

});

}


function sourceTableInit(){

    $('#sourceTable').bootstrapTable({
        url:ME.host+'/tplatform/source/listSource',
        method:'get',
        // queryParams:function(params){
        //     params.type = ME.vm.type;
        //     return params;
        // },
        search:false,
        showRefresh:true,
        idField:'id',
        height:360,
        uniqueId:'id',
        clickToSelect:true,
        singleSelect:true,
        sortable:true,
        striped:true,
        showColumns:true,
        sortName:'id',
        sortOrder:'desc',
        pagination:true,
        pageSize:100,
        pageList:[2, 10, 25, 50, 100, 200, 500, 1000, 2000, 10000, 20000, 50000],
        sidePagination:'server',
        toolbarAlign:'left',
        toolbar:'#sourcetoolbar',
        columns: [
            //id, buf_type, buf, add_time
            {field: 'id',title: 'ID',width:'10%', sortable:true, searchable:true},
            {field: 'buf_type',title: '类型',width:'10%', sortable:true, searchable:true},
            {field: 'buf',title: '原始数据',width:'60%', sortable:false, searchable:true},
            {field: 'add_time',title: '添加时间',width:'20%', sortable:true, searchable:true},
        ]

    });

}


function tdoaTableInit(){
    $('#tdoaTable').bootstrapTable({
        url:ME.host+'/tplatform/tdoa/list',
        method:'get',
        // queryParams:function(params){
        //     params.type = ME.vm.type;
        //     return params;
        // },
        search:true,
        showRefresh:true,
        idField:'id',
        uniqueId:'id',
        clickToSelect:true,
        singleSelect:true,
        paginationVAlign:'top',
        sortable:true,
        striped:true,
        showColumns:true,
        sortName:'id',
        sortOrder:'desc',
        pagination:true,
        pageSize:100,
        pageList:[2, 10, 25, 50, 100, 200, 500, 2000, 10000, 20000, 50000],
        sidePagination:'server',
        toolbarAlign:'left',
        toolbar:'#tdoaToolbar',

        //id, tag, seq, anchor, rssi, rssiRxMinusFP, IDiff, luep, mc, power, pLOS, add_time
        columns: [
            {field: 'id',title: 'ID',width:'10%', sortable:true, searchable:true},
            {field: 'distance',title: 'distance',width:'10%', sortable:true, searchable:true},
            {field: 'ttype',title: 'ttype',width:'10%', sortable:true, searchable:true},

            {field: 'tag',title: 'tag',width:'10%', sortable:true, searchable:true},
            {field: 'seq',title: 'seq',width:'10%', sortable:true, searchable:true},
            {field: 'anchor',title: 'anchor',width:'10%', sortable:true, searchable:true},
            {field: 'rssi',title: 'rssi',width:'10%', sortable:true, searchable:true},
            {field: 'rssiRxMinusFP',title: 'rssiRxMinusFP',width:'10%', sortable:true, searchable:true},
            {field: 'IDiff',title: 'IDiff',width:'10%', sortable:true, searchable:true},
            {field: 'luep',title: 'luep',width:'10%', sortable:true, searchable:true},
            {field: 'mc',title: 'mc',width:'10%', sortable:true, searchable:true},
            {field: 'power',title: 'power',width:'10%', sortable:true, searchable:true},
            {field: 'pLOS',title: 'pLOS',width:'10%', sortable:true, searchable:true},
            {field: 'add_time',title: 'add_time',width:'10%', sortable:true, searchable:true},
        ]

    });
}




function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            type:'tdoa',
            debugBuf:false,
            //按钮控制
            sourceImportBtnDisable:false,
            sourceDeleteBtnDisable:false,
            sourceFlagDisable:false,
            clearAllDisable:false,
            clearTable_source_disable:false,
            clearTable_sync_disable:false,
            clearTable_tdoa_disable:false,

            sourceTypes:[

                {value:'all',label:'所有原始包'},
                {value:60,label:'同步包S'},
                {value:'sync',label:'同步包A'},
                {value:71,label:'TDOA包S'},
                {value:'tdoa',label:'TDOA包A'},
                {value:21,label:'TOF包S'},
                // {value:'tof',label:'TOF包A'},
            ],
            tableShows:{
                'source_show':true,
                'sync_show':true,
                'tdoa_show':true,
                'tof_show':true,
                'sync_chart_show':false,
            },
        },
        created:function(){
            this.$http.get(ME.host+'/config/getGlobalFlag?key=debugBuf').then(function(res){
                this.debugBuf = Boolean(Number(res.body));
                ME.vm.refresh(null, true);
            });
            if(hostIp.indexOf('192.168')>= 0){
                this.showRemote = true;
            }
        },
        methods:{
            selectsource:function(){
                var a = $('#sourcetable').bootstrapTable('getSelections');
                if (!a || a.length<1){
                    this.$alert('请选择一行记录！', '提示', {
                        confirmButtonText: '确定'
                    });
                    return false;
                }
                return a;
            },

            refresh:function(value, onlyTableShows){
                if(!onlyTableShows){
                    $('#sourceBuftable').bootstrapTable('refresh');
                }
                for(var i in this.tableShows){
                    this.tableShows[i] = false;
                }
                if(!isNaN(this.type)){
                    this.tableShows['source_show'] = true;
                }else {
                    this.tableShows[this.type+'_show'] = true;
                }

                if(this.type=='all'){
                    $('#sourceBuftable').bootstrapTable('resetView', {height:790});
                }else {
                    $('#sourceBuftable').bootstrapTable('resetView', {height:360});
                }

            },
            refreshTable:function(table){
                $('#'+table).bootstrapTable('refresh');
            },
            sourceDelete:function(){
                this.$confirm("确认清除掉所有的原始数据么？","提示",{ }).then(function() {
                    ME.vm.$http.get(ME.host+'/tplatform/source/delete?type='+ME.vm.type).then(function(res){
                    var result = res.body;
                    if(result.isOk){
                        this.refresh();
                        this.$alert("清除成功！", '提示');
                    }else {
                        this.$alert("清除失败！"+result.msg, '提示', {
                            confirmButtonText: '确定'
                        });
                    }
                    //放开按钮
                        ME.vm.sourceDeleteBtnDisable = false;
                });
                }).catch(function(){
                    ME.vm.sourceDeleteBtnDisable = false;
                });
                //屏蔽按钮
                ME.vm.sourceDeleteBtnDisable = true;
            },
            clearTable:function(table){
                this.$confirm("确认清除掉所有的原始数据么？","提示",{ }).then(function() {
                    ME.vm.$http.get(ME.host+'/tplatform/'+table+'/clearTable').then(function(res){
                        ME.vm['clearTable_'+table+'_disable'] = false;
                        var result = res.body;
                        if(result.isOk){
                            this.refreshTable(table+'Table');
                            this.$alert("清除成功！", '提示');
                        }else {
                            this.$alert("清除失败！"+result.msg, '提示', {
                                confirmButtonText: '确定'
                            });
                        }
                    });
                }).catch(function(){
                    ME.vm['clearTable_'+table+'_disable'] = false;
                });
                ME.vm['clearTable_'+table+'_disable'] = true;
            },
            clearAll:function(){
                this.$confirm("确认清除掉所有的原始数据么？","提示",{ }).then(function() {
                    //屏蔽按钮
                    ME.vm.clearAllDisable = true;
                    ME.vm.$http.get(ME.host+'/tplatform/source/clearAll').then(function(res){
                        //放开按钮
                        ME.vm.clearAllDisable = false;
                        var result = res.body;
                        if(result.isOk){
                            this.$alert("清除成功！", '提示');
                        }else {
                            this.$alert("清除失败！"+result.msg, '提示', {
                                confirmButtonText: '确定'
                            });
                        }
                    });
                }).catch(function(){
                    ME.vm.clearAllDisable = false;
                });
            },
            sourceImport:function(){
                this.$http.get(ME.host+'/tplatform/source/import?type='+ME.vm.type).then(function(res){
                    ME.vm.sourceImportBtnDisable = false;
                    var result = res.body;
                    if(result.isOk){
                        this.refresh();
                        this.$alert("数据入库成功！"+result.msg, '提示');
                    }else {
                        this.$alert("数据入库失败！"+result.msg, '提示', {
                            confirmButtonText: '确定'
                        });
                    }
                });
                ME.vm.sourceImportBtnDisable = true;
            },
            sourceFlagChange:function(newVal){
                this.$http.get(ME.host+'/config/setGlobalFlag?key=debugBuf&val='+(newVal?1:0)).then(function(res){
                    ME.vm.sourceFlagDisable = false;
                    var result = res.body;
                    if(result.isOk){
                        this.$alert("设置成功！"+result.msg, '提示');
                    }else {
                        this.$alert("设置失败！"+result.msg, '提示', {
                            confirmButtonText: '确定'
                        });
                    }
                });
                ME.vm.sourceFlagDisable = true;
            },
        },
    });
}
