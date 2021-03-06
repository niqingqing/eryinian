var element;
var app;
app = new Vue({
    el: "#app",
    data: {
        zzzstatiscsWeightList: [],
        annualSummaryList: [],
        type:'',
        one: '',
        two: '',
        three: '',
        four: '',
        five: '',
        six: '',
        seven: '',
        eight: '',
        nine: '',
        ten: '',
        eleven: '',
        twelve: '',
    },
    created: function () {
        this.getzzzstatiscsWeightList();
        this.annualSummary();
    },
    mounted: function () {
        var _this = this;

    },
    methods: {
        setType:function(type){
            var _this = this;
            _this.type = type;
            console.log(_this.type);
        },
        //右边部分
        getzzzstatiscsWeightList: function () {
            var _this = this;
            $.ajax({
                url: url + "/statiscs/zzzstatiscsWeightList",
                method: "post",
                data: {
                    'type': _this.type
                },
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (data) {
                    _this.zzzstatiscsWeightList = data;
                },
                error: function () {

                }
            })
        },
        annualSummary: function (type) {
            var _this = this;
            $.ajax({
                url: url + "/statiscs/annualSummary",
                method: "post",
                data: {
                    'type': type
                },
                contentType: "application/json;charset=UTF-8",
                dataType: "json",
                success: function (data) {

                    _this.annualSummaryList = data;
                    _this.one = _this.annualSummaryList[0].weight;
                    _this.two = _this.annualSummaryList[1].weight;
                    _this.three = _this.annualSummaryList[2].weight;
                    _this.four = _this.annualSummaryList[3].weight;
                    _this.five = _this.annualSummaryList[4].weight;
                    _this.six = _this.annualSummaryList[5].weight;
                    _this.seven = _this.annualSummaryList[6].weight;
                    _this.eight = _this.annualSummaryList[7].weight;
                    _this.nine = _this.annualSummaryList[8].weight;
                    _this.ten = _this.annualSummaryList[9].weight;
                    _this.eleven = _this.annualSummaryList[10].weight;
                    _this.twelve = _this.annualSummaryList[11].weight;
                },
                error: function () {

                }
            })
        },
    },
    updated: function () {

    }
});