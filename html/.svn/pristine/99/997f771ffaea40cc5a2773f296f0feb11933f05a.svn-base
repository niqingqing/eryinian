/**
 *  http://192.168.0.72/track_html/map/map2d/svg/?map=62
 *  http://192.168.0.72/track_html/map/map2d/svg/?tag=00000001&anony=1
 *
 */

function vueInit() {

    var instance;
    instance = new Vue({
        el: '#allHandle',
        data: vue_data_source,
        //首先显示列表
        created: function created() {
            this.tabActive = '';
            var searchParam = ME.searchParam;
            //是否url中指定只查看单个标签的运行轨迹  anony指定匿名
            DataManager.loadCameraModel();
            if(searchParam.map){
                //登录后通过地址栏map=projcod_mapid
                DataManager.initialize(searchParam.map, this, dataInit);

            } else{
                DataManager.initialize(ME.currentMapId, this, dataInit);
            }

            if (ME.user) {
                if(ME.user.projectDesc)this.projectDesc = ME.user.projectDesc;
            }else {
                this.user = {projectCode: ME.projectCode};
                this.projectDesc = '';
            }
            // this.switchData.fence=false;
            //判断svg或者canvas待数据加载完成后渲染整个canvas
            if(ME.canvas){
                setTimeout(function(){ME.canvas.renderAll()}, 3000);
            }
        },
        mounted(){
            var that = this;
            var searchParam = ME.searchParam;
            if(searchParam.searchName){
                that.search.value = searchParam.searchName;
                setTimeout(function(){that.searchHandle()}, 3000);
            }
            //监听键盘按键事件
            this.$nextTick(function () {
                document.addEventListener('keyup', function (e) {
                    if (e.keyCode == 27) {
                        that.clearTmpFence();
                        if(that.editLastFenceId){
                            try {
                                FenceTool.showFence(that.editLastFenceId, {force: true}, ME.vm.mapId);
                            }catch (e){
                                console.log(e);
                            }
                        }
                    }
                })
            })

        },
        methods: Object.assign(commonVue,subVue),
        watch: Object.assign(comWatch,subWatch),
        filters: { },
        components: {
            'tag-message-dialog':tagMessageDialog,
        }
    });

    ME.vm = instance;
}
