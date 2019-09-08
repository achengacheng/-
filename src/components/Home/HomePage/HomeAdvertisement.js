import React from 'react';
import styles from '../../../style/home/homePage.css'
var Swiper=require('../../../../node_modules/swiper/dist/js/swiper.js')

const HomeAdvertsement=({Callback,CarouselData})=>{
	class HomeAdvertsement extends React.Component{
		render(){
			if(CarouselData.length>1){
				return(<div className={styles.advert}>	
							<div className="swiper-container">
					            <div className="swiper-wrapper">
					            	{CarouselData?CarouselData.map(function(elem,index){
					            		let imgper
					            		if(elem.hasOwnProperty("picture")){
					            			imgper=elem.picture
					            		}
					            		return(	<div className="swiper-slide" key={index}>
							                		<img src={imgper} className={styles.swiper_img} onClick={()=>Callback(elem.insideJumpFormat,elem.insideJumpFormatVal.id,elem.name)}/>				                			                	
						                		</div>)
					            	}):''}			                
					            </div>
					            <div className="swiper-pagination"></div>			            
					        </div>					
						</div>)
			}else{
				let imgper
				if(CarouselData[0]){
					if(CarouselData[0].hasOwnProperty("picture")){
	        			imgper=CarouselData[0].picture
	        		}
				}      		
				return(<div className={styles.advert}>
						 <img src={imgper} className={styles.swiper_img} onClick={()=>Callback(CarouselData[0].insideJumpFormat,CarouselData[0].insideJumpFormatVal.id,CarouselData[0].name)}/>	
					</div>)
			}
			
		}
		componentDidMount(){
			if(CarouselData.length>1){
				new Swiper('.swiper-container', {
					autoplay: true,
					loop : true,
					pagination: {
					    el: '.swiper-pagination',
					},
				})	
			}
									
		}
	}
	return <HomeAdvertsement/>
}

export default HomeAdvertsement