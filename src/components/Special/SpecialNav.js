import React from 'react';
import styles from '../../style/Special/special.css'
import $ from 'jquery'
var Swiper=require('../../../node_modules/swiper/dist/js/swiper.js')

const SpecialNav=({typeAllList,getDetailByTypeId,Nindex})=>{
	class SpecialNav extends React.Component{
		render(){
			return(	
					<div className={styles.specialNav_box} id='specialNav'>
						<div className='swiper-specialnav'>
							<ul className="swiper-wrapper">
								<li className={styles.specialNav_li+' swiper-slide'} special_id='0'>
									<div><img src="./src/assets/special_nav-all.png" alt=""/></div>
									{Nindex===0?<p style={{'color':'#ff3636'}}>全部专题</p>:<p>全部专题</p>}									
								</li>
								{typeAllList?typeAllList.map(function(elem,index) {
									return (<li className={styles.specialNav_li+' swiper-slide'} key={index} special_id={elem.id}>
												<div><img src={elem.picture} alt=""/></div>
												<p>{elem.name}</p>
									</li>);																		
								}):""}								
								</ul>
						</div>
					</div>
				)
		}
		componentDidMount(){
			$('.'+styles.specialNav_li).click(function(){
				getDetailByTypeId($(this).attr('special_id'))
				$('.swiper-slide').children('p').css('color','#000')
				$(this).children('p').css('color','#ff3636')
			})
			new Swiper('.swiper-specialnav',{	//滑动			
				slidesPerView: 4.5,
		      	spaceBetween: 15,			   
			})
			$('#iop p').css('color','#111')
			$(window).scroll(function() {
				var top=$(window).scrollTop()
				if(top>87){
					$('#specialNav').css({						
						"top":"0px",
						"background":'#fff'
					})
					$('#headerReturn').slideUp()
				}else{
					$('#specialNav').css({					
						"top":"0.88rem",
						"background":'#f5f5f5'
					})
					$('#headerReturn').slideDown()
				}
			});
		}
		componentWillUnmount(){
			$(window).unbind('scroll')//解除滑动
		}
	}
	return <SpecialNav/>
}
export default SpecialNav