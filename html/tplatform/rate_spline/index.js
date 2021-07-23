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

    //获取输入的数据
    vueInit();

    if(!ME.currentMap){
        alert('请指定地图！')
        return
    }

    // var tag = Cookies.get('tag_filter');

    ME.tag_filter = Cookies.get('tag_filter');
    if(!ME.tag_filter){alert('请指定标签！'); return}

    getDistanceDataAndDraw();
});



function getDistanceDataAndDraw(){
    $.ajax({
        url:ME.host+ '/tplatform/tdoa/listEKF_cache?map='+ME.currentMap+'&tag='+ME.tag_filter,
        method:'get',
        success: function(r){

            ME.datas = r.rows;

            ME.datas.sort(sortByTime);

            console.log(ME.datas);

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
        },
        created:function(){
            this.$http.get(ME.host+'/config/getGlobalFlag?key=debugBuf').then(function(res){
                this.debugBuf = Boolean(Number(res.body));
            });
            // if(hostIp.indexOf('192.168')>= 0){
            //     this.showRemote = true;
            // }
        },
        methods:{
            clearAll:function(){
                this.$confirm("确认清除掉所有的原始数据么？","提示",{ }).then(function() {
                    ME.vm.$http.get(ME.host+'/tplatform/source/clearAll').then(function(res){
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
                    ME.vm.$http.get(ME.host+'/tplatform/source/importRemoteAll').then(function(res){
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

                var clumunName = ["tag","seq","anchor","timestamp","rssi","power","rssiRxMinusFP","IDiff","luep","mc","pLOS","add_time"];
                //{:"0f000000",:"ba000000",:"02000000",:"30859ef3c3000000",:-69,:3834,:7,:42,:0,:98,:8.444955295790688,:1507959940769}

                datas.push(clumunName);
                for(var i=0;i<ME.inputDatas.length;i++){
                    var d = ME.inputDatas[i];
                    if(this.tag_filter){
                        if(d.tag!=this.tag_filter) continue;
                    }

                    var values = [d.tag,d.seq,d.anchor,d.timestamp,d.rssi,d.power,d.rssiRxMinusFP,d.IDiff,d.luep,d.mc,d.pLOS,d.add_time];
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
                    var diffs = d.r.diffs;
                    var anchors = d.r.group.anchors;

                    for(var k=0;k<diffs.length;k++){
                        var values = [d.tag,d.seq];
                        values.push(anchors[k+1].mac + ':' + anchors[0].mac);
                        values.push(diffs[k]);
                        values.push(d.add_time);
                        datas.push(values);
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
            refresh:drawCharts,
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
            }
        },
    });
}


function drawCharts () {
    charts ();
}


function initSeriesName(dt, series){
    var isIn = false;

    var a_ref1 = {name: 'R_params', data:[]};
    var a_ref2 = {name:'kf_rate', data:[]};
    var a_ref3 = {name:'mean_rate', data:[]};
    var a_ref4 = {name:'predict_rate', data:[]};
    var a_ref5 = {name:'real_rate', data:[]};

    for(var i=0;i<series.length;i++){
        var s = series[i];
        if(s.name == a_ref1.name){
            isIn = true;
            break;
        }
    }

    if(!isIn){
        series.push(a_ref1);
        series.push(a_ref2);
        series.push(a_ref3);
        series.push(a_ref4);
        series.push(a_ref5);
    }
}


function charts () {

    if(!ME.datas || ME.datas.length<1) return ;

    var series = [];

    //标签
    for(var i=0;i< ME.datas.length;i++) {
        var dt = ME.datas[i];
        initSeriesName(dt, series);
    }


    //速度数据
    for(var i=0;i<ME.datas.length;i++){
        var d = ME.datas[i];

        if(!d || !d.real_rate || !d.predict_rate){
            continue;
        }

        for(var k=0;k<series.length;k++) {
            var s = series[k];
            var t = UBIT.deepCopy(d);

            if( 'R_params' == s.name){
                t.y = d.R_params;
            }else if('kf_rate' == s.name){
                t.y = d.kf_rate;
            }else if('mean_rate' == s.name){
                t.y = d.mean_rate;
            }else if('predict_rate' == s.name){
                t.y = d.predict_rate;
            }else if( 'real_rate' == s.name){
                t.y = d.real_rate;
            }else {
                continue;
            }

            t.x = d.add_time;
            t.idx = i;
            s.data.push(t);
        }
    }

    console.log('dd_line series:',series);

    var div=document.createElement("div");
    div.id = 'dd_line';
    div.setAttribute("class","divChart");
    document.body.appendChild(div);

    Highcharts.chart('dd_line', {
        chart: {
            type: 'spline',
            zoomType: 'x'
        },
        title: {
            text: '标签的实际速度走势'
        },
        xAxis: {
            title: {
                text: '时间戳(ms)'
            }
        },
        yAxis: {
            title: {
                text: '速度(m)'
            },
        },
        legend: {
            enabled: true
        },
        tooltip:{
            crosshairs:true,
            shared:true,
            pointFormat: '序号:<b>{point.idx}</b><br/>' +
            // 'tag:{point.tag}<br>' +
            // 'seq:{point.seq}<br>' +
            // 'time:{point.add_time}<br>' +
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