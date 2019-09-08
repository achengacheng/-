import {  Add , Delete , Query , Change ,FileImg } from '../../services/requestType.js'

export default{
	namespace:"serverData",
	state:{
		serverList:false,
		Textdetail:false,
		isApp:false
	},
	reducers:{
		serverListFun(state,{data}){
			return {
				...state,
				serverList:data
			}
		},
		getTextdetail(state,{data,isApps}){
			return {
				...state,
				Textdetail:data,
				isApp:isApps
			}
		},
		
	},
	effects:{
		*getsererList({data},{put}){//服务中心文章列表
			let resquest=yield Query('/article/getArticleByClassId',{id:'5b2b875ca8a92625b4fe4452'})//id是死数据
			try{
				if(resquest.data.success){
					yield put({type:'serverListFun',data:resquest.data.data})
				}
			}catch(err){
				console.log(err)
			}
		},
		*getTextData({textId,isApps},{put}){//服务中心文章详情
			let resquest=yield Query('/article/getArticleDetail',{id:textId})
			try{
				if(resquest.data.success){
					if(resquest.data.data){
						console.log(resquest.data.data[0].title)
						document.title=resquest.data.data[0].title;
					}					
					yield put({type:'getTextdetail',data:resquest.data.data,isApps:isApps})
				}
			}catch(err){
				console.log(err)
			}
		}
	},
	subscriptions:{
		setup({ dispatch, history }) {
			history.listen(location => {
				if (location.pathname.includes('HelpContent')){
					console.log(location.pathname.split('/')[4]) 
					let  textId=location.pathname.split('/')[4]
					let isApp
					if (location.search=='?isApp=1') {
						isApp=true;
					}else{
						isApp=false;
					}	
					dispatch({
							type:'getTextData',
							textId:textId,
							isApps:isApp
						})
				}else if(location.pathname.includes("ServePage")){
					document.title = '服务中心';
		  			dispatch({
		  				type:'getsererList'		  				
		  			})			
			        window.scrollTo(0,0)
				}		
			})
		}
	}
}
