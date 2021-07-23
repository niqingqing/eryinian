/**
 * Created by zwt on 2018/6/4/004.
 */



function getDefaultMap() {
    //获取项目下所有地图
    var currentMap=localStorage.getItem('tplaformMap');
    if(!currentMap){
        if(UBIT.user.projectCode &&  UBIT.user.projectId>0){
            var mapId = window.localStorage && window.localStorage.getItem("mapId");
            if (mapId) {
                currentMap = UBIT.user.projectCode + '_' + mapId;
                localStorage.setItem('tplaformMap', currentMap);
                return currentMap;
            }
        }
        alert('必须进入项目地图才能查看实验平台！')
        return false;
    }
    return currentMap;
}


function isRealNum(val){
    // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
    if(val === "" || val ==null){
        return false;
    }
    if(!isNaN(val)){
        return true;
    }else{
        return false;
    }
}


function hideAllSeries(chart){
    if(!chart) return;

    $(chart.series).each(function(){
        //this.hide();
        this.setVisible(false, false);
    });
    chart.redraw();
}