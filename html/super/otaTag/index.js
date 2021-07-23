window.onload = function () {
    VueInit();
};

function VueInit() {
    ME.vm = new Vue({
        el: "#app",
        data: {
            tableData: []
        },
        methods: {
            tableInit() {
                const self = this;
                $("#table").bootstrapTable({
                    // url: ME.host + "/super/tag/getOtaList",
                    // method: "get",
                    // queryParams: function (params) {
                    //     return params;
                    // },
                    data:self.tableData,
                    search: true,
                    showRefresh: true,
                    idField: "id",
                    uniqueId: "id",
                    clickToSelect: true,
                    singleSelect: false,
                    sortable: true,
                    striped: true,
                    showColumns: true,
                    sortName: "otaProgress",
                    sortOrder: "desc",
                    pagination: true,
                    pageSize: 10,
                    pageList: [10, 25, 50, 100, 200],
                    sidePagination: "client",
                    toolbarAlign: "left",
                    toolbar: "#toolbar",
                    responseHandler: function (result) {
                        const keys = Object.keys(result.data);
                        const values = Object.values(result.data)
                        self.tableData = keys.map((val, index) => {
                            return {
                                index: keys.length - index,
                                code: val,
                                otaProgress: values[index]
                            }
                        });
                        return self.tableData;
                    },
                    columns: columnsBuild()
                });
            },
            clearComplete() {
                console.log("clear complete");
                const completeTags = this.tableData.map(
                    tag => tag.otaProgress >= 1
                );
            },

            loadOtaProgress(){
                var that =this;
                that.$http.get(ME.host+'/super/tag/getOtaList').then(function(result){
                    const keys = Object.keys(result.body.data);
                    const values = Object.values(result.body.data)
                    that.tableData = keys.map((val, index) => {
                        if(values[index].indexOf('_')!=-1){
                            return {
                                index: keys.length - index,
                                code: val,
                                otaProgress: values[index].split('_')[0],
                                time:values[index].split('_')[1]
                            }
                        }else{
                            return {
                                index: keys.length - index,
                                code: val,
                                otaProgress: values[index],
                                time:''
                            }
                        }
                    });
                    $('#table').bootstrapTable('load', that.tableData);
                    setTimeout(function () {
                        that.loadOtaProgress();
                    },3000);
                });
            }
        },
        mounted() {
            this.tableInit();
            this.loadOtaProgress();

        }
    });
}

function columnsBuild() {
    return [
        {
            field: "index",
            title: "索引",
            width: "2%",
            sortable: true,
            searchable: true
        },
        {
            field: "code",
            title: lang["code"],
            width: "5%",
            sortable: true,
            searchable: true
        },
        {
            field: "otaProgress",
            title: "ota进度",
            width: "5%",
            sortable: true,
            searchable: true,
            visible: true,
            formatter: value => (value ? `${value}%` : "暂无")
        },
        {
            field: "time",
            title: "时间",
            width: "5%",
            sortable: true,
            searchable: true,
            visible: true,
            formatter: value => (value ? moment(value*1).format('YYYY-MM-DD HH:mm:ss') : "暂无")
        },
    ];
}
