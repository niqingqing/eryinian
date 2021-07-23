/**
 * Created by LiuTao on 2017/7/03 0028.
 */



$(function(){
    init();
});

function init(){
    vueInit();
}

function pageInit(){

    $('#historytable').bootstrapTable({
        url:ME.host+'/super/stillness/abnormalList',
        method:'get',
        queryParams:function(params){
            var timeSpan = ME.vm.timeRange();
            if(!timeSpan){
                return;
            }
            var searchParams = ME.vm.searchform;
            params.timeStart = timeSpan[0];
            params.timeEnd = timeSpan[1];
            if(searchParams.mapId>0) params.mapId = searchParams.mapId;
            if(searchParams.tagId>0) params.tagId = searchParams.tagId;
            return params;
        },
        // search:true,
        showRefresh:true,
        idField:'id',
        uniqueId:'id',
        clickToSelect:true,
        singleSelect:false,
        sortable:true,
        striped:true,
        showColumns:true,
        sortName:'time',
        sortOrder:'asc',
        pagination:true,
        pageSize:10,
        pageList:[10, 25, 50, 100, 200],
        sidePagination:'server',
        toolbarAlign:'left',
        toolbar:'#historytoolbar',
        responseHandler:function (res) {
            console.log(res);
            return res;
        },
        columns: [
            // {field: 'id',title: 'ID', width:'4%', sortable:true, searchable:true},
            {field: 'code',title: lang['tagId'],width:'6%', sortable:false,searchable:true,
                formatter:function(value, row, index){
                    if(value){
                        for(var i=0;i<ME.vm.tags.length;i++){
                            var tag = ME.vm.tags[i];
                            if(value==tag.code){
                                if(tag.alias) return tag.alias;
                                return tag.code;
                            }
                        }
                    }
                    return value;
                },
            },
            {field: 'code',title: lang['mac'],width:'6%', sortable:false, searchable:true,
            },
            {field: 'mapId',title: lang['mapId'],width:'6%', sortable:false, searchable:true,
                formatter:function(value, row, index){
                    var map = ME.vm.getEntity(value, 'maps');
                    return map.cname;
                },
            },
            {field: 'duration',title: '时长阈值',width:'6%', sortable:false, searchable:true},
            {field: 'distance',title: '距离阈值',width:'6%', sortable:false, searchable:true},
            {field: 'x',title: 'x(cm)',width:'6%', sortable:false, searchable:true,
                formatter:function(value, row, index){
                    return parseInt(value);
                },
            },
            {field: 'y',title: 'y(cm)',width:'6%', sortable:false, searchable:true,
                formatter:function(value, row, index){
                    return parseInt(value);
                },
            },
            // {field: 'z',title: 'z(cm)',width:'6%', sortable:false, searchable:true},
            {field: 'startTime',title: '开始时间',width:'15%', sortable:false, searchable:true},
            {field: 'time',title: lang['addTime'],width:'15%', sortable:true, searchable:true,
                formatter:function(value, row, index){
                    var date = new Date(value);
                    return date.toLocaleString();
                }
            },
        ]

    });

}

