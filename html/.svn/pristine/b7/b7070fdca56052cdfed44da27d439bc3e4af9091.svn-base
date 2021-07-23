
let tagDetail = new Vue({
    el:"#tagDetail",
    data: {
        isShow: true,
        itemListIsShow: false,  //废弃物列表是否显示
        tagId: '',
        tag: {},
        tagType: '',    //标签类型
        alias: '',
        boxPrevBtnColor: '#bfcbd9',   //上一个箱子信息按钮颜色
        boxNextBtnColor: '#bfcbd9',   //下一个箱子信息按钮颜色
        boxIndex: 0,    //箱子下标
        tagDetail:[{
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
        }],
        currentMapName:null,//当前地图名称
    },
    created:function (){
        this.tagId = getQueryVariable('tag');

        let _this = this;
        //获取标签别名,因为立即获取会报错,所以这里延时重复获取,直到获取到为止
        let interval = setInterval(function(){
            try {
                if (ME && ME.currentTags && ME.currentTags.data) {
                    _this.tag = ME.currentTags.data[0];

                    let typeId = _this.tag.type.id; //获取标签类型id

                    if (wasteCarTypeIds.indexOf(typeId) != -1) {  //判断是否为医废车
                        _this.tagType = 'wasteCar';
                    } else if (specimenTypeIds.indexOf(typeId) != -1) {   //判断是否为标本托盘
                        _this.tagType = 'specimen';
                    } else {
                        _this.isShow = false;
                        return;
                    }

                    _this.alias = _this.tag.alias;
                    _this.getTagDetail();
                    clearInterval(interval);
                }
                // _this.alias = ME.currentTags.data[0].alias;
                // clearInterval(interval);
            } catch (e){
                console.log(e);
            }

        }, 500)

    },
    methods:{
        //获取标签详情
        getTagDetail:function (){
            if (!this.tagId) {
                return;
            }

            // let url = '/waste/detail';
            //判断标签类型不对加载不同的数据
            let url = this.tagType == 'wasteCar' ? '/waste/detail' : '/specimen/detail';
            let _this = this;
            $.ajax({
                url: extendHostUrl + url,
                type:"post",
                data:{
                    tagId: this.tagId
                },
                dataType:"json",
                success:function (response){

                    if (response.code != 1) {
                        console.log('错误:' + response.msg);
                        return;
                    }

                    //判断如果不为空直接赋值,为空则创建一个空对象
                    if (response.data.detail && response.data.detail.length > 0) {
                        _this.tagDetail = response.data.detail;
                    } else {
                        _this.tagDetail = [{}];
                    }


                },
                error: function(errorMessage) {
                    console.log('系统错误!');
                },
            });
        },
        clickMenu:function () {
            this.itemListIsShow = !this.itemListIsShow;
        },

        //上一个箱子信息按钮
        boxPrevBtn: function(){
            if(this.boxIndex > 0){
                this.boxIndex --;
            }
        },

        //下一个箱子信息按钮
        boxNextBtn: function(){
            if(this.boxIndex < (this.tagDetail.length -1)){
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

            if(this.boxIndex == this.tagDetail.length - 1) {
                this.boxNextBtnColor = '#bfcbd9';
            } else {
                this.boxNextBtnColor = 'blue';
            }
        },
    },

    watch: {
        boxIndex: function(val, oldVal){
            this.controlBoxBtnColor();
        },
        tagDetail: function(val, oldVal){
            this.controlBoxBtnColor();
        },

    }

});

new Vue({
    el: '#mapName',
    data: {
        tagId: null,
        currentMapName:null,//当前地图名称
    },
    created: function () {
        this.tagId = getQueryVariable('tag');
        //根据标签获取地图信息
        this.getMapByTagId(this.tagId);
    },
    methods: {
        //根据标签获取地图信息
        getMapByTagId:function(tagId){
            let _this = this;
            $.ajax({
                url: UBIT.host + "/map/loadByTagCode",
                type:"get",
                data:{
                    tagCode: tagId
                },
                dataType:"json",
                success:function (response){
                    _this.currentMapName = response.maps[0].cname;
                },
                error: function(errorMessage) {
                    console.log('系统错误!');
                },
            });

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
