import React from 'react';
import styles from '../../../style/home/homePage.css'
import $ from 'jquery';

const HomeAjArea=({datas,Callback})=>{
	class HomeAjArea extends React.Component{
		render(){
			return(	
					<div className={styles.aj_area_box}>					
						<div className={styles.aj_area_haeder}>
							<h2>{datas?datas.moduleName:""}</h2>
							<p onClick={()=>Callback('AJAreaMoer')}>更多</p>	
						</div>
						<img className={styles.aj_area_img} src={datas?datas.data.pictureUrl:""} onClick={()=>Callback('AJArea',datas.data.id)}/>
						<p className={styles.aj_area_textH} onClick={()=>Callback('AJArea',datas.data.id)}>
							{datas?datas.data.partitionName:""}
							<span> ¥{datas?datas.data.miniPrice?datas.data.miniPrice:"0.00":""}起 </span>
						</p>
						<p className={styles.aj_area_text} onClick={()=>Callback('AJArea',datas.data.id)}>{datas?datas.data.describe:""}</p>
					</div>
				)
		}
		componentDidMount(){
			$('.'+styles.aj_area_img).css('height',function(){
				return $('.homeGuessLike_img').width()*0.8+'px'
			})
		}
		componentDidUpdate(){
			$('.'+styles.aj_area_img).css('height',function(){
				return $('.homeGuessLike_img').width()*0.8+'px'
			})		
		}
	}
	return <HomeAjArea/>
}
export default HomeAjArea