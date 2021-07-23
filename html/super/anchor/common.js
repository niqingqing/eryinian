/**
 * Created by zwt on 2017/9/9 0009.
 */

/*
 常量
 */
var VUE_DATA = {
    dialogFormVisible: false,
    updateBtnDisable: false,
    syncAllAnchorBtnDisable:false,
    syncBtnDisable: false,
    setToAnchorBtnDisable: false,
    setSynModelBtnDisable: false,
    updateSignalQualityBtnDisable: false,
    setUwbNetModelBtnDisable: false,

    rebootBtnDisable: false,
    otaBtnDisable: false,
    settingsBtnDisable: false,

    otaFileListVisible: false,

    setTxPowerBtnDisable: false,
    otaFileList: [],
    au: true,
    isShowCode: false,   //控制文本域显示
    isChangeProj: '1',
    serverIP:'',//服务器IP

    user: ME.user,
    maps: [],
    masterLists: [],
    aboutMapMaster: [],
    aboutMapNode: [],

    checkAllUpdate:false,
    basicLabels: ['projectId','productId','mapId','algorithm','min_num','anchor_signal','x','y','z','direction','lon','lat','netType','rxDelay@txDelay'],
    basicSelected:[],//选择的属性

    anchorSetLabels:['isShowWifi','isRangeWithTag','isMaster','masterList','txPower','direction','synFreq','serverIP','anchorSlotWidth','anchorSlotTotalNum','anchorSlotSeqNum'],
    anchorSetSelected:[],

    debugLabels:['synModel','isTagMode','isSnifferMode'],
    debugSelected:[],

    nlosThresholdsLabels:['thresholds@rssi','thresholds@mc','thresholds@rxFp','thresholds@PrNlos'],
    nlosThresholdsSelected:[],

    uwbNetworkLabels:['uwbNetMode','uwbNetNodeList','uwbNetSort@uwbNetDelay'],
    uwbNetworkSelected:[],


    form: {
        action: 'add',
        projectId: 0,
        productId: 0,
        algorithm: '',
        synFreq: 150,
        synModel: 'Smart',
        codes: '',
        ids: [],
        min_num: 1,

        title: lang['addAnchor'],
        code: '',

        code_start: '',
        code_end: '',
        code_list: [],
        mac_list: [],
        anchor_num: 0,

        id: '',
        sourceId: '',
        alias: '',
        mapId: '',
        catId: '',
        typeId: '',
        sort: '',
        mac: '',
        isShowWifi:1,
        isTagMode:0,
        isSnifferMode:'0',
        isMaster: 1,
        // masterList: '',
        masterList: [],
        isRangeWithTag: 0,
        txPower: '',
        x: '',
        y: '',
        z: '',
        direction: 0,
        lon: '',
        lat: '',
        anchor_signal:-70,
        status: "online",
        netType: 'wire',
        rxDelay: 0,
        txDelay: 0,
        swVersion: '',
        hwVersion: '',
        kerVersion: '',
        channel: "2",
        frameType: 'standard',
        crc: 1,
        dataRate: "6800",
        pacSize: "8",
        pulseFrequency: "64",
        preambleLength: '128',
        preambleCode: '9',
        smartPower: "0",
        frameCheck: "0",

        uwbNetMode:1,
        uwbNetNodeList:[],
        uwbNetSort:1,
        uwbNetDelay:2,
    },
    modefiyPwdRule: {
        mapId: [
            {required: true, message: lang['selectMap'], trigger: 'blur'},
        ],
        alias: [
            {required: true, message: lang['entryAlias'], trigger: 'blur'},
        ]
    },
    formLabelWidth: '120px',
    synModels: ['Smart', 'Normal'],
    txPowers:UBIT.txPowers,
    status: [
        {
            code: "online",
            cname: lang['statusOnline']
        },
        {
            code: "offline",
            cname: lang['statusOffline']
        },
        {
            code: "disable",
            cname: lang['statusDisable']
        }
    ],
    netType: [
        {
            code: "4G",
            cname: "4G"
        },
        {
            code: "wifi",
            cname: "WIFI"
        },
        {
            code: "wire",
            cname: lang['cable']
        }
    ],
    channelType: [
        {
            code: "1",
            cname: "1"
        },
        {
            code: "2",
            cname: "2"
        },
        {
            code: "3",
            cname: "3"
        },
        {
            code: "4",
            cname: "4"
        },
        {
            code: "5",
            cname: "5"
        },
        {
            code: "7",
            cname: "7"
        }
    ],
    frameTypeType: [
        {
            code: "standard",
            cname: lang['standard']
        },
        {
            code: "extend",
            cname: lang['extend']
        }
    ],
    dataRateType: [
        {
            code: "110",
            cname: "110Kbps"
        },
        {
            code: "850",
            cname: "850Kbps"
        },
        {
            code: "6800",
            cname: "6800Kbps"
        },
    ],
    pacSizeType: [
        {
            code: "8",
            cname: "SIZE_8"
        },
        {
            code: "16",
            cname: "SIZE_16"
        },
        {
            code: "32",
            cname: "SIZE_32"
        },
        {
            code: "64",
            cname: "SIZE_64"
        }
    ],
    pulseFrequencyType: [
        {
            code: "16",
            cname: "16MHZ"
        },
        {
            code: "64",
            cname: "64MHZ"
        },
    ],
    preambleLengthType: [
        {
            code: "64",
            cname: "LEN_64"
        },
        {
            code: "128",
            cname: "LEN_128"
        },
        {
            code: "256",
            cname: "LEN_256"
        },
        {
            code: "512",
            cname: "LEN_512"
        },
        {
            code: "1024",
            cname: "LEN_1024"
        },
        {
            code: "1536",
            cname: "LEN_1536"
        },
        {
            code: "2048",
            cname: "LEN_2048"
        },
        {
            code: "4096",
            cname: "LEN_4096"
        }
    ],
    preambleCodeType: [
        {
            code: "1",
            cname: "16MHZ_1"
        },
        {
            code: "2",
            cname: "16MHZ_2"
        },
        {
            code: "3",
            cname: "16MHZ_3"
        },
        {
            code: "4",
            cname: "16MHZ_4"
        },
        {
            code: "5",
            cname: "16MHZ_5"
        },
        {
            code: "6",
            cname: "16MHZ_6"
        },
        {
            code: "7",
            cname: "16MHZ_7"
        },
        {
            code: "8",
            cname: "16MHZ_8"
        },
        {
            code: "9",
            cname: "64MHZ_9"
        },
        {
            code: "10",
            cname: "64MHZ_10"
        },
        {
            code: "11",
            cname: "64MHZ_11"
        },
        {
            code: "12",
            cname: "64MHZ_12"
        },
        {
            code: "13",
            cname: "64MHZ_13"
        },
        {
            code: "14",
            cname: "64MHZ_14"
        },
        {
            code: "15",
            cname: "64MHZ_15"
        },
        {
            code: "16",
            cname: "64MHZ_16"
        },
        {
            code: "17",
            cname: "64MHZ_17"
        },
        {
            code: "18",
            cname: "64MHZ_18"
        },
        {
            code: "19",
            cname: "64MHZ_19"
        },
        {
            code: "20",
            cname: "64MHZ_20"
        }

    ],
    smartPowerType: [
        {
            code: "0",
            cname: lang['notSupport']
        },
        {
            code: "1",
            cname: lang['support']
        }
    ],
    frameCheckType: [
        {
            code: "0",
            cname: lang['notSupport']
        },
        {
            code: "1",
            cname: lang['support']
        }
    ],
    otaAnchors:[],
    otaProgress:false
}


