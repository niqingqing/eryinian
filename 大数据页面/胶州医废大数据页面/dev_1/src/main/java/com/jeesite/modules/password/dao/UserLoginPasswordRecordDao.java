/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.password.dao;

import com.jeesite.common.dao.CrudDao;
import com.jeesite.common.mybatis.annotation.MyBatisDao;
import com.jeesite.modules.password.entity.UserLoginPasswordRecord;

/**
 * 用户登录时的密码记录DAO接口
 * @author lin
 * @version 2021-04-29
 */
@MyBatisDao
public interface UserLoginPasswordRecordDao extends CrudDao<UserLoginPasswordRecord> {
	
}