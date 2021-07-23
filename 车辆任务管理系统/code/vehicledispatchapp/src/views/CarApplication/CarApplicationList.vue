<template>
    <div class="CarApplicationList">
        <!-- <img alt="Vue logo" src="../assets/logo.png">
         <HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <van-tabs>
            <van-tab v-for="(item, index) in tabList" :title="item" :key="index">
                <div class="all" v-if="index == 0" style="height: 100vh;">
                    <div class="allList">
                        <!--标题-->
                        <div class="aTitle">
                            <div class="atTitle">任务申请</div>
                            <div class="atstatu">申请中</div>
                        </div>
                        <!--end-->
                        <!--内容-->
                        <div class="aContent">
                            <div class="acLeft">
                                <div class="aclName">
                                    <div class="aclnTitle">任&emsp;务&emsp;名&emsp;称：</div>
                                    <div class="aclnanswer">任务一任务一</div>
                                </div>
                                <div class="aclStarttime">
                                    <div class="aclsTitle">计划开始时间：</div>
                                    <div class="aclsanswer">2021/07/21 12:00</div>
                                </div>
                                <div class="aclEndtime">
                                    <div class="acleTitle">计划结束时间：</div>
                                    <div class="acleanswer">2021/07/21 12:00</div>
                                </div>
                                <div class="aclStart">
                                    <div class="aclsTitle">任&emsp;务&emsp;起&emsp;点：</div>
                                    <div class="aclsanswer">码头一</div>
                                </div>
                                <div class="aclEnd">
                                    <div class="acleTitle">任&emsp;务&emsp;终&emsp;点：</div>
                                    <div class="acleanswer">码头二</div>
                                </div>
                            </div>
                            <div class="acRight">
                                <div class="acrStart">开始</div>
<!--                                <div class="acrWait">等待</div>-->
                                <div class="acrResult">结束</div>
                            </div>
                        </div>
                        <!--end-->
                    </div>
                </div>
                <div class="application" v-if="index == 1">

                </div>
                <div class="nostart" v-if="index == 2">ddfeeeeddd</div>
                <div class="ongoing" v-if="index == 3">dddwwwwwwwwwdd</div>
                <div class="completed" v-if="index == 4">dddwwwwwwwwwdd</div>
                <div class="terminated" v-if="index == 5">dddwwwwwwwwwdd</div>
                <div class="nothrough" v-if="index == 6">dddwwwwwwwwwdd</div>
            </van-tab>
        </van-tabs>
        <!--添加-->
        <div class="add"><img src="@/assets/CarApplication/application.png"></div>
        <!--end-->
    </div>
</template>

<script>
    // @ is an alias to /src
    // import HelloWorld from '@/components/HelloWorld.vue'
    import "@/assets/CarApplication/CarApplicationList.css";

    export default {
        name: 'CarApplicationList',
        components: {
            // HelloWorld
        },
        data() {
            return {
            tabList: ['全部', '申请中', '未通过'],  //tab标签名字
        }},
        methods: {}
    }
</script>
<style>
    .van-tabs__nav {
        position: fixed !important;
        height: 40px !important;
    }

    .van-tabs__nav--line {
        padding-bottom: 0 !important;
    }

    /*.van-tabs--line .van-tabs__wrap{*/
    /*    height: 40px !important;*/
    /*}*/
    .van-tabs__line {
        bottom: 0 !important;
    }

    .van-tab--active {
        /*background: red;*/
        /*color: #fff !important;*/
    }
    .van-tabs__nav{
        width: 100%;
        padding: 0 2.2px;
        min-width: 33.3333333%;
    }
    .van-tabs__line{
        width: 33.33333333% !important;
    }
</style>
