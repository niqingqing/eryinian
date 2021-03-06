/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.rubbishinput.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jeesite.common.mybatis.mapper.query.QueryType;
import com.jeesite.modules.departmentrubbish.dao.DepartmentRubbishDao;
import com.jeesite.modules.departmentrubbish.entity.DepartmentRubbish;
import com.jeesite.modules.departmentrubbish.entity.RubbishReportVO;
import com.jeesite.modules.departmentrubbish.service.DepartmentRubbishService;
import com.jeesite.modules.rubbishinput.entity.WasteTransfer;
import com.jeesite.modules.rubbishreclaim.entity.WasteTransport;
import com.jeesite.modules.sys.entity.User;
import com.jeesite.modules.sys.utils.UserUtils;
import com.jeesite.modules.utils.FirstSpellUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jeesite.common.config.Global;
import com.jeesite.common.entity.Page;
import com.jeesite.common.web.BaseController;
import com.jeesite.modules.rubbishinput.service.WasteTransferService;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 垃圾中转站Controller
 *
 * @author Qiu
 * @version 2021-01-11
 */
@Transactional
@Controller
@RequestMapping(value = "${adminPath}/rubbishinput/rubbishInPut")
public class WasteTransferController extends BaseController {

    @Autowired
    private WasteTransferService wasteTransferService;
    @Autowired
    private DepartmentRubbishService departmentRubbishService;
    @Resource
    private DepartmentRubbishDao departmentRubbishDao;

    /**
     * 获取数据
     */
    @ModelAttribute
    public WasteTransfer get(String id, boolean isNewRecord) {
        return wasteTransferService.get(id, isNewRecord);
    }

    /**
     * 查询列表
     */
    @RequiresPermissions("rubbishinput:wasteTransfer:view")
    @RequestMapping(value = {"list", ""})
    public String list(WasteTransfer wasteTransfer, Model model) {
        model.addAttribute("rubbishInPut", wasteTransfer);
        return "modules/rubbishinput/rubbishInPutList";
    }

    /**
     * 查询列表数据
     */
    @RequiresPermissions("rubbishinput:wasteTransfer:view")
    @RequestMapping(value = "listData")
    @ResponseBody
    public Page<WasteTransfer> listData(WasteTransfer wasteTransfer, HttpServletRequest request, HttpServletResponse response) {
        Page<WasteTransfer> page = wasteTransferService.findPage(new Page<WasteTransfer>(request, response), wasteTransfer);
        return page;
    }

    /**
     * 查看编辑表单
     */
    @RequiresPermissions("rubbishinput:wasteTransfer:view")
    @RequestMapping(value = "form")
    public String form(WasteTransfer wasteTransfer, Model model) {
        model.addAttribute("rubbishInPut", wasteTransfer);
        return "modules/rubbishinput/rubbishInPutForm";
    }

    /**
     * 保存垃圾中转站
     */
    @RequiresPermissions("rubbishinput:wasteTransfer:edit")
    @PostMapping(value = "save")
    @ResponseBody
    public String save(@Validated WasteTransfer wasteTransfer) {
        //获取当前用户Code
        String userCode = UserUtils.getUser().getUserCode();
        wasteTransfer.setCreateBy(userCode);
        wasteTransfer.setCreateDate(new Date());
        wasteTransferService.save(wasteTransfer);
        return renderResult(Global.TRUE, text("保存垃圾中转站成功！"));
    }

    /**
     * 删除垃圾中转站
     */
    @RequiresPermissions("rubbishinput:wasteTransfer:edit")
    @RequestMapping(value = "delete")
    @ResponseBody
    public String delete(WasteTransfer wasteTransfer) {
        wasteTransferService.delete(wasteTransfer);
        return renderResult(Global.TRUE, text("删除垃圾中转站成功！"));
    }

    /**
     * @Description: 删除废弃物表
     * @Author: lin
     * @Date: 2021/1/29 15:39
     * @Param: @param null
     * @return:
     */
    @RequestMapping(value = "remove")
    @ResponseBody
    public String remove(WasteTransfer wasteTransfer) {
        User user = UserUtils.getUser();
        if (!user.isAdmin()) {
            wasteTransfer.setCreateBy(UserUtils.getUser().getUserCode());        //只允许删除当前用户自己创建的信息
        }

        //获取被删除信息的上报来源是上报人员上报还是中转站人员上报
        DepartmentRubbish departmentRubbish = new DepartmentRubbish();
        departmentRubbish.setSerialNumber(wasteTransfer.getDepartmentRubbishId());
        DepartmentRubbish rubbish = departmentRubbishDao.getByEntity(departmentRubbish);

        if (rubbish.getReportType().equals("1")) {
            departmentRubbishService.updateTransportStatusBySerialNumber(wasteTransfer.getDepartmentRubbishId(), "2");  //上报人员上报
        } else if (rubbish.getReportType().equals("2")) {
            departmentRubbishService.remove(rubbish);  //中转站上报
        }
        wasteTransfer.setStatus("0");
        wasteTransferService.remove(wasteTransfer);

        return renderResult(Global.TRUE, text("删除废弃物成功！"));
    }

