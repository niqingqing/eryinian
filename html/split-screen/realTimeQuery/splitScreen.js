var app;

app = new Vue({
    el: "#app",
    data: {
        mapList: [],//地图列表

        firstMapId: 0,//第一张地图ID
        firstMapName: null,//第一张地图名字
        secondMapId: 0,//第二张地图ID
        secondMapName: null,//第二张地图名字
        thirdMapId: 0,//第三张地图ID
        thirdMapName: null,//第三张地图名字
        fourthMapId: 0,//第四张地图ID
        fourthMapName: null,//第四张地图名字

        currentFirstIframe: null,

        iframeSrc: "/map/map2d/svg/single-map1.html?map=",

        firstMapLoading:true,//第一个iframe等待加载
        secondMapLoading:true,//第二个iframe等待加载
        thirdMapLoading:true,//第三个iframe等待加载
        fourthMapLoading:true,//第四个iframe等待加载

    },


    created: function () {
        let api_token = localStorage.getItem("api_token");//从缓存中获取api_token
        let userData = JSON.parse(localStorage.getItem("userData"));//从缓存中获取当前登录用户

        let beforeUser = localStorage.getItem("beforeUser");//获取之前登录用户
        if (beforeUser == null || beforeUser == "" || beforeUser == undefined) {
            localStorage.setItem("beforeUser", userData.code);//存入登录用户为之前用户
        }
        //判断当前登录用户和缓存登录用户是否一样
        if (userData.code == localStorage.getItem("beforeUser")) {

        } else {
            //登录用户不同时 1.将iframe地图Id缓存删除 2.将前用户替换成当前用户
            localStorage.removeItem("firstMapId");
            localStorage.removeItem("secondMapId");
            localStorage.removeItem("thirdMapId");
            localStorage.removeItem("fourthMapId");
            localStorage.setItem("beforeUser", userData.code);
        }
        //判断刚进入分屏页面是否有缓存,如果没有设置默认缓存
        let firstMapId = localStorage.getItem("firstMapId");
        if (firstMapId == null || firstMapId == "" | firstMapId == undefined) {
            localStorage.setItem("firstMapId", 2);
        }
        let secondMapId = localStorage.getItem("secondMapId");
        if (secondMapId == null || secondMapId == "" | secondMapId == undefined) {
            localStorage.setItem("secondMapId", 3);
        }
        let thirdMapId = localStorage.getItem("thirdMapId");
        if (thirdMapId == null || thirdMapId == "" | thirdMapId == undefined) {
            localStorage.setItem("thirdMapId", 4);
        }
        let fourthMapId = localStorage.getItem("fourthMapId");
        if (fourthMapId == null || fourthMapId == "" | fourthMapId == undefined) {
            localStorage.setItem("fourthMapId", 5);
        }

        //获取地图列表
        this.getMapList(api_token);

    },
    mounted: function () {

    },
    methods: {

        //获取地图列表
        getMapList: function (api_token) {
            let _this = this;
            $.ajax({
                url: UBIT.host + "/super/map/list",
                type: "GET",
                data: {
                    api_token: api_token,
                },
                dataType: "json",
                success: function (response) {
                    _this.mapList = response;
                    //初始化第一个iframe中src的值
                    _this.firstIframeSrc(null);
                    //初始化第二个iframe中src的值
                    _this.secondIframeSrc(null);
                    //初始化第三个iframe中src的值
                    _this.thirdIframeSrc(null);
                    //初始化第四个iframe中src的值
                    _this.fourthIframeSrc(null);
                },
                error: function (errorMessage) {
                    console.log('系统错误!')
                },
            });
        },

        //点击第一个iframe选择地图
        changeFirstIframeMap: function changeFirstIframeMapName(mapId) {
            this.firstMapLoading = true;
            localStorage.setItem("firstMapId", mapId);
            this.firstIframeSrc(mapId);
        },
        //点击第二个iframe选择地图
        changeSecondIframeMap: function changeSecondIframeMap(mapId) {
            this.secondMapLoading = true;
            localStorage.setItem("secondMapId", mapId);
            this.secondIframeSrc(mapId);
        },
        //点击第三个iframe选择地图
        changeThirdIframeMap: function changeThirdIframeMap(mapId) {
            this.thirdMapLoading = true;
            localStorage.setItem("thirdMapId", mapId);
            this.thirdIframeSrc(mapId);
        },
        //点击第四个iframe选择地图
        changeFourthIframeMap: function changeFourthIframeMap(mapId) {
            this.fourthMapLoading = true;
            localStorage.setItem("fourthMapId", mapId);
            this.fourthIframeSrc(mapId);
        },


        //第一个iframe
        firstIframeSrc: function (mapId) {
            this.firstMapId = localStorage.getItem("firstMapId");
            //循环地图列表匹配对应的地图名称
            for (let i = 0; i < this.mapList.length; i++) {
                if (mapId == null) {
                    if (this.firstMapId == this.mapList[i].id) {
                        this.firstMapName = this.mapList[i].cname;
                    }
                } else {
                    if (mapId == this.mapList[i].id) {
                        this.firstMapName = this.mapList[i].cname;
                    }
                }
            }
            let iframe1 = document.getElementById("iframe1");
            //给iframe的src赋值
            if (mapId == null) {
                iframe1.src = this.iframeSrc + this.firstMapId;
            } else {
                iframe1.src = this.iframeSrc + mapId;
            }
            iframe1.onload = () => {
                this.firstMapLoading = false;
                iframe1.contentDocument.onclick = function () {
                    window.location.href = iframe1.src + "&show=true";
                };
                var idoc = iframe1.contentWindow.document;
                var img = idoc.getElementsByTagName('img')[0];
                if (img) {
                    var curWidth = img.width;
                    var curHeight = img.height;
                    var maxWidth = $('#iframeImg1').width();
                    if (curWidth >= maxWidth) {
                        img.width = maxWidth;
                        var zoomTimes = curWidth / maxWidth;
                        img.height = curHeight / zoomTimes;
                    }
                }
            }
        },
        //第二个iframe
        secondIframeSrc: function (mapId) {
            this.secondMapId = localStorage.getItem("secondMapId");
            //循环地图列表匹配对应的地图名称
            for (let i = 0; i < this.mapList.length; i++) {
                if (mapId == null) {
                    if (this.secondMapId == this.mapList[i].id) {
                        this.secondMapName = this.mapList[i].cname;
                    }
                } else {
                    if (mapId == this.mapList[i].id) {
                        this.secondMapName = this.mapList[i].cname;
                    }
                }
            }
            let iframe2 = document.getElementById("iframe2");
            //给iframe的src赋值
            if (mapId == null) {
                iframe2.src = this.iframeSrc + this.secondMapId;
            } else {
                iframe2.src = this.iframeSrc + mapId;
            }

            iframe2.onload = () => {
                this.secondMapLoading = false;
                iframe2.contentDocument.onclick = function () {
                    window.location.href = iframe2.src + "&show=true";
                };
                var idoc = iframe2.contentWindow.document;
                var img = idoc.getElementsByTagName('img')[0];
                if (img) {
                    var curWidth = img.width;
                    var curHeight = img.height;
                    var maxWidth = $('#iframeImg2').width();
                    if (curWidth >= maxWidth) {
                        img.width = maxWidth;
                        var zoomTimes = curWidth / maxWidth;
                        img.height = curHeight / zoomTimes;
                    }
                }
            }
        },
        //第三个iframe
        thirdIframeSrc: function (mapId) {
            this.thirdMapId = localStorage.getItem("thirdMapId");
            //循环地图列表匹配对应的地图名称
            for (let i = 0; i < this.mapList.length; i++) {
                if (mapId == null) {
                    if (this.thirdMapId == this.mapList[i].id) {
                        this.thirdMapName = this.mapList[i].cname;
                    }
                } else {
                    if (mapId == this.mapList[i].id) {
                        this.thirdMapName = this.mapList[i].cname;
                    }
                }
            }
            let iframe3 = document.getElementById("iframe3");
            //给iframe的src赋值
            if (mapId == null) {
                iframe3.src = this.iframeSrc + this.thirdMapId;
            } else {
                iframe3.src = this.iframeSrc + mapId;
            }
            iframe3.onload = () => {
                this.thirdMapLoading = false;
                iframe3.contentDocument.onclick = function () {
                    window.location.href = iframe3.src + "&show=true";
                };
                var idoc = iframe3.contentWindow.document;
                var img = idoc.getElementsByTagName('img')[0];
                if (img) {
                    var curWidth = img.width;
                    var curHeight = img.height;
                    var maxWidth = $('#iframeImg3').width();
                    if (curWidth >= maxWidth) {
                        img.width = maxWidth;
                        var zoomTimes = curWidth / maxWidth;
                        img.height = curHeight / zoomTimes;
                    }
                }
            }
        },
        //第四个iframe
        fourthIframeSrc: function (mapId) {
            this.fourthMapId = localStorage.getItem("fourthMapId");
            //循环地图列表匹配对应的地图名称
            for (let i = 0; i < this.mapList.length; i++) {
                if (mapId == null) {
                    if (this.fourthMapId == this.mapList[i].id) {
                        this.fourthMapName = this.mapList[i].cname;
                    }
                } else {
                    if (mapId == this.mapList[i].id) {
                        this.fourthMapName = this.mapList[i].cname;
                    }
                }
            }
            let iframe4 = document.getElementById("iframe4");
            //给iframe的src赋值
            if (mapId == null) {
                iframe4.src = this.iframeSrc + this.fourthMapId;
            } else {
                iframe4.src = this.iframeSrc + mapId;
            }
            iframe4.onload = () => {
                this.fourthMapLoading = false;
                iframe4.contentDocument.onclick = function () {
                    window.location.href = iframe4.src + "&show=true";
                };
                var idoc = iframe4.contentWindow.document;
                var img = idoc.getElementsByTagName('img')[0];
                if (img) {
                    var curWidth = img.width;
                    var curHeight = img.height;
                    var maxWidth = $('#iframeImg4').width();
                    if (curWidth >= maxWidth) {
                        img.width = maxWidth;
                        var zoomTimes = curWidth / maxWidth;
                        img.height = curHeight / zoomTimes;
                    }
                }

            }
        }
    },
    watch: {
        //当前第一个iframe选择地图的值
        currentFirstIframe(val, oldVal) {
            console.log(val);
        },
    }
});