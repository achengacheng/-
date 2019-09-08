import {  Add , Delete , Query , Change } from '../../services/requestType.js'
import $ from 'jquery'
import fetch from 'dva/fetch';
import { wxShare } from '../../services/weixinPay'

export default {
	namespace:'homePageData',
	state:{
		scollTop:0,		
		isApp:true,
		HomeAllData:false,
		GuessLikeData:false,
		homeshareMsg:false						 
	},
	reducers: {
	 	isScoll(state,{top:value}){	 		
	    	return {	    
	    		scollTop:value
			};
		},
		getHomeData(state,{data,isApp,shareMsg}){
				return{
					...state,
					HomeAllData:data,
					isApp:isApp,
					homeshareMsg:shareMsg
				}						
		},
		getGuessLike(state,{data}){
			return {
				...state,
				GuessLikeData:data
			}
		}
	},

	effects: {
		*GuessLike({fsxz,_this,pages,nums},{put}){//获取猜你喜欢数据			
			if(fsxz){
				var response=yield Query('/index/getMayYouLike')
				if(response){
					if(response.data.success){
						yield put({type:'getGuessLike',data:response.data.data.data})
					}
				}				
			}else{
				var response=yield Query('/index/getMayYouLike')
				let getPage=_this.getPage				
				if(response){
					if(response.data.success){
						getPage(true,response.data.data.data,pages);
					}
				}
			}
			
		},			
		*homePage({isapp,boundId},{put,call}){//获取首页数据	
			var response=yield Query('/index/getIndexData',{boundCompanyId:boundId})
			if(response){
				try {
					if(response.data.success){
						if(response.data.data.FStep.length>0){
							if (sessionStorage.getItem('ajData')){
								document.title=JSON.parse(sessionStorage.getItem('ajData')).storeName
							}else{
								sessionStorage.setItem('ajData',JSON.stringify({imgurl:response.data.data.FStep[0].data.logoUrL,storeName:response.data.data.FStep[0].data.storeName}))								
								document.title=response.data.data.FStep[0].data.storeName
							}							
							
						}						
						yield put({type:'getHomeData',data:response.data.data,isApp:isapp,shareMsg:response.data.shareMsg})
						
					}else{														
					}
				}catch(err){
					console.log(err)
				}					
			}		
		},
		*getOpenId({isapp,boundId},{put}){
			if(isapp){
 				yield put({type:'homePage',isapp:isapp,boundId:boundId})	
			}else{
				let codes,stateData
				var reg = new RegExp("(^|&)" + "code" + "=([^&]*)(&|$)", "i"); 
				var r = window.location.search.substr(1).match(reg); 
				if (r != null) {
					codes=unescape(r[2])  
				}
				if(codes){
		       		stateData=window.location.search.split('state')[1]
		       		if(stateData.length>1){
						stateData=stateData.substring(1)
		       		}else{
		       			stateData=''
		       		}
		       		sessionStorage.setItem('codes',codes)
		       		window.location.href=window.location.origin+'#/Login?'+stateData	
		       	}else{		       		
		       		yield put({type:'homePage',isapp:isapp,boundId:boundId})	
		       	}
			}		
		},
		*wxShareFun({data,fxFun},{put}){ //分享
			yield wxShare(data,fxFun)
		}		
	},
	subscriptions:{
		setup({ dispatch, history }) {
			history.listen(location => {
				if(location.pathname.length === 1){	
					document.title = '首页';
					let isApp=false,boundCompanyId=8000
					/*父级id 商家id 存储*/
					if(location.search){
						if (location.search.indexOf("?isApp=1") != -1) {
							isApp=true;							
						}else{
							isApp=false;							
						}
						if(location.search.indexOf("parentId")!= -1){
							let parentId=location.search.split('&')[0].split('=')[1]
							boundCompanyId=location.search.split('&')[1].split('=')[1]
							if(parentId){
								sessionStorage.setItem('parentId',parentId)
							}
							if(boundCompanyId){
								sessionStorage.setItem('boundCompanyId',boundCompanyId)
							}
						}else if(location.search.indexOf("boundCompanyId")!= -1){
							boundCompanyId=location.search.split('&')[1].split('=')[1]
							if(boundCompanyId){
								sessionStorage.setItem('boundCompanyId',boundCompanyId)
							}
						}									
					}else if (sessionStorage.getItem('boundCompanyId')) {
						boundCompanyId=sessionStorage.getItem('boundCompanyId')
						if(location.search){
							if (location.search.indexOf("?isApp=1") != -1) {
								isApp=true;							
							}else{
								isApp=false;							
							}	
						}							
					}else{
						sessionStorage.setItem('boundCompanyId',boundCompanyId)
					}				
					/*end*/													
					dispatch({
						type:'getOpenId',
						isapp:isApp,
						boundId:boundCompanyId
					})								
					// window.scrollTo(0,0)
				}
			})
		}
	}
}