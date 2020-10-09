var HOSTPATH = "https://www.qinzhoutongcheng.com/index.php/"; //线上
var APIPATH = HOSTPATH+'Api/';

(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize =17* (clientWidth / 375) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

//滑动缓冲
mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006 
});
			
//页面open跳转
function jump(_this){
	mui.openWindow({
	    url: _this
	});
	
}
 //压缩方法
function dealImage(obj) { 
	var newImage = new Image();
	var quality = 0.6;    //压缩系数0-1之间
	newImage.src = obj.base64;
	newImage.setAttribute("crossOrigin", 'Anonymous');	//url为外域时需要
	var imgWidth, imgHeight;
	newImage.onload = function () {
		imgWidth = this.width;
		imgHeight = this.height;
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		if (Math.max(imgWidth, imgHeight) > obj.w) {
			if (imgWidth > imgHeight) {
				canvas.width = obj.w;
				canvas.height = obj.w * imgHeight / imgWidth;
			} else {
				canvas.height = obj.w;
				canvas.width = obj.w * imgWidth / imgHeight;
			}
		} else {
			canvas.width = imgWidth;
			canvas.height = imgHeight;
			quality = 0.6;
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
	  var base64 = canvas.toDataURL("image/jpeg", quality); //压缩语句
		obj.callback(base64,obj.ob);
		
	}

}