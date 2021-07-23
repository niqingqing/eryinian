package com.jeesite.modules.statiscs.entity;

import com.jeesite.common.entity.TreeEntity;
import com.jeesite.common.mybatis.annotation.Table;
import com.jeesite.common.utils.excel.annotation.ExcelField;
import com.jeesite.common.utils.excel.annotation.ExcelFields;

import javax.validation.Valid;

@Table(columns = {})
public class OfficeRubbishTypeStatiscs extends TreeEntity<OfficeRubbishTypeStatiscs> {

    private Double weight;//统计重量
    private Integer num;//统计袋数
    private String institutionName;//统计机构名称
    private String institutionCode;//统计机构编号

    private Double infectedWeight = 0.00;//传播型重量
    private Double contagionWeight = 0.00;//感染型重量
    private Double pathologyWeight = 0.00;//病理型重量
    private Double damageWeight = 0.00;//损伤型重量
    private Double medicineWeight = 0.00;//药物型重量

    @Valid
    @ExcelFields({@ExcelField(
            title = "统计机构名称",
            attrName = "institutionName",
            align = ExcelField.Align.CENTER,
            sort = 10,
            width = 5120
    ),@ExcelField(
            title = "总重量(kg)",
            attrName = "weight",
            align = ExcelField.Align.CENTER,
            sort = 10,
            width = 5120
    ),@ExcelField(
            title = "感染性(kg)",
            attrName = "infectedWeight",
            align = ExcelField.Align.CENTER,
            sort = 10,
            width = 5120
    ),@ExcelField(
            title = "化学性(kg)",
            attrName = "contagionWeight",
            align = ExcelField.Align.CENTER,
            sort = 10,
            width = 5120
    ),@ExcelField(
            title = "病理性(kg)",
            attrName = "pathologyWeight",
            align = ExcelField.Align.CENTER,
            sort = 10,
            width = 5120
    ),@ExcelField(
            title = "损伤性(kg)",
            attrName = "damageWeight",
            align = ExcelField.Align.CENTER,
            sort = 10,
            width = 5120
    ),@ExcelField(
            title = "药物性(kg)",
            attrName = "medicineWeight",
            align = ExcelField.Align.CENTER,
            sort = 10,
            width = 5120
    )})

    public Integer getNum() { return num; }

    public void setNum(Integer num) { this.num = num; }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public String getInstitutionName() {
        return institutionName;
    }

    public void setInstitutionName(String institutionName) {
        this.institutionName = institutionName;
    }

    public Double getInfectedWeight() {
        return infectedWeight;
    }

    public void setInfectedWeight(Double infectedWeight) {
        this.infectedWeight = infectedWeight;
    }

    public Double getContagionWeight() {
        return contagionWeight;
    }

    public void setContagionWeight(Double contagionWeight) {
        this.contagionWeight = contagionWeight;
    }

    public Double getPathologyWeight() {
        return pathologyWeight;
    }

    public void setPathologyWeight(Double pathologyWeight) {
        this.pathologyWeight = pathologyWeight;
    }

    public Double getDamageWeight() {
        return damageWeight;
    }

    public void setDamageWeight(Double damageWeight) {
        this.damageWeight = damageWeight;
    }

    public Double getMedicineWeight() {
        return medicineWeight;
    }

    public void setMedicineWeight(Double medicineWeight) {
        this.medicineWeight = medicineWeight;
    }

    @Override
    public OfficeRubbishTypeStatiscs getParent() {
        return null;
    }

    @Override
    public void setParent(OfficeRubbishTypeStatiscs officeRubbishTypeStatiscs) {

    }

    public String getInstitutionCode() {
        return institutionCode;
    }

    public void setInstitutionCode(String institutionCode) {
        this.institutionCode = institutionCode;
    }
}
