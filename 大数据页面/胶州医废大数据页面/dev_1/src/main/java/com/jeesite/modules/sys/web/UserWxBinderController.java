/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.sys.web;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.util.StrUtil;
import com.jeesite.common.config.Global;
import com.jeesite.common.entity.Page;
import com.jeesite.common.lang.StringUtils;
import com.jeesite.common.shiro.authc.FormToken;
import com.jeesite.common.shiro.realm.BaseAuthorizingRealm;
import com.jeesite.common.web.BaseController;
import com.jeesite.modules.sys.entity.Role;
import com.jeesite.modules.sys.entity.User;
import com.jeesite.modules.sys.entity.UserWxBinder;
import com.jeesite.modules.sys.service.RoleService;
import com.jeesite.modules.sys.service.UserService;
import com.jeesite.modules.sys.service.UserWxBinderService;
import com.jeesite.modules.sys.utils.UserUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * 用户微信绑定Controller
 * @author lin
 * @version 2021-01-14
 */
@Controller
@RequestMapping(value = "/userWxBinder")
public class UserWxBinderController extends BaseController {

	@Autowired
	private UserWxBinderService userWxBinderService;

	@Autowired
	private UserService userService;

	@Autowired
	private RoleService roleService;
	
	/**
	 * 获取数据
	 */
	@ModelAttribute
	public UserWxBinder get(String id, boolean isNewRecord) {
		return userWxBinderService.get(id, isNewRecord);
	}
	

	/**
	 * 查询列表数据
	 */
	@RequiresPermissions("feverpersonregister:userWxBinder:view")
	@RequestMapping(value = "listData")
	@ResponseBody
	public Page<UserWxBinder> listData(UserWxBinder userWxBinder, HttpServletRequest request, HttpServletResponse response) {
		Page<UserWxBinder> page = userWxBinderService.findPage(new Page<UserWxBinder>(request, response), userWxBinder); 
		return page;
	}

	/**
	 * 保存用户微信绑定
	 */
	@RequiresPermissions("feverpersonregister:userWxBinder:edit")
	@PostMapping(value = "save")
	@ResponseBody
	public String save(@Validated UserWxBinder userWxBinder) {
		userWxBinderService.save(userWxBinder);
		return renderResult(Global.TRUE, text("保存用户微信绑定成功！"));
	}

	/**
	 * @Description: 微信登录
	 * @Author: lin
	 * @Date: 2021/1/14 18:17
	 * @Param: @param null
	 * @return:
	 */
	@RequestMapping(value = "login")
	@ResponseBody
	public String login(String unionid, String openid) {

		//获取用户是否绑定
		String userCode = userWxBinderService.getUserCodeByOpenid(openid);

		HashMap<String, Object> data = new HashMap<>();
		if (StrUtil.isBlank(userCode)) {
			data.put("code", 0);
			return renderResult(Global.FALSE, "未绑定微信", data);
		}

		//获取用户信息
		User userTemp = new User();
		userTemp.setUserCode(userCode);
		User user = userService.get(userTemp);

		if (user == null) {
			data.put("code", 0);
			return renderResult(Global.FALSE, "未绑定微信", data);
		}
		if (!"0".equals(user.getStatus())) {
			return renderResult(Global.FALSE, "该账号已被禁用,请联系管理员", data);
		}

		boolean loginResult = userLogin(user.getLoginCode());
		if (!loginResult) {
			return renderResult(Global.FALSE, text("登录失败，请联系管理员。"));
		}

		String sid = UserUtils.getSession().getId().toString();
//		System.out.println("登录成功，__sid=" + sid);

		data.put("__sid", sid);
		data.put("user", UserUtils.getUser());

		return renderResult(Global.TRUE, "登陆成功", data);
	}

