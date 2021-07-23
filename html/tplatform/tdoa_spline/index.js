/**
 * Created by zwt on 2017/9/2 0002.
 */

$(function(){
    //获取项目下所有地图
    if(!(UBIT.user.projectCode &&  UBIT.user.projectId>0)){
        alert('必须进入项目地图才能查看实验平台！')
        return false;
    }

    //获取项目下所有地图
    ME.currentProj = UBIT.user.projectCode;
    ME.currentMap=getDefaultMap();

    vueInit();

    if(!ME.currentMap){
        alert('请指定地图！')
        return
    }

    ME.tag_filter = Cookies.get('tag_filter');
    if(!ME.tag_filter){alert('请指定标签！'); return}

    getDataAndDraw(ME.currentMap, ME.tag_filter);
});



function getDataAndDraw(currentMap, tag){
    $.ajax({
        url:ME.host+ '/tplatform/tdoa/listTdoa2d_cache?map='+currentMap+'&tag='+tag,
        method:'get',
        success: function(r){
            ME.datas = [];
            for(var i=0;i<r.rows.length;i++){
                var d = r.rows[i];
                d.time_str = UBIT.getLocalTime(d.add_time);
                ME.datas.push(d);
            }

            ME.datas.sort(sortByTime);
            // console.log(ME.datas);

            //获取输入的数据
            getTofDatas(currentMap, tag);
        }
    });
}



function getTofDatas(currentMap, tag) {
    $.ajax({
        url:ME.host+ '/tplatform/tof/listDistance_cache?map='+currentMap+'&tag='+tag,
        method:'get',
        success: function(r){
            var datas = [];
            for(var i=0;i<r.rows.length;i++){
                var d = r.rows[i];
                d.time_str = UBIT.getLocalTime(d.add_time);
                datas.push(d);
            }

            datas.sort(sortByTime);
            ME.distances = datas;

            // console.log(datas);

            //获取输入的数据
            getInputDataAndDraw(currentMap, tag);
        }
    });
}



