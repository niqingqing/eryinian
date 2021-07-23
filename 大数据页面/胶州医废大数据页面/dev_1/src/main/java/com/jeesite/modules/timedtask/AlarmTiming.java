/*
package com.jeesite.modules.timedtask;

import com.dingtalk.api.request.OapiRobotSendRequest;
import com.jeesite.modules.departmentrubbish.dao.DepartmentRubbishDao;
import com.jeesite.modules.departmentrubbish.entity.DepartmentRubbish;
import com.jeesite.modules.rubbishalarm.dao.WasteAlarmDao;
import com.jeesite.modules.rubbishalarm.entity.WasteAlarm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

*/
/**
 * @Description: TODO
 * @Author Qiu
 * @Date 2021/1/19 15:19
 *//*

@Component
@Configuration
@EnableScheduling
@Slf4j
public class AlarmTiming {

    @Resource
    private DepartmentRubbishDao departmentRubbishDao;

    @Resource
    private WasteAlarmDao wasteAlarmDao;

    @Scheduled(cron = "0 0 23 * * ?")
    private void alarmTaskTimer() {
        Calendar ca = Calendar.getInstance();//得到一个Calendar的实例
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        ca.setTime(new Date());//设置当前时间
        ca.add(Calendar.DATE, -2);
        Date produceDate = ca.getTime();
        List<DepartmentRubbish> timeOutList = departmentRubbishDao.getTimeOutList(produceDate);//查询待回收垃圾超时列表
        for (int i = 0; i < timeOutList.size(); i++) {
            //根据序列号查询数据是否存在
            int dataBySerialNumber = wasteAlarmDao.getDataBySerialNumber(timeOutList.get(i).getSerialNumber());

            if(dataBySerialNumber == 0){
                WasteAlarm wasteAlarm = new WasteAlarm();
                wasteAlarm.setDepartmentRubbishId(timeOutList.get(i).getSerialNumber());
                wasteAlarm.setAlarmType("超时待回收");
                wasteAlarm.setStatus("1");
                wasteAlarm.setAlarmDate(new Date());
                wasteAlarm.setCreateDate(new Date());
                //插入到垃圾告警列表
                wasteAlarmDao.insert(wasteAlarm);
                //推送告警信息到钉钉群
                OapiRobotSendRequest.Markdown markdown = new OapiRobotSendRequest.Markdown();
                markdown.setTitle("废弃物超时未回收");
                markdown.setText("# 废弃物超时未回收告警" + "\n" +
                        "- " + "所属机构:" + timeOutList.get(i).getInstitution() + "\n" +
                        "- " + "类型:" + timeOutList.get(i).getRubbishType() + "\n" +
                        "- " + "重量:" + timeOutList.get(i).getWeight() + "\n" +
                        "- " + "封口日期:" + timeOutList.get(i).getProduceDate());

            }else{
                log.debug("已存在无需重复添加");
            }
        }
        log.debug("每一分钟来一次");
    }
}
*/
