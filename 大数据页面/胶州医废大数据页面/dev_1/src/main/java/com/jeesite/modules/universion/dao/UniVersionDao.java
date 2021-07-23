/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.universion.dao;

import com.jeesite.common.dao.CrudDao;
import com.jeesite.common.mybatis.annotation.MyBatisDao;
import com.jeesite.modules.universion.entity.UniVersion;

import java.util.List;

/**
 * uni-app版本号DAO接口
 * @author Qiu
 * @version 2021-01-09
 */
@MyBatisDao
public interface UniVersionDao extends CrudDao<UniVersion> {

    /**
    * 获取列表
    *@Author Qiu
    *@Date 2021-01-11 16:57
    *@param uniVersion
    *@return
    */
    List<UniVersion> listData(UniVersion uniVersion);

    /**
    * 更新版本号
    *@Author Qiu
    *@Date 2021-01-12 08:01
    *@param version
    *@return
    */
    int updateVersion(String version);
}