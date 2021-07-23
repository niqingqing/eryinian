/**
 * Created by zwt on 2018/9/19.
 */

if(!ME) ME = {};


function drawHeartRateChart(tag, div) {
    // console.log({tag, div});

    if(!tag){
        console.warn('drawHeartRateChart error : tag is ' + tag)
        return ;
    }
    $.ajax({
        url:ME.host+ '/super/tag/listTagHeartRate?tag='+tag,
        method:'get',
        success: function(r){
            var datas = [];
            for(var i=0;i<r.datas.length;i++){
                datas.push(JSON.parse(r.datas[i]));
            }
            datas = datas.sort(function (a,b) {
                return a.time - b.time;
            })
            charts_heartRate(datas, div, r.minHeart, r.maxHeart)
        }
    });
}


function charts_heartRate(datas, fdiv, minHeart, maxHeart) {

    if(!datas || datas.length<1) return ;

    var series = [{name: '心率', data:[]}];

    //速度数据
    for(var i=0;i<datas.length;i++){
        var d = datas[i];

        if(!d){
            continue;
        }

        for(var k=0;k<series.length;k++) {
            var s = series[k];
            var t = {idx:i, y: d.heartRate, x:d.time, time:new Date(d.time).Format("yyyy-MM-dd hh:mm:ss") };
            s.data.push(t);
        }
    }

    var div = document.createElement("div");
    div.id = 'heartRate_line';
    div.setAttribute("class","divChart");
    // document.body.appendChild(div);
    fdiv.appendChild(div);

    ME.heartRateChart = Highcharts.chart('heartRate_line', {
        chart: {
            type: 'spline',
            marginRight: 10,
            zoomType: 'x',
        },
        title: {
            text: '心率走势'
        },
        xAxis: {
            title: {
                text: '时间戳(ms)'
            }
        },
        yAxis: {
            title: {
                text: '心率'
            },
            plotBands:[
                {
                    from: minHeart,
                    to: maxHeart,
                    color: '#a9fda9',
                    label: {
                        text: '正常',
                        style: {
                            color: '#606060'
                        }
                    }
                },
            ]
        },
        legend: {
            enabled: true
        },
        tooltip:{
            crosshairs:true,
            shared:true,
            pointFormat: '心率:<b>{point.y}</b><br/>' +
            '<p style="color: {series.color}">时间: ' +
            '<b>{point.time} </b></p>'
        },
        plotOptions: {
            spline: {
                dataLabels: {
                    // 开启数据标签
                    enabled: true
                },
                // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                enableMouseTracking: true
            }
        },
        exporting: {
            enabled: false
        },
        series: series
    });


    // setInterval(function () {
    //     var x = (new Date()).getTime(), // 当前时间
    //         y = Math.random()*10 + 70;          // 随机值
    //
    //     charts_heartRate_reDraw({x,y})
    // }, 1000);
}



function charts_heartRate_reDraw(data) {
    if(!ME.heartRateChart) return;

    var series = ME.heartRateChart.series[0];
    series.addPoint([data.time, data.heartRate], true, true);

    // ME.heartRateChart.chart.events.load();
    // ME.heartRateChart.redraw();
}