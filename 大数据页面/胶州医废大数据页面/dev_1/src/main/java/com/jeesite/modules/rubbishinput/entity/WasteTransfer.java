/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.rubbishinput.entity;

import org.hibernate.validator.constraints.Length;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import com.jeesite.common.entity.DataEntity;
import com.jeesite.common.mybatis.annotation.Column;
import com.jeesite.common.mybatis.annotation.Table;

/**
 * 垃圾中转站Entity
 * @author Qiu
 * @version 2021-01-11
 */
@Table(name="tb_waste_transfer", alias="a", columns={
		@Column(name="id", attrName="id", label="编码", isPK=true),
		@Column(name="department_rubbish_id", attrName="departmentRubbishId", label="科室垃圾编码"),
		@Column(name="rubbish_reclaim_id", attrName="rubbishReclaimId", label="垃圾回收编码"),
		@Column(name="in_put_person", attrName="inPutPerson", label="垃圾入库负责人"),
		@Column(name="in_put_date", attrName="inPutDate", label="垃圾入库日期"),
		@Column(name="in_put_mode", attrName="inPutMode", label="垃圾入库方式"),
		//@Column(includeEntity=DataEntity.class),
		@Column(name="create_by", attrName="createBy", label="创建者"),
		@Column(name="create_date", attrName="createDate", label="创建时间"),
	}, orderBy="a.id DESC"
)
public class WasteTransfer extends DataEntity<WasteTransfer> {
	
	private static final long serialVersionUID = 1L;
	private String departmentRubbishId;		// 科室垃圾编码
	private String rubbishReclaimId;		// 垃圾回收编码
	private String inPutPerson;		// 垃圾入库负责人
	private Date inPutDate;		// 垃圾入库日期
	private String inPutMode;		// 垃圾入库方式
	private String createBy;       //创建者
	private Date createDate;		//创建时间
	private Date produceDate;		// 生产产生日期

	private String rubbishType;//垃圾类型
	private String department;//单位
	private String weight;//重量
	private String inPutPersonName;//接收人姓名
	private String institution;//机构

	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getProduceDate() {
		return produceDate;
	}

	public void setProduceDate(Date produceDate) {
		this.produceDate = produceDate;
	}

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

	public WasteTransfer() {
		this(null);
	}

	public WasteTransfer(String id){
		super(id);
	}
	
	@Length(min=0, max=64, message="科室垃圾编码长度不能超过 64 个字符")
	public String getDepartmentRubbishId() {
		return departmentRubbishId;
	}

	public void setDepartmentRubbishId(String departmentRubbishId) {
		this.departmentRubbishId = departmentRubbishId;
	}
	
	@Length(min=0, max=64, message="垃圾回收编码长度不能超过 64 个字符")
	public String getRubbishReclaimId() {
		return rubbishReclaimId;
	}

	public void setRubbishReclaimId(String rubbishReclaimId) {
		this.rubbishReclaimId = rubbishReclaimId;
	}
	
	@Length(min=0, max=64, message="垃圾入库负责人长度不能超过 64 个字符")
	public String getInPutPerson() {
		return inPutPerson;
	}

	public void setInPutPerson(String inPutPerson) {
		this.inPutPerson = inPutPerson;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getInPutDate() {
		return inPutDate;
	}

	public void setInPutDate(Date inPutDate) {
		this.inPutDate = inPutDate;
	}
	
	@Length(min=0, max=11, message="垃圾入库方式长度不能超过 11 个字符")
	public String getInPutMode() {
		return inPutMode;
	}

	public void setInPutMode(String inPutMode) {
		this.inPutMode = inPutMode;
	}
	
}