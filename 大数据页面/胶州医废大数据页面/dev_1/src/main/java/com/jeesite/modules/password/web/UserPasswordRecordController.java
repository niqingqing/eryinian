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
import com.jeesite.modules.password.entity.UserPasswordRecord;
import com.jeesite.modules.password.service.UserPasswordRecordService;

/**
 * 用户密码修改记录Controller
 * @author lin
 * @version 2021-04-29
 */
@Controller
@RequestMapping(value = "${adminPath}/password/userPasswordRecord")
public class UserPasswordRecordController extends BaseController {

	@Autowired
	private UserPasswordRecordService userPasswordRecordService;
	
	/**
	 * 获取数据
	 */
//	@ModelAttribute
//	public UserPasswordRecord get(String id, boolean isNewRecord) {
//		return userPasswordRecordService.get(id, isNewRecord);
//	}
//
//	/**
//	 * 查询列表
//	 */
//	@RequiresPermissions("password:userPasswordRecord:view")
//	@RequestMapping(value = {"list", ""})
//	public String list(UserPasswordRecord userPasswordRecord, Model model) {
//		model.addAttribute("userPasswordRecord", userPasswordRecord);
//		return "modules/password/userPasswordRecordList";
//	}
//
//	/**
//	 * 查询列表数据
//	 */
//	@RequiresPermissions("password:userPasswordRecord:view")
//	@RequestMapping(value = "listData")
//	@ResponseBody
//	public Page<UserPasswordRecord> listData(UserPasswordRecord userPasswordRecord, HttpServletRequest request, HttpServletResponse response) {
//		Page<UserPasswordRecord> page = userPasswordRecordService.findPage(new Page<UserPasswordRecord>(request, response), userPasswordRecord);
//		return page;
//	}
//
//	/**
//	 * 查看编辑表单
//	 */
//	@RequiresPermissions("password:userPasswordRecord:view")
//	@RequestMapping(value = "form")
//	public String form(UserPasswordRecord userPasswordRecord, Model model) {
//		model.addAttribute("userPasswordRecord", userPasswordRecord);
//		return "modules/password/userPasswordRecordForm";
//	}

	/**
	 * 保存用户密码修改记录
	 */
//	@RequiresPermissions("password:userPasswordRecord:edit")
	@PostMapping(value = "save")
	@ResponseBody
	public String save(UserPasswordRecord userPasswordRecord) {
		userPasswordRecordService.save(userPasswordRecord);
		return renderResult(Global.TRUE, text("保存成功！"));
	}
	
}