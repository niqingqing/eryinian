/**
 * Created by zwt on 2017/9/1 0001.
 */

ME.anchors = [{"x":0.21,"y":0.14,"z":1,"mac":"24010090","angle":218.4275108739899},
    {"x":4.15,"y":6.01,"z":1,"mac":"25010090","angle":123.46913373855966},
    {"x":0.36,"y":0.31,"z":1,"mac":"50010090","angle":203.18340209494065}];

ME.diffs = [-3.561569686127103,2.0859767281178296];


$(function(){
    vueInit();
});


function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            anchors:'',
            diffs:'',
        },
        created:function(){

        },
    });
}


function drawCurve(){
    if(!ME.vm.anchors || !ME.vm.diffs){
        // console.error('anchors and diffs is need');
        // return ;

    }else {
        ME.anchors = JSON.parse(ME.vm.anchors);
        ME.diffs = JSON.parse(ME.vm.diffs);
    }

    for(var i in ME.anchors){
        var anchor = ME.anchors[i];

        if(i==0){
            anchor.isMaster = 1;
        }else {
            anchor.masterList = ME.anchors[0].mac;
        }

    }

    initMap(ME.anchors);

    var st = paper.set();
    draw2D(st)
    ME.paperSet.push(st);
}



function draw2D(st){

    var anchors = ME.anchors;
    var diffs = ME.diffs;

    var colors = ["#35ffe7","#4fff29","#fff530","#3247ff","#ff3983"];
    var num = 0;

    for(var i in diffs){
        if(isRealNum(i)){
            drawP(diffs[i],anchors[i], anchors[0], colors[i], st);
        }else {
            var macs = i.split('_');
            drawP(diffs[i],getAnchorByCode(macs[1], anchors), getAnchorByCode(macs[0], anchors), colors[num], st);
            num ++;
        }
    }
}






