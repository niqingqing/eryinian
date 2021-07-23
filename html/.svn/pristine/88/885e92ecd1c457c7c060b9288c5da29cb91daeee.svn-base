/**
 * Created by LiuTao on 2017/7/03 0028.
 */

// $(function(){
//     init();
// });
// console.log('index')
$(function(){
    init();
})
function init(){
    vueInit();
}

function checks (rule, value, callback) {
    if(ME.vm.form.action!='update') return callback();

    if (!value) {
        callback(new Error(lang['enterCode']));
        return;
    }

    var anchors = $('#anchorTable').bootstrapTable('getData');
    var id = ME.vm.form.id;
    anchors.forEach(function(anchor){
        if(value.toLowerCase() == anchor.code.toLowerCase() && id!=anchor.id){
            callback(new Error(lang['enterCodeNotePre']+anchor.id+lang['enterCodeNoteAfter']));
            return;
        }
    });
    callback();
}



//验证基站输入
function checkCodeSpan (rule, value, callback) {
    if(ME.vm.form.action!='add') return callback();

    var start = ME.vm.form.code_start;
    var end = ME.vm.form.code_end;

    if (!start ||　!end) {
        callback(new Error(lang['checkCodeSapnStartEnd']));
        return;
    }

    //转换
    var s_num = UBIT.code2Num(start);
    var e_num = UBIT.code2Num(end);

    ME.vm.form.anchor_num = e_num - s_num +1;
    var max_num=500;
    if (ME.vm.form.anchor_num<1) {
        callback(new Error(lang['checkCodeSapnStartEndError']));
        return;
    }

    if (ME.vm.form.anchor_num>max_num) {
        callback(new Error(lang['checkCodeSpanMaxNum']+max_num));
        return;
    }

    var anchors = $('#anchorTable').bootstrapTable('getData');

    var addAnchors = [];
    var anchor_codes = [];
    for(var k=0;k<ME.vm.form.anchor_num; k++){
        var anchor_num = s_num+k;
        var anchor_mac = UBIT.num2Code(anchor_num).toLowerCase();
        var anchor_code = anchor_mac;

        for(var i=0;i<anchors.length;i++){
            var anchor = anchors[i];
            if(anchor_mac == anchor.mac.toLowerCase()){
                callback(new Error(lang['checkCodeSpanPre']+anchor_mac+lang['checkCodeSpanMid']+anchor.id+lang['checkCodeSpanAfter']));
                return;
            }
        }
        addAnchors.push(anchor_mac);
        anchor_codes.push(anchor_code);
    }

    ME.vm.form.code_start=start.toLowerCase();
    ME.vm.form.code_end=end.toLowerCase();
    ME.addAnchors =addAnchors;
    ME.anchor_codes =anchor_codes;
    callback();
}

//时槽验证
function checkAnchorSlot(rule, value, callback) {
    var keys = ['anchorSlotWidth','anchorSlotTotalNum','anchorSlotSeqNum'];
    var index = keys.indexOf(rule.field);
    if(index!= -1){
        keys.splice(index,1);
    }
    if(keys.length ==2) {
        if (ME.vm.form[rule.field] === undefined || ME.vm.form[rule.field] === ""){
            if ((ME.vm.form[keys[0]] !== undefined && ME.vm.form[keys[0]] !== "") ||
                (ME.vm.form[keys[1]] !== undefined && ME.vm.form[keys[1]] !== "")) {
                callback(new Error('请填写！'));

            } else {
                callback();
            }
        }else{
            var value = value * 1;
            if(Number.isInteger(value)){
                if( 0 <= value && 65535 >=value){
                    callback();
                }else{
                    callback(new Error('数字要在 0 - 65535 之间！'));
                }
            }else{
                callback(new Error('只能填写数字！'));
            }
        }
    }else{
        callback(new Error('代码逻辑有问题！'))
    }
}

//方向验证
function checksDirection(rule, value, callback) {
    if(value!==""&&!isNaN(value)) {
        var value = value * 1;
        if (0 <= value && 360 >= value) {
            callback();
        } else {
            callback(new Error('数字要在 0 - 360 之间！'));
        }
    }else{
        callback(new Error('请填写在 0 - 360 之间的数字！'));
    }
}

function pageInit(){
    var tableColumns = getTableColumns(ME.pageType);

    $('#anchorTable').bootstrapTable({
        url:ME.host+'/super/anchor/list',
        method:'get',
        queryParams:function(params){
            return params;
        },
        responseHandler:function(res){
            getMasterLists(res);
            return res;
        },
        search:true,
        showRefresh:true,
        idField:'id',
        uniqueId:'id',
        clickToSelect:true,
        singleSelect:false,
        sortable:true,
        striped:true,
        showColumns:true,
        sortName:'id',
        sortOrder:'desc',
        pagination:true,
        pageSize:10,
        pageList:[2,5,10, 25, 50, 100, 200],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#anchortoolbar',
        onDblClickRow:function(row, $element){
            ME.vm.updateAnchor();
        },
        columns: tableColumns,
    });

}


