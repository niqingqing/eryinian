package com.jeesite.modules.sys.web;

import com.jeesite.common.config.Global;
import com.jeesite.common.web.BaseController;
import com.jeesite.modules.sys.entity.EmployeePost;
import com.jeesite.modules.sys.service.EmployeePostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

/**
 * @Description: 员工岗位控制器
 * @Author: lin
 * @Date: 2021/1/13 19:57
 */
@RestController
@RequestMapping(value = "${adminPath}/employeePost")
public class EmployeePostController extends BaseController {


    @Autowired
    private EmployeePostService employeePostService;
    /**
     * @Description: 获取当前用户岗位
     * @Author: lin
     * @Date: 2021/1/13 20:00
     * @Param: @param null
     * @return:
     */
    @RequestMapping(value = "listUserPost")
    public String getUserPost(){

        List<EmployeePost> userPost = employeePostService.getUserPost();

        HashMap<String, Object> data = new HashMap<>();
        data.put("listPost", userPost);
        return renderResult(Global.TRUE, "访问成功",data);

    }

}
