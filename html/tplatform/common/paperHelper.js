

var options = {
    width: 2000,
    height: 1600,
    id: 'mapSvg',
    mapOpacity:0.4,
}

var gcolor = ['#FF69B4', '#9400D3', '#7B68EE', '#6A5ACD', '#6495ED', '#708090', '#00BFFF', '#00FFFF', '#00FA9A', '#FFA500', '#00FF00', '#FF1493'];

// var paper = null;
var paper=Raphael(options.id, options.width, options.height);
var zoom = 16;
var rd = 1.8;
var trd = rd;
var PROJ_MAP = 'NECCorporation_1';
ME.PanZoom = null;
ME.paperSet = [];
ME.anchors = [];
ME.point1s=[];         //存储双曲线1上各点
ME.point2s=[];         //存储双曲线2上各点
ME.tofCircles = {};

var allAnchorSet = paper.set();


function getAnchors(initMap, projMap, callback){
    if(!projMap) projMap = PROJ_MAP;
    var mapId = projMap.split('_')[1];
    $.ajax({
        url:ME.host+ '/project/anchor/list?mapId='+ mapId,
        method:'get',
        success: function(r){
            ME.anchors = [];
            //将基站的坐标转化为米
            for(var i=0;i<r.length;i++){
                var a = r[i];
                if(a){
                    a.x = a.x/100;
                    a.y = a.y/100;
                    ME.anchors.push(a);
                }
            }
            console.log('anchors:',ME.anchors);
            initMap(ME.anchors);
            if(callback){
                callback(ME.anchors);
            }
        }
    });

}

function drawBackground(){
    var imgUrl = UBIT.getImgSrc('maps', ME.map.filePath);
    var img = new Image();
    img.src = imgUrl;
    img.onload = function () {
        var c = paper.image(imgUrl, 0, 0, ME.map.realLength/100*zoom, ME.map.realWidth/100*zoom).toBack();
        c.attr({'opacity':options.mapOpacity});
    };

    img.onerror = function(msg){
        console.warn(msg);
    }
}

function drawAnchors(anchors){
    allAnchorSet.remove();
    allAnchorSet.clear();
    for(var i=0;i<anchors.length;i++){
        var an = anchors[i];
        //转换基站坐标
        an.x += ME.map.origin_x/100;
        an.y += ME.map.origin_y/100;
        an.z += ME.map.origin_z/100;
        var marker = paper.set();
        marker.node = an;

        var minMac = an.mac.substr(4);

        var text ,circle;

        if(an.isMaster>0){
            text = paper.text(an.x*zoom, an.y*zoom +zoom, minMac ).attr({'font-size':ME.vm.pointSize + 4});//+ '\t\n主(x:'+an.x.toFixed(2)+',y:'+an.y.toFixed(2)+')'
            circle = paper.circle(an.x*zoom, an.y*zoom, rd*2).attr("fill", "#ff42ea").attr("stroke", "#fff");
        }else {
            text = paper.text(an.x*zoom, an.y*zoom +zoom, minMac ).attr({'font-size':ME.vm.pointSize + 4});//+ '\t\n(x:'+an.x.toFixed(2)+',y:'+an.y.toFixed(2)+')'
            circle = paper.circle(an.x*zoom, an.y*zoom, rd*2).attr("fill", "#2ed3ff").attr("stroke", "#fff");
        }

        marker.push(text);
        marker.push(circle);

        allAnchorSet.push(marker);

        anchorClick(marker);

    }
}

function initMap(anchors){
    if(anchors.length<1){
        console.warn('本地图没有添加基站')
        return;
    }
    $.ajax({
        url:UBIT.host+ '/model/get?model=map&id='+anchors[0].mapId,
        method:'get',
        async: false,
        success: function(r){
            ME.map = r;
            ME.vm.drawBegin=true;
        }
    });

    console.log(ME.map);
    if(!ME.map){
        console.warn('load map failed!');
        return;
    }

    //评估paper 大小
    ME.xMax = ME.xMin = anchors[0].x;

    for(var i=1;i<anchors.length;i++) {
        var an = anchors[i];
        if(an.x>ME.xMax) ME.xMax = an.x;
        if(an.x<ME.xMin) ME.xMin = an.x;
    }

    // paper = Raphael(options.id, options.width, options.height);
    var pan = paper.panzoom({ initialZoom: 0, initialPosition: { x: 0, y: 0 }});
    ME.PanZoom = pan;
    pan.enable();

    //画外框
    // paper.path('M0 0L'+options.width+' 0L'+options.width+' '+options.height+'L0 '+options.height+'L0 0Z');
    // // Creates circle at x = 0, y = 0, with radius 10
    // paper.circle(0, 0, 10).attr("fill", "#f00").attr("stroke", "#fff");
    // paper.circle(options.width, 0, 10).attr("fill", "#f00").attr("stroke", "#fff");
    // paper.circle(options.width, options.height, 10).attr("fill", "#f00").attr("stroke", "#fff");
    // paper.circle(0, options.height, 10).attr("fill", "#f00").attr("stroke", "#fff");

    //画地图
    drawBackground();


    //画基站
    drawAnchors(anchors);

    //计算主基站到各个从基站之间到距离
    calcMaster2SlaveDistance(anchors);

}

