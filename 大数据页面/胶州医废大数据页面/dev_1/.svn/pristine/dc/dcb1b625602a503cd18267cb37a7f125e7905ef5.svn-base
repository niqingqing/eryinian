package com.jeesite.modules.statiscs.web;

import com.jeesite.common.config.Global;
import com.jeesite.common.entity.Page;
import com.jeesite.common.lang.StringUtils;
import com.jeesite.common.utils.excel.ExcelExport;
import com.jeesite.common.web.BaseController;
import com.jeesite.modules.departmentrubbish.entity.DepartmentRubbish;
import com.jeesite.modules.departmentrubbish.service.DepartmentRubbishService;
import com.jeesite.modules.statiscs.entity.InstitutionShangBaoNumExportEntity;
import com.jeesite.modules.statiscs.entity.OfficeRubbishTypeStatiscs;
import com.jeesite.modules.statiscs.entity.Statiscs;
import com.jeesite.modules.statiscs.service.StatiscsService;
import com.jeesite.modules.sys.dao.OfficeDao;
import com.jeesite.modules.sys.entity.Office;
import com.jeesite.modules.sys.utils.UserUtils;
import com.jeesite.modules.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Description: 统计  Controller
 * @Author Qiu
 * @Date 2021/1/11 12:20
 */
@Controller
@RequestMapping(value = "/statiscs")
public class BigdataController extends BaseController {
    @Autowired
    private StatiscsService statiscsService;
    @Autowired
    private DepartmentRubbishService departmentRubbishService;

    @RequestMapping(value = "statiscs")
    public String statiscs(Statiscs statiscs, Model model) {
        model.addAttribute("statiscs", statiscs);
        return "modules/bigData/index";
    }

    /**
     * 大屏概况
     *
     * @author wang
     * @version 2021-04-29
     */
    @RequestMapping(value = "overviewScreen")
    @ResponseBody
    public Statiscs overviewScreen(String type) {
        //获取统计结果
        Statiscs statiscs = statiscsService.overviewScreen(type);
        //返回统计结果
        return statiscs;
    }

    /**
     * 大屏概况
     *
     * @author wang
     * @version 2021-04-29
     */
    @RequestMapping(value = "typePercentage")
    @ResponseBody
    public Statiscs typePercentage() {
        //获取统计结果
        Statiscs statiscs = statiscsService.typePercentage();
        //返回统计结果
        return statiscs;
    }

    /**
     * 大屏概况,右部分
     *
     * @author wang
     * @version 2021-04-29
     */
    @RequestMapping(value = "zzzstatiscsWeightList")
    @ResponseBody
    public List<Statiscs> zzzstatiscsWeightList(String type) {
        //获取统计结果
        List<Statiscs> list = statiscsService.zzzstatiscsWeightList(type);
        //返回统计结果
        return list;
    }

    /**
     * 大屏概况,年总结
     *
     * @author wang
     * @version 2021-04-29
     */
    @RequestMapping(value = "annualSummary")
    @ResponseBody
    public List<Statiscs> annualSummary(String type) {
        //获取统计结果
        List<Statiscs> list = statiscsService.annualSummary();
        //返回统计结果
        return list;
    }

    @RequestMapping(value = "listData")
    @ResponseBody
    public Page<DepartmentRubbish> overwriteListData(DepartmentRubbish departmentRubbish, HttpServletRequest request, HttpServletResponse response,
                                                     String startTime, String endTime) {
        departmentRubbish.setPage(new Page<DepartmentRubbish>(request, response));
        departmentRubbish.setCreateBy(UserUtils.getUser().getUserCode());
        Page<DepartmentRubbish> page = departmentRubbishService.findPageListBigData(new Page<DepartmentRubbish>(request, response), departmentRubbish,startTime,endTime);
        return page;
    }
}
