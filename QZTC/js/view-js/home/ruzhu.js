 //img 转换 base64

 function getBase64Image(img) {
	 // console.log(img.width + ',' + img.height)
 	var canvas = document.createElement("canvas");
 	canvas.width = img.width;
 	canvas.height = img.height;
 	var ctx = canvas.getContext("2d");
 	ctx.drawImage(img, 0, 0, img.width, img.height);
 	var dataURL = canvas.toDataURL("image/png"); 
	return dataURL;
	// return dataURL.replace("data:image/png;base64,", ""); 
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
		obj.callback(base64);
		
	}

}



 //遍历上传图片 
 function setHtml(img,cla,ob)
 {
 	switch(cla)
	{
		case 'fm':
		// 封面图
		  
			$(".fm-img-base").attr("src",img);
			$(".fm-ys").attr("src",img); 
				
			 
		break;
		
		case 'xq':
		// 详情图片
			$(".xq-img-base").attr("src",img);
			$(".xq-ys").attr("src",img); 
			 
		break;
		
		case 'lbt':
		// 轮播图
		// ob 是第几个的意思
		var uplbtTs = $(".lbt-img .lbt-ts").eq(ob);
		uplbtTs.attr("src",img);
		
		var uplbtYs = $(".lbt-img .lbt-ys").eq(ob);
		uplbtYs.attr("src",img);
		
		break;
		case 'lbtadd':
		// 轮播图
		// ob 是第几个的意思
		var uplbtTs = $(".lbt-img .add-ts").eq(ob);
		uplbtTs.attr("src",img);
		
		var uplbtYs = $(".lbt-img .add-ys").eq(ob);
		uplbtYs.attr("src",img);
		
		$(".lbt-img .add-ts").eq(ob).attr("class","lbt-ts");
		$(".lbt-img .add-ys").eq(ob).attr("class","lbt-ys");
		break;
		case 'add':
		var hh = '';
		for(i=0;i<img.length;i++){
			hh += '<img class="lbt-ts" src="'+img[i]+'">'+
				  '<img class="lbt-ys" src="'+img[i]+'" style="display: none;">';
		}
		$("#lbt-img-click").before(hh);
		if($(".lbt-ys").length == 4){
			$("#lbt-img-click").hide();  
		}
		break;
		case 'xqadd'://详情
		var xqhh = '';
		for(i=0;i<img.length;i++){
			xqhh += '<img class="xq-ts" src="'+img[i]+'">'+
				  '<img class="xq-ys" src="'+img[i]+'" style="display: none;">';
		}
		$("#xq-img-click").before(xqhh);
		if($(".xq-ys").length >= 3){
			$("#xq-img-click").hide();  
		}
		break;
	}
 	
 }
 
 // 从相册中选择图片 
function galleryImgUP(num,cla,ob){
	// 从相册中选择图片
	plus.gallery.pick( function(e){
		var fileSrc = [];
		for(var i in e.files){
			fileSrc[i] = e.files[i];
		}
		console.log("图片路径1："+JSON.stringify(fileSrc))
		setHtml(fileSrc,cla,ob);
		
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
function getImageUP(cla,ob) {
	var c = plus.camera.getCamera();
	c.captureImage(function(e) {
		plus.io.resolveLocalFileSystemURL(e, function(entry) {
			var imgSrc = entry.toLocalURL() + "?version=" + new Date().getTime(); //拿到图片路径
			var fileSrc = [];
			fileSrc[0] = imgSrc;
			setHtml(fileSrc,cla,ob);
			// base64_img(fileSrc);
			 
		}, function(e) {
			console.log("读取拍照文件错误：" + e.message);
		});
	}, function(s) {
		console.log("error" + s);
	}, {
		filename: "_doc/camera/"
	}) 
}


