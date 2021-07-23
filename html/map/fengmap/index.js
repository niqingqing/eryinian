window.onload = function () {
    pageInit();
};

function pageInit() {
    ME.vm = new Vue({
        el: "#app",
        data: {
            user:{},
            baseData:{},
            mapData:{},
            map:{
                key:"fb0153f20b634bc7e21447ac895a3bf2",
                id:UBIT.fengmap.fengmapId,
                name:"ubitraq",
                focusGroupID:1,
                instance:null,
                group:null
            },
            tags:{
                markers:{},
                layer:null,
                data:{}
            },
            anchors:{
                markers:{},
                layer:null,
                data:{}
            },
            fences:{
                markers:{},
                layer:null,
                data:{}
            },
            mapInstance:null,
            initFlag:{
                layer:false,
                map:false,
                data:false
            },
            tips:{
                tag:{
                    show:false,
                    data:{
                        "alias":"",
                        "status":"",
                        "mac":"",
                        // "x":"",
                        // "y":""
                    },
                    fields:{
                        "alias":"别名",
                        "status":"状态",
                        "mac":"mac",
                        // "x":"x",
                        // "y":"y"
                    }
                },
                anchor:{
                    show:false,
                    data:{
                        "alias":"",
                        "status":"",
                        "mac":"",
                        // "x":"",
                        // "y":""
                    },
                    fields:{
                        "alias":"别名",
                        "status":"状态",
                        "mac":"mac",
                        // "x":"x",
                        // "y":"y"
                    }
                }
            }
        },
        created: function () {
            var self = this;
            this.initMap();
            this.initData(function(){
                console.log("数据初始化完成");
                self.createNodes();
                self.initWebsocket();
            });
        },
        methods: {
            initMap:function(){
                var self = this;
                var __types = ["tag","anchor","fence"];
                var map = this.map.instance = new fengmap.FMMap({
                    container:document.getElementById("map-container"),
                    appName:self.map.name,
                    key:self.map.key
                });
                map.modelHoverTime = 10;//悬停事件时间
                map.openMapById(self.map.id);
                map.gestureEnableController.enableMapHover = true;
                map.on("loadComplete",(event) => {
                    self.initFlag.map = true;
                    var group = self.map.group = map.getFMGroup(map.groupIDs[0]);
                    map.mapScaleLevelRange = [23,23];
                    map.tiltAngle = 30; //设置地图的倾斜度为30度。
                    map.rotateAngle = 60; //设置地图的旋转角为60度。
                    this.initLayer();
                });
                map.on("mapClickNode",(node) => {
                    var eventType = "click";
                    if(__types.includes(node.__type)){
                        var tag = ME.vm[node.__type + 's'].markers[node.__id];
                        node[eventType].call(tag);
                    }
                });
                map.on("mapHoverNode",(node) => {
                    var eventType = "hover";
                    if(__types.includes(node.__type)){
                        var tag = ME.vm[node.__type + 's'].markers[node.__id];
                        node[eventType].call(tag);
                    }
                })
            },
            initData:function(cb){
                var flag = 0;
                var http = this.$http,self = this;
                var callback = function(flag){
                    if(flag === 4){
                        return cb();
                    }
                };
                initUser().then((user) => {
                    initMapData(user);
                    initBaseData(user);
                    initNodes(user);
                });
                function initMapData(user){
                    var url = ME.host + '/map/list?projectCode=' + user.projectCode;
                    http.get(url).then((res) => {
                        if(res.status === 200){
                            flag++;
                            self.mapData = res.body;
                            res.body.forEach((value) => {
                                if(value.id.toString() === ME.currentMapId){
                                    ME.currentMap = value;
                                }
                            });
                            callback(flag);
                        }
                    })
                }
                function initBaseData(user){
                    var url = ME.host + '/mapBaseDatas/list?projectCode=' + user.projectCode;
                    return http.get(url).then((res) => {
                        if(res.status  === 200){
                            flag++;
                            callback(flag);
                            return res.body;
                        }
                    })
                }
                function initUser(){
                    var url = ME.host + "/user/getCurrentUser?api_token=" + ME.api_token;
                    return http.get(url).then((res) => {
                        if(res.body){
                            flag++;
                            self.user = res.body;
                            callback(flag);
                            return res.body;
                        }
                    })
                }
                function initNodes(user){
                    var url = ME.host + '/nodes/list?projectCode=' + user.projectCode + '&mapId=' + ME.currentMapId;
                    return http.get(url).then((res) => {
                        if(res.status === 200){
                            flag++;
                            res.body.tags.forEach((value) => {
                                self.tags.data[value.mac] = value;
                            });
                            res.body.anchors.forEach((value) => {
                                self.anchors.data[value.mac] = value;
                            });
                            res.body.fences.forEach((value) => {
                                self.fences.data[value.id] = value;
                            });
                            callback(flag);
                            return res.body;
                        }
                    })
                }
            },
            initLayer:function(){
                this.initFlag.layer = true;
                if(!this.initFlag.map){
                    return this.$message.warning("请等待地图初始化完成");
                }
                this.imgLayer = new fengmap.FMImageMarkerLayer();
                this.textLayer = new fengmap.FMTextMarkerLayer();
                this.fenceLayer = new fengmap.FMPolygonMarkerLayer();
                this.map.group.addLayer(this.imgLayer);
                this.map.group.addLayer(this.textLayer);
                this.map.group.addLayer(this.fenceLayer);
                this.tags.layer = new Layer("tag");
                this.anchors.layer = new Layer("anchor");
                this.fences.layer = new Layer("fence");
                myEvents.emit("layerInitFinished");
            },
            createTag:function(mac,x,y){
                var self = this;
                var tag = this.tags.markers[mac] = new Tag({mac,x,y});
                tag.on("hover",function() {
                    var mac = this.mac;
                    self.showTip("tag",mac);
                });
                tag.on("click",function() {
                    var mac = this.mac;
                    self.showTip("tag",mac);
                });
                this.tags.layer.addTagOrAnchorMarkers(tag);
                return tag;
            },
            createAnchor:function(mac,x,y){
                var self = this;
                var anchor = this.anchors.markers[mac] = new Anchor({mac,x,y,online:true});
                anchor.on("click",function(){
                    self.showTip("anchor",mac);
                });
                anchor.on("hover",function(){
                    self.showTip("anchor",mac);
                });
                this.tags.layer.addTagOrAnchorMarkers(anchor);
                return anchor;
            },
            createFence:function(points,id,color){
                var fence = this.fences.markers[id] = new Fence({points,id,color});
                fence.on("click",function(){
                    console.log(this.id);
                });
                fence.on("hover",function(){
                    console.log(this.id);
                });
                this.fences.layer.addFenceMarker(fence);
                return fence;
            },
            move:function(){
                tag = this.tags.markers["0000001"];
                tag.moveTo(tag.x - 2,tag.y - 2);
            },
            convert:function (x,y) {
                var map = this.map.instance;
                var minx = map.minX;
                var miny = map.minY;
                var width = map.maxX - map.minX;
                var height = map.maxY - map.minY;
                return {
                    x:minx + x / 100,
                    y:miny + (height * 100 - y)/100
                }
            },
            createNodes:function(){
                var self = this;
                myEvents.on("layerInitFinished",() => {
                    console.log("地图初始化完成");
                    createAnchors();
                    createFences();
                });
                function createFences(){
                    console.log("初始化围栏");
                    for(var id in self.fences.data){
                        var fence = self.fences.data[id];
                        var temp = fence.points.split(",");
                        temp = temp.slice(0,temp.length - 1);
                        var points = temp.map((value) => {
                            var x = value.split(/\s/)[0];
                            var y = value.split(/\s/)[1];
                            var coord = self.convert(Number(x),Number(y));
                            coord.z = 56;
                            return coord;
                        });
                        self.createFence(points,id,fence.color);
                    }
                }
                function createAnchors(){
                    console.log("初始化基站");
                    for(var mac in self.anchors.data){
                        var anchor = self.anchors.data[mac];
                        var coord = self.convert(anchor.x,anchor.y);
                        self.createAnchor(mac,coord.x,coord.y);
                    }
                }
            },
            initWebsocket:function(){
                var self = this;
                if (!window.WebSocket) {
                    alert(lang['nonsupportWebSocket']);
                    return;
                }
                var projectCode = ME.user.projectCode;
                var mapId = ME.currentMapId;
                var socketUrl = `ws://${ME.wsHost}/websocket/${projectCode}_${mapId}_2D${ME.api_token}`;
                // var socketUrl = "ws://localhost:8083/websocket/xystudy_66_2Dluozuzhu_01234eb8ceb3e821e9d0490ccbc1ff34b752add4";
                var socket = this.socket = new WebSocket(socketUrl);
                socket.onerror = function (event) {
                    console.log(event);
                    //错误重连
                    socket.error && socket.error(event, this);
                    if(socket.connect)socket.connect();
                };
                socket.onmessage = self.socketMsgHandler;
                socket.onclose = onclose;
                function onclose (event){
                    console.log(event);
                    socket.closed = true;
                    //关闭重连
                    var id = setTimeout(function(){
                        if(socket.closed === false){
                            clearInterval(id);
                        }
                        socket = new WebSocket(socketUrl);
                        socket.onmessage = self.socketMsgHandler;
                        socket.onclose = onclose;
                    },3000)
                }
            },
            socketMsgHandler:function(event){
                if(!this.initFlag.layer){
                    return;
                }
                var msg;
                try{
                    msg = JSON.parse(event.data);
                }catch(e){}
                var self = this;
                if(msg.msgType === "coord"){
                    return this.coordHandler(msg);
                }

                if(msg.msgType === 'sos'){
                    return this.sosHandler(msg);
                }

                if(msg.msgType === 'fenceAlert'){
                    return this.fenceAlertHandler(msg);
                }
            },
            fenceAlertHandler:function(msg){
                var tag = this.tags.data[msg.mac];
                var text = `标签"${tag.mac}"正在${msg.isIn?"进入":"离开"}围栏${msg.fenceCname},时间:${moment(msg.time).format("YYYY-MM-DD HH:mm:ss")}`;
                var url = "/map/map2d/svg/follow/?tag=" + tag.mac;
                note.waring({
                    msg:text,
                    url
                })
            },
            sosHandler:function(msg){
                var tag = this.tags.data[msg.mac];
                var alias = tag.alias?tag.alias:tag.mac;
                var text = `标签"${alias}"发出了SOS信号,请及时处理!!!时间:${moment(msg.time).format("YYYY-MM-DD HH:mm:ss")}`;
                var url = "/map/map2d/svg/follow/?tag=" + tag.mac;
                note.add({
                    msg:text,
                    url
                })
            },
            coordHandler:function(msg){
                var mac = msg.mac;
                var coord = this.convert(msg.x,msg.y);
                var marker = this.tags.markers[mac];
                if(!marker){
                    this.tags.markers[mac] = marker = this.createTag(mac,coord.x,coord.y);
                }
                marker.moveTo(coord.x,coord.y);
            },
            showTip:function(type,mac){
                var self = this;
                var data = this[type + 's'].data[mac];
                var ele = this.tips[type].data;
                ele.alias = data.alias;
                ele.mac = data.mac;
                ele.status = data.status;
                // ele.x = data.x;
                // ele.y = data.y;
                this.tips[type].show = true;
                if(this.tips[type].timeoutId){
                    clearTimeout(self.tips[type].timeoutId);
                }
                this.tips[type].timeoutId = setTimeout(() => {
                    self.tips[type].show = false;
                    self.tips[type].timeoutId = null;
                },5000)
            }
        }
    })
}