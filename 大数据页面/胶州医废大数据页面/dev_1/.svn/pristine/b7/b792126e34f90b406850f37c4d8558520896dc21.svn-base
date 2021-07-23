/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.departmentrubbish.service;

import com.jeesite.common.entity.Page;
import com.jeesite.common.mybatis.mapper.query.QueryType;
import com.jeesite.common.service.CrudService;
import com.jeesite.modules.departmentrubbish.dao.DepartmentRubbishDao;
import com.jeesite.modules.departmentrubbish.entity.DepartmentRubbish;
import com.jeesite.modules.sys.dao.EmployeeDao;
import com.jeesite.modules.sys.dao.OfficeDao;
import com.jeesite.modules.sys.dao.SinInUserDao;
import com.jeesite.modules.sys.entity.Employee;
import com.jeesite.modules.sys.entity.Office;
import com.jeesite.modules.sys.entity.User;
import com.jeesite.modules.sys.utils.UserUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * 科室垃圾表Service
 *
 * @author Qiu
 * @version 2021-01-11
 */
@Service
@Transactional(readOnly = true)
public class DepartmentRubbishService extends CrudService<DepartmentRubbishDao, DepartmentRubbish> {

    @Resource
    private DepartmentRubbishDao departmentRubbishDao;
    @Resource
    private OfficeDao officeDao;
    @Resource
    private EmployeeDao employeeDao;
    @Resource
    private SinInUserDao sinInUserDao;

    /**
     * 获取单条数据
     *
     * @param departmentRubbish
     * @return
     */
    @Override
    public DepartmentRubbish get(DepartmentRubbish departmentRubbish) {
        return super.get(departmentRubbish);
    }

    /**
     * 查询分页数据
     *
     * @param page              分页对象
     * @param departmentRubbish
     * @return
     */
    @Override
    public Page<DepartmentRubbish> findPage(Page<DepartmentRubbish> page, DepartmentRubbish departmentRubbish) {
        return super.findPage(page, departmentRubbish);
    }

