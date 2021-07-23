/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.rubbishalarm.entity;

import org.hibernate.validator.constraints.Length;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import com.jeesite.common.entity.DataEntity;
import com.jeesite.common.mybatis.annotation.Column;
import com.jeesite.common.mybatis.annotation.Table;

/**
 * 告警表Entity
 * @author Qiu
 * @version 2021-01-11
 */
@Table(name="tb_waste_alarm", alias="a", columns={
		@Column(name="id", attrName="id", label="编码", isPK=true),
		@Column(name="department_rubbish_id", attrName="departmentRubbishId", label="科室垃圾编码"),
		@Column(name="alarm_type", attrName="alarmType", label="告警类型"),
		@Column(name="alarm_date", attrName="alarmDate", label="告警日期"),
		//@Column(includeEntity=DataEntity.class),
		@Column(name="create_by", attrName="createBy", label="创建者"),
		@Column(name="create_date", attrName="createDate", label="创建时间"),
		@Column(name="status", attrName="status", label="状态"),
		@Column(name="alarm_solve_date", attrName="alarmSolveDate", label="状态"),
		@Column(name="alarm_solve_by", attrName="alarmSolveBy", label="状态"),
	}, orderBy="a.id DESC"
)
public class WasteAlarm extends DataEntity<WasteAlarm> {
	
	private static final long serialVersionUID = 1L;
	private String departmentRubbishId;		// 科室垃圾编码
	private String alarmType;		// 告警类型
	private Date alarmDate;		// 告警日期
	private String createBy;       //创建者
	private Date createDate;		//创建时间
	private String status;		//创建时间
	private Date alarmSolveDate;		//告警解决时间
	private String alarmSolveBy;		//告警解决者


	private String institution;		//机构
	private String rubbishType;		//垃圾类型
	private Double weight;		//重量
	private Date produceDate;		//封口日期
	private String createByName;		//创建人


	public String getAlarmSolveBy() {
		return alarmSolveBy;
	}

	public void setAlarmSolveBy(String alarmSolveBy) {
		this.alarmSolveBy = alarmSolveBy;
	}

	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getAlarmSolveDate() {
		return alarmSolveDate;
	}

	public void setAlarmSolveDate(Date alarmSolveDate) {
		this.alarmSolveDate = alarmSolveDate;
	}

	@Override
	public String getCreateByName() {
		return createByName;
	}

	@Override
	public void setCreateByName(String createByName) {
		this.createByName = createByName;
	}

	public String getInstitution() {
		return institution;
	}

	public void setInstitution(String institution) {
		this.institution = institution;
	}

	public String getRubbishType() {
		return rubbishType;
	}

	public void setRubbishType(String rubbishType) {
		this.rubbishType = rubbishType;
	}

	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getProduceDate() {
		return produceDate;
	}

	public void setProduceDate(Date produceDate) {
		this.produceDate = produceDate;
	}

	@Override
	public String getStatus() {
		return status;
	}

	@Override
	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String getCreateBy() {
		return createBy;
	}

	@Override
	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	@Override
	public Date getCreateDate() {
		return createDate;
	}

	@Override
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public WasteAlarm() {
		this(null);
	}

	public WasteAlarm(String id){
		super(id);
	}
	
	@Length(min=0, max=64, message="科室垃圾编码长度不能超过 64 个字符")
	public String getDepartmentRubbishId() {
		return departmentRubbishId;
	}

	public void setDepartmentRubbishId(String departmentRubbishId) {
		this.departmentRubbishId = departmentRubbishId;
	}
	
	@Length(min=0, max=11, message="告警类型长度不能超过 11 个字符")
	public String getAlarmType() {
		return alarmType;
	}

	public void setAlarmType(String alarmType) {
		this.alarmType = alarmType;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getAlarmDate() {
		return alarmDate;
	}

	public void setAlarmDate(Date alarmDate) {
		this.alarmDate = alarmDate;
	}
	
}