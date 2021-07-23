package com.jeesite.modules.sys.service;

import com.jeesite.modules.sys.dao.EmployeePostDao;
import com.jeesite.modules.sys.entity.EmployeePost;
import com.jeesite.modules.sys.utils.UserUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Description: TODO
 * @Author: lin
 * @Date: 2021/1/13 20:03
 */
@Service
public class EmployeePostService {

    @Resource
    private EmployeePostDao employeePostDao;

    /**
     * @Description: 获取当前用户岗位
     * @Author: lin
     * @Date: 2021/1/14 10:57
     * @Param: @param null
     * @return:
     */
    public List<EmployeePost> getUserPost(){

        String user = UserUtils.getUser().getUserCode();
        EmployeePost employeePost = new EmployeePost();
        employeePost.setEmpCode(user);
        //获取当前用户所在的岗位
        List<EmployeePost> postList = employeePostDao.findList(employeePost);

        return postList;

    }

}
