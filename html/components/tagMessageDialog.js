var tagMessageDialog = {
    template: `
        <el-dialog
                class="tagmessage"
				title="消息"
				:visible.sync="messageboxvisible"
				width="30%"
				:modal='modal'
				:before-close="hideMessageBox">

				<el-input type="textarea" :rows="4" v-model="tagMessage" ></el-input>

			<div style="color:red;text-align: center;">
				{{messageErr}}
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" :loading="isSending" size="small" @click="sendMessage">发送</el-button>
			</span>
		</el-dialog>
    `,
    data: function () {
        return{
            // messageBoxVisible:true,
            tagMessage:'',
            isSending:false,
            messageErr:'',
        }
    },
    props:{
        tagcodes:{
            type: Array,
            default: () => []
            // type:String,
        },
        tagobjarray:{
            type: Array,
            default: () => []
            // type:String,
        },
        modal:{
            type:Boolean,
            default:true,
        },
        messageboxvisible:{
            type:Boolean,
            default:false,
        },
        tagcategory:{
            type:String,
            default: ''
        },
    },
    methods:{
        hideMessageBox:function () {
            this.$emit('update:messageboxvisible', false);
            // this.messageboxvisible = false;
        },
        showMessageBox:function () {
            this.messageboxvisible = true;
        },

        getByteLen:function (val) {
            var len = 0;
            for (var i = 0; i < val.length; i++) {
                var a = val.charAt(i);
                if (a.match(/[^\x00-\xff]/ig) != null)
                {
                    len += 2;
                }
                else
                {
                    len += 1;
                }
            }
            return len;
        },
        filterOfflines:function (tagObjArray) {
            var obj={
                codes:[],
                errMsg:''
            }
            var rows = tagObjArray;
            for(var i=0;i<rows.length;i++){
                var r = rows[i];
                if(r.status != 'online'){
                    // ME.vm.$alert(lang['tag']+"“"+r.code+"”"+lang['statusError']+"!", lang['prompt']);
                    // return false;
                    obj.errMsg+=lang['tag']+"“"+r.code+"”"+lang['statusError']+"!";
                    continue;
                }else{
                    obj.codes.push(rows[i].code)
                }
            }
            return obj;
        },
        getOnlineTagCodes:function (tagObjArray) {
            var obj = this.filterOfflines(tagObjArray);
            return obj;
        },
        sendMessage:function () {
            var that =this;
            if(this.tagobjarray.length>0){
                var obj = this.getOnlineTagCodes(this.tagobjarray);
                var codes = obj.codes;
                this.toSendMessage(codes);
            }else if(this.tagcategory){
                this.getTagAndSendMsg(this.tagcategory)
            }else if(this.tagcodes.length>0){
                this.toSendMessage(this.tagcodes);
            }
        },
        getTagAndSendMsg:function (category) {
            var that =this;
            var url = ME.host+'/project/tag/list';
            that.isSending = true;
            ME.vm.$http.get(url).then(function(res){
                that.isSending = false;
                var result = res.body;
                var tagobjarray = [];
                for(var i=0;i<result.length;i++){
                    if(result[i].catId == category){
                        tagobjarray.push(result[i]);
                    }
                }
                var obj = that.getOnlineTagCodes(tagobjarray);
                var codes = obj.codes;
                that.toSendMessage(codes);
            });
        },
        toSendMessage:function (codes) {
            var that =this;
            var message = this.tagMessage||'';
            var length = this.getByteLen(message);
            if(!codes || codes.length<1) {
                ME.vm.$alert('无在线标签', lang['prompt']);
                return;
            }
            if(!message||(length>70)){
                this.$alert('消息不得为空且不得大于70个英文或者35个中文！', '提示', {
                    confirmButtonText: '确定'
                });
                return
            }
            this.$confirm("确认发送？","提示",{ }).then(function()  {
                ME.vm.$http.post('super/tag/sendMessage', {codes:codes,message:message}).then(function(res){
                    that.response(res.body, codes, "发送消息",false);
                    that.isSending = false;
                });
                that.isSending = true;
            }).catch(function(){
            });
        },
        response:function (r, codes, title, isFresh) {
            if(r.hasOwnProperty('isOk')){
                ME.vm.$alert(r.msg, '提示');
                return;
            }
            if(r.successful.length == codes.length){
                if(isFresh)ME.vm.refresh();
                ME.vm.$alert(title + "成功！", '提示');
                return;
            }
            if(r.successful.length == 0){
                var text = '';
                for(var f of r.failed){
                    if(f.tag){
                        text += f.tag+f.msg+';';
                    }else{
                        text += f.msg+';';
                    }
                }
                ME.vm.$alert(text, '提示');//title + "全部失败！" +
                return;
            }
            var text = '成功：';
            for(var s of r.successful){
                text += ''+s.tag+';';
            }
            ME.vm.$alert(text, '提示');
        },
    }
}