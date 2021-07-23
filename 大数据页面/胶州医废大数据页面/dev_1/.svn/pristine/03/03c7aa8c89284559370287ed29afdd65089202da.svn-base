package com.jeesite.modules.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 日期处理工具类
 */
public class DateUtils {

    /**
     * @Description:日期展示筛选
     * @Author: wang
     */
    public static String[] getDate(String createDateGTE, String createDateLTE, String value) {

        //默认当前是事件日期
        Date date = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c = Calendar.getInstance();
        if (createDateGTE == null && createDateLTE == null || createDateGTE.trim().equals("") && createDateLTE.trim().equals("")) {
            //默认展示近七天
            if (value == null || value.trim().equals("")) {
                value = "2";
            }

            createDateLTE = dateFormat.format(new Date(date.getTime() + 1 * 24 * 60 * 60 * 1000));
//            c.add(Calendar.DAY_OF_MONTH, +1);
//            createDateLTE = String.valueOf(dateFormat.format(c.getTime()));
            //当天
            if (value.equals("0")) {
                createDateGTE = dateFormat.format(new Date(date.getTime() - 1 * 24 * 60 * 60 * 1000));
//                c.add(Calendar.DAY_OF_MONTH, -1);
//                createDateGTE = String.valueOf(dateFormat.format(c.getTime()));
            }
            //近三天
            if (value.equals("1")) {
                createDateGTE = dateFormat.format(new Date(date.getTime() - 3 * 24 * 60 * 60 * 1000));
//                c.add(Calendar.DAY_OF_MONTH, -3);
//                createDateGTE = String.valueOf(dateFormat.format(c.getTime()));
            }
            //近七天
            if (value.equals("2")) {
                createDateGTE = dateFormat.format(new Date(date.getTime() - 6 * 24 * 60 * 60 * 1000));
//                c.add(Calendar.DAY_OF_MONTH, -7);
//                createDateGTE = String.valueOf(dateFormat.format(c.getTime()));
            }
            //近十四天
            if (value.equals("3")) {
                createDateGTE = dateFormat.format(new Date(date.getTime() - 14 * 24 * 60 * 60 * 1000));
//                c.add(Calendar.DAY_OF_MONTH, -14);
//                createDateGTE = String.valueOf(dateFormat.format(c.getTime()));
            }
            if (value.equals("4")) {
                createDateGTE = dateFormat.format(new Date(date.getTime() - 30 * 24 * 60 * 60 * 1000));
//                c.add(Calendar.DAY_OF_MONTH, -30);
//                createDateGTE = String.valueOf(dateFormat.format(c.getTime()));
            }
        }


        String[] createDate = new String[2];
        createDate[0] = createDateGTE;//开始时间
        createDate[1] = createDateLTE;//结束时间
        return createDate;
    }

    /**
     * @Description:设置导出的时间区间
     * @Author:wang
     * @Date:2020年7月6日15:45:31
     */
    public static String[] exportDate(String createDateGTE, String createDateLTE) {
        Date date = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        if (createDateGTE != null && createDateLTE != null && !createDateGTE.trim().equals("") && !createDateLTE.trim().equals("")) {
            try {
                Date date1= dateFormat.parse(createDateLTE);
                createDateLTE = dateFormat.format(new Date(date1.getTime() + 1 * 24 * 60 * 60 * 1000));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        } else {
            Calendar c = Calendar.getInstance();
            c.add(Calendar.DAY_OF_MONTH, +1);
            //时间为空是 默认选择其实时间区间为当前日期至往前一周
            createDateLTE = String.valueOf(dateFormat.format(c.getTime()));
            c.add(Calendar.DAY_OF_MONTH, -31);
            createDateGTE = String.valueOf(dateFormat.format(c.getTime()));
        }
        String[] exportDate = new String[2];
        exportDate[0] = createDateGTE;//开始时间
        exportDate[1] = createDateLTE;//结束时间
        return exportDate;
    }

}
