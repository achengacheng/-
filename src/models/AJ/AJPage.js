import { routerRedux } from 'dva/router';
import {  Query } from '../../services/requestType';

export default {
	namespace:'AJPageData',
	state:{
		res_partition_datas:false,
		res_all_datas:false,
		res_type_datas:false
	},

	subscriptions:{
		setup({ dispatch,history }) {
			history.listen(location => {
				//window.scrollTo(0,0)//回到顶部
				if(location.pathname.includes('ClassifyAJ')){
					let classifyId = location.pathname.slice(location.pathname.lastIndexOf('/')+1);							
					document.title = '艾家分类';
					let data = {
						merTypeId:classifyId,
						fsxz:true,
						page:1,
						max:8
					};
					dispatch({
			        	type: 'getTypeData',
			        	payload:data
			        });
				}else if(location.pathname.includes('AllAJ')){
					document.title = '全部艾家';
					let data = {//暂时不传，下面注释了
						page:1,
						max:20
					};
					dispatch({
	        	type: 'getAllData',
	        	payload:data
	        });
				}else if(location.pathname.includes('AJPage')){
					document.title = '艾家专区';
					dispatch({
	        	type: 'getPartitionData',
	        })
				}
			})
		}
	},

	effects: {
		/*进入后获取-艾家专区-原始数据*/
		*getPartitionData({payload={}},{ put }){
			const response = yield Query('/merchant/getMerchantPartition')
			if (response.data && response.data.success) {
				yield put({
					type: 'partitionData',
					data: response.data.data
				})
			}else{
				console.log('调用失败')
			}
		},
		/*进入后获取-全部艾家-原始数据*/
		*getAllData({ payload },{ put }){
			// let formData = new FormData();
			// formData.append("page",payload.page);
			// formData.append("max",payload.max);
			let reqData
			if(payload.queryCondition){
				reqData={"queryCondition":payload.queryCondition}
			}
			const response = yield Query('/merchant/getAllMerchant',reqData)
			if (response.data && response.data.success) {
				yield put({
					type: 'allData',
					data: response.data.data
				})
			}else{
				console.log('调用失败')
			}
		},
		/*进入后获取-XX艾家-原始数据*/
		*getTypeData({ payload },{ put }){
			let reqData={"merTypeId":payload.merTypeId,"page":payload.page,"max":payload.max}
			const response = yield Query('/merchant/getMerchantByType',reqData)
			if (response.data && response.data.success) {				
				if(payload.fsxz){
					yield put({
						type: 'typeData',
						data: response.data.data
					})
				}else{
					let getPages=payload._this.getPage;
					if(response.data.data.allMer.length<payload.max){
						getPages(false,response.data.data.allMer,payload.page);
					}else{
						getPages(true,response.data.data.allMer,payload.page);
					}
				}
			}else{
				console.log('调用失败')
			}
		},
		/*跳转方法*/
		*chooseToGo({ payload },{put}) {
			if(payload.includes('AJPage')){
				yield put(routerRedux.push(payload))
			}else{
				yield put(routerRedux.push('/AJPage/'+payload))
			}
		},
		/*跳转至搜索页面*/
		*goSearch(_,{put}) {
			yield put(routerRedux.push('/SearchPage'))
		}
	},

	reducers: {
		/*接受初始获取数据给(专区)partition-state*/
		partitionData(state,{ data }){
			return {
				...state,
				res_partition_datas:data
			}
		},
		/*接受初始获取数据给(全部)all-state*/
		allData(state,{ data }){
			return {
				...state,
				res_all_datas:data
			}
		},
		/*接受初始获取数据给(XX)type-state*/
		typeData(state,{ data }){
			return {
				...state,
				res_type_datas:data
			}
		}
	}
}
