/**
 * Created by zwt on 2017/9/1 0001.
 */

var ColorsTdoa = ["#35ffe7","#4fff29","#fff530","#3247ff","#ff3983"];

$(function(){
    getDataAndDraw();
});
// window.addEventListener("beforeunload",function (e) {
//     var confirmationMessage = "\o/";
//     (e || window.event).returnValue = confirmationMessage;     //Gecko + IE
//     return confirmationMessage;
// });
window.onbeforeunload=function (event) {
    event.returnValue="刷新，跳转或关闭，将导致数据丢失，丢弃数据？";
}

function getDataAndDraw(){
    ME.seqs = [];
    vueInit();
    if(!ME.map) return;

    ME.tag = Cookies.get('tag_filter');
    if(!ME.tag) return;

    getAnchors(initMap, ME.map);
}


function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            emptySeqFlag:false,
            seqStatistics:{},
            showPositinNum:4,
            totalSeqs:0,
            point:0,
            topMax:10000,
            max:0,
            pointSize:parseInt(Cookies.get('pointSize'))?parseInt(Cookies.get('pointSize')):4,
            strokeWidth:2,
            calcData:{},
            debugBuf:false,
            clearAllDisable:false,
            sourceFlagDisable:false,
            isDrawHyperbola:false,
            isDrawAnchorLine:true,
            isDrawSourceHyperbola:false,
            seqLastLength:0,
            isDrawRefCircle:false,
            isDrawCoordCircle:true,
            timeIntervalId:null,
            timeSpace:4000,
            tag_filter: Cookies.get('tag_filter'),
            currentProj:'',  //地图传过来项目code
            currentMap:'',   //当前地图
            maps:[],         //所有项目地图
            playIntervalId:null,
            playTime:200,
            playNum:0,
            gettingSeqsFlag:false,
            onceTdoas:'',
            isDrawOkTdoa:false,
            isDrawFilterTdoa:false,
            isDrawDistanceLine:false,
            showSet:{
                one:true,
                two:true,
                three:true,
                four:true,
                five:true
            },
        },
        created:function(){
            this.$http.get(ME.host+'/config/getGlobalFlag?key=debugBuf').then(function(res){
                this.debugBuf = Boolean(Number(res.body));
                this.checkGetSeqAndCalc();
            });

            if(!(UBIT.user.projectCode &&  UBIT.user.projectId>0)){
                alert('必须进入项目地图才能查看实验平台！')
                return false;
            }

            //获取项目下所有地图
            this.currentProj = UBIT.user.projectCode;
            ME.map = this.currentMap=getDefaultMap();
            if(!this.currentMap){return}

            this.$http.get('map/list?projectCode='+this.currentProj).then(function(res){
                this.maps=res.body;
            });

        },

        methods:{
            //选择地图时刷新
            reloadByMap:function(){
                // bufTableInit(ME.vm.currentMap);
                localStorage.setItem('tplaformMap',this.currentMap);
                location.reload();
            },
            //检查debug是否打开
            checkDebug:function () {

            },
            toggleShow:function (val) {
                this.showSet[val] = !this.showSet[val];
            },
            setShowAll:function () {
                for(var key in this.showSet){
                    this.showSet[key] = !this.showSet[key];
                }
            },
            getSeq:function(lastLength) {
                var that=this;
                // start = start ? start : 0;
                // end = end ? end :-1;
                var url = ME.host+ '/tplatform/tdoa/listStepSeq_cache?map='+this.currentMap +'&tag='+ME.tag;
                if(lastLength) {
                    url = url +'&lastLength='+lastLength;
                }
                // if(end){
                //     url = url + '&end='+end;
                // }
                if(that.gettingSeqsFlag){
                    return;
                }
                that.gettingSeqsFlag = true;
                $.ajax({
                    url:url,
                    method:'get',
                    success: function(r){
                        that.gettingSeqsFlag = false;
                        if(r.isOk) {
                            that.totalSeqs = r.length ? r.length*1 : 0;
                            console.log(r.length);
                            if(!that.emptySeqFlag){
                                that.emptySeqFlag=true;
                                return;
                            }
                            window.BeforeUnloadEvent
                            // console.log("===========",r.length);
                            ME.vm.lastSeqsLength = ME.seqs.length;
                            for (var i = 0; i < r.data.length; i++) {
                                ME.seqs.push(r.data[i]);
                            }
                            ME.vm.max = ME.seqs.length;
                            var nowTime = moment().format("YYYY-MM-DD HH:mm:ss") + "_" + ME.vm.lastSeqsLength+"_"+ME.vm.max;
                            that.seqStatistics[nowTime] = r.data;
                            that.onceTdoas = nowTime + "获得：" + r.data.length;
                            // console.log(that.seqStatistics);
                            // console.log(ME.seqs.length,"#############");

                            if (ME.vm.max > this.topMax) {
                                that.stopTimeInterval();
                            } else {
                                var startseq = ME.vm.lastSeqsLength;
                                var endSeq = ME.vm.max;
                                setTimeout(function () {
                                    that.getCalc(startseq, endSeq);
                                },1000);
                            }
                        }
                    }
                });
            },
            checkGetSeqAndCalc:function () {
                if(this.debugBuf){
                    this.startTimeInterval();
                }else{
                    this.stopTimeInterval();
                }
            },
            startTimeInterval:function () {
                var that =this;
                if(!this.timeIntervalId) {
                    this.timeIntervalId = setInterval(function () {
                        // var start = ME.seqs.length;
                        // if(start<that.topMax) {
                        var lastLength = that.totalSeqs;
                        if(ME.seqs.length<that.topMax) {
                            that.getSeq(lastLength);
                        }else{
                            that.stopTimeInterval();
                        }
                    }, this.timeSpace);
                }
            },
            stopTimeInterval:function () {
                window.clearInterval(this.timeIntervalId);
                this.timeIntervalId=null;
            },
            restartTimeInterval:function () {
                this.stopTimeInterval();
                this.startTimeInterval();
            },
            showAllDatas:function () {
                console.log(this.seqStatistics);
                console.log(this.calcData);
            },
            sourceFlagChange:function(newVal){
                var that =this;
                this.$http.get(ME.host+'/config/setGlobalFlag?key=debugBuf&val='+(newVal?1:0)).then(function(res){
                    ME.vm.sourceFlagDisable = false;
                    var result = res.body;
                    if(result.isOk){
                        that.checkGetSeqAndCalc();
                        this.showSuccess("设置成功！"+result.msg);
                    }else {
                        this.showError("设置失败！"+result.msg);
                    }
                });
                ME.vm.sourceFlagDisable = true;
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
                            // window.location.reload();
                        }else {
                            this.showError("清除失败！"+result.msg);
                        }
                    });
                }).catch(function(){
                    ME.vm.clearAllDisable = false;
                });
            },
            startPlay:function () {
                var that = this;
                if(!this.playIntervald) {
                    if(isNaN(that.playNum *1)){
                        return;
                    }
                    var start = that.playNum ? that.playNum  * 1 : 0;
                    this.playIntervald = setInterval(function () {
                        var num =start;
                        that.playNum = start;
                        start++;
                        if (start < ME.seqs.length) {
                            let key = num + '_' + ME.seqs[num];
                            if(that.calcData[key]) {
                                that.clearLine();
                                drawCurve(that.calcData[key], ME.seqs[num],key);
                            }
                        }
                    }, this.playTime);
                }
            },
            clearLine:function () {
                for ( var i=0;i<ME.paperSet.length-this.showPositinNum;i++){
                    ME.paperSet[i].remove();
                }
            },
            stopPlay:function () {
                window.clearInterval(this.playIntervald);
                this.playIntervald=null;
            },
            handleChange:function(val){
                var data = ME.seqs[val];
                if(!data){
                    alert(val+'>'+ME.seqs.length+'? too big');
                    return ;
                }
                let key = val + '_' + ME.seqs[val];
                // console.log(key, this.calcData[key]);
                if(this.calcData[key]) {
                    drawCurve(this.calcData[key], ME.seqs[val],key);
                }else{
                    console.log(key, this.calcData[key]);
                }
            },
            save_tag_filter:function () {
                Cookies.set('tag_filter', this.tag_filter);
                Cookies.set('pointSize', this.pointSize);
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
            loadSeq:function () {
                var start = ME.vm.max;
                getSeq(start);
            },
            getStepCalc:function () {
                var start = ME.vm.lastSeqsLength;
                var end = ME.vm.max;
                this.getCalc(start,end);
            },
            getCalc:function (start,end) {
                var that =this;
                // start = start ? start : ME.vm.lastSeqsLength;
                // end = end ? end : ME.vm.max;
                var arrSeq = ME.seqs.slice(start,end);
                var data={
                    map:ME.vm.currentMap,
                    tag:ME.tag,
                    arrSeqStr:JSON.stringify(arrSeq),
                    start:start
                };
                $.ajax({
                    url:ME.host+ '/tplatform/tdoa/listNewManyMult_cache',
                    method:'post',
                    data:data,
                    success: function(res){
                        if(res.isOk){
                            for(var k in res.data){
                                that.paseData(res.data[k]);
                            }
                            Object.assign(that.calcData,res.data);
                        }
                    },
                    error:function (err) {
                        console.log(err);
                    }
                });
            },
            toParse:function(str) {
                try{
                    if(str) {
                        return JSON.parse(str)
                    }else{
                        return str;
                    }
                }catch (e){
                    console.error(e)
                    return str;
                }
            },
            paseData:function(data) {
                if(!data) return;
                toParse = this.toParse;
                data.results = toParse(data.results);
                data.algPos = toParse(data.algPos);
                data.finPos = toParse(data.finPos);
                data.output = toParse(data.output);
                data.prepare = toParse(data.prepare);
                data.group = toParse(data.group);
                if(data.tofMaps){
                    data.tofMaps = toParse(data.tofMaps);
                }
                var toas = {isOk: [], filter: [], timespan: {}};
                var timeStart = Date.now();
                var timeEnd = 1000;
                for (var i=0; data.toa && i<data.toa.length; i++) {
                    data.toa[i] = toParse(data.toa[i]);
                    var g = data.toa[i];
                    for (var mac in g) {
                        var val = g[mac];
                        var si = {rssi: val.si.rssi, mc: val.si.mc, avgMc: val.si.avgMc};
                        if (val.isOk) {
                            toas.isOk.push({mac, si, time: val.time});
                        } else {
                            toas.filter.push({mac, msg: val.pLOS.msg, si, time: val.time});
                        }
                        if (val.time < timeStart) timeStart = val.time;
                        if (val.time > timeEnd) timeEnd = val.time;
                    }
                }
                data.toaRes = toas;
                data.toaRes.timespan = {timeStart, timeEnd, timespan: timeEnd - timeStart};
                data.position = (data.position||[]).map(toParse);
            }
        },
    });
}
function drawCurve(data, seq,key) {
    try {
        console.log(key,data);
        drawData(data)
    }catch(e) {
        console.error(e);
    }
}
// function drawCurve(originData, seq){
//     try {
//         var data = JSON.parse(JSON.stringify(originData));
//         data.results = JSON.parse(data.results);
//         data.algPos = JSON.parse(data.algPos);
//         data.finPos = JSON.parse(data.finPos);
//         data.output = JSON.parse(data.output);
//         data.prepare = JSON.parse(data.prepare);
//         data.group = JSON.parse(data.group);
//
//         var toas = {isOk: [], filter: [], timespan: {}};
//
//         var timeStart = Date.now();
//         var timeEnd = 1000;
//         for (var t of data.toa) {
//             var g = JSON.parse(t);
//             for (var mac in g) {
//                 var val = g[mac];
//                 var si = JSON.stringify({rssi: val.si.rssi, mc: val.si.mc, avgMc: val.si.avgMc});
//                 if (val.isOk) {
//                     toas.isOk.push(JSON.stringify({mac, si, time: val.time}));
//                 } else {
//                     toas.filter.push(JSON.stringify({mac, msg: val.pLOS.msg, si, time: val.time}));
//                 }
//                 if (val.time < timeStart) timeStart = val.time;
//                 if (val.time > timeEnd) timeEnd = val.time;
//             }
//         }
//         data.toaRes = toas;
//         data.toaRes.timespan = {timeStart, timeEnd, timespan: timeEnd - timeStart};
//         var positions = [];
//         for (var gp of data.position) {
//             var g = JSON.parse(gp);
//             positions.push(g);
//         }
//         data.position = positions;
//
//         // console.log(seq, data);
//         drawData(data);
//     }catch (e){
//         console.error(e.message);
//     }
// }

