/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.departmentrubbish.entity;

import com.jeesite.common.utils.excel.annotation.ExcelField;
import com.jeesite.common.utils.excel.annotation.ExcelFields;
import com.jeesite.modules.sys.entity.DictData;
import org.hibernate.validator.constraints.Length;
import java.util.Date;
import com.jeesite.common.mybatis.annotation.JoinTable;
import com.jeesite.common.mybatis.annotation.JoinTable.Type;
import com.fasterxml.jackson.annotation.JsonFormat;

import com.jeesite.common.entity.DataEntity;
import com.jeesite.common.mybatis.annotation.Column;
import com.jeesite.common.mybatis.annotation.Table;
import com.jeesite.common.mybatis.mapper.query.QueryType;

import javax.validation.Valid;

/**
 * 科室垃圾表Entity
 * @author Qiu
 * @version 2021-01-11
 */
@Table(name="tb_department_rubbish", alias="a", columns={
		@Column(name="id", attrName="id", label="编码", isPK=true),
		@Column(name="serial_number", attrName="serialNumber", label="序列号"),
		@Column(name="rubbish_type", attrName="rubbishType", label="垃圾类型"),
		@Column(name="institution", attrName="institution", label="所属机构"),
		@Column(name="institution_code", attrName="institutionCode", label="所属机构"),
		@Column(name="department", attrName="department", label="所属科室"),
		@Column(name="responsible_person", attrName="responsiblePerson", label="负责人"),
		@Column(name="weight", attrName="weight", label="重量"),
		@Column(name="transport_status", attrName="transportStatus", label="运输状态"),
		//@Column(includeEntity=DataEntity.class),
		@Column(name="produce_date", attrName="produceDate", label="生产产生日期"),
		@Column(name="create_by", attrName="createBy", label="创建者"),
		@Column(name="create_date", attrName="createDate", label="创建时间"),
		@Column(name="update_date", attrName="updateDate", label="修改时间"),
		@Column(name="status", attrName="status", label="状态（0正常 1删除）"),
		@Column(name="report_type", attrName="reportType", label="上报来源（1 科室人员 2 中转站）"),

},  orderBy="a.id DESC"
)
public class DepartmentRubbish extends DataEntity<DepartmentRubbish> {
	
	private static final long serialVersionUID = 1L;
	private String serialNumber;		// 序列号
	private String rubbishType;		// 垃圾类型
	private String institution;		// 所属机构
	private String institutionCode;		// 所属机构编号
	private String institutionParentCode;		// 所属机构父级编号
	private String department;		// 所属科室
	private String responsiblePerson;		// 负责人
	private Double weight;		// 重量
	private String transportStatus;		// 运输状态
	private Date produceDate;		// 生产产生日期
	private String createBy;       //创建者
	private Date createDate;		//创建时间
	private String  userName;		//登录用户
	private String  reclaimPerson;		//垃圾回收负责人
	private String status;
	private Date updateDate;


	private Date reclaimDate;//垃圾回收日期
	private Date inPutDate;//垃圾中转日期
	private Date inCleanDate;//垃圾清运日期
	private String createByName;//创建者名字
	private String reclaimPersonName;//垃圾回收人名字
	private String inPutPersonName;//中转人名字
	private String inCleanPersonName;//垃圾清运日期

	private String transportStatusName;//导出用运输状态

	private String transferName;//中转站名称
	private Integer num;//数量

	private String reportType;//上报来源

	@Valid
	@ExcelFields({@ExcelField(
			title = "所属机构",
			attrName = "institution",
			align = ExcelField.Align.CENTER,
			sort = 10,
			width = 5120
	),@ExcelField(
			title = "垃圾类型",
			attrName = "rubbishType",
			align = ExcelField.Align.CENTER,
			sort = 10,
			width = 5120
	),@ExcelField(
			title = "重量(kg)",
			attrName = "weight",
			align = ExcelField.Align.CENTER,
			sort = 10,
			width = 5120
	),@ExcelField(
			title = "状态",
			attrName = "transportStatusName",
			align = ExcelField.Align.CENTER,
			sort = 10,
			width = 5120
	),@ExcelField(
			title = "封口日期",
			attrName = "produceDate",
			align = ExcelField.Align.CENTER,
			sort = 10,
			width = 5120
	),@ExcelField(
			title = "创建人",
			attrName = "userName",
			align = ExcelField.Align.CENTER,
			sort = 10,
			width = 5120
	)})


	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getReclaimDate() {
		return reclaimDate;
	}

