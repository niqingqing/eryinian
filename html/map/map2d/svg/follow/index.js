/**
 * Created by zwt on 2018/6/30/030.
 */



/**
 * 程序总入口
 */
;(function (window) {
    init();
})();


/**
 * 页面初始化   UBIT.init =
 */
function init() {
    raphaelInit();
    pageInit();
}


function pageInit() {
    ME.searchParam = UBIT.parseSearch(!1);
    if(!ME.searchParam.tag){
        alert('请指定需要跟随的标签编码!')
        return;
    }
    loadMapByTagCode (ME.searchParam.tag, ME, initData)
}



function loadMapByTagCode (tagCodes, $this, func) {
    var params = {tags: tagCodes};
    $.ajax({
        url: UBIT.host + "/map/loadTagsByCodes",
        type: 'post',
        data:params,
        dataType: 'json',
        success: function (json) {
            //console.log(json);
            if (json && json.hasOwnProperty('msg')) {
                UBIT.closeSelfPage(json.msg);
                return;
            }

            var maps = json.maps;
            if (!maps || !maps[0]) {
                UBIT.closeSelfPage('标签未定位，请确保地图上已经出现标签！');
                return;
            }
            var currentMap = maps[0];
            var currentTags = json.tags;
            ME.vm.currentMap = currentMap;

            ME.user = json.user;
            ME.projectCode = ME.user.projectCode;
            ME.currentMapId = currentMap.id;
            ME.api_token = json.user.api_token;
            ME.followMap=ME.projectCode +'_'+ME.currentMapId;


            for (var i = 0; i < currentTags.length; i++) {
                var tag = currentTags[i];
                tag.markerType = 'tag';
                tag.markerId = tag.markerType + '_' + tag.code;
                tag.isShow = true;
                tag.powerLevel = UBIT.getPower(tag.power)
                tag.mapName = currentMap.cname;
            }

            if (func) {
                $this['currentMap'] = currentMap;
                $this['mapId'] = currentMap.id;
                $this['vm'].currentTags = $this['currentTags'] = {data:currentTags};

                func(maps, 'map', $this);
                func(currentMap, 'currentMap', $this);
                func(currentMap.id, 'mapId', $this);
                func(currentTags, 'currentTags', $this);
            }

        },
    });
}



function initData(datas, key, vm) {
    if(key == 'currentMap'){
        currentMapInit(vm, datas);
    }
}



/**
 * 画地图
 * @param vm
 */
function currentMapInit(vm, data) {
    //无数据，提前结束
    if (!data) {
        return;
    }
    var realLength = ME.curRealLength = data.realLength;
    ME.mapWidth = data.pixelLength;
    ME.mapHeight = data.pixelWidth;

    //绘制地图
    ubiMap.setBg(data, false, vm.currentTags.data, realLength);
}




function websocketOnData(data) {

    var code = data.code;
    if(!code || (code != ME.currentTags.data[0].code)) return;

    var tag = ME.currentTags.data[0];

    //坐标转化
    ubiMap.convert(data, ME.curRealLength);

    tag.x = data.x;
    tag.y = data.y;
    tag.z = data.z;

    tag.screenX = data.screenX;
    tag.screenY = data.screenY;
    tag.status = 'online';
    tag.time = data.time;


    if(ME.followMap!=data.map){
        // 切换地图,重新根据code加载页面
        location.reload();
        return;
    }


    var marker = ubiMap.getMarker('tag_' + code);
    ubiMap.move('tag_' + code, data.screenX, data.screenY, true, marker)

    if(ME.searchParam.anony) return;


    if(!ME.lastGoPoint.x){
        var point = { x: tag.screenX, y: tag.screenY };
        ubiMap.pan.draggingByPoint(point);
        ME.lastGoPoint=point;
    }else{
        var step= changeStep(ME.lastGoPoint,tag,220,22,'screen');
        if(step.stepX>-0.000001&&step.stepX<0.000001&&step.stepY>-0.000001&&step.stepY<0.000001)return;
        if(ME.goAnimate) clearInterval(ME.goAnimate);
        ME.goAnimate=setInterval(function(){
            var point={x:ME.lastGoPoint.x+step.stepX,y:ME.lastGoPoint.y+step.stepY};
            ME.lastGoPoint=point;
            if((tag.screenX-ME.lastGoPoint.x)/step.stepX<1) {
                // point = {x: tag.screenX, y: tag.screenY};
                // ME.lastGoPoint = point;
                clearInterval(ME.goAnimate);
                ME.goAnimate=0;
            }
            var oldCurrentZoom = ubiMap.pan.getCurrentZoom();
            ubiMap.pan.draggingByPoint(point);
            var newCurrentZoom = ubiMap.pan.getCurrentZoom();
	          ubiMap.pan.applyZoom(oldCurrentZoom-newCurrentZoom,{ x: document.documentElement.clientWidth / 2, y: document.documentElement.clientHeight / 2 });
        },10);
    }

}

