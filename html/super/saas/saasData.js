var menus = [{
    label: '目录',
    id: 'dir',
    children: [{
            label: '背景说明',
            id: 'back_desc'
        },
        {
            label: '前提说明',
            id: 'before_desc'
        },
        {
            label: 'HTTP API使用说明',
            id: 'api_desc',
            children: [{
                    label: '登录管理',
                    id: 'login_man',
                    children: [{
                            label: '登录',
                            id: 'login'
                        },
                        {
                            label: '退出登录',
                            id: 'logout'
                        },
                        {
                            label: '获取当前用户',
                            id: 'current_user'
                        },
                        {
                            label: '查询用户列表',
                            id: 'user_list'
                        },
                        {
                            label: '保存用户(添加／修改)',
                            id: 'user_save'
                        },
                        {
                            label: '删除用户',
                            id: 'user_del'
                        },
                        {
                            label: '重置密码',
                            id: 'reset_pwd'
                        }
                    ]
                },
                {
                    label: '访客管理',
                    id: 'visitor_man',
                    children: [{
                            label: '登记',
                            id: 'visitor_add'
                        },
                        {
                            label: '查询访客列表',
                            id: 'visitor_list'
                        },
                        {
                            label: '修改访客',
                            id: 'visitor_update'
                        },
                        {
                            label: '删除访客',
                            id: 'visitor_del'
                        }
                    ]
                },
                {
                    label: '地图管理',
                    id: 'map_man',
                    children: [{
                            label: '地图列表',
                            id: 'map_list'
                        },
                        {
                            label: '保存地图（添加／修改）',
                            id: 'map_save'
                        },
                        {
                            label: '上传地图图片',
                            id: 'map_up'
                        },
                        {
                            label: '删除地图图片',
                            id: 'map_up_del'
                        },
                        {
                            label: '删除地图',
                            id: 'map_del'
                        },
                        {
                            label: '加载指定地图下面的所有标签,基站,摄像头',
                            id: 'map_load_all'
                        },
                        {
                            label: '获取地图基础信息',
                            id: 'map_detail'
                        },
                        {
                            label: '获取地图图片',
                            id: 'map_pho'
                        },
                        {
                            label: '根据标签获取地图信息（匿名登录）',
                            id: 'map_anony'
                        },

                    ]
                },
                {
                    label: '标签管理',
                    id: 'tag_man',
                    children: [{
                            label: '获取标签列表',
                            id: 'tag_list'
                        },
                        {
                            label: '新增标签',
                            id: 'tag_add'
                        },
                        {
                            label: '修改标签',
                            id: 'tag_update'
                        },
                        {
                            label: '删除标签',
                            id: 'tag_del'
                        },
                        {
                            label: '获取标签(sourceId)',
                            id: 'tag_by_source'
                        },
                        {
                            label: '获取标签当前位置(内存读取)',
                            id: 'tag_pos'
                        },
                    ]
                },
                {
                    label: ' 基站管理',
                    id: 'anchor_man',
                    children: [{
                            label: '获取基站列表',
                            id: 'anchor_list'
                        },
                        {
                            label: '新增基站',
                            id: 'add_anchor_detail'
                        },
                        {
                            label: '修改基站信息',
                            id: 'anchor_detail'
                        },
                        {
                            label: '删除基站',
                            id: 'del_anchor_detail'
                        },
                    ]
                },
                {
                    label: '围栏管理',
                    id: 'fence_man',
                    children: [{
                            label: '获取地图围栏列表',
                            id: 'fence_list_map'
                        },
                        {
                            label: '添加围栏',
                            id: 'fence_add'
                        },
                        {
                            label: '删除围栏',
                            id: 'fence_del'
                        },
                        {
                            label: '修改围栏',
                            id: 'fence_edit'
                        },
                    ]
                },
                {
                    label: '围栏日志',
                    id: 'fence_log_man',
                    children: [{
                            label: '围栏日志查询/围栏停留时间查询',
                            id: 'fence_log_list'
                        },
                        {
                            label: '清除围栏日志',
                            id: 'fence_log_clear'
                        },
                    ]
                },
                {
                    label: '摄像头管理',
                    id: 'camera_man',
                    children: [{
                            label: '查询所有摄像头',
                            id: 'camera_list'
                        },
                        {
                            label: '添加/修改摄像头',
                            id: 'camera_save'
                        },
                        {
                            label: '删除摄像头',
                            id: 'camera_del'
                        },
                    ]
                },
                {
                    label: '历史轨迹',
                    id: 'his_man',
                    children: [{
                            label: '获取历史明细',
                            id: 'his_list'
                        },
                        {
                            label: '获取历史明细(新)',
                            id: 'his_list_new'
                        },
                        {
                            label: '清除所有历史',
                            id: 'his_clear'
                        },
                        {
                            label: '获取历史轨迹',
                            id: 'his_pos'
                        },
                        {
                            label: '获取历史轨迹(新)',
                            id: 'his_pos_new'
                        },
                        {
                            label: '获取gps历史数据',
                            id: 'gps_pos'
                        },
                    ]
                },
                {
                    label: 'SOS管理',
                    id: 'sos_man',
                    children: [{
                            label: '获取SOS消息日志',
                            id: 'sos_list'
                        },
                        {
                            label: '清除SOS消息日志',
                            id: 'sos_clear'
                        },
                    ]
                },
                {
                    label: '通用接口',
                    id: 'pub_man',
                    children: [{
                            label: '根据ID获取对象',
                            id: 'pub_id'
                        },
                        {
                            label: '获取所有数据列表',
                            id: 'pub_all'
                        },
                        {
                            label: '保存',
                            id: 'pub_save'
                        },
                        {
                            label: '删除',
                            id: 'pub_del'
                        },
                        {
                            label: '获取基础信息',
                            id: 'pub_base'
                        },
                    ]
                },
                {
                    label: '定制接口',
                    id: 'customized_man',
                    children: [{
                            label: '下行告警',
                            id: 'customized_downAlert'
                        },
                        {
                            label: '批量下行告警',
                            id: 'customized_batch_downAlert'
                        },
                        {
                            label: '下行透传',
                            id: 'customized_passthrough'
                        },
                        {
                            label: '下发消息',
                            id: 'customized_downMessage'
                        },
                        {
                            label: '标签同步',
                            id: 'customized_syncTags'
                        },
                        {
                            label: '标签在线统计',
                            id: 'customized_getTagOnlineTotal'
                        },
                        {
                            label: '获取基站外部信息',
                            id: 'customized_getAnchorExtInfo'
                        },
                        {
                            label: '设置基站外部信息',
                            id: 'customized_setAnchorExtInfo'
                        },
                        {
                            label: '获取sd卡上传数据',
                            id: 'customized_getSdData'
                        },
                        {
                            label: '开始解析sd卡上传数据并推送',
                            id: 'customized_startParseSdData'
                        },
                    ]
                },
            ]
        },
        {
            label: 'WebSocket API使用说明',
            id: 'socket_man',
            children: [{
                    label: '按地图订阅实时消息',
                    id: 'socket_subByMap'
                },
                {
                    label: '按标签订阅实时消息',
                    id: 'socket_subByTag'
                },
                {
                    label: '获取消息方式',
                    id: 'socket_msgType'
                },
                {
                    label: '标签实时位置消息',
                    id: 'socket_coord'
                },
                {
                    label: '标签SOS消息',
                    id: 'socket_sos'
                },
                {
                    label: '电子围栏报警消息',
                    id: 'socket_fenceAlert'
                },
                {
                    label: '标签电量消息',
                    id: 'socket_power'
                },
                {
                    label: '距离报警消息',
                    id: 'socket_distanceAlert'
                },
                {
                    label: '数据透传消息',
                    id: 'socket_passthrough'
                },
                {
                    label: '订阅GPS实时消息',
                    id: 'socket_GPS'
                },
                {
                    label: '订阅基站GPS实时消息',
                    id: 'socket_anchorGPS'
                },
                {
                    label: '订阅基站标签测距消息',
                    id: 'socket_anchorTagDistance'
                },
            ]
        },
        {
            label: '注意事项',
            id: 'note_man',
            children: [{
                    label: 'api_token',
                    id: 'note_api_token',
                    children: [{
                            label: 'Ajax 方式',
                            id: 'note_ajx'
                        },
                        {
                            label: 'Vue 方式',
                            id: 'note_vue'
                        },
                    ]
                },
                {
                    label: '验证服务器',
                    id: 'note_ver'
                },
                // {label:'技术支持',id:'note_sup'},
            ]
        }
    ]
}];