function anchorClick(marker) {
    marker.click(function (event) {
        console.log(JSON.stringify({mac:marker.node.mac,x:marker.node.x,y:marker.node.y,z:marker.node.z}));
        var tofc = ME.tofCircles[marker.node.mac];
        if(!tofc) return;
        if(tofc.v) tofc.e.hide();
        else tofc.e.show();
        tofc.v = !tofc.v;
    });
}


//计算主基站到各个从基站之间到距离
function calcMaster2SlaveDistance(anchors){
    for(var i=0;i<anchors.length;i++){
        var anchor = anchors[i];
        if(!anchor.masterList) continue;

        var masters = anchor.masterList.split(',');
        for(var j=0;j<masters.length;j++){
            var master = getAnchorByCode(masters[j]);

            if(!master) continue;

            var dis = calc_distance(anchor, master);
            console.log(anchor.mac + '-'+master.mac + ' distance:' + dis);

            //画出连线
            paper.path('M'+(master.x*zoom +' '+ master.y*zoom)+'L'+(anchor.x*zoom +' '+ anchor.y*zoom) +'Z').attr({'stroke-dasharray':'--'});

        }
    }
}


function getAnchorByCode(mac, anchors){
    if(!anchors) anchors = ME.anchors;
    for(var i=0;i<anchors.length;i++){
        var anchor = anchors[i];
        if(anchor.mac==mac){
            return anchor;
        }
    }
    return false;
}


function clearCir() {
    for ( var i=0;i<ME.paperSet.length;i++){
        ME.paperSet[i].remove();
    }
}


function sortByTime(item1,item2){
    return item1.time - item2.time;
}

function anchorList(anchors){
    var ans = [];
    if(!anchors) return ans;
    for(var i=0;i<anchors.length;i++){
        ans.push(anchors[i].mac);
    }
    return ans;
}

function exportCSV(){
    var datas = [];

    datas.push(['tag','seq','time','diffs_0','diffs_1','diffs_2','coord_x','coord_y',
        'a0_id','a0_pLOS','a0_tag_time','a0_sync1','a0_sync2',
        'a1_id','a1_pLOS','a1_tag_time','a1_sync1','a1_sync2',
        'a2_id','a2_pLOS','a2_tag_time','a2_sync1','a2_sync2']);
    for(var i=0;i<ME.datas.length;i++){
        var item = ME.datas[i];
        datas.push([
            item.tag,item.seq,item.time,item.diffs[0],item.diffs[1],(item.diffs[1]-item.diffs[0]),item.t.x,item.t.y,
            item.anchors_ori[0].id,item.anchors_ori[0].pLOS,item.anchors_ori[0].tag_time,item.anchors_ori[0].sync1_time,item.anchors_ori[0].sync2_time,
            item.anchors_ori[1].id,item.anchors_ori[1].pLOS,item.anchors_ori[1].tag_time,item.anchors_ori[1].sync1_time,item.anchors_ori[1].sync2_time,
            item.anchors_ori[2].id,item.anchors_ori[2].pLOS,item.anchors_ori[2].tag_time,item.anchors_ori[2].sync1_time,item.anchors_ori[2].sync2_time
        ]);
    }
    UBIT.exportCsv(datas, 'hyperDatas_'+new Date().toLocaleString(), false);
}


function  calc_distance (coord0, coord1){
    return Math.sqrt(
        (coord0.x-coord1.x)*(coord0.x-coord1.x) +
        (coord0.y-coord1.y)*(coord0.y-coord1.y)
        // +(coord0.z-coord1.z)*(coord0.z-coord1.z)
    );
}


