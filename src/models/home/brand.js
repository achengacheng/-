import { routerRedux } from 'dva/router';
import {  Add , Delete , Query , Change } from '../../services/requestType';

export default {
	namespace:'brandPage',
	state:{
		res_datas:{},
		listPage:1,
		loading: false, // 控制加载状态
	},

	subscriptions:{
		setup({ dispatch,history }) {
			history.listen(location => {
				if(location.pathname.includes('BrandPage')){
					document.title = '品牌艾家';
					dispatch({
						type: 'getBrandData',
						page:1,
						max:4
			        });
					window.scrollTo(0,0)
				}
			})
		}
	},

	effects: {	
		/*进入后获取原始数据*/
		*getBrandData({page,max,cb},{ put }){
			let reqData={
				method:"POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body:'page='+page+'&max='+max
			}
			const response = yield Query('/merchant/getMerchantBrand',reqData)
			if(!response.data.data.length&&cb){
				cb()
			}else{
				yield put({ 
					type: 'AddressData',
					data: response.data
				})	
			}	
		}
	},
	reducers: {
		/*接受初始获取数据给state*/
		AddressData(state,{ data }){
			return {
				...state,
				res_datas:state.res_datas.length?state.res_datas.concat(data.data):data.data,
				loading:data.success
			}
		}
	}
}