    public Page<DepartmentRubbish> findPageList(Page<DepartmentRubbish> page, DepartmentRubbish departmentRubbish,
                                                String startTime, String endTime) {
        /**
         * 创建新的employee对象，用于获取登录用户所属的机构编号
         */
        Employee employee = new Employee();

        //给新创建的对象设置用户编号
        employee.setEmpCode(UserUtils.getUser().getUserCode());
        employee = employeeDao.getByEntity(employee);
        String userCode = UserUtils.getUser().getUserCode();

        User user = UserUtils.getUser();
        //获取用户角色编号
        List<String> userRoleCodes = sinInUserDao.getUserRoleCode(UserUtils.getUser().getUserCode());
        Boolean isKeShi = false;
        //判断当前角色是不是运输车人员
        for (int i = 0; i < userRoleCodes.size(); i++) {
            if (userRoleCodes.get(i).equals("lajihuishou") || userRoleCodes.get(i).equals("yunshucheadmin")) {
                isKeShi = true;
                break;
            }
        }
        //判断当前登陆账号好角色，是管理员或者运输车角色，查看全部追溯信息，非前面两种角色，至查看个人相关追溯信息
        if (UserUtils.getUser().isAdmin() || isKeShi) {
            departmentRubbish.setInstitutionCode("0");
        } else if (employee != null) {
            departmentRubbish.setCreateBy(userCode);
            departmentRubbish.setInstitutionCode(employee.getOffice().getOfficeCode());
        }
        //日期处理
        if (startTime != null && !startTime.trim().equals("") && endTime != null && !endTime.trim().equals("")) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date date = new Date();
            try {
                date = sdf.parse(endTime);
                endTime = sdf.format(new Date(date.getTime() + 24 * 60 * 60 * 1000));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        //数据库查询分页信息
        List<DepartmentRubbish> departmentRubbishList = departmentRubbishDao.getRubbishList(page, departmentRubbish, startTime, endTime);

        page.setList(departmentRubbishList);
        return page;
    }

    public Page<DepartmentRubbish> findPageListBigData(Page<DepartmentRubbish> page, DepartmentRubbish departmentRubbish,
                                                String startTime, String endTime) {

        departmentRubbish.setInstitutionCode("0");
        //数据库查询分页信息
        List<DepartmentRubbish> departmentRubbishList = departmentRubbishDao.getRubbishList(page, departmentRubbish, startTime, endTime);

        page.setList(departmentRubbishList);
        return page;
    }

    public List<DepartmentRubbish> exportOfficeTypeWeightStatiscsList(DepartmentRubbish departmentRubbish,
                                                                      String startTime, String endTime) {
        /**
         * 创建新的employee对象，用于获取登录用户所属的机构编号
         */
        Employee employee = new Employee();

        //给新创建的对象设置用户编号
        employee.setEmpCode(UserUtils.getUser().getUserCode());
        employee = employeeDao.getByEntity(employee);
        String userCode = UserUtils.getUser().getUserCode();

        User user = UserUtils.getUser();
        //获取用户角色编号
        List<String> userRoleCodes = sinInUserDao.getUserRoleCode(UserUtils.getUser().getUserCode());
        Boolean isKeShi = false;
        //判断当前角色是不是运输车人员
        for (int i = 0; i < userRoleCodes.size(); i++) {
            if (userRoleCodes.get(i).equals("lajihuishou") || userRoleCodes.get(i).equals("yunshucheadmin")) {
                isKeShi = true;
                break;
            }
        }
        //判断当前登陆账号好角色，是管理员或者运输车角色，查看全部追溯信息，非前面两种角色，至查看个人相关追溯信息
        if (UserUtils.getUser().isAdmin() || isKeShi) {
            departmentRubbish.setInstitutionCode("0");
        } else if (employee != null) {
            departmentRubbish.setCreateBy(userCode);
            departmentRubbish.setInstitutionCode(employee.getOffice().getOfficeCode());
        }
        //日期处理
        if (startTime != null && !startTime.trim().equals("") && endTime != null && !endTime.trim().equals("")) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date date = new Date();
            try {
                date = sdf.parse(endTime);
                endTime = sdf.format(new Date(date.getTime() + 24 * 60 * 60 * 1000));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        //数据库查询分页信息
        List<DepartmentRubbish> departmentRubbishList = departmentRubbishDao.getRubbishList(null, departmentRubbish, startTime, endTime);

        //用于导出
        for (int i = 0; i < departmentRubbishList.size(); i++) {
            if (departmentRubbishList.get(i).getTransportStatus().equals("1")) {
                departmentRubbishList.get(i).setTransportStatusName("待回收");
            } else if (departmentRubbishList.get(i).getTransportStatus().equals("2")) {
                departmentRubbishList.get(i).setTransportStatusName("运输中");
            } else if (departmentRubbishList.get(i).getTransportStatus().equals("3")) {
                departmentRubbishList.get(i).setTransportStatusName("已中转");
            }
        }

        return departmentRubbishList;
    }

    /**
     * 保存数据（插入或更新）
     *
     * @param departmentRubbish
     */
    @Override
    @Transactional(readOnly = false)
    public void save(DepartmentRubbish departmentRubbish) {
        Office office = new Office();
        office.getSqlMap().getWhere().and("office_name", QueryType.EQ, departmentRubbish.getInstitution());
        //office.setOfficeName(departmentRubbish.getInstitution());
        if (officeDao.getByEntity(office) != null) {
            departmentRubbish.setInstitutionCode(officeDao.getByEntity(office).getOfficeCode());
            super.save(departmentRubbish);
        }

    }

    /**
     * 更新状态
     *
     * @param departmentRubbish
     */
    @Override
    @Transactional(readOnly = false)
    public void updateStatus(DepartmentRubbish departmentRubbish) {
        super.updateStatus(departmentRubbish);
    }

    /**
     * 删除数据
     *
     * @param departmentRubbish
     */
    @Override
    @Transactional(readOnly = false)
    public void delete(DepartmentRubbish departmentRubbish) {
        super.delete(departmentRubbish);
    }

    /**
     * 查询app端 垃圾上报称重采集列表
     *
     * @param
     * @return
     * @Author Qiu
     * @Date 2021-01-12 14:51
     */
    public Page<DepartmentRubbish> overwriteListData(DepartmentRubbish departmentRubbish, String type) {
        Page<DepartmentRubbish> page = (Page<DepartmentRubbish>) departmentRubbish.getPage();
        if (type != null && !type.trim().equals("") && type.trim().equals("app")) {
            Employee employee = new Employee();
            employee.setEmpCode(UserUtils.getUser().getUserCode());
            Employee empEntity = employeeDao.getByEntity(employee);
            departmentRubbish.setInstitutionParentCode(empEntity.getOffice().getOfficeCode());
        }
        /**/
        page.setList(departmentRubbishDao.overwriteListData(departmentRubbish));
        return page;
    }

    /**
     * 查询总重量
     *
     * @param departmentRubbish
     * @return
     * @Author Qiu
     * @Date 2021-01-12 17:27
     */
    public Double getWeight(DepartmentRubbish departmentRubbish) {
        return departmentRubbishDao.getWeight(departmentRubbish);
    }

    /**
     * 垃圾回收
     *
     * @return
     * @Author Qiu
     * @Date 2021-01-12 17:27
     */
    @Transactional(readOnly = false)
    public int wasteRecovery(String[] wasteRecovery, String status) {
        return departmentRubbishDao.wasteRecovery(wasteRecovery, status);
    }

    /**
     * 根据id查询追溯信息
     *
     * @param id
     * @return
     * @Author Qiu
     * @Date 2021-01-19 11:08
     */
    public DepartmentRubbish getDataById(String id) {
        return departmentRubbishDao.getDateById(id);
    }

    /**
     * @Description: 删除废弃物信息
     * @Author: lin
     * @Date: 2021/1/29 15:33
     * @Param: @param null
     * @return:
     */
    @Transactional(readOnly = false)
    public int remove(DepartmentRubbish departmentRubbish) {
        return departmentRubbishDao.remove(departmentRubbish);
    }

    /**
     * @Description: 根据废弃物编号修改状态
     * @Author: lin
     * @Date: 2021/1/29 15:33
     * @Param: @param null
     * @return:
     */
    @Transactional(readOnly = false)
    public int updateTransportStatusBySerialNumber(String serialNumber, String status) {
        return departmentRubbishDao.updateTransportStatusBySerialNumber(serialNumber, status);
    }

    @Transactional(readOnly = true)
    public boolean isExistSerialNumber(String serialNumber) {
        return departmentRubbishDao.isExistSerialNumber(serialNumber);
    }


    /**
     * 查询app端 垃圾运输明细
     *
     * @param
     * @return
     * @Author Wang
     * @Date 2021-04-6
     */
    public List<DepartmentRubbish> transportationDetails(DepartmentRubbish departmentRubbish) {

        List<DepartmentRubbish> list = departmentRubbishDao.transportationDetails(departmentRubbish);
        return list;
    }

}