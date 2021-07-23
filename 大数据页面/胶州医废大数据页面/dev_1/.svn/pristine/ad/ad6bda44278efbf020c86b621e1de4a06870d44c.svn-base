/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.sys.dao;

import com.jeesite.common.dao.CrudDao;
import com.jeesite.common.mybatis.annotation.MyBatisDao;
import com.jeesite.modules.sys.entity.UserWxBinder;
import org.apache.ibatis.annotations.Param;

/**
 * 用户微信绑定DAO接口
 * @author lin
 * @version 2021-01-14
 */
@MyBatisDao
public interface UserWxBinderDao extends CrudDao<UserWxBinder> {

    /**
     * @Description: 根据userCode判断该用户是否已经绑定
     * @Author: lin
     * @Date: 2021/1/14 18:11
     * @Param: @param null
     * @return:
     */
    boolean isExistByUserCode(@Param("userCode") String userCode, @Param("binderSource") String binderSource);

    /**
     * @Description: 根据unionid获取用户userCode
     * @Author: lin
     * @Date: 2021/1/14 18:21
     * @Param: @param null
     * @return:
     */
    String getUserCodeByUnionid(String unionid);

    /**
     * @Description: 根据openid获取用户userCode
     * @Author: wang
     * @Date: 2021/1/15 9:20
     * @Param: @param null
     * @return:
     */
    String getUserCodeByOpenid(String openid);

    /**
     * @Description: 保存方法
     * @Author: lin
     * @Date: 2021/1/15 16:10
     * @Param: @param null
     * @return:
     */
    int save1(UserWxBinder userWxBinder);

    /**
     * @Description: 微信解绑
     * @Author: lin
     * @Date: 2021/1/15 18:37
     * @Param: @param null
     * @return:
     */
    int unBinder(@Param("userCode") String userCode, @Param("binderSource") Integer binderSource);
}