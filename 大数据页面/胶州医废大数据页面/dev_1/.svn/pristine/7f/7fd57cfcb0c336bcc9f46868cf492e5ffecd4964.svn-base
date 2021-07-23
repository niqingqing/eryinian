package com.jeesite.modules.utils;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

/**
 * @Description: 汉字转换拼音
 * @Author: Qiu
 * @Date: 2020/8/15 11:40
 */
public class FirstSpellUtils {

    /**
     * @Description: 获取汉字串拼音首字母，英文字符不变
     * @Author: Qiu
     * @Date: 2020/8/15 11:40
     * @Param chinese 汉字串
     * @return 汉语拼音首字母
     */
    public static String cn2FirstSpell(String chinese){
        StringBuffer pybf = new StringBuffer();
        char[] arr = chinese.toCharArray();
        HanyuPinyinOutputFormat defaultFormat = new HanyuPinyinOutputFormat();
        defaultFormat.setCaseType(HanyuPinyinCaseType.LOWERCASE);
        defaultFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
        for (int i = 0; i <arr.length ; i++) {
            if(arr[i] > 128){
                try {
                    String[] _t = PinyinHelper.toHanyuPinyinStringArray(arr[i],defaultFormat);
                    if(_t != null){
                        pybf.append(_t[0].charAt(0));
                    }
                } catch (BadHanyuPinyinOutputFormatCombination e) {
                    e.printStackTrace();
                }
            }else {
                pybf.append(arr[i]);
            }
        }
        return pybf.toString().replace("\\w","").trim().toUpperCase();
    }

}