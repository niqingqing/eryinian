/**
 * Created by zwt on 2017/9/1 0001.
 */

var ColorsTdoa = ["#35ffe7","#4fff29","#fff530","#3247ff","#ff3983"];

$(function(){
    getDataAndDraw();
});


function getDataAndDraw(){
    vueInit();
    if(!ME.map) return;

    ME.tag = Cookies.get('tag_filter');
    if(!ME.tag) return;

    $.ajax({
        url:ME.host+ '/tplatform/tdoa/listSeq_cache?map='+ME.map +'&tag='+ME.tag,
        method:'get',
        success: function(r){
            ME.seqs = [];

            for(var i=0;i<r.length;i++){

                var obj = {seq:r[i], num:1};

                for(var j=i+1;j<r.length;j++){
                    if(r[j] == obj.seq){
                        obj.num += 1;
                    } else {
                        break;
                    }
                }
                ME.seqs.push(obj);
            }

            ME.vm.max = ME.seqs.length;
            // ME.datas.sort(sortByTime);
            console.log(ME.seqs);
            // JSON.stringify(ME.datas);

            getAnchors(initMap, ME.map, ME.vm.drawRegionSelectAn);
        }
    });

}

function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            point:0,
            max:0,
            pointSize:parseInt(Cookies.get('pointSize'))?parseInt(Cookies.get('pointSize')):4,
            strokeWidth:2,

            debugBuf:false,
            clearAllDisable:false,
            sourceFlagDisable:false,
            isDrawHyperbola:false,
            isDrawAnchorLine:true,
            isDrawSourceHyperbola:false,

            isDrawRefCircle:true,
            isDrawCoordCircle:false,

            tag_filter: Cookies.get('tag_filter'),
            currentProj:'',  //地图传过来项目code
            currentMap:'',   //当前地图
            maps:[],         //所有项目地图

            bindMouseEvent:false,
            regionPonits:[],
            anchors:[],
            centerDialogVisible:true,
            statisticsList:[],
            isAnchorShow:false,
            iframeSrcUrl:'http://'+window.location.hostname+'/super/projAnchor/',
        },
        created:function(){
            var that=this;
            this.$http.get(ME.host+'/config/getGlobalFlag?key=debugBuf').then(function(res){
                this.debugBuf = Boolean(Number(res.body));
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
            //监听键盘按键事件
            this.$nextTick(function () {
                document.addEventListener('keyup', function (e) {
                    if (e.keyCode == 27) {
                        that.regionPonits=[];
                        if(paper.statistics){
                            paper.statistics.remove();
                        }
                    }
                })
            })
        },

        methods:{
            getPosition:function(e,obj){
                var svgOrigin = paper.canvas.viewBox.baseVal,
                    currentZoom = 1 - ME.PanZoom.getCurrentZoom() * 0.1;
                var posX = obj.offsetLeft, posY = obj.offsetTop;
                while (obj.offsetParent) {
                    if (obj === document.getElementsByTagName('body')[0]) {
                        break;
                    } else {
                        posX = posX + obj.offsetParent.offsetLeft;
                        posY = posY + obj.offsetParent.offsetTop;
                        obj = obj.offsetParent;
                    }
                }
                var ex = e.pageX - posX;
                var ey = e.pageY - posY;
                var x = (ex * currentZoom + svgOrigin.x).toFixed(1),
                    y = (ey * currentZoom + svgOrigin.y).toFixed(1);

                var relX = parseInt(x*100/zoom);
                var relY = parseInt(y*100/zoom);
                return {x:x,y:y,relX:relX,relY:relY}
            },
            statisticsAnchors:function (p1,p2) {
                var that = this;
                // var statisticsList=[];
                that.statisticsList=[];
                var ariaVertex={};
                if(parseFloat(p1.relX)<=parseFloat(p2.relX)){
                    ariaVertex.minReaX=parseFloat(p1.relX);
                    ariaVertex.maxReaX=parseFloat(p2.relX);
                }else{
                    ariaVertex.minReaX=parseFloat(p2.relX);
                    ariaVertex.maxReaX=parseFloat(p1.relX);
                }

                if(parseFloat(p1.relY)<=parseFloat(p2.relY)){
                    ariaVertex.minReaY=parseFloat(p1.relY);
                    ariaVertex.maxReaY=parseFloat(p2.relY);
                }else{
                    ariaVertex.minReaY=parseFloat(p2.relY);
                    ariaVertex.maxReaY=parseFloat(p1.relY);
                }
                for(var i=0;i<that.anchors.length;i++){
                    var item=that.anchors[i];
                    if(
                        item.mapId==ME.map.id&&
                        parseFloat(item.x*100)>=ariaVertex.minReaX&&parseFloat(item.x*100)<=ariaVertex.maxReaX&&
                        parseFloat(item.y*100)>=ariaVertex.minReaY&&parseFloat(item.y*100)<=ariaVertex.maxReaY
                    ){
                        that.statisticsList.push(item.code);
                    }
                }
                // that.centerDialogVisible=true;
            },
            closeAnchorDialog:function () {
                var that =this;
                this.statisticsList=[];
                document.getElementById('anchorIframe').contentWindow.ME.vm.refresh();
                var mapId = ME.vm.currentMap.split('_')[1];
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

                        drawAnchors(ME.anchors);
                        that.anchors = ME.anchors;
                    }
                });
            },
            openAnchorDialog:function () {

            },
            showAnchorPage:function () {
                this.isAnchorShow=true;
                this.centerDialogVisible =true;
                document.getElementById('anchorIframe').contentWindow.ME.vm.dialogFormVisible=false;
                document.getElementById('anchorIframe').contentWindow.ME.vm.selectAnchors(this.statisticsList);
                document.getElementById('anchorIframe').contentWindow.ME.vm.filterAnchors(this.statisticsList);
                this.statisticsList=[];
            },
            drawRegionSelectAn:function (anchors) {
                var that =this;
                that.anchors = anchors;
                if(!that.bindMouseEvent) {
                    var container = paper.canvas.parentNode;
                    paper.canvas.ondblclick=function(e) {
                        var pos = that.getPosition(e, container);
                        if (!pos) return;
                        if (that.regionPonits.length < 1) {
                            that.regionPonits.push(pos);
                        } else {
                            // 开始统计

                            that.statisticsAnchors(that.regionPonits[0], pos);
                            that.showAnchorPage();

                            if(paper.statistics){
                                paper.statistics.remove();
                            }
                            that.regionPonits = [];
                        }
                    }
                    paper.canvas.onmousemove = function (e) {
                        if(that.regionPonits.length == 1){
                            var pos = that.getPosition(e, container);
                            that.drawAriaByTwo(that.regionPonits[0],pos);
                        }
                    }
                    that.bindMouseEvent = true;
                }

            },
            getStartP:function(p1,p2){
                var startPoint={
                    x:parseFloat(p1.x)<=parseFloat(p2.x)?parseFloat(p1.x):parseFloat(p2.x),
                    y:parseFloat(p1.y)<=parseFloat(p2.y)?parseFloat(p1.y):parseFloat(p2.y)
                }
                startPoint.w=Math.abs(parseFloat(p1.x)-parseFloat(p2.x));
                startPoint.h=Math.abs(parseFloat(p1.y)-parseFloat(p2.y));
                return startPoint;
            },
            drawAriaByTwo:function(p1,p2){
                var that =this;
                var startPoint=that.getStartP(p1,p2);
                if(paper.statistics){
                    paper.statistics.remove();
                }
                paper.statistics=paper.rect(startPoint.x,startPoint.y,startPoint.w,startPoint.h);
                paper.statistics.attr({
                    stroke:'#3d3d3d',
                    'stroke-dasharray':'--'
                });
            },

            //选择地图时刷新
            reloadByMap:function(){
                // bufTableInit(ME.vm.currentMap);
                localStorage.setItem('tplaformMap',this.currentMap);
                location.reload();
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

            clearAll:function(){
                this.$confirm("确认清除掉所有的原始数据么？","提示",{ }).then(function() {
                    //屏蔽按钮
                    ME.vm.clearAllDisable = true;
                    ME.vm.$http.get(ME.host+'/tplatform/source/clearAll?map='+ME.vm.currentMap).then(function(res){
                        //放开按钮
                        ME.vm.clearAllDisable = false;
                        var result = res.body;
                        if(result.isOk){
                            window.location.reload();
                        }else {
                            this.showError("清除失败！"+result.msg);
                        }
                    });
                }).catch(function(){
                    ME.vm.clearAllDisable = false;
                });
            },

            handleChange:function(val){
                var data = ME.seqs[val];
                if(!data){
                    alert(val+'>'+ME.seqs.length+'? too big');
                    return ;
                }

                $.ajax({
                    url:ME.host+ '/tplatform/tdoa/listNewMult_cache?map='+ME.vm.currentMap +'&tag='+ME.tag+'&seq='+data.seq,
                    method:'get',
                    success: function(r){
                        drawCurve(r, data.seq);
                    }
                });
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
        },
    });
}