function drawData(data) {
    var st = paper.set();
    try {
        drawGroup(data.group, st);
        drawPosition(data.position, st);

        if (data.tofMaps) {
            // data.tofMaps = JSON.parse(data.tofMaps);
            drawCoord({coord: data.tofMaps.ref}, st)
            drawCoord({coord: data.tofMaps.anchorRef}, st, '#ffc40d')
            drawCoord({coord: data.tofMaps.last}, st, '#110d01')
        }

        drawOutput(data, st);
        ME.paperSet.push(st);
    }catch (e){
        console.log(e);
        ME.paperSet.push(st);
    }
}


function drawGroup(group, st) {
    for(var group_key in group){
        var g = group[group_key];

        //画圆
        if(ME.vm.isDrawSourceHyperbola ){
            drawTof(g.anchors, st);
        }

        if(ME.vm.isDrawHyperbola){
            //画双曲线
            if(g.diffObj && g.diffObj.diffs_predict){
                var diffsObj = g.diffObj.diffs_predict;
                var ci = 0;
                for(var key in diffsObj){
                    var ks = key.split('_');

                    var a1 = getAnchorByCode(ks[0]);
                    var a2 = getAnchorByCode(ks[1]);

                    drawP(diffsObj[key], a2, a1, ColorsTdoa[ci++], st);
                }
            }
        }

    }
}