	/**
	 * @Description: 用户登录方法
	 * @Author: lin
	 * @Date: 2021/1/15 11:07
	 * @Param: @param null
	 * @return:
	 */
	private boolean userLogin(String loginCode) {
		//执行jeesite的sso登录
		try {
			FormToken formToken = new FormToken();
			formToken.setUsername(loginCode);
			formToken.setSsoToken(UserUtils.getSsoToken(loginCode));
			//formToken.setParams(ServletUtils.getExtParams(request));
			UserUtils.getSubject().login(formToken);
			return true;
		} catch (Exception e) {
			if (!e.getMessage().startsWith("msg:")){

			}
			return false;
		}
	}

	/**
	 * @Description: 微信用户绑定
	 * @Author: lin
	 * @Date: 2021/1/15 13:42
	 * @Param: @param null
	 * @return:
	 */
	@RequestMapping(value = "binder")
	@ResponseBody
	public String binder(String openid, String unionid, String username, String password, String binderSource) {

		if (StringUtils.isBlank(username) || StringUtils.isBlank(password)){
			return renderResult(Global.FALSE, "操作失败，用户名或密码格式错误！");
		}

		if (StringUtils.isBlank(openid)){
			return renderResult(Global.FALSE, "微信信息获取失败！");
		}

		//获取用户信息
		User user = UserUtils.getByLoginCode(username);

		if(user == null){
			return renderResult(Global.FALSE, "用户名错误！");
		}

		//验证密码是否正确
		if (!BaseAuthorizingRealm.validatePassword(password, user.getPassword())) {
			return renderResult(Global.FALSE, "用户名错误！");
		}

		//获取该微信用户是否绑定
		String userCode = userWxBinderService.getUserCodeByOpenid(openid);
		if (StrUtil.isNotBlank(userCode)) {
			return renderResult(Global.FALSE, "该微信号已经绑定账号!");
		}

		//判断该用户是否已经绑定
		boolean isExistByUserCode = userWxBinderService.isExistByUserCode(user.getUserCode(), binderSource);
		if (isExistByUserCode) {
			return renderResult(Global.FALSE, "该账号已经绑定微信!");
		}


		if (!"0".equals(user.getStatus())) {
			return renderResult(Global.FALSE, "该账号已被禁用,请联系管理员!");
		}

		//保存微信绑定信息
		UserWxBinder userWxBinder = new UserWxBinder(user.getUserCode(), openid, unionid, binderSource, new Date());
//		userWxBinderService.save1(userWxBinder);

		userWxBinderService.save1(userWxBinder);

		boolean loginResult = userLogin(user.getLoginCode());
		if(!loginResult){
			return renderResult(Global.FALSE, text("登录失败，请联系管理员。"));
		}

		String sid = UserUtils.getSession().getId().toString();
//		System.out.println("登录成功，__sid=" + sid);

//		List<EmployeePost> userPost = employeePostService.getUserPost();
		Role role = new Role();
		role.setUserCode(user.getUserCode());
		List<Role> listByUserCode = roleService.findListByUserCode(role);


		HashMap<String, Object> data = new HashMap<>();
		data.put("listRole", listByUserCode);

		//判断该用户密码修改日期和用户创建日期是否相等,如果是则强制修改密码
		int compare = DateUtil.compare(user.getCreateDate(), user.getPwdUpdateDate());
		boolean isMustUpdatePassword = compare == 0 ? true : false;
		data.put("isMustUpdatePassword", isMustUpdatePassword);

		data.put("__sid", sid);
		data.put("user", user);

		return renderResult(Global.TRUE, "登陆成功", data);

	}

	/**
	 * @Description: 微信解绑
	 * @Author: lin
	 * @Date: 2021/1/15 18:43
	 * @Param: @param null
	 * @return:
	 */
	@RequestMapping(value = "unBinder")
	@ResponseBody
	public String unBinder(Integer binderSource) {

		int result = userWxBinderService.unBinder(UserUtils.getUser().getUserCode(), binderSource);
		if (result ==0 ) {
			return renderResult(Global.FALSE, "未绑定微信");
		}

		return renderResult(Global.TRUE, "解绑成功");

	}


}