function changeStep(lastPoint,newPoint,goTime,rate,type){
    //   传入起始点，和时间计算单位时间x，y移动距离
    switch(type){
        case "screen":var stepX=((newPoint.screenX-lastPoint.x)/goTime)*goTime/rate,stepY=((newPoint.screenY-lastPoint.y)/goTime)*goTime/rate;break;
        case "rel":var stepX=((newPoint.x-lastPoint.x)/goTime)*goTime/rate,stepY=((newPoint.y-lastPoint.y)/goTime)*goTime/rate;break;
    }
    return {stepX:stepX,stepY:stepY}
}

ME.vm.isShowTagPower = function () {
    return true;
}




function raphaelInit() {

    var config = {
        width: 19030,
        height: 12200,
        id: 'mapSvg',
        bg: '../common/img/1.png',
        duration: 400,
        // log: 1, // draw marker move line
        len: 0, // how much point to log
        markerEnable: true // tags are visible
    };

    function UbiMap(options) {
        //生成画布
        paper = Raphael(options.id, options.width, options.height);
        // var scaleIcon = Raphael("toppaper", 80, 50);

        //背景TODO
        var bg;
        var tagMarker = {};
        var anchorMarker = {};
        var camera={};
        var allMarker = {};
        var hisMarker = {};

        window.allMarker = allMarker;

        var lastZoom = 1;

        this.interimMarker = null;
        this.interimHisMarker = null;

        this.len = options.len || 0;
        this.duration = options.duration || 400;

        this.audio = new Audio();

        this.moveEle = null;
        this.lockTag = false;
        this.lockAnchor = false;

        this.pan = paper.panzoom({ initialZoom: 0, initialPosition: { x: 0, y: 0 }, repaintHook: remarkStayInitSize });

        this.screenLength = document.documentElement.clientWidth;

        var a = paper,
            b,
            c = this.pan,
            j,
            k,
            d = {},
            e = {},
            func = "",
            el='',   //element 绘制摄像头或围栏
            callback = "",
            i = "",
            p = [],
            q = [],

            //测量距离对象
            distance = {};
        r = !1, s = 0, t = {};

        function remarkStayInitSize(currAbsolteZoom) {}

        this.init = function () {
            var self = this;
            this.pan.enable();

            //拖动
            paper.canvas.onmousemove = function (e) {
                //debugger
                var svgOrigin = this.viewBox.baseVal,
                    zoom = 1 - self.pan.getCurrentZoom() * 0.1;
                if (self.moveEle) {
                    // debugger;
                    e.preventDefault();
                    e.stopPropagation();
                    var pos = self.moveEle.pos;
                    // console.log(self.moveEle.pos);
                    var x = e.pageX * zoom + svgOrigin.x - pos.width / 2 + (pos.width - (pos.pageX * zoom + svgOrigin.x - pos.x)),
                        y = e.pageY * zoom + svgOrigin.y - pos.height / 3 + (pos.height - (pos.pageY * zoom + svgOrigin.y - pos.y)),
                        tf = 't' + x + ',' + y;
                    //self.moveEle.popup.set.hide();
                    self.moveEle.x = x;
                    //console.log(self.moveEle.x)
                    self.moveEle.y = y;
                    self.moveEle.transform(tf);
                    self.moveEle.text.transform(tf);
                }
            };

            //鼠标松开的时候
            paper.canvas.onmouseup = function (e) {
                self.moveEle = null;
            };

            paper.canvas.parentNode.addEventListener('mousewheel', function () {
                var zoom = (1 - self.pan.getCurrentZoom() * 0.1).toFixed(1);
                $('.main .coordinate .zoom').text(zoom);
            }, false);

        };


        //计算两点间的距离
        this.distance = function (a, b, c, d) {
            var e = 0,
                f = 0;
            return e = c - a, e *= e, f = d - b, f *= f, Math.sqrt(e + f);
        },

            this.setIcon = function (scan, yCenter) {
                // MarkerTool.drawCoordinateMarker(paper, scan, yCenter);
                return;
            };


        //获取坐标
        this.getPos = function (p, func, realLength, editData, mapId) {
            if (p) {
                var id = editData.markerType + '_' + editData.code;
                var self = this;
                //将拖动基站能动移动这里
                if (allMarker[id]) {

                    // console.log(allMarker[id],'nlsdkfsdfkk');
                    allMarker[id].mousedown(function (e, x, y) {
                        // debugger;
                        e.stopPropagation();
                        var info = this.getBBox();
                        this.pos = {
                            pageX: e.pageX,
                            pageY: e.pageY,
                            width: info.width,
                            height: info.height,
                            x: info.x,
                            y: info.y
                        };
                        if (this.flag == 1) {
                            self.moveEle = self.lockAnchor ? null : this;
                        }

                        // else {
                        //     self.moveEle = self.lockTag? null: this;
                        // }
                    });
                }
                var reData = util.deepCopy(editData);

                //设置onclick的参数
                this.setplacingStatus('getPos', realLength, editData, func);
            } else {
                //取消定位
                this.setplacingStatus('-1');
            };
        };

        //todo  移动地图，将需要显示的标签移动到屏幕中心
        this.movePaperInCenterPointer = function (point) {
            ubiMap.pan.draggingByPoint(point);
        };
        this.paperClear = function () {
            paper.clear();
            allMarker = {};
            // this.setIcon(true);
        };

        //将真实坐标转化为屏幕坐标
        this.convert = function (param, realLength) {
            //console.log(realHeight)
            if(!realLength) realLength = ME.vm.curRealLength;
            // debugger;
            param.x = param.x ? param.x : 0;
            param.y = param.y ? param.y : 0;

            var relPosX = parseFloat(param.x),
                relPosY = parseFloat(param.y);

            var screenLength = this.screenLength;

            param.screenX = parseFloat(relPosX * screenLength / realLength);
            param.screenY = parseFloat(relPosY * screenLength / realLength);


            return { x: param.screenX, y: param.screenY };
        };

            //设置坐标
            this.posInital = function (marker, newPos, scan, yCenter) {
                // marker.transform(tf);
                // debugger;
                var x = newPos.x,
                    y = newPos.y;

                if (!scan) {
                    y = y + yCenter;
                }

                // if(marker.s){
                //     marker.translate(x/marker.s,y/marker.s);
                // }else {
                //     marker.translate(x,y);
                // }
                marker.translate(x, y);

                // marker.text.transform(tf);
                // debugger;
                marker.x = x;
                marker.y = y;

                //helper
                // var c = paper.circle(x, y, 2).attr({fill:'red'});
            };

        //添加标签
        this.addMarker = function (param, realLength, scan, yCenter) {
            if (this.interimMarker || !param.markerType) {
                return false;
            }
            //如果不属于当前地图，则return
            if (!param.mapId || param.mapId != ME.currentMapId) return false;

            var self = this;

            //生成标签
            var marker = MarkerTool.drawMarker(allMarker, param, paper, realLength, scan, yCenter);
            //坐标转化
            var newPos = this.convert(param, realLength);
            //设置坐标
            this.posInital(marker, newPos, scan, yCenter);

            if (param.markerId) {
                //已经有id第一次刷新/编辑时
                allMarker[param.markerId] = marker;
            } else {
                // debugger;
                //无id第一次添加
                marker.id = -1;
                self.interimMarker = {};
                self.interimMarker[0] = marker;
            }

            // if(!param.isShow){
            //     marker.hide();
            // }else{
            //     marker.show();
            // }

            return marker;
        };

        this.sosAlert = function(data){
            if(ubiMap.lockTag) return;

            if(data.map.indexOf('slairport')>-1){
                // var tag = ME.vm.getTag(data);
                // if(!tag || tag.typeId==1){
                //     return;
                // }
                return;
            }


            // console.warn(data);
            if (ME.vm.switchData.sound) {
                var audio = 'danger.mp3';
                var v = new Audio("../../common/audio/" + audio);
                v.play();
            }

            if(ME.sos[data.mac]) return;

            var tag = ME.vm.getTag(data);

            data.alias = tag?(tag.alias?tag.alias:tag.code):data.mac;

            ME.sos[data.mac] = data;

            var r = vsn.createSosTip(data);
            vsn.setSosWaitMessage(r.string, r.type, data.mac);

        };

        /**
         * 围栏报警
         * @param data
         */
        this.fenceAlert = function(data){
            if(ubiMap.lockTag) return;
            console.log(data);

            // if(data.msgType!='fenceAlert')
                return;

            //获取围栏
            var fence = ME.vm.getNodeById('fence', data.fenceId);

            //获取标签
            var tag = ME.vm.getNodeByCode('tag', data.code);

            //将进入或者离开的标签从fenceTag中动态的进行处理
            ME.vm.updateFenceInnerTags(data.isIn, tag, fence);

            if (!ME.vm.switchData.fenceTip) return;

            if (!DataManager.isFenceTip(fence, data.isIn)) return;

            var r = vsn.createFenceTipObject(tag, fence, data.isIn);
            vsn.setFenceWaitMessage(r.string, r.type);

            if (ME.vm.switchData.sound) {
                var audio = 'warning.mp3';
                if (fence && fence.type && fence.type.audio) audio = fence.type.audio;
                var v = new Audio("../../common/audio/" + audio);
                v.play();
            }
        };


        //多人互监报警提示
        this.moreMonitorAlert = function(data){
            //超出距离报警
            if (ME.vm.switchData.sound) {
                var audio = 'danger.mp3';
                var v = new Audio("../../common/audio/" + audio);
                v.play();
            }

            //获取组信息
            data.moreMonitor = ME.vm.getNodeById('moreMonitor', data.monitorId) ;
            if(!data.moreMonitor){
                console.warn('互监组id='+data.monitorId+'不存在');
                return;
            }

            //每次越界提示框只提示一次
            if(!ME.moreMonitor[data.map+'_'+data.monitorId]){
                var r = vsn.createMoreMonitorTip(data);
                vsn.setMoreMonitorWaitMessage(r.string, r.type);
                ME.moreMonitor[data.map+'_'+data.monitorId]=data;
            }else{
                var nowTime=new Date().getTime();
                if(!data.distance){return}
                var dis=data.distance;
                for(var t in dis){
                    var watchTag=t.split('_')[0];
                    var marker=ME.vm.findMakerByMac(watchTag);
                    if(!marker||!marker.moreMonitordrawDataTime){continue}
                    if(nowTime-marker.moreMonitordrawDataTime>=300&&ME.moreMonitor[data.map+'_'+data.monitorId]){
                        delete ME.moreMonitor[data.map+'_'+data.monitorId];
                    }
                    break;
                }

            }

            //根据数据，绘制对应标签展现样式
            ME.vm.showMoreMonitorStyle(data);
        };

        this.move = function (id, x, y, p, marker) {
            if (!marker) {
                marker = ubiMap.getMarker(id);
            }
            if (!marker && this.interimMarker !== null) {
                marker = this.interimMarker[0];
            }
            if (!marker) return;

            marker.x = x;
            marker.y = y;

            if (marker.flag=='tag'&& p) {
                marker.animate({ transform: "t" + x + ',' + y }, 120);
                if(!marker.node.isShow) return;
                //电量显示

                // var isShow = ME.vm.isShowTagPower(marker.node.power);
                // MarkerTool.hideMaker(marker,isShow);
                //
                // //marker上halo是否显示(移动时原本hide自动变为show)
                // if(ME.moreMonitorHalos.has(marker.node.mac)&&marker.hasOwnProperty('showHalo')){
                //     var monitorHalo=ubiMap.findInMarker(marker,);
                //     if(monitorHalo){
                //         marker.showHalo?monitorHalo.show():monitorHalo.hide();
                //     }
                // }
                // isShow ? powerset.show() : powerset.hide();

                marker.log = marker.log || [];
                marker.log.push({ x: x, y: y });
                if (marker.log.length > 100) {
                    marker.log.shift();
                }

                switch (this.len) {
                    case 0:
                        this.drawLine(marker, []);
                        break;
                    default:
                        this.drawLine(marker, marker.log.slice(-this.len));
                        break;
                }
                return;
            }

            marker.animate({ transform: "t" + x + ',' + y }, options.duration);
        };


        this.getMarker = function (id) {
            return allMarker[id];
        };
        this.getAllMarker = function () {
            return allMarker;
        };


        this.setPath = function (id, flag) {
            if (flag) {
                allMarker[id] && allMarker[id].logPath && allMarker[id].logPath.show();
            } else {
                allMarker[id] && allMarker[id].logPath && allMarker[id].logPath.hide();
            }
        };
        this.setLen = function (val) {
            this.len = parseInt(val);
        };
        //轨迹
        this.drawLine = function (marker, logs ) {
            // console.log(marker);
            var color = 'black';
            var node = marker.node;
            if(marker && marker.node && marker.node.cat &&  marker.node.cat.color){
                color = node.cat.color;
            }
            //debugger;
            var str = [];
            logs.forEach(function (item, index) {
                if (index == 0) {
                    str.push(Raphael.fullfill("M{x},{y}", item));
                } else {
                    str.push(Raphael.fullfill("L{x},{y}", item));
                }
            });
            if (!marker.logPath || !marker.logPath.id) {
                // 初始化并隐藏
                marker.logPath = paper.path(str.join(''));

            } else {
                marker.logPath.attr('path', str.join(''));
            }
            marker.logPath.attr({ 'stroke': color });
        };

        //扫描地图居中
        this.scanCenter = function (imgHight) {
            var screenHeight = document.documentElement.clientHeight;
            var yCenter = (screenHeight - imgHight) / 2;
            if (yCenter < 0) {
                yCenter = 0;
            }
            return yCenter;
        };

        //设置背景
        this.setBg = function (data, scan, tags, realLength) {
            var imgUrl = UBIT.getImgSrc('maps', data.filePath);
            var img = new Image();
            var vm = this;
            img.src = imgUrl;
            img.onload = function () {
                var length = ME.mapWidth = this.width;
                var height = ME.mapHeight = this.height;

                // var screenHeight=((vm.screenLength-ME.leftMenusWidth)/length)*height;
                var screenHeight = vm.screenLength / length * height;

                if (!scan && tags) {
                    var id = data.id;
                    var yCenter = ubiMap.scanCenter(screenHeight);
                    vm.yCenter = yCenter;
                    yCenter = 0;

                    // bg = paper.image(imgUrl, ME.leftMenusWidth, ME.headerHeight+yCenter, vm.screenLength-ME.leftMenusWidth, screenHeight).toBack();
                    bg = paper.image(imgUrl, 0, yCenter, vm.screenLength, screenHeight).toBack();
                    // bg = paper.image(imgUrl, 0, yCenter, length, height).toBack();

                    for(var i=0;i<tags.length;i++){
                        ubiMap.addMarker(tags[i], realLength, scan, yCenter);
                        // ubiMap.changeColor(tags[i], false);
                    }
                    ubiMap.setIcon(scan, yCenter);

                    webSocketInit('2D', realLength,
                        {
                            coord:websocketOnData,
                            // sos:SysAlert.sos,
                            // fenceAlert:SysAlert.fenceAlert,
                            // moreMonitorAlert:SysAlert.moreMonitorAlert,
                            // forceRemove:SysAlert.forceRemove,
                            // lifeStatus:SysAlert.updateHeartRate,
                            // distanceAlert:SysAlert.distanceAlert,
                            // heartAlert:SysAlert.heartAlert,
                            clearHalo:MarkerTool.clearHaloAndLine,
                        });

                } else {
                    bg = paper.image(imgUrl, 0, 0, vm.screenLength, screenHeight).toBack();
                }
                ME.vm.fullscreenLoading = false;
            };

            img.onerror = function(msg){
                console.log(msg);
                ME.vm.fullscreenLoading = false;
                ME.vm.mapIsMiss();
                return;
            }

        };
    }

    ubiMap = new UbiMap(config);
    ubiMap.init();

}
