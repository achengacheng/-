import React from 'react';
import styles from '../../style/shopping/PlaceOrder.css'
import $ from 'jquery'

const PlaceOrderGoods=({orderData})=>{
		console.log(orderData.goods)
	class PlaceOrderGoods extends React.Component{		
		render(){
			return(<div>
						<div className={styles.PlaceOrderGoods_box}>				
							<h2>商品信息</h2>
							<ul className={styles.PlaceOrderGoods_ul}>
								{orderData.goods?orderData.goods.map(function(elem,index){
									return (<li key={index}>
											<div  className={styles.goodsBox}>
												<img src={elem.picture} alt="" />
												<div className={styles.PlaceOrderGoods_text}>
													<h3>{elem.goodsName}</h3>
													<p><span>{elem.skuName}</span><span>x{elem.count}</span></p>
													<div>¥{elem.price.toFixed(2)}</div>
												</div>
											</div>
											<div className={styles.goodsMsg}><span>留言: </span><input type="txet" className="leaveWords" placeholder="填写留言信息" goodsids={elem.goodsId}/></div>
											</li>)
									}):""
								}
								
							</ul>				
						</div>
						<div className={styles.PlaceOrderGoods_Price}>
							<div>
								<p>商品合计</p>
								<div>¥{orderData?orderData.totalPrice.toFixed(2):'0.00'}</div>
							</div>
							{orderData.deliveryMethods?<div><p>运费</p><div>免运费</div></div>:<div><p>运费</p><div>¥{orderData?orderData.transPrice.toFixed(2):'0.00'}</div></div>}				
						</div>
					</div>)
		}
	}
	return <PlaceOrderGoods/>
}

export default PlaceOrderGoods