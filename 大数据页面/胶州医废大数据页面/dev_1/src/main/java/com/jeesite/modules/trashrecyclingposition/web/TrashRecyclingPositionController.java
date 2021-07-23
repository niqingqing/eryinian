/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.trashrecyclingposition.web;

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
import com.jeesite.modules.trashrecyclingposition.entity.TrashRecyclingPosition;
import com.jeesite.modules.trashrecyclingposition.service.TrashRecyclingPositionService;

import java.util.HashMap;

/**
 * 垃圾回收人员定位表Controller
 * @author lin
 * @version 2021-01-19
 */
@Controller
@RequestMapping(value = "${adminPath}/trashrecyclingposition/trashRecyclingPosition")
public class TrashRecyclingPositionController extends BaseController {

	@Autowired
	private TrashRecyclingPositionService trashRecyclingPositionService;

	
	/**
	 * 获取数据
	 */
	@ModelAttribute
	public TrashRecyclingPosition get(String id, boolean isNewRecord) {
		return trashRecyclingPositionService.get(id, isNewRecord);
	}
	
	/**
	 * 查询列表
	 */
	@RequiresPermissions("trashrecyclingposition:trashRecyclingPosition:view")
	@RequestMapping(value = {"list", ""})
	public String list(TrashRecyclingPosition trashRecyclingPosition, Model model) {
		model.addAttribute("trashRecyclingPosition", trashRecyclingPosition);
		return "modules/trashrecyclingposition/trashRecyclingPositionList";
	}
	
	/**
	 * 查询列表数据
	 */
	@RequiresPermissions("trashrecyclingposition:trashRecyclingPosition:view")
	@RequestMapping(value = "listData")
	@ResponseBody
	public Page<TrashRecyclingPosition> listData(TrashRecyclingPosition trashRecyclingPosition, HttpServletRequest request, HttpServletResponse response) {
		Page<TrashRecyclingPosition> page = trashRecyclingPositionService.findPage(new Page<TrashRecyclingPosition>(request, response), trashRecyclingPosition); 
		return page;
	}

	/**
	 * 查看编辑表单
	 */
	@RequiresPermissions("trashrecyclingposition:trashRecyclingPosition:view")
	@RequestMapping(value = "form")
	public String form(TrashRecyclingPosition trashRecyclingPosition, Model model) {
		model.addAttribute("trashRecyclingPosition", trashRecyclingPosition);
		return "modules/trashrecyclingposition/trashRecyclingPositionForm";
	}

	/**
	 * 保存垃圾回收人员定位表
	 */
	@RequestMapping(value = "save")
	@ResponseBody
	public String save(@Validated TrashRecyclingPosition trashRecyclingPosition) {
		trashRecyclingPositionService.save(trashRecyclingPosition);
		return renderResult(Global.TRUE, text("保存垃圾回收人员定位表成功！"));
	}

	/**
	 * @Description: 获取该废弃物的所有定位信息
	 * @Author: lin
	 * @Date: 2021/1/20 10:31
	 * @Param: @param null
	 * @return:
	 */
	@RequiresPermissions("trashrecyclingposition:trashRecyclingPosition:view")
	@RequestMapping(value = "listDataByWasterId")
	@ResponseBody
	public String listDataByWasterId(String id, HttpServletRequest request, HttpServletResponse response) {
//		Page<TrashRecyclingPosition> page = trashRecyclingPositionService.findPage(new Page<TrashRecyclingPosition>(request, response), trashRecyclingPosition);
//		return page;
		HashMap<String, Object> data = trashRecyclingPositionService.listDataByWasterId(id);

		return renderResult(Global.TRUE, text("获取成功！"), data);
	}
	
}