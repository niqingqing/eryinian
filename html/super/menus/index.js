
/**
 * Created by xuanyu on 2019/01/17 0028.
 */



$(function(){
    init();
});

function init(){
    vueInit();
    pageInit();
}


function pageInit(){

    $('#menustable').bootstrapTable({
        url:ME.host+'/menu/allMenus',
        method:'get',
        queryParams:function(params){
            return params;
        },
        search:true,
        showRefresh:true,
        idField:'id',
        uniqueId:'id',
        clickToSelect:true,
        // singleSelect:true,
        sortable:true,
        striped:true,
        showColumns:true,
        sortName:'id',
        sortOrder:'desc',
        pagination:true,
        pageSize:10,
        pageList:[5, 10, 25, 50, 100, 200],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#menustoolbar',
        onDblClickRow:function(row, $element){
            ME.vm.menusUpdate();
        },
        onLoadSuccess:function(data){
            if(!data||data.length<1) return;
            ME.vm.allData=data;
            ME.vm.levelMenuOptions=[{value:0,label:'根目录',children:ME.vm.levelMenus(data,0)}];
        },

    columns: [
        {checkbox:true},
        {field: 'id',title: 'ID', width:'8%', sortable:true},
        {field: 'code',title: lang['code'],width:'20%', sortable:true, searchable:true},
        {field: 'cname',title: lang['cname'],width:'10%', sortable:true, searchable:true},
        {field: 'fid',title: 'fid',width:'20%', sortable:true, searchable:true},
        {field: 'isActive',title: lang['active'],width:'6%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                return value>0?lang['true']:lang['false'];
            },
        },
        {field: 'path',title: lang['path'],width:'20%', sortable:true, searchable:true},
        {field: 'iconCls',title: lang['icon'],width:'20%', sortable:true, searchable:true},
        {field: 'module',title: lang['module'],width:'20%', sortable:true, searchable:true},
        {field: 'sort',title: lang['sort'],width:'20%', sortable:true, searchable:true},
        {field: 'memo',title: lang['remark'],width:'20%', sortable:true, searchable:true},
        {field: 'addTime',title: lang['addTime'],width:'22%', sortable:true, searchable:true},
        // {field: 'addUser',title: lang['addUser'],width:'11%', sortable:true, searchable:true},
        {field: 'upUser',title: lang['upUser'],width:'6%', sortable:true, searchable:true},
    ]

});
}

function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            dialogFormVisible:false,
            menusOneBtnDisable:false,
            menusDeleteBtnDisable:false,
            disabled :true,
            allData:[],
            levelMenuOptions:[],
            menuFid:[0],
            modules:[
                {key:'sys',label:lang['moduleSuper']},
                {key:'proj',label:lang['moduleProj']},
                {key:'tplat',label:lang['moduleTplat']},
            ],
            form: {
                title : '',
                id: '',
                code : '',
                isActive : 1,
                cname : '',
                fid:0,
                path:'',
                iconCls : 'el-icon-circle-check',
                module:'sys',
                sort:'1',
                memo : '',
            },
            modefiyPwdRule: {
                code:[
                    { required: true, message: lang['mustRequireMenu'], trigger: 'blur' }
                ]
            },
            formLabelWidth: '120px',
        },
        created:function(){
            
        },
        methods:{
            selectmenus:function(){
                var a = $('#menustable').bootstrapTable('getSelections');
                if (!a || a.length<1){
                    this.$alert(lang['selectRowNote'], lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                    return false;
                }
                return a;
            },
            levelMenus:function(data,fid){
            var res=[],temp;
            for(var i=0;i<data.length;i++){
                var item=data[i];
                if(item.fid==fid){
                    var obj={value:item.id,label:item.cname};
                    temp=this.levelMenus(data,item.id);
                    if(temp.length>0){
                        obj.children=temp;
                    }
                    res.push(obj)
                }
            }
            return res;
            },
            refresh:function(){
                $('#menustable').bootstrapTable('refresh');
            },
            menusAdd:function(){
                util.emptyObj(ME.vm.form);
                this.dialogFormVisible = true;
                this.form.title = lang['addInfo'];
                this.form.isActive = "1";
                this.menuFid = [0];
                this.form.iconCls = 'el-icon-circle-check';
                this.form.module = 'sys';
                this.form.sort = '1';
            },
            menusUpdate:function(){
                var rows = this.selectmenus();
                if(!rows) return;
                if(rows.length>1){
                     this.$alert(lang['onlySelectOne'], lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                    return false;
                }

                this.dialogFormVisible = true;
                this.form.title = lang['updateInfo'];
                this.menuFid=[0];

                util.deepCopy(rows[0],ME.vm.form,1);
                this.setParentPath(rows[0].fid);
                ME.vm.menuFid=this.uniqueArry(ME.vm.menuFid);
            },
            // 根据记录fid,回显父目录结构
            setParentPath:function(fid){
                ME.vm.menuFid.push(fid);
                for(var i=0;i<ME.vm.allData.length;i++){
                    var item=ME.vm.allData[i];
                    if(fid==item.id){
                        ME.vm.menuFid.push(item.fid);
                        this.setParentPath(item.fid);
                    }
                }
                
            },
            uniqueArry:function (array) {
                var res = [];
                var sortedArray = array.sort(this.sortNum);
                var seen;
                for (var i = 0, len = sortedArray.length; i < len; i++) {
                    // 如果是第一个元素或者相邻的元素不相同
                    if (!i || seen !== sortedArray[i]) {
                        res.push(sortedArray[i])
                    }
                    seen = sortedArray[i];
                }
                return res;
            },
            sortNum:function(a,b){
                return a-b;
            },
            menusDelete:function(){
                var rows = this.selectmenus();

                if(!rows) return;
                // var row = rows[0];
                var ids=[];
                for(var i=0;i<rows.length;i++){
                    ids.push(rows[i].id);
                }
                this.$confirm(lang['deleteMenu'],lang['prompt'],{ }).then(function()  {

                    ME.vm.$http.post('menu/del', {id:ids}).then(function(res){
                    var result = res.body;
                    if(result.isOk){
                        this.refresh();
                        this.$alert(lang['delSuccessful'], lang['prompt']);
                    }else {
                        this.$alert(lang['delFail']+result.msg, lang['prompt'], {
                            confirmButtonText: lang['confirm']
                        });
                    }
                        ME.vm.menusDeleteBtnDisable = false;

                    });
                        ME.vm.menusDeleteBtnDisable = true;

            }).catch(function(){

                });

            },
            submitForm:function (formName) {
                this.$refs[formName].validate(function(valid){
                  if (valid) {
                      var url = 'menu/save/';
                      var msg = (ME.vm.form.id>0?lang['add']:lang['update']);
                      var params=ME.vm.form;
                      delete params.title;
                      params.fid=ME.vm.menuFid[ME.vm.menuFid.length-1]
                      ME.vm.$http.post(url, params).then(function(res){
                          var result = res.body;
                          if(result.isOk){
                              this.refresh();
                              this.dialogFormVisible = false;
                              this.$alert(msg+lang['successful']+"！", lang['prompt']);
                          }else {
                              this.$alert(msg+lang['fail']+"！"+result.msg, lang['prompt'], {
                                  confirmButtonText: lang['confirm']
                              });
                          }
                          ME.vm.menusOneBtnDisable = false;
                      });
                         ME.vm.menusOneBtnDisable = true;
                  } else {
                    ME.vm.$alert(lang['messageError'], lang['prompt'], {
                      confirmButtonText: lang['confirm']
                    }); 
                    return false;
                  }
                })
              },
        },
    });

}


















