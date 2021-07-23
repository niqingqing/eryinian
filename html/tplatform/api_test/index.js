/**
 * Created by zwt on 2017/9/2 0002.
 */

$(function(){
    getAPIs();

    //获取输入的数据
    vueInit();
});

function getAPIs() {
    ME.apis = [];
    for(var i=0;i<apiData.length;i++){
        var api = apiData[i];
        if(!api.apis) continue;

        for(var j=0;j<api.apis.length;j++){
            var ii = api.apis[j];
            if(ii.type!='get' && ii.type!='post') continue;
            ME.apis.push(ii);
            console.log(ii.type, ii.url)
        }
    }
}



function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            method:'post',
            url:'/',
            params:'{"key1":"value1","key2":"value2"}',
            paramsType:'map',
            paramsTypesDef:{'map':'直接映射{"k1":"v1","k2":"v2"}','cline':'换行分割"k1":"v1"\\n"k2":"v2"','comma':'逗号分割"k1":"v1","k2":"v2"'},
            reqNum:'1',
            waitTime:1000,
            submitFlagDisable:false,
            result:'',
            apis:ME.apis,
            requestDesc:[],
        },
        methods:{
            changeParams:function (url) {
                var item;
                for(var j=0;j<ME.apis.length;j++){
                    var ii = ME.apis[j];
                    if(ii.url == url){
                        item = ii;
                        break;
                    }
                }
                if(!item){
                    return;
                }
                this.method = item.type;
                console.log(item.request);

                this.requestDesc = [];
                var params = {};
                for(var key in item.request){
                    var req = item.request[key];
                    req.key = key;
                    this.requestDesc.push(req);
                    params[key] = req.exp;
                }
                this.params = JSON.stringify(params);
            },
            onSubmit:function(){
                if(this.method=='get'){
                    var params = this.processParams();
                    this.$http.get(ME.host+ this.getUrl(this.url, params)).then(this.showMsg);
                }else {
                    var params = this.processParams();
                    this.$http.post(ME.host+ this.url, params).then(this.showMsg);
                }
                // this.submitFlagDisable = true;
            },
            showMsg:function(res){
                this.result += JSON.stringify(res.body) + '\n';
                if(this.reqNum>1){
                    this.reqNum--;
                    return setTimeout(this.onSubmit, this.waitTime);
                }
                this.submitFlagDisable = false;
            },
            processParams:function () {
                // console.log(this.params);

                if(this.paramsType == 'map') {
                    if(typeof this.params == 'string'){
                        return JSON.parse(this.params);
                    }
                    return this.params;
                }

                var ps = [];
                if(this.paramsType == 'cline'){
                    ps = this.params.trim().split('\n');
                }else if(this.paramsType == 'comma'){
                    ps = this.params.trim().split(',');
                }
                var newParams = {};
                for(var p of ps){
                    console.log(p);
                    var pa = p.split(':');
                    if(pa.length<2) continue;
                    newParams[pa[0].trim()] = pa[1].trim();
                }

                return newParams;
            },
            getUrl:function (url, params) {
                var url = this.url + '?';
                for(var key in params){
                    url += '&' + key + '=' + params[key];
                }
                return url;
            }
        },
    });
}

