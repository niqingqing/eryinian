/**
 * Created by luozuzhu 2018年05月30日18:16:15
 */


 /**
  * mask类 后续可以单独放入一个js文件中
  */
window.onload = function(){
    Mask({type:'message',text:'是否确定退出'});
    mask.cancel = function(){
        Mask();
    }
}