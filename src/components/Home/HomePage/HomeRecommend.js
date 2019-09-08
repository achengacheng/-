import React from 'react';
import styles from '../../../style/home/homePage.css';
import Goods_Icon from '../../PublicComponents/Goods_Icon'

const HomeRecommend=({Callback,Delitdata})=>{
	class HomeRecommend extends React.Component{
		render(){
			return(
					<div className={styles.home_recommend_box}>
						<div className={styles.home_recommend_head} onClick={()=>Callback('goodsMoer',Delitdata.promotionId,Delitdata.promomtionName)}>
							<h2>{Delitdata.promomtionName}</h2>
							<p >更多</p>
						</div>
						<ul className={styles.home_recommend_goodsbox}>
							{ Delitdata.promotionDetail.map(function(elem,index){
								return (<li key={index} onClick={()=>Callback('goodsDetails',elem.goodsId)}>
											<div className={styles.home_recommend_goodsimg}>
												<img src={elem.goodPic}/>
												{elem.isAdFee?<Goods_Icon num='1' icon1='1'/>:""}
											</div>
											<div className={styles.home_recommend_goodstext}>
												<p>{elem.goodsName}</p>
												<div className={styles.home_recommend_price}>
													<p>¥{elem.currentPrice}</p>
													<s>¥{elem.nowMarkPrice}</s>
												</div>
												<div className={styles.home_recommend_button}>
													<span>立即购买</span>
												</div>
											</div>
										</li>)
							})}							
						</ul>
					</div>
				)
		}
	}
	return <HomeRecommend/>
}
export default HomeRecommend