window.onload = function(){
    pageInit();
};


function pageInit(){
    ME.vm = new Vue({
        el:"#app",
        data:{
            anchorList:[],
            tagList:[],
            projects:[],
            project:"",
            tags:[],
            anchors:[],
            maps:[],
            map:"",
            get tag(){
                if(!this.project){
                    return "projectCode";
                }else{
                    var cname = "";
                    this.maps.forEach((value) => {
                       if(value.id === this.map){
                           cname = value.cname;
                       }
                    });
                    return this.project + ' --> ' + cname;
                }
            },
            get tagtag(){
                if(!this.project){
                    return "projectCode";
                }else{
                    return this.project;
                }
            }
        },
        methods:{
            initTagTable:function(){
                var self = this;
                $('#tagTable').bootstrapTable({
                    url:ME.host + '/super/unknownTagAnchor/tagList',
                    method:"get",
                    search: true,
                    showRefresh: true,
                    idField: 'id',
                    uniqueId: 'id',
                    sortStable:true,
                    sortable: true,
                    striped: true,
                    showColumns: true,
                    sortName: 'addTime',
                    sortOrder: 'desc',
                    pagination: true,
                    pageSize: 10,
                    pageList: [10, 25, 50, 100, 200],
                    sidePagination: 'client',
                    toolbarAlign: 'left',
                    toolbar: '#tagToolbar',
                    onRefresh:function(params){
                        self.tags = [];
                    },
                    responseHandler:function(res){
                        if(!res || !res.isOk){
                            console.error("error request");
                            return [];
                        }
                        var arr = res.data.map((value) => {
                            return {code:value};
                        });
                        return arr;
                    },
                    onDblClickRow: function (row, $element) {
                    },
                    onCheck: function (row) {
                        self.tags.push(row.code);
                    },
                    onCheckAll:function(rows){
                        self.tags = rows.map((value) => {
                            return value.code;
                        })
                    },
                    onUncheck:function(row){
                        self.tags = self.tags.filter((value) => {
                            return row.code !== value;
                        })
                    },
                    onUncheckAll:function(rows){
                        var macs = rows.map((value) => {
                            return value.code;
                        });
                        self.tags = self.tags.filter((value) => {
                            return !(macs.includes(value));
                        })
                    },
                    columns: [
                        { checkbox: true, width: '4%' },
                        { field: 'code', title: 'code', width: '10%', searchable: true, sortable: true },
                    ]
                })
            },
            initAnchorTable:function(){
                var self = this;
                $('#anchorTable').bootstrapTable({
                    url:ME.host + '/super/unknownTagAnchor/anchorList',
                    method:"get",
                    search: true,
                    showRefresh: true,
                    idField: 'id',
                    uniqueId: 'id',
                    sortStable:true,
                    sortable: true,
                    striped: true,
                    showColumns: true,
                    sortName: 'addTime',
                    sortOrder: 'desc',
                    pagination: true,
                    pageSize: 10,
                    pageList: [10, 25, 50, 100, 200],
                    sidePagination: 'client',
                    toolbarAlign: 'left',
                    toolbar: '#anchorToolbar',
                    onRefresh:function(params){
                        self.anchors = [];
                    },
                    responseHandler:function(res){
                        if(!res || !res.isOk){
                            console.error("error request");
                            return [];
                        }
                        var arr = res.data.map((value) => {
                            return {code:value};
                        });
                        return arr;
                    },
                    onDblClickRow: function (row, $element) {
                    },
                    onCheck: function (row) {
                        self.anchors.push(row.code);
                    },
                    onCheckAll:function(rows){
                        self.anchors = rows.map((value) => {
                            return value.code;
                        })
                    },
                    onUncheck:function(row){
                        console.log(row.code);
                        self.anchors = self.anchors.filter((value) => {
                            return row.code !== value;
                        })
                    },
                    onUncheckAll:function(rows){
                        var macs = rows.map((value) => {
                            return value.code;
                        });
                        self.anchors = self.anchors.filter((value) => {
                            return !(macs.includes(value));
                        })
                    },
                    columns: [
                        { checkbox: true, width: '4%' },
                        { field: 'code', title: 'code', width: '10%', searchable: true, sortable: true },
                    ]
                })
            },
            tagAddTo:function(){
                var self = this;
                if(!this.project){
                    return this.$alert("请选择目标项目","提示");
                }

                if(!this.tags || this.tags.length < 1){
                    return this.$alert("请至少选择一个标签","提示");
                }
                var projectCode = this.project;
                var macs = this.tags;
                var map = this.map;
                var data = {
                    projectCode,
                    macs,
                    map
                };
                this.$http.post(ME.host + "/super/unknownTagAnchor/tagAddTo",data).then((res) => {
                    if(res && res.body.isOk){
                        self.$message.success("添加成功");
                        $('#tagTable').bootstrapTable("refresh");
                    }else{
                        self.$alert("添加失败" + "</br>" + res.body.msg);
                    }
                })
            },
            anchorClean:function () {
                var self = this;
                this.$http.post(ME.host + "/super/unknownTagAnchor/markerClean",{type:'anchor'}).then((res) => {
                    if(res && res.body.isOk){
                        self.$message.success(res.body.msg);
                        $('#anchorTable').bootstrapTable("refresh");
                    }else{
                        self.$alert(res.body.msg);
                    }
                })
            },
            tagClean:function () {
                var self = this;
                this.$http.post(ME.host + "/super/unknownTagAnchor/markerClean",{type:'tag'}).then((res) => {
                    if(res && res.body.isOk){
                        self.$message.success(res.body.msg);
                        $('#tagTable').bootstrapTable("refresh");
                    }else{
                        self.$alert(res.body.msg);
                    }
                })
            },
            anchorAddTo:function(){
                var self = this;
                if(!this.project){
                    return this.$alert("请选择目标项目","提示");
                }
                if(!this.map){
                    return this.$alert("请选择目标地图","提示");
                }
                if(!this.anchors || this.anchors.length < 1){
                    return this.$alert("请至少选择一个基站","提示");
                }
                var projectCode = this.project;
                var macs = this.anchors;
                var map = this.map;
                var data = {
                    projectCode,
                    macs,
                    map
                };
                this.$http.post(ME.host + "/super/unknownTagAnchor/anchorAddTo",data).then((res) => {
                    if(res && res.body.isOk){
                        self.$message.success("添加成功");
                        $('#anchorTable').bootstrapTable("refresh");
                    }else{
                        self.$alert("添加失败" + res.body.msg,"添加失败");
                    }
                })
            },
            changeProj:function(){
                var self = this;
                if(!this.project){
                    return console.error('not select project');
                }
                var url = ME.host + '/map/list?projectCode=' + this.project;
                this.$http.get(url).then((res) => {
                    if(!res || !res.body){
                        return;
                    }
                    self.maps = res.body;
                })
            }
        },
        created:function(){
            var self = this;
            var projects = this.$http.get(ME.host + '/project/list');
            Promise.all([projects]).then((result) => {
                self.projects = result[0].body;
                self.initAnchorTable();
                self.initTagTable();
            })
        }
    })
}