var TABLE_COLUMNS = [
    {checkbox: true, pageType: 'project'},
    {checkbox: true, pageType: 'super'},

    {field: 'id', title: 'ID', width: '2%', sortable: true, searchable: true},
    {field: 'sourceId', title: lang['sourceId'], width: '6%', pageType: 'project', sortable: true, searchable: true},
    {field: 'alias', title: lang['alias'], width: '10%', pageType: 'project', sortable: true, searchable: true},

    {field: 'code', title: lang['code'], width: '5%', sortable: true, searchable: true},
    {field: 'mac', title: lang['mac'], width: '6%', sortable: true, searchable: true},

    {
        field: 'status', title: lang['status'], width: '6%', sortable: true, searchable: true,
        formatter: function (value, row, index) {
            switch (value) {
                case 'online' :
                    return '<font style="color:green">'+lang['statusOnline']+'</font>';
                    break;
                case 'offline' :
                    return '<font style="color:red">'+lang['statusOffline']+'</font>';
                    break;
                case 'disable' :
                    return '<font style="color:gray">'+lang['statusDisable']+'</font>';
                    break;
                default:
                    return lang['known'];
            }
        }
    },

    {
        field: 'onlineTime', title: lang['onlineTime'], width: '6%', pageType: 'super', sortable: true, searchable: true,
        formatter: function (value, row, index) {
            if (value) {
                return moment(value*1).format('YYYY-MM-DD HH:mm:ss');
            }
            return '';
        },
    },
    {
        field: 'projectId', title: lang['projectId'], width: '6%', pageType: 'super', sortable: true, searchable: true,
        formatter: function (value, row, index) {
            if (value && row.project) {
                return row.project.cname + "(" + row.project.code + ")";
            }
            return '';
        },
    },
    {
        field: 'productId', title: lang['productId'], width: '6%', pageType: 'super', sortable: true, searchable: true,
        formatter: function (value, row, index) {
            if (value && row.product) {
                return row.product.cname + "(" + row.product.id + ")";
            }
            return '';
        },
    },
    {
        field: 'mapId', title: lang['mapId'], width: '6%', sortable: true, searchable: true,
        formatter: function (value, row, index) {
            if (!value) {
                return;
            }
            if (ME.pageType == 'super') {
                var maps = ME.vm.allMaps[row.projectId];
            } else {
                var maps = ME.vm.maps;
            }
            if (!maps) return '';
            if (maps) {
                for (var i = 0; i < maps.length; i++) {
                    if (value == maps[i].id) {
                        if(ME.pageType == 'project'){
                            var html = '<a href="javascript:void(0);" onclick=" UBIT.openMap('+value+');" >'+maps[i].cname + '('+value+')'+'</a>';
                            return '<div>'+html+'</div>';
                        }
                        return maps[i].cname + '('+value+')';
                    }
                }
            }
            return '';
        }
    },
    {
        field: 'color', title: lang['color'], width: '20%', pageType: 'project', sortable: true, searchable: true,
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
    {field: 'sort', title: lang['sort'], width: '10%', pageType: 'project', sortable: true, searchable: true},
    {
        field: 'isShowWifi', title: lang['isShowWifi'], width: '6%', sortable: true,pageType: 'super',
        formatter: function (value, row, index) {
            return value > 0 ? lang['true'] : lang['false'];
        },
        searchable: true
    },
    {
        field: 'isTagMode', title: lang['isTagMode'], width: '6%', sortable: true,pageType: 'super',
        formatter: function (value, row, index) {
            return value > 0 ? lang['true'] : lang['false'];
        },
        searchable: true
    },
    {
        field: 'isSnifferMode', title: lang['isSnifferMode'], width: '6%', sortable: true,
        formatter: function (value, row, index) {
            return value > 0 ? lang['true'] : lang['false'];
        },
        searchable: true
    },
    {
        field: 'isMaster', title: lang['isMaster'], width: '6%', sortable: true,
        formatter: function (value, row, index) {
            return value > 0 ? lang['true'] : lang['false'];
        },
        searchable: true
    },
    {field: 'masterList', title: lang['masterList'], width: '8%', sortable: true, searchable: true},
    {field: 'anchorSlotWidth',title: lang['anchorSlotWidth'],width:'6%', sortable:true, searchable:true},
    {field: 'anchorSlotTotalNum',title: lang['anchorSlotTotalNum'],width:'6%', sortable:true, searchable:true},
    {field: 'anchorSlotSeqNum',title: lang['anchorSlotSeqNum'],width:'6%', sortable:true, searchable:true},
    {
        field: 'isRangeWithTag', title: lang['isRangeWithTag'], width: '6%', sortable: true,
        formatter: function (value, row, index) {
            return value > 0 ? lang['true'] : lang['false'];
        },
        searchable: true
    },
    {field: 'min_num', title: lang['min_num'], width: '8%', sortable: true, searchable: true},
    {field: 'txPower', title: lang['txPower'], width: '8%', sortable: true, searchable: true},
    {field: 'direction', title: lang['direction'], width: '6%', sortable: true, searchable: true},

    {
        field: 'uwbNetMode', title: lang['anchorMode'], width: '6%', sortable: true,
        formatter: function (value, row, index) {
            if(value == 2){
                return lang['node'];
            }
            if(value == 1){
                return lang['gate'];
            }
            return 'uk';
        },
        searchable: true
    },
    {field: 'uwbNetNodeList', title: lang['nodeList'], width: '8%', sortable: true, searchable: true},
    {field: 'uwbNetSort', title: lang['nodeSort'], width: '8%', sortable: true, searchable: true},
    {field: 'uwbNetDelay', title: lang['nodeDelay'], width: '8%', sortable: true, searchable: true},

    {field: 'x', title: 'x', width: '6%', sortable: true, pageType: 'project',  searchable: true},
    {field: 'y', title: 'y', width: '6%', sortable: true, pageType: 'project', searchable: true},
    {field: 'z', title: 'z', width: '6%', sortable: true, pageType: 'project', searchable: true},
    {field: 'algorithm', title: lang['algorithm'], width: '6%', pageType: 'super', sortable: true, searchable: true},
    {field: 'anchor_signal', title: lang['anchor_signal'], width: '6%', pageType: 'super', sortable: true, searchable: true},
    {
        field: 'netType', title: lang['netType'], width: '6%', sortable: true, searchable: true,
        formatter: function (value, row, index) {
            if (value == '4G') {
                return '4G';
            }
            if (value == 'wifi') {
                return 'WIFI';
            }
            if (value == 'wire') {
                return lang['cable'];
            }
            return lang['unknown'];
        }
    },
    {field: 'thresholds', title: lang['thresholds'], width: '15%', sortable: false, pageType: 'super', searchable: true},
    {
        field: 'signalQuality', title: lang['signalQuality'], width: '6%', sortable: true, searchable: true,
        formatter: function (value, row, index) {
            if (value > 20) {
                return '<span style="color:green">' + value + '</span>';
            } else if (value > 15) {
                return '<span style="color:#f7ba2a">' + value + '</span>';
            }else if(!value){
                value = 0;
            }
            return '<span style="color:red">' + value + '</span>';
        }
    },
    {
        field: 'synFreq', title: lang['synFreq'],width:'6%',sortable: true, searchable: true
    },
    // {field: 'status',title: '状态',width:'6%', sortable:true, searchable:true,
    //     formatter:function(value, row, index){
    //         if(value=='online'){
    //             return '<font style="color:green;">在线</font>';
    //         }else if(value=='offline'){
    //             return '<font style="color:red;">离线</font>';
    //         }else if(value=='disable'){
    //             return '<font style="color:gray;">禁用</font>';
    //         }
    //         return '未知';
    //     }
    // },
    {field: 'currentIp', title: lang['currentIp'], width: '10%', sortable: true, searchable: true},
    {field: 'localIp', title: lang['localIp'], width: '10%', sortable: true, searchable: true},
    {field: 'rxDelay', title: lang['rxDelay'], width: '10%', sortable: true, searchable: true},
    {field: 'txDelay', title: lang['txDelay'], width: '10%', sortable: true, searchable: true},
    {field: 'swVersion', title: lang['swVersion'], width: '25%', sortable: true, searchable: true},
    {field: 'hwVersion', title: lang['hwVersion'], width: '10%', sortable: true, searchable: true},
    {field: 'kerVersion', title: lang['kerVersion'], width: '10%', sortable: true, searchable: true},
    {field: 'lon', title: 'lon', width: '6%', sortable: true, searchable: true},
    {field: 'lat', title: 'lat', width: '6%', sortable: true, searchable: true},
    {field: 'channel', title: lang['channel'], width: '10%', sortable: true, searchable: true},
    {field: 'frameType', title: lang['frameType'], width: '10%', sortable: true, searchable: true},
    {field: 'crc', title: 'crc', width: '25%', sortable: true, searchable: true},
    {
        field: 'dataRate', title: lang['dataRate'], width: '10%', sortable: true, searchable: true,
        formatter: function (value, row, index) {
            for (var i = 0; i < ME.vm.dataRateType.length; i++) {
                var item = ME.vm.dataRateType[i];
                if (item.code == value) {
                    return item.cname;
                }
            }
            return value;
        },
    },
    {
        field: 'pacSize', title: lang['pacSize'], width: '10%', sortable: true, searchable: true,
        formatter: function (value, row, index) {
            for (var i = 0; i < ME.vm.pacSizeType.length; i++) {
                var item = ME.vm.pacSizeType[i];
                if (item.code == value) {
                    return item.cname;
                }
            }
            return value;
        },
    },
    {
        field: 'pulseFrequency', title: lang['pulseFrequency'], width: '10%', sortable: true, searchable: true,
        formatter: function (value, row, index) {
            for (var i = 0; i < ME.vm.pulseFrequencyType.length; i++) {
                var item = ME.vm.pulseFrequencyType[i];
                if (item.code == value) {
                    return item.cname;
                }
            }
            return value;
        },
    },

    {
        field: 'preambleCode', title: lang['preambleCode'], width: '25%', sortable: true, searchable: true,
        formatter: function (value, row, index) {
            for (var i = 0; i < ME.vm.preambleCodeType.length; i++) {
                var item = ME.vm.preambleCodeType[i];
                if (item.code == value) {
                    return item.cname;
                }
            }
            return value;
        },
    },
    {
        field: 'preambleLength', title: lang['preambleLength'], width: '10%', sortable: true, searchable: true,
        formatter: function (value, row, index) {
            for (var i = 0; i < ME.vm.preambleLengthType.length; i++) {
                var item = ME.vm.preambleLengthType[i];
                if (item.code == value) {
                    return item.cname;
                }
            }
            return value;
        },
    },
    {
        field: 'smartPower', title: 'smartPower', width: '10%', sortable: true, searchable: true,
        formatter: function (value, row, index) {
            return value > 0 ? lang['support'] : lang['notSupport'];
        },
    },
    {
        field: 'frameCheck', title: 'frameCheck', width: '10%', sortable: true, searchable: true,
        formatter: function (value, row, index) {
            return value > 0 ? lang['support'] : lang['notSupport'];
        },
    },

    {
        field: 'upTime', title: lang['upTime'], width: '10%', sortable: true, searchable: true,
        formatter: function (value, row, index) {
            if (value) {
                var date = new Date(value);
                return date.toLocaleString();
            }
            return value;
        }
    },
    {
        field: 'addTime', title: lang['addTime'], width: '6%', sortable: true, searchable: true,
        formatter: function (value, row, index) {
            if (value) {
                var date = new Date(value);
                return date.toLocaleString();
            }
            return value;
        }
    },
    {field: 'upUser',title: lang['upUser'],width:'6%', sortable:true, searchable:true},
    // {field: 'addUser',title: '添加用户',width:'6%', sortable:true, searchable:true},
];


var VUE_METHODS = {
    handleCheckAllChangeUpdate:function(){
        // 全选反选
        if(this.checkAllUpdate) {
            this.basicSelected = this.basicLabels;
            this.anchorSetSelected = this.anchorSetLabels;
            this.debugSelected = this.debugLabels;
            this.nlosThresholdsSelected = this.nlosThresholdsLabels;
            this.uwbNetworkSelected = this.uwbNetworkLabels;
        }else {
            this.basicSelected = [];
            this.anchorSetSelected = [];
            this.debugSelected = [];
            this.nlosThresholdsSelected = [];
            this.uwbNetworkSelected = [];
        }
    },

    getLabelSelected:function (selectedList) {
        var selectParams = {};
        for(var i=0;i<selectedList.length;i++){
            var itemArr = selectedList[i].split('@');
            var length = itemArr.length;
            switch(length){
                case 1:
                    selectParams[itemArr]=ME.vm.form[itemArr];
                    if (itemArr == 'masterList') {
                        if(selectParams.masterList.length > 0 && Object.prototype.toString.call(selectParams.masterList) =="[object Array]"){
                            selectParams.masterList = selectParams.masterList.join(',');
                        }else{
                            // 只对添加有效
                            selectParams.masterList = '';
                        }
                    }
                    break;
                case 2:
                    if(itemArr[0]=='thresholds'){
                        if(!selectParams.thresholds)selectParams.thresholds = {};
                        selectParams[itemArr[0]][itemArr[1]]=ME.vm[itemArr[0]][itemArr[1]];
                    }else{
                        selectParams[itemArr[0]]=ME.vm.form[itemArr[0]];
                        selectParams[itemArr[1]]=ME.vm.form[itemArr[1]];
                    }
                    break;
                default:
                    for(var j=0;j<length;j++){
                        selectParams[itemArr[j]]=ME.vm.form[itemArr[j]];
                    }
            }
        }
        return selectParams;
    },

    // 提交数据之前，获取最新属性值
    getCheckedParm:function(action){
        var selectParams = {};

        var action = ME.vm.form.action;
        // if(action == 'update'){
        Object.assign(selectParams,this.getLabelSelected(this.basicSelected));
        Object.assign(selectParams,this.getLabelSelected(this.anchorSetSelected));
        Object.assign(selectParams,this.getLabelSelected(this.debugSelected));
        Object.assign(selectParams,this.getLabelSelected(this.nlosThresholdsSelected));
        Object.assign(selectParams,this.getLabelSelected(this.uwbNetworkSelected));
        // }


        if(Object.keys(selectParams).length<1) {
            ME.vm.$alert(lang['mustCheckParm'], lang['prompt'], {
                confirmButtonText: lang['confirm']
            });
            return selectParams;
        }

        // 根据type,加载必须的参数
        selectParams.id=this.form.id;
        selectParams.ids=this.form.ids;
        selectParams.code=this.form.code;
        selectParams.codes=this.form.codes;

        return selectParams;
    },

    selectRows: function () {
        return selectOne('anchorTable', ME.vm);
    },

    refresh: function () {
        return refreshTable('anchorTable');
    },

    filterOfflines:function () {
        var anchors = this.selectRows();
        for(var i=0;i<anchors.length;i++){
            var anchor = anchors[i];
            if(anchor.status != 'online'){
                ME.vm.$alert(lang['anchor']+"“"+anchor.code+"”"+lang['statusError']+"!", lang['prompt']);
                return false;
            }
        }
        return anchors;
    },

    getOnlineAnchorCodes:function () {
        var anchors = this.filterOfflines();
        if(!anchors) return false;

        var params = {codes:[]};
        for(var i=0;i<anchors.length;i++){
            params.codes.push(anchors[i].code);
        }
        return params;
    },

    syncAnchors:function(){
        var params = this.getOnlineAnchorCodes();
        if(!params) return;

        ME.vm['syncAllAnchorBtnDisable'] = true;
        ME.vm.$http.post('super/anchor/syncParams', params).then(function (res) {
            ME.vm['syncAllAnchorBtnDisable'] = false;

            var result = res.body;
            if (result.isOk) {
                this.$alert(result.msg, lang['prompt']);
                setTimeout(function () {
                    ME.vm.refresh();
                }, 3000);
            } else {
                this.$alert(lang['commandFail'] + result.msg, lang['prompt'], {
                    confirmButtonText: lang['confirm']
                });
            }
        });
    },

    rebootAnchors: function () {
        var params = this.getOnlineAnchorCodes();
        if(!params) return;

        this.$confirm('确定重启所选基站？', lang['prompt'], {}).then(function () {
            ME.vm.rebootBtnDisable = true;
            ME.vm.$http.post('super/anchor/rebootAnchors', params).then(function (res) {
                ME.vm.rebootBtnDisable = false;
                var result = res.body;
                if (result.isOk) {
                    ME.vm.$alert(lang['restartSucess'], lang['prompt']);
                } else {
                    ME.vm.$alert(lang['restartFail'] + result.msg, lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                }
            });

        }).catch(function () {

        });
    },

    reboot: function () {
        ME.vm.rebootBtnDisable = true;
        this.$http.get('super/anchor/reboot?mac=' + ME.vm.form.mac).then(function (res) {
            ME.vm.rebootBtnDisable = false;
            var result = res.body;
            if (result.isOk) {
                this.$alert(lang['restartSucess'], lang['prompt']);
            } else {
                this.$alert(lang['restartFail'] + result.msg, lang['prompt'], {
                    confirmButtonText: lang['confirm']
                });
            }
        });
    },

    settings:function(){
        var params = this.getOnlineAnchorCodes();
        if (!params) return;

        var self = this;

        this.$confirm('确定设置所选基站？', lang['prompt'], {}).then(function () {
            self.settingsBtnDisable = true;
            self.$http.post('super/anchor/settings',params).then(function(res){
                self.settingsBtnDisable = false;
                var data = res.body;
                if(data.hasOwnProperty('isOk')){
                    ME.vm.$alert(data.msg,lang['prompt']);
                    return ;
                }
                var msg = '';
                for(var i=0;i<data.length;i++){
                    msg += data[i].code +':'+ data[i].msg +'；';
                }
                self.$alert(msg,lang['prompt']);
            })
        }).catch(function () {

        });
    },

    updateAnchor: function () {
        var  rows = this.selectRows();
        if (!rows) return;
        if (rows.length > 1) {
            this.$alert(lang['onlySelectOne'], lang['prompt'], {
                confirmButtonText: lang['confirm']
            });
            return false;
        }


        this.dialogFormVisible = true;
        this.form.title = lang['modifyInfo'];
        this.au = true;     //控制批量更新屏蔽的字段显示
        this.isShowCode = false;

        this.form.id = 0;
        this.form.sourceId = 0;
        this.form.alias = '';

        UBIT.deepCopy(rows[0], ME.vm.form, 1);
        if (!ME.vm.form.masterList) {
            ME.vm.form.masterList = [];
        } else if(typeof ME.vm.form.masterList == 'string'){
            ME.vm.form.masterList = ME.vm.form.masterList.split(',');
        }

        if (!ME.vm.form.uwbNetNodeList) {
            ME.vm.form.uwbNetNodeList = [];
        } else if(typeof ME.vm.form.uwbNetNodeList == 'string'){
            ME.vm.form.uwbNetNodeList = ME.vm.form.uwbNetNodeList.split(',');
        }

        if (ME.vm.form.thresholds) {
            ME.vm.thresholds = JSON.parse(ME.vm.form.thresholds);
        }

        this.setMasterMac(rows[0].mapId);
        this.setNodeListMac(rows[0].mapId);

        if (this.changeMaps) this.changeMaps(ME.vm.form.projectId, true);
        this.form.action = "update";
    },

    //选中地图改变时，改变绘制主基站列表
    setMasterMac: function (mapId) {
        ME.vm.aboutMapMaster = [];
        var projectId=ME.vm.form.projectId;
        for (var i = 0; i < ME.vm.masterLists.length; i++) {
            var item = ME.vm.masterLists[i];
            if (mapId == item.mapId&&projectId == item.projectId) {
                ME.vm.aboutMapMaster.push(item.mac);
            }
        }
    },

    setNodeListMac:function (mapId) {
        ME.vm.aboutMapNode = [];
        var anchors = $('#anchorTable').bootstrapTable('getData');

        var projectId=ME.vm.form.projectId;
        for (var i = 0; i < anchors.length; i++) {
            var item = anchors[i];
            if (item.uwbNetMode==2 && mapId == item.mapId && projectId == item.projectId) {
                ME.vm.aboutMapNode.push(item.mac);
            }
        }
    },

    updateAnchorMore: function () {
        var rows = this.selectRows();
        if (!rows) return;
        var codes = [];
        var ids = [];
        switch (ME.pageType) {
            case 'super' :
                for (var i = 0; i < rows.length; i++) {
                    codes.push(rows[i].mac);
                    ids.push(rows[i].id);
                };
                break;
            case 'project' :
                for (var i = 0; i < rows.length; i++) {
                    codes.push(rows[i].mac);
                    ids.push(rows[i].sourceId);
                }
                ;
                break;
        }

        this.form.codes = codes.join(',');
        this.form.ids = ids;

        this.dialogFormVisible = true;
        this.form.title = lang['batchModifyInfo'];
        this.au = true;  //控制批量更新隐藏字段
        this.isShowCode = true;
        this.form.action = "updateMore";

        UBIT.deepCopy(rows[0], ME.vm.form, 1);
        //控制最小基站数量的更改
        if(!ME.vm.form.masterList){
            ME.vm.form.masterList = [];
        }else {
            ME.vm.form.masterList = ME.vm.form.masterList.split(',');
        }

        if(this.changeMaps) this.changeMaps(ME.vm.form.projectId, true);
    },

    updateSignalQuality: function () {
        var anchors = $('#anchorTable').bootstrapTable('getData');
        var onlineAnchors = [];
        for (var i = 0; i < anchors.length; i++) {
            var item = anchors[i];
            if (item.netType=='4G' && item.status == 'online') {
                onlineAnchors.push(item.mac);
            }
        }

        if(onlineAnchors.length<1){
            this.$alert(lang['noOnline4GAnchor'], lang['prompt']);//'当前没有在线的4G基站',
            return;
        }

        this.$confirm(lang['onlyUpdate4GNote'], lang['prompt'], {}).then(function () {

            ME.vm['updateSignalQualityBtnDisable'] = true;
            ME.vm.$http.get('super/anchor/updateSignalQuality').then(function (res) {
                ME.vm['updateSignalQualityBtnDisable'] = false;

                var result = res.body;
                if (result.isOk) {
                    this.$alert(result.msg, lang['prompt']);
                    setTimeout(function () {
                        ME.vm.refresh();
                    }, 3000);
                } else {
                    this.$alert(lang['commandFail'] + result.msg, lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                }
            });

        }).catch(function () {

        });

    },

    updateAnchorDo:function () {
        var form = ME.vm.form;
        var actionType = form.action;
        var msg = lang[actionType];

        this.$confirm(lang['setAnchorPre'] + msg + lang['setAnchorAfter'], lang['prompt'], {}).then(function () {

            ME.vm.$refs['form'].validate(
                function (valid) {
                    if (!valid) {
                        ME.vm.$alert(lang['enterError'], lang['prompt'], {
                            confirmButtonText: lang['confirm']
                        });
                        return false;
                    }

                    if (!form.id) {
                        form.code_list = ME.anchor_codes;
                        form.mac_list = ME.addAnchors;
                    }

                    // 检查勾选，并获取值
                    if(this.checkAllUpdate || ME.pageType=='project'){
                        var params = UBIT.deepCopy(form);
                    }else {
                        var params = ME.vm.getCheckedParm('update');
                        if(Object.keys(params).length<1) return;
                    }

                    if (form.algorithm.name) {
                        params.algorithm = form.algorithm.name;
                    }

                    if (params.masterList) {
                        if(params.masterList.length > 0&&Object.prototype.toString.call(params.masterList) =="[object Array]"){
                            params.masterList = params.masterList.join(',');
                        }else{
                            // 只对添加有效
                            params.masterList = '';
                        }
                    }

                    delete params.code_start;
                    delete params.code_end;
                    delete params.action;
                    delete params.title;
                    if (params.hasOwnProperty('rxDelay')&&!(params.rxDelay)) params.rxDelay = 86.696;
                    if (params.hasOwnProperty('txDelay')&&!(params.txDelay)) params.txDelay = 68.584;
                    if (params.hasOwnProperty('x')&&!(params.x)) params.x = 0;
                    if (params.hasOwnProperty('y')&&!(params.y)) params.y = 0;
                    if (params.hasOwnProperty('z')&&!(params.z)) params.z = 0;
                    if (params.hasOwnProperty('lon')&&!(params.lon)) params.lon = 0;
                    if (params.hasOwnProperty('lat')&&!(params.lat)) params.lat = 0;
                    if (params.isMaster == 1 && !params.txPower) params.txPower = '130d0727';

                    if (params.hasOwnProperty('anchor_signal')) {
                        params.anchor_signal=params.algorithm=='TDOA_0D_V10'&&params.anchor_signal?params.anchor_signal:-70;
                    }
                    if (params.hasOwnProperty('productId')&&isNaN(params.productId)) params.productId = 0;

                    ME.vm['updateBtnDisable'] = true;
                    ME.vm.$http.post(ME.pageType + '/anchor/' + actionType, params).then(function (res) {
                        ME.vm['updateBtnDisable'] = false;

                        var result = res.body;
                        if (result.isOk) {
                            ME.vm.dialogFormVisible = false;
                            msg = msg + lang['success'] + "！";
                            this.$alert(msg, lang['prompt']);
                            this.refresh();
                        } else {
                            msg = msg + lang['fail'] +"！" + result.msg;
                            this.$alert(msg, lang['prompt'], {
                                confirmButtonText: lang['confirm']
                            });
                        }
                    });

                })

        }).catch(function () {

        });

    },

    selectedChange:function () {
        this.checkAllUpdate = false;
    },

    addDo: function (actionType) {
        var msg = lang[actionType];

        var form = ME.vm.form;
        this.$confirm(lang['setAnchorPre'] + msg + lang['setAnchorAfter'], lang['prompt'], {}).then(function () {

            ME.vm.$refs['form'].validate(
                function (valid) {
                    if (!valid) {
                        ME.vm.$alert(lang['enterError'], lang['prompt'], {
                            confirmButtonText: lang['confirm']
                        });
                        return false;
                    }

                    var url = ME.pageType + '/anchor/' + actionType;

                    ME.vm.form.code_list = ME.anchor_codes;
                    ME.vm.form.mac_list = ME.addAnchors;

                    var params = UBIT.deepCopy(ME.vm.form);
                    if (ME.vm.form.algorithm.name) {
                        params.algorithm = ME.vm.form.algorithm.name;
                    }

                    ME.vm[actionType + 'BtnDisable'] = true;
                    if (params.masterList) {
                        if(params.masterList.length > 0&&Object.prototype.toString.call(params.masterList) =="[object Array]"){
                            params.masterList = params.masterList.join(',');
                        }else{
                            // 只对添加有效
                            params.masterList = '';
                        }
                    }

                    delete params.code_start;
                    delete params.code_end;
                    delete params.action;
                    delete params.title;
                    if (params.hasOwnProperty('rxDelay')&&!(params.rxDelay)) params.rxDelay = 86.696;
                    if (params.hasOwnProperty('txDelay')&&!(params.txDelay)) params.txDelay = 68.584;
                    if (params.hasOwnProperty('x')&&!(params.x)) params.x = 0;
                    if (params.hasOwnProperty('y')&&!(params.y)) params.y = 0;
                    if (params.hasOwnProperty('z')&&!(params.z)) params.z = 0;
                    if (params.hasOwnProperty('lon')&&!(params.lon)) params.lon = 0;
                    if (params.hasOwnProperty('lat')&&!(params.lat)) params.lat = 0;
                    if (params.isMaster == 1 && !params.txPower) params.txPower = '130d0727';
                    if (params.hasOwnProperty('anchor_signal')) {
                        params.anchor_signal=params.algorithm=='TDOA_0D_V10'&&params.anchor_signal?params.anchor_signal:-70;
                    }
                    if (params.hasOwnProperty('productId')&&isNaN(params.productId)) params.productId = 0;

                    ME.vm.$http.post(url, params).then(function (res) {
                        ME.vm[actionType + 'BtnDisable'] = false;

                        var result = res.body;
                        if (result.isOk) {
                            ME.vm.dialogFormVisible = false;
                            msg = msg + lang['success'] + "！";
                            this.$alert(msg, lang['prompt']);
                            this.refresh();
                        } else {
                            msg = msg + lang['fail'] +"！" + result.msg;
                            this.$alert(msg, lang['prompt'], {
                                confirmButtonText: lang['confirm']
                            });
                        }
                    });

                })

        }).catch(function () {

        });
    },

    setAnchors: function () {
        var params = this.getOnlineAnchorCodes();
        if(!params) return false;

        params.settings = this.getLabelSelected(this.anchorSetSelected);
        if(Object.keys(params.settings).length<1) {
            ME.vm.$alert(lang['mustCheckParm'], lang['prompt'], {
                confirmButtonText: lang['confirm']
            });
            return false;
        }

        var msg = lang['setToAnchor'];
        this.$confirm(lang['setAnchorPre'] + msg + lang['setAnchorAfter'], lang['prompt'], {}).then(function () {

            ME.vm['setToAnchorBtnDisable'] = true;
            ME.vm.$http.post(ME.pageType + '/anchor/setAnchors', params).then(function (res) {
                ME.vm['setToAnchorBtnDisable'] = false;

                var data = res.body;
                if(data.hasOwnProperty('isOk')){
                    ME.vm.$alert(data.msg,lang['prompt']);
                    return ;
                }

                var msg = '';
                for(var i=0;i<data.length;i++){
                    if(data[i].code) {
                        msg += data[i].code + ':' + data[i].msg + '；';
                    }else{
                        msg += data[i].msg + '；';
                    }
                }
                ME.vm.$alert(msg,lang['prompt']);

                ME.vm.dialogFormVisible = false;
                ME.vm.refresh();

            });

        }).catch(function () {

        });
    },


    setThreshold:function () {
        var params = this.getOnlineAnchorCodes();
        if(!params) return false;

        Object.assign(params, this.getLabelSelected(this.nlosThresholdsSelected));
        if(!params.thresholds) {
            ME.vm.$alert(lang['mustCheckParm'], lang['prompt'], {
                confirmButtonText: lang['confirm']
            });
            return false;
        }

        ME.vm.setThresholdBtnDisable = true;
        ME.vm.$http.post('super/anchor/updateThresholds', params).then(function(res){
            ME.vm.setThresholdBtnDisable = false;
            var result = res.body;
            if (result.isOk) {
                this.$alert(lang['updateThresholdsCommondSuccess'], lang['prompt']);
            } else {
                this.$alert(lang['updateThresholdsCommondFail'] + result.msg, lang['prompt'], {
                    confirmButtonText: lang['confirm']
                });
            }
        });

    },

    getOTAFileList: function () {
        var anchors = this.getOnlineAnchorCodes();
        if(!anchors) return;

        ME.vm.otaAnchors = anchors.codes.map(function(value){
            return {
                mac:value,
                msg:`${lang['upgradingPre']}${value}${lang['upgradingAfter']}`,
                color:'blue',
                ratio:0
            }
        })

        this.otaProgress = false;
        this.otaBtnDisable = true;
        this.$http.get('versions/list?is_active=1').then(function (res) {
            ME.vm.otaBtnDisable = false;
            if (!res.body) {
                ME.vm.$alert(lang['noOTAFile']);
                return;
            }
            ME.vm.otaFileList = res.body;
            ME.vm.otaFileList.forEach(function (v,i,t) {
                v.upgrading=false;
            });
            ME.vm.otaFileListVisible = true;
        }).catch(function () {
            ME.vm.otaBtnDisable = false;
            ME.vm.$alert(lang['requestError']);
        });
    },

    setTransmit:function(){
        var params = this.getOnlineAnchorCodes();
        if(!params) return false;

        params.settings={
            channel:this.form.channel,
            frameType:this.form.frameType,
            dataRate:this.form.dataRate,
            crc:this.form.crc,
            pacSize:this.form.pacSize,
            pulseFrequency:this.form.pulseFrequency,
            preambleLength:this.form.preambleLength,
            preambleCode:this.form.preambleCode,
            smartPower:this.form.smartPower,
            frameCheck:this.form.frameCheck,
        };

        this.setToAnchorBtnDisable = true;
        this.$http.post('super/anchor/setAnchors',params).then(function(res){
            ME.vm.setToAnchorBtnDisable = false;
            var data = res.body;
            if(data.hasOwnProperty('isOk')){
                ME.vm.$alert(data.msg,lang['prompt']);
                return ;
            }

            var msg = '';
            for(var i=0;i<data.length;i++){
                msg += data[i].code +':'+ data[i].msg +'；';
            }
            ME.vm.$alert(msg,lang['prompt']);
        })
    },

    setDebugModel: function () {
        var params = this.getOnlineAnchorCodes();
        if(!params) return false;

        var debugs = this.getLabelSelected(this.debugSelected);
        if(debugs.hasOwnProperty('synModel')){
            debugs.synFreq = ME.vm.form.synFreq;
        }
        if(Object.keys(debugs).length<1) {
            ME.vm.$alert(lang['mustCheckParm'], lang['prompt'], {
                confirmButtonText: lang['confirm']
            });
            return false;
        }

        Object.assign(params, debugs);

        ME.vm.setSynModelBtnDisable = true;
        this.$http.post('super/anchor/setDebugModel', params).then(function (res) {
            ME.vm.setSynModelBtnDisable = false;

            var result = res.body;
            if (result.isOk) {
                this.$alert(lang['settingCommandSuccess'], lang['prompt']);
            } else {
                this.$alert(lang['settingCommandFail'] + result.msg, lang['prompt'], {
                    confirmButtonText: lang['confirm']
                });
            }
        });
    },

    startOTA: function (id) {

        ME.vm.otaBtnDisable = true;
        var self = this;
        self.otaFileList.forEach(function (v,i,t) {
            if(v.id == id){
                v.upgrading = true;
            }
        });
        var msg=lang['startOTAUpdateMore'];
        var restType='post';
        var url='super/anchor/otaMore';
        var params={id, macs:[]};

        this.$confirm(lang['startOTANotePre']+msg+lang['startOTANoteAfter'], lang['prompt'], {confirmButtonText: lang['confirm'], cancelButtonText: lang['cancel'], type: 'warning'})
            .then(function(){
                self.otaProgress = true;
                self.otaAnchors = self.otaAnchors.map(function(value){
                    value.msg = lang['upgradingPre'] +'(' + value.mac + ')' + lang['upgradingAfter'];
                    params.macs.push(value.mac);
                    value.ratio = 0;
                    return value;
                });
                const anchors = self.otaAnchors.map(anchor => anchor.mac)
                const time = Date.now()
                function getOtaProgress(){
                    const url = ME.host + '/super/anchor/getOtaProgress';
                    self.$http.post(url,{anchors}).then((res) => {
                        if(res.data && res.data.isOk){
                            self.otaAnchors = self.otaAnchors.map(function(value){
                                value.ratio = res.data.data[value.mac] * 100;
                                if(value.ratio >= 100){
                                    value.status = 'success';
                                    value.msg = lang['anchor'] + '(' + value.mac + ')' + lang['startOTASuccess']
                                }
                                if(value.ratio === -100){
                                    value.status = 'exception';
                                    value.msg = lang['anchor'] + '(' + value.mac + ')' + lang['startOTAFail']+rs.msg;
                                }
                                return value;
                            })
                            if(self.otaAnchors.every((anchor) => {
                                return Math.abs(anchor.ratio) === 100;
                            })){
                                ME.vm.otaBtnDisable = false
                                self.otaFileList.forEach(function (v,i,t) {
                                    if(v.id == id){
                                        v.upgrading = false;
                                    }
                                });
                                return
                            }
                        }
                        if(Date.now() - time > 1000 * 60 * 0.5){
                            ME.vm.otaBtnDisable = false;
                            self.otaFileList.forEach(function (v,i,t) {
                                if(v.id == id){
                                    v.upgrading = false;
                                }
                            });
                            self.otaAnchors = self.otaAnchors.map(function(value){
                                if(Math.abs(value.ratio) !== 100){
                                    value.status = 'exception';
                                    value.msg = lang['anchor'] + '(' + value.mac + ')' + lang['startOTAFail']+'time out';
                                }
                                return value;
                            })
                            return;
                        }else{
                            return setTimeout(() => {
                                getOtaProgress()
                            },1000)
                        }
                    })
                }
                ME.vm.$http[restType](url,params).then(function (res) {
                    getOtaProgress();
                });
            }).
        catch(function(){
            self.otaFileList.forEach(function (v,i,t) {
                if(v.id == id){
                    v.upgrading = false;
                }
            });
            ME.vm.otaBtnDisable = false;
        })
        ;
    },

    setUwbNetModel:function(){
        var params = this.getOnlineAnchorCodes();
        if(!params) return false;

        var selectParams = this.getLabelSelected(this.uwbNetworkSelected);
        if(Object.keys(selectParams).length<1) {
            ME.vm.$alert(lang['mustCheckParm'], lang['prompt'], {
                confirmButtonText: lang['confirm']
            });
            return false;
        }

        Object.assign(params, selectParams);

        ME.vm.setUwbNetModelBtnDisable = true;
        this.$http.post('super/anchor/setUwbNetModel',params).then(function(res){
            ME.vm.setUwbNetModelBtnDisable = false;
            var data = res.body;
            var msg = data.msg;
            if(!msg){
                msg = '';
                for(var i=0;i<data.details.length;i++){
                    msg += data.details[i].msg;
                }
            }

            if(data.isOk){
                this.$alert(lang['setSuccessDetail'] + msg,lang['prompt']);
            }else{
                this.$alert(lang['setFailDetail'] + msg,lang['prompt']);
            }
        })

    },

}


function getTableColumns(pageType) {
    var tableColumns = [];
    for (var i = 0; i < TABLE_COLUMNS.length; i++) {
        var item = TABLE_COLUMNS[i];
        if (!item.pageType) {
            tableColumns.push(item);
        } else if (item.pageType == pageType) {
            tableColumns.push(item);
        }
    }
    return tableColumns;
}

function selectOne(tableId, vm) {
    var a = $('#' + tableId).bootstrapTable('getSelections');
    if (!a || a.length < 1) {
        vm.$alert(lang['selectOne'], lang['prompt'], {
            confirmButtonText: lang['confirm']
        });
        return false;
    }
    return a;
}

function refreshTable(tableId) {
    $('#' + tableId).bootstrapTable('refresh');
}


function getMasterLists(anchors) {
    ME.vm.masterLists = [];
    for (var i = 0; i < anchors.length; i++) {
        var a = anchors[i];
        if (a.isMaster > 0) {
            // ME.vm.masterLists.push(a.mac);
            ME.vm.masterLists.push({'mapId': a.mapId, 'mac': a.mac,projectId:a.projectId});
        }
    }
    return ME.vm.masterLists;
}


