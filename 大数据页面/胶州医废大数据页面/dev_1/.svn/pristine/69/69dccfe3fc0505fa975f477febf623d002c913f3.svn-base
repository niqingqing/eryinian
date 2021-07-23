package com.jeesite.modules.statiscs.entity;

import com.jeesite.common.entity.TreeEntity;
import com.jeesite.common.mybatis.annotation.Table;
import com.jeesite.common.utils.excel.annotation.ExcelField;
import com.jeesite.common.utils.excel.annotation.ExcelFields;

import javax.validation.Valid;

/**
 * 统计Entity
 *
 * @author wang
 * @version 2021-01-19
 */
@Table(columns = {})
public class Statiscs extends TreeEntity<Statiscs> {

    private Integer num = 0;//统计数量
    private Double weight;//统计重量
    private String institutionName;//统计机构名称

    private String month;//月份

    private String institutionCode;//统计机构编号
    private String rubbishType;//垃圾类型名称
    private String alarmType;//告警类型名称
    private Double infectedWeight = 0.00;//传播型重量
    private Double contagionWeight = 0.00;//感染型重量
    private Double pathologyWeight = 0.00;//病理型重量
    private Double damageWeight = 0.00;//损伤型重量
    private Double medicineWeight = 0.00;//药物型重量

    private Integer infectedCount;//传播型数量
    private Integer contagionCount;//感染型数量
    private Integer pathologyCount;//病理型数量
    private Integer damageCount;//损伤型数量
    private Integer medicineCount;//药物型数量

    private Double shangbaoWeight = 0.00;//上报中垃圾重量
    private Double huishouWeight = 0.00;//运输中垃圾重量
    private Double rukuWeight = 0.00;//中转站垃圾重量
    private Double qingyunWeight = 0.00;//已清运重量
    private Double yiyunshuWeight = 0.00;//已运输重量

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public Double getYiyunshuWeight() {
        return yiyunshuWeight;
    }

    public void setYiyunshuWeight(Double yiyunshuWeight) {
        this.yiyunshuWeight = yiyunshuWeight;
    }

    public Double getQingyunWeight() {
        return qingyunWeight;
    }

    public void setQingyunWeight(Double qingyunWeight) {
        this.qingyunWeight = qingyunWeight;
    }

    private String statiscsDate;//统计时间

    public Double getShangbaoWeight() {
        return shangbaoWeight;
    }

    public void setShangbaoWeight(Double shangbaoWeight) {
        this.shangbaoWeight = shangbaoWeight;
    }

    public Double getHuishouWeight() {
        return huishouWeight;
    }

    public void setHuishouWeight(Double huishouWeight) {
        this.huishouWeight = huishouWeight;
    }

    public Double getRukuWeight() {
        return rukuWeight;
    }

    public void setRukuWeight(Double rukuWeight) {
        this.rukuWeight = rukuWeight;
    }

    @Valid
    @ExcelFields({@ExcelField(
            title = "统计机构名称",
            attrName = "institutionName",
            align = ExcelField.Align.CENTER,
            sort = 10,
            width = 5120
    ),@ExcelField(
            title = "总数量(袋)",
            attrName = "num",
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
            title = "待回收(kg)",
            attrName = "shangbaoWeight",
            align = ExcelField.Align.CENTER,
            sort = 10,
            width = 5120
    ),@ExcelField(
            title = "运输中(kg)",
            attrName = "huishouWeight",
            align = ExcelField.Align.CENTER,
            sort = 10,
            width = 5120
    ),@ExcelField(
            title = "已中转(kg)",
            attrName = "rukuWeight",
            align = ExcelField.Align.CENTER,
            sort = 10,
            width = 5120
    ),@ExcelField(
            title = "已清运(kg)",
            attrName = "qingyunWeight",
            align = ExcelField.Align.CENTER,
            sort = 10,
            width = 5120
    )})



    public String getStatiscsDate() {
        return statiscsDate;
    }

    public void setStatiscsDate(String statiscsDate) {
        this.statiscsDate = statiscsDate;
    }

    public Integer getInfectedCount() {
        return infectedCount;
    }

    public void setInfectedCount(Integer infectedCount) {
        this.infectedCount = infectedCount;
    }

    public Integer getContagionCount() {
        return contagionCount;
    }

    public void setContagionCount(Integer contagionCount) {
        this.contagionCount = contagionCount;
    }

    public Integer getPathologyCount() {
        return pathologyCount;
    }

    public void setPathologyCount(Integer pathologyCount) {
        this.pathologyCount = pathologyCount;
    }

    public Integer getDamageCount() {
        return damageCount;
    }

    public void setDamageCount(Integer damageCount) {
        this.damageCount = damageCount;
    }

    public Integer getMedicineCount() {
        return medicineCount;
    }

    public void setMedicineCount(Integer medicineCount) {
        this.medicineCount = medicineCount;
    }

    public Double getContagionWeight() {
        return contagionWeight;
    }

    public void setContagionWeight(Double contagionWeight) {
        this.contagionWeight = contagionWeight;
    }

    public Double getInfectedWeight() {
        return infectedWeight;
    }

    public void setInfectedWeight(Double infectedWeight) {
        this.infectedWeight = infectedWeight;
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

    public String getAlarmType() {
        return alarmType;
    }

    public void setAlarmType(String alarmType) {
        this.alarmType = alarmType;
    }

    public String getRubbishType() {
        return rubbishType;
    }

    public void setRubbishType(String rubbishType) {
        this.rubbishType = rubbishType;
    }

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

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

    @Override
    public Statiscs getParent() {
        return null;
    }

    @Override
    public void setParent(Statiscs statiscs) {

    }

    public String getInstitutionCode() {
        return institutionCode;
    }

    public void setInstitutionCode(String institutionCode) {
        this.institutionCode = institutionCode;
    }
}
