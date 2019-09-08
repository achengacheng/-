import constant from '../constant.js'
import request from '../utils/request';
import {Query} from './requestType'
import $ from 'jquery'
var wx = require('weixin-js-sdk')

// const Query=(url,datas)=>{
// 	let response;		
// 	response=request(constant.baseUrl+url,datas)
// 	return response;
// }
const wxShare=(ShareDatas,responseTo)=>{ //分享
	let reqData={
		method: "POST",  
    	mode: "cors",  
    	headers: {  
       		"Content-Type": "application/x-www-form-urlencoded"  
    	},  
		body:"url="+constant.wxRzUrl
	}
	request(constant.baseUrl+'/httpClient/getJsSdk',reqData).then(function(data){
		try{
			if(data.data.success){
				wx.config({
				    deBug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				    appId: data.data.data.appId, // 必填，公众号的唯一标识
				    timestamp:data.data.data.timestamp , // 必填，生成签名的时间戳
				    nonceStr:data.data.data.nonceStr, // 必填，生成签名的随机串
				    signature: data.data.data.signature,// 必填，签名
			    	jsApiList: ['checkJsApi', 'onMenuShareTimeline',
		                        'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
				});				
				wx.ready(function(res){
						// console.log(ShareDatas.link.split('#')[0]+"?"+ShareDatas.link.split('#')[1].split('?')[0]+"%"+ShareDatas.link.split('#')[1].split('?')[1]+"#/")	
						// alert(ShareDatas.link.split('#')[0]+"?"+ShareDatas.link.split('#')[1].split('?')[0]+"%"+ShareDatas.link.split('#')[1].split('?')[1]+"#/")				
					wx.onMenuShareTimeline({
			            title: ShareDatas?ShareDatas.title:'',
			            link: ShareDatas?ShareDatas.link.split:'',
			            imgUrl:ShareDatas?ShareDatas.picture:'',//自定义图标
			            desc:ShareDatas?ShareDatas.description:'',			     
			            trigger: function (res) {
			                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回.
			                // alert('click shared');
			            },
			            success: function () {
			               responseTo("分享成功",true)
			                //some thing you should do
			            },
			            cancel: function (res) {
			                //alert('shared cancle');
			                responseTo("取消分享",false)
			            },
			            fail: function (res) {
			                //alert(JSON.stringify(res));
			                responseTo("分享失败",false)
			            }
			        });
			        //分享给好友
			        wx.onMenuShareAppMessage({
			            title: ShareDatas?ShareDatas.title:'',
			            link: ShareDatas?ShareDatas.link:'',
			            imgUrl:ShareDatas?ShareDatas.picture:'',// 自定义图标
			            desc:ShareDatas?ShareDatas.description:'',			           
			            success: function () {
			                // 用户确认分享后执行的回调函数
			                 responseTo("分享成功",true)
			            },
			            cancel: function () {
			                // 用户取消分享后执行的回调函数
			                responseTo("取消分享",false)
			            },
			             fail: function (res) {//分享失败回调
			                 responseTo("分享失败",false)
			            }
			        });	
			        wx.onMenuShareQQ({ //分享qq好友
			            title: ShareDatas?ShareDatas.title:'',
			            link: ShareDatas?ShareDatas.link:'',
			            imgUrl:ShareDatas?ShareDatas.picture:'',// 自定义图标
			            desc:ShareDatas?ShareDatas.description:'',			           
			            success: function () {
			                // 用户确认分享后执行的回调函数
			                 responseTo("分享成功",true)
			            },
			            cancel: function () {
			                // 用户取消分享后执行的回调函数
			                responseTo("取消分享",false)
			            },
			             fail: function (res) {//分享失败回调
			                 responseTo("分享失败",false)
			            }
			        });		
			        wx.onMenuShareWeibo({ //分享腾讯微博
			            title: ShareDatas?ShareDatas.title:'',
			            link: ShareDatas?ShareDatas.link:'',
			            imgUrl:ShareDatas?ShareDatas.picture:'',// 自定义图标
			            desc:ShareDatas?ShareDatas.description:'',			           
			            success: function () {
			                // 用户确认分享后执行的回调函数
			                 responseTo("分享成功",true)
			            },
			            cancel: function () {
			                // 用户取消分享后执行的回调函数
			                responseTo("取消分享",false)
			            },
			             fail: function (res) {//分享失败回调
			                 responseTo("分享失败",false)
			            }
			        });	
			        wx.onMenuShareQZone({ //分享到QQ空间
			            title: ShareDatas?ShareDatas.title:'',
			            link: ShareDatas?ShareDatas.link:'',
			            imgUrl:ShareDatas?ShareDatas.picture:'',// 自定义图标
			            desc:ShareDatas?ShareDatas.description:'',			           
			            success: function () {
			                // 用户确认分享后执行的回调函数
			                 responseTo("分享成功",true)
			            },
			            cancel: function () {
			                // 用户取消分享后执行的回调函数
			                responseTo("取消分享",false)
			            },
			             fail: function (res) {//分享失败回调
			                 responseTo("分享失败",false)
			            }
			        });			
				})								
				wx.error(function(res){
					 responseTo("微信认证失败",false)
				})
			}
		}catch(err){
			console.log(err)
		}
		
	})
}

const wxPay=(orderData,responseTo)=>{//支付
	let reqData={
		method: "POST",  
    	mode: "cors",  
    	headers: {  
       		"Content-Type": "application/x-www-form-urlencoded"  
    	},  
		body:"url="+constant.wxRzUrl
	}
	request(constant.baseUrl+'/httpClient/getJsSdk',reqData).then(function(data){
		// alert(data.data.data.appId)
		try{
			if(data.data.success){
				wx.config({
				    //deBug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				    appId: data.data.data.appId, // 必填，公众号的唯一标识
				    timestamp:data.data.data.timestamp , // 必填，生成签名的时间戳
				    nonceStr:data.data.data.nonceStr, // 必填，生成签名的随机串
				    signature: data.data.data.signature,// 必填，签名
			    	jsApiList: ['checkJsApi','chooseWXPay'] // 必填，需要使用的JS接口列表
				});	
				wx.ready(function(res){	
					wx.chooseWXPay({  
					    timestamp: orderData.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符  
					    nonceStr: orderData.nonceStr, // 支付签名随机串，不长于 32 位  
					    package: orderData.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）  
					    signType: orderData.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'  
					    paySign: orderData.sign, // 支付签名  
					    success: function (res) {  
					        // 支付成功后的回调函数
					      	responseTo("支付成功",true) 
					    },
					    cancel:function(res){
						//支付取消
							responseTo("取消支付",false)
						},
						error:function(res){
						//支付出错
							responseTo("支付失败",false)
						},  
					}); 		
				})								
				wx.error(function(res){
					 responseTo("微信认证失败",false)
				})
			}
		}catch(err){
			console.log(err)
		}
		
	})
}
export { wxShare , wxPay }