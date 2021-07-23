/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.rubbishreclaim.entity;

import com.jeesite.modules.departmentrubbish.entity.DepartmentRubbish;
import org.hibernate.validator.constraints.Length;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import com.jeesite.common.entity.DataEntity;
import com.jeesite.common.mybatis.annotation.Column;
import com.jeesite.common.mybatis.annotation.Table;

/**
 * 垃圾回收表Entity
 * @author Qiu
 * @version 2021-01-11
 */
@Table(name="tb_waste_transport", alias="a", columns={
		@Column(name="id", attrName="id", label="编码", isPK=true),
		@Column(name="department_rubbish_id", attrName="departmentRubbishId", label="科室垃圾编码"),
		@Column(name="reclaim_person", attrName="reclaimPerson", label="垃圾回收负责人"),
		@Column(name="reclaim_date", attrName="reclaimDate", label="垃圾回收日期"),
		@Column(name="reclaim_mode", attrName="reclaimMode", label="垃圾回收方式"),
		//@Column(includeEntity=DataEntity.class),
		@Column(name="create_by", attrName="createBy", label="创建者"),
		@Column(name="create_date", attrName="createDate", label="创建时间"),
	}, orderBy="a.id DESC"
)
public class WasteTransport extends DataEntity<WasteTransport> {
	
	private static final long serialVersionUID = 1L;
	private String departmentRubbishId;		// 科室垃圾编码
	private String reclaimPerson;		// 垃圾回收负责人
	private Date reclaimDate;		// 垃圾回收日期
	private String reclaimMode;		// 垃圾回收方式
	private String createBy;       //创建者
	private Date createDate;		//创建时间

	private String rubbishType;//垃圾类型
	private String department;//单位
	private String weight;//重量
	private String inPutPersonName;//接受人姓名
	private String institution;//机构

	public String getInstitution() {
		return institution;
	}

	public void setInstitution(String institution) {
		this.institution = institution;
	}

	public String getInPutPersonName() {
		return inPutPersonName;
	}

	public void setInPutPersonName(String inPutPersonName) {
		this.inPutPersonName = inPutPersonName;
	}

	private DepartmentRubbish departmentRubbish;

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

	public WasteTransport() {
		this(null);
	}

	public WasteTransport(String id){
		super(id);
	}
	
	@Length(min=0, max=64, message="科室垃圾编码长度不能超过 64 个字符")
	public String getDepartmentRubbishId() {
		return departmentRubbishId;
	}

	public void setDepartmentRubbishId(String departmentRubbishId) {
		this.departmentRubbishId = departmentRubbishId;
	}
	
	@Length(min=0, max=64, message="垃圾回收负责人长度不能超过 64 个字符")
	public String getReclaimPerson() {
		return reclaimPerson;
	}

	public void setReclaimPerson(String reclaimPerson) {
		this.reclaimPerson = reclaimPerson;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getReclaimDate() {
		return reclaimDate;
	}

	public void setReclaimDate(Date reclaimDate) {
		this.reclaimDate = reclaimDate;
	}
	
	@Length(min=0, max=11, message="垃圾回收方式长度不能超过 11 个字符")
	public String getReclaimMode() {
		return reclaimMode;
	}

	public void setReclaimMode(String reclaimMode) {
		this.reclaimMode = reclaimMode;
	}

	public DepartmentRubbish getDepartmentRubbish() {
		return departmentRubbish;
	}

	public void setDepartmentRubbish(DepartmentRubbish departmentRubbish) {
		this.departmentRubbish = departmentRubbish;
	}

	public String getRubbishType() {
		return rubbishType;
	}

	public void setRubbishType(String rubbishType) {
		this.rubbishType = rubbishType;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getWeight() {
		return weight;
	}

	public void setWeight(String weight) {
		this.weight = weight;
	}
}