
var app;
    app = new Vue({
       el:"#app",
       data:{
            traceBackData:null,//追溯数据

            notRecovery:true,//待回收
            isRecovery:false,//已回收
            isTransfer:false,//已中转
            isClean:false,//已清运

           institution:"",//单位
           rubbishType:"",//废物类型
           weight:0,//废物重量
           produceDate:"",//封口日期

           createByName:"",//创建人员
           createDate:"",//创建日期
           reclaimPersonName:"",//回收人员
           reclaimDate:"",//回收日期
           inPutPersonName:"",//中转人员
           inPutDate:"",//中转日期
           inCleanPersonName:"",//中转人员
           inCleanDate:"",//中转日期
       },
       created(){
           let paramId = js.getParam("id");//地址栏参数
           this.getDataById(paramId);//根据id获取想要的数据
       },
       methods:{
           getDataById:function (id) {
               var _this = this;
               js.ajaxSubmit(url + '/departmentRubbish/getDataById?id=' + id, function (data) {
                    _this.traceBackData = data.departmentRubbish;
                    if(_this.traceBackData == '' || _this.traceBackData == null){
                        js.alert("系统错误!!!", {icon: 2}, function(){
                            js.closeCurrentTabPage(function(contentWindow){
                                contentWindow.page();
                            });
                        });
                    }

                    console.log(_this.traceBackData.transportStatu+'123123213213')
                    if(_this.traceBackData.transportStatus == "2"){
                        //_this.notRecovery = true;
                        _this.isRecovery = true;
                    }else if(_this.traceBackData.transportStatus == "3"){
                        //_this.notRecovery = true;
                        _this.isRecovery = true;
                        _this.isTransfer = true;
                    }else if(_this.traceBackData.transportStatus == "4"){
                        //_this.notRecovery = true;
                        _this.isRecovery = true;
                        _this.isTransfer = true;
                        _this.isClean = true;
                    }
                    _this.institution = _this.traceBackData.institution;
                    _this.rubbishType = _this.traceBackData.rubbishType;
                    _this.weight = _this.traceBackData.weight;
                    _this.produceDate = _this.traceBackData.produceDate;
                    _this.createByName = _this.traceBackData.createByName;
                    _this.createDate = _this.traceBackData.createDate;
                    _this.reclaimPersonName = _this.traceBackData.reclaimPersonName;
                    _this.reclaimDate = _this.traceBackData.reclaimDate;
                    _this.inPutPersonName = _this.traceBackData.inPutPersonName;
                    _this.inPutDate = _this.traceBackData.inPutDate;
                    _this.inCleanPersonName= _this.traceBackData.inCleanPersonName;
                    _this.inCleanDate= _this.traceBackData.inCleanDate;

               });
           }
       }
    });