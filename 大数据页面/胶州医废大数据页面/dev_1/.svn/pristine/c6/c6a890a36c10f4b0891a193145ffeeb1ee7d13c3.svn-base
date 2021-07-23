//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.jeesite.modules.sys.web.user;

import com.jeesite.common.codec.EncodeUtils;
import com.jeesite.common.collect.ListUtils;
import com.jeesite.common.collect.MapUtils;
import com.jeesite.common.entity.Page;
import com.jeesite.common.lang.DateUtils;
import com.jeesite.common.lang.StringUtils;
import com.jeesite.common.mapper.JsonMapper;
import com.jeesite.common.mybatis.mapper.query.QueryType;
import com.jeesite.common.utils.excel.ExcelExport;
import com.jeesite.common.utils.excel.annotation.ExcelField.Type;
import com.jeesite.common.web.BaseController;
import com.jeesite.modules.sys.dao.EmployeeDao;
import com.jeesite.modules.sys.dao.OfficeDao;
import com.jeesite.modules.sys.entity.*;
import com.jeesite.modules.sys.service.*;
import com.jeesite.modules.sys.utils.EmpUtils;
import com.jeesite.modules.sys.utils.UserUtils;

import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping({"${adminPath}/sys/empUser"})
@ConditionalOnProperty(
        name = {"web.core.enabled"},
        havingValue = "true",
        matchIfMissing = true
)
public class EmpUserController extends BaseController {
    @Autowired
    private EmpUserService empUserService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private PostService postService;
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;
    @Resource
    private OfficeDao officeDao;
    @Resource
    private EmployeeDao employeeDao;
    @Autowired
    private EmployeeUserRoleService employeeUserRoleService;

    public EmpUserController() {
    }

    @ModelAttribute
    public EmpUser get(String userCode, boolean isNewRecord) {
        return (EmpUser) this.empUserService.get(userCode, isNewRecord);
    }

    @RequiresPermissions({"sys:empUser:view"})
    @RequestMapping({"index"})
    public String index(EmpUser empUser, Model model) {
        return "modules/sys/user/empUserIndex";
    }

    @RequiresPermissions({"sys:empUser:view"})
    @RequestMapping({"list"})
    public String list(EmpUser empUser, Model model) {
        Post post = new Post();
        model.addAttribute("postList", this.postService.findList(post));
        return "modules/sys/user/empUserList";
    }

    @RequiresPermissions({"user"})
    @RequestMapping({"listData"})
    @ResponseBody
    public Page<EmpUser> listData(EmpUser empUser, Boolean isAll, HttpServletRequest request, HttpServletResponse response) {
        empUser.getEmployee().getOffice().setIsQueryChildren(true);
        empUser.getEmployee().getCompany().setIsQueryChildren(true);
       /* if (isAll == null || !isAll) {
            this.empUserService.addDataScopeFilter(empUser, "2");
        }*/
        Employee employee = new Employee();
        employee.setEmpCode(UserUtils.getUser().getUserCode());
        Employee employee2 = employeeDao.getByEntity(employee);
        if(!UserUtils.getUser().isAdmin()&& employee2 != null){

            empUser.getEmployee().getOffice().getSqlMap().getWhere().andBracket("office_code", QueryType.EQ, employee2.getOffice().getOfficeCode())
                    .or("parent_codes", QueryType.LIKE, employee2.getOffice().getOfficeCode()).endBracket();
        }

        empUser.setPage(new Page(request, response));
        Page<EmpUser> page = this.empUserService.findPage(empUser);
        return page;
    }

