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

    $('#fileTable').bootstrapTable(Object.assign({
        url:ME.host+'/super/saveReceiverData/listSaveFile',
        method:'get',
        queryParams:function(params){
            return params;
        },
    },ME.vm.tableCf));
}

function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            startSaveBtnDisable:false,
            stopSaveBtnDisable:false,
            refreshFileBtnDisable:false,
            downLoadFileBtnDisable:false,
            getStatusBtnDisable:false,
            deleteBtnDisable:false,
            form: {
                fileName: moment().format('YYYY_MM_DD_HH_mm_ss'),
                duration : 10,
                status : false
            },
            task:{
                status:'stop',
                fileName:'',
                duration:'',
                time:''
            },
            tableCf:{
                search:true,
                showRefresh:true,
                clickToSelect:true,
                singleSelect:false,
                sortable:true,
                striped:true,
                showColumns:true,
                pagination:true,
                pageSize:10,
                pageList:[5, 10, 25, 50, 100, 200],
                sidePagination:'client',
                toolbarAlign:'left',
                toolbar:'#filetoolbar',
                columns: [
                    // {checkbox:true,width:'5%'},
                    {radio:true,width:'5%'},
                    
                    {field: 'fileName',title: '文件名',width:'40%', sortable:true, searchable:true},
                    
                    {field: 'size',title: '文件大小',width:'20%', sortable:true, searchable:true},


                    // {field: 'download',title: '操作',width:'10%', sortable:false, searchable:false,
                    //     formatter: function (value, row, index) {
                    //         return '<el-row><el-button type="primary" size="small" @click="downLoadFile('+row.fileName+')">获取状态</el-button></el-row>';
                    //     }
                    // },

                ]
            }
        },
        created:function(){
        },
        methods:{
            startSave:function(){
                var that =this;
                if(!this.form.fileName)
                {
                    this.$alert('文件名不能为空！', '错误提示:', {
                        confirmButtonText: '确定'
                    });
                   return;
                }
                if(!this.form.duration)
                {
                    this.$alert('存储时长（分钟）不能为空！', '错误提示:', {
                        confirmButtonText: '确定'
                    });
                    return;
                }
                var url = ME.host+'/super/saveReceiverData/addTask';
                var params ={
                    fileName:this.form.fileName,
                    duration:this.form.duration*1000*60,
                }
                this.toPost(url,params,'startSaveBtnDisable',function (result) {
                    if(result.isOk){
                        that.showTip('开始成功！')
                    }
                })
            },
            stopSave:function(){
                var that =this;
                var url = ME.host+'/super/saveReceiverData/stopTask';
                var params ={

                };
                this.toGet(url,params,'stopSaveBtnDisable',function (result) {
                    if(result.isOk){
                        that.showTip('停止成功！')
                    }
                })
            },

            refreshFile:function(){
                $('#fileTable').bootstrapTable('refresh');
                // var url = ME.host+'/super/saveReceiverData/listSaveFile';
                // var params ={
                //
                // };
                // this.toGet(url,params,'refreshFileBtnDisable',function (result) {
                //
                // })
            },
            getStatus:function(){
                var that = this;
                var url = ME.host+'/super/saveReceiverData/getStatus';
                var params ={

                };
                this.toGet(url,params,'getStatusBtnDisable',function (result) {
                    if(result.isOk){
                        if(result.data.status == 'stop'){
                            that.form.status = false;
                        }else{
                            that.form.status = true;
                            that.task.fileName = result.data.fileName
                            that.task.duration = result.data.duration*1/1000/60;
                            that.task.startTime = moment(result.data.startTime*1).format('YYYY-MM-DD HH:mm:ss');
                        }
                    }
                })
            },
            downLoadFile:function(){
                var a = $('#fileTable').bootstrapTable('getSelections');
                if(a.length<1)
                {
                    this.$alert('请选择要下载的文件', '提示:', {
                        confirmButtonText: '确定'
                    });
                    return;
                }
                var url = ME.host+'/super/saveReceiverData/downloadFile';
                var params ={
                    fileName:a[0].fileName
                }
                // this.toPost(url,params,'downLoadFileBtnDisable',function (result) {
                //     // const blob = new Blob([JSON.stringify(res.body.data)])
                //     const blob = new Blob(result)
                //     var reader = new FileReader();
                //     reader.readAsDataURL(blob);
                //     reader.onload = (e) => {
                //         const a = document.createElement('a');
                //         a.download = params.fileName;
                //         a.href = e.target.result;
                //         $("body").append(a);
                //         a.click();
                //         $(a).remove();
                //     }
                // })
                this.requestFile(url,params)

            },
            requestFile:function (url,params) {
                var that =this;
                const req = new XMLHttpRequest();
                req.open('POST', url, true);
                req.responseType = 'blob';
                req.setRequestHeader('Content-Type', 'application/json');
                req.onload = function() {
                    const data = req.response;
                    const blob = new Blob([data]);
                    const blobUrl = window.URL.createObjectURL(blob);
                    that.download(blobUrl,params) ;
                };
                req.send(JSON.stringify(params));
            },

            download:function(blobUrl,params) {
                const a = document.createElement('a');
                a.download = params.fileName;
                a.href = blobUrl;
                $("body").append(a);
                a.click();
                $(a).remove();
            },
            deleteFile:function () {
                var that =this;
                var a = $('#fileTable').bootstrapTable('getSelections');
                if(a.length<1)
                {
                    that.$alert('请选择要删除的文件', '提示:', {
                        confirmButtonText: '确定'
                    });
                    return;
                }
                that.$confirm('确定删除！', '提示', {}).then(function () {
                    var url = ME.host+'/super/saveReceiverData/deleteDataFile';
                    var params ={
                        fileName:a[0].fileName
                    }
                    that.toPost(url,params,'deleteBtnDisable',function (result) {
                        if(result.isOk){
                            that.$alert(result.msg, '成功:', {
                                confirmButtonText: '确定'
                            });
                            $('#fileTable').bootstrapTable('refresh');
                        }
                    });
                }).catch(function (e) {
                    console.log(e);
                });
            },
            toPost:function(url,params,btn,callback){
                this[btn] = true;
                ME.vm.$http.post(url, params).then(function (res) {
                    this[btn] = false;
                    var result=res.data;
                    if(result.isOk){
                        if(typeof callback === "function"){
                            callback(result);
                        }
                    }else{
                        this.$alert(result.msg, '错误提示:', {
                            confirmButtonText: '确定'
                        });
                    }
                },function (err) {
                    this[btn] = false;
                    console.log(err);
                    this.$alert('失败', '错误提示:', {
                        confirmButtonText: '确定'
                    });
                })
            },

            toGet:function(url,params,btn,callback){
                this[btn] = true;
                ME.vm.$http.get(url, params).then(function (res) {
                    this[btn] = false;
                    var result=res.data;
                    if(result.isOk){
                        if(typeof callback === "function"){
                            callback(result);
                        }
                    }else{
                        this.$alert(result.msg, '错误提示:', {
                            confirmButtonText: '确定'
                        });
                    }
                },function (err) {
                    this[btn] = false;
                    console.log(err);
                    this.$alert('失败', '错误提示:', {
                        confirmButtonText: '确定'
                    });
                })
            },
            showTip:function(msg){
                //Format('yyyy-MM-dd hh:mm:ss')
                this.$message({
                    showClose: true,
                    message: msg
                });
            }
        }
    });
}
