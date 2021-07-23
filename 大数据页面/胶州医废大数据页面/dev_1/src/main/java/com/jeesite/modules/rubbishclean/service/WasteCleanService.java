/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.rubbishclean.service;

import java.util.Date;
import java.util.List;

import com.jeesite.modules.rubbishinput.entity.WasteTransfer;
import com.jeesite.modules.sys.utils.UserUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jeesite.common.entity.Page;
import com.jeesite.common.service.CrudService;
import com.jeesite.modules.rubbishclean.entity.WasteClean;
import com.jeesite.modules.rubbishclean.dao.WasteCleanDao;

/**
 * 废弃物清运表Service
 * @author Wang
 * @version 2021-03-30
 */
@Service
@Transactional(readOnly=true)
public class WasteCleanService extends CrudService<WasteCleanDao, WasteClean> {
	
	/**
	 * 获取单条数据
	 * @param wasteClean
	 * @return
	 */
	@Override
	public WasteClean get(WasteClean wasteClean) {
		return super.get(wasteClean);
	}
	
	/**
	 * 查询分页数据
	 * @param page 分页对象
	 * @param wasteClean
	 * @return
	 */
	@Override
	public Page<WasteClean> findPage(Page<WasteClean> page, WasteClean wasteClean) {
		return super.findPage(page, wasteClean);
	}
	
	/**
	 * 保存数据（插入或更新）
	 * @param wasteClean
	 */
	@Override
	@Transactional(readOnly=false)
	public void save(WasteClean wasteClean) {
		super.save(wasteClean);
	}
	
	/**
	 * 更新状态
	 * @param wasteClean
	 */
	@Override
	@Transactional(readOnly=false)
	public void updateStatus(WasteClean wasteClean) {
		super.updateStatus(wasteClean);
	}
	
	/**
	 * 删除数据
	 * @param wasteClean
	 */
	@Override
	@Transactional(readOnly=false)
	public void delete(WasteClean wasteClean) {
		super.delete(wasteClean);
	}

	/**
	 * 保存数据（插入或更新）
	 */
	@Transactional(readOnly = false)
	public void saveData(String wasteRecovery) {
		WasteClean wasteClean = new WasteClean();
		Date date = new Date();
		//创建人
		wasteClean.setCreateBy(UserUtils.getUser().getUserCode());
		//创建时间
		wasteClean.setCreateDate(new Date(date.getTime()));
		//保存时间
		wasteClean.setCleanTime(new Date(date.getTime()));
		//扫码人
		wasteClean.setCleanPerson(UserUtils.getUser().getUserCode());
		//科室垃圾编码
		wasteClean.setDepartmentRubbishId(wasteRecovery);
		super.save(wasteClean);

	}
	
}