//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.jeesite.modules.sys.web;

import com.jeesite.common.collect.ListUtils;
import com.jeesite.common.collect.MapUtils;
import com.jeesite.common.idgen.IdGen;
import com.jeesite.common.lang.StringUtils;
import com.jeesite.common.mybatis.mapper.query.QueryType;
import com.jeesite.common.web.BaseController;
import com.jeesite.modules.sys.dao.EmployeeDao;
import com.jeesite.modules.sys.dao.SinInUserDao;
import com.jeesite.modules.sys.entity.Employee;
import com.jeesite.modules.sys.entity.Office;
import com.jeesite.modules.sys.entity.Role;
import com.jeesite.modules.sys.entity.User;
import com.jeesite.modules.sys.service.OfficeService;
import com.jeesite.modules.sys.service.RoleService;
import com.jeesite.modules.sys.utils.UserUtils;

import java.util.List;
import java.util.Map;

import com.jeesite.modules.sys.web.user.EmpUserController;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
@RequestMapping({"${adminPath}/sys/office"})
@ConditionalOnProperty(
        name = {"web.core.enabled"},
        havingValue = "true",
        matchIfMissing = true
)
public class OfficeController extends BaseController {
    @Autowired
    private OfficeService officeService;
    @Autowired
    private EmpUserController empUserController;
    @Resource
    private EmployeeDao employeeDao;
    @Resource
    private SinInUserDao sinInUserDao;

    public OfficeController() {
    }

    @ModelAttribute
    public Office get(String officeCode, boolean isNewRecord) {
        return (Office)this.officeService.get(officeCode, isNewRecord);
    }

    @RequiresPermissions({"sys:office:view"})
    @RequestMapping({"index"})
    public String index(Office office, Model model) {
        return "redirect:" + this.adminPath + "/sys/office/list";
    }

    @RequiresPermissions({"sys:office:view"})
    @RequestMapping({"list"})
    public String list(Office office, Model model) {
        model.addAttribute("office", office);
        return "modules/sys/officeList";
    }

    @RequiresPermissions({"user"})
    @RequestMapping({"listData"})
    @ResponseBody
    public List<Office> listData(Office office) {


        Employee employee = new Employee();
        employee.setEmpCode(UserUtils.getUser().getUserCode());
        Employee employee2 = employeeDao.getByEntity(employee);
        if (StringUtils.isBlank(office.getParentCode()) && UserUtils.getUser().isAdmin()) {
            office.setParentCode("0");
        }else if(employee2 != null ){

            if(office.getParentCode()!=null && !office.getParentCode().trim().equals("")){
                office.setParentCode(employee2.getOffice().getOfficeCode());
            }else {
                office.setOfficeCode(employee2.getOffice().getOfficeCode());
            }
           /* office.getSqlMap().getWhere().andBracket("office_code", QueryType.EQ, employee2.getOffice().getOfficeCode())
                    .or("parent_code", QueryType.EQ, employee2.getOffice().getOfficeCode()).endBracket();*/
        }

        if (StringUtils.isNotBlank(office.getViewCode()) || StringUtils.isNotBlank(office.getOfficeName()) || StringUtils.isNotBlank(office.getFullName())) {
            office.setParentCode((String)null);
        }


        //this.officeService.addDataScopeFilter(office, "");
        List<Office> list = this.officeService.findList(office);
        return list;
    }

    @RequiresPermissions({"sys:office:view"})
    @RequestMapping({"form"})
    public String form(Office office, Model model) {
        office = this.createNextNode(office);
        if (StringUtils.isNotBlank(office.getParentCode())) {
            office.setParent((Office)this.officeService.get(office.getParentCode()));
        }

        if (office.getIsNewRecord()) {
            office.setTreeSort(30);
            Office where = new Office();
            where.setParentCode(office.getParentCode());
            Office last = (Office)this.officeService.getLastByParentCode(where);
            if (last != null) {
                office.setTreeSort(last.getTreeSort() + 30);
                office.setViewCode(IdGen.nextCode(last.getViewCode()));
            } else if (office.getParent() != null) {
                office.setViewCode(office.getParent().getViewCode() + "001");
            }
        }

        model.addAttribute("office", office);
        return "modules/sys/officeForm";
    }

    @RequiresPermissions({"sys:office:edit"})
    @RequestMapping({"createNextNode"})
    @ResponseBody
    public Office createNextNode(Office office) {
        if (StringUtils.isNotBlank(office.getParentCode())) {
            office.setParent((Office)this.officeService.get(office.getParentCode()));
        }

        if (office.getIsNewRecord()) {
            Office where = new Office();
            where.setParentCode(office.getParentCode());
            Office last = (Office)this.officeService.getLastByParentCode(where);
            if (last != null) {
                office.setTreeSort(last.getTreeSort() + 30);
                office.setViewCode(IdGen.nextCode(last.getViewCode()));
            } else if (office.getParent() != null) {
                office.setViewCode(office.getParent().getViewCode() + "001");
            }
        }

        if (office.getTreeSort() == null) {
            office.setTreeSort(30);
        }

        return office;
    }

