import { routerRedux } from 'dva/router';
import {  Add , Delete , Query , Change } from '../../../services/requestType';
import {wxShare} from'../../../services/weixinPay'
export default{
	namespace:"adPageData",
	state:{
		res_datas:[],
		detail_datas:{},
		res_page:1,
		detail_load:false,
		loading: false, // 控制加载状态,
		aDshareMsg:false //分享数据
    },
	reducers:{
        /*接受初始获取数据给state*/
		requstAd(state,{ data }){
			return {
				...state,
				res_datas:state.res_datas.length?state.res_datas.concat(data.data):data.data,
				loading:data.success
			}
		},
		adDetailData(state,{ data }){
			return {
				...state,
				detail_datas:data,
				detail_load:data.success,
				aDshareMsg:data.shareMsg
			}
		}
	},
	effects:{
        /*进入后获取原始数据*/
        *getAdFeeData({status,page,rows,cb},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'userId='+sessionStorage.getItem('id')+'&status='+status+'&page='+page+'&rows='+rows
            }
			const response = yield Query('/myCenter/adFeeList',reqData)
			if(!response.data.data.length&&page!=1){
				if(cb){
					cb()
				}
			}else{
				yield put({ 
					type: 'requstAd',
					data: response.data
				})	
			}	
		},
		//获取详情
		*getAdDetail({id},{ put }){
			let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'id='+id
            }
			const response = yield Query('/myCenter/adFeeInfo',reqData)
			if(response){
				sessionStorage.setItem('shareOrder',response.data.data.id)
				yield put({ 
					type: 'adDetailData',
					data: response.data
				})	
			}	
		},
		//分享完成
		*shareOrders({id},{ put }){
			let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'ids='+id
            }
			const response = yield Query('/order/shareOrder',reqData)
			setTimeout(function(){
				window.location.href='#/mypage/AdPage'
			},1000)	
            // yield put({ 
            //     type: 'adDetailData',
            //     data: response.data
            // })	
		},
		*wxShareFun({data,fxFun},{put}){ //分享
			yield wxShare(data,fxFun)
		}	
	},
	subscriptions:{
		setup({ dispatch,history }) {
			function aaa(){  
				var qs = window.location.href.split("?")[1];
				var  args = {}, 
					items = qs.length ? qs.split("&") : [], 
					item = null,
					len = items.length;
				for(var i = 0; i < len; i++) {
				item = items[i].split("=");
				var name = decodeURIComponent(item[0]),
					value = decodeURIComponent(item[1]);
				if(name) {
					args[name] = value;
				}
				}
				return args;
			}
			history.listen(location => {
				if(location.pathname.includes('AdPage')){
					localStorage.setItem('adIndex', 1);
					dispatch({
						type:'getAdFeeData',
						status:1,
						page:1,
						rows:8
					})
					document.title = '我的粮票';
					window.scrollTo(0,0)
				}
				if(location.pathname.includes('AdRateDetails')){
					dispatch({
						type:'getAdDetail',
						id:aaa().id
					})
					document.title = '我的粮票';
					window.scrollTo(0,0)
				}
			})
		}
	}
}