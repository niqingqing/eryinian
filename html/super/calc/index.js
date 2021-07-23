/**
 * Created by zwt on 2018/9/21.
 */

/**
 * Created by LiuTao on 2017/7/03 0028.
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
            tagNum:1000,
            frequency:3,
            anchorNum: 8,
            days: 180,  //定位的天数
            cpuFreq:1.8,

            activeName:'first',
            batteryCapacity:420,
            workTime: 6,

        },
        created:function(){
        },
        methods:{
            onSubmit:function(){
                var posAnchorNum = 30;
                if(this.anchorNum < posAnchorNum){
                    posAnchorNum = this.anchorNum;
                }

                var concurrency = this.tagNum * this.frequency * posAnchorNum;
                var CPU = Math.ceil(concurrency/400/this.cpuFreq) ; //200并发 1GHz

                var memr = 8;//G
                if(this.tagNum * posAnchorNum > 500){
                    memr += Math.ceil((this.tagNum * posAnchorNum - 500) / 300);
                }


                var hd = 40/1024 + 100 * this.tagNum * this.frequency * ( 60 * 60 * this.workTime ) * this.days / Math.pow(1024,4); //T
                var band = 8*(40 * 6.7 * this.anchorNum + 50 * this.frequency * this.tagNum * posAnchorNum)/ (1024 * 1024);//Mb/s

                var html = '注意：计算出来的配置是最低配置，实际配置需要大于计算配置<br/>';
                html += '并发：'+ concurrency + '次请求/秒 <br/>';
                html += 'CPU：'+ CPU + '颗，每颗主频'+this.cpuFreq+' GHz <br/>';
                html += '内存：'+ memr + 'G <br/>';
                html += '硬盘：'+ hd + 'T <br/>';
                html += '带宽：'+ band + 'Mbit/s <br/>';

                $('#configList').html( html);
            },

            calcPowerWaste:function () {
                var powerRatio = 0.8; //电池总容量折算系数

                var standby = 0.045; //待机电流
                var ble_tx = 7.5 ; //蓝牙发送耗电（ma）
                var ble_rx = 2.7 ; //蓝牙接收耗电（ma）
                var ble_time = 0.0007; //扫描一次持续时间（s）
                var ble_interval = 5; //每隔5分钟开启一次蓝牙（蓝牙一天工作8小时）

                var dw_tx = 290; //DW1000发送耗电（ma）
                var dw_rx = 240; //DW1000接收耗电（ma）
                var dw_wakeup = 30; //DW1000唤醒耗电（ma）
                var dw_sleep = 0.001; //DW1000休眠耗电（ma）

                var dw_time = 0.0007; //已折算了rx+tx，发送接收一次持续时间（s）
                var dw_wakeup_time = 0.006; //唤醒一次持续时间（s）
                var time_interval = 1/this.frequency; //定位周期（s）

                var t1 = standby * (24 - ble_time/3600 * 8 * 60 /ble_interval ); //待机功耗 ma.h
                var t2 = (ble_tx + ble_rx) * ble_time/3600 * 8 * 60 /ble_interval; //蓝牙功耗 ma.h

                var t3 = dw_tx * (this.workTime * 3600 / time_interval) * (dw_time/3600);//DW1000工作功耗 ma.h
                var t4 = dw_wakeup * (this.workTime * 3600 / time_interval) * (dw_wakeup_time/3600);//DW1000唤醒功耗 ma.h， 每一次定位都需要唤醒

                var total_t = t1 + t2 + t3 + t4;
                var total_day = this.batteryCapacity * powerRatio / total_t;

                var html = '预计标签每充满一次电最长可以使用：'+total_day+'天';
                $('#powerWasteResult').html( html);
            }
        },
    });

}
