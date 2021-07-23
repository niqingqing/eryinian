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
    broadTableInit(ME.vm.currentMap);
    heartTableInit(ME.vm.currentMap);
    faultTableInit(ME.vm.currentMap);
}


function syncTableInit(currentMap){

    $('#syncTable').bootstrapTable({
        url:ME.url+'list_sync?map='+currentMap,
        method:'get',
        search:true,
        showRefresh:true,
        idField:'id',
        // height:760,
        uniqueId:'id',
        clickToSelect:true,
        singleSelect:true,
        sortable:true,
        striped:true,
        showColumns:true,
        sortName:'id',
        sortOrder:'asc',
        pagination:true,
        pageSize:10,
        pageList:[5, 10, 20, 40, 100, 200, 1000],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#synctoolbar',
        detailView: true,
        detailFormatter:function(index, row){
            return JSON.stringify(row);
        },

        columns: [
            {field: 'slave',title: '从基站',width:'8%', sortable:true, searchable:true},
            {field: 'master',title: '主基站',width:'8%', sortable:true, searchable:true},
            {field: 'freq',title: '频率(hz)',width:'6%', sortable:true, searchable:true},
            {field: 'cycle',title: '周期(ms)',width:'6%', sortable:true, searchable:true},
            {field: 'distance',title: '基站间距(m)',width:'8%', sortable:true, searchable:true,
                formatter:anchor_distance_formatter
            },
            {field: 'start',title: '时间范围',width:'8%', sortable:true, visible:false, searchable:true,
                formatter:function (value,row) {
                    if(value && row.end){
                        return UBIT.getLocalTime(row.start) +'至'+ UBIT.getLocalTime(row.end);
                    }
                    return value +'至'+ row.end ;
                }
            },
            {field: 'unlost',title: '获包总数',width:'6%', sortable:true, searchable:true},
            {field: 'lost',title: '丢包总数',width:'6%', sortable:true, searchable:true},
            {field: 'lost_ratio',title: '丢包率(%)',width:'6%', sortable:true, searchable:true,
                formatter:lost_ratio_formatter
            },
            {field: 'ratio_holistic_range',title: '同步整体抖动时间变化(<1.6ns)',width:'6%', sortable:true, searchable:true,
                formatter:function(value,row){
                    if(value>1.6){
                        return '<span style="color: red">'+value+'</span>';
                    }
                    return '<span style="color: green">'+value+'</span>'
                }
            },
            {field: 'rssi_median',title: '信号强度中值',width:'6%', sortable:true, searchable:true,
                formatter:rssi_median_formatter
            },
            {field: 'weak',title: '信号强度低于-80的包数量',width:'6%', visible:false,  sortable:true, searchable:true},
            {field: 'rssi_start',title: '信号强度范围',width:'8%', visible:false, sortable:true, searchable:true,
                formatter:function (value,row) {
                    if(value && row.rssi_end){
                        return row.rssi_start +'至'+ row.rssi_end;
                    }
                    return value +'至'+ row.rssi_end ;
                }
            },



            {field: 'ratio_median',title: '同步比例中值',width:'6%', sortable:true, searchable:true},
            {field: 'ratio_start',title: '同步比例范围',width:'8%', visible:false, sortable:true, searchable:true,
                formatter:function (value,row) {
                    return value +'至'+ row.ratio_end ;
                }
            },
            {field: 'range_median',title: '同步比例变动波幅中值',width:'6%', sortable:true, visible:false, searchable:true},
            {field: 'ratio_range_error',title: '同步比例波幅超10^-7的包数量',width:'6%', sortable:true,visible:false,  searchable:true},
            {field: 'ratio_range_warn',title: '同步比例波幅超3*10^-8的包数量',width:'6%', sortable:true, visible:false, searchable:true},
            {field: 'error_total',title: '异常数据',width:'6%', sortable:true, searchable:true},
            {field: 'error_ratio',title: '异常数据占比(%)',width:'6%', sortable:true, searchable:true},

            // {title: '提示说明',width:'40%', sortable:true, searchable:true,
            //     formatter:function(value,row){
            //         if(row.hasOwnProperty('error')){
            //             return '<span style="color: red">'+row.error+'</span>';
            //         }
            //         if(row.ratio_holistic_range>1.6){
            //             return '<span style="color: red">同步整体抖动过大（抖动误差：'+ (row.ratio_holistic_range *30 ).toFixed(2)+'cm）</span>'
            //         }
            //         if(row.lost_ratio>5 || row.error_ratio>10) {
            //             return '<span style="color: red">基站之间存在严重遮挡或天线非竖直</span>'
            //         }
            //         if(row.distance<20||row.distance>100){
            //             return '<span style="color: red">间距不合理(20米-100米)</span>'
            //         }

            //         // else if (row.rssi_median<-82){
            //         //     return '位置不精准，建议空旷地基站距离小于100米'
            //         // }
            //         return '<span style="color: green">基站正常</span>'

            //     }
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
        uniqueId:'id',
        clickToSelect:true,
        singleSelect:true,
        sortable:true,
        striped:true,
        showColumns:true,
        sortName:'id',
        sortOrder:'asc',
        pagination:true,
        pageSize:10,
        pageList:[5, 10, 20, 40, 100, 200, 1000],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#tdoatoolbar',
        detailView: true,
        detailFormatter:function(index, row){
            return JSON.stringify(row);
        },
        columns: [
            {field: 'tag',title: '标签',width:'8%', sortable:true, searchable:true},
            {field: 'anchor',title: '基站',width:'8%', sortable:true, searchable:true},
            {field: 'freq',title: '频率(hz)',width:'6%', sortable:true, searchable:true},
            {field: 'cycle',title: '周期(ms)',width:'6%', sortable:true, searchable:true},
            {field: 'start',title: '时间范围',width:'8%', sortable:true, visible:false, searchable:true,
                formatter:function (value,row) {
                    if(value && row.end){
                        return UBIT.getLocalTime(row.start) +'至'+ UBIT.getLocalTime(row.end);
                    }
                    return value +'至'+ row.end ;
                }
            },
            {field: 'unlost',title: '获包总数',width:'6%', sortable:true, searchable:true},
            {field: 'lost',title: '丢包总数',width:'6%', sortable:true, searchable:true},
            {field: 'lost_ratio',title: '丢包率(%)',width:'6%', sortable:true, searchable:true,
                formatter:lost_ratio_formatter
            },
            // {field: 'custum',title: '最大耗时(ms)',width:'6%', sortable:true, searchable:true,
            //     formatter:rssi_median_formatter
            // },

            {field: 'rssi_median',title: '信号强度中值',width:'6%', sortable:true, searchable:true,
                formatter:rssi_median_formatter
            },
            {field: 'weak',title: '信号强度低于-80的包数量',width:'6%', sortable:true, searchable:true},
            {field: 'rssi_start',title: '信号强度范围',width:'8%', sortable:true, visible:false, searchable:true,
                formatter:function (value,row) {
                    if(value && row.rssi_end){
                        return row.rssi_start +'至'+ row.rssi_end;
                    }
                    return value +'至'+ row.rssi_end ;
                }
            },


            // {field: 'fp_median',title: 'fp中值',width:'6%', sortable:true, searchable:true},
            // {field: 'fp',title: 'fp>900或者fp<700的包数量',width:'6%', sortable:true, searchable:true},
            // {field: 'fp_start',title: 'fp范围',width:'8%', sortable:true, searchable:true,
            //     formatter:function (value,row) {
            //         if(value && row.fp_end){
            //             return row.fp_start +'至'+ row.fp_end;
            //         }
            //         return value +'至'+ row.fp_end ;
            //     }
            // },


            {field: 'rxFP_median',title: 'rxFP中值',width:'6%', sortable:true, visible:false, searchable:true},
            {field: 'rxFP',title: 'rxFP大于35的包数量',width:'6%', sortable:true, visible:false, searchable:true},

            {field: 'IDiff_median',title: 'IDiff中值',width:'6%', sortable:true,visible:false,  searchable:true},
            {field: 'IDiff',title: 'IDiff大于350的包数量',width:'6%', sortable:true,visible:false,  searchable:true},

            {field: 'mc_median',title: 'mc中值',width:'6%', sortable:true, searchable:true},
            {field: 'mc',title: 'mc低于30的包数量',width:'6%', sortable:true, searchable:true},

            // {field: 'plos_median',title: 'plos中值',width:'6%', sortable:true, searchable:true},
            // {field: 'plos',title: 'plos小于0的包数量',width:'6%', sortable:true, searchable:true},

            {field: 'error_total',title: '异常数据',width:'6%', sortable:true, searchable:true},
            {field: 'error_ratio',title: '异常数据占比(%)',width:'6%', sortable:true, searchable:true},
            // {title: '提示说明',width:'40%', sortable:true, searchable:true,
            //     formatter:function(value,row){
            //         if(row.lost_ratio>5 || row.error_ratio>10){
            //             return '<span style="color: red">标签与基站之间存在严重遮挡</span>'
            //         }else{
            //             return '<span style="color: green">标签正常</span>'
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
        uniqueId:'id',
        clickToSelect:true,
        singleSelect:true,
        sortable:true,
        striped:true,
        showColumns:true,
        sortName:'id',
        sortOrder:'asc',
        pagination:true,
        pageSize:10,
        pageList:[5, 10, 20, 40, 100, 200, 1000],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#broadtoolbar',
        columns: [
            {field: 'mac',title: '基站',width:'8%', sortable:true, searchable:true},
            {field: 'ip',title: 'IP',width:'12%', sortable:true, searchable:true},
            {field: 'freq',title: '频率(hz)',width:'6%', sortable:true, searchable:true},
            {field: 'cycle',title: '周期(ms)',width:'6%', sortable:true, searchable:true},
            {field: 'start',title: '时间范围',width:'8%', sortable:true, visible:false, searchable:true,
                formatter:function (value,row) {
                    if(value && row.end){
                        return UBIT.getLocalTime(row.start) +'至'+ UBIT.getLocalTime(row.end);
                    }
                    return value +'至'+ row.end ;
                }
            },
            {field: 'unlost',title: '获包总数',width:'6%', sortable:true, searchable:true},
            {field: 'lost',title: '丢包总数',width:'6%', sortable:true, searchable:true},
            {field: 'lost_ratio',title: '丢包率(%)',width:'6%', sortable:true, searchable:true,
                formatter:function (value,row) {
                    return value +'%';
                }
            },
            {field: 'error_total',title: '异常数据',width:'6%', sortable:true, searchable:true},
            {field: 'error_ratio',title: '异常数据占比(%)',width:'6%', sortable:true, searchable:true},
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
        uniqueId:'id',
        clickToSelect:true,
        singleSelect:true,
        sortable:true,
        striped:true,
        showColumns:true,
        sortName:'id',
        sortOrder:'asc',
        pagination:true,
        pageSize:10,
        pageList:[5, 10, 20, 40, 100, 200, 1000],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#hearttoolbar',
        columns: [
            {field: 'mac',title: '基站',width:'8%', sortable:true, searchable:true},
            {field: 'freq',title: '频率(hz)',width:'6%', sortable:true, searchable:true},
            {field: 'cycle',title: '周期(ms)',width:'6%', sortable:true, searchable:true},
            {field: 'start',title: '时间范围',width:'8%',visible:false, sortable:true, searchable:true,
                formatter:function (value,row) {
                    if(value && row.end){
                        return UBIT.getLocalTime(row.start) +'至'+ UBIT.getLocalTime(row.end);
                    }
                    return value +'至'+ row.end ;
                }
            },
            {field: 'unlost',title: '获包总数',width:'6%', sortable:true, searchable:true},
            {field: 'lost',title: '丢包总数',width:'6%', sortable:true, searchable:true},
            {field: 'lost_ratio',title: '丢包率(%)',width:'6%', sortable:true, searchable:true,
                formatter:lost_ratio_formatter
            },
            {field: 'netDelayAvg',title: '网络延迟（ms）',width:'6%', sortable:true, searchable:true},
            {field: 'error_total',title: '异常数据',width:'6%', sortable:true, searchable:true},
            {field: 'error_ratio',title: '异常数据占比(%)',width:'6%', sortable:true, searchable:true},
            // {title: '提示说明',width:'22%', sortable:true, searchable:true,
            //     formatter:function(value,row){
            //         if(row.netDelayAvg>50){
            //             return '<span style="color: red">网络延迟</span>'
            //         }else {
            //             return '<span style="color: green">网络正常</span>'
            //         }
            //     }
            // },
        ]

    });

}


function faultTableInit(currentMap){

    $('#faultTable').bootstrapTable({
        url:ME.url+'list_fault?map='+currentMap,
        method:'get',
        search:true,
        showRefresh:true,
        idField:'anchor',
        uniqueId:'anchor',
        clickToSelect:true,
        singleSelect:true,
        sortable:true,
        striped:true,
        showColumns:true,
        sortName:'anchor',
        sortOrder:'asc',
        pagination:true,
        pageSize:10,
        pageList:[5, 10, 20, 40, 100, 200, 1000],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#faulttoolbar',
        columns: [
            {field: 'anchor',title: '基站',width:'8%', sortable:true, searchable:true,
                formatter:function(value,row){
                    return '<span style="color: red">'+value+'</span>'
                }
            },
            {field: 'errorCode',title: '故障码',width:'6%', sortable:true, searchable:true},
            {field: 'count',title: '故障次数',width:'6%', sortable:true, searchable:true},

            {field: 'start',title: '时间范围',width:'8%',visible:true, sortable:true, searchable:true,
                formatter:function (value,row) {
                    if(value && row.end){
                        return UBIT.getLocalTime(row.start) +'至'+ UBIT.getLocalTime(row.end);
                    }
                    return value +'至'+ row.end ;
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

            currentProj:'',  //地图传过来项目code
            currentMap:'',   //当前地图
            maps:[],         //所有项目地图
        },
        created:function(){

            this.$http.get(ME.host+'/config/getGlobalFlag?key=debugBuf').then(function(res){
                this.debugBuf = Boolean(Number(res.body));
            });

            //获取项目下所有地图
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
            reloadPage:function(){
              window.location.reload();
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
                            window.location.reload();
                        }else {
                            this.showError("清除失败！"+result.msg);
                        }
                    });
                }).catch(function(){
                    ME.vm.clearAllDisable = false;
                });
            },
            sourceDelete:function(){
                this.$confirm("确认清除掉所有的原始数据么？","提示",{ }).then(function() {
                    ME.vm.$http.get('source/delete?type='+ME.vm.type).then(function(res){
                    var result = res.body;
                    if(result.isOk){
                        this.showSuccess("删除成功！");
                    }else {
                        this.showError("删除失败！"+result.msg);
                    }
                });
                }).catch(function(){});
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
                localStorage.setItem('tplaformMap',this.currentMap);
                this.reloadPage()
            }
        },
    });

}