    @RequiresPermissions({"sys:empUser:view"})
    @RequestMapping({"form"})
    public String form(EmpUser empUser, String op, Model model, String officeCode) {
        Employee employee = empUser.getEmployee();
        if (StringUtils.isBlank(employee.getCompany().getCompanyCode())) {
            employee.setCompany(EmpUtils.getCompany());
        }

        if (StringUtils.isBlank(employee.getOffice().getOfficeCode())) {
            employee.setOffice(EmpUtils.getOffice());
        }

        Post post = new Post();
        model.addAttribute("postList", this.postService.findList(post));
        if (StringUtils.isNotBlank(employee.getEmpCode())) {
            employee.setEmployeePostList(this.employeeService.findEmployeePostList(employee));
        }

        if (StringUtils.inString(op, new String[]{"auth"})) {
            Role role = new Role();
            role.setUserCode(empUser.getUserCode());
            model.addAttribute("roleList", this.roleService.findListByUserCode(role));
        }
        //设置添加页面的已选定机构
        if (officeCode != null && !officeCode.trim().equals("")) {
            Office office = new Office();
            office.setOfficeCode(officeCode);
            empUser.getEmployee().setOffice(officeDao.getByEntity(office));
        }

        model.addAttribute("op", op);
        model.addAttribute("empUser", empUser);

        String userCode = UserUtils.getUser().getUserCode();
        if (userCode.equals("system")) {
            model.addAttribute("userCode", true);
        } else {
            model.addAttribute("userCode", false);
        }
        return "modules/sys/user/empUserForm";
    }

    @RequiresPermissions(
            value = {"sys:empUser:edit", "sys:empUser:authRole"},
            logical = Logical.OR
    )
    @PostMapping({"save"})
    @ResponseBody
    public String save(@Validated EmpUser empUser, String oldLoginCode, String op, HttpServletRequest request) {
        if (User.isSuperAdmin(empUser.getUserCode())) {
            return this.renderResult("false", "非法操作，不能够操作此用户！");
        } else if (!"employee".equals(empUser.getUserType())) {
            return this.renderResult("false", "非法操作，不能够操作此用户！");
        } else if (!"true".equals(this.userService.checkLoginCode(oldLoginCode, empUser.getLoginCode()))) {
            return this.renderResult("false", text("保存用户失败，登录账号''{0}''已存在", new String[]{empUser.getLoginCode()}));
        } else {
            if (StringUtils.inString(op, new String[]{"add", "edit"}) && UserUtils.getSubject().isPermitted("sys:empUser:edit")) {
                this.empUserService.save(empUser);
            }

            if (StringUtils.inString(op, new String[]{"add", "auth"}) && UserUtils.getSubject().isPermitted("sys:empUser:authRole")) {
               //this.userService.saveAuth(empUser);

                employeeUserRoleService.saveAuth(empUser);
            }

            return this.renderResult("true", text("保存用户''{0}''成功", new String[]{empUser.getUserName()}));
        }
    }

    @RequiresPermissions({"sys:empUser:view"})
    @RequestMapping({"exportData"})
    public void exportData(EmpUser empUser, Boolean isAll, HttpServletResponse response) {
        empUser.getEmployee().getOffice().setIsQueryChildren(true);
        empUser.getEmployee().getCompany().setIsQueryChildren(true);
        if (isAll == null || !isAll) {
            this.empUserService.addDataScopeFilter(empUser, "2");
        }

        List<EmpUser> list = this.empUserService.findList(empUser);
        String fileName = "用户数据" + DateUtils.getDate("yyyyMMddHHmmss") + ".xlsx";
        ExcelExport ee = new ExcelExport("用户数据", EmpUser.class);
        Throwable var7 = null;

        try {
            ee.setDataList(list).write(response, fileName);
        } catch (Throwable var16) {
            var7 = var16;
            throw var16;
        } finally {
            if (ee != null) {
                if (var7 != null) {
                    try {
                        ee.close();
                    } catch (Throwable var15) {
                        var7.addSuppressed(var15);
                    }
                } else {
                    ee.close();
                }
            }

        }

    }

