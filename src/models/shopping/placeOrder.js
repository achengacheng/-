import {  Add , Delete , Query , Change } from '../../services/requestType.js'
import { routerRedux } from 'dva/router';
import {wxPay,wxShare} from '../../services/weixinPay'
import $ from 'jquery'
import fetch from 'dva/fetch';
var wx = require('weixin-js-sdk')

export default {
	namespace:'PlaceOrderData',
	state:{
		OrderData:false,//订单
		adderssList:false,//地址
		NewAddress:false,//新选地址
		cartData:false,//购物车数据
		cartData_Id:false,//购物车id
		payOrder:false,//支付数据
		paySuccessData:false,//支付完成数据
		shandanType:false, //晒单状态
		pupText:{
					title:'您尚未晒单领取粮票!确认要离开?',
					explain:'您本单获取了1张粮票,晒单后可立即领取,如关闭此页面您可以打开我的粮票进行晒单操作后领取粮票',
					type:2,
					hide:true
				}
	},
	reducers: {
		getOrderData(state,{datas,address,cartD,cartData_Id}){
			if(address){
				return {
					...state,
					NewAddress:address,
					OrderData:datas,
					cartData:cartD,
					cartData_Id:cartData_Id
				}
			}else{
				return {
					...state,
					OrderData:datas,
					cartData:cartD,
					cartData_Id:cartData_Id
				}
			}
			
		},
		changepupText(state,{data}){
			return {
				...state,
				pupText:{
					title:'您尚未晒单领取粮票!确认要离开?',
					explain:'您本单获取了'+data+'张粮票,晒单后可立即领取,如关闭此页面您可以打开我的粮票进行晒单操作后领取粮票',
					type:2,
					hide:false
				},
				shandanType:true
			}	
		},
		getadderssList(state,{datas}){
			return {
				...state,
				adderssList:datas
			}				
		},
		getpayOrder(state,{datas}){			
			return {
				...state,
				payOrder:datas
			}	
		},
		getPaySuccess(state,{data}){
			return {
				...state,
				paySuccessData:data
			}	
		},
		changeshandanType(state,{data}){
			return {
				...state,
				shandanType:data
			}	
		}
	},	
	effects: {	
		*getOrder({data,loca,u_ID,addD},{put,call}){//获取确认订单数据	
			let canSe="[",cartIds="";
			for(var i=0;i<data.length;i++){
				if(loca.hash==="#1"){
					if(i<data.length-1){
						cartIds=cartIds+data[i].cartId+","
					}else{
						cartIds=cartIds+data[i].cartId
					}
					delete data[i].cartId;
				}else{
					if(i<data.length-1){
						cartIds=cartIds+data[i].cartId+","
					}else{
						cartIds=cartIds+data[i].cartId
					}
				}							
				let d_data=JSON.stringify(data[i])
				if(i<data.length-1){
					canSe=canSe+d_data+","
				}else{
					canSe=canSe+d_data
				}
				 
			}
			canSe=canSe+"]";
			let orderSource
			if(loca.hash==="#1"){
				orderSource=1
			}else{
				orderSource=0
			}
			let reqData={
					method: "POST",  
	            	mode: "cors",  
	            	headers: {  
	               		"Content-Type": "application/x-www-form-urlencoded"  
	            	},  
					body:"orderSource="+orderSource+"&customer="+u_ID+"&goods="+canSe
				}

			var response= yield Query('/order/loadConfirmOrder',reqData)
			console.log(response)
			if(response){
				if (response.data.success) {
					let userAddress=addD?addD:response.data.data.address
					if(response.data.success){	
						yield put({type:'getOrderData',datas:response.data.data,address:userAddress,cartD:canSe,cartData_Id:cartIds})												 
					}
				}else{
				}
				
			}
		},
		*addressFun({data},{put,call}){//获取用户所有地址
			let reqData={
					method: "POST",  
	            	mode: "cors",  
	            	headers: {  
	               		"Content-Type": "application/x-www-form-urlencoded"  
	            	},  
					body:"userId="+data
				}
			var response= yield Query('/address/list',reqData)			
			if(response){
				if(response.data.success){
					yield put({type:'getadderssList',datas:response.data.data})
				}
			}	
		},
		*psutOrder({data,_this},{put,call}){//-----------下单
			let fund=_this,reqData
			if(data.shoppingCarts==='undefined'||data.shoppingCarts===''||data.shoppingCarts===undefined||data.shoppingCarts===null){
				reqData={
						'orderSource':0,
						'customer':data.customer,
						'source':data.source,
						'receiveInfo':data.receiveInfo,
						'dispatchType':data.dispatchType,
						'goods':data.goods
					}
			}else{
				reqData={
						'orderSource':1,
						'customer':data.customer,
						'source':data.source,
						'receiveInfo':data.receiveInfo,
						'dispatchType':data.dispatchType,
						'goods':data.goods,
						'shoppingCarts':data.shoppingCarts
					}				
			}
			var response= yield Add('/order/placeOrder',reqData)	
			if(response){
				if(response.data.success){
					sessionStorage.removeItem("cartData")
					sessionStorage.setItem('OrderData',JSON.stringify(response.data.data))
					sessionStorage.setItem('scNO',response.data.data.shoppingCartNum)
					yield put(routerRedux.push({pathname: '/PaymentOrder'}))
				}else{
					fund(response.data.alertMsg.msg)
				}
			}		
		},
		
		*WeixinPay({datas,payresFun},{put}){ //微信支付
			console.log("发起支付了")
			let openId=localStorage.getItem('openId')
			let reqData={
				method: "POST",  
	            mode: "cors",  
	            headers: {  
	                "Content-Type": "application/x-www-form-urlencoded"  
	            },  
				 body:"orderNo="+datas.orderNo+"&ip="+datas.IP+'&openid='+openId
			}
			console.log(reqData)
			var response= yield Query('/wxPay/gainPrepayNo',reqData)
			console.log(12,response)
			try{
				if(response.data.success){
					yield wxPay(response.data.data,payresFun)
				}
			}catch(err){
				console.log(err)
			}				
		},
		*walletPay({data,d_this},{put,call}){ //钱包支付
			let waitFun=d_this.waitPayFun
			let reqData={
				method: "POST",  
            	mode: "cors",  
            	headers: {  
               		"Content-Type": "application/x-www-form-urlencoded"  
            	},  
				body:"userId="+data.userId+"&orderNo="+data.orderNo+"&password="+data.password
			}
			var response= yield Change('/balancePay/pay',reqData)
			console.log("支付",response)
			if(response){			
				if(response.data.success){
					sessionStorage.removeItem("OrderData")
					waitFun(0)
				}else{
					waitFun(response.data.alertMsg.msg)
				}
			}
		},
		*PaySuccessFun({data,types},{put}){//支付完成获取粮票	
			let reqData={
				method: "POST",
            	mode: "cors",
            	headers: {
               		"Content-Type": "application/x-www-form-urlencoded"
            	},
				body:"orderNo="+data+"&type="+types
			}
			var response= yield Change('/order/orderStatusQuery',reqData)
			console.log("支付完成",response)
			if (response) {				
				yield put({type:'getPaySuccess',data:response.data})
			}
		},
	
		*addressBack({addressD,loca},{put}){//选择地址返回
			yield put(routerRedux.push({pathname: '/PlaceOrder',hash:loca,addressData:addressD}))
		},
		*backShopping({data},{put}){//无数据返回购车
			if(data){
				yield put(routerRedux.push({pathname: '/'}))
			}			
		},
		*goPayfinish({data},{put}){//支付完成跳转
			if(data){				
				yield put(routerRedux.push({pathname: '/PaySuccess',hash:data,search:'BALANCEPAY'}))
			}	
		},
		*wxShareFun({data,fxFun},{put}){ //分享
			console.log("监听分享")
			yield wxShare(data,fxFun)
		},
		*shareOrder({data,funs},{put}){ //晒单完成
			//redPackets
			let reqData={ids:data}
			var response= yield Change('/order/shareOrder',reqData)
			try{
				if(response.data.success){
					funs('晒单成功')
					yield put({type:'changeshandanType',data:true})
				}
			}catch(err){

			}
			
		}		
	},
	subscriptions:{
		setup({ dispatch, history }) {
			history.listen(location => {
				if(location.pathname=='/PlaceOrder'){//确认订单
					document.title = '填写订单';
					let usersId=sessionStorage.getItem('id')//用户ID							
		  			let getCartData=JSON.parse(sessionStorage.getItem('cartData'))//session购物车数据		  				  			
	  				if(getCartData){
	  					if (location.hash==='#1') {
	  						console.log('线下自提')
	  						let zhData=[];//购物车数据类型变化
			  				for(var i=0; i<getCartData.data.length;i++){
								zhData.push(JSON.parse(getCartData.data[i]))		  				
			  				}
			  				console.log('下单后获取到的购物车数据',zhData)
				  			dispatch({
				  				type:'getOrder',
				  				data:zhData,
				  				loca:location,
				  				u_ID:usersId	  				
				  			})
				  		}else if(location.hash==='#0'){
				  			console.log('快递')
				  			let addressD=location.addressData?JSON.parse(location.addressData):false;
				  			let zhData=[];//购物车数据类型变化
			  				for(var i=0; i<getCartData.data.length;i++){
								zhData.push(JSON.parse(getCartData.data[i]))		  				
			  				}
			  				console.log('下单后获取到的购物车数据',zhData)
				  			dispatch({
				  				type:'getOrder',
				  				data:zhData,
				  				loca:location,
				  				u_ID:usersId,
				  				addD:addressD	  				
				  			})
	  					}			
		  			}else{
		  				dispatch({
		  					type:'backShopping',
		  					data:true
		  				})		  				
		  			}		
		  			
		  			  				
			        window.scrollTo(0,0)
				}else if(location.pathname=='/PlaceOrder/OrderAddress'){//选择地址
					document.title = '选择收货人';
					let usersId=sessionStorage.getItem('id')							  					  			
		  			dispatch({
		  				type:'addressFun',
		  				data:usersId,				
		  			})
		  			window.scrollTo(0,0)			
				}else if(location.pathname=='/PaymentOrder'){//支付订单
					document.title = '支付订单';			
					let PayOrderData=JSON.parse(sessionStorage.getItem('OrderData'))					  					  			
		  			if(PayOrderData){
		  				dispatch({
			  				type:'getpayOrder',
			  				datas:PayOrderData				
			  			})
		  			}else{
		  				dispatch({
		  					type:'backShopping',
		  					data:true
		  				})
		  			}		  			
		  			window.scrollTo(0,0)			
				}else if(location.pathname=='/PaySuccess'){//支付完成
					document.title = '支付订单';
					let orderId=location.hash.substring(1)
					let types=location.search.substring(1)
					dispatch({
						type:"PaySuccessFun",
						data:orderId,
						types:types
					})
					window.scrollTo(0,0)
				}
			})
		}
	}
}