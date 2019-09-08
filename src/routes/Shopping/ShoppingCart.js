import React from 'react';
import { connect } from 'dva';
import $ from 'jquery'
import Header from '../../components/PublicComponents/HeaderReturn'
import ShoppingCartGoods from '../../components/Shopping/ShoppingCart'
import ShoppingCartFooter from '../../components/Shopping/ShoppingCartFooter'
import ShoppingCartMode from '../../components/Shopping/ShoppingCartMode'
import DefaultPage from '../../components/PublicComponents/DefaultPage'
import ChaPop from  '../../components/PublicComponents/ChaPop'
import MaskLayer from '../../components/PublicComponents/MaskLayer' 
import GoodsStandardTab from '../../components/Goods/GoodsTab/GoodsStandardTab'

var isScoll,saveHeight;
var tabId;
var useGoodsDatas,ChangeID,detailFun,standardTab;
var cartNo,isLove;

const ShoppingCart=({ dispatch,shoppingCartPage})=>{	
	let head_val={id:0,val:shoppingCartPage}
	let _this,userMsg,allType=true,cartIds;
	let getgoodsId=false
	function CartEdit(edit_id) {//切换编辑状态
		dispatch({
			type:"shoppingCartPage/edit_shppingCart",
			val:edit_id
		})		
	}
	function getShopingCart(id,types){//获取购物车列表
		dispatch({
			type:"shoppingCartPage/getShopingCart",
			data:id,
			datas:types						
		})	
	}
	function getskuId_goodId(goods_id,sku_id,cart_id,goodsnums){//通过goodsid获取到sku		
		dispatch({
			type:"shoppingCartPage/getskuId_goodId",
			data:{goodsId:goods_id,skuId:sku_id,cartId:cart_id,goodsNum:goodsnums},
			d_this:_this
		})
	}
	/*修改sku*/
	function  changeSku(data,fun) {
		dispatch({
			type:'shoppingCartPage/changeSku',
			payload:data,
			goods_id:getgoodsId,
			callBack:fun,
			cartId:cartIds,
			d_this:_this
		})
	}
	function ConfirmOrder(datas) { //确认订单
		console.log('确认订单数据',datas)
		dispatch({
			type:'shoppingCartPage/ConfirmOrder',
			data:datas
		})
	}
	/*未登录跳转至登录页面*/
	function goToLogin() {
		// dispatch({
		// 	type:'goodsData/goToLogin',
		// })
	}
	function clearCart(datas){//删除购物车
		dispatch({
			type:"shoppingCartPage/clearCart",
			data:datas,
			d_this:_this
		})
	}
	function cartCollection(datas){//移入收藏
		dispatch({
			type:"shoppingCartPage/cartCollection",
			data:datas,
			d_this:_this
		})
	}
	/*提示弹窗*/
	let standardTab;
	function HintWords(popDom){
		standardTab = popDom.Popfun
	}
	function standardTab2(text){//弹窗下级指向通道
		standardTab(text)
	}
	function StatPrice(){  //计算价格
		let priceAll=0
		for(let i=0;i<$('.gxCart').length;i++){
			if($('.gxCart').eq(i).attr("l_tpye")==='1'){
				let cartId=$('.gxCart').eq(i).attr("cartid")
				shoppingCartPage.cartList.map(function(elem,index){
					if(elem.id===cartId){					
						priceAll=priceAll+(elem.costPrice*elem.goodsNumber)
					}
				})	
			}
		}
		$('#allprice').text("¥ "+priceAll.toFixed(2))
	}
	class ShoppingCart extends React.Component{
		constructor(props){
			super(props);
			this.state={
				type:0,
				service:[],
				standard:{},
				skuId:'',
				allDataup:false,
				allEva:false,
				goodsNumber:1,
				goodsId_C:false
			}	
			this.checkTab=this.checkTab.bind(this)
			this.disappear=this.disappear.bind(this)
			this.changeSkuBack=this.changeSkuBack.bind(this)
			this.clearCartBack=this.clearCartBack.bind(this)
			this.getGoodsId=this.getGoodsId.bind(this)
			this.Collection=this.Collection.bind(this)																												
		}
		getGoodsId(datas){
			getgoodsId=datas
		}
		changeSkuBack(msg){//修改sku 回调
			if(msg){
				standardTab("修改成功")
				this.disappear()
				setTimeout(function(){
					let usersId=sessionStorage.getItem('id')
					getShopingCart(usersId,shoppingCartPage.mailMode)
				},500)				
			}else{
				standardTab("修改失败")
				this.disappear()
			}			
		}
		Collection(msg){
			if(msg){
				standardTab("收藏成功")
				setTimeout(function(){
					let usersId=sessionStorage.getItem('id')
					getShopingCart(usersId,shoppingCartPage.mailMode)
				},500)				
			}else{
				standardTab("收藏失败")
			}	
		}
		clearCartBack(msg){
			if(msg){
				standardTab("删除成功")
				setTimeout(function(){
					let usersId=sessionStorage.getItem('id')
					getShopingCart(usersId,shoppingCartPage.mailMode)
				},500)
			}else{
				standardTab("删除失败")
			}
		}
		render(){
			return(
					<div> 
						<Header left_show='1' head_title="购物车" header_ids='7' right_fun={CartEdit} custom={head_val}/>
						<ShoppingCartMode 
							getShopingCart={getShopingCart} 
							shoppingCartPage={shoppingCartPage}
						/>
						{shoppingCartPage.cartList?shoppingCartPage.cartList.length?<ShoppingCartGoods 
							dispatch={dispatch} 
							StatPrice={StatPrice} 
							shoppingCartPage={shoppingCartPage}
							getskuId_goodId={getskuId_goodId}
							standardTab={standardTab2}	
							/>:<DefaultPage showDefault="true" default_ids="4"/>:<div></div>}
						
						<ShoppingCartFooter 
							ConfirmOrder={ConfirmOrder} 
							StatPrice={StatPrice} 
							shoppingCartPage={shoppingCartPage} 
							clearCart={clearCart} 
							standardTab={standardTab2}
							cartCollection={cartCollection}
						/>
						<ChaPop HintWords={ HintWords }/>
						<MaskLayer disappear = {this.disappear }/>
						<GoodsStandardTab 
							goodsNum={this.state.goodsNumber} 
							tabId={ 5 } 
							skuId = { this.state.skuId } 
							standard = { this.state.standard } 
							disappear = {this.disappear} 
							standardTab={ standardTab } 
							goodsId = { this.state.goodsId_C } 
							addCart = { changeSku } 
							goToLogin = { goToLogin }
						/>													
					</div>
				)
		}		
		/*点击出现选项卡方法*/
		checkTab(data,skuIds,cartid,nums){		
			saveHeight = $(window).scrollTop();      			
			/*蒙版出现*/
	    	$('#maskbox').css({
	    		'display':'block'
	    	})
	    	$('body,html').css({
	    		'height':'100%',
				'overflow':'hidden'
			})
			$('#goodsFooter').css({
				'display':'none'
			})
			this.setState({
			    standard:data.goodsMsg,
			    skuId:skuIds,
			    goodsNumber:nums
			});
			cartIds=cartid
			$('#standardTab').slideDown()
		}
		disappear(id){	/*点击蒙版消失的方法*/  	 	
			$('#maskbox').css({
				'display':'none'
			});
			$('body,html').css({
				'overflow':'',
				'height':''
			})
			$('#goodsFooter').css({
				'display':''
			})
			
		  	$('#standardTab').slideUp()
			$(window).scrollTop(saveHeight)
			saveHeight = ""
		}	
		componentWillMount(){	
			_this=this	
		}	
		componentDidMount(){
			StatPrice()	
			if(shoppingCartPage.mailMode){
				if(shoppingCartPage.zDnum===0){
					$('#cart_edit').hide()
				}else{
					$('#cart_edit').show()
				}
			}else{
				if(shoppingCartPage.kDnum===0){
					$('#cart_edit').hide()
				}else{
					$('#cart_edit').show()
				}
			}
		}
	}
	return <ShoppingCart/>
} 

export default connect(({shoppingCartPage})=>({
	shoppingCartPage
}))(ShoppingCart);