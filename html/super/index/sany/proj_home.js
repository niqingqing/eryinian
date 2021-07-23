/***
 *
 * 此首页为三一长沙的定制开发
 *
 *
 三一首页设计：
 1、按标签类型（人，叉车，定位）进行统计， +  人员求救 + 围栏报警（统计近7天，过滤特定类型4,5,6,7,8 ）
 2、在线数量，按标签类型进行统计（人，叉车）
 3、各类物资，按定位标签（物资标签）的分组统计
 4、人员日均在线时长，近一7天，所有人
 （约定一个围栏名称"statisticsOnline"，围栏大一些，内部报警，5min）
    获取这个围栏的7天的所有日志，按人，按天统计，天（凌晨-凌晨）  报警次数*5
 5、实时定位，嵌入地图
 6、报警明细
 7、当日入库数量、当日出库数量；  （约定一个围栏类型名称为"仓库区"，统计仓库区类型的所有围栏的出入库的总和，建议围栏大一些，且只建一个仓库区类型的电子围栏）
 8、地图上的，标签类型 选择显示

 *
 *
 *
 *
 *
 */



(function(){
    vueInit();
})();


function vueInit(){
    ME.vm = new Vue({
        el:'#container',
        data: Object.assign({
            enableMoreMonitor:true,
            enableHeartRate:true,
            enableAggregate:true,
            enableStillness:true,
            enableOutlier:true,
            enableAttendance:true,
            maps:[],
            imgPath:'',

            total:{
                people:0,
                forklift:0,
                material:0,
                fence:0,
                sos:0
            },
        },allChart),
        created:function(){
            this.getTagsByTypes();
            this.getAnchorLine();
            this.getInOutLib();
            this.getOnlineTime();
            this.loadMaps();
        },

        mounted:function(){
            // this.getAttendance();
            this.getSosAlter();
            this.getFenceAlter();
        },
        methods:{
            getTagsByTypes:function(){
                this.$http.post(ME.host+'/statistics/getTagsByTypes').then(function(res){
                    if(res.body.hasOwnProperty('isOk') && !res.body.isOk){
                        console.error(res.body.msg);return;
                    }
                    var result=res.body;
                    // number
                    this.total.people = result[1].total;
                    this.total.forklift = result[13].total;
                    this.total.material = result[5].total;
                    //online
                    this.chartTag_people.series[0].data=this.chartTag_people.series[1].data=result[1].online;
                    this.chartTag_people.yAxis.max=result[1].total;
                    var chart=Highcharts.chart('chartTag_people', this.chartTag_people);
                    /*forklift
                    */
                    this.chartTag_forklift.yAxis.max=result[13].total;
                    this.chartTag_forklift.series[0].data=this.chartTag_forklift.series[1].data=result[13].online;
                    Highcharts.chart('chartTag_forklift',this.chartTag_forklift);
                    /**
                     * material
                     */
                    this.materialNum.series[0].data=result[5].catData;
                    // this.materialNum.drilldown.series=result.drilldown;

                    this.setClumnColors('materialNum');
                    Highcharts.chart('materialNum', ME.vm.materialNum);

                })
            },
            getAnchorLine:function(){
                this.$http.get(ME.host+'/statistics/getBaseAnchorsByProj').then(function(res){
                    var result = res.body;
                    if(result.isOk){
                        this.chartAnchor.yAxis.max=result.data.total;
                        this.chartAnchor.series[0].data=this.chartAnchor.series[1].data=result.data.online;
                    }
                    Highcharts.chart('chartAnchor',this.chartAnchor);
                })
            },
            getOnlineTime:function(){
                this.$http.post(ME.host+'/statistics/getOnlineTime').then(function(res){
                    var result = res.body;
                    if(result.isOk){

                        this.statisticsOnline.series[0].data=result.data;
                        this.setClumnColors('statisticsOnline');
                    }
                    Highcharts.chart('statisticsOnline_chart', ME.vm.statisticsOnline);
                })
            },
            loadMaps:function(){
                this.$http.get(ME.host+'/map/list?projectCode='+ME.user.projectCode).then(function(res){
                    var result=res.body;
                    if(result&&result.length>0){
                        for(var i=0;i<result.length;i++){
                            var item=result[i];
                            item.imgPath=UBIT.getImgSrc('maps',item.filePath);
                        }
                    ME.vm.maps = res.body;
                    ME.vm.imgPath=ME.vm.maps[0].imgPath;
                    ME.vm.mapId=ME.vm.maps[0].id;
                    }
                })
            },
            changeMap:function (mapId) {
                mapId=mapId?mapId:this.mapId;
                if(!mapId) return;
                var path = UBIT.selfHost + '/map/map2d/svg/?map='+mapId;
                window.open(path);
            },
            getSosAlter:function(){
                $('#sos_chart').bootstrapTable({
                    url:ME.host+'/statistics/getSOSAlterData',
                    method:'post',
                    queryParams:function(params){
                        return params;
                    },
                    responseHandler:function(res){
                        ME.vm.total.sos=res.length;
                        return res;

                    },
                    search:true,
                    showRefresh:true,
                    clickToSelect:true,
                    singleSelect:false,
                    sortable:true,
                    striped:true,
                    showColumns:true,
                    sortOrder:'desc',
                    pagination:true,
                    pageSize:10,
                    pageList:[2, 10, 25, 50, 100, 200],
                    sidePagination:'client',
                    columns:[
                        // {field: 'tagSourceId',title: '标签id', width:'2%', sortable:true,  searchable:true},
                        {field: 'tag',title: '编码',width:'6%', sortable:true, searchable:true},
                        {field: 'tagAlias',title: '别名', width:'2%', sortable:true,  searchable:true},
                        {field: 'map', title: '地图', width:'5%', sortable:true, searchable:true}, 
                        // {field: 'anchor',title: '基站',width:'6%', sortable:true, searchable:true},
                        // {field: 'sosType',title: '报警类型',width:'6%', sortable:true, searchable:true},
                        {field: 'time',title: '报警时间',width:'6%', sortable:true, searchable:true},
                    ]
                })
            },
            getFenceAlter:function(){
                $('#fence_chart').bootstrapTable({
                    url:ME.host+'/statistics/getFenceAlterData',
                    method:'post',
                    queryParams:function(params){
                        return params;
                    },
                    responseHandler:function(res){
                        ME.vm.total.fence=res.length;
                        return res;

                    },
                    search:true,
                    showRefresh:true,
                    clickToSelect:true,
                    singleSelect:false,
                    sortable:true,
                    striped:true,
                    showColumns:true,
                    sortOrder:'desc',
                    pagination:true,
                    pageSize:10,
                    pageList:[2, 10, 25, 50, 100, 200],
                    sidePagination:'client',
                    columns:[
                        // {field: 'id',title: '报警id', width:'2%', sortable:true,  searchable:true},
                        // {field: 'tagSourceId',title: '标签id', width:'2%', sortable:true,  searchable:true},
                        {field: 'tag', title: '编码', width:'5%', sortable:true, searchable:true},
                        {field: 'fenceName',title: '触发围栏',width:'6%', sortable:true, searchable:true},
                        {field: 'inTime',title: '进入时间',width:'6%', sortable:true, searchable:true},
                        {field: 'outTime',title: '离开时间',width:'6%', sortable:true, searchable:true},
                    ]
                })
            },
            getInOutLib:function(){
                this.$http.post(ME.host+'/statistics/inOutLib').then(function(res){
                    var result = res.body;
                    if(result.isOk){

                        this.inOutLib.series[0].data=result.data;
                        this.setClumnColors('inOutLib');
                    }
                    Highcharts.chart('inOutLib_chart', ME.vm.inOutLib);
                })
            },
            setClumnColors:function(type){
                if(!this[type].series[0].data)return;

                if(this[type].series[0].data.length<10){
                    this[type].plotOptions.column.pointWidth=30;
                }
                var maxNum=0;
                for(var i=0;i<this[type].series[0].data.length;i++){
                    var item=this[type].series[0].data[i];
                    if(maxNum<item.y) maxNum=item.y;
                }
                var full=Math.ceil(maxNum/0.8);
                var colors=[];
                for(var j=0;j<this[type].series[0].data.length;j++){
                    var item=this[type].series[0].data[j];
                    var willColor=Math.ceil((item.y/full)*100);
                    // fillData.push(full-willColor);
                    if(willColor<25){
                        colors.push('#b2d8f1')
                    }else if(willColor<50){
                        colors.push('#8fcaf5')
                    }else if(willColor<75){
                        colors.push('#6abcf8')
                    }else{
                        colors.push('#42adfc')
                    }
                }
                this[type].colors=colors;
            },
            






   
        }
    })
};