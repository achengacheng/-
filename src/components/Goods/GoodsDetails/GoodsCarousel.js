import React from 'react';
import styles from '../../../style/goods/goodsDetails.css';
import $ from 'jquery';

const GoodsCarousel=({ goodsCarousel,picData })=>{
	class GoodsCarousel extends React.Component{
		render(){
			return (
				<div className={ styles.goodsCarousel } >
					<link rel="stylesheet" href="./src/style/goods/goodsDetails.css" />
					<div className="swiper-container">
			            <div className="swiper-wrapper">
			            	{picData?picData.map(function(item,index){
			            		return  <div className="swiper-slide" key={index}>
						                	<img src={item} alt="pic" className={styles.goodsDetalsImg}/>
						                </div>
			            	}):''}
			            </div>
			            <div className="swiper-pagination goods-pagination"></div>
			        </div>
				</div>
			)
		}
		componentDidMount(){	
			goodsCarousel()
		}
	}
	return <GoodsCarousel />
}

export default GoodsCarousel
