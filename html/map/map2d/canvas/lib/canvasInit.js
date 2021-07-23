/**
 * Created by Administrator on 2017/12/23/023.
 * will do:
 *    1,图片背景绘制
 *    2，标签，基站，摄像头，围栏绘制渲染
 *    3，坐标原点初始化
 */

function canvasInit(){
    ME.panning = false;
    ME.moveHeat=false;
    ME.screenLength = document.documentElement.clientWidth;
    ME.canvas = paper = new fabric.Canvas('mapSvg');
    // ME.heatMap = new fabric.Canvas(ME.canvas.upperCanvasEl);
    fabric.Object.prototype.transparentCorners = false;
    // fabric.Object.prototype.objectCaching = false;

    ME.canvas.hoverCursor = 'default';
    ME.canvas.selection = false;

    ME.heatMap_last_matrix = {scale:1,dx:0,dy:0};

    ME.refreshHeatMap = function (){
        var ctx = ME.canvas.upperCanvasEl.getContext('2d');
        ctx.clearRect(-ME.center.x, -ME.center.y, ME.canvas.upperCanvasEl.width, ME.canvas.upperCanvasEl.height);
        ctx.save();
        ctx.transform(ME.heatMap_last_matrix.scale,0,0,ME.heatMap_last_matrix.scale,ME.heatMap_last_matrix.dx, ME.heatMap_last_matrix.dy);
        ctx.drawImage(ME.HeatMapImg, 0, 0);
        ctx.restore(); //恢复绘图状态
    };

    //鼠标按下
    ME.canvas.on('mouse:down', function (e) {
        //隐藏左侧菜单等
        $('.logoIn').removeClass('active');
        $('.panel .tab-list .list-item').removeClass('active');
        ME.vm.tabActive = '';
        $('#right_menus_items>div').removeClass('active');
        $('.total_tag_table').hide();
        //清除所以悬浮面板
        MarkerTool.removeMarkerInfoTable();


        //根据全局变量optionType判断操作类型
        if(ME.vm.optionType===null){
            //拖动画布
            ME.panning = true;
            if(ME.HeatTool && ME.vm.heatMap.isShow){
                ME.moveHeat=true;
            }

        }else {
            //根据optionType类型判断操作
            ubiMap.clickOptions(e);
        }
    });

    //鼠标抬起
    ME.canvas.on('mouse:up', function (e) {
        ME.panning = false;
        ME.moveHeat=false;
    });

    //鼠标移动
    ME.canvas.on('mouse:move', function (e) {
        //鼠标按下后移动
        if (ME.panning && e && e.e) {
            var delta = new fabric.Point(e.e.movementX, e.e.movementY);
            ME.canvas.relativePan(delta);
            //拖动热力图
            ME.heatMap_last_matrix.dx +=delta.x;
            ME.heatMap_last_matrix.dy +=delta.y;
            if(ME.moveHeat && ME.HeatTool){
                ME.refreshHeatMap();
            }
        }else {
            ubiMap.moveOptions(e);
        }
    });

    //移动端移动
    ME.canvas.on('touch:drag', function (e) {
        var delta = new fabric.Point(e.e.movementX, e.e.movementY);
        ME.canvas.relativePan(delta);
    });

    //鼠标滚轮监听
    $(".upper-canvas").mousewheel(function(event) {
        var scale = (event.deltaY > 0 ? 0.1 : -0.1) + ME.canvas.getZoom();
        var point = new fabric.Point(event.pageX, event.pageY);
        ubiMap.zoom(point, scale);
    });

    function UbiMap(){

        var allMarker = {};
        var hisMarker = {};

        this.pointers = []; //绘制围栏或者区域的点存放队列
        this.lines = [];
        this.myDynamicLine = null;
        this.myclipPolygonMarker = null;
        this.isDrawComplete = false; //是否绘制完成
        this.len = 0;

        this.zoom = function(point, scale){
            scale = Math.max(0.1,scale); //最小为原来的1/10
            scale = Math.min(3,scale); //最大是原来的3倍
            ME.canvas.zoomToPoint(point, scale);

            //缩放热力图
            var px=(point.x-ME.heatMap_last_matrix.dx)/ME.heatMap_last_matrix.scale;
            var py=(point.y-ME.heatMap_last_matrix.dy)/ME.heatMap_last_matrix.scale;
            ME.heatMap_last_matrix.dx = point.x-px*scale;
            ME.heatMap_last_matrix.dy = point.y-py*scale;
            ME.heatMap_last_matrix.scale = scale;
            if(ME.HeatTool && ME.vm.heatMap.isShow) {
                ME.refreshHeatMap();
            }
            $('.main .coordinate .zoom').text(scale.toFixed(1));
        };

        //设置背景
        this.setBg = function (data, obj, realLength) {
            var url = data.filePath;
            var imgUrl = UBIT.getImgSrc('maps', url);
            var img = new Image();
            img.src = imgUrl;
            img.onload = function () {
                ME.mapWidth = this.width;
                ME.mapHeight = this.height;

                ME.canvas.setBackgroundImage(imgUrl, ME.canvas.renderAll.bind(ME.canvas), {
                    left: ME.center.x,
                    top: ME.center.y,
                });

                ME.vm.fullscreenLoading = false;
            };

            img.onerror = function(msg){
                ME.vm.fullscreenLoading = false;
                ME.vm.mapIsMiss();
                return;
            }

        };

        this.getScreenPostion = function (e){
            return ME.canvas.getPointer(e);
        },

            //将真实坐标转化为屏幕坐标
            this.convert = function (param, realLength) {
                if(!realLength) realLength = ME.vm.curRealLength;

                param.x = param.x ? param.x : 0;
                param.y = param.y ? param.y : 0;

                var relPosX = parseFloat(param.x),
                    relPosY = parseFloat(param.y);

                param.screenX = parseFloat(relPosX * ME.mapWidth / realLength) + parseFloat(ME.center.x);
                param.screenY = parseFloat(relPosY * ME.mapWidth / realLength) + parseFloat(ME.center.y);
                return { x: param.screenX, y: param.screenY };
            };

        //将屏幕坐标转为实际坐标
        this.screenToRel=function(param, realLength){
            if(!realLength) realLength = ME.vm.curRealLength;
            var relX = (parseFloat(param.x)-parseFloat(ME.center.x)) * realLength/ME.mapWidth;
            var relY = (parseFloat(param.y)-parseFloat(ME.center.y)) * realLength/ME.mapWidth;
            return { x: parseFloat(relX.toFixed(2)), y: parseFloat(relY.toFixed(2)) };
        };

        this.getMarker = function (id) {
            return allMarker[id];
        };
        this.getAllMarker = function () {
            return allMarker;
        };
        this.getHisMarker = function (id) {
            return hisMarker[id];
        };
        this.getAllHisMarker = function () {
            return hisMarker;
        };

        this.setIcon = function () {
            MarkerTool.drawCoordinateMarker(ME.canvas);
        };

        this.forceRemoveAlert = function(data) {
            if (ubiMap.lockTag) return;
            // console.warn(data);
            //todo
        };

        this.sosAlert = function(data){
            if(ubiMap.lockTag) return;
            // console.warn(data);

            //todo
            if(data.map.indexOf('sjha')>-1){
                var tag = ME.vm.getTag(data);
                if(!tag || tag.typeId==1){
                    return;
                }
            }

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

        this.fenceAlert = function(data){
            if(ubiMap.lockTag) return;
            // console.log(data);

            if(data.msgType!='fenceAlert') return;

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

        this.moreMonitorAlert = function(data){
            // console.warn('fenceAlert:', data);
            //todo
        };

        this.updateHeartRate = function(data){
            if (!data.id) return;
            var marker = ubiMap.getMarker('tag_' + data.id);
            if (!marker) return;
            marker.node.heartRate = data.heartRate;
        };


        //添加标签
        this.addMarker = function (param, isHis) {
            if (!param.markerType) {
                return false;
            }

            //如果不属于当前地图，则return
            if (!isHis  && (!param.mapId || param.mapId != ME.currentMapId)) return false;

            // if(!isHis){// && param.hasOwnProperty('isShow') && !param.isShow
            //     return false;
            // }

            this.delMarker(param.markerId); //delData是删除元素集合

            //生成标签
            var marker = MarkerTool.drawMarker(param, ME.canvas);
            //坐标转化
            var newPos = this.convert(param);
            //设置坐标
            this.posInital(marker, newPos);

            //已经有id第一次刷新/编辑时
            var markers = isHis?hisMarker:allMarker;
            markers[param.markerId] = marker;

            return marker;
        };


        //添加标签
        this.addHisMarker = function (param) {
            return this.addMarker(param, true);
        };

        //是否显示标签
        this.toggleTag = function(isShow, isHis){
            this.toggleMarkers('tag', isShow, isHis);
        };

        this.toggleAnchor = function(isShow, isHis){
            this.toggleMarkers('anchor', isShow, isHis);
        };

        this.toggleMarkers = function (type, isShow, isHis) {
            if(isShow){
                var now = Date.now();
                var nodes = ME.vm[type].data;
                for(var i=0;i<nodes.length;i++){
                    var n = nodes[i];

                    if(type=='tag'){
                        if(!n.time) continue;

                        var diff = now - n.time;
                        // console.log(data);
                        if(!ME.tagDisappearTime || ME.tagDisappearTime==0 || diff < ME.tagDisappearTime){
                            this.addMarker(n, isHis);
                        }
                    }else {
                        this.addMarker(n, isHis);
                    }
                }
            }else {
                var makers = isHis? hisMarker: allMarker;
                for (var i in makers) {
                    var kid = i.split('_');
                    if (kid[0] === type) {
                        this.delMarker(i, isHis);
                    }
                }
            }
        }

        this.toggleNode = function(markerId, isShow, isHis){
            if(isShow){
                var kid = markerId.split('_');
                //add
                if(kid[0]=='tag' || kid[0]=='anchor'){
                    var node = ME.vm.getNodeByCode(kid[0], kid[1]);
                }else {
                    var node = ME.vm.getNodeById(kid[0], kid[1]);
                }

                this.addMarker(node, isHis);

            }else {
                //remove
                this.delMarker(markerId, isHis);

            }
        };

        this.changeColor = function (newData, oldData) {
            var newMarker = allMarker[newData.markerType + '_' + newData.code];
            var oldMarker = allMarker[oldData.markerType + '_' + oldData.code];
            if (oldMarker) {
                var color = 'blue';
                if (oldMarker.node.cat && oldMarker.node.cat.color) color = oldMarker.node.cat.color;
                this.changeImgSrc(oldMarker, color);
            }
            // debugger;
            if (newMarker) {
                this.changeImgSrc(newMarker, 'red');

                //todo  移动地图，将需要显示的标签移动到屏幕中心
                // var point = { x: parseFloat(newMarker.node.screenX), y: parseFloat(newMarker.node.screenY) };
                // this.movePaperInCenterPointer(point);
            };
        };

        this.movePaperInCenterPointer = function (point) {
            ubiMap.zoom(point, 1);
            var center0 = ME.canvas.getCenter();
            // var center = ME.canvas.getVpCenter();

            // var cpoint = new fabric.Point(ME.center.x, ME.center.y);

            var center = fabric.util.transformPoint(point, ME.canvas.viewportTransform);

            // var delta = new fabric.Point(point.x - center.x, point.y - center.y);

            // ME.canvas.relativePan(delta);
            ME.canvas.absolutePan(center);
        };

        this.changeImgSrc = function (marker, ncolor) {
            var type = 'location',
                color = ncolor;
            var node = marker.node;
            if (node.markerType == 'anchor') {
                type = 'anchor';
            } else {
                if (node.type && node.type.icon) {
                    type = node.type.icon;
                };
            }

            var path = ME.iconPath + node.markerType + '/' + type + '_' + color + '.png';
            var objs = marker.getObjects();

            for(var i=0;i<objs.length;i++){
                var obj = objs[i];
                if(obj.hasOwnProperty('filters') && obj.setSrc){
                    obj.setSrc(path, function(){
                        ME.canvas.renderAll();
                        obj.setCoords();
                    });
                    return ;
                }
            }
        };


        //设置坐标
        this.posInital = function (marker, newPos) {
            // marker.transform(tf);
            // debugger;
            var x = newPos.x,
                y = newPos.y;
            marker.x = x;
            marker.y = y;
            //所有的marker 都必须统一大小 ME.markerSize
            marker.set({'left':x - ME.markerSize/2, 'top':y  - ME.markerSize});
        };
        //移动节点标签
        this.moveNode = function (id, x, y, p, marker) {
            //
            if (!marker) {
                marker = ubiMap.getMarker(id);
            }
            if (!marker) return;
            // debugger;

            marker.x = x;
            marker.y = y;

            // marker.set({'left':x - ME.markerSize/2, 'top':y  - ME.markerSize});
            marker.animate({'left':x - ME.markerSize/2, 'top':y  - ME.markerSize}, {
                duration: 300,
            });

            if (marker.flag == 'tag'&& p) {
                if(!marker.node.isShow) return;

                marker.log = marker.log || [];
                marker.log.push({ x: x, y: y });

                if (marker.log.length > this.len) {
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
            }
        };

        this.moveArea = function (area, x, y){


            area.animate({'left':x - ME.markerSize/2, 'top':y  - ME.markerSize}, {
                duration: 400,
            });
            // area.set({'left':x, 'top':y});
        };
        //设置拖尾长度值
        this.setLen = function (val) {
            this.len = parseInt(val);
        };
        //设置标签锁定状态
        this.setLockTag = function (flag, func) {
            this.lockTag = flag;
        };
        this.drawFabricCircle = function (p, r, fcolor, scolor, opacity){
            if(!opacity) opacity = 1;
            if(!fcolor) fcolor = scolor = 'red';

            var c = new fabric.Circle({
                left: p.x - r,
                top: p.y - r,
                radius: r,
                fill: fcolor,
                stroke: scolor,
                opacity:opacity,
                selectable:false,
            });
            ME.canvas.add(c);
            return c;
        };
        this.drawFabricLine = function(p1, p2, wtype,color){
            if (color === undefined) {
                color = "#2f5c69";
            }
            var strokeArray=[];
            switch(wtype){
                case 'solid': strokeArray=[0,0];break;
                case 'dotted': strokeArray=[3,5];break;
                case 'rail': strokeArray=[20,10];break;
                default :  strokeArray=[3,5];
            }
            var line = new fabric.Line([ p1.x, p1.y, p2.x, p2.y ], {
                fill: color,
                stroke: color,
                // strokeDashArray: [3, 5],
                strokeDashArray: strokeArray,
                selectable:false,
            });


            ME.canvas.add(line);

            if(wtype === 'solid'){

                ME.canvas.add(new fabric.Circle({
                    left:  p2.x,
                    top:  p2.y,
                    radius: 2,
                    fill: 'red'
                }));

            }


            return line;
        };
        this.drawLine=function(marker, logs, color){
            if (marker.logPath) {
                ME.canvas.remove(marker.logPath);
            }

            if(!logs || logs.length<1){
                return ;
            }

            var str = '';
            logs.forEach(function (item, index) {
                if (index == 0) {
                    str += 'M '+item.x+' '+item.y+' ';
                } else {
                    str += 'L '+item.x+' '+item.y+' ';
                }
            });
            // str += 'z';

            if(!color) color = 'black';

            marker.logPath = new fabric.Path(str, { stroke: color, strokeWidth: 1, fill: false, selectable : false });//objectCaching: false

            ME.canvas.add(marker.logPath);
        }


        this.moveOptions = function(e) {
            //屏幕坐标
            // if(!ME.vm.screenCoordinate){
            //     return;
            // }
            var pointer=ME.canvas.getPointer(e.e);
            var rel = this.screenToRel(pointer, ME.vm.curRealLength);

            if(ME.vm && ME.vm.switchData.isShowCoordinate) {
                // show coordinate
                $('.company .coordinate .x').text(pointer.x.toFixed(2));
                $('.company .coordinate .y').text(pointer.y.toFixed(2));

                $('.company .coordinate .relX').text((rel.x / 100).toFixed(2));
                $('.company .coordinate .relY').text((rel.y / 100).toFixed(2));
            }

            switch(ME.vm.optionType){
                case 'fence':
                case 'camera': this.drawPolygonMove(e, pointer, rel);break;
                // case 'setCoord_anchor': this.getPosMove(e, pointer, rel);break;
                // case 'setCoord_camera': this.getPosMove(e, pointer, rel);break;
                case 'wall':
                case 'correctMap':
                case 'distance': this.drawDistanceMove(e, pointer, rel);break;
                default :return;
            }
        };

        this.drawPolygonMove = function(e, pointer, rel) {
            var plen = this.pointers.length;
            if(plen>=1){
                if (!this.myDynamicLine) {
                    this.myDynamicLine = this.drawFabricLine(this.pointers[plen-1], pointer);

                } else if(!this.isDrawComplete){
                    //refres line
                    this.myDynamicLine.set({ 'x2': pointer.x, 'y2': pointer.y });
                }
            }
            if (plen > 2) {

                if (UBIT.getDistance(pointer, this.pointers[0]) < ME.distance_to_clip_polygon) {

                    if (!this.myclipPolygonMarker) {
                        this.myclipPolygonMarker = this.drawFabricCircle(this.pointers[0], 5, '#fff', '#666', 0.5);

                    } else {

                        this.myDynamicLine.set({
                            x2: this.pointers[0].x,
                            y2: this.pointers[0].y,
                        });
                    }

                    this.isDrawComplete = true;

                } else if(this.myclipPolygonMarker){

                    this.isDrawComplete = false;
                    ME.canvas.remove(this.myclipPolygonMarker);
                    this.myclipPolygonMarker = null;

                }

            }
        },

            this.drawDistanceMove = function(e, pointer, rel) {
                if (this.pointers.length === 1) {
                    if (!this.myDynamicLine) {
                        this.myDynamicLine = this.drawFabricLine(this.pointers[0], pointer);

                    } else {
                        this.myDynamicLine.set({
                            x2:pointer.x, y2:pointer.y,
                        });
                    }
                    //动态显示距离
                    var start = { x: this.pointers[0].relX, y: this.pointers[0].relY };
                    var dis = UBIT.getDistance(start, rel);

                    // var left = pointer.x + 60;
                    // var top = pointer.y + 25;
                    var left = e.e.offsetX + 10;
                    var top = e.e.offsetY + 4;

                    var markerTip=document.getElementById('distanceEl');
                    if (!markerTip) {
                        markerTip = document.createElement('div');
                        markerTip.id='distanceEl';
                        document.body.appendChild(markerTip);
                    }
                    markerTip.innerHTML = vsn.createDistanceHtml(start, rel, dis, top, left);
                }
            },

            //判断点击事件类型绘制围栏或摄像头封闭区域
            this.clickOptions=function(e) {
                switch(ME.vm.optionType){
                    case 'fence': this.drawFenceClick(e);break;
                    case 'camera': this.drawCameraClick(e);break;
                    case 'setCoord_anchor':
                    case 'setCoord_tag':
                    case 'setCoord_camera': this.getPosClick(e);break;
                    case 'correctMap':this.getDistanceClick(e,'correctMap');break;
                    case 'distance': this.getDistanceClick(e,'distance');break;
                    case 'wall': this.drawWallClick(e);break;
                    default :return;
                }
            };
        //绘制围栏
        this.drawFenceClick=function(e) {
            this.drawFenceOrCameraClick(e);
        };

        //绘制摄像头
        this.drawCameraClick=function(e){
            this.drawFenceOrCameraClick(e);
        };

        this.drawFenceOrCameraClick=function(e) {
            var pointer=ME.canvas.getPointer(e.e);
            this.pointers.push({x:pointer.x, y:pointer.y, isDranw:false});

            if(this.pointers.length<2) {
                return;
            }

            if (!this.pointers[0].isDranw && !this.pointers[1].isDranw) {
                this.pointers[0].isDranw = true, this.pointers[1].isDranw = true;
                this.lines.push(this.myDynamicLine);
                this.myDynamicLine = null;
                return ;
            }

            //已画完
            if(this.isDrawComplete){

                this.lines.push(this.myDynamicLine);
                this.pointers[this.pointers.length - 1] = this.pointers[0];

                if(ME.vm.optionType=='fence'){
                    ME.vm.createNewFence(this.pointers);

                    //open the left menu panel
                    $('#right_menus_items>.fence').addClass('active');
                    ME.vm.freshAllFenceInnerTags('fence');

                }else if(ME.vm.optionType=='camera'){

                    ME.vm.createNewCamera(this.pointers);
                    $('#right_menus_items>.camera').addClass('active');

                }

                ME.canvas.defaultCursor = 'default';
                ME.vm.optionType=null;

                return false;
            }

            var line = this.drawFabricLine(this.pointers[this.pointers.length-2], this.pointers[this.pointers.length-1]);
            this.lines.push(line);

            this.pointers[this.pointers.length - 1].isDranw = !0, this.pointers[this.pointers.length - 2].isDranw = !0;

            if(this.myDynamicLine){
                ME.canvas.remove(this.myDynamicLine);
                this.myDynamicLine = null;
            }
        };



        //围栏触发
        this.monitorFence = function (tag, lastPostion) {
            if (!lastPostion || !tag) {
                return;
            }
            ME.vm.fence.data.forEach(function (fence) {
                var lastPoint = { x: lastPostion.screenX, y: lastPostion.screenY };
                var currentPoint = { x: tag.screenX, y: tag.screenY };

                if (!fence.polygonPoints) {
                    fence.polygonPoints = [];
                    if (fence.points) {
                        var points = fence.points.split(',');
                        for (var j = 0; j < points.length; j++) {
                            var p = points[j];
                            var pos = p.split(' ');

                            var position = { x: parseFloat(pos[0]), y: parseFloat(pos[1]) };
                            var newPos = ubiMap.convert(position, ME.vm.curRealLength);
                            fence.polygonPoints.push({ x: newPos.x, y: newPos.y });
                        }
                    }
                }

                var isIn = util.isInPolygon2D(currentPoint, fence.polygonPoints);
                var lastIsIn = util.isInPolygon2D(lastPoint, fence.polygonPoints);

                //如果上次位置在围栏外面，而当前位置在围栏内部，则提示
                //如果上次位置在围栏内部，而当前位置在围栏外面，则提示
                var tipFlag = lastIsIn != isIn;
                if (!tipFlag) {
                    return;
                }

                //将进入或者离开的标签从fenceTag中动态的进行处理
                ME.vm.freshFenceInnerTags(fence);

                if (!ME.vm.switchData.fenceTip) return;

                if (!DataManager.isFenceTip(fence, isIn)) return;

                var r = vsn.createFenceTipObject(tag, fence, isIn);
                vsn.setFenceWaitMessage(r.string, r.type);

                if (ME.vm.switchData.sound) {
                    var audio = 'warning.mp3';
                    if (fence && fence.type && fence.type.audio) audio = fence.type.audio;

                    // audio = audio.split('.')[0];
                    // document.getElementById('audio_'+audio).play();

                    var v = new Audio("../../common/audio/" + audio);
                    v.play();
                }
            });
        };


        //点击绘制折线
        this.drawBrokenLine=function(e,type,tmpType){
            var pointer=ME.canvas.getPointer(e.e);
            var rel=this.screenToRel(pointer,ME.vm.curRealLength);

            //直线的两个端点
            ME.vm.allPoints[tmpType].push(pointer);
            ME.vm.allPoints[type].push(pointer);
            ME.vm.allPoints.num++;

            //如果绘制摄像头，则第一个点为小图标位置
            if(type=='camera'&&ME.vm.allPoints.num==1){
                ME.vm.camera.floatEdit.data.x=rel.x;
                ME.vm.camera.floatEdit.data.y=rel.y;
                ME.vm.camera.floatEdit.data.z=100;
            }
            //绘制点击路径
            if(ME.vm.allPoints[tmpType].length==2){
                var points=[];
                for(var i=0;i<ME.vm.allPoints[tmpType].length;i++){
                    points.push(ME.vm.allPoints[tmpType][i].x);
                    points.push(ME.vm.allPoints[tmpType][i].y);
                }

                var line = new fabric.Line(points, {
                    fill: 'red',
                    stroke: 'red',
                    selectable:false,
                });
                ME.canvas.add(line);
                ME.vm.allPoints[tmpType].shift();
                ME.newArea.lines.push(line);
            }
        };


        this.cleanPolygon = function(){
            for(var i=0;i<this.lines.length;i++){
                ME.canvas.remove(this.lines[i]);
            }
            if(this.myDynamicLine){
                ME.canvas.remove(this.myDynamicLine);
            }
            if(this.myclipPolygonMarker){
                ME.canvas.remove(this.myclipPolygonMarker);
            }

            this.pointers = [];
            this.lines = [];
            this.isDrawComplete = false;
            this.myDynamicLine = null;
            this.myclipPolygonMarker = null;

            ME.canvas.defaultCursor = 'default';
            ME.vm.optionType=null;
        },
            //绘制围墙
            this.drawWallClick=function(e){
                //点击一个点时执行move方法测距
                var pointer = this.getScreenPostion(e.e);
                var realPosition = ubiMap.screenToRel(pointer, ME.vm.curRealLength);
                this.pointers.push({
                    x:pointer.x,y:pointer.y,
                    relX:realPosition.x,relY:realPosition.y,
                });
                if(this.pointers.length===2){
                    //清除
                    var markerTip=document.getElementById('distanceEl');
                    if(markerTip) document.body.removeChild(markerTip);
                    this.isDrawComplete = true;
                }
                if(this.isDrawComplete){
                    ME.vm.createNewWall(this.pointers);
                    $('#right_menus_items>.wall').addClass('active');
                    ME.canvas.defaultCursor = 'default';
                    ME.vm.optionType=null;
                }
            },
            //绘制封闭区域
            this.drawPolygon=function(fillColor, opacity){
                if(this.pointers.length<=3) return ;
                var str='';
                //绘制覆盖区域
                for(var i=0;i<this.pointers.length;i++){
                    if(i==0){
                        str+='M ';
                        str+=this.pointers[i].x;
                        str+=' ';
                        str+=this.pointers[i].y;
                    }else {
                        str+=' L ';
                        str+=this.pointers[i].x;
                        str+=' ';
                        str+=this.pointers[i].y;
                    }
                }

                if(!fillColor) fillColor = '#ccc';
                if(!opacity) opacity = 0.3;

                var path = new fabric.Path(str, {
                    fill:fillColor,
                    opacity:opacity,
                    selectable:false,
                });
                ME.canvas.add(path);

                return path;
            };



        // 区域回显，params:各顶点,type:绘制覆盖区域类型（fence/camera）
        this.areaShow=function(params,type){
            var color=params.color?params.color:ME.vm.camera.color;
            var opacity=params.opacity?params.opacity:ME.vm.camera.opacity;

            var str='';
            var min_x=0;
            var min_y=0;

            if(params.area){
                ME.canvas.remove(params.area);
                delete params['area'];
            }

            for(var i=0;i<params.polygonPoints.length;i++){
                //计算区域点偏移
                min_x=params.polygonPoints[0].x;
                min_y=params.polygonPoints[0].y;
                if(params.polygonPoints[i].x<min_x){min_x=params.polygonPoints[i].x}
                if(params.polygonPoints[i].y<min_y){min_y=params.polygonPoints[i].y}
                var p = params.polygonPoints[i];
                if(i==0){
                    str+='M '+p.x+' '+p.y+' ';
                }else {
                    str+='L '+p.x+' '+p.y+' ';
                }
            }
            //覆盖区域相对鼠标点偏移（获取坐标时）
            params.areaOffsetX=min_x-params.polygonPoints[0].x;
            params.areaOffsetY=min_y-params.polygonPoints[0].y;
            str += 'z';

            var area = new fabric.Path(str, {'fill': color, "stroke": 'black', "opacity": opacity, strokeWidth: 1, strokeDashArray: [5, 5], selectable:false});
            ME.canvas.add(area);

            area.node = params;
            area.node.markerType = type;
            area.flag = type;

            return area;
        };
        // 测量距离样式改变
        this.drawDistance = function (flag,key) {
            if (flag) {
                ME.canvas.defaultCursor = "crosshair";
                ME.vm.optionType=key;

            } else {

                this.cleanPolygon();
                var disEl=$('#distanceEl');
                if(disEl){
                    disEl.remove();
                }

            }
        };

        //计算两点之间距离
        this.getDistanceClick=function(e,type){
            //点击一个点时执行move方法测距
            var pointer = this.getScreenPostion(e.e);
            var realPosition = ubiMap.screenToRel(pointer, ME.vm.curRealLength);
            this.pointers.push({
                x:pointer.x,y:pointer.y,
                relX:realPosition.x,relY:realPosition.y,
            });

            if(this.pointers.length>1){
                //计算出距离
                var distance = UBIT.getDistance({x:this.pointers[0].relX,y:this.pointers[0].relY}, realPosition);
                var dis = UBIT.getDistance(this.pointers[0], pointer);

                switch(type){
                    case 'distance':ME.vm.showTip('您当前测得的距离为' + distance + '厘米');break;
                    case 'correctMap':ME.vm.showPromptBox('您当前测得的距离为' + distance + '厘米,实际距离为（单位cm）:',{success:ME.vm.mapCorrect,succDate:{dis}});break;
                }

                //清除
                var markerTip=document.getElementById('distanceEl');
                if(markerTip) document.body.removeChild(markerTip);

                if(this.myDynamicLine){
                    ME.canvas.remove(this.myDynamicLine);
                    this.myDynamicLine = null;
                }
                this.pointers = [];
            }
        };

        //获取定位坐标
        this.getPosClick = function (e) {
            if (!ME.vm.optionType || ME.vm.optionType.indexOf('_')<0) return;

            var key = ME.vm.optionType.split('_')[1];

            var editData = ME.vm[key].floatEdit.data;

            var screenPosition = ubiMap.getScreenPostion(e.e);
            var realPosition = ubiMap.screenToRel(screenPosition, ME.vm.curRealLength);

            if(key == 'tag'){
                DataManager.adjustPosition(editData.mac, ME.projectCode+'_'+ME.currentMapId, realPosition.x, realPosition.y);
                // this.cleanPolygon();
                return;
            }

            this.moveNode(editData.markerId, screenPosition.x, screenPosition.y);

            var oldPosition = {x:editData.x, y:editData.y};

            editData.x = parseFloat(realPosition.x.toFixed(0));
            editData.y = parseFloat(realPosition.y.toFixed(0));

            if(key == 'camera'){

                var node = ME.vm.getNodeById(key,editData.id);
                // if(!node) return ;


                //实际相对原始点偏移  todo
                var detX =editData.x-oldPosition.x;
                var detY =editData.y-oldPosition.y;

                editData.points = updatePoints(editData.points, detX, detY);
                editData.polygonPoints = DataManager.generatePolygonByPoints(editData.points,  this.convert);
                if(!editData.area) editData.area = node.area;

                //重画区域
                editData.area = this.areaShow(editData, key);

            }

        };

        //esc取消绘制围栏/摄像头
        this.escDrawArea = function () {
            this.cleanPolygon();

            // setTimeout(function () {
            //     $(".seq-preloader").hide();
            // }, 500);
            //
            //     $("body").css("cursor", "default");
            //     vsn.placingStatus = -1;
            //     //删除存储的绘制点
            //
            // // 删除绘制区域
            //     if(ME.canvas.newFencePath){
            //         ME.canvas.remove(ME.canvas.newFencePath);
            //     }
            //     if(ME.canvas.newCameraPath){
            //     ME.canvas.remove(ME.canvas.newCameraPath);
            //     }
            //     //删除绘制直线
            //     if(ME.lines.length>0){
            //         for(var j=0;j<ME.lines.length;j++){
            //             ME.canvas.remove(ME.lines[j]);
            //         }
            //     }
            //     ME.vm.optionType=null;
            //     ME.vm.allPoints.fence=[];
            //     ME.vm.allPoints.tmpfence=[];
            //     ME.vm.allPoints.camera=[];
            //     ME.vm.allPoints.tmpcamera=[];
            //     this.setplacingStatus("-1");
            // //取消临时对象
            // // this.removeTemporaryObjects();
            // vsn.removeHighlight();
        };
        //围栏显示/隐藏
        this.toggleFence = function (flag) {
            var fences = ME.vm.fence.data;
            for (var i = 0; i < fences.length; i++) {
                var f = fences[i];
                if(flag){
                    // if(f&&f.area){continue}
                    var data=ME.vm.fence.data[i];
                    data.area = ubiMap.areaShow(data,'fence');
                    MarkerTool.markerHover(data.area);
                }else{
                    ME.canvas.remove(f.area);
                }
                // if (f && f.fenceDrawing && f.fenceDrawing.entireSet) {
                //     flag ? f.fenceDrawing.entireSet.show() : f.fenceDrawing.entireSet.hide();
                // }
            }
        };
        //显示/取消栅格
        this.toggleGrid = function (flag) {
            if (flag) {
                var width = ME.canvas.width;
                var height = ME.canvas.height;
                var step=ME.grids.step;
                var startX=0;
                var startY=0;
                for(var i=0;i<height/step;i++){
                    startY=step*i;
                    var ledLine=new fabric.Line([startX,startY,width,startY],{
                        fill: ME.grids.color,
                        stroke: ME.grids.color,
                        border:ME.grids.lineStyle
                    });
                    ME.canvas.add(ledLine);
                    ME.grids.lines.push(ledLine);
                }
                for(var j=0;j<width/step;j++){
                    startX=step*j;
                    startY=0;
                    var ordLine=new fabric.Line([startX,startY,startX,height],{
                        fill: ME.grids.color,
                        stroke: ME.grids.color,
                        border:ME.grids.lineStyle
                    });
                    ME.canvas.add(ordLine);
                    ME.grids.lines.push(ordLine);
                }
                // f = c.getCurrentPosition();
                // var zoom = 100 / (1 - c.getCurrentZoom() * 0.1);
                // a.grid = a.Grid(d * (1 - .1 * c.getCurrentZoom()), e * (1 - .1 * c.getCurrentZoom()), f.x, f.y, zoom);
            } else if (ME.grids) {
                for(var k=0;k<ME.grids.lines.length;k++){
                    ME.canvas.remove(ME.grids.lines[k]);
                }
            }
        };
        this.setplacingStatus = function (a, b, c, cb, wh) {
            func = a, i = b, j = c, callback = cb;
            el=wh;   //标记绘制类型（摄像头、围栏）
        };


        //移除未捕获的多边形（围栏，摄像头）
        this.removeUnsavedPolygons = function () {
            if (p = [], void 0 !== q) for (var b = 0; b < q.length; b++) {
                q[b].entireSet.remove();
            }q = [], r = !1, s = 0;

            void 0 !== a.myDynamicLine && a.myDynamicLine.entireSet.remove(), void 0 !== a.myclipPolygonMarker && a.myclipPolygonMarker.entireSet.hide();
            FenceTool.removeUnsavedFence();
            CameraTool.removeUnsavedCamera();
        };


        //删除标签
        this.delMarker = function (markerId, isHis) {
            var delMarker = allMarker[markerId];
            if(isHis){
                delMarker = hisMarker[markerId];
            }
            if (!delMarker) {
                return;
            }
            if (delMarker.logPath) {
                ME.canvas.remove(delMarker.logPath);
            }
            for(var i=0;i<delMarker.getObjects().length;i++){
                var obj = delMarker.getObjects()[i];
                ME.canvas.remove(obj);
            }
            ME.canvas.remove(delMarker);

            if(isHis){
                delete hisMarker[markerId];
            }else {
                delete allMarker[markerId];
            }

            delMarker = null;
        };

        //删除标签
        this.delHisMarker = function (markerId) {
            this.delMarker(markerId, true);
        };









        //todo
        this.drawCurve=function(marker, logs, color){

            if(ME.canvas.track){
                ME.canvas.remove(track)
            }
            var str = [];
            var length=logs.length;
            if(length>=3){
                //绘制贝塞尔曲线
                if(length<4){
                    //一个控制点
                    for(var i=length-3;i<length;i++){
                        if(i==length-3){
                            str.push('M '+logs[i].x);
                            str.push(logs[i].y);
                        }else {
                            str.push('L '+logs[i].x);
                            str.push(logs[i].y);
                        }
                    };
                }else{
                    //两个控制点
                    for(var i=length-4;i<length;i++){
                        if(i==length-4){
                            str.push('M '+logs[i].x);
                            str.push(logs[i].y);
                        }else {
                            str.push('L '+logs[i].x);
                            str.push(logs[i].y);
                        }
                    }
                }

                str=str.join(',');
                var track=new fabric.Path(str);
            }else{
                //绘制直线
                for(var i=0;i<length;i++){
                    str.push(logs[i].x);
                    str.push(logs[i].y);
                }
                var track=new fabric.Line(str, {
                });
            }
            var color='red';
            if (color) {
                track.set({ 'stroke': 'color' });
            }
            // marker.add(track);
            ME.canvas.add(track);
        };


    }


    ubiMap = new UbiMap();


    // (function render() {
    //     if(ME.isRender) ME.canvas.renderAll();
    //     fabric.util.requestAnimFrame(render);
    // })();
}
