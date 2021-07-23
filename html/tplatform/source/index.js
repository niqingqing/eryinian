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
    // tdoaTableInit();
}


function bufTableInit(){
    $('#sourceBuftable').bootstrapTable({
        url:ME.host+'/tplatform/source/list',
        method:'get',
        queryParams:function(params){
            params.type = ME.vm.type;
            params.map = ME.vm.currentMap;
            return params;
        },
        customSearch:function (text) {
            if(!text || !this.data) return ;
            var ts = text.split('&');
            this.data = this.data.filter(function (row) {
                var flag = true;
                for(var i=0;i<ts.length;i++){
                    if(ts[i]){
                        flag = row.buf.indexOf(ts[i]) > -1
                    }
                    if(!flag){
                        return false;
                    }
                }
                return flag
            })
        },
        search:true,
        showRefresh:true,
        height:780,
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
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#sourceBufToolbar',

    columns: [
        {field: 'buf',title: '原始数据',width:'90%', searchable:true},
    ]

});

}


function sourceTableInit(){

    $('#sourceTable').bootstrapTable({
        // url:ME.host+'/tplatform/source/listSource?map='+currentMap,
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


function syncTableInit(){

    $('#syncTable').bootstrapTable({
        // url:ME.host+'/tplatform/sync/list?map='+currentMap,
        url:ME.host+'/tplatform/sync/list',
        method:'post',
        search:true,
        showRefresh:true,
        idField:'id',
        height:780,
        uniqueId:'id',
        clickToSelect:true,
        singleSelect:true,
        sortable:true,
        striped:true,
        showColumns:true,
        sortName:'id',
        sortOrder:'asc',
        pagination:true,
        pageSize:100,
        pageList:[2, 10, 25, 50, 100, 200, 500, 1000, 2000, 10000, 20000, 50000],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#synctoolbar',
        columns: [
            {field: 'sync_seq',title: 'sync_seq',width:'6%', sortable:true, searchable:true},
            {field: 'master_id',title: 'master_id',width:'6%', sortable:true, searchable:true},
            {field: 'anchor_id',title: 'anchor_id',width:'6%', sortable:true, searchable:true},
            {field: 'send_timestamp',title: 'send_timestamp',width:'10%', sortable:true, searchable:true},
            {field: 'send_diff',title: 'send_diff',width:'6%', sortable:true, searchable:true},
            {field: 'receive_timestamp',title: 'receive_timestamp',width:'10%', sortable:true, searchable:true},
            {field: 'receive_diff',title: 'receive_diff',width:'6%', sortable:true, searchable:true},
            {field: 'ratio',title: 'receive_send_ratio',width:'10%',sortable:true, searchable:true},
            {field: 'ratio_diff',title: 'ratio_diff',width:'10%',sortable:true, searchable:true},
            {field: 'sync_rssi',title: 'sync_rssi',width:'4%', sortable:true, searchable:true},
            {field: 'add_time',title: 'add_time',width:'8%', sortable:true, searchable:true},
            {field: 'add_time',title: 'add_time_str',width:'30%', formatter:function (value,row) {
                if(value){
                    return UBIT.getLocalTime(value);
                }
                return value;
            }},
        ]
    });

}


function tdoaTableInit(){
    $('#tdoaTable').bootstrapTable({
        // url:ME.host+'/tplatform/tdoa/list?map='+currentMap,
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
            type:Cookies.get('source_type')?Cookies.get('source_type'):'original_sync',
            debugBuf:false,
            //按钮控制
            sourceImportBtnDisable:false,
            sourceDeleteBtnDisable:false,
            sourceFlagDisable:false,
            clearAllDisable:false,
            clearTable_source_disable:false,
            clearTable_sync_disable:false,
            clearTable_tdoa_disable:false,

            currentProj:'',  //地图传过来项目code
            currentMap:'',   //当前地图
            maps:[],         //所有项目地图

            sourceTypes:[
                {value:'source_all',label:'所有原始包'},
                {value:'preprocess_sync',label:'过程同步包A'},
                {value:'preprocess_tdoa',label:'过程TDOA包A'},
                {value:'preprocess_distance',label:'过程测距A'},
                {value:'preprocess_aoa',label:'过程AoA包A'},

                {value:'original_fault',label:'故障码'},
                {value:'original_sync',label:'原始同步包A'},
                {value:'original_tdoa',label:'原始TDOA包A'},
                {value:'original_distance',label:'原始测距A'},
                {value:'original_aoa',label:'原始AoA包A'},
                {value:'original_aoa_v2',label:'原始AoA2包A'},

                {value:'original_tof',label:'原始TOF包A'},
                {value:'original_sos',label:'原始SOS包A'},
                {value:'original_passthrough',label:'原始透传包A'},
                {value:'original_sniffer',label:'原始抓包'},
                {value:'anchor_broad',label:'广播包'},
                {value:'heart_beat',label:'心跳包'},

                {value:'source_err',label:'异常包'},
                {value:'diff_err',label:'距离差异常包'},

                {value:'debug_tdoa',label:'中间toda'},

                // {value:'original_60',label:'同步包S'},
                // {value:'original_71',label:'TDOA包S'},
                // {value:'original_72',label:'TDOA包V2.S'},
                // {value:'original_21',label:'TOF包S'},
                // {value:'original_41',label:'SOS包S'},
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

            if(!Cookies.get('source_type')){
                Cookies.set('source_type', 'preprocess_sync');
            }
            this.type = Cookies.get('source_type');


            if(!(UBIT.user.projectCode &&  UBIT.user.projectId>0)){
                alert('必须进入项目地图才能查看实验平台！')
                return false;
            }

            //获取项目下所有地图
            this.currentProj = UBIT.user.projectCode;
            this.currentMap=getDefaultMap();
            if(!this.currentMap){return}

            this.$http.get('map/list?projectCode='+this.currentProj).then(function(res){
                this.maps=res.body;
            });

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

                if(value) Cookies.set('source_type', value);

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

            },
            refreshTable:function(table){
                $('#'+table).bootstrapTable('refresh');
            },
            sourceDelete:function(){
                this.$confirm("确认清除掉所有的原始数据么？","提示",{ }).then(function() {
                    ME.vm.$http.get(ME.host+'/tplatform/source/delete?type='+ME.vm.type+'&map='+this.currentMap).then(function(res){
                    var result = res.body;
                    if(result.isOk){
                        this.refresh();
                        this.showSuccess("清除成功！");
                    }else {
                        this.showError("清除失败！"+result.msg);
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
                            this.showSuccess("清除成功！");
                        }else {
                            this.showError("清除失败！"+result.msg);
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
                    ME.vm.$http.get(ME.host+'/tplatform/source/clearAll?map='+ME.vm.currentMap).then(function(res){
                        //放开按钮
                        ME.vm.clearAllDisable = false;
                        var result = res.body;
                        if(result.isOk){
                            this.refresh();
                            this.showSuccess("清除成功！");
                        }else {
                            this.showError("清除失败！"+result.msg);
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
                        this.showSuccess("数据入库成功！"+result.msg);
                    }else {
                        this.showError("数据入库失败！"+result.msg);
                    }
                });
                ME.vm.sourceImportBtnDisable = true;
            },
            sourceFlagChange:function(newVal){
                this.$http.get(ME.host+'/config/setGlobalFlag?key=debugBuf&val='+(newVal?1:0)).then(function(res){
                    ME.vm.sourceFlagDisable = false;
                    var result = res.body;
                    if(result.isOk){
                        this.showSuccess("设置成功！"+result.msg);
                    }else {
                        this.showError("设置失败！"+result.msg);
                    }
                });

                ME.vm.sourceFlagDisable = true;
            },
            showSuccess:function(msg){
                this.showMsg(msg,'success');
            },
            showError:function(msg){
                this.showMsg(msg,'error');
            },
            showMsg:function(msg,type){
                this.$message({
                    message: msg,
                    type: type  //success/warning/info/error
                });
            },
            reloadByMap:function(){
                this.refreshTable('sourceBuftable')
                localStorage.setItem('tplaformMap',this.currentMap);
            }
        },
    });
}
