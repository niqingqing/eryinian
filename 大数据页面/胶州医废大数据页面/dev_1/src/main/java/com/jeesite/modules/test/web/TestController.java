package com.jeesite.modules.test.web;

import com.jeesite.modules.test.entity.TestData;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Description: TODO
 * @Author: lin
 * @Date: 2021/1/18 15:42
 */
@Controller
@RequestMapping(value = "/test1")
public class TestController {

    @RequestMapping(value = "form")
    public String form(TestData testData, Model model) {
        model.addAttribute("testData", testData);
        return "modules/test/testDataForm1";
    }
}
