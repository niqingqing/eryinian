package com.jeesite.modules.statiscs.service;

import com.jeesite.common.entity.Page;
import com.jeesite.common.mybatis.mapper.query.QueryType;
import com.jeesite.modules.departmentrubbish.entity.DepartmentRubbish;
import com.jeesite.modules.statiscs.dao.StaticsDao;
import com.jeesite.modules.statiscs.entity.InstitutionShangBaoNumExportEntity;
import com.jeesite.modules.statiscs.entity.OfficeRubbishTypeStatiscs;
import com.jeesite.modules.statiscs.entity.Statiscs;
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
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 统计Service
 *
 * @author wang
 * @version 2021-01-19
 */
@Service
@Transactional(readOnly = true)
public class StatiscsService {
    @Resource
    private StaticsDao staticsDao;
    @Resource
    private EmployeeDao employeeDao;
    @Resource
    private SinInUserDao sinInUserDao;
    @Resource
    private OfficeDao officeDao;

    /**
     * 机构统计
     *
     * @author wang
     * @version 2021-01-19
     */
    public Map<String, Object> institutionStatiscs(String startTime, String endTime) {
        String officeParentCode = getOfficeParentCode();

        //获取统计集合
        List<Statiscs> statiscs = staticsDao.institutionStatiscs(startTime, endTime, officeParentCode);

        //垃圾数量
        List<Integer> numList = new ArrayList<>();
        //机构名称
        List<String> institutionNameList = new ArrayList<>();
        //垃圾重量
        List<Double> weightList = new ArrayList<>();
        //传播型重量
        List<Double> infectedWeightList = new ArrayList<>();
        //感染型重量
        List<Double> contagionWeightList = new ArrayList<>();
        //病理型重量
        List<Double> pathologyWeightList = new ArrayList<>();
        //损伤型重量
        List<Double> damageWeightList = new ArrayList<>();
        //药物型重量
        List<Double> medicineWeightList = new ArrayList<>();

        //传播型数量
        List<Integer> infectedCountList = new ArrayList<>();
        //感染型数量
        List<Integer> contagionCountList = new ArrayList<>();
        //病理型数量
        List<Integer> pathologyCountList = new ArrayList<>();
        //损伤型数量
        List<Integer> damageCountList = new ArrayList<>();
        //药物型数量
        List<Integer> medicineCountList = new ArrayList<>();
        //循环添加list
        for (int i = 0; i < statiscs.size(); i++) {
            numList.add(statiscs.get(i).getNum());
            institutionNameList.add(statiscs.get(i).getInstitutionName());
            weightList.add(statiscs.get(i).getWeight());
            //重量
            infectedWeightList.add(statiscs.get(i).getInfectedWeight());
            contagionWeightList.add(statiscs.get(i).getContagionWeight());
            pathologyWeightList.add(statiscs.get(i).getPathologyWeight());
            damageWeightList.add(statiscs.get(i).getDamageWeight());
            medicineWeightList.add(statiscs.get(i).getMedicineWeight());
            //数量
            infectedCountList.add(statiscs.get(i).getInfectedCount());
            contagionCountList.add(statiscs.get(i).getContagionCount());
            pathologyCountList.add(statiscs.get(i).getPathologyCount());
            damageCountList.add(statiscs.get(i).getDamageCount());
            medicineCountList.add(statiscs.get(i).getMedicineCount());
        }

        //添加map
        Map<String, Object> map = new HashMap<>();
        map.put("num", numList);
        map.put("institutionName", institutionNameList);
        map.put("weight", weightList);
        //重量
        map.put("infected", infectedWeightList);
        map.put("contagion", contagionWeightList);
        map.put("pathology", pathologyWeightList);
        map.put("damage", damageWeightList);
        map.put("medicine", medicineWeightList);
        //数量
        map.put("infectedCount", infectedCountList);
        map.put("contagionCount", contagionCountList);
        map.put("pathologyCount", pathologyCountList);
        map.put("damageCount", damageCountList);
        map.put("medicineCount", medicineCountList);

        return map;
    }

