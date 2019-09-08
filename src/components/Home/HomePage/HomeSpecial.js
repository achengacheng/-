import React from 'react';
import styles from '../../../style/home/homePage.css'
var Swiper=require('../../../../node_modules/swiper/dist/js/swiper.js')

const HomeSpecial=({Delitdata,Callback})=>{
	class HomeSpecial extends React.Component{
		render(){
			return(
				<div className={styles.homeSpecial_box}>
					<div className={styles.homeSpecial_head}>
						<h2>{Delitdata.promomtionName}</h2>
						<p onClick={()=>Callback('specialMoer',Delitdata.promotionId)}>更多</p>
					</div>
					<div className={styles.homeSpecial_imgbox}>
						<div className='swiper-homeSpecial'>
							<ul className='swiper-wrapper'>
							{Delitdata.promotionDetail.map(function(elem,index){
								return(<li key={index} className={styles.homeSpecial_li+' swiper-slide'} onClick={()=>Callback('special',elem.themeId)}>
											<img src={elem.themePic}/>
											<div>
												<h3>{elem.themeName}</h3>
												<span>¥ {elem.money!=0?elem.money:'0.00'} 起</span>
											</div>
											<p>{elem.describe}</p>
										</li>)
							})}	
							</ul>
						</div>	
					</div>
				</div>
				)
		}
		componentDidMount(){
			new Swiper('.swiper-homeSpecial', {				
				slidesPerView: 1.1,
		      	spaceBetween: 24,			   
			})
		}
	}
	return <HomeSpecial/>
}
export default HomeSpecial