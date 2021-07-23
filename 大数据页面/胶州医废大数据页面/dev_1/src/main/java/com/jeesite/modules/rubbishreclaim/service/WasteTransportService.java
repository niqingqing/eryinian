/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.rubbishreclaim.service;

import com.jeesite.modules.departmentrubbish.dao.DepartmentRubbishDao;
import com.jeesite.modules.departmentrubbish.entity.DepartmentRubbish;
import com.jeesite.modules.rubbishreclaim.entity.WasteTransport;
import com.jeesite.modules.sys.utils.UserUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jeesite.common.entity.Page;
import com.jeesite.common.service.CrudService;
import com.jeesite.modules.rubbishreclaim.dao.WasteTransportDao;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

/**
 * 垃圾回收表Service
 *
 * @author Qiu
 * @version 2021-01-11
 */
@Service
@Transactional(readOnly = true)
public class WasteTransportService extends CrudService<WasteTransportDao, WasteTransport> {

    @Resource
    private WasteTransportDao wasteTransportDao;
    @Resource
    private DepartmentRubbishDao departmentRubbishDao;

    /**
     * 获取单条数据
     *
     * @param wasteTransport
     * @return
     */
    @Override
    public WasteTransport get(WasteTransport wasteTransport) {
        return super.get(wasteTransport);
    }

    /**
     * 查询分页数据
     *
     * @param page           分页对象
     * @param wasteTransport
     * @return
     */
    @Override
    public Page<WasteTransport> findPage(Page<WasteTransport> page, WasteTransport wasteTransport) {
        return super.findPage(page, wasteTransport);
    }

    /**
     * 保存数据（插入或更新）
     *
     * @param wasteTransport
     */
    @Override
    @Transactional(readOnly = false)
    public void save(WasteTransport wasteTransport) {
        super.save(wasteTransport);
    }

    /**
     * 更新状态
     *
     * @param wasteTransport
     */
    @Override
    @Transactional(readOnly = false)
    public void updateStatus(WasteTransport wasteTransport) {
        super.updateStatus(wasteTransport);
    }

    /**
     * 删除数据
     *
     * @param wasteTransport
     */
    @Override
    @Transactional(readOnly = false)
    public void delete(WasteTransport wasteTransport) {
        super.delete(wasteTransport);
    }

    /**
     * 获取运输列表
     *
     * @author wang
     * @version 2021-1-12 14:40
     */
    public Page<WasteTransport> getPage(WasteTransport wasteTransport, String userCode, String institution, String status) {

        Page<WasteTransport> page = (Page<WasteTransport>) wasteTransport.getPage();
        page.setList(wasteTransportDao.getPage(userCode, institution, page, status));
        return page;
    }

    /**
     * 获取总袋数和总重量
     *
     * @author wang
     * @version 2021-1-12 14:40
     */
    public String getTotal(String userCode, String institution, String status) {
        return wasteTransportDao.getTotal(userCode, institution, status);
    }

    /**
     * 保存数据（插入或更新）
     */
    @Transactional(readOnly = false)
    public void saveData(String wasteRecovery) {
        WasteTransport wasteTransport = new WasteTransport();
        Date date = new Date();
        wasteTransport.setCreateBy(UserUtils.getUser().getUserCode());
        wasteTransport.setCreateDate(new Date(date.getTime()));
        wasteTransport.setReclaimDate(new Date(date.getTime()));
        wasteTransport.setReclaimPerson(UserUtils.getUser().getUserCode());
        wasteTransport.setDepartmentRubbishId(wasteRecovery);
        super.save(wasteTransport);

    }


    /**
     * 判断是否流程正常
     */
    @Transactional(readOnly = false)
    public DepartmentRubbish getStaus(String serialNumber) {
        DepartmentRubbish departmentRubbish = new DepartmentRubbish();
        departmentRubbish.setSerialNumber(serialNumber);
        departmentRubbish.setStatus("0");
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
    public int remove(WasteTransport wasteTransport) {
        return wasteTransportDao.remove(wasteTransport);
    }

    /**
     * @Description: 获取已存在的列表
     * @Author: lin
     * @Date: 2021/3/4 16:01
     * @Param: @param null
     * @return:
     */
    public List<String> listExistBySerialNumbers(String[] serialNumbers) {
        return wasteTransportDao.listExistBySerialNumbers(serialNumbers);
    }
}