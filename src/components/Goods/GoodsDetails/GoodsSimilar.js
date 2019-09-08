import React from 'react';
import styles from '../../../style/goods/goodsDetails.css';

var hasSimilarData;
class GoodsSimilar extends React.Component{
	render(){
		if(this.props.similarData.relationGoods){
			if(this.props.similarData.relationGoods.length===0){
				hasSimilarData = false
			}else{
				hasSimilarData = true
			}
		}else{
			hasSimilarData = false
		}

		if(hasSimilarData){
			return (
				<div className={ styles.goodsSimilarContainer }>
					<div className={ styles.goodsIntroduceTitle }>
						<p>同类推荐</p>
					</div>
					<div className={styles.home_hotbuy_goods}>
						<div className='swiper-goodsSimilar'>
							<ul className="swiper-wrapper">
								{this.props.similarData.relationGoods.map(function(item,index){
									return 	<li className={styles.home_hotbuy_one + " swiper-slide"} key={index} onClick={() => this.props.goToAd('/GoodsPage/' + item.goodsId)}>
					                	<div>
															<img src={item.mainPic.pictureUrl} alt={item.mainPic.pictureName}/>
					                	</div>
					                	<span>{item.goodsName}</span>
					                	<p>¥{item.currentPrice}</p>
					                </li>
									},this)
								}
            	</ul>
          	</div>
					</div>
				</div>
			)
		}else{
			return <div></div>
		}
	}
	componentDidMount(){
		this.props.goodsSimilar()
	}
}

export default GoodsSimilar
