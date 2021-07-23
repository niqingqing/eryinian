/**
 * Created by Administrator on 2017/9/1 0001.
 */




// diffs[0] = d1 - d0; diffs[1] = d2 - d0; diffs[2] = d2 -d1 = diffs[1] - diffs[0]



function tdoa2d3a_v1(diffs, anchors_ori, tag, seq, time){

    var anchors = [];
    anchors_ori.forEach(function(a){
        anchors.push(a.coord);
    });
    if(diffs.length!=2 || anchors.length!=3 ) return { errno:-1, msg:'param error' };

    //三角形原则 两边之差不能大于第三边
    // var diffValidResult = validDiffs(diffs, anchors_ori);
    // if(diffValidResult.error<0) return diffValidResult;

    // diffs[0] = -diffs[0];
    // diffs[1] = -diffs[1];

//find nearest anchor
    var nearest = 0;
    if(diffs[0] > 0){
        if(diffs[1] < 0){
            nearest = 2;
        }
    }else{
        nearest = 1;
        if(diffs[1] < diffs[0]){
            nearest = 2;
        }
    }

    var d1, d2, X1, X2, Y1, Y2;
    if(nearest == 0){
        d1 = diffs[0];
        d2 = diffs[1];
        X1 = anchors[1].x - anchors[0].x;
        Y1 = anchors[1].y - anchors[0].y;
        X2 = anchors[2].x - anchors[0].x;
        Y2 = anchors[2].y - anchors[0].y;
    }else if(nearest == 1){
        d1 = -diffs[0];
        d2 = diffs[1] - diffs[0];
        X1 = anchors[0].x - anchors[1].x;
        Y1 = anchors[0].y - anchors[1].y;
        X2 = anchors[2].x - anchors[1].x;
        Y2 = anchors[2].y - anchors[1].y;
    }else{
        d1 = -diffs[1];
        d2 = diffs[0] - diffs[1];
        X1 = anchors[0].x - anchors[2].x;
        Y1 = anchors[0].y - anchors[2].y;
        X2 = anchors[1].x - anchors[2].x;
        Y2 = anchors[1].y - anchors[2].y;
    }

    var c1 = ((X1 * X1 + Y1 * Y1) - d1 * d1) / (2.0 * d1);
    var b_a = d1 * d2 * (c1 - ((X2 * X2 + Y2 * Y2) - d2 * d2) / (2.0 * d2)) / (d2 * X1 - d1 * X2);
    var b = (d2 * Y1 - d1 * Y2) / (d2 * X1 - d1 * X2);
    var A = (b * b + 1.0) + ((-(b * b) * (X1 * X1) - Y1 * Y1) + 2.0 * b * X1 * Y1) / (d1 * d1);
    X2 = -2.0 * b_a * b + 2.0 * (((b_a * b * (X1 * X1) - b_a * X1 * Y1) - c1 * b * d1 * X1) + c1 * d1 * Y1) / (d1 * d1);
    d2 = X2 * X2 - 4.0 * A * ((b_a * b_a - c1 * c1) - (b_a * b_a * (X1 * X1) - 2.0 * c1 * b_a * d1 * X1) / (d1 * d1));

    Y1 = (-X2 + Math.sqrt(d2)) / (2.0 * A);
    Y2 = b_a - b * Y1;


    if(isNaN(Y1) || isNaN(Y2)){
        return { errno:-2, msg:'calc fail', master: anchors};
    }

    var t1 = {x:0, y:0, z:0 };
    var t2 = {x:0, y:0, z:0 };
    t1 = {
        x: anchors[nearest].x + Y2,
        y: anchors[nearest].y + Y1,
        z:0
    }
    var t = t1;

    if(d2>0){
        X2 = (-X2 - Math.sqrt(d2)) / (2.0 * A);
        d2 = b_a - b * X2;
        if(isNaN(X2) || isNaN(d2)){
            return { errno:-2, msg:'calc fail', master: anchors };
        }
        t2 = {
            x: anchors[nearest].x + d2,
            y: anchors[nearest].y + X2,
            z: 0
        }
        if(calc_distance(t2, anchors[nearest]) < calc_distance(t, anchors[nearest])){
            t = t2;
        }
    }

    // console.log('nearest:', anchors_ori[nearest], nearest);

    // const rmse = tdoa_rmse(t, anchors, diffs);
    // const center = { x:mean(anchors.map(p=>{return p.x;})), y:mean(anchors.map(p=>{return p.y;})), z:0 };
    // const max_ca = Math.max(calc_distance(center, anchors[0]), calc_distance(center, anchors[1]), calc_distance(center, anchors[2]));
    //
    var mean_pLOS = mean(anchors_ori.map(function(p){return p.pLOS}));
    var score = Math.round(10000*mean_pLOS);//*Math.pow(0.2, calc_distance(t, center)/max_ca)


    //进行卡尔曼滤波
    var output = UBIT.deepCopy(t);
    // if(score<20)output=null;
    // // console.log('output:', output);
    // // const kfed = output;
    //
    // var kfed = await ekf_moving2d(tag, time, output);
    // console.log('kfed:',kfed);
    // if(kfed.errno != 0) return;
    //
    // if(!filter_obj.hasOwnProperty(tag)){
    //     filter_obj[tag] = {
    //         media : filters.media(5),
    //         mean: filters.mean(10),
    //         lowpass2: filters.lowpass(0.4),
    //     };
    // }
    // kfed = filter_obj[tag].lowpass2(kfed);


    return {
        errno: 0,
        coord: t,
        t1: t1,
       d1: calc_distance(t1, anchors[nearest]),
        t2: t2,
       d2:calc_distance(t2, anchors[nearest]),
       diff0: -diffs[1],
       diff1: diffs[0],
       diff2: diffs[1]-diffs[0],
        nearest,
        score,
//         rmse,
    }
}


function timestamp_diff  (time1, time2){
    var d = time1 - time2;
    return (d<(-0xffffffffff/2)) ? d+0xffffffffff : d;
}

function  ticks2dist (ticks){
    return ticks*299792458.0/63897600000;
}




function tdoa_rmse(coord, anchors, diffs){
    var d0 = calc_distance(coord, anchors[0]);
    var sum = 0;
    for(var i=0; i<diffs.length; i++){
        var di = calc_distance(coord, anchors[i+1]) - diffs[i];
        sum += di*di;
    }
    return Math.sqrt(sum/diffs.length);
}

function mean(arr){
    return arr.reduce(function(p, v){return p+v;})/arr.length;
}


//三角形原则 两边之差不能大于第三边
// diffs[0] = d1 - d0; diffs[1] = d2 - d0; diffs[2] = d2 -d1 = diffs[1] - diffs[0]
function validDiffs(diffs, anchors){
    var r = validDiffsDo(diffs[0], anchors[1], anchors[0]);
    if(r.error<0) return r;
    r = validDiffsDo(diffs[1], anchors[2], anchors[0]);
    return r;
}

function validDiffsDo(diff, anchor1, anchor0){
    var dis0 = calc_distance(anchor1.coord, anchor0.coord);
    var msg = 'the distance difference “'+diff+'”is larger than the distance “'+dis0+'” of '+anchor1.id + '-'+anchor0.id;
    if(Math.abs(diff)>Math.abs(dis0)){
        return {error:-11, msg: msg};
    }
    return {error:0};
}

