    @RequiresPermissions({"sys:office:edit"})
    @PostMapping({"save"})
    @ResponseBody
    public String save(@Validated Office office, String cmd, Model model) {
        this.officeService.save(office);
        return this.renderResult("true", text("保存机构''{0}''成功", new String[]{office.getOfficeName()}));
    }

    @RequiresPermissions({"sys:office:edit"})
    @RequestMapping({"disable"})
    @ResponseBody
    public String disable(Office office) {
        Office where = new Office();
        where.setStatus("0");
        where.setParentCodes("," + office.getId() + ",");
        long count = this.officeService.findCount(where);
        if (count > 0L) {
            return this.renderResult("false", text("该机构包含未停用的子机构！", new String[0]));
        } else {
            office.setStatus("2");
            this.officeService.updateStatus(office);
            return this.renderResult("true", text("停用机构''{0}''成功", new String[]{office.getOfficeName()}));
        }
    }

    @RequiresPermissions({"sys:office:edit"})
    @RequestMapping({"enable"})
    @ResponseBody
    public String enable(Office office) {
        office.setStatus("0");
        this.officeService.updateStatus(office);
        return this.renderResult("true", text("启用机构''{0}''成功", new String[]{office.getOfficeName()}));
    }

    @RequiresPermissions({"sys:office:edit"})
    @RequestMapping({"delete"})
    @ResponseBody
    public String delete(Office office) {
        this.officeService.delete(office);
        return this.renderResult("true", text("删除机构''{0}''成功", new String[]{office.getOfficeName()}));
    }

    @RequiresPermissions({"user"})
    @RequestMapping({"treeData"})
    @ResponseBody
    public List<Map<String, Object>> treeData(String dataType,String excludeCode, String parentCode, Boolean isAll, String officeTypes, String companyCode, String isShowCode, String isShowFullName, Boolean isLoadUser, String postCode, String roleCode, String ctrlPermi) {
        List<Map<String, Object>> mapList = ListUtils.newArrayList();
        Office where = new Office();
        where.setStatus("0");
        where.setCompanyCode(companyCode);
        /*if (isAll == null || !isAll) {
            this.officeService.addDataScopeFilter(where, (String)StringUtils.defaultIfBlank(ctrlPermi, "1"));
        }*/
        Employee employee = new Employee();
        employee.setEmpCode(UserUtils.getUser().getUserCode());
        Employee employee2 = employeeDao.getByEntity(employee);
        User user = UserUtils.getUser();
        //获取用户角色编号
        List<String> userRoleCodes = sinInUserDao.getUserRoleCode(UserUtils.getUser().getUserCode());
        Boolean isKeShi = false;
        //判断请求来源是那个页面
        if(dataType != null){
            for(int i = 0;i<userRoleCodes.size();i++){
                if(userRoleCodes.get(i).equals("lajihuishou")||userRoleCodes.get(i).equals("yunshucheadmin")){
                    isKeShi = true;
                    break;
                }
            }
        }

        //判断登陆账号角色是否为管理员或者运输人员
        if(!UserUtils.getUser().isAdmin() && employee2 != null && !isKeShi){

            where.getSqlMap().getWhere().andBracket("office_code", QueryType.EQ, employee2.getOffice().getOfficeCode())
                    .or("parent_codes", QueryType.LIKE, employee2.getOffice().getOfficeCode()).endBracket();
        }

        List<Office> list = this.officeService.findList(where);

        //设置树形结构
        for(int i = 0; i < list.size(); ++i) {
            Office e = (Office)list.get(i);
            if ("0".equals(e.getStatus()) && (!StringUtils.isNotBlank(excludeCode) || !e.getId().equals(excludeCode) && !e.getParentCodes().contains("," + excludeCode + ",")) && (!StringUtils.isNotBlank(parentCode) || e.getOfficeCode().equals(parentCode) && e.getParentCodes().contains("," + parentCode + ",")) && (!StringUtils.isNotBlank(officeTypes) || StringUtils.inString(e.getOfficeType(), officeTypes.split(",")))) {
                Map<String, Object> map = MapUtils.newHashMap();
                map.put("id", e.getId());
                map.put("pId", e.getParentCode());
                String name = e.getOfficeName();
                if ("true".equals(isShowFullName) || "1".equals(isShowFullName)) {
                    name = e.getFullName();
                }

                map.put("name", StringUtils.getTreeNodeName(isShowCode, e.getViewCode(), name));
                map.put("title", e.getFullName());
                if (isLoadUser != null && isLoadUser) {
                    map.put("isParent", true);
                    List<Map<String, Object>> userList = this.empUserController.treeData("u_", e.getOfficeCode(), e.getOfficeCode(), companyCode, postCode, roleCode, isAll, isShowCode);
                    mapList.addAll(userList);
                }

                mapList.add(map);
            }
        }

        return mapList;
    }

    @RequiresPermissions({"sys:office:edit"})
    @RequestMapping({"fixTreeData"})
    @ResponseBody
    public String fixTreeData() {
        if (!UserUtils.getUser().isAdmin()) {
            return this.renderResult("false", "操作失败，只有管理员才能进行修复！");
        } else {
            this.officeService.fixTreeData();
            return this.renderResult("true", "数据修复成功");
        }
    }
}
