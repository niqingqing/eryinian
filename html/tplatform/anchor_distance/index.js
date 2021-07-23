/**
 * Created by LiuTao on 2017/7/03 0028.
 */



$(function(){
    init();
});

function init(){
    Vue.http.options.emulateJSON = false;
    vueInit();
    getDataAndDraw()
}
function getDataAndDraw(){
    if(!ME.map) return;

    getAnchors(initMap, ME.map,dealMap);

}
function dealMap() {
    ME.vm.drawRegionSelectAn();
}
var adjustAnchorsMap = {};
var correctAnchors = [];
var fixedAnchor;

function vueInit(){
    ME.vm = new Vue({
        el:'#app',
        data: {
            dialogAnchorFormVisible:false,
            updateBtnDisable:false,
            distanceDelBtnDisable:false,
            delAnchorCfgBtnDisable:false,
            addAnchorCfgBtnDisable:false,
            rangeEachLoading:false,
            rangeLoading:false,
            reverseDisBtnDisable:false,
            forwardDisBtnDisable:false,
            currentProj:'',  //地图传过来项目code
            currentMap:'',   //当前地图
            maps:[],         //所有项目地图
            anchors:[],
            anchorsPosObj:{},
            onlyCorrectAnchors:true,
            anchorsObj:{},
            cfgAnchorDistancesObj:{},
            refAnchor:'',
            disAnchors:[],
            adjustAnchors:[],
            selectedAdjustAnchors:[],
            fixedAnchor:'',
            adjustStep:10,
            everyCalc:[],
            openSelectRegion:false,
            errorNoFluctuation:true,
            bindMouseEvent:false,
            regionPonits:[],
            result:{
                Cycle:'',
                Gradient:'',
                Deviation:''
            },
            showCalcFlag:false,
            anchorForm:{
                'sourceId':'',
                'code':'',
                'alias':'',
                'mapId':'',
                'id':'',
                'x':'',
                'y':'',
                'z':''
            },
            modefiyRule: {

            }
        },
        created:function(){
            if(!(UBIT.user.projectCode &&  UBIT.user.projectId>0)){
                alert('必须进入项目地图才能查看实验平台！')
                return false;
            }

            //获取项目下所有地图
            this.currentProj = UBIT.user.projectCode;
            ME.map=this.currentMap=getDefaultMap();
            if(!this.currentMap){return}

            this.$http.get('map/list?projectCode='+this.currentProj).then(function(res){
                this.maps=res.body;
                pageInit(this.currentMap);
            });
        },
        methods: {
            getPosition:function(e,obj){
                var svgOrigin = paper.canvas.viewBox.baseVal,
                    currentZoom = 1 - ME.PanZoom.getCurrentZoom() * 0.1;
                var posX = obj.offsetLeft, posY = obj.offsetTop;
                while (obj.offsetParent) {
                    if (obj === document.getElementsByTagName('body')[0]) {
                        break;
                    } else {
                        posX = posX + obj.offsetParent.offsetLeft;
                        posY = posY + obj.offsetParent.offsetTop;
                        obj = obj.offsetParent;
                    }
                }
                var ex = e.pageX - posX;
                var ey = e.pageY - posY;
                var x = (ex * currentZoom + svgOrigin.x).toFixed(1),
                    y = (ey * currentZoom + svgOrigin.y).toFixed(1);

                var relX = parseInt(x*100/zoom);
                var relY = parseInt(y*100/zoom);
                return {x:x,y:y,relX:relX,relY:relY}
            },
            statisticsAnchors:function (p1,p2) {
                var that = this;
                var statisticsList=[];
                var ariaVertex={};
                if(parseFloat(p1.relX)<=parseFloat(p2.relX)){
                    ariaVertex.minReaX=parseFloat(p1.relX);
                    ariaVertex.maxReaX=parseFloat(p2.relX);
                }else{
                    ariaVertex.minReaX=parseFloat(p2.relX);
                    ariaVertex.maxReaX=parseFloat(p1.relX);
                }

                if(parseFloat(p1.relY)<=parseFloat(p2.relY)){
                    ariaVertex.minReaY=parseFloat(p1.relY);
                    ariaVertex.maxReaY=parseFloat(p2.relY);
                }else{
                    ariaVertex.minReaY=parseFloat(p2.relY);
                    ariaVertex.maxReaY=parseFloat(p1.relY);
                }
                for(var i=0;i<that.anchors.length;i++){
                    var item=that.anchors[i];
                    if(
                        item.mapId==ME.map.id&&
                        parseFloat(item.x)>=ariaVertex.minReaX&&parseFloat(item.x)<=ariaVertex.maxReaX&&
                        parseFloat(item.y)>=ariaVertex.minReaY&&parseFloat(item.y)<=ariaVertex.maxReaY
                    ){
                        statisticsList.push(item.code);
                    }
                }
                $('#anchorTable').bootstrapTable('checkBy', {field: 'code', values: statisticsList})
                for(var m=0;m<statisticsList.length;m++){
                    for(var n=0;n<that.adjustAnchors.length;n++){
                        if(statisticsList[m]==that.adjustAnchors[n].code){
                            that.$refs.adjustAnchorsTable.toggleRowSelection(that.adjustAnchors[n],true);
                            break;
                        }
                    }
                }
            },
            drawRegionSelectAn:function () {
                var that =this;
                // that.openSelectRegion = !that.openSelectRegion;
                that.openSelectRegion = true;
                if(!that.bindMouseEvent) {
                    var container = paper.canvas.parentNode;
                    paper.canvas.ondblclick=function(e) {
                        if (that.openSelectRegion){
                            var pos = that.getPosition(e, container);
                            if (!pos) return;
                            if (that.regionPonits.length < 1) {
                                that.regionPonits.push(pos);
                            } else {
                                // 开始统计
                                that.statisticsAnchors(that.regionPonits[0], pos);
                                if(paper.statistics){
                                    paper.statistics.remove();
                                }
                                that.regionPonits = [];
                            }
                        }
                    }
                    paper.canvas.onmousemove = function (e) {
                        if(that.openSelectRegion && that.regionPonits.length == 1){
                            var pos = that.getPosition(e, container);
                            that.drawAriaByTwo(that.regionPonits[0],pos);
                        }
                    }
                    that.bindMouseEvent = true;
                }

            },
            errorOrFluctuation:function () {
                var that =this;
                that.errorNoFluctuation = !that.errorNoFluctuation;
                for(var i=0;i<this.disAnchors.length;i++){
                    var edge = this.disAnchors[i];
                    var path_id = 'PATH_' + edge.key;
                    var text_id = 'TEXT_' + edge.key;
                    var path_obj = paper.getById(path_id);
                    var text_obj = paper.getById(text_id);
                    var color = 'green';
                    var textWord = '';
                    if(that.errorNoFluctuation){
                        if(Math.abs(edge['distanceErr'])<10){
                            color = 'green';
                        }else if(10<=Math.abs(edge['distanceErr']) && Math.abs(edge['distanceErr'])<=20){
                            color = 'orange';
                        }else{
                            color = 'red'
                        }
                        textWord = edge.calc.toFixed(0) +'('+edge.distanceErr.toFixed(0)+')';
                    }else{
                        var bigval = edge.distanceRng1>edge.distanceRng2 ? edge.distanceRng1 : edge.distanceRng2;
                        if(bigval<10){
                            color = 'green';
                        }else if(10<=bigval && bigval<=20){
                            color = 'orange';
                        }else{
                            color = 'red'
                        }
                        var  disRng1 = edge.distanceRng1 ? edge.distanceRng1.toFixed(0) : '无';
                        var  disRng2 = edge.distanceRng2 ? edge.distanceRng2.toFixed(0) : '无';
                        textWord = disRng1+'/'+disRng2;
                    }
                    if(path_obj) {
                        path_obj.attr({'fill': color,'stroke':color});
                    }
                    if(text_obj){
                        text_obj.attr({'fill': color,'text':textWord});
                    }
                }
            },
            getStartP:function(p1,p2){
                var startPoint={
                    x:parseFloat(p1.x)<=parseFloat(p2.x)?parseFloat(p1.x):parseFloat(p2.x),
                    y:parseFloat(p1.y)<=parseFloat(p2.y)?parseFloat(p1.y):parseFloat(p2.y)
                }
                startPoint.w=Math.abs(parseFloat(p1.x)-parseFloat(p2.x));
                startPoint.h=Math.abs(parseFloat(p1.y)-parseFloat(p2.y));
                return startPoint;
            },
            drawAriaByTwo:function(p1,p2){
                var that =this;
                var startPoint=that.getStartP(p1,p2);
                if(paper.statistics){
                    paper.statistics.remove();
                }
                paper.statistics=paper.rect(startPoint.x,startPoint.y,startPoint.w,startPoint.h);
                paper.statistics.attr({
                    stroke:'#3d3d3d',
                    'stroke-dasharray':'--'
                });
            },
            rounding: function (r, c) {
                if(r[c.property]||r[c.property] === 0) {
                    return typeof r[c.property] === 'number' ? r[c.property].toFixed(2) : (r[c.property] * 1).toFixed(2);
                }else{
                    return '';
                }
            },
            createAnchorObj(){
                var obj={};
                var posObj={};
                for(var i=0;i<this.anchors.length;i++){
                    obj[this.anchors[i].code]=this.anchors[i];
                    posObj[this.anchors[i].code]={edgeNum: 0, code:this.anchors[i].code, ori_x: this.anchors[i].x,
                        ori_y: this.anchors[i].y, x: this.anchors[i].x, y: this.anchors[i].y, z: this.anchors[i].z };
                    if(this.anchors[i].cfg){
                        var cfgArr = JSON.parse(this.anchors[i].cfg);
                        for(var j=0;j<cfgArr.length;j++){
                            if(cfgArr[j].key == "cfg_anchor_distances"){
                                try {
                                    var disObj = JSON.parse(cfgArr[j].value);
                                    this.cfgAnchorDistancesObj[this.anchors[i].code] =disObj;
                                }catch(e){
                                    console.log(e);
                                    this.$alert(this.anchors[i].code+'到其它基站飞行距离配置格式错误！', '提示', {
                                        confirmButtonText: '确定'
                                    });
                                }
                            }
                        }
                    }
                }
                this.anchorsObj=obj;
                this.anchorsPosObj = posObj;
            },
            freshMeasuretable(){
                refreshTable('anchorMeasureTable');
            },
            selectAnchors: function () {
                return selects('anchorTable', ME.vm);
            },
            selectAllAnchors: function () {
                return getTableRows('anchorTable');
            },
            refresh: function () {
                return refreshTable('anchorTable');
            },
            reloadByRefAnchor: function () {
                //计算当前选择的基站，与各个基站的距离
                var source = this.refAnchor;
                if(!source){
                    this.$alert('请选择参考基站！', '提示', {
                        confirmButtonText: '确定'
                    });
                    return false;
                }
                var rows = this.selectAllAnchors();
                if (!rows) return;

                var anchorList = [];
                for(var i=0;i<rows.length;i++){
                    var r = rows[i];
                    if(source.code == r.code){
                        r.calc = 0; continue;
                    }
                    anchorList.push({source:source.code, target:r.code});
                    r.calc = UBIT.getDistance(r, source);
                }

                //refresh table
                loadTable('anchorTable', rows)
            },
            rangeEachAnchors: function () {
                var rows = this.selectAnchors();
                if (!rows) return;
                if(rows.length<2){
                    this.$alert('至少需选择两个基站！')
                    return;
                }

                this.rangeEachLoading = true;
                this.eachMeasureDis(rows, 0);
            },
            eachMeasureDis:function (rows,i) {
                if(i>=rows.length){
                    this.rangeEachLoading = false;
                }
                var anchorList = [];
                for(let j=0;j<rows.length;j++) {
                    if(j!=i) {
                        anchorList.push({source: rows[i].code, target: rows[j].code});
                    }
                }
                rangeDistance(anchorList, rows,undefined,this.eachMeasureDis,rows,i);
            },
            rangeAnchors: function () {
                var source = this.refAnchor;
                if(!source){
                    this.$alert('请选择参考基站！', '提示', {
                        confirmButtonText: '确定'
                    });
                    return false;
                }
                var rows = this.selectAnchors();
                if (!rows) return;

                var anchorList = [];
                for(var i=0;i<rows.length;i++){
                    var r = rows[i];
                    anchorList.push({source:source.code, target:r.code});
                    r.calc = UBIT.getDistance(r, source);
                }

                this.rangeLoading = true;
                rangeDistance(anchorList, rows);
            },
            reloadByMap:function(){
                refreshTable('anchorTable');
                refreshTable('anchorMeasureTable');
                localStorage.setItem('tplaformMap',this.currentMap);
            },
            saveAnchorMeasure:function (datas) {
                var mapId = this.currentMap.split('_')[1];
                this.$http.post('tplatform/anchorDistance/addBatch', {datas:datas,mapId:mapId}).then(function (res) {
                    if(res.body) {
                        refreshTable('anchorMeasureTable');
                    }else{
                        console.log(res);
                    }
                },function (e) {
                    console.log(e);
                })
            },
            handleClick:function (index,row) {
                var path_id = 'PATH_'+row.key;
                var text_id = 'TEXT_'+row.key;
                if(row.mapShowData) {
                    // row.mapShowData=false;
                    this.$set(row,'mapShowData',false);
                    paper.getById(path_id).hide();
                    paper.getById(text_id).hide();
                }else{
                    // row.mapShowData=true;
                    this.$set(row,'mapShowData',true);
                    paper.getById(path_id).show();
                    paper.getById(text_id).show();
                }
            },
            selectMeasureRows:function(){
                var a = $('#anchorMeasureTable').bootstrapTable('getSelections');
                if (!a || a.length<1){
                    this.$alert(lang['selectOne'], lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                    return false;
                }
                return a;
            },
            delMeasure:function () {
                var rows = this.selectMeasureRows();
                if (!rows) return;

                var ids = []
                rows.forEach(function (r) {
                    ids.push(r.id);
                });
                this.postDelMeasureDis(ids);
            },
            postDelMeasureDis:function (ids) {
                var that =this;
                this.$confirm('删除测量值, 是否确定?', '提示',{}).then(function () {
                    ME.vm.distanceDelBtnDisable = true;
                    ME.vm.$http.post('tplatform/anchorDistance/delBatch', {ids: ids}).then(function (res) {
                        var result = res.body;
                        if (result) {
                            refreshTable('anchorMeasureTable');
                            // that.$alert('删除成功', '提示');
                        } else {
                            that.$alert('删除失败：'+result.msg, '提示');
                        }
                        ME.vm.distanceDelBtnDisable = false;
                    });
                }).catch(function (e) {
                    console.log(e);
                    ME.vm.distanceDelBtnDisable = false;
                });
            },
            handleDelete:function (index,row) {
                for(var i=0;i<ME.vm.disAnchors.length;i++){
                    if(ME.vm.disAnchors[i].key == row.key){
                        ME.vm.disAnchors.splice(i,1);
                        var path_id = 'PATH_'+row.key;
                        var text_id = 'TEXT_'+row.key;
                        paper.getById(path_id).remove();
                        paper.getById(text_id).remove();
                        break;
                    }
                }
            },
            clearAnchorForm:function () {
                this.anchorForm={
                    'sourceId':'',
                    'code':'',
                    'alias':'',
                    'mapId':'',
                    'id':'',
                    'x':'',
                    'y':'',
                    'z':''
                }
            },
            showAnchorForm:function () {
                this.clearAnchorForm();
                var rows = selectEditAnchor('anchorTable', ME.vm);
                if(!rows) return;
                if(rows.length>1){
                    this.$alert('只能选择一个基站进行修改', '提示', {
                        confirmButtonText: '确认'
                    });
                    return false;
                }
                this.anchorForm={
                    'sourceId':rows[0].sourceId,
                    'code':rows[0].code,
                    'alias':rows[0].alias,
                    'mapId':rows[0].mapId,
                    'id':rows[0].id,
                    'x':rows[0].x,
                    'y':rows[0].y,
                    'z':rows[0].z
                }
                this.dialogAnchorFormVisible = true;
            },
            tipPrompt:function (msg) {
                this.$alert(msg, '提示', {
                    confirmButtonText: '确认'
                });
            },
            updateAnchorPos:function () {
                if(this.anchorForm.x === ''){
                    this.tipPrompt('基站坐标X不能为空');
                    return false;
                }
                if(this.anchorForm.y === ''){
                    this.tipPrompt('基站坐标Y不能为空');
                    return false;
                }
                if(this.anchorForm.z === ''){
                    this.tipPrompt('基站坐标Z不能为空');
                    return false;
                }
                ME.vm.updateBtnDisable = true;
                var url = 'anchor/update'
                ME.vm.$http.post(url, this.anchorForm).then(function(res){

                    ME.vm.updateBtnDisable = false;

                    var result = res.body;
                    if(result.isOk){
                        this.dialogAnchorFormVisible = false;
                        refreshTable("anchorTable");
                    }else {
                        this.$alert("失败："+result.msg, '提示', {
                            confirmButtonText: "确定"
                        });
                    }
                });
            },
            changeShowAnchors:function () {
                this.onlyCorrectAnchors = !this.onlyCorrectAnchors;
                freshAdjustAnchors();
                this.fixedAnchor = '';
            },
            saveAnchorPos:function () {
                if(this.selectedAdjustAnchors.length<1){
                    this.$alert("请选中要更新坐标的基站！", '提示', {
                        confirmButtonText: "确定"
                    });
                    return;
                }
                this.$confirm('更新选中基站的坐标?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var allAnchors = getTableRows('anchorTable');
                    var anchorsObj = {};
                    for (var i=0;i<allAnchors.length;i++){
                        if(!anchorsObj[allAnchors[i].code]){
                            anchorsObj[allAnchors[i].code] = allAnchors[i]
                        }
                    }
                    for(var j=0;j<this.selectedAdjustAnchors.length;j++){
                        var code = this.selectedAdjustAnchors[j].code;
                        var data = {
                            'sourceId':anchorsObj[code].sourceId,
                            'code':code,
                            'alias':anchorsObj[code].alias,
                            'mapId':anchorsObj[code].mapId,
                            'id':anchorsObj[code].id,
                            'x':this.selectedAdjustAnchors[j].x+ME.map.origin_x,
                            'y':this.selectedAdjustAnchors[j].y+ME.map.origin_x,
                            'z':anchorsObj[code].z+ME.map.origin_x
                        }
                        this.saveOnePos(data);
                    }
                }).catch(() => {
                    console.log('已经取消。')
                });
            },
            saveOnePos:function (data) {
                if(data.x === ''){
                    this.tipPrompt(data.code+'基站坐标X不能为空');
                    return false;
                }
                if(data.y === ''){
                    this.tipPrompt(data.code+'基站坐标Y不能为空');
                    return false;
                }
                if(data.z === ''){
                    this.tipPrompt(data.code+'基站坐标Z不能为空');
                    return false;
                }
                var url = 'anchor/update'
                ME.vm.$http.post(url, data).then(function(res){

                    var result = res.body;
                    if(result.isOk){
                        // refreshTable("anchorTable");
                        console.log(data.code+"成功。");
                    }else {
                        this.$alert(data.code+"失败："+result.msg, '提示', {
                            confirmButtonText: "确定"
                        });
                    }
                });
            },
            reDrawMap:function () {
                paper.clear();
                this.currentMap =  getDefaultMap();
                getAnchors(initMap, this.currentMap);
            },
            reDrawDisLine:function () {
                drawDisLine();
                this.composeAnalysisData();
            },
            selectFixedAnchor(val){
                console.log(val);
                for(var i=0;i<this.adjustAnchors.length;i++){
                    if(this.adjustAnchors[i].code === val){
                        break;
                    }
                }
                // this.$refs.adjustAnchorsTable.clearSelection();
                this.$refs.adjustAnchorsTable.toggleRowSelection(this.adjustAnchors[i],true);
            },
            handleAdjustAnchorsSelectionChange(val){
                this.selectedAdjustAnchors = val;
            },

            preparaDada(){
                paper.clear();
                drawBackground();
                adjustAnchorsMap = JSON.parse('{"900007be":{"edgeNum":5,"code":"900007be","ori_x":584,"ori_y":1310,"z":276},"9000074f":{"edgeNum":5,"code":"9000074f","ori_x":616,"ori_y":476,"z":276},"900007cc":{"edgeNum":5,"code":"900007cc","ori_x":35,"ori_y":1289,"z":276},"900008f1":{"edgeNum":5,"code":"900008f1","ori_x":35,"ori_y":476,"z":275},"9000078b":{"edgeNum":5,"code":"9000078b","ori_x":616,"ori_y":16,"z":276},"900005ce":{"edgeNum":5,"code":"900005ce","ori_x":53,"ori_y":27,"z":244}}');
                ME.vm.disAnchors = JSON.parse('[{"key":"9000074f_900007be","timestamp":"2020-03-20 22:24:59","anchor2":"900007be","anchor1":"9000074f","calc":834.613683089368,"distanceAvg":840.0396980989035,"distanceErr":-5.42601500953549,"distance1":853.9976959352854,"distanceRng1":0.7037645967924391,"mapShowData":true,"distance2":826.0817002625215,"distanceRng2":6.5684695700621205,"altErr":27.91599567276387},{"key":"9000074f_900007cc","timestamp":"2020-03-20 22:24:59","anchor2":"900007cc","anchor1":"9000074f","calc":999.2647296887848,"distanceAvg":1004.6033196488522,"distanceErr":-5.338589960067452,"distance1":1013.9868476060838,"distanceRng1":1.4075291935847645,"mapShowData":true,"distance2":995.2197916916207,"distanceRng2":3.987999381823329,"altErr":18.76705591446307},{"key":"900007be_900007cc","timestamp":"2020-03-20 22:25:15","anchor1":"900007be","anchor2":"900007cc","calc":549.401492535286,"distanceAvg":546.6871553359515,"distanceErr":2.7143371993345227,"distance2":551.8480957124289,"distanceRng2":5.160940376477356,"mapShowData":true,"distance1":541.5262149594741,"distanceRng1":3.2842347850310034,"altErr":10.321880752954712},{"key":"9000074f_900008f1","timestamp":"2020-03-21 13:18:56","anchor2":"900008f1","anchor1":"9000074f","calc":581.0008605845605,"distanceAvg":568.1519755381187,"distanceErr":12.848885046441865,"distance1":568.5038578365148,"distanceRng1":6.803057768992858,"mapShowData":true,"distance2":567.8000932397225,"distanceRng2":6.099293172200419,"altErr":0.7037645967923254},{"key":"9000074f_9000078b","timestamp":"2020-03-21 13:18:56","anchor2":"9000078b","anchor1":"9000074f","calc":460,"distanceAvg":449.8413272106907,"distanceErr":10.158672789309321,"distance1":477.3272445187481,"distanceRng1":2.345881989307941,"mapShowData":true,"distance2":422.3554099026332,"distanceRng2":1.8767055914462958,"altErr":54.971834616114904},{"key":"900005ce_9000074f","timestamp":"2020-03-21 13:18:56","anchor1":"900005ce","anchor2":"9000074f","calc":720.8286897730972,"distanceAvg":714.9259920024825,"distanceErr":5.902697770614623,"distance2":714.1831293725351,"distanceRng2":5.160940376477242,"mapShowData":true,"distance1":715.66885463243,"distanceRng1":12.90235094119339,"altErr":1.4857252598949344},{"key":"900007be_900008f1","timestamp":"2020-03-21 13:19:48","anchor2":"900008f1","anchor1":"900007be","calc":998.4778415167759,"distanceAvg":990.1761454146085,"distanceErr":8.301696102167398,"distance1":976.4527357771574,"distanceRng1":5.160940376477356,"mapShowData":true,"distance2":1003.8995550520598,"distanceRng2":0.9383527957231763,"altErr":27.446819274902396},{"key":"9000078b_900007be","timestamp":"2020-03-21 13:19:48","anchor1":"9000078b","anchor2":"900007be","calc":1294.3956118590638,"distanceAvg":1294.632529593618,"distanceErr":-0.2369177345542539,"distance2":1309.489782192568,"distanceRng2":1.6421173925155017,"mapShowData":true,"distance1":1279.7752769946678,"distanceRng1":2.3458819893080545,"altErr":29.71450519790028},{"key":"900005ce_900007be","timestamp":"2020-03-21 13:19:48","anchor1":"900005ce","anchor2":"900007be","calc":1388.911084267096,"distanceAvg":1390.970083287862,"distanceErr":-2.058999020766123,"distance2":1379.9444379381148,"distanceRng2":3.7534111828927053,"mapShowData":true,"distance1":1401.995728637609,"distanceRng1":3.04964658610038,"altErr":22.051290699494302},{"key":"9000078b_900008f1","timestamp":"2020-03-21 13:20:22","anchor1":"9000078b","anchor2":"900008f1","calc":741.0546538548962,"distanceAvg":726.1862255511603,"distanceErr":14.868428303735868,"distance2":750.7788884057381,"distanceRng2":7.506822365785297,"mapShowData":true,"distance1":701.5935626965826,"distanceRng1":3.2842347850310034,"altErr":49.18532570915556},{"key":"900005ce_900008f1","timestamp":"2020-03-21 13:20:22","anchor1":"900005ce","anchor2":"900008f1","calc":450.428684699365,"distanceAvg":439.0893680930295,"distanceErr":11.339316606335501,"distance2":442.0608186128195,"distanceRng2":1.4075291935847076,"mapShowData":true,"distance1":436.1179175732395,"distanceRng1":4.691763978615825,"altErr":5.942901039580022},{"key":"900007cc_900008f1","timestamp":"2020-03-21 13:20:32","anchor1":"900007cc","anchor2":"900008f1","calc":813.0006150059174,"distanceAvg":796.171704898846,"distanceErr":16.828910107071465,"distance2":804.3431938282683,"distanceRng2":7.272234166854446,"mapShowData":true,"distance1":788.0002159694235,"distanceRng1":7.975998763646771,"altErr":16.342977858844847},{"key":"9000078b_900007cc","timestamp":"2020-03-21 13:21:13","anchor1":"9000078b","anchor2":"900007cc","calc":1399.3176908765215,"distanceAvg":1394.8798866033753,"distanceErr":4.437804273146185,"distance2":1412.317609390564,"distanceRng2":7.741410564716034,"mapShowData":true,"distance1":1377.4421638161864,"distanceRng1":5.160940376477356,"altErr":34.875445574377636},{"key":"900005ce_900007cc","timestamp":"2020-03-21 13:21:13","anchor1":"900005ce","anchor2":"900007cc","calc":1262.533959939296,"distanceAvg":1253.3841046149541,"distanceErr":9.149855324341843,"distance2":1245.7599881497035,"distanceRng2":0.46917639786147447,"mapShowData":true,"distance1":1261.0082210802047,"distanceRng1":3.5188229839618543,"altErr":15.248232930501217},{"key":"900005ce_9000078b","timestamp":"2020-03-21 13:22:02","anchor1":"900005ce","anchor2":"9000078b","calc":564.0159572210702,"distanceAvg":549.1112333915696,"distanceErr":14.90472382950054,"distance2":522.9155511776315,"distanceRng2":2.11129379037709,"mapShowData":true,"distance1":575.3069156055078,"distanceRng1":3.2842347850310034,"altErr":52.39136442787628}]');
                freshAdjustAnchors();

                this.adjustAnchors.sort((a, b) => b.edgeNum - a.edgeNum);
                this.fixedAnchor = fixedAnchor = this.fixedAnchor || this.adjustAnchors[0].code;
                correctAnchors = this.adjustAnchors.filter(a => a.code !== fixedAnchor);

                adjustAnchorsMap[fixedAnchor].x = adjustAnchorsMap[fixedAnchor].ori_x;
                adjustAnchorsMap[fixedAnchor].y = adjustAnchorsMap[fixedAnchor].ori_y;
                correctAnchors.forEach(a => {
                    // adjustAnchorsMap[c.code].x = (i+1)*Math.random()*500;
                    // adjustAnchorsMap[c.code].y = (i+1)*Math.random()*500;
                    adjustAnchorsMap[a.code].x = adjustAnchorsMap[a.code].ori_x + Math.random() * 400;
                    adjustAnchorsMap[a.code].y = adjustAnchorsMap[a.code].ori_y + Math.random() * 400;
                });
                drawAdjustAnchors();
            },

            calibrateCoord(){
                if(!this.onlyCorrectAnchors){
                    this.$alert('请调整为只显示 可校准基站 再进行校准。', '提示');
                    return;
                }
                while(1){// recursively remove leaf anchors, restraint of which is insufficient.
                    var leaves = this.adjustAnchors.filter(a=>(a.edgeNum<2&&a.edgeNum>0));
                    if(leaves.length<1) break;

                    this.adjustAnchors = this.adjustAnchors.filter(a=>a.edgeNum>=2);
                    leaves.forEach(l=>{
                        this.disAnchors.forEach(e=>{
                            if(e.anchor1==l.code){
                                adjustAnchorsMap[e.anchor2].edgeNum--;
                            }else if(e.anchor2==l.code){
                                adjustAnchorsMap[e.anchor1].edgeNum--;
                            }
                        })
                    })
                }
                
                if(this.adjustAnchors.length<3){
                    this.$alert('互测距里不够', '提示');
                    return;
                }
                paper.clear();
                drawBackground();
                this.calcAnchorDistance();
            },
            getcalcNeedData(fixedAnchor,selectedAdjustAnchorsCode){
                var selectCodeArr = JSON.parse(JSON.stringify(selectedAdjustAnchorsCode));
                selectCodeArr.push(fixedAnchor);
                var disObj={};
                var adjustObj ={};
                var that = this;
                for(var i =0 ;i<selectCodeArr.length;i++){
                    for(var j=0;j<that.disAnchors.length;j++){
                        if(that.disAnchors[j].anchor1 == selectCodeArr[i]||that.disAnchors[j].anchor2== selectCodeArr[i]){
                            if(!disObj[that.disAnchors[j].key]){
                                disObj[that.disAnchors[j].key]={
                                    anchor1:that.disAnchors[j].anchor1,
                                    anchor2:that.disAnchors[j].anchor2,
                                    distanceAvg:that.disAnchors[j].distanceAvg,
                                    distanceErr:that.disAnchors[j].distanceErr
                                }
                            }
                        }
                    }
                    adjustObj[selectCodeArr[i]] = adjustAnchorsMap[selectCodeArr[i]];
                }
                return {disObj:disObj,adjustObj:adjustObj};
            },
            calcAnchorDistance:function () {
                var that = this;
                that.result.Gradient = '';
                that.result.Cycle = '';
                that.result.Deviation = '';
                if(!that.fixedAnchor){
                    that.$alert('请选择固定基站', '提示');
                    return;
                }
                var selectedAdjustAnchorsCode =[];
                for(var i=0;i<this.selectedAdjustAnchors.length;i++){
                    if(this.selectedAdjustAnchors[i].code != that.fixedAnchor) {
                        selectedAdjustAnchorsCode.push(this.selectedAdjustAnchors[i].code);
                    }
                }
                if(selectedAdjustAnchorsCode.length<2){
                    that.$alert('要调整的基站个数不得小于2个。', '提示');
                    return;
                }
                var dataObj = this.getcalcNeedData(that.fixedAnchor,selectedAdjustAnchorsCode);
                var data = {
                    // disAnchors:that.disAnchors,
                    fixedAnchor:that.fixedAnchor,
                    selectedAdjustAnchorsCode:JSON.stringify(selectedAdjustAnchorsCode),
                    disObj:dataObj.disObj,
                    adjustObj:dataObj.adjustObj
                    // adjustAnchorsMap:adjustAnchorsMap
                }
                this.$http.post('tplatform/anchorDistance/calcAnchorDistance',data).then(function (res) {
                    if(res.body.isOk) {
                        var data = res.body.data;
                        // adjustAnchorsMap = data.adjustAnchorsMap;
                        // this.$refs.adjustAnchorsTable.clearSelection();
                        var adjustKeyArr = ['edgeNum','ori_x','ori_y','x','y','z'];
                        var disKeyArr = ['altErr','calc','correctDist','correctErr','distance1','distance2','distanceAvg','distanceErr','distanceRng1','distanceRng2'];
                        for(var key in data.adjustAnchorsMap){
                            for(var inkey in data.adjustAnchorsMap[key]) {
                                if(!adjustAnchorsMap[key]) {
                                    adjustAnchorsMap[key] = data.adjustAnchorsMap[key];
                                    continue;
                                }
                                if(adjustKeyArr.indexOf(inkey)!=-1) {
                                    if(data.adjustAnchorsMap[key][inkey]) {
                                        adjustAnchorsMap[key][inkey] = data.adjustAnchorsMap[key][inkey] * 1;
                                    }
                                }
                            }
                        }

                        // freshAdjustAnchors();
                        that.$refs.adjustAnchorsTable.toggleRowSelection(that.adjustAnchors[0]);
                        that.$refs.adjustAnchorsTable.toggleRowSelection(that.adjustAnchors[0]);
                        var resDisObj = {};
                        for(var j=0;j<data.disAnchors.length;j++){
                            for(var mykey in data.disAnchors[j]) {
                                if (disKeyArr.indexOf(mykey) != -1) {
                                    if(data.disAnchors[j][mykey]) {
                                        data.disAnchors[j][mykey] = data.disAnchors[j][mykey] * 1;
                                    }
                                }
                            }
                            resDisObj[data.disAnchors[j].key] = data.disAnchors[j];
                        }
                        for(var m=0;m<that.disAnchors.length;m++){
                            if(resDisObj[that.disAnchors[m].key]){
                                for(var inkey in resDisObj[that.disAnchors[m].key]){
                                    that.disAnchors[m][inkey] = resDisObj[that.disAnchors[m].key][inkey];
                                }
                            }
                        }

                        that.disAnchors = JSON.parse(JSON.stringify(that.disAnchors));
                        that.everyCalc = JSON.parse(data.everyCalc);
                        that.composeAnalysisData();
                        var fixAn = null;
                        for(var l=0;l<that.adjustAnchors.length;l++){
                            if(that.adjustAnchors[l].code === that.fixedAnchor){
                                fixAn = that.adjustAnchors[l];
                            }
                        }
                        for(var n=0;n<that.everyCalc.length;n++){
                            if(fixAn) {
                                that.everyCalc[n].correctAnchors.push(fixAn);
                            }
                        }
                        console.log(that.everyCalc);
                        if(that.everyCalc.length>0) {
                            that.result.Cycle = that.everyCalc[that.everyCalc.length-1].Cycle;
                            that.result.Gradient = that.everyCalc[that.everyCalc.length-1].Gradient;
                            that.result.Deviation = that.everyCalc[that.everyCalc.length-1].Deviation;
                        }
                        // console.log("Cycle:", data.Cycle, " Gradient:", data.Gradient, " Std Deviation:", Math.sqrt(data.errSquareSum/data.restrainNum));
                        drawAdjustAnchors();
                    }else{
                        that.$alert(res.body.msg, '提示');
                        // console.log(res);
                    }
                },function (e) {
                    console.log(e);
                })
            },
            showEveryCalc(){
                var that = this;
                // paper.clear();
                // drawBackground();
                //如果正在显示则禁止重新显示
                if(that.showCalcFlag){
                    return;
                }
                that.showCalcFlag = true;
                that.timeEveryCalc(0);
            },
            stopShowEveryCalc(){
                this.showCalcFlag = false;
            },
            timeEveryCalc(num){
                var that = this;
                num=num?num:0;
                setTimeout(function () {
                    if(num<that.everyCalc.length&&that.showCalcFlag) {
                        that.drawEveryCalc(num);
                        num = num+1;
                        that.timeEveryCalc(num);
                    }else{
                        that.showCalcFlag = false;
                    }
                },1000)
            },
            drawEveryCalc(num){
                if(this.everyCalc[num]){
                    drawAnchors(this.everyCalc[num].correctAnchors.map(a=>({mac:a.code, x:a.x/100, y:a.y/100, z:a.z/100})));
                }
            },
            mirrorAnchor(){
                if(!this.fixedAnchor){
                    this.$alert("请先选择固定基站。", '提示');
                    return;
                }
                var fax = adjustAnchorsMap[this.fixedAnchor].x*1;
                // var seletMirrorAnchors = this.selectedAdjustAnchors.filter(a=>a.code!=this.fixedAnchor);
                // seletMirrorAnchors.forEach(a=>{a.x=a.x*1;a.x=fax*2-a.x});
                this.selectedAdjustAnchors.forEach(a=>{a.x=a.x*1;a.x=fax*2-a.x});
                // this.adjustAnchors = this.adjustAnchors.slice();
                this.$refs.adjustAnchorsTable.toggleRowSelection(this.adjustAnchors[0]);
                this.$refs.adjustAnchorsTable.toggleRowSelection(this.adjustAnchors[0]);
                drawAdjustAnchors();
            },
            moveAnchor(dir){
                var step = this.adjustStep;
                switch(dir){
                    case 'up':
                        this.selectedAdjustAnchors.forEach(a=>{a.y=a.y*1;a.y-=step});
                        break;
                    case 'down':
                        this.selectedAdjustAnchors.forEach(a=>{a.y=a.y*1;a.y+=step});
                        break;
                    case 'left':
                        this.selectedAdjustAnchors.forEach(a=>{a.x=a.x*1;a.x-=step});
                        break;
                    case 'right':
                        this.selectedAdjustAnchors.forEach(a=>{a.x=a.x*1;a.x+=step});
                        break;
                    default:
                        return;
                }
                // this.adjustAnchors = this.adjustAnchors.slice();
                this.$refs.adjustAnchorsTable.toggleRowSelection(this.adjustAnchors[0]);
                this.$refs.adjustAnchorsTable.toggleRowSelection(this.adjustAnchors[0]);
                drawAdjustAnchors();
            },
            rotateAnchor(dir){
                var t = this.adjustStep * Math.PI / 1800;
                var fa = this.fixedAnchor || this.adjustAnchors[0].code;
                var x0 = adjustAnchorsMap[fa].x*1;
                var y0 = adjustAnchorsMap[fa].y*1;
                switch(dir){
                    case 'ccw':
                        t = -t;
                    case 'cw':
                        break;
                    default:
                        return;
                }
                var cost = Math.cos(t);
                var sint = Math.sin(t);
                this.selectedAdjustAnchors.forEach(a=>{
                    var x = a.x*1, y=a.y*1;
                    a.x  = x * cost - y*sint -x0*cost+y0*sint+x0;
                    a.y  = x * sint + y*cost -x0*sint-y0*cost+y0;
                });
                // this.adjustAnchors = this.adjustAnchors.slice();
                this.$refs.adjustAnchorsTable.toggleRowSelection(this.adjustAnchors[0]);
                this.$refs.adjustAnchorsTable.toggleRowSelection(this.adjustAnchors[0]);
                drawAdjustAnchors();
            },
            calcMeatureData(data){
                for(var i=0;i<data.length;i++){
                    if(this.anchorsObj[data[i].refAnchor]&&this.anchorsObj[data[i].anchor]) {
                        var calc = UBIT.getDistance(this.anchorsObj[data[i].refAnchor], this.anchorsObj[data[i].anchor]);
                        data[i].calc = calc;
                        data[i].distanceErr = data[i].calc - data[i].distance;
                        data[i].key = data[i].refAnchor+'_'+data[i].anchor;
                    }
                }
            },
            /***
             *
             * @param data
             */
            dealMeatureData(data){
                var objData={};
                var disArr=[];
                for(var i=0;i<data.length;i++){
                    var key,refIndex;
                    if(data[i].refAnchor == data[i].anchor){
                        continue;
                    }
                    if(data[i].refAnchor>data[i].anchor){
                        refIndex = 2;
                        key = data[i].anchor+'_'+data[i].refAnchor;
                    }else{
                        refIndex = 1;
                        key = data[i].refAnchor+'_'+data[i].anchor;
                    }
                    if(objData[key]){
                        objData[key]['distanceArr'+refIndex].push(data[i].distance);
                    }else{
                        objData[key]={}
                        objData[key]['anchor1']=key.split('_')[0];
                        objData[key]['anchor2']=key.split('_')[1];
                        objData[key]['distanceArr1']=[];
                        objData[key]['distanceArr2']=[];
                        objData[key]['calc']=data[i].calc;
                        objData[key]['distanceArr'+refIndex].push(data[i].distance);
                    }
                }
                for(var key in objData){
                    var length1 = objData[key]['distanceArr1'].length;
                    if(length1>0) {
                        objData[key]['distanceArr1'].sort();
                        objData[key]['distanceRng1'] = objData[key]['distanceArr1'][length1 - 1] - objData[key]['distanceArr1'][0];
                        objData[key]['distance1'] = this.arrayAdd(objData[key]['distanceArr1']) / length1;
                    }

                    var length2 = objData[key]['distanceArr2'].length;
                    if(length2>0) {
                        objData[key]['distanceArr2'].sort();
                        objData[key]['distanceRng2'] = objData[key]['distanceArr2'][length2 - 1] - objData[key]['distanceArr2'][0];
                        objData[key]['distance2'] = this.arrayAdd(objData[key]['distanceArr2']) / length2;
                    }
                    if(length1>0&&length2>0) {
                        objData[key]['altErr'] = Math.abs(objData[key]['distance1'] - objData[key]['distance2']);
                        objData[key]['distanceAvg'] = (objData[key]['distance1'] + objData[key]['distance2']) / 2;
                        objData[key]['distanceErr'] = objData[key]['calc'] - objData[key]['distanceAvg'];
                    }else if(length1>0 && length2==0){
                        objData[key]['distanceAvg'] = objData[key]['distance1'];
                        objData[key]['distanceErr'] = objData[key]['calc'] - objData[key]['distanceAvg'];
                    }else if(length1==0&&length2>0){
                        objData[key]['distanceAvg'] = objData[key]['distance2'];
                        objData[key]['distanceErr'] = objData[key]['calc'] - objData[key]['distanceAvg'];
                    }else if(length2==0&&length1==0){
                        continue;
                    }
                    objData[key]['key']=key;
                    objData[key]['mapShowData'] = true;
                    delete objData[key]['distanceArr1'];
                    delete objData[key]['distanceArr2'];
                    disArr.push(objData[key]);
                }
                this.removeDisLineAndKeepShowFlag(objData);
                this.disAnchors = disArr;
                this.composeAnalysisData();
                drawDisLine();
                this.updateAdjustAnchors();
            },
            removeDisLineAndKeepShowFlag(objData){
                for(var i=0;i<this.disAnchors.length;i++){
                    var edge = this.disAnchors[i];
                    var path_id = 'PATH_' + edge.key;
                    var text_id = 'TEXT_' + edge.key;
                    var path_obj = paper.getById(path_id);
                    var text_obj = paper.getById(text_id);
                    if(path_obj){
                        path_obj.remove();
                    }
                    if(text_obj){
                        text_obj.remove();
                    }
                    if(objData[edge.key]) {
                        objData[edge.key].mapShowData = edge.mapShowData;
                    }
                }
            },
            hideAllLine(){
                for(var i=0;i<this.disAnchors.length;i++){
                    var edge = this.disAnchors[i];
                    edge.mapShowData = false;
                    var path_id = 'PATH_' + edge.key;
                    var text_id = 'TEXT_' + edge.key;
                    var path_obj = paper.getById(path_id);
                    var text_obj = paper.getById(text_id);
                    if(path_obj){
                        path_obj.hide();
                    }
                    if(text_obj){
                        text_obj.hide();
                    }
                    this.composeAnalysisData();
                }
            },
            getTheMap(callback){
                if(!this.currentMap) return;
                var mapId = this.currentMap.split('_')[1];
                $.ajax({
                    url:UBIT.host+ '/model/get?model=map&id='+mapId,
                    method:'get',
                    async: false,
                    success: function(r){
                        callback(r);
                    }
                });
            },
            getAllAnchors(callback){
                var that = this;
                $.ajax({
                    url:ME.host+ '/project/anchor/list?mapId='+ that.currentMap.split('_')[1],
                    method:'get',
                    success: function(r){
                        callback(r);
                    }
                });
            },
            composeAnalysisData(){
                for(var j=0;j<this.disAnchors.length;j++){
                    var one = this.disAnchors[j];
                   if(this.cfgAnchorDistancesObj[one.anchor1]&&this.cfgAnchorDistancesObj[one.anchor1][one.anchor2]){
                       one.cfgDistance1 = this.cfgAnchorDistancesObj[one.anchor1][one.anchor2]*100;
                   }else{
                       delete one.cfgDistance1;
                   }
                    if(this.cfgAnchorDistancesObj[one.anchor2]&&this.cfgAnchorDistancesObj[one.anchor2][one.anchor1]){
                        one.cfgDistance2 = this.cfgAnchorDistancesObj[one.anchor2][one.anchor1]*100;
                    }else{
                        delete one.cfgDistance2;
                    }
                }
                loadTable('analysisTable',this.disAnchors);
            },
            updateAdjustAnchors(){
                adjustAnchorsMap = {};
                for(var i=0;i<this.disAnchors.length;i++){
                    var key = this.disAnchors[i].key;
                    if(key){
                        var code1 = key.split('_')[0];
                        var code2 = key.split('_')[1];
                        var anchor1 = this.getAnchor(code1);
                        var anchor2 = this.getAnchor(code2);
                        if(!anchor1 || !anchor2){
                            continue;
                        }
                        adjustAnchorsMap[anchor1.code] = adjustAnchorsMap[anchor1.code] ||
                            { edgeNum: 0, code:anchor1.code, ori_x: anchor1.x, ori_y: anchor1.y, x: anchor1.x, y: anchor1.y, z: anchor1.z };
                        adjustAnchorsMap[anchor1.code].edgeNum = adjustAnchorsMap[anchor1.code].edgeNum + 1;
                        adjustAnchorsMap[anchor2.code] = adjustAnchorsMap[anchor2.code] ||
                            { edgeNum: 0, code:anchor2.code, ori_x: anchor2.x, ori_y: anchor2.y, x: anchor2.x, y: anchor2.y, z: anchor2.z };
                        adjustAnchorsMap[anchor2.code].edgeNum = adjustAnchorsMap[anchor2.code].edgeNum + 1;
                    }
                }
                freshAdjustAnchors();
            },
            getAnchor(code){
                for(var i=0;i<this.anchors.length;i++){
                    if(this.anchors[i].code == code){
                        return this.anchors[i];
                    }
                }
                return null;
            },
            arrayAdd(arr){
                return arr.reduce(function(prev, curr, idx, arr){
                    return prev + curr;
                });
            },
            showOrHide(){
                var datas = $('#analysisTable').bootstrapTable('getSelections');
                for(var i=0;i<datas.length;i++) {
                    var row = datas[i];
                    var path_id = 'PATH_' + row.key;
                    var text_id = 'TEXT_' + row.key;
                    if (row.mapShowData) {
                        row.mapShowData = false;
                        var pathObj = paper.getById(path_id);
                        var textObj = paper.getById(text_id);
                        if(pathObj){
                            pathObj.hide();
                        }
                        if(textObj){
                            textObj.hide();
                        }
                    } else {
                        row.mapShowData=true;
                        var pathObj = paper.getById(path_id);
                        var textObj = paper.getById(text_id);
                        if(pathObj){
                            pathObj.show();
                        }
                        if(textObj){
                            textObj.show();
                        }
                    }
                }
                this.composeAnalysisData()
            },
            delAnalysis(){
                var a = $('#analysisTable').bootstrapTable('getSelections');
                var keyArry = [];
                for(var i=0;i<a.length;i++){
                    for(var j=0;j<this.disAnchors.length;j++){
                        if(a[i].key == this.disAnchors[j].key){
                            // this.disAnchors.splice(j,1);
                            keyArry.push(a[i].key);
                            let reverseKey = a[i].anchor2+'_'+a[i].anchor1;
                            keyArry.push(reverseKey);
                            break;
                        }
                    }
                }
                // this.composeAnalysisData()
                this.toDelMeaureDis(keyArry);
            },
            toDelMeaureDis(keyArry){
                var ids=[];
                var dataArr = $('#anchorMeasureTable').bootstrapTable('getData');
                for(var i=0;i<keyArry.length;i++){
                    for(var j=0;j<dataArr.length;j++){
                        if(keyArry[i] == dataArr[j].key){
                            ids.push(dataArr[j].id);
                        }
                    }
                }
                this.postDelMeasureDis(ids);
            },
            ajaxUpdateCfg(data,cfgDisValObj,key){
                var that =this;
                $.ajax({
                    url:UBIT.host+ '/super/anchor/updateCfg/',
                    method:'post',
                    data:data,
                    async: false,
                    success: function(r){
                        if(r.isOk){
                            if(cfgDisValObj&&key){
                                that.cfgAnchorDistancesObj[key] = cfgDisValObj;
                            }
                        }else{
                            that.$alert('有数据配置失败', '提示');
                        }
                    },
                    error:function (e) {
                        that.$alert('有数据配置失败', '提示');
                    }
                });
            },
            addAnchorCfg(){
                var that = this;
                var a = $('#analysisTable').bootstrapTable('getSelections');
                if(a.length>0) {
                    that.$confirm("地图中添加基站间测距配置？", '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        that.addAnchorCfgBtnDisable = true;
                        var obj={};
                        for(var i=0;i<a.length;i++){
                            if(a[i].distanceAvg) {
                                if (obj[a[i].anchor1]) {
                                    obj[a[i].anchor1][a[i].anchor2] = Math.round(a[i].distanceAvg)/100 //换算为米保留2位小数
                                } else {
                                    obj[a[i].anchor1] = {};
                                    obj[a[i].anchor1][a[i].anchor2] = Math.round(a[i].distanceAvg)/100
                                }
                            }
                            if(a[i].distanceAvg) {
                                if (obj[a[i].anchor2]) {
                                    obj[a[i].anchor2][a[i].anchor1] = Math.round(a[i].distanceAvg)/100
                                } else {
                                    obj[a[i].anchor2] = {};
                                    obj[a[i].anchor2][a[i].anchor1] = Math.round(a[i].distanceAvg)/100
                                }
                            }
                        }
                        that.getAllAnchors(function (r) {
                            for(var key in obj){
                                for(var j=0;j<r.length;j++){
                                    if(r[j].code == key){
                                        r[j].cfg = r[j].cfg||"[]";
                                        var cfgArr = JSON.parse(r[j].cfg);
                                        var hasCfgDisFlag = false;
                                        for(var m=0;m<cfgArr.length;m++){
                                            if(cfgArr[m].key == "cfg_anchor_distances"){
                                                hasCfgDisFlag = true;
                                                var cfgDisValObj = JSON.parse(cfgArr[m].value);
                                                for(var inkey in obj[key]){
                                                    cfgDisValObj[inkey] = obj[key][inkey];
                                                }
                                                cfgArr[m].value = JSON.stringify(cfgDisValObj);
                                                break;
                                            }
                                        }
                                        if(!hasCfgDisFlag){
                                            var cfgAnchorsDistanceObj = {
                                                "key":"cfg_anchor_distances",
                                                "value":JSON.stringify(obj[key]),
                                                "desc":"到其他基站的飞行距离米{\"900007be\":8.43,\"900008f1\":5.74}"
                                            };
                                            cfgArr.push(cfgAnchorsDistanceObj);
                                        }
                                        if(hasCfgDisFlag){
                                            that.ajaxUpdateCfg({ids:[r[j].id],cfg:JSON.stringify(cfgArr)},cfgDisValObj,key);
                                        }else{
                                            that.ajaxUpdateCfg({ids:[r[j].id],cfg:JSON.stringify(cfgArr)},obj[key],key);
                                        }
                                        break;
                                    }
                                }
                            }
                            that.composeAnalysisData();
                            that.addAnchorCfgBtnDisable = false;
                        });
                    }).catch(() => {

                    });
                }
            },
            forwardDis(){
                var that = this;
                var a = $('#analysisTable').bootstrapTable('getSelections');
                var anchorList =[];
                var rowsObj={};
                var rows =[]
                for(var i=0;i<a.length;i++){
                    var obj = {
                        source: a[i].anchor1,
                        target: a[i].anchor2
                    };
                    anchorList.push(obj);
                    for(var j=0;j<that.anchors.length;j++){
                        if(a[i].anchor2 == that.anchors[j].code){
                            if(!rowsObj[a[i].anchor2]){
                                rowsObj[a[i].anchor2]=that.anchors[j];
                                rows.push(that.anchors[j]);
                            }
                        }
                    }
                }
                that.forwardDisBtnDisable = true;
                rangeDistance(anchorList, rows);
            },
            reverseDis(){
                var that = this;
                var a = $('#analysisTable').bootstrapTable('getSelections');
                var anchorList =[];
                var rowsObj={};
                var rows =[]
                for(var i=0;i<a.length;i++){
                    var obj = {
                        source: a[i].anchor2,
                        target: a[i].anchor1
                    };
                    anchorList.push(obj);
                    for(var j=0;j<that.anchors.length;j++){
                        if(a[i].anchor1 == that.anchors[j].code){
                            if(!rowsObj[a[i].anchor2]){
                                rowsObj[a[i].anchor2]=that.anchors[j];
                                rows.push(that.anchors[j]);
                            }
                        }
                    }
                }
                that.reverseDisBtnDisable = true;
                rangeDistance(anchorList, rows);
            },
            delAnchorCfg(){
                var that = this;
                var a = $('#analysisTable').bootstrapTable('getSelections');
                if(a.length>0) {
                    that.$confirm("地图中删除基站间测距配置？", '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        that.delAnchorCfgBtnDisable = true;
                        var obj={};
                        for(var i=0;i<a.length;i++){
                            if(a[i].distanceAvg) {
                                if (obj[a[i].anchor1]) {
                                    obj[a[i].anchor1][a[i].anchor2] = Math.round(a[i].distanceAvg)/100 //换算为米保留2位小数
                                } else {
                                    obj[a[i].anchor1] = {};
                                    obj[a[i].anchor1][a[i].anchor2] = Math.round(a[i].distanceAvg)/100 //换算为米保留2位小数
                                }
                            }
                            if(a[i].distanceAvg) {
                                if (obj[a[i].anchor2]) {
                                    obj[a[i].anchor2][a[i].anchor1] = Math.round(a[i].distanceAvg)/100 //换算为米保留2位小数
                                } else {
                                    obj[a[i].anchor2] = {};
                                    obj[a[i].anchor2][a[i].anchor1] = Math.round(a[i].distanceAvg)/100 //换算为米保留2位小数
                                }
                            }
                        }
                        that.getAllAnchors(function (r) {
                            for(var key in obj){
                                for(var j=0;j<r.length;j++){
                                    if(r[j].code == key){
                                        r[j].cfg = r[j].cfg||"[]";
                                        var hasCfgDisFlag = false;
                                        var cfgArr = JSON.parse(r[j].cfg);
                                        for(var m=0;m<cfgArr.length;m++){
                                            if(cfgArr[m].key == "cfg_anchor_distances"){
                                                hasCfgDisFlag = true;
                                                var cfgDisValObj = JSON.parse(cfgArr[m].value);
                                                for(var inkey in obj[key]){
                                                    delete cfgDisValObj[inkey];
                                                }
                                                cfgArr[m].value = JSON.stringify(cfgDisValObj);
                                                break;
                                            }
                                        }
                                        if(hasCfgDisFlag) {
                                            that.ajaxUpdateCfg({ids: [r[j].id], cfg: JSON.stringify(cfgArr)},cfgDisValObj,key);
                                        }
                                        break;
                                    }
                                }
                            }
                            that.composeAnalysisData();
                            that.delAnchorCfgBtnDisable = false;
                        });
                    }).catch(() => {

                    });
                }
            },
        },
    });
}

