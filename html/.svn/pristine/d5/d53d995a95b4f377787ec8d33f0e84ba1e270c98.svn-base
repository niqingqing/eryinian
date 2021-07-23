/**
 * Created by LiuTao on 2017/7/03 0028.
 */



$(function(){
    init();
});

function init(){
    vueInit();
}

function checks (rule, value, callback) {
        if (value === '') {
          callback(new Error(lang['enterContent']));
          return;
        }

        var projTags = $('#anchorTable').bootstrapTable('getData');
        var id = ME.vm.form.id;
        var flag = true;
        projTags.forEach(function(projTag){
            if(value == projTag.code && id!=projTag.id){
                callback(new Error(lang['checksNotePre']+projTag.cname+lang['checksNoteAfter']));
                return;
            }
        });


        if(!flag) return;
        callback();
}


function pageInit(){
    var tableColumns = getTableColumns(ME.pageType);

    $('#anchorTable').bootstrapTable({
        url:ME.host+'/project/anchor/list?projectId='+ME.user.projectId,
        method:'get',
        queryParams:function(params){
            return params;
        },
        responseHandler:function(res){
            getMasterLists(res);
            return res;
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
        onDblClickRow:function(row, $element){
            ME.vm.updateAnchor();
        },
        columns:tableColumns
        
});

}

function vueInit(){
    VUE_DATA = Object.assign(VUE_DATA,{
        addBtnDisable:false,
        pageType:ME.pageType,
    });

    VUE_METHODS = Object.assign(VUE_METHODS,{

    });


    ME.vm = new Vue({
        el:'#app',
        data: VUE_DATA,
        created:function(){
            this.$http.get(ME.host+'/model/listBase?model=map').then(function(res){
                this.maps = res.body;
                pageInit();
            });
        },
        methods:VUE_METHODS,
    });

}
