/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.rubbishinput.dao;

import com.jeesite.common.dao.CrudDao;
import com.jeesite.common.entity.Page;
import com.jeesite.common.mybatis.annotation.MyBatisDao;
import com.jeesite.modules.rubbishinput.entity.WasteTransfer;
import com.jeesite.modules.rubbishreclaim.entity.WasteTransport;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 垃圾中转站DAO接口
 * @author Qiu
 * @version 2021-01-11
 */
@MyBatisDao
public interface WasteTransferDao extends CrudDao<WasteTransfer> {

    /**
     * 获取运输列表
     *
     * @author wang
     * @version 2021-1-12 14:40
     */
    List<WasteTransfer> getPage(@Param(value = ("userCode")) String userCode, @Param(value = ("page")) Page page, @Param(value = ("status"))String status);

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
     * @Description: 获取单个中转信息
     * @Author: lin
     * @Date: 2021/1/20 14:31
     * @Param: @param null
     * @return:
     */
    WasteTransfer getOneByDepartmentRubbishId(String departmentRubbishId);

    /**
     * @Description: 删除
     * @Author: lin
     * @Date: 2021/1/29 15:22
     * @Param: @param null
     * @return:
     */
    int remove(WasteTransfer wasteTransfer);

    /**
     * @Description: 获取已存在的列表
     * @Author: lin
     * @Date: 2021/3/4 16:01
     * @Param: @param null
     * @return:
     */
    List<String> listExistBySerialNumbers(@Param("serialNumbers") String[] serialNumbers);

}