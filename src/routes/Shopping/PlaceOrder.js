import React from 'react';
import { connect } from 'dva';
import $ from 'jquery';
import Header from '../../components/PublicComponents/HeaderReturn'
import styles from '../../style/shopping/PlaceOrder.css'
import PlaceOrderAddress from '../../components/Shopping/PlaceOrderAddress'
import PlaceOrderGoods from '../../components/Shopping/PlaceOrderGoods'
import PlaceOrderButton from '../../components/Shopping/PlaceOrderButton'
import ChaPop from '../../components/PublicComponents/ChaPop';

const PlaceOrder=({dispatch,PlaceOrderData,location})=>{
	console.log(PlaceOrderData)
	let Popfun  //弹窗调用通道
	function HintWords(popDom){
		Popfun=popDom.Popfun
	}
	function psutOrder(){//提交订单
		if(PlaceOrderData.OrderData){
			let datas={},useId=sessionStorage.getItem('id');
			datas.orderSource=PlaceOrderData.OrderData.orderSource;
			datas.customer=useId;
			datas.source=3;		
			datas.dispatchType=PlaceOrderData.OrderData.deliveryMethods;			
			let orderGoods=JSON.parse(PlaceOrderData.cartData)
			for(var i=0;i<orderGoods.length;i++){
				for(var j=0;j<$('.leaveWords').length;j++){
					console.log(i,j)
					if(orderGoods[i].goodsId===$('.leaveWords').eq(j).attr('goodsids')){
						if($('.leaveWords').eq(j).val()!==''&&$('.leaveWords').eq(j).val()!==undefined&&$('.leaveWords').eq(j).val()!==null){
							orderGoods[i].leaveWord=$('.leaveWords').eq(j).val()	
						}
					}
				}				
			}
			datas.goods=JSON.stringify(orderGoods);
			datas.shoppingCarts=PlaceOrderData.cartData_Id?PlaceOrderData.cartData_Id:'';
			if(PlaceOrderData.OrderData.deliveryMethods){
				if(PlaceOrderData.OrderData.address){
					datas.receiveInfo=JSON.stringify({
						name:PlaceOrderData.OrderData.address.consignee,
						phone:PlaceOrderData.OrderData.address.receivingPhone,
						location:PlaceOrderData.OrderData.address.detail
					})
				}else{
					datas.receiveInfo=JSON.stringify({
						name:'',
						phone:sessionStorage.setItem('sendTel')?sessionStorage.setItem('sendTel'):'',
						location:PlaceOrderData.OrderData.address?PlaceOrderData.OrderData.address.detail:''
					})
				}				
				dispatch({
					type:"PlaceOrderData/psutOrder",
					data:datas,
					_this:Popfun
				})
			}else{
				if(PlaceOrderData.NewAddress){
					datas.receiveInfo=JSON.stringify({
						name:PlaceOrderData.NewAddress.consignee,
						phone:PlaceOrderData.NewAddress.receivingPhone,
						location:PlaceOrderData.NewAddress.province+PlaceOrderData.NewAddress.city+PlaceOrderData.NewAddress.area+PlaceOrderData.NewAddress.detail
					})
				}else{
					datas.receiveInfo=JSON.stringify({
						name:PlaceOrderData.OrderData.address.consignee,
						phone:PlaceOrderData.OrderData.address.receivingPhone,
						location:PlaceOrderData.OrderData.address.detail
					})
				}
				if(JSON.parse(datas.receiveInfo).location){
					dispatch({
						type:"PlaceOrderData/psutOrder",
						data:datas,
						_this:Popfun
					})
				}else{
					Popfun('请选择收货地址!')
				}
			}
		}else{
			Popfun('网络错误,下单失败!')
		}	
	}
	class PlaceOrder extends React.Component{
		render(){
			return(	<div className={styles.PlaceOrder_box}>	
						<Header left_show='1' head_title='填写订单'/>
						<PlaceOrderAddress orderData={PlaceOrderData.OrderData} NewAddress={PlaceOrderData.NewAddress}/> 
						<PlaceOrderGoods orderData={PlaceOrderData.OrderData}/>
						<PlaceOrderButton orderData={PlaceOrderData.OrderData} psutOrder={psutOrder}/>
						<ChaPop HintWords={HintWords}/>						
					</div>)
		}
	}
	return <PlaceOrder/>
}
export default connect(({ PlaceOrderData }) => ({
    PlaceOrderData,
  }))(PlaceOrder);