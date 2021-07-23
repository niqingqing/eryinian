/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.rubbishclean.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jeesite.modules.departmentrubbish.service.DepartmentRubbishService;
import com.jeesite.modules.rubbishinput.entity.WasteTransfer;
import com.jeesite.modules.rubbishinput.service.WasteTransferService;
import com.jeesite.modules.sys.utils.UserUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jeesite.common.config.Global;
import com.jeesite.common.entity.Page;
import com.jeesite.common.web.BaseController;
import com.jeesite.modules.rubbishclean.entity.WasteClean;
import com.jeesite.modules.rubbishclean.service.WasteCleanService;

import java.util.Date;
import java.util.List;

/**
 * 废弃物清运表Controller
 *
 * @author Wang
 * @version 2021-03-30
 */
@Controller
@RequestMapping(value = "${adminPath}/rubbishclean/rubbishclean")
public class WasteCleanController extends BaseController {

    @Autowired
    private WasteCleanService wasteCleanService;
    @Autowired
    private DepartmentRubbishService departmentRubbishService;
    @Autowired
    private WasteTransferService wasteTransferService;

    /**
     * 获取数据
     */
    @ModelAttribute
    public WasteClean get(String id, boolean isNewRecord) {
        return wasteCleanService.get(id, isNewRecord);
    }

    /**
     * 查询列表
     */
    @RequiresPermissions("rubbishclean:wasteClean:view")
    @RequestMapping(value = {"list", ""})
    public String list(WasteClean wasteClean, Model model) {
        model.addAttribute("wasteClean", wasteClean);
        return "modules/rubbishclean/wasteCleanList";
    }

    /**
     * 查询列表数据
     */
    @RequiresPermissions("rubbishclean:wasteClean:view")
    @RequestMapping(value = "listData")
    @ResponseBody
    public Page<WasteClean> listData(WasteClean wasteClean, HttpServletRequest request, HttpServletResponse response) {
        Page<WasteClean> page = wasteCleanService.findPage(new Page<WasteClean>(request, response), wasteClean);
        return page;
    }

    /**
     * 查看编辑表单
     */
    @RequiresPermissions("rubbishclean:wasteClean:view")
    @RequestMapping(value = "form")
    public String form(WasteClean wasteClean, Model model) {
        model.addAttribute("wasteClean", wasteClean);
        return "modules/rubbishclean/wasteCleanForm";
    }

    /**
     * 保存废弃物清运表
     */
    @RequiresPermissions("rubbishclean:wasteClean:edit")
    @PostMapping(value = "save")
    @ResponseBody
    public String save(@Validated WasteClean wasteClean) {
        wasteCleanService.save(wasteClean);
        return renderResult(Global.TRUE, text("保存废弃物清运表成功！"));
    }

    /**
     * 删除废弃物清运表
     */
    @RequiresPermissions("rubbishclean:wasteClean:edit")
    @RequestMapping(value = "delete")
    @ResponseBody
    public String delete(WasteClean wasteClean) {
        wasteCleanService.delete(wasteClean);
        return renderResult(Global.TRUE, text("删除废弃物清运表成功！"));
    }

    /**
     * 垃圾清运
     *
     * @return
     * @Author wang
     * @Date 2021-03-30
     */
    @RequestMapping(value = "wasteRecovery")
    @ResponseBody
    public String wasteRecovery(WasteTransfer wasteTransfer,HttpServletRequest request, HttpServletResponse response) {
        wasteTransfer.setPage(new Page<WasteTransfer>(request, response));
        Page<WasteTransfer> page = wasteTransferService.getPage(wasteTransfer, UserUtils.getUser().getUserCode(), "3");

        List<WasteTransfer> wasteTransfers = page.getList();

        String[] wasteRecovery= new String[wasteTransfers.size()];

        for (int i = 0; i < wasteTransfers.size(); i++) {
            wasteCleanService.saveData(wasteTransfers.get(i).getRubbishReclaimId());
            wasteRecovery[i] = wasteTransfers.get(i).getRubbishReclaimId();
        }
        departmentRubbishService.wasteRecovery(wasteRecovery, "4");

        return renderResult(Global.TRUE, text(""));
    }

}