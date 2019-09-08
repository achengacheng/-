import React from 'react';
import styles from '../../../style/home/homePage.css'
import Goods_Icon from '../../PublicComponents/Goods_Icon'

const HomeGoodsP1=({Callback,Delitdata})=>{
  class HomeGoodsP1 extends React.Component{
  	render(){
  		return(<div className={styles.home_goodsp1_box}>
  					<div className={styles.home_recommend_head} onClick={()=>Callback('goodsMoer',Delitdata.promotionId,Delitdata.promomtionName)}>
						<h2>{Delitdata.promomtionName}</h2>
						<p>更多</p>
					</div>
					<ul className={styles.homeGuessLike_goods}>
						{Delitdata.promotionDetail.map(function(elem,index){
								return (<li key={index} onClick={()=>Callback('goodsDetails',elem.goodsId,Delitdata.promomtionName)}>
										<div className={styles.homeGuessLike_img}>
											<img src={elem.goodPic}/>
											{elem.isAdFee?<Goods_Icon num='1' icon1='1'/>:""}
										</div>									
										<p>{elem.goodsName}</p>
										<div className={styles.homeGuessLike_preli}>
											<span>¥{elem.currentPrice}</span>
											<s>¥{elem.nowMarkPrice}</s>
										</div>	
									</li>
								)	
										
						})}							
					</ul>
  			</div>)
  	}
  }
  return <HomeGoodsP1/>
}

// }else{
// 	if(index!==Delitdata.promotionDetail.length-1){
// 		return (<li key={index} onClick={()=>Callback('goodsDetails',elem.goodsId,Delitdata.promomtionName)}>
// 					<div className={styles.homeGuessLike_img}>
// 						<img src={elem.goodPic}/>
// 						<Goods_Icon num='1' icon1='1'/>	
// 					</div>									
// 					<p>{elem.goodsName}1</p>
// 					<div className={styles.homeGuessLike_preli}>
// 						<span>¥{elem.currentPrice}</span>
// 						<s>¥{elem.nowMarkPrice}</s>
// 					</div>	
// 				</li>
// 				)	
// 	}
// }				
export default HomeGoodsP1