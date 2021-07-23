/**
 * Copyright (c) 2013-Now http://jeesite.com All rights reserved.
 */
package com.jeesite.modules.universion.entity;


import com.jeesite.common.entity.DataEntity;
import com.jeesite.common.mybatis.annotation.Column;
import com.jeesite.common.mybatis.annotation.Table;
import com.jeesite.common.mybatis.mapper.query.QueryType;

/**
 * uni-app版本号Entity
 * @author Qiu
 * @version 2021-01-09
 */
@Table(name="tb_uni_version", alias="a", columns={
		@Column(name="version", attrName="version", label="版本号", isPK=true),
	}, orderBy="a.version DESC"
)
public class UniVersion extends DataEntity<UniVersion> {
	
	private static final long serialVersionUID = 1L;
	private String version;		// 版本号
	private String connect;		// 版本连接

	public String getConnect() {
		return connect;
	}

	public void setConnect(String connect) {
		this.connect = connect;
	}

	public UniVersion() {
		this(null);
	}

	public UniVersion(String id){
		super(id);
	}
	
	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}
	
}