function vueInit(){

    VUE_DATA = Object.assign(VUE_DATA,{
        projects : [],
        products : [],
        allMaps: {},
        algorithms : UBIT.algorithms,
        setThresholdBtnDisable:false,
        deleteBtnDisable:false,
        addBtnDisable:false,

        //rssi, mc, rxFp, prNlos
        thresholds: {
            rssi:-95,
            mc:25,
            rxFp:35,
            PrNlos:40,
        }
    });
    VUE_DATA = Object.assign(VUE_DATA, getCfgData(ANCHOR_CONF));

    VUE_DATA.modefiyPwdRule = {
        code: [
            { min: 8, max: 8, message: lang['modefiyPwdRuleCode'], trigger: 'blur' },
            { validator: checks, trigger: 'blur' }
        ],
        code_start: [
            { min: 8, max: 8, message: lang['modefiyPwdRuleCode'], trigger: 'blur' },
            { validator: checkCodeSpan, trigger: 'blur' }

        ],
        code_end: [
            { min: 8, max: 8, message: lang['modefiyPwdRuleCode'], trigger: 'blur' },
            { validator: checkCodeSpan, trigger: 'blur' }
        ],
        projectId : [
            { required: true, message: lang['modefiyPwdRuleProjectId'], trigger: 'change' },
        ],
        productId : [
            { required: true, message: lang['modefiyPwdRuleProductId'], trigger: 'change' },
        ],
        anchorSlotWidth: [
            // { type:"number", min: 0, max: 65535, message: '请输入0-65535之间的数字', trigger: 'blur' },
            { validator: checkAnchorSlot, trigger: 'blur' }
        ],
        anchorSlotTotalNum: [
            // { type:"number", min: 0, max: 65535, message: '请输入0-65535之间的数字', trigger: 'blur' },
            { validator: checkAnchorSlot, trigger: 'blur' }
        ],
        anchorSlotSeqNum: [
            // { type:"number", min: 0, max: 65535, message: '请输入0-65535之间的数字', trigger: 'blur' },
            { validator: checkAnchorSlot, trigger: 'blur' }
        ],
        direction: [
            // { type:"number", min: 0, max: 65535, message: '请输入0-65535之间的数字', trigger: 'blur' },
            { validator: checksDirection, trigger: 'blur' }
        ]
        // mac : [
        //     { required: true, message: '请输入mac地址', trigger: 'blur' },
        // ]
    };

    VUE_METHODS = Object.assign(VUE_METHODS,{
        changeMaps:function(value, noClear){
            if(!noClear) this.form.mapId = '';
            if(this.allMaps[value]) {
                this.maps = this.allMaps[value];
            }else {
                this.maps = [];
            }
        },



        addAnchor:function(){
            this.au=true;  //控制批量更新隐藏的字段
            this.isShowCode=false;    //控制文本域显示
            this.form.algorithm = "";
            UBIT.emptyObj(ME.vm.form);
            this.dialogFormVisible = true;
            this.form.title = lang['addInfo'];
            this.form.crc = 1;
            this.form.isMaster = '1';
            this.form.isRangeWithTag = '0';
            this.form.algorithm = this.algorithms[0].name;
            this.form.min_num = '3';
            this.form.netType = 'wire';
            this.form.status = "online";
            this.form.channel = "2";
            this.form.frameType = 'standard';
            this.form.dataRate = "6800";
            this.form.pacSize = "8";
            this.form.pulseFrequency = "64";
            this.form.preambleLength = "128";
            this.form.preambleCode = "9";
            this.form.smartPower = "0";
            this.form.frameCheck = "0";
            this.form.action = "add";
            this.form.synFreq = 150;
            this.form.synModel = 'Smart';
            this.form.rxDelay = 86.696;
            this.form.txDelay = 68.584;
            this.form.isShowWifi = '1';
            this.form.isTagMode = '0';
            this.form.isSnifferMode = '0';
            this.form.direction = 0;
            this.form.uwbNetMode = '1';
            this.form.uwbNetNodeList = [];
            this.form.uwbNetSort = 1;
            this.form.uwbNetDelay = 0;

            ME.addAnchors = [];
        },
        deleteAnchor:function(){
            var rows = this.selectRows();
            if(!rows) return;

            var ids = []
            rows.forEach(function(r){
                ids.push(r.id);
            });
            this.$confirm(lang['isDeleteAnchor'],lang['prompt'],{ }).then(function () {
                //屏蔽按钮
                ME.vm.deleteBtnDisable = true;
                ME.vm.$http.post('super/anchor/delete', {ids:ids}).then(function(res){
                    //屏蔽按钮
                    ME.vm.deleteBtnDisable = false;

                    var result = res.body;
                    if(result.isOk){
                        this.refresh();
                        this.$alert(lang['deleteSuccess'], lang['prompt']);
                    }else {
                        this.$alert(lang['deleteFail']+result.msg, lang['prompt'], {
                            confirmButtonText: lang['confirm']
                        });
                    }
                });
            }).catch(function (){ });

        },

        setMinNum:function(alg){
            ME.vm.form.min_num=alg.num;
        },
        //用于处理anchorSlot的三个字段全填和全不填时提示内容的显示处理（代码可去除只影响提示，请将对应的html中调用也去除）。
        checksAnchorSlot:function () {
            ME.vm.$refs['form'].validateField("anchorSlotWidth");
            ME.vm.$refs['form'].validateField("anchorSlotTotalNum");
            ME.vm.$refs['form'].validateField("anchorSlotSeqNum");
        },
    });
    VUE_METHODS = Object.assign(VUE_METHODS,CONF_VUE_METHODS);

    ME.vm = new Vue({
        el:'#app',
        data: VUE_DATA,
        created:function(){
            this.$http.get('project/listActive').then(function(res){
                this.projects = res.body;
                this.$http.get('map/all').then(function(res){
                    this.allMaps = res.body;

                    this.$http.get('super/product/listByType?type=anchor').then(function(res){
                        this.products=res.body;
                        pageInit();
                    });

                });
            });

        },
        methods:VUE_METHODS,
    });

}
