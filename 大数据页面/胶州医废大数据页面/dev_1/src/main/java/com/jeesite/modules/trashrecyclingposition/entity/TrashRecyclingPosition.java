/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.trashrecyclingposition.entity;

import org.hibernate.validator.constraints.Length;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import com.jeesite.common.entity.DataEntity;
import com.jeesite.common.mybatis.annotation.Column;
import com.jeesite.common.mybatis.annotation.Table;

/**
 * 垃圾回收人员定位表Entity
 * @author lin
 * @version 2021-01-19
 */
@Table(name="tb_trash_recycling_position", alias="a", columns={
		@Column(name="id", attrName="id", label="id", isPK=true),
		@Column(name="user_code", attrName="userCode", label="用户code"),
		@Column(name="type", attrName="type", label="坐标类型"),
		@Column(name="altitude", attrName="altitude", label="高度，单位 m"),
		@Column(name="longitude", attrName="longitude", label="经度"),
		@Column(name="latitude", attrName="latitude", label="维度"),
		@Column(name="time", attrName="time", label="插入时间"),
	}, orderBy="a.id DESC"
)
public class TrashRecyclingPosition extends DataEntity<TrashRecyclingPosition> {
	
	private static final long serialVersionUID = 1L;
	private String userCode;		// 用户code
	private String type;		// 坐标类型
	private String altitude;		// 高度，单位 m
	private String longitude;		// 经度
	private String latitude;		// 维度
	private Date time;		// 插入时间
	
	public TrashRecyclingPosition() {
		this(null);
	}

	public TrashRecyclingPosition(String id){
		super(id);
	}
	
	@Length(min=0, max=50, message="用户code长度不能超过 50 个字符")
	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}
	
	@Length(min=0, max=10, message="坐标类型长度不能超过 10 个字符")
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	@Length(min=0, max=20, message="高度，单位 m长度不能超过 20 个字符")
	public String getAltitude() {
		return altitude;
	}

	public void setAltitude(String altitude) {
		this.altitude = altitude;
	}
	
	@Length(min=0, max=20, message="经度长度不能超过 20 个字符")
	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	
	@Length(min=0, max=20, message="维度长度不能超过 20 个字符")
	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}
	
}