import { routerRedux } from 'dva/router';
import {  Add , Delete , Query , Change } from '../../../services/requestType';

export default{
	namespace:"balanceData",
	state:{
		res_datas:[],
		record_data:[],
		with_data:[],
		recordPage:1,
		record_group:'',
		newWith:[0],
		ExPage:1,
		record_loading:false,
		with_loading:false,
		loading: false, // 控制加载状态
    },
	reducers:{
        /*接受初始获取数据给state*/
		requstAd(state,{ data }){
			return {
				...state,
				res_datas:data.data, 
				loading: data.success
			}
		},
		recordDataList(state,{ data }){
			return {
				...state,
				record_data:state.record_data.length?state.record_data.concat(data.data.data):data.data.data,
				record_group: data.data.group,
				record_loading: data.success
			}
		},
		withDatas(state,{ data }){
			return {
				...state,
				with_data:state.with_data.length?state.with_data.concat(data.data):data.data,
				with_loading: data.success,
				newWith:data.data
			}
		}
	},
	effects:{
        /*进入后获取原始数据*/
        *getBalanceData({},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'userId='+sessionStorage.getItem('id')
            }
			const response = yield Query('/myCenter/myBalance',reqData)
            yield put({ 
                type: 'requstAd',
                data: response.data
            })		
		},
		//获取记录详情
		*recordData({page,rows,cb},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'userId='+sessionStorage.getItem('id')+'&page='+page+'&rows='+rows
            }
			const response = yield Query('/myCenter/inAndExRecord',reqData)
			// if(!response.data.data.data.length){
			// 	cb()
			// }else{
			// 	yield put({ 
			// 		type: 'recordDataList', 
			// 		data: response.data
			// 	})	
			// }
			if(response.data.success){
				yield put({ 
					type: 'recordDataList', 
					data: response.data
				})
			}	
		},
		//获取提现记录
		*withRecord({page,rows},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'userId='+sessionStorage.getItem('id')+'&page='+page+'&rows='+rows
            }
			const response = yield Query('/myCenter/withdrawalsRecord',reqData)
            yield put({ 
                type: 'withDatas',
                data: response.data
            })		
		}
	},
	subscriptions:{
		setup({ dispatch,history }) {
			history.listen(location => {
				if(location.pathname.includes('MyBalance')){
					dispatch({ 
						type:'getBalanceData'
					})
					document.title = '我的余额';
					window.scrollTo(0,0)
				}
				if(location.pathname.includes('DepositRecord')){
					dispatch({ 
						type:'withRecord',
						page:1,
						rows:8
					})
					document.title = '我的余额';
					window.scrollTo(0,0)
				}
				if(location.pathname.includes('BalanceRecord')){
					dispatch({ 
						type:'recordData',
						page:1,
						rows:8
					})
					document.title = '我的余额';
					window.scrollTo(0,0)
				}
			})
		}
	}
}