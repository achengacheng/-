import React from 'react';
import styles from '../../style/Special/special.css';
import $ from 'jquery'

const SpecialDetailText=({DetailData})=>{
	class SpecialDetailText extends React.Component{
		render(){
			return(
					<div className={styles.specialdetail_text_box}>
						<p>{DetailData.name}</p>
						<div className={styles.specialdetail_text_head}>
							<div className={styles.specialdetail_text_himg}>
								<div>
									<img src={DetailData.themeTypePic?DetailData.themeTypePic:"./src/assets/special_nav-icon1.png"} alt=""/>
								</div>
								<p>{DetailData.themeType?DetailData.themeType:""}</p>
							</div>
							<p>{DetailData.lastDate?DetailData.lastDate:""}</p>
						</div>	
						<div className={styles.specialdetailtext} id="specialdetailtext">
						</div>
					</div>
				)
		}
		componentDidMount(){
			if(DetailData.content){
				$('#specialdetailtext').html(DetailData.content)
			}
		}
	}
	return <SpecialDetailText/>
}
export default SpecialDetailText