package com.jeesite.modules.statiscs.web;

import com.jeesite.common.config.Global;
import com.jeesite.common.entity.Page;
import com.jeesite.common.lang.StringUtils;
import com.jeesite.common.utils.excel.ExcelExport;
import com.jeesite.common.web.BaseController;
import com.jeesite.modules.departmentrubbish.entity.DepartmentRubbish;
import com.jeesite.modules.statiscs.entity.InstitutionShangBaoNumExportEntity;
import com.jeesite.modules.statiscs.entity.OfficeRubbishTypeStatiscs;
import com.jeesite.modules.statiscs.entity.Statiscs;
import com.jeesite.modules.statiscs.service.StatiscsService;
import com.jeesite.modules.sys.dao.OfficeDao;
import com.jeesite.modules.sys.entity.Office;
import com.jeesite.modules.sys.utils.UserUtils;
import com.jeesite.modules.utils.DateUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
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

import static com.jeesite.common.web.BaseController.text;
import static com.jeesite.common.web.http.ServletUtils.renderResult;

/**
 * @Description: 统计  Controller
 * @Author Qiu
 * @Date 2021/1/11 12:20
 */
@Controller
@RequestMapping(value = "${adminPath}/statiscs")
public class StatiscsController extends BaseController {
    @Autowired
    private StatiscsService statiscsService;
    @Resource
    private OfficeDao officeDao;

    /**
     * 跳转机构统计
     *
     * @param
     * @return
     * @Author Qiu
     * @Date 2021-01-11 12:21
     */
    @RequestMapping(value = "institution")
    public String institution() {
        return "modules/statiscs/institution";
    }

    /**
     * 跳转分类统计
     *
     * @param
     * @return
     * @Author Qiu
     * @Date 2021-01-11 13:22
     */
    @RequestMapping(value = "classify")
    public String classify() {
        return "modules/statiscs/classify";
    }

    /**
     * 跳转告警统计
     *
     * @param
     * @return
     * @Author Qiu
     * @Date 2021-01-11 13:23
     */
    @RequestMapping(value = "alarm")
    public String alarm() {
        return "modules/statiscs/alarm";
    }

    /**
     * 机构统计
     *
     * @param
     * @return
     * @Author wang
     * @Date 2021-01-19 14:00
     */
    @RequestMapping(value = "institutionStatiscs")
    @ResponseBody
    public String institutionStatiscs(String startTime, String endTime) {
        String[] date = DateUtils.exportDate(startTime, endTime);
        Map<String, Object> statiscsMap = statiscsService.institutionStatiscs(date[0], date[1]);
        return renderResult(Global.TRUE, text(""), statiscsMap);
    }

    /**
     * 垃圾类型折线统计
     *
     * @param
     * @return
     * @Author wang
     * @Date 2021-01-21 14:00
     */
    @RequestMapping(value = "rubbishTypeStatiscsBroken")
    @ResponseBody
    public Map<String, Object> rubbishTypeStatiscsBroken(String startTime, String endTime) {
        String[] date = DateUtils.exportDate(startTime, endTime);
        List<Statiscs> statiscsList = statiscsService.rubbishTypeStatiscsBroken(date[0], date[1]);
        //传播型重量
        List<Double> infectedWeightList = new ArrayList<>();
        //感染型重量
        List<Double> contagionWeightList = new ArrayList<>();
        //病理型重量
        List<Double> pathologyWeightList = new ArrayList<>();
        //损伤型重量
        List<Double> damageWeightList = new ArrayList<>();
        //药物型重量
        List<Double> medicineWeightList = new ArrayList<>();
        //日期
        List<String> dateList = new ArrayList<>();
        for (int i = 0; i < statiscsList.size(); i++) {
            infectedWeightList.add(statiscsList.get(i).getInfectedWeight());
            contagionWeightList.add(statiscsList.get(i).getContagionWeight());
            pathologyWeightList.add(statiscsList.get(i).getPathologyWeight());
            damageWeightList.add(statiscsList.get(i).getDamageWeight());
            medicineWeightList.add(statiscsList.get(i).getMedicineWeight());
            dateList.add(statiscsList.get(i).getStatiscsDate());
        }
        //添加map
        Map<String, Object> map = new HashMap<>();
        //重量
        map.put("infected", infectedWeightList);
        map.put("contagion", contagionWeightList);
        map.put("pathology", pathologyWeightList);
        map.put("damage", damageWeightList);
        map.put("medicine", medicineWeightList);
        map.put("date", dateList);
        return map;
    }

