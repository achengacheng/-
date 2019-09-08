import React from 'react';
import styles from '../../style/shopping/ShoppingCart.css'
import $ from 'jquery'

const ShoppingCartMode=({getShopingCart,shoppingCartPage})=>{
	class ShoppingCartMode extends React.Component{
		render(){
			return(	<div className={styles.ShoppingCartMode_box} id='CartMode'>
						<div className={shoppingCartPage.mailMode?'':styles.ShoppingCartMode_now}>快递配送({shoppingCartPage.kDnum})</div>
						<div className={shoppingCartPage.mailMode?styles.ShoppingCartMode_now:''}>线下自提({shoppingCartPage.zDnum})</div>
					</div>
					)
		}
		componentWillMount(){
			
		}
		componentDidMount(){
			$('#CartMode div').click(function(){
				if ($(this).index()!=shoppingCartPage.mailMode) {
					if($(this).index()){
						getShopingCart(sessionStorage.getItem('id'),1)
					}else{
						getShopingCart(sessionStorage.getItem('id'),0)						
					}				
				}
			})
		}
	}
	return <ShoppingCartMode/>
}
export default ShoppingCartMode
