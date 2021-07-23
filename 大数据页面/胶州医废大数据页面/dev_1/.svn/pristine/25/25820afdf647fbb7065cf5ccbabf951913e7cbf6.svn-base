package com.jeesite.modules.sys.dao;

import com.jeesite.common.mybatis.annotation.MyBatisDao;
import com.jeesite.modules.sys.entity.Role;
import com.jeesite.modules.sys.entity.User;
import com.jeesite.modules.sys.entity.UserRole;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@MyBatisDao
public interface EmployeeUserRoleDao {

    Integer insterRole(@Param(value= "userCode") String userCode, @Param(value= "roleCode") List<UserRole> roleCode);
}
