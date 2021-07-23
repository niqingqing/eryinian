'use strict';

/**
 * Created by zwt on 2017/6/29 0029.
 * 自定义图标样式
 */

var MarkerTool = {

    clearHoverTip : true,

    /**
     *
     * @param allMarker
     * @param node  只有 基站（anchor） 和 标签（tag） 两种类型 (加:摄像头camera)  组合绘制分组
     * @param paper
     * @returns {*}
     */
    drawMarker: function drawMarker(node, paper) {
        var size = ME.markerSize = this.getMarkerSize();

        var marker = this.createMarker(size, node, paper);

        //别名
        this.markerText(size, node, marker, paper);

        //形状
        this.markerIcon(size, node, marker, paper);

        if(node.markerType == 'tag'&&ME.vm.switchData.power){
            //电量显示

            this.markerPower(size, node, marker, paper);
        }
        //click事件
        MarkerTool.markerClick(marker);

        //hover事件
        MarkerTool.markerHover(marker);

        return marker;
    },

    getMarkerSize:function () {
        // var size = ME.mapWidth/ME.vm.curRealLength * 100;
        // var width = Math.min(ME.mapWidth,ME.mapHeight)/8;
        // if(size<width) size = width;
        var map = ME.vm.currentMap;
        if(map && map.cfgMap){
            // console.log(map.cfgMap);
            var cfg = JSON.parse(map.cfgMap);
            for(var i in cfg){
                if( cfg[i].key == 'marker_size' ){
                    return parseInt(cfg[i].value);
                }
            }
        }
        return 60;
    },

    showSearch:function(marker){
        if(marker.searchCircle){
            return;
        }
        var radius = (ME.markerSize + ME.markerSize / 2 + 12) / 2;
        var searchCircle = new fabric.Circle({
            strokeWidth:4,
            stroke:'rgba(255, 0, 0, 1)',
            fill:'rgba(255, 0, 0, 0)',
            opacity:1,
            top:-radius,
            left:-radius,
            radius: radius
        });
        // marker.searchCircle = searchCircle;
        // marker.showSearch = function(){
        //     searchCircle.set('opacity',1);
        // };
        // marker.hideSearch = function(){
        //     searchCircle.set('opacity',0);
        // };
        marker.searchCircle = searchCircle;
        ME.searchTagMarker = marker;
        ME.canvas.add(searchCircle);
        marker.add(searchCircle);
        // ME.canvas.renderAll();
    },
    hideSearch:function(marker){
        marker.remove(marker.searchCircle);
        ME.canvas.remove(marker.searchCircle);
        ME.searchTagMarker = null;
        delete marker.searchCircle;
        ME.canvas.renderAll();
    },
    createMarker:function(size, node, paper){
        //frame
        var rect = new fabric.Rect({
            width: size,
            height: size,//*(1+4/9)
            originX: 'center',
            originY: 'center',
            opacity:0,
        });

        var marker = new fabric.Group([rect], {
            subTargetCheck: true,
        });//status:'moving'
        marker.node = node;
        marker.flag = node.markerType;
        marker.selectable = false;
        paper.add(marker);
        return marker;
    },
    markerText: function markerText(size, node, marker, paper) {
        //设置文本
        var alias = null;
        switch(node.markerType){
            case 'tag':
            case 'anchor': alias=node.alias ? node.alias : node.mac;break;
            case 'camera': alias=node.ip;break;
        }
        //绘制文本
        var text = new fabric.Text(alias, {
            fontSize: size*2/9,
            originX: 'center',
            top:-(size * (13/18 + 1/9)),
        });

        marker.add(text);
        paper.add(text);
    },


    //显示标记图标
    markerIcon: function markerIcon(size, node, marker, paper) {
        var icon = '';

        if(node.markerType == 'tag'){

            if(node.type && node.type.icon){
                icon = ME.imgHost + 'tagTypes_' + node.type.icon;
            }else {
                icon = ME.iconPath + node.markerType + '/location_gray.png';
            }

        }else {

            var type, color = 'blue';
            icon = ME.iconPath + node.markerType;

            switch(node.markerType){
                case 'anchor':type='anchor',color='blue';break;
                case 'camera':type='camera',color='blue';break;
                default : break;
            }

            if(node.status==='offline') color='gray';
            if(type=='anchor' && node.isMaster>0) type+='_master';

            //形状
            icon += '/' + type + '_' + color + '.png';
        }

        fabric.Image.fromURL(icon, function(oImg) {
            var ratio =size/oImg.width;
            //形状
            oImg.scale(ratio);
            oImg.set({
                originX: 'center',
                originY: 'center',
            });

            marker.add(oImg);
            paper.add(oImg);
        });

        return icon;
    },

    markerClick: function markerClick(marker) {
        var node = marker.node;
        //点击事件
        marker.on('mousedown',function(option){

            if(ME.vm.optionType ||ubiMap.lockTag || ME.followMap){
                return false;
            }
            MarkerTool.marekerEditPanel(node);

            // if (node.markerType != 'tag') {
            //     MarkerTool.marekerEditPanel(node,marker);
            //     return;
            // }
            // MarkerTool.showQrCode(node);
        });
    },

    showQrCode: function showQrCode(node) {
        if (node.markerType != 'tag') {
            return;
        }
        var qrcode = ME.vm.tag.qrcode;
        qrcode.mac = node.mac;
        qrcode.code = node.code;
        qrcode.value_2d = ME.selfHost + '/map/map2d/svg/follow/?tag=' + node.code;
        qrcode.value_3d = ME.selfHost + '/map/map3d/?tag=' + node.code + '&anony=1';
        qrcode.title = '标签二维码';
        qrcode.show = true;
    },

    marekerEditPanel: function marekerEditPanel(node,marker) {
        //先隐藏其它面板
        var anchorEdit = ME.vm['anchor'].floatEdit;
        if (anchorEdit.visible) {
            ME.vm.anchorFloatEditCancell();
        }
        ME.vm.willMove=marker;
        if(node.markerType == 'camera'){
            //控制编辑框显示
            var params={};
            if(node.ip) params.ip=node.ip;
            if(node.id) params.id=node.id;
            if(node.addUser) params.addUser=node.addUser;
            if(node.addTime) params.addTime=node.addTime;
            if(node.points) params.points=node.points;
            if(node.mapId) params.mapId=node.mapId;
            if(node.x) params.x=node.x;
            if(node.y) params.y=node.y;
            if(node.z) params.z=node.z;
            if(node.z) params.z=node.z;
            if(node.port) params.port=node.port;
            if(node.interfaceAgreement) params.interfaceAgreement=node.interfaceAgreement;
            if(node.networkAgreement) params.networkAgreement=node.networkAgreement;
            if(node.initAngleX) params.initAngleX=node.initAngleX;
            if(node.rotateMax) params.rotateMax=node.rotateMax;
            if(node.interfacePort) params.interfacePort=node.interfacePort;
            if(node.username) params.username=node.username;
            if(node.productModel) params.productModel=node.productModel;
            if(node.seqNum) params.seqNum=node.seqNum;
            if(node.manu) params.manu=node.manu;
            if(node.markerType) params.markerType=node.markerType;
            if(node.markerId) params.markerId=node.markerId;
            node=params;
            setTimeout(function(){
                ME.vm.camera.floatEdit.visible=true;
            },10);

        }
        //生成修改面板
        var edit = ME.vm[node.markerType].floatEdit;
        // edit.left = event.offsetX+10;
        // edit.top = event.offsetY-100;

        util.emptyObj(edit.data);

        if (node.markerType == 'anchor') {
            for(var i in node){
                edit.data[i] = node[i];
            }
            ME.vm.mapChangeImg();
        }else{
            edit.data = util.deepCopy(node);
        }

        if (node.markerType == 'tag') {
            this.showQrCode(node);
        }

        if (node.color) edit.data.color = node.color;
        if (node.cat && node.cat.color) edit.data.color = node.cat.color;

        ME.vm.tag.floatEdit.typeIconShow = false;

        if (node.type && node.type.id) {
            edit.data.typeId = node.type.id;
            edit.typeIcon = ME.imgHost + 'tagTypes_' + node.type.icon;
            ME.vm.tag.floatEdit.typeIconShow = true;
        }

        if (node.cat && node.cat.id) {
            edit.data.catId = node.cat.id;
        }

        edit.visible = true;

        var zindex = 100;
        var raps = $('.el-dialog__wrapper');
        raps.map(function(i, e){
            var z = parseInt($(e).css('z-index'));
            if(zindex<z) zindex=z;
        });

        $('.el-popover').css({ left: '50%', top: '20%', 'z-index': ++zindex});
    },

    markerHover: function markerHover(marker) {
        marker.markerTip = null;

        marker.on('mouseover',function (event) {
            if(MarkerTool.clearHoverTip) marker.markerTip = null;
            if (!MarkerTool.clearHoverTip && marker.markerTip) return;

            var left = event.e.offsetX + 10;
            var top = event.e.offsetY + 2;

            marker.markerTip = document.createElement('div');
            marker.markerTip.innerHTML = MarkerTool.createMarkerInfoTable(marker, top, left);
            document.body.appendChild(marker.markerTip);
            MarkerTool.clearHoverTip = false;
        });
        marker.on('mouseout',function (event) {
            if (marker.markerTip && !MarkerTool.clearHoverTip) {
                document.body.removeChild(marker.markerTip);
                delete marker['markerTip'];
            }
        });
    },

    createMarkerInfoTable: function createMarkerInfoTable(marker, top, left) {
        //编号，别名，分组，类型，电量，状态，速度
        var a = marker.node;
        var c = '<div class="qtip-default" style="position:absolute;top:' + top + 'px;left:' + left + 'px;z-index:100;padding:10px;">';
        c += "<span style='float: left;' ><table class='infowindowTable'>";
        if (a.markerType === 'tag') {
            c += "<tr><td>编号：</td><td>" + a.code + "</td></tr>";
            c += "<tr><td>别名：</td><td>" + (a.alias ? a.alias : '未定义') + "</td></tr>";
            if (a.type) a.type.cname?c += "<tr><td>类型：</td><td>" + a.type.cname + "</td></tr>":'';
            if (a.cat) a.cat.cname?c += "<tr><td>分组：</td><td>" + a.cat.cname + "</td></tr>":'';
            if (a.powerLevel) c += "<tr><td>电量：</td><td>" + a.powerLevel + "%</td></tr>";
            if (a.heartRate || a.heartRate==0) c += "<tr><td>心率：</td><td>" + a.heartRate + "次/分钟</td></tr>";
            // c += "<tr><td>状态：</td><td>" + (a.status == 'online' ? "在线" : "离线") + "</td></tr>";
            // c += "<tr><td>速度：</td><td>" + (a.speed?a.speed:0) + "cm/s</td></tr>";

            if(ME.vm && ME.vm.switchData.isShowCoordinate) {
                c += "<tr><td>位置(m)：</td><td>X:" + (a.x / 100).toFixed(2) + "，Y:" + (a.y / 100).toFixed(2) + "</td></tr>";
                c += "<tr><td>位置(px)：</td><td>X:" + Math.round(a.screenX) + "，Y:" + Math.round(a.screenY) + "</td></tr>";
            }

            c += "</table></span></div>";

            return c;

        } else if(a.markerType=='anchor'){
            c += "<tr><td>编号：</td><td>" + a.code + "</td></tr>";
            c += "<tr><td>别名：</td><td>" + (a.alias ? a.alias : '未定义') + "</td></tr>";
            c += "<tr><td>基站类型：</td><td>" + (a.isMaster == '1' ? "主基站" : "从基站") + "</td></tr>";
        }else if(a.markerType=='camera'){
            c += "<tr><td>IP地址：</td><td>" + a.ip + "</td></tr>";
            c += "<tr><td>端口：</td><td>" + a.port + "</td></tr>";
        }else if(a.markerType=='fence'){
            var innerTagNum = Object.getOwnPropertyNames(a.innerTags).length - 1;
            c += "<tr><td>围栏ID：</td><td>" + a.id + "</td></tr>", c += "<tr><td>围栏名称：</td><td>" + a.cname + "</td></tr>", c += "<tr><td>围栏类型：</td><td>" + a.ftype + "</td></tr>", c += "<tr><td>预警条件：</td><td>" + (a.trif == 'i' ? '进入触发' : a.trif == 'o' ? '出去触发' : '进出触发') + "</td></tr>", c += "<tr><td>内部标签：</td><td>";
            c += "共" + innerTagNum + "个<br/>";
            c += "</table></span></div>";
            return c;
        }else if(a.markerType=='wall'){
            //围墙类型处理
            var wtype=a.wtype?(function(){
                var t='未知';
               for(var i=0;i<ME.vm.wall.wtypes.length;i++){
                   var item=ME.vm.wall.wtypes[i];
                   if(a.wtype==item.code){
                       t=item.cname;
                       break;
                   }
               }
               return t;

            })():'未知';
            c += "<tr><td>围墙ID：</td><td>" + a.id + "</td></tr>", c += "<tr><td>围墙名称：</td><td>" + a.cname + "</td></tr>", c += "<tr><td>围墙类型：</td><td>" + wtype + "</td></tr>", c += "<tr><td>开始坐标：</td><td>X:"+a.startX+'&nbsp;&nbsp;&nbsp;Y:'+a.startY+"</td></tr>",c += "<tr><td>结束坐标：</td><td>X:"+a.endX+'&nbsp;&nbsp;&nbsp;Y:'+a.endY+"</td></tr>";
            c += "</table></span></div>";
            return c;
        }
        c += "<tr><td>位置(m)：</td><td>X:" + (a.x / 100).toFixed(2) + "，Y:" + (a.y / 100).toFixed(2) + "</td></tr>";
        c += "<tr><td>位置(px)：</td><td>X:" + Math.round(a.screenX) + "，Y:" + Math.round(a.screenY) + "</td></tr>";

        c += "</table></span></div>";

        return c;

        // createFenceInfoTable = function createFenceInfoTable(a, top, left) {
            var innerTagNum = Object.getOwnPropertyNames(a.innerTags).length - 1;

            var c = '<div class="qtip-default" style="position:absolute;top:' + top + 'px;left:' + left + 'px;z-index:100;padding:10px;">';
            c += "<span style='float: left;' ><table class='infowindowTable'>", c += "<tr><td>围栏ID：</td><td>" + a.id + "</td></tr>", c += "<tr><td>围栏名称：</td><td>" + a.cname + "</td></tr>", c += "<tr><td>围栏类型：</td><td>" + a.ftype + "</td></tr>", c += "<tr><td>预警条件：</td><td>" + (a.trif == 'i' ? '进入触发' : a.trif == 'o' ? '出去触发' : '进出触发') + "</td></tr>", c += "<tr><td>内部标签：</td><td>";
            c += "共" + innerTagNum + "个<br/>";
            c += "</td></tr>";

            if (innerTagNum > 0) {
                c += "<tr><td>标签列表：</td><td>";
                for (var t in a.innerTags) {
                    var tag = a.innerTags[t];
                    c += (tag.alias ? tag.alias : tag.code) + '<br/>';
                }
                c += "</td></tr>";
            }

            c += "</table></span>", c += "</div>";
            return c;
        // }
    },

    removeMarkerInfoTable: function () {
        $('.qtip-default').each(function (i,e) {
            $(e).parent().remove();
        });
        this.clearHoverTip = true;
    },

    getMarker: function getMarker(allMarker, node, paper) {
        var marker = allMarker[node.markerId];
        if (marker) {
            paper.remove(marker);
        }
        var size = ME.markerSize;
        var rect = new fabric.Rect({
            width: size,
            height: size,
            top: -size*2,
            originX: 'center',
            // opacity:0,
        });

        marker = new fabric.Group([rect], {status:'moving'});
        marker.node = node;
        paper.add(marker);
        return marker;
    },

    //画原点
    drawCoordinateMarker: function drawCoordinateMarker(paper, scan, yCenter) {
        var len = 100;
        var lineX = new fabric.Line([ ME.center.x, ME.center.y, ME.center.x + len, ME.center.y ], {
            fill: 'red',
            stroke: 'red',
            strokeWidth: 5,
            selectable: false
        });
        var triX = new fabric.Triangle({
            top: ME.center.y +3, left: ME.center.x + len -4, width: 15, height: 15, fill: 'red',
            originY:'center',
            angle:-30,selectable: false
        });

        //绘制文本
        var textX = new fabric.Text('X', {
            fontSize: 16,
            fill: 'red',
            originY:'center',
            top:ME.center.y,
            left:ME.center.x + len + 13,
            selectable: false
        });

        var lineY = new fabric.Line([ ME.center.x, ME.center.y, ME.center.x, ME.center.y+ len ], {
            fill: 'red',
            stroke: 'red',
            strokeWidth: 5,
            selectable: false
        });

        var triY = new fabric.Triangle({
            top: ME.center.y + len + 5, left: ME.center.x +3, width: 15, height: 15, fill: 'red',
            angle:180,originX:'center',
            selectable: false
        });

        var textY = new fabric.Text('Y', {
            fontSize: 16,
            fill: 'red',
            originX:'center',
            top:ME.center.y + len + 10,
            left:ME.center.x,
            selectable: false
        });

        paper.add(lineX, textY, triX, lineY, textX,  triY);
    },


    markerPower: function markerPower(size, node, marker,  paper) {
        if(!node.powerLevel){
            node.powerLevel = UBIT.getPower(node.power)
        }
        //是否显示
        var isShow = ME.vm.isShowTagPower(node.powerLevel);
        if(!isShow) return ;
        //先清除
        this.hidePower(marker);
        var color = '#ccc';
        if(ME.projectCode==='slairport'){
            node.powerLevel=100;
        }
        var width = size * (node.powerLevel / 100);
        if (node.powerLevel < 30) {
            color = "#eb3324";
        }else if (node.powerLevel < 70) {
            color = "#f7cd46";
        } else {
            color = "#4cd96c";
        }


        var topP = - (size * (13/18 + 3/9));

        marker.powerFrame = new fabric.Rect({
            top:topP,
            originX:'center',
            width: size,
            height: size/9,
            radius:10,
            fill:color,
            opacity: 0.2,
            rx:2,
            ry:2,
        });
        marker.power = new fabric.Rect({
            top:topP,
            left:-(size/2),
            width: width,
            height: size/9,
            radius:10,
            fill:color,
            opacity: 0.99,
            rx:2,
            ry:2,
        });
        paper.add(marker.powerFrame)
        marker.add(marker.powerFrame);
        paper.add(marker.power)
        marker.add(marker.power);
    },

    //隐藏电量
    hidePower:function hidePower(node,paper){
        if(node.powerFrame||node.power){
            node.powerFrame.set('opacity',0);
            node.power.set('opacity',0);
            ME.vm.switchData.hidePowerMakerId.push(node.node.markerId);
            // node.remove(node.powerFrame);
            // node.remove(node.power);
        }
    },
    //显示电量
    showPower:function hidePower(node,paper){
        if(node.powerFrame || node.power){
            node.powerFrame.set('opacity',0.2);
            node.power.set('opacity',1);
            ME.vm.switchData.hidePowerMakerId.splice(ME.vm.switchData.hidePowerMakerId.indexOf(node.node.markerId),1);
            // node.remove(node.powerFrame);
            // node.remove(node.power);
        }
    },
    //绘画摄像头覆盖范围
    // markerArea:function markerArea(node,paper,size){
    //     if(node.markerType!=='camera') return;
    //     //计算圆心
    //     var x=node.x ? node.x : 0;
    //     var y=node.y ? node.y : 0;
    //     var deg_x=node.initAngleX ? node.initAngleX % 360 : 0;    //x轴正方向为0角度
    //     var deg_end_x=node.initAngleX+270;    //结束时角度，假设旋转角120
    //
    //     var r=node.visual_radius ? node.visual_radius*size/100 : 50;
    //     // var r=node.visual_radius ? node.visual_radius : 3000;
    //
    //     var rad = Math.PI / 180;
    //     var x1 = r * Math.cos(-deg_x * rad);
    //     var x2 =  r * Math.cos(-deg_end_x * rad);
    //     var y1 =  r * Math.sin(-deg_x * rad);
    //     var y2 =  r * Math.sin(-deg_end_x * rad);
    //
    //     //判断绘画长弧或短弧(1:长弧，0：短弧)
    //     var deg=deg_end_x-deg_x>180?1:0;
    //     // var area=paper.path(['M', x1, y1, "A", r, r,0,1,1,x2,y2,'L',0,0,'l',x1,y1]).attr({fill:'rgba(0,125,222,.6)','stroke-width':"0"});
    //     var area=paper.path(['M', x1, y1, "A", r, r,0,deg,0,x2,y2,'L',0,0,'l',x1,y1]).attr({fill:'rgba(0,125,222,.6)','stroke-width':"0"});
    //     return area;
    //  },


};