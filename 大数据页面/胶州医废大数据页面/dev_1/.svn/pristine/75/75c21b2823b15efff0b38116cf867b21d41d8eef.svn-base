/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.rubbishreclaim.dao;

import com.jeesite.common.dao.CrudDao;
import com.jeesite.common.entity.Page;
import com.jeesite.common.mybatis.annotation.MyBatisDao;
import com.jeesite.modules.departmentrubbish.entity.DepartmentRubbish;
import com.jeesite.modules.rubbishreclaim.entity.WasteTransport;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 垃圾回收表DAO接口
 *
 * @author Qiu
 * @version 2021-01-11
 */
@MyBatisDao
public interface WasteTransportDao extends CrudDao<WasteTransport> {

    @Override
    List<WasteTransport> findList(WasteTransport wasteTransport);

    /**
     * 获取运输列表
     *
     * @author wang
     * @version 2021-1-12 14:40
     */
    List<WasteTransport> getPage(@Param(value = ("userCode")) String userCode, @Param(value = ("institution")) String institution,
                                 @Param(value = ("page")) Page page, @Param(value = ("status"))String status);

    /**
     * 获取总袋数和总重量
     *
     * @author wang
     * @version 2021-1-12 14:40
     */
    String getTotal(@Param(value = ("userCode")) String userCode, @Param(value = ("institution")) String institution,@Param(value = ("status"))String status);

    /**
     * 获取总袋数和总重量
     *
     * @author wang
     * @version 2021-1-12 14:40
     */
    String saveData(@Param(value = ("userCode")) String userCode, @Param(value = ("institution")) String institution,@Param(value = ("status"))String status);

    /**
     * @Description: 根据废弃物id查询垃圾回收数据
     * @Author: lin
     * @Date: 2021/1/20 13:43
     * @Param: @param null
     * @return:
     */
    WasteTransport getOneByRubbishId(String rubbishId);

    /**
     * @Description: 删除
     * @Author: lin
     * @Date: 2021/1/29 15:22
     * @Param: @param null
     * @return:
     */
    int remove(WasteTransport wasteTransport);

    /**
     * @Description: 获取已存在的列表
     * @Author: lin
     * @Date: 2021/3/4 16:01
     * @Param: @param null
     * @return:
     */
    List<String> listExistBySerialNumbers(@Param("serialNumbers") String[] serialNumbers);

}