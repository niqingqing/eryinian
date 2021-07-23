
var id = js.getParam('id');

$.ajax({
    type: 'GET',
    url: url + '/trashrecyclingposition/trashRecyclingPosition/listDataByWasterId',
    data:{
        id: id
    },
    dataType: 'JSON',
    success: function(data){
        console.log(data);

        let path = data.positions;
        if (!path || path.length == 0) {
            return;
        }

        var point = [];
        for (var i = 0; i < path.length; i++) {
            var result = gcoord.transform(
                [path[i].longitude, path[i].latitude],    // 经纬度坐标
                gcoord.GCJ02,               // 当前坐标系
                gcoord.BD09                 // 目标坐标系
            );
            point.push(new BMapGL.Point(result[0], result[1]));
        }

        // GL版命名空间为BMapGL
        // 按住鼠标右键，修改倾斜角和角度
        var bmap = new BMapGL.Map("allmap");    // 创建Map实例
        bmap.centerAndZoom(point[0], 17);  // 初始化地图,设置中心点坐标和地图级别
        bmap.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放

        var pl = new BMapGL.Polyline(point);
        var trackAni = new BMapGLLib.TrackAnimation(bmap, pl, {
            overallView: true,
            tilt: 30,
            duration: 5000,
            delay: 300
        });

        setTimeout(function(){
            trackAni.start();
        }, 1000);

        $("#mapPlayRestart").click(function(){

            var time = $('#mapPlayTime').val();
            if (time) {
                trackAni.setDuration(time * 1000);
            }
            trackAni.start();

        })

        $("#mapPlayPause").click(function(){
            trackAni.pause();
        })

        $("#mapPlayContinue").click(function(){
            trackAni.continue();
        })


    },
    error: function(){

    }
});

