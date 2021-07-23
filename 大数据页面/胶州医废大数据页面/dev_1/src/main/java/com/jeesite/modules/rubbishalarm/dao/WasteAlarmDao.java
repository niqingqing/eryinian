/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.rubbishalarm.dao;

import com.jeesite.common.dao.CrudDao;
import com.jeesite.common.mybatis.annotation.MyBatisDao;
import com.jeesite.modules.rubbishalarm.entity.WasteAlarm;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

/**
 * 告警表DAO接口
 * @author Qiu
 * @version 2021-01-11
 */
@MyBatisDao
public interface WasteAlarmDao extends CrudDao<WasteAlarm> {
    
	
    /**
    * 根据垃圾序列号查询对应数据
    *@Author Qiu
    *@Date 2021-01-19 15:52
    *@param departmentRubbishId
    *@return
    */
    int getDataBySerialNumber(String departmentRubbishId);

    /**
    * 重写分页查询
    *@Author Qiu
    *@Date 2021-01-19 16:19
    *@param wasteAlarm
    *@return
    */
    List<WasteAlarm> overwriteListData(WasteAlarm wasteAlarm);

    /**
    * 修改告警列表状态
    *@Author Qiu
    *@Date 2021-01-19 17:07
    *@param serialNumber
    *@param alarmSolveDate
    *@param alarmSolveBy
    *@return
    */
    int updateStatusBySerialNumber(@Param(value = "serialNumber") String serialNumber,
                     @Param(value = "alarmSolveDate")Date alarmSolveDate,
                     @Param(value = "alarmSolveBy")String alarmSolveBy);


}