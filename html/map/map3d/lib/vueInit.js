/**
 * Created by zwt on 2017/7/26 0026.
 */
function vueInit(ME){
    vueComponent();
    vueCreate(ME);
}


function vueComponent(){
    Vue.component('search-tag-option',{
        functional:true,
        render:function(h,ctx){
            var item = ctx.props.item;
            return h('li', ctx.data, [
                h('div', { attrs: { class: 'cname' } }, [item.alias]),
                h('span', { attrs: { class: 'code' } }, [item.code])
            ]);
        },
        props:{
            item:{type:Object,required:true}
        }
    });
}


function vueCreate(ME){
    var instance = new Vue({
        el: '#allHandle',
        data: vue_data_source,
        //首先显示列表
        created: function () {
            ME.anony = false;
            DataManager.initialize(ME.currentMapId, this, dataInit3d);

            if (ME.user && ME.user.projectDesc) {
                this.projectDesc = ME.user.projectDesc;
            }

        },
        methods: {
            tagPanelToggle:function(){
                this.tagPanelShow = !this.tagPanelShow;
                //显示或者隐藏标签
                css3ContainerToggle(this.tagPanelShow);
            },

            changeMap:function (mapId) {
                UBIT.openMap(mapId, 'self');
            },
            getTagDisappear:function(tag){
                if(!tag||!tag.typeId) return;
                var item=ME.vm.tagType.data.find(function(type){
                    return tag.typeId==type.id;
                });
                var disappearTime=(item&&parseFloat(item.tagDisappear))?parseFloat(item.tagDisappear):ME.tagDisappear;
                return disappearTime;
            },
            querySearch:function(queryString, cb){
                var tags = this.tag.data;
                var tagTmps = [];
                this.tag.data.forEach(function(tag){
                    if(tag.mapId==ME.vm.mapId){
                        tagTmps.push(tag);
                    }
                });
                var results = queryString ? tags.filter(this.createFilter(queryString)) : tagTmps;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter:function(queryString) {
                return function(tag)  {

                    if(!tag.alias){
                        return tag.code.toLowerCase().indexOf(queryString.toLowerCase()) > -1;
                    }
                    return (tag.alias.toLowerCase().indexOf(queryString.toLowerCase()) > -1 || tag.code.toLowerCase().indexOf(queryString.toLowerCase()) > -1 );
                };
            },
            loadAll:function() {
                return this.tag.data;
            },
            handleSelect:function(item) {
                this.search.input = item.code;
                ME.searchTag = item;
                pointerLockerControl();
            },
            handleSearch:function(){
                var value = this.search.input;
                if(!value) {
                    this.$message({
                        message: '请输入标签的名称或者编码',
                        type: 'warning'
                    });
                    return;
                }
                this.querySearch(value, function(results){
                    if(!results || results.length<1){
                        ME.vm.$message({
                            message: '您输入的标签不存在',
                            type: 'warning'
                        });
                        return;
                    }
                    if(results.length>1){
                        ME.vm.$message({
                            message: '您查询的标签存在多个，请选择您需要查询的标签',
                            type: 'warning'
                        });
                        return;
                    }
                    ME.searchTag = results[0];
                });
                pointerLockerControl();
            },
            resetCamera:function(){
                resetCamera();
            },
            toolbox:function(){

            },
            historySlider: function (num) {
                //todo
                console.log(num);
            },
            setFenceWaitMessage:function(msg, fence, type){
                var h = this.$createElement;
                this.$notify({
                    // title: fence.cname,
                    message: h('div', { style: 'color: '+type.color+';'},msg),
                    // message:msg,
                    // type: 'warning',
                    duration: 3500,
                    customClass:'fenceClass',
                });
            }
        }
    });

    ME.vm = instance;
}