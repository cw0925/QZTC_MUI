 // var HOSTPATH = "http://qztc.s1.natapp.cc/o2o/";      //线下
var HOSTPATH = "https://www.qinzhoutongcheng.com/index.php/"; //线上
var APIPATH = HOSTPATH+'Api/';
// 接收 页面传值
			function getRequest() {   
			   var url = window.location.search; //获取url中"?"符后的字串   
			   var theRequest = new Object();
			   if (url.indexOf("?") != -1) {   
			      var str = url.substr(1);   
			      strs = str.split("&");   
			      for(var i = 0; i < strs.length; i ++) {   
			         theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]); 			       
			      }   
			   }   
			   return theRequest;   
			};
			
			function getQueryString() {   
			  var qs = location.search.substr(1), // 获取url中"?"符后的字串  
			    args = {}, // 保存参数数据的对象
			    items = qs.length ? qs.split("&") : [], // 取得每一个参数项,
			    item = null,
			    len = items.length;
			 
			  for(var i = 0; i < len; i++) {
			    item = items[i].split("=");
			    var name = decodeURIComponent(item[0]),
			      value = decodeURIComponent(item[1]);
			    if(name) {
			      args[name] = value;
			    }
			  }
			  return args;
			}
			function isNull(arg1)
			{
			 return !arg1 && arg1!==0 && typeof arg1!=="boolean"?true:false;
			}