
let historyDetails = new Vue({
    el:"#historyDetails",
    data: {
        isShow: false,  //该详情框是否显示
        index: 0,   //当前标签的下标
        itemListIsShow: false,  //废弃物列表是否显示
        prevBtnColor: '#bfcbd9',   //上一个标签信息按钮颜色
        nextBtnColor: '#bfcbd9',   //下一个标签信息按钮颜色
        //查询历史时详情参数
        searchParams: {
            tagIds: null,   //标签ids
            datetimeRange: []   //时间段
        },
        boxPrevBtnColor: '#bfcbd9',   //上一个箱子信息按钮颜色
        boxNextBtnColor: '#bfcbd9',   //下一个箱子信息按钮颜色
        boxIndex: 0,    //箱子下标

        tagId: '',      //标签编号
        tagIds: '',      //标签编号
        tagIdType: [],
        tagIdAndType: {},   //标签id与标签类型对应
        tag: {},
        tagType: '',    //标签类型
        alias: '',      //标签别名
        listHistoryDetail:[[{
            id: '',
            tagId: '',
            transportId: '',
            boxId: '',
            hospitalName: '',
            deptName: '',
            collector: '',
            weight: '',
            collectTime: '',
            itemList:[],
        }]],

    },
    created:function (){

        $('.listBox').show();
        let _this = this;
        //监听轨迹历史查询按钮点击
        $('.historys .el-button--default').click(function(){

            let history = ME.vm.history;

            let tagIds = history.tags;
            let datetimeRange = history.datetimeRange;

            if (!datetimeRange || !tagIds || tagIds.length < 1) {
                return;
            }

            //验证时间格式是否正确
            if (!_this.validataDatetimeRange()) {
                return;
            }

            _this.searchParams.tagIds = tagIds;
            _this.searchParams.datetimeRange = datetimeRange;

            let allTag = ME.vm.tag.data;

            let tagIdType = [];
            let tagIdAndType = {};
            let tagIds1 = [];
            //封装标签与类型对照关系
            for (let i = 0; i < tagIds.length; i++) {
                //获取该标签的类型
                for (let j = 0; j < allTag.length; j++) {
                    if (tagIds[i] == allTag[j].code) {

                        let typeId = allTag[j].type.id;
                        let tagType;
                        if (wasteCarTypeIds.indexOf(typeId) != -1) {  //判断是否为医废车
                            tagType = 'wasteCar';
                        } else if (specimenTypeIds.indexOf(typeId) != -1) {   //判断是否为标本托盘
                            tagType = 'specimen';
                        } else {
                            continue;
                        }

                        tagIds1.push(tagIds[i]);
                        tagIdType.push(tagIds[i] + '-' + tagType);
                        tagIdAndType[tagIds[i]] = tagType;
                        continue;

                    }
                }
            }

            if (!tagIdType || tagIdType.length == 0) {
                _this.isShow = false;
                return;
            }
            _this.tagIds = tagIds1;
            _this.tagIdType = tagIdType;
            _this.tagIdAndType = tagIdAndType;

            _this.listHistoryDetailFun();

            _this.isShow = true;
        });

        $('.glyphicon-stop').click(function(){
            _this.isShow = false;
        });

        //监听点击分屏显示跳转页面
        $("#jumpSplitScreenPage").click(function () {
            window.open("/split-screen/realTimeQuery/splitScreen.html","_blank");
        });

        //监听轨迹查询页面跳转
        $("#jumpHistoryPage").click(function () {
            window.open("/split-screen/history/index.html","_blank");
        });

    },
    methods:{

        validataDatetimeRange: function(){
            let history = ME.vm.history;
            let range = history.datetimeRange;
            //验证时间是否正确
            if (!range[0] || !range[1]) {
                return false;
            }

            let max = range[1].getTime();
            let span = max - history.min;
            //时间范围 1秒 -  7天;
            if (span < 1) {
                return false;
            } else {
                if (span > 7 * 24 * 3600 * 1000) {
                    return false;
                }
            }

            return true;
        },
        //获取标签详情
        listHistoryDetailFun:function (){
            this.index = 0;
            let _this = this;
            $.ajax({
                url: extendHostUrl + "/waste/listHistoryDetailByMixture",
                type:"post",
                data:{
                    tagIds: _this.tagIdType.join(),
                    startTime: _this.searchParams.datetimeRange[0].format('yyyy-MM-dd hh:mm:ss'),
                    endTime: _this.searchParams.datetimeRange[1].format('yyyy-MM-dd hh:mm:ss')
                },
                dataType:"json",
                success:function (response){

                    if (response.code != 1) {
                        console.log('错误:' + response.msg);
                        return;
                    }

                    _this.listHistoryDetail = response.data.listHistoryDetail;

                },
                error: function(errorMessage) {
                    console.log('系统错误!')
                },
            });
        },
        clickMenu:function () {
            this.itemListIsShow = !this.itemListIsShow;
        },

        //上一个标签信息按钮
        prevBtn: function(){
            if(this.index > 0){
                this.index --;
                this.boxIndex = 0;
            }
        },

        //下一个标签信息按钮
        nextBtn: function(){
            if(this.index < (this.listHistoryDetail.length -1)){
                this.index ++;
                this.boxIndex = 0;
            }
        },

        //控制上一个标签和下一个标签的颜色变化
        controlBtnColor: function(){
            if(this.index == 0) {
                this.prevBtnColor = '#bfcbd9';
            } else{
                this.prevBtnColor = 'blue';
            }

            if(this.index == this.listHistoryDetail.length - 1) {
                this.nextBtnColor = '#bfcbd9';
            } else {
                this.nextBtnColor = 'blue';
            }
        },

        //上一个箱子信息按钮
        boxPrevBtn: function(){
            if(this.boxIndex > 0){
                this.boxIndex --;
            }
        },

        //下一个箱子信息按钮
        boxNextBtn: function(){
            if(this.boxIndex < (this.listHistoryDetail[this.index].length -1)){
                this.boxIndex ++;
            }
        },

        //控制上一个标签和下一个标签的颜色变化
        controlBoxBtnColor: function(){
            if(this.boxIndex == 0) {
                this.boxPrevBtnColor = '#bfcbd9';
            } else{
                this.boxPrevBtnColor = 'blue';
            }

            if(this.boxIndex == this.listHistoryDetail[this.index].length - 1) {
                this.boxNextBtnColor = '#bfcbd9';
            } else {
                this.boxNextBtnColor = 'blue';
            }
        },

        updateTagAlias: function(){
            this.tagId = this.tagIds[this.index]
            this.alias = ME.tags[this.searchParams.tagIds[this.index]].alias;
        }

    },
    watch: {
        index: function(val, oldVal){
            this.controlBtnColor();
            this.updateTagAlias();
            this.controlBoxBtnColor();
        },
        listHistoryDetail: function(val, oldVal){
            this.controlBtnColor();
            this.updateTagAlias();
            this.controlBoxBtnColor();
        },
        boxIndex: function(val, oldVal){
            this.controlBoxBtnColor();
        },

    }

});

/**
 * 获取url地址栏参数
 * @param variable
 * @returns {string|boolean}
 */
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
}

Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}
