/**
 * Created by LiuTao on 2017/6/30 0028.
 */



$(function(){
    init();
});

function init(){
    vueInit();
    pageInit();
}

function pageInit(){
    ME.vm.loadPage();
}

function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            baseTable:baseTable,
            dbName:'basic_db',
            table:'projects',
            ip:'',

            remoteSyncBtnDisable:false,
            syncProjDataBtnDisable:false,
            dataCleanBtnDisable:false,
            update2SermBtnDisable:false,
            update2CliemBtnDisable:false,

            sysName : '全迹科技',
            collapsed : false,
            footerMsg : UBIT.footerMsg,
            openedMenu:['projects'],
            activeIndex:'projects',

            basePageData:{
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
                sortName:'status',
                sortOrder:'desc',
                pagination:true,
                pageSize:10,
                pageList:[5, 10, 25, 50, 100, 200],
                sidePagination:'client',
                toolbarAlign:'left',
                toolbar:'#projtablebar',
                columns: []
             },

        },
        created:function(){
            // 获取需要同步的服务ip
            var ip=this.getUrl('ip');
            if(!ip) location.history(-1);
            this.ip=ip;
            this.basePageData.url=ME.host+'/super/syncServer/getTable?ip='+this.ip+'&d='+this.dbName+'&t='+this.table;
        },

        methods:{
            collapse : function(){
                this.collapsed = !this.collapsed;
            },

            loadPage:function(){
                $('#projtable').bootstrapTable(Object.assign(ME.vm.basePageData,pageData[this.table]));
            },
            showTableData:function(tableName){
                if(!tableName) return;
                this.table=tableName;
                $('#projtable').bootstrapTable('destroy');
                this.basePageData.url=ME.host+'/super/syncServer/getTable?ip='+this.ip+'&&d='+this.dbName+'&&t='+this.table;
                this.basePageData.columns=[];
                delete this.basePageData.onDblClickRow;
                this.loadPage();
            },
            refresh:function(){
                $('#projtable').bootstrapTable('refresh');
            },
            getUrl:function(variable){
                var query = window.location.search.substring(1);
                var vars = query.split("&");
                for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                    if(pair[0] == variable){return pair[1];}
                }
                return(false);
            },
            selectRows:function () {
                var rows = $('#projtable').bootstrapTable('getSelections');
                if (!rows || rows.length<1){
                    this.$alert('至少选择一行记录！');
                    return false;
                }
                return rows;
            },
            selectOneRow:function () {
                var r = this.selectRows();
                if(!r) return false;
                if (r.length!=1){
                    this.$alert('请选择一行记录！');
                    return false;
                }
                return r[0];
            },
            //远程同步到内存(当前表数据)
            remoteSync:function () {
                // this.table;
                this.operation('super/syncServer/setOption', {optionType:'syncBasicTable'}, '同步'+this.table+'的数据到内存', 'remoteSyncBtnDisable');
            },
            //项目数据同步（整个项目库）
            syncProjData:function () {
                if(this.table != 'projects') {
                    this.$alert('只能是项目管理才具有本功能');
                    return false;
                }
                var rows = this.selectRows();
                if(!rows) return ;

                var projCodes = rows.map(function (r) {
                    return r.code;
                });

                this.operation('super/syncServer/setOption', {projCodes, optionType:'syncProjDb'}, '同步项目库（'+projCodes.join(',')+'）的所有数据到内存', 'syncProjDataBtnDisable');
            },

            dataClean:function () {
                this.operation('super/syncServer/dataClean', {}, '将内存中'+this.table+'的数据全部清除', 'dataCleanBtnDisable');
            },
            isTagOrAnchor:function () {
                if(this.table=='tag' || this.table=='anchor'){
                    return true;
                }
                return false;
            },

            update2Serm:function () {
                return this.update('update2Serm', '将Cliem端的数据更新到Serm端', 'update2SermBtnDisable');
            },

            update2Cliem:function () {
                return this.update('update2Cliem', '将Serm端的数据更新到Cliem端', 'update2CliemBtnDisable');
            },

            update:function (method, msg, btn) {
                if(!this.isTagOrAnchor()){
                    this.$alert('当前只能更新标签或者基站');
                    return false;
                }
                var rows = this.selectRows();
                if(!rows) return;

                var codes = rows.map(function (r) {
                    return r.code;
                });

                this.operation('super/syncServer/'+method, {codes}, msg, btn);
            },

            operation:function (url, params, msg, btn) {
                params.table = this.table;
                params.dbName = this.dbName;
                params.ips = [this.ip];

                this.$confirm("确认"+msg+"么？", "提示", {}).then(function () {
                        ME.vm.$http.post(url, params).then(function(res){
                            var resp=res.body;
                            if(resp.isOk){
                                ME.vm.$alert(msg+"成功！", '提示');
                                ME.vm.refresh();
                            }else {
                                ME.vm.$alert(msg+"失败！"+resp.msg, '提示', {
                                    confirmButtonText: '确定'
                                });
                            }
                            ME.vm[btn] = false;
                        });
                        ME.vm[btn] = true;
                }).catch(function(){

                });
            }
        },
    });

}


// 进入指定项目
function goToProj(code){
    if(!ME.vm.ip||!code) return;
    window.open('./syncProj.html?ip='+ME.vm.ip+'&&projCode='+code);
}