var apiData = [{
        title: '目录',
        id: 'dir',
        descs: {}
    },
    {
        title: '背景说明',
        id: 'back_desc',
        descs: {
            1: 'SAAS定位API主要用于高精度定位的相关业务，涉及用户，标签，基站，地图等，同时对于室内定位常用功能，如电子围栏，历史轨迹，预警报警等外围业务也提供了稳定的API，便于和其它的系统进行高效无缝集成。',
            2: '支持不同行业的定制API的开发。'
        }
    },
    {
        title: 'HTTP API使用说明',
        id: 'api_desc',
        descs: {}
    },
    {
        title: '前提说明',
        id: 'before_desc',
        specal_descs: {
            1: 'http协议和websocket协议',
            2: 'json格式',
            3: '服务器域名 （http://track.ubitraq.com:8082/)',
            4: '需要提前注册项目管理员账户',
            5: 'api_token由用户登录后生成，除登录之外，所有的业务请求都需要在请求头（request header）中带上api_token',
            6: '本API仅限项目管理员账户调用',
            7: '若doc文档与本系统网页版出现不一致时，请以网页版为准',
            8: '若实际接口调用的返回结果与本系统网页版出现不一致时，请以实际接口调用结果为准',
        }
    },

    {
        title: '登陆管理', //板块标题
        id: 'login_man',
        apis: [{
                id: 'login',
                title: '登陆',
                url: '/user/login',
                type: 'post',
                request: {
                    loginCode: {
                        exp: 'admin',
                        desc: '用户编号',
                        isRequire: '是'
                    },
                    loginPwd: {
                        exp: 'admin123456',
                        desc: '用户密码',
                        isRequire: '是'
                    }
                },
                response_success: {
                    isOk: true,
                    msg: "登录成功",
                    entity: {
                        id: 11,
                        code: "admin",
                        cname: "管理员",
                        projectId: 12,
                        projectCode: "demo",
                        projectName: "演示项目",
                        api_token: "admin_e1887fcc4f98a7a6147d58fbda34cc149716f3e2"
                    }
                },
                response_failed: {
                    isOk: false,
                    msg: "用户“admin”的密码错误"
                },
                desc: {
                    'api_token': '项目用户登录后生成，其余接口必填'
                }
            },
            {
                id: 'logout',
                title: '退出登录',
                url: '/user/logout',
                type: 'get',
                request: {
                    api_token: {
                        exp: 'admin_c236bdb6ecd8bfc1164fb92a99a56dcdb3c6c74f',
                        desc: 'api_token',
                        isRequire: '是'
                    },
                },
                response_success: {
                    isOk: true,
                },
                response_failed: {
                    isOk: false,
                    msg: "token错误"
                },
                desc: {}
            },
            {
                id: 'current_user',
                title: '获取当前用户',
                url: '/user/getCurrentUser',
                type: 'get',
                request: {
                    api_token: {
                        exp: 'admin_c236bdb6ecd8bfc1164fb92a99a56dcdb3c6c74f',
                        desc: '用户登录后由系统自动生成的唯一token',
                        isRequire: '是'
                    }
                },
                response_success: {
                    "id": 21,
                    "code": "admin",
                    "cname": "管理员",
                    "projectId": 12,
                    "projectCode": "demo",
                    "projectName": "演示项目",
                    "isActive": 1,
                    "cellphone": 18800000001,
                    "email": '123456789@gmail.com',
                    "birthDate": '',
                    "address": '',
                    "img": '',
                    "others": '',
                    "upTime": "2017-11-20T10:13:14.000Z",
                    "addTime": "2017-11-20T10:13:11.000Z",
                    "addUser": 11,
                    "api_token": "admin_c236bdb6ecd8bfc1164fb92a99a56dcdb3c6c74f"
                },
                response_failed: {
                    isOk: false,
                    msg: "token错误"
                },
                desc: {}
            },
            {
                id: 'user_list',
                title: '查询用户列表',
                url: '/super/projUser/list',
                type: 'get',
                request: {
                    sort: {
                        exp: 'id',
                        desc: '排序字段',
                        isRequire: ''
                    },
                    order: {
                        exp: 'desc',
                        desc: '排序方式',
                        isRequire: ''
                    },
                    offset: {
                        exp: 0,
                        desc: '起始位置',
                        isRequire: ''
                    },
                    limit: {
                        exp: 10,
                        desc: '记录条数',
                        isRequire: ''
                    },
                },
                response_success: {
                    addTime: "2017-12-21 19:59:26",
                    addUser: 21,
                    address: "sdfasfsd",
                    birthDate: "2017-12,11",
                    cellphone: "12313123",
                    cname: "sdafs",
                    code: "ksdhfk",
                    email: "12313312@qq"
                },
                response_failed: {},
                desc: {}
            },
            {
                id: 'user_save',
                title: '保存用户（添加／修改）',
                url: '/super/projUser/save',
                type: 'post',
                request: {
                    id: {
                        exp: 1,
                        desc: '用户id,存在则为更新，否则添加',
                        isRequire: '是'
                    },
                    code: {
                        exp: 'admin',
                        desc: '账号',
                        isRequire: '是'
                    },
                    cname: {
                        exp: 'admin',
                        desc: '姓名',
                        isRequire: '是'
                    },
                    isActive: {
                        exp: 1,
                        desc: '是否激活(1:激活，0:不激活)',
                        isRequire: '是'
                    },
                    cellphone: {
                        exp: 13688866666,
                        desc: '电话号码',
                        isRequire: ''
                    },
                    email: {
                        exp: '123456789@gmail.com',
                        desc: '邮箱',
                        isRequire: ''
                    },
                    birthDate: {
                        exp: '',
                        desc: '生日',
                        isRequire: ''
                    },
                    address: {
                        exp: '',
                        desc: '住址',
                        isRequire: ''
                    },
                },
                response_success: {
                    isOk: true
                },
                response_failed: {
                    isOk: false,
                    msg: "用户编码必须唯一"
                },
                desc: {
                    id: '用户id,存在则为更新，否则为添加',
                    code: '账号，必填',
                    cname: '姓名，必填',
                    isActive: '是否激活，0为不激活，1为激活',
                }
            },
            {
                id: 'user_del',
                title: '删除用户',
                url: '/super/projUser/delete',
                type: 'post',
                request: {
                    id: {
                        exp: 12,
                        desc: '用户id',
                        isRequire: '是'
                    }
                },
                response_success: {
                    "isOk": true
                },
                response_failed: {
                    isOk: false,
                    msg: 'xxx'
                }
            },
            {
                id: 'reset_pwd',
                title: '重置密码',
                url: '/super/projUser/resetPwd',
                type: 'post',
                request: {
                    id: {
                        exp: 12,
                        desc: '用户id',
                        isRequire: '是'
                    },
                    newPassword: {
                        exp: 123455,
                        desc: '新密码',
                        isRequire: '是'
                    },
                    oldPassword: {
                        exp: 1234556,
                        desc: '旧密码',
                        isRequire: '是'
                    }
                },
                response_success: {
                    isOk: true
                },
                response_failed: {
                    isOk: false,
                    msg: "xxx",
                },
                desc: {}
            },
        ] //板块api列表
    },
    {
        title: '访客管理', //板块标题
        id: 'visitor_man',
        apis: [{
                id: 'visitor_add',
                title: '登记',
                url: '/super/visitor/add',
                type: 'post',
                request: {
                    tagCode: {
                        exp: '00010001',
                        desc: '标签编码',
                        isRequire: '是'
                    },
                    cname: {
                        exp: '李晓明',
                        desc: '来访人',
                        isRequire: '是'
                    },
                    phone: {
                        exp: '13388886666',
                        desc: '电话',
                        isRequire: '否'
                    },
                    identification: {
                        exp: '131181199911110019',
                        desc: '身份证',
                        isRequire: '否'
                    },
                    company: {
                        exp: '华为公司',
                        desc: '公司',
                        isRequire: '否'
                    },
                    responser: {
                        exp: '郭达明',
                        desc: '受访人',
                        isRequire: '否'
                    },
                    memo: {
                        exp: '咨询业务',
                        desc: '备注',
                        isRequire: '否'
                    }
                },
                response_success: {
                    isOk: true,
                    res: {
                        alias: "T0010",
                        code: "00100010",
                        mac: "00100010",
                        projectId: 145,
                        tagId: 2016
                    }
                },
                response_failed: {
                    isOk: false,
                    msg: "查无此标签相关信息！"
                },
                desc: {

                }
            },
            {
                id: 'visitor_list',
                title: '查询访客列表',
                url: '/super/visitor/list',
                type: 'get',
                request: {

                },
                response_success: {
                    "": [{
                        addTime: "2019-08-07T10:52:42.000Z",
                        addUser: "projAdmin",
                        closeTime: null,
                        cname: "李晓明",
                        company: "华为公司",
                        id: 1,
                        identification: "131181198811110019",
                        memo: "咨询业务",
                        phone: "17746535191",
                        regStatus: "binding",
                        responser: "郭达明",
                        tagCode: "00100010",
                        upTime: null,
                        upUser: ""
                    }]
                },
                response_failed: {},
                desc: {}
            },
            {
                id: 'visitor_update',
                title: '修改访客',
                url: '/super/visitor/update',
                type: 'post',
                request: {
                    id: {
                        exp: '1',
                        desc: '访客id',
                        isRequire: '是'
                    },
                    tagCode: {
                        exp: '00010001',
                        desc: '标签编码',
                        isRequire: '是'
                    },
                    cname: {
                        exp: '李晓明',
                        desc: '来访人',
                        isRequire: '是'
                    },
                    phone: {
                        exp: '13388886666',
                        desc: '电话',
                        isRequire: '否'
                    },
                    identification: {
                        exp: '131181199911110019',
                        desc: '身份证',
                        isRequire: '否'
                    },
                    company: {
                        exp: '华为公司',
                        desc: '公司',
                        isRequire: '否'
                    },
                    responser: {
                        exp: '郭达明',
                        desc: '受访人',
                        isRequire: '否'
                    },
                    memo: {
                        exp: '咨询业务',
                        desc: '备注',
                        isRequire: '否'
                    }
                },
                response_success: {
                    isOk: true,
                    id: '1'
                },
                response_failed: {
                    isOk: 0,
                    msg: "参数不完整，请重新填写"
                },
                desc: {

                }
            },
            {
                id: 'visitor_del',
                title: '删除访客',
                url: '/super/visitor/del',
                type: 'post',
                request: {
                    ids: {
                        exp: ['1', '2'],
                        desc: '访客id',
                        isRequire: '是'
                    }
                },
                response_success: {
                    "isOk": true,
                    msg: "删除成功!"
                },
                response_failed: {
                    isOk: false,
                    msg: 'xxx'
                }
            }
        ] //板块api列表
    },
    {
        title: '地图管理',
        id: 'map_man',
        apis: [{
                id: 'map_list',
                title: '地图列表',
                url: '/super/map/list',
                type: 'get',
                request: {},
                response_success: {
                    cname: "test",
                    filePath: "101513332076000.png",
                    id: 1,
                    incline: 0,
                    isActive: 1,
                    origin_x: 0,
                    origin_y: 0,
                    origin_z: 0,
                    pixelLength: 1263,
                    pixelWidth: 388,
                    realLength: 12630,
                    realWidth: 3880,
                    rotation: 0,
                    scale: 100,
                    sort: 1,
                    theme: ''
                },
                response_failed: {},
                desc: {}
            },
            {
                id: 'map_save',
                title: '保存地图（添加／修改）',
                url: '/super/map/save',
                type: 'post',
                request: {
                    id: {
                        exp: 1,
                        desc: '地图id',
                        isRequire: ''
                    },
                    cname: {
                        exp: 'quanji',
                        desc: '地图名称',
                        isRequire: '是'
                    },

                    filePath: {
                        exp: '611513760791000.png',
                        desc: '地图路径',
                        isRequire: '是'
                    },
                    pixelWidth: {
                        exp: 388,
                        desc: '像素宽度',
                        isRequire: '是'
                    },
                    pixelLength: {
                        exp: 1263,
                        desc: '像素长度',
                        isRequire: '是'
                    },
                    realLength: {
                        exp: 1,
                        desc: '实际宽度',
                        isRequire: '是'
                    },
                    realWidth: {
                        exp: 1,
                        desc: '实际宽度',
                        isRequire: '是'
                    },
                    isActive: {
                        exp: 1,
                        desc: '是否激活',
                        isRequire: ''
                    },
                    sort: {
                        exp: 1,
                        desc: '排序',
                        isRequire: ''
                    },
                },
                response_success: {
                    isOk: true,
                    id: 1
                },
                response_failed: {
                    isOk: false,
                    msg: "xxx"
                },
                desc: {
                    id: '地图id,存在则更新，否则为添加',
                }
            },
            {
                id: 'map_up',
                title: '上传地图图片',
                url: '/map/uploadImg',
                type: 'post',
                request: {
                    'Content-Disposition': {
                        exp: 'form-data',
                        desc: '类型',
                        isRequire: '是'
                    },
                    name: {
                        exp: "document_file",
                        desc: '文件名称',
                        isRequire: '是'
                    },
                    filename: {
                        exp: "ubi.png",
                        desc: '文件路径',
                        isRequire: '是'
                    },
                    'Content-Type': {
                        exp: 'image/png',
                        desc: 'mema类型',
                        isRequire: '是'
                    }
                },
                response_success: {
                    isOk: true,
                    fileName: "421513761632000.png",
                    filePath: "C:\\work\\koat\\storages\\maps\\421513761632000.png"
                },
                response_failed: {

                },
                desc: {

                }
            },
            {
                id: 'map_up_del',
                title: '删除地图图片',
                url: '/map/deleteImg',
                type: 'post',
                request: {
                    fileName: {
                        exp: '421513761632000.png',
                        desc: '文件名',
                        isRequire: '是'
                    },
                },
                response_success: {
                    isOk: true,
                    msg: "删除文件“421513761632000.png”成功！"
                },
                response_failed: {
                    isOk: false,
                    msg: 'xxx'
                },
                desc: {

                }
            },
            {
                id: 'map_pho',
                title: '获取地图图片',
                url: '/file/getFile',
                type: 'get',
                request: {
                    fileName: {
                        exp: 'maps_381499943915001.jpg',
                        desc: '文件名称',
                        isRequire: '是'
                    },
                },
                response_success: {},
                response_failed: {},
                desc: {}
            },
            {
                id: 'map_del',
                title: '删除地图',
                url: '/super/map/delete',
                type: 'post',
                request: {
                    id: {
                        exp: 12,
                        desc: '地图id',
                        isRequire: '是'
                    }
                },
                response_success: {
                    isOk: true
                },
                response_failed: {
                    isOk: false,
                    msg: 'xxx'
                },
            },
            {
                id: 'map_load_all',
                title: '加载指定地图下面的所有标签,基站,摄像头',
                url: '/nodes/list',
                type: 'get',
                request: {
                    mapId: {
                        exp: 12,
                        desc: '地图id',
                        isRequire: '是'
                    }
                },
                response_success: {
                    anchors: [{
                        "id": 9,
                        "sourceId": 13,
                        "code": "01000000",
                        "mac": "01000000",
                        "x": 3043,
                        "y": 927,
                        "z": 100,
                        "lon": 10,
                        "lat": 10,
                        "mapId": 1,
                        "isMaster": 0,
                        "status": "online",
                        "alias": "A11",
                        "color": "",
                        "others": null,
                        "sort": 1
                    }],
                    tags: [{
                        "id": 28,
                        "sourceId": 17,
                        "mac": "11000000",
                        "code": "11000000",
                        "status": "online",
                        "alias": "T11",
                        "catId": 4,
                        "typeId": 5,
                        "others": null,
                        "sort": 1,
                        "upTime": null,
                        "addTime": "2017-08-08T03:20:11.000Z",
                        "addUser": 2,
                        "cat": {
                            "id": 4,
                            "cname": "橙组",
                            "color": "orange",
                            "sort": 1,
                            "addTime": "2017-08-05T07:18:58.000Z",
                            "addUser": 2
                        },
                        "type": {
                            "id": 5,
                            "cname": "定位",
                            "memo": "",
                            "icon": "location",
                            "sort": 1,
                            "isActive": 1,
                            "addTime": "2017-08-05T08:20:01.000Z",
                            "addUser": 2
                        },
                        "power": 94,
                        "lastPosTime": 0,
                        "x": 254,
                        "y": 681,
                        "z": 100,
                        "mapId": 1,
                        "mapName": "星云研究院"
                    }],
                    camera: [{
                        addTime: "201719T07:01:05.000Z",
                        addUser: 21,
                        id: 143,
                        initAngleX: 0,
                        interfaceAgreement: "ONVIF",
                        ip: "192.168.20.80",
                        manu: "123",
                        mapId: 32,
                        networkAgreement: "RTSP",
                        points: "2332 640,2500 633,2407 972,2287 883,2332 640",
                        port: 552,
                        rotateMax: 320,
                        sort: 1,
                        upTime: "2017-12-19T07:01:36.000Z",
                        visual_radius: 500,
                        x: 2332,
                        y: 640,
                        z: 100
                    }]
                },
                response_failed: {
                    isOk: false,
                    msg: 'xxx'
                },
                desc: {}
            },
            {
                id: 'map_detail',
                title: '获取地图基础信息',
                url: '/mapBaseDatas/list',
                type: 'get',
                request: {
                    projectCode: {
                        exp: 'demo',
                        desc: '项目编码（支持匿名访问）',
                        isRequire: '是'
                    }
                },
                response_success: {
                    fenceType: [{
                        id: 1,
                        cname: "危险区",
                        sort: 1,
                        isActive: 1,
                        memo: "进入发出危险信号",
                        wlevel: 1,
                        color: "#b31919"
                    }],
                    tagCat: [{
                        id: 1,
                        cname: "蓝组",
                        color: "blue",
                        sort: 1,
                        addTime: "2017-08-05T07:15:04.000Z",
                        addUser: 2
                    }],
                    tagType: [{
                        addTime: "2017-08-05T08:15:40.000Z",
                        addUser: 2,
                        cname: "人",
                        icon: "humen",
                        id: 1,
                        isActive: 1,
                        memo: "",
                        sort: 1
                    }]
                },
                response_failed: {},
                desc: {}
            },
            {
                id: 'map_anony',
                title: '根据标签获取地图信息（匿名登录）',
                url: '/map/loadByTagCode',
                type: 'get',
                request: {
                    tagCode: {
                        exp: '0000001e',
                        desc: '标签编码',
                        isRequire: '是'
                    }
                },
                response_success: {
                    tag: {
                        "id": 31,
                        "code": "1e000000",
                        "mac": "1e000000",
                        "panid": "0301cade",
                        "projectId": 1,
                        "status": "online",
                        "rxDelay": 0,
                        "txDelay": 0,
                        "wakePeriod": 1,
                        "locatingPeriod": 1,
                        "maxPower": 4200,
                        "manu": null,
                        "swVersion": null,
                        "hwVersion": null,
                        "channel": 2,
                        "frameType": "standard",
                        "crc": 1,
                        "dataRate": 850,
                        "pacSize": 64,
                        "pulseFrequency": 16,
                        "preambleLength": 0,
                        "preambleCode": 0,
                        "smartPower": 1,
                        "frameCheck": 1,
                        "upTime": null,
                        "addTime": "2017-08-08T03:20:48.000Z",
                        "addUser": 2,
                        "sourceId": 30,
                        "alias": "T1e",
                        "catId": 1,
                        "typeId": 5,
                        "others": null,
                        "sort": 1,
                        "cat": {
                            "id": 1,
                            "cname": "蓝组",
                            "color": "blue",
                            "sort": 1,
                            "addTime": "2017-08-05T07:15:04.000Z",
                            "addUser": 2
                        },
                        "type": {
                            "id": 5,
                            "cname": "定位",
                            "memo": "",
                            "icon": "location",
                            "sort": 1,
                            "isActive": 1,
                            "addTime": "2017-08-05T08:20:01.000Z",
                            "addUser": 2
                        },
                        "power": 83,
                        "lastPosTime": 0,
                        "x": 561,
                        "y": 520,
                        "z": 100,
                        "mapId": 1,
                        "mapName": "星云研究院"
                    },
                    maps: [{
                        id: 1,
                        "cname": "星云研究院",
                        "isActive": 1,
                        "sort": 1,
                        "theme": null,
                        "filePath": "381499943915001.jpg",
                        "scale": 100,
                        "pixelWidth": null,
                        "pixelLength": 1459,
                        "realWidth": null,
                        "realLength": 3251,
                        "origin_x": 0,
                        "origin_y": 0,
                        "origin_z": 0,
                        "rotation": 0,
                        "incline": 0,
                        "upTime": null,
                        "addUser": 4,
                        "addTime": '2017-07-13T11:05:34.000Z'
                    }],
                    user: {
                        "id": 0,
                        "code": "anony",
                        "cname": "anony",
                        "projectCode": "xystudy",
                        "api_token": "anony_f4403291b5a189609cc9a70804d86631caf0f7ef"
                    }
                },
                response_failed: {
                    isOk: false,
                    msg: "xxx"
                },
                desc: {}
            },
        ]
    },
    {
        title: '标签管理',
        id: 'tag_man',
        apis: [{
                id: 'tag_list',
                title: '获取标签列表',
                url: '/project/tag/list',
                type: 'get',
                request: {
                    sort: {
                        exp: 'id',
                        desc: '排序字段',
                        isRequire: ''
                    },
                    order: {
                        exp: 'desc',
                        desc: '排序方式',
                        isRequire: ''
                    },
                    offset: {
                        exp: 0,
                        desc: '起始位置',
                        isRequire: ''
                    },
                    limit: {
                        exp: 0,
                        desc: '记录长度',
                        isRequire: ''
                    },
                },
                response_success: [{
                    'id': 28,
                    "sourceId": 28,
                    "code": "00000011",
                    "mac": "00000011",
                    "projectId": 1,
                    "status": "online",
                    "pulseFrequency": 16,
                    "rxDelay": 0,
                    "txDelay": 0,
                    "wakePeriod": 1,
                    "locatingPeriod": 1,
                    "maxPower": 4200,
                    "manu": null,
                    "swVersion": null,
                    "hwVersion": null,
                    "channel": 2,
                    "frameType": "standard",
                    "crc": 1,
                    "dataRate": 850,
                    "pacSize": 64,
                    "preambleLength": 0,
                    "preambleCode": 0,
                    "smartPower": 1,
                    "frameCheck": 1,
                    "upTime": null,
                    "addTime": "2017-08-08T03:20:11.000Z",
                    "addUser": 2,
                    "alias": "T11",
                    "catId": 4,
                    "typeId": 5,
                    "others": null,
                    "sort": 1,
                    "cat": {
                        "id": 4,
                        "cname": "橙组",
                        "color": "orange",
                        "sort": 1,
                        "addTime": "2017-08-05T07:18:58.000Z",
                        "addUser": 2
                    },
                    "type": {
                        "id": 5,
                        "cname": "定位",
                        "memo": "",
                        "icon": "location",
                        "sort": 1,
                        "isActive": 1,
                        "addTime": "2017-08-05T08:20:01.000Z",
                        "addUser": 2
                    },
                    "power": 32,
                    "lastPosTime": 0,
                    "x": 567,
                    "y": 415,
                    "z": 100,
                    "mapId": 1,
                    "mapName": "星云研究院"
                }],
                response_failed: {},
                desc: {}
            },
            {
                id: 'tag_add',
                title: '新增标签',
                url: '/project/tag/add',
                type: 'post',
                request: {
                    "code_list[]": {
                        exp: '90009999',
                        desc: '标签编码',
                        isRequire: '是'
                    },
                    productId: {
                        exp: '6',
                        desc: '产品型号',
                        isRequire: '是'
                    },
                    alias: {
                        exp: 'T10',
                        desc: '标签别名',
                        isRequire: ''
                    },
                    catId: {
                        exp: '1',
                        desc: '标签分组',
                        isRequire: ''
                    },
                    typeId: {
                        exp: '1',
                        desc: '标签类型',
                        isRequire: ''
                    },
                    rxDelay: {
                        exp: '0',
                        desc: '延迟（米）rxDelay',
                        isRequire: ''
                    },
                    txDelay: {
                        exp: '0',
                        desc: '延迟（米）txDelay',
                        isRequire: ''
                    },
                    maxPower: {
                        exp: '4200',
                        desc: '最大电量',
                        isRequire: ''
                    },
                    manu: {
                        exp: '',
                        desc: '厂商',
                        isRequire: ''
                    },
                    locatingPeriod: {
                        exp: '1000',
                        desc: '刷新率(ms)',
                        isRequire: ''
                    },
                    txPower: {
                        exp: '130d0727',
                        desc: '发射功率',
                        isRequire: ''
                    },
                    wakePeriod: {
                        exp: '30',
                        desc: '唤醒周期(s)',
                        isRequire: ''
                    },
                    locationMode: {
                        exp: '8',
                        desc: '定位模式',
                        isRequire: ''
                    },
                    switchDistance: {
                        exp: '30',
                        desc: '切站距离(m)',
                        isRequire: ''
                    },
                    sleepWait: {
                        exp: '15',
                        desc: '进入休眠等待（s）',
                        isRequire: ''
                    },
                    isHoldPosition: {
                        exp: '0',
                        desc: '开启休眠 0代表是，1代表否',
                        isRequire: ''
                    },
                    tagSlotSeqNum: {
                        exp: '',
                        desc: '时槽编号',
                        isRequire: ''
                    },
                    isHoldBle: {
                        exp: '0',
                        desc: '开启蓝牙 1代表是，0代表否',
                        isRequire: ''
                    },
                    isHoldUart: {
                        exp: '0',
                        desc: '开启串口 1代表是，0代表否',
                        isRequire: ''
                    },
                    distanceDiffBias: {
                        exp: '0',
                        desc: '距离差偏(mm)',
                        isRequire: ''
                    },
                    alterMinDistance: {
                        exp: '0',
                        desc: '距离报警(mm) 小值',
                        isRequire: ''
                    },
                    alterMaxDistance: {
                        exp: '0',
                        desc: '距离报警(mm) 大值',
                        isRequire: ''
                    },
                    motionSensorMode: {
                        exp: '2',
                        desc: '运动传感器模式',
                        isRequire: ''
                    },
                    minHeart: {
                        exp: '0',
                        desc: '最小心率',
                        isRequire: ''
                    },
                    maxHeart: {
                        exp: '0',
                        desc: '最大心率',
                        isRequire: ''
                    },
                    channel: {
                        exp: '2',
                        desc: '频道',
                        isRequire: ''
                    },
                    frameType: {
                        exp: 'standard',
                        desc: '帧类型',
                        isRequire: ''
                    },
                    crc: {
                        exp: '1',
                        desc: 'crc',
                        isRequire: ''
                    },
                    dataRate: {
                        exp: '6800',
                        desc: '速率',
                        isRequire: ''
                    },
                    pacSize: {
                        exp: '64',
                        desc: '包大小',
                        isRequire: ''
                    },
                    pulseFrequency: {
                        exp: '64',
                        desc: 'pulseFrequency',
                        isRequire: ''
                    },
                    preambleLength: {
                        exp: '64',
                        desc: '序文长度',
                        isRequire: ''
                    },
                    preambleCode: {
                        exp: '9',
                        desc: '序文编码',
                        isRequire: ''
                    },
                    smartPower: {
                        exp: '0',
                        desc: 'smartPower',
                        isRequire: ''
                    },
                    frameCheck: {
                        exp: '0',
                        desc: 'frameCheck',
                        isRequire: ''
                    },
                },
                response_success: {
                    isOk: true,
                    newitems: [{
                        "id": 3000,
                        "code": "90009999"
                    }]
                },
                response_failed: {
                    isOk: false,
                    msg: "xxx"
                },
                desc: {
                    id: '标签id,存在则更新，否则为添加',
                }
            },
            {
                id: 'tag_update',
                title: '修改标签',
                url: '/project/tag/save',
                type: 'post',
                request: {
                    code: {
                        exp: '90009999',
                        desc: '标签编码',
                        isRequire: '是'
                    },
                    sourceId: {
                        exp: '3000',
                        desc: 'sourceId',
                        isRequire: '是'
                    },
                    id: {
                        exp: '3000',
                        desc: 'id 必须和sourceId相同',
                        isRequire: '是'
                    },
                    alias: {
                        exp: 'T10',
                        desc: '标签别名',
                        isRequire: ''
                    },
                    catId: {
                        exp: '1',
                        desc: '标签分组',
                        isRequire: ''
                    },
                    typeId: {
                        exp: '1',
                        desc: '标签类型',
                        isRequire: ''
                    },
                    productId: {
                        exp: '6',
                        desc: '产品型号',
                        isRequire: ''
                    },
                    rxDelay: {
                        exp: '0',
                        desc: '延迟（米）rxDelay',
                        isRequire: ''
                    },
                    txDelay: {
                        exp: '0',
                        desc: '延迟（米）txDelay',
                        isRequire: ''
                    },
                    maxPower: {
                        exp: '4200',
                        desc: '最大电量',
                        isRequire: ''
                    },
                    manu: {
                        exp: '',
                        desc: '厂商',
                        isRequire: ''
                    },
                    locatingPeriod: {
                        exp: '1000',
                        desc: '刷新率(ms)',
                        isRequire: ''
                    },
                    txPower: {
                        exp: '130d0727',
                        desc: '发射功率',
                        isRequire: ''
                    },
                    wakePeriod: {
                        exp: '0',
                        desc: '唤醒周期(s)',
                        isRequire: ''
                    },
                    locationMode: {
                        exp: '8',
                        desc: '定位模式',
                        isRequire: ''
                    },
                    switchDistance: {
                        exp: '0',
                        desc: '切站距离(m',
                        isRequire: ''
                    },
                    sleepWait: {
                        exp: '15',
                        desc: '进入休眠等待（s）',
                        isRequire: ''
                    },
                    isHoldPosition: {
                        exp: '0',
                        desc: '开启休眠 0代表是，1代表否',
                        isRequire: ''
                    },
                    tagSlotSeqNum: {
                        exp: '',
                        desc: '时槽编号',
                        isRequire: ''
                    },
                    isHoldBle: {
                        exp: '1',
                        desc: '开启蓝牙 1代表是，0代表否',
                        isRequire: ''
                    },
                    isHoldUart: {
                        exp: '1',
                        desc: '开启串口 1代表是，0代表否',
                        isRequire: ''
                    },
                    distanceDiffBias: {
                        exp: '0',
                        desc: '距离差偏(mm)',
                        isRequire: ''
                    },
                    alterMinDistance: {
                        exp: '0',
                        desc: '距离报警(mm) 小值',
                        isRequire: ''
                    },
                    alterMaxDistance: {
                        exp: '0',
                        desc: '距离报警(mm) 大值',
                        isRequire: ''
                    },
                    motionSensorMode: {
                        exp: '2',
                        desc: '运动传感器模式',
                        isRequire: ''
                    },
                    minHeart: {
                        exp: '60',
                        desc: '最小心率',
                        isRequire: ''
                    },
                    maxHeart: {
                        exp: '100',
                        desc: '最大心率',
                        isRequire: ''
                    },
                },
                response_success: {
                    isOk: true,
                },
                response_failed: {
                    isOk: false,
                    msg: "xxx"
                },
                desc: {
                    id: '标签id必须和sourceId相同',
                }
            },
            {
                id: 'tag_del',
                title: '删除标签',
                url: '/project/tag/del',
                type: 'post',
                request: {
                    'codes[]': {
                        exp: '90009999',
                        desc: '标签编码',
                        isRequire: '是'
                    },
                },
                response_success: {
                    isOk: true
                },
                response_failed: {
                    isOk: false,
                    msg: "xxx"
                },
                desc: {

                }
            },
            {
                id: 'tag_by_source',
                title: '获取标签',
                url: '/project/tag/get',
                type: 'get',
                request: {
                    'code': {
                        exp: '00000120',
                        desc: '标签编码，code与sourceId两个参数任选其一',
                        isRequire: '是'
                    },
                    'sourceId': {
                        exp: 107,
                        desc: '标签资源id，code与sourceId两个参数任选其一',
                        isRequire: ''
                    },
                },
                response_success: {
                    sourceId: 107,
                    code: '00000120',
                    mac: '00000120',
                    id: 107,
                    alias: 'T001',
                    catId: 1,
                    typeId: 5,
                    sort: 1,
                    upTime: "2018-01-04T05:41:53.000Z",
                    addTime: '2017-12-26T06:51:58.000Z',
                    addUser: 21,
                    map: 'xystudy_19',
                    mapId: 19,
                    x: 839,
                    y: 1038,
                    z: 0,
                    power: 16,
                    lastPosTime: '2018-1-23 12:53:53'
                },
                response_failed: {
                    isOk: false,
                    msg: "xxx"
                },
                desc: {

                }
            },
            {
                id: 'tag_pos',
                title: '获取标签当前位置(内存读取)',
                url: '/super/tag/getPosByRedis',
                type: 'post',
                request: {
                    tagCodes: {
                        exp: '0000008a,0000008b,0000008c',
                        desc: '标签编码集',
                        isRequire: '是'
                    },
                },
                response_success: [{
                        "id": "180",
                        "code": "0000008b",
                        "mac": "8b000000",
                        "map": "xystudy_57",
                        "mapId": "57",
                        "x": "1787.4772364144897",
                        "y": "571.1436698674212",
                        "z": "0",
                        "power": "100",
                        "lastPosTime": "2018-3-17 18:24:09",
                        "time": "1521282249033"
                    },
                    {
                        "id": "181",
                        "code": "0000008c",
                        "mac": "8c000000"
                    },
                    {
                        "id": "179",
                        "code": "0000008a",
                        "mac": "8a000000",
                        "map": "xystudy_57",
                        "mapId": "57",
                        "x": "1814.6137150349837",
                        "y": "440.76399759826074",
                        "z": "0",
                        "power": "20",
                        "lastPosTime": "2018-3-17 18:24:09",
                        "time": "1521282249007"
                    }
                ],
                response_failed: {
                    isOk: false,
                    msg: 'xxx'
                },
                desc: {
                    tagCodes: '标签mac 集合，可以是数组，也可以是用英文逗号隔开的字符串,必填！',
                    '说明': '注意：此接口用于第三方服务器主动获取标签当前位置，并且调用周期大于5分钟的才能使用，需要实时获取标签当前位置，请使用websocket进行订阅',
                }
            },
        ]
    },

    {
        title: '基站管理',
        id: 'anchor_man',
        apis: [{
                id: 'anchor_list',
                title: '获取基站列表',
                url: '/project/anchor/list',
                type: 'get',
                request: {
                    sort: {
                        exp: 'id',
                        desc: '排序字段,默认按id排序',
                        isRequire: ''
                    },
                    order: {
                        exp: 'desc',
                        desc: '排序方式，默认desc排序',
                        isRequire: ''
                    },
                    mapId: {
                        exp: '',
                        desc: '所属地图, int类型如1，2，3',
                        isRequire: ''
                    },
                    isMaster: {
                        exp: '',
                        desc: '是否主基站 1表示取主基站，其它值不做限制',
                        isRequire: ''
                    },
                },
                response_success: [{
                    sourceId: 18,
                    "code": "06000000",
                    "mac": "06000000",
                    "projectId": 1,
                    "mapId": 1,
                    "isMaster": 1,
                    "x": 3043,
                    "y": 2520,
                    "z": 100,
                    "lon": 0,
                    "lat": 0,
                    "status": "offline",
                    "netType": "wifi",
                    "rxDelay": 86.696,
                    "txDelay": 68.584,
                    "synFreq": 150,
                    "swVersion": null,
                    "hwVersion": null,
                    "channel": 2,
                    "frameType": "standard",
                    "crc": 1,
                    "dataRate": 6800,
                    "pacSize": 64,
                    "preambleLength": 64,
                    "preambleCode": 1,
                    "smartPower": 1,
                    "upTime": "2017-09-21T06:42:53.000Z",
                    "addTime": "2017-09-19T03:41:37.000Z",
                    "addUser": 11,
                    "id": 16,
                    "alias": "A6",
                    "color": "",
                    "others": null,
                    "sort": 0
                }],
                response_failed: {},
                desc: {}
            },
            {
                id: 'add_anchor_detail',
                title: '新增基站',
                url: '/super/anchor/add',
                type: 'post',
                request: {
                    "mac_list[]": {
                        exp: '9000a3e9',
                        desc: 'mac，必须为8位16进制的数，字母要小写。',
                        isRequire: '是'
                    },
                    productId: {
                        exp: 1,
                        desc: '产品型号',
                        isRequire: '是'
                    },
                    mapId: {
                        exp: 1,
                        desc: '地图id',
                        isRequire: '是'
                    },
                    algorithm: {
                        exp: 'TDOA_2D_V10',
                        desc: '算法，默认TDOA_2D_V10',
                        isRequire: ''
                    },
                    isMaster: {
                        exp: 1,
                        desc: '是否主基站，只能取0和1，0代表否，1代表是。默认1',
                        isRequire: ''
                    },
                    min_num: {
                        exp: 3,
                        desc: '最小基站数量。默认3',
                        isRequire: ''
                    },
                    isRangeWithTag: {
                        exp: 0,
                        desc: '是否支持标签测距，只能取0和1，0代表否，1代表是。默认0',
                        isRequire: ''
                    },
                    isShowWifi: {
                        exp: 1,
                        desc: '是否显示Wifi，只能取0和1，0代表否，1代表是。默认1',
                        isRequire: ''
                    },
                    anchorSlotWidth: {
                        exp: 580,
                        desc: '时槽宽度，取值范围：0 - 65535，需与anchorSlotTotalNum和anchorSlotSeqNum同时存在',
                        isRequire: ''
                    },
                    anchorSlotTotalNum: {
                        exp: 667,
                        desc: '时槽宽度，取值范围：0 - 65535，需与anchorSlotWidth和anchorSlotSeqNum同时存在',
                        isRequire: ''
                    },
                    anchorSlotSeqNum: {
                        exp: 670,
                        desc: '时槽宽度，取值范围：0 - 65535，需与anchorSlotWidth和anchorSlotTotalNum同时存在',
                        isRequire: ''
                    },
                    isTagMode: {
                        exp: 1,
                        desc: '标签模式，只能取0和1，0代表否，1代表是。默认0',
                        isRequire: ''
                    },
                    masterList: {
                        exp: '01000000,02000000,03000000',
                        desc: '所属主基站列表',
                        isRequire: ''
                    },
                    color: {
                        exp: '#0000ff',
                        desc: '颜色',
                        isRequire: ''
                    },
                    x: {
                        exp: '0',
                        desc: '基站x坐标位置（米），默认0',
                        isRequire: ''
                    },
                    y: {
                        exp: '0',
                        desc: '基站y坐标位置（米），默认0',
                        isRequire: ''
                    },
                    z: {
                        exp: '0',
                        desc: '基站z坐标位置（米），默认0',
                        isRequire: ''
                    },
                    lon: {
                        exp: '0',
                        desc: '经纬度，默认0',
                        isRequire: ''
                    },
                    lat: {
                        exp: '0',
                        desc: '经纬度，默认0',
                        isRequire: ''
                    },
                    status: {
                        exp: 'offline',
                        desc: '状态，包含（online,offline,disable）默认online',
                        isRequire: ''
                    },
                    netType: {
                        exp: 'wire',
                        desc: '联网方式，（wifi，wire，4G）默认wire',
                        isRequire: ''
                    },
                    // anchor_signal:{
                    //     exp:-70,
                    //     desc:'信号强度(db),默认-70',
                    //     isRequire:''
                    // },
                    txPower: {
                        exp: '130d0727',
                        desc: '发射功率 （130d0727,c0c0c0c0,1f1f1f1f,07274767,0d072747）默认130d0727',
                        isRequire: ''
                    },
                    synFreq: {
                        exp: 150,
                        desc: '同步周期(ms),默认150',
                        isRequire: ''
                    },
                    synModel: {
                        exp: 'Smart',
                        desc: '同步模式 （Smart，Normal）默认Smart',
                        isRequire: ''
                    },
                    // serverIP:{
                    //     exp:'',
                    //     desc:'服务器IP',
                    //     isRequire:''
                    // },
                    rxDelay: {
                        exp: 86.696,
                        desc: '天线rx延迟，默认86.696',
                        isRequire: ''
                    },
                    txDelay: {
                        exp: 68.584,
                        desc: '天线tx延迟，默认68.584',
                        isRequire: ''
                    },
                    // swVersion:{
                    //     exp:'',
                    //     desc:'软件版本号',
                    //     isRequire:''
                    // },
                    // hwVersion:{
                    //     exp:'',
                    //     desc:'硬件版本号',
                    //     isRequire:''
                    // },
                    // kerVersion:{
                    //     exp:'',
                    //     desc:'内核版本号',
                    //     isRequire:''
                    // },
                    channel: {
                        exp: 2,
                        desc: '频道，默认2 int类型',
                        isRequire: ''
                    },
                    frameType: {
                        exp: 'standard',
                        desc: '帧类型，(standard, extend)，默认standard',
                        isRequire: ''
                    },
                    crc: {
                        exp: 1,
                        desc: 'crc,默认1 int类型',
                        isRequire: ''
                    },
                    uwbNetMode: {
                        exp: 1,
                        desc: '基站模式 （1，2）1代表网关，2代表节点。默认1 ',
                        isRequire: ''
                    },
                    uwbNetNodeList: {
                        exp: 1,
                        desc: '节点列表，基站模式设置为1（网关）时该参数才有意义',
                        isRequire: ''
                    },
                    uwbNetSort: {
                        exp: 1,
                        desc: '节点顺序，基站模式设置为2（节点）时该参数才有意义，默认1',
                        isRequire: ''
                    },
                    uwbNetDelay: {
                        exp: 0,
                        desc: '延时等待(ms)，基站模式设置为2（节点）时该参数才有意义，默认0',
                        isRequire: ''
                    },
                    dataRate: {
                        exp: 6800,
                        desc: '数据速率（Kbps）(110,850,6800),默认6800',
                        isRequire: ''
                    },
                    pacSize: {
                        exp: 8,
                        desc: '包大小(8,16,32,64)默认8',
                        isRequire: ''
                    },
                    pulseFrequency: {
                        exp: 64,
                        desc: '脉冲频率(MHZ) （16，64）默认64',
                        isRequire: ''
                    },
                    preambleLength: {
                        exp: 128,
                        desc: '序文长度',
                        isRequire: ''
                    },
                    preambleCode: {
                        exp: 9,
                        desc: '序文编码',
                        isRequire: ''
                    },
                    smartPower: {
                        exp: 0,
                        desc: 'smartPower（0，1）',
                        isRequire: ''
                    },
                    frameCheck: {
                        exp: 0,
                        desc: 'frameCheck （0，1）',
                        isRequire: ''
                    }
                },
                response_success: {
                    isOk: true,
                    newitems: [{
                        "id": 927,
                        "sourceId": 927,
                        "alias": "Aa3e9",
                        "code": "9000a3e9"
                    }]
                },
                response_failed: {
                    isOk: false,
                    msg: "xxx"
                },
                desc: {
                    isMaster: '是否主基站，1：是，0：否',
                    masterList: "所属主基站列表,非主基站时，逗号分隔。主基站时，值为空"
                }
            },
            {
                id: 'anchor_detail',
                title: '修改基站信息',
                url: '/project/anchor/update',
                type: 'post',
                request: {
                    id: {
                        exp: 1,
                        desc: '基站id',
                        isRequire: '是'
                    },
                    sourceId: {
                        exp: '1',
                        desc: '基站资源id',
                        isRequire: '是'
                    },
                    code: {
                        exp: '9000a3e9',
                        desc: '基站编码',
                        isRequire: '是'
                    },
                    mapId: {
                        exp: 1,
                        desc: '地图id',
                        isRequire: ''
                    },
                    productId: {
                        exp: 1,
                        desc: '产品型号',
                        isRequire: ''
                    },
                    alias: {
                        exp: 'A1001',
                        desc: '基站别名',
                        isRequire: ''
                    },
                    isMaster: {
                        exp: 0,
                        desc: '是否主基站',
                        isRequire: ''
                    },
                    masterList: {
                        exp: '01000000,02000000,03000000',
                        desc: '主基站列表',
                        isRequire: ''
                    },
                    // sort:{
                    //     exp:'1',
                    //     desc:'排序',
                    //     isRequire:''
                    // },
                    // mac:{
                    //     exp:'06000000',
                    //     desc:'基站mac',
                    //     isRequire:''
                    //     },
                    algorithm: {
                        exp: 'TDOA_2D_V10',
                        desc: '算法，默认TDOA_2D_V10',
                        isRequire: ''
                    },
                    min_num: {
                        exp: 3,
                        desc: '最小基站数量。默认3',
                        isRequire: ''
                    },
                    isRangeWithTag: {
                        exp: 0,
                        desc: '是否支持标签测距，只能取0和1，0代表否，1代表是。默认0',
                        isRequire: ''
                    },
                    isShowWifi: {
                        exp: 1,
                        desc: '是否显示Wifi，只能取0和1，0代表否，1代表是。默认1',
                        isRequire: ''
                    },
                    anchorSlotWidth: {
                        exp: 580,
                        desc: '时槽宽度，取值范围：0 - 65535，需与anchorSlotTotalNum和anchorSlotSeqNum同时存在',
                        isRequire: ''
                    },
                    anchorSlotTotalNum: {
                        exp: 667,
                        desc: '时槽宽度，取值范围：0 - 65535，需与anchorSlotWidth和anchorSlotSeqNum同时存在',
                        isRequire: ''
                    },
                    anchorSlotSeqNum: {
                        exp: 670,
                        desc: '时槽宽度，取值范围：0 - 65535，需与anchorSlotWidth和anchorSlotTotalNum同时存在',
                        isRequire: ''
                    },
                    isTagMode: {
                        exp: 1,
                        desc: '标签模式，只能取0和1，0代表否，1代表是。默认0',
                        isRequire: ''
                    },
                    color: {
                        exp: '#0000ff',
                        desc: '颜色',
                        isRequire: ''
                    },
                    x: {
                        exp: '0',
                        desc: '基站x坐标位置（米）',
                        isRequire: ''
                    },
                    y: {
                        exp: '0',
                        desc: '基站y坐标位置（米）',
                        isRequire: ''
                    },
                    z: {
                        exp: '0',
                        desc: '基站z坐标位置（米）',
                        isRequire: ''
                    },
                    lon: {
                        exp: '0',
                        desc: '经纬度',
                        isRequire: ''
                    },
                    lat: {
                        exp: '0',
                        desc: '经纬度',
                        isRequire: ''
                    },
                    status: {
                        exp: 'offline',
                        desc: '状态',
                        isRequire: ''
                    },
                    netType: {
                        exp: 'wire',
                        desc: '网络类型',
                        isRequire: ''
                    },
                    txPower: {
                        exp: '130d0727',
                        desc: '发射功率 （130d0727,c0c0c0c0,1f1f1f1f,07274767,0d072747）默认130d0727',
                        isRequire: ''
                    },
                    synFreq: {
                        exp: 150,
                        desc: '同步周期(ms),默认150',
                        isRequire: ''
                    },
                    synModel: {
                        exp: 'Smart',
                        desc: '同步模式 （Smart，Normal）默认Smart',
                        isRequire: ''
                    },
                    rxDelay: {
                        exp: '',
                        desc: '',
                        isRequire: ''
                    },
                    txDelay: {
                        exp: '',
                        desc: '',
                        isRequire: ''
                    },
                    // swVersion:{
                    //     exp:'',
                    //     desc:'',
                    //     isRequire:''
                    // },
                    // hwVersion:{
                    //     exp:'',
                    //     desc:'',
                    //     isRequire:''
                    // },
                    // kerVersion:{
                    //     exp:'',
                    //     desc:'',
                    //     isRequire:''
                    // },
                    channel: {
                        exp: '',
                        desc: '',
                        isRequire: ''
                    },
                    frameType: {
                        exp: '',
                        desc: '',
                        isRequire: ''
                    },
                    crc: {
                        exp: '',
                        desc: '',
                        isRequire: ''
                    },
                    uwbNetMode: {
                        exp: 1,
                        desc: '基站模式 （1，2）1代表网关，2代表节点。默认1 ',
                        isRequire: ''
                    },
                    uwbNetNodeList: {
                        exp: 1,
                        desc: '节点列表，基站模式设置为1（网关）时该参数才有意义',
                        isRequire: ''
                    },
                    uwbNetSort: {
                        exp: 1,
                        desc: '节点顺序，基站模式设置为2（节点）时该参数才有意义，默认1',
                        isRequire: ''
                    },
                    uwbNetDelay: {
                        exp: 0,
                        desc: '延时等待(ms)，基站模式设置为2（节点）时该参数才有意义，默认0',
                        isRequire: ''
                    },
                    dataRate: {
                        exp: '',
                        desc: '',
                        isRequire: ''
                    },
                    pacSize: {
                        exp: '',
                        desc: '',
                        isRequire: ''
                    },
                    pulseFrequency: {
                        exp: '',
                        desc: '',
                        isRequire: ''
                    },
                    preambleLength: {
                        exp: '',
                        desc: '',
                        isRequire: ''
                    },
                    preambleCode: {
                        exp: '',
                        desc: '',
                        isRequire: ''
                    },
                    smartPower: {
                        exp: '',
                        desc: '',
                        isRequire: ''
                    },
                    frameCheck: {
                        exp: '',
                        desc: '',
                        isRequire: ''
                    }
                },
                response_success: {
                    isOk: true,
                },
                response_failed: {
                    isOk: false,
                    msg: "xxx"
                },
                desc: {
                    isMaster: '是否主基站，1：是，0：否',
                    masterList: "所属主基站列表,非主基站时，逗号分隔。主基站时，值为空"
                }
            },
            {
                id: 'del_anchor_detail',
                title: '删除基站',
                url: '/project/anchor/del',
                type: 'post',
                request: {
                    "codes[]": {
                        exp: '9000a3e9',
                        desc: 'code，基站编码',
                        isRequire: '是'
                    }
                },
                response_success: {
                    isOk: true,
                },
                response_failed: {
                    isOk: false,
                    msg: "xxx"
                },
                desc: {

                }
            },
        ]
    },
    {
        title: '围栏管理',
        id: 'fence_man',
        apis: [{
                id: 'fence_list_map',
                title: '获取地图围栏列表',
                url: '/fence/list',
                type: 'get',
                request: {
                    mapId: {
                        exp: 1,
                        desc: '地图id',
                        isRequire: '是'
                    },
                },
                response_success: [{
                    "id": 90,
                    "cname": "围栏",
                    "mapId": 32,
                    "ftypeId": 2,
                    "points": "3071 553,3507 563,2994 875,3071 553",
                    "trif": "io",
                    "isRecord": 1,
                    "isEmail": 0,
                    "isSMS": 0,
                    "isActive": 1,
                    "upTime": null,
                    "addTime": "2017-12-21T08:43:42.000Z",
                    "addUser": 21,
                    "type": {
                        "id": 2,
                        "cname": "警告区",
                        "sort": 1,
                        "isActive": 1,
                        "memo": "进入发出警告信号",
                        "wlevel": 2,
                        "color": "#b3198a",
                        "opacity": 0.3,
                        "audio": "warning.mp3",
                        "addTime": null,
                        "addUser": 0
                    },
                    "ftype": "警告区",
                    "color": "#b3198a",
                    "opacity": 0.3
                }],
                response_failed: {
                    isOk: false,
                    msg: "xxx"
                },
                desc: {
                    isMaster: '是否主基站，1：是，0：否',
                    masterList: "所属主基站列表,非主基站时，逗号分隔。主基站时，值为空"
                }
            },
            {
                id: 'fence_add',
                title: '添加围栏',
                url: '/fence/add',
                type: 'post',
                request: {
                    cname: {
                        exp: 'test',
                        desc: '围栏名称',
                        isRequire: '是'
                    },
                    points: {
                        exp: '100 100,200 200,300 300',
                        desc: '围栏闭合区域顶点坐标',
                        isRequire: '是'
                    },
                    mapId: {
                        exp: 1,
                        desc: '地图id',
                        isRequire: '是'
                    },
                    ftypeId: {
                        exp: 1,
                        desc: '围栏类型id',
                        isRequire: '是'
                    },
                    trif: {
                        exp: 'io',
                        desc: '围栏触发方式',
                        isRequire: '是'
                    },
                    tagCat:{
                        exp:'1,3',
                        desc:'标签组',
                        isRequire:''
                    },
                    validity:{
                        exp:'09:11:11_11:11:11,11:15:15_14:15:15',
                        desc:'有效期',
                        isRequire:''
                    },
                    isRecord: {
                        exp: 0,
                        desc: '是否记录',
                        isRequire: ''
                    },
                    isEmail: {
                        exp: 0,
                        desc: '是否发送邮件',
                        isRequire: ''
                    },
                    isSMS: {
                        exp: 0,
                        desc: '是否发送短信',
                        isRequire: ''
                    },
                    color: {
                        exp: '#0000ff',
                        desc: '颜色',
                        isRequire: ''
                    },
                },
                response_success: {
                    isOk: 'true',
                    id: 87
                },
                response_failed: {
                    isOk: 'false',
                    msg: 'xxx'
                },
                desc: {
                    points: '围栏闭合区域各顶点坐标，至少三点',
                    ftype: '围栏类型，1：危险区，2：警告区，3：通知区，4：考勤区',
                    trif: '触发方式，i：进入触发，o：离开触发，io：进出触发',
                    tagCat:'标签组id，多组时用逗号隔开，1：蓝组，3：绿组',
                    validity:'有多组时段时用逗号隔开，时间段格式要正确'
                }
            },
            {
                id: 'fence_del',
                title: '删除围栏',
                url: '/fence/delete',
                type: 'post',
                request: {
                    id: {
                        exp: 1,
                        desc: '围栏id',
                        isRequire: '是'
                    },

                },
                response_success: {
                    isOk: 'true',
                },
                response_failed: {
                    isOk: 'false',
                    msg: 'xxx'
                },
                desc: {}
            },
            {
                id: 'fence_edit',
                title: '修改围栏',
                url: '/fence/save',
                type: 'post',
                request: {
                    id: {
                        exp: 1,
                        desc: '围栏id',
                        isRequire: '是'
                    },
                    cname: {
                        exp: 'test1',
                        desc: '围栏名称',
                        isRequire: '是'
                    },
                    mapId: {
                        exp: 1,
                        desc: '地图id',
                        isRequire: '是'
                    },
                    ftypeId: {
                        exp: 1,
                        desc: '围栏类型id',
                        isRequire: '是'
                    },
                    trif: {
                        exp: 'io',
                        desc: '围栏触发方式',
                        isRequire: '是'
                    },
                    tagCat:{
                        exp:'1,3',
                        desc:'标签组',
                        isRequire:''
                    },
                    validity:{
                        exp:'09:11:11_11:11:11,11:15:15_14:15:15',
                        desc:'有效期',
                        isRequire:''
                    },
                    isActive: {
                        exp: 1,
                        desc: '是否激活',
                        isRequire: ''
                    },
                    isRecord: {
                        exp: 0,
                        desc: '是否记录',
                        isRequire: ''
                    },
                    isEmail: {
                        exp: 0,
                        desc: '是否发送邮件',
                        isRequire: ''
                    },
                    isSMS: {
                        exp: 0,
                        desc: '是否发送短信',
                        isRequire: ''
                    },
                    color: {
                        exp: '#0000ff',
                        desc: '颜色',
                        isRequire: ''
                    },
                },
                response_success: {
                    isOk: 'true',
                    id: 87
                },
                response_failed: {
                    isOk: 'false',
                    msg: 'xxx'
                },
                desc: {
                    id: '围栏id,存在则修改，否则添加',
                    points: '围栏闭合区域各顶点坐标，至少三点',
                    ftype: '围栏类型，1：危险区，2：警告区，3：通知区，4：考勤区',
                    trif: '触发方式，i：进入触发，o：离开触发，io：进出触发',
                    tagCat:'标签组id，多组时用逗号隔开，1：蓝组，3：绿组',
                    validity:'有多组时段时用逗号隔开，时间段格式要正确'
                }
            },

        ]
    },

    {
        title: '围栏日志',
        id: 'fence_log_man',
        apis: [{
                id: 'fence_log_list',
                title: '围栏日志查询/围栏停留时间查询',
                url: '/super/fenceLog/list',
                type: 'get',
                request: {
                    timeType: {
                        exp: 'in',
                        desc: '查询方式',
                        isRequire: '是'
                    },
                    timeStart: {
                        exp: '2019-06-10 01:53:31',
                        desc: '起始时间',
                        isRequire: '是'
                    },
                    timeEnd: {
                        exp: '2019-06-11 14:53:31',
                        desc: '结束时间',
                        isRequire: '是'
                    },
                    duration: {
                        exp: 'gt:3',
                        desc: '围栏停留时间条件(单位：ms)',
                        isRequire: ''
                    },
                    fence: {
                        exp: 1,
                        desc: '围栏id(如果参数中带有fence则将忽略mapId参数)',
                        isRequire: ''
                    },
                    mapId: {
                        exp: 1,
                        desc: '地图id',
                        isRequire: ''
                    },
                    tag: {
                        exp: 50,
                        desc: '标签id',
                        isRequire: ''
                    },
                },
                response_success: [{
                    fenceId: 212323,
                    id: 1,
                    inTime: "2019-06-10T09:27:17.000Z",
                    outTime: "2019-06-11T09:27:23.000Z",
                    stopTime: 172806000,
                    tagSourceId: 23423
                }],
                response_failed: {},
                desc: {
                    timeType: '查询时间类型，可选值：   in:进入时间，out:离开时间',
                    duration: '查询停留时间时必须。格式为：  运算符：时间 。可选值：  gt(大于),gte(大于等于),lt(小于),lte(小于等于),eq(等于)',
                }
            },
            {
                id: 'fence_log_clear',
                title: '清除围栏日志',
                url: '/super/fenceLog/clearTable',
                type: 'get',
                request: {},
                response_success: {
                    isOk: 'true',
                    msg: '清除数据共n条'
                },
                response_failed: {
                    isOk: false,
                    msg: "xxx"
                },
                desc: {}
            },
        ]
    },
    {
        title: '摄像头管理',
        id: 'camera_man',
        apis: [{
                id: 'camera_list',
                title: '查询所有摄像头',
                url: '/camera/listAll',
                type: 'get',
                request: {},
                response_success: [{
                    points: '1244 192,1780 12,1012 21,1244 192',
                    id: 71,
                    mapId: 19,
                    x: 112,
                    y: 123,
                    z: 122,
                    ip: '199.11.12.33',
                    port: 5000,
                    interfaceAgreement: 'onvif',
                    networkAgreement: 'RTSP',
                    initAngleX: 12,
                    rotateMax: 20,
                    manu: 123,
                    visual_radius: 123,
                    sort: 1,
                    upTime: null,
                    addTime: '2017-12-13T12:17:36.000Z',
                    addUser: 21,
                    interfacePort: 5000,
                    username: null,
                    password: null,
                    productModel: null,
                    seqNum: null
                }],
                response_failed: {},
                desc: {}
            },
            {
                id: 'camera_save',
                title: '添加/修改摄像头',
                url: '/camera/save',
                type: 'post',
                request: {
                    id: {
                        exp: 1,
                        desc: '摄像头id',
                        isRequire: ''
                    },
                    ip: {
                        exp: '192.12.12.12',
                        desc: '摄像头ip',
                        isRequire: '是'
                    },
                    port: {
                        exp: 554,
                        desc: '端口',
                        isRequire: '是'
                    },
                    mapId: {
                        exp: 20,
                        desc: '所属地图',
                        isRequire: '是'
                    },
                    x: {
                        exp: 0,
                        desc: 'x坐标',
                        isRequire: ''
                    },
                    y: {
                        exp: 0,
                        desc: 'x坐标',
                        isRequire: ''
                    },
                    z: {
                        exp: 0,
                        desc: 'x坐标',
                        isRequire: ''
                    },
                    initAngleX: {
                        exp: 0,
                        desc: '初始角度',
                        isRequire: ''
                    },
                    rotateMax: {
                        exp: 320,
                        desc: '摄像头最大角度',
                        isRequire: ''
                    },
                    InterfaceAgreement: {
                        exp: 'ONVIF',
                        desc: '接口协议',
                        isRequire: ''
                    },
                    interfacePort: {
                        exp: 0,
                        desc: '协议端口',
                        isRequire: ''
                    },
                    networkAgreement: {
                        exp: 'RTSP',
                        desc: '网络协议',
                        isRequire: ''
                    },
                    manu: {
                        exp: '海康',
                        desc: '生产厂商',
                        isRequire: ''
                    },
                    points: {
                        exp: '100 100,200 200,300 300 100 100',
                        desc: '覆盖闭合区域顶点坐标',
                        isRequire: '是'
                    },
                    username: {
                        exp: 'admin',
                        desc: '用户名',
                        isRequire: ''
                    },
                    password: {
                        exp: 'adminPwd',
                        desc: '密码',
                        isRequire: ''
                    },
                    productModel: {
                        exp: 'QXE—3D',
                        desc: '产品型号',
                        isRequire: ''
                    },
                    seqNum: {
                        exp: '954-234-234',
                        desc: '序列号',
                        isRequire: ''
                    },
                },
                response_success: {
                    isOk: true,
                    entity: {
                        points: "1082 271,1242 256,1108 375,955 358,1082 271",
                        "id": 147,
                        "mapId": 20,
                        "x": 1082,
                        "y": 271,
                        "z": 100,
                        "ip": "192.12.12.12",
                        "port": 123,
                        "interfaceAgreement": "ONVIF",
                        "networkAgreement": "RTSP",
                        "initAngleX": 0,
                        "rotateMax": 320,
                        "manu": "dsdf",
                        "visual_radius": 500,
                        "sort": 1,
                        "upTime": "2017-12-20T06:08:27.000Z",
                        "addTime": "2017-12-20T01:46:39.000Z",
                        "addUser": 21
                    }
                },
                response_failed: {
                    isOk: false,
                    msg: "xxx"
                },
                desc: {
                    id: 'id编号，存在则更新，否则添加',
                    ip: 'ip地址，唯一',
                    InterfaceAgreement: '接口协议类型，可选值：ONVIF',
                }
            },
            {
                id: 'camera_del',
                title: '删除摄像头',
                url: '/camera/delete',
                type: 'post',
                request: {
                    'ids[]': {
                        exp: 1,
                        desc: '摄像头id数组',
                        isRequire: '是'
                    },
                },
                response_success: {
                    isOk: 'true',
                    msg: '删除成功'
                },
                response_failed: {
                    isOk: 'false',
                    msg: 'xxx'
                },
                desc: {}
            },

        ]
    },
    {
        title: '历史轨迹',
        id: 'his_man',
        apis: [{
                id: 'his_list',
                title: '获取历史明细',
                url: '/super/history/list',
                type: 'get',
                request: {
                    timeStart: {
                        exp: '2019-06-09 19:27:58',
                        desc: '起始时间',
                        isRequire: '是'
                    },
                    timeEnd: {
                        exp: '2019-06-11 19:27:58',
                        desc: '结束时间',
                        isRequire: '是'
                    },
                    mapId: {
                        exp: 1,
                        desc: '地图id',
                        isRequire: ''
                    },
                    tagCode: {
                        exp: '00001f07',
                        desc: '标签编码（如果存在标签编码将忽略标签id）',
                        isRequire: ''
                    },
                    tagId: {
                        exp: 50,
                        desc: '标签id',
                        isRequire: ''
                    },
                },
                response_success: [{
                    id: 476,
                    "tagSourceId": 16,
                    "mac": "10000000",
                    "mapId": 20,
                    "x": 596,
                    "y": 1282,
                    "z": 0,
                    "power": 58,
                    "createTime": "2017-09-27T02:37:16.000Z",
                    "addTime": "2017-09-27T02:37:18.000Z"
                }, {
                    "id": 477,
                    "tagSourceId": 16,
                    "mac": "10000000",
                    "mapId": 20,
                    "x": 571,
                    "y": 1282,
                    "z": 0,
                    "power": 68,
                    "createTime": "2017-09-27T02:37:16.000Z",
                    "addTime": "2017-09-27T02:37:18.000Z"
                }],
                response_failed: {},
                desc: {}
            },
            {
                id: 'his_list_new',
                title: '获取历史明细(新)',
                url: '/super/history/list',
                type: 'get',
                request: {
                    timeStart: {
                        exp: '2019-06-09 19:27:58',
                        desc: '起始时间',
                        isRequire: '是'
                    },
                    timeEnd: {
                        exp: '2019-06-11 19:27:58',
                        desc: '结束时间',
                        isRequire: '是'
                    },
                    mapId: {
                        exp: 1,
                        desc: '地图id',
                        isRequire: ''
                    },
                    tagCode: {
                        exp: '00001f07',
                        desc: '标签编码（如果存在标签编码将忽略标签id）',
                        isRequire: ''
                    },
                    tagId: {
                        exp: 50,
                        desc: '标签id',
                        isRequire: ''
                    },
                    limit: {
                        exp: 50,
                        desc: '限制每次返回条数',
                        isRequire: '是'
                    },
                    offset: {
                        exp: 0,
                        desc: '跳过多少条开始搜索，默认为0，如50，则跳过前50条从第51条返回',
                        isRequire: ''
                    },
                    sort: {
                        exp: 'time',
                        desc: '按什么排序，只支持time，默认time',
                        isRequire: ''
                    },
                    order: {
                        exp: 'asc',
                        desc: '只有desc降序或者asc升序两种 默认asc',
                        isRequire: ''
                    },
                },
                response_success: {
                    "total": 23358,
                    "rows": [{
                            "time": "2019-05-25T05:04:40.975Z",
                            "customs": "undefined",
                            "mapId": "1",
                            "rate": 0.77,
                            "tag": "000009ce",
                            "tagSourceId": 1976,
                            "x": 249,
                            "y": 298,
                            "z": 0
                        },
                        {
                            "time": "2019-05-25T05:04:39.993Z",
                            "customs": "undefined",
                            "mapId": "1",
                            "rate": 0.05,
                            "tag": "000009ce",
                            "tagSourceId": 1976,
                            "x": 529,
                            "y": 578,
                            "z": 0
                        }
                    ]
                },
                response_failed: {},
                desc: {
                    total: '为符合条件的总数',
                    rows: '为返回条数的数组'
                }
            },
            {
                id: 'his_clear',
                title: '清除所有历史',
                url: '/super/history/clearTable',
                type: 'get',
                request: {
                    timeStart: {
                        exp: '2019-06-09 19:27:58',
                        desc: '起始时间',
                        isRequire: '是'
                    },
                    timeEnd: {
                        exp: '2019-06-11 19:27:58',
                        desc: '结束时间',
                        isRequire: '是'
                    },
                    mapId: {
                        exp: 1,
                        desc: '地图id',
                        isRequire: ''
                    },
                },
                response_success: {
                    isOk: true,
                    msg: '清除数据共1条'
                },
                response_failed: {
                    isOk: false,
                    msg: "xxx"
                },
                desc: {}
            },
            {
                id: 'his_pos',
                title: '获取历史轨迹',
                url: '/history/list',
                type: 'get',
                request: {
                    'mapId': {
                        exp: 1,
                        desc: '地图id',
                        isRequire: '是'
                    },
                    'tagCodes': {
                        exp: '00000001,00000002',
                        desc: '标签code集',
                        isRequire: '是'
                    },
                    start: {
                        exp: '2017-12-19 14:19:48',
                        desc: '起始时间',
                        isRequire: '是'
                    },
                    end: {
                        exp: '2017-12-19 14:19:48',
                        desc: '结束时间',
                        isRequire: '是'
                    },
                },
                response_success: {
                    16: {
                        "paths": [{
                            "tagSourceId": 16,
                            "mac": "10000000",
                            "x": 571,
                            "y": 1282,
                            "z": 0,
                            "createTime": "2017-09-27T02:33:17.000Z"
                        }, {
                            "tagSourceId": 16,
                            "mac": "10000000",
                            "x": 596,
                            "y": 1282,
                            "z": 0,
                            "createTime": "2017-09-27T02:33:17.000Z"
                        }],
                        "tag": {
                            "sourceId": 16,
                            "code": "10000000",
                            "mac": "10000000",
                            "status": "online",
                            "id": 32,
                            "alias": "T10",
                            "catId": 1,
                            "typeId": 5,
                            "others": null,
                            "sort": 1,
                            "upTime": "2017-09-27T01:14:58.000Z",
                            "addTime": "2017-08-08T03:21:12.000Z",
                            "addUser": 2,
                            "cat": {
                                "id": 1,
                                "cname": "蓝组",
                                "color": "blue",
                                "sort": 1,
                                "addTime": "2017-08-05T07:15:04.000Z",
                                "addUser": 2
                            },
                            "type": {
                                "id": 5,
                                "cname": "定位",
                                "memo": "",
                                "icon": "location",
                                "sort": 1,
                                "isActive": 1,
                                "addTime": "2017-08-05T08:20:01.000Z",
                                "addUser": 2
                            }
                        }
                    }
                },
                response_failed: {},
                desc: {
                    tagCodes: '标签编码集，支持逗号相隔字符串，或者数组'
                }
            },
            {
                id: 'his_pos_new',
                title: '获取历史轨迹(新)',
                url: '/history/list',
                type: 'get',
                request: {
                    'mapId': {
                        exp: 1,
                        desc: '地图id',
                        isRequire: '是'
                    },
                    'tagCodes': {
                        exp: '00000001,00000002',
                        desc: '标签code集',
                        isRequire: '是'
                    },
                    start: {
                        exp: '2017-12-19 14:19:48',
                        desc: '起始时间',
                        isRequire: '是'
                    },
                    end: {
                        exp: '2017-12-19 14:19:48',
                        desc: '结束时间',
                        isRequire: '是'
                    },
                    limit: {
                        exp: 50,
                        desc: '限制每次返回条数',
                        isRequire: '是'
                    },
                    offset: {
                        exp: 0,
                        desc: '跳过多少条开始搜索，默认为0，如50，则跳过前50条从第51条返回',
                        isRequire: ''
                    },
                    sort: {
                        exp: 'time',
                        desc: '按什么排序，只支持time，默认time',
                        isRequire: ''
                    },
                    order: {
                        exp: 'asc',
                        desc: '只有desc降序或者asc升序两种 默认asc',
                        isRequire: ''
                    },
                },
                response_success: {
                    "datas": {
                        "00000001": {
                            "paths": [{
                                    "time": "2019-04-26T23:15:53.608Z",
                                    "customs": "undefined",
                                    "mapId": "1",
                                    "rate": 0.32,
                                    "tag": "00000001",
                                    "tagSourceId": 1,
                                    "x": 127,
                                    "y": 381,
                                    "z": 0
                                },
                                {
                                    "time": "2019-04-26T23:15:52.599Z",
                                    "customs": "undefined",
                                    "mapId": "1",
                                    "rate": 0.37,
                                    "tag": "00000001",
                                    "tagSourceId": 1,
                                    "x": 227,
                                    "y": 281,
                                    "z": 0
                                }
                            ]
                        }
                    },
                    "minTime": "2019-04-26T23:15:53.608Z",
                    "maxTime": "2019-04-26T23:15:52.599Z",
                    "total": 1315
                },
                response_failed: {},
                desc: {
                    total: '响应参数，为符合条件的总数',
                    paths: '响应参数 datas下的 paths 为返回条数的数组'
                }
            },
            {
                id: 'gps_pos',
                title: '获取gps历史数据',
                url: '/history/gpslist',
                type: 'get',
                request: {
                    codes: {
                        exp: '00003bab',
                        desc: '标签code',
                        isRequire: '是'
                    },
                    start: {
                        exp: '2017-12-19 14:19:48',
                        desc: '起始时间',
                        isRequire: '是'
                    },
                    end: {
                        exp: '2017-12-19 14:19:48',
                        desc: '结束时间',
                        isRequire: '是'
                    }
                },
                response_success: {
                    "isOk": true,
                    "datas": {
                        "00003bab": {
                            "paths": [{
                                "time": "2019-12-03T11:33:38.334Z",
                                "battery": 4165,
                                "latitude": 39.9737049,
                                "longitude": 116.4919083,
                                "projectId": "204",
                                "tag": "00003bab",
                                "timestamp": 1575372817647
                            }],
                            "tag": {
                                "sourceId": 2924,
                                "code": "00003bab",
                                "mac": "00003bab",
                                "status": "online",
                                "id": 2924,
                                "alias": "T3bab",
                                "catId": 1,
                                "typeId": 5,
                                "mid": 0,
                                "minHeart": 0,
                                "maxHeart": 0,
                                "others": null,
                                "sort": 1,
                                "upTime": null,
                                "addTime": "2019-11-12T06:30:35.000Z",
                                "addUser": "liyang",
                                "aggregateType": "",
                                "upUser": "",
                                "cat": {
                                    "id": 1,
                                    "cname": "蓝组",
                                    "color": "blue",
                                    "sort": 1,
                                    "addTime": "2019-10-28T07:06:21.000Z",
                                    "upTime": "2019-10-28T07:06:21.000Z",
                                    "addUser": "0",
                                    "upUser": "0"
                                },
                                "type": {
                                    "id": 5,
                                    "cname": "定位",
                                    "memo": "",
                                    "icon": "location_blue.png",
                                    "sort": 1,
                                    "isActive": 1,
                                    "tagDisappear": 600000,
                                    "addTime": "2019-10-28T07:06:21.000Z",
                                    "upTime": "2019-10-28T07:06:21.000Z",
                                    "addUser": "0",
                                    "upUser": "0"
                                }
                            }
                        }
                    },
                    "minTime": "2019-12-03T11:33:38.334Z",
                    "maxTime": "2019-12-03T11:33:38.334Z"
                },
                response_failed: {},
                desc: {
                    paths: '响应参数 datas下的 paths 为返回条数的数组'
                }
            },
        ]
    },
    {
        title: 'SOS管理',
        id: 'sos_man',
        apis: [{
                id: 'sos_list',
                title: '获取SOS消息日志',
                url: '/super/sos/list',
                type: 'get',
                request: {
                    timeStart: {
                        exp: '2019-01-19 14:19:48',
                        desc: '起始时间',
                        isRequire: '是'
                    },
                    timeEnd: {
                        exp: '2019-12-19 14:19:48',
                        desc: '结束时间',
                        isRequire: '是'
                    },
                    mapId: {
                        exp: 1,
                        desc: '地图id',
                        isRequire: ''
                    },
                    tagCode: {
                        exp: '00001f07',
                        desc: '标签编码（如果存在标签编码将忽略标签id）',
                        isRequire: ''
                    },
                    tagId: {
                        exp: 50,
                        desc: '标签id',
                        isRequire: ''
                    },
                },
                response_success: {
                    addTime: "2017-12-23T05:53:55.000Z",
                    anchor: "2601090",
                    id: 1,
                    mapId: 25,
                    sosType: 1,
                    tag: "21010000",
                    tagAlias: "test",
                    tagSourceId: 57,
                },
                response_failed: {},
                desc: {}
            },
            {
                id: 'sos_clear',
                title: '清除SOS消息日志',
                url: '/super/sos/clearTable',
                type: 'get',
                request: {
                    timeStart: {
                        exp: '2019-01-19 14:19:48',
                        desc: '起始时间',
                        isRequire: '是'
                    },
                    timeEnd: {
                        exp: '2019-12-19 14:19:48',
                        desc: '结束时间',
                        isRequire: '是'
                    },
                    mapId: {
                        exp: 1,
                        desc: '地图id',
                        isRequire: ''
                    },
                },
                response_success: {
                    isOk: true,
                    msg: '清除数据共1条'
                },
                response_failed: {
                    isOk: false,
                    msg: "xxx"
                },
                desc: {}
            },
        ]
    },


    {
        title: '通用接口',
        id: 'pub_man',
        apis: [{
                id: 'pub_id',
                title: '根据ID获取对象',
                url: '/model/get',
                type: 'get',
                request: {
                    model: {
                        exp: 'fence_type',
                        desc: "模块类型['fence_type','tag_category','tag_type','tag','map','fence','anchor']",
                        isRequire: '是'
                    },
                    id: {
                        exp: 10,
                        desc: 'id',
                        isRequire: ''
                    },
                },
                response_success: {},
                response_failed: {},
                desc: {
                    'tag_category': '标签分组',
                    'tag_type': '标签类型',
                    'fence_type': '围栏类型',
                    'fence': '围栏',
                    'map': '地图',
                    'tag': '标签',
                    'anchor': '基站',
                }
            },
            {
                id: 'pub_all',
                title: '获取所有数据列表',
                url: '/model/list',
                type: 'get',
                request: {
                    model: {
                        exp: 'fence_type',
                        desc: "模块类型['fence_type','tag_category','tag_type','tag','map','fence','anchor']",
                        isRequire: '是'
                    },
                    sort: {
                        exp: 'id',
                        desc: '排序字段',
                        isRequire: ''
                    },
                    order: {
                        exp: 'desc',
                        desc: '排序方式',
                        isRequire: ''
                    },
                },
                response_success: {},
                response_failed: {},
                desc: {}
            },
            {
                id: 'pub_save',
                title: '保存',
                url: '/model/save',
                type: 'post',
                request: {
                    model: {
                        exp: 'fence_type',
                        desc: "模块类型['fence_type','tag_category','tag_type']",
                        isRequire: '是'
                    },
                    id: {
                        exp: 'id',
                        desc: 'id',
                        isRequire: ''
                    },
                },
                response_success: {},
                response_failed: {},
                desc: {
                    id: 'id，存在则更新，否则添加',
                }
            },
            {
                id: 'pub_del',
                title: '删除',
                url: '/model/delete',
                type: 'post',
                request: {
                    model: {
                        exp: 'fence_type',
                        desc: "模块类型['fence_type','tag_category','tag_type','fence']",
                        isRequire: '是'
                    },
                    id: {
                        exp: 1,
                        desc: 'id',
                        isRequire: '是'
                    },
                },
                response_success: {},
                response_failed: {},
                desc: {}
            },
            {
                id: 'pub_base',
                title: '获取基础信息',
                url: '/model/listBase',
                type: 'get',
                request: {
                    model: {
                        exp: 'fence_type',
                        desc: "模块类型['fence_type','tag_category','tag_type','tag','map','fence','anchor']",
                        isRequire: '是'
                    },
                },
                response_success: {},
                response_failed: {},
                desc: {}
            },
        ]
    },

    {
        title: '定制接口',
        id: 'customized_man',
        apis: [{
                id: 'customized_downAlert',
                title: '下行告警',
                url: '/tag/downAlert',
                type: 'post',
                request: {
                    mac: {
                        exp: '000012ab',
                        desc: "标签编码",
                        isRequire: '是'
                    },
                },
                response_success: {
                    "isOk": true,
                    "msg": "命令下发成功！"
                },
                response_failed: {
                    isOk: false,
                    msg: "xxx"
                },
                desc: {

                }
            },
            {
                id: 'customized_batch_downAlert',
                title: '批量下行告警',
                url: '/super/tag/downAlert',
                type: 'post',
                request: {
                    "codes": {
                        exp: "['000012ab','000012a9','00003a19']",
                        desc: "标签编码数组",
                        isRequire: '是'
                    },
                    anchor: {
                        exp: '900000ab',
                        desc: "基站编码",
                        isRequire: ''
                    },
                    alertType: {
                        exp: 3,
                        desc: "报警类型【见类型附表】",
                        isRequire: ''
                    },
                    alertTime: {
                        exp: 3000,
                        desc: "报警持续时间(ms)",
                        isRequire: ''
                    },
                },
                response_success: {
                    "successful": "[{isOk: true, msg: \"配置成功\", tag: \"000012ab\", type: \"8b\"},{isOk: true, msg: \"配置成功\", tag: \"000012a9\", type: \"8b\"}]",
                    "failed": "[{isOk: false, tag: \"00003a19\", msg: \" 命令已下发标签未返回...\"}]"
                },
                response_failed: {},
                desc: {
                    "alertType=1": "蜂鸣器报警(部分硬件不支持)",
                    "alertType=2": "LED闪烁一次报警",
                    "alertType=3": "蜂鸣器和LED同时报警(响一次和闪烁一次)",
                    "alertType=4": "LED持续闪烁开启",
                    "alertType=5": "LED持续闪烁关闭",
                    "alertType=6": "蜂鸣器持续报警开启",
                    "alertType=7": "蜂鸣器持续报警关闭",
                    "alertType=8": "震动持续报警开启",
                    "alertType=9": "震动持续报警关闭",
                }
            },
            {
                id: 'customized_passthrough',
                title: '下行透传',
                url: '/super/tag/passthrough',
                type: 'post',
                request: {
                    tag: {
                        exp: '000012ab',
                        desc: "标签编码",
                        isRequire: '是'
                    },
                    data: {
                        exp: '1224323abcd',
                        desc: "透传数据字符串(长度限制64个字节)",
                        isRequire: '是'
                    },
                },
                response_success: {
                    "isOk": true,
                    "msg": "命令下发成功！"
                },
                response_failed: {
                    isOk: false,
                    msg: "xxx"
                },
                desc: {}
            },
            {
                id: 'customized_downMessage',
                title: '下发消息',
                url: '/super/tag/sendMessage',
                type: 'post',
                request: {
                    codes: {
                        exp:   ['000012ab','000012a9','00003a19'],
                        desc: "标签编码",
                        isRequire: '是'
                    },
                    message: {
                        exp: '下发消息了。',
                        desc: "数据字符串(长度限制70个字节)",
                        isRequire: '是'
                    },
                },
                response_success: {
                    "successful": "[{isOk: true, msg: \"配置成功\", tag: \"000012ab\", type: \"8b\"},{isOk: true, msg: \"配置成功\", tag: \"000012a9\", type: \"8b\"}]",
                    "failed": "[{isOk: false, tag: \"00003a19\", msg: \" has no rangAnchor or posAnchor!\"}]"
                },
                response_failed: {},
                desc: {}
            },
            {
                id: 'customized_syncTags',
                title: '标签同步',
                url: '/super/tag/syncTags',
                type: 'post',
                request: {
                    codes: {
                        exp: ['000012ab','000012a9','00003a19'],
                        desc: "标签编码",
                        isRequire: '是'
                    },
                },
                response_success: {
                    "successful": "[{isOk: true, params: \"{...}\", tag: \"000012ab\", type: \"8b\"},{isOk: true, params: \"{...}\", tag: \"000012a9\", type: \"8b\"}]",
                    "failed": "[{isOk: false, tag: \"00003a19\", msg: \" 命令已下发标签未返回...\"}]"
                },
                response_failed: {},
                desc: {}
            },
            {
                id: 'customized_getTagOnlineTotal',
                title: '标签在线统计',
                url: '/statistics/getTagOnlineTotal',
                type: 'get',
                request: {},
                response_success: {},
                response_failed: {
                    isOk: false,
                    msg: "xxx"
                },
                desc: {}
            },
            {
                id: 'customized_getAnchorExtInfo',
                title: '获取基站外部信息',
                url: '/super/anchor/anchorExtInfo',
                type: 'get',
                request: {
                    mac: {
                        exp: '9000001e',
                        desc: '基站编码',
                        isRequire: '是'
                    },
                    key: {
                        exp: '31',
                        desc: '\'31\'为获取电源状态，\'32\'为获取通信状态， \'33\'为获取IP地址',
                        isRequire: '是'
                    },
                },
                response_success: {
                    "isOk": true,
                    "data": {
                        msg: 'xxx'
                    }
                },
                response_failed: {
                    isOk: false,
                    msg: "xxx"
                },
                desc: {}
            },
            {
                id: 'customized_setAnchorExtInfo',
                title: '设置基站外部信息',
                url: '/super/anchor/anchorExtInfo',
                type: 'post',
                request: {
                    mac: {
                        exp: '9000001e',
                        desc: '基站编码',
                        isRequire: '是'
                    },
                    info: {
                        exp: '310103',
                        desc: '\'310103\' 为控制电源断开交流供电， \'310104\' 为控制电源恢复交流供电',
                        isRequire: '是'
                    },
                },
                response_success: {
                    "isOk": true,
                    "data": {
                        "isOk": true,
                        "keywords": "setSuccessful",
                        "msg": "设置成功",
                        "code": "90000016"
                    }
                },
                response_failed: {
                    isOk: false,
                    msg: "xxx"
                },
                desc: {}
            },
            {
                id: 'customized_getSdData',
                title: '设置基站外部信息',
                url: '/super/sd/list',
                type: 'post',
                request: {
                    sort: {
                        exp: 'desc/asc',
                        desc: '按时间排序',
                        isRequire: '是'
                    },
                    offset: {
                        exp: '10',
                        desc: '数据偏移量',
                        isRequire: '是'
                    },
                    limit: {
                        exp: '10',
                        desc: '返回数据量',
                        isRequire: '是'
                    },
                    type: {
                        exp: 'distance',
                        desc: '数据类型',
                        isRequire: '否'
                    },
                    anchor: {
                        exp: '90000014',
                        desc: '基站编号',
                        isRequire: '否'
                    },
                    map: {
                        exp: 'test_1',
                        desc: '项目地图',
                        isRequire: '否'
                    },
                    start: {
                        exp: '2020-01-18T11:08:06.000Z',
                        desc: '起始时间',
                        isRequire: '否'
                    },
                    end: {
                        exp: '2020-01-19T12:08:06.000Z',
                        desc: '结束时间',
                        isRequire: '否'
                    },

                },
                response_success: {
                    "isOk": true,
                    "msg": "success",
                    "data": [{
                            "time": "2020-01-19T11:08:06.000Z",
                            "anchor": "90000014",
                            "data": {
                                "type": "distance",
                                "tagType": "tag",
                                "seq": "6d000000",
                                "seqTime": "6d004794",
                                "anchor": "90000014",
                                "poll_tx": 113773056,
                                "poll_rx": 735678319076,
                                "answer_tx": 735707746816,
                                "answer_rx": 136146083,
                                "final_tx": 258146304,
                                "final_rx": 501734831082,
                                "tag": "00002e30",
                                "bufType": 116
                            },
                            "distance": "104964.0600723885",
                            "map": "test_1",
                            "type": "distance"
                        },
                        {
                            "time": "2020-01-19T11:08:06.000Z",
                            "anchor": "900005ce",
                            "data": {
                                "type": "distance",
                                "tagType": "tag",
                                "seq": "5a000000",
                                "seqTime": "5a005827",
                                "anchor": "900005ce",
                                "poll_tx": 89279488,
                                "poll_rx": 16812877376,
                                "answer_tx": 16836673536,
                                "answer_rx": 113145660,
                                "final_tx": 134057984,
                                "final_rx": 16857654981,
                                "tag": "00003a19",
                                "bufType": 116
                            },
                            "distance": "7.997480672136438",
                            "map": "test_1",
                            "type": "distance"
                        }
                    ]
                },
                response_failed: {
                    isOk: false,
                    msg: "xxx"
                },
                desc: {}
            },
            {
                id: 'customized_startParseSdData',
                title: '开始解析sd卡上传数据并推送',
                url: '/super/sd/startParseSdData',
                type: 'get',
                request: {
                    // callbackUrl:'http://track.ubitraq.com:8082/resiver/sdData'
                    callbackUrl:{
                        exp: 'http://track.ubitraq.com:8082/resiver/sdData',
                        desc: '回调地址',
                        isRequire: '是'
                    }
                },
                response_success: {
                    "isOk": true,
                    "msg": "success",
                    data:{
                        total:1000,
                        fail:10
                    }
                },
                response_failed: {
                    isOk: false,
                    msg: "xxx",
                },
                desc: {}
            },
        ]
    },

    {
        title: 'WebSocket API使用说明',
        id: 'socket_man',
        apis: [{
                id: 'socket_subByMap',
                title: '按地图订阅实时消息',
                url: "ws://track.ubitraq.com:8083/websocket/{projectCode}_{mapIds}_2D{api_token}_{types}",
                type: 'websocket',
                request: {
                    projectCode: {
                        exp: 'xystudy',
                        desc: '项目编码',
                        isRequire: '是'
                    },
                    mapIds: {
                        exp: '1',
                        desc: '地图id,如果多个地图用逗号隔开“1,2,3”，如果为“0”表示订阅整个项目的消息',
                        isRequire: '是'
                    },
                    api_token: {
                        exp: 'chengtao_d6a764c3fd19d3a8933f9723a2cd775f5f527bcd',
                        desc: '身份认证',
                        isRequire: '是'
                    },
                    types: {
                        exp: 'type|coord|sos',
                        desc: '消息类型type|[ sos,  power, fenceAlert,  coord,  ...]，不填写表示订阅所有类型的消息',
                        isRequire: ''
                    },
                },
                desc: {
                    '某个地图的所有消息': 'ws://track.ubitraq.com:8083/websocket/xystudy_1_2Dchengtao_d6a764c3fd19d3a8933f9723a2cd775f5f527bcd',
                    '所有地图的部分消息(地图id为0，type参数以|分隔)': 'ws://track.ubitraq.com:8083/websocket/xystudy_0_2Dchengtao_d6a764c3fd19d3a8933f9723a2cd775f5f527bcd_type|sos|power|coord',
                    '所有地图的所有消息（无types参数）': 'ws://track.ubitraq.com:8083/websocket/xystudy_0_2Dchengtao_d6a764c3fd19d3a8933f9723a2cd775f5f527bcd',
                    '消息类型msgType': 'type|开头，以|分隔，选项值：coord(定位信息),sos(sos消息),power(电量信息),powerAlert(低电量报警),fenceAlert(围栏报警)，passthrough(自定义透传)，distanceAlert(距离报警)，lifeStatus（心率）, forceRemove(强拆报警)',
                }
            },
            {
                id: 'socket_subByTag',
                title: '按标签订阅实时消息',
                url: "ws://track.ubitraq.com:8083/websocket/tag_{tagCodes}_2D{api_token}_{types}",
                type: 'websocket',
                request: {
                    tagCodes: {
                        exp: '00001f07',
                        desc: '标签编码,如果多个标签用逗号隔开“00001f07,00001f08,00001f09”',
                        isRequire: '是'
                    },
                    api_token: {
                        exp: 'chengtao_d6a764c3fd19d3a8933f9723a2cd775f5f527bcd',
                        desc: '身份认证',
                        isRequire: '是'
                    },
                    types: {
                        exp: 'type|coord|sos',
                        desc: '消息类型type|[ sos,  power,  powerAlert,  fenceAlert,  coord,  ...]，不填写表示订阅所有类型的消息',
                        isRequire: ''
                    },
                },
                desc: {
                    '订阅某个标签的所有消息': 'ws://track.ubitraq.com:8083/websocket/tag_21010000_2Dchengtao_d6a764c3fd19d3a8933f9723a2cd775f5f527bcd',
                    '订阅多个标签的部分消息': 'ws://track.ubitraq.com:8083/websocket/tag_21010000,22010000_2Dchengtao_d6a764c3fd19d3a8933f9723a2cd775f5f527bcd_type|sos|power|coord',
                    '订阅多个标签的所有消息': 'ws://track.ubitraq.com:8083/websocket/tag_21010000,22010000_2Dchengtao_d6a764c3fd19d3a8933f9723a2cd775f5f527bcd',
                }
            },
            {
                id: 'socket_msgType',
                title: '获取消息方式',
                desc: {
                    '获取消息': [
                        `
socketrequest.onmessage = function (event) {
    var data = JSON.parse(event.data);
    //检查消息类型
    if(!data.hasOwnProperty('msgType')
    {
        console.warn('error data:',data);
        return
    }
    if(data.msgType == 'sos')
    {
        //如果消息类型为sos， 则为求救消息
        sosAlert(data);
    }else if(data.msgType == 'fenceAlert')
    {
        //如果消息类型为fenceAlert， 则为标签触发了电子围栏报警
        fenceAlert(data);
    }else if(data.msgType == 'coord')
    {
        //如果消息类型为coord， 则为标签定位消息
        positionTag(data);
    }else if(data.msgType == 'passthrough')
    {
        //如果消息类型为passthrough， 则为用户约定的透传数据
        passthrough(data);
    } else if(data.msgType == 'power')
    {
        //如果消息类型为power， 则为标签电量信息
        refreshTagPower (data);
    } else if(data.msgType == 'powerAlert')
    {
        //如果消息类型为powerAlert， 则为标签低电量报警
        refreshTagPower (data);
    }
}`
                    ]
                },
            },
            {
                'response_detail': {
                    response_model_title: '订阅消息数据返回格式',
                    response_model: [{
                            id: 'socket_coord',
                            title: '标签实时位置消息',
                            respnses: {
                                msgType: 'coord(消息类型[coord:定位])',
                                code: "00000121(标签的code)",
                                map: 'projectCode_25(所在项目地图id)',
                                x: '100(单位cm)',
                                y: '180(单位cm)',
                                z: '100(单位cm)',
                                longitude:'113.9999937094(经度)',
                                latitude:'38.9999777966(纬度)',
                                time: "1518231228177(时间戳)"
                            }
                        },
                        {
                            id: 'socket_sos',
                            title: '标签SOS消息',
                            respnses: {
                                msgType: 'sos(消息类型[sos:sos消息])',
                                map: 'projectCode_25(所在项目地图id)',
                                code: "00000121(标签的code)",
                                time: "1518231228177(触发时间戳)"
                            }
                        },
                        {
                            id: 'socket_fenceAlert',
                            title: '电子围栏报警消息',
                            respnses: {
                                msgType: 'fenceAlert(消息类型:[fenceAlert:围栏报警])',
                                "fenceId": '92(围栏ID)',
                                "fenceCname": "f3（围栏名称）",
                                "code": "00000019（标签code）",
                                "map": 'projectCode_25(所在项目地图id)',
                                "isIn": 'true（true  入围栏， false, 出围栏）',
                                "time": "1518231228177(触发时间戳)"
                            }
                        },

                        {
                            id: 'socket_power',
                            title: '标签电量消息',
                            respnses: {
                                msgType: "power(消息类型:[power:电量消息])",
                                code: "000002e3（标签编码）",
                                map: "xystudy_63（所属项目地图id）",
                                power: '3924（电量大小mV）',
                                time: '1528191048136(测量时间戳)',
                            }
                        },
                        {
                            id: 'socket_distanceAlert',
                            title: '距离报警消息',
                            respnses: {
                                msgType: "distanceAlert(消息类型:[distanceAlert:距离消息])",
                                code: "000002e3（标签编码）",
                                map: "xystudy_63（所属项目地图）",
                                alertType: "1(1：近距离报警；2：远距离报警)",
                                alerts: [{
                                    toTag: "000002e4（被测距标签的code）",
                                    distance: "3(与被测距标签的距离)"
                                }],
                                time: '1528191048136(测量时间戳)',
                            }
                        },
                        {
                            id: 'socket_passthrough',
                            title: '数据透传消息',
                            respnses: {
                                msgType: "passthrough(消息类型:[passthrough:透传消息])",
                                code: '000000cf（标签code）',
                                data: 'BWhlbGw=（用户约定数据的base64）',
                                time: "1518231228177(触发时间戳)"
                            }
                        },
                    ]
                }
            },
            {
                id: 'socket_GPS',
                title: '订阅GPS实时消息',
                url: "ws://gps.ubitraq.com:8093/websocket?api_token={api_token}&&projectCode={projectCode}",
                type: 'websocket',
                request: {
                    projectCode: {
                        exp: 'xystudy',
                        desc: '项目编码',
                        isRequire: '是'
                    },
                    api_token: {
                        exp: 'chengtao_d6a764c3fd19d3a8933f9723a2cd775f5f527bcd',
                        desc: '身份认证',
                        isRequire: '是'
                    },
                },
                desc: {
                    '注意事项：': '标签必须加入到所在的项目才能获得消息。',
                    '例子': 'ws://gps.ubitraq.com:8093/websocket?api_token=chengtao_d6a764c3fd19d3a8933f9723a2cd775f5f527bcd&&projectCode=xystudy',
                }
            },
            {
                id: 'socket_anchorGPS',
                title: '订阅基站GPS实时消息',
                url: "ws://track.ubitraq.com:8083/websocket/{projectCode}_{mapId}anchorGps_2D{api_token}",
                type: 'websocket',
                request: {
                    projectCode: {
                        exp: 'xystudy',
                        desc: '项目编码',
                        isRequire: '是'
                    },
                    mapId: {
                        exp: '1',
                        desc: '地图id',
                        isRequire: '是'
                    },
                    api_token: {
                        exp: 'chengtao_d6a764c3fd19d3a8933f9723a2cd775f5f527bcd',
                        desc: '身份认证',
                        isRequire: '是'
                    },
                },
                desc: {
                    '注意事项：': '基站必须加入到项目地图才能获得消息。',
                    '例子': 'ws://track.ubitraq.com:8083/websocket/xystudy_1anchorGps_2Dchengtao_d6a764c3fd19d3a8933f9723a2cd775f5f527bcd',
                }
            },
            {
                id: 'socket_anchorTagDistance',
                title: '订阅基站标签测距消息',
                url: "ws://track.ubitraq.com:8083/websocket/{projectCode}_{mapId}distance_2D{api_token}",
                type: 'websocket',
                request: {
                    projectCode: {
                        exp: 'xystudy',
                        desc: '项目编码',
                        isRequire: '是'
                    },
                    mapId: {
                        exp: '1',
                        desc: '地图id',
                        isRequire: '是'
                    },
                    api_token: {
                        exp: 'chengtao_d6a764c3fd19d3a8933f9723a2cd775f5f527bcd',
                        desc: '身份认证',
                        isRequire: '是'
                    },
                },
                desc: {
                    '注意事项：': '基站必须加入到项目地图且地图配置开启测距的websocket才能获得消息。',
                    '例子': 'ws://track.ubitraq.com:8083/websocket/xystudy_1distance_2Dchengtao_d6a764c3fd19d3a8933f9723a2cd775f5f527bcd',
                }
            },
        ]
    },


    {
        id: 'note_man',
        title: '注意事项',
        desc: {}
    },
    {
        id: 'note_api_token',
        title: 'api_token',
        note: [{
                id: 'note_ajx',
                title: 'Ajax 方式',
                note_desc: `
ajaxSetup:function(){
    if(!this.api_token || !$) return;
    $.ajaxSetup({
        headers: {
            Accept: "application/json; charset=utf-8",
            api_token: this.api_token
        }
    });
}`


            },
            {
                id: 'note_vue',
                title: 'Vue 方式',
                note_desc: `
vueSetup:function(){
    if(!this.api_token || !Vue) return;
    Vue.http.headers.common.api_token = this.api_token;
}`

            }
        ],
        note_spe: 'api_token由用户登录后生成，除登录之外，所有的业务请求都需要在请求头（request header）中带上api_token.',
    },
    {
        id: 'note_ver',
        title: '验证服务器',
        note: [{
            id: 'note_site',
            title: '浏览器中访问 http://{服务器IP}:8082/',
            note_desc: `
{"msg":"server is running now","isOk":true}`,
        }]

    },
    {
        id: 'note_sup',
        title: '技术支持',
        descs: {
            'email': `support@ubitraq.com`,
        }
    },
];

var saasData = {
    filterText: '',
    //页面标题
    title: '系统API文档',
    menus: menus,
    apiData: apiData,
    footer: '技术支持：support@ubitraq.com',
};