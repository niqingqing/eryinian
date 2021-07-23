/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.departmentrubbish.dao;

import com.jeesite.common.dao.CrudDao;
import com.jeesite.common.entity.Page;
import com.jeesite.common.mybatis.annotation.MyBatisDao;
import com.jeesite.modules.departmentrubbish.entity.DepartmentRubbish;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

/**
 * 科室垃圾表DAO接口
 * @author Qiu
 * @version 2021-01-11
 */
@MyBatisDao
public interface DepartmentRubbishDao extends CrudDao<DepartmentRubbish> {

    /**
     * 查询app端 垃圾上报称重采集列表
     *@Author Qiu
     *@Date 2021-01-12 14:51
     *@param departmentRubbish
     *@return
     */
    List<DepartmentRubbish> overwriteListData(DepartmentRubbish departmentRubbish);

    /**
    * 查询总重量
    *@Author Qiu
    *@Date 2021-01-12 17:27
    *@param departmentRubbish
    *@return
    */
    Double getWeight(DepartmentRubbish departmentRubbish);

    /**
     * 垃圾回收
     *@Author wang
     *@Date 2021-01-18 17:27
     *@return
     */
    int wasteRecovery(@Param(value = "wasteRecovery") String[] wasteRecovery,@Param(value = "status") String status);

    /**
    * 根据id查询追溯信息
    *@Author Qiu
    *@Date 2021-01-19 11:08
    *@param id
    *@return
    */
	DepartmentRubbish getDateById(String id);

	/**
	* 查询待回收的垃圾废物超时告警列表
	*@Author Qiu
	*@Date 2021-01-19 15:29
	*@param produceDate
	*@return
	*/
	List<DepartmentRubbish> getTimeOutList(Date produceDate);

	/**
	 * @Description: 删除
	 * @Author: lin
	 * @Date: 2021/1/29 15:22
	 * @Param: @param null
	 * @return:
	 */
	int remove(DepartmentRubbish departmentRubbish);

	/**
	 * @Description: 根据废弃物编号修改状态
	 * @Author: lin
	 * @Date: 2021/1/30 10:09
	 * @Param: @param null
	 * @return:
	 */
	int updateTransportStatusBySerialNumber(@Param("serialNumber") String serialNumber, @Param("status") String status);

	/**
	 * @Description: 根据序列号判断是否存在
	 * @Author: lin
	 * @Date: 2021/3/3 20:05
	 * @Param: @param null
	 * @return:
	 */
	boolean isExistSerialNumber(String serialNumber);

	/**
	 * 查询垃圾废物列表
	 *@Author wang
	 *@Date 2021-03-19
	 *@return
	 */
	List<DepartmentRubbish> getRubbishList(@Param(value="page") Page page,@Param(value="departmentRubbish")  DepartmentRubbish departmentRubbish,
										   @Param(value="startTime") String startTime, @Param(value="endTime") String endTime);

	/**
	 * 查询垃圾废物运输明细
	 *@Author wang
	 *@Date 2021-04-06
	 *@return
	 */
	List<DepartmentRubbish> transportationDetails(DepartmentRubbish departmentRubbish);
}