window.onload = function () {
    ME.vm = new Vue({
        el: "#app",
        data: {
            selectRow: null,
            list: [],
            maps: [],
            dialog: {
                openType: "",
                visible: false,
                title: "添加",
                btnText: "提交",
            },
            editor: null,
            editDialog: {
                visible: false,
            },
            form: {
                type: "chart",
                width: 0,
                height: 0,
                index: 1,
                backgroundColor: "#ffffff",
                mapId: null,
                markerSize: 36,
                isActive: 1,
                fn: "",
                desc: "",
            },
            direction: null,
            directions: [
                "row",
                "row-reverse",
                "column",
                "column-reverse",
                "initial",
                "inherit",
            ],
        },
        methods: {
            cancel() {
                this.form = {
                    type: "chart",
                    width: 0,
                    height: 0,
                    index: 1,
                    backgroundColor: "#cccccc",
                    mapId: null,
                    markerSize: 36,
                    isActive: true,
                    fn: "",
                    desc: "",
                };
                this.dialog = {
                    openType: "",
                    visible: false,
                    title: "添加",
                    btnText: "提交",
                };
            },
            commit() {
                if (this.dialog.openType === "add") {
                    this.addCommit();
                } else {
                    this.updateCommit();
                }
            },
            add() {
                this.dialog.openType = "add";
                this.dialog.title = "添加";
                this.dialog.visible = true;
                this.dialog.btnText = "提交";
            },
            update() {
                if (!this.selectRow) {
                    return this.$message.warning("请至少选择一行");
                }
                this.dialog.openType = "update";
                this.dialog.title = "更新";
                this.dialog.visible = true;
                this.dialog.btnText = "更新";
                this.form.type = this.selectRow.type;
                this.form.width = this.selectRow.width;
                this.form.height = this.selectRow.height;
                this.form.index = this.selectRow.index;
                this.form.backgroundColor = this.selectRow.backgroundColor;
                this.form.mapId = this.selectRow.mapId;
                this.form.markerSize = this.selectRow.markerSize;
                this.form.isActive = this.selectRow.isActive;
                this.form.fn = this.selectRow.fn;
                this.form.desc = this.selectRow.desc;
            },
            refresh() {
                $("#table").bootstrapTable("refresh");
            },
            remove() {
                if (!this.selectRow) {
                    return this.$message.warning("请至少选择一行");
                }
                const id = this.selectRow.id;
                this.$confirm("警告,删除后不可恢复!")
                    .then(() => {
                        this.$http
                            .post(ME.host + "/dashboard/remove", { id })
                            .then((res) => {
                                if (res && res.body && res.body.isOk) {
                                    this.$message.success("删除成功");
                                    this.refresh();
                                } else {
                                    this.$message.error(
                                        `删除失败${res.body.msg}`
                                    );
                                }
                            });
                    })
                    .catch((e) => {});
            },
            addCommit() {
                const url = `${ME.host}/dashboard/add`;
                const data = this.form;
                if (!data.type) {
                    return this.$message.error("请选择类型");
                }
                if (!data.width || !data.height) {
                    return this.$message.error("请输入正确宽高");
                }
                if (!data.index) {
                    return this.$message.error("请输入正确顺序");
                }
                if (data.type === "map" && !data.mapId) {
                    return this.$message.error("请选择正确地图");
                }
                if (data.type === "chart" && !data.fn) {
                    return this.$message.error("请输入正确数据函数");
                }
                this.$http.post(url, data).then((res) => {
                    if (res && res.body && res.body.isOk) {
                        this.$message.success("添加成功");
                        this.refresh();
                        this.cancel();
                    } else {
                        this.$message.error(`添加失败,${res.body.msg}`);
                    }
                });
            },
            updateCommit() {
                const id = this.selectRow.id;
                const updateData = Object.assign(this.form);
                updateData.id = id;
                this.$http
                    .post(ME.host + "/dashboard/update", updateData)
                    .then((res) => {
                        if (res && res.body && res.body.isOk) {
                            this.$message.success("更新成功");
                            this.refresh();
                            this.cancel();
                        } else {
                            this.$message.error(`添加失败,${res.body.msg}`);
                        }
                    });
            },
            getMaps() {
                this.$http.get(ME.host + "/super/map/list").then((res) => {
                    if (res && res.body) {
                        this.maps = res.body;
                    } else {
                        this.$message.error("获取地图失败");
                    }
                });
            },
            changeDirection() {
                localStorage.setItem("dashboard", this.direction);
            },
            openPreview() {
                window.open(
                    `${location.protocol}//${location.hostname}/super/dashboard`,
                    "blank"
                );
            },
            initCodeMirror() {
                const textArea = document.getElementById("code_textArea");
                const editor = (this.editor = CodeMirror.fromTextArea(
                    textArea,
                    {
                        lineNumbers: true,
                        firstLineNumber: 1,
                        gutters: [
                            "CodeMirror-linenumbers",
                            "CodeMirror-foldgutter",
                            "CodeMirror-lint-markers",
                        ],
                        theme: "monokai",
                        lineWrapping: true,
                        mode: { name: "javascript", json: true },
                        line: true,
                        tabSize: 4,
                        matchBrackets: true,
                        scrollbarStyle: "native",
                        extraKeys: {
                            F11: function (cm) {},
                            Esc: (editor) => {
                                if (editor.getOption("fullScreen")) {
                                    editor.setOption("fullScreen", false);
                                }
                                this.editDialog.visible = false;
                                this.form.fn = editor.getValue();
                            },
                        },
                    }
                ));
            },
            openEditor() {
                this.$alert(
                    "按ESC退出并保存,内部可以直接使用的变量有chart(@antv/g2plot),container(承载元素),this指向dashboard项目下App组件中的this"
                )
                    .then(() => {
                        this.editDialog.visible = true;
                        this.editor.setOption("fullScreen", true);
                        this.editor.setValue(this.form.fn);
                    })
                    .catch();
            },
        },
        mounted() {
            tableInit.call(this);
            this.initCodeMirror();
        },
        created() {
            this.getMaps();
        },
    });

    function tableInit() {
        const self = this;
        $("#table").bootstrapTable({
            url: ME.host + "/dashboard/list",
            method: "get",
            queryParams: function (params) {
                return params;
            },
            search: true,
            showRefresh: true,
            idField: "id",
            uniqueId: "id",
            clickToSelect: true,
            singleSelect: true,
            sortable: true,
            striped: true,
            showColumns: true,
            sortName: "index",
            sortOrder: "asc",
            pagination: true,
            pageSize: 10,
            pageList: [2, 10, 25, 50, 100, 200],
            sidePagination: "client",
            toolbarAlign: "left",
            toolbar: "#toolbar",
            onDblClickRow: function (row, $element) {},
            onClickRow(row, ele, field) {
                self.selectRow = row;
            },
            onRefresh() {
                self.selectRow = null;
            },
            responseHandler(res) {
                if (res && res.isOk) {
                    self.list = res.data;
                }
                return res;
            },
            columns: [
                { radio: true },
                {
                    field: "id",
                    title: "ID",
                    width: "20%",
                    sortable: true,
                    searchable: true,
                },
                { field: "index", title: "排序", width: "10%", sortable: true },
                { field: "type", title: "类型", width: "20%", sortable: true },
                { field: "width", title: "宽", width: "10%", sortable: true },
                { field: "height", title: "高", width: "10%", sortable: true },
                {
                    field: "backgroundColor",
                    title: "背景颜色",
                    width: "10%",
                    sortable: true,
                    formatter: function (value) {
                        return `<span style='color:${value};'>${value}</span>`;
                    },
                },
                {
                    field: "markerSize",
                    title: "图标大小",
                    width: "10%",
                    sortable: true,
                },
                {
                    field: "mapId",
                    title: "地图id",
                    width: "10%",
                    sortable: true,
                },
                {
                    field: "fn",
                    title: "数据函数",
                    width: "10%",
                    sortable: true,
                },
                {
                    field: "desc",
                    title: "说明",
                    width: "10%",
                    sortable: true,
                },
                {
                    field: "isActive",
                    title: "状态",
                    width: "6%",
                    sortable: true,
                    searchable: true,
                    formatter: function (value, row, index) {
                        return value > 0 ? "显示" : "隐藏";
                    },
                },
                // {
                //     field: "addTime",
                //     title: lang["addTime"],
                //     width: "8%",
                //     sortable: true,
                //     searchable: true,
                // },
                // {
                //     field: "addUser",
                //     title: lang["addUser"],
                //     width: "8%",
                //     sortable: true,
                //     searchable: true,
                // },
                // {
                //     field: "upTime",
                //     title: lang["upTime"],
                //     width: "6%",
                //     sortable: true,
                //     searchable: true,
                // },
                // {
                //     field: "upUser",
                //     title: lang["upUser"],
                //     width: "6%",
                //     sortable: true,
                //     searchable: true,
                // },
            ],
        });
    }
};
