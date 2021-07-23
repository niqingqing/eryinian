/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.rubbishalarm.service;

import com.jeesite.common.entity.Page;
import com.jeesite.common.service.CrudService;
import com.jeesite.modules.rubbishalarm.dao.WasteAlarmDao;
import com.jeesite.modules.rubbishalarm.entity.WasteAlarm;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;

/**
 * 告警表Service
 * @author Qiu
 * @version 2021-01-11
 */
@Service
@Transactional(readOnly=true)
public class WasteAlarmService extends CrudService<WasteAlarmDao, WasteAlarm> {

	@Resource
	private WasteAlarmDao wasteAlarmDao;
	/**
	 * 获取单条数据
	 * @param wasteAlarm
	 * @return
	 */
	@Override
	public WasteAlarm get(WasteAlarm wasteAlarm) {
		return super.get(wasteAlarm);
	}
	
	/**
	 * 查询分页数据
	 * @param page 分页对象
	 * @param wasteAlarm
	 * @return
	 */
	@Override
	public Page<WasteAlarm> findPage(Page<WasteAlarm> page, WasteAlarm wasteAlarm) {
		return super.findPage(page, wasteAlarm);
	}
	
	/**
	 * 保存数据（插入或更新）
	 * @param wasteAlarm
	 */
	@Override
	@Transactional(readOnly=false)
	public void save(WasteAlarm wasteAlarm) {
		super.save(wasteAlarm);
	}
	
	/**
	 * 更新状态
	 * @param wasteAlarm
	 */
	@Override
	@Transactional(readOnly=false)
	public void updateStatus(WasteAlarm wasteAlarm) {
		super.updateStatus(wasteAlarm);
	}
	
	/**
	 * 删除数据
	 * @param wasteAlarm
	 */
	@Override
	@Transactional(readOnly=false)
	public void delete(WasteAlarm wasteAlarm) {
		super.delete(wasteAlarm);
	}


	/**
	 * 重写分页查询
	 *@Author Qiu
	 *@Date 2021-01-19 16:19
	 *@param wasteAlarm
	 *@return
	 */
	public Page<WasteAlarm> overwriteListData(WasteAlarm wasteAlarm ){
		Page<WasteAlarm> page = (Page<WasteAlarm>) wasteAlarm.getPage();
		page.setList(wasteAlarmDao.overwriteListData(wasteAlarm));
		return page;
	}

	/**
	 * 根据垃圾序列号查询对应数据
	 *@Author Qiu
	 *@Date 2021-01-19 15:52
	 *@param departmentRubbishId
	 *@return
	 */
	public Integer getDataBySerialNumber(String departmentRubbishId){
		return wasteAlarmDao.getDataBySerialNumber(departmentRubbishId);
	}

	/**
	 * 修改告警列表状态
	 *@Author Qiu
	 *@Date 2021-01-19 17:07
	 *@param serialNumber
	 *@param alarmSolveDate
	 *@return
	 */
	@Transactional(readOnly=false)
	public int updateStatusBySerialNumber(String serialNumber,Date alarmSolveDate,String alarmSolveBy){
		return wasteAlarmDao.updateStatusBySerialNumber(serialNumber,alarmSolveDate,alarmSolveBy);
	}
}