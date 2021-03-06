/**
 * 系统告警 TODO
 * Created by zwt on 2018/12/11.
 */

//临时使用围栏内指定时间告警
var intervalId;
var SysAlert = {

    audioPath: UBIT.selfHost + '/map/common/audio/',
    voiceControl: {
        loop:false,
        fenceAlert:{loop:false},
        sos:{loop:false},
        forceRemove:{loop:false},
        heartAlert:{loop:false},
        moreMonitor:{loop:false},
        danger:null,
        error:null,
        info:null,
        warning:null,
        report:null,
    },
    tipIdToData:{},
    onCloseNoticeId:{},
    aggregate:function (data) {
        SysAlert.normalAlert('aggregate', data);
    },
    stillness:function(data){
        SysAlert.normalAlert('stillness', data);
    },
    sos:function (data) {
        SysAlert.normalAlert('sos', data);
    },
    fall:function (data) {
        SysAlert.normalAlert('fall', data);
    },
    forceRemove:function (data) {
        SysAlert.normalAlert('forceRemove', data);
    },

    heartAlert:function (data) {
        SysAlert.normalAlert('heartAlert', data);
    },
    
    normalAlert:function (type, data) {
        if(ubiMap.lockTag) return;

        // console.warn(data);
        if (ME.vm.switchData.sound) {
            var audio = 'info.mp3';

            if(type=='heartAlert'){
                audio = 'danger.mp3';

            }else if(type=='sos'){
                audio = 'error.mp3';

            }else if(type=='forceRemove'){
                audio = 'report.mp3';
            }
            if(SysAlert.voiceControl.loop && SysAlert.voiceControl[type] && SysAlert.voiceControl[type].loop) {
                var voice = audio.split('.')[0];
                if(SysAlert.voiceControl[voice]){
                    if(SysAlert.voiceControl[voice].paused){
                        SysAlert.voiceControl[voice].play();
                    }
                    data.voice = voice;
                }else{
                    if(SysAlert.voiceControl.info.paused){
                        SysAlert.voiceControl.info.play();
                    }
                    data.voice = 'info';
                }
            }else{
                var v = new Audio(SysAlert.audioPath + audio);
                v.play();
            }
        }

        var marker=ME.vm.findMakerByMac(data.code);
        if(marker && marker.node) {
            SysAlert.drawHalo(type, marker);
        }else {
            console.warn(data.code, 'marker error')
        }

        if(!ME[type]){
            ME[type] = {};
        }

        if(!ME[type][data.code]) {
            var tag = ME.vm.getTag(data);
            data.alias = tag?(tag.alias?tag.alias:tag.code):data.code;

            ME[type][data.code] = data;
            SysAlert.notification(type, data);
        }

    },

    fenceAlert:function (data) {
        if(ubiMap.lockTag || !data.code) return;
        if (!ME.vm.switchData.fenceTip) return;

        //获取围栏
        var fence = ME.vm.getNodeById('fence', data.fenceId);

        //获取标签
        var tag = ME.vm.getNodeByCode('tag', data.code);

        //将进入或者离开的标签从fenceTag中动态的进行处理
        // ME.vm.updateFenceInnerTags(data.isIn, tag, fence);

        if (!DataManager.isFenceTip(fence, data.isIn)) return;

        if (ME.vm.switchData.sound) {
            var audio = 'warning.mp3';
            if (fence && fence.type && fence.type.audio) audio = fence.type.audio;
            if(SysAlert.voiceControl.loop && SysAlert.voiceControl.fenceAlert && SysAlert.voiceControl.fenceAlert.loop) {
                var voice = audio.split('.')[0];
                if(SysAlert.voiceControl[voice]){
                    if(SysAlert.voiceControl[voice].paused){
                        SysAlert.voiceControl[voice].play();
                    }
                    data.voice = voice;
                }else{
                    if(SysAlert.voiceControl.warning.paused){
                        SysAlert.voiceControl.warning.play();
                    }
                    data.voice = 'warning';
                }
            }else{
                var v = new Audio(SysAlert.audioPath + audio);
                v.play();
            }
        }

        data.fence = fence;
        data.alias = tag?(tag.alias?tag.alias:tag.code):data.code;
        SysAlert.notification('fenceAlert', data);
        if(ME.projectCode === 'huichenlife'){//临时使用,进入围栏30秒没有出来报警
            // console.log(data);
            if(data.isIn){
                if(intervalId){
                    clearInterval(intervalId);
                    intervalId = null;
                }
                intervalId = setTimeout(() => {
                    // console.log("告警,进入3秒未出")
                    data.temp = true;
                    SysAlert.notification('fenceAlert', data);
                },30000)
            }else{
                clearInterval(intervalId);
                intervalId = null;
            }
        }
    },
    fenceTimeoutAlert:function(data){
        if(ubiMap.lockTag || !data.code) return;
        if (!ME.vm.switchData.fenceTip) return;

        //获取围栏
        var fence = ME.vm.getNodeById('fence', data.fenceId);

        //获取标签
        var tag = ME.vm.getNodeByCode('tag', data.code);

        //将进入或者离开的标签从fenceTag中动态的进行处理
        // ME.vm.updateFenceInnerTags(data.isIn, tag, fence);

        if (!DataManager.isFenceTip(fence, data.isIn)) return;

        if (ME.vm.switchData.sound) {
            var audio = 'warning.mp3';
            if (fence && fence.type && fence.type.audio) audio = fence.type.audio;
            var v = new Audio(SysAlert.audioPath + audio);
            v.play();
        }

        data.fence = fence;
        data.alias = tag?(tag.alias?tag.alias:tag.code):data.code;
        SysAlert.notification('fenceTimeoutAlert', data);
    },
    distanceAlert:function (data) {
        if(ubiMap.lockTag) return;
        if(!ME.vm.switchData.distanceAlert) return;

        var marker=ME.vm.findMakerByMac(data.code);
        if(!marker||!marker.node) {
            console.warn(data.code, 'marker error')
            return;
        }

        SysAlert.drawHalo('distanceAlert', marker);

        // 绘制测距标签间连线
        if(data.alerts){
            var goPoints=[];
            for(var i=0;i<data.alerts.length;i++){
                var item=data.alerts[i];
                var toMarker=ME.vm.findMakerByMac(item.toTag);
                if(!toMarker||!toMarker.node) continue;

                var distance;
                if(item.distance){
                    distance = (item.distance/1000).toFixed(2);//毫米转换为米
                }else {
                    distance = (UBIT.getDistance(marker.node, toMarker.node)/100).toFixed(2) ;
                }

                SysAlert.drawHalo('distanceAlert', toMarker);

                var itemPoints=[
                    {x:marker.x,y:marker.y,z:marker.z},
                    {x:toMarker.x,y:toMarker.y,z:toMarker.z},
                    {distance:distance}
                ];
                goPoints.push(itemPoints);
            }
            ubiMap.drawStrLine('distanceAlert',goPoints, data.code+"_distanceAlert", ME.distanceAlertColor);
        }

    },


    power:function (data) {
        if(ubiMap.lockTag) return;
        if (!data.code) return;
        var marker = ubiMap.getMarker('tag_' + data.code);
        if (!marker||!marker.node.isShow) return;
        var powerLevel = UBIT.getPower(data.power);
        marker.node.power = data.power;
        if(powerLevel == marker.node.powerLevel){
            return;
        }else{
            marker.node.powerLevel = powerLevel;
        }
        for (var i = 0; i < marker.items.length; i++) {
            var item = marker.items[i];
            if (!item.flag || item.flag!== 'power') continue;
            var objAttr = {};
            var size = MarkerTool.getMarkerSize();
            var width = size * (powerLevel / 100);
            if (powerLevel < 30) objAttr.fill = "#eb3324";else if (powerLevel < 70) {
                objAttr.fill = "#f7cd46";
            } else {
                objAttr.fill = "#4cd96c";
            }
            objAttr.stroke = objAttr.fill;
            objAttr.width = width;
            item[1].attr(objAttr);
        }
    },

    powerAlert:function () {

    },

    updateHeartRate:function (data) {
        if(ubiMap.lockTag) return;
        if (!data.code) return;
        var marker = ubiMap.getMarker('tag_' + data.code);
        if (!marker||!marker.node.isShow) return;
        marker.node.heartRate = data.heartRate;

        //heart Twinkle
        MarkerTool.markerHeart(marker, paper);
    },

    //画圆环
    drawHalo:function (type, marker, color) {
        var halo=ubiMap.findInMarker(marker, type);
        if(!halo){
            //如果没有则绘制
            halo = MarkerTool.markerHalo(marker, type, paper, color);
            if(type!='distanceAlert'){
                halo.show();
            }
        }else {
            MarkerTool.setEscper(halo);
        }

        halo[type + 'drawDataTime'] = Date.now();
        if(!ME[type+'Halos']){
            ME[type+'Halos'] = {};
        }
        ME[type+'Halos'][marker.node.mac] = {id:marker.node.id, halo};
        return  ME[type+'Halos'][marker.node.mac];
    },

    moreMonitorAlert:function (data) {
        if(ubiMap.lockTag) return;

        //超出距离报警
        if (ME.vm.switchData.sound) {
            var audio = 'danger.mp3';
            if(SysAlert.voiceControl.loop && SysAlert.voiceControl.moreMonitor && SysAlert.voiceControl.moreMonitor.loop) {
                var voice = audio.split('.')[0];
                if(SysAlert.voiceControl[voice]){
                    if(SysAlert.voiceControl[voice].paused){
                        SysAlert.voiceControl[voice].play();
                    }
                    data.voice = voice;
                }else{
                    if(SysAlert.voiceControl.danger.paused){
                        SysAlert.voiceControl.danger.play();
                    }
                    data.voice = 'danger';
                }
            }else{
                var v = new Audio(SysAlert.audioPath + audio);
                v.play();
            }
        }

        //获取组信息
        data.moreMonitor = ME.vm.getNodeById('moreMonitor', data.monitorId) ;
        if(!data.moreMonitor){
            console.warn(lang['moreMonitorAlertNote']+data.monitorId+lang['unknown']);
            return;
        }
        //根据数据，绘制对应标签展现样式
        ME.vm.showMoreMonitorStyle(data);
        var whoBreakFlag=data.map+'_'+data.monitorId+'_'+data.outlier;
        //每次越界提示框只提示一次
        if(ME.moreMonitor[whoBreakFlag]) return;
        SysAlert.notification('moreMonitor', data);
        ME.moreMonitor[whoBreakFlag]=data;
        
    },

    setWaitMessage: function (a, b, c, d) {
        $("#normal_jqxNotification_tip").html(a);
        $("#normal_jqxNotification").jqxNotification("open");
        var e = 2500;
        "long" === d && (e = 5e3), c && setTimeout(this.closeWaitMessage, e);
    },
    closeWaitMessage: function closeWaitMessage() {
        $("#normal_jqxNotification").jqxNotification("closeLast");
    },
    closeAllMessages: function closeAllMessages() {
        $("#normal_jqxNotification").jqxNotification("closeAll");
    },


    tip:function (type, tag) {
        var e = { string: "", type: 'danger'},
            f = new Date(),
            g = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate() + " " + f.getHours() + ":" + ("0" + f.getMinutes()).slice(-2) + ":" + ("0" + f.getSeconds()).slice(-2);
        var id = type+'_'+Date.now()+Math.round(Math.random()*1000000);
        SysAlert.tipIdToData[id] = tag;
        var url = ME.selfHost + '/map/map2d/svg/follow/?tag=' +  tag.code;

        if(type == 'aggregate'){

            // e.string += '<a href="'+ url + '" target="blank">'+' "' + tag.alias + '" ' + lang['sosNote'];
            // e.string += lang['time']+"  " + g + "</br></a>";
            e.string += '聚集异常报警，聚集人为 ' + tag.codes + ',聚集开始时间为:' + moment(tag.startTime).format('YYYY-MM-DD HH:mm:ss') + ',聚集时长为:' + tag.duration + '分钟';
            return e;
        }else if(type === 'stillness'){
            e.string += '静止异常报警，静止人为 ' + tag.alias + ',开始时间为:' + moment(tag.startTime).format('YYYY-MM-DD HH:mm:ss') + ',静止时长为:' + tag.duration + '分钟';
            return e;
        }else if(type == 'sos'){

            e.string += '<a href="'+ url + '" target="blank"> "' + tag.alias + '" ' + lang['sosNote'];
            e.string += lang['time']+"  " + g + "</br></a>";

        }else if(type == 'fall'){

            e.string += '<a href="'+ url + '" target="blank"> "' + tag.alias + '" '+ '跌倒了，请及时处理';
            e.string += lang['time']+"  " + g + "</br></a>";

        }else if(type == 'forceRemove'){

            e.string += '<a href="'+ url + '" target="blank"> "' + tag.alias + '" ' + lang['createForceRemoveNote'];
            e.string += lang['time']+"  " + g + "</br></a>";

        }else if(type == 'heartAlert'){

            e.string += '<a href="'+ url + '" target="blank"> "'+tag.alias+'" 心率异常报警,当前心率值: <b style="color:yellow;">'+tag.heartRate+' </b> !!! ';
            e.string += "报警时间  " + g + "</br></a>"; //

        }else if(type == 'moreMonitor'){
            // var monitorWhoBreak=monitor.moreMonitor.cname+lang['member']+monitor.moreMonitor.watchman;
            var monitorWhoBreak=tag.moreMonitor.cname+'成员'+tag.outlier;
            e.string += lang['monitorGroup']+' "' + monitorWhoBreak + '" ' + lang['createMoreMonitorNote'];
            // e.string += '<input type="hidden" id="monitor" value="'+proMid+'" />';
            e.string += lang['time']+"  " + g + "</br>"; //' #' + fence.id +

        }else if(type == 'distanceAlert'){

        }else if(type == 'fenceAlert'){
            var fence = tag.fence;
            //ftype
            var ftype = 'info';
            if(tag.temp){
                e.string += '静止异常告警，静止人为 ' + tag.code + ',静止开始时间为:' + moment(tag.startTime).format('YYYY-MM-DD HH:mm:ss');
                return e;
            }
            if (fence.ftypeId == 1) {
                ftype = 'danger';
            } else if (fence.ftypeId == 2) {
                ftype = 'warning';
            } else if (fence.ftypeId == 3) {
                ftype = 'info';
            } else if (fence.ftypeId == 6) {
                ftype = 'error';
            }
            e.type = ftype;

            var i = "" == fence.cname ? "" : ' "' + fence.cname + '"';

            var alias = tag.alias;
            if(!alias) alias = tag.code;

            e.string += '<a href="'+ url + '" target="blank">'+' "' + alias + '" ';
            if (tag.isIn) {
                if(fence.trif == 'inStop'){
                    e.string += lang['inStopFence'];
                }else {
                    e.string += lang['inFence'];
                }
            } else {
                e.string += lang['outFence'];
            }
            if(fence.trif == 'inStop') {
                var timeSpan = Math.round(tag.inTimeSpan/1000);
                e.string += i+ timeSpan +"秒，" + lang['time'] + g + "</br></a>"; //' #' + fence.id +
            }else{
                e.string += i + lang['time'] + g + "</br></a>"; //' #' + fence.id +
            }
        }else if(type === 'fenceTimeoutAlert'){
            var fence = tag.fence;
            e.type = 'error';
            e.string += `<a href="${url}" target="blank">${tag.alias||tag.alias.codes}进入${fence.cname}(${fence.id})超时</a>`
        }
        e.string +=  '<input type="hidden" tipid="tipid" id="'+id+'" value="'+id+'">';
        return e;
    },


    notification: function(type, data) {
        var r= SysAlert.tip(type, data);
        var a = r.string, b = r.type;

        var val='';
        switch(type){
            case 'moreMonitor':val=data.map+'_'+data.monitorId+'_'+data.outlier; break;
            default: val=data.code;
        }

        void 0 === b && (b = "info"), b = "danger" === b.toLowerCase() ? "error" : b, "error" !== b.toLowerCase() && "warning" !== b.toLowerCase() && "info" !== b.toLowerCase();
        var noticeId = type + '_jqxNotification';
        if(SysAlert.voiceControl.loop && SysAlert.voiceControl[type] && SysAlert.voiceControl[type].loop) {
            $("#" + noticeId).jqxNotification({template: b, autoClose: false});
        }else{
            $("#" + noticeId).jqxNotification({template: b});
        }
        $("#"+noticeId + '_tip').html(a);
        $("#"+noticeId + '_tag').val(val);

        $("#"+noticeId).jqxNotification("open");
        if(type === 'aggregate' || type === 'stillness'){
            setTimeout(function(){
                $("#"+noticeId).jqxNotification("closeLast");
                if(ME[type][data.code]){
                    delete ME[type][data.code];
                }else {
                    console.warn(data.code + ' is not in ME.'+type+' !');
                }
                SysAlert.removeHalo(type, data.code);
            },2500)
            return;
        }
        if(!SysAlert.onCloseNoticeId[noticeId]){
            $("#" + noticeId).on('close', function (e) {
                // console.log(e.target);
                var element = $(e.target);
                var tipid = element.find('input[tipid]').val();
                if(tipid && SysAlert.tipIdToData[tipid]){
                    var tipData = SysAlert.tipIdToData[tipid];
                    delete SysAlert.tipIdToData[tipid];
                    var type = tipid.split('_')[0];
                    var tag = tipData.code;
                    if (ME[type] && ME[type][tag]) {
                        delete ME[type][tag];
                        if (tag) SysAlert.removeHalo(type, tag);
                    } else {
                        console.warn(tag + ' is not in ME.' + type + ' !');
                    }
                    if (SysAlert.voiceControl.loop && SysAlert.voiceControl[type] && SysAlert.voiceControl[type].loop) {
                        var stopVoiceFlag = true;
                        for(var k in SysAlert.tipIdToData){
                            if(SysAlert.tipIdToData[k].voice == tipData.voice){
                                stopVoiceFlag = false;
                                break;
                            }
                        }
                        if(stopVoiceFlag){
                            SysAlert.voiceControl[tipData.voice].pause();
                        }
                    }
                }

            });
            SysAlert.onCloseNoticeId[noticeId]=true;
        }
    },
    
    removeHalo:function (type, tag) {
        var allGroupMem=ME[type + 'Halos'];
        if(allGroupMem && allGroupMem[tag]){
            var halo = allGroupMem[tag].halo;
            halo.remove();
            delete allGroupMem[tag];
        }
        var marker = ubiMap.getMarker('tag_'+tag);
        if(!marker) return;
        MarkerTool.markerRemove(marker, type);
    },
    initAlertVoice:function () {
        if(SysAlert.voiceControl.loop){
            SysAlert.voiceControl.danger = new Audio(SysAlert.audioPath + "danger.mp3");
            SysAlert.voiceControl.danger.setAttribute("muted", "muted");
            SysAlert.voiceControl.warning = new Audio(SysAlert.audioPath + "warning.mp3");
            SysAlert.voiceControl.warning.setAttribute("muted", "muted");
            SysAlert.voiceControl.info = new Audio(SysAlert.audioPath + "info.mp3");
            SysAlert.voiceControl.info.setAttribute("muted", "muted");
            SysAlert.voiceControl.error = new Audio(SysAlert.audioPath + "error.mp3");
            SysAlert.voiceControl.error.setAttribute("muted", "muted");
            SysAlert.voiceControl.report = new Audio(SysAlert.audioPath + "report.mp3");
            SysAlert.voiceControl.report.setAttribute("muted", "muted");
            SysAlert.voiceControl.danger.setAttribute("loop", "loop");
            SysAlert.voiceControl.warning.setAttribute("loop", "loop");
            SysAlert.voiceControl.info.setAttribute("loop", "loop");
            SysAlert.voiceControl.error.setAttribute("loop", "loop");
            SysAlert.voiceControl.report.setAttribute("loop", "loop");
        }
    },
    unmuteVoice:function () {
            SysAlert.voiceControl.danger.muted=false;
            SysAlert.voiceControl.warning.muted=false;
            SysAlert.voiceControl.info.muted=false;
            SysAlert.voiceControl.error.muted=false;
            SysAlert.voiceControl.report.muted=false;
    }
}