    /**
     * 垃圾类型统计
     *
     * @param
     * @return
     * @Author wang
     * @Date 2021-01-19 16:00
     */
    @RequestMapping(value = "rubbishTypeStatiscs")
    @ResponseBody
    public String rubbishTypeStatiscs(String startTime, String endTime) {
        String[] date = DateUtils.exportDate(startTime, endTime);
        Map<String, Object> statiscsMap = statiscsService.rubbishTypeStatiscs(date[0], date[1]);
        return renderResult(Global.TRUE, text(""), statiscsMap);
    }

    /**
     * 告警统计
     *
     * @param
     * @return
     * @Author wang
     * @Date 2021-01-19 16:00
     */
    @RequestMapping(value = "alarmStatiscs")
    @ResponseBody
    public String alarmStatiscs(String startTime, String endTime) {
        String[] date = DateUtils.exportDate(startTime, endTime);
        Map<String, Object> statiscsMap = statiscsService.alarmStatiscs(date[0], date[1]);
        return renderResult(Global.TRUE, text(""), statiscsMap);
    }

    /**
     * 垃圾类型折线统计
     *
     * @param
     * @return
     * @Author wang
     * @Date 2021-01-21 14:00
     */
    @RequestMapping(value = "alarmStatiscsBroken")
    @ResponseBody
    public Map<String, Object> alarmStatiscsBroken(String startTime, String endTime) {
        String[] date = DateUtils.exportDate(startTime, endTime);
        List<Statiscs> statiscsList = statiscsService.alarmStatiscsBroken(date[0], date[1]);
        //数量
        List<Integer> countList = new ArrayList<>();
        //日期
        List<String> dateList = new ArrayList<>();
        for (int i = 0; i < statiscsList.size(); i++) {
            countList.add(statiscsList.get(i).getNum());
            dateList.add(statiscsList.get(i).getStatiscsDate());
        }
        //添加map
        Map<String, Object> map = new HashMap<>();
        //重量
        map.put("num", countList);
        map.put("date", dateList);
        return map;
    }

    /**
     * 跳转当日统计
     *
     * @param
     * @return
     * @Author Wang
     * @Date 2021-03-09
     */
    @RequestMapping(value = "todayStatiscs")
    public String todayStatiscs(Statiscs statiscs, Model model) {
        model.addAttribute("statiscs", statiscs);
        return "modules/statiscs/todayStatiscs";
    }

    /**
     * 当日统计
     *
     * @param
     * @return
     * @Author wang
     * @Date 2021-03-08
     */
    @RequestMapping(value = "todayStatiscsList")
    @ResponseBody
    public List<Statiscs> todayStatiscsList(Statiscs statiscs, HttpServletRequest request, HttpServletResponse response) {

        Integer treeLevel = 0;
        if (StringUtils.isBlank(statiscs.getParentCode())) {
            statiscs.setParentCode("0");
        }

        if (StringUtils.isNotBlank(statiscs.getInstitutionCode()) || StringUtils.isNotBlank(statiscs.getInstitutionName())) {
            statiscs.setParentCode((String) null);
        }

        Office office = new Office();
        office.setOfficeCode(statiscs.getParentCode());
        Office newoffice = officeDao.getByEntity(office);

        if (newoffice != null && newoffice.getTreeLevel()==1) {
            treeLevel = 3;
        }
        //获取统计结果
        List<Statiscs> list = statiscsService.todayStatiscs(statiscs, treeLevel);
        //返回统计结果
        return list;
    }

    /**
     * 跳转本周统计
     *
     * @param
     * @return
     * @Author Wang
     * @Date 2021-03-09
     */
    @RequestMapping(value = "weekStatiscs")
    public String weekStatiscs(Statiscs statiscs, Model model) {
        model.addAttribute("statiscs", statiscs);
        return "modules/statiscs/weekStatiscs";
    }

    /**
     * 本周统计
     *
     * @param
     * @return
     * @Author wang
     * @Date 2021-03-08
     */
    @RequestMapping(value = "weekStatiscsList")
    @ResponseBody
    public List<Statiscs> weekStatiscsList(String startTime, String endTime, Statiscs statiscs, HttpServletRequest request, HttpServletResponse response) {

        Integer treeLevel = 0;
        if (StringUtils.isBlank(statiscs.getParentCode())) {
            statiscs.setParentCode("0");
        }

        if (StringUtils.isNotBlank(statiscs.getInstitutionCode()) || StringUtils.isNotBlank(statiscs.getInstitutionName())) {
            statiscs.setParentCode((String) null);
        }

        Office office = new Office();
        office.setOfficeCode(statiscs.getParentCode());
        Office newoffice = officeDao.getByEntity(office);

        if (newoffice != null && newoffice.getTreeLevel()==1) {
            treeLevel = 3;
        }
        //获取统计结果
        List<Statiscs> list = statiscsService.weekStatiscs(statiscs, treeLevel, startTime, endTime);
        //返回统计结果
        return list;
    }

