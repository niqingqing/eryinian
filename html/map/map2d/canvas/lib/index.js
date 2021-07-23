
var _typeof = typeof Symbol === "function" &&
typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } :
    function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/***
 * add by zwt 2017.06.01
 * 管理员管理后台
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
    vueMessage();
    if (!privCheck()) return;
    jqxNotificationInit();
    vsnInit();
    canvasInit();

    vueInit();

    evenInit();
    cssInit();
}


function dataInit(datas, key, vm) {
    // console.dir(key);
    if (_.isArray(datas)) {
        vm[key].data = datas;
    } else {
        vm[key] = datas;
    }
    if (key == 'mapId') {
        if (datas > 0) {
            if(!ME.currentMapId) ME.currentMapId = datas;
            currentMapInit(vm);
        } else {
            ME.messages.showTip("您当前的项目还没有创建地图", "../../../super/index/");
            return;
        }
    } else if (key == 'fence') {
        drawFences(vm);
    } else if (key == 'anchor') {
        drawAnchors(vm, key);
    }else if(ME.vm.enableWall && key=='wall'){
        //绘制围墙
        drawWalls(vm);

    }  else if (key == 'tag' || key == 'currentTags') {
        drawTags(vm, key);
        ubiMap.setIcon(vm.scanActive);
        webSocketInit('2DV2', vm.curRealLength,
            {
                coord:websocketOnData,
                sos:SysAlert.sos,
                fenceAlert:SysAlert.fenceAlert,
                moreMonitorAlert:SysAlert.moreMonitorAlert,
                forceRemove:SysAlert.forceRemove,
                lifeStatus:SysAlert.updateHeartRate,
                distanceAlert:SysAlert.distanceAlert,
                heartAlert:SysAlert.heartAlert,
                clearHalo:MarkerTool.clearHaloAndLine,
            });

    }else if(ME.vm.isShowCamera && key=='camera'){
        drawCameras(vm);
    }
}

//绘制基站
function drawAnchors(vm) {
    var key = 'anchor';
    for (var i = 0; i < vm[key].data.length; i++) {
        var data = vm[key].data[i];
        ubiMap.addMarker(data);
    }
}


//绘制标签
function drawTags(vm, key) {
    var now = Date.now();
    for (var i = 0; i < vm[key].data.length; i++) {
        var data = vm[key].data[i];
        if(!data) continue;
        ME.tags[data.code] = UBIT.deepCopy(data);
        if(key == 'currentTags'){

            ubiMap.addMarker(data);

        }else {
            ME.vm.history.allTags.push({ key: data.mac, label: data.alias ? data.alias : data.code });

            var diff = now - data.time;
            // console.log(data);
            if(!ME.tagDisappearTime || ME.tagDisappearTime==0 || diff < ME.tagDisappearTime){
                ubiMap.addMarker(data);
            }
        }
    }
}


//绘制围栏    todo hover
function drawFences(vm) {
    var key='fence';
    for(var i=0;i<vm[key].data.length;i++){
        var data=vm[key].data[i];
        data.area = ubiMap.areaShow(data,'fence');
        MarkerTool.markerHover(data.area);
    }

    // 等界面上的标签和围栏加载完毕后，统计围栏中的标签数量
    setTimeout(function(){
        ME.vm.freshAllFenceInnerTags('fence');
    }, 3000);
}
//绘制围墙
function drawWalls(vm) {
    var key='wall';
    for(var i=0;i<vm[key].data.length;i++){
        var data=vm[key].data[i];
        var start=ubiMap.convert({x:data.startX,y:data.startY}, ME.vm.curRealLength);
        var end=ubiMap.convert({x:data.endX,y:data.endY}, ME.vm.curRealLength);
        data.line = ubiMap.drawFabricLine(start,end,data.wtype);

        data.line.node = data;
        data.line.flag = data.markerType;
        MarkerTool.markerHover(data.line);
    }
}
//绘制摄像头
function drawCameras(vm) {
    var key='camera';
    for(var i=0;i<vm[key].data.length;i++){
        var data=vm[key].data[i];
        data.marker=ubiMap.addMarker(data);
        data.area=ubiMap.areaShow(data,'camera');
    }
}


/**
 * 画地图
 * @param vm
 */
function currentMapInit(vm) {
    vm.scanActive = vm.showMode == 'admin';
    vm.setNodeData(vm.currentMap, vm.scanActive, vm.currentTags ? vm.currentTags.data : null);
}

