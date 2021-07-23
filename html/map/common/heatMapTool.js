/**
 * Created by Administrator on 2018/2/11/005.
 */


function heatMapInit() {
    var HeatTool = function () {
        //基本配置
        this.heatConf={
          max:500,
        };
        //获取数据
        this.analystGetDatas = function (mapId, tagMacs, start, end) {
            var _this = this;
            var url = 'history/analyst';
            var params = {mapId: mapId, tagMacs: tagMacs, start: start, end: end};
            ME.vm.heatMap.isLoading = true;
            ME.vm.$http.post(url, params)
                .then(function (rep) {
                    ME.vm.heatMap.isLoading = false;
                    _this.beginAnalyst(rep.body, tagMacs);
                });
        };

        //热图分析开始
        this.beginAnalyst=function (datas, showTags) {
            // 判断分析数据是否存在历史轨迹
            //模拟数据
            // var datasAll=[];
            // for(var i=0;i<500;i++){
            //     var d={};
            //     d.x=Math.random()*12000;
            //     d.y=Math.random()*7000;
            //     datasAll.push(d);
            // }

            var _this=this;
            if (!datas || _.isEmpty(datas)) {
                ME.vm.showTip(lang['showTipNote18']);
                //取消热图
                _this.cancelAnalyst();
                ME.vm.heatMap.isShow=false;
                return;
            }

            var tmp1 = [];
            //对数据进行转换
            for(var i=0;i<datas.length;i++){
                var d = datas[i];
                var tepData=[];
                var relData=ubiMap.convert(d);
                tepData[0]= Math.round(relData.x);
                tepData[1]=Math.round(relData.y);
                tepData[2]=1;
                tmp1.push(tepData);
            }


            var repeatIdx = [];

            // var datas = [[38,20,2],[38,690,3],[48,30,1]];
            ME.vm.heatMap.datas=[];
            for(var i=0;i<tmp1.length;i++){
                if(repeatIdx.indexOf(i)>-1) continue;

                var di = tmp1[i];

                for(var j=i+1;j<tmp1.length;j++){
                    var dj = tmp1[j];
                    if(di[0]===dj[0] && di[1]===dj[1] ){
                        di[2]++;
                        repeatIdx.push(j);
                    }
                }
                ME.vm.heatMap.datas.push(di);
            }

            this.applyHeatMap(ME.vm.heatMap.datas);
            ME.vm.heatMap.isShow = true;
        };

        //热图数据分析
        this.applyHeatMap =function(datas){
            if(!HeatTool.heat){
                ME.HeatMap_canvas = document.createElement('canvas');
                ME.HeatMap_canvas.width=ME.mapWidth;
                ME.HeatMap_canvas.height=ME.mapHeight;
                HeatTool.heat = simpleheat(ME.HeatMap_canvas);
            }

            HeatTool.heat.data(datas);
            // HeatTool.heat.max(this.heatConf.max);
            HeatTool.heat.radius(ME.vm.heatMap.radius, ME.vm.heatMap.blur);
            HeatTool.heat.draw();

            ME.HeatMapImg = new Image();
            ME.HeatMapImg.src = ME.HeatMap_canvas.toDataURL("image/png");
            ME.HeatMapImg.onload=ME.refreshHeatMap;
        };

        //热图取消分析
        this.cancelAnalyst=function(){
            if(HeatTool.heat){
                HeatTool.heat.clear();
                HeatTool.heat.draw();
                var ctx = ME.canvas.upperCanvasEl.getContext('2d');
                ctx.clearRect(-ME.center.x, -ME.center.y, ME.canvas.upperCanvasEl.width, ME.canvas.upperCanvasEl.height);
                ME.vm.heatMap.isShow = false;
            }
        };

        //配置变化方法
        this.updateByCfg=function(){
            if(HeatTool.heat){
                HeatTool.heat.radius(ME.vm.heatMap.radius, ME.vm.heatMap.blur);
                HeatTool.heat.draw();
                ME.HeatMapImg.src = ME.HeatMap_canvas.toDataURL("image/png");
            }
        };
    };
    HeatTool = new HeatTool();
    return HeatTool;
}