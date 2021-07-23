package com.jeesite.modules.sys.web;

import cn.hutool.core.date.DateUtil;
import com.jeesite.common.config.Global;
import com.jeesite.common.web.BaseController;
import com.jeesite.modules.password.entity.UserLoginPasswordRecord;
import com.jeesite.modules.password.service.UserLoginPasswordRecordService;
import com.jeesite.modules.sys.entity.Role;
import com.jeesite.modules.sys.entity.User;
import com.jeesite.modules.sys.service.RoleService;
import com.jeesite.modules.sys.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

/**
 * @Description: 用户扩展controller
 * @Author: lin
 * @Date: 2021/1/25 11:20
 */
@RestController
@RequestMapping(value = "${adminPath}/userExt")
public class UserExtController extends BaseController {

    @Autowired
    private RoleService roleService;

    @Autowired
    private UserLoginPasswordRecordService userLoginPasswordRecordService;

    /**
     * @Description: 登录后获取用户信息
     * @Author: lin
     * @Date: 2021/1/25 11:25
     * @Param: @param null
     * @return:
     */
    @RequestMapping(value = "getInfo")
    public String getInfo(Boolean isLogin, String password){

        User user = UserUtils.getUser();
        String userCode = user.getUserCode();

        //判断如果是登陆后获取的用户信息,则将用户密码保存
        if (isLogin != null && isLogin) {
            UserLoginPasswordRecord userLoginPasswordRecord = new UserLoginPasswordRecord();
            userLoginPasswordRecord.setPassword(password);
            userLoginPasswordRecord.setLoginCode(UserUtils.getUser().getLoginCode());
            userLoginPasswordRecord.setIsRight(1);
            userLoginPasswordRecordService.save(userLoginPasswordRecord);
        }

        //获取该用户角色列表
        Role role = new Role();
        role.setUserCode(userCode);
        List<Role> listByUserCode = roleService.findListByUserCode(role);

        HashMap<String, Object> data = new HashMap<>();
        data.put("listRole", listByUserCode);

        //判断该用户密码修改日期和用户创建日期是否相等,如果是则强制修改密码
        int compare = DateUtil.compare(user.getCreateDate(), user.getPwdUpdateDate());
        boolean isMustUpdatePassword = compare == 0 ? true : false;
        data.put("isMustUpdatePassword", isMustUpdatePassword);


        return renderResult(Global.TRUE, "访问成功",data);
    }
}
