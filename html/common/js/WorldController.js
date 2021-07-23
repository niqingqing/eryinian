class WorldController {
    constructor(world) {
        this.world = world;
        this.view = new MainView(this, world);
        this.view.initialize();
        this.loaded = 0;
    }

    /* lock onto selected object */
    onClick(selectedObject) {
        /*if (selectedObject) {
         if (selectedObject.mediator.basicObject.className == 'Tag') {
         selectedObject.add(this.view.renderingContext.camera);
         this.view.renderingContext.camera.position.set(0, 10, 10);
         this.view.renderingContext.controls.target = new THREE.Vector3(0, 0, 0);
         this.view.renderingContext.controls.enablePan = false;
         } else if (selectedObject.mediator.basicObject.className == 'Plan') {
         this.resetCamera();
         }
         }*/
    }

    resetCamera() {
        this.view.renderingContext.scene.add(this.view.renderingContext.camera);
        this.view.renderingContext.camera.position.set(DEFAULT_CAMERA_POS[0], DEFAULT_CAMERA_POS[1], DEFAULT_CAMERA_POS[2]);
        this.view.renderingContext.controls.target = new THREE.Vector3(DEFAULT_CAMERA_TAR[0], DEFAULT_CAMERA_TAR[1], DEFAULT_CAMERA_TAR[2]);
        this.view.renderingContext.controls.enablePan = true;
    }

    onToggleVisibility(toggleValue, type) {
        for (var building of this.world.buildings) {
            for (var plan of building.plans) {
                for (var unit of plan.units) {
                    if (type === 'Stats' && unit.className === 'Tag') {
                        unit.emit('ToggleStats', { toggleValue });
                    } else if (unit.className === type) {
                        unit.isVisible = toggleValue;
                    }
                }
            }
        }
    }

    onRecordsCountChange(newCount) {
        for (var building of this.world.buildings) {
            for (var plan of building.plans) {
                for (var unit of plan.units) {
                    if (unit.className == "Tag") {
                        unit.ghostLimit = newCount;
                    }
                }
            }
        }
    }

    onLabelScaleChange(newScale) {
        for (var building of this.world.buildings) {
            for (var plan of building.plans) {
                for (var unit of plan.units) {
                    if (unit.className == "Tag" || unit.className == "Anchor") {
                        unit.labelScale = newScale;
                    }
                }
            }
        }
    }

    onFinishFilterChange(filter) {
        if (Object.keys(this.view.gui.tagsFolder.__folders).length == 1) {
            for (var first in this.view.gui.tagsFolder.__folders) {
                this.view.gui.tagsFolder.__folders[first].__controllers[0].object.follow.call();//[0].object.follow.call();
                break;
            }
        }
    }

    onFilterChange(filter) {
        // remove old tag folders
        for (var tagFolder in this.view.gui.tagsFolder.__folders) {
            this.view.gui.tagsFolder.removeFolder(tagFolder);
        }

        // create new folders
        for (var unit of selectedPlan.units) {
            switch (unit.className) {
                case "Tag":
                    if (unit.properties.alias.length) {
                        if (unit.properties.alias.toLowerCase().indexOf(filter.toLowerCase()) == -1) {
                            continue;
                        }

                        if (unit.properties.alias + " : " + unit.batteryLevel in this.view.gui.tagsFolder.__folders) {
                            unit.guiFolder = this.view.gui.tagsFolder.addFolder(unit.properties.alias + " : " + unit.batteryLevel + " [" + unit.properties.id + "]");
                        } else {
                            unit.guiFolder = this.view.gui.tagsFolder.addFolder(unit.properties.alias + " : " + unit.batteryLevel);
                        }
                    } else {
                        if (unit.name.toLowerCase().indexOf(filter.toLowerCase()) == -1) {
                            continue;
                        }

                        unit.guiFolder = this.view.gui.tagsFolder.addFolder(unit.name + " : " + unit.batteryLevel);
                    }

                    var self = this;
                    var guiControls = new function() {
                        this.follow = function() {
                            var camera = self.view.renderingContext.camera;

                            unit.emit("Follow", { camera });
                            self.view.renderingContext.camera.position.set(0, 10, 10);
                            self.view.renderingContext.controls.target = new THREE.Vector3(0, 0, 0);
                            self.view.renderingContext.controls.enablePan = false;

                            if (UNFOLLOW_BUTTON) {
                                self.view.gui.gui.remove(UNFOLLOW_BUTTON);
                                UNFOLLOW_BUTTON = null;
                            }

                            var guiControls = new function() {
                                this.unfollow = function () {
                                    self.resetCamera();
                                    self.view.gui.gui.remove(UNFOLLOW_BUTTON);
                                    UNFOLLOW_BUTTON = null;
                                }
                            }

                            UNFOLLOW_BUTTON = self.view.gui.gui.add(guiControls, 'unfollow');
                            self.view.gui.gui.__controllers[0].domElement.previousSibling.innerHTML = texts.unfollowTxt;

                        };

                        this.model = "Default";
                    }

                    unit.guiFolder.add(guiControls, 'follow');
                    unit.guiFolder.__controllers[0].domElement.previousSibling.innerHTML = texts.followTxt;

                    var modelsArray = ["Default"];
                    for (var i = 0; i < CUSTOM_GEOMETRIES.length; i++) {
                        modelsArray.push(CUSTOM_GEOMETRIES[i].name);
                    }

                    var controler = unit.guiFolder.add(guiControls, 'model', modelsArray);
                    unit.guiFolder.__controllers[1].domElement.previousSibling.innerHTML = texts.modelTxt;

                    // function wrapped for firefox functionality
                    (function (unit) { controler.onFinishChange(function(value){unit.changeGeometry(value)})})(unit);
                    break;
            }
        }
    }

    updateUnitsGui(plan) {
        // remove old tag folders
        for (var tagFolder in this.view.gui.tagsFolder.__folders) {
            this.view.gui.tagsFolder.removeFolder(tagFolder);
        }
        this.view.gui.tagsFolder.close();

        // remove old anchors folders
        for (var anchorFolder in this.view.gui.anchorsFolder.__folders) {
            this.view.gui.anchorsFolder.removeFolder(anchorFolder);
        }
        this.view.gui.anchorsFolder.close();

        // remove old zones folders
        for (var zoneFolder in this.view.gui.zonesFolder.__folders) {
            this.view.gui.zonesFolder.removeFolder(zoneFolder);
        }
        this.view.gui.zonesFolder.close();

        // remove old models folders
        for (var modelFolder in this.view.gui.modelsFolder.__folders) {
            this.view.gui.modelsFolder.removeFolder(modelFolder);
        }
        this.view.gui.modelsFolder.close();

        // create new folders
        for (var unit of plan.units) {
            switch (unit.className) {
                case "Tag":
                    if (unit.properties.alias.length) {
                        if (unit.properties.alias + " : " + unit.batteryLevel in this.view.gui.tagsFolder.__folders) {
                            unit.guiFolder = this.view.gui.tagsFolder.addFolder(unit.properties.alias + " : " + unit.batteryLevel + " [" + unit.properties.id + "]");
                        } else {
                            unit.guiFolder = this.view.gui.tagsFolder.addFolder(unit.properties.alias + " : " + unit.batteryLevel);
                        }
                    } else {
                        unit.guiFolder = this.view.gui.tagsFolder.addFolder(unit.name + " : " + unit.batteryLevel);
                    }

                    var self = this;
                    var guiControls = new function() {
                        this.follow = function() {
                            var camera = self.view.renderingContext.camera;

                            unit.emit("Follow", { camera });
                            self.view.renderingContext.camera.position.set(0, 10, 10);
                            self.view.renderingContext.controls.target = new THREE.Vector3(0, 0, 0);
                            self.view.renderingContext.controls.enablePan = false;

                            if (UNFOLLOW_BUTTON) {
                                self.view.gui.gui.remove(UNFOLLOW_BUTTON);
                                UNFOLLOW_BUTTON = null;
                            }

                            var guiControls = new function() {
                                this.unfollow = function () {
                                    self.resetCamera();
                                    self.view.gui.gui.remove(UNFOLLOW_BUTTON);
                                    UNFOLLOW_BUTTON = null;
                                }
                            }

                            UNFOLLOW_BUTTON = self.view.gui.gui.add(guiControls, 'unfollow');
                            self.view.gui.gui.__controllers[0].domElement.previousSibling.innerHTML = texts.unfollowTxt;

                        };

                        this.model = "Default";
                        this.color = "Random";
                    }

                    unit.guiFolder.add(guiControls, 'follow');
                    unit.guiFolder.__controllers[0].domElement.previousSibling.innerHTML = texts.followTxt;

                    var modelsArray = ["Default"];
                    for (var i = 0; i < CUSTOM_GEOMETRIES.length; i++) {
                        modelsArray.push(CUSTOM_GEOMETRIES[i].name);
                    }

                    var modelControler = unit.guiFolder.add(guiControls, 'model', modelsArray);
                    unit.guiFolder.__controllers[1].domElement.previousSibling.innerHTML = texts.modelTxt;

                    // function wrapped for firefox functionality
                    (function (unit) { modelControler.onFinishChange(function(value){unit.changeGeometry(value)})})(unit);

                    var colorControler = unit.guiFolder.add(guiControls, 'color', Colors.getColorNames());
                    unit.guiFolder.__controllers[2].domElement.previousSibling.innerHTML = texts.colorTxt;

                    (function (unit) { colorControler.onFinishChange(function(value){unit.changeColor(value)})})(unit);
                    break;
                case "Anchor":
                    if (unit.properties.alias.length) {
                        if (unit.properties.alias in this.view.gui.anchorsFolder.__folders) {
                            unit.guiFolder = this.view.gui.anchorsFolder.addFolder(unit.properties.alias + " [" + unit.properties.id + "]");
                        } else {
                            unit.guiFolder = this.view.gui.anchorsFolder.addFolder(unit.properties.alias);
                        }
                    } else {
                        unit.guiFolder = this.view.gui.anchorsFolder.addFolder(unit.name);
                    }
                    break;
                case "Zone":
                    if (unit.name in this.view.gui.zonesFolder.__folders) {
                        unit.guiFolder = this.view.gui.zonesFolder.addFolder(unit.name + " [" + unit.properties.id + "]");
                    } else {
                        unit.guiFolder = this.view.gui.zonesFolder.addFolder(unit.name);
                    }
                    break;
            }
        }

        var self = this;

        if (!EDITED_OBJECT.active) {
            // tag default model
            var tagModelFolder = this.view.gui.modelsFolder.addFolder('Default Tag');

            var tagModelGuiControls = new function() {
                this.edit = function() {
                    // hide everything
                    for (var unit of plan.units) {
                        if (unit.className === 'Tag' || unit.className === 'Zone' || unit.className === 'Anchor') {
                            unit.isVisible = false;
                        }
                    }

                    // create model
                    var model = new StaticModel(TAG_GEOMETRY, { 'index': -2});
                    plan.addUnit(model);

                    self.view.renderingContext.transform.setSpace('local');
                    self.view.renderingContext.transform.setMode('scale');
                    self.view.renderingContext.scene.add(self.view.renderingContext.transform);
                    model.createTransformControls(self.view.renderingContext.transform);

                    EDITED_OBJECT.active = true;
                    EDITED_OBJECT.index = -2;
                    EDITED_OBJECT.object = model;

                    model.follow(self.view.renderingContext.camera);

                    self.updateUnitsGui(plan);
                }
            }

            tagModelFolder.add(tagModelGuiControls, 'edit');
            tagModelFolder.__controllers[0].domElement.previousSibling.innerHTML = texts.editTxt;

            // anchor default model
            var anchorModelFolder = this.view.gui.modelsFolder.addFolder('Default Anchor');

            var anchorModelGuiControls = new function() {
                this.edit = function() {
                    // hide everything
                    for (var unit of plan.units) {
                        if (unit.className === 'Tag' || unit.className === 'Zone' || unit.className === 'Anchor') {
                            unit.isVisible = false;
                        }
                    }

                    // create model
                    var model = new StaticModel(ANCHOR_GEOMETRY, { 'index': -1});
                    plan.addUnit(model);

                    self.view.renderingContext.transform.setSpace('local');
                    self.view.renderingContext.transform.setMode('scale');
                    self.view.renderingContext.scene.add(self.view.renderingContext.transform);
                    model.createTransformControls(self.view.renderingContext.transform);

                    EDITED_OBJECT.active = true;
                    EDITED_OBJECT.index = -1;
                    EDITED_OBJECT.object = model;

                    model.follow(self.view.renderingContext.camera);

                    self.updateUnitsGui(plan);
                }
            }

            anchorModelFolder.add(anchorModelGuiControls, 'edit');
            anchorModelFolder.__controllers[0].domElement.previousSibling.innerHTML = texts.editTxt;

            // loaded models
            for (var i = 0; i < CUSTOM_GEOMETRIES.length; i++) {
                var modelFolder = this.view.gui.modelsFolder.addFolder(CUSTOM_GEOMETRIES[i].name);

                var guiControls = new function() {
                    this.edit = function() {
                        // hide everything
                        for (var unit of plan.units) {
                            if (unit.className === 'Tag' || unit.className === 'Zone' || unit.className === 'Anchor') {
                                unit.isVisible = false;
                            }
                        }

                        // create model
                        var model = new StaticModel(CUSTOM_GEOMETRIES[i].name, { 'index': i});
                        plan.addUnit(model);

                        self.view.renderingContext.transform.setSpace('local');
                        self.view.renderingContext.transform.setMode('scale');
                        self.view.renderingContext.scene.add(self.view.renderingContext.transform);
                        model.createTransformControls(self.view.renderingContext.transform);

                        EDITED_OBJECT.active = true;
                        EDITED_OBJECT.index = i;
                        EDITED_OBJECT.object = model;

                        model.follow(self.view.renderingContext.camera);

                        self.updateUnitsGui(plan);
                    }
                }

                modelFolder.add(guiControls, 'edit');
                modelFolder.__controllers[0].domElement.previousSibling.innerHTML = texts.editTxt;

                if (i+1 == CUSTOM_GEOMETRIES.length) {
                    modelFolder.open();
                    this.view.gui.modelsFolder.open();
                }
            }
        } else {
            var modelFolder;

            if (EDITED_OBJECT.index == -1) {
                modelFolder = this.view.gui.modelsFolder.addFolder("Default Anchor");
            } else if (EDITED_OBJECT.index == -2) {
                modelFolder = this.view.gui.modelsFolder.addFolder("Default Tag");
            } else {
                modelFolder = this.view.gui.modelsFolder.addFolder(CUSTOM_GEOMETRIES[EDITED_OBJECT.index].name);
            }

            var guiControls = new function() {
                this.translate = function() {
                    self.view.renderingContext.transform.setMode('translate');
                },
                    this.rotate = function() {
                        self.view.renderingContext.transform.setMode('rotate');
                    },
                    this.scale = function() {
                        self.view.renderingContext.transform.setMode('scale');
                    },
                    this.save = function() {
                        // show everyting
                        for (var unit of plan.units) {
                            switch (unit.className) {
                                case 'Tag':
                                    unit.isVisible = GUI_STATE.tags;
                                    break;
                                case 'Anchor':
                                    unit.isVisible = GUI_STATE.anchors;
                                    break;
                                case 'Zones':
                                    unit.isVisible = GUI_STATE.zones;
                                    break;
                                default:
                                    break;
                            }
                        }

                        self.resetCamera();

                        EDITED_OBJECT.object.saveGeometry(EDITED_OBJECT.index);
                        EDITED_OBJECT.active = false;

                        self.view.renderingContext.scene.remove(self.view.renderingContext.transform);
                        plan.removeUnit(EDITED_OBJECT.object);

                        self.updateUnitsGui(plan);
                    }
            }

            modelFolder.add(guiControls, 'translate');
            modelFolder.__controllers[0].domElement.previousSibling.innerHTML = texts.translateTxt;

            modelFolder.add(guiControls, 'rotate');
            modelFolder.__controllers[1].domElement.previousSibling.innerHTML = texts.rotateTxt;

            modelFolder.add(guiControls, 'scale');
            modelFolder.__controllers[2].domElement.previousSibling.innerHTML = texts.scaleTxt;

            modelFolder.add(guiControls, 'save');
            modelFolder.__controllers[3].domElement.previousSibling.innerHTML = texts.saveTxt;

            this.view.gui.modelsFolder.open();
            modelFolder.open();
        }
    }

    onTagBatteryLevelChange(unit) {
        if (unit.properties.alias.length) {
            unit.guiFolder.name = unit.properties.alias + " : " + unit.batteryLevel;
        } else {
            unit.guiFolder.name = unit.name + " : " + unit.batteryLevel;
        }
    }

    onTagPlanChange(tag, oldPlan, newPlan, oldBuilding, newBuilding) {
        for (var building of this.world) {
            if (building.name == oldBuilding) {
                for (var plan of building) {
                    if (plan.name == oldPlan) {
                        plan.removeUnit(tag);
                        break;
                    }
                }
            }

            if (building.name == newBuilding) {
                for (var plan of building) {
                    if (plan.name == newPlan) {
                        plan.addUnit(tag);
                        break;
                    }
                }
            }
        }

        // from undefined to defined
        if ((oldPlan == "" || oldBuilding == "") && newPlan != "" && newBuilding != "") {
            var index = FREE_TAGS.indexOf(tag);

            if (index !== -1) {
                FREE_TAGS.splice(index, 1);
            }
        }
    }

    onObjectFrameRendered(visibleName, object) {
        var vector = new THREE.Vector3();

        var widthHalf = 0.5 * this.view.renderingContext.renderer.context.canvas.width;
        var heightHalf = 0.5 * this.view.renderingContext.renderer.context.canvas.height;

        object.updateMatrixWorld();
        vector.setFromMatrixPosition(object.matrixWorld);
        vector.project(this.view.renderingContext.camera);

        vector.x = ( vector.x * widthHalf ) + widthHalf;
        vector.y = - ( vector.y * heightHalf ) + heightHalf;

        visibleName.css({
            "transform": "translate(" + vector.x + "px, " + vector.y + "px) translate(-50%, -50%)"
        });
    }

    onZoneAdded(zone, plan, selectedPlan) {
        if (plan == selectedPlan) {
            if (zone.name in this.view.gui.zonesFolder.__folders) {
                zone.guiFolder = this.view.gui.zonesFolder.addFolder(zone.name + " [" + zone.properties.id + "]");
            } else {
                zone.guiFolder = this.view.gui.zonesFolder.addFolder(zone.name);
            }
        }
    }
}