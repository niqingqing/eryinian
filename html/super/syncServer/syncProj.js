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
            projTable:projTable,
            dbName:'',
            table:'map',
            // baseData:[],
            errmsg:'',
            ip:'',
            isShowMenu:true,
            syncProjectDtaMsg:'',
            // 同步命令参数
            params:{
                // dbName:'basic',
                ips:[],
                optionType:'map',
                projCodes:[],
            },


            basePageData:{
                url:ME.host+'/super/syncServer/getTable?ip='+this.ip+'&&d='+this.dbName+'&&t='+this.table,
                method:'get',
                queryParams:function(params){
                    return params;
                },
                // datas:ME.vm.currentData,
                search:true,
                showRefresh:true,
                idField:'id',
                uniqueId:'id',
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
                pageList:[2, 10, 25, 50, 100, 200],
                sidePagination:'client',
                toolbarAlign:'left',
                toolbar:'#projtablebar',
                columns: []
             },

        },
        created:function(){
            // 获取需要同步的服务ip

            var ip=this.getUrl('ip');
            var dbName=this.getUrl('projCode');
            if(!ip||!dbName) return;
            // window.location.history(-1);
            this.ip=ip;
            this.dbName=dbName;

            this.params.ips.push(ip);
            this.params.projCodes.push(this.dbName);
            this.basePageData.url=ME.host+'/super/syncServer/getTable?ip='+this.ip+'&&d='+this.dbName+'&&t='+this.table;
        },

        methods:{
            // 进入指定项目
            goToProj:function(proj){
                if(!this.ip||!proj||!proj.code) return;
                window.open('/');
            },
            loadPage:function(){
                $('#projtable').bootstrapTable(Object.assign(ME.vm.basePageData,pageData[ME.vm.table]));
            },
            showTableData:function(tableName){
                if(!tableName) return;
                this.table=tableName;
                $('#projtable').bootstrapTable('destroy');
                this.basePageData.url=ME.host+'/super/syncServer/getTable?ip='+this.ip+'&&d='+this.dbName+'&&t='+this.table;
                this.basePageData.columns=[];
                ME.vm.params.optionType=this.table;
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

            // syncProjData:function(){
            //     if(this.table!='projects') return;
            //     // 获取项目编码
            //     var valid=ME.vm.selectProj();
            //     if(valid){
            //        this.syncProjectDtaMsg='同步项目库'
            //        this.remoteSyncProjData();
            //     }else{
            //         ME.vm.$alert(ME.vm.errmsg, '提示', {
            //             confirmButtonText: '确定'
            //         }); 
            //     }
            // },
            isShowMenu:function(){
                alert('chufallllllllllllllllll');
                // !this.isShowMenu;
              

            },

            // // 选择项目
            // selectProj:function(){
            //     var a = $('#projtable').bootstrapTable('getSelections');
            //     if (!a || a.length<1){
            //         ME.vm.errmsg='至少选择一行记录！'
            //         return false;
            //     }
            //     // 获取需要同步的项目编码
            //     for(var i=0;i<a.length;i++){
            //         ME.vm.params.projCodes.push(a[i].code);
            //     }
            //     return true;
            // },

  

            remoteSyncProjData:function () {
                // 是否同步项目库中数据
                var msg = this.syncProjectDtaMsg?this.syncProjectDtaMsg:'同步'+projTable[ME.vm.params.optionType];
                this.$confirm("确认"+msg+"么？", "提示", {}).then(function () {
                        var url = 'super/syncServer/setOption';
                        var params = {};
                        util.deepCopy(ME.vm.params,params);
                        ME.vm.$http.post(url, params).then(function(res){
                            var resp=res.body;
                            if(resp.isOk){
                                ME.vm.dialogFormVisible = false;
                                ME.vm.$alert(msg+"成功！", '提示');
                                ME.vm.refresh();
                            }else {
                                ME.vm.$alert(msg+"失败！"+resp.msg, '提示', {
                                    confirmButtonText: '确定'
                                });
                            }
                        });
                        // ME.vm.params.projCodes=[];
                        ME.vm.syncProjectDtaMsg='';
                })
                }
        },
    });

}

