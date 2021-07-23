package com.jeesite.modules.sys.web;

import com.jeesite.common.config.Global;
import com.jeesite.common.web.BaseController;
import com.jeesite.modules.sys.entity.Role;
import com.jeesite.modules.sys.service.RoleService;
import com.jeesite.modules.sys.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

/**
 * @Description: 用户角色
 * @Author: lin
 * @Date: 2021/1/16 17:18
 */
@RestController
@RequestMapping(value = "${adminPath}/userRole")
public class UserRoleController extends BaseController {

    @Autowired
    private RoleService roleService;

    /**
     * @Description: 获取用户角色
     * @Author: lin
     * @Date: 2021/1/16 17:19
     * @Param: @param null
     * @return:
     */
    @RequestMapping(value = "listByUserCode")
    public String listByUserCode(){

        String userCode = UserUtils.getUser().getUserCode();
        Role role = new Role();
        role.setUserCode(userCode);
        List<Role> listByUserCode = roleService.findListByUserCode(role);


        HashMap<String, Object> data = new HashMap<>();
        data.put("listRole", listByUserCode);
        return renderResult(Global.TRUE, "访问成功",data);


    }
}
