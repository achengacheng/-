import React from 'react';
import styles from '../../../style/home/homePage.css'
var Swiper=require('../../../../node_modules/swiper/dist/js/swiper.js')

const HomeSpecialP2=({Delitdata,Callback})=>{
  	class HomeSpecialP2 extends React.Component{
  		render(){
  			return (<div className={styles.homeSpecial1_box}>
	  					<div className={styles.home_recommend_head}>
							<h2>{Delitdata.promomtionName}</h2>
							<p onClick={()=>Callback('specialMoer',Delitdata.promotionId)}>更多</p>
						</div>
						<ul >
						{Delitdata.promotionDetail.map(function(elem,index){
							return (<li className={styles.homeSpecial2_li} key={index} onClick={()=>Callback('special',elem.themeId)}>
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
  			)
  		}
  	}
	return <HomeSpecialP2/>
}  

export default HomeSpecialP2	