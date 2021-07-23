/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.rubbishclean.entity;

import org.hibernate.validator.constraints.Length;
import java.util.Date;
import com.jeesite.common.mybatis.annotation.JoinTable;
import com.jeesite.common.mybatis.annotation.JoinTable.Type;
import com.fasterxml.jackson.annotation.JsonFormat;

import com.jeesite.common.entity.DataEntity;
import com.jeesite.common.mybatis.annotation.Column;
import com.jeesite.common.mybatis.annotation.Table;
import com.jeesite.common.mybatis.mapper.query.QueryType;

/**
 * 废弃物清运表Entity
 * @author Wang
 * @version 2021-03-30
 */
@Table(name="tb_waste_clean", alias="a", columns={
		@Column(name="id", attrName="id", label="id", isPK=true),
		@Column(name="department_rubbish_id", attrName="departmentRubbishId", label="废弃物id"),
		@Column(name="clean_person", attrName="cleanPerson", label="清运人"),
		@Column(name="clean_time", attrName="cleanTime", label="清运时间"),
		@Column(includeEntity=DataEntity.class),
	}, orderBy="a.id DESC"
)
public class WasteClean extends DataEntity<WasteClean> {
	
	private static final long serialVersionUID = 1L;
	private String departmentRubbishId;		// 废弃物id
	private String cleanPerson;		// 清运人
	private Date cleanTime;		// 清运时间
	
	public WasteClean() {
		this(null);
	}

	public WasteClean(String id){
		super(id);
	}
	
	@Length(min=0, max=64, message="废弃物id长度不能超过 64 个字符")
	public String getDepartmentRubbishId() {
		return departmentRubbishId;
	}

	public void setDepartmentRubbishId(String departmentRubbishId) {
		this.departmentRubbishId = departmentRubbishId;
	}
	
	@Length(min=0, max=64, message="清运人长度不能超过 64 个字符")
	public String getCleanPerson() {
		return cleanPerson;
	}

	public void setCleanPerson(String cleanPerson) {
		this.cleanPerson = cleanPerson;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getCleanTime() {
		return cleanTime;
	}

	public void setCleanTime(Date cleanTime) {
		this.cleanTime = cleanTime;
	}
	
}