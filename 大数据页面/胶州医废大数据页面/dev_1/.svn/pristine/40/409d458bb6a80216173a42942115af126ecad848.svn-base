package com.jeesite.modules.sys.web;

import com.alibaba.fastjson.JSONObject;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

/**
 * @author wang
 * 微信controller
 */
@RestController
@RequestMapping("/wx")
public class WeChat {
    //小程序appid ，需要改为真实的
    @Value(value = "${wechat.mp.appId}")
    private  String APPID ;

    //小程序secret ，需要改为真实的
    @Value(value = "${wechat.mp.secret}")
    private String SECRET;

    /**
     * 通过 appid & secret & code 获取 openid
     * @param code
     */
    @GetMapping("/getOpenid")
    public String getOpenid( String code) throws IOException {
        //wx接口路径
        String url = "https://api.weixin.qq.com/sns/jscode2session?grant_type=authorization_code&" +
                "appid=" + APPID + "&secret=" + SECRET + "&js_code=" + code;
        //使用HttpClient发送请求
        CloseableHttpClient httpclient = HttpClients.createDefault();
        //发送Get请求
        HttpGet request = new HttpGet(url);
        request.addHeader("Content-Type", "application/json");
        //获得响应
        CloseableHttpResponse response = httpclient.execute(request);
        //拿到响应体
        HttpEntity httpEntity = response.getEntity();
        //使用工具转换
        String result = EntityUtils.toString(httpEntity, "UTF-8");// 转成string
        JSONObject jsonObject = JSONObject.parseObject(result);
        System.out.println(jsonObject);//拿到的所有内容
        String openid = jsonObject.get("openid").toString();
        System.out.println(openid);//拿到的openid
        return openid;
    }
}