function drawP(diff, anchor1, anchor2, color, st){
    //画 基站 02000000 与  01000000 之间的双曲线
    var d = diff;

    //从基站
    var x1 = anchor1.coord ? anchor1.coord.x: anchor1.x ;
    var y1 = anchor1.coord ? anchor1.coord.y: anchor1.y ;

    //主基站
    var x2 = anchor2.coord ? anchor2.coord.x: anchor2.x ;
    var y2 = anchor2.coord ? anchor2.coord.y: anchor2.y ;


    var xMin = ME.xMin?ME.xMin-10 : -10, xMax = ME.xMax?ME.xMax+60:60;
    var xCenter = Math.ceil((xMax - xMin)/2);

    for(var x= xMin; x < xMax ; ){

        if(x>xCenter/4 && x<xCenter*15/4){
            x += 0.01;

        }else {
            x+=0.1;
        }

        var yy = getPointInHyperbola(x1, y1, x2, y2, d, x);
        if(isNaN(yy.r1)){
            continue;
        }

        var point1 = {x:x, y:yy.r1};
        var point2 = {x:x, y:yy.r2};

        if(d * (calc_distance(point1, {x:x1, y:y1}) - calc_distance(point1, {x:x2, y:y2})) > 0 ){
            ME.point1s.push(point1);
        }

        if(d * (calc_distance(point2, {x:x1, y:y1}) - calc_distance(point2, {x:x2, y:y2})) > 0 ){
            ME.point2s.push(point2);
        }
        // if(d * (calc_distance(point1, anchor1.coord) - calc_distance(point1, anchor2.coord)) > 0 ){
        //     var c1 = paper.circle(x*zoom, yy.r1*zoom, trd).attr("fill", color).attr("stroke", "#fff");
        //     st.push(c1);
        // }
        //
        // if(d * (calc_distance(point2, anchor1.coord) - calc_distance(point2, anchor2.coord)) > 0 ){
        //     var c2 = paper.circle(x*zoom, yy.r2*zoom, trd).attr("fill", color).attr("stroke", "#fff");
        //     st.push(c2);
        // }
    }
    var str1='';
    for(var i=0;i<ME.point1s.length;i++){
        var p1=ME.point1s[i];
        if(i==0){
            str1+='M'+p1.x*zoom+','+p1.y*zoom;
        }else{
            str1+='L'+p1.x*zoom+','+p1.y*zoom;
        }
    }
    var path1 = paper.path(str1).attr({
        "stroke": color,
        'stroke-dasharray':'.'
    });
    st.push(path1);
    ME.point1s=[];

    var str2='';
    for(var j=0;j<ME.point2s.length;j++){
        var p2=ME.point2s[j];
        if(j==0){
            str2+='M'+p2.x*zoom+','+p2.y*zoom;
        }else{
            str2+='L'+p2.x*zoom+','+p2.y*zoom;
        }
    }
    var path2 = paper.path(str2).attr({
        "stroke": color,
        'stroke-dasharray':'.'

    });
    st.push(path2);
    ME.point2s=[];
}


/****
 {
 y == (4 d^2 y1 + 8 x x1 y1 - 4 x1^2 y1 - 8 x x2 y1 + 4 x2^2 y1 - 4 y1^3 + 4 d^2 y2 - 8 x x1 y2 + 4 x1^2 y2 + 8 x x2 y2 - 4 x2^2 y2 + 4 y1^2 y2 + 4 y1 y2^2 - 4 y2^3 - Sqrt[(-4 d^2 y1 - 8 x x1 y1 + 4 x1^2 y1 + 8 x x2 y1 - 4 x2^2 y1 + 4 y1^3 - 4 d^2 y2 + 8 x x1 y2 - 4 x1^2 y2 - 8 x x2 y2 + 4 x2^2 y2 - 4 y1^2 y2 - 4 y1 y2^2 + 4 y2^3)^2 - 4 (4 d^2 - 4 y1^2 + 8 y1 y2 - 4 y2^2) (-d^4 + 4 d^2 x^2 - 4 d^2 x x1 + 2 d^2 x1^2 - 4 x^2 x1^2 + 4 x x1^3 - x1^4 - 4 d^2 x x2 + 8 x^2 x1 x2 - 4 x x1^2 x2 + 2 d^2 x2^2 - 4 x^2 x2^2 - 4 x x1 x2^2 + 2 x1^2 x2^2 + 4 x x2^3 - x2^4 + 2 d^2 y1^2 + 4 x x1 y1^2 - 2 x1^2 y1^2 - 4 x x2 y1^2 + 2 x2^2 y1^2 - y1^4 + 2 d^2 y2^2 - 4 x x1 y2^2 + 2 x1^2 y2^2 + 4 x x2 y2^2 - 2 x2^2 y2^2 + 2 y1^2 y2^2 - y2^4)])/(2 (4 d^2 - 4 y1^2 + 8 y1 y2 - 4 y2^2)),

 y == (4 d^2 y1 + 8 x x1 y1 - 4 x1^2 y1 - 8 x x2 y1 + 4 x2^2 y1 - 4 y1^3 + 4 d^2 y2 - 8 x x1 y2 + 4 x1^2 y2 + 8 x x2 y2 - 4 x2^2 y2 + 4 y1^2 y2 + 4 y1 y2^2 - 4 y2^3 + Sqrt[(-4 d^2 y1 - 8 x x1 y1 + 4 x1^2 y1 + 8 x x2 y1 - 4 x2^2 y1 + 4 y1^3 - 4 d^2 y2 + 8 x x1 y2 - 4 x1^2 y2 - 8 x x2 y2 + 4 x2^2 y2 - 4 y1^2 y2 - 4 y1 y2^2 + 4 y2^3)^2 - 4 (4 d^2 - 4 y1^2 + 8 y1 y2 - 4 y2^2) (-d^4 + 4 d^2 x^2 - 4 d^2 x x1 + 2 d^2 x1^2 - 4 x^2 x1^2 + 4 x x1^3 - x1^4 - 4 d^2 x x2 + 8 x^2 x1 x2 - 4 x x1^2 x2 + 2 d^2 x2^2 - 4 x^2 x2^2 - 4 x x1 x2^2 + 2 x1^2 x2^2 + 4 x x2^3 - x2^4 + 2 d^2 y1^2 + 4 x x1 y1^2 - 2 x1^2 y1^2 - 4 x x2 y1^2 + 2 x2^2 y1^2 - y1^4 + 2 d^2 y2^2 - 4 x x1 y2^2 + 2 x1^2 y2^2 + 4 x x2 y2^2 - 2 x2^2 y2^2 + 2 y1^2 y2^2 - y2^4)])/(2 (4 d^2 - 4 y1^2 + 8 y1 y2 - 4 y2^2))
 }
 **/