function updatePoints(pointsStr, detX, detY){
    var ps = pointsStr.split(',');
    var newStr = '';
    for(var j=0;j<ps.length;j++){
        var p = ps[j];
        var pos = p.split(' ');
        //坐标转化
        var position = {x:parseFloat(pos[0]) + detX,y:parseFloat(pos[1]) + detY};
        newStr += position.x +' '+ position.y;
        if(j<ps.length-1){
            newStr += ',';
        }
    }
    return newStr;
}

function websocketOnData(data, realLength, scan, yCenter){

    var code = data.code ? data.code : data.mac;
    if (!code) return;

    //坐标转化
    ubiMap.convert(data, realLength);

    var tag = ME.tags[code];
    if (!tag) {
        tag = ME.vm.getAnonyTag(data);
        ME.tags[code] = tag;
        ME.vm.history.allTags.push({ key: data.mac, label: data.alias ? data.alias : data.code });

    } else {
        tag.x = data.x;
        tag.y = data.y;
        tag.z = data.z;
        if (tag.mapId != data.mapId) {
            tag.mapId = data.mapId;
            var map = ME.vm.getMapById(data.mapId);
            if (map) tag.mapName = map.cname;
        }
        tag.screenX = data.screenX;
        tag.screenY = data.screenY;
        tag.power = data.power;
        tag.status = 'online';
        tag.time = data.time;
    }

    if (!ubiMap.lockTag) {
        var marker = ubiMap.getMarker('tag_' + code);
        if (!marker) {
            console.log('addMarker:', tag.code);
            marker = ubiMap.addMarker(tag);
        }

        if(ME.vm && ME.vm.switchData.isShowActiveTag){
            if(!marker.node.isShow){
                tag.isShow = true;
                marker.node.isShow = true;
                ubiMap.toggleNode('tag_' + code,true)
            }
        }


        // if(ME.vm.switchData.power){
        //     if(ME.vm.switchData.powerAuto){
        //         if(tag.power > 3770){
        //             if(ME.vm.switchData.hidePowerMakerId.indexOf('tag_' + id) <= -1){
        //                 MarkerTool.hidePower(marker);
        //             }
        //         }else{
        //             if(ME.vm.switchData.hidePowerMakerId.indexOf('tag_' + id) !== -1){
        //                 MarkerTool.showPower(marker);
        //             }
        //         }
        //     }else{
        //         if(ME.vm.switchData.hidePowerMakerId.length > 0){
        //             ME.vm.switchData.hidePowerMakerId.forEach(function(_id){
        //                 var marker = ubiMap.getMarker(_id);
        //                 MarkerTool.showPower(marker);
        //             })
        //         }
        //     }
        // }


        //不要轻易修改vue上的变量，vue变量的改变会导致渲染界面从而使页面卡顿
        var tagTmp = ME.vm.getTag(data);
        if (!tagTmp) {
            tagTmp = UBIT.deepCopy(tag);
            ME.vm.tag.data.push(tagTmp);
        }else if((ME.vm && ME.vm.switchData.isShowCoordinate)){
            ME.vm.setTag(tagTmp, data);
        }

        if(marker.node.isShow) ubiMap.moveNode('tag_' + code, data.screenX, data.screenY, true, marker);

        //获取上次的最后位置
        // if (tag.lastPostion) {
        //     try {
        //         //监控标签是否进入到围栏
        //         ubiMap.monitorFence(tag, tag.lastPostion);
        //     } catch (e) {
        //         console.warn(e);
        //     }
        // }
    }
    ME.tags[code] = tag;

    //记录标签最后一次的位置
    if (tag) tag.lastPostion = { x: data.x, y: data.y, screenX: data.screenX, screenY: data.screenY };
}




setInterval(function(){
    if(ubiMap.lockTag || !ME.tagDisappearTime || ME.tagDisappearTime<1) return;
    for(var i in ME.tags){
        var t = ME.tags[i];
        var diff = Date.now() - t.time ;
        //获取tag.data对应数据，改变isShow,控制勾选
        var item=ME.vm.tag.data.find(function(v){return v.code==t.code});
        if(!item) continue

        if(diff>=ME.tagDisappearTime){
            item.isShow=false;
        }else {
            item.isShow=true;
        }
        ubiMap.toggleNode(item.markerId,item.isShow);
    }

}, 1*60*1000);