function drawAdjustAnchors(){
    drawAnchors(ME.vm.adjustAnchors.map(a=>({mac:a.code, x:a.x/100, y:a.y/100, z:a.z/100})));
}

function freshAdjustAnchors(){
    for(var key in ME.vm.anchorsPosObj){
        if(adjustAnchorsMap[key]){
            ME.vm.anchorsPosObj[key]=adjustAnchorsMap[key];
        }
    }
    if(ME.vm.onlyCorrectAnchors) {
        ME.vm.adjustAnchors = Object.values(ME.vm.anchorsPosObj).filter(a => a.edgeNum >= 2);
    }else{
        ME.vm.adjustAnchors = Object.values(ME.vm.anchorsPosObj).filter(a => a.edgeNum >= 0);
    }
    // ME.vm.adjustAnchors = Object.values(adjustAnchorsMap).filter(a=>a.edgeNum>=2);
}

function drawDisLine(key) {
    for(var i=0;i<ME.vm.disAnchors.length;i++){
        var edge = ME.vm.disAnchors[i];
        if(key && edge.key !== key) continue;

        var color = 'green'
        if(Math.abs(edge['distanceErr'])<10){
            color = 'green';
        }else if(10<=Math.abs(edge['distanceErr']) && Math.abs(edge['distanceErr'])<=20){
            // color = 'hotpink';
            color = 'orange';
        }else{
            color = 'red'
        }
        var path_id = 'PATH_' + edge.key;
        var text_id = 'TEXT_' + edge.key;
        var path_obj = paper.getById(path_id);
        var text_obj = paper.getById(text_id);
        if(path_obj){
            path_obj.remove();
        }
        if(text_obj){
            text_obj.remove();
        }
        var refAnchor = ME.vm.anchors.filter(a=>a.code === edge.anchor1)[0];
        var anchor = ME.vm.anchors.filter(a=>a.code === edge.anchor2)[0];
        if(!refAnchor || ! anchor)return;
        var path = paper.path('M'+((refAnchor.x+ME.map.origin_x)/100*zoom +' '+ (refAnchor.y+ME.map.origin_y)/100*zoom)+'L'+((anchor.x+ME.map.origin_x)/100*zoom +' '+ (anchor.y+ME.map.origin_y)/100*zoom) +'Z')
            .attr({'stroke':color,'stroke-dasharray':'--..','fill':color});
        path.id = path_id;
        var deg = Math.atan((refAnchor.y-anchor.y)/(refAnchor.x-anchor.x))*180/Math.PI;
        var textx = ((refAnchor.x + ME.map.origin_x)/100  * zoom + (anchor.x + ME.map.origin_x)/100  * zoom) / 2+5*Math.sin(Math.PI/180*deg);
        var texty = ((refAnchor.y + ME.map.origin_y)/100  * zoom + (anchor.y + ME.map.origin_y)/100  * zoom) / 2-5*Math.cos(Math.PI/180*deg);
        var textWord = edge.calc.toFixed(0) +'('+edge.distanceErr.toFixed(0)+')';
        var text = paper.text(textx, texty, textWord).attr('fill', color);
        // var text = paper.text(textx, texty, textWord).attr('fill', color).attr('font-size',5);
        text.id = text_id;
        text.rotate(deg,textx,texty);
        if(edge.mapShowData === false){
            text.hide();
            path.hide();
        }
        if(edge.key === key) return;
    }
}

