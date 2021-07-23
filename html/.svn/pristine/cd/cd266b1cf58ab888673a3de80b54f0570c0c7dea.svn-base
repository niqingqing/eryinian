/**
 * Created by LiuTao on 2017/7/03 0028.
 */



$(function(){
    init();
});

function init(){
    vueInit();
    anchorPressureTableInit(ME.vm.currentMap);
}


function anchorPressureTableInit(currentMap){

    $('#anchorPressureTable').bootstrapTable({
        url:ME.url+'list_anchor_pressure?map='+currentMap,
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

            // {field: 'error_total',title: '异常数据',width:'6%', sortable:true, searchable:true},
            // {field: 'error_ratio',title: '异常数据占比(%)',width:'6%', sortable:true, searchable:true},
            {title: '提示说明',width:'40%', sortable:true, searchable:true,
                formatter:function(value,row){
                    if(row.lost_ratio>50){
                        return '<span style="color: red">丢包严重</span>'
                    }else if(row.lost_ratio>15){
                        return '<span style="color: orange">可正常定位</span>'
                    }else{
                        return '<span style="color: green">标签正常</span>'
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








