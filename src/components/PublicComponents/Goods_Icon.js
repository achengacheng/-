import React from 'react';
import styles from '../../style/PublicStyle/goods_icon.css' 

const Goods_Icon=({num,icon1,icon2})=>{
		
		let goods_class1,goods_class2;
		function goods_icon_fun(){
			if(parseInt(num)){
				goods_class1=styles.goods_icon
				goods_class2=styles.goods_icon
			}else{
				goods_class1=styles.goods_icon_no
				goods_class2==styles.goods_icon_no
			}
		}
		goods_icon_fun()
		return (
				<div className={styles.goods_icon_box}>				
					{icon1?<i className={goods_class1}></i>:''}
					{icon2?<i className={goods_class2}></i>:''}
				</div>)
}

export default Goods_Icon
