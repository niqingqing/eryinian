/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.trashrecyclingposition.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

import com.jeesite.modules.rubbishinput.dao.WasteTransferDao;
import com.jeesite.modules.rubbishinput.entity.WasteTransfer;
import com.jeesite.modules.rubbishreclaim.dao.WasteTransportDao;
import com.jeesite.modules.rubbishreclaim.entity.WasteTransport;
import com.jeesite.modules.sys.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jeesite.common.entity.Page;
import com.jeesite.common.service.CrudService;
import com.jeesite.modules.trashrecyclingposition.entity.TrashRecyclingPosition;
import com.jeesite.modules.trashrecyclingposition.dao.TrashRecyclingPositionDao;

import javax.annotation.Resource;

/**
 * 垃圾回收人员定位表Service
 * @author lin
 * @version 2021-01-19
 */
@Service
@Transactional(readOnly=true)
public class TrashRecyclingPositionService extends CrudService<TrashRecyclingPositionDao, TrashRecyclingPosition> {

	@Autowired
	private TrashRecyclingPositionDao trashRecyclingPositionDao;

	@Resource
	private WasteTransportDao wasteTransportDao;

	@Resource
	private WasteTransferDao wasteTransferDao;


	/**
	 * 获取单条数据
	 * @param trashRecyclingPosition
	 * @return
	 */
	@Override
	public TrashRecyclingPosition get(TrashRecyclingPosition trashRecyclingPosition) {
		return super.get(trashRecyclingPosition);
	}
	
	/**
	 * 查询分页数据
	 * @param page 分页对象
	 * @param trashRecyclingPosition
	 * @return
	 */
	@Override
	public Page<TrashRecyclingPosition> findPage(Page<TrashRecyclingPosition> page, TrashRecyclingPosition trashRecyclingPosition) {
		return super.findPage(page, trashRecyclingPosition);
	}
	
	/**
	 * 保存数据（插入或更新）
	 * @param trashRecyclingPosition
	 */
	@Override
	@Transactional(readOnly=false)
	public void save(TrashRecyclingPosition trashRecyclingPosition) {
		trashRecyclingPosition.setUserCode(UserUtils.getUser().getUserCode());
		trashRecyclingPositionDao.save(trashRecyclingPosition);
	}
	
	/**
	 * 更新状态
	 * @param trashRecyclingPosition
	 */
	@Override
	@Transactional(readOnly=false)
	public void updateStatus(TrashRecyclingPosition trashRecyclingPosition) {
		super.updateStatus(trashRecyclingPosition);
	}
	
	/**
	 * 删除数据
	 * @param trashRecyclingPosition
	 */
	@Override
	@Transactional(readOnly=false)
	public void delete(TrashRecyclingPosition trashRecyclingPosition) {
		super.delete(trashRecyclingPosition);
	}

	/**
	 * @Description: 根据废弃物id查询定位信息
	 * @Author: lin
	 * @Date: 2021/1/20 13:34
	 * @Param: @param null
	 * @return:
	 */
	public HashMap<String, Object> listDataByWasterId(String id){

		HashMap<String, Object> data = new HashMap<>();
		//获取垃圾回收信息
		WasteTransport wasteTransport = wasteTransportDao.getOneByRubbishId(id);

		if (wasteTransport == null) {
			return data;
		}

		String reclaimPerson = wasteTransport.getReclaimPerson();
		Date reclaimDate = wasteTransport.getReclaimDate();

		//获取垃圾中转信息

		WasteTransfer wasteTransfer = wasteTransferDao.getOneByDepartmentRubbishId(wasteTransport.getDepartmentRubbishId());
		Date inPutDate = wasteTransfer == null ? new Date() : wasteTransfer.getInPutDate();

		//获取垃圾回收员的定位列表
		List<TrashRecyclingPosition> trashRecyclingPositions = trashRecyclingPositionDao.listPosition(reclaimPerson, reclaimDate, inPutDate);

		data.put("positions", trashRecyclingPositions);
		return data;

	}
}