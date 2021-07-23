
$(function(){
    init();
});

function init(){
    vueInit();
}

function vueInit() {

    ME.vm = new Vue({
        el: '#app',
        data(){
            return {
                data: [
                        {
                        label: '2.4',
                        children: [
                            {
                                label: '2.4.1',
                                children: [
                                    {
                                        label: '1、修复编辑复制围栏bug'
                                    },
                                    {
                                        label: '2、增加了可校准手表标签时间功能'
                                    },
                                    {
                                        label: '3、增加了项目标签管理页可向手表标签下发消息功能'
                                    }
                                ]
                            },
                            {
                                label: '2.4.2',
                                children: [
                                    {
                                        label: '1、地图页和超级管理员下的标签管理增加标签下发消息。'
                                    },
                                    {
                                        label: '2、双曲线页面增加双击框选基站，并设置功能'
                                    },
                                    {
                                        label: '3、修复地图下拉菜单只能展示15条地图的bug'
                                    },
                                    {
                                        label: '4、增加下发消息到手表标签的api接口'
                                    }
                                ]
                            },
                            {
                                label: '2.4.3',
                                children: [
                                    {
                                        label: '1、修复导出基站excel文件时错位问题'
                                    },
                                    {
                                        label: '2、增加考勤可设置时间段功能'
                                    },
                                    {
                                        label: '3、增加围栏可设置消息发送到手表标签功能。'
                                    }
                                ]
                            },
                            {
                                label: '2.4.4',
                                children: [
                                    {
                                        label: '1、修复地图canvas页面无法打开问题'
                                    },
                                    {
                                        label: '2、修复超级管理员下基站管理页新增基站时，抓包模式无默认值bug'
                                    },
                                    {
                                        label: '3、修复地图页面，告警弹出框关闭问题，只显示一次后不再弹窗，关闭弹窗相应的标签状态为关闭（sos）'
                                    },
                                    {
                                        label: '4、增加版本功能记录页'
                                    }
                                ]
                            },
                            {
                                label: '2.4.5',
                                children: [
                                    {
                                        label: '1、地图页面标签电量实时显示问题修改'
                                    },
                                    {
                                        label: '2、api接口node/list和project/tag/list返回标签状态不一致修改'
                                    },
                                    {
                                        label: '3、websocket接口标签定位coord类型中加入imu参数'
                                    }
                                ]
                            },
                            {
                                label: '2.4.6',
                                children: [
                                    {
                                        label: '1、查看同步包，无同步包时同步包地图给出无同步包提示。'
                                    },
                                    {
                                        label: '2、测距增加选择多基站可相互测距功能，测距地图误差和波幅可切换展示'
                                    }
                                ]
                            },
                            {
                                label: '2.4.7',
                                children: [
                                    {
                                        label: '1、基站支持NTM参数设置功能'
                                    },
                                    {
                                        label: '2、基站上报NEMA和基站测距的websocket接口'
                                    },
                                    {
                                        label: '3、地图标签移动显示设置'
                                    },
                                    {
                                        label: '4、抓取测试数据文件删除功能'
                                    },
                                    {
                                        label: '5、标签websocket十进制，标签下发支持十进制'
                                    },
                                    {
                                        label: '6、gps转换修改，摄像头方向'
                                    },
                                    {
                                        label: '7、一维主基站增加配置参数tof和不得超过基站距离的倍数cfg_andTof_times_distance'
                                    }
                                ]
                            },
                            {
                                label: '2.4.8',
                                children: [
                                    {
                                        label: '1、地图页面空格键控制水平、垂直、任意角度测距。'
                                    },
                                    {
                                        label: '2、增加标签设置，并修改标签设置存在的问题。'
                                    },
                                    {
                                        label: '3、绘制特殊区域后，自动形成基站组。'
                                    },
                                    {
                                        label: '4、修改Gps转换bug，修改websocket转换十进制bug，修改db下的dashboard表的index中的bug'
                                    }
                                ]
                            },
                        ]
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        created: function () {

        },
        methods: {

        }
    });
}