package com.jeesite.modules.utils;


import com.dingtalk.api.DefaultDingTalkClient;
import com.dingtalk.api.DingTalkClient;
import com.dingtalk.api.request.OapiRobotSendRequest;
import com.dingtalk.api.response.OapiRobotSendResponse;
import com.taobao.api.ApiException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLEncoder;
import java.util.List;

/**
 * @Description: 钉钉机器人工具类
 * @Author Qiu
 * @Date 2021/1/20 9:01
 */
@Slf4j
public class DingTalkRobotUtils {

    /**
     * 消息类型
     */
    private static final String MSG_TYPE_TEXT = "text";
    private static final String MSG_TYPE_LINK = "link";
    private static final String MSG_TYPE_MARKDOWN = "markdown";


    /**
    * 签名计算 是否是来自钉钉的合法请求
    *@Author Qiu
    *@Date 2021-01-20 09:24
    *@param timestamp 时间戳
    *@param secret  机器人的appSecret 当做签名
    *@return
    */
    public static String signJudge(Long timestamp,String secret) throws Exception{
        //把时间戳和密钥拼接成字符串，中间加入一个换行符
        String stringToSign = timestamp + "\n" + secret;
        //声明一个Mac对象，用来操作字符串
        Mac mac =Mac.getInstance("HmacSHA256");
        //初始化Mac对象，设置Mac对象操作的字符串是UTF-8类型，加密方式是HmacSHA256
        mac.init(new SecretKeySpec(secret.getBytes("UTF-8"),"HmacSHA256"));
        //把字符串转化成字节形式
        byte[] signData = mac.doFinal(stringToSign.getBytes("UTF-8"));
        //把上面的字符串进行Base64加密后再进行URL编码
        String sign = URLEncoder.encode(new String(Base64.encodeBase64(signData)), "UTF-8");

        return sign;
    }

    /**
    * 机器人推送消息
    *@Author Qiu
    *@Date 2021-01-20 10:19
    *@param
    *@return
    */
    public static OapiRobotSendResponse sendMsg(OapiRobotSendRequest request, List<String> atPersons, String webhookUrlInit, String secret) {
        StringBuffer webhookUrl = new StringBuffer(webhookUrlInit);

        //当前时间戳
        long timestamp = System.currentTimeMillis();
        String sign;
        try {
            sign = signJudge(timestamp, secret);
        } catch (Exception e) {
            log.error("签名计算失败!不符合钉钉合法请求{}", e);
            return null;
        }

        //拼接webhookUrl请求地址参数
        webhookUrl.append("&timestamp=").append(timestamp).append("&sign=").append(sign);
        DingTalkClient client = new DefaultDingTalkClient(webhookUrl.toString());
        //设置需要at的人员
        OapiRobotSendRequest.At at = new OapiRobotSendRequest.At();
        at.setAtMobiles(atPersons);
        request.setAt(at);

        try {
            OapiRobotSendResponse response = client.execute(request);
            return response;
        } catch (ApiException e) {
            log.error("调用钉钉机器人发送消息接口出现异常!{}" + e);
            return null;
        }
    }


    /**
    * 发送普通文本消息
    *@Author Qiu
    *@Date 2021-01-20 10:09
    *@param text 消息内容
    *@param atPersons 需要@at的人
    *@param webhookUrlInit 钉钉群设置 webhookUrl
    *@param secret  机器人的appSecret
    *@return
    */
    public static OapiRobotSendResponse sendMessageByText(OapiRobotSendRequest.Text text, List<String> atPersons, String webhookUrlInit, String secret){
        OapiRobotSendRequest request = new OapiRobotSendRequest();
        request.setMsgtype(MSG_TYPE_TEXT);
        request.setText(text);
        return sendMsg(request,atPersons,webhookUrlInit,secret);
    }

    /**
     * 发送link 类型消息
     *@Author Qiu
     *@Date 2021-01-20 10:09
     *@param link 类型消息内容
     *@param atPersons 需要@at的人
     *@param webhookUrlInit 钉钉群设置 webhookUrl
     *@param secret  机器人的appSecret
     *@return
     */
    public static OapiRobotSendResponse sendMessageByLink(OapiRobotSendRequest.Link link, List<String> atPersons, String webhookUrlInit, String secret){
        OapiRobotSendRequest request = new OapiRobotSendRequest();
        request.setMsgtype(MSG_TYPE_LINK);
        request.setLink(link);
        return sendMsg(request,atPersons,webhookUrlInit,secret);
    }

    /**
     * 发送Markdown  类型消息
     *@Author Qiu
     *@Date 2021-01-20 10:09
     *@param markdown 类型消息内容
     *@param atPersons 需要@at的人
     *@param webhookUrlInit 钉钉群设置 webhookUrl
     *@param secret  机器人的appSecret
     *@return
     */
    public static OapiRobotSendResponse sendMessageByMarkdown(OapiRobotSendRequest.Markdown markdown, List<String> atPersons, String webhookUrlInit, String secret){
        OapiRobotSendRequest request = new OapiRobotSendRequest();
        request.setMsgtype(MSG_TYPE_MARKDOWN);
        request.setMarkdown(markdown);
        return sendMsg(request,atPersons,webhookUrlInit,secret);
    }



    public static void main(String[] args) throws Exception  {
        /*//获取时间戳
        long timestamp = System.currentTimeMillis();
        //定义密钥 机器人签名信息
        String secret = "SEC7235a9d00d4bd4315cf29b6ee1ea394b55bfa8a1b08ac6e23b45a3879256ce53";
        //把时间戳和密钥拼接成字符串，中间加入一个换行符
        String stringToSign = timestamp + "\n" + secret;
        //声明一个Mac对象，用来操作字符串
        Mac mac =Mac.getInstance("HmacSHA256");
        //初始化Mac对象，设置Mac对象操作的字符串是UTF-8类型，加密方式是HmacSHA256
        mac.init(new SecretKeySpec(secret.getBytes("UTF-8"),"HmacSHA256"));
        //把字符串转化成字节形式
        byte[] signData = mac.doFinal(stringToSign.getBytes("UTF-8"));
        //把上面的字符串进行Base64加密后再进行URL编码
        String sign = URLEncoder.encode(new String(Base64.encodeBase64(signData)), "UTF-8");

        //分别输出时间戳和加密信息
        System.out.println(timestamp);
        System.out.println(sign);*/
        OapiRobotSendRequest.Markdown markdown = new OapiRobotSendRequest.Markdown();
        markdown.setTitle("废弃物超时未回收");
        markdown.setText("啦啦啦");
        sendMessageByMarkdown(markdown,null,
                "https://oapi.dingtalk.com/robot/send?access_token=3aa058295950f1a053a335bf0b72164d410af307720249b425224dd3276315bc",
                "SEC7235a9d00d4bd4315cf29b6ee1ea394b55bfa8a1b08ac6e23b45a3879256ce53");
    }
}
