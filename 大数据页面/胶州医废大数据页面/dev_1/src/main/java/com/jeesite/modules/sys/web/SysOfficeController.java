package com.jeesite.modules.sys.web;

import com.jeesite.common.config.Global;
import com.jeesite.common.web.BaseController;
import com.jeesite.modules.sys.entity.EmployeePost;
import com.jeesite.modules.sys.entity.Office;
import com.jeesite.modules.sys.service.SysOfficeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

/**
 * @Description: 机构控制器
 * @Author: wang
 * @Date: 2021/1/19 9:57
 */
@RestController
@RequestMapping(value = "${adminPath}/officePost")
public class SysOfficeController extends BaseController {
    @Autowired
    private SysOfficeService officeService;

    /**
     * @Description: 获取机构
     * @Author: wang
     * @Date: 2021/1/19 10:00
     * @Param: @param null
     * @return:
     */
    @RequestMapping(value = "lisetOffice")
    public String lisetOffice(String parentCode,String officeName){

        List<String> offices = officeService.lisetOffice(parentCode,officeName);
        return renderResult(Global.TRUE, "访问成功",offices);

    }
}
