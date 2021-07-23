package com.jeesite.modules.departmentrubbish.entity;

import lombok.Data;

import java.util.Date;

/**
 * @Description: TODO
 * @Author Qiu
 * @Date 2021/1/18 18:39
 */
@Data
public class RubbishReportVO {
    private String produceStr;
    private Date produceDate;
    private Double weight;
    private String rubbishType;
    private String institution;
    private String serialNumber;
    private String only;
}
