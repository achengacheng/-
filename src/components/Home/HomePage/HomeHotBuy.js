import React from 'react';
import styles from '../../../style/home/homePage.css'
import Goods_Icon from '../../PublicComponents/Goods_Icon'
var Swiper=require('../../../../node_modules/swiper/dist/js/swiper.js')

const HomeHotBuy=({Callback,Delitdata})=>{
	class HomeHotBuy extends React.Component{
		render(){
			return(
					<div className={styles.home_hotbuy_box}> 
						<div className={styles.home_hotbuy_head} onClick={()=>Callback('goodsMoer',Delitdata.promotionId,Delitdata.promomtionName)}>
							<h2>{Delitdata.promomtionName}</h2>
							<p>更多</p>
						</div>
						<div className={styles.home_hotbuy_goods}>
							<div className='swiper-homehotbuy'>
								<ul className="swiper-wrapper">
								{Delitdata.promotionDetail.map(function(elem,index){
									return (<li key={index} className={styles.home_hotbuy_one + " swiper-slide"} onClick={()=>Callback('goodsDetails',elem.goodsId)}>
							                	<div>
													<img src={elem.goodPic?elem.goodPic:'./src/assets/goodsDefaultpic_ing.png'}/>											
							                		{elem.isAdFee?<Goods_Icon num='1' icon1='1'/>:""}
							                	</div>					                	
							                	<span>{elem.goodsName.substring(0,6)}</span>
							                	<p>¥{elem.currentPrice}</p>
							                </li>)
								})}					                					               									
				            	</ul>
			            	</div>
						</div>						
					</div>
				)
		}
		componentDidMount(){
			new Swiper('.swiper-homehotbuy', {				
				slidesPerView: 3.4,
		      	spaceBetween: 20,			   
			})	
		} 
	}
	return <HomeHotBuy/>
}

export default HomeHotBuy
