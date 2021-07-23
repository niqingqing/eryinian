/**
 * Created by CuiWenheng on 2019/07/19 .
 */

/**
 * 全局变量
 */
var ME = {
    //访问路径
    baseUrl : '/',
    selfHost: UBIT.selfHost,
    //请求的服务器地址
    host: UBIT.host,
    imgHost: UBIT.imgHost,
    user: UBIT.user,
    api_token: UBIT.api_token,
    vm: null,
    addTags:null,
};

/**
 * 程序入口
 */

;(function() {
    pageInit();
})();

//界面初始化
function pageInit(){
    initVue('#wrapper');
}

function jsonFunc(res) {
    return res.json();
}

// function initVueData(){
//     var data = {
//         activing:false,
//         syskey:''
//     };
//     return data;
// }

//初始化Vue
function initVue(divId){
    Vue.http.options.emulateJSON = true;
    Vue.http.options.root = ME.host;

    ME.vm = new Vue({
        el: divId,
        data : {
            activing:false,
            syskey:''
        },
        created:function(){
            // this.validityKey();
        },
        methods:{
            //激活
            activateSys: function(){
                var that = this;
                if(that.activing){
                    return;
                }
                that.activing = true;
                var data = {syskey:that.syskey};
                Vue.http.post(ME.host+'/user/activesys',data)
                    // .then(jsonFunc,that.errorFunc)
                    .then(function(res){
                        that.activing = false;
                        if(res&&res.body&&res.body.isOk) {
                            alert(res.body.msg);
                            that.redirectTo();
                            // ME.vm.$alert(res.body.msg, '提示', {
                            //     confirmButtonText: '确定'
                            // });
                            return ;
                        }else{
                            ME.vm.$alert(res.body.msg, '提示', {
                                confirmButtonText: '确定'
                            });
                        }
                    },function (e) {
                        that.activing = false;
                        console.log(e);
                        ME.vm.$alert("激活失败", '提示', {
                            confirmButtonText: '确定'
                        });
                    })
            },
            // //跳转
            redirectTo:function(){
                window.location.href = "../super/index/";
            },
            //验证激活码
            //验证systemKey
            validityKey: function (api_token) {
                var that =this;
                Vue.http.post(ME.host+'/user/validitykey',{})
                    .then(jsonFunc)
                    .then(function(json){
                        if(json.isOk) {
                            that.redirectTo();
                        }
                    });
            },
        }
    });
}