var Max_Range_Time = 7;
function rangeDistance(anchorList, rows, counter,callBack,anRows,num){
    if (!counter) {
      counter = 0;
      for (var i = 0; i < rows.length; i++) {
        delete rows[i]['distanceErr'];
        delete rows[i]['distanceAvg'];
        delete rows[i]['distanceRng'];
        for (var j = 1; j <= Max_Range_Time; j++) {
          delete rows[i]['distance' + j];
        }
      }
    }

    ME.vm.$http.post('super/anchor/getListAnchorsDistance', {anchorList:anchorList}).then(function (res) {
        var result = res.body;
        counter++ ;
        var datas =[];
        for(var i=0;i<result.length;i++){
            var t = result[i];
            if(!t.distance) {
                console.warn('测距失败：'+ t.target);
                continue;
            }

            for(var j=0;j<rows.length;j++){
                var r = rows[j];
                if(t.target == r.code){
                    r['distance'+ counter] = t.distance * 100;
                    var obj={};
                    obj.mapId = ME.vm.currentMap.split('_')[1];
                    obj.refAnchor = t.source;
                    obj.anchor = t.target;
                    obj.calc = (r.calc*1).toFixed(2)*1;
                    obj.distance = (t.distance*100).toFixed(2)*1;
                    obj.distanceErr = (t.distance*100 - r.calc*1).toFixed(2)*1;
                    datas.push(obj);
                    break;
                }
            }
        }
        ME.vm.saveAnchorMeasure(datas);
        //refresh table
        loadTable('anchorTable', rows)

        if(counter >= Max_Range_Time) {

            for(var j=0;j<rows.length;j++){
                var r = rows[j];
    
                var distances = [];
                for(var i=1;i<=Max_Range_Time;i++){
                    if(r['distance'+ i]){
                        distances.push({idx:'distance'+ i, distance:r['distance'+ i]});
                    }
                }
    
                distances = distances.sort(function (a, b) {
                    return a.distance - b.distance;
                });
    
                var sum = 0;
                var validNum = distances.length -2;
                for(var i=1;i<distances.length-1;i++){
                    var dis = distances[i].distance;
                    sum += dis;
                }
    
                if(validNum>0){
                    r['distanceAvg'] = sum/validNum;
                    r['distanceRng'] = Math.abs(distances[1].distance - distances[validNum+1].distance);
                    r['distanceErr'] = r.calc - r.distanceAvg;
                    // saveAndDrawDis(ME.vm.refAnchor,r);
                }
            }
            if(callBack && Object.prototype.toString.call(callBack)=="[object Function]"){
                num = num+1;
                callBack(anRows,num);
            }
            //refresh table
            loadTable('anchorTable', rows);
            ME.vm.rangeLoading = false;
            ME.vm.forwardDisBtnDisable = false;
            ME.vm.reverseDisBtnDisable = false;
            return;
        }

        setTimeout(function () {
            rangeDistance(anchorList, rows, counter,callBack,anRows,num)
        },500);


    });


}



