package com.jeesite.modules.statiscs.entity;

import com.jeesite.common.entity.DataEntity;
import com.jeesite.common.mybatis.annotation.Table;
import com.jeesite.common.utils.excel.annotation.ExcelField;
import com.jeesite.common.utils.excel.annotation.ExcelFields;

import javax.validation.Valid;

@Table(columns = {})
public class InstitutionShangBaoNumExportEntity extends DataEntity<InstitutionShangBaoNumExportEntity> {
    private Double weight;//统计重量
    private Integer num;//统计袋数
    private String institutionName;//统计机构名称
    private String parentName;//卫生院机构名称

    @Valid
    @ExcelFields({@ExcelField(
            title = "卫生院名称",
            attrName = "parentName",
            align = ExcelField.Align.CENTER,
            sort = 10,
            width = 5120
    ), @ExcelField(
            title = "卫生室/诊所/科室名称",
            attrName = "institutionName",
            align = ExcelField.Align.CENTER,
            sort = 10,
            width = 5120
    ), @ExcelField(
            title = "重量(kg)",
            attrName = "weight",
            align = ExcelField.Align.CENTER,
            sort = 10,
            width = 5120
    ), @ExcelField(
            title = "袋数(袋)",
            attrName = "num",
            align = ExcelField.Align.CENTER,
            sort = 10,
            width = 5120
    )})

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    public String getInstitutionName() {
        return institutionName;
    }

    public void setInstitutionName(String institutionName) {
        this.institutionName = institutionName;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }
}
