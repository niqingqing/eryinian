/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.trashrecyclingposition.dao;

import com.jeesite.common.dao.CrudDao;
import com.jeesite.common.mybatis.annotation.MyBatisDao;
import com.jeesite.modules.trashrecyclingposition.entity.TrashRecyclingPosition;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

/**
 * 垃圾回收人员定位表DAO接口
 * @author lin
 * @version 2021-01-19
 */
@MyBatisDao
public interface TrashRecyclingPositionDao extends CrudDao<TrashRecyclingPosition> {

    /**
     * @Description: 保存
     * @Author: lin
     * @Date: 2021/1/19 17:51
     * @Param: @param null
     * @return:
     */
    int save(TrashRecyclingPosition trashRecyclingPosition);

    /**
     * @Description: 获取定位信息列表
     * @Author: lin
     * @Date: 2021/1/20 13:58
     * @Param: @param null
     * @return:
     */
    List<TrashRecyclingPosition> listPosition(@Param("userCode") String userCode,
                                              @Param("startTime") Date startTime, @Param("endTime") Date endTime);
	
}