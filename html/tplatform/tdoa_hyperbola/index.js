/**
 * Created by zwt on 2017/9/1 0001.
 */


$(function(){
    getAnchors(initMap);
    getDataAndDraw();
});



function getDataAndDraw(){
    $.ajax({
        url:ME.host+ '/tplatform/tdoa/listTdoa2d_cache',
        method:'get',
        success: function(r){
            ME.datas = [];
            for(var i=0;i<r.rows.length;i++){
                var row = r.rows[i];
                ME.datas.push(JSON.parse(row));
            }
            ME.datas.sort(sortByTime);
            console.log(ME.datas);
            // JSON.stringify(ME.datas);
            vueInit();
        }
    });

}



function drawCurve(data){
    // console.log(data);

    var r = data.r;
    if(!r.isOk){
        // alert('无解:'+JSON.stringify(r));
       console.warn(r.msg);return;
    }
    console.log(data, 'score:',r.score, 'anchors:',anchorList(r.group.anchors));

    var st = paper.set();

    //ct_coord
    var size = trd+15;
    var ct_coord = paper.rect(r.coord.x*zoom - size/2, r.coord.y*zoom - size/2, size, size).attr("fill", "#192cff").attr("stroke", "#fff");
    st.push(ct_coord);

    if(r.coord1){
        var ct1 = paper.circle(r.coord1.x*zoom, r.coord1.y*zoom, trd+5).attr("fill", "#ff1c24").attr("stroke", "#fff");
        st.push(ct1);
    }

    if(r.coord2){
        var ct2 = paper.circle(r.coord2.x*zoom, r.coord2.y*zoom, trd+5).attr("fill", "#ff1c24").attr("stroke", "#fff");
        st.push(ct2);
    }

    // data.diffs : diffs[0] = d1 - d0; diffs[1] = d2 - d0; diffs[2] = d2 -d1 = diffs[1] - diffs[0]
    var anchors = r.group.anchors;
    var diffs = r.diffs;

    var colors = ["#35ffe7","#4fff29","#fff530","#3247ff","#ff3983"];
    for(var i=0;i<diffs.length;i++){
        drawP(diffs[i],anchors[i+1], anchors[0], colors[i], st);
    }

    ME.paperSet.push(st);
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



function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            point:0,
            max:0,
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
                drawCurve(data);
            }
        },
    });
}

//
// function next(){
//     ME.point += 1;
//     if(ME.point>=ME.datas.length){
//         ME.point = ME.datas.length -1;
//         alert('已经是最后一个数据了');
//         return ;
//     }
//     var data = ME.datas[ME.point];
//     drawCurve(JSON.parse(data));
// }
//
// function before(){
//     ME.point -= 1;
//     if(ME.point<0){
//         ME.point = 0;
//         alert('已经是第一个数据了');
//         return ;
//     }
//     var data = ME.datas[ME.point];
//     drawCurve(JSON.parse(data));
// }



