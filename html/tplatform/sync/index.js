/**
 * Created by LiuTao on 2017/7/03 0028.
 */



$(function(){
    init();
});

function init(){
    vueInit();
    getDataAndDraw()
}
function getDataAndDraw(){
    if(!ME.vm.currentMap) return;

    getAnchors(initMap, ME.vm.currentMap);

}

function syncTableInit(){

    $('#syncTable').bootstrapTable({
        // data:ME.datas,
        url:ME.host+'/tplatform/sync/list_cache?map='+ME.vm.currentMap,
        method:'post',
        queryParams:function () {
            return {map:ME.vm.currentMap}
        },
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
            {field: 'sync_seq',title: 'sync_seq',width:'8%', sortable:true, searchable:true},
            {field: 'master_mac',title: 'master_mac',width:'8%', sortable:true, searchable:true},
            {field: 'anchor_mac',title: 'anchor_mac',width:'8%', sortable:true, searchable:true},
            {field: 'send_timestamp',title: 'send_timestamp',width:'10%', sortable:true, searchable:true},
            {field: 'send_diff',title: 'send_diff',width:'8%', sortable:true, searchable:true},
            {field: 'receive_timestamp',title: 'receive_timestamp',width:'10%', sortable:true, searchable:true},
            {field: 'receive_diff',title: 'receive_diff',width:'8%', sortable:true, searchable:true},

            {field: 'receive_send_diff',title: 'receive_send_diff',width:'30%', formatter:function (value,row) {
                var val = row.receive_diff - row.send_diff;
                return val*0.01565;
            }},
            {field: 'chiSquared',title: 'chiSquared',width:'10%', sortable:true, searchable:true},
            {field: 'ratio',title: 'receive_send_ratio',width:'10%', sortable:true, searchable:true},
            {field: 'ratio_diff',title: 'ratio_diff',width:'10%', sortable:true, searchable:true},
            {field: 'sync_rssi',title: 'sync_rssi',width:'4%', sortable:true, searchable:true},
            {field: 'add_time',title: 'add_time',width:'10%', sortable:true, searchable:true},
            {field: 'add_time',title: 'add_time_str',width:'30%', formatter:function (value,row) {
                if(value){
                    return UBIT.getLocalTime(value);
                }
                return value;
            }},
        ],
        responseHandler:function (res) {
            ME.datas = res;
            ME.master_slave = [];
            for(var i=0;i<ME.datas.length;i++){
                var item = ME.datas[i];
                if(ME.master_slave.indexOf(item.master_slave)<0){
                    ME.master_slave.push(item.master_slave);
                }
                item.add_time_str = UBIT.getLocalTime(item.add_time);
            }
            chartsInit();
            return res;
        }
    });

}

