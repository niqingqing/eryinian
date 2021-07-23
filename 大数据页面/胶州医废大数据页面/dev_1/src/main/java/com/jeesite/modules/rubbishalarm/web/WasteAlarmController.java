/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.rubbishalarm.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.jeesite.modules.rubbishalarm.entity.WasteAlarm;
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
import com.jeesite.modules.rubbishalarm.service.WasteAlarmService;

import java.util.Date;

/**
 * 告警表Controller
 * @author Qiu
 * @version 2021-01-11
 */
@Controller
@RequestMapping(value = "${adminPath}/rubbishalarm/rubbishAlarm")
public class WasteAlarmController extends BaseController {

	@Autowired
	private WasteAlarmService wasteAlarmService;
	
	/**
	 * 获取数据
	 */
	@ModelAttribute
	public WasteAlarm get(String id, boolean isNewRecord) {
		return wasteAlarmService.get(id, isNewRecord);
	}
	
	/**
	 * 查询列表
	 */
	@RequestMapping(value = {"list", ""})
	public String list(WasteAlarm wasteAlarm, Model model) {
		model.addAttribute("rubbishAlarm", wasteAlarm);
		return "modules/rubbishalarm/rubbishAlarmList";
	}
	
	/**
	 * 查询列表数据
	 */
	@RequestMapping(value = "listData")
	@ResponseBody
	public Page<WasteAlarm> listData(WasteAlarm wasteAlarm, HttpServletRequest request, HttpServletResponse response) {
		Page<WasteAlarm> page = wasteAlarmService.findPage(new Page<WasteAlarm>(request, response), wasteAlarm);
		return page;
	}

	/**
	 * 查看编辑表单
	 */
	@RequiresPermissions("rubbishalarm:rubbishAlarm:view")
	@RequestMapping(value = "form")
	public String form(WasteAlarm wasteAlarm, Model model) {
		model.addAttribute("rubbishAlarm", wasteAlarm);
		return "modules/rubbishalarm/rubbishAlarmForm";
	}

	/**
	 * 保存告警表
	 */
	@RequiresPermissions("rubbishalarm:rubbishAlarm:edit")
	@PostMapping(value = "save")
	@ResponseBody
	public String save(@Validated WasteAlarm wasteAlarm) {
		//获取当前用户Code
		String userCode = UserUtils.getUser().getUserCode();
		wasteAlarm.setCreateBy(userCode);
		wasteAlarm.setCreateDate(new Date());
		wasteAlarmService.save(wasteAlarm);
		return renderResult(Global.TRUE, text("保存告警表成功！"));
	}
	
	/**
	 * 删除告警表
	 */
	@RequiresPermissions("rubbishalarm:rubbishAlarm:edit")
	@RequestMapping(value = "delete")
	@ResponseBody
	public String delete(WasteAlarm wasteAlarm) {
		wasteAlarmService.delete(wasteAlarm);
		return renderResult(Global.TRUE, text("删除告警表成功！"));
	}


	/**
	 * 重写分页查询
	 *@Author Qiu
	 *@Date 2021-01-19 16:19
	 *@param
	 *@return
	 */
	@RequestMapping(value = "overwriteListData")
	@ResponseBody
	public Page<WasteAlarm> overwriteListData(WasteAlarm wasteAlarm, HttpServletRequest request, HttpServletResponse response) {
		wasteAlarm.setPage(new Page<WasteAlarm>(request, response));
		Page<WasteAlarm> page = wasteAlarmService.overwriteListData(wasteAlarm);
		return page;
	}
}