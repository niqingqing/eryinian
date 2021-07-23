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

    ME.tag_filter = Cookies.get('tag_filter');
    if(!ME.tag_filter){alert('请指定标签！'); return}

    getDistanceDataAndDraw();
});



function getDistanceDataAndDraw(){
    $.ajax({
        url:ME.host+ '/tplatform/tof/listProcessTof_cache?map='+ME.currentMap+'&tag='+ME.tag_filter,//listTof_cache
        method:'get',
        success: function(r){
            ME.datas = [];
            for(var i=0;i<r.rows.length;i++){
                var row = JSON.parse(r.rows[i]);
                ME.datas.push(row);
            }

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

            currentProj:'',  //地图传过来项目code
            currentMap:'',   //当前地图
            maps:[],         //所有项目地图
        },
        created:function(){
            this.$http.get(ME.host+'/config/getGlobalFlag?key=debugBuf').then(function(res){
                this.debugBuf = Boolean(Number(res.body));
            });

            //获取项目下所有地图
            this.currentProj=ME.currentProj;
            this.currentMap=ME.currentMap;
            this.$http.get('map/list?projectCode='+this.currentProj).then(function(res){
                this.maps=res.body;
            });
        },
        methods:{
            reloadByMap: function(){
                localStorage.setItem('tplaformMap',this.currentMap);
                this.refresh()
            },
            hideAllSeries:function(){
                hideAllSeries(ME.chart);
            },
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
            }
        },
    });
}


function drawCharts () {
    charts ();
    charts_mc ();
    charts_z ();
}


// function initSeriesName(dt, series){
//     for(var anchor in dt.distanceMap){
//         var a_ref1 = {name: anchor, data:[]};
//         series.push(a_ref1);
//     }
// }

function initSeriesName(dt, series, type){
    if(type == 'z'){
        series.push({name: 'square_sqZ', data:[]});
        series.push({name: 'square_ref', data:[]});
        return;
    }

    for(var anchor in dt){
        if(anchor.indexOf('90') === 0 ){
            if(type == 'mc'){
                series.push({name: anchor+'_mc', data:[]});
            }else{
                series.push({name: anchor+'_s', data:[]});
                series.push({name: anchor+'_p', data:[]});
            }
        }
    }
}



function charts_mc () {

    if(!ME.datas || ME.datas.length<1) return ;

    var series = [];

    initSeriesName(ME.datas[0], series, 'mc');

    // console.log('series:;;',series);

    //速度数据
    for(var i=0;i<ME.datas.length;i++){
        var d = ME.datas[i];

        if(!d || !d.tag){
            continue;
        }

        for(var k=0;k<series.length;k++) {
            var s = series[k];
            var t = UBIT.deepCopy(d);

            for(var anchor in t){
                if(anchor.indexOf('90')===0){
                    if( anchor + '_mc' == s.name) {
                        t.y = t[anchor].mc;
                    }
                }
            }

            t.x = d.add_time;
            t.idx = i;
            s.data.push(t);
        }
    }

    // console.log('dd_line series:',series);

    var div=document.createElement("div");
    div.id = 'mc_line';
    div.setAttribute("class","divChart");
    document.body.appendChild(div);

    Highcharts.chart('mc_line', {
        chart: {
            type: 'spline',
            zoomType: 'x'
        },
        title: {
            text: 'mc走势'
        },
        xAxis: {
            title: {
                text: '时间戳(ms)'
            }
        },
        yAxis: {
            title: {
                text: 'mc'
            },
        },
        legend: {
            enabled: true
        },
        tooltip:{
            crosshairs:true,
            shared:true,
            pointFormat: '序号:<b>{point.idx}</b><br/>' +
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



function charts_z () {

    if(!ME.datas || ME.datas.length<1) return ;

    var series = [];

    initSeriesName(ME.datas[0], series, 'z');

    //速度数据
    for(var i=0;i<ME.datas.length;i++){
        var d = ME.datas[i];

        if(!d || !d.result){
            continue;
        }

        if(!d.result.isOk){
            console.warn(d.result.msg);
            continue;
        }

        for(var k=0;k<series.length;k++) {
            var s = series[k];
            var t = UBIT.deepCopy(d.result.coord_a3);

            if(s.name == 'square_sqZ'){
                t.y = t.sqZ;
            }else if(s.name == 'square_ref'){
                t.y = t.ref;
            }
            t.x = d.add_time;
            t.idx = i;
            s.data.push(t);
        }
    }

    // console.log('dd_line series:',series);

    var div=document.createElement("div");
    div.id = 'squareZ_line';
    div.setAttribute("class","divChart");
    document.body.appendChild(div);

    Highcharts.chart('squareZ_line', {
        chart: {
            type: 'spline',
            zoomType: 'x'
        },
        title: {
            text: 'Z^2走势'
        },
        xAxis: {
            title: {
                text: '时间戳(ms)'
            }
        },
        yAxis: {
            title: {
                text: 'Z^2'
            },
        },
        legend: {
            enabled: true
        },
        tooltip:{
            crosshairs:true,
            shared:true,
            pointFormat: '序号:<b>{point.idx}</b><br/>' +
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



function charts() {

    if(!ME.datas || ME.datas.length<1) return ;

    var series = [];

    initSeriesName(ME.datas[0], series);

    // console.log('series:;;',series);

    //速度数据
    for(var i=0;i<ME.datas.length;i++){
        var d = ME.datas[i];

        if(!d || !d.tag){
            continue;
        }

        for(var k=0;k<series.length;k++) {
            var s = series[k];
            var t = UBIT.deepCopy(d);

            for(var anchor in t){
                if(anchor != 'tag' && anchor != 'add_time'){
                    if( anchor + '_s' == s.name){
                        t.y = t[anchor].source;
                    }

                    if( anchor + '_p' == s.name){
                        t.y = t[anchor].predict;
                    }
                }
            }

            t.x = d.add_time;
            t.idx = i;
            s.data.push(t);
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
            text: '标签TOF走势'
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
