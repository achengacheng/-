import React from 'react';
import styles from '../../style/Special/special.css'
import $ from 'jquery'
var Swiper=require('../../../node_modules/swiper/dist/js/swiper.js')

const SpecialDetailBanner=({DetailData})=>{	
	class SpecialDetailBanner extends React.Component{
		render(){
			return(
				<div id="carousel" >
					<link rel="stylesheet" type="text/css" href="./src/style/Special/special.css"/>
					<div className="swiper-container">
			            <div className="swiper-wrapper">
			            	{DetailData.picture?DetailData.picture.map(function(elem,index) {
			            		return (<div className="swiper-slide" key={index}>
						                	<img src={elem} className={styles.swiper_img +" ajdetail_imgb"}/>
						                </div>)
			            	}):''}
			                
			            </div>
			            <div className="pagination_dian swiper-pagination"></div>			            
			        </div>					
				</div>					
				)		
		}
		componentDidMount(){
			$('.ajdetail_imgb').css('height',function(){
				return $(window).width()*0.5+'px'
			})
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
		componentDidUpdate(){
			$('.ajdetail_imgb').css('height',function(){
				return $(window).width()*0.5+'px'
			})
		}	
	}	
	return <SpecialDetailBanner/>							
}

export default SpecialDetailBanner