    /**
     * 跳转近30天统计
     *
     * @param
     * @return
     * @Author Wang
     * @Date 2021-03-09
     */
    @RequestMapping(value = "mouthStatiscs")
    public String mouthStatiscs(Statiscs statiscs, Model model) {
        model.addAttribute("statiscs", statiscs);
        return "modules/statiscs/mouthStatiscs";
    }


    /**
     * 本月统计
     *
     * @param
     * @return
     * @Author wang
     * @Date 2021-03-08
     */
    @RequestMapping(value = "mouthStatiscsList")
    @ResponseBody
    public List<Statiscs> mouthStatiscsList(String startTime, String endTime, Statiscs statiscs, HttpServletRequest request, HttpServletResponse response) {

        Integer treeLevel = 0;
        if (StringUtils.isBlank(statiscs.getParentCode())) {
            statiscs.setParentCode("0");
        }

        if (StringUtils.isNotBlank(statiscs.getInstitutionCode()) || StringUtils.isNotBlank(statiscs.getInstitutionName())) {
            statiscs.setParentCode((String) null);
        }

        Office office = new Office();
        office.setOfficeCode(statiscs.getParentCode());
        Office newoffice = officeDao.getByEntity(office);

        if (newoffice != null && newoffice.getTreeLevel()==1) {
            treeLevel = 3;
        }

        //获取统计结果
        List<Statiscs> list = statiscsService.mouthStatiscs(statiscs, treeLevel, startTime, endTime);
        //返回统计结果
        return list;
    }

    /**
     * @Description: 本月统计数据导出
     * @Author: wang
     */
    @RequestMapping({"exportMouth"})
    public void exportDataString(String startTime, String endTime, Statiscs statiscs, HttpServletRequest request, HttpServletResponse response) {
        Integer treeLevel = 0;
        if (StringUtils.isBlank(statiscs.getParentCode())) {
            statiscs.setParentCode("0");
        } else {
            treeLevel = -1;
        }

        if (StringUtils.isNotBlank(statiscs.getInstitutionCode()) || StringUtils.isNotBlank(statiscs.getInstitutionName())) {
            statiscs.setParentCode((String) null);
        }
        //获取统计结果
        List<Statiscs> list = statiscsService.statiscsExport(statiscs, treeLevel, startTime, endTime);

        String fileName = "废弃物概况统计信息" + com.jeesite.common.lang.DateUtils.getDate("yyyyMMdd") + ".xlsx";
        ExcelExport ee = new ExcelExport("废弃物概况统计信息(" + startTime + " - " + endTime + ")", Statiscs.class);
        Throwable var8 = null;
        try {
            ee.setDataList(list).write(response, fileName);
        } catch (Throwable var17) {
            var8 = var17;
            throw var17;
        } finally {
            if (ee != null) {
                if (var8 != null) {
                    try {
                        ee.close();
                    } catch (Throwable var16) {
                        var8.addSuppressed(var16);
                    }
                } else {
                    ee.close();
                }
            }
        }
    }

    /**
     * 机构分类重量统计页面跳转
     *
     * @author wang
     * @version 2021-03-17
     */
    @RequestMapping(value = "officeTypeWeightStatiscs")
    public String officeTypeWeightStatiscs(Statiscs statiscs, Model model) {
        model.addAttribute("statiscs", statiscs);
        return "modules/statiscs/officeTypeWeightStatiscs";
    }




    /**
     * 机构分类重量统计
     *
     * @author wang
     * @version 2021-03-17
     */
    @RequestMapping(value = "officeTypeWeightStatiscsList")
    @ResponseBody
    public List<OfficeRubbishTypeStatiscs> officeTypeWeightStatiscsList(String startTime, String endTime, Statiscs statiscs, HttpServletRequest request, HttpServletResponse response) {

        Integer treeLevel = 0;
        if (StringUtils.isBlank(statiscs.getParentCode())) {
            statiscs.setParentCode("0");
        }

        if (StringUtils.isNotBlank(statiscs.getInstitutionCode()) || StringUtils.isNotBlank(statiscs.getInstitutionName())) {
            statiscs.setParentCode((String) null);
        }

        Office office = new Office();
        office.setOfficeCode(statiscs.getParentCode());
        Office newoffice = officeDao.getByEntity(office);

        if (newoffice != null && newoffice.getTreeLevel()==1) {
            treeLevel = 3;
        }
        //获取统计结果
        List<OfficeRubbishTypeStatiscs> list = statiscsService.officeTypeWeightStatiscs(statiscs, startTime, endTime, treeLevel);
        //返回统计结果
        return list;
    }

