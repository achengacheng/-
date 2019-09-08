import React from 'react';
import styles from '../../style/shopping/ShoppingCart.css'
import $ from 'jquery'


const ShoppingCartGoods=({dispatch,shoppingCartPage,getShopingCart,getskuId_goodId,StatPrice,standardTab})=>{
	function EditNum(datas){
		dispatch({
			type:"shoppingCartPage/edit_num",
			data:datas
		})
	}
	const  Spec=({skuName,skuId,goodsid,cartid,goodsnums})=>{
		if(shoppingCartPage.cart_edit_id){
			return(
				<div className={styles.ShoppingCart_spec2} onClick={()=>getskuId_goodId(goodsid,skuId,cartid,goodsnums)}>
					<p skuid={skuId}>{skuName}</p>
					<i></i>
				</div>
				)
		}else{
			return(
				<p className={styles.ShoppingCart_spec1} skuid={skuId}>{skuName}</p>
				)

		}
	}
	function goGoods(id) {
		window.location.href='#/GoodsPage/'+id
	}
	class ShoppingCartGoods extends React.Component{
		render(){
			return(
					<div className={styles.ShoppingCartBox}>
					<ul>
						{shoppingCartPage.cartList.map(function(elem,index){
							// console.log(elem)
							return	(<li key={index}>
										<div  className={styles.ShoppingCart_gou+" gxCart"} l_tpye="0" cartid={elem.id} goodsid={elem.goodsId} goodsname={elem.goodsName} max_num={elem.stock} goodsnums={elem.goodsNumber}>
											<i className={styles.ShoppingCart_X1}></i>
										</div>
										<div className={styles.ShoppingCart_Cent} >
											<img src={elem.picture?elem.picture:"./src/assets/AJ_evaGoodsPic.png"} onClick={()=>goGoods(elem.goodsId)} className='shoppingImg'/>
											<div className={styles.ShoppingCart_text}>
												<h3 onClick={()=>goGoods(elem.goodsId)}>{elem.goodsName}</h3>
												<Spec skuName={elem.goodsSku} skuId={elem.skuId} goodsid={elem.goodsId} cartid={elem.id} goodsnums={elem.goodsNumber}/>
												<div>
													<span>¥{elem.costPrice}</span>
													<div className={styles.ShoppingCart_num} cartid={elem.id} max_num={elem.stock} oldnum={elem.goodsNumber} >
														<div className='num_down' jia_key='0'>-</div>
														<input type='text' defaultValue={elem.goodsNumber} className="num_input"/>
														<div className='num_up' jia_key='0'>+</div>
													</div>
												</div>
											</div>
										</div>
									</li>)
						})}
					</ul>
				</div>
				)
		}
		componentWillMount(){

		}
		componentDidMount(){
			//勾选事件
			$('.'+styles.ShoppingCart_gou).click(function(){
				var gou_doms=$(this).children('i').attr('class')
				if(gou_doms==styles.ShoppingCart_X1){
					$(this).attr("l_tpye",1)
					$(this).children('i').attr('class',styles.ShoppingCart_X2)
				}else{
					$(this).attr("l_tpye",0)
					$(this).children('i').attr('class',styles.ShoppingCart_X1)
				}
				let allGouType=true
				for(let i=0;i<$('.gxCart').length;i++){
					allGouType=true;
					if($('.gxCart').eq(i).attr("l_tpye")==0){
						allGouType=false;
						break;
					}
				}
				if(allGouType){
					$('#allGou').children('i').attr('class',styles.ShoppingCart_X2)
				}else{
					$('#allGou').children('i').attr('class',styles.ShoppingCart_X1)
				}
				StatPrice()
			})
			$('.shoppingImg').css('width',function(){
				return $('.shoppingImg').height()+'px'
			})
			//数量输入
			$('.num_input').bind('input propertychange',function(){				
				var reg = /^[0-9]+.?[0-9]*$/;
				if(!reg.test($(this).val())){			
					$(this).val(1)					
				}else{
					if($(this).val()<=0){
						$(this).val(1)
					}  
				}
			})
			//减号样式
			 for (var i=0;i<$('.num_input').length;i++) {
			 	if($('.num_input').eq(i).val()<2){
					$('.num_input').eq(i).siblings('.num_down').css('color','#cacaca')
				}else{
					$('.num_input').eq(i).siblings('.num_down').css('color','#262626')
				}
			 }
			var max_num=999;  //库存

			/*长按增加*///增加数量
			var num
			var num_time,Time_out=false,time_click=true
			$('.num_up').bind('touchstart',function(event) {
				event.preventDefault();
				setTimeout(function(){
					Time_out=true
				},1200)
				max_num=$(event.currentTarget).parents('.'+styles.ShoppingCart_num).attr('max_num')
				num_time=setInterval(function(){
					event.preventDefault();
					if(Time_out){
						num=$(event.currentTarget).siblings('.num_input').val()
						if(num<parseInt(max_num)){
							num++							
							$(event.currentTarget).siblings('.num_input').val(num)
						}
						time_click=false
					}else{
						time_click=true
					}

				},200)

			}).bind('touchend',function(event) {
				clearInterval(num_time)
				// console.log(time_click)
				if(time_click){
					num=$(event.currentTarget).siblings('.num_input').val()
					if(num<parseInt(max_num)){
						num++
						$(event.currentTarget).siblings('.num_input').val(num)
					}else{
						standardTab("库存不足")
						return;
					}
				}
				time_click=true;
				Time_out=false
				if(num>=max_num){
					$(event.currentTarget).css('color','#cacaca')
				}else{
					
					$(event.currentTarget).css('color','#262626')
				}
				let reqdata={}
					reqdata.id=$(event.currentTarget).parents('.'+styles.ShoppingCart_num).attr('cartid')
					reqdata.nums=$(event.currentTarget).siblings('.num_input').val()-$(event.currentTarget).parents('.'+styles.ShoppingCart_num).attr('oldnum')
				EditNum(reqdata)
				$(event.currentTarget).parents('.'+styles.ShoppingCart_num).attr('oldnum',$(event.currentTarget).siblings('.num_input').val())
			})

			/*长按减少*///减少数量
			$('.num_down').bind('touchstart',function(event) {
				let num
				event.preventDefault();
				setTimeout(function(){
					Time_out=true

				},1200)
				max_num=$(event.currentTarget).parents('.'+styles.ShoppingCart_num).attr('max_num')
				num_time=setInterval(function(){
					if(Time_out){
						num=$(event.currentTarget).siblings('.num_input').val()
						if(num>1){
							num--
							$(event.currentTarget).siblings('.num_input').val(num)
						}
						time_click=false
					}else{
						time_click=true
					}

				},200)

			}).bind('touchend',function(event) {
				let num
				clearInterval(num_time)
				if(time_click){
						num=$(event.currentTarget).siblings('.num_input').val()
						if(num>1){
							num--
							$(event.currentTarget).siblings('.num_input').val(num)
						}else{
							standardTab("商品数量不得小于1件")
							return;
						}
				}
				time_click=true;
				Time_out=false;
				if(num<2){
					$(event.currentTarget).css('color','#cacaca')
				}else{
					$(event.currentTarget).css('color','#262626')
				}
				let reqdata={}
					reqdata.id=$(event.currentTarget).parents('.'+styles.ShoppingCart_num).attr('cartid')
					reqdata.nums=$(event.currentTarget).siblings('.num_input').val()-$(event.currentTarget).parents('.'+styles.ShoppingCart_num).attr('oldnum')
				EditNum(reqdata)
				$(event.currentTarget).parents('.'+styles.ShoppingCart_num).attr('oldnum',$(event.currentTarget).siblings('.num_input').val())
			})

		}
	}
	return <ShoppingCartGoods/>
}

export default ShoppingCartGoods
