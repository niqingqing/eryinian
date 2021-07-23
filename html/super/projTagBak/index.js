/**
 * Created by LiuTao on 2017/7/03 0028.
 */



$(function(){
    init();
});

function init(){
    vueInit();

}

function checks (rule, value, callback) {
        if (value === '') {
          callback(new Error(lang['checksNote']));
          return;
        }

        var projTags = $('#projTagtable').bootstrapTable('getData');
        var id = ME.vm.form.id;
        var flag = true;
        projTags.forEach(function(projTag){
            if(value == projTag.alias && id!=projTag.id){
                callback(new Error(lang['checksNote2Pre']+projTag.alias+lang['checksNote2After']));
                return;
            }
        });
        if(!flag) return;
        callback();
}




function pageInit(){
    var Vue = window.Vue;
    var VueQrcode = window.VueQrcode;
    Vue.component('qrcode', VueQrcode);

    $('#projTagtable').bootstrapTable({
        url:ME.host+'/project/tag/list?projectId='+ME.user.projectId,
        method:'get',
        queryParams:function(params){
            return params;
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
        pageList:[2, 10, 25, 50, 100, 200],
        sidePagination:'client',
        toolbarAlign:'left',
        toolbar:'#projTagtoolbar',
        onDblClickRow:function(row, $element){
            ME.vm.projTagUpdate('one');
        },

    columns: [
        
        {checkbox:true},
        {field: 'id',title: 'ID', width:'2%', sortable:true,searchable:true},
        {field: 'sourceId',title: lang['sourceId'],width:'6%', sortable:true, searchable:true},
        {field: 'code', title: '编码', width:'5%', sortable:true, searchable:true}, 
        {field: 'alias',title: lang['alias'],width:'10%', sortable:true, searchable:true},
        

        {field: 'catId',title: lang['catId'],width:'10%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(row.cat){
                  return '<font color="'+row.cat.color+'">'+row.cat.cname+'</font>';
                }
                return value;
            }

        },
        {field: 'typeId',title: lang['typeId'],width:'25%', sortable:true, searchable:true,
           formatter:function(value, row, index){
            var html;
               if(row.type){
                   html = '<img src="'+ UBIT.getImgSrc('tagTypes', row.type.icon)+'" width="40px" height="40px"/>' ;
                   return html;
                }
               html = '<img src="'+ME.iconPath + 'tag/location_blue.png" width="40px" height="40px"/>' ;
               return html;
            }
        },
        {field: 'sort',title: lang['sort'],width:'10%', sortable:true, searchable:true},
        {field: 'mac',title: lang['macAddress'],width:'6%', sortable:true, searchable:true},

        {field: 'status',title: '状态',width:'6%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value=='online'){
                    return '<font style="color:green;">'+lang['online']+'</font>';
                }else if(value=='offline'){
                    return '<font style="color:red;">'+lang['offline']+'</font>';
                }else if(value=='disable'){
                    return '<font style="color:gray;">'+lang['disable']+'</font>';
                }
                    return lang['unknown'];
            }
        },



        {field: 'wakePeriod',title: '唤醒周期(分钟)',width:'25%', sortable:true, searchable:true},
        {field: 'locatingPeriod',title: '定位周期(毫秒)',width:'10%', sortable:true, searchable:true},

        {field: 'maxPower',title: lang['maxPower'],width:'10%', sortable:true, searchable:true},
        // {field: 'minHeart',title: lang['minHeart'],width:'10%', sortable:true, searchable:true},
        // {field: 'maxHeart',title: lang['maxHeart'],width:'10%', sortable:true, searchable:true},
        {field: 'minHeart',title: '最小心率',width:'10%', sortable:true, searchable:true},
        {field: 'maxHeart',title: '最大心率',width:'10%', sortable:true, searchable:true},
        {field: 'manu',title: lang['manu'],width:'20%', sortable:true, searchable:true},
        {field: 'softVersion',title: lang['swVersion'],width:'25%', sortable:true, searchable:true},
        {field: 'hardVersion',title: lang['hwVersion'],width:'10%', sortable:true, searchable:true},

        {field: 'rxDelay',title: lang['rxDelay'],width:'10%', sortable:true, searchable:true},
        {field: 'txDelay',title: lang['txDelay'],width:'10%', sortable:true, searchable:true},

        {field: 'channel',title: lang['channel'],width:'10%', sortable:true, searchable:true},
        {field: 'frameType',title: lang['frameType'],width:'10%', sortable:true, searchable:true },

        {field: 'crc',title: 'crc',width:'25%', sortable:true, searchable:true},
        {field: 'dataRate',title: lang['dataRate'],width:'10%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                for(var i=0;i<ME.vm.dataRateType.length;i++){
                    var item = ME.vm.dataRateType[i];
                    if(item.code == value){
                        return item.cname;
                    }
                }
                return value;
            },
        },
        {field: 'pacSize',title: lang['pacSize'],width:'10%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                for(var i=0;i<ME.vm.pacSizeType.length;i++){
                    var item = ME.vm.pacSizeType[i];
                    if(item.code == value){
                        return item.cname;
                    }
                }
                return value;
            },
        },
        {field: 'pulseFrequency',title: lang['pulseFrequency'],width:'10%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                for(var i=0;i<ME.vm.pulseFrequencyType.length;i++){
                    var item = ME.vm.pulseFrequencyType[i];
                    if(item.code == value){
                        return item.cname;
                    }
                }
                return value;
            },
        },

        {field: 'preambleCode',title: lang['preambleCode'],width:'25%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                for(var i=0;i<ME.vm.preambleCodeType.length;i++){
                    var item = ME.vm.preambleCodeType[i];
                    if(item.code == value){
                        return item.cname;
                    }
                }
                return value;
            },
        },
        {field: 'preambleLength',title: lang['preambleLength'],width:'10%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                for(var i=0;i<ME.vm.preambleLengthType.length;i++){
                    var item = ME.vm.preambleLengthType[i];
                    if(item.code == value){
                        return item.cname;
                    }
                }
                return value;
            },
        },
        {field: 'smartPower',title: 'smartPower',width:'10%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                return value>0?lang['support']:lang['nonsupport'];
            },
        },
        {field: 'frameCheck',title: 'frameCheck',width:'10%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                return value>0?lang['support']:lang['nonsupport'];
            },
        },

        {field: 'upTime',title: lang['upTime'],width:'10%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value){
                  var date = new Date(value);
                  return date.toLocaleString();
                }
                return value;
            }
        },
        {field: 'addTime',title: lang['addTime'],width:'6%', sortable:true, searchable:true,
            formatter:function(value, row, index){
                if(value){
                  var date = new Date(value);
                  return date.toLocaleString();
                }
                return value;
            }
        },
        {field: 'upUser',title: lang['upUser'],width:'6%', sortable:true, searchable:true},
    ]

});

}

