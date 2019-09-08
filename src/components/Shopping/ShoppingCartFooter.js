import React from 'react';
import styles from '../../style/shopping/ShoppingCart.css'
import $ from 'jquery'
import { Link } from 'dva/router';

const ShoppingCartFooter=({shoppingCartPage,clearCart,standardTab,StatPrice,ConfirmOrder,cartCollection})=>{
	var state_edit=shoppingCartPage.cart_edit_id
	const FooterButton=({edit_id})=>{
		if(parseInt(edit_id)){
			return(
				<div className={styles.footer_button_box2}>
					<div id="share">分享</div>
					<div id="collection">移到收藏</div>
					<div id="clearGoods" className={styles.footer_button_delete}>删除</div>					
				</div>
			)
		}else{
			return(
				<div className={styles.footer_button_box1}>
					<p>合计：<span id="allprice">¥ 0.00</span></p>
					<div id="goSettlement">去结算</div>
				</div>
			)
		}
		
	}

	class ShoppingCartFooter extends React.Component{
			render(){
				return(
						<div className={styles.cartfooter_box}>
							<div>
								<div id="allGou" className={state_edit?styles.cartfooter_allgou:styles.cartfooter_allgou1} g_type="0">
									<i className={styles.ShoppingCart_X1}></i><span>全部</span>
								</div>
								<div>
									<FooterButton edit_id={state_edit?1:0}/>
								</div>
							</div>
						</div>
					)
			}
			componentDidMount(){
				$('#allGou').click(function(){//全选
					if($(this).attr('g_type')==1){
						$(this).attr('g_type',0)
						$(this).children('i').attr('class',styles.ShoppingCart_X1)
						$('.gxCart').attr('l_tpye',0)
						$('.gxCart').children('i').attr('class',styles.ShoppingCart_X1)
					}else{
						$(this).attr('g_type',1)
						$(this).children('i').attr('class',styles.ShoppingCart_X2)
						$('.gxCart').attr('l_tpye',1)
						$('.gxCart').children('i').attr('class',styles.ShoppingCart_X2)
					}
					StatPrice()
				})
				$('#share').click(function(event) {//分享
					let cartIdArray=[],goodIdArray=[]
					for(let i=0;i<$('.gxCart').length;i++){
						if($('.gxCart').eq(i).attr("l_tpye")==1){
							cartIdArray.push($('.gxCart').eq(i).attr("cartid"))
							goodIdArray.push($('.gxCart').eq(i).attr("goodsid"))
						}
					}
				});
				$('#collection').click(function(event) {//收藏
					let cartIdArray=[],goodIdArray=[]
					for(let i=0;i<$('.gxCart').length;i++){
						if($('.gxCart').eq(i).attr("l_tpye")==1){
							cartIdArray.push($('.gxCart').eq(i).attr("cartid"))
							goodIdArray.push($('.gxCart').eq(i).attr("goodsid"))
						}
					}
					if(cartIdArray.length>0){
						let datas={}
						datas.cartIdArray=cartIdArray;
						datas.goodIdArray=goodIdArray					
						cartCollection(datas)	
					}else{
						standardTab("请选择需要删除的商品")
					}
				});
				$('#clearGoods').click(function(event) {//删除
					let cartIdArray=[],goodIdArray=[]
					for(let i=0;i<$('.gxCart').length;i++){
						if($('.gxCart').eq(i).attr("l_tpye")==1){
							cartIdArray.push($('.gxCart').eq(i).attr("cartid"))
							goodIdArray.push($('.gxCart').eq(i).attr("goodsid"))
						}
					}
				
					if(cartIdArray.length>0){
						let datas={}
						datas.cartIdArray=cartIdArray;
						datas.goodIdArray=goodIdArray					
						clearCart(datas)	
					}else{
						standardTab("请选择需要删除的商品")
					}
									
				});
				$('#goSettlement').click(function() {//去结算
					let cartIdArray=[],goodIdArray=[],goodData=[]
					for(let i=0;i<$('.gxCart').length;i++){
						if($('.gxCart').eq(i).attr("l_tpye")==1){
							cartIdArray.push($('.gxCart').eq(i).attr("cartid"))
							goodIdArray.push($('.gxCart').eq(i).attr("goodsid"))
							let gdata={}
							gdata.maxNum=$('.gxCart').eq(i).attr("max_num")
							gdata.goodsNum=$('.gxCart').eq(i).attr("goodsnums")
							gdata.goodsName=$('.gxCart').eq(i).attr("goodsname")
							goodData.push(gdata)							
						}
					}
					if(cartIdArray.length>0){
						    let payTrue=true
							for (var i = 0; i <goodData.length; i++) {
								if (parseInt(goodData[i].maxNum)<parseInt(goodData[i].goodsNum)){
									standardTab(goodData[i].goodsName+"库存不足,请等待补充库存!")
									payTrue=false;
								}
							}
							if(payTrue){
								console.log('购物车传过去数据',cartIdArray)
								ConfirmOrder(cartIdArray)
							}
						// let datas={}
						// datas.cartIdArray=cartIdArray;
						// datas.goodIdArray=goodIdArray
							
					}else{
						standardTab("请选择需要购买的商品")
					}
				});
			}
	}
	return <ShoppingCartFooter/>
}
export default ShoppingCartFooter