function evenInit() {
    $(document).keyup(function (a) {
        if (27 === a.keyCode) {
            console.log('esc触发');
            //取消测量距离
            ME.vm.switchData['distance'] = false;
            ME.vm.switchData['correctMap'] = false;
            var markerTip = document.getElementById('distanceEl');
            if (markerTip) document.body.removeChild(markerTip);

            //清除绘制区域
            ubiMap.cleanPolygon();


        }
    });
    $(document).keyup(function (e) {
        if (e.keyCode === 13) {
            $('.dissure').click();
        }
    });
}