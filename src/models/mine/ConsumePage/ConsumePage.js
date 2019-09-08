import { routerRedux } from 'dva/router';
import {  Add , Delete , Query , Change } from '../../../services/requestType';

export default{
	namespace:"consumeData",
	state:{
		res_datas:[],
		res_group:[],
		res_all:'',
		res_page:1,
		moreLoading:false,
		loading: false, // 控制加载状态
    },
	reducers:{
        /*接受初始获取数据给state*/
		requstCon(state,{ data }){
			return {
				...state,
				res_group:data.data.group,
				res_all:data.data,
				res_datas:data.data.data,
				loading:data.success
			}
		},
		requstData(state,{ data }){
			console.log(state.res_datas,555)
			return {
				...state,
				res_datas:state.res_datas.length?state.res_datas.concat(data.data):data.data,
				moreLoading: data.success
			}
		}
	},
	effects:{
        /*进入后消费详情数据*/
        *getConFeeData({},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'userId='+sessionStorage.getItem('id')
            }
			const response = yield Query('/myCenter/myPayFee',reqData);
            yield put({ 
                type: 'requstCon',
                data: response.data
            })		
		},
		/*上拉获取数据接口*/
        *upLoad({page,rows,cb},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'userId='+sessionStorage.getItem('id')+'&page='+page+'&rows='+rows
            }
			const response = yield Query('/myCenter/myPayFeeRecords',reqData);
			if(!response.data.data.length&&cb){
				console.log(12)
				cb()
			}else{
				yield put({ 
					type: 'requstData',
					data: response.data
				})	
			}
		}
	},
	subscriptions:{
		setup({ dispatch,history }) {
			history.listen(location => {
				if(location.pathname.includes('ConsumePage')){
					dispatch({
						type:'getConFeeData'
					})
					document.title = '我的消费';
					window.scrollTo(0,0)
				}
			})
		}
	}
}