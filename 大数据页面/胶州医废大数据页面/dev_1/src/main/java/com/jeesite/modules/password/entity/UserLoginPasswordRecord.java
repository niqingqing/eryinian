/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.password.entity;

import org.hibernate.validator.constraints.Length;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import javax.validation.constraints.NotNull;

import com.jeesite.common.entity.DataEntity;
import com.jeesite.common.mybatis.annotation.Column;
import com.jeesite.common.mybatis.annotation.Table;

/**
 * 用户登录时的密码记录Entity
 * @author lin
 * @version 2021-04-29
 */
@Table(name="tb_user_login_password_record", alias="a", columns={
		@Column(name="id", attrName="id", label="编码", isPK=true),
		@Column(name="login_code", attrName="loginCode", label="用户登录编号"),
		@Column(name="password", attrName="password", label="用户密码"),
		@Column(name="login_date", attrName="loginDate", label="登录时间"),
		@Column(name="is_right", attrName="isRight", label="密码是否正确 0否 1是"),
	}, orderBy="a.id DESC"
)
public class UserLoginPasswordRecord extends DataEntity<UserLoginPasswordRecord> {
	
	private static final long serialVersionUID = 1L;
	private String loginCode;		// 用户编号
	private String password;		// 用户密码
	private Date loginDate;		// 登录时间
	private Integer isRight;		// 密码是否正确 0否 1是
	
	public UserLoginPasswordRecord() {
		this(null);
	}

	public UserLoginPasswordRecord(String id){
		super(id);
	}
	
	@Length(min=0, max=255, message="用户登录编号长度不能超过 255 个字符")
	public String getLoginCode() {
		return loginCode;
	}

	public void setLoginCode(String loginCode) {
		this.loginCode = loginCode;
	}
	
	@Length(min=0, max=255, message="用户密码长度不能超过 255 个字符")
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@NotNull(message="登录时间不能为空")
	public Date getLoginDate() {
		return loginDate;
	}

	public void setLoginDate(Date loginDate) {
		this.loginDate = loginDate;
	}
	
	public Integer getIsRight() {
		return isRight;
	}

	public void setIsRight(Integer isRight) {
		this.isRight = isRight;
	}
	
}