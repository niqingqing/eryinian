<template>
    <div class="CarApplicationAdd">

        <!--任务名称-->
        <div class="taskName">
            <van-cell-group>
                <van-field v-model="taskValue" label="任务名称" placeholder="请输入任务名称" required/>
            </van-cell-group>
        </div>
        <!--end-->
        <!--用车开始时间-->
        <div class="planStartTime">
            <van-cell-group>
                <van-field v-model="startTime" label="用车开始时间" placeholder="请选择开始时间" required @click="startShowPopup"/>
            </van-cell-group>
            <van-popup v-model="startShow" position="bottom">
                <van-datetime-picker
                        v-model="startCurrentDate"
                        type="datetime"
                        title="选择时间"
                        @confirm="startConfirm"
                        @cancel="startCancel"
                />
            </van-popup>
        </div>
        <!--end-->
        <!--用车结束时间-->
        <div class="planEndTime">
            <van-cell-group>
                <van-field v-model="endTime" label="用车结束时间" placeholder="请选择结束时间" required @click="endShowPopup"/>
            </van-cell-group>
            <van-popup v-model="endShow" position="bottom">
                <van-datetime-picker
                        v-model="endCurrentDate"
                        type="datetime"
                        title="选择时间"
                        @confirm="endConfirm"
                        @cancel="endCancel"
                />
            </van-popup>
        </div>
        <!--end-->
        <!--任务起点-->
        <div class="taskStart">
            <van-cell-group>
                <van-field v-model="taskStartValue" label="任务起点" placeholder="请输入任务起点" required/>
            </van-cell-group>
        </div>
        <!--end-->
        <!--任务终点-->
        <div class="taskEnd">
            <van-cell-group>
                <van-field v-model="taskEndValue" label="任务终点" placeholder="请输入任务终点" required/>
            </van-cell-group>
        </div>
        <!--end-->
        <!--车辆类型-->
        <div class="planEndTime">
            <van-cell-group>
                <van-field v-model="carTypeCurrent" label="车辆类型" placeholder="请选择车辆类型" required   right-icon="arrow-down" @click="carType"/>
            </van-cell-group>
            <van-popup v-model="carTypeShop" position="bottom">
                <van-picker
                        title="选择车辆类型"
                        show-toolbar
                        :columns="columns"
                        @confirm="onConfirm"
                        @cancel="onCancel"
                />
            </van-popup>
        </div>
        <!--end-->
        <!--备注-->
        <div class="note">
            <van-field
                    v-model="message"
                    rows="2"
                    autosize
                    label="留言"
                    type="textarea"
                    maxlength="50"
                    placeholder="请输入备注"
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
    import "@/assets/CarApplication/CarApplicationAdd.css";
    export default {
        name: "CarApplicationAdd",
        data() {
            return {
                taskValue: '',  //任务名称输入的值
                startShow: false,  // 用车开始时间弹出层是否显示
                endShow: false,  //用车结束时间弹出层是否显示
                startCurrentDate: new Date(),  //用车开始时间控件
                endCurrentDate: new Date(),  //用车结束时间控件
                startTime: '',  //用车开始时间
                endTime:'',  //用车结束时间
                taskStartValue:'',  //任务起点
                taskEndValue:'',  //任务终点
                carTypeShop:false,  //车辆类型的弹窗是否显示
                columns: ['叉车', '侧叉车', '牵引车'],  //车辆类型
                carTypeCurrent:'',  //选中的车辆类型值
                message:'',  //备注信息
            }
        },
        methods: {
            /*用车开始时间弹出层*/
            startShowPopup() {
                this.startShow = true;
            },
           /*用车结束时间弹出层*/
            endShowPopup(){
                this.endShow = true;
            },
            /*用车开始时间确定事件*/
            startConfirm() {
                this.startShow = false;
                this.startTime = this.startCurrentDate.getFullYear() + '/' + (this.startCurrentDate.getMonth() + 1) + '/' + this.startCurrentDate.getDate() + ' ' + this.startCurrentDate.getHours() + ':' + this.startCurrentDate.getMinutes();
            },
            /*用车开始时间取消事件*/
            startCancel() {
                this.startShow = false;
            },
            /*用车结束时间确定事件*/
            endConfirm() {
                this.endShow = false;
                this.endTime = this.endCurrentDate.getFullYear() + '/' + (this.endCurrentDate.getMonth() + 1) + '/' + this.endCurrentDate.getDate() + ' ' + this.endCurrentDate.getHours() + ':' + this.endCurrentDate.getMinutes();
            },
            /*用车结束时间取消事件*/
            endCancel() {
                this.endShow = false;
            },
            /*车辆类型弹出层*/
            carType(){
                this.carTypeShop = true
            },
            /*车辆类型确定事件*/
            onConfirm(value) {
                this.carTypeCurrent = value;
                this.carTypeShop = false
            },
            /*车辆类型取消事件*/
            onCancel() {
                this.carTypeShop = false
            },
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
