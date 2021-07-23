//canvas 私有对象方法
var subVue = {
	//点击放大
	zoomEnlarge: function zoomEnlarge(e) {
		var point = new fabric.Point(ME.canvas.width / 2, ME.canvas.height / 2);
		var scale = ME.canvas.getZoom() + 0.05;
		ubiMap.zoom(point, scale);
		e.preventDefault();
	},
	//点击缩小
	zoomReduce: function zoomReduce(e) {
		var point = new fabric.Point(ME.canvas.width / 2, ME.canvas.height / 2);
		var scale = ME.canvas.getZoom() - 0.05;
		ubiMap.zoom(point, scale);
		e.preventDefault();
	},
	createNewFence: function (pointers) {
		this.fence.edit.id = 0;
		this.fence.edit.pointers = pointers;
	},

	createNewCamera: function (pointers) {
		var r = ubiMap.screenToRel(pointers[0]);
		this.camera.floatEdit.data.id = 0;
		this.camera.floatEdit.data.pointers = pointers;
		this.camera.floatEdit.data.x = r.x;
		this.camera.floatEdit.data.y = r.y;
		this.camera.floatEdit.data.z = 100;
	},

	createNewWall: function (pointers) {
		this.wall.floatEdit.data.id = 0;
		this.wall.floatEdit.data.pointers = pointers;
	},
	//清除报警
	clearSiren: function clearSiren() {
		$("#jqxFenceNotification").jqxNotification("closeAll");
		$("#jqxSosNotification").jqxNotification("closeAll");
		ME.sos = {};
	},
	hideMenus: function hideMenu() {
		$('.logoIn').removeClass('active');
		$('.panel .tab-list .list-item').removeClass('active');
		ME.vm.tabActive = '';
		$('#right_menus_items>div').removeClass('active');
		$('.total_tag_table').hide();
	},
	adjustAnchorStepThree: function () {
		var params = [];
		for (var i = 0; i < this.adjustAnchor.datas.length; i++) {
			var d = this.adjustAnchor.datas[i];
			if (isNaN(d.adjust_x) || isNaN(d.adjust_y)) continue;
			params.push({ id: d.id, sourceId: d.sourceId, mac: d.mac, x: d.adjust_x, y: d.adjust_y });
		}

		//submit
		this.adjustAnchor.submitBtnDisable = true;
		ME.vm.$http.post('anchor/adjust', { params: params }).then(function (res) {
			this.adjustAnchor.submitBtnDisable = false;
			var result = res.body;
			if (result.isOk) {


				var anchors = ME.vm.anchor.data;
				for (var i = 0; i < params.length; i++) {
					var d = params[i];

					ubiMap.convert(d);

					//修改vue
					for (var k = 0; k < anchors.length; k++) {
						var a = anchors[k];
						if (a.code == d.code) {
							a.x = d.x, a.y = d.y;
							a.screenX = d.screenX, a.screenY = d.screenY;
							break;
						}
					}

					//move marker
					ubiMap.moveNode('anchor_' + d.code, d.screenX, d.screenY);
				}

				this.adjustAnchor.dialog = false;
				this.$alert("校准成功！", '提示');
			} else {
				this.$alert("校准失败！" + result.msg, '提示', {
					confirmButtonText: '确定'
				});
			}
		});
	},
	historyPlayGo: function (tag, paths) {
		//根据历史数据绘制路径
		var marker = ubiMap.getHisMarker('tag_' + tag.code);
		if (!marker) {
			tag.markerType = "tag";
			tag.markerId = "tag_" + tag.code;
			marker = ubiMap.addHisMarker(tag);
		}

		marker.log = [];
		var positions = [];
		for (var i = 0; i < paths.length; i++) {
			var path = paths[i];
			var pos = ubiMap.convert(path, ME.vm.curRealLength); //转化
			pos.createTime = Date.parse(new Date(path.time));
			pos.code = path.tag;
			marker.log.push({ x: pos.x, y: pos.y });
			positions.push(pos);
		}
		var color = 'red';
		if (tag.cat && tag.cat.color) color = tag.cat.color;
		ubiMap.drawLine(marker, marker.log, color);

		return positions;
	},
	historyAnimate: function historyAnimate() {
		if (this.history.slider >= this.history.max) {
			this.historyStopAnimate();
			return;
		}
		this.history.slider += this.history.step;
		//时间播放 以秒为单位
		this.history.slider = Math.round(this.history.slider / 1000) * 1000;

		var datas = this.history.datas[this.history.slider];
		if (!datas) return;
		datas.forEach(function (path) {
			var marker = ubiMap.getHisMarker('tag_' + path.code);
			if (!marker) return;

			marker.animate({ 'left': path.x - ME.markerSize / 2, 'top': path.y - ME.markerSize }, {
				duration: ME.vm.history.intervalTime,
			});
		});
	},
	historyClear: function historyClear() {
		//停止动画
		this.historyStopAnimate();
		this.history.slider = this.history.min;
		ubiMap.toggleTag(false, true);
		this.history.datas = {};
	},
	markerLogClear: function markerLogClear() {
		ubiMap.toggleTag(false);
		ubiMap.toggleAnchor(false);
	},

	getTagType: function getTagType(id) {
		return this.getNodeById('tagType', id);
	},
	getTagCat: function getTagCat(id) {
		return this.getNodeById('tagCat', id);
	},
	//切换地图
	mapChangeImg: function mapChangeImg() {
		if (this.anchor.floatEdit.data.mapId) {
			var map = this.getNodeById('map', this.anchor.floatEdit.data.mapId);
			if (map) {
				ME.vm.anchor.floatEdit.mapImg = UBIT.getImgSrc('maps', map.filePath);
				return;
			}
		}
	},
	//设置基站、摄像头的位置
	setCoordinate: function setCoordinate(type) {
		ME.canvas.defaultCursor = 'default';
		//设置标识，区分操作
		ME.vm.optionType = 'setCoord_' + type;

		if(type=='tag'){
            SysAlert.setWaitMessage("按ESC按键可以取消调整位置", "info", !0, "long");
		}
	},
	//绘制围墙
	setWall: function (e) {
		//清除
		ubiMap.cleanPolygon();

        SysAlert.setWaitMessage("点击界面可以绘制直线的围墙，按ESC按键可以取消", "info", !0, "long");
		ME.canvas.defaultCursor = 'crosshair';
		ME.vm.optionType = 'wall';
		this.addHandle('wall', e);
	},
	//绘制围栏
	setFence: function setFence(e) {
		//清除
		ubiMap.cleanPolygon();

        SysAlert.setWaitMessage("点击界面可以绘制多边形的围栏，按ESC按键可以取消", "info", !0, "long");
		ME.canvas.defaultCursor = 'crosshair';
		ME.vm.optionType = 'fence';
		this.addHandle('fence', e);
	},
	//绘画摄像头覆盖区域
	// setCamera: function setCamera(e) {
	// 	//提示取消，改变样式
	// 	SysAlert.setWaitMessage("点击界面可以绘制摄像头覆盖区域，第一个点为摄像头的坐标，按ESC按键可以取消", "info", !0, "long"), $("body").css("cursor", "crosshair"), vsn.highlight("#mapSvg");
	//
	// 	ubiMap.removeUnsavedPolygons(),
	// 		ubiMap.setplacingStatus("polygon", null, null, null, 'camera');
	// 	this.addHandle('camera', e);
	// },
	getFenceTypeByid: function getFenceTypeByid(id) {
		return this.getNodeById('fenceType', id);
	},
	showTip: function showTip(msg) {
		this.$alert(msg, {
			confirmButtonText: '确定',
			closeOnPressEscape: true,
			closeOnClickModal: true,
			confirmButtonClass: 'dissure'
		})

	},

	//获取data
	setNodeData: function setNodeData(data, scan, tags) {
		//无数据，提前结束
		if (!data) {
			return;
		}
		var vm = this;
		var realLength = vm.curRealLength = data.realLength;
		ME.mapWidth = data.pixelLength;

		//绘制地图
		ubiMap.setBg(data, tags, realLength);

		//绘制其它基站和标签
		if (scan) {
			var convertFunc = function (position) {
				return ubiMap.convert(position, ME.vm.curRealLength);
			};
			//绘制围栏
			DataManager.loadFences(vm.mapId, this, dataInit, convertFunc, 'fence');
			DataManager.loadNodes(vm.mapId, this, dataInit, convertFunc);
		}
	},
	//取消基站编辑
	anchorFloatEditCancell: function anchorFloatEditCancell() {
		//回到原位
		var edit = this.anchor.floatEdit.data;
		for (var i = 0; i < this.anchor.data.length; i++) {
			var a = this.anchor.data[i];
			if (a.code == edit.code) {
				ubiMap.moveNode(edit.markerId, a.screenX, a.screenY);
				break;
			}
		}

		ME.vm.optionType = null;
		this.anchor.floatEdit.visible = false;
	},
	// 关闭按钮
	closeBtn: function closeBtn(event, key) {
		event.preventDefault();
		util.emptyObj(this[key].edit);
		this[key].visible = false;
		ubiMap.cleanPolygon();
		return false;
	},

	//围墙显示/隐藏
	showWall: function (flag) {
		var walls = ME.vm.wall.data;
		for (var i = 0; i < walls.length; i++) {
			var f = walls[i];
			if (flag) {
				// if(f&&f.area){continue}
				var data = ME.vm.wall.data[i];
				var start = ubiMap.convert({ x: data.startX, y: data.startY }, ME.vm.curRealLength);
				var end = ubiMap.convert({ x: data.endX, y: data.endY }, ME.vm.curRealLength);
				// 重新加载此围墙
				data.line = ubiMap.drawFabricLine(start, end, data.wtype);

                data.line.node = data;
                data.line.flag = data.markerType;
                MarkerTool.markerHover(data.line);

			} else {
				ME.canvas.remove(f.line);
			}
		}
	},
	//标签电量显示
	showTagPower: function showTagPower(status) {
		var allMarkers = ubiMap.getAllMarker();
		for (var m in allMarkers) {
			var marker = allMarkers[m];
			if (marker.flag != 'tag') continue;
            status? MarkerTool.showPower(marker) : MarkerTool.hidePower(marker);
		}
	},
	// 添加输入框显示
	addHandle: function addHandle(key, event) {
		event.preventDefault();
		this[key].visible = true;
		util.emptyObj(this[key].edit);
		if (key === 'tag' || key === 'anchor') {
			this[key].edit.color = "#3c72df";
		} else if (key === 'fence') {
			this[key].edit.ftypeId = this.fenceType.data[0].id;
			this[key].edit.trif = 'io';
			this[key].edit.isRecord = '1';
			this[key].edit.isEmail = '0';
			this[key].edit.isSMS = '0';

		} else if (key === 'camera') {
			//清空编辑框数据（修改时残留）
			util.emptyObj(ME.vm.camera.floatEdit.data);

			ME.vm.camera.floatEdit.data.interfaceAgreement = 'ONVIF';
			ME.vm.camera.floatEdit.data.networkAgreement = 'RTSP';
			ME.vm.camera.floatEdit.data.initAngleX = '0';
			ME.vm.camera.floatEdit.data.rotateMax = '320';

		} else if (key === 'wall') {
			util.emptyObj(ME.vm.wall.floatEdit.data);
			this[key].deleteBtn = false;
			return
		}
		this[key].deleteBtn = false;
		this[key].edit.mapId = this.mapId;
	},

	cameraTableHeaderClick: function cameraTableHeaderClick(column, event) {
		if (column.label.trim() == '显示') {
			this.handleCheckAllChange('camera');
		}
	},

	cameraFormatter: function cameraFormatter(row, column) {
		return (new Date(row.addTime.replace(/-/g, '/'))).toLocaleString();
	},

	createNewCamera: function (pointers) {
		var r = ubiMap.screenToRel(pointers[0]);
		this.camera.floatEdit.data.id = 0;
		this.camera.floatEdit.data.pointers = pointers;
		this.camera.floatEdit.data.x = r.x;
		this.camera.floatEdit.data.y = r.y;
		this.camera.floatEdit.data.z = 100;
	},


	//绘画摄像头覆盖区域
	setCamera: function setCamera(e) {
		//清除
		ubiMap.cleanPolygon();
        SysAlert.setWaitMessage("点击界面可以绘制多边形的围栏，按ESC按键可以取消", "info", !0, "long");
		ME.canvas.defaultCursor = 'crosshair';
		ME.vm.optionType = 'camera';
		this.addHandle('camera', e);
	},


	//摄像头删除方法
	cameraDelete: function (event, id) {
		event.preventDefault();
		var key = 'camera'
		if (!id) {
			return;
		}

		this.$confirm("确认删除摄像头么？请谨慎操作！", "提示", {}).then(function () {
			var index = _.findIndex(ME.vm[key].data, ['id', id]);
			var ids = [id];
			service(key).delete({ ids: ids }).then(util.jsonFunc).then(function (json) {
				if (json.isOk) {

					var delData = ME.vm[key].data.splice(index, 1);
					//删除摄像头区域
					if (delData[0].marker) {
						ME.canvas.remove(delData[0].marker);
						ME.canvas.remove(delData[0].area);
					}
					ubiMap.delMarker(delData[0].markerId); //delData是删除元素集合
				}
			}).catch(function (e) {
				console.warn(e);
			});

		});

	},


	//取消编辑摄像头回到原位
	cameraFloatEditCancell: function cameraFloatEditCancell() {
		//回到原位
		var edit = this.camera.floatEdit.data;
		var camera = this.getNodeById('camera', edit.id);

		ubiMap.moveNode(edit.markerId, camera.screenX, camera.screenY);

		if (edit.area) {
			ME.canvas.remove(edit.area);
			delete edit['area'];
		}

		camera.area = ubiMap.areaShow(camera, 'camera');

		this.camera.floatEdit.visible = false;

		UBIT.emptyObj(this.camera.floatEdit.data);
		this.camera.visible = false;

		ubiMap.cleanPolygon();
	},

	//摄像头操作确认方法
	submitCamera: function submitCamera(key, data, callback, type) {
		// debugger;
		var vm = this;
		var postData = util.deepCopy(data);
		service(key).save(postData).then(util.jsonFunc).then(function (json) {
			if (json.isOk) {

				util.emptyObj(vm.camera.floatEdit);
				data = null;
				vm.camera.floatEdit.visible = false;
				var newCamera = JSON.parse(json.entity);
				if (callback) callback(key, type, postData, newCamera);

			} else {
				ME.vm.showTip(json.msg);
			}
		});
	},

	//保存修改摄像头
	cameraSave: function (event) {
		event.preventDefault();
		var key = 'camera';
		var data = this[key].floatEdit.data;

		//检查数据
		if (!(data.ip || data.port)) {
			this[key].visible = true;
			this.showTip('请输入摄像头的IP和端口号');
			return;
		}
		if (!(data.x || data.y)) {
			this[key].visible = true;
			this.showTip('请输入摄像头的坐标');
			return;
		}

		var type = 'update';
		if (!data.id) {
			var type = 'add';

			data.mapId = this.mapId;

			//获取点击各点坐标
			var newCamera = data.pointers;
			//检查数据
			if (!newCamera || newCamera.length < 3) {
				this['camera'].visible = true;
				this.showTip('请绘制摄像头覆盖区！');
				return;
			}

			//屏幕坐标转换为实际坐标
			var points = '';
			for (var i = 0; i < newCamera.length; i++) {
				//拼接各点，存储
				points += ubiMap.screenToRel(newCamera[i], ME.vm.curRealLength).x;
				points += ' ';
				points += ubiMap.screenToRel(newCamera[i], ME.vm.curRealLength).y;
				points += ',';
				if (i == newCamera.length - 1) {
					points += ubiMap.screenToRel(newCamera[i], ME.vm.curRealLength).x;
					points += ' ';
					points += ubiMap.screenToRel(newCamera[i], ME.vm.curRealLength).y;
				}
			}
			data.points = points;
			delete data['pointers'];
		} else if (data.area) {
			var node = this.getNodeById('camera', data.id);
			node.area = data.area;
		}
		if (data.area) delete data['area'];

		this.submitCamera('camera', data, this.cameraSubmitAfter, type);
	},



	cameraSubmitAfter: function cameraSubmitAfter(key, type, data, res) {
		if (key != 'camera') {
			return;
		}
		data.addTime = res.addTime;
		//清空新绘制的摄像头区域
		ME.vm.camera.floatEdit.visible = false;
		ME.vm.camera.visible = false;
		ubiMap.cleanPolygon();
		if (type == 'add') {

			data.id = res.id;
			data.isShow = true;
			data.polygonPoints = DataManager.generatePolygonByPoints(data.points, function (position) {
				return ubiMap.convert(position, ME.vm.curRealLength);
			});
			data.markerType = 'camera';
			data.markerId = data.markerType + '_' + data.id;

			if (ME.vm.switchData.camera) {
				//重新绘制摄像头
				data.marker = ubiMap.addMarker(data);

				// 重新加载此围栏
				data.area = ubiMap.areaShow(data, data.markerType);
				MarkerTool.markerHover(data.area);
			}

			ME.vm[key].data.push(data);

		} else {
			//重新获取后台数据
			var index = _.findIndex(ME.vm[key].data, ['id', data.id]);
			var oldData = ME.vm[key].data[index];


			data.markerType = key;
			data.markerId = key + '_' + res.id;
			data.area = oldData.area;
			data.area.node = data;
			data.area.node.markerType = 'camera';
			data.area.flag = 'camera';
			//根据数据更换图标样式
			data.marker = ubiMap.addMarker(data);

			ME.vm[key].data.splice(index, 1, data); //替换
		}
	},
	nodeSubmitAfter: function nodeSubmitAfter(key, type, data, res) {
		if (key != 'tag' && key != 'anchor' && key != 'camera') {
			return;
		}
		//重新获取后台数据
		var index = _.findIndex(ME.vm[key].data, ['sourceId', data.sourceId]);
		var reDate = JSON.parse(res.entity);
		reDate.markerType = key;
        if (key == 'tag' || key == 'anchor') {
            reDate.markerId = key + '_' + reDate.code;
        }else {
            reDate.markerId = key + '_' + reDate.id;
		}

		reDate.isShow = true;

		ME.vm[key].floatEdit.data.id = reDate.id;
		ME.vm[key].data.splice(index, 1, reDate); //替换

		ubiMap.delMarker(data.markerId); //delData是删除元素集合
		//根据数据更换图标样式
		ubiMap.addMarker(reDate);
		//关闭
		ME.vm[key].floatEdit.visible = false;
	},
	tagDelete: function tagDelete(event) {
		event.preventDefault();
		var key = 'tag';
		if (!this[key].edit) {
			return;
		}
		var id = this[key].edit.id;
		var vm = this;

		if (!id) {
			return;
		}

		var index = _.findIndex(vm[key].data, ['id', id]);
		var delData = vm[key].data.splice(index, 1);

		//调删除标签的方法;
		ubiMap.delMarker(delData[0].markerId); //delData是删除元素集合

		util.emptyObj(vm[key].edit);
		vm[key].visible = false;

		// debugger;
		service(key).delete({ id: id }).then(util.jsonFunc).then(function (json) {
			if (!json.isOk) {
				vsn.resetData(vm[key].data, delData[0], index);
				ubiMap.addMarker(delData[0]);
			}
		}).catch(function (e) {
			vsn.resetData(vm[key].data, delData[0], index);
			ubiMap.addMarker(delData[0]);
		});
	},
	//anchor
	anchorSave: function anchorSave(event) {
		var _this2 = this;

		this.$confirm("确定修改基站么？请谨慎操作！如坐标不准确会造成定位不准！", "提示", {}).then(function () {
			event.preventDefault();
			var key = 'anchor';
			var edit = _this2[key].floatEdit;
			var data = Object.assign({},edit.data);
			data.x = data.x * 100;
			data.y = data.y * 100;

			//检查数据
			// if(data.isMaster===''){
			//     this[key].visible = true;
			//     this.showTip('请选择基站类型');
			//     return;
			// }
			if (data.code == '') {
				edit.visible = true;
				_this2.showTip('基站编码不能为空');
				return;
			}
			if (data.alias == '') {
				edit.visible = true;
				_this2.showTip('基站昵称不能为空');
				return;
			}
			if (data.mapId == '') {
				_this2[key].visible = true;
				_this2.showTip('请选择地图');
				return;
			}
			if (!data.x || !data.y) {
				// || !data.z
				edit.visible = true;
				_this2.showTip('请确定基站实际坐标');
				return;
			}
			//取消定位
			ME.vm.optionType = null;

			_this2.submit(data.sourceId, key, data, _this2.nodeSubmitAfter);
		}).catch(function () {
		});
	},
	//保存验证围栏绘制
	fenceSave: function fenceSave(event) {
		event.preventDefault();
		var key = 'fence';
		var data = this[key].edit;
		if (!data.cname) {
			this[key].visible = true;
			this.showTip('围栏名称不能为空');
			return;
		}
		if (!data.ftypeId) {
			this[key].visible = true;
			this.showTip('请选择围栏类型');
			return;
		}
		if (!data.mapId) {
			this[key].visible = true;
			this.showTip('请选择地图');
			return;
		}

		var fenceType = this.getFenceTypeByid(data.ftypeId);
		data.ftype = fenceType.cname;
		data.color = fenceType.color;
		data.type = UBIT.deepCopy(fenceType);

		//add operate
		if (!data.id) {
			//检查数据
			if (!data.pointers || data.pointers.length < 3) {
				this[key].visible = true;
				this.showTip('请绘制围栏');
				return;
			}

			//屏幕坐标转换为实际坐标
			//拼接各点
			var points = '';
			for (var i = 0; i < data.pointers.length; i++) {

				points += ubiMap.screenToRel(data.pointers[i], ME.vm.curRealLength).x;
				points += ' ';
				points += ubiMap.screenToRel(data.pointers[i], ME.vm.curRealLength).y;
				points += ',';
				if (i == data.pointers.length - 1) {
					points += ubiMap.screenToRel(data.pointers[i], ME.vm.curRealLength).x;
					points += ' ';
					points += ubiMap.screenToRel(data.pointers[i], ME.vm.curRealLength).y;
				}
			}

			data.points = points;
			delete data.pointers;
		}

		this.submit(data.id, key, data, this.fenceSubmitAfter);
		this[key].visible = false;
	},
	//围栏绘制之后操作
	fenceSubmitAfter: function fenceSubmitAfter(key, type, data, res) {
		if (type == 'add') {
			data.id = res.id;
			data.isShow = true;
			data.innerTags = {};
			data.polygonPoints = DataManager.generatePolygonByPoints(data.points, function (position) {
				return ubiMap.convert(position, ME.vm.curRealLength);
			});

			ubiMap.escDrawArea();

			if (ME.vm.switchData.fence) {
				// 重新加载此围栏
				data.area = ubiMap.areaShow(data, 'fence');
				MarkerTool.markerHover(data.area);
				this.freshFenceInnerTags(data);
			}

			ME.vm[key].data.push(data);

		} else {
			//重新获取后台数据
			var index = _.findIndex(ME.vm[key].data, function (item) {
				return item.id == data.id;
			});
			//根据修改值改变颜色
			data.area = ME.vm[key].data[index].area;
			data.area.set({ fill: data.color });
			data.area.node = data;
			data.area.node.markerType = 'fence';
			data.area.flag = 'fence';

			ME.vm[key].data.splice(index, 1, data); //替换
		}
	},
	fenceDelete: function fenceDelete(event, fenceId) {
		var _this3 = this;
		this.$confirm("确认删除围栏么？请谨慎操作！", "提示", {}).then(function () {
			event.preventDefault();
			var key = 'fence';
			if (!_this3[key].edit) {
				return;
			}
			var id = fenceId;
			var vm = _this3;

			if (!id) {
				return;
			}

			var index = _.findIndex(vm[key].data, ['id', id]);
			var delData = vm[key].data.splice(index, 1);

			service(key).delete({ id: id }).then(util.jsonFunc).then(function (json) {
				if (json.isOk) {

					//删除围栏区域
					if (delData[0].area) {
						ME.canvas.remove(delData[0].area);
					}

					util.emptyObj(vm[key].edit);
					vm[key].visible = false;
				}
			}).catch(function (e) {
				console.dir(e);
			});
		}).catch(function () {
		});
	},
	//保存围墙
	wallSave: function wallSave(event) {
		event.preventDefault();
		var key = 'wall';
		var data = this[key].floatEdit.data;
		if (!data.cname) {
			this[key].visible = true;
			this.showTip('围墙名称不能为空');
			return;
		}
		data.wtype = data.wtype ? data.wtype : '实墙';
		data.mapId = ME.vm.mapId;
		//处理围墙各点并保存
		if (!data.id) {
			//检查数据
			if (!data.pointers || data.pointers.length !== 2) {
				this[key].visible = true;
				this.showTip('请绘制围墙');
				return;
			}
			data.startX = data.pointers[0].relX;
			data.startY = data.pointers[0].relY;
			data.endX = data.pointers[1].relX;
			data.endY = data.pointers[1].relY;
			delete data.pointers;
		}

		this.submit(data.id, key, data, this.wallSubmitAfter);
		this[key].visible = false;
	},
	//围墙绘制之后操作
	wallSubmitAfter: function wallSubmitAfter(key, type, data, res) {
		if (type == 'add') {
			data.id = JSON.parse(res.entity).id;
			data.isShow = true;
			data.mapCname = ME.vm.currentMap.cname;
            data.markerType='wall';
			ubiMap.cleanPolygon();
			if (ME.vm.switchData.wall) {
				var start = ubiMap.convert({ x: data.startX, y: data.startY }, ME.vm.curRealLength);
				var end = ubiMap.convert({ x: data.endX, y: data.endY }, ME.vm.curRealLength);
				// 重新加载此围墙
				data.line = ubiMap.drawFabricLine(start, end, data.wtype);

                data.line.node = data;
                data.line.flag = data.markerType;
                MarkerTool.markerHover(data.line);
			}

			ME.vm[key].data.push(data);

		} else {
			//重新获取后台数据
			var index = _.findIndex(ME.vm[key].data, function (item) {
				return item.id == data.id;
			});
			ME.vm[key].data.splice(index, 1, data); //替换
		}
	},
	//删除围墙
	wallDelete: function wallDelete(event, wallId) {
		var _this5 = this;
		this.$confirm("确认删除围墙么？请谨慎操作！", "提示", {}).then(function () {
			event.preventDefault();
			var key = 'wall';
			if (!_this5[key].floatEdit) {
				return;
			}
			var id = wallId;
			var vm = _this5;

			if (!id) {
				return;
			}

			var index = _.findIndex(vm[key].data, ['id', id]);
			var delData = vm[key].data.splice(index, 1);

			service(key).delete({ id: id }).then(util.jsonFunc).then(function (json) {
				if (json.isOk) {

					// 删除围墙
					if (delData[0].line) {
						ME.canvas.remove(delData[0].line);
					}

					util.emptyObj(vm[key].floatEdit);
					vm[key].visible = false;
				}
			}).catch(function (e) {
				console.dir(e);
			});
		}).catch(function () {
		});
	},
	//新增、重置、删除
	doneHandle: function doneHandle(type, key, event) {
		event.preventDefault();
		var data = this[key].edit,
			vm = this,
			id = this[key].edit.id;

		switch (type) {
			case 'save':
				if (key === 'tag' || key === 'anchor') {
					var flag = vm.judgeValue(data, ['id']);
					if (!flag) {
						this[key].visible = true;
						return;
					}
					ubiMap.getPos(false);
					vm.submit(id, key, data);
				}
				//上传
				if (key === 'map') {
					this.map.edit.userId = ME.user.id;
					var flag = vm.judgeValue(data, ['id']);
					if (!flag) {
						this[key].visible = true;
						return;
					}
					var upload = document.getElementById("upload");
					var imgFile;
					//上传图片不能为空
					if (upload && upload.dataset && upload.dataset.imgFile) {
						imgFile = upload.dataset.imgFile;
						data.filePath = imgFile;
						var src = data.filePath;
						var img = new Image();
						img.src = UBIT.getImgSrc('maps', src);
						img.onload = function () {
							var length = this.width;
							data.pixelLength = length;
							var flag = vm.judgeValue(data, ['id']);
							if (!flag) {
								this[key].visible = true;
								return;
							}
							vm.submit(id, key, data);
						};
					} else {
						if (id === "") {
							return ME.vm.showTip("请上传图片！");
						}
						vm.submit(id, key, data);
					}
				}
				this[key].visible = false;
				break;

			case 'clear':
				util.emptyObj(this[key].edit);
				if (key === 'map') {
					this.clearUpload();
				}
				break;

			case 'delete':
				if (id !== undefined) {
					//debugger;
					var index = _.findIndex(vm[key].data, ['id', id]);
					var delData = vm[key].data.splice(index, 1);
					var tagIndex = _.findIndex(vm[key].data, ['id', id]);
					if (key === 'tag' || key === 'anchor') {
						//调删除标签的方法;
						ubiMap.delMarker(delData[0].markerId); //delData是删除元素集合
						vm[key].data.splice(tagIndex, 1);
					}
					if (key === 'map') {
						ubiMap.paperClear();
					}
					util.emptyObj(vm[key].edit);
					vm[key].visible = false;
					data = null;
					// debugger;
					service(key).delete({ id: id }).then(util.jsonFunc).then(function (json) {
						if (!json.isOk) {
							vsn.resetData(vm[key].data, delData[0], index);

							if (key === 'tag' || key === 'anchor') {
								ubiMap.addMarker(delData[0]);
								vsn.resetData(vm[key].data, delData[0], tagIndex);
							} else {
								vm.changeBuild();
							}
						}
					}).catch(function (e) {
						vsn.resetData(vm[key].data, delData[0], index);
						if (key === 'tag' || key === 'anchor') {
							ubiMap.addMarker(delData[0]);
						} else {
							vm.changeBuild();
						}
					});
				}
				break;
		}
		//清空上传记录
	},
	getMapById: function getMapById(mapId) {
		return this.getNodeById('map', mapId);
	},

	// 按钮开关
	switchFunc: function switchFunc(key, e) {
		if (this.power) {
			var status = this.switchData[key] = !this.switchData[key];
            switch (key) {
                case 'isShowActiveTag':
                	ME.vm.switchData.isShowActiveTag = !ME.vm.switchData.isShowActiveTag;
                	this.onlyShowActiveTag(ME.vm.switchData.isShowActiveTag);
                    return;
            }
			switch (key) {
				case 'tag':
					ubiMap.toggleTag(status, this.rangeData.value);
					break;
				case 'grid':
					ubiMap.toggleGrid(status);
					break;
				case 'distance':
					ubiMap.drawDistance(status, 'distance');
					ME.vm.spaceBarClickTimes = 0;
					break;
				case 'correctMap':
					ubiMap.drawDistance(status, 'correctMap');
					ME.vm.spaceBarClickTimes = 0;
					break;
				case 'anchor':
					ubiMap.toggleAnchor(status, this.rangeData.value);
					break;
				case 'fence':
					ubiMap.toggleFence(status);
					break;
				case 'lockTag':
					if (ME.socketRequest.closed) {
						webSocketInit('2D', this.curRealLength,
                            {
                                coord:websocketOnData,
                                sos:SysAlert.sos,
                                fenceAlert:SysAlert.fenceAlert,
                                moreMonitorAlert:SysAlert.moreMonitorAlert,
                                forceRemove:SysAlert.forceRemove,
                                lifeStatus:SysAlert.updateHeartRate,
                                distanceAlert:SysAlert.distanceAlert,
                                heartAlert:SysAlert.heartAlert,
                                clearHalo:MarkerTool.clearHaloAndLine,
                            });
                    }
					ubiMap.setLockTag(status);
					break;
				case 'lockAnchor':
					ubiMap.setLockAnchor(status);
					break;
				case 'power':
                    this.showTagPower(status);
                    break;
				case 'powerAuto':
					// ME.vm.switchData.powerAuto = !ME.vm.switchData.powerAuto;
					break;
				case 'wall':
					this.showWall(status);
					break;
			}
		}
	},
	historyPlayDo: function (datas) {
		// console.log(datas);
		this.history.isLoading = false;
		if (!datas || _.isEmpty(datas)) {
			this.showTip('您查询的历史数据为空！');
			this.historyClear();
			return;
		}

		var params = this.history;
		params.intervalTime = 200;

		//停止websocket
		ubiMap.lockTag = true;
		//隐藏所有的allMarker
		this.markerLogClear();

		//clear laste play
		this.historyClear();


		//分标签遍历历史数据
        /**
         * 1 draw history track
         * 2 sort datas by timestamp
         */
		var newDatas = {};
		for (var code in datas) {
			var paths = datas[code].paths;
			if (paths && paths.length > 0) {
				var tag = this.getNodeByCode('tag', code);
				if (!tag) continue;
				var positions = this.historyPlayGo(tag, paths);
				//sort data
				for (var i = 0; i < positions.length; i++) {
					var pos = positions[i];
					var t = pos.createTime;
					if (!newDatas[t]) {
						newDatas[t] = [];
					}
					newDatas[t].push(pos);
				}
			}
		}

		//开启动画
		this.history.datas = newDatas;
		this.historyStartAnimate();
		this.history.isShow = true;
	},



	//热图分析
	analyst: function analyst() {
		if (!ME.HeatTool) {
			ME.HeatTool = heatMapInit();
		}

		//组装查询参数
		var timeSpan = this.heatMapTimeRange();
		if (!timeSpan) {
			this.heatMap.isShow = false;
			return;
		}
		// 请选择标签
		if (!this.heatMap.tags || this.heatMap.tags.length < 1) {
			this.showTip('请选择分析标签');
			this.heatMap.isShow = false;
			return;
		}
		//当前时间(查询时时间小于终止时间，每次后台取数据，否则只在第一次查询时取数据)
		var nowTime = new Date().getTime();
		//查询终止时间
		var sp1 = new Date(timeSpan[1].replace(/-/g, "/")).getTime();
		var timeDiff = sp1 - nowTime;
		//时间变化/查询标签变化/查询时时间小于终止时间，后台获取数据
		if (this.heatMap.tagChanged || timeDiff > 0) {
			this.heatMap.tagChanged = false;
			//先清空热力图
			ME.vm.heatMap.datas = [];
			ME.HeatTool.applyHeatMap(ME.vm.heatMap.datas);
			//重新获取数据，分析
			ME.HeatTool.analystGetDatas(this.mapId, this.heatMap.tags, timeSpan[0], timeSpan[1]);
		} else {
			ME.HeatTool.applyHeatMap(ME.vm.heatMap.datas);
			ME.vm.heatMap.isShow = true;
		}
		//根据数据热图分析



	},
	//热力图右侧内容变化时方法
	checkTag: function () {
		this.heatMap.tagChanged = true;
	},
	cancelAnalyst: function () {
		if (ME.HeatTool) ME.HeatTool.cancelAnalyst();
		this.heatMap.isShow = false;
        this.heatMap.tagChanged = true;
	},

	//分析时间处理
	heatMapTimeRange: function heatMapTimeRange() {
		var range = this.heatMap.datetimeRange;
		if (!range[0] || !range[1]) {
			this.showTip('请选择时间范围！');
			return false;
		}

		//更新 slider max and min
		var min_interval = range[0].getTime();
		var max_interval = range[1].getTime();
		var span = max_interval - min_interval;
		//分析时间范围 1秒 -  7天;
		if (span < 1) {
			this.showTip('起始时间需要小于结束时间，请选择合理的时间范围！');
			return false;
		} else {
			if (span > 7 * 24 * 3600 * 1000) {
				this.showTip('时间范围不能大于7天，请选择合理的时间范围！');
				return false;
			}
		}
		var start = range[0].Format('yyyy-MM-dd hh:mm:ss');
		var end = range[1].Format('yyyy-MM-dd hh:mm:ss');
		return [start, end];
	},

	//当所选标签变化时，重新分析 TODO
	againByChange: function () {
		//从所有数据中筛选出
		var datas = ME.vm.heatMap.HeatTool.groupWhereByTag(ME.vm.heatMap.tags);
		if (datas == 'undefined') {
			return [];
		}
		return datas;
		//重新渲染
	},

	//时间范围变化时触发 TODO
	timeToRefresh: function timeToRefresh(newVal) {
		this.heatMap.timeTo = new Date(newVal * 10000).Format('yyyy-MM-dd hh:mm:ss');
		//重新渲染

		var showData = this.againByChange();
		if (!showData) {
			return [];
		}
		//将数据按照时间处理

		//渲染新数据
		ME.vm.heatMap.HeatTool.applyHeatMap(this.againByChange());
		// ME.vm.heatMap.HeatTool.cancelAnalyst();
		//获取时间段内需要分析的点
		// ME.vm.heatMap.HeatTool.applyHeatMap(applyData);

	},
    searchChange:function(event){
		if(ME.searchTagMarker){
			MarkerTool.hideSearch(ME.searchTagMarker);
		}
	}
}


