/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.rubbishclean.dao;

import com.jeesite.common.dao.CrudDao;
import com.jeesite.common.mybatis.annotation.MyBatisDao;
import com.jeesite.modules.rubbishclean.entity.WasteClean;

/**
 * 废弃物清运表DAO接口
 * @author Wang
 * @version 2021-03-30
 */
@MyBatisDao
public interface WasteCleanDao extends CrudDao<WasteClean> {
	
}