    @RequiresPermissions({"sys:empUser:view"})
    @RequestMapping({"importTemplate"})
    public void importTemplate(HttpServletResponse response) {
        EmpUser empUser = new EmpUser();
        User user = UserUtils.getUser();
        if ("employee".equals(user.getUserType())) {
            empUser = (EmpUser) this.empUserService.get(user.getUserCode());
        } else {
            BeanUtils.copyProperties(user, empUser);
        }

        List<EmpUser> list = ListUtils.newArrayList(new EmpUser[]{empUser});
        String fileName = "用户数据模板.xlsx";
        ExcelExport ee = new ExcelExport("用户数据", EmpUser.class, Type.IMPORT, new String[0]);
        Throwable var7 = null;

        try {
            ee.setDataList(list).write(response, fileName);
        } catch (Throwable var16) {
            var7 = var16;
            throw var16;
        } finally {
            if (ee != null) {
                if (var7 != null) {
                    try {
                        ee.close();
                    } catch (Throwable var15) {
                        var7.addSuppressed(var15);
                    }
                } else {
                    ee.close();
                }
            }

        }

    }

    @ResponseBody
    @RequiresPermissions({"sys:empUser:edit"})
    @PostMapping({"importData"})
    public String importData(MultipartFile file, String updateSupport) {
        try {
            boolean isUpdateSupport = "1".equals(updateSupport);
            String message = this.empUserService.importData(file, isUpdateSupport);
            return this.renderResult("true", "posfull:" + message);
        } catch (Exception var5) {
            return this.renderResult("false", "posfull:" + var5.getMessage());
        }
    }

    @RequiresPermissions({"sys:empUser:updateStatus"})
    @ResponseBody
    @RequestMapping({"disable"})
    public String disable(EmpUser empUser) {
        if (User.isSuperAdmin(empUser.getUserCode())) {
            return this.renderResult("false", "非法操作，不能够操作此用户！");
        } else if (!"employee".equals(empUser.getUserType())) {
            return this.renderResult("false", "非法操作，不能够操作此用户！");
        } else if (empUser.getCurrentUser().getUserCode().equals(empUser.getUserCode())) {
            return this.renderResult("false", text("停用用户失败，不允许停用当前用户", new String[0]));
        } else {
            empUser.setStatus("2");
            this.userService.updateStatus(empUser);
            return this.renderResult("true", text("停用用户''{0}''成功", new String[]{empUser.getUserName()}));
        }
    }

    @RequiresPermissions({"sys:empUser:updateStatus"})
    @ResponseBody
    @RequestMapping({"enable"})
    public String enable(EmpUser empUser) {
        if (User.isSuperAdmin(empUser.getUserCode())) {
            return this.renderResult("false", "非法操作，不能够操作此用户！");
        } else if (!"employee".equals(empUser.getUserType())) {
            return this.renderResult("false", "非法操作，不能够操作此用户！");
        } else {
            empUser.setStatus("0");
            this.userService.updateStatus(empUser);
            return this.renderResult("true", text("启用用户''{0}''成功", new String[]{empUser.getUserName()}));
        }
    }

    @RequiresPermissions({"sys:empUser:resetpwd"})
    @RequestMapping({"resetpwd"})
    @ResponseBody
    public String resetpwd(EmpUser empUser) {
        if (User.isSuperAdmin(empUser.getUserCode())) {
            return this.renderResult("false", "非法操作，不能够操作此用户！");
        } else if (!"employee".equals(empUser.getUserType())) {
            return this.renderResult("false", "非法操作，不能够操作此用户！");
        } else {
            this.userService.updatePassword(empUser.getUserCode(), (String) null);
            return this.renderResult("true", text("重置用户''{0}''密码成功", new String[]{empUser.getUserName()}));
        }
    }