    /**
     * 垃圾类型统计
     *
     * @author wang
     * @version 2021-01-19
     */
    public Map<String, Object> rubbishTypeStatiscs(String startTime, String endTime) {
        String officeParentCode = getOfficeParentCode();
        //获取用户角色编号
        List<String> userRoleCodes = sinInUserDao.getUserRoleCode(UserUtils.getUser().getUserCode());
        Boolean isKeShi = false;
        for (int i = 0; i < userRoleCodes.size(); i++) {
            if (userRoleCodes.get(i).equals("keshi")) {
                isKeShi = true;
                break;
            }
        }
        //获取统计集合
        List<Statiscs> statiscs = staticsDao.rubbishTypeStatiscs(startTime, endTime, officeParentCode, isKeShi, UserUtils.getUser().getUserCode());
        //垃圾数量
        List<Integer> numList = new ArrayList<>();
        //机构名称
        List<String> rubbishTypeList = new ArrayList<>();
        //机构名称
        List<Double> weightList = new ArrayList<>();
        for (int i = 0; i < statiscs.size(); i++) {
            numList.add(statiscs.get(i).getNum());
            rubbishTypeList.add(statiscs.get(i).getRubbishType());
            weightList.add(statiscs.get(i).getWeight());
        }

        Map<String, Object> map = new HashMap<>();
        map.put("num", numList);
        map.put("rubbishType", rubbishTypeList);
        map.put("weight", weightList);

        return map;
    }

    /**
     * 告警类型统计
     *
     * @author wang
     * @version 2021-01-19
     */
    public Map<String, Object> alarmStatiscs(String startTime, String endTime) {
        String officeParentCode = getOfficeParentCode();
        //获取统计集合
        List<Statiscs> statiscs = staticsDao.alarmStatiscs(startTime, endTime, officeParentCode);
        //机构名称
        List<String> institutionNameList = new ArrayList<>();

        //传播型数量
        List<Integer> infectedCountList = new ArrayList<>();
        //感染型数量
        List<Integer> contagionCountList = new ArrayList<>();
        //病理型数量
        List<Integer> pathologyCountList = new ArrayList<>();
        //损伤型数量
        List<Integer> damageCountList = new ArrayList<>();
        //药物型数量
        List<Integer> medicineCountList = new ArrayList<>();
        for (int i = 0; i < statiscs.size(); i++) {
            institutionNameList.add(statiscs.get(i).getInstitutionName());
            //数量
            infectedCountList.add(statiscs.get(i).getInfectedCount());
            contagionCountList.add(statiscs.get(i).getContagionCount());
            pathologyCountList.add(statiscs.get(i).getPathologyCount());
            damageCountList.add(statiscs.get(i).getDamageCount());
            medicineCountList.add(statiscs.get(i).getMedicineCount());
        }

        Map<String, Object> map = new HashMap<>();
        map.put("institutionName", institutionNameList);
        //数量
        map.put("infectedCount", infectedCountList);
        map.put("contagionCount", contagionCountList);
        map.put("pathologyCount", pathologyCountList);
        map.put("damageCount", damageCountList);
        map.put("medicineCount", medicineCountList);

        return map;
    }