function getInputDataAndDraw(currentMap, tag){
    $.ajax({
        url:ME.host+ '/tplatform/tdoa/listTdoaInputDatas_cache?map='+currentMap+'&tag='+tag,
        method:'get',
        success: function(r){
            ME.inputDatas = [];
            for(var i=0;i<r.rows.length;i++){
                var d = r.rows[i];
                d.add_time_str = UBIT.getLocalTime(d.add_time);
                ME.inputDatas.push(d);
            }

            ME.inputDatas.sort(function(a,b){
                return a.add_time - b.add_time;
            });

            console.log(ME.inputDatas);

            drawCharts();
        }
    });
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
            tag_filter:Cookies.get('tag_filter'),

            currentProj:'',  //地图传过来项目code
            currentMap:'',   //当前地图
            maps:[],         //所有项目地图
        },
        created:function(){
            this.$http.get(ME.host+'/config/getGlobalFlag?key=debugBuf').then(function(res){
                this.debugBuf = Boolean(Number(res.body));
            });
            if(hostIp.indexOf('192.168')>= 0){
                this.showRemote = true;
            }

            //获取项目下所有地图
            this.currentProj=ME.currentProj;
            this.currentMap=ME.currentMap;
            this.$http.get('map/list?projectCode='+this.currentProj).then(function(res){
                this.maps=res.body;
            });
        },
        methods:{
            hideAllSeries:function(){
                hideAllSeries(ME.chart);
            },
            clearAll:function(){
                this.$confirm("确认清除掉所有的原始数据么？","提示",{ }).then(function() {
                    ME.vm.$http.get(ME.host+'/tplatform/source/clearAll?map='+ME.vm.currentMap).then(function(res){
                        ME.vm.clearAllDisable = false;
                        var result = res.body;
                        if(result.isOk){
                            window.location.reload();
                        }else {
                            this.$alert("清除失败！"+result.msg, '提示', {
                                confirmButtonText: '确定'
                            });
                        }
                        //放开按钮

                    });
                }).catch(function(){
                    ME.vm.clearAllDisable = false;
                });
                //屏蔽按钮
                    ME.vm.clearAllDisable = true;
            },
            importRemoteAll:function(){
                this.$confirm("此操作是将远程服务器redis_db2中的数据导入到本地的redis_db2的操作，导库前会将本地redis_db2中的数据全部清除，是否确定执行？","提示",{ }).then(function() {
                    ME.vm.$http.get(ME.host+'/tplatform/source/importRemoteAll?map='+this.currentMap).then(function(res){
                        ME.vm.importRemoteAllDisable = false;
                        var result = res.body;
                        if(result.isOk){
                            this.showSuccess("导入成功！"+result.msg);
                        }else {
                            this.showError("导入失败！"+result.msg);
                        }
                        //放开按钮
                    });
                }).catch(function(){
                    ME.vm.importRemoteAllDisable = false;
                });
                //屏蔽按钮
                ME.vm.importRemoteAllDisable = true;
            },
            exportData:function(){
                var datas = [];

                var clumunName = ["tag","seq","anchor","timestamp","rssi","power","rssiRxMinusFP","IDiff","luep","mc","fp","plos","add_time"];
                //{:"0f000000",:"ba000000",:"02000000",:"30859ef3c3000000",:-69,:3834,:7,:42,:0,:98,:8.444955295790688,:1507959940769}

                datas.push(clumunName);
                for(var i=0;i<ME.inputDatas.length;i++){
                    var d = ME.inputDatas[i];
                    if(this.tag_filter){
                        if(d.tag!=this.tag_filter) continue;
                    }

                    var values = [d.tag,d.seq,d.anchor,d.timestamp,d.rssi,d.power,d.rssiRxMinusFP,d.IDiff,d.luep,d.mc,d.fp,d.plos,d.add_time];
                    datas.push(values);
                }

                UBIT.exportCsv(datas,'rssi');
            },

            exportDistances:function(){
                var datas = [];

                var clumunName = ["tag","seq","anchors", "diff","add_time"];
                //{:"0f000000",:"ba000000",:"02000000",:"30859ef3c3000000",:-69,:3834,:7,:42,:0,:98,:8.444955295790688,:1507959940769}

                datas.push(clumunName);
                for(var i=0;i<ME.datas.length;i++){
                    var d = ME.datas[i];
                    if(this.tag_filter){
                        if(d.tag!=this.tag_filter) continue;
                    }
                    var diffs = d.tdoa.diffs;

                    if(typeof(diffs) == 'number' ){

                        var values = [d.tag,d.seq];
                        values.push(d.mac);
                        values.push(diffs);
                        values.push(d.add_time);
                        datas.push(values);

                    }else {
                        for(var k in diffs){
                            var macs = k.split('_');
                            var values = [d.tag,d.seq];
                            values.push(macs[1] + ':' + macs[0]);
                            values.push(diffs[k]);
                            values.push(d.add_time);
                            datas.push(values);
                        }
                    }

                }

                UBIT.exportCsv(datas,'distancesDiff');
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
            refresh:function () {
                window.location.reload();
            },
            save_tag_filter:function (val) {
                Cookies.set('tag_filter', val);
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
            reloadByMap: function(){
                localStorage.setItem('tplaformMap',this.currentMap);
                this.refresh()
            }
        },
    });
}


function drawCharts () {
    $('.divChart').remove();
    charts ();
    distanceCharts ();
    inputCharts();
}


function getChartDatas(anObj, nameIdx, d, idx, anObj){
    var name = 'A'+anchors[i].id+'至A'+anchors[0].id+'的距离差';

    if(anObj.name == name){
        var y = d.diffs[0];
        if(nameIdx==2){
            y = d.diffs[1];
        }else if(nameIdx==3){
            y = d.diffs[1]-d.diffs[0];
        }else if(nameIdx==4){
            y = d.diffs[0]-d.diffs[1];
        }
        var t = UBIT.deepCopy(d);
        t.x = d.time;
        t.y = y;
        t.idx = idx;
        anObj.data.push(t);
        return;
    }
}

function getAnchors(){
    var as = [];
    for(var i=0;i<ME.datas.length;i++){
        var data = ME.datas[i];
        if(data.mac){
            return data.mac.split('-');
        }

        var tdoa = data.tdoa;
        for(var anchor of tdoa.anchors){
            as.push(anchor.mac);
        }
        return as;
    }
    return false;
}