function vueInit(){

    ME.vm = new Vue({
        el:'#app',
        data:{
            enable3d:UBIT.enable3d,
            dialogFormVisible:false,
            dialogUpdateMoreFormVisible:false,
            projTagBtnDisable : false,
            cats:[],
            types:[],
            qrcode:{
                title:lang['qrcode'],
                visible:false,
                value_2d:'',
                value_3d:'',
            },

            have : true,
             status : [
                {
                    code : "online",
                    cname : lang['online']
                },
                {
                    code : "offline",
                    cname : lang['offline']
                },
                {
                    code : "disable",
                    cname : lang['disable']
                }
            ],
            channelType : [
                {
                    code : "1",
                    cname : "1"
                },
                {
                    code : "2",
                    cname : "2"
                },
                {
                    code : "3",
                    cname : "3"
                },
                {
                    code : "4",
                    cname : "4"
                },
                {
                    code : "5",
                    cname : "5"
                },
                {
                    code : "7",
                    cname : "7"
                }
            ],
            frameTypeType : [
                {
                    code : "standard",
                    cname : lang['standard']
                },
                {
                    code : "extend",
                    cname : lang['extend']
                }
            ],
            dataRateType : [
                {
                    code : "110",
                    cname : "110Kbps"
                },
                {
                    code : "850",
                    cname : "850Kbps"
                },
                {
                    code : "6800",
                    cname : "6800Kbps"
                },
            ],
            pacSizeType: [
                {
                    code : "8",
                    cname : "SIZE_8"
                },
                {
                    code : "16",
                    cname : "SIZE_16"
                },
                {
                    code : "32",
                    cname : "SIZE_32"
                },
                {
                    code : "64",
                    cname : "SIZE_64"
                }
            ],
            pulseFrequencyType : [
                {
                    code : "16",
                    cname : "16MHZ"
                },
                {
                    code : "64",
                    cname : "64MHZ"
                },
            ],
            preambleLengthType : [
                {
                    code : "64",
                    cname : "LEN_64"
                },
                {
                    code : "128",
                    cname : "LEN_128"
                },
                {
                    code : "256",
                    cname : "LEN_256"
                },
                {
                    code : "512",
                    cname : "LEN_512"
                },
                {
                    code : "1024",
                    cname : "LEN_1024"
                },
                {
                    code : "1536",
                    cname : "LEN_1536"
                },
                {
                    code : "2048",
                    cname : "LEN_2048"
                },
                {
                    code : "4096",
                    cname : "LEN_4096"
                }
            ],
            preambleCodeType: [
                {
                    code : "1",
                    cname : "16MHZ_1"
                },
                {
                    code : "2",
                    cname : "16MHZ_2"
                },
                {
                    code : "3",
                    cname : "16MHZ_3"
                },
                {
                    code : "4",
                    cname : "16MHZ_4"
                },
                {
                    code : "5",
                    cname : "16MHZ_5"
                },
                {
                    code : "6",
                    cname : "16MHZ_6"
                },
                {
                    code : "7",
                    cname : "16MHZ_7"
                },
                {
                    code : "8",
                    cname : "16MHZ_8"
                },
                {
                    code : "9",
                    cname : "64MHZ_9"
                },
                {
                    code : "10",
                    cname : "64MHZ_10"
                },
                {
                    code : "11",
                    cname : "64MHZ_11"
                },
                {
                    code : "12",
                    cname : "64MHZ_12"
                },
                {
                    code : "13",
                    cname : "64MHZ_13"
                },
                {
                    code : "14",
                    cname : "64MHZ_14"
                },
                {
                    code : "15",
                    cname : "64MHZ_15"
                },
                {
                    code : "16",
                    cname : "64MHZ_16"
                },
                {
                    code : "17",
                    cname : "64MHZ_17"
                },
                {
                    code : "18",
                    cname : "64MHZ_18"
                },
                {
                    code : "19",
                    cname : "64MHZ_19"
                },
                {
                    code : "20",
                    cname : "64MHZ_20"
                }

            ],
            smartPowerType : [
                {
                    code : "0",
                    cname : lang['nonsupport']
                },
                {
                    code : "1",
                    cname : lang['support']
                }
            ],
            frameCheckType : [
                {
                    code : "0",
                    cname : lang['nonsupport']
                },
                {
                    code : "1",
                    cname : lang['support']
                }
            ],
            form: {
              title : lang['addTag'],
              code: '',
              id: '',
              sourceId : '',
              alias : '',
              map: '',
              catId : '',
              typeId : '',
              typeIcon:'',
              sort : '',
              mac: '',
              status : "online",
              rxDelay:0,
              txDelay:0,
              wakePeriod : 30,
              locatingPeriod : 1000,
              maxPower : 4200,
              minHeart:60,
              maxHeart:100,
              manu: '' ,
              softVersion  : '',
              hardVersion : '',
              channel : "2",
              frameType : 'standard',
              crc : 1,
              dataRate : "6800",
              pacSize : "8",
              pulseFrequency : "64",
              preambleLength : '128',
              preambleCode : '9',
              smartPower : "0",
              frameCheck : "0",
            },
            isUpdateHeartNum:0,
            updateMoreForm:{
                title:lang['updateMoreTag'],
                ids:[],
                codes:'',
                catId:'',
                typeId:'',
                minHeart:'',
                maxHeart:'',
                type:'',
                typeIcon:''
            },
            modefiyPwdRule: {
                  alias : [
                      { required: true, message: lang['aliasRule'], trigger: 'blur' },
                      { validator: checks, trigger: 'blur' },
                      { min: 1, max: 25, message: lang['aliasRule2'], trigger: 'blur' },
                  ],
                manu : [
                    { min: 1, max: 50, message: lang['manuRule'], trigger: 'blur' },
                ]
            },
            formLabelWidth: '120px',
        },
        created:function(){
            this.$http.get(ME.host+'/model/list?model=tag_category').then(function(res){
                this.cats = res.body;
                this.$http.get(ME.host+'/tagType/list').then(function(res){
                    this.types = res.body;
                    pageInit();
                });
            });
        },
        watch:{
            isUpdateHeartNum:function(){
                if(!parseFloat(this.isUpdateHeartNum)){
                    ME.vm.updateMoreForm.minHeart='';
                    ME.vm.updateMoreForm.maxHeart='';
                }
            }
        },
        methods:{
            createQrcode:function(){
                var rows = this.selectprojTag();
                if(!rows) return;
                if(rows.length>1){
                    this.$alert(lang['createQrcodeNote'], lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                    return false;
                }
                var row = rows[0];
                var value_2d = ME.selfHost + '/map/map2d/svg/follow/?tag=' + row.code;
                var value_3d = ME.selfHost + '/map/map3d/?anony=1&tag=' + row.code;
                
                this.qrcode.value_2d = value_2d;
                this.qrcode.value_3d = value_3d;
                this.qrcode.visible = true;
            },
            selectprojTag:function(){
                var a = $('#projTagtable').bootstrapTable('getSelections');
                if (!a || a.length<1){
                    this.$alert(lang['selectOne'], lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                    return false;
                }
                return a;
            },
            refresh:function(){
                $('#projTagtable').bootstrapTable('refresh');
            },

            getTagType:function(id){
                if(id){
                    for(var i=0;i<this.types.length;i++){
                        var item = this.types[i];
                        if(item.id == id){
                            return item;
                        }
                    }
                }
                return false;
            },
            getCatType:function(id){
                if(id){
                    for(var i=0;i<this.cats.length;i++){
                        var item = this.cats[i];
                        if(item.id == id){
                            return item;
                        }
                    }
                }
                return false;
            },

            changeIcon:function(){
                this.have = false;
                var type = this.getTagType(this.form.typeId);
                if(!type) return;

                ME.vm.form.typeIcon = UBIT.getImgSrc('tagTypes', type.icon);
                this.have = true;
            },


            projTagUpdate:function(){
                var rows = this.selectprojTag();
                if(!rows) return;
                if(rows.length>1){
                     this.$alert(lang['projTagUpdateNote'], lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                    return false;
                }

                this.dialogFormVisible = true;
                this.form.title = lang['updateInfo'];
                this.form.id = 0;
                this.form.sourceId = 0;
                UBIT.deepCopy(rows[0],ME.vm.form,1);
                
                
                if(ME.vm.form.type){
                        ME.vm.form.typeIcon = UBIT.getImgSrc('tagTypes', ME.vm.form.type.icon);
                }else{
                    this.have=false;
                }
            },
            
            projTagUpdateMore:function(){
                var rows = this.selectprojTag();
                if(!rows) return;
                if(rows.length<1){
                     this.$alert(lang['projTagUpdateMoreNote'], lang['prompt'], {
                        confirmButtonText: lang['confirm']
                    });
                    return false;
                }

                this.dialogUpdateMoreFormVisible = true;
                this.updateMoreForm.title = lang['projTagUpdateMoreTitle'];
                UBIT.deepCopy(rows[0],ME.vm.updateMoreForm,1);
                var codes=[];
                var ids=[];
                for(var i=0;i<rows.length;i++){
                    var item =rows[i];
                    codes.push(item.code);
                    ids.push(item.id);

                }
                if(!parseFloat(this.isUpdateHeartNum)){
                    ME.vm.updateMoreForm.minHeart='';
                    ME.vm.updateMoreForm.maxHeart='';
                }
                this.updateMoreForm.codes=codes.join(',');
                this.updateMoreForm.ids=ids;
                
                if(ME.vm.updateMoreForm.type){
                        ME.vm.updateMoreForm.typeIcon = UBIT.getImgSrc('tagTypes', ME.vm.updateMoreForm.type.icon);
                }else{
                    this.have=false;
                }
            },
            submitForm:function (formName) {
                this.$refs[formName].validate(function(valid){
                  if (valid) {
                      var url='';
                      var msg='';
                      var params={};
                      var whoShow='';
                      switch(formName){
                          case 'form':
                              url = 'project/tag/save';
                              msg = (ME.vm.form.id>0?lang['update']:'添加');
                              params=ME.vm.form;
                              whoShow='dialogFormVisible';
                              break;
                          case 'updateMoreForm':
                              url = 'project/tag/saveMore';
                              msg+=lang['updateMore'];
                              params.ids=ME.vm.updateMoreForm.ids;
                              params.typeId=ME.vm.updateMoreForm.typeId;
                              params.catId=ME.vm.updateMoreForm.catId;
                              params.minHeart=ME.vm.updateMoreForm.minHeart;
                              params.maxHeart=ME.vm.updateMoreForm.maxHeart;
                              whoShow='dialogUpdateMoreFormVisible';
                              break;
                      }
                      ME.vm.$http.post(url, params).then(function(res){
                          var result = res.body;
                          if(result.isOk){
                              this.refresh();
                              this[whoShow] = false;
                              this.$alert(msg+lang['success'], lang['prompt']);
                          }else {
                              this.$alert(msg+lang['fail']+result.msg, lang['prompt'], {
                                  confirmButtonText: lang['confirm']
                              });
                          }
                          ME.vm.projTagBtnDisable = false;

                      });
                          ME.vm.projTagBtnDisable = true;

                  } else {
                    ME.vm.$alert(lang['enterError'], lang['prompt'], {
                      confirmButtonText: lang['confirm']
                    }); 
                    return false;
                  }
                })
              },
        },
    });

}
