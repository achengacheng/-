import { routerRedux } from 'dva/router';
import {  Delete , Query } from '../../services/requestType';

export default {
	namespace:'loveData',
	state:{
		res_love_datas:false,
	},

	subscriptions:{
		setup({ dispatch, history }) {
			history.listen(location => {
				if(location.pathname.includes('LovePage')){
					if(!sessionStorage.getItem("id")){
						dispatch({//未登录跳转至登录页面
		        	type: 'goToLogin'
		        });
					}else{
						document.title = '我的收藏';
						let loveData;
						if(!sessionStorage.getItem("loveType")||sessionStorage.getItem("loveType")==='0'){
							loveData = {
								userId:sessionStorage.getItem("id"),
								fsxz:true,
								type:'GOODS',
								page:1,
								rows:10
							};
						}else if(sessionStorage.getItem("loveType")==='1'){
							loveData = {
								userId:sessionStorage.getItem("id"),
								fsxz:true,
								type:'THEME',
								page:1,
								rows:10
							};
						}else{
							loveData = {
								userId:sessionStorage.getItem("id"),
								fsxz:true,
								type:'COMMENT',
								page:1,
								rows:10
							};
						}
						dispatch({//收藏
		        	type: 'getLoveData',
		        	payload:loveData
		        });
					}
				}
			})
		}
	},

	effects: {
		/*收藏-进入后获取原始数据*/
		*getLoveData( { payload },{ put }){
			let reqData={"userId":payload.userId,"type":payload.type,"rows":payload.rows,"page":payload.page}
			const response = yield Query('/myCenter/myFavorite',reqData);
			if (response.data && response.data.success) {
				console.log('收藏',response.data)
				if(payload.fsxz){
					yield put({
						type: 'loveInitData',
						data: response.data.data
					})
				}else{
					let getPages = payload._this.getPage;
					if(response.data.data.data.length<payload.rows){
						getPages(false,response.data.data.data,payload.page);
					}else{
						getPages(true,response.data.data.data,payload.page);
					}
				}
			}else{
				console.log('调用失败')
			}
		},
		/*跳转登录页面*/
		*goToLogin({payload={}},{put}) {
			yield put(routerRedux.push('/Login'))
		},
		/*点击跳转(商品/专题/评论/相似)*/
		*chooseToGo({ payload },{put}) {
			yield put(routerRedux.push(payload))
		},
		/*取消收藏*/
		*loveCancel( { payload,callBack }){
			let reqData={"fid":payload}
			const response = yield Delete('/myCenter/cancelFavorite',reqData);
			if (response.data && response.data.success) {
				callBack(response.data.success)
			}else{
				callBack(response.data.success)
			}
		},
	},

	reducers: {
		/*接受初始获取数据给love-state*/
		loveInitData(state,{ data }){
			return {
				...state,
				res_love_datas:data
			}
		}
	}
}