// diffs[0] = d1 - d0; diffs[1] = d2 - d0; diffs[2] = d2 -d1 = diffs[1] - diffs[0]
function distanceCharts () {
    var series = [];
    var datas = ME.distances;

    for(var i=0;i<datas.length;i++){
        var r = datas[i];
        setSeriesData(series, r.anchor, r.distance, r, i);
    }

    console.log('distance_line series:',series);

    var div=document.createElement("div");
    div.id = 'distance_line';
    div.setAttribute("class","divChart");
    document.body.appendChild(div);

    ME.distanceChart = Highcharts.chart('distance_line', {
        chart: {
            type: 'spline',
            zoomType: 'x'
        },
        title: {
            text: '标签到各个基站之间的距离走势'
        },
        xAxis: {
            title: {
                text: '时间戳(ms)'
            }
        },
        yAxis: {
            title: {
                text: '距离(m)'
            },
        },
        legend: {
            enabled: true
        },
        tooltip:{
            crosshairs:true,
            shared:true,
            pointFormat: '序号:<b>{point.idx}</b><br/>' +
            'tag:{point.target}<br>' +
            'seq:{point.seq}<br>' +
            'time:{point.time_str}<br>' +
            '<p style="color: {series.color}">坐标: ' +
            '<b>{point.y}, {point.x} </b></p><br>' +
            '<p>---<br/></p>',
        },
        plotOptions: {
            series: {
                turboThreshold:0,//添加这一句，如果设置为0，则取消此项检查
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


// diffs[0] = d1 - d0; diffs[1] = d2 - d0; diffs[2] = d2 -d1 = diffs[1] - diffs[0]
function charts () {
    var series = [];
    var anchors = [];

    for(var i=0;i<ME.datas.length;i++){
        var r = ME.datas[i];

        if(r.hasOwnProperty('isOk') && !r.isOk){
            console.warn(r.msg);
            continue;
        }

        //一维
        if(r.hasOwnProperty('mac')){

            var diff = r.tdoa;
            anchors = r.mac.split('_');

            var name_source = anchors[1]+'至'+anchors[0]+'的测量';

            setSeriesData(series, name_source, diff, r, i, '1d');

        }else {
            //二维
            anchors = r.tdoa.anchors;
            if(!anchors){
                console.warn(r);
                continue;
            }
            var diffs_predict = r.tdoa.diffs_predict;
            var diffs_source = r.tdoa.diffs_source;

            // console.log(r);
            var m = anchors[0];
            for(var j=1;j<anchors.length;j++) {
                var name = anchors[j].mac+'至'+m.mac+'的预测';
                var name_source = anchors[j].mac+'至'+m.mac+'的测量';

                var diff_predict = diffs_predict[m.mac+'_'+anchors[j].mac];
                var diff_source = diffs_source[m.mac+'_'+anchors[j].mac];

                setSeriesData(series, name, diff_predict, r, i, '2d');
                setSeriesData(series, name_source, diff_source, r, i, '2d');

            }

        }
    }

    // console.log('dd_line series:',series);

    var div=document.createElement("div");
    div.id = 'dd_line';
    div.setAttribute("class","divChart");
    document.body.appendChild(div);

    ME.chart = Highcharts.chart('dd_line', {
        chart: {
            type: 'spline',
            zoomType: 'x'
        },
        title: {
            text: '标签到各个基站之间的距离差走势'
        },
        xAxis: {
            title: {
                text: '时间戳(ms)'
            }
        },
        yAxis: {
            title: {
                text: '距离差(m)'
            },
        },
        legend: {
            enabled: true
        },
        tooltip:{
            crosshairs:true,
            shared:true,
            pointFormat: '序号:<b>{point.idx}</b><br/>' +
            'tag:{point.tag}<br>' +
            'seq:{point.seq}<br>' +
            'time:{point.time_str}<br>' +
            '<p style="color: {series.color}">坐标: ' +
            '<b>{point.y}, {point.x} </b></p><br>' +
            '<p>---<br/></p>',
        },
        plotOptions: {
            series: {
                turboThreshold:0,//添加这一句，如果设置为0，则取消此项检查
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


function setSeriesData(series, name, diff, d, i, type) {

    var flag = false;
    for(var k=0;k<series.length;k++) {
        var s = series[k];
        if(name == s.name){
            flag = true;
            var t = UBIT.deepCopy(d);
            t.x = d.add_time;
            t.y = diff;
            t.idx = i;
            s.data.push(t);
        }
    }

    if(!flag){
        var t = UBIT.deepCopy(d);
        t.x = d.add_time;
        t.y = diff;
        t.idx = i;

        var a_ref = {name:name, data:[t]};
        series.push(a_ref);
    }
}


/**
 * 计算定位频率
 */
function calcFreq(){
    var len = ME.datas.length;
    if(len>100) len = 100;

    for(var i=0;i<len;i++) {
        var d = ME.datas[i];
        if (ME.vm.tag_filter && ME.vm.tag_filter !== '' && d.tag !== ME.vm.tag_filter) {
            continue;
        }
    }
}


function sortByTime(item1,item2){
    return item1.add_time - item2.add_time;
}


/**
 * {
  "tag": "18000000",
  "seq": "b2000000",
  "anchor": "02000000",
  "rssi": -70,
  "power": 4203,
  "rssiRxMinusFP": 6,
  "IDiff": 17,
  "luep": 0,
  "mc": 100,
  "plos": 6.443918448733712,
  "add_time": 1504175032890
}
 */
function initSerieItem(name, series){
    series.push({name:name, datas:{}});
}

function getInputChartDatas(d, i, series){
    for(var i=0;i<series.length;i++){
        var s = series[i];
        var t = UBIT.deepCopy(d);

        t.y = t[s.name];
        t.x = t.add_time;

        var name = d.anchor+'_'+s.name;
        if(d.weak){
            name += '_w';
        }
        var dd = s.datas[name];
        if(!dd){
            dd = {name:name,data:[]};
        }
        dd.data.push(t);
        s.datas[name] = dd;
    }
}

ME.subTitle = {
    rssi:'rssi => 接收信号强度; 值越大越好（距离越近值越大），正常的取值范围：[-95dB,-59dB]',
    mc:'mc => fpAmp/pkAmp; fpAmp = max{ fpAmpl1, fpAmpl2, fpAmpl3}, 正常的取值范围：[0,100],越接近100，则认为LOS(无遮挡)，越小表示遮挡越严重',
    avgMc:'avgMc =>最近1秒内连续点的mc的平均值',
    plos:'plos=>svm 获得的无遮挡得分，分数越高越好',
    rssiRxMinusFP:'RssiRxMinusFP => 接收信号强度（rssi）与first path的差值; 差值的绝对值越小越好，小于6dB认为LOS(无遮挡)，大于10dB认为是NLOS',

    IDiff:'IDiff => | first path position - peak path position |; 差值的绝对值越小越好，小于33认为LOS(无遮挡)，大于60认为是NLOS',
    luep:'Luep => Likelihood of Undetected Early Paths；Luep>0，表示肯定NLOS，正常值为0',
    // fp:'fp => first path index; 正常的取值范围：[700,900]',
};


function inputCharts () {
    var series = [];

    initSerieItem('rssi', series);
    initSerieItem('mc', series);
    initSerieItem('avgMc', series);

    initSerieItem('plos', series);
    initSerieItem('rssiRxMinusFP', series);
    initSerieItem('IDiff', series);
    initSerieItem('luep', series);

    // initSerieItem('fp', series);

    for(var i=0;i<ME.inputDatas.length;i++){
        var d = ME.inputDatas[i];
        if(ME.vm.tag_filter && ME.vm.tag_filter!=='' && d.tag!==ME.vm.tag_filter){
            continue;
        }
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

    //show tables
    showImgTable();
}

function showImgTable(){
    $('.divImg').remove();
    var div=document.createElement("div");
    div.id = 'img_desc_01';
    div.setAttribute("class","divImg");
    div.innerHTML = '<img src="./img/cl_tplat.png"><br/> 图表中的mc放大了100倍，PrNLOS即图标中的IDiff<br/>';
    document.body.appendChild(div);
}

function chartSing(divId, series, name){

    var subTitle = ME.subTitle[name];
    var div=document.createElement("div");
    div.id = divId;
    div.setAttribute("class","divChart");
    document.body.appendChild(div);

    var btn=document.createElement("input");
    btn.id = divId + 'btn';
    btn.type='button';
    btn.name="隐藏";

    // div.setAttribute("class","divChart");
    document.body.appendChild(btn);

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
            pointFormat: 'seq:<b>{point.seq}</b><br/>' +
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
