package com.jeesite.modules.sys.service;

import com.jeesite.common.config.Global;
import com.jeesite.modules.sys.dao.OfficeDao;
import com.jeesite.modules.sys.dao.SysOfficeDao;
import com.jeesite.modules.sys.entity.EmployeePost;
import com.jeesite.modules.sys.entity.Office;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static com.jeesite.common.web.http.ServletUtils.renderResult;

/**
 * @Description: 机构service
 * @Author: wang
 * @Date: 2021/1/19 9:57
 */
@Service
public class SysOfficeService {
    @Resource
    private SysOfficeDao sysOfficeDao;
    @Resource
    private OfficeDao officeDao;

    /**
     * @Description: 获取机构
     * @Author: wang
     * @Date: 2021/1/19 10:00
     * @Param: @param null
     * @return:
     */
    public List<String> lisetOffice(String parentCode,String officeName) {

        Office office = new Office();
        office.setParentCode(parentCode);

        office.setOfficeName(officeName);
        List<Office> offices = officeDao.findList(office);
        List<String> officeNames = new ArrayList<>();
        for(int i =0;i<offices.size();i++){
            officeNames.add(offices.get(i).getOfficeName());
        }

        return officeNames;
    }
}