    /**
     * 垃圾类型统计折线图
     */
    public List<Statiscs> rubbishTypeStatiscsBroken(String startTime, String endTime) {
        String officeParentCode = getOfficeParentCode();
        //获取用户角色编号
        List<String> userRoleCodes = sinInUserDao.getUserRoleCode(UserUtils.getUser().getUserCode());
        Boolean isKeShi = false;
        for (int i = 0; i < userRoleCodes.size(); i++) {
            if (userRoleCodes.get(i).equals("keshi")) {
                isKeShi = true;
                break;
            }
        }
        List<Statiscs> statiscs = staticsDao.rubbishTypeStatiscsBroken(startTime, endTime, officeParentCode, isKeShi, UserUtils.getUser().getUserCode());
        //获取查询时间区间
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        List<Statiscs> list = new ArrayList<Statiscs>();

        Map<String, Object> map = new HashMap<>();
        Date start = null;// 起始日期
        Date end = null;// 结束日期
        try {
            start = dateFormat.parse(startTime);
            end = dateFormat.parse(endTime);
            Date tmp = start;
            Calendar dd = Calendar.getInstance();
            dd.setTime(start);


            // 日期
            while (tmp.getTime() < end.getTime()) {
                tmp = dd.getTime();
                Statiscs chart = new Statiscs();
                chart.setStatiscsDate(dateFormat.format(tmp));

                for (int i = 0; i < statiscs.size(); i++) {
                    //日期中存在
                    if (statiscs.get(i).getStatiscsDate() != null && statiscs.get(i).getStatiscsDate().equals(dateFormat.format(tmp))) {
                        //重量
                        chart.setContagionWeight(statiscs.get(i).getContagionWeight());
                        chart.setDamageWeight(statiscs.get(i).getDamageWeight());
                        chart.setMedicineWeight(statiscs.get(i).getMedicineWeight());
                        chart.setPathologyWeight(statiscs.get(i).getPathologyWeight());
                        chart.setInfectedWeight(statiscs.get(i).getInfectedWeight());

                    }
                }
                list.add(chart);
                // 天数加上1
                dd.add(Calendar.DAY_OF_MONTH, 1);
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return list;
    }

    /**
     * 垃圾类型统计折线图
     */
    public List<Statiscs> alarmStatiscsBroken(String startTime, String endTime) {
        String officeParentCode = getOfficeParentCode();

        List<Statiscs> statiscs = staticsDao.alarmStatiscsBroken(startTime, endTime, officeParentCode);
        //获取查询时间区间
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        List<Statiscs> list = new ArrayList<Statiscs>();

        Map<String, Object> map = new HashMap<>();
        Date start = null;// 起始日期
        Date end = null;// 结束日期
        try {
            start = dateFormat.parse(startTime);
            end = dateFormat.parse(endTime);
            Date tmp = start;
            Calendar dd = Calendar.getInstance();
            dd.setTime(start);

            // 日期
            while (tmp.getTime() < end.getTime()) {
                tmp = dd.getTime();
                Statiscs chart = new Statiscs();
                chart.setStatiscsDate(dateFormat.format(tmp));

                for (int i = 0; i < statiscs.size(); i++) {
                    //日期中存在
                    if (statiscs.get(i).getStatiscsDate() != null && statiscs.get(i).getStatiscsDate().equals(dateFormat.format(tmp))) {
                        //数量
                        chart.setNum(statiscs.get(i).getNum());
                    }
                }
                list.add(chart);
                // 天数加上1
                dd.add(Calendar.DAY_OF_MONTH, 1);
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return list;
    }

    /**
     * 获取登录用户所属机构编号
     *
     * @return
     */
    public String getOfficeParentCode() {
        String OfficeParentCode = "";
        /**
         * 创建新的employee对象，用于获取登录用户所属的机构编号
         */
        Employee employee = new Employee();

        //给新创建的对象设置用户编号
        employee.setEmpCode(UserUtils.getUser().getUserCode());
        employee = employeeDao.getByEntity(employee);
        if (UserUtils.getUser().isAdmin()) {
            OfficeParentCode = "0";
        } else if (employee != null) {
            OfficeParentCode = employee.getOffice().getOfficeCode();
        }
        return OfficeParentCode;
    }


    /**
     * 当日统计
     *
     * @param
     * @return
     * @Author wang
     * @Date 2021-03-08
     */
    public List<Statiscs> todayStatiscs(Statiscs statiscs, Integer treeLevel) {
        List<Statiscs> list = new ArrayList<>();
        /**
         * 创建新的employee对象，用于获取登录用户所属的机构编号
         */
        Employee employee = new Employee();

        //给新创建的对象设置用户编号
        employee.setEmpCode(UserUtils.getUser().getUserCode());
        employee = employeeDao.getByEntity(employee);
        //获取用户角色编号
        List<String> userRoleCodes = sinInUserDao.getUserRoleCode(UserUtils.getUser().getUserCode());
        Boolean isKeShi = false;
        //判断当前角色是不是运输车人员
        Boolean bool = false;
        for (int i = 0; i < userRoleCodes.size(); i++) {
            //不为空时
            if (userRoleCodes.get(i).equals("yunshucheadmin") || userRoleCodes.get(i).equals("lajihuishou")) {
                bool = true;
            }
        }
        //不为空时
        if (UserUtils.getUser().isAdmin() || bool) {
            list = getToday(statiscs.getParentCode(), treeLevel);
            list = foreachUtil(list, treeLevel, statiscs.getParentCode());
        } else if (employee != null) {
            list = getToday(employee.getOffice().getOfficeCode(), treeLevel);
            list = foreachUtil(list, treeLevel, employee.getOffice().getOfficeCode());
        }

        return list;
    }

    /**
     * 本周统计
     *
     * @param
     * @return
     * @Author wang
     * @Date 2021-03-08
     */
    public List<Statiscs> weekStatiscs(Statiscs statiscs, Integer treeLevel, String startTime, String endTime) {
        List<Statiscs> list = new ArrayList<>();
        /**
         * 创建新的employee对象，用于获取登录用户所属的机构编号
         */
        Employee employee = new Employee();

        //给新创建的对象设置用户编号
        employee.setEmpCode(UserUtils.getUser().getUserCode());
        employee = employeeDao.getByEntity(employee);

        //获取用户角色编号
        List<String> userRoleCodes = sinInUserDao.getUserRoleCode(UserUtils.getUser().getUserCode());
        Boolean isKeShi = false;
        //判断当前角色是不是运输车人员
        Boolean bool = false;
        for (int i = 0; i < userRoleCodes.size(); i++) {
            //不为空时
            if (userRoleCodes.get(i).equals("yunshucheadmin") || userRoleCodes.get(i).equals("lajihuishou")) {
                bool = true;
            }
        }
        //不为空时
        if (UserUtils.getUser().isAdmin() || bool) {
            list = getWeek(statiscs.getParentCode(), treeLevel, startTime, endTime);
            list = foreachUtil(list, treeLevel, statiscs.getParentCode());
        } else if (employee != null) {
            list = getWeek(employee.getOffice().getOfficeCode(), treeLevel, startTime, endTime);
            list = foreachUtil(list, treeLevel, employee.getOffice().getOfficeCode());
        }

        return list;
    }

    /**
     * 本月统计
     *
     * @param
     * @return
     * @Author wang
     * @Date 2021-03-08
     */
    public List<Statiscs> mouthStatiscs(Statiscs statiscs, Integer treeLevel, String startTime, String endTime) {
        List<Statiscs> list = new ArrayList<>();
        /**
         * 创建新的employee对象，用于获取登录用户所属的机构编号
         */
        Employee employee = new Employee();

        //给新创建的对象设置用户编号
        employee.setEmpCode(UserUtils.getUser().getUserCode());
        employee = employeeDao.getByEntity(employee);

        //获取用户角色编号
        List<String> userRoleCodes = sinInUserDao.getUserRoleCode(UserUtils.getUser().getUserCode());
        Boolean isKeShi = false;
        //判断当前角色是不是运输车人员
        Boolean bool = false;
        for (int i = 0; i < userRoleCodes.size(); i++) {
            //不为空时
            if (userRoleCodes.get(i).equals("yunshucheadmin") || userRoleCodes.get(i).equals("lajihuishou")) {
                bool = true;
            }
        }
        //不为空时
        if (UserUtils.getUser().isAdmin() || bool) {
            list = getMouth(statiscs.getParentCode(), treeLevel, startTime, endTime);
            list = foreachUtil(list, treeLevel, statiscs.getParentCode());
        } else if (employee != null) {
            list = getMouth(employee.getOffice().getOfficeCode(), treeLevel, startTime, endTime);
            list = foreachUtil(list, treeLevel, employee.getOffice().getOfficeCode());
        }

        return list;
    }

    private List<Statiscs> getMouth(String officeCode, Integer treeLevel, String startTime, String endTime) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
        Date date = new Date();
        String statiscsTime = "";
        //如果传来的时间区间，才在null值或者存在空字符串
        if (startTime == null || startTime.trim().equals("") || endTime == null || endTime.trim().equals("")) {
            statiscsTime = sdf.format(new Date(date.getTime()));
        } else if (startTime != null && !startTime.trim().equals("") && endTime != null && !endTime.trim().equals("")) {
            try {
                SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
                Date date1 = sdf1.parse(endTime);
                endTime = sdf1.format(new Date(date1.getTime() + 1 * 24 * 60 * 60 * 1000));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        return staticsDao.mouthStatiscs(officeCode, startTime, endTime, statiscsTime, treeLevel);
    }

    private List<Statiscs> getToday(String officeCode, Integer treeLevel) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        String statiscsTime = sdf.format(date.getTime());
        return staticsDao.mouthStatiscs(officeCode, null, null, statiscsTime, treeLevel);
    }

    private List<Statiscs> getWeek(String officeCode, Integer treeLevel, String startTime, String endTime) {

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        //如果传来的时间区间，才在null值或者存在空字符串
        if (startTime == null || startTime.trim().equals("") || endTime == null || endTime.trim().equals("")) {
            endTime = sdf.format(date.getTime() + 24 * 60 * 60 * 1000);
            startTime = sdf.format(date.getTime() - 6 * 24 * 60 * 60 * 1000);
        } else if (startTime != null && !startTime.trim().equals("") && endTime != null && !endTime.trim().equals("")) {
            try {
                date = sdf.parse(endTime);
                endTime = sdf.format(new Date(date.getTime() + 24 * 60 * 60 * 1000));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        return staticsDao.mouthStatiscs(officeCode, startTime, endTime, null, treeLevel);
    }


    /**
     * 告警统计导出
     *
     * @param
     * @return
     * @Author wang
     * @Date 2021-03-10
     */
    public List<Statiscs> statiscsExport(Statiscs statiscs, Integer treeLevel, String startTime, String endTime) {
        List<Statiscs> list = new ArrayList<>();
        /**
         * 创建新的employee对象，用于获取登录用户所属的机构编号
         */
        Employee employee = new Employee();

        //给新创建的对象设置用户编号
        employee.setEmpCode(UserUtils.getUser().getUserCode());
        employee = employeeDao.getByEntity(employee);

        //不为空时
        if (UserUtils.getUser().isAdmin()) {
            list = statiscsExportDate(statiscs.getParentCode(), -1, startTime, endTime);
        } else if (employee != null) {
            list = statiscsExportDate(employee.getOffice().getOfficeCode(), treeLevel, startTime, endTime);
        }

        return list;
    }

    private List<Statiscs> statiscsExportDate(String officeCode, Integer treeLevel, String startTime, String endTime) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
        Date date = new Date();
        String statiscsTime = "";
        //如果传来的时间区间，才在null值或者存在空字符串
        if (startTime == null || startTime.trim().equals("") || endTime == null || endTime.trim().equals("")) {
            statiscsTime = sdf.format(new Date(date.getTime()));
        } else if (startTime != null && !startTime.trim().equals("") && endTime != null && !endTime.trim().equals("")) {
            try {
                SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
                Date date1 = sdf1.parse(endTime);
                endTime = sdf1.format(new Date(date1.getTime() + 1 * 24 * 60 * 60 * 1000));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        return staticsDao.statiscsExport(officeCode, startTime, endTime, statiscsTime, treeLevel);
    }


    /**
     * 机构分类重量统计
     *
     * @author wang
     * @version 2021-03-17
     */
    public List<OfficeRubbishTypeStatiscs> officeTypeWeightStatiscs(Statiscs statiscs, String startTime, String endTime, Integer treeLevel) {

        String statiscsTime = "";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        //如果传来的时间区间，存在null值或者存在空字符串
        if (startTime == null || startTime.trim().equals("") || endTime == null || endTime.trim().equals("")) {
            SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM");
            statiscsTime = sdf2.format(new Date(date.getTime()));
        } else if (startTime != null && !startTime.trim().equals("") && endTime != null && !endTime.trim().equals("")) {
            try {
                date = sdf.parse(endTime);
                endTime = sdf.format(new Date(date.getTime() + 24 * 60 * 60 * 1000));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        List<OfficeRubbishTypeStatiscs> statiscsList = new ArrayList<>();
        /**
         * 创建新的employee对象，用于获取登录用户所属的机构编号
         */
        Employee employee = new Employee();

        //给新创建的对象设置用户编号
        employee.setEmpCode(UserUtils.getUser().getUserCode());
        employee = employeeDao.getByEntity(employee);
        //获取统计结果
        if (UserUtils.getUser().isAdmin()) {
            statiscsList = staticsDao.officeTypeWeightStatiscs(statiscs.getParentCode(), statiscs.getInstitutionName(), startTime, endTime, statiscsTime, treeLevel);

            if (treeLevel == 3) {
                for (int i = 0; i < statiscsList.size(); i++) {
                    if (statiscsList.get(i).getInstitutionCode().equals(statiscs.getParentCode())) {
                        statiscsList.get(i).setTreeLevel(2);
                        statiscsList.get(i).setParentCode(statiscs.getParentCode());
                        statiscsList.get(i).setId(statiscsList.get(i).getId() + "code");
                        statiscsList.get(i).setInstitutionCode("");
                        statiscsList.get(i).setTreeLeaf("1");
                        statiscsList.get(i).setParentCodes(statiscsList.get(i).getParentCodes() + "," + statiscs.getParentCode() + ",");
                        break;
                    }
                }
            }

        } else if (employee != null) {

            statiscsList = staticsDao.officeTypeWeightStatiscs(employee.getOffice().getOfficeCode(), statiscs.getInstitutionName(), startTime, endTime, statiscsTime, treeLevel);

            if (treeLevel == 3) {
                for (int i = 0; i < statiscsList.size(); i++) {
                    if (statiscsList.get(i).getInstitutionCode().equals(employee.getOffice().getOfficeCode())) {
                        statiscsList.get(i).setTreeLevel(2);
                        statiscsList.get(i).setParentCode(employee.getOffice().getOfficeCode());
                        statiscsList.get(i).setId(statiscsList.get(i).getId() + "code");
                        statiscsList.get(i).setInstitutionCode("");
                        statiscsList.get(i).setTreeLeaf("1");
                        statiscsList.get(i).setParentCodes(statiscsList.get(i).getParentCodes() + "," + employee.getOffice().getOfficeCode() + ",");
                        break;
                    }
                }
            }
        }

        return statiscsList;
    }

    /**
     * 机构分类重量统计
     *
     * @author wang
     * @version 2021-03-17
     */
    public List<OfficeRubbishTypeStatiscs> officeTypeWeightStatiscsExport(Statiscs statiscs, String startTime, String endTime) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        //如果传来的时间区间，存在null值或者存在空字符串
        if (startTime == null || startTime.trim().equals("") || endTime == null || endTime.trim().equals("")) {
            SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM");
        } else if (startTime != null && !startTime.trim().equals("") && endTime != null && !endTime.trim().equals("")) {
            try {
                date = sdf.parse(endTime);
                endTime = sdf.format(new Date(date.getTime() + 24 * 60 * 60 * 1000));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        String officeCode = "0";
        if (statiscs != null && statiscs.getInstitutionName() != null && !statiscs.getInstitutionName().trim().equals("")) {
            Office office = new Office();
            office.getSqlMap().getWhere().and("office_name", QueryType.EQ, statiscs.getInstitutionName());
            officeCode = officeDao.getByEntity(office).getOfficeCode();
        }
        List<OfficeRubbishTypeStatiscs> statiscsList = staticsDao.officeTypeWeightStatiscsExport(officeCode, startTime, endTime);

        return statiscsList;
    }

    /**
     * 首页统计方块
     *
     * @param departmentRubbish
     * @param startTime
     * @param endTime
     * @return
     */
    public Statiscs rubbishStatiscs(DepartmentRubbish departmentRubbish, String startTime, String endTime) {
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
        Statiscs statiscs = staticsDao.rubbishStatiscs(departmentRubbish, startTime, endTime);
        return statiscs;
    }

    /**
     * 待回收明细
     *
     * @param statiscs
     * @param treeLevel
     * @param startTime
     * @param endTime
     * @return
     */
    public List<Statiscs> institutionShangBaoNum(Statiscs statiscs, Integer treeLevel, String startTime, String endTime) {
        List<Statiscs> list = new ArrayList<>();
        /**
         * 创建新的employee对象，用于获取登录用户所属的机构编号
         */
        Employee employee = new Employee();

        //给新创建的对象设置用户编号
        employee.setEmpCode(UserUtils.getUser().getUserCode());
        employee = employeeDao.getByEntity(employee);
        if (startTime != null && endTime != null && startTime.trim().equals("") && endTime.trim().equals("")) {

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date date = new Date();
            endTime = sdf.format(date.getTime() + 24 * 60 * 60 * 1000);
            startTime = sdf.format(date.getTime() - 24 * 60 * 60 * 1000);
        } else {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date date = new Date();
            try {
                date = sdf.parse(endTime);
                endTime = sdf.format(new Date(date.getTime() + 24 * 60 * 60 * 1000));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        list = staticsDao.institutionShangBaoNum(statiscs.getParentCode(), statiscs.getInstitutionName(), startTime, endTime, -1);

        return list;
    }

    /**
     * 待回收明细导出
     *
     * @param statiscs
     * @param startTime
     * @param endTime
     * @return
     */
    public List<InstitutionShangBaoNumExportEntity> institutionShangBaoNumExport(Statiscs statiscs, String startTime, String endTime) {
        List<InstitutionShangBaoNumExportEntity> list = new ArrayList<>();

        //调整时间
        if (startTime != null && endTime != null && startTime.trim().equals("") && endTime.trim().equals("")) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date date = new Date();
            endTime = sdf.format(date.getTime() + 24 * 60 * 60 * 1000);
            startTime = sdf.format(date.getTime() - 24 * 60 * 60 * 1000);
        } else {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date date = new Date();
            try {
                date = sdf.parse(endTime);
                endTime = sdf.format(new Date(date.getTime() + 24 * 60 * 60 * 1000));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        String officeCode = "0";

        if (statiscs != null && statiscs.getInstitutionName() != null && !statiscs.getInstitutionName().trim().equals("")) {
            Office office = new Office();
            office.getSqlMap().getWhere().and("office_name", QueryType.EQ, statiscs.getInstitutionName());
            officeCode = officeDao.getByEntity(office).getOfficeCode();
        }

        list = staticsDao.institutionShangBaoNumExprot(officeCode, startTime, endTime);

        return list;
    }


    private static List<Statiscs> foreachUtil(List<Statiscs> list, Integer treeLevel, String officeParentCode) {
        if (treeLevel == 3) {
            for (int i = 0; i < list.size(); i++) {
                if (list.get(i).getInstitutionCode().equals(officeParentCode)) {
                    list.get(i).setTreeLevel(2);
                    list.get(i).setParentCode(officeParentCode);
                    list.get(i).setId(list.get(i).getInstitutionCode() + "code");
                    list.get(i).setInstitutionCode("");
                    list.get(i).setTreeLeaf("1");
                    list.get(i).setParentCodes(list.get(i).getParentCodes() + "," + officeParentCode + ",");
                    break;
                }
            }
        }
        return list;
    }


    /**
     * 大屏概况
     *
     * @author wang
     * @version 2021-04-29
     */
    public Statiscs overviewScreen(String type) {
        if (type == null || type.trim().equals("")) {
            type = "1";
        }
        String date = "";
        //判断统计时间类型（年月日）
        if (type != null && type.equals("1")) {
            SimpleDateFormat near = new SimpleDateFormat("yyyy");
            date = near.format(new Date());
        } else if (type != null && type.equals("2")) {
            SimpleDateFormat mouth = new SimpleDateFormat("yyyy-MM");
            date = mouth.format(new Date());
        } else if (type != null && type.equals("3")) {
            SimpleDateFormat day = new SimpleDateFormat("yyyy-MM-dd");
            date = day.format(new Date());
        }

        Statiscs statiscs = staticsDao.overviewScreen(date);

        return statiscs;
    }

    public Statiscs typePercentage() {

        Statiscs statiscs = staticsDao.typePercentage(null);

        return statiscs;
    }

    //右部分
    public List<Statiscs> zzzstatiscsWeightList(String type) {
        String date = "";
        //判断统计时间类型（年月日）
        if (type == null || type.trim().equals("")) {
            type = "3";
        }
        if (type != null && type.equals("1")) {
            SimpleDateFormat near = new SimpleDateFormat("yyyy");
            date = near.format(new Date());
        } else if (type != null && type.equals("2")) {
            SimpleDateFormat mouth = new SimpleDateFormat("yyyy-MM");
            date = mouth.format(new Date());
        } else if (type != null && type.equals("3")) {
            SimpleDateFormat day = new SimpleDateFormat("yyyy-MM-dd");
            date = day.format(new Date());
        }
        List<Statiscs> list = staticsDao.zzzstatiscsWeightList(date);
        for(int i = 0;i<list.size();i++){

            if(list.get(i).getInstitutionName().substring(0,3).equals("胶州市")){
                list.get(i).setInstitutionName(list.get(i).getInstitutionName().substring(3,list.get(i).getInstitutionName().length()));
            }
        }
        return list;
    }

    //右部分
    public List<Statiscs> annualSummary() {
        String date = "";
        SimpleDateFormat near = new SimpleDateFormat("yyyy");
        date = near.format(new Date());
        List<Statiscs> list = staticsDao.annualSummary(date);

        //获取查询时间区间
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM");
        List<Statiscs> statiscsList = new ArrayList<Statiscs>();

        Date start = null;// 起始日期
        Date end = null;// 结束日期
        try {
            start = dateFormat.parse(date+"-01");
            end = dateFormat.parse(date+"-12");
            Date tmp = start;
            Calendar dd = Calendar.getInstance();
            dd.setTime(start);
            // 日期
            while (tmp.getTime() < end.getTime()) {
                tmp = dd.getTime();
                Statiscs statiscs = new Statiscs();
                statiscs.setMonth(dateFormat.format(tmp));
                statiscs.setWeight(0.0);

                for (int i = 0; i < list.size(); i++) {
                    if (list.get(i).getMonth() != null && list.get(i).getMonth().equals(dateFormat.format(tmp).substring(5,7))) {
                        statiscs.setMonth(dateFormat.format(tmp));
                        statiscs.setWeight(list.get(i).getWeight());
                    }
                }

                if(statiscs.getMonth().substring(5,6).equals("0")){
                    statiscs.setMonth(statiscs.getMonth().substring(6,7));
                }else{
                    statiscs.setMonth(statiscs.getMonth().substring(5,7));
                }
                DecimalFormat df = new DecimalFormat("#.00");
                statiscs.setWeight(Double.valueOf(df.format(statiscs.getWeight()/10000)));

                statiscsList.add(statiscs);
                // 天数加上1
                dd.add(Calendar.MONTH, 1);
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return statiscsList;
    }

}