	public void setReclaimDate(Date reclaimDate) {
		this.reclaimDate = reclaimDate;
	}
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getInPutDate() {
		return inPutDate;
	}

	public void setInPutDate(Date inPutDate) {
		this.inPutDate = inPutDate;
	}

	@Override
	public String getCreateByName() {
		return createByName;
	}

	@Override
	public void setCreateByName(String createByName) {
		this.createByName = createByName;
	}

	public String getReclaimPersonName() {
		return reclaimPersonName;
	}

	public void setReclaimPersonName(String reclaimPersonName) {
		this.reclaimPersonName = reclaimPersonName;
	}

	public String getInPutPersonName() {
		return inPutPersonName;
	}

	public void setInPutPersonName(String inPutPersonName) {
		this.inPutPersonName = inPutPersonName;
	}

	public String getReclaimPerson() {
		return reclaimPerson;
	}

	public void setReclaimPerson(String reclaimPerson) {
		this.reclaimPerson = reclaimPerson;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
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

	public DepartmentRubbish() {
		this(null);
	}

	public DepartmentRubbish(String id){
		super(id);
	}
	
	@Length(min=0, max=64, message="垃圾类型长度不能超过 64 个字符")
	public String getRubbishType() {
		return rubbishType;
	}

	public void setRubbishType(String rubbishType) {
		this.rubbishType = rubbishType;
	}
	
	@Length(min=0, max=64, message="所属机构长度不能超过 64 个字符")
	public String getInstitution() {
		return institution;
	}

	public void setInstitution(String institution) {
		this.institution = institution;
	}
	
	@Length(min=0, max=64, message="所属科室长度不能超过 64 个字符")
	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}
	
	@Length(min=0, max=64, message="负责人长度不能超过 64 个字符")
	public String getResponsiblePerson() {
		return responsiblePerson;
	}

	public void setResponsiblePerson(String responsiblePerson) {
		this.responsiblePerson = responsiblePerson;
	}
	
	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}
	
	@Length(min=0, max=11, message="运输状态长度不能超过 11 个字符")
	public String getTransportStatus() {
		return transportStatus;
	}

	public void setTransportStatus(String transportStatus) {
		this.transportStatus = transportStatus;
	}
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getProduceDate() {
		return produceDate;
	}

	public void setProduceDate(Date produceDate) {
		this.produceDate = produceDate;
	}

	public String getInstitutionCode() {
		return institutionCode;
	}

	public void setInstitutionCode(String institutionCode) {
		this.institutionCode = institutionCode;
	}

	@Override
	public String getStatus() {
		return status;
	}

	@Override
	public void setStatus(String status) {
		this.status = status;
	}

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public String getTransportStatusName() {
		return transportStatusName;
	}

	public void setTransportStatusName(String transportStatusName) {
		this.transportStatusName = transportStatusName;
	}

	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	public Date getInCleanDate() {
		return inCleanDate;
	}

	public void setInCleanDate(Date inCleanDate) {
		this.inCleanDate = inCleanDate;
	}

	public String getInCleanPersonName() {
		return inCleanPersonName;
	}

	public void setInCleanPersonName(String inCleanPersonName) {
		this.inCleanPersonName = inCleanPersonName;
	}

	@Override
	public Date getUpdateDate() {
		return updateDate;
	}

	@Override
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public String getInstitutionParentCode() {
		return institutionParentCode;
	}

	public void setInstitutionParentCode(String institutionParentCode) {
		this.institutionParentCode = institutionParentCode;
	}

	public String getTransferName() {
		return transferName;
	}

	public void setTransferName(String transferName) {
		this.transferName = transferName;
	}

	public Integer getNum() {
		return num;
	}

	public void setNum(Integer num) {
		this.num = num;
	}

	public String getReportType() {
		return reportType;
	}

	public void setReportType(String reportType) {
		this.reportType = reportType;
	}
}