function jqxNotificationInit() {
    $("#normal_jqxNotification").jqxNotification({
        width: "auto",
        position: "bottom-left",
        opacity: .9,
        autoOpen: !1,
        autoClose: !1,
        template: "info"
    });

    $("#fenceAlert_jqxNotification").jqxNotification({
        width: "auto",
        position: "bottom-left",
        opacity: .9,
        autoOpen: !1,
        autoClose: !0,
        autoCloseDelay: 5e3,
        template: "info"
    });
    try{
        $("#fenceTimeoutAlert_jqxNotification").jqxNotification({
            width: "auto",
            position: "bottom-left",
            opacity: .9,
            autoOpen: !1,
            autoClose: !0,
            autoCloseDelay: 5e3,
            template: "info"
        });
    }catch(e){}
    $("#sos_jqxNotification").jqxNotification({
        width: "auto",
        position: "top-right",
        opacity: .9,
        autoOpen: !1,
        autoClose: !1,
        autoCloseDelay: 5e3,
        template: "info"
    });
    $("#fall_jqxNotification").jqxNotification({
        width: "auto",
        position: "top-right",
        opacity: .9,
        autoOpen: !1,
        autoClose: !1,
        autoCloseDelay: 5e3,
        template: "info"
    });
    $("#aggregate_jqxNotification").jqxNotification({
        width: "auto",
        position: "top-right",
        opacity: .9,
        // autoOpen: !1,
        // autoClose: !1,
        // autoCloseDelay: 5e3,
        template: "info"
    });
    $("#stillness_jqxNotification").jqxNotification({
        width: "auto",
        position: "top-right",
        opacity: .9,
        // autoOpen: !1,
        // autoClose: !1,
        // autoCloseDelay: 5e3,
        template: "info"
    });
    $("#heartAlert_jqxNotification").jqxNotification({
        width: "auto",
        position: "top-right",
        opacity: .9,
        autoOpen: !1,
        autoClose: !1,
        autoCloseDelay: 5e3,
        template: "info"
    });

    $("#forceRemove_jqxNotification").jqxNotification({
        width: "auto",
        position: "bottom-right",
        opacity: .9,
        autoOpen: !1,
        autoClose: !1,
        autoCloseDelay: 5e3,
        template: "info"
    });

    $("#distanceAlert_jqxNotification").jqxNotification({
        width: "auto",
        position: "top-right",
        opacity: .9,
        autoOpen: !1,
        autoClose: !1,
        autoCloseDelay: 5e3,
        template: "info"
    });

    //多人互监
    $("#moreMonitor_jqxNotification").jqxNotification({
        width: "auto",
        position: "bottom-right",
        opacity: .9,
        autoOpen: !1,
        autoClose: 0,
        autoCloseDelay: 5e3,
        template: "info"
    });
}



