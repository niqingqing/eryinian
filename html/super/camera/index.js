/**
 * Created by Administrator on 2017/12/14/014.
 */


$(function(){
    init();
});

function init(){
    vueInit();
}
function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            camera:{},
            player:null,
            showOperateBtn:true,
            followCode:null,
        },
        created:function(){
            var params = UBIT.parseSearch();
            var self = this;
            this.followCode = params.mac;
            if(!params || !params.cameraId || params.cameraId<1){
                if(params.type!='follow') {
                    this.showError(lang['errorNote']);
                    return;
                }
            }

            if(params.cameraId==16){
                this.showOperateBtn = true;
            }

            this.$http.get(ME.host+'/model/get?model=camera&id='+params.cameraId).then(function(res){
                ME.vm.camera = res.body;
                ME.vm.camera['id'] = params.cameraId;

                this.play(params);
            });

        },
        methods:{
            play:function(camera){
                // var networkAgreement = camera.networkAgreement,//'rtsp',
                //     interfaceAgreement = camera.interfaceAgreement;//'onvif';
                // var cameraIP = camera.ip;//'192.168.20.86';
                // var cameraPort = camera.port;//'554';

                // if(!cameraIP || !camera.port || !networkAgreement || !interfaceAgreement){
                //     this.showError("摄像头的配置信息不完整，不能查看对应的视频！");
                //     return;
                // }
                
                // if(!camera.online){
                //     this.showError("摄像头当前离线，请确保摄像头IP正确且网络畅通！");
                //     return;
                // }

                var canvas = document.getElementById('video-canvas');
                /**
                 * rtsp://192.168.20.86:554/onvif1
                 */

                    //创建随机值
                var stamp = new Date().getTime();
                // var url = UBIT.websocketUrl + "/cameraSocket/" +networkAgreement+'_'+ cameraIP + '_'+ cameraPort + '_' + interfaceAgreement+'_' + ME.user.projectCode + "_" + camera.mapId + "_2d" + stamp + ME.api_token;
                var url = UBIT.cameraWsUrl + '/cameraSocket/' + ME.user.projectCode + '_' + camera.cameraId + '_' + camera.type + '_' + ME.api_token+ '_' + stamp;
                if(camera.type === 'follow'){
                    url += '_' + camera.mac + '_' + window.localStorage.getItem('mapId');
                }
                window.player = this.player = new JSMpeg.Player(url, {canvas: canvas});
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
            move:function(type){
                var data = this.parseUrl(window.location.href);
                var cameraId = data.cameraId;
                var projectCode = ME.user.projectCode;
                var obj = {
                    cameraId,
                    projectCode,
                    type:type
                };
                this.player.source.socket.send(JSON.stringify(obj) + '###UBITRAQ###');
                // this.$http.get(`camera/move?cameraId=${cameraId}&projectCode=${projectCode}&type=${type}`).then(function(res) {
                // })
            },
            reset:function(){
                var data = this.parseUrl(window.location.href);
                var cameraId = data.cameraId;
                var projectCode = ME.user.projectCode;
                var url = `camera/reset?cameraId=${cameraId}&projectCode=${projectCode}`;
                this.$http.get(url).then(function(res){
                })
            },
            /**
             * 解析url
             * @param {string} url  get请求地址
             */
            parseUrl: function(url){
                var query = url.split('?')[1]
                if(!query || query.length <= 0){
                    // throw new Error('url没有参数');
                    return {};
                }

                var obj = {};
                query.split('&').forEach(function (data){
                    var arr = data.split('=');
                    obj[arr[0]] = arr[1];
                })
                return obj;
            }
            /**
             * todo
             * A JSMpeg.Player instance supports the following methods and properties:
             .play() – start playback
             .pause() – pause playback
             .stop() – stop playback and seek to the beginning
             .destroy() – stops playback, disconnects the source and cleans up WebGL and WebAudio state. The player can not be used afterwards.
             .volume – get or set the audio volume (0-1)
             .currentTime – get or set the current playback position in seconds

             https://github.com/phoboslab/jsmpeg
             */

        },
    });

}

