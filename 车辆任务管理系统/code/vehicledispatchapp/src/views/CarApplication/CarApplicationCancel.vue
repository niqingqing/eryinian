<template>
    <div class="CarApplicationCancel">

        <!--备注-->
        <div class="note">
            <van-field
                    v-model="message"
                    rows="2"
                    autosize
                    label="取消原因"
                    type="textarea"
                    maxlength="200"
                    placeholder="请输入取消原因"
                    show-word-limit
            />
        </div>
        <!--end-->

        <!--按钮-->

        <div class="button">

            <van-button type="default" class="aa">取消</van-button>
            <van-button type="info">确定</van-button>

        </div>

    </div>
</template>

<script>
    import "@/assets/CarApplication/CarApplicationCancel.css";
    export default {
        name: "CarApplicationCancel",
        data() {
            return {
                message:'',  //备注信息
            }
        },
        methods: {

        }
    }
</script>

<style scoped>
    .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
        border-width: 0;
        /*border-bottom-width: 16px;*/
        /*border-color: red;*/
    }

    .van-button--normal{
        padding: 0 24px;
        height: 40px;
    }


</style>
