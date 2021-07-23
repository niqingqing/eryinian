/**
 * Created by zwt on 2017/9/2 0002.
 */

$(function(){
    vueInit();
});



function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            tag_filter: Cookies.get('tag_filter'),
            currentTags:[],
        },
        created:function(){
            var params = UBIT.parseSearch();
            if(params.tag){
                this.tag_filter = params.tag;
                Cookies.set('tag_filter', this.tag_filter);
            }

            drawHeartRateChart(this.tag_filter, document.getElementById('heartChartFDiv'));
        },

        methods:{
            //选择地图时刷新
            refresh:function(){
                Cookies.set('tag_filter', this.tag_filter);
                location.reload();
            },
            showSuccess:function(msg){
                this.showMsg(msg,'success');
            },
            showError:function(msg){
                this.showMsg(msg,'error');
            },
            showMsg:function(msg,type){
                this.$message({
                    message: msg,
                    type: type  //success/warning/info/error
                });
            },
        },
    });


    ME.vm.currentTags = {data:[{mac:ME.vm.tag_filter}]};
    webSocketInit('2D', null, {lifeStatus:charts_heartRate_reDraw}, ['lifeStatus']);
}