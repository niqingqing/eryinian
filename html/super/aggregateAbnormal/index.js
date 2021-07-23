$(function(){
    pageInit()
})

function pageInit(){
    ME.vm = new Vue({
        el:'#app',
        data:{
            maps:{}
        },
        methods:{},
        mounted:function(){
            var self = this;
            this.$http.get(ME.host+'/super/map/list').then((res) => {
                res.body.forEach((value) => {
                    self.maps[value.id] = value;
                })
                initTable.call(self);
            })
        }
    })
}

function initTable(){
    var self = this;
    $('#table').bootstrapTable({
        url: ME.host + '/super/aggregate/abnormalList',
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
        toolbar: '',
        onDblClickRow: function (row, $element) {

        },
        columns: [
            { field: 'map', title: lang['map'], width: '8%', sortable: true, searchable: true,formatter:function(value,row,index){
                return self.maps[value].cname;
            }},
            {field:'alias',title:'人员',width:'19%',sortable:true,searchable:true},
            { field: 'duration', title: '时长阈值', width: '8%', sortable: true, searchable: true },
            { field: 'distance', title: "距离阈值", width: '8%', sortable: true, searchable: true },
            { field: 'addTime', title: "开始时间", width: '19%', sortable: true, searchable: true,formatter:function(value,row,index){
                return moment(value).format('YYYY-MM-DD HH:mm:ss')
            } },
            {field:'endTime',title:'结束时间',width: '19%', sortable: true, searchable: true,formatter:function(value,row,index){
                if(!value){
                    return '';
                }
                return moment(value).format('YYYY-MM-DD HH:mm:ss')
            } }
        ]
    });
}