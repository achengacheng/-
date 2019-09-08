import { routerRedux } from 'dva/router';
import {  Add , Delete , Query , Change } from '../../../services/requestType';

export default {
	namespace:'MyOrderData',
	state:{
		res_datas:[],
		detail_datas:'',
		trace_datas:{},
		loadingstate:false,
		loadingDetail:false,
		deleteOrder:false,
		loading: false, // 控制加载状态
		cancelOrder: false,
		traceLoad:false,
		confirmOrder: false,
		alertType:'',
		listPage:1,
		newList:[0],
		deleteId:'',
		deleteIndex:'',
		ButtonHint:{
			title:"温馨提示",//标题
        	explain:"是否确定删除？",
			type:2,//按钮数1/2
			hide:true//是否展示
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
				if(location.pathname.includes('MyOrder')){
					let copy='';
					if(localStorage.getItem('OrderIndex')==='1'){
						copy=1
					}else if(localStorage.getItem('OrderIndex')=='2'){
						copy='2,3'
					}else if(localStorage.getItem('OrderIndex')=='3'){
						copy=4
					}else if(localStorage.getItem('OrderIndex')=='4'){
						copy=5
					}
					dispatch({
						type:'clearList'
					})
					dispatch({
						type:'getOrderData',
						index:copy,
						rows:4,
						page:1
					})
					document.title = '我的订单';
				}
				if(location.pathname.includes('OrderDetails')){
					dispatch({
						type:'getOrderDetail',
						id:aaa().id
					})
				}
			})
		}
	},

	effects: {	
		/*获取订单数据*/
		*getOrderData({index,page,rows,cb,scene},{ put }){
			let reqData={
				method:"POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body:'userId='+sessionStorage.getItem('id')+'&status='+index+'&page='+page+'&rows='+rows
			}
			const response = yield Query('/myCenter/loadOrderList',reqData)
				if(!response.data.data.length&&scene==1){
					cb()
				}else{
					console.log('chufale')
					yield put({ 
						type: 'getOrder',
						data: response.data
					})
				}	
						
		},
		// 取消订单
		*cancelOrder({orderId},{ put }){
			let reqData={
				method:"POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body:'orderId='+orderId
			}
			const response = yield Query('/order/cancelOrder',reqData)
			yield put({ 
				type: 'getOrders',
				data: response.data
			})			
		},
		// 弹窗消息事件
		*popBtn({orderId,index,ButtonHint},{ put }){
			yield put({ 
				type: 'changeBtn',
				data:{
					orderId: orderId,
					index: index,
					ButtonHint:ButtonHint
				}
			})			
		},
		// 删除订单
		*deleteOrder({orderId,index},{ put }){
			let reqData={
				method:"POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body:'orderId='+orderId
			}
			const response = yield Query('/order/deleteOrder',reqData)
			yield put({ 
				type: 'deleteOrders',
				data: response.data
			})			
		},
		// 清空列表
		*clearList({},{ put }){
			yield put({ 
				type: 'clearListData'
			})			
		},
		// 确认订单
		*confirmOrder({orderId,index},{ put }){
			let reqData={
				method:"POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body:'orderId='+orderId
			}
			const response = yield Query('/order/confirmReceive',reqData)
			yield put({ 
				type: 'confirmOrders',
				data: response.data
			})			
		},
		// 物流信息
		*traceMsg({orderId},{ put }){
			let reqData={
				method:"POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body:'orderId='+orderId
			}
			const response = yield Query('/order/loadWebExpressTrace ',reqData)
			yield put({ 
				type: 'traceMsgs',
				data: response.data
			})			
		},
		*getOrderDetail({id,orderNo,price,types},{ put }){
			let reqData={
				method:"POST", 
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body:'orderId='+id
			}
			const response = yield Query('/order/loadOrderInfo',reqData)
			if(response.data.success&&types){
				sessionStorage.setItem('OrderData',JSON.stringify({"orderNo":orderNo,"shouldPay":price,"limitSecond":response.data.data.limitSecond,"redPacketNum":response.data.data.redPocket.num,"shoppingCartNum":2}))
			}	
			yield put({ 
				type: 'getDetail',
				data: response.data
			})			
		},
		*goBack({},{put}) {
			yield put(routerRedux.push('/myPage/AddressPage'))
		}
	},

	reducers: {
		/*接受初始获取数据给state*/
		getOrder(state,{ data }){
			return {
				...state,
				res_datas:state.res_datas.length?state.res_datas.concat(data.data):data.data,
				loading:data.success,
				loadingstate:data.success,
				newList:data.data
			}
		},
		clearListData(state,{ data }){
			return {
				...state,
				res_datas:[]
			}
		},
		getDetail(state,{ data }){
			return {
				...state,
				detail_datas:data.data,
				loadingDetail: data.success
			}
		},
		getOrders(state,{ data }){
			return {
				...state,
				cancelOrder: true,
				ButtonHint:{
					title:"温馨提示",//标题
        			explain:"是否确认收货？",
					type:2,//按钮数1/2
					hide:true//是否展示
				}
			}
		},
		//物流信息
		traceMsgs(state,{ data }){
			return {
				...state,
				trace_datas:data.data,
				traceLoad: data.success
			}
		},
		//确认订单
		confirmOrders(state,{ data }){
			return {
				...state,
				confirmOrder: data.success,
				ButtonHint:{
					title:"温馨提示",//标题
        			explain:"是否确认收货？",
					type:2,//按钮数1/2
					hide:true//是否展示
				}
			}
		},
		deleteOrders(state,{ data }){
			return {
				...state,
				deleteOrder: true,
				ButtonHint:{
					title:"温馨提示",//标题
        			explain:"是否确定删除？",
					type:2,//按钮数1/2
					hide:true//是否展示
				}
			}
		},
		changeBtn(state,{data}){
			return {
				...state,
				deleteId: data.orderId,
				deleteIndex: data.index,
				ButtonHint:data.ButtonHint
			}
		}
	}
}