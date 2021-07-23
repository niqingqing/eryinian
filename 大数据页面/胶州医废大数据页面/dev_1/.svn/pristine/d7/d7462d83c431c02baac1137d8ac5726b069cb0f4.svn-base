/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.password.service;

import java.util.Date;

import com.jeesite.modules.sys.utils.UserUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jeesite.common.entity.Page;
import com.jeesite.common.service.CrudService;
import com.jeesite.modules.password.entity.UserLoginPasswordRecord;
import com.jeesite.modules.password.dao.UserLoginPasswordRecordDao;

/**
 * 用户登录时的密码记录Service
 * @author lin
 * @version 2021-04-29
 */
@Service
@Transactional(readOnly=true)
public class UserLoginPasswordRecordService extends CrudService<UserLoginPasswordRecordDao, UserLoginPasswordRecord> {
	
	/**
	 * 获取单条数据
	 * @param userLoginPasswordRecord
	 * @return
	 */
	@Override
	public UserLoginPasswordRecord get(UserLoginPasswordRecord userLoginPasswordRecord) {
		return super.get(userLoginPasswordRecord);
	}
	
	/**
	 * 查询分页数据
	 * @param page 分页对象
	 * @param userLoginPasswordRecord
	 * @return
	 */
	@Override
	public Page<UserLoginPasswordRecord> findPage(Page<UserLoginPasswordRecord> page, UserLoginPasswordRecord userLoginPasswordRecord) {
		return super.findPage(page, userLoginPasswordRecord);
	}
	
	/**
	 * 保存数据（插入或更新）
	 * @param userLoginPasswordRecord
	 */
	@Override
	@Transactional(readOnly=false)
	public void save(UserLoginPasswordRecord userLoginPasswordRecord) {

		userLoginPasswordRecord.setLoginDate(new Date());

		super.save(userLoginPasswordRecord);
	}
	
	/**
	 * 更新状态
	 * @param userLoginPasswordRecord
	 */
	@Override
	@Transactional(readOnly=false)
	public void updateStatus(UserLoginPasswordRecord userLoginPasswordRecord) {
		super.updateStatus(userLoginPasswordRecord);
	}
	
	/**
	 * 删除数据
	 * @param userLoginPasswordRecord
	 */
	@Override
	@Transactional(readOnly=false)
	public void delete(UserLoginPasswordRecord userLoginPasswordRecord) {
		super.delete(userLoginPasswordRecord);
	}
	
}