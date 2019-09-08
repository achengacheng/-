import {  Add , Delete , Query , Change } from '../services/requestType';

export default {
	namespace:'shareData',
	state:{
		orderData:false
	},
	reducers:{
		changeData(state,{data}){
			return{
					...state,
					orderData:data
				 }
		}
	},
	effects:{
		*orderDataBack({id},{put}){
			let response=yield Query('/user/getShareOrder',{orderId:id})
			try{
				if(response.data.success){				
					yield put({type:'changeData',data:response.data.data})
				}
			}catch(err){
				console.log(err)
			}
			
		}
	},
	subscriptions:{
		setup({ dispatch,history }) {
			history.listen(location => {
				if(location.pathname.includes('SharebackPage')){
					document.title = '欢迎进入艾家';					
					let orderId=location.pathname.split('/')[2]
					/*父级id 商家id 存储*/
					if(location.search){
						let parentId=location.search.split('&')[0].split('=')[1]
						let boundCompanyId=location.search.split('&')[1].split('=')[1]
						if(parentId){
							sessionStorage.setItem('parentId',parentId)
						}
						if(boundCompanyId){
							sessionStorage.setItem('boundCompanyId',boundCompanyId)
						}
					}		
					console.log(orderId)			
					/*end*/	
					dispatch({
						type:'orderDataBack',
						id:orderId
					})
					window.scrollTo(0,0)
				}
			})
		}
	}
}