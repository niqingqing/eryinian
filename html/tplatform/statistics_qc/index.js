/**
 * Created by LiuTao on 2017/7/03 0028.
 */



$(function(){
    init();
});

function init(){
    vueInit();
    syncTableInit(ME.vm.currentMap);
    tdoaTableInit(ME.vm.currentMap);
    
    heartTableInit(ME.vm.currentMap);
}


function syncTableInit(currentMap){

    $('#syncTable').bootstrapTable({
        url:ME.url+'list_sync?map='+currentMap,
        method:'get',
        search:true,
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
        sortOrder:'asc',
        pagination:true,
        pageSize:100,
        pageList:[25, 50, 100, 200, 500, 1000, 2000, 10000, 20000, 50000],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#synctoolbar',
        
        
        
        

        columns: [
            {field: 'slave',title: lang['slave'],width:'8%', sortable:true, searchable:true},
            {field: 'master',title: lang['master'],width:'8%', sortable:true, searchable:true},
            {field: 'distance',title: lang['distance'],width:'8%', sortable:true, searchable:true,
                formatter:function (value,row) {
                    if(value){
                        return value.toFixed(2);
                    }
                    return value;
                }
            },
            {field: 'unlost',title: lang['unlost'],width:'6%', sortable:true, searchable:true},
            

            {field: 'rssi_median',title: lang['rssi_median'],width:'6%', sortable:true, searchable:true,
                formatter:rssi_median_formatter
            },
            {field: 'lost_ratio',title: lang['lost_ratio'],width:'6%', sortable:true, searchable:true,
                formatter:lost_ratio_formatter
            },
            {field: 'error_total',title: lang['error_total'],width:'6%', sortable:true, searchable:true},
            {field: 'error_ratio',title: lang['error_ratio'],width:'6%', sortable:true, searchable:true,
                formatter:error_ratio_formatter
            }
        //     ,{title: lang['explain'],width:'40%', sortable:true, searchable:true,
        //         formatter:function(value,row){
        //             if(row.hasOwnProperty('error')){
        //                 return '<span style="color: red">'+row.error+'</span>';
        //             }
        //             if(row.lost_ratio>5 || row.error_ratio>10) {
        //                 return '<span style="color: red">'+lang['explainNote']+'</span>'
        //             }
        //             if(row.distance<20||row.distance>100){
        //                 return '<span style="color: red">'+lang['explainNote2']+'</span>'
        //             }
        //
        //
        //
        //             return '<span style="color: green">'+lang['explainNote3']+'</span>'
        //
        //         }
        // }
        ]

    });

}



function tdoaTableInit(currentMap){

    $('#tdoaTable').bootstrapTable({
        url:ME.url+'list_tdoa?map='+currentMap,
        method:'get',
        search:true,
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
        sortOrder:'asc',
        pagination:true,
        pageSize:100,
        pageList:[25, 50, 100, 200, 500, 1000, 2000, 10000, 20000, 50000],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#tdoatoolbar',
        
        
        
        
        columns: [
            {field: 'tag',title: lang['tag'],width:'8%', sortable:true, searchable:true},
            {field: 'anchor',title: lang['anchor'],width:'8%', sortable:true, searchable:true},
            {field: 'unlost',title: lang['unlost'],width:'6%', sortable:true, searchable:true},
            {field: 'rssi_median',title: lang['rssi_median'],width:'6%', sortable:true, searchable:true,formatter:rssi_median_formatter},
            {field: 'lost_ratio',title: lang['lost_ratio'],width:'6%', sortable:true, searchable:true,
                formatter:lost_ratio_formatter
            },
            {field: 'error_total',title: lang['error_total'],width:'6%', sortable:true, searchable:true},
            {field: 'error_ratio',title: lang['error_ratio'],width:'6%', sortable:true, searchable:true,formatter:error_ratio_formatter}
            // ,{title: lang['explain'],width:'40%', sortable:true, searchable:true,
            //     formatter:function(value,row){
            //         if(row.lost_ratio>5 || row.error_ratio>10){
            //             return '<span style="color: red">'+lang['explainNote4']+'</span>'
            //         }else{
            //             return '<span style="color: green">'+lang['explainNote5']+'</span>'
            //         }
            //     }
            // },
        ]

    });

}



