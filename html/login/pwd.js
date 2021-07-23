

$(function(){
    init();
});

function init(){
    vueInit();
    pageInit();
}

function pageInit(){
    $('#nextOne').click(function () {
        if(!$('#phone').val() || !$('#pCode').val()) {
            ME.vm.show('请输入手机号和验证码');
            return false;
        }
        //todo

        $('.choose .list_len').eq(1).addClass('active');
        $('.box .box_text').eq(1).addClass('active');
        $('#phone_form').css('display','none');
        $('#new_pwd_form').css('display','block');
    });

    $('#nextTwo').click(function () {
        if(!$('#newPwd').val() || !$('#againPwd').val()) {
            ME.vm.show('请输入新的密码和再次输入密码');
            return false;
        }
        if($('#newPwd').val() != $('#againPwd').val()) {
            ME.vm.show('两次密码不一致');
            return false;
        }
        //todo

        $('.choose .list_len').eq(-1).addClass('active');
        $('.box .box_text').eq(-1).addClass('active');
        $('#phone_form').css('display','none');
        $('#new_pwd_form').css('display','none');
        $('#success').css('display','block');
    });
}

function vueInit(){
    ME.vm = new Vue({
        el:'#wrapper',
        data:{
            anti_CSRF_token:parseInt(Math.random()*10000)+'A_A'+Date.now()
        },
        created :function () {
        },
        methods:{
            show :function (msg) {
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'error'
                });
            },

             upperCase: function() {
                var phone = document.getElementById('phone').value;
                if(!(/^1[34578]\d{9}$/.test(phone))){
                    this.show("手机号码有误，请重填");
                    return false;
                }
            },

             pCode: function() {
                var phoneCode = document.getElementById('pCode').value;
                console.log(phoneCode)
                if(!phoneCode) {
                    this.show('请输入验证码');
                    return false;
                }
            },

             newEmpty: function() {
                var newPwd = document.getElementById('newPwd').value;
                if(!newPwd) {
                    this.show('请输入新密码')
                    return false;
                }
            },

             againEmpty: function() {
                var againPwd = document.getElementById('againPwd').value;
                if(!againPwd) {
                    this.show('请输入再次输入密码')
                    return false;
                }
            }


        }
    })
}