function drawPosition(positions, st) {
    for(var i=0;i<positions.length;i++){
        draw2D(positions[i], st);
    }
}

function drawTof(tofs, st) {
    if(!tofs) return;

    var i=0;
    for(var t of tofs){
        if(!t.tof || t.tof<0.001) continue;
        var a = getAnchorByCode(t.mac);
        if(!a) continue;
        t.x = a.x;
        t.y = a.y;
        if(t.directTof) {
            var sc = paper.circle(t.x * zoom, t.y * zoom, t.tof * zoom).attr({
                "stroke": gcolor[i % gcolor.length],
                "stroke-width": ME.vm.strokeWidth,
                "stroke-dasharray": "--.."
            });
        }else {
            var sc = paper.circle(t.x * zoom, t.y * zoom, t.tof * zoom).attr({
                "stroke": gcolor[i% gcolor.length],
                "stroke-width": ME.vm.strokeWidth
            });
        }
        st.push(sc);
        i++;
    }
}


function sortByTime(item1,item2){
    return item1.time - item2.time;
}


function drawOutput(data, st){
    var output = data.output;
    if(!output){
        console.log('no output', data.finPos, data.access);
        return;
    }
    if(output.coord) {
        drawCoord(output.coord, st, "#ff1c24")
        drawMeasureAnLineToCoord(data, st);
    }
    // var data = sdata.output.log_coords;
    //
    // //最终的结果 lowpass
    // if(data.lowpass) {
    //     var lowpass = data.lowpass;
    //     var res_kfed = paper.circle(lowpass.x * zoom, lowpass.y * zoom, trd).attr("fill", "#fff933").attr("stroke", "#fff");
    //     st.push(res_kfed);
    // }
    //
    // //kfed
    // if(data.kfed){
    //     var res_lowpass_1 = paper.ellipse(data.kfed.x*zoom , data.kfed.y*zoom , trd, size).attr("fill", "#ff2c1b").attr("stroke", "#fff");
    //     var res_lowpass_2 = paper.ellipse(data.kfed.x*zoom , data.kfed.y*zoom , size, trd).attr("fill", "#ff2c1b").attr("stroke", "#fff");
    //     st.push(res_lowpass_1);st.push(res_lowpass_2);
    // }
}
function drawMeasureAnLineToCoord(data,st) {
    var groupKey = data.finPos.group;
    var coord =  data.output.coord;
    for(var i=0;i<data.position.length;i++){
        var position =data.position[i];
        if(groupKey == position.group){
            for(var s=0;s<position.anchors.length;s++){
                if(position.anchors[s].directTof) {
                    toDrawLine(position.anchors[s].mac, coord, st, 'blue', '-');
                }else{
                    toDrawLine(position.anchors[s].mac, coord, st, 'green', '--..');
                }
            }
        }
        if(position.position && position.position.best){
            var best = position.position.best;
            if(groupKey == best.groupKey){
                for(var t=0;t<best.anchors.length;t++){
                    if(best.anchors[s].directTof) {
                        toDrawLine(position.anchors[s].mac, coord, st, 'blue', '-');
                    }else {
                        toDrawLine(best.anchors[t].mac, coord, st, 'green', '--..');
                    }
                }
            }
        }
    }
    if(data.toa) {
        var toaObj={};
        for (var m = 0; m < data.toa.length; m++) {
            for(var k in data.toa[m]){
                if(!toaObj[k]){
                    toaObj[k]={};
                }
                toaObj[k]['si'] = data.toa[m][k]['si'];
            }
        }
        if(ME.vm.isDrawOkTdoa && data.toaRes && data.toaRes.isOk) {
            for (var n = 0; n < data.toaRes.isOk.length; n++) {
                var a = data.toaRes.isOk[n].mac;
                toDrawLine(a,coord,st,'blue','-.');
                if(toaObj[a]&&toaObj[a]['si']) {
                    toDrawText(a, coord, st, 'blue', (toaObj[a]['si'].rssi*1).toFixed(3));
                }
            }
        }
        if(ME.vm.isDrawFilterTdoa && data.toaRes && data.toaRes.filter) {
            for (var l = 0; l < data.toaRes.filter.length; l++) {
                var b = data.toaRes.filter[l].mac;
                toDrawLine(b,coord,st,'yellow','.');
                if(toaObj[b]&&toaObj[b]['si']) {
                    toDrawText(b, coord, st, 'yellow', (toaObj[b]['si'].rssi*1).toFixed(3));
                }
            }
        }
    }
    if(ME.vm.isDrawDistanceLine && data.group['TDOA_TOF_2D_V10'] && data.group['TDOA_TOF_2D_V10'].anchors){
        for(var p=0;p<data.group['TDOA_TOF_2D_V10'].anchors.length;p++){
            toDrawLine(data.group['TDOA_TOF_2D_V10'].anchors[p].mac,coord,st,'red','-..')
        }
    }
}

