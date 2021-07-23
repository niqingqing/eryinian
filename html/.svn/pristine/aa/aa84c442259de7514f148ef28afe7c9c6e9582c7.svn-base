const { Application, Container, Graphics, Sprite, Texture } = PIXI;
window.onload = function() {
    init();
};
function init() {
    ME.vm = new Vue({
        el: "#app",
        data() {
            // cmd
            return {
                edit: {
                    project: "",
                    map: "",
                    addDialogVisible: false,
                    tag: "",
                    speed: null,
                    drawPaths: [],
                    isSuper: false,
                    updateDialogVisible: false,
                    updateTag: "",
                    updateSpeed: 5,
                    updateId: null
                },
                projects: [
                    { cname: "test", code: "test" },
                    { cname: "星云研究院", code: "xystudy" }
                ],
                maps: [
                    {
                        id: 1,
                        cname: "test1"
                    },
                    { id: 2, cname: "test2" }
                ],
                list: [],
                cmd: "",
                Map: null,
                addPoints: [],
                maps: [],
                Map: null,
                projects: [],
                line: null,
                tags: [
                    { mac: "00000001", alias: "test" },
                    { mac: "00000002", alias: "test1" },
                    { mac: "00000003", alias: "test2" }
                ],
                closeDialogType: "cancel"
            };
        },
        methods: {
            show(simulation) {
                const self = this;
                this.edit.map = "";
                this.edit.project = "";
                this.edit.project = simulation.projectId;
                this.changeSuper2Admin(() => {
                    this.listMap(() => {
                        self.edit.map = simulation.mapId;
                    });
                });

                this.$once("createMap", () => {
                    const map = this.getMap();
                    if (!map) {
                        return console.error("no map");
                    }
                    const points = this.realToScreen(simulation.points, map);
                    const line = (this.line = self.Map.drawLine(points));
                    self.Map.background.addChild(line);
                });
            },
            remove(id) {
                this.$confirm("是否删除")
                    .then(() => {
                        this.$http
                            .post(ME.host + "/super/simulation/remove", {
                                id: id
                            })
                            .then(res => {
                                if (res && res.data && res.data.isOk) {
                                    this.clearMap();
                                    this.listSimulations();
                                }
                            });
                    })
                    .catch(() => {});
            },
            add() {
                if (this.edit.project && this.edit.map && window.map) {
                    this.$refs.slideRef.className = "slide-hide";
                    if (this.line) {
                        this.line.destroy();
                        this.line = null;
                    }
                    window.map.addPathStart();
                }
            },
            save(points) {
                const projectId = this.edit.project;
                const mapId = this.edit.map;
                const tag = this.edit.tag;
                const speed = this.edit.speed || 5;
                if (!projectId || !mapId) {
                    return this.$message.warning("请选择项目和地图");
                }
                if (!tag) {
                    return this.$message.warning("请输入被模拟标签编号");
                }
                this.$http
                    .post(ME.host + "/super/simulation/add", {
                        mapId,
                        projectId,
                        tag,
                        speed,
                        points
                    })
                    .then(res => {
                        if (res && res.data && res.data.isOk) {
                            this.listSimulations();
                        }
                    });
            },
            clearMap() {
                if (this.Map) {
                    if (this.line) {
                        this.line.destroy();
                        this.line = null;
                    }
                    this.Map.clearMap();
                }
            },
            createMap(map) {
                const resolution = window.devicePixelRatio || 2;
                const scale = window.innerHeight / map.height / resolution;
                const options = {
                    antialias: true,
                    transparent: false,
                    resolution: resolution,
                    realWidth: map.realWidth,
                    realHeight: map.realHeight,
                    pixelWidth: map.width,
                    pixelHeight: map.height,
                    background: {
                        url: map.url,
                        scale: scale
                    }
                };
                if (this.Map) {
                    this.Map.resetBg(options);
                } else {
                    window.map = this.Map = new Map(options);
                }
                this.Map.on("click", data => {
                    // this.$message.success(
                    //     `x:${data.point.x.toFixed(2)},y:${data.point.y.toFixed(
                    //         2
                    //     )},,scale:${data.scale.toFixed(2)}`
                    // );
                });
                this.Map.on("addFinish", paths => {
                    this.$refs.slideRef.className = "slide-show";
                    this.edit.addDialogVisible = true;
                    this.edit.drawPaths = paths;
                });
                this.$emit("createMap");
            },
            listMap(cb) {
                this.$http.get(ME.host + "/super/map/list").then(res => {
                    if (!res || !res.data) {
                        return console.log(res);
                    }
                    if (res.data.hasOwnProperty("isOk") && !res.data.isOk) {
                        return console.log(res.data);
                    }
                    this.maps = res.data;
                    if (cb) {
                        cb();
                    }
                });
            },
            listProject() {
                this.$http.get(ME.host + "/project/list").then(res => {
                    if (!res || !res.data) {
                        return;
                    }
                    if (res.data.hasOwnProperty("isOk") && !res.data.isOk) {
                        return console.log(res.data);
                    }
                    this.projects = res.data;
                });
            },
            projectChangeHandler() {
                this.changeSuper2Admin(res => {
                    if (res.data.isOk) {
                        this.listMap();
                    }
                });
            },
            mapChangeHandler() {
                const map = this.getMap();
                if (!map) {
                    return;
                }
                const filePath = map.filePath;
                if (!filePath) {
                    return this.$message.error("no map image");
                }
                const url = UBIT.getImgSrc("maps", filePath);
                this.createMap({
                    url: url,
                    width: map.pixelLength,
                    height: map.pixelWidth,
                    realHeight: map.realWidth,
                    realWidth: map.realLength
                });
            },
            changeSuper2Admin(cb) {
                this.changeAdmin2Super(res => {
                    if (res.data.isOk) {
                        this.$http
                            .post(ME.host + "/super/user/changeSuper2Admin", {
                                api_token: ME.api_token,
                                projectId: this.edit.project
                            })
                            .then(res => {
                                this.isSuper = false;
                                cb(res);
                            });
                    }
                });
            },
            changeAdmin2Super(cb) {
                this.$http
                    .post(ME.host + "/super/user/changeAdmin2Super", {
                        api_token: ME.api_token
                    })
                    .then(res => {
                        this.isSuper = true;
                        return cb(res);
                    });
            },
            listSimulations() {
                this.$http.get(ME.host + "/super/simulation/list").then(res => {
                    if (res && res.data && res.data.data) {
                        this.list = res.data.data;
                        this.initEdit();
                    }
                });
            },
            screenToReal(points) {
                const map = this.getMap();
                if (!map) {
                    return;
                }
                ratio = map.pixelLength / map.realLength;
                return points
                    .map(path => {
                        return `${(path.x / ratio).toFixed(2)} ${(
                            path.y / ratio
                        ).toFixed(2)}`;
                    })
                    .join(",");
            },
            realToScreen(points, map) {
                const ratio = map.pixelWidth / map.realWidth;
                const tempPoints = points.split(",").map(val => {
                    const arr = val.split(" ");
                    if (!arr || arr.length !== 2) {
                        return console.error("error points", points);
                    }
                    return {
                        x: ratio * parseFloat(arr[0]),
                        y: ratio * parseFloat(arr[1])
                    };
                });
                return tempPoints;
            },
            getMap() {
                if (!this.edit.map) {
                    console.log("not select map");
                    return false;
                }
                if (!this.maps || this.maps.hasOwnProperty("filter")) {
                    return false;
                }
                const map = this.maps.filter(map => {
                    return map.id === this.edit.map;
                })[0];
                return map;
            },
            closeDialogHandler() {
                this.initEdit();
            },
            closeDialog() {
                this.closeDialogType = "cancel";
                this.initEdit();
            },
            addSimulation() {
                const paths = this.edit.drawPaths;
                if (!paths || paths.length < 1) {
                    return this.$message("请先在地图中画出路径");
                }
                let finalPaths = this.screenToReal(paths);
                this.closeDialogType = "add";
                this.save(finalPaths);
            },
            initEdit() {
                const suffix = (this.list.length + 1).toString(16);
                const tag =
                    new Array(8 - suffix.length).fill(0).join("") + suffix;
                this.edit.project = "";
                this.edit.map = "";
                this.edit.addDialogVisible = false;
                this.edit.tag = tag;
                this.edit.speed = 5;
                this.edit.updateSpeed = 5;
                this.edit.updateTag = "";
                this.edit.updateDialogVisible = false;
                this.edit.updateId = null;
                this.edit.drawPaths = [];
                if (this.closeDialogType === "cancel" && this.Map) {
                    this.Map.clearMap();
                }
            },
            stop(id) {
                this.$http
                    .post(ME.host + "/super/simulation/stop", {
                        id
                    })
                    .then(res => {
                        if (res && res.data && res.data.isOk) {
                            this.listSimulations();
                        }
                    });
            },
            run(id) {
                this.$http
                    .post(ME.host + "/super/simulation/run", {
                        id
                    })
                    .then(res => {
                        if (res && res.data && res.data.isOk) {
                            this.listSimulations();
                        }
                    });
            },
            update(row, e) {
                this.edit.updateDialogVisible = true;
                this.edit.updateSpeed = row.speed;
                this.edit.updateTag = row.tag;
                this.edit.updateId = row.id;
            },
            updateSimulation() {
                const speed = this.edit.updateSpeed;
                const tag = this.edit.updateTag;
                const id = this.edit.updateId;
                if (!speed || !tag || !id) {
                    return this.$message.warning("错误的参数");
                }
                this.$http
                    .post(ME.host + "/super/simulation/update", {
                        speed,
                        tag,
                        id
                    })
                    .then(res => {
                        if (res && res.data && res.data.isOk) {
                            this.closeUpdateDialog();
                            this.listSimulations();
                        }
                    });
            },
            closeUpdateDialog() {
                this.initEdit();
            }
        },
        mounted() {
            this.listProject();
            this.listSimulations();
            setInterval(() => {
                if (this.Map) {
                    this.Map.app.render();
                }
            }, 200);
        }
    });
}
