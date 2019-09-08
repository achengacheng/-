import React from 'react';
import styles from '../../style/shopping/PlaceOrder.css'
import $ from 'jquery'
import { Link } from 'dva/router';

const PlaceOrderButton=({orderData,psutOrder})=>{
	class PlaceOrderButton extends React.Component{		
		render(){
			return(	<div className={styles.PlaceOrderButton_box}>
						<p>支付订单后预计可获得{orderData.redPacketNum?orderData.redPacketNum:'0'}张粮票</p>							
						<div>
							<p className={styles.PlaceOrderButton_price}>应付金额:<span>¥ {orderData.shouldPay?orderData.shouldPay.toFixed(2):'0.00'}</span></p>
							<button className={styles.PlaceOrderButton_btn} id="psutOrder">提交订单</button>
						</div>
					</div>)
		}
		componentDidMount(){
			$('#psutOrder').click(function(event) {
				psutOrder()
			});
		}
	}
	return <PlaceOrderButton/>
}

export default PlaceOrderButton