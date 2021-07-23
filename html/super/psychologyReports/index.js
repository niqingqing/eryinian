$(function () {
    pageInit();
})

function pageInit() {
    ME.vm = new Vue({
        el: '#app',
        data: {},
        methods: {
            uploadFile: function (code, obj) {
                var file = obj.files[0];
                var formData = new FormData();
                formData.append(code, file);
                this.$http.post(ME.host + '/super/psychologyReports/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then((res) => {
                    if(res.body.isOk){
                        $('#table').bootstrapTable('refresh');
                    }
                })
            },
            download: function (code) {
                var self = this;
                this.$http.get(ME.host + '/super/psychologyReports/getFileName?code=' + code).then((res) => {
                    if(!res.body.isOk){
                        return self.$message.info(res.body.msg)
                    }
                    var name = res.body.data.name;
                    var url = ME.host + '/super/psychologyReports/download?code=' + code;
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', url, true);    // 也可以使用POST方式，根据接口\
                    xhr.setRequestHeader('api_token',ME.user.api_token)
                    xhr.responseType = "blob";  // 返回类型blob
                    // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
                    xhr.onload = function () {
                        // 请求完成
                        if (this.status === 200) {
                            // 返回200
                            var blob = this.response;
                            var reader = new FileReader();
                            reader.readAsDataURL(blob);  // 转换为base64，可以直接放入a表情href
                            reader.onload = function (e) {
                                // 转换完成，创建一个a标签用于下载
                                var a = document.createElement('a');
                                a.download = name;
                                a.href = e.target.result;
                                $("body").append(a);  // 修复firefox中无法触发click
                                a.click();
                                $(a).remove();
                            }
                        }
                    };
                    // 发送ajax请求
                    xhr.send()
                })
            }
        },
        mounted: function () {
            initTable.call(this)
        }
    })
}

function initTable() {
    var self = this;
    $('#table').bootstrapTable({
        url: ME.host + '/super/psychologyReports/list',
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
        pageList: [2, 10, 25, 50, 100, 200],
        sidePagination: 'client',
        toolbarAlign: 'left',
        toolbar: '#cameraModelbar',
        columns: [
            { field: 'id', title: 'code', width: '5%', searchable: true, sortable: true },
            { field: 'alias', title: '别名', wdith: '20%', searchable: true, sortable: true },
            {
                field: 'status', title: '状态', wdith: '20%', searchable: true, sortable: true, formatter: function (value, row, index) {
                    var res;
                    switch (value) {
                        case 0:
                            res = '未上传';
                            break;
                        case 1:
                            res = '已上传';
                            break;
                        case 2:
                            res = '已删除';
                            break;
                    }
                    return res;
                }
            },
            {
                title: '上传', formatter: function (value, row, index) {
                    return `<input type='file' onchange="ME.vm.uploadFile('${row.id}',this)">` + `</button>`
                }
            },
            {
                title: '下载', formatter: function (value, row, index) {
                    return `<button onclick="ME.vm.download('${row.id}')">` + '下载' + `</button>`
                }
            },
            {field: 'addTime',title: lang['addTime'],width:'6%', sortable:true, searchable:true},
            // {field: 'addUser',title: lang['addUser'],width:'6%', sortable:true, searchable:true},
            {field: 'upTime',title: lang['upTime'],width:'6%', sortable:true, searchable:true},
            {field: 'upUser',title: lang['upUser'],width:'6%', sortable:true, searchable:true},
        ]
    })
}