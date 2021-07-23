/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.rubbishinput.service;

import com.jeesite.modules.departmentrubbish.dao.DepartmentRubbishDao;
import com.jeesite.modules.departmentrubbish.entity.DepartmentRubbish;
import com.jeesite.modules.rubbishinput.entity.WasteTransfer;
import com.jeesite.modules.rubbishreclaim.entity.WasteTransport;
import com.jeesite.modules.sys.utils.UserUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jeesite.common.entity.Page;
import com.jeesite.common.service.CrudService;
import com.jeesite.modules.rubbishinput.dao.WasteTransferDao;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * 垃圾中转站Service
 *
 * @author Qiu
 * @version 2021-01-11
 */
@Service
@Transactional(readOnly = true)
public class WasteTransferService extends CrudService<WasteTransferDao, WasteTransfer> {
    @Resource
    private WasteTransferDao wasteTransferDao;
    @Resource
    private DepartmentRubbishDao departmentRubbishDao;

    /**
     * 获取单条数据
     *
     * @param wasteTransfer
     * @return
     */
    @Override
    public WasteTransfer get(WasteTransfer wasteTransfer) {
        return super.get(wasteTransfer);
    }

    /**
     * 查询分页数据
     *
     * @param page          分页对象
     * @param wasteTransfer
     * @return
     */
    @Override
    public Page<WasteTransfer> findPage(Page<WasteTransfer> page, WasteTransfer wasteTransfer) {
        return super.findPage(page, wasteTransfer);
    }

    /**
     * 保存数据（插入或更新）
     *
     * @param wasteTransfer
     */
    @Override
    @Transactional(readOnly = false)
    public void save(WasteTransfer wasteTransfer) {
        super.save(wasteTransfer);
    }

    /**
     * 更新状态
     *
     * @param wasteTransfer
     */
    @Override
    @Transactional(readOnly = false)
    public void updateStatus(WasteTransfer wasteTransfer) {
        super.updateStatus(wasteTransfer);
    }

    /**
     * 删除数据
     *
     * @param wasteTransfer
     */
    @Override
    @Transactional(readOnly = false)
    public void delete(WasteTransfer wasteTransfer) {
        super.delete(wasteTransfer);
    }

    /**
     * 获取运输列表
     *
     * @author wang
     * @version 2021-1-12 14:40
     */
    public Page<WasteTransfer> getPage(WasteTransfer wasteTransfer, String userCode, String status) {

        Page<WasteTransfer> page = (Page<WasteTransfer>) wasteTransfer.getPage();
        page.setList(wasteTransferDao.getPage(userCode, page, status));
        return page;
    }

    /**
     * 获取总袋数和总重量
     *
     * @author wang
     * @version 2021-1-12 14:40
     */
    public String getTotal(String userCode, String institution, String status) {
        return wasteTransferDao.getTotal(userCode, institution, status);
    }

    /**
     * 保存数据（插入或更新）
     */
    @Transactional(readOnly = false)
    public void saveData(String wasteRecovery) {
        WasteTransfer wasteTransfer = new WasteTransfer();
        Date date = new Date();
        //创建人
        wasteTransfer.setCreateBy(UserUtils.getUser().getUserCode());
        //创建时间
        wasteTransfer.setCreateDate(new Date(date.getTime()));
        //保存时间
        wasteTransfer.setInPutDate(new Date(date.getTime()));
        //扫码人
        wasteTransfer.setInPutPerson(UserUtils.getUser().getUserCode());
        //科室垃圾编码
        wasteTransfer.setDepartmentRubbishId(wasteRecovery);
        super.save(wasteTransfer);

    }

    /**
     * 判断是否流程正常
     */
    @Transactional(readOnly = false)
    public DepartmentRubbish getStaus(String serialNumber) {
        DepartmentRubbish departmentRubbish = new DepartmentRubbish();
        departmentRubbish.setSerialNumber(serialNumber);
        return departmentRubbishDao.getByEntity(departmentRubbish);
    }

    /**
     * @Description: 删除废弃物回收信息
     * @Author: lin
     * @Date: 2021/1/29 15:33
     * @Param: @param null
     * @return:
     */
    @Transactional(readOnly=false)
    public int remove(WasteTransfer wasteTransfer) {
        return wasteTransferDao.remove(wasteTransfer);
    }

    /**
     * @Description: 获取已存在的列表
     * @Author: lin
     * @Date: 2021/3/4 16:01
     * @Param: @param null
     * @return:
     */
    public List<String> listExistBySerialNumbers(String[] serialNumbers) {
        return wasteTransferDao.listExistBySerialNumbers(serialNumbers);
    }
}