/**
 * Created by luozuzhu 2018年06月02日17:34:21
 */


$(function(){
    init();
    var arr = [
        {
            name:"进入后台",
            icon_url:''
        },
        {
            name:'超级管理员',
            icon_url:''
        },
        {
            name:"实验平台",
            icon_url:''
        },
        {
            name:'基站校准',
            icon_url:''
        },
        {
            name:'退出登录',
            icon_url:''
        }
    ]
    var tag_list = [
        {
            number:361,
            icon_url:""
        },
        {
            number:3,
            icon_url:""
        },
        {
            number:1,
            icon_url:""
        },
        {
            number:2,
            icon_url:""
        },
        {
            number:3,
            icon_url:""
        },
        {
            number:1,
            icon_url:""
        },
        {
            number:1,
            icon_url:""
        },
        {
            number:13,
            icon_url:""
        },
        {
            number:53,
            icon_url:""
        },
        {
            number:1,
            icon_url:""
        }
    ]
    header.set_data();
    header.user_table.create_login_table(arr);
    header.tag_list.create_tag_list(tag_list);

    menu.create_menu_list();
    // menu.set_menu_hide();
    setTimeout(function(){
        // menu.set_menu_hide();
    },1000)
    // mask.create_message('测试','通知测试');
    /**
     * 
     */
    $('html').click(function(){
        var header_user_table_display = $('.header-user-table').css('display');
        var header_tag_list_display = $('.header-tag-list').css('display');
        if(header_user_table_display !== 'none' || header_tag_list_display !== 'none'){
            $('.header-user-table').css('display','none');
            $('.header-tag-list').css('display','none');
        }
    })
})

function init(){
    user.init();//1.获取用户数据,并挂在user.info中
}