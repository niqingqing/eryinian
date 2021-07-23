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
 * 页面初始化
 */
function init() {
    UBIT.initLang('frontMap');
    jqxNotificationInit();
    raphaelInit();
    vueInit();
    loadBaseDatas();
    pageLoad();
    vsnInit();
}


function vueInit(){
    vueComponent();
    ME.vm=new Vue({
        el:'#allHandle',
        data:{
            isPhone:UBIT.isPhone(),
            selfHost:ME.host,
            imgHost:ME.imgHost,
            projectCode:'',
            custClose:false, //自定义控制按钮显示
            isHideBtn:false,
            hasSubMenu:['setBars','tools'],
            map:{
                data:[],
            },
            mapDialog:{
                title:'切换地图',
                autoplay:true,
                visible:false,
            },
            fullScreen:{
                visible:false,
            },
            anchorBar:{
                isShowAnchor:false,
                title:'显示基站',
            },
            switchData:{
                isShowCoordinate:false,
                distanceAlert:true,
                isShowAllTag:false,
                fenceTip:true,
                sound:true,
            },
            setBars:{
                visible:false,
            },
            tools: {
                visible:false,
            },
        
            rangeData:{
                isShow:false,
                value:20,
            },
            search:{
                title:'搜索标签/基站',
                input:'',
                visible:false,
                prevData: null,
                tag:{
                    markers:[],
                    dialogVisible:false
                },
                anchor:{
                    markers:[],
                    dialogVisible:false
                },
            },
            qrcode:{
                size:'small',
                title:'二维码',
                visible:false,
                mac:'',
                value_2d:'',
                value_3d:'',
            },
            history:{
                addCurrentTime:null,//后期二次开发, 添加变量 历史轨迹显示时间
                // isShow:false,
                isLoading:false,
                model: 'stop',
                span: 100, //时间范围
                datas: {}, //历史数据
                intervalID: null, //定时任务ID
                intervalTime: 200, //播放速度  1s
                slider: 0,
                min: 0,
                max: 6048e5, //3600*24*7*1000  精确到毫秒
                step: 1000,
                playStartTime:'',
                PlayEndTime:'',
                playCurrentTime:'',

                visible:false,
                datetimeRange: [new Date(), new Date()],
                tags: [],
                allTags: [],
                pickerOptions3:{
                    shortcuts:[
                        {
                            text:'最近2分钟',
                            onClick:function onClick(picker){
                                var start=new Date();
                                var end=new Date();
                                start.setTime(start.getTime() - 60*1000*2);
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text:'最近3分钟',
                            onClick:function onClick(picker){
                                var start=new Date();
                                var end=new Date();
                                start.setTime(start.getTime() - 60*1000*3);
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text:'最近5分钟',
                            onClick:function onClick(picker){
                                var start=new Date();
                                var end=new Date();
                                start.setTime(start.getTime() - 60*1000*5);
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text:'最近10分钟',
                            onClick:function onClick(picker){
                                var start=new Date();
                                var end=new Date();
                                start.setTime(start.getTime() - 60*1000*10);
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text:'最近半小时',
                            onClick:function onClick(picker){
                                var start=new Date();
                                var end=new Date();
                                start.setTime(start.getTime() - 60*1000*30);
                                picker.$emit('pick', [start, end]);
                            }
                        }
                    ]
                }

            }
        },
        created:function(){
            this.isPhone = document.body.clientWidth < 960;//当可见区域小于960时，视其为手机端
            this.checkParams();
        },
        methods:{
            getTag: function getTag(data) {
                return this.getNodeByCode('tag', data.code)
            },
            checkParams:function(){
                ME.searchParam = UBIT.parseSearch(!1);
                if(!ME.searchParam.map){
                    alert('请指定地图!')
                    return;
                }
                
                if(ME.searchParam.hasOwnProperty('isShowAnchor')){
                    var isShowAnchor=ME.searchParam.isShowAnchor;
                    if(!isShowAnchor||isShowAnchor=='false'||isShowAnchor=='0') {
                        this.anchorBar.isShowAnchor=false
                    }else{
                        this.anchorBar.isShowAnchor=true;
                    }
                }
                if(ME.searchParam.hasOwnProperty('isHideBtn')){
                    var isHideBtn=ME.searchParam.isHideBtn;
                    if(!isHideBtn||isHideBtn=='false'||isHideBtn=='0') {
                        this.isHideBtn=false
                    }else{
                        this.isHideBtn=true;
                        this.custClose=true;
                    }
                }
                var map = ME.searchParam.map;
                if(map.indexOf('_')>=0) {
                    ME.projectCode=this.projectCode = map.split('_')[0];
                    // 获取地图列表
                    this.loadMaps();
                    ME.currentMapId=this.currentMapId = map.split('_')[1];
                }else {
                    ME.currentMapId=this.currentMapId = map;
                }
            
                UBIT.checkSession();
                if(UBIT.user){
                    ME.api_token = UBIT.user.api_token;
                }else {
            
                    if(map.indexOf('_')<0){
                        alert('请先登录，并进入到项目!')
                        return;
                    }
            
                    if(!ME.searchParam.anony || ME.searchParam.anony!='super'){
                        alert('您的权限不够，无法匿名访问本地图!')
                        return;
                    }
            
                }
            },
            loadMaps:function(){
                if(!this.projectCode) return;
                var url=UBIT.host+'/map/list?projectCode='+this.projectCode;
                $.ajax({
                    type:'get',
                    url:url,
                    success:function(data){
                        ME.vm.map.data=data;
                    }
                })

            },
            showSubMenu:function(menu){
                if(!menu) return;
                for(var i=0;i<this.hasSubMenu.length;i++){
                    var item=this.hasSubMenu[i];
                    if(menu==item) {
                        this[menu].visible=!this[menu].visible;
                    }else if(this[item].visible){
                        this[item].visible=false;
                    }
                }
            },
            anchorIsShow:function(){
                this.anchorBar.isShowAnchor=!this.anchorBar.isShowAnchor;
                ubiMap.toggleAnchor(ME.vm.anchorBar.isShowAnchor);
            },
            changeMap:function (mapId) {
                if(!mapId||!this.projectCode) return;
                var path = UBIT.selfHost + '/map/map2d/svg/sim/';
                var map=this.projectCode+'_'+mapId;
                window.open(path + '?anony=super&map='+map);
            },
            // 全屏
            fullScreenHandle: function fullScreenHandle() {
                // 全屏
                if (!this.fullScreen.visible) {
                var html = document.documentElement;
                // html.webkitRequestFullScreen && html.webkitRequestFullScreen();
                // html.mozRequestFullScreen && html.mozRequestFullScreen();
                // html.requestFullscreen && html.requestFullscreen();
                    _screenfull.request();
                this.fullScreen.visible = true;
                }else{
                    // 取消全屏
                    // 判断各种浏览器，找到正确的方法
                    _screenfull.exit();
                    // var exitMethod = document.exitFullscreen || //W3C
                    // document.mozCancelFullScreen || //Chrome等
                    // document.webkitExitFullscreen || //FireFox
                    // document.webkitExitFullscreen; //IE11
                    // if (exitMethod) {
                    // exitMethod.call(document);
                    // } else if (typeof window.ActiveXObject !== "undefined") {
                    // //for Internet Explorer
                    // var wscript = new ActiveXObject("WScript.Shell");
                    // if (wscript !== null) {
                    // wscript.SendKeys("{F11}");
                    //     }
                    // }
                    this.fullScreen.visible = false;
                }
            },
          
            handleSearch:function(){
                var searchVal=this.search.input;
                if(!searchVal) return;
                var localData=this.searchData(searchVal);
                if(localData&&localData.length==1){
                    this.handleSelect(localData[0]);
                    return
                }
                if(localData&&localData.length>1){
                    ME.vm.$message({
                        message: '查询数据存在多条，请选择',
                        type: 'warning'
                    });
                    return;
                }
                if(!localData||localData.length<1){
                    // 后台进行查找
                    this.searchMarkers(searchVal,ME.vm.remoteSearchCb);
                }
            },
            handleSelect:function(item) {
                this.search.input = item.code;
                this.search.visible=false;
                ME.searchTag = item;
                this.positionCoord(item)
            },

            positionCoord:function(searchData){
                // debugger;
                if(searchData.markerType === 'tag' && location.href.indexOf('canvas') !== -1){
                    var marker = ubiMap.getMarker('tag_' + searchData.code);
                    MarkerTool.showSearch(marker);
                }else{
                    if (this.search.prevData === null) {
                        ubiMap.changeColor(searchData, false);
                    }else if(this.search.prevData.code !== searchData.code){
                        ubiMap.changeColor(searchData, this.search.prevData);
                    }else{
                        this.search.prevData = searchData;
                    }
                }
            },
            resetCamera:function(){},

            querySearch:function(queryString, callback){
                var searchName = this.search.input;
                var searchData = this.searchData(searchName);
                callback(searchData);
            },
            // 本地标签、基站搜索
            searchData:function(searchVal){
                    searchVal=searchVal.toLowerCase();
                    //本地搜索 
                    var keys=['anchor','tag'];
                    var okData=[];
                    for(var i=0;i<keys.length;i++){
                        var datas=ME[keys[i]];
                        var filterData=datas.filter(function(item){
                            if(item&&(item instanceof Object)&&item.mapId==ME.vm.currentMapId){
                                    for(var i in item){
                                        if(String(item[i]).toLowerCase().indexOf(searchVal)>-1){
                                            return true;
                                        }
                                    }
                                }
                            });
                            okData= okData.concat(filterData);     
                    }
                    return okData;
            },

            //搜索标签或者基站
            searchMarkers:function (name, cb){
            $.ajax({
                type: "GET",
                url: ME.host+"/map/searchMarkerByAnony",
                async:false,
                data: {name: name,mapId:ME.vm.currentMapId,projectCode:ME.projectCode},
                dataType: "json",
                success: function(datas){
                    if(cb){
                        cb(datas);
                    }
                },
                error: function(...args){
                    console.log(args);
                }
            });
            },
            searchMapLink:function (row) {
                return this.changeMap(row.mapId);
            },
            searchTagLink:function (row) {
                window.open(ME.selfHost + '/map/map2d/svg/follow/?tag=' + row.code);
            },
            remoteSearchCb:function(datas){
            if(!datas.isOk){
                ME.vm.$message({
                    message: datas.msg,
                    type: 'warning'
                });
                return ;
            }
            var markers = datas.markers;
            var markerType = datas.markerType;

            for(var i=0;i<markers.length;i++){
                markers[i].markerType = markerType;
            }

            if(markers.length == 1){
                var searchD= markers[0];
                if (searchD.mapId != ME.vm.currentMapId) {
                    var msg = "您所搜索的标签或基站不在本地图";
                    if(searchD.mapId) {
                        var map = ME.vm.map.data.find(function(item){ return searchD.mapId==item.id});
                        if (map && searchD.time) {
                            var lastPosTime = (new Date(parseInt(searchD.time))).Format("yyyy-MM-dd hh:mm:ss");
                            msg += "（标签最后一次出现在地图“" + map.cname + "”上，时间："+lastPosTime+"）";
                        }
                    }
                    ME.vm.$message({
                        message: msg,
                        type: 'warning'
                    });
                    return;
                }

                ME.vm.positionCoord(searchD)
                return;
            }

            for(var i=0;i<markers.length;i++){
                var marker = markers[i];
                marker.mapCname = '未知';
                if(marker.mapId>0){
                    var map = ME.vm.map.data.find(function(item){ return marker.mapId==item.id});;
                    if (map) {
                        marker.mapCname = map.cname;
                    }
                }

                if(marker.power){
                    marker.powerLevel = UBIT.getPower(marker.power) + '%';
                }
                if(marker.x || marker.x==0){
                    marker.coord = '('+(marker.x/100).toFixed(2)+','+(marker.y/100).toFixed(2)+')';
                }
            }

            ME.vm.search[markerType].markers = markers;
            ME.vm.search[markerType].dialogVisible = true;
            return;
            },
                //历史记录，热力图穿梭框搜索方法（支持alias,code,mac）
            searchTags:function(query,item){
            if(!query){
                return true;
            }else{
                return (item.label&&item.label.indexOf(query)>-1)||
                    (item.key&&item.key.indexOf(query) > -1);
                }
            },
            /**
            * 历史轨迹操作相关
            */
            //获取历史数据
            historyPlayGetDatas:function (mapId, tagMacs, start, end, $this,checkHistoryData){
                $.ajax({
                    type: "GET",
                    url: ME.host+"/history/listByAnony",
                    async:false,
                    data: {projCode:ME.projectCode,projId:ME.user.projectId,mapId: mapId, tagMacs: tagMacs, start: start, end: end},
                    dataType: "json",
                    success: function(datas){
                        //验证数据，保存数据,显示控制按钮
                        if(checkHistoryData){
                            checkHistoryData(datas);
                        }
                    }
                });
            },
            markerLogClear: function markerLogClear() {
                var markers = ubiMap.getAllMarker();
                for (var i in markers) {
                    var marker = markers[i];
                    //清除路径轨迹
                    marker.log = [];
                    ubiMap.drawLine(marker, []);
                    // 隐藏心跳图标
                    var markerHeart=ubiMap.findInMarker(marker,'heart');
                    if(markerHeart){
                        markerHeart.remove();
                    }
                    //隐藏标签
                    marker.hide();
                }
            },

            historyPlayGo: function (tag, paths) {
                //根据历史数据绘制路径
                // 绘制marker小图标
                var marker = ubiMap.getHisMarker('tag_' + tag.code);
                if (!marker) {
                    tag.markerType = "tag";
                    tag.markerId = "tag_" + tag.code;
                    marker = ubiMap.addHisMarker(tag, ME.curRealLength, ME.vm.scanActive, ME.vm.yCenter);
                }
                // 设置marker坐标位置
                 //坐标转化
                var newPos = ubiMap.convert(paths[0], ME.curRealLength);
                 //设置坐标
                // ubiMap.posInital(marker, newPos, ME.vm.scanActive, ME.vm.yCenter);
                ubiMap.posInital(marker, newPos,true);
                marker.show();
        
                marker.log = [];
                var positions = [];
                for (var i = 0; i < paths.length; i++) {
                    var path = paths[i];
                    var pos = ubiMap.convert(path, ME.curRealLength); //转化
                    // if (!ME.vm.scanActive) {
                    //     pos.y += ME.vm.yCenter;
                    // }
                    pos.createTime = Date.parse(new Date(path.time));
                    pos.code = path.tag;
                    marker.log.push({ x: pos.x, y: pos.y });
                    positions.push(pos);
                }
                var color = 'red';
                if (tag.cat && tag.cat.color) color = tag.cat.color;
                ubiMap.drawLine(marker, marker.log, color);
        
                return positions;
            },
            historyAnimate: function historyAnimate() {
                if (this.history.slider >= this.history.max) {
                    this.historyStopAnimate();
                    return;
                }
                this.history.slider += this.history.step;
                //时间播放 以秒为单位
                this.history.slider = Math.round(this.history.slider / 1000) * 1000;
                this.history.playCurrentTime = new Date(this.history.slider).Format("yyyy-MM-dd hh:mm:ss");
                var datas = this.history.datas[this.history.slider];
                if (!datas) return;
                datas.forEach(function (path) {
                    var marker = ubiMap.getHisMarker('tag_' + path.code);
                    if (!marker) return;
                    marker.animate({ transform: "t" + path.x + ',' + path.y }, this.history.intervalTime);
                });
            },
            historyClear: function historyClear() {
                var markers = ubiMap.getAllHisMarker();
                //停止动画
                this.historyStopAnimate();
                this.history.slider = this.history.min;
                for (var i in markers) {
                    var marker = markers[i];
                    //清除路径轨迹
                    ubiMap.drawLine(marker, []);
                    //隐藏标签
                    marker.hide();
                    ubiMap.delHisMarker(i);
                }
                this.history.datas = {};
            },

            //获取历史数据
            historyBegin:function historyBegin(){
                var params = this.history;
                //组装查询参数
                var timeSpan = this.historyTimeRange();
                if (!timeSpan) {
                    return;
                }
        
                //请选择标签
                if (!this.history.tags || this.history.tags.length < 1) {
                    ME.vm.$message({
                        message: '请选择标签',
                        type: 'warning'
                    });
                    return;
                }
                this.history.isLoading = true;
                this.historyPlayGetDatas(this.currentMapId, this.history.tags, timeSpan[0], timeSpan[1], this, this.checkHistoryData);
            },


            checkHistoryData:function(datas){
                //判断有无数据
                if (!datas || _.isEmpty(datas)) {
                    ME.vm.$message({
                        message: '您查询的历史数据为空！',
                        type: 'error'
                    });
                    this.historyClear();
                    this.history.isShow = false;
                }else {
                    //将数据保存，后续操作取数据
                    var params = this.history;
                    params.intervalTime = 1000;
        
                    //停止websocket
                    ubiMap.lockTag = true;
                    //隐藏所有的allMarker
                    this.markerLogClear();
                    this.history.isShow = true;
                    //clear laste play
                    this.historyClear();
                    //存储历史记录数据，按照时间分组
                    var newDatas = {};
                    for (var code in datas.datas) {
                        if(!code) continue;
        
                        var paths = datas.datas[code].paths;
                        if (paths && paths.length > 0) {
                            var tag = this.getNodeByCode('tag', code);
                            if(tag){
                                var positions = this.historyPlayGo(tag, paths);
                                //sort data
                                for (var i = 0; i < positions.length; i++) {
                                    var pos = positions[i];
                                    var t = pos.createTime;
                                    if (!newDatas[t]) {
                                        newDatas[t] = [];
                                    }
                                    newDatas[t].push(pos);
                                }
                            }
                        }
                    }
                    this.history.datas = newDatas;

                    this.history.slider = this.history.min = new Date(datas.minTime).getTime();
                    this.history.max = new Date(datas.maxTime).getTime();
                    this.history.playStartTime = new Date(datas.minTime).Format("yyyy-MM-dd hh:mm:ss");
                    this.history.playEndTime = new Date(datas.maxTime).Format("yyyy-MM-dd hh:mm:ss");
                    this.tools.visible=false;
                    this.history.visible=false;
                    this.isHideBtn=true;
                    this.historyPlay('play')
                }
                this.history.isLoading = false;
            },



    historyTimeRange: function historyTimeRange() {
        var range = this.history.datetimeRange;
        if (!range[0] || !range[1]) {
            ME.vm.$message({
                message: '请选择时间范围！',
                type: 'warning'
            });
            return false;
        }

        //更新 slider max and min
        this.history.slider = this.history.min = range[0].getTime();
        this.history.max = range[1].getTime();
        var span = this.history.max - this.history.min;
        //时间范围 1秒 -  7天;
        if (span < 1) {
            ME.vm.$message({
                message: '起始时间需要小于结束时间，请选择合理的时间范围！',
                type: 'warning'
            });
            return false;
        } else {
            if (span > 7 * 24 * 3600 * 1000) {
                ME.vm.$message({
                    message: '时间范围不能大于7天，请选择合理的时间范围！',
                    type: 'warning'
                });
                return false;
            }
        }
        var start = range[0].Format('yyyy-MM-dd hh:mm:ss');
        var end = range[1].Format('yyyy-MM-dd hh:mm:ss');
        return [start, end];
    },


    historySlider: function historySlider(num) {
    },
    historyPlay: function historyPlay(type) {
        var params = this.history;
        if (type == 'play') {
            params.intervalTime = Math.round(params.intervalTime);// / 4

            if (this.history.model == 'pause') {
                this.historyReStartAnimate();
            }else {
                this.historyStartAnimate();
            }
        } else if (type == 'pause') {

            this.historyStopAnimate();
        } else if (type == 'stop') {
            //开启websocket
            ubiMap.lockTag = false;
            //显示所有的allMarker
            ubiMap.toggleCamera(true);
            ubiMap.toggleTag(true);
            ubiMap.toggleAnchor(true);
            //清除历史轨迹，隐藏历史标签
            this.historyClear();
            // this.history.isFirst=true;
            this.history.isShow = false;
            // 显示底部按钮
            this.isHideBtn=this.custClose?true:false;
        } else if (type == 'backward') {
            if (params.intervalTime < params.max) {
                params.intervalTime = Math.round(params.intervalTime * 2);
            }
            this.historyReStartAnimate();
        } else if (type == 'forward') {
            if (params.intervalTime > 0) {
                params.intervalTime = Math.round(params.intervalTime / 2);
            }
            this.historyReStartAnimate();
        }

        this.history.model = type;
    },
    historySliderMsg: function historySliderMsg(val) {
        var date = new Date(val);
        return date.Format('yyyy-MM-dd hh:mm:ss');
    },


    historyStartAnimate: function historyStartAnimate() {
        ME.vm.intervalID = setInterval(function () {
            ME.vm.historyAnimate();
        }, ME.vm.history.intervalTime);
    },
    historyReStartAnimate: function historyReStartAnimate() {
        this.historyStopAnimate();
        this.historyStartAnimate();
    },
    historyStopAnimate: function historyStopAnimate() {
        //停止动画
        if (this.intervalID) {
            clearInterval(this.intervalID);
            this.intervalID = 0;
        }
    },

      // isShowAnchor:function(){
            //     this.anchorBar.isShowAnchor=!this.anchorBar.isShowAnchor;
            //     console.log(ME.vm.anchorBar.isShowAnchor,'执行了。。。。。。。。。。。。。。。');
            //     ME.anchor.map(function(item){
            //         ME.vm.anchorBar.isShowAnchor?item.isShow=true:item.isShow=false;
            //         ubiMap.toggleNode(item.markerId, item.isShow);
            //     });
            // },
            
        },
        watch:{
            'rangeData.isShow':function(){
                ubiMap.len=this.rangeData.isShow?this.rangeData.value:0
            }
        }
    })
}

function vueComponent(){
    Vue.component('search-tag-option',{
        functional:true,
        render:function(h,ctx){
            var item = ctx.props.item;
            return h('li', ctx.data, [
                h('div', { attrs: { class: 'cname' } }, [item.alias]),
                h('span', { attrs: { class: 'code' } }, [item.code])
            ]);
        },
        props:{
            item:{type:Object,required:true}
        }
    });
}


function intervalTagDisappear (){
    for(var i in ME.tags){
        var item = ME.tags[i];
        if(!item||!item.tagDisappear||item.tagDisappear<1) continue;
        var diff = Date.now() - item.time;

        var marker = allMarker['tag_'+item.code];
        if(!marker) continue;

        if(diff>=item.tagDisappear){
            //hide marker
            if (marker.logPath) {
                marker.logPath.remove();
            }

            //改变勾选状态，隐藏maker
            item.isShow=false;
            marker.node.isShow = false;
            ubiMap.toggleNode(item.markerId,item.isShow);

        }else{
            //show marker
            item.isShow=true;
            marker.node.isShow = true;
            ubiMap.toggleNode(item.markerId,item.isShow);
        }
    }
}

function loadBaseDatas () {
    $.ajax({
        url: UBIT.host + "/mapBaseDatas/list?projectCode="+ME.vm.projectCode,
        type:'get',
        async:false,
        dataType:'json',
        success: function(json){
            var tagCat = json.tagCat;
            var tagType = json.tagType;
            var fenceType = json.fenceType;
            initData(tagCat, 'tagCat', ME);
            initData(tagType, 'tagType', ME);
            initData(fenceType, 'fenceType', ME);
        },

    });
}

function getTagDisappear (tag){
    if(!tag||!tag.typeId || !ME.tagType) return ME.tagDisappear;
    var item=ME.tagType.find(function(type){
        return tag.typeId==type.id;
    });
    var disappearTime=(item&&parseFloat(item.tagDisappear))?parseFloat(item.tagDisappear):ME.tagDisappear;
    return disappearTime;
}

function pageLoad() {

    $.ajax({
        url: UBIT.host + "/map/loadTagsByMap?projectCode="+ME.vm.projectCode+"&mapId="+ME.vm.currentMapId,
        type:'get',
        dataType:'json',
        success: function(json){
            if (json && json.hasOwnProperty('msg')) {
                UBIT.closeSelfPage(json.msg);
                return;
            }
            if (!(json || json.map)) {
                UBIT.closeSelfPage('地图不存在，请确保地图对应项目是否正确！');
                return;
            }

            initData(json.map, 'currentMap', ME);

            ME.user = json.user;
            ME.api_token = json.user.api_token;
            //计算标签的初始位置
            var tags = json.tags.map(function (data, index) {
                data.markerType = 'tag';
                data.markerId = data.markerType + '_' + data.code;
                data.powerLevel = UBIT.getPower(data.power);
                data.tagDisappear=getTagDisappear(data);
                data.isShow = false;

                if (!data.time) return data;
                var diff = Date.now()-data.time;
                // 根据是否勾选全选,是，绘画出本地图标签
                if(ME.vm.switchData.isShowAllTag){
                    data.isShow = true;
                }else if(!data.tagDisappear || data.tagDisappear==0 || (diff < data.tagDisappear&&data.mapId==ME.vm.currentMapId)){
                    data.isShow = true;
                }

                return data;
            });

            //计算基站的初始位置
            var anchors = json.anchors.map(function (data, index) {
                data.markerType = 'anchor';
                data.markerId = data.markerType + '_' + data.code;
                // if(ME.vm.anchorBar.isShowAnchor){ 
                    data.isShow = true;
                // }
                return data;
            });

            //数据转换
            var fences = json.fences.map(function (data, index) {
                data.savedInDb = true;

                data.isShow = true;
                if([UBIT.fenceType.pollingId,UBIT.fenceType.attendanceId,UBIT.fenceType.specialZoneId].includes(parseInt(data.ftypeId))){
                    data.isShow = false;
                }

                data.innerTags = {};
                data.polygonPoints = generatePolygonByPoints(data.points, convertFunc);
                return data;
            });

            initData(tags, 'tag', ME);
            initData(anchors, 'anchor', ME);
            initData(json.walls, 'wall', ME);
            initData(fences, 'fence', ME);
            callHistoryPlayGetDatas();

        },

    });
}

function callHistoryPlayGetDatas() {
    var searchParams = UBIT.parseSearch(!1);
    // //日期时间正则验证 如 2011-02-05 11:00:34
    // var dateTimeRegex=/^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
    //判断参数是否正确
    var tagmac = searchParams.tagmac;
    var starttime = searchParams.starttime;
    var endtime = searchParams.endtime;
    if(!tagmac ){
        return;
    }
    if(!starttime || !endtime){
        ME.vm.$message({
            message: "URL缺少时间参数",
            type: 'warning'
        });
        return;
    }
    if(isNaN(starttime) || isNaN(endtime)){
        ME.vm.$message({
            message: "URL时间参数错误",
            type: 'warning'
        });
        return;
    }
    var tagmacs = [tagmac]
    var that = ME.vm;
    var span = endtime * 1 - starttime * 1;
    if (span < 1) {
        ME.vm.$message({
            message: '起始时间需要小于结束时间，请选择合理的时间范围！',
            type: 'warning'
        });
        return false;
    }
    if (span > 7 * 24 * 3600 * 1000) {
        ME.vm.$message({
            message: "URL参数时间范围不能大于7天，请选择合理的时间范围！",
            type: 'warning'
        });
        // ME.vm.$alert("URL参数时间范围不能大于7天，请选择合理的时间范围！", lang['prompt'], {
        //     confirmButtonText: lang['confirm']
        // });
        return;
    }
    starttime = new Date(starttime * 1).Format('yyyy-MM-dd hh:mm:ss');
    endtime = new Date(endtime * 1).Format('yyyy-MM-dd hh:mm:ss');
    that.historyPlayGetDatas(that.currentMapId, tagmacs, starttime, endtime, that, that.checkHistoryData);
}

function generatePolygonByPoints (points) {
    var polygonPoints = [];
    if (points) {
        var ps = points.split(',');
        for (var j = 0; j < ps.length; j++) {
            var p = ps[j];
            var pos = p.split(' ');
            //坐标转化
            var position = {x: parseFloat(pos[0]), y: parseFloat(pos[1])};
            var newPos = convertFunc(position);

            polygonPoints.push(newPos)
        }
    }
    return polygonPoints;
}

var convertFunc = function (position) {
    var newPos = ubiMap.convert(position);
    return newPos;
};


function initData(datas, key, vm) {
    // console.dir(key);
    vm[key] = datas;

    if (key == 'wall') {
        // drawWalls(vm, key);

    } else if (key == 'fence') {
        drawFences(vm, key);

    } else if (key == 'anchor') {
        drawNode(vm, key);
        ubiMap.toggleAnchor(ME.vm.anchorBar.isShowAnchor);

    } else if (key == 'tag') {

        drawNode(vm, key);
        ubiMap.setIcon(vm.scanActive);

    }else if(key=='camera'){
        // drawCameras(vm);
        // drawNode(vm, key);

    } else if (key == 'currentMap') {
        currentMapInit(datas);
    }

}


function drawFences(ME,key) {
    FenceTool.showFences({ force: !1, mapId: ME.vm.currentMapId }, ME[key], key);
    // FenceTool.showFences({ force: !1, mapId: vm.mapId }, data);
    //等界面上的标签和围栏加载完毕后，统计围栏/维度区中的标签数量
    // setTimeout(function(){
    //     ME.vm.freshAllFenceInnerTags('fence');
    //     ME.vm.freshAllFenceInnerTags('dimension');
    // }, 3000);
}


/**
 * 画地图
 * @param vm
 */
function currentMapInit(data) {
    //无数据，提前结束
    if (!data) {
        return;
    }
    ME.vm.currentMap = data;

    var realLength = ME.curRealLength = data.realLength;
    ME.mapWidth = data.pixelLength;
    ME.mapHeight = data.pixelWidth;

    //绘制地图
    ubiMap.setBg(data, false, realLength);

}



//绘制基站和标签和摄像头
function drawNode(vm, key) {

    for (var i = 0; i < vm[key].length; i++) {
        var data = vm[key][i];
        if (key == 'tag') {
            if(!ME.tags) ME.tags = {};
            ME.tags[data.code] = UBIT.deepCopy(data);
            //设置触发围栏所有标签，搜索时内容改变
            ME.vm.history.allTags.push({ key: data.code, label: data.alias ? data.alias : data.code});
        }

        if(key=='anchor'){
            data.x=parseFloat(data.x)+parseFloat(ME.currentMap.origin_x);
            data.y=parseFloat(data.y)+parseFloat(ME.currentMap.origin_y);
            data.z=parseFloat(data.z)+parseFloat(ME.currentMap.origin_z);
        }

        if(data.isShow){
            ubiMap.addMarker(data, ME.curRealLength, true);
        }
    }
}



function websocketOnData(data) {

    var code = data.code ? data.code : data.mac;

    //坐标转化
    ubiMap.convert(data, ME.curRealLength);


    var tag = ME.tags[code];
    if(!tag){
        ME.tags[code] = tag = {};

        tag.code = data.mac;
        tag.markerType = 'tag';
        tag.markerId = 'tag_' + code;
        tag.alias = 'ay' + data.mac;

        ME.vm.history.allTags.push({
            key: data.code,
            label: 'ay' + data.code,
        });

    }
    tag.isShow = true;
    tag.x = data.x;
    tag.y = data.y;
    tag.z = data.z;

    tag.screenX = data.screenX;
    tag.screenY = data.screenY;
    tag.status = 'online';
    tag.time = data.time;

    var marker = ubiMap.getMarker('tag_' + tag.code);
    if(!marker){
        marker = ubiMap.addMarker(tag, ME.curRealLength, true);
    }

    ubiMap.move('tag_' + tag.code, data.screenX, data.screenY, true, marker)

    //记录标签最后一次的位置
    if (tag) tag.lastPostion = { x: data.x, y: data.y, screenX: data.screenX, screenY: data.screenY };
}


ME.vm.isShowTagPower = function () {
    return true;
}

ME.vm.findMakerByMac = function(code){
    var item=ME.tags[code];
    if(item && item.isShow){
        return ubiMap.getMarker(item.markerId);
    }
    return false;
};

//根据id 获取节点数据
ME.vm.getNodeById = function(key, id){
    var datas = ME[key];
    for(var i=0;i<datas.length;i++){
        if(id && datas[i].id+'' === id+''){
            return datas[i];
        }
    }
    return null;
}


//根据code 获取节点数据
ME.vm.getNodeByCode = function(key, code){
    var datas = ME[key];
    for(var i=0;i<datas.length;i++){
        if(datas[i].code+'' === code+''){
            return datas[i];
        }
    }
    return null;
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


        // 标签，基站搜索，移动
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
                this.changeImgSrc(newMarker, 'red', true);

                //todo  移动地图，将需要显示的标签移动到屏幕中心
                var point = { x: newMarker.node.screenX, y: newMarker.node.screenY };
                this.movePaperInCenterPointer(point);
            };
        };
        this.changeImgSrc = function (marker, ncolor, isShow) {
            var node = marker.node;
            if(node.markerType == 'tag' && isShow){
                node.isShow = isShow;
                this.toggleNode('tag_'+node.code, isShow)
            }
        };
        this.getHisMarker = function (code) {
            return hisMarker[code];
        };
        this.findInMarker=function(marker,type){
            if(!type) return;
            for (var i = 0; i < marker.items.length; i++) {
                var item = marker.items[i];
                if (!item.flag || item.flag!= type) continue;
                return item;
            }
            return false;
        },
        this.toggleNode = function (id, status) {
            if (allMarker[id]) {
                if(status){
                    if(allMarker[id].node && !allMarker[id].node.isShow){
                        return;
                    }
                    if(id.indexOf('tag')>-1 && ubiMap.lockTag) {
                        allMarker[id].hide();
                    }else{
                        allMarker[id].show();
                    }
                    //电量显示控制
                    if(id.indexOf('tag')>-1){
                        if(ubiMap.lockTag){
                            MarkerTool.hidePower(allMarker[id],false);
                        }else {
                            MarkerTool.hidePower(allMarker[id], ME.vm.isShowTagPower(allMarker[id].node.powerLevel, allMarker[id].node.isShow))
                        }
                    }
                }else {
                    allMarker[id].hide();
                    if(id.indexOf('tag')>-1) {
                        this.drawLine(allMarker[id], []);
                    }
                }
            }
        };

        this.toggleCamera = function(flag){
            toggleMarker('camera',flag);
        }
        this.toggleTag = function (flag) {
            toggleMarker('tag', flag);
        };
        this.toggleAnchor = function (flag) {
            toggleMarker('anchor', flag);
        };

        //删除标签
        this.delHisMarker = function (markerId) {
            var delMarker = hisMarker[markerId];
            if (!delMarker) {
                return;
            }
            if (delMarker.logPath) {
                delMarker.logPath.remove();
            }
            // delMarker.text.remove();
            delMarker.remove();
            delete hisMarker[markerId];
            delMarker = null;
        };
        //添加标签
        this.addHisMarker = function (param, realLength, scan, yCenter) {
            if (this.interimHisMarker || !param.markerType) {
                return;
            }
            var self = this;

            //生成标签
            var marker = MarkerTool.drawMarker(hisMarker, param, paper, realLength, scan, yCenter);

            if (param.markerId) {
                //已经有id第一次刷新/编辑时
                hisMarker[param.markerId] = marker;
            } else {
                // debugger;
                //无id第一次添加
                marker.id = -1;
                self.interimHisMarker = {};
                self.interimHisMarker[0] = marker;
            }
            return marker;
        };
        this.getAllHisMarker = function () {
            return hisMarker;
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
            //场景的实际长度
            if(!realLength) realLength = ME.curRealLength;

            param.x = param.x ? param.x : 0;
            param.y = param.y ? param.y : 0;

            var relPosX = parseFloat(param.x),
                relPosY = parseFloat(param.y);

            //图片的像素长度
            var imageLength = this.screenLength;

            param.screenX = parseFloat(relPosX * imageLength / realLength);
            param.screenY = parseFloat(relPosY * imageLength / realLength);

            return { x: param.screenX, y: param.screenY };
        };


            //设置坐标
            this.posInital = function (marker, newPos, scan, yCenter) {
                var x = newPos.x,
                    y = newPos.y;

                if (!scan) {
                    y = y + yCenter;
                }

                marker.translate(x, y);

                // debugger;
                marker.x = x;
                marker.y = y;

                //helper
                // var c = paper.circle(x, y, 2).attr({fill:'red'});
            };

        //添加标签
        this.addMarker = function (param, realLength, scan, yCenter) {
            if (!param.markerType) {
                return false;
            }
            // 根据url中是否传groups，确定显示哪些分组的标签。
            if(ME.searchParam.groups && param.markerType=="tag"){
                if(!param.cat || !param.cat.id){
                    return false;
                }
                var groups = ME.searchParam.groups.split(',');
                var flag =false;
                var tagCatId = param.cat.id+"";
                for(var i=0;i<groups.length;i++){
                    if(tagCatId == groups[i]){
                        flag =true;
                        break;
                    }
                }
                if(!flag){
                    return false;
                }
            }
            // 根据url中是否传typeids，确定显示哪些类型的标签。
            if(ME.searchParam.types && param.markerType=="tag"){
                if(!param.typeId){
                    return false;
                }
                var typeids = ME.searchParam.types.split(',');
                var flag2 =false;
                var typeId = param.typeId+"";
                for(var i=0;i<typeids.length;i++){
                    if(typeId == typeids[i]){
                        flag2 =true;
                        break;
                    }
                }
                if(!flag2){
                    return false;
                }
            }
            // 根据url中是否传tagmacs，确定显示哪些标签。
            if(ME.searchParam.tags && param.markerType=="tag"){
                if(!param.mac){
                    return false;
                }
                var tagmacs = ME.searchParam.tags.split(',');
                var flag3 =false;
                var tagmac = param.mac+"";
                for(var i=0;i<tagmacs.length;i++){
                    var lowtagmac = tagmacs[i].toLowerCase();
                    if(tagmac == lowtagmac){
                        flag3 =true;
                        break;
                    }
                }
                if(!flag3){
                    return false;
                }
            }
            //如果不属于当前地图，则return
            // if (!param.mapId || param.mapId != ME.currentMap.id) return false;

            var self = this;

            //生成标签
            var marker = MarkerTool.drawMarker(allMarker, param, paper, realLength, scan, yCenter);
            //坐标转化
            var newPos = this.convert(param, realLength);
            //设置坐标
            this.posInital(marker, newPos, scan, yCenter);

            if (param.markerId) {
                //已经有id第一次刷新/编辑时
                if(ubiMap.lockTag){
                    marker.hide();
                }
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
                // if(!marker.node.isShow) return;
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
        this.setBg = function (data, scan, realLength) {
            var imgUrl = UBIT.getImgSrc( 'maps', data.filePath);
            var img = new Image();
            var vm = this;
            img.src = imgUrl;
            img.onload = function () {
                var length = ME.mapWidth = this.width;
                var height = ME.mapHeight = this.height;

                var screenHeight = vm.screenLength / length * height;

                var yCenter = ubiMap.scanCenter(screenHeight);
                vm.yCenter = yCenter;
                yCenter = 0;

                bg = paper.image(imgUrl, 0, yCenter, vm.screenLength, screenHeight).toBack();
                ubiMap.setIcon(scan, yCenter);

                webSocketInit('2D', realLength,
                    {
                        coord:websocketOnData,

                        sos:SysAlert.sos,
                        fenceAlert:SysAlert.fenceAlert,
                        moreMonitorAlert:SysAlert.moreMonitorAlert,
                        forceRemove:SysAlert.forceRemove,
                        distanceAlert:SysAlert.distanceAlert,
                        heartAlert:SysAlert.heartAlert,

                        lifeStatus:SysAlert.updateHeartRate,
                        clearHalo:MarkerTool.clearHaloAndLine,

                    });
            };

            img.onerror = function(msg){
                console.log(msg);
                return;
            }

        };


        this.findInMarker=function(marker,type){
            if(!type) return;
            for (var i = 0; i < marker.items.length; i++) {
                var item = marker.items[i];
                if (!item.flag || item.flag!= type) continue;
                return item;
            }
            return false;
        };


        this.drawStrLine=function(type,points,keyName,strokeColor){
            if(!type) return;
            if(paper[keyName]){
                paper[keyName].remove();
            }

            if(points&&points.length>0){
                paper[keyName]=paper.set();
                var stokeC=strokeColor?strokeColor:'#db1b21';
                for(var i=0;i<points.length;i++){
                    var item=points[i];
                    //组内某成员无marker
                    if(item.length<2){continue}
                    var strLine=paper.path('M'+item[0].x+','+item[0].y+'L'+item[1].x+','+item[1].y);

                    //绘制距离值
                    if(item[2]&&item[2].distance){
                        var font= item[2].distance+'米';
                        var pos={
                            x:(parseFloat((item[0].x+item[1].x))/2)+10,
                            y:parseFloat((item[0].y+item[1].y))/2,
                        };
                        var attr={
                            'font-size':30,
                            'stroke':stokeC
                        }
                        var disFont=ubiMap.drawDisFont(font,pos,attr);
                        if(disFont){
                            paper[keyName].push(disFont);
                        }
                    }
                    // strLine.attr({ 'stroke-dasharray': "-" });
                    strLine.attr({ 'stroke-dasharray': ".",stroke:stokeC,'stroke-width':3 });
                    paper[keyName].push(strLine);
                }
                //    三角形第三条边
                if(type=='moreMonitor'&&points.length==2){
                    //   成员只有三个
                    var threeLine=paper.path('M'+points[0][1].x+','+points[0][1].y+'L'+points[1][1].x+','+points[1][1].y);
                    // strLine.attr({ 'stroke-dasharray': "-" });
                    threeLine.attr({ 'stroke-dasharray': ".",stroke:stokeC,'stroke-width':3 });
                    paper[keyName].push(threeLine);
                }
                paper[keyName][type+'drawDataTime']=new Date().getTime();
            }

        };

        this.drawDisFont=function(font,pos,attr){
            if(!font||!pos||!(pos instanceof Object)||!pos.hasOwnProperty('x')||!pos.hasOwnProperty('y')||
                !attr||!(attr instanceof Object)||JSON.stringify(attr)=='{}') return false;
            var disFont=paper.text(pos.x,pos.y,font).attr(attr);
            return disFont;

        };

    }

    ubiMap = new UbiMap(config);
    ubiMap.init();

    if(FenceTool)FenceTool.initialize(paper);
}


function isFenceTip(fence, isIn) {
    if (fence.trif == 'i') {
        //进入触发
        if (isIn) return true;
    } else if (fence.trif == 'o') {
        //出去触发
        if (!isIn) return true;
    } else {
        //进出触发
        return true;
    }
    return false;
}

//右侧显示标签
function toggleMarker(val, status) {
    for (var i in allMarker) {
        if (allMarker.hasOwnProperty(i)) {
            if (allMarker[i].flag === val) {
                ubiMap.toggleNode(i, status);
            }
        }
    }
}