function syncStatisticsTableInit() {
    $('#syncStatisticsTable').bootstrapTable({
        url:ME.host+'/tplatform/statistics/list_sync?map='+ME.vm.currentMap,
        method:'get',
        // data:ME.datas,
        search:true,
        showRefresh:true,
        idField:'id',
        // height:760,
        uniqueId:'id',
        clickToSelect:true,
        singleSelect:false,
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
        toolbar:'#syncStatisticstoolbar',
        detailView: true,

        detailFormatter:function(index, row){
            return JSON.stringify(row);
        },

        columns: [
            {checkbox: true,  width: '2%',checked : true,
                // formatter:function () {
                //     return true
                // },
            },
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

        ],
        onCheck:function (row, ele) {
            var arr =[];
            var key1 = row.id.replace('_','-');
            var key2 = key1+':kalman';
            var key3 = key1+':chiSquared';
            arr.push(key1);
            arr.push(key2);
            arr.push(key3);
            ME.vm.showSeries(arr,true);
        },
        onUncheck:function (row, ele) {
            var arr =[];
            var key1 = row.id.replace('_','-');
            var key2 = key1+':kalman';
            var key3 = key1+':chiSquared';
            arr.push(key1);
            arr.push(key2);
            arr.push(key3);
            ME.vm.showSeries(arr,false);
        },
        onCheckAll:function (rowsAfter, rowsBefore) {
            var arr = [];
            for(var i=0;i<rowsAfter.length;i++){
                var row = rowsAfter[i];
                var key1 = row.id.replace('_','-');
                var key2 = key1+':kalman';
                var key3 = key1+':chiSquared';
                arr.push(key1);
                arr.push(key2);
                arr.push(key3);
            }
            ME.vm.showSeries(arr,true);
        },
        onUncheckAll:function (rowsAfter, rowsBefore) {
            var arr = [];
            for(var i=0;i<rowsAfter.length;i++){
                var row = rowsAfter[i];
                var key1 = row.id.replace('_','-');
                var key2 = key1+':kalman';
                var key3 = key1+':chiSquared';
                arr.push(key1);
                arr.push(key2);
                arr.push(key3);
            }
            ME.vm.showSeries(arr,false);
        },
        responseHandler:function (res) {
            reWriteSync(res);
            return res;
        }
    });
}
function reWriteSync(res) {
    var anchorObj ={};
    var anToAn ={};
    for(var m=0;m<ME.anchors.length;m++){
        if(!anchorObj[ME.anchors[m].code]){
            anchorObj[ME.anchors[m].code] = ME.anchors[m];
        }
        if(ME.anchors[m].masterList){
            var anArray = ME.anchors[m].masterList.split(',');
            for(var n=0;n<anArray.length;n++){
                let key = anArray[n]+'_'+ME.anchors[m].code;
                anToAn[key]={};
            }
        }
    }
    for(var i=0;i<res.length;i++){
        anToAn[res[i].id].num = (res[i].ratio_holistic_range*1).toFixed(3);
    }
    for(var key in anToAn){
        try {
            let textId = 'TEXT_' + key;
            let anchors = key.split('_');
            let num = anToAn[key].num;
            let color;
            if (num !== undefined) {
                color = num > 1.6 ? 'red' : 'green';
            } else {
                color = 'blue';
                num = '无同步包'
            }
            var deg = Math.atan((anchorObj[anchors[1]].y - anchorObj[anchors[0]].y) / (anchorObj[anchors[1]].x - anchorObj[anchors[0]].x)) * 180 / Math.PI;
            var x = ((anchorObj[anchors[0]].x + ME.map.origin_x) * zoom + (anchorObj[anchors[1]].x + ME.map.origin_x) * zoom) / 2 + 5 * Math.sin(Math.PI / 180 * deg);
            var y = ((anchorObj[anchors[0]].y + ME.map.origin_y) * zoom + (anchorObj[anchors[1]].y + ME.map.origin_y) * zoom) / 2 - 5 * Math.cos(Math.PI / 180 * deg);
            var text_obj = paper.getById(textId);
            if (text_obj) {
                text_obj.remove();
            }
            var text = paper.text(x, y, num).attr('fill', color);
            text.id = textId;
            text.rotate(deg, x, y);
        }catch (e){
            console.log(e);
        }
    }
}

function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            debugBuf:false,
            importRemoteAllDisable:false,
            clearAllDisable:false,
            sourceFlagDisable:false,
            showRemote:false,
            currentProj:'',  //地图传过来项目code
            currentMap:'',   //当前地图
            maps:[],         //所有项目地图
        },

        created:function(){

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
                syncTableInit();
                syncStatisticsTableInit();
            });

            // this.$http.post(ME.host+'/tplatform/sync/list_cache', {map:this.currentMap}).then(function(res){
            //     ME.datas = res.body;
            //     ME.master_slave = [];
            //     for(var i=0;i<ME.datas.length;i++){
            //         var item = ME.datas[i];
            //         if(ME.master_slave.indexOf(item.master_slave)<0){
            //             ME.master_slave.push(item.master_slave);
            //         }
            //         item.add_time_str = UBIT.getLocalTime(item.add_time);
            //     }
            //     syncTableInit();
            //     syncStatisticsTableInit();
            //     chartsInit();
            // });

            this.$http.get(ME.host+'/config/getGlobalFlag?key=debugBuf').then(function(res){
                this.debugBuf = Boolean(Number(res.body));
            });

            if(hostIp.indexOf('192.168')>= 0){
                this.showRemote = true;
            }

        },
        methods:{
            reloadPage:function(){
              window.location.reload();
            },
            hideAllSeries:function(){
                hideAllSeries(ME.chart);
            },
            showSeries:function (arr,flag) {
                var serieObj ={};
                for(var m=0;m<ME.chart.series.length;m++){
                    serieObj[ME.chart.series[m].name]=m;
                }
                for(var i=0;i<arr.length;i++){
                    ME.chart.series[serieObj[arr[i]]].setVisible(flag, false);
                }
                ME.chart.redraw();
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
            importRemoteAll:function(){
                this.$confirm("此操作是将远程服务器redis_db2中的数据导入到本地的redis_db2的操作，导库前会将本地redis_db2中的数据全部清除，是否确定执行？","提示",{ }).then(function() {
                    ME.vm.$http.get(ME.host+'/tplatform/source/importRemoteAll').then(function(res){
                        var result = res.body;
                        if(result.isOk){
                            this.showSuccess("导入成功！"+result.msg);
                        }else {
                            this.showError("导入失败！"+result.msg);
                        }
                        //放开按钮
                        ME.vm.importRemoteAllDisable = false;
                    });
                }).catch(function(){
//放开按钮
                    ME.vm.importRemoteAllDisable = false;
                });
                //屏蔽按钮
                ME.vm.importRemoteAllDisable = true;
            },

            sourceDelete:function(){
                this.$confirm("确认清除掉所有的原始数据么？","提示",{ }).then(function() {
                    ME.vm.$http.get('source/delete?type='+ME.vm.type+'&map='+this.currentMap).then(function(res){
                    var result = res.body;
                    if(result.isOk){
                        this.showSuccess("删除成功！");
                    }else {
                        this.showError("删除失败！"+result.msg);
                    }
                });
                }).catch(function(){});
            },

            createChart:function(){
                chartsInit();
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

            sourceImport:function(){
                this.$http.get('source/import?type='+ME.vm.type).then(function(res){
                    var result = res.body;
                    if(result.isOk){
                        this.showSuccess("数据入库成功！"+result.msg);
                    }else {
                        this.showError("数据入库失败！"+result.msg);
                    }
                });
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
            //选择地图时刷新
            reloadByMap:function(){
                // bufTableInit(ME.vm.currentMap);
                localStorage.setItem('tplaformMap',this.currentMap);
                location.reload();
            }
        },
    });

}


