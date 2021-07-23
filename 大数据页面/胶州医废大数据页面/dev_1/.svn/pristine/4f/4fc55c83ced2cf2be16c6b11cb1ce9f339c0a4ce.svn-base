package com.jeesite.modules.universion.service;

import com.jeesite.common.service.CrudService;
import com.jeesite.modules.universion.dao.UniVersionDao;
import com.jeesite.modules.universion.entity.UniVersion;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Description: uni-app版本号 Service
 * @Author Qiu
 * @Date 2021/1/11 16:53
 */
@Service
@Transactional(readOnly=true)
public class UniVersionService extends CrudService<UniVersionDao, UniVersion> {

    @Resource
    private UniVersionDao uniVersionDao;
    /**
    * 获取列表
    *@Author Qiu
    *@Date 2021-01-11 17:00
    *@param
    *@return
    */
    public List<UniVersion> listData(UniVersion uniVersion){
        return uniVersionDao.listData(uniVersion);
    }

    /**
    * 更新版本号
    *@Author Qiu
    *@Date 2021-01-12 08:07
    *@param
    *@return
    */
    @Transactional(readOnly=false)
    public int updateVersion(String version){
        return uniVersionDao.updateVersion(version);
    }
}
