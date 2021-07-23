/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.password.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import com.jeesite.modules.password.entity.UserLoginPasswordRecord;
import com.jeesite.modules.password.service.UserLoginPasswordRecordService;

/**
 * 用户登录时的密码记录Controller
 * @author lin
 * @version 2021-04-29
 */
@Controller
@RequestMapping(value = "/password/userLoginPasswordRecord")
public class UserLoginPasswordRecordController extends BaseController {

	@Autowired
	private UserLoginPasswordRecordService userLoginPasswordRecordService;
	
	/**
	 * 获取数据
	 */
//	@ModelAttribute
//	public UserLoginPasswordRecord get(String id, boolean isNewRecord) {
//		return userLoginPasswordRecordService.get(id, isNewRecord);
//	}
//
//	/**
//	 * 查询列表
//	 */
//	@RequiresPermissions("password:userLoginPasswordRecord:view")
//	@RequestMapping(value = {"list", ""})
//	public String list(UserLoginPasswordRecord userLoginPasswordRecord, Model model) {
//		model.addAttribute("userLoginPasswordRecord", userLoginPasswordRecord);
//		return "modules/password/userLoginPasswordRecordList";
//	}
//
//	/**
//	 * 查询列表数据
//	 */
//	@RequiresPermissions("password:userLoginPasswordRecord:view")
//	@RequestMapping(value = "listData")
//	@ResponseBody
//	public Page<UserLoginPasswordRecord> listData(UserLoginPasswordRecord userLoginPasswordRecord, HttpServletRequest request, HttpServletResponse response) {
//		Page<UserLoginPasswordRecord> page = userLoginPasswordRecordService.findPage(new Page<UserLoginPasswordRecord>(request, response), userLoginPasswordRecord);
//		return page;
//	}
//
//	/**
//	 * 查看编辑表单
//	 */
//	@RequiresPermissions("password:userLoginPasswordRecord:view")
//	@RequestMapping(value = "form")
//	public String form(UserLoginPasswordRecord userLoginPasswordRecord, Model model) {
//		model.addAttribute("userLoginPasswordRecord", userLoginPasswordRecord);
//		return "modules/password/userLoginPasswordRecordForm";
//	}

	/**
	 * 保存用户登录时的密码记录
	 */
//	@RequiresPermissions("password:userLoginPasswordRecord:edit")
	@RequestMapping(value = "save")
	@ResponseBody
	public String save(UserLoginPasswordRecord userLoginPasswordRecord) {
		userLoginPasswordRecordService.save(userLoginPasswordRecord);
		return renderResult(Global.TRUE, text("保存成功！"));
	}
	
}