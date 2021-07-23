package com.jeesite.modules.universion.web;

import com.jeesite.common.config.Global;
import com.jeesite.common.web.BaseController;
import com.jeesite.modules.universion.entity.UniVersion;
import com.jeesite.modules.universion.service.UniVersionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Description: uni-app版本号 Controller
 * @Author Qiu
 * @Date 2021/1/11 17:01
 */
@Controller
@RequestMapping(value = "/version")
public class UniVersionController1 extends BaseController {

    @Autowired
    private UniVersionService uniVersionService;

    /**
    * 获取列表数据
    *@Author Qiu
    *@Date 2021-01-11 17:04
    *@param
    *@return
    */
    @RequestMapping(value = "listData")
    @ResponseBody
    public String listData(UniVersion uniVersion){

        Map<String,Object> data = new HashMap<>();
        //获取版本号列表数据
        List<UniVersion> list = uniVersionService.listData(uniVersion);

        if(list.size() == 1){
            data.put("msg","获取成功");
            data.put("version", list.get(0).getVersion());
            data.put("connect", list.get(0).getConnect());
        }else{
            data.put("msg","系统错误");
        }
        return renderResult(Global.TRUE, text(""),data);
    }

    /**
     * 更新版本号
     *@Author Qiu
     *@Date 2021-01-12 08:07
     *@param
     *@return
     */
    @RequestMapping(value = "updateVersion")
    @ResponseBody
    public String updateVersion(String version){
        int i = uniVersionService.updateVersion(version);
        String msg = "" ;
        if(i == 1){
            msg = "更新成功";
        }else{
            msg = "更新失败";
        }
        return renderResult(Global.TRUE, text(msg));

    }
}
