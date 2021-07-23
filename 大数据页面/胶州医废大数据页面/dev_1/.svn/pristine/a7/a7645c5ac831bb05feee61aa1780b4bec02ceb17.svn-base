package com.jeesite.modules.sys.service;

import com.jeesite.common.collect.ListUtils;
import com.jeesite.common.config.Global;
import com.jeesite.common.lang.StringUtils;
import com.jeesite.modules.sys.dao.EmployeeUserRoleDao;
import com.jeesite.modules.sys.dao.UserDataScopeDao;
import com.jeesite.modules.sys.dao.UserRoleDao;
import com.jeesite.modules.sys.entity.User;
import com.jeesite.modules.sys.entity.UserDataScope;
import com.jeesite.modules.sys.entity.UserRole;
import com.jeesite.modules.sys.utils.UserUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Iterator;
import java.util.List;
@Service
public class EmployeeUserRoleService {
    @Resource
    private UserRoleDao userRoleDao;
    @Resource
    private UserDataScopeDao userDataScopeDao;
    @Resource
    private EmployeeUserRoleDao employeeUserRoleDao;

    public void saveAuthDataScope(User user) {
        Global.assertDemoMode();
        if (!StringUtils.isBlank(user.getUserCode())) {
            UserDataScope a = new UserDataScope();
            a.setUserCode(user.getUserCode());
            a.setCtrlPermi("2".equals(user.getMgrType()) ? "2" : "1");
            this.userDataScopeDao.deleteByEntity(a);
            List list;
            Iterator var4 = (list = user.getUserDataScopeList()).iterator();

            for(Iterator var10000 = var4; var10000.hasNext(); var10000 = var4) {
                ((UserDataScope)var4.next()).setCtrlPermi(a.getCtrlPermi());
            }

            boolean var10003 = true;

            ListUtils.pageList(list, 100, null);
            UserUtils.clearCache(user);
        }
    }

    public void saveAuth(User user) {
        Global.assertDemoMode();
        if (!StringUtils.isBlank(user.getUserCode())) {
            UserRole a = new UserRole();
            a.setUserCode(user.getUserCode());
            this.userRoleDao.deleteByEntity(a);
            List userRoleList = user.getUserRoleList();
            Iterator var12;

            Iterator var10;
            var12 = var10 = userRoleList.iterator();

            while(var12.hasNext()) {
                UserRole userRole = (UserRole)var10.next();
                var12 = var10;
                user.setUserCode(user.getUserCode());
            }

            if (ListUtils.isNotEmpty(userRoleList)) {
                employeeUserRoleDao.insterRole(user.getUserCode(),user.getUserRoleList());
            }

            UserUtils.clearCache(user);
        }
    }
}
