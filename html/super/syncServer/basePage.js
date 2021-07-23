var baseTable={
    projects:'项目管理',
    users:'用户管理',
    tag:'标签管理',
    anchor:'基站管理',
    anchor_group:'基站组管理',

    // versions:'版本管理',
    // sim:'SIM卡管理',
    // imitate:'模拟数据',
    // servers:'服务管理',
    // product_model:'产品型号'
};


var pageData={
    projects:{
        onDblClickRow:function(row, $element){
                    goToProj(row.code);
                },
        columns:[
            {checkbox:true,width:'2%'},
            {field: 'id',title: 'ID', width:'2%', sortable:true, searchable:true},
            {field: 'code', title: '编码', width:'5%', sortable:true, searchable:true}, 
            {field: 'cname',title: '项目名称',width:'6%', sortable:true, searchable:true,
            formatter:function(value,row,index){
                return '<a href="javascript:void(0);" onClick="goToProj(\''+row.code+'\')">'+value+'</a>'
                }
            },
            //projType, status, userId, managerId, tel, email, address, company, others, addTime, addUser
            {field: 'projType',title: '项目类型',width:'6%', sortable:true, searchable:true},
            //'init','plan','exec','run','cancel','close'
            {field: 'status',title: '项目状态',width:'6%', sortable:true, searchable:true,
                formatter:function(value, row, index){
                        if(value=='init'){
                            return '立项';
                        }
                        if(value=='plan'){
                            return '计划';
                        }
                        if(value=='exec'){
                            return '执行';
                        }
                        if(value=='cancel'){
                            return '取消';
                        }
                        if(value=='close'){
                            return '关闭';
                        }
                        return '未知';
                },
            },
            {field: 'managerId',title: '项目负责人',width:'6%', sortable:true, searchable:true},
            {field: 'userId',title: '项目对接人',width:'6%', sortable:true, searchable:true},
    
            {field: 'tel',title: '电话',width:'10%', sortable:true, searchable:true},
    
            {field: 'email',title: '邮箱',width:'10%', sortable:true, searchable:true},
            {field: 'address',title: '住址',width:'25%', sortable:true, searchable:true},
            {field: 'company',title: '公司',width:'10%', sortable:true, searchable:true},
    
            {field: 'logo', title: '项目LOGO', width:'5%', sortable:true, searchable:true},
            {field: 'description',title: '版本描述',width:'6%', sortable:true, searchable:true},
            {field: 'tagDisappearTime',title: '标签消失时间（秒）',width:'6%', sortable:true, searchable:true},
    
            {field: 'addTime',title: '添加时间',width:'6%', sortable:true, searchable:true},
            {field: 'addUser',title: '添加用户',width:'6%', sortable:true, searchable:true},
        ]
    },
    users:{
        sortName:'id',
        columns:[
        {checkbox:true,width:'2%'},
        {field: 'id',title: 'ID', width:'2%', sortable:true, searchable:true},
        {field: 'code', title: '账号', width:'4%', sortable:true, searchable:true},
        {field: 'cname',title: '姓名',width:'6%', sortable:true, searchable:true},
        {field: 'userType',title: '用户类型',width:'6%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                    if(value == 'super'){
                        return '超级管理员'
                    }
                    if(value == 'proj_user'){
                        return '项目管理员'
                    }
                    // if(value == 'self'){
                    //     return '内部职员'
                    // }
                    // if(value == 'proj_user'){
                    //     return '项目用户'
                    // }
            },
        },
        {field: 'isActive',title: '是否激活',width:'5%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                    return value>0?'是':'否';
            },
        },
        {field: 'validity',title: '有效期',width:'15%', sortable:true, searchable:true},
        {field: 'cellphone',title: '电话',width:'10%', sortable:true, searchable:true},
        {field: 'email',title: '邮箱',width:'10%', sortable:true, searchable:true},
        {field: 'birthDate',title: '出生日期',width:'8%', sortable:true, searchable:true},
        {field: 'address',title: '住址',width:'40%', sortable:true, searchable:true},
        {field: 'img',title: '头像',width:'10%', sortable:true, searchable:true},
        {field: 'projectId',title: '项目',width:'6%', sortable:true, searchable:true},
        {field: 'addTime',title: '添加时间',width:'6%', sortable:true, searchable:true},

        ]
    },
    tag:{
        columns: [
            {checkbox:true},
            {field: 'id',title: 'ID', width:'2%', sortable:true,  searchable:true},
            {field: 'code', title: '编码', width:'5%', sortable:true, searchable:true}, 
            {field: 'mac',title: 'mac地址',width:'6%', sortable:true, searchable:true},
            {field: 'projectId',title: '所属项目',width:'6%', sortable:true, searchable:true},
            {field: 'productId',title: '产品型号',width:'6%', sortable:true, searchable:true},
            {field: 'onlineTime',title: '状态',width:'6%', sortable:true, searchable:true,
                formatter:function(value, row, index){
                    var diff = Date.now() - value;
                    if(diff < 120000){
                        return '<font style="color:green;">在线</font>';
                    }
                    return '<font style="color:red;">离线</font>';
                }
            },

            {field: 'map', title: '最后所在地图', width: '6%', sortable: true, searchable: true},
            {field: 'x', title: '最后位置', width: '6%', sortable: true, searchable: true,
                formatter:function(value, row, index){
                    if(value){
                        return value +','+row.y +','+row.z;
                    }
                }
            },
            {field: 'rxDelay',title: '天线rx延迟(m)',width:'10%', sortable:true, searchable:true},
            {field: 'txDelay',title: '天线tx延迟(m)',width:'10%', sortable:true, searchable:true},
            {field: 'wakePeriod',title: '唤醒周期(m)',width:'25%', sortable:true, searchable:true},
            {field: 'locatingPeriod',title: '刷新频率(hz)',width:'10%', sortable:true, searchable:true},
            {field: 'maxPower',title: '最大电量(mv)',width:'10%', sortable:true, searchable:true},
            {field: 'manu',title: '厂商',width:'10%', sortable:true, searchable:true},
            {field: 'softVersion',title: '软件版本号',width:'25%', sortable:true, searchable:true},
            {field: 'hardVersion',title: '硬件版本号',width:'10%', sortable:true, searchable:true},
            {field: 'channel',title: '频道',width:'10%', sortable:true, searchable:true},
            {field: 'frameType',title: '帧类型',width:'10%', sortable:true, searchable:true },
            {field: 'crc',title: 'crc',width:'25%', sortable:true, searchable:true},
            {field: 'dataRate',title: '数据速率',width:'10%', sortable:true, searchable:true},
            {field: 'pacSize',title: '包大小',width:'10%', sortable:true, searchable:true},
            {field: 'pulseFrequency',title: '脉冲频率(MHZ)',width:'10%', sortable:true, searchable:true},
    
            {field: 'preambleCode',title: '序文编码',width:'25%', sortable:true, searchable:true},
            {field: 'preambleLength',title: '序文长度',width:'10%', sortable:true, searchable:true},
            {field: 'smartPower',title: 'smartPower',width:'10%', sortable:true, searchable:true,
                formatter:function(value, row, index){
                    return value>0?'支持':'不支持';
                },
            },
            {field: 'frameCheck',title: 'frameCheck',width:'10%', sortable:true, searchable:true,
                formatter:function(value, row, index){
                    return value>0?'支持':'不支持';
                },
            },
            {field: 'upTime',title: '最后更新时间',width:'10%', sortable:true, searchable:true},
            {field: 'addTime',title: '添加时间',width:'6%', sortable:true, searchable:true},
            {field: 'addUser',title: '添加用户',width:'6%', sortable:true, searchable:true},
    
        ]
    },
    anchor:{
        columns:[
                {checkbox: true},
                {field: 'id', title: 'ID', width: '2%', sortable: true, searchable: true},
                {field: 'code', title: '编码', width: '5%', sortable: true, searchable: true},
                {field: 'mac', title: 'mac地址', width: '6%', sortable: true, searchable: true},
                {field: 'onlineTime',title: '状态',width:'6%', sortable:true, searchable:true,
                    formatter:function(value, row, index){
                        var diff = Date.now() - value;
                        if(diff < 120000){
                            return '<font style="color:green;">在线</font>';
                        }
                        return '<font style="color:red;">离线</font>';
                    }
                },
                {field: 'projectId', title: '所属项目', width: '6%', sortable: true, searchable: true},
                {field: 'productId', title: '产品型号', width: '6%',sortable: true, searchable: true},
                {field: 'mapId', title: '所属地图', width: '6%', sortable: true, searchable: true},
                {field: 'isMaster', title: '是否是主基站', width: '6%', sortable: true,
                    formatter: function (value, row, index) {
                        return value > 0 ? '是' : '否';
                    },
                    searchable: true
                },
                {field: 'masterList', title: '所属主基站列表', width: '8%', sortable: true, searchable: true},
                {
                    field: 'isRangeWithTag', title: '是否支持与标签测距', width: '6%', sortable: true,
                    formatter: function (value, row, index) {
                        return value > 0 ? '是' : '否';
                    },
                    searchable: true
                },
                {field: 'min_num', title: '最小基站数量', width: '8%', sortable: true, searchable: true},
                {field: 'txPower', title: '发射功率', width: '8%', sortable: true, searchable: true},

                {field: 'x', title: 'x(cm)', width: '6%', sortable: true, searchable: true},
                {field: 'y', title: 'y(cm)', width: '6%', sortable: true, searchable: true},
                {field: 'z', title: 'z(cm)', width: '6%', sortable: true, searchable: true},

                {field: 'lon', title: 'lon', width: '6%', sortable: true, searchable: true},
                {field: 'lat', title: 'lat', width: '6%', sortable: true, searchable: true},
                {field: 'algorithm', title: '算法', width: '6%', sortable: true, searchable: true},
                {field: 'anchor_signal', title: '信号强度', width: '6%',sortable: true, searchable: true},
                {
                    field: 'netType', title: '联网方式', width: '6%', sortable: true, searchable: true,
                    formatter: function (value, row, index) {
                        if (value == '4G') {
                            return '4G';
                        }
                        if (value == 'wifi') {
                            return 'WIFI';
                        }
                        if (value == 'wire') {
                            return '网线';
                        }
                        return '未知';
                    }
                },
                {
                    field: 'signalQuality', title: '信号质量(0-30)', width: '6%', sortable: true, searchable: true,
                    formatter: function (value, row, index) {
                        if (value > 20) {
                            return '<span style="color:green">' + value + '</span>';
                        } else if (value > 15) {
                            return '<span style="color:#f7ba2a">' + value + '</span>';
                        }
                        return '<span style="color:red">' + value + '</span>';
                    }
                },
                {
                    field: 'synFreq', title: '同步周期(ms)',width:'6%',sortable: true, searchable: true
                },
                {field: 'currentIp', title: '当前IP', width: '10%', sortable: true, searchable: true},
                {field: 'rxDelay', title: '天线rx延迟', width: '10%', sortable: true, searchable: true},
                {field: 'txDelay', title: '天线tx延迟', width: '10%', sortable: true, searchable: true},
                {field: 'swVersion', title: '软件版本号', width: '25%', sortable: true, searchable: true},
                {field: 'hwVersion', title: '硬件版本号', width: '10%', sortable: true, searchable: true},
                {field: 'kerVersion', title: '内核版本号', width: '10%', sortable: true, searchable: true},
                {field: 'channel', title: '频道', width: '10%', sortable: true, searchable: true},
                {field: 'frameType', title: '帧类型', width: '10%', sortable: true, searchable: true},
                {field: 'crc', title: 'crc', width: '25%', sortable: true, searchable: true},
                {field: 'dataRate', title: '数据速率', width: '10%', sortable: true, searchable: true},
                {field: 'pacSize', title: '包大小', width: '10%', sortable: true, searchable: true},
                {field: 'pulseFrequency', title: '脉冲频率(MHZ)', width: '10%', sortable: true, searchable: true},
                {field: 'preambleCode', title: '序文编码', width: '25%', sortable: true, searchable: true},
                {field: 'preambleLength', title: '序文长度', width: '10%', sortable: true, searchable: true},
                {
                    field: 'smartPower', title: 'smartPower', width: '10%', sortable: true, searchable: true,
                    formatter: function (value, row, index) {
                        return value > 0 ? '支持' : '不支持';
                    },
                },
                {
                    field: 'frameCheck', title: 'frameCheck', width: '10%', sortable: true, searchable: true,
                    formatter: function (value, row, index) {
                        return value > 0 ? '支持' : '不支持';
                    },
                },
            
                {
                    field: 'upTime', title: '最后更新时间', width: '10%', sortable: true, searchable: true,
                    formatter: function (value, row, index) {
                        if (value) {
                            var date = new Date(value);
                            return date.toLocaleString();
                        }
                        return value;
                    }
                },
                {
                    field: 'addTime', title: '添加时间', width: '6%', sortable: true, searchable: true,
                    formatter: function (value, row, index) {
                        if (value) {
                            var date = new Date(value);
                            return date.toLocaleString();
                        }
                        return value;
                    }
                },
                {field: 'addUser',title: '添加用户',width:'6%', sortable:true, searchable:true},
            
         ]
    },
    versions:{
    columns: [
        {radio:true},
        {field: 'id',title: 'ID', width:'4%', sortable:true, searchable:true},
        {field: 'ver_name',title: '版本名称',width:'12%', sortable:true, searchable:true},
        {field: 'ver_type',title: '版本类型',width:'8%', sortable:true, searchable:true},
        {field: 'soft_version',title: '软件版本',width:'8%', sortable:true, searchable:true},
        {field: 'hard_version',title: '硬件版本',width:'8%', sortable:true, searchable:true},
        {field: 'kernel_version',title: '内核版本',width:'8%', sortable:true, searchable:true},
        {field: 'ver_cate',title: '版本分类',width:'6%', sortable:true, searchable:true},
        {field: 'ver_path',title: '版本路径',width:'10%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value){
                    var html = '<a href="'+ (ME.imgHost+"versions_"+value) +'" target="_blank" >'+value+'</a>';
                    return '<div>'+html+'</div>';
                }
                return value;
            }
        },
        {field: 'ver_size',title: '版本大小(KB)',width:'8%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value){
                    return (value/1024).toFixed(2);
                }
                return value;
            }
        },
        {field: 'is_active',title: '是否激活',width:'6%', sortable:true, searchable:true, 
            formatter:function(value, row, index){
                    return value>0?'是':'否';
            },
        },
        {field: 'addTime',title: '添加时间',width:'22%', sortable:true, searchable:true},
        {field: 'addUser',title: '添加用户',width:'11%', sortable:true, searchable:true},
    ]

    },
    anchor_group:{
        columns: [
            {radio:true},
            {field: 'id',title: 'ID', width:'5%', sortable:true, searchable:true},
            {field: 'code', title: '编码', width:'10%', sortable:true, searchable:true}, 
            {field: 'projectId',title: '所属项目',width:'10%', sortable:true, searchable:true},
            {field: 'mapId',title: '所属地图',width:'10%', sortable:true, searchable:true},
            {field: 'showType',title: '定位维度',width:'10%', sortable:true, searchable:true,
                formatter:function(value, row, index){
                        if(value=='0D'){
                            return '0D';
                        }
                        if(value=='1D'){
                            return '1D';
                        }
                        if(value=='2D'){
                            return '2D';
                        }
                        if(value=='2.5D'){
                            return '2.5D';
                        }
                        if(value=='3D'){
                            return '3D';
                        }
                        return '未知';
                }
            },
            {field: 'algorithm',title: '换算算法',width:'10%', sortable:true, searchable:true},
            {field: 'serverIp',title: '服务器IP',width:'10%', sortable:true, searchable:true},
            {field: 'memo',title: '备注',width:'15%', sortable:true, searchable:true},
            {field: 'upTime',title: '最后更新时间',width:'10%', sortable:true, searchable:true},
    
            {field: 'addTime',title: '添加时间',width:'10%', sortable:true, searchable:true},
            {field: 'addUser',title: '添加用户',width:'10%', sortable:true, searchable:true},
        ]
    },
    sim:{
        columns: [
            {checkbox:true ,width:'2%'},
            {field: 'id',title: 'ID', width:'2%', sortable:true,  searchable:true},
            {field: 'num', title: '卡号', width:'5%', sortable:true, searchable:true},
            {field: 'iccid',title: 'iccid号',width:'6%', sortable:true, visible:false, searchable:true},
            {field: 'anchor',title: '所属基站',width:'6%', sortable:true, searchable:true},
            {field: 'operator',title: '运营商',width:'6%', sortable:true, searchable:true},
            {field: 'supplier',title: '供应商',width:'6%', sortable:true, searchable:true,
                formatter:function(value, row, index){
                    var suppliers=ME.vm.suppliers;
                    for(var i=0;i<suppliers.length;i++){
                        if(value==suppliers[i].cname){
                            return '<a href="'+suppliers[i].link+'" target="_blank">'+value+'</a>';
                        }
                    }
                    return value;
                }
            },
            {field: 'flowtotal',title: '流量总量(M)',width:'10%', sortable:true, visible:false,searchable:true},
            {field: 'flowused',title: '流量花费(M)',width:'10%', sortable:true, visible:false,searchable:true}
        ]
    },
    imitate:{
        columns: [
            {checkbox:true ,width:'2%'},
            {field: 'id',title: 'ID', width:'2%', sortable:true,  searchable:true},
            {field: 'map', title: '项目地图', width:'5%', sortable:true, searchable:true,
                formatter: function (value, row, index) {
                    if(value){
                        var html = '<a href="javascript:void(0);" onclick=" UBIT.openMapBySuper(\''+value+'\');" >'+value+'</a>';
                        return '<div>'+html+'</div>';
                    }
                    return value;
                }
            },
            {field: 'msgType', title: '消息类型', width:'5%', sortable:true, searchable:true},
            {field: 'isStarted', title: '状态', width:'5%', sortable:true, searchable:true,
            formatter: function (value, row, index) {
                if (value) {
                    return `<span style="color:green;">启动</span>`;
                }
                return `<span style="color:gray;">停止</span>`;
                }
            },
            {field: 'anchor',title: '基站',width:'6%', sortable:true, searchable:true},
            {field: 'tag',title: '标签',width:'6%', sortable:true, searchable:true},
    
            {field: 'coord_tagNum',title: '标签数量',width:'6%', sortable:true, searchable:true},
            {field: 'coord_xStart',title: '起始x(cm)',width:'6%', sortable:true, searchable:true},
            {field: 'coord_yStart',title: '起始y(cm)',width:'6%', sortable:true, searchable:true},
            {field: 'coord_xEnd',title: '终止x(cm)',width:'6%', sortable:true, searchable:true},
            {field: 'coord_yEnd',title: '终止y(cm)',width:'6%', sortable:true, searchable:true},
            {field: 'coord_xStep',title: 'x步长(cm)',width:'6%', sortable:true, searchable:true},
            {field: 'coord_yStep',title: 'y步长(cm)',width:'6%', sortable:true, searchable:true},
            {field: 'coord_interval',title: '间隔时间(ms)',width:'6%', sortable:true, searchable:true},
    
            {field: 'sos_type',title: 'sos类型',width:'6%', sortable:true, searchable:true},
            {field: 'power_power',title: '电量(mv)',width:'6%', sortable:true, searchable:true},
            {field: 'addTime',title: '添加时间',width:'10%', sortable:true,searchable:true,
                formatter: function (value, row, index) {
                    if (value) {
                        var date = new Date(value);
                        return date.toLocaleString();
                    }
                    return value;
                }
            },
            // {field: 'addUser',title: '添加人',width:'10%', sortable:true, searchable:true},
            // {field: 'upTime',title: '更新时间',width:'10%', sodrtable:true, searchable:true,
            //     formatter: function (value, row, index) {
            //         if (value) {
            //             var date = new Date(value);
            //             return date.toLocaleString();
            //         }
            //         return value;
            //     }
            // }
        ]
    },
    product_model:{

    columns: [
        {checkbox:true, width:'1%'},
        {field: 'id',title: 'ID', width:'2%', sortable:true,  searchable:true},
        {field: 'cname', title: '产品型号', width:'5%', sortable:true, searchable:true},
        {field: 'mtype', title: '产品类型', width:'5%', sortable:true, searchable:true},
        {field: 'weight',title: '重量(g)',width:'4%', sortable:true, searchable:true},
        {field: 'description',title: '产品描述',width:'12%', sortable:true, searchable:true},
        {field: 'remark',title: '备注',width:'12%', sortable:true, searchable:true},
    ]
    },
    servers:{

    },
    

}