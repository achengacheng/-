import { routerRedux } from 'dva/router';
import {  Query } from '../../services/requestType';
import { wxShare }  from '../../services/weixinPay'
export default {
	namespace:'AJIntroduceData',
	state:{
		res_msg_datas:false,
		res_goods_datas:false,
		res_eva_datas:false,
		res_evaDetails_datas:false,
		AjshareMsg:false
	},
	subscriptions:{
		setup({ dispatch,history }) {
			history.listen(location => {
				if(location.pathname.includes('AJDetails')){
					document.title = '艾家详情';
					dispatch({
	        	type: 'veryStart'
	        });
					let merchantId = location.pathname.slice(location.pathname.lastIndexOf('/')+1);
					let msgData = {
						merchantId:merchantId,
						userId:sessionStorage.getItem("id")
					};
					let goodsData = {
						merchantId:merchantId,
						fsxz:true,
						page:1,
						max:10
					};
					let evaData = {
						merchantId:merchantId,
						userId:sessionStorage.getItem("id"),
						fsxz:true,
						page:1,
						max:10
					};
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
					/*end*/
					dispatch({
			        	type: 'getMsgData',
			        	payload:msgData
			        });
							dispatch({
			        	type: 'getGoodsData',
			        	payload:goodsData
			        });
							dispatch({
			        	type: 'getEvaData',
			        	payload:evaData
			        });

	        window.scrollTo(0,0)//回到顶部
				}else if(location.pathname.includes('AJEva')){
					if(sessionStorage.getItem("autoHeight")){//点击进入第一次清空保存值，避免跳转至最下方评论处
						sessionStorage.removeItem("autoHeight")
					}
					document.title = '评价详情';
					let commentId = location.pathname.slice(location.pathname.lastIndexOf('/')+1);
					let detailsData = {
						commentId:commentId,
						userId:sessionStorage.getItem("id")
					};
					dispatch({
	        	type: 'getEvaDetailsData',
	        	payload:detailsData
	        });
				}
			})
		}
	},

	effects: {
		/*进入后获取详情-信息原始数据*/
		*getMsgData({ payload },{ put }){
			let reqData
			if(payload.userId){
				reqData={"merchantId":payload.merchantId,"userId":payload.userId}
			}else{
				reqData={"merchantId":payload.merchantId}
			}
			const response = yield Query('/merchant/getMerchant',reqData);
			console.log(response);
			if (response.data && response.data.success) {
				yield put({
					type: 'msgInitData',
					data: response.data.data,
					shareMsg:response.data.shareMsg
				})
			}else{
				console.log('调用失败')
			}
		},
		/*进入后获取详情-商品原始数据*/
		*getGoodsData({ payload },{ put }){
			let reqData={"merchantId":payload.merchantId,"page":payload.page,"max":payload.max}
			const response = yield Query('/merchant/getMerchantGoods',reqData);
			if (response.data && response.data.success) {
				if(payload.fsxz){
					yield put({
						type: 'goodsInitData',
						data: response.data.data
					})
				}else{
					let getPages=payload._this.getPage
					if(response.data.data.length<payload.max){
						getPages(false,response.data.data,payload.page);
					}else{
						getPages(true,response.data.data,payload.page);
					}
				}
			}else{
				console.log('调用失败')
			}
		},
		/*进入后获取详情-评价原始数据*/
		*getEvaData({ payload },{ put }){
			let reqData
			if(payload.userId){
				reqData={"merchantId":payload.merchantId,"page":payload.page,"max":payload.max,"userId":payload.userId}
			}else{
				reqData={"merchantId":payload.merchantId,"page":payload.page,"max":payload.max}
			}
			const response = yield Query('/merchant/getMerchantComment',reqData);
			if (response.data && response.data.success) {
				if(payload.fsxz){
					yield put({
						type: 'evaInitData',
						data: response.data.data
					})
				}else{
					let getPages=payload._this.getPage
					if(response.data.data.length<payload.max){
						getPages(false,response.data.data,payload.page);
					}else{
						getPages(true,response.data.data,payload.page);
					}
				}
			}else{
				console.log('调用失败')
			}
		},
		/*进入后获取评价详情原始数据*/
		*getEvaDetailsData({ payload },{ put }){
			let reqData
			if(payload.userId){
				reqData={"commentId":payload.commentId,"userId":payload.userId}
			}else{
				reqData={"commentId":payload.commentId}
			}
			const response = yield Query('/comment/getDetailById',reqData);
			if (response.data && response.data.success) {
				yield put({
					type: 'evaDetailsInitData',
					data: response.data.data
				})
			}else{
				console.log('调用失败')
			}
		},
		/*跳转方法*/
	  *chooseToGo({ payload },{put}) {
			yield put(routerRedux.push(payload))
		},
		/*艾家是否被关注*/
		*loveComment( { payload,love,callBack }){
			let reqData={"userId":payload.userId,"collection_id":payload.commentId,"type":payload.type}
			const response = yield Query('/userCollection/collection',reqData);
			if (response.data && response.data.success) {
				callBack(love,response.data.success)
			}else{
				callBack(love,response.data.success)
			}
		},
		/*发布评论回复*/
		*replyComment( { payload,callBack }){
			let reqData;
			if(payload.parentId){
				reqData={"commentId":payload.commentId,"userId":payload.userId,"replyContent":payload.replyContent,"parentId":payload.parentId}
			}else{
				reqData={"commentId":payload.commentId,"userId":payload.userId,"replyContent":payload.replyContent}
			};
			const response = yield Query('/comment/saveReply',reqData);
			if (response.data && response.data.success) {
				console.log(response.data)
				callBack(response.data.success)
			}else{
				console.log(response.data)
				callBack(response.data.success)
			}
		},
		*wxShareFun({data,fxFun},{put}){ //分享
			yield wxShare(data,fxFun)
		}
	},

	reducers: {
		/*刚进入的时候重新赋值hasGoods*/
		veryStart(state,{}){
			return {
				...state,
				res_msg_datas:false,
				res_goods_datas:false,
				res_eva_datas:false,
				res_evaDetails_datas:false,
				AjshareMsg:false
			}
		},
		/*接受初始获取数据给msg-state*/
		msgInitData(state,{ data,shareMsg}){
			return {
				...state,
				res_msg_datas:data,
				AJshareMsg:shareMsg
			}
		},
		/*接受初始获取数据给goods-state*/
		goodsInitData(state,{ data }){
			return {
				...state,
				res_goods_datas:data
			}
		},
		/*接受初始获取数据给eva-state*/
		evaInitData(state,{ data }){
			return {
				...state,
				res_eva_datas:data
			}
		},
		/*接受初始获取数据给evaDetails-state*/
		evaDetailsInitData(state,{ data }){
			return {
				...state,
				res_evaDetails_datas:data
			}
		}
	},
}
