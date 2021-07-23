$(function () {
    pageInit()
})

function pageInit() {
    ME.vm = new Vue({
        el: '#app',
        data: {
            settingList: [
                { mapId: 1, duration: 20 },
                { mapId: 2, duration: 30 }
            ],
            start:'06:00',
            end:'21:00',
            duration:2,
            maps: [],
            map: null,
            selectRow:null,
            periods:[],
            visiable:false,
            selectCodes:[],
            aggregateType:'police',
            typeList:[],
            aggregateType:'',
            distance:100
        },
        methods: {
            set:function(){
                var self = this;
                var periods = this.periods.join(',');
                var aggregateType = this.aggregateType;
                var distance = this.distance;
                if(!this.aggregateType){
                    return this.$alert('请选择聚集类型','提示');
                }
                if(!this.map){
                    return this.$alert('请选择地图','提示');
                }
                var url = ME.host + '/super/aggregate/addSetting?id=' + this.map + '&duration=' + this.duration + '&period=' + periods + '&aggregateType=' + aggregateType + '&distance=' + distance;
                this.$http.get(url).then(function(res){
                    this.periods = [];
                    if(res.body.isOk){
                        self.refreshTable();
                        return this.$message.success(res.body.msg)
                    }else{
                        return this.$message.error(res.body.msg)
                    }
                })
            },
            setAll:function(){
                var self = this;
                var periods = this.periods.join(',');
                var aggregateType = this.aggregateType;
                var distance = this.distance;
                if(!this.aggregateType){
                    return this.$alert('请选择聚集类型','提示');
                }
                var url = ME.host + '/super/aggregate/setAll?duration=' + this.duration + '&period=' + periods + '&aggregateType=' + aggregateType + '&distance=' + distance;
                this.$http.get(url).then(function(res){
                    this.periods = [];
                    var type = 'success';
                    if(!res.body.isOk){
                        type = 'error';
                    }
                    this.$message[type](res.body.msg);
                    self.refreshTable();
                })
            },
            addPeriod:function(){
                var start = this.start;
                var end = this.end;
                var period = start + '-' + end;
                if(!this.periods.includes(period)){
                    this.periods.push(period);
                }
            },
            refreshTable:function(){
                $('#table').bootstrapTable('refresh')
            },
            remove:function(){
                var self = this;
                if(!this.selectRow){
                    return this.$alert(lang['selectOne'])
                }
                var id = this.selectRow.id;
                var url = ME.host + '/super/aggregate/deleteSetting?id=' + id;
                this.$http.get(url).then(function(res){
                    var type = 'success';
                    if(!res.body.isOk){
                        type = 'error';
                    }
                    this.$message[type](res.body.msg);
                    self.refreshTable();
                })
            },
            removeAll:function(){
                var self = this;
                var url = ME.host + '/super/aggregate/deleteAllSetting'
                this.$http.get(url).then(function(res){
                    var type = 'success';
                    if(!res.body.isOk){
                        type = 'error';
                    }
                    this.$message[type](res.body.msg);
                    self.refreshTable();
                })
            },
            openSetType:function(){
                if(this.selectCodes.length < 1){
                    return this.$alert('请至少选择一行');
                }
                this.visiable = true;
            },
            setTypeCancel:function(){
                this.visiable = false;
            },
            setTypeCommit:function(){
                var self = this;
                var obj = {
                    codes:this.selectCodes,
                    type:this.aggregateType
                }
                var url = ME.host + '/super/aggregate/setAggregateType';
                this.$http.post(url,obj).then((res) => {
                    console.log(res);
                    if(res.body.isOk){
                        self.$message.success('设置成功');
                        self.selectCodes = [];
                        self.getTypeList();
                        $('#aggregateTypeTable').bootstrapTable('refresh');
                    }
                })
                this.visiable = false;
            },
            getTypeList:function(){
                var self = this
                this.$http.get(ME.host + '/super/aggregate/getAllAggregateTypes').then((res) => {
                    self.typeList = res.body.data;
                })
            }
        },
        mounted: function () {
            var self = this;
            this.$http.get(ME.host + '/super/aggregate/getAllAggregateTypes').then((res) => {
                self.typeList = res.body.data;
                self.$http.get(ME.host + '/super/map/list').then(function (res) {
                    self.maps = res.body;
                    initTable.call(self);
                    initTypeTable.call(self);
                })
            })
        }
    })
}

function initTable() {
    var self = this;
    $('#table').bootstrapTable({
        url: ME.host + '/super/aggregate/settingList',
        method: 'get',
        queryParams: function (params) {
            return params;
        },
        search: true,
        showRefresh: true,
        idField: 'id',
        uniqueId: 'id',
        clickToSelect: true,
        singleSelect: true,
        sortable: true,
        striped: true,
        showColumns: true,
        sortName: 'id',
        sortOrder: 'desc',
        pagination: true,
        pageSize: 10,
        pageList: [5, 10, 25, 50, 100, 200],
        sidePagination: 'client',
        toolbarAlign: 'left',
        toolbar: '#toolbar',
        onCheck:function(row){
            self.selectRow = row;
        },
        onDblClickRow: function (row, $element) {

        },
        columns: [
            { radio: true },
            { field: 'id', title: lang['map'], width: '19%', sortable: true, searchable: true,formatter:function(value,row,index){
                var text = '';
                self.maps.forEach((map) => {
                    if(map.id == value){
                        text = map.cname;
                    }
                })
                return text;
            }},
            { field: 'duration', title: lang['duration'], width: '19%', sortable: true, searchable: true },
            { field: 'period', title: "时间段", width: '19%', sortable: true, searchable: true },
            { field: 'aggregateType', title: "聚集类型", width: '19%', sortable: true, searchable: true },
            {field:'distance',title:'距离阈值(cm)',width: '19%', sortable: true, searchable: true },
            {field: 'upTime',title: lang['upTime'],width:'6%', sortable:true, searchable:true},
            {field: 'upUser',title: lang['upUser'],width:'6%', sortable:true, searchable:true},
        ]
    });
}

function initTypeTable(){
    var self = this;
    $('#aggregateTypeTable').bootstrapTable({
        url: ME.host + '/super/aggregate/tagAggregateTypeList',
        method: 'get',
        queryParams: function (params) {
            return params;
        },
        search: true,
        showRefresh: true,
        idField: 'id',
        uniqueId: 'id',
        clickToSelect: true,
        singleSelect: false,
        sortable: true,
        striped: true,
        showColumns: true,
        sortName: 'id',
        sortOrder: 'desc',
        pagination: true,
        pageSize: 10,
        pageList: [5, 10, 25, 50, 100, 200],
        sidePagination: 'client',
        toolbarAlign: 'left',
        toolbar: '#typeToolbar',
        onCheck:function(row){
            if(self.selectCodes.indexOf(row.sourceId) === -1){
                self.selectCodes.push(row.sourceId);
            }
        },
        onCheckAll:function(rows,$element){
            rows.forEach((row) => {
                if(self.selectCodes.indexOf(row.sourceId) === -1){
                    self.selectCodes.push(row.sourceId);
                }
            })
        },
        onUncheck:function(row){
            self.selectCodes = self.selectCodes.filter((value) => {
                return value !== row.sourceId;
            })
        },
        onUncheckAll:function(rows){
            self.selectCodes = self.selectCodes.filter((value) => {
                var flag = rows.some((val) => {
                    return val.sourceId === value;
                });
                return !flag;
            })
            console.log(self.selectCodes);
        },
        columns: [
            { checkbox: true },
            { field: 'code', title: '编码', width: '33%', sortable: true, searchable: true },
            { field: 'alias', title: '别名', width: '33%', sortable: true, searchable: true },
            { field: 'aggregateType', title: '聚集标签类型', width: '33%', sortable: true, searchable: true },
        ]
    });
}