/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.password.entity;

import org.hibernate.validator.constraints.Length;

import com.jeesite.common.entity.DataEntity;
import com.jeesite.common.mybatis.annotation.Column;
import com.jeesite.common.mybatis.annotation.Table;
import com.jeesite.common.mybatis.mapper.query.QueryType;

/**
 * 用户密码修改记录Entity
 * @author lin
 * @version 2021-04-29
 */
@Table(name="tb_user_password_record", alias="a", columns={
		@Column(name="id", attrName="id", label="编码", isPK=true),
		@Column(name="user_code", attrName="userCode", label="用户编号"),
		@Column(name="password", attrName="password", label="用户密码"),
		@Column(name="create_date", attrName="createDate", label="密码更新时间"),
//		@Column(includeEntity=DataEntity.class),
	}, orderBy="a.id DESC"
)
public class UserPasswordRecord extends DataEntity<UserPasswordRecord> {
	
	private static final long serialVersionUID = 1L;
	private String userCode;		// 用户编号
	private String password;		// 用户密码

	
	public UserPasswordRecord() {
		this(null);
	}

	public UserPasswordRecord(String id){
		super(id);
	}
	
	@Length(min=0, max=255, message="用户编号长度不能超过 255 个字符")
	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}
	
	@Length(min=0, max=255, message="用户密码长度不能超过 255 个字符")
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
}