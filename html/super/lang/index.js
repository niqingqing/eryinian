/**
 * Created by zwt on 2018/11/09 0028.
 */
$(function(){
    init();
})
function init(){
    ME.vm = new Vue({
        el:'#app',
        data:{
            lang:lang,
            get tableDataObj(){
                var obj = {};
                this.tableData.forEach((value) => {
                    obj[value.id] = value;
                })
                return obj;
            },
            newModule:'',
            tableData:[],
            dialogFormVisible:false,
            langDeleteBtnDisable:false,
            syncBtnDisable:false,
            selectElement:null,
            selectElementValue:null,
            checkRowIds:new Set(),
            defaultModule:null,
            // get defaultModule(){
            //     return this._defaultModule;
            // },
            // set defaultModule(value){
            //     if(value === 'all'){
            //         this._defaultModule = null;
            //     }else{
            //         this._defaultModule = value;
            //     }
            // },
            modules:[],
            form:{
                module:'',
                keywords:'',
                zh_cn:'',
                zh_hk:'',
                zh_tw:'',
                en:''
            }
        },
        methods:{
            initData:function(){
                var self = this;
                var module = this.defaultModule || 'all';
                return new Promise((resolve,reject) => {
                    self.$http.get(ME.host + '/super/lang/list?module=' + module).then((res) => {
                        self.tableData = res.body;
                        resolve(res);
                    });
                })
            },
            addModule:function(e){
                if(!this.modules.includes(this.newModule)){
                    this.modules.unshift(this.newModule);
                }
            },
            add:function(){
                var id = UBIT.uuid(16);
                var obj = {
                    id,
                    module:this.defaultModule || 'sys',
                    keywords:'',
                    zh_cn:'',
                    zh_hk:'',
                    zh_tw:'',
                    en:'',
                    addTime:new Date()
                }
                this.tableData.push(obj);
                this.loadTable();
            },
            remove:function(){
                var ids = Array.from(this.checkRowIds).filter((value) => {
                    return value.length !== 16;
                });
                var self = this;
                if(ids.length < 1){
                    return this.$message.error(lang['notSelectRow']);
                }
                this.$confirm(lang['isDelete'], lang['prompt'], {
                    confirmButtonText: lang['confirm'],
                    cancelButtonText: lang['cancel'],
                    type: 'warning'
                }).then(() => {
                    self.$http.post(ME.host + '/super/lang/remove',{ids}).then((res) => {
                        if(res.body.isOk){
                            self.$message.success(lang['deleteSuccess']);
                            self.refreshTable();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: lang['cancelDelete']
                    });
                })
            },
            syncServer:function(){
                var self = this;
                this.syncBtnDisable = true;
                this.$http.get(ME.host + '/super/lang/syncServer').then(function(res){
                    this.syncBtnDisable = false;
                    self.$message.success(res.body.msg);
                });
            },
            cellClick:function(element,id,key){
                this.selectElement = element;
                this.selectElementValue =  element.value;
                $(element).addClass('active');
            },
            cellOnchange:function(element,id,key){
                this.selectElement = element;
                this.selectElementValue =  element.value;
            },
            cellOnblur:function(element,id,key){
                var value = element.value;
                var self = this;
                $(element).removeClass('active');
                if(!value){
                    return;
                }
                this.selectElement = null;
                this.updateRow(id,{[key]:element.value});
                var row = this.getTableDataById(id);
                if(key === 'module' && !row.keywords){
                    return;
                }
                if(key === 'keywords' && row.id.length === 16){
                    this.$http.post(ME.host + '/super/lang/add',row).then((res) => {
                        self.afterAdd(res,id,key)
                    })
                }else{
                    if(!row || !row.id || row.id.length === 16){
                        return;
                    }
                    var updateObj = Object.assign({},row);
                    delete updateObj['0'];
                    delete updateObj._position;
                    this.$http.post(ME.host + '/super/lang/update',updateObj).then((res) => {
                        self.afterUpdate(res,id,key);
                    })
                }
            },
            getTableDataById:function(id){
                return this.tableDataObj[id];
            },
            updateRow:function(id,params){
                var self = this;
                self.tableData.map((value) => {
                    if(value.id.toString() === id){
                        for(var i in params){
                            value[i] = params[i];
                        }
                    }
                    return value;
                })
                self.loadTable();
            },
            afterUpdate:function(res,id,key){
                if(!res.body.isOk){
                    this.updateRow(id,{[key]:this.selectElementValue});
                    return this.$message.error(lang['updateFail'],res.body.msg);
                }
            },
            afterAdd:function(res,oldId,key){
                if(!res.body.isOk){
                    return this.$message.error(lang['addFail'],res.body.msg);
                }
                var id = res.body.data.id;
                this.updateRow(oldId,{id});
            },
            loadTable:function(isShowReload){
                var self = this;
                var data = [].concat(this.tableData);
                this.removeAll();
                if(isShowReload){
                    setTimeout(() => {
                        $('#langTable').bootstrapTable('load',data);
                    },1)
                }else{
                    $('#langTable').bootstrapTable('load',data);
                }
                // $('#langTable').bootstrapTable.locales('en-US');
                // $('#langTable').bootstrapTable({locale:'en-US'});
    
            },
            removeAll:function(){
                $('#langTable').bootstrapTable("load",[]);
            },
            refreshTable:function(){
                var self = this;
                this.initData().then((res) => {
                    self.loadTable(true);
                })
            },
            filterTbaleData:function(){
                this.refreshTable();
                // $('#langTable').bootstrapTable('filterBy',{module:this.defaultModule});
            }
        },
        mounted:function(){
            var self = this;
            this.initData().then(() => {
                self.$http.get(ME.host + '/super/lang/moduleList').then((res) => {
                    self.modules = res.body.data;
                    initTable.apply(this);
                })
            })
            $(document).keydown(function(event){
                if(event.keyCode === 13){
                    $(self.selectElement).blur();
                }
            })
        },
    })
    
    function initTable() {
        var self = this;
        $('#langTable').bootstrapTable({
            data:self.tableData,
            search: true,
            showRefresh: true,
            idField: 'id',
            uniqueId: 'id',
            // clickToSelect: true,
            // singleSelect: true,
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
            toolbar: '#langtoolbar',
            onRefresh:function(params){
                self.refreshTable();
            },
            onDblClickRow: function (row, $element) {
            },
            onCheck: function (row) {
                if(!row.id){
                    return;
                }
                self.checkRowIds.add(self.tableDataObj[row.id].id);
            },
            onCheckAll:function(rows){
                rows.forEach((row) => {
                    if(!row.id){
                        return;
                    }
                    self.checkRowIds.add(row.id);
                })
            },
            onUncheck:function(row){
                if(!row.id){
                    return;
                }
                self.checkRowIds.delete(row.id);
            },
            onUncheckAll:function(rows){
                rows.forEach((row) => {
                    if(!row.id){
                        return;
                    }
                    self.checkRowIds.delete(row.id);
                })
            },
            columns: [
                { checkbox: true, width: '4%' },
                { field: 'id', title: 'ID', width: '10%', searchable: true, sortable: true },
                { field: 'module', title: lang['module'], width: '10%', searchable: true, sortable: true,formatter:function(value,row,index){
                    var str = `<select class='table-select' onblur="ME.vm.cellOnblur(this,'${self.tableDataObj[row.id].id}','module')" onfocus="ME.vm.cellClick(this,'${self.tableDataObj[row.id].id}','module')">`;
                    for(var i of self.modules){
                        if(value === i){
                            str += `<option value=${i} selected> ${i} </option>`
                        }else{
                            str += `<option value=${i}> ${i} </option>`
                        }
                    }
                    str += '</select>';
                    return str;
                } },
                { field: 'keywords', title: lang['keywords'], width: '10%', searchable: true, sortable: true,formatter:function(value,row,index){
                    return getRowFormat(value,row.id,'keywords');
                }},
                { field: 'zh_cn', title: lang['zh_cn'], width: '10%', searchable: true, sortable: true,formatter:function(value,row,index){
                    return getRowFormat(value,row.id,'zh_cn');
                } },
                { field: 'zh_hk', title: lang['zh_hk'], width: '10%', searchable: true, sortable: true,formatter:function(value,row,index){
                    return getRowFormat(value,row.id,'zh_hk');
                } },
                { field: 'zh_tw', title: lang['zh_tw'], width: '10%', searchable: true, sortable: true,formatter:function(value,row,index){
                    return getRowFormat(value,row.id,'zh_tw');
                } },
                { field: 'en', title: lang['en'], width: '10%', searchable: true, sortable: true,formatter:function(value,row,index){
                    return getRowFormat(value,row.id,'en');
                } },
                { field: 'addTime', title: lang['addTime'], width: '10%', searchable: true, sortable: true,formmatter:function(value,row,index){
                    return moment(value).format('YYYY-MM-DD HH:mm:ss');
                }},
                {field: 'upTime',title: lang['upTime'],width:'6%', sortable:true, searchable:true},
                {field: 'upUser',title: lang['upUser'],width:'6%', sortable:true, searchable:true},
            ]
        })
    
        function getRowFormat(value,id,keyword){
            return `<input class='table-input' onblur="ME.vm.cellOnblur(this,'${self.tableDataObj[id].id}','${keyword}')" onclick="ME.vm.cellClick(this,'${self.tableDataObj[id].id}','${keyword}')" type='text' value='${value}'></input>`
        }
    }    
}
