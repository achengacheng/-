import React from 'react';
import styles from '../../../style/goods/goodsDetails.css';

const GoodsAdDetails=({ goToAd,hasAd,goodsId })=>{
	class GoodsAdDetails extends React.Component{
		render(){
			if(hasAd){
				if(hasAd.remainMoney===0.00){
					return (<div></div>)
				}else{
					return (
						<div className={ hasAd?styles.goodsAdDetailsContainer:styles.hiddenThis } onClick = {() => goToAd("/AdListPage/"+goodsId)}>
							<div className={ styles.goodsAdBg }>
								<p>粮票详情</p>
							</div>
							<div className={ styles.goodsAdRemain }>
								<span>{ hasAd.remainMoney }</span>
								<p>剩余金额(元)</p>
							</div>
							<div className={ styles.goodsAdSum }>
								<p>已发金额(元)<span>{ hasAd.totalPay }</span></p>
								<p>投放金额(元)<span>{ hasAd.money }</span></p>
							</div>
							<i className={ styles.goodsRightArr } ></i>
						</div>
					)
				}

			}else{
				return <div></div>
			}
		}
	}
	return <GoodsAdDetails />
}

export default GoodsAdDetails
