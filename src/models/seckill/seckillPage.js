import {  Add , Delete , Query , Change } from '../../services/requestType.js'
import { wxShare } from '../../services/weixinPay'
export default {
	namespace:'seckillPageData',
	state:{
		isApp:false,
		timeData:false,
		timeshareMsg:false,
		BannarData:false,
	},
	reducers: {	
		getTimedata(state,{data,isapp,shareMsg}){
			return {
				...state,
				timeData:data,
				isApp:isapp,
				timeshareMsg:shareMsg
			}
		},
		changeBannar(state,{data}){
			return {
				...state,
				BannarData:data,			
			}
		}
	},
	effects: {	
		*seckillTime({isapps},{put}){
			var response= yield Query('/secondKill/scrollHour') 
			try{
				if(response.data.success) {
					yield put({
						type:'getTimedata',
						data:response.data.data,
						isapp:isapps,
						shareMsg:response.data.shareMsg
					})
				}
			}catch(err){
				console.log(err)
			}			
		},
		*getBannarData({data},{put}){
			let response=yield Query('/advertising/getAdByPositionCode',{positionCode:data})
			try{
				if(response.data.success) {
					yield put({
						type:'changeBannar',
						data:response.data.data,
					})
				}
			}catch(err){
				console.log(err)
			}		
		},
		*getGoodFun({Id,dateId,d_this,Ttype},{put}){
			if(Id){
				let resData={FSId:dateId,FSDId:Id}
				let response=yield Query('/secondKill/getGoodsSku',resData)
				try{
					if(response.data.success){
						let getDataFun=d_this.changeData
						getDataFun(response.data.data,Ttype)
					}
				}catch(err){
					console.log(err)
				}
			}else{
				let getDataFun=d_this.changeData
				getDataFun(123)
			}					
		},
		*wxShareFun({data,fxFun},{put}){ //分享
			yield wxShare(data,fxFun)
		}		
	},
	subscriptions:{
		setup({ dispatch, history }) {
			history.listen(location => {
				if(location.pathname.includes('SeckillPage')){	
					document.title = '限时抢购';
					let isApp=false					
					/*父级id 商家id 存储*/
					if(location.search){
						if (location.search=='?isApp=1') {
							isApp=true;
						}else{
							isApp=false;
							let parentId=location.search.split('&')[0].split('=')[1]
							let boundCompanyId=location.search.split('&')[1].split('=')[1]
							if(parentId){
								sessionStorage.setItem('parentId',parentId)
							}
							if(boundCompanyId){
								sessionStorage.setItem('boundCompanyId',boundCompanyId)
							}
						}
						
					}					
					/*end*/														
					dispatch({
						type:'seckillTime',
						isapps:isApp
					})
					dispatch({
						type:'getBannarData',
						data:10
					})
					window.scrollTo(0,0)
				}
			})
		}
	}

}
