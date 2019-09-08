import {  Add , Delete , Query , Change } from '../services/requestType.js'
import constant from '../constant'
export default{
	namespace:'LoginData',
	state:{
		res_datas:false,
		ValidCode:false,
		Register_data:false,
		resetPwd_data:false,
		login_Choice:true,
		Register_login:false
	},
	reducers: {
		loginReq_change(state,{data}){ //登录请求返回值
			return {
				...state,
				res_datas:data
			 }
		},
		RegisterReq_change(state,{data,LoginDatas}){//注册请求返回值
			return {
				...state,
				Register_data:data,
				Register_login:LoginDatas
			 }
		},
		ResetPwd_data(state,{data}){//找回密码
			return {
				...state,
				resetPwd_data:data
			}
		},
		choice_loginWay(state,{data}){
			return {
				...state,
				login_Choice:data
			}
		},
		getRegister_Phone(state,{data}){
			return {
				...state,
				Register_Phone:data
			}
		},	
	},

	effects: {	
		*loginReq({data},{call,put}){ //密码登录请求
			let reqData={
				method: "POST",  
	            mode: "cors",  
	            headers: {  
	                "Content-Type": "application/x-www-form-urlencoded",
	               	"Authorization":"71c429c783da45ba9288c325830f0cf9"
	            },  
				body:'telephone='+data.telephone+"&password="+data.password
			}	
			let response= yield Query('/user/login',reqData)	
			if(response){
				try{
					if(response.data.success){
						let openId=localStorage.getItem('openId')
						let resp
						if(openId){
							resp=yield Query('/user/boundOpenIdAndUser',{openId:openId,userId:response.data.data.id})
						}
					}
				}catch(err){
					console.log(err)
				}
				yield put({type: 'loginReq_change',data:response})
			}					
		}, 
		*validLogin({data},{call,put}){ //验证码登录
			let reqData={ 
				method: "POST",  
	            mode: "cors",  
	            headers: {  
	                "Content-Type": "application/x-www-form-urlencoded"  
	            },  
				body:'telephone='+data.telephone+"&code="+data.password+"&loginType='weixin'"
			}	
			let response= yield Query('/user/loginByCode',reqData)	
			if(response){
				try{
					if(response.data.success){
						let openId=localStorage.getItem('openId')
						let resp
						if(openId){
							resp=yield Query('/user/boundOpenIdAndUser',{openId:openId,userId:response.data.data.id})
						}
					}
				}catch(err){
					console.log(err)
				}
				yield put({type: 'loginReq_change',data:response})
			}	

		},
		*getValidCode({data},{call,put}){ //验证码
			let ValidCoderRes=data.this.ValidCoderRes
			let reqData={
				method: 'POST',
				mode: "cors",  
	            headers: {  
	                "Content-Type": "application/x-www-form-urlencoded"  
	            },  
				body:'telephone='+data.telephone
			}
			let response= yield Query('/httpClient/getValidCode',reqData)		
			ValidCoderRes(response)//发送完成返回值	
		},
		*RegisterReq({data},{call,put}){ //注册
			let parentId=sessionStorage.getItem('parentId')?sessionStorage.getItem('parentId'):false;
			let boundCompanyId=sessionStorage.getItem('boundCompanyId')?sessionStorage.getItem('boundCompanyId'):8000;
			let reqData
			if(parentId){
				reqData={
							telephone:data.telephone,
							password:data.password,
							validCode:data.validCode,
							registryTerrace:data.registryTerrace,
							parentId:parentId,
							boundCompanyId:boundCompanyId
						}
				
			}else{
				reqData={
							telephone:data.telephone,
							password:data.password,
							validCode:data.validCode,
							registryTerrace:data.registryTerrace,
							boundCompanyId:boundCompanyId
						}
			}			
			let response= yield Add('/user/register',reqData)		
			let logindata={telephone:data.telephone,password:data.password}
			yield put({type:'RegisterReq_change',data:response,LoginDatas:logindata})
		},
		*resetPwd({data},{call,put}){ //忘记密码
			let reqData={
				method: 'POST',
				mode: "cors",  
	            headers: {  
	                "Content-Type": "application/x-www-form-urlencoded"  
	            },  
				body:'telephone='+data.telephone+'&newPWD='+data.newPWD+'&validCode='+data.validCode
			}	
			let response= yield Change('/user/resetPwd',reqData)
		
			yield put({type:'ResetPwd_data',data:response})
		},
		*provingOpenid({loca},{put}){	
			let openId=localStorage.getItem('openId') 
			let ssCode=sessionStorage.getItem('codes')			
			if (!openId){
				if(ssCode){
					//获取openid
				 	let response= yield Query('/httpClient/loginByCode',{'code':ssCode})
				 	 if(response){			 		
				 		try{
				 			if(response.data.success){
				 				//openid登录
				 				sessionStorage.removeItem('codes')		 								 				
				 				sessionStorage.setItem('id',response.data.data.id)				 				
								sessionStorage.setItem('scNO',response.data.data.scNO)
								localStorage.setItem('token',response.data.data.token)
								localStorage.setItem('openId',response.data.data.openId)								
								window.location.href="#"+loca.search.substring(1)											 									 				
				 			}else{
				 				if(response.data.hasOwnProperty("data")){
				 					if(response.data.data.openId){
				 						localStorage.setItem('openId',response.data.data.openId)
				 						sessionStorage.removeItem('codes')
				 					}				 					
				 					
				 				}				 									 				
				 			}
				 		}catch(err){
				 			console.log(err)
				 		}				 		
				 	}	
				}else{
					let codes,stateData
					var reg = new RegExp("(^|&)" + "code" + "=([^&]*)(&|$)", "i"); 
					var r = window.location.search.substr(1).match(reg); 
					if (r != null) {
						codes=unescape(r[2])  
					}
			       	if(!codes){
			       		var ua = window.navigator.userAgent.toLowerCase();
					  	if(ua.match(/MicroMessenger/i) == 'micromessenger'){//判断微信浏览器
					  		let staData=loca.search.substring(2)
							window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx271ac67ba9551fc0&redirect_uri='+constant.codeUrl+'&response_type=code&scope=snsapi_base&state='+staData+'#wechat_redirect'		  		
					  	}
			       	}
				}
			}else{
				let res= yield Query('/user/loginByOpenId',{openId:openId})
 				if(res.data.success){
 					sessionStorage.setItem('id',res.data.data.id)
					sessionStorage.setItem('scNO',res.data.data.scNO)
					localStorage.setItem('token',res.data.data.token)
					window.location.href='#'+loca.search.substring(1) 
 				}else{
 					window.location.href="#/Login?"+loca.search.substring(1)
 				}		
			}
		}
	},
	subscriptions:{
		setup({dispatch, history}) {
			history.listen(location => {
				if(location.pathname.includes('Login')){
					document.title = '登录';
					let loginPhone=location.hash.substring(1)
					let usersId=sessionStorage.getItem('id')
					if(usersId){
						window.location.href='/'
					}else{
						if(loginPhone!==undefined&&loginPhone!==''&&loginPhone!==null) {
							dispatch({
								type:'getRegister_Phone',
								data:loginPhone
							})							
						}
						dispatch({type:'provingOpenid',loca:location})																									
					}					
					window.scrollTo(0,0)
				}else if(location.pathname.includes('Register')){
					document.title = '注册';									
					window.scrollTo(0,0)
				}else if(location.pathname.includes('ForgetPassword')){
					document.title = '找回密码';										
					window.scrollTo(0,0)
				}
			})
		}
	}
}