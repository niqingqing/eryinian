var width = window.screen.width;
if (width > 414) {
    document.documentElement.style.fontSize = 110 + 'px'
} else {
    document.documentElement.style.fontSize = (width / 375) * 100 + 'px'
}
window.onload = function () {
    var width = window.screen.width;
    if (width>414) {
        document.documentElement.style.fontSize =  110 + 'px'
    } else {
        document.documentElement.style.fontSize = (width / 375) * 100 + 'px'
    }
}
//当浏览器窗口大小改变时，设置显示内容的高度
window.onresize = function () {
    var width = window.screen.width;
    if (width > 414) {
        document.documentElement.style.fontSize = 110 + 'px'
    } else {
        document.documentElement.style.fontSize = (width / 375) * 100 + 'px'
    }
}
// 通过js适配不同的屏幕大小
// (function (doc, win) {
//     var docEl = doc.documentElement,
//         resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//         recalc = function () {
//             var clientWidth = docEl.clientWidth;
//             if (!clientWidth) return;
//             // 根据设备的比例调整初始font-size大小
//             if(clientWidth>640) clientWidth = 640;
//             docEl.style.fontSize = 50 * (clientWidth / 320) + 'px';
//         };
//     if (!doc.addEventListener) return;
//     win.addEventListener(resizeEvt, recalc, false);
//     doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);