    /**
     * 获取运输列表
     *
     * @author wang
     * @version 2021-1-12 14:40
     */
    //@RequiresPermissions("rubbishreclaim:wasteTransport:view")
    @RequestMapping(value = "getPageData")
    @ResponseBody
    public String getPageData(WasteTransfer wasteTransfer, String status,
                              HttpServletRequest request, HttpServletResponse response) {
        wasteTransfer.setPage(new Page<WasteTransfer>(request, response));
        String userCode = UserUtils.getUser().getUserCode();
        Page<WasteTransfer> page = wasteTransferService.getPage(wasteTransfer, userCode, status);
        return renderResult(Global.TRUE, text("获取成功！"), page);
    }

    /**
     * 获取总袋数和总重量
     *
     * @author wang
     * @version 2021-1-12 14:40
     */
    //@RequiresPermissions("rubbishreclaim:rubbishReclaim:view")
    @RequestMapping(value = "getTotal")
    @ResponseBody
    public String getTotal(String institution, String status) {
        String userCode = UserUtils.getUser().getUserCode();
        String total = wasteTransferService.getTotal(userCode, institution, status);
        return renderResult(Global.TRUE, text("获取成功！"), total);
    }

    /**
     * 扫人员二维码垃圾回收
     *
     * @return
     * @Author wang
     * @Date 2021-01-18 17:27
     */
    @RequestMapping(value = "wasteRecoveryQrocde")
    @ResponseBody
    public String wasteRecovery(String[] wasteRecovery) {
        departmentRubbishService.wasteRecovery(wasteRecovery, "3");

        for (int i = 0; i < wasteRecovery.length; i++) {
            wasteTransferService.saveData(wasteRecovery[i]);
        }
        return renderResult(Global.TRUE, text(""));
    }

    /**
     * 中转站人员垃圾上报
     *
     * @return
     * @Author wang
     * @Date 2021-01-18 17:27
     */
    @RequestMapping(value = "wasteRecovery")
    @ResponseBody
    public String wasteRecovery(String rubbishReportVO) {

        ObjectMapper objectMapper = new ObjectMapper();
        JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, RubbishReportVO.class);

        try {
            List<RubbishReportVO> list = objectMapper.readValue(rubbishReportVO, javaType);
            for (int i = 0; i < list.size(); i++) {

                DepartmentRubbish departmentRubbish = new DepartmentRubbish();

                String capitalInitial = FirstSpellUtils.cn2FirstSpell(list.get(i).getInstitution());//机构名称转换为大写首字母
                String replaceStr = list.get(i).getProduceStr().replace("-", "").replace(":", "").replace(" ", "").trim();
                String serialNumber = list.get(i).getSerialNumber();//序列号(时间+机构名称大写首字母+四位序列号)

                departmentRubbish.setSerialNumber(serialNumber);//垃圾序列号
                departmentRubbish.setStatus("0");//垃圾序列号
                DepartmentRubbish aVoid = departmentRubbishDao.getByEntity(departmentRubbish);
                if (aVoid == null) {
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
                    departmentRubbish.setTransportStatus("3");//状态
                    departmentRubbish.setReportType("2");//上报来源
                    departmentRubbish.setCreateBy(UserUtils.getUser().getUserCode());//当前用户
                    departmentRubbish.setCreateDate(new Date());//当前时间
                    departmentRubbish.setUpdateDate(new Date());

                    departmentRubbishService.save(departmentRubbish);//保存
                } else {
                    String[] wasteRecovery = {serialNumber};
                    departmentRubbishService.wasteRecovery(wasteRecovery, "3");
                }
                wasteTransferService.saveData(serialNumber);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return renderResult(Global.TRUE, text(""));
    }

    /**
     * 判断运输车中是否存在此垃圾信息
     *
     * @return
     * @Author wang
     * @Date 2021-01-18 17:27
     */
    @RequestMapping(value = "getStatus")
    @ResponseBody
    public String getStaus(String serialNumber) {
        DepartmentRubbish departmentRubbish = wasteTransferService.getStaus(serialNumber);
        if (departmentRubbish != null && departmentRubbish.getTransportStatus().equals("1")) {
            return renderResult(Global.FALSE, text("废弃物未运输"));
        } else if (departmentRubbish != null && departmentRubbish.getTransportStatus().equals("3")) {
            return renderResult(Global.FALSE, text("废弃物已入库"));
        } else if (departmentRubbish != null && departmentRubbish.getTransportStatus().equals("4")) {
            return renderResult(Global.FALSE, text("废弃物已清运"));
        } else {
            return renderResult(Global.TRUE, text(""));
        }
    }

    /**
     * @Description: 获取已存在的列表
     * @Author: lin
     * @Date: 2021/3/4 16:08
     * @Param: @param null
     * @return:
     */
    @RequestMapping(value = "isExistBySerialNumbers")
    @ResponseBody
    public String isExistBySerialNumbers(String[] serialNumbers) {

        if (serialNumbers == null || serialNumbers.length == 0) {
            return renderResult(Global.FALSE, text("参数错误"));
        }

        List<String> existSerialNumbers = wasteTransferService.listExistBySerialNumbers(serialNumbers);

        HashMap<String, Object> data = new HashMap<>();
        data.put("existSerialNumbers", existSerialNumbers);

        return renderResult(Global.TRUE, text("获取成功"), data);
    }

}