function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            maps : [],
            mapId:'0',
            X:'0',
            Y:'0',
            Z:'0',
            historyDatas:[],
            exportNow:false,
            historyBtnDisable :false,
            clearTableDisable:false,
            tags : [],
            searchform: {
                timespan : [new Date((new Date()).getTime()-3600 * 1000 * 24), new Date((new Date()).getTime()+3600 * 1000 * 24)],
                mapId : '',
                tagId : ''
            },
            formLabelWidth: '120px',
            pickerOptions:{
                shortcuts: [
                    {
                        text: lang['pickerOptions1'],
                        onClick(picker) {
                            var end = new Date();
                            var start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: lang['pickerOptions2'],
                        onClick(picker) {
                            var end = new Date();
                            var start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: lang['pickerOptions3'],
                        onClick(picker) {
                            var end = new Date();
                            var start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: lang['pickerOptions4'],
                        onClick(picker) {
                            var end = new Date();
                            var start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: lang['pickerOptions5'],
                        onClick(picker) {
                            var end = new Date();
                            var start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            },
        },
        created:function(){
            this.$http.get(ME.host+'/model/listBase?model=map').then(function(res){
                this.maps = res.body;
                this.$http.get(ME.host+'/model/listBase?model=tag').then(function(res){
                    this.tags = res.body;
                    pageInit();
                });
            });
        },
        methods:{
            search:function(){
                this.refresh();
            },
            getEntity:function(id,key){
                var datas = this[key];
                for(var i=0;i<datas.length;i++){
                    if(id == datas[i].id){
                        return datas[i];
                    }
                }
                return null;
            },
            timeRange:function(){
                var range = this.searchform.timespan;
                var span =  range[1].getTime() - range[0].getTime();

                if(span<1){
                    this.showTip(lang['timeRangeNote']);
                    return false;
                }else {
                    if(span>30*24*3600*1000){
                        this.showTip(lang['timeRangeNote2']);
                        return false;
                    }
                }
                var start = range[0].Format('yyyy-MM-dd hh:mm:ss');
                var end = range[1].Format('yyyy-MM-dd hh:mm:ss');
                return [start, end];
            },
            selectMap:function(mapId){
                this.selectMapFences = this.map_fences[mapId];
            },
            showTip:function(msg){
                this.$message({
                    showClose: true,
                    message: msg
                });
            },
            selectRows:function(){
                var a = $('#historytable').bootstrapTable('getSelections');
                if (!a || a.length<1){
                    ME.vm.$alert(lang['selectOne'], lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                    return false;
                }
                return a;
            },
            clearTable:function(){
                var self = this;
                var form = this.searchform;
                this.$confirm(lang['clearTableNote'],lang['prompt'],{ }).then(function() {
                    ME.vm.clearTableDisable = true;
                    var timeStart = form.timespan[0];
                    var timeEnd = form.timespan[1];
                    var url = ME.host+'/super/stillness/clearTable?timeStart='+timeStart + '&timeEnd=' + timeEnd;
                    if(form.tagId){
                        url += '&tagId' + form.tagId;
                    }

                    if(form.mapId){
                        url += '&mapId' + form.mapId;
                    }
                    ME.vm.$http.get(url).then(function(res){
                        ME.vm.clearTableDisable = false;
                        var result = res.body;
                        if(result.isOk){
                            this.refresh();
                            this.$alert(lang['clearSuccess'], lang['prompt']);
                        }else {
                            this.$alert(lang['clearFail']+result.msg, lang['prompt'], {
                                confirmButtonText: lang['confirm']
                            });
                        }
                    });
                }).catch(function (){  ME.vm.clearTableDisable = false;});
            },
            refresh:function(){
                $('#historytable').bootstrapTable('refresh');
            },
            resetForm:function(formName) {
                this.$refs[formName].resetFields()
            },
            clickExport:function () {
                if(this.exportNow){
                    return;
                }else{
                    this.exportNow =true;
                    this.fetchHistoryDatas();
                }
            },
            fetchHistoryDatas: function (theoffset,limit,tableId) {
                var offset = theoffset ? theoffset : 0;
                limit = limit ? limit : 2000;
                tableId = tableId ? tableId : "historytable";
                var self = this;
                var form = self.searchform;
                var url = ME.host+ "/super/stillness/abnormalList?sort=time&order=asc&offset=" +offset+ "&limit="+
                    limit + "&timeStart=" + form.timespan[0] + "&timeEnd=" + form.timespan[1];
                if(form.mapId>0) url += "&mapId=" + form.mapId;
                if(form.tagId>0) url += "&tagId=" + form.tagId;
                ME.vm.$http.get(url).then(function(res){
                    var result = res.body;
                    if(res.ok){
                        var nowLength = offset + result.rows.length
                        if(nowLength <= result.total && result.rows.length!==0) {
                            self.historyDatas = self.historyDatas.concat(result.rows);
                            result.rows = []
                            offset = offset + limit;
                            self.fetchHistoryDatas( offset, limit,tableId);
                        }else{
                            self.myExportCsv(tableId,true);
                            self.historyDatas = [];
                            self.exportNow =false;
                        }
                    }else {
                        self.exportNow =false;
                        this.$alert('fail', lang['prompt'], {
                            confirmButtonText: lang['confirm']
                        });
                    }
                });
            },
            myExportCsv:function(tableId, isNoSort){
                var viscolumns = $('#'+tableId).bootstrapTable('getVisibleColumns');
                var sourceDatas = this.historyDatas;
                var firstItem = [];
                for(var i=0;i<viscolumns.length;i++){
                    var col = viscolumns[i];
                    if(!col.field || !col.title) continue;
                    firstItem.push(col.title);
                }

                var datas = [];
                datas.push(firstItem);

                for(var i=0;i<sourceDatas.length;i++){
                    var data = sourceDatas[i];
                    var item = [];

                    for(var j=0;j<viscolumns.length;j++){
                        var col = viscolumns[j];
                        if(!col.field || !col.title) continue;
                        var value = data[col.field];
                        item.push(value);
                    }
                    item[item.length - 1] = new Date(item[item.length - 1]).toLocaleString()
                    if((this.searchform.tagId && this.searchform.mapId && item[0] == this.searchform.tagId && item[2] == this.searchform.mapId) || (this.searchform.tagId && !this.searchform.mapId && item[0] == this.searchform.tagId) || (!this.searchform.tagId && this.searchform.mapId && item[2] == this.searchform.mapId) || (!this.searchform.tagId && !this.searchform.mapId)){
                        datas.push(item)
                    }
                }
                return UBIT.exportCsv(datas, tableId+'_'+new Date().toLocaleString(), !isNoSort);
            }
        },
    });
}