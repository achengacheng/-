import React from 'react';
import styles from '../../../style/home/homePage.css'
import { Link } from  'dva/router';
import $ from 'jquery';
var Swiper=require('../../../../node_modules/swiper/dist/js/swiper.js')

const HomeMessage=({Callback,datas})=>{
	class HomeMessage extends React.Component{
		render(){
			return(
				<div className={styles.homeMessageBox}>
					<img src='./src/assets/home_message.png'/>
					<span></span>
					<link rel="stylesheet" href="./src/relyOn/swiper.min.css"/>
					<div className={styles.homeM_text}>
						<div className="swiper-message">									
				            <div className="swiper-wrapper">
				            	{datas.map(function(elem,index){
				            		return (<div key={index} msgid={elem._id} onClick={()=>Callback('massageDetails',elem._id)} className="swiper-slide massageDetails">{elem.title}</div>)
				            	})}				            	
				            </div>	
				        </div>    		            			            			
					</div>
					<img src='./src/assets/more_message.png' className={styles.homeM_details} id="homeM_details" msgid={datas[0]._id}/>			 	
				 </div>
			)
		}
		componentDidMount(){
			new Swiper('.swiper-message', {
				autoplay: {
					delay:5000
				},				
				loop : true,
				direction : 'vertical',
				on:{
				    slideChangeTransitionEnd: function(){				     
				     $('#homeM_details').attr('msgid', $('.massageDetails').eq(this.activeIndex).attr('msgid'))
				    },
				},
			})	
			$('#homeM_details').click(function(event) {
				Callback('massageDetails',$(this).attr('msgid'))
			});	
		} 
	}
	return <HomeMessage/>
}

export default HomeMessage