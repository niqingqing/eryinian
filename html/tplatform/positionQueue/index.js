/**
 * Created by zwt on 2017/9/1 0001.
 */


$(function(){
    getAnchors(initMap);
    getDataAndDraw();
});




function getDataAndDraw(){
    $.ajax({
        url:ME.host+ '/tplatform/tdoa/listPositionQueue_cache',
        method:'get',
        success: function(r){
            ME.datas = [];
            if(!r.row||r.row.length<1){return}
            for(var i=0;i<r.rows.length;i++){
                var row = r.rows[i];
                ME.datas.push(JSON.parse(row));
            }
           // ME.datas.sort(sortByTime);
            console.log(ME.datas);
            // JSON.stringify(ME.datas);
            vueInit();
        }
    });

}

function sortByTime(item1,item2){
    return item1.time - item2.time;
}



function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            point:0,
            max:0,
            tag_filter: Cookies.get('tag_filter'),
        },
        created:function(){
            this.max = ME.datas.length;
        },

        methods:{
            handleChange:function(val){
                var data = ME.datas[val];
                if(!data){
                    alert(val+'>'+ME.datas.length+'? too big');
                    return ;
                }
                if(ME.vm.tag_filter!=='' && data.tag!==ME.vm.tag_filter){
                    return;
                }
                drawCurve(data);
            },
            save_tag_filter:function (val) {
                Cookies.set('tag_filter', val);
            }
        },
    });
}



function drawCurve(data){
    var st = paper.set();

    for(var i=0;i<data.queue.length;i++){
        drawPoint(data.queue[i], st);
    }

    ME.paperSet.push(st);

    console.log(data);
}




function drawPoint(data, st){

    //ct_coord
    var size = trd+15;
    //最终的结果 lowpass
    // var res_lowpass_1 = paper.ellipse(data.lowpass.x*zoom , data.lowpass.y*zoom , trd, size).attr("fill", "#ff2c1b").attr("stroke", "#fff");
    // var res_lowpass_2 = paper.ellipse(data.lowpass.x*zoom , data.lowpass.y*zoom , size, trd).attr("fill", "#ff2c1b").attr("stroke", "#fff");

    //kfed
    // var res_kfed = paper.circle(data.kfed.x*zoom, data.kfed.y*zoom, trd+5).attr("fill", "#fff933").attr("stroke", "#fff");
    // st.push(res_lowpass_1);st.push(res_lowpass_2);st.push(res_kfed);

    if(data.output){
        var res_output = paper.circle(data.output.x*zoom, data.output.y*zoom, trd+5).attr("fill", "#ff1c24").attr("stroke", "#fff");
        st.push(res_output);
    }

    if(data.x_s){
        var x_s = data.x_s;
        if(x_s.hasOwnProperty('TDOA_2D_V10')){
            var x_s_2d_source = JSON.parse(x_s['TDOA_2D_V10'][0]);
            draw2D(x_s_2d_source, st);
        }
        if(x_s.hasOwnProperty('TDOA_1D_V10')){
            for(var i=0;i<x_s['TDOA_1D_V10'].length-1;i+=2){

                var res_1D = JSON.parse(x_s['TDOA_1D_V10'][i]);
                // data.x_s['TDOA_1D_V10'] = res_1D;
                if(res_1D.coord){
                    var res_res_1D = paper.circle(res_1D.coord.x*zoom, res_1D.coord.y*zoom, trd+5).attr("fill", "#1dc0ff").attr("stroke", "#fff");
                    st.push(res_res_1D);
                }
                //1D 双曲线
                drawP(res_1D.diff,res_1D.m, res_1D.s, "#fff530", st);

            }
        }
    }

}

function draw2D(data, st){
    // console.log('draw2d:', data);
    var r = data;
    if(r.hasOwnProperty('error') && r.error!==0){
        alert(r.msg);
        return;
    }
    //ct_coord
    var size = trd+15;
    var ct_coord = paper.rect(r.coord.x*zoom - size/2, r.coord.y*zoom - size/2, size, size).attr("fill", "#192cff").attr("stroke", "#fff");
    //t1
    var ct1 = paper.circle(r.coord1.x*zoom, r.coord1.y*zoom, trd+5).attr("fill", "#ff1c24").attr("stroke", "#fff");
    //t2
    var ct2 = paper.circle(r.coord2.x*zoom, r.coord2.y*zoom, trd+5).attr("fill", "#ff1c24").attr("stroke", "#fff");
    st.push(ct_coord);st.push(ct1); st.push(ct2);

    // data.diffs : diffs[0] = d1 - d0; diffs[1] = d2 - d0; diffs[2] = d2 -d1 = diffs[1] - diffs[0]
    var anchors = data.anchors_ori;

    drawP(data.diffs_ori[0],anchors[1], anchors[0], "#35ffe7", st);
    drawP(data.diffs_ori[1],anchors[2], anchors[0], "#4fff29", st);
    drawP(data.diffs_ori[1] - data.diffs_ori[0],anchors[2], anchors[1], "#fff530", st);
}



function drawP(diff, anchor1, anchor2, color, st){
    //画 基站 02000000 与  01000000 之间的双曲线
    var d = diff;

    //从基站
    var x1 = anchor1.coord.x;
    var y1 = anchor1.coord.y;

    //主基站
    var x2 = anchor2.coord.x;
    var y2 = anchor2.coord.y;

    var xMin = 0, xMax = 0;
    if(d>0){
        //离点2近
        if(x1<x2){
            xMin = (x1 + x2)/2;
            xMax = x2 + 50;
        }else {
            xMin = 0;
            xMax = (x1 + x2)/2;
        }

    }else {
        //离点1近
        if(x1<x2){
            xMin = 0;
            xMax = (x1 + x2)/2;

        }else {
            xMin = (x1 + x2)/2;
            xMax = x1 + 50;
        }
    }

    var xMin = -10, xMax = 40;
    for(var x= xMin; x < xMax ; x+=0.1){

        var yy = getPointInHyperbola(x1, y1, x2, y2, d, x);
        if(isNaN(yy.r1)){
            continue;
        }
        var c1 = paper.circle(x*zoom, yy.r1*zoom, trd).attr("fill", color).attr("stroke", "#fff");
        var c2 = paper.circle(x*zoom, yy.r2*zoom, trd).attr("fill", color).attr("stroke", "#fff");
        st.push(c1); st.push(c2);
    }
}




