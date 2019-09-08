
import React from 'react';
import styles from '../../../style/home/homePage.css'
import { Link } from  'dva/router';
var Swiper=require('../../../../node_modules/swiper/dist/js/swiper.js')

const HomeCarousel=({Callback,CarouselData})=>{	
	class HomeCarousels extends React.Component{
		render(){
			return(
				<div id="carousel" >	
					<div className="swiper-container">
			            <div className="swiper-wrapper">
			            	{CarouselData?CarouselData.map(function(elem,index){
			            		return(	<div className="swiper-slide" key={index}>
					                		<img src={elem.picture?elem.picture:'./src/assets/laoding-1.2.5(750).png'} className={styles.swiper_img} onClick={()=>Callback(elem.insideJumpFormat,elem.insideJumpFormatVal.id,elem.name)}/>				                			                	
				                		</div>)
			            	}):''}			                
			            </div>
			            <div className="swiper-pagination"></div>			            
			        </div>					
				</div>					
				)		
		}
		componentDidMount(){
			new Swiper('.swiper-container', {
			 	autoplay: {
			   		disableOnInteraction:false,
			  	},
				loop : true,
				pagination: {
				    el: '.swiper-pagination',
				},
			})							
		}
		shouldComponentUpdate(){			
			return false;
		}
	}	
	return <HomeCarousels/>							
}

export default HomeCarousel