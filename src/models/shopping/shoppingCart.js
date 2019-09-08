import {  Add , Delete , Query , Change } from '../../services/requestType.js'
import { routerRedux } from 'dva/router';
import $ from 'jquery'

export default {
	namespace:'shoppingCartPage',
	state:{
		cart_edit_id:0,
		mailMode:false,//配送方式0快递1自提
		cartList:false,
		kDnum:0,
		zDnum:0	
	},
	reducers: {
		edit_shppingCart_state(state,{val:data}){//编辑状态state
			return {
				...state,
				cart_edit_id:data
			}
		},
		ShopingCartList(state,{data:list,mails:vals,dnum}){//购物车列表state
			return {
					...state,
					mailMode:vals,
					cartList:list,
					kDnum:dnum.deliveryMethods_0,
					zDnum:dnum.deliveryMethods_1
					}
		},
		getGoodNum(state,{data_kDnum,data_zDnum}){
			return {
					...state,
					
					}
		}
	},	
	effects: {	
		*edit_shppingCart(payload,{put,call}){//切换编辑状态
			 yield put({type: 'edit_shppingCart_state', val: payload.val })
		},
		*getskuId_goodId({data,d_this},{put,call}){//获取商品sku
			let checkTabfun=d_this.checkTab
			let getGoodsId=d_this.getGoodsId
			let reqData={
				method: "POST",  
	            mode: "cors",  
	            headers: {  
	                "Content-Type": "application/x-www-form-urlencoded"  
	            },  
				 body:"goodsId="+data.goodsId
			}
			var response= yield Change('/goods/getGoodsDetailV1',reqData)
			if(response){
				if (response.data.success){
					checkTabfun(response.data.data,data.skuId,data.cartId,data.goodsNum)
					getGoodsId(data.goodsId)
				}													
			}				
		},
		*changeSku({payload,callBack,goods_id,cartId,d_this},{select,put,call}){//修改sku
			let this_state = yield select(state => state.shoppingCartPage);
			let usersId=sessionStorage.getItem('id')	
			let reqData={
				method: "POST",  
	            mode: "cors",  
	            headers: {  
	                "Content-Type": "application/x-www-form-urlencoded"  
	            },  
				 body:"goodsNumber="+payload.goodsNumber+"&id="+cartId+"&goodsId="+goods_id+"&skuId="+payload.skuId
			}	
			var response= yield Change('/shoppingCart/updateSku',reqData)
			if(response){
				let skufun=d_this.changeSkuBack;
				if(response.data.success){					
					skufun(true)				
				}else{
					skufun(false)
				}																	
			}			
		},
		*ConfirmOrder({data},{select,put,call}){//----------------确认订单-------------//
			let this_state=yield select(state => state.shoppingCartPage);
			let goodsArray=[]
			let usersId=sessionStorage.getItem('id')
			for(var i=0;i<data.length;i++){
				this_state.cartList.map(function(elem,index) {
					if(data[i]===elem.id){
						let pushData= JSON.stringify({'goodsId':elem.goodsId,'goodsSku':elem.skuId,'count':elem.goodsNumber,'cartId':elem.id})
						goodsArray.push(pushData)
					}
				})
			}
			let p_Data={}
			p_Data.data=goodsArray	
			console.log(p_Data)
			sessionStorage.setItem('cartData',JSON.stringify(p_Data))
			yield put(routerRedux.push({pathname: '/PlaceOrder',hash:this_state.mailMode.toString()}))
		},
		*cartCollection({data,d_this},{put,call}){//---------------------移到收藏
			let cartIds="",nums=data.cartIdArray.length
			for(let i=0;i<data.cartIdArray.length;i++){
				if(i==data.cartIdArray.length-1){
					cartIds+=data.cartIdArray[i]
				}else{
					cartIds+=data.cartIdArray[i]+","
				}				
			}
			let usersId=sessionStorage.getItem('id')
			let reqData={
				method: "POST",  
	            mode: "cors",  
	            headers: {  
	                "Content-Type": "application/x-www-form-urlencoded"  
	            },  
				 body:"userId="+usersId+"&shoppingCarts="+cartIds
			}
			var response= yield Delete('/shoppingCart/moveToCollect',reqData)
			if(response){
				let Collectionfun=d_this.Collection;
				if(response.data.success){					
					Collectionfun(true)
					sessionStorage.setItem('scNO',sessionStorage.getItem('scNO')-nums)
				}else{
					Collectionfun(false)
				}	
			}
			
		},
		*clearCart({data,d_this},{put,call}){//删除购物车
			let cartIds="",nums=data.cartIdArray.length
			for(let i=0;i<data.cartIdArray.length;i++){
				if(i==data.cartIdArray.length-1){
					cartIds+=data.cartIdArray[i]
				}else{
					cartIds+=data.cartIdArray[i]+","
				}				
			}
			let reqData={
				method: "POST",  
	            mode: "cors",  
	            headers: {  
	                "Content-Type": "application/x-www-form-urlencoded"  
	            },  
				 body:"id="+cartIds
			}
			var response= yield Delete('/shoppingCart/delete',reqData)
			if(response){
				let clearfun=d_this.clearCartBack;
				if(response.data.success){					
					clearfun(true)	
					sessionStorage.setItem('scNO',sessionStorage.getItem('scNO')-nums)				
				}else{
					clearfun(false)
				}	
			}
		},
		*edit_num({data,dom},{select,put,call}){//修改购物车商品数量	
			 const this_state = yield select(state => state.shoppingCartPage);
			let reqData={
				method: "POST",  
	            mode: "cors",  
	            headers: {  
	                "Content-Type": "application/x-www-form-urlencoded"  
	            },  
				 body:"incNumber="+data.nums+"&id="+data.id
			}
			var response= yield Change('/shoppingCart/updateCount',reqData)
			if(response){	
				if(response.data.success){
					let usersId=sessionStorage.getItem('id')
					yield put({type: 'getShopingCart',data:usersId,datas:this_state.mailMode})
				}																
			}				
		},
		*getShopingCart({data:val,datas:typeval},{put,call}){//获取购物车数据
			let reqData={
				method: "POST",  
	            mode: "cors",  
	            headers: {  
	                "Content-Type": "application/x-www-form-urlencoded"  
	            },  
				 body:"user="+val+"&deliveryMethods="+typeval+"&page=0"
			}
			var response= yield Query('/shoppingCart/list',reqData)	
			console.log('购物车数据',response)
			if(response){				
				if(response.data.success){	
					let num=parseInt(response.data.total.deliveryMethods_0)+parseInt(response.data.total.deliveryMethods_1)
					sessionStorage.setItem('scNO',num)		
					yield put({type: 'ShopingCartList',data:response.data.data,mails:typeval,dnum:response.data.total})

				}				
			}		
		},
		*goLogin({data},{put}){
			if(data){
				 yield put(routerRedux.push({pathname: '/Login',search:'ShoppingCart'}))	
			}
		}
	},
	subscriptions:{
		setup({ dispatch, history }) {
			history.listen(location => {
				if(location.pathname.includes('ShoppingCart')){
					document.title = '购物车';
					let usersId=sessionStorage.getItem('id')
					if (usersId===""||usersId===undefined||usersId===null) {
						dispatch({
							type:'goLogin',
							data:true
						})
					}else{
						dispatch({
			  				type:'getShopingCart',
			  				data:usersId,
			  				datas:0
			  			})							
					}		  					
			        window.scrollTo(0,0)
				}
			})
		}
	}
}

