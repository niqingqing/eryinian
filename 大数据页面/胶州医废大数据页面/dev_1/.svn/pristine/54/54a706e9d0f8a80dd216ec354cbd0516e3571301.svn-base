/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.departmentrubbish.web;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jeesite.common.config.Global;
import com.jeesite.common.entity.Page;
import com.jeesite.common.lang.StringUtils;
import com.jeesite.common.mybatis.mapper.query.QueryType;
import com.jeesite.common.utils.excel.ExcelExport;
import com.jeesite.common.web.BaseController;
import com.jeesite.modules.departmentrubbish.entity.DepartmentRubbish;
import com.jeesite.modules.departmentrubbish.entity.RubbishReportVO;
import com.jeesite.modules.departmentrubbish.service.DepartmentRubbishService;
import com.jeesite.modules.rubbishalarm.dao.WasteAlarmDao;
import com.jeesite.modules.statiscs.entity.OfficeRubbishTypeStatiscs;
import com.jeesite.modules.statiscs.entity.Statiscs;
import com.jeesite.modules.sys.dao.OfficeDao;
import com.jeesite.modules.sys.entity.Office;
import com.jeesite.modules.sys.entity.User;
import com.jeesite.modules.sys.utils.UserUtils;
import com.jeesite.modules.utils.FirstSpellUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 科室垃圾表Controller
 *
 * @author Qiu
 * @version 2021-01-11
 */
@Transactional
@Controller
@RequestMapping(value = "${adminPath}/departmentRubbish")
public class DepartmentRubbishController extends BaseController {

    @Autowired
    private DepartmentRubbishService departmentRubbishService;


    @Resource
    private WasteAlarmDao wasteAlarmDao;
    @Resource
    private OfficeDao officeDao;


    /**
     * 获取数据
     */
    @ModelAttribute
    public DepartmentRubbish get(String id, boolean isNewRecord) {
        return departmentRubbishService.get(id, isNewRecord);
    }

    /**
     * 查询列表
     */
    //@RequiresPermissions("departmentrubbish:departmentRubbish:view")
    @RequestMapping(value = {"list", ""})
    public String list(DepartmentRubbish departmentRubbish, Model model) {
        model.addAttribute("departmentRubbish", departmentRubbish);
        return "modules/departmentrubbish/departmentRubbishList";
    }

    /**
     * 查询列表数据
     */
    //@RequiresPermissions("departmentrubbish:departmentRubbish:view")
    @RequestMapping(value = "listData")
    @ResponseBody
    public Page<DepartmentRubbish> listData(DepartmentRubbish departmentRubbish, HttpServletRequest request, HttpServletResponse response) {
        Page<DepartmentRubbish> page = departmentRubbishService.findPage(new Page<DepartmentRubbish>(request, response), departmentRubbish);
        return page;
    }

    /**
     * 查看编辑表单
     */
    @RequiresPermissions("departmentrubbish:departmentRubbish:view")
    @RequestMapping(value = "form")
    public String form(DepartmentRubbish departmentRubbish, Model model) {
        model.addAttribute("departmentRubbish", departmentRubbish);
        return "modules/departmentrubbish/departmentRubbishForm";
    }
    /**
    * 跳转垃圾追溯详情页面
    *@Author Qiu
    *@Date 2021-01-19 10:09
    *@param
    *@return
    */
    @RequestMapping(value = "traceBackForm")
    public String traceBackForm(DepartmentRubbish departmentRubbish, Model model) {
        model.addAttribute("departmentRubbish", departmentRubbish);
        return "modules/departmentrubbish/traceBackForm";
    }

    /**
     * 保存科室垃圾表
     */
    //@RequiresPermissions("departmentrubbish:departmentRubbish:edit")
	/*@PostMapping(value = "save")
	@ResponseBody
	public String save(@Validated DepartmentRubbish departmentRubbish)  {
		departmentRubbishService.save(departmentRubbish);
		return renderResult(Global.TRUE, text("保存科室垃圾表成功！"));
	}*/

    @PostMapping(value = "save")
    public String save(String rubbishReportVO) {

        ObjectMapper objectMapper = new ObjectMapper();
        JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, RubbishReportVO.class);

