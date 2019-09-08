import React from 'react';
import styles from '../../style/shopping/PlaceOrder.css'
import $ from 'jquery'
import { Link } from 'dva/router';

const PlaceOrderAddress=({orderData,NewAddress})=>{
	class PlaceOrderAddress extends React.Component{		
		render(){
			if(parseInt(orderData.deliveryMethods)===0){
				if(NewAddress){
					return(	<div>
								<Link to={{pathname:'/PlaceOrder/OrderAddress',hash:orderData.orderSource}}>
									<div className={styles.placeorder_address}>
										<div className={styles.placeorder_addname}>
											<p>收货人: {NewAddress.consignee}
												<span>
												{NewAddress.receivingPhone}
												</span>
											</p>										
											<p className={styles.addname}><span>地址:</span><span>{NewAddress.province+NewAddress.city+NewAddress.area+NewAddress.detail}</span></p>
										</div>
										<div className={styles.change_addname}>
											<i></i>
										</div>
									</div>
								</Link>						
							</div>)
				}else if(orderData){
					if (orderData.address.consignee) {
						return(	<div>
									<Link to={{pathname:'/PlaceOrder/OrderAddress',hash:orderData.orderSource}}>
										<div className={styles.placeorder_address}>
											<div className={styles.placeorder_addname}>
												<p>收货人: {orderData.address.consignee}
													<span>
													{orderData.address.receivingPhone}
													</span>
												</p>										
												<p className={styles.addname}><span>地址:</span><span>{orderData.address.detail}</span></p>
											</div>
											<div className={styles.change_addname}>
												<i></i>
											</div>
										</div>
									</Link>						
								</div>)
					}else{
						return(	<div>
							<Link to={{pathname:'/PlaceOrder/OrderAddress',hash:orderData.orderSource}}>
								<div className={styles.placeorder_address}>
									<div className={styles.placeorder_addname}>
										<i></i>
										请选择收货地址
									</div>
									<div className={styles.change_addname}>
										<i></i>
									</div>
								</div>
							</Link>						
						</div>)
					}				
				}else{
					return(	<div>
							<Link to={{pathname:'/PlaceOrder/OrderAddress',hash:orderData.orderSource}}>
								<div className={styles.placeorder_address}>
									<div className={styles.placeorder_addname+" "+styles.placeorder_addname_text}>
										<i></i>
										请选择收货地址
									</div>
									<div className={styles.change_addname}>
										<i></i>
									</div>
								</div>
							</Link>						
						</div>)
				}
			}else{
				return(<div>
						<p className={styles.addressP}>配送方式:线下自提</p>
					</div>)
			}				
		}
	}
	return <PlaceOrderAddress/>
}

export default PlaceOrderAddress