function chartsInit(){
    ME.vm.sync_chart_show = true;
    // var datas = $('#syncTable').bootstrapTable('getData');
    var datas = ME.datas;
    var chartDatas = [];
    for(var i=0;i<ME.master_slave.length;i++){
        chartDatas.push({name:ME.master_slave[i],type:'spline',data:[]});
    }

    for(var i=0;i<datas.length;i++){
        var item = datas[i];
        item.x = item.add_time;//毫秒
        item.y = item.ratio;
        // item.ratioT = Math.round((item.ratio-1) * 10e15)/10e4; //毫米
        for(var j=0;j<chartDatas.length;j++){
            if(item.master_slave == chartDatas[j].name){
                chartDatas[j].data.push(item);
                break;
            }
        }
    }

    //ratio kalman
    for(var i=0;i<ME.master_slave.length;i++){
        chartDatas.push({name:ME.master_slave[i]+':kalman',type:'spline',data:[]});
    }

    for(var i=0;i<datas.length;i++){
        var item_ = datas[i];
        var item = UBIT.deepCopy(item_);

        item.x = item.add_time;//毫秒
        item.y = item.ratio_kalman;
        // item.ratioT = Math.round((item.ratio-1) * 10e15)/10e4; //毫米
        for(var j=0;j<chartDatas.length;j++){
            var name = chartDatas[j].name;
            if(name.indexOf(':kalman')<0) continue;
            if(name.indexOf(item.master_slave)>=0){
                chartDatas[j].data.push(item);
                break;
            }
        }
    }
    //ratio kalman
    for(var i=0;i<ME.master_slave.length;i++){
        chartDatas.push({name:ME.master_slave[i]+':chiSquared',type:'column',data:[], yAxis: 1});
    }

    for(var i=0;i<datas.length;i++){
        var item_ = datas[i];
        var item = UBIT.deepCopy(item_);

        item.x = item.add_time;//毫秒
        if(item.chiSquared >1) {
            item.y = Math.log(item.chiSquared * 1) / Math.log(10);
        }else{
            item.y = 0;
        }
        // item.ratioT = Math.round((item.ratio-1) * 10e15)/10e4; //毫米
        for(var j=0;j<chartDatas.length;j++){
            var name = chartDatas[j].name;
            if(name.indexOf(':chiSquared')<0) continue;
            if(name.indexOf(item.master_slave)>=0){
                chartDatas[j].data.push(item);
                break;
            }
        }
    }


    console.log(chartDatas);
    if(chartDatas.length<1) return;

    var anchor = chartDatas[0].anchor_mac;

    // 创建图表
    ME.chart = Highcharts.chart('syncContainer', {

        title: {
            text: '接收时间差与发送时间差的比例(receive_diff/send_diff)走势图'
        },

        subtitle: {
            text: '接收时间差=本次的接收时间-上次的接收时间;发送时间差同理'
        },
        chart: {
            // type: 'spline',
            zoomType: 'x'
        },

        yAxis: [
            {
                title: {
                    text: '比例值'
                }
            },
            {
                title: {
                    text: 'chiSquared'
                },
                labels: {
                    // format: '{value}',
                    formatter: function () {
                        // console.log("this.value======", this.value)
                       return Math.round(Math.pow(10, this.value));
                    }
                },
                opposite: true,
                plotLines:[{ // chiSquared 为固定值 70，即 Math.round(Math.pow(10, 1.845)) = 70
                    color: 'red',           //线的颜色
                    dashStyle: 'longdashdot',     //默认值，这里定义为实线
                    value: 1.845,               //定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
                    width: 1                //标示线的宽度，3px
                }]
            }
        ],
        xAxis: {
            title: {
                text: '时间戳'
            }
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        tooltip: {
            crosshairs:true,
            shared:true,
            useHTML: true,
            headerFormat: '<table>',
            pointFormat:
            '<tr><td>sync_seq:</td><td>{point.sync_seq}</td></tr>' +
            '<tr><td>anchor_mac:</td><td>{point.anchor_mac}</td></tr>' +
            '<tr><td>master_mac:</td><td>{point.master_mac}</td></tr>' +
            '<tr><td>send_timestamp:</td><td>{point.send_timestamp}</td></tr>' +
            '<tr><td>receive_timestamp:</td><td>{point.receive_timestamp}</td></tr>' +
            '<tr><td>toa_kalman:</td><td>{point.toa_kalman}</td></tr>' +
            '<tr><td>ratio:</td><td>{point.ratio}</td></tr>' +
            '<tr><td>ratio_kalman:</td><td>{point.ratio_kalman}</td></tr>' +
            '<tr><td>chiSquared:</td><td>{point.chiSquared}</td></tr>' +
            '<tr><td>add_time:</td><td>{point.add_time_str}</td></tr>' +
            '<tr><td style="color: {series.color}">坐标: </td>' +
            '<td><b>{point.ratio}, {point.x} </b></td></tr>' +
            '',
            footerFormat: '</table>',
            valueDecimals: 2
        },

        plotOptions: {
            series: {
                turboThreshold:0,//添加这一句，如果设置为0，则取消此项检查
            },
            spline: {
                marker: {
                    enabled: true
                }
            },
        },

        series: chartDatas,

    });
    hideAllSeries(ME.chart);
    // chartMore();
}

function initSerieItem(name, series){
    series.push({name:name, datas:{}});
}


//receive_timestamp spline
function chartMore(){
    var datas = $('#syncTable').bootstrapTable('getData');

    var series = [];

    initSerieItem('receive_timestamp', series);
    // initSerieItem('mc', series);

    for(var i=0;i<datas.length;i++){
        var d = datas[i];
        getInputChartDatas(d, i, series);
    }

    for(var i=0;i<series.length;i++){
        var item = series[i];
        // console.log('item:',item);
        var item_series = [];
        for(var k in item.datas){
            item_series.push(item.datas[k]);
        }
        // console.log(item_series);
        chartSing(item.name+'_line', item_series, item.name);
    }
}


function getInputChartDatas(d, i, series){
    for(var i=0;i<series.length;i++){
        var s = series[i];
        var t = UBIT.deepCopy(d);

        t.y = t[s.name];
        t.x = t.add_time;

        var name = d.anchor_mac+'_'+s.name;
        var dd = s.datas[name];
        if(!dd){
            dd = {name:name,data:[]};
        }
        dd.data.push(t);
        s.datas[name] = dd;
    }
}


function chartSing(divId, series, name){

    var subTitle = name;
    // var subTitle = ME.subTitle[name];

    var div=document.createElement("div");
    div.id = divId;
    div.setAttribute("class","divChart");
    document.body.appendChild(div);

    // console.log('series:',series);
    // console.log('subTitle:',subTitle);

    Highcharts.chart(divId, {
        chart: {
            type: 'spline',
            zoomType: 'x'
        },
        pane:{
            background:[{
                backgroundColor:{
                    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                    stops: [
                        [0, '#003399'],
                        [1, '#3366AA']
                    ]
                }
            }],
        },
        title: {
            text: '定位包输入参数'+name+'走势'
        },
        subtitle:{
            text:subTitle,
        },
        xAxis: {
            title: {
                text: '时间戳'
            }
        },
        yAxis: {
            title: {
                text: '参数:'+name
            },
        },
        legend: {
            enabled: true
        },
        tooltip:{
            crosshairs:true,
            shared:true,
            pointFormat: 'seq:<b>{point.sync_seq}</b><br/>' +
            'time:{point.add_time_str}<br>' +
            '<p style="color: {series.color}">坐标: ' +
            '<b>{point.y}, {point.x} </b></p><br>' +
            '<p>---<br/></p>',
        },
        plotOptions: {
            series: {
                turboThreshold:10000,//添加这一句，如果设置为0，则取消此项检查
            },
            spline: {
                marker: {
                    enabled: true
                }
            }
        },
        exporting: {
            enabled: false
        },
        series: series
    });
}