    @RequiresPermissions({"sys:empUser:edit"})
    @RequestMapping({"delete"})
    @ResponseBody
    public String delete(EmpUser empUser) {
        if (User.isSuperAdmin(empUser.getUserCode())) {
            return this.renderResult("false", "非法操作，不能够操作此用户！");
        } else if (!"employee".equals(empUser.getUserType())) {
            return this.renderResult("false", "非法操作，不能够操作此用户！");
        } else if (empUser.getCurrentUser().getUserCode().equals(empUser.getUserCode())) {
            return this.renderResult("false", text("删除用户失败，不允许删除当前用户", new String[0]));
        } else {
            this.empUserService.delete(empUser);
            return this.renderResult("true", text("删除用户'{0}'成功", new String[]{empUser.getUserName()}));
        }
    }

    @RequiresPermissions({"sys:empUser:authDataScope"})
    @RequestMapping({"formAuthDataScope"})
    public String formAuthDataScope(EmpUser empUser, Model model, HttpServletRequest request) {
        UserDataScope userDataScope = new UserDataScope();
        userDataScope.setUserCode(empUser.getUserCode());
        userDataScope.setCtrlPermi("1");
        List<UserDataScope> userDataScopeList = this.userService.findDataScopeList(userDataScope);
        model.addAttribute("userDataScopeList", userDataScopeList);
        model.addAttribute("empUser", empUser);
        return "modules/sys/user/empUserFormAuthDataScope";
    }

    @RequiresPermissions({"sys:empUser:authDataScope"})
    @RequestMapping({"saveAuthDataScope"})
    @ResponseBody
    public String saveAuthDataScope(EmpUser empUser, HttpServletRequest request) {
        if (User.isSuperAdmin(empUser.getUserCode())) {
            return this.renderResult("false", "非法操作，不能够操作此用户！");
        } else if (!"employee".equals(empUser.getUserType())) {
            return this.renderResult("false", "非法操作，不能够操作此用户！");
        } else {
            empUser.setMgrType("0");
            this.userService.saveAuthDataScope(empUser);
            return this.renderResult("true", text("用户分配数据权限成功", new String[0]));
        }
    }

    @RequiresPermissions({"user"})
    @RequestMapping({"treeData"})
    @ResponseBody
    public List<Map<String, Object>> treeData(String idPrefix, String pId, String officeCode, String companyCode, String postCode, String roleCode, Boolean isAll, String isShowCode) {
        List<Map<String, Object>> mapList = ListUtils.newArrayList();
        EmpUser empUser = new EmpUser();
        Employee employee = empUser.getEmployee();
        employee.getOffice().setOfficeCode(officeCode);
        employee.getOffice().setIsQueryChildren(false);
        employee.getCompany().setCompanyCode(companyCode);
        employee.getCompany().setIsQueryChildren(false);
        employee.setPostCode(postCode);
        empUser.setRoleCode(roleCode);
        empUser.setStatus("0");
        empUser.setUserType("employee");
        if (isAll == null || !isAll) {
            this.empUserService.addDataScopeFilter(empUser);
        }

        List<EmpUser> list = this.empUserService.findList(empUser);

        for (int i = 0; i < list.size(); ++i) {
            EmpUser e = (EmpUser) list.get(i);
            Map<String, Object> map = MapUtils.newHashMap();
            map.put("id", (String) StringUtils.defaultIfBlank(idPrefix, "u_") + e.getId());
            map.put("pId", StringUtils.defaultIfBlank(pId, "0"));
            map.put("name", StringUtils.getTreeNodeName(isShowCode, e.getLoginCode(), e.getUserName()));
            mapList.add(map);
        }

        return mapList;
    }

    @RequiresPermissions({"user"})
    @RequestMapping({"empUserSelect"})
    public String empUserSelect(EmpUser empUser, String selectData, String checkbox, Model model) {
        String selectDataJson = EncodeUtils.decodeUrl(selectData);
        if (JsonMapper.fromJson(selectDataJson, Map.class) != null) {
            model.addAttribute("selectData", selectDataJson);
        }

        model.addAttribute("checkbox", checkbox);
        model.addAttribute("empUser", empUser);
        return "modules/sys/user/empUserSelect";
    }
}