//canvas 私有计算属性
var subWatch = {
	'markerId': function markerId(newVal) {
		if (this.markerId !== -1 && this.markerType) {
			var data = _.find(this[this.markerType].data, ['sourceId', newVal]);
			if (data) {
				ubiMap.addMarker(data);
			}
			this.markerId = -1;
			this.markerType = null;
		}
	},
	//改变半径
	'heatMap.radius': function heatMapRadius(newVal) {
		this.heatMap.radius = newVal;
		//调用重绘方法
		if (ME.HeatTool) {
			ME.HeatTool.updateByCfg();
		}
	},
	//改变模糊度
	'heatMap.blur': function heatMapBlur(newVal) {
		this.heatMap.blur = newVal;
		if (ME.HeatTool) {
			ME.HeatTool.updateByCfg();
		}
	},
	// 'heatMap.tags':function heatMapTagChange(newVal){
	//     //标签变化时，重新处理数据
	//     if(ME.vm.heatMap.HeatTool){
	//         // ME.vm.heatMap.HeatTool.applyHeatMap(this.againByChange());
	//         ME.vm.heatMap.HeatTool.applyHeatMap(this.againByChange());
	//     }
	// },
	// 'heatMap.interval':function heatMapTimeScope(newVal){
	//     //时间范围变化时
	//     this.timeToRefresh(newVal);
	// }
}