function toDrawText(anchor,coord,st,color,tx) {
    for (var j=0;j<ME.anchors.length;j++){
        if(anchor == ME.anchors[j].mac){
            var ax = ME.anchors[j].x;
            var ay = ME.anchors[j].y;
            var deg = Math.atan((ay+ ME.map.origin_y-coord.y)/(ax+ ME.map.origin_x-coord.x))*180/Math.PI;
            var x = ((ax + ME.map.origin_x)  * zoom + (coord.x)  * zoom) / 2+5*Math.sin(Math.PI/180*deg);
            var y = ((ay + ME.map.origin_y)  * zoom + (coord.y)  * zoom) / 2-5*Math.cos(Math.PI/180*deg);
            var drawTx = paper.text(x,y,tx).attr('fill', color);
            drawTx.rotate(deg,x,y);
            st.push(drawTx);
            return;
        }
    }

    var deg = Math.atan((anchorObj[anchors[1]].y-anchorObj[anchors[0]].y)/(anchorObj[anchors[1]].x-anchorObj[anchors[0]].x))*180/Math.PI;
    var x = ((anchorObj[anchors[0]].x + ME.map.origin_x)  * zoom + (anchorObj[anchors[1]].x + ME.map.origin_x)  * zoom) / 2+5*Math.sin(Math.PI/180*deg);
    var y = ((anchorObj[anchors[0]].y + ME.map.origin_y)  * zoom + (anchorObj[anchors[1]].y + ME.map.origin_y)  * zoom) / 2-5*Math.cos(Math.PI/180*deg);
    var text_obj = paper.getById(textId);
    if(text_obj){
        text_obj.remove();
    }
    var text = paper.text(x,y,num).attr('fill', color);
    text.id = textId;
    text.rotate(deg,x,y);
}
function toDrawLine(anchor,coord,st,color,lineStyle) {
    for (var j=0;j<ME.anchors.length;j++){
        if(anchor == ME.anchors[j].mac){
            var x = ME.anchors[j].x;
            var y = ME.anchors[j].y;
            let line = paper.path('M'+(x*zoom +' '+ y*zoom)+'L'+(coord.x*zoom +' '+ coord.y*zoom) +'Z')
                .attr({'stroke':color,'stroke-dasharray':lineStyle});
            st.push(line);
            return;
        }
    }
}

