var projTable={
    tag:'标签管理',
    anchor:'基站管理',
    fence:'围栏管理',
    map:'地图管理',
    camera:'摄像头管理',
};

// ['tag','anchor','fence','map','camera'];
var pageData={
    tag:{
        columns: [
            // {radio:true},
            {checkbox:true},
            {field: 'id',title: 'ID', width:'2%', sortable:true,searchable:true},
            {field: 'sourceId',title: '原始ID',width:'6%', sortable:true, searchable:true},
            {field: 'code', title: '编码', width:'5%', sortable:true, searchable:true}, 
            {field: 'alias',title: '别名',width:'10%', sortable:true, searchable:true},
            // {field: 'mapName',title: '地图',width:'10%', sortable:true, searchable:true},
    
            {field: 'catId',title: '分组',width:'10%', sortable:true, searchable:true,
                formatter:function(value, row, index){
                    if(row.cat){
                      return '<font color="'+row.cat.color+'">'+row.cat.cname+'</font>';
                    }
                    return value;
                }
    
            },
            {field: 'typeId',title: '类型',width:'25%', sortable:true, searchable:true,
               formatter:function(value, row, index){
                var html;
                   if(row.type){
                       html = '<img src="'+ME.imgHost + 'tagTypes_' + row.type.icon+'" width="40px" height="40px"/>' ;
                       return html;
                    }
                   html = '<img src="'+ME.iconPath + 'tag/location_blue.png" width="40px" height="40px"/>' ;
                   return html;
                }
            },
            {field: 'sort',title: '排序',width:'10%', sortable:true, searchable:true},
            {field: 'mac',title: 'mac地址',width:'6%', sortable:true, searchable:true},
    
            {field: 'status',title: '状态',width:'6%', sortable:true, searchable:true,
                formatter:function(value, row, index){
                    if(value=='online'){
                        return '<font style="color:green;">在线</font>';
                    }else if(value=='offline'){
                        return '<font style="color:red;">离线</font>';
                    }else if(value=='disable'){
                        return '<font style="color:gray;">禁用</font>';
                    }
                        return '未知';
                }
            },
    
            {field: 'rxDelay',title: '天线rx延迟',width:'10%', sortable:true, searchable:true},
            {field: 'txDelay',title: '天线tx延迟',width:'10%', sortable:true, searchable:true},
            {field: 'wakePeriod',title: '唤醒频率',width:'25%', sortable:true, searchable:true},
            {field: 'locatingPeriod',title: '刷新频率',width:'10%', sortable:true, searchable:true},
            {field: 'maxPower',title: '最大电量',width:'10%', sortable:true, searchable:true},
            {field: 'manu',title: '厂商',width:'20%', sortable:true, searchable:true},
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
    
            {field: 'upTime',title: '最后更新时间',width:'10%', sortable:true, searchable:true,
                formatter:function(value, row, index){
                    if(value){
                      var date = new Date(value);
                      return date.toLocaleString();
                    }
                    return value;
                }
            },
            {field: 'addTime',title: '添加时间',width:'6%', sortable:true, searchable:true,
                formatter:function(value, row, index){
                    if(value){
                      var date = new Date(value);
                      return date.toLocaleString();
                    }
                    return value;
                }
            },
        ] },
    anchor:{
       columns: [
    {checkbox: true},
    {field: 'id', title: 'ID', width: '2%', sortable: true, searchable: true},
    {field: 'sourceId', title: '原始ID', width: '6%',sortable: true, searchable: true},
    {field: 'alias', title: '别名', width: '10%',sortable: true, searchable: true},
    {field: 'code', title: '编码', width: '5%', sortable: true, searchable: true},
    {field: 'mac', title: 'mac地址', width: '6%', sortable: true, searchable: true},
    {
        field: 'status', title: '状态', width: '6%', sortable: true, searchable: true,
        formatter: function (value, row, index) {
            switch (value) {
                case 'online' :
                    return '<font style="color:green">在线</font>';
                    break;
                case 'offline' :
                    return '<font style="color:red">离线</font>';
                    break;
                case 'disable' :
                    return '<font style="color:gray">禁用</font>';
                    break;
                default:
                    return '未知';
            }
        }
    },
    {field: 'mapId', title: '所属地图', width: '6%', sortable: true, searchable: true},
    {
        field: 'color', title: '颜色', width: '20%', sortable: true, searchable: true,
        cellStyle: function (value, row, index, field) {
            if (value) {
                return {
                    css:
                        {'color': value}
                };
            }
            return {
                css:
                    {'color': '#333'}
            };
        }
    },
    {field: 'sort', title: '排序', width: '10%', sortable: true, searchable: true},
    {
        field: 'isMaster', title: '是否是主基站', width: '6%', sortable: true,
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
    {field: 'x', title: 'x', width: '6%', sortable: true,  searchable: true},
    {field: 'y', title: 'y', width: '6%', sortable: true,  searchable: true},
    {field: 'z', title: 'z', width: '6%', sortable: true,  searchable: true},
    {field: 'lon', title: 'lon', width: '6%', sortable: true, searchable: true},
    {field: 'lat', title: 'lat', width: '6%', sortable: true, searchable: true},
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
    {
        field: 'dataRate', title: '数据速率', width: '10%', sortable: true, searchable: true},
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

]
     },
    fence:{
        columns: [
            {radio:true},
            {field: 'id',title: 'ID', width:'20%', sortable:true},
            {field: 'cname',title: '名称',width:'20%', sortable:true, searchable:true},
            {field: 'mapId',title: '地图',width:'20%', sortable:true, searchable:true},
            {field: 'ftypeId',title: '类型',width:'20%', sortable:true,searchable:true},
            {field: 'trif',title: '触发条件',width:'20%', sortable:true,searchable:true,
                formatter:function(value, row, index){
                    if(value=='i') return "进入触发";
                    if(value=='o') return "出去触发";
                    if(value=="io") return "进出触发";
                    return value;
                },
            },
            {field: 'isRecord',title: '是否记录',width:'20%', sortable:true,searchable:true,
                formatter:function(value, row, index){
                    return value>0?'是':'否';
                },
            },
            {field: 'isEmail',title: '是否发邮件',width:'20%', sortable:true,searchable:true,
                formatter:function(value, row, index){
                    return value>0?'是':'否';
                },
            },
            {field: 'isSMS',title: '是否发短信',width:'20%', sortable:true,searchable:true,
                formatter:function(value, row, index){
                    return value>0?'是':'否';
                },
            },
    
            {field: 'points',title: '范围',width:'20%', sortable:true, searchable:true},
            {field: 'isActive',title: '是否激活',width:'6%', sortable:true, searchable:true, 
                formatter:function(value, row, index){
                        return value>0?'是':'否';
                },
            },
            {field: 'addTime',title: '添加时间',width:'8%', sortable:true, searchable:true},
            {field: 'addUser',title: '添加用户',width:'8%', sortable:true, searchable:true},
        ]
    
    },
    map:{
        columns: [
            {radio:true},
            {field: 'id',title: 'ID', width:'8%', sortable:true, searchable:true},
            {field: 'cname',title: '名称',width:'20%', sortable:true, searchable:true,
                formatter:function(value, row, index){
                    if(value){
                        // var html = '<a href="javascript:void(0);" onclick=" UBIT.openMap('+row.id+');" >'+value+'</a>';
                        var who=String(ME.vm.dbName+'_'+row.id);
                        var html = '<a href="javascript:void(0);" onclick=UBIT.openMapBySuper('+ "'" + who + "'" +');>'+value+'</a>';
                        return '<div>'+html+'</div>';
                    }
                    return value;
                },
            },
            {field: 'sort',title: '排序',width:'10%', sortable:true, searchable:true},
            {field: 'isActive',title: '是否激活',width:'6%', sortable:true, searchable:true, 
                formatter:function(value, row, index){
                        return value>0?'是':'否';
                },
            },
            {field: 'filePath',title: '图片路径',width:'25%', sortable:true, searchable:true,
                formatter:function(value, row, index){
                    if(value){
                        var html = '<a href="'+(ME.imgHost+"maps_"+ value) +'" target="_blank" >'+value+'</a>';
                        return '<div>'+html+'</div>';
                    }
                    return value;
                },
            },
    
            {field: 'pixelWidth',title: '像素宽度(px)',width:'20%', sortable:true, searchable:true},
            {field: 'pixelLength',title: '像素长度(px)',width:'20%', sortable:true, searchable:true},
            {field: 'realWidth',title: '实际宽度(m)',width:'20%', sortable:true, searchable:true,formatter:function(value){return (value/100).toFixed(2)}},
            {field: 'realLength',title: '实际长度(m)',width:'20%', sortable:true, searchable:true,formatter:function(value){return (value/100).toFixed(2)}},
    
            {field: 'cfgMap',title: '地图配置',width:'20%', sortable:true,visible:false, searchable:true},
    
            {field: 'addTime',title: '添加时间',width:'22%', sortable:true, searchable:true},
            {field: 'addUser',title: '添加用户',width:'11%', sortable:true, searchable:true},
        ]
    
    },
    camera:{
        columns:[
            {checkbox:true, pageType:'super'},
            {field: 'id',title: 'ID', width:'2%', sortable:true,searchable:true},
            {field: 'ip',title: 'IP地址',width:'6%', pageType:'project', sortable:true, searchable:true,
                formatter:function(value,row,index){
                    var html = '';
                    if(value){
                        html += '<a href="javascript:void(0);"  onclick="openVideo('+row.id+');">';
                        html += value;
                        html += '</a>';
                        return html;
                    }
                    return html;
                }
            },
            {field: 'port', title: '端口', width:'5%', sortable:true, searchable:true},
            {field: 'interfacePort', title: '接口端口', width:'5%', sortable:true, searchable:true},
            {field: 'username', title: '用户名', width:'5%', sortable:true, searchable:true},
            {field: 'password', title: '密码', width:'5%', sortable:true, searchable:true},
            {field: 'productModel', title: '型号', width:'5%', sortable:true, searchable:true},
            {field: 'seqNum', title: '序列号', width:'5%', sortable:true, searchable:true},

            {field: 'mapId',title: '所属地图',width:'10%', pageType:'project', sortable:true, searchable:true},
            {field: 'x',title: 'X坐标',width:'6%', sortable:true, searchable:true},
            {field: 'y',title: 'Y坐标',width:'6%', sortable:true, searchable:true},

            {field: 'z',title: 'Z坐标',width:'6%', sortable:true, searchable:true},
            {field: 'initAngleX',title: 'X轴初始角',width:'6%', pageType:'super', sortable:true, searchable:true},
            {field: 'rotateMax',title: '最大旋转',width:'6%', pageType:'super', sortable:true, searchable:true},

            {field: 'interfaceAgreement',title: '端口协议',width:'6%', sortable:true, searchable:true},
            {field: 'networkAgreement',title: '网络协议',width:'6%', sortable:true, searchable:true},
            {field: 'manu',title: '生产厂商',width:'6%', sortable:true, searchable:true},
            {field: 'sort',title: '排序',width:'6%', sortable:true, searchable:true},
            {field: 'addTime',title: '添加时间',width:'6%', sortable:true, searchable:true,
                formatter:function(value, row, index){
                    if(value){
                        var date = new Date(value);
                        return date.toLocaleString();
                    }
                    return value;
                }
            },
            {field: 'upTime',title: '最后更新时间',width:'10%', sortable:true, searchable:true,
                formatter:function(value, row, index){
                    if(value){
                        var date = new Date(value);
                        return date.toLocaleString();
                    }
                    return value;
                }
            },
            {field: 'addUser',title: '添加人员',width:'6%', sortable:true, searchable:true}
        ]
   
    },
}