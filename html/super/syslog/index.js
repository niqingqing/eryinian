/**
 * Created by LiuTao on 2017/7/03 0028.
 */



$(function(){
    init();
});

function init(){
    vueInit();
    pageInit();
}


function pageInit(){
    $('#systable').bootstrapTable({
        url:ME.host+'/syslog/list',
        method:'get',
        queryParams:function(params){
            
            var timeSpan = ME.vm.timeRange();
            if(!timeSpan){
                return;
            }
            var searchParams = ME.vm.searchform;
            params.timeStart = timeSpan[0];
            params.timeEnd = timeSpan[1];
            if(searchParams.logType!=='') params.logType = searchParams.logType;
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
        height:750,
        showColumns:true,
        sortName:'id',
        sortOrder:'desc',
        pagination:true,
        pageSize:25,
        pageList:[10, 25, 50, 100, 200],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#systoolbar',
    columns: [
        // {field: 'id',title: 'ID', width:'4%', sortable:true, searchable:true},
        {field: 'logType',title: lang['logType'], width:'4%', sortable:true, searchable:true},
        {field: 'content',title: lang['content'], width:'4%', sortable:true, searchable:true},
        {field: 'operateUser',title: lang['operateUser'],width:'10%', sortable:true, searchable:true},
        {field: 'addTime',title: lang['addTime'],width:'30%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                var date = new Date(value);
                return date.toLocaleString();
            }
        },
        {field: 'trace',title: lang['details'],width:'30%', sortable:true, searchable:true},
    ]

});

}

function vueInit(){

    ME.vm = new Vue({
        el: '#app',
        data: {
            logTypes: ['UPDATE','INSERT','DELETE','RECORD','DEBUG','WARN','ERROR'],
            sysBtnDisable: false,
            clearTableDisable: false,
            searchform: {
                timespan: [new Date((new Date()).getTime() - 3600 * 1000 * 24), new Date((new Date()).getTime() + 3600 * 1000 * 24)],
                logType: ''
            },
            formLabelWidth: '120px',
            pickerOptions: {
                shortcuts: [
                    {
                        text: lang['note'],
                        onClick: function onClick(picker) {
                            var end = new Date();
                            var start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: lang['note2'],
                        onClick: function onClick(picker) {
                            var end = new Date();
                            var start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: lang['note3'],
                        onClick: function onClick(picker) {
                            var end = new Date();
                            var start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: lang['note4'],
                        onClick: function onClick(picker) {
                            var end = new Date();
                            var start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: lang['note5'],
                        onClick: function onClick(picker) {
                            var end = new Date();
                            var start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            },
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
            id2name:function(id,type){
                switch(type){
                    case 'tag': var tags=ME.vm.tags;
                        for(var i=0;i<tags.length;i++){
                        if(id==tags[i].id){
                            return tags[i].alias;
                        };
                    }break;
                    case 'map':var maps=ME.vm.maps;
                    for(var i=0;i<maps.length;i++){
                        if(id==maps[i].id){
                            return maps[i].cname;
                        }
                    };break;
                }
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
            showTip:function(msg){
                this.$message({
                    showClose: true,
                    message: msg
                });
            },
            selectRows:function(){
                var a = $('#systable').bootstrapTable('getSelections');
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
                this.$confirm(lang['clearTableNote'],lang['prompt'],{ }).then(function() {
                    ME.vm.clearTableDisable = true;
                    var url = ME.host+'/syslog/clearTable?start=' + self.searchform.timespan[0] + '&end=' + self.searchform.timespan[1];
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
                var timeSpan = ME.vm.timeRange();
                if(!timeSpan){
                    return;
                }
                $('#systable').bootstrapTable('refresh');
            },
            resetForm:function(formName) {
                this.$refs[formName].resetFields()
              },

        },
    });

}
