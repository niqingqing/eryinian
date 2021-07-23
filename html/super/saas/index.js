(function(){
    init();
})();

function init(){
    ME.vm=new Vue({
        el:'#app',
        data:saasData,
        created:function(){},
        methods:{
            showApiCont(d,i,s) {
                if(!d||!d.id){return}
                var targetOffset=$('#'+d.id).offset().top;
                $('html,body').animate({
                        scrollTop: targetOffset
                    },
                    500);
            },
            filterNode:function(val,data){
                if(!val) return true;
                return data.label.indexOf(val)!==-1
            }
        },
        watch:{
            filterText:function(val){
                this.$refs.tree.filter(val);
            }
        }
    });
}