//│|PF1|-|PF2│|=d
function getPointInHyperbola(x1, y1, x2, y2, d, x){
    //除数
    var k = (2 * (4 * Math.pow(d,2) - 4 * Math.pow(y1,2) + 8 * y1 * y2 - 4 * Math.pow( y2, 2) ));

    var f1 = 4 * Math.pow(d,2) * y1 + 8 * x * x1 * y1 - 4 * Math.pow( x1,2) * y1 - 8 *x * x2 * y1 + 4 * Math.pow(x2,2)* y1 - 4*Math.pow(y1,3) + 4 *Math.pow( d,2)* y2 - 8 * x * x1 * y2 + 4 * Math.pow(x1,2)* y2 + 8 * x* x2* y2 - 4*Math.pow( x2,2)* y2 + 4 *Math.pow(y1,2)* y2 + 4*y1*Math.pow( y2,2) - 4*Math.pow( y2,3) ;


    var sqrt_f1 = (-4*Math.pow(d,2)*y1 - 8*x*x1*y1 + 4*Math.pow(x1,2)*y1 + 8*x*x2*y1 - 4*Math.pow(x2,2)*y1 + 4*Math.pow(y1,3) - 4*Math.pow(d,2)*y2 + 8*x*x1*y2 - 4*Math.pow(x1,2)*y2 - 8*x*x2*y2 + 4*Math.pow(x2,2)*y2 - 4*Math.pow(y1,2)*y2 - 4*y1*Math.pow(y2,2) + 4*Math.pow(y2,3));
    var sqrt_f1 = Math.pow(sqrt_f1,2);

    var sqrt_f2_f1 = 4*(4*Math.pow(d,2) - 4*Math.pow(y1,2) + 8*y1*y2 - 4*Math.pow(y2,2));

    var sqrt_f2_f2 = -Math.pow(d,4) + 4*Math.pow(d,2)*Math.pow(x,2) - 4*Math.pow(d,2)*x*x1 + 2*Math.pow(d,2)*Math.pow(x1,2) - 4*Math.pow(x,2)*Math.pow(x1,2) + 4*x*Math.pow(x1,3) - Math.pow(x1,4) - 4*Math.pow(d,2)*x*x2 + 8*Math.pow(x,2)*x1*x2 - 4*x*Math.pow(x1,2)*x2 + 2*Math.pow(d,2)*Math.pow(x2,2) - 4*Math.pow(x,2)*Math.pow(x2,2) - 4*x*x1*Math.pow(x2,2) + 2*Math.pow(x1,2)*Math.pow(x2,2) + 4*x*Math.pow(x2,3) - Math.pow(x2,4) + 2*Math.pow(d,2)*Math.pow(y1,2) + 4*x*x1*Math.pow(y1,2) - 2*Math.pow(x1,2)*Math.pow(y1,2)- 4*x*x2*Math.pow(y1,2) + 2*Math.pow(x2,2)*Math.pow(y1,2) - Math.pow(y1,4) + 2*Math.pow(d,2)*Math.pow(y2,2) - 4*x*x1*Math.pow(y2,2) + 2*Math.pow(x1,2)*Math.pow(y2,2)+ 4*x*x2*Math.pow(y2,2) - 2*Math.pow(x2,2)*Math.pow(y2,2) + 2*Math.pow(y1,2)*Math.pow(y2,2) - Math.pow(y2,4)

    var sqrt = Math.sqrt(sqrt_f1 - sqrt_f2_f1*sqrt_f2_f2);

    return {r1:(f1 - sqrt)/k, r2:(f1 + sqrt)/k};
}
