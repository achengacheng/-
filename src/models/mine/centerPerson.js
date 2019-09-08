import {  Add , Delete , Query , Change ,FileImg } from '../../services/requestType.js'
import { routerRedux } from 'dva/router';

export default{
	namespace:"centerPersonData",
	state:{
		setType:false,
		useDataPhone:false,
		userAllData:false,
		userTele:false
	},
	reducers:{
		changePhone(state,{data,alldata,tele}){
			return {
				...state,
				useDataPhone:data,
				userAllData:alldata,
				userTele:tele
			}
		},
		changeUserData(state,{data,teles}){
			return {
				...state,
				userAllData:data,
				userTele:teles
			}
		},
		changesetType(state,{data}){
			return {
				...state,
				setType:data
			}
		}
		
	},
	effects:{
		*changeTelephone({data},{put,call}){//修改手机号
			let popFun=data.this.thisPopfun
			let reqData={
				method: "POST",  
	            mode: "cors",  
	            headers: {  
	                "Content-Type": "application/x-www-form-urlencoded"  
	            },  
				body:'telephone='+data.telephone+"&validCode="+data.validCode+"&oldTel="+data.oldTel+"&id="+data.id
			}
			let response= yield Change('/user/modifyTel',reqData)
			if(response){
			 	if(response.data.success){
			 		sessionStorage.removeItem('oldTele')
			 	 	popFun(response.data.alertMsg.msg,"success",true)
			 	 				 	 
			 	}else{
			 	 	popFun(response.data.alertMsg.msg,"fall",false)
			 	}
			}
			
		},
		*changePsd({data,d_this},{put,call}){//修改密码
			console.log(d_this)
			let reqData={
				method: "POST",  
	            mode: "cors",  
	            headers: {  
	                "Content-Type": "application/x-www-form-urlencoded"  
	            },  
				body:'telephone='+data.telephone+"&newPWD="+data.newPWD+"&oldPWD="+data.oldPWD
			}
			let response= yield Change('/user/resetPwd',reqData)
			let changef=d_this.changeFe
			if(response){
				if (response.data.success){
					changef(response.data.alertMsg.msg,"success",true)
				}else{
					changef(response.data.alertMsg.msg,"fall",false)
				}
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
		*provingValidCode({data},{put,call}){//修改手机验证验证码
			let d_thisFun=data.this.proving
			let reqData={
				method: "POST",  
	            mode: "cors",  
	            headers: {  
	                "Content-Type": "application/x-www-form-urlencoded"  
	            },  
				body:'validCode='+data.validCode+"&telephone="+data.telephone
			}
			let response= yield Query('/user/validateCode',reqData)	
			if(response){
				if (response.data.success){
					sessionStorage.setItem('oldTele',data.telephone)
					yield put(routerRedux.push('/mypage/CenterPerson/ChangePhone_Next'))
				}else{
					d_thisFun(response.data.alertMsg.msg)
				}	
			}
			
		 },
		*getUserData({data,keys},{put,call}){//获取用户信息
			let reqData={
				method: "POST",  
	            mode: "cors",  
	            headers: {  
	                "Content-Type": "application/x-www-form-urlencoded"  
	            },  
				body:'id='+data
			}	
			let response= yield Query('/user/getUser',reqData)
			console.log(123456,response)				
			if(response.data.success){
				if(keys){
					yield put({type: 'changeUserData',data:response.data.data[0],teles:response.data.data[0].telephone})					
				}else{
					var reg = new RegExp("(\\d{3})(\\d{4})(\\d{4})");
					let telephone = response.data.data[0].telephone.toString().replace(reg, "$1****$3"); 				
					yield put({type: 'changePhone',data:telephone,alldata:response.data.data[0],tele:response.data.data[0].telephone})
				}				
			}	
			
		},
		*getOss({data},{put,call}){//获取oss密钥,地址
			let naxtFun=data.pushOss,ossData={}
			let response= yield Query('/oss/getOssCredential')
			try{
				if(response.data.success){
					ossData.Credential=response.data.data
					let responses=yield Query('/oss/getPathInfo')
					if(responses.data.success){
						ossData.pathInfo=responses.data.data
					}
					naxtFun(ossData)
				}
			}catch(err){
				console.log(err)
			}	
		},
		*pushOssfun({data,dthis,uData},{put,call}){	//上传图片
			let response
			if(data){
				response= yield FileImg(data)	
			}		
			console.log(response)	
			if(response){
				if(response.hasOwnProperty("url")){
			 		uData['url']=response.url
			 	}	
			}		
			
			 yield put({type:'putUserData',data:uData,_this:dthis})	 
		},
		*putUserData({data,_this},{put}){//修改个人信息
			console.log("个人信息",data)
			let popfun=_this.Popfuns
			let userId=sessionStorage.getItem('id')
			let reqData={
				method: "POST",  
	            mode: "cors",  
	            headers: {  
	                "Content-Type": "application/x-www-form-urlencoded"  
	            },  
				body:'userId='+userId+"&name="+data.name+"&sex="+data.sex+"&birthday="+data.birthday+"&province="+data.province+"&city="+data.city+"&area="+data.area+"&professional="+data.professional+"&individualitySignature="+data.individualitySignature+"&tags="+data.tags+"&url="+data.url
			}				
			let response= yield Change('/user/resetUserInfo',reqData)
			if(response){
				popfun(response.data)
			}
		}
	},
	subscriptions:{
		setup({ dispatch, history }) {
			history.listen(location => {
				if(location.pathname=="/myPage/CenterPerson"){
					document.title = '个人中心';
					let usersId=sessionStorage.getItem('id')
		  			dispatch({
		  				type:'getUserData',
		  				data:usersId,
		  				keys:0
		  			})			
			        window.scrollTo(0,0)
				}else if(location.pathname.includes('PersonalInformation')){
					document.title = '个人信息';
					let usersId=sessionStorage.getItem('id')
		  			dispatch({
		  				type:'getUserData',
		  				data:usersId,
		  				keys:0
		  			})			
			        window.scrollTo(0,0)
				}else if(location.pathname.includes('ModifyPassword')){
					document.title = '修改密码';
					let usersId=sessionStorage.getItem('id')
		  			dispatch({
		  				type:'getUserData',
		  				data:usersId,
		  				keys:0
		  			})			
			        window.scrollTo(0,0)
				}else if(location.pathname.includes('ChangePhone')||location.pathname.includes('ChangePhone_Next')){
					document.title = '修改手机';
					let usersId=sessionStorage.getItem('id')
		  			dispatch({
		  				type:'getUserData',
		  				data:usersId,
		  				keys:0
		  			})			
			        window.scrollTo(0,0)
				}				
			})
		}
	}
	
}