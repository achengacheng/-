import React from 'react';
import styles from '../../../style/home/homePage.css'
import { Link } from  'dva/router'
import $ from 'jquery';
const HomeAjList=({datas,Callback})=>{
	
	class HomeAjList extends React.Component{
		render(){
			return(
					<div className={styles.home_ajlist_box}> 
						<div className={styles.home_ajlist_head} onClick={()=>Callback('BbrandAJMoer')}>
							<h2>{datas.moduleName}</h2>
							<p >更多</p>	
						</div>
						<ul className={styles.home_ajlist}>
						{ datas.data.map(function(item,index){
								return (<li key={index} onClick={()=>Callback('BbrandAJ',item.id)}><img src={item.pictureUrl[0]} className="ajlist_img"/></li>)
							})							
						}
						</ul>
					</div>
				)
		}
		componentDidMount(){
			$('.ajlist_img').css('height',function(){
				return $('.homeGuessLike_img').width()*0.5+'px'
			})
		}
		componentDidUpdate(){
			$('.ajlist_img').css('height',function(){
				return $('.homeGuessLike_img').width()*0.5+'px'
			})		
		}
	}
	return <HomeAjList/>
}

export default HomeAjList