function selects(tableId, vm) {
    var a = $('#' + tableId).bootstrapTable('getSelections');
    if (!a || a.length < 1) {
        vm.$alert('请选择被测距基站！', '提示', {
            confirmButtonText: '确定'
        });
        return false;
    }
    return a;
}

function selectEditAnchor(tableId, vm) {
    var a = $('#' + tableId).bootstrapTable('getSelections');
    if (!a || a.length < 1) {
        vm.$alert('请选择要修改位置的基站！', '提示', {
            confirmButtonText: '确定'
        });
        return false;
    }
    return a;
}

function refreshTable(tableId) {
    $('#' + tableId).bootstrapTable('refresh');
}

function loadTable(tableId, data) {
    $('#' + tableId).bootstrapTable('load', data);
}

function getTableRows(tableId) {
    return $('#' + tableId).bootstrapTable('getData');
}
function disAnalysisTable() {
    $('#analysisTable').bootstrapTable({
        data:ME.vm.disAnchors,
        search:true,
        showRefresh:true,
        idField:'id',
        uniqueId:'id',
        clickToSelect:true,
        singleSelect:false,
        sortable:true,
        striped:true,
        showColumns:true,
        sortName:'id',
        sortOrder:'desc',
        pagination:true,
        pageSize:10,
        pageList:[2, 10, 25, 50, 100, 200],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#analysisTableToolbar',
        columns:[
            {checkbox: true,  width: '1%'},
            {field: 'anchor1', title: '基站1', width: '5%', sortable: true, searchable: true},
            {field: 'anchor2', title: '基站2', width: '5%', sortable: true, searchable: true},
            {field: 'calc', title: '设定', width: '6%', sortable: true, searchable: true , formatter: function(v){return v&&v.toFixed(2);} },
            {field: 'distanceErr', title: '误差', width: '6%', sortable: true, searchable: true ,
                formatter: function (value, row, index) {
                    if(Math.abs(value)>20){
                        return '<font style="color:red">'+value.toFixed(2);+'</font>';
                    }else if(Math.abs(value)>10){
                        return '<font style="color:hotpink">'+value.toFixed(2);+'</font>';
                    }else{
                        if(!value) return '';
                        return '<font style="color:green">'+value.toFixed(2);+'</font>';
                    }
                }
            },
            {field: 'distanceAvg', title: '测量', width: '6%', sortable: true, searchable: true , formatter: function(v){return v&&v.toFixed(2);} },
            {field: 'correctDist', title: '校准后', width: '6%', sortable: true, searchable: true , formatter: function(v){return v&&v.toFixed(2);} },
            {field: 'correctErr', title: '误差', width: '6%', sortable: true, searchable: true ,
                formatter: function (value, row, index) {
                    if(Math.abs(value)>20){
                        return '<font style="color:red">'+value.toFixed(2);+'</font>';
                    }else if(Math.abs(value)>10){
                        return '<font style="color:hotpink">'+value.toFixed(2);+'</font>';
                    }else{
                        if(!value) return '';
                        return '<font style="color:green">'+value.toFixed(2);+'</font>';
                    }
                }
            },
            {field: 'distance1', title: '正向', width: '6%', sortable: true, searchable: true , formatter: function(v){return v&&v.toFixed(2);} },
            {field: 'cfgDistance1', title: '正向配置', width: '6%', sortable: true, searchable: true , formatter: function(v){return v&&v.toFixed(2);} },
            {field: 'distanceRng1', title: '正波幅', width: '6%', sortable: true, searchable: true ,
                formatter: function (value, row, index) {
                    if(Math.abs(value)>20){
                        return '<font style="color:red">'+value.toFixed(2);+'</font>';
                    }else if(Math.abs(value)>10){
                        return '<font style="color:hotpink">'+value.toFixed(2);+'</font>';
                    }else{
                        if(!value) return '';
                        return '<font style="color:green">'+value.toFixed(2);+'</font>';
                    }
                }
            },
            {field: 'distance2', title: '反向', width: '6%', sortable: true, searchable: true , formatter: function(v){return v&&v.toFixed(2);} },
            {field: 'cfgDistance2', title: '反向配置', width: '6%', sortable: true, searchable: true , formatter: function(v){return v&&v.toFixed(2);} },
            {field: 'distanceRng2', title: '反波幅', width: '6%', sortable: true, searchable: true ,
                formatter: function (value, row, index) {
                    if(Math.abs(value)>20){
                        return '<font style="color:red">'+value.toFixed(2);+'</font>';
                    }else if(Math.abs(value)>10){
                        return '<font style="color:hotpink">'+value.toFixed(2);+'</font>';
                    }else{
                        if(!value) return '';
                        return '<font style="color:green">'+value.toFixed(2);+'</font>';
                    }
                }
            },
            {field: 'altErr', title: '正反差', width: '6%', sortable: true, searchable: true , formatter: function(v){return v&&v.toFixed(2);} },
            {field: 'mapShowData', title: '显示', width: '3%', sortable: true, searchable: true ,
                formatter: function (value, row, index) {
                    if(value){
                        return '<span style="color:green">是</span>';
                    }else{
                        return '<span  style="color:red">否</span>';
                    }
                }
            },
        ]
    });
}
function pageInit(){

    $('#anchorTable').bootstrapTable({
        url:ME.host+'/project/anchor/list?projectId='+ME.user.projectId,
        method:'get',
        queryParams:function(params){
            params.mapId = ME.vm.currentMap.split('_')[1]
            return params;
        },
        responseHandler:function(anchors){
            ME.vm.anchors = anchors;
            ME.vm.createAnchorObj(anchors);
            ME.vm.freshMeasuretable();
            return anchors;
        },
        search:true,
        showRefresh:true,
        idField:'id',
        uniqueId:'id',
        clickToSelect:true,
        singleSelect:false,
        sortable:true,
        striped:true,
        showColumns:true,
        sortName:'id',
        sortOrder:'desc',
        pagination:true,
        pageSize:10,
        pageList:[2, 10, 25, 50, 100, 200],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#projTagtoolbar',
        columns:[
            {checkbox: true,  width: '1%'},
            // {field: 'sourceId', title: 'ID', width: '2%', sortable: true, searchable: true},
            {field: 'code', title: '编码', width: '5%', sortable: true, searchable: true},
            {
                field: 'status', title: '状态', width: '3%', sortable: true, searchable: true,
                formatter: function (value, row, index) {
                    switch (value) {
                        case 'online' :
                            return '<font style="color:green">在线</font>';
                            break;
                        case 'offline' :
                            return '<font style="color:red">离线</font>';
                            break;
                        case 'disable' :
                            return '<font style="color:gray">禁用</font>';
                            break;
                        default:
                            return '未知';
                    }
                }
            },
            // {
            //     field: 'mapId', title: '所属地图', width: '6%', sortable: true, searchable: true,
            //     formatter: function (value, row, index) {
            //         if (!value) {
            //             return;
            //         }
            //         if (ME.pageType == 'super') {
            //             var maps = ME.vm.allMaps[row.projectId];
            //         } else {
            //             var maps = ME.vm.maps;
            //         }
            //         if (!maps) return '';
            //         if (maps) {
            //             for (var i = 0; i < maps.length; i++) {
            //                 if (value == maps[i].id) {
            //                     if(ME.pageType == 'project'){
            //                         var html = '<a href="javascript:void(0);" onclick=" UBIT.openMap('+value+');" >'+maps[i].cname + '('+value+')'+'</a>';
            //                         return '<div>'+html+'</div>';
            //                     }
            //                     return maps[i].cname + '('+value+')';
            //                 }
            //             }
            //         }
            //         return '';
            //     }
            // },

            {field: 'txDelay', title: 'txDelay', width: '6%', sortable: true, searchable: true},
            {field: 'rxDelay', title: 'rxDelay', width: '6%', sortable: true, searchable: true},

            {field: 'x', title: 'x(cm)', width: '3%', sortable: true, searchable: true},
            {field: 'y', title: 'y(cm)', width: '3%', sortable: true, searchable: true},
            {field: 'z', title: 'z(cm)', width: '3%', sortable: true, searchable: true},

            {field: 'calc', title: '计算距离(cm)', width: '6%', sortable: true, searchable: true , formatter: function(v){return v&&v.toFixed(2);} },

            {field: 'distanceAvg', title: '测距平均(cm)', width: '6%', sortable: true, searchable: true, formatter: function(v){return v&&v.toFixed(2);} },
            {field: 'distanceErr', title: '坐标误差(cm)', width: '6%', sortable: true, searchable: true,
                formatter: function (value, row, index) {
                    if(Math.abs(value)>10){
                        return '<font style="color:red">'+value.toFixed(2);+'</font>';
                    }else {
                        if(!value) return '';
                        return '<font style="color:green">'+value.toFixed(2);+'</font>';
                    }
                }
            },
            {field: 'distanceRng', title: '测距波幅(cm)', width: '6%', sortable: true, searchable: true,
                formatter: function (value, row, index) {
                    if(Math.abs(value)>10){
                        return '<font style="color:red">'+value.toFixed(2);+'</font>';
                    }else {
                        if(!value) return '';
                        return '<font style="color:green">'+value.toFixed(2);+'</font>';
                    }
                }
            },
            // {field: 'distance1', title: '测距1(cm)', width: '6%', sortable: true, searchable: true, formatter: function(v){return v&&v.toFixed(2);} },
            // {field: 'distance2', title: '测距2(cm)', width: '6%', sortable: true, searchable: true, formatter: function(v){return v&&v.toFixed(2);} },
            // {field: 'distance3', title: '测距3(cm)', width: '6%', sortable: true, searchable: true, formatter: function(v){return v&&v.toFixed(2);} },
            // {field: 'distance4', title: '测距4(cm)', width: '6%', sortable: true, searchable: true, formatter: function(v){return v&&v.toFixed(2);} },
            // {field: 'distance5', title: '测距5(cm)', width: '6%', sortable: true, searchable: true, formatter: function(v){return v&&v.toFixed(2);} },
            // {field: 'distance6', title: '测距6(cm)', width: '6%', sortable: true, searchable: true, formatter: function(v){return v&&v.toFixed(2);} },
            // {field: 'distance7', title: '测距7(cm)', width: '6%', sortable: true, searchable: true, formatter: function(v){return v&&v.toFixed(2);} },


        ]

    });

    $('#anchorMeasureTable').bootstrapTable({
        url:ME.host+'/tplatform/anchorDistance/list?projectId='+ME.user.projectId,
        method:'get',
        queryParams:function(params){
            params.mapId = ME.vm.currentMap.split('_')[1]
            return params;
        },
        search:true,
        showRefresh:true,
        idField:'id',
        uniqueId:'id',
        clickToSelect:true,
        singleSelect:false,
        sortable:true,
        striped:true,
        showColumns:true,
        sortName:'id',
        sortOrder:'desc',
        pagination:true,
        pageSize:10,
        pageList:[2, 10, 25, 50, 100, 200],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#measureAnchortoolbar',
        columns:[
            {checkbox: true,  width: '1%'},
            {field: 'id', title: 'ID', width: '2%', sortable: true, searchable: true,visible: false},
            {field: 'addTime', title: '时间', width: '10%', sortable: true, searchable: true,
                formatter: function (value, row, index) {
                   return moment(new Date(value).valueOf()).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {field: 'mapId', title: '地图ID', width: '2%', sortable: true, searchable: true},
            {field: 'key', title: 'key', width: '10%', sortable: true, searchable: true},
            {field: 'refAnchor', title: '参考基站', width: '5%', sortable: true, searchable: true},
            {field: 'anchor', title: '基站', width: '6%', sortable: true, searchable: true},
            {field: 'calc', title: '设定(cm)', width: '6%', sortable: true, searchable: true,
                // formatter: function (value, row, index) {
                //     console.log(ME.vm.anchorsObj[row.refAnchor]);
                // }
            },
            {field: 'distance', title: '测距(cm)', width: '6%', sortable: true, searchable: true, formatter: function(v){return v&&v.toFixed(2);} },
            {field: 'distanceErr', title: '误差(cm)', width: '6%', sortable: true, searchable: true, formatter: function(v){return v&&v.toFixed(2);} },
        ],
        responseHandler:function (res) {
            console.log(res);
            ME.vm.calcMeatureData(res);
            ME.vm.dealMeatureData(res);
            return res;
        }

    });
    disAnalysisTable()
}
