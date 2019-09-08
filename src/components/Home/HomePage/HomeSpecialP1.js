import React from 'react';
import styles from '../../../style/home/homePage.css'
var Swiper=require('../../../../node_modules/swiper/dist/js/swiper.js')

const HomeSpecialP1=({Delitdata,Callback})=>{
	console.log(Delitdata.promotionDetail,123123)
  	class HomeSpecialP1 extends React.Component{
  		render(){
  			return (<div className={styles.homeSpecial1_box}>
	  					<div className={styles.home_recommend_head}>
							<h2>{Delitdata.promomtionName}</h2>
							<p onClick={()=>Callback('specialMoer',Delitdata.promotionId)}>更多</p>
						</div>
						<ul className={styles.homeSpecial1}>
							{Delitdata.promotionDetail.map(function(elem,index){
									return(<li key={index} onClick={()=>Callback('special',elem.themeId)}>
									  		<img src={elem.themePic}/>
									  		<div className={styles.homeSpecial1_text}>
									  			<p className={styles.homeSpecial1_text_p}>{elem.themeName}</p><span>¥ {elem.money!=0?elem.money:'0.00'}</span>
									  		</div>
									  	</li>)
																
							})}
						  
						</ul>
  					</div>
  			)
  		}
  	}
	return <HomeSpecialP1/>
}  

export default HomeSpecialP1		