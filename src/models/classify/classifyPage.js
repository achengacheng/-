import { routerRedux } from 'dva/router';
import {  Query } from '../../services/requestType';

export default {
	namespace:'ClassifyPageData',
	state:{
		res_datas:{},
		loading: true, // 控制加载状态
	},

	subscriptions:{
		setup({ dispatch,history }) {
			history.listen(location => {
				if(location.pathname.includes('ClassifyPage')){
					document.title = '分类';
					dispatch({
	        			type: 'getClassifyData',
	        		});
					window.scrollTo(0,0)
				}
			})
		}
	},

	effects: {
		/*进入后获取原始数据*/
		*getClassifyData({payload={}},{ put }){
			const response = yield Query('/menu/loadGoodsMenu')
			if (response.data && response.data.success) {
				yield put({
					type: 'classifyData',
					data: response.data
				})
			}else{
				console.log('调用失败')
			}
		},
		/*跳转方法*/
	  *chooseToGo({ path,name,id },{put}) {
			yield put(routerRedux.push('/' + path + '/' + id))
		},
		/*跳转至其他页面*/
		*goToSearch({ payload },{put}) {
			yield put(routerRedux.push(payload))
		}
	},

	reducers: {
		/*接受初始获取数据给state*/
		classifyData(state,{ data }){
			return {
				...state,
				res_datas:data,
				loading: false
			}
		}
	}
}
