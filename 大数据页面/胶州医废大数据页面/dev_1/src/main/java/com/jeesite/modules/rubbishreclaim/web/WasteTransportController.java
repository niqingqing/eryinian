/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.rubbishreclaim.web;

import com.jeesite.common.config.Global;
import com.jeesite.common.entity.Page;
import com.jeesite.common.web.BaseController;
import com.jeesite.modules.departmentrubbish.entity.DepartmentRubbish;
import com.jeesite.modules.departmentrubbish.service.DepartmentRubbishService;
import com.jeesite.modules.rubbishalarm.service.WasteAlarmService;
import com.jeesite.modules.rubbishreclaim.entity.WasteTransport;
import com.jeesite.modules.rubbishreclaim.service.WasteTransportService;
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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * 垃圾回收表Controller
 * @author Qiu
 * @version 2021-01-11
 */
@Transactional
@Controller
@RequestMapping(value = "${adminPath}/rubbishreclaim/rubbishReclaim")
public class WasteTransportController extends BaseController {

	@Autowired
	private WasteTransportService wasteTransportService;
	@Autowired
	private DepartmentRubbishService departmentRubbishService;
	@Autowired
	private WasteAlarmService wasteAlarmService;
	
	/**
	 * 获取数据
	 */
	@ModelAttribute
	public WasteTransport get(String id, boolean isNewRecord) {
		return wasteTransportService.get(id, isNewRecord);
	}
	
	/**
	 * 查询列表
	 */
	@RequiresPermissions("rubbishreclaim:wasteTransport:view")
	@RequestMapping(value = {"list", ""})
	public String list(WasteTransport wasteTransport, Model model) {
		model.addAttribute("rubbishReclaim", wasteTransport);
		return "modules/rubbishreclaim/rubbishReclaimList";
	}
	
	/**
	 * 查询列表数据
	 */
	@RequiresPermissions("rubbishreclaim:wasteTransport:view")
	@RequestMapping(value = "listData")
	@ResponseBody
	public Page<WasteTransport> listData(WasteTransport wasteTransport, HttpServletRequest request, HttpServletResponse response) {
		Page<WasteTransport> page = wasteTransportService.findPage(new Page<WasteTransport>(request, response), wasteTransport);
		return page;
	}

	/**
	 * 查看编辑表单
	 */
	@RequiresPermissions("rubbishreclaim:wasteTransport:view")
	@RequestMapping(value = "form")
	public String form(WasteTransport wasteTransport, Model model) {
		model.addAttribute("rubbishReclaim", wasteTransport);
		return "modules/rubbishreclaim/rubbishReclaimForm";
	}

	/**
	 * 保存垃圾回收表
	 */
	@RequiresPermissions("rubbishreclaim:wasteTransport:edit")
	@PostMapping(value = "save")
	@ResponseBody
	public String save(@Validated WasteTransport wasteTransport) {
		//获取当前用户Code
		String userCode = UserUtils.getUser().getUserCode();
		wasteTransport.setCreateBy(userCode);
		wasteTransport.setCreateDate(new Date());
		wasteTransportService.save(wasteTransport);
		return renderResult(Global.TRUE, text("保存垃圾回收表成功！"));
	}
	
	/**
	 * 删除垃圾回收表
	 */
	@RequiresPermissions("rubbishreclaim:wasteTransport:edit")
	@RequestMapping(value = "delete")
	@ResponseBody
	public String delete(WasteTransport wasteTransport) {
		wasteTransportService.delete(wasteTransport);
		return renderResult(Global.TRUE, text("删除垃圾回收表成功！"));
	}

