let app = new Vue({
    el: '#app',
    data: {
        tagCode: null,
        datetimeRange: null,


        tagList: [],
        mapList: [],
        maps: {},
        api_token: null,
        playbackMaps: [],
        currentPlaybackMapIndex: 0, //当前播放的地图下标
        //单个地图url地址
        singleMapUrl: '/map/map2d/svg/single-map.html?map=',    //地图地址前缀
        mapImgUrl: UBIT.host + '/file/getFile?fileName=maps_',      //地图图片链接前缀

        mouseoverPlaybackMapIndex: -1, //当前鼠标移入的地图小标

        playbackLastBtnColor: '#c4c4c4',
        playbackNextBtnColor: '#20a0ff',

        mainMapLoad: false,     //主地图加载中状态
        pickerOptions: {
            shortcuts: [{
                text: '最近1小时',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 60 * 60 * 1000);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近6个小时',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 6 * 60 * 60 * 1000);
                    picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近24小时',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 24 * 60 * 60 * 1000);
                    picker.$emit('pick', [start, end]);
                }
            }]
        },

    },
    created: function () {
        this.api_token = localStorage.getItem("api_token");//从缓存中获取api_token

        this.listMap();
        this.listTag();
        // this.listHistory();
    },
    methods: {

        /**
         * 监听轨迹回放地图的iframe加载完成事件
         */
        mainMapIframeOnload: function () {

            let iframe = document.getElementById('mainMap');

            let _this = this;
            iframe.onload = () => {
                // console.log('主地图加载完成');
                _this.mainMapLoad = false;
                //加载完成后延迟执行,否则有可能轨迹加载不上
                setTimeout(function () {
                    _this.mapIframePlayback(iframe, _this.playbackMaps[_this.currentPlaybackMapIndex]);
                }, 1000);

                //监听播放完成,判断当前的播放时间>=该段历史轨迹的最大时间,则代表播放完成
                let vm = iframe.contentWindow.ME.vm;
                let interval = setInterval(function () {
                    // console.log(vm.history.addCurrentTime + '\t' + vm.history.max)
                    if (new Date(vm.history.addCurrentTime).getTime() >= new Date(_this.playbackMaps[_this.currentPlaybackMapIndex].endTime).getTime()) {
                        clearInterval(interval);
                        // console.log('加载完成');
                        _this.currentPlaybackMapIndex++;
                    }
                }, 1000);

            }
        },

        /**
         * 监听轨迹回放地图的iframe加载完成事件
         */
        playbackMapsIframeOnload: function () {
            // console.log('mini地图加载完成:' + playbackMapIndex);

            for (let i = 0; i < this.playbackMaps.length; i++) {
                let playbackMap = this.playbackMaps[i];

                let iframeId = 'playbackMapIframe_' + i;
                let iframe = document.getElementById(iframeId);

                iframe.onload = () => {
                    // console.log('加载完成:' + iframeId); // 这里偶尔不会触发
                    let _this = this;
                    //加载完成后延迟执行,否则有可能轨迹加载不上
                    setTimeout(function () {
                        _this.mapIframePlayback(iframe, playbackMap);
                    }, 1000);
                }
            }

        },

        playbackThis: function(index){
            this.currentPlaybackMapIndex = index;
        },

        playbackLast: function(){
            if (this.currentPlaybackMapIndex > 0) {
                this.currentPlaybackMapIndex --;
            }
        },

        playbackNext: function(){
            if (this.currentPlaybackMapIndex < this.playbackMaps.length - 1) {
                this.currentPlaybackMapIndex ++;
            }
        },


        /**
         * 轨迹回放地图加载轨迹
         * @param iframe
         * @param playbackMap
         */
        mapIframePlayback: function (iframe, playbackMap) {
            let vm = iframe.contentWindow.ME.vm;
            vm.history.datetimeRange = [new Date(playbackMap.startTime), new Date(playbackMap.endTime)];
            vm.history.tags = [this.tagCode];

            vm.historyBegin();
        },

        /**
         * 获取地图列表
         */
        listMap: function () {
            let _this = this;
            $.ajax({
                url: UBIT.host + '/map/list',
                type: "GET",
                data: {
                    projectCode: 'yingjiyiyuan',
                    api_token: this.api_token
                },
                dataType: "JSON",
                success: function (response) {

                    _this.mapList = response;

                    if (response && response.length > 0) {
                        let maps = {};
                        for (let i = 0; i < response.length; i++) {
                            maps[response[i].id] = response[i]
                        }

                        _this.maps = maps;
                    }

                },
                error: function (errorMessage) {
                    console.log('系统错误!')
                },
            });
        },

        /**
         * 获取标签列表
         */
        listTag: function () {
            let _this = this;
            $.ajax({
                url: UBIT.host + '/project/tag/list',
                type: "GET",
                data: {
                    // projectCode: 'yingjiyiyuan',
                    api_token: this.api_token
                },
                dataType: "JSON",
                success: function (response) {

                    _this.tagList = response;

                },
                error: function (errorMessage) {
                    console.log('系统错误!')
                },
            });
        },

        /**
         * 获取标签历史轨迹数据
         */
        listHistory() {

            if (!this.tagCode) {
                this.$message.error('请选择标签');
                return;
            }

            if (!this.datetimeRange || this.datetimeRange.length < 2 || !this.datetimeRange[0] || !this.datetimeRange[1]) {
                this.$message.error('请选择时间段');
                return;
            }

            let startTime = this.datetimeRange[0].getTime();
            let endTime = this.datetimeRange[1].getTime();

            if (endTime - startTime > (24 * 60 * 60 * 1000)) {
                this.$message.error('时间段不能大于24小时');
                return;
            }

            this.mainMapLoad = true;
            let _this = this;
            $.ajax({
                url: UBIT.host + '/super/history/list',
                type: 'GET',
                data: {
                    api_token: _this.api_token,
                    timeStart: this.datetimeRange[0].format('yyyy-MM-dd hh:mm:ss'),
                    timeEnd: this.datetimeRange[1].format('yyyy-MM-dd hh:mm:ss'),
                    tagCode: _this.tagCode,
                    // mapId: this.mapId,
                    limit: 10000000
                },
                dataType: 'JSON',
                success: function (data) {
                    // console.log(data);

                    if (data.total == 0) {
                        _this.playbackMaps = [];
                        _this.$message.error('未获取到轨迹信息');
                        return;
                    }

                    _this.handlePlaybackData(data.rows);

                },
                error: function () {
                    _this.mainMapLoad = false;
                    // console.log('获取标签列表失败');
                    _this.$message.error('获取到轨迹信息失败');
                }

            });
        },

        /**
         * 处理返回的定位数据,按照地图将数据分离出来
         * @param data
         */
        handlePlaybackData(data) {

            //将获取的定位数据封装到不同的地图内
            // let mapsPosition = {};

            let mapId;
            let playbackMaps = [];
            for (let i = 0; i < data.length; i++) {

                //判断如果跟上次为同一张地图,则将该点位放到该地图的数组中
                if (data[i].mapId == mapId) {
                    // playbackMaps[playbackMaps.length - 1].positions.push(data);
                    continue;
                }

                //上一张地图的结束时间赋值
                if (playbackMaps.length != 0) {
                    playbackMaps[playbackMaps.length - 1].endTime = new Date(data[i - 1].timestamp).format('yyyy-MM-dd hh:mm:ss');
                }

                //跟上次的地图如果不为同一张地图,则将新地图放入到数组中
                mapId = data[i].mapId;
                let map = {
                    mapId: data[i].mapId,
                    startTime: new Date(data[i].timestamp).format('yyyy-MM-dd hh:mm:ss'),
                    positions: []
                }
                playbackMaps.push(map);
            }

            //最后一张地图的结束时间赋值
            playbackMaps[playbackMaps.length - 1].endTime = new Date(data[data.length - 1].timestamp).format('yyyy-MM-dd hh:mm:ss');

            this.currentPlaybackMapIndex = 0;
            this.playbackMaps = playbackMaps;

            //监听页面v-for渲染完成,渲染完成后监听mini地图的加载完成事件
            this.$nextTick(function () {
                // this.playbackMapsIframeOnload();
                this.mainMapIframeOnload();
            });

        }
    },

    watch: {
        currentPlaybackMapIndex: function (value, oldValue) {

            // console.log(value);
            this.mainMapLoad = true;
            if (this.currentPlaybackMapIndex == 0) {
                this.playbackLastBtnColor = '#c4c4c4';
            } else {
                this.playbackLastBtnColor = '#20a0ff';
            }

            if (this.currentPlaybackMapIndex == this.playbackMaps.length - 1) {
                this.playbackNextBtnColor = '#c4c4c4';
            } else {
                this.playbackNextBtnColor = '#20a0ff';
            }

        }
    }
});


Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
