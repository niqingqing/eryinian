package com.jeesite.modules.statiscs.dao;

import com.jeesite.common.entity.Page;
import com.jeesite.common.mybatis.annotation.MyBatisDao;
import com.jeesite.modules.departmentrubbish.entity.DepartmentRubbish;
import com.jeesite.modules.statiscs.entity.InstitutionShangBaoNumExportEntity;
import com.jeesite.modules.statiscs.entity.OfficeRubbishTypeStatiscs;
import com.jeesite.modules.statiscs.entity.Statiscs;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 统计DAO接口
 *
 * @author wang
 * @version 2021-01-19
 */
@MyBatisDao
public interface StaticsDao {

    /**
     * 机构统计
     *
     * @author wang
     * @version 2021-01-19
     */
    List<Statiscs> institutionStatiscs(@Param(value = "startTime") String startTime, @Param(value = "endTime") String endTime, @Param(value = "officeParentCode") String officeParentCode);

    /**
     * 垃圾类型统计
     *
     * @author wang
     * @version 2021-01-19
     */
    List<Statiscs> rubbishTypeStatiscs(@Param(value = "startTime") String startTime, @Param(value = "endTime") String endTime, @Param(value = "officeParentCode") String officeParentCode
            ,@Param(value = "keshi")Boolean isKeShi, @Param(value = "userCode") String userCode);

    /**
     * 告警类型统计
     *
     * @author wang
     * @version 2021-01-19
     */
    List<Statiscs> alarmStatiscs(@Param(value = "startTime") String startTime, @Param(value = "endTime") String endTime, @Param(value = "officeParentCode") String officeParentCode);

    /**
     * 垃圾类型折线统计
     *
     * @author wang
     * @version 2021-01-21
     */
    List<Statiscs> rubbishTypeStatiscsBroken(@Param(value = "startTime") String startTime, @Param(value = "endTime") String endTime,
                                             @Param(value = "officeParentCode") String officeParentCode,@Param(value = "keshi")Boolean isKeShi,
                                             @Param(value = "userCode") String userCode);

    /**
     * 垃圾类型告警折线统计
     *
     * @author wang
     * @version 2021-01-21
     */
    List<Statiscs> alarmStatiscsBroken(@Param(value = "startTime") String startTime, @Param(value = "endTime") String endTime, @Param(value = "officeParentCode") String officeParentCode);

    /**
     * 当日告警统计
     *
     * @author wang
     * @version 2021-03-09
     */
   /* List<Statiscs> todayStatiscs(@Param(value = "officeParentCode") String officeParentCode,
                                 @Param(value = "statiscsTime") String statiscsTime,@Param(value = "treeLevel") Integer treeLevel);*/

    List<Statiscs> institutionShangBaoNum(@Param(value = "officeParentCode") String officeParentCode,
                                          @Param(value = "officeName") String officeName,
                                          @Param(value = "startTime")String startTime,
                                          @Param(value = "endTime") String endTime,@Param(value = "treeLevel") Integer treeLevel);

    /**
     * 近7天告警统计
     *
     * @author wang
     * @version 2021-03-09
     */
    /*List<Statiscs> weekStatiscs(@Param(value = "officeParentCode") String officeParentCode,@Param(value = "startTime") String satrtTime,
                                 @Param(value = "endTime") String endTime,@Param(value = "treeLevel") Integer treeLevel);*/

    /**
     * 本月告警统计
     *
     * @author wang
     * @version 2021-03-10
     */
    List<Statiscs> mouthStatiscs(@Param(value = "officeParentCode") String officeParentCode,@Param(value = "startTime") String satrtTime,
                                @Param(value = "endTime") String endTime,@Param(value = "statiscsTime") String statiscsTime,@Param(value = "treeLevel") Integer treeLevel);

    /**
     * 告警统计导出
     *
     * @author wang
     * @version 2021-03-10
     */
    List<Statiscs> statiscsExport(@Param(value = "officeParentCode") String officeParentCode,@Param(value = "startTime") String satrtTime,
                                 @Param(value = "endTime") String endTime,@Param(value = "statiscsTime") String statiscsTime,@Param(value = "treeLevel") Integer treeLevel);


    /**
     * 机构分类重量统计
     *
     * @author wang
     * @version 2021-03-17
     */
    List<OfficeRubbishTypeStatiscs> officeTypeWeightStatiscs(@Param(value = "officeParentCode") String officeParentCode,
                                                             @Param(value = "institutionName") String institutionName,@Param(value = "startTime") String satrtTime,
                                                             @Param(value = "endTime") String endTime, @Param(value = "statiscsTime") String statiscsTime,@Param(value = "treeLevel") Integer treeLevel);

    /**
     * 机构分类重量统计导出
     *
     * @author wang
     * @version 2021-03-17
     */
    List<OfficeRubbishTypeStatiscs> officeTypeWeightStatiscsExport(@Param(value = "officeParentCode") String officeParentCode,
                                                             @Param(value = "startTime") String satrtTime,
                                                             @Param(value = "endTime") String endTime);


    Statiscs  rubbishStatiscs( @Param(value="departmentRubbish")  DepartmentRubbish departmentRubbish,
                                           @Param(value="startTime") String startTime, @Param(value="endTime") String endTime);
    //

    /**
     * 待回收明细导出
     *
     * @author wang
     * @version 2021-03-10
     */
    List<InstitutionShangBaoNumExportEntity> institutionShangBaoNumExprot(@Param(value = "officeParentCode") String officeParentCode,
                                                                          @Param(value = "startTime") String satrtTime,
                                                                          @Param(value = "endTime") String endTime);

    /**
     * 大屏概况
     *
     * @author wang
     * @version 2021-04-29
     */
    Statiscs overviewScreen(@Param(value = "date") String date);

    Statiscs typePercentage(@Param(value = "date") String date);

    //右部分
    List<Statiscs> zzzstatiscsWeightList(@Param(value = "date") String date);

    //年度总结
    List<Statiscs> annualSummary(@Param(value = "date") String date);

}