function drawCoord(position, st, color, size){
    if(!position) return;
    var coord = position.coord ? position.coord : position;

    if(!color) color= "#1eff39";
    if(!size) size = ME.vm.pointSize;

    var ref_coord_output = paper.circle(coord.x*zoom, coord.y*zoom, size).attr({"stroke": color,'stroke-width':ME.vm.strokeWidth}).click(function () {
        console.log(JSON.stringify({x:coord.x,y:coord.y}));
    });
    st.push(ref_coord_output);
}



function draw2D(position, st){
    var r = position.position;
    if(!r) return;
    if(r.coord){
        var size = ME.vm.pointSize;
        var ct_coord = paper.rect(r.coord.x*zoom - size/2, r.coord.y*zoom - size/2, size, size).attr("fill", "#192cff").attr("stroke", "#fff").click(function () {
            console.log(JSON.stringify({x:r.coord.x,y:r.coord.y,z:r.coord.z}));
        });
        st.push(ct_coord);
    }

    //t1
    if(r.coord1) drawCoord(r.coord1, st, "#ffd4cd");
    if(r.coord2) drawCoord(r.coord2, st, "#ffd4cd");

    if(ME.vm.isDrawRefCircle){
        drawTof(position.anchors, st)
    }

    if(ME.vm.isDrawCoordCircle && r.anchors){
        if(r.anchors.indexOf('[')==0){
            var ans = JSON.parse(r.anchors);

            var ann = [];
            for(var i=0;i<ans.length;i++){
                var a = getAnchorByCode(ans[i], position.anchors);
                if(a)ann.push(a);
            }
            drawTof(ann, st)
        }
    }


    if(ME.vm.isDrawAnchorLine && r.coord){
        if(r.anchors){
            try {
                var anchors = JSON.parse(r.anchors);
                drawAnchorLine(anchors, r.coord,  st,position);
            }catch(e){
                console.warn(e);
                throw e
            }
        }

        // var diffs = r.diffs;
        // if(!diffs) return;
        //
        // var diffs = r.diffs.predict;
        //
        // var num = 0;
        // var anchorMacs = [];
        // for(var i in diffs){
        //     var macs = i.split('_');
        //     anchorMacs.push(macs[1]);
        //     if(num==0){
        //         anchorMacs.push(macs[0]);
        //     }
        //     num ++;
        // }
        //
        // drawAnchorLine(anchorMacs, r.coord,  st);
    }




}


//画tdoa线
function drawAnchorLine(anchors, coord, st,position){
    var psAn={};
    for(var j=0;j<position.anchors.length;j++){
        psAn[position.anchors[j].mac]=position.anchors[j];
    }
    for(var i=0;i<anchors.length;i++){
        var anchor=getAnchorByCode(anchors[i], ME.anchors);
        if(psAn[anchors[i]] && psAn[anchors[i]].directTof){
            var res_path = paper.path("M" + coord.x * zoom + "," + coord.y * zoom + "L" + anchor.x * zoom + "," + anchor.y * zoom).attr("fill", "red").attr("stroke", "blue").attr("opacity", "0.6");
        }else {
            var res_path = paper.path("M" + coord.x * zoom + "," + coord.y * zoom + "L" + anchor.x * zoom + "," + anchor.y * zoom).attr("fill", "red").attr("stroke", "red").attr("opacity", "0.6");
        }
        st.push(res_path);
    }
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