	/**
	 * @Description: 删除废弃物表
	 * @Author: lin
	 * @Date: 2021/1/29 15:39
	 * @Param: @param null
	 * @return:
	 */
	@Transactional
	@RequestMapping(value = "remove")
	@ResponseBody
	public String remove(WasteTransport wasteTransport) {
		User user = UserUtils.getUser();
		if (!user.isAdmin()) {
			wasteTransport.setCreateBy(UserUtils.getUser().getUserCode());		//只允许删除当前用户自己创建的信息
		}

		wasteTransport.setStatus("0");
		wasteTransportService.remove(wasteTransport);
		departmentRubbishService.updateTransportStatusBySerialNumber(wasteTransport.getDepartmentRubbishId(), "1");
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
	public String getPageData(WasteTransport wasteTransport, String institution, String status,
							  HttpServletRequest request, HttpServletResponse response) {
		wasteTransport.setPage(new Page<WasteTransport>(request, response));
		String userCode = UserUtils.getUser().getUserCode();
		Page<WasteTransport> page = wasteTransportService.getPage(wasteTransport,userCode,institution,status);
		return renderResult(Global.TRUE, text("获取成功！"),page);
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
	public String getTotal(String institution,String status) {
		String userCode = UserUtils.getUser().getUserCode();
		String total = wasteTransportService.getTotal(userCode,institution,status);
		return renderResult(Global.TRUE, text("获取成功！"),total);
	}

	/**
	 * 垃圾回收
	 *@Author wang
	 *@Date 2021-01-18 17:27
	 *@return
	 */
	@RequestMapping(value = "wasteRecovery")
	@ResponseBody
	public String wasteRecovery(String[] wasteRecovery){
		departmentRubbishService.wasteRecovery(wasteRecovery,"2");

		for(int i =0;i<wasteRecovery.length;i++){
			wasteTransportService.saveData(wasteRecovery[i]);
			//根据序列号查询告警列表中是否有该序列号的告警信息
			Integer dataBySerialNumber = wasteAlarmService.getDataBySerialNumber(wasteRecovery[i]);
			if(dataBySerialNumber == 1){
				//修改告警列表状态值 添加告警解决时间 告警解决人
				wasteAlarmService.updateStatusBySerialNumber(wasteRecovery[i],new Date(),UserUtils.getUser().getUserCode());
			}
		}

		return renderResult(Global.TRUE, text(""));
	}

	/**
	 * 编译序列号
	 *@Author wang
	 *@Date 2021-01-18 17:27
	 *@return
	 */
	@RequestMapping(value = "getSerialNumber")
	@ResponseBody
	public String getSerialNumber(String serialNumber){
		return renderResult(Global.TRUE, text(""),FirstSpellUtils.cn2FirstSpell(serialNumber));
	}

	/**
	 * 判断科室垃圾中是否存在此垃圾信息
	 *
	 * @return
	 * @Author wang
	 * @Date 2021-01-18 17:27
	 */
	@RequestMapping(value = "getStatus")
	@ResponseBody
	public String getStaus(String serialNumber) {
		DepartmentRubbish departmentRubbish = wasteTransportService.getStaus(serialNumber);
		if (departmentRubbish != null && departmentRubbish.getTransportStatus().equals("1")) {
			return renderResult(Global.TRUE, text(""));
		}else{
			return renderResult(Global.FALSE, text("未查询到垃圾信息"));
		}
	}

	/**
	 * @Description: 获取垃圾上报列表
	 * @Author: lin
	 * @Date: 2021/3/4 14:37
	 * @Param: @param null
	 * @return:
	 */
	@RequestMapping(value = "overwriteListData")
	@ResponseBody
	public Page<DepartmentRubbish> overwriteListData(DepartmentRubbish departmentRubbish, HttpServletRequest request, HttpServletResponse response,String type) {
		departmentRubbish.setPage(new Page<DepartmentRubbish>(request, response));
		Page<DepartmentRubbish> page = departmentRubbishService.overwriteListData(departmentRubbish,type);
		return page;
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

		List<String> existSerialNumbers = wasteTransportService.listExistBySerialNumbers(serialNumbers);

		HashMap<String, Object> data = new HashMap<>();
		data.put("existSerialNumbers", existSerialNumbers);

		return renderResult(Global.TRUE, text("获取成功"), data);
	}

	/**
	 * @Description: 获取垃圾运输明细
	 * @Author: wang
	 * @Date: 2021/4/6
	 * @Param: @param null
	 * @return:
	 */
	@RequestMapping(value = "transportationDetails")
	@ResponseBody
	public List<DepartmentRubbish> transportationDetails(DepartmentRubbish departmentRubbish, HttpServletRequest request, HttpServletResponse response) {
		departmentRubbish.setPage(new Page<DepartmentRubbish>(request, response));
		departmentRubbish.setReclaimPerson(UserUtils.getUser().getUserCode());
		List<DepartmentRubbish> list = departmentRubbishService.transportationDetails(departmentRubbish);
		return list;
	}

}