    /**
     * @Description: 机构分类重量统计数据导出
     * @Author: wang
     */
    @RequestMapping({"exportOfficeTypeWeightStatiscsList"})
    public void exportOfficeTypeWeightStatiscsList(String startTime, String endTime, Statiscs statiscs, HttpServletRequest request, HttpServletResponse response) {

        //获取统计结果
        List<OfficeRubbishTypeStatiscs> list = statiscsService.officeTypeWeightStatiscsExport(statiscs, startTime, endTime);

        String fileName = "机构废弃物分类统计信息" + com.jeesite.common.lang.DateUtils.getDate("yyyyMMdd") + ".xlsx";
        ExcelExport ee = new ExcelExport("机构废弃物分类统计信息(" + startTime + " - " + endTime + ")", OfficeRubbishTypeStatiscs.class);
        Throwable var8 = null;
        try {
            ee.setDataList(list).write(response, fileName);
        } catch (Throwable var17) {
            var8 = var17;
            throw var17;
        } finally {
            if (ee != null) {
                if (var8 != null) {
                    try {
                        ee.close();
                    } catch (Throwable var16) {
                        var8.addSuppressed(var16);
                    }
                } else {
                    ee.close();
                }
            }
        }
    }


    @RequestMapping(value = "overwriteListDataStatiscs")
    @ResponseBody
    public Statiscs overwriteListData(DepartmentRubbish departmentRubbish, String startTime, String endTime) {
        departmentRubbish.setCreateBy(UserUtils.getUser().getUserCode());
        Statiscs statiscs = statiscsService.rubbishStatiscs(departmentRubbish, startTime, endTime);
        return statiscs;
    }

    //跳转待回收明细页面
    @RequestMapping(value = "institutionShangBaoNumList")
    public String institutionShangBaoNumList(Statiscs statiscs, Model model) {
        model.addAttribute("statiscs", statiscs);
        return "modules/statiscs/institutionShangBaoNum";
    }

    //待回收明细列表
    @RequestMapping(value = "institutionShangBaoNum")
    @ResponseBody
    public List<Statiscs> institutionShangBaoNum(String startTime, String endTime, Statiscs statiscs, HttpServletRequest request, HttpServletResponse response) {

        Integer treeLevel = 0;
        if (StringUtils.isBlank(statiscs.getParentCode())) {
            statiscs.setParentCode("0");
        } else {
            treeLevel = -1;
        }

        if (StringUtils.isNotBlank(statiscs.getInstitutionCode()) || StringUtils.isNotBlank(statiscs.getInstitutionName())) {
            statiscs.setParentCode((String) null);
        }
        //获取统计结果
        List<Statiscs> list = statiscsService.institutionShangBaoNum(statiscs, treeLevel, startTime, endTime);
        //返回统计结果
        return list;
    }

    //待回收明细导出
    @RequestMapping(value = "institutionShangBaoNumExport")
    @ResponseBody
    public void institutionShangBaoNumExport(String startTime, String endTime, Statiscs statiscs, HttpServletRequest request, HttpServletResponse response) {

        //获取导出结果
        List<InstitutionShangBaoNumExportEntity> list = statiscsService.institutionShangBaoNumExport(statiscs, startTime, endTime);

        String fileName = statiscs.getInstitutionName() + "待回收明细" + com.jeesite.common.lang.DateUtils.getDate("yyyyMMdd") + ".xlsx";
        ExcelExport ee = new ExcelExport(statiscs.getInstitutionName() + "待回收明细(" + startTime + " - " + endTime + ")", InstitutionShangBaoNumExportEntity.class);
        Throwable var8 = null;
        try {
            ee.setDataList(list).write(response, fileName);
        } catch (Throwable var17) {
            var8 = var17;
            throw var17;
        } finally {
            if (ee != null) {
                if (var8 != null) {
                    try {
                        ee.close();
                    } catch (Throwable var16) {
                        var8.addSuppressed(var16);
                    }
                } else {
                    ee.close();
                }
            }
        }
    }
    
}