        try {
            List<RubbishReportVO> list = objectMapper.readValue(rubbishReportVO, javaType);
            for (int i = 0; i < list.size(); i++) {

                DepartmentRubbish departmentRubbish = new DepartmentRubbish();

                String capitalInitial = FirstSpellUtils.cn2FirstSpell(list.get(i).getInstitution());//机构名称转换为大写首字母
                String replaceStr = list.get(i).getProduceStr().replace("-", "").replace(":", "").replace(" ","").trim();
                String serialNumber = replaceStr + capitalInitial + list.get(i).getSerialNumber();//序列号(时间+机构名称大写首字母+四位序列号)

                departmentRubbish.setSerialNumber(serialNumber);//垃圾序列号
                if(list.get(i).getRubbishType().contains("感染")){
                    departmentRubbish.setRubbishType("感染性");//垃圾类型
                }
                if(list.get(i).getRubbishType().contains("损伤")){
                    departmentRubbish.setRubbishType("损伤性");//垃圾类型
                }
                if(list.get(i).getRubbishType().contains("病理")){
                    departmentRubbish.setRubbishType("病理性");//垃圾类型
                }
                if(list.get(i).getRubbishType().contains("药物")){
                    departmentRubbish.setRubbishType("药物性");//垃圾类型
                }
                if(list.get(i).getRubbishType().contains("化学")){
                    departmentRubbish.setRubbishType("化学性");//垃圾类型
                }

                departmentRubbish.setInstitution(list.get(i).getInstitution());// 所属机构
                departmentRubbish.setProduceDate(list.get(i).getProduceDate());//封口日期
                departmentRubbish.setWeight(list.get(i).getWeight());//重量
                departmentRubbish.setTransportStatus("1");//状态
                departmentRubbish.setReportType("1");//上报来源
                departmentRubbish.setCreateBy(UserUtils.getUser().getUserCode());//当前用户
                departmentRubbish.setCreateDate(new Date());//当前时间
                departmentRubbish.setUpdateDate(new Date());

                departmentRubbishService.save(departmentRubbish);//保存

            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return renderResult(Global.TRUE, text("保存科室垃圾表成功！"));
    }

    /**
     * 删除科室垃圾表
     */
    @RequiresPermissions("departmentrubbish:departmentRubbish:edit")
    @RequestMapping(value = "delete")
    @ResponseBody
    public String delete(DepartmentRubbish departmentRubbish) {
        departmentRubbishService.delete(departmentRubbish);
        return renderResult(Global.TRUE, text("删除科室垃圾表成功！"));
    }

    /**
     * @Description: 删除废弃物信息
     * @Author: lin
     * @Date: 2021/1/29 15:39
     * @Param: @param null
     * @return:
     */
    @RequestMapping(value = "remove")
    @ResponseBody
    public String remove(DepartmentRubbish departmentRubbish) {
        User user = UserUtils.getUser();
        if (!user.isAdmin()) {
            departmentRubbish.setCreateBy(UserUtils.getUser().getUserCode());		//只允许删除当前用户自己创建的信息
        }

        departmentRubbish.setStatus("0");
        departmentRubbishService.remove(departmentRubbish);
        return renderResult(Global.TRUE, text("删除废弃物成功！"));
    }

    /**
     * 根据权限查询垃圾上报称重采集列表（wep端）
     *
     * @param
     * @return
     * @Author Qiu
     * @Date 2021-01-12 14:51
     */
    @RequestMapping(value = "overwriteListData")
    @ResponseBody
    public Page<DepartmentRubbish> overwriteListData(DepartmentRubbish departmentRubbish, HttpServletRequest request, HttpServletResponse response,
                                                     String startTime,String endTime) {
        departmentRubbish.setPage(new Page<DepartmentRubbish>(request, response));
        departmentRubbish.setCreateBy(UserUtils.getUser().getUserCode());
        Page<DepartmentRubbish> page = departmentRubbishService.findPageList(new Page<DepartmentRubbish>(request, response), departmentRubbish,startTime,endTime);
        return page;
    }

    /**
     * 查询app端 垃圾上报称重采集列表
     *
     * @param
     * @return
     * @Author Qiu
     * @Date 2021-01-12 14:51
     */
    @RequestMapping(value = "overwriteListDataApp")
    @ResponseBody
    public Page<DepartmentRubbish> overwriteListDataApp(DepartmentRubbish departmentRubbish, HttpServletRequest request, HttpServletResponse response) {
        departmentRubbish.setPage(new Page<DepartmentRubbish>(request, response));
        departmentRubbish.setCreateBy(UserUtils.getUser().getUserCode());
        Page<DepartmentRubbish> page = departmentRubbishService.findPage(new Page<DepartmentRubbish>(request, response), departmentRubbish);
        return page;
    }

    /**
     * 查询总重量
     *
     * @param departmentRubbish
     * @return
     * @Author Qiu
     * @Date 2021-01-12 17:27
     */
    @RequestMapping(value = "getWeight")
    @ResponseBody
    public String getWeight(DepartmentRubbish departmentRubbish) {
        departmentRubbish.setCreateBy(UserUtils.getUser().getUserCode());
        Double weight = departmentRubbishService.getWeight(departmentRubbish);
        return renderResult(Global.TRUE, text(""), weight);
    }

    /**
    * 根据id获取垃圾追溯
    *@Author Qiu
    *@Date 2021-01-19 10:36
    *@param
    *@return
    */
    @RequestMapping(value = "getDataById")
    @ResponseBody
    public String getDataById(String id) {
        DepartmentRubbish departmentRubbish = departmentRubbishService.getDataById(id);
        Map<String,Object> data = new HashMap<>();
        data.put("departmentRubbish",departmentRubbish);
        return renderResult(Global.TRUE, text("获取详情成功！"),data);
    }

    /**
     * @Description: 根据废弃物编号修改状态
     * @Author: lin
     * @Date: 2021/3/3 20:11
     * @Param: @param null
     * @return:
     */
    @RequestMapping(value = "isExist")
    @ResponseBody
    public String isExist(String result) {
        //扫描出来的格式为:日期 时间 重量 机构名称 类型 序号(4位)
        String[] resultArray = result.split(" ");

        Office office = new Office();//创建机构实体类
        office.getSqlMap().getWhere().and("office_name", QueryType.EQ,resultArray[3]);
        List<Office> officeList = officeDao.findList(office);//根据机构名称查询列表
        //判断标签打印的机构名称在机构表中是否存在
        if(officeList.size() != 1){
            return renderResult(Global.FALSE, text("标签打印单位名称与实际单位名称不符,请联系管理员!!!"));
        }
        if (resultArray.length != 6) {
            return renderResult(Global.TRUE, "格式不正确！");
        }
        String capitalInitial = FirstSpellUtils.cn2FirstSpell(resultArray[3]);//机构名称转换为大写首字母
        String replaceStr = (resultArray[0] + resultArray[1]).replace("-", "").replace(":", "")
                .replace(" ","").trim();    //将日期中间的标点符号和空格全都去掉
        String serialNumber = replaceStr + capitalInitial + resultArray[5];//序列号(时间+机构名称大写首字母+四位序列号)

        boolean isExist = departmentRubbishService.isExistSerialNumber(serialNumber);
        Map<String,Object> data = new HashMap<>();
        data.put("isExist",isExist);
        return renderResult(Global.TRUE, text("获取详情成功！"),data);
    }


    /**
     * @Description: 废弃物追溯信息数据导出
     * @Author: wang
     */
    @RequestMapping({"exportRubbish"})
    public void exportOfficeTypeWeightStatiscsList(DepartmentRubbish departmentRubbish,String startTime, String endTime, HttpServletRequest request, HttpServletResponse response) {

        //获取导出结果
        List<DepartmentRubbish> list = departmentRubbishService.exportOfficeTypeWeightStatiscsList(departmentRubbish,startTime,endTime);

        String fileName = "垃圾追溯数据信息" + com.jeesite.common.lang.DateUtils.getDate("yyyyMMdd") + ".xlsx";
        ExcelExport ee = new ExcelExport("垃圾追溯数据信息(" + startTime + " - " + endTime + ")", DepartmentRubbish.class);
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