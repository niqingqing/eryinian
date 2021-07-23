$(function () {
    init();
});

function init() {

ME.vm = new Vue({
    el: '#app',
    data() {
        return {
            title: '默认',
            dialogVisible: false,
            isAdd: false,
            tagCat: [],
            maps: [],
            _fences: {},
            fences: [],
            mapId: null,
            tagTypes: [],
            fenceId: null,
            selectId: null,
        }
    },
    methods: {
        add: function (e) {
            this.dialogVisible = true;
            this.isAdd = true;
            this.title = '添加';
            this.mapId = null;
            this.tagCat = [];
            this.fenceId = null;
        },
        update: function (e) {
            this.dialogVisible = true;
            this.isAdd = false;
            this.title = '修改';
        },
        remove: function (e) {
            var self = this;
            if (!this.selectId) {
                return this.$alert('请至少选中一行');
            }
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var url = ME.host + '/project/attendance/delete?id=' + self.selectId;
                this.$http.get(url).then((result) => {
                    location.reload();
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            })
        },
        selectMap: function (e) {
            this.fenceId = null;
            this.fences = this._fences[this.mapId];
            console.log(this.fences);
        },
        commit: function () {
            var self = this;
            var mapId = this.mapId;
            var fenceId = this.fenceId;
            var tagCat = this.tagCat.join(',') || '0';
            if (this.isAdd) {
                if (!mapId) {
                    return this.$message.error('请选择地图');
                }
                if (!fenceId) {
                    return this.$message.error('请选择区域');
                }
                this.$http.post(ME.host + '/project/attendance/add', { mapId, fenceId, tagCat }).then((res) => {
                    if (res.body.isOk) {
                        self.dialogVisible = false;
                        location.reload();
                    }
                })
            } else {
                var id = this.selectId;
                if (!id) {
                    return this.$alert('请至少选中一行');
                }
                this.$http.post(ME.host + '/project/attendance/update', { mapId, fenceId, tagCat, id }).then((res) => {
                    if (res.body.isOk) {
                        self.dialogVisible = false;
                        location.reload();
                    }
                })
            }
        },
        cancel: function () {
            this.dialogVisible = false;
        }
    },
    mounted: function () {
        var self = this;
        var urls = {
            map: ME.host + '/super/map/list',
            tagCat: ME.host + '/model/list?model=tag_category',
            fenceType: ME.host + '/model/list?model=fence_type'
        }
        var arr = [
            self.$http.get(urls.map),
            self.$http.get(urls.tagCat),
            self.$http.get(urls.fenceType)
        ]
        Promise.all(arr).then((result) => {
            result.forEach((res) => {
                if (res.url === urls.map) {
                    self.maps = res.body;
                }

                if (res.url === urls.tagCat) {
                    self.tagTypes = res.body;
                }

                if (res.url === urls.fenceType) {
                    var attendanceFenceTypeId;
                    res.body.forEach((value) => {
                        if (value.id === 4) {
                            attendanceFenceTypeId = value.id
                        }
                    })
                    self.$http.get(ME.host + '/model/list?model=fence').then((res) => {
                        var obj = {};
                        var fences = res.body.filter((value) => {
                            return value.ftypeId === attendanceFenceTypeId;
                        })
                        fences.forEach((value) => {
                            obj[value.mapId] = obj[value.mapId] || [];
                            obj[value.mapId].push(value);
                        })
                        self._fences = obj;
                        initTable.call(self);
                    })
                }
            })

        })
    }
});

};

function initTable() {
    var self = this;
    $('#attendance').bootstrapTable({
        data:[],
        queryParams:function(params){
            return params;
        },
        search:true,
        showRefresh:true,
        idField:'code',
        uniqueId:'code',
        clickToSelect:true,
        singleSelect:true,
        sortable:true,
        striped:true,
        showColumns:true,
        sortName:'code',
        sortOrder:'desc',
        pagination:true,
        pageSize:2,
        pageList:[2, 10, 25, 50, 100, 200],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'',
        onDblClickRow:function(row, $element){
        },
        onCheck:function(row){
        },
        columns:[
            {radio:true,width:'4%'},
            {field:'code',title:'code',width:'10%',searchable:true,sortable:true},
            {field:'cname',title:'别名',width:'10%',searchable:true,sortable:true},
            {field: 'tagCat',title: '标签组', width:'10%', searchable:true,sortable:true},
            {field: 'status',title:'状态',width:'10%',searchable:true,sortable:true,formatter:function(value,row,index){
                return value?'已到':'未到'; 
            }},
            {field: 'details',title: '详情', width:'40%', searchable:true,sortable:true,formatter:function(value,row,index){
                return value.map((val) => {
                    return val;
                }).join('</br>')
            }},
            {field: 'totalAttendees',title: '应到人数', width:'10%', searchable:true,sortable:true},
            {field: 'attendees',title: '实到人数', width:'10%', searchable:true,sortable:true},
            {field: 'absentee',title: '未到人数', width:'10%', searchable:true,sortable:true},
        ]
    })
    return;
    this.$http.get(ME.host + '/project/attendance/list').then((res) => {
        $('#attendance').bootstrapTable({
            // url: ME.host + '/project/attendance/list',
            // method: 'get',
            data:res.body,
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
            pageSize: 2,
            pageList: [2, 10, 25, 50, 100, 200],
            sidePagination: 'client',
            toolbarAlign: 'left',
            toolbar: '#projectAttendancetoolbar',
            onDblClickRow: function (row, $element) {
                self.update()
            },
            onCheck: function (row) {
                self.selectId = row.id;
                self.mapId = row.mapId;
                self.fenceId = row.fenceId;
                self.tagCat = row.tagCat.split(',').map((value) => {
                    return Number(value);
                });
            },
            columns: [
                { radio: true, width: '4%' },
                { field: 'id', title: 'id', width: '20%', sortable: true, searchable: true },
                {
                    field: 'mapId', title: '地图', width: '20%', sortable: true, searchable: true, formatter: function (value, row, index) {
                        self.maps.forEach((val) => {
                            if (val.id === value) {
                                value = val.cname
                            }
                        })
                        return value;
                    }
                },
                {
                    field: 'fenceId', title: '区域', width: '20%', sortable: true, searchable: true, formatter: function (value, row, index) {
                        if (!self._fences[row.mapId]) {
                            return value;
                        }
                        self._fences[row.mapId].forEach((val) => {
                            if (val.id === value) {
                                value = val.cname;
                            }
                        })
                        return value;
                    }
                },
                {
                    field: 'tagCat', title: '标签组', width: '20%', sortable: true, searchable: true, formatter: function (value, row, index) {
                        return value.split(',').map((val) => {
                            self.tagTypes.forEach((ele) => {
                                if(val == ele.id.toString()){
                                    val = ele.cname;
                                }
                            })
                            return val;
                        }).join(',');
                    }
                }
            ]
        })
    })
}