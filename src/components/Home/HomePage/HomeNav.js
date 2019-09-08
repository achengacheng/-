import React from 'react';
import styles from '../../../style/home/homePage.css';
import { Link } from  'dva/router'

const HomeNav=({datas,Callback})=>{
	class HomeNav extends React.Component{
		render(){
			return(
					<ul className={styles.homeNavbox}>
						{datas.map(function(item,index){
						 	return (<li key={index} onClick={()=>Callback(item.insideJumpFormat,item.insideJumpFormatVal.id,item.name)}>
							 			<img src={item.menuPicUrl?item.menuPicUrl:'./src/assets/laoding1.1(210).png'} alt="" />
							 			<p>{item.name}</p>
						 			</li>)
						})}																						
					</ul>
					)
		}
	}
	return <HomeNav/>
}

export default HomeNav;