function broadTableInit(currentMap){

    $('#broadTable').bootstrapTable({
        url:ME.url+'list_broad?map='+currentMap,
        method:'get',
        search:true,
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
        sortOrder:'asc',
        pagination:true,
        pageSize:100,
        pageList:[25, 50, 100, 200, 500, 1000, 2000, 10000, 20000, 50000],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#broadtoolbar',
        columns: [
            {field: 'mac',title: lang['anchor'],width:'8%', sortable:true, searchable:true},
            {field: 'unlost',title: lang['unlost'],width:'6%', sortable:true, searchable:true},
            {field: 'lost_ratio',title: lang['lost_ratio'],width:'6%', sortable:true, searchable:true,
                formatter:function (value,row) {
                    return value +'%';
                }
            },

        ]

    });

}




function heartTableInit(currentMap){

    $('#heartTable').bootstrapTable({
        url:ME.url+'list_heart?map='+currentMap,
        method:'get',
        search:true,
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
        sortOrder:'asc',
        pagination:true,
        pageSize:100,
        pageList:[25, 50, 100, 200, 500, 1000, 2000, 10000, 20000, 50000],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#hearttoolbar',
        columns: [
            {field: 'mac',title: lang['anchor'],width:'8%', sortable:true, searchable:true},
            {field: 'unlost',title: lang['unlost'],width:'6%', sortable:true, searchable:true},
            {field: 'lost_ratio',title: lang['lost_ratio'],width:'6%', sortable:true, searchable:true,
                formatter:lost_ratio_formatter
            },
            {field: 'netDelayAvg',title: lang['netDelayAvg'],width:'6%', sortable:true, searchable:true},
            {title: lang['explain'],width:'22%', sortable:true, searchable:true,
                formatter:function(value,row){
                    if(row.netDelayAvg>50){
                        return '<span style="color: red">'+lang['explainNote6']+'</span>'
                    }else {
                        return '<span style="color: green">'+lang['explainNote7']+'</span>'
                    }
                }
            },
        ]

    });

}



function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            debugBuf:false,
            clearAllDisable:false,
            sourceFlagDisable:false,
            currentProj:'',  
            currentMap:'',   
            maps:[],
            operateLastTime:0
        },
        created:function(){

            this.$http.get(ME.host+'/config/getGlobalFlag?key=debugBuf').then(function(res){
                this.debugBuf = Boolean(Number(res.body));
            });

            
            if(!(UBIT.user.projectCode &&  UBIT.user.projectId>0)){
                alert(lang['initNote'])
                return false;
            }

            
            this.currentProj = UBIT.user.projectCode;
            this.currentMap=getDefaultMap();
            if(!this.currentMap){return}

            this.$http.get('map/list?projectCode='+this.currentProj).then(function(res){
                this.maps=res.body;
            });
            this.setLastTime();
        },
        methods:{
            reloadPage:function(){
              window.location.reload();
            },
            setLastTime: function () {
                //10s以外点击发送设置最新时间。
                if(Date.now()-this.operateLastTime<10000){
                    return;
                }
                this.$http.post(ME.host+'/config/setLastTime').then(function(res){
                    var result = res.body;
                    if(result.isOk){
                        this.operateLastTime = Date.now();
                    }
                });
            },
            clearAll:function(){
                this.$confirm(lang['sourceDeleteNote'],lang['prompt'],{ }).then(function() {
                    
                    ME.vm.clearAllDisable = true;
                    ME.vm.$http.get(ME.host+'/tplatform/source/clearAll?map='+ME.vm.currentMap).then(function(res){
                        
                        ME.vm.clearAllDisable = false;
                        var result = res.body;
                        if(result.isOk){
                            window.location.reload();
                        }else {
                            this.showError(lang['clearFail']+result.msg);
                        }
                    });
                }).catch(function(){
                    ME.vm.clearAllDisable = false;
                });
            },
            sourceDelete:function(){
                this.$confirm(lang['sourceDeleteNote'],lang['prompt'],{ }).then(function() {
                    ME.vm.$http.get('source/delete?type='+ME.vm.type+'&map='+this.currentMap).then(function(res){
                    var result = res.body;
                    if(result.isOk){
                        this.showSuccess(lang['deleteSuccess']);
                    }else {
                        this.showError(lang['deleteFail']+result.msg);
                    }
                });
                }).catch(function(){});
            },

            sourceFlagChange:function(newVal){
                this.$http.get(ME.host+'/config/setGlobalFlag?key=debugBuf&val='+(newVal?1:0)).then(function(res){
                    ME.vm.sourceFlagDisable = false;
                    var result = res.body;
                    if(result.isOk){
                        this.showSuccess(lang['setSuccess']+result.msg);
                    }else {
                        this.showError(lang['setFail']+result.msg);
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
                    type: type  
                });
            },
            
            reloadByMap:function(){
                localStorage.setItem('tplaformMap',this.currentMap);
                this.reloadPage()
            }

        },
    });

}

