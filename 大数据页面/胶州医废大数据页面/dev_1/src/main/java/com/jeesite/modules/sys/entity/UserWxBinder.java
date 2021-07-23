/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.sys.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.jeesite.common.entity.DataEntity;
import com.jeesite.common.mybatis.annotation.Column;
import com.jeesite.common.mybatis.annotation.Table;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import java.util.Date;

/**
 * 用户微信绑定Entity
 * @author lin
 * @version 2021-01-14
 */
@Table(name="tb_user_wx_binder", alias="a", columns={
		@Column(name="id", attrName="id", label="编号", isPK=true),
		@Column(name="user_code", attrName="userCode", label="登录账号"),
		@Column(name="openid", attrName="openid", label="微信openid"),
		@Column(name="unionid", attrName="unionid", label="微信unionid"),
		@Column(name="binder_source", attrName="binderSource", label="绑定来源 ", comment="绑定来源 (1app调用微信 2小程序)"),
		@Column(name="binder_time", attrName="binderTime", label="绑定时间"),
		@Column(name="unbinder_time", attrName="unbinderTime", label="解绑时间"),
		@Column(includeEntity=DataEntity.class),
	}, orderBy="a.id DESC"
)
public class UserWxBinder extends DataEntity<UserWxBinder> {
	
	private static final long serialVersionUID = 1L;
	private String userCode;		// 登录账号
	private String openid;		// 微信openid
	private String unionid;		// 微信unionid
	private String binderSource;		// 绑定来源 (1app调用微信 2小程序)
	private Date binderTime;		// 绑定时间
	private Date unbinderTime;		// 解绑时间
	
	public UserWxBinder() {
		this(null);
	}

	public UserWxBinder(String userCode, String openid, String unionid, String binderSource, Date binderTime) {
		this.userCode = userCode;
		this.openid = openid;
		this.unionid = unionid;
		this.binderSource = binderSource;
		this.binderTime = binderTime;
	}

	public UserWxBinder(String id){
		super(id);
	}
	
	@NotBlank(message="登录账号不能为空")
	@Length(min=0, max=100, message="登录账号长度不能超过 100 个字符")
	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}
	
	@Length(min=0, max=50, message="微信openid长度不能超过 50 个字符")
	public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}
	
	@Length(min=0, max=50, message="微信unionid长度不能超过 50 个字符")
	public String getUnionid() {
		return unionid;
	}

	public void setUnionid(String unionid) {
		this.unionid = unionid;
	}
	
	@Length(min=0, max=1, message="绑定来源 长度不能超过 1 个字符")
	public String getBinderSource() {
		return binderSource;
	}

	public void setBinderSource(String binderSource) {
		this.binderSource = binderSource;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getBinderTime() {
		return binderTime;
	}

	public void setBinderTime(Date binderTime) {
		this.binderTime = binderTime;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getUnbinderTime() {
		return unbinderTime;
	}

	public void setUnbinderTime(Date unbinderTime) {
		this.unbinderTime = unbinderTime;
	}
	
}