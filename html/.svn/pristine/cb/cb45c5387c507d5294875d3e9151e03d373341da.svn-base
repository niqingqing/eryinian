/**
 * Created by LiuTao on 2017/7/03 0028.
 */



$(function(){
    init();
});

function init(){
    vueInit();
}

function checks (rule, value, callback) {
        if (value === '') {
          callback(new Error(lang['enterContent']));
          return;
        }

        var maps = $('#maptable').bootstrapTable('getData');
        var id = ME.vm.form.id;
        var flag = true;
        maps.forEach(function(map){
            if(value == map.cname && id!=map.id){
                callback(new Error(lang['checksNotePre']+map.cname+lang['checksNoteAfter']));
                return;
            }
        });
        if(!flag) return;
        callback();
}


function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            input_time:0,
            output_time:0,
            input_time_show:0,
            output_time_show:0,
            globalSwith:{
                debugBuf:0,
                debugLength:10e4,
                storePosition:0,
                isShowTcpLog:0,
                isShowTcpHeartLog:0,
                isShowBroadLog:0,
                isShowSqlLog:0,
                isDebugCache:0,
                debugCacheTag:'',
            },
            projects:[
                "anchorBroad",
                "camera",
                "chr01",
                "cliem",
                "db",
                "guard",
                "koat",
                "loc01",
                "receiver",
                "store",
                "subscribe",
                "tcpm",
                "ws",
                "all"
            ],
            project:["loc01"]
        },
        created:function(){
            this.$http.get('config/getAllGlobalFlag').then(function(res) {
                this.globalSwith = res.body;
                // console.log(this.globalSwith);
                for(var k in this.globalSwith){
                    if(k.indexOf('is') == 0 || k == 'debugBuf' || k == 'storePosition'){
                        this.globalSwith[k]=this.globalSwith[k]>0?true:false;
                    }else {
                        this.globalSwith[k]=this.globalSwith[k];
                    }
                }
            });
        },
        methods:{
            timeTransfrom:function(){
                if(this.input_time && !this.output_time){
                    // this.output_time = UBIT.getLocalTime(this.input_time);
                    this.output_time = new Date(parseInt(this.input_time)).Format('yyyy-MM-dd hh:mm:ss.S');

                }else if(!this.input_time && this.output_time){
                    this.input_time = Date.parse(new Date(this.output_time));
                }

                this.input_time_show = Date.now();
                this.output_time_show = new Date().Format('yyyy-MM-dd hh:mm:ss.S');
            },
            reloadCache:function(){
                this.$http.get('map/reloadCache').then(function(res) {
                    var result = res.body;
                    if (result.isOk) {
                        this.showMsg(result.msg, 'success');
                    } else {
                        this.showMsg(lang['initCacheDataFail'] + result.msg, 'error');
                    }
                });
            },
            swithChange:function(key){
                this.$http.get('config/setGlobalFlag?key='+key+'&val='+(ME.vm.globalSwith[key]?0:1)).then(function(res) {
                    var result = res.body;
                    if (result.isOk) {
                        this.showMsg(result.msg, 'success');
                    } else {
                        this.showMsg(lang['setFail'] + result.msg, 'error');
                    }
                });
            },
            setDebugLength:function(){
                if(!ME.vm.globalSwith.debugLength) {
                    this.showMsg(lang['setFail'] + 'debugLength 不能为空', 'error');
                    return;
                };
                this.$http.get('config/setGlobalFlag?key=debugLength&val='+(ME.vm.globalSwith.debugLength)).then(function(res) {
                    var result = res.body;
                    if (result.isOk) {
                        this.showMsg(result.msg, 'success');
                    } else {
                        this.showMsg(lang['setFail'] + result.msg, 'error');
                    }
                });
            },
            setDebugCacheTag:function(){
                if(!ME.vm.globalSwith.debugCacheTag) ME.vm.globalSwith.debugCacheTag = '1122';
                this.$http.get('config/setGlobalFlag?key=debugCacheTag&val='+(ME.vm.globalSwith.debugCacheTag)).then(function(res) {
                    var result = res.body;
                    if (result.isOk) {
                        this.showMsg(result.msg, 'success');
                    } else {
                        this.showMsg(lang['setFail'] + result.msg, 'error');
                    }
                });
            },

            /**
             * type: success/warning/info/error
             * @param msg
             * @param type
             */
            showMsg:function(msg, type){
                this.$message({
                    message:msg,
                    type: type
                });
            },

            restart:function(){
                var self = this;
                var url = `${ME.host}/nat/restartProject`;
                this.$http.post(url,{projects:this.project}).then((res) => {
                    self.dialogVisible = true;
                    console.log(res);
                    if(!res || !res.body.isOk){
                        self.title = "更新失败";
                    }else{
                        self.title = "执行成功";
                    }
                    self.text = res.body.data;
                })
            }
        },
    });

}