function drawCurve(data, seq){
    data.results = JSON.parse(data.results||'{}');
    data.algPos = JSON.parse(data.algPos||'{}');
    data.finPos = JSON.parse(data.finPos||'{}');
    data.output = JSON.parse(data.output||'{}');
    data.prepare = JSON.parse(data.prepare||'{}');
    data.group = JSON.parse(data.group||'{}');

    var toas = {isOk:[],filter:[], timespan:{}};

    var timeStart = Date.now();
    var timeEnd = 1000;
    for(var t of data.toa||[]){
        var g = JSON.parse(t);
        for(var mac in g){
            var val = g[mac];
            var si = JSON.stringify({rssi:val.si.rssi, mc:val.si.mc, avgMc:val.si.avgMc});
            if(val.isOk){
                toas.isOk.push(JSON.stringify({mac,si, time:val.time}));
            }else {
                toas.filter.push(JSON.stringify({mac, msg:val.pLOS.msg,si, time:val.time}));
            }
            if(val.time <  timeStart) timeStart= val.time;
            if(val.time >  timeEnd) timeEnd = val.time;
        }
    }
    data.toaRes = toas;
    data.toaRes.timespan = {timeStart, timeEnd, timespan:timeEnd-timeStart};

    var positions = [];
  try{
    for(var gp of data.position){
        var g = JSON.parse(gp);
        positions.push(g);
    }
  }catch(e){}
    data.position = positions;

    console.log(seq, data);
    drawData(data);
}

function drawData(data) {
    var st = paper.set();

    drawGroup(data.group, st);
    drawPosition(data.position, st);

    if(data.tofMaps){
        data.tofMaps = JSON.parse(data.tofMaps||'{}');
        drawCoord({coord:data.tofMaps.ref}, st)
        drawCoord({coord:data.tofMaps.anchorRef}, st, '#ffc40d')
        drawCoord({coord:data.tofMaps.last}, st, '#110d01')
    }

    drawOutput(data, st);

    ME.paperSet.push(st);
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

        if(!ME.tofCircles[t.mac]){
            ME.tofCircles[t.mac] = {e:paper.set(), v:true};
            st.push(ME.tofCircles[t.mac].e);
        }
        if(t.directTof){
            var sc = paper.circle(t.x*zoom, t.y*zoom, t.tof*zoom).attr({"stroke":gcolor[i%gcolor.length], "stroke-width": ME.vm.strokeWidth,"stroke-dasharray":"--.."});
        }else{
            var sc = paper.circle(t.x*zoom, t.y*zoom, t.tof*zoom).attr({"stroke":gcolor[i%gcolor.length], "stroke-width": ME.vm.strokeWidth});
        }
        (function(ent){sc.click(function (e) { console.log(JSON.stringify({anchor:ent.mac, distance:ent.tof})); })})(t);

        ME.tofCircles[t.mac].e.push(sc);
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
    if(output.coord) drawCoord(output.coord, st, "#ff1c24")

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


//画定位线
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



