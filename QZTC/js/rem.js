//匹配是否为手机
// var HOSTPATH = "http://qztc.s1.natapp.cc/o2o/";             //线下
var HOSTPATH = "https://www.qinzhoutongcheng.com/index.php/"; //线上 
var APIPATH = HOSTPATH+'Api/';
function isphone(inputString)
    {
      var partten = /^[1][3,4,5,7,8][0-9]{9}$/;
      var fl=false;
      if(partten.test(inputString))
      {
           //alert('是手机号码');
           return true;
      }else{
           return false;
           //alert('不是手机号码');
      }
    }
	//页面open跳转
	function jump(_this){
		mui.openWindow({
		    url: _this
		});
		
	}
//倒计时
function update_a(num,t) {  
    var get_code=document.getElementById('get_code'); 
    if(num == t) {  
        get_code.innerHTML ='<span id="getcode" isfason="true" class="code-span">获取验证码</span>';  
    }  else {  
       var printnr = t-num;  
        get_code.innerHTML =  '<span id="getcode" isfason="false" class="code-span">'+ printnr +'秒后重发</span>';  
    }  
}  
 
//数组转换成json
function tojson(arr){
	if(!arr.length) return null;
	
	var i = 0;
	len = arr.length,
	array = [];
	for(;i<len;i++){
		array.push({"projectname":arr[i][0],"projectnumber":arr[i][1]});
	}
	return JSON.stringify(array);
}
 
// mui框架的配置
mui.init({
	swipeBack:true //启用右滑关闭功能
});



// 屏幕宽度自适应
(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if(!clientWidth) return;
			docEl.style.fontSize = 20 * (clientWidth / 750) + 'px';
		};
	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


/*先隐藏当前页面再关闭程序*/
function closewindows() {
	setTimeout(function() {
		mui.currentWebview.hide();
		mui.currentWebview.close();
	},1000);
}

/*打开新页面的一些配置*/
function opp(url) {
	mui.openWindow({
		url: url,
		id: url,
		show: {
			aniShow: 'slide-in-right', //页面显示动画，默认为”slide-in-right“；  
		},
		waiting: {
			autoShow:true, //自动显示等待框，默认为true
		},
	});	
}

function opps(url) {
	window.location.href = url;	
}

/*接口*/
//var host = "http://192.168.0.108:8080/";
//var host="http://apijava.gdswlw.com/LTC/";
//var host = "http://ltc168168.com:8080/LTC/";

/*token值*/
var token = window.localStorage.getItem("token");


//自定义当前版本号
var version = "1.1.6";


//遍历上传图片 
function setHtml(img,cla)
{
	if(cla == 'lbt-img-base'){
		var imghh = ''; 
						
		for(i=0;i<img.length;i++){
			imghh += '<img class="upimg" src="'+img[i]+'" >';
		} 
		
		$("#lbt-img-click").before(imghh);
	}else{
		$('.'+cla).attr("src",img);
		$('.'+cla).attr("upimg","true");
	}
	
}

 function getBase64Image(img) {
 	var canvas = document.createElement("canvas");
 	canvas.width = img.width;
 	canvas.height = img.height;
 	var ctx = canvas.getContext("2d");
 	ctx.drawImage(img, 0, 0, img.width, img.height);
 	var dataURL = canvas.toDataURL("image/png"); 
 	// console.log(dataURL);
 	return dataURL; 
 	// return dataURL.replace("data:image/png;base64,", ""); 
 } 

	// 从相册中选择图片 
	function galleryImg(num,cla){
			// 从相册中选择图片
			plus.gallery.pick( function(e){
				var fileSrc = [];
				for(var i in e.files){
					fileSrc[i] = e.files[i];
				}
				
				setHtml(fileSrc,cla);
				
				// upload(fileSrc);
			}, function (e) {
				console.log( "取消选择图片" );
			},{
				filter: "image",
				multiple: true,
				maximum: num,
				system: false,
				onmaxed: function() {
					plus.nativeUI.alert('最多只能选择'+num+'张图片');
				}
			});
		}
		
		// 拍照获取图片
		function getImage(cla) {
			var c = plus.camera.getCamera();
			c.captureImage(function(e) {
				plus.io.resolveLocalFileSystemURL(e, function(entry) {
					var imgSrc = entry.toLocalURL() + "?version=" + new Date().getTime(); //拿到图片路径
					var fileSrc = [];
					fileSrc[0] = imgSrc;
					setHtml(fileSrc,cla);
					base64_img(fileSrc);
					
				}, function(e) {
					console.log("读取拍照文件错误：" + e.message);
				});
			}, function(s) {
				console.log("error" + s);
			}, {
				filename: "_doc/camera/"
			}) 
		}
	
	
	