ME.vm = new Vue({
    el:"#app",
    data:{},
    methods:{},
    created:function(){
        initTable.apply(this);
    }
})

function initData(){};
function initTable(){
    this.$http.get(ME.host + '/project/attendance/getReports').then((res) => {
        console.log(res);
    })
};