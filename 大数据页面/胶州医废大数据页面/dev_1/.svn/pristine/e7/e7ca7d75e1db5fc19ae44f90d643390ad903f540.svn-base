/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.sys.service;

import com.jeesite.common.entity.Page;
import com.jeesite.common.service.CrudService;
import com.jeesite.modules.sys.dao.UserWxBinderDao;
import com.jeesite.modules.sys.entity.UserWxBinder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 用户微信绑定Service
 * @author lin
 * @version 2021-01-14
 */
@Service
@Transactional(readOnly=false)
public class UserWxBinderService extends CrudService<UserWxBinderDao, UserWxBinder> {

	@Autowired
	private  UserWxBinderDao userWxBinderDao;
	/**
	 * 获取单条数据
	 * @param userWxBinder
	 * @return
	 */
	@Override
	public UserWxBinder get(UserWxBinder userWxBinder) {
		return super.get(userWxBinder);
	}
	
	/**
	 * 查询分页数据
	 * @param page 分页对象
	 * @param userWxBinder
	 * @return
	 */
	@Override
	public Page<UserWxBinder> findPage(Page<UserWxBinder> page, UserWxBinder userWxBinder) {
		return super.findPage(page, userWxBinder);
	}
	
	/**
	 * 保存数据（插入或更新）
	 * @param userWxBinder
	 */
	@Override
	@Transactional(readOnly=false)
	public void save(UserWxBinder userWxBinder) {
		super.save(userWxBinder);
	}
	
	/**
	 * 更新状态
	 * @param userWxBinder
	 */
	@Override
	@Transactional(readOnly=false)
	public void updateStatus(UserWxBinder userWxBinder) {
		super.updateStatus(userWxBinder);
	}
	
	/**
	 * 删除数据
	 * @param userWxBinder
	 */
	@Override
	@Transactional(readOnly=false)
	public void delete(UserWxBinder userWxBinder) {
		super.delete(userWxBinder);
	}

	/**
	 * @Description: 判断用户是否已经被绑定
	 * @Author: lin
	 * @Date: 2021/1/14 18:09
	 * @Param: @param null
	 * @return:
	 */
	public boolean isExistByUserCode(String userCode, String binderSource){
		boolean isExistByUserCode = userWxBinderDao.isExistByUserCode(userCode, binderSource);
		return isExistByUserCode;
	}

	/**
	 * @Description: 根据unionid获取用户userCode
	 * @Author: lin
	 * @Date: 2021/1/14 18:24
	 * @Param: @param null
	 * @return:
	 */
	public String getUserCodeByUnionid(String unionid, String openid) {
		return userWxBinderDao.getUserCodeByUnionid(unionid);
	}

	/**
	 * @Description: 根据openid获取用户userCode
	 * @Author: wang
	 * @Date: 2021/1/15 9:20
	 * @Param: @param null
	 * @return:
	 */
	public String getUserCodeByOpenid(String openid) {
		return userWxBinderDao.getUserCodeByOpenid(openid);
	}

	/**
	 * @Description: 保存
	 * @Author: lin
	 * @Date: 2021/1/15 16:12
	 * @Param: @param null
	 * @return:
	 */
	public int save1(UserWxBinder userWxBinder) {
		return userWxBinderDao.save1(userWxBinder);
	}

	/**
	 * @Description: 微信解绑
	 * @Author: lin
	 * @Date: 2021/1/15 18:32
	 * @Param: @param null
	 * @return:
	 */
	public int unBinder(String userCode, Integer binderSource) {
		return userWxBinderDao.unBinder(userCode, binderSource);
	}


}