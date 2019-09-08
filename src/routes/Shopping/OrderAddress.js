import React from 'react';
import { connect } from 'dva';
import $ from 'jquery';
import Header from '../../components/PublicComponents/HeaderReturn'
import styles from '../../style/shopping/PlaceOrder.css'
import { Link  } from 'dva/router';

const OrderAddress=({dispatch,PlaceOrderData,location,history})=>{
	console.log(location)
	function addressBack(addressD,loca){
		dispatch({
			type:'PlaceOrderData/addressBack',
			addressD:addressD,
			loca:loca
		})
	}
	class OrderAddress extends React.Component{
		render(){
			return(	<div className={styles.OrderAddress_box}>	
						<Header left_show='1' head_title='选择收货人'/>
						<ul className={styles.addressList}>	
							{PlaceOrderData.adderssList?PlaceOrderData.adderssList.map(function(elem,index){
								return (<li key={index}  className="addressLi"> 
											<Link to={{pathname:'/PlaceOrder',address_id:1}} >
												<div className={styles.addressText}  addressid={elem.id} >
													<p><span>{elem.consignee}</span> {elem.receivingPhone}</p>
													<p>{elem.province}{elem.city}{elem.area} &nbsp;&nbsp;{elem.detail}</p>
												</div>	
											</Link>
											<i className={styles.Clear_address} addressid={elem.id} id='changeAddress'></i>
											{elem.defaults?<i className={styles.moren_address}></i>:''} 
										</li>)
							}):''}						
						</ul>
						<div className={styles.add_address} id='add_Address'>+添加新收货人</div>	
					</div>)
		}
		componentDidMount(){
			$('.'+styles.addressText).bind('touchstart',function(event){//选择点击动效
				event.preventDefault();
				$(this).parents('li').css('background','#d8d8d8')
			}).bind('touchend',function(event){
				event.preventDefault();
				$(this).parents('li').css('background','#fff')
				let addressId=$(this).attr('addressid')
				let stData
				if(PlaceOrderData.adderssList){
					for(let i=0;i<PlaceOrderData.adderssList.length;i++){
						if(PlaceOrderData.adderssList[i].id===addressId){
							stData=JSON.stringify(PlaceOrderData.adderssList[i])
						}
					}
				}
				addressBack(stData,location.hash.substring(1))
			})
			$('#changeAddress').click(function(){
				let addressId=$(this).attr('addressId')
				let stData
				if(PlaceOrderData.adderssList){
					for(let i=0;i<PlaceOrderData.adderssList.length;i++){
						if(PlaceOrderData.adderssList[i].id===addressId){
							stData=PlaceOrderData.adderssList[i]
						}
					}
					if(stData){
						sessionStorage.setItem('AdressURL',location.pathname+location.hash)
						let datas="name="+stData.consignee+"&phone="+stData.receivingPhone+"&area="+stData.province+"-"+stData.city+"-"+stData.area+"&mail="+stData.postalCode+"&detail="+stData.detail+"&defaults="+stData.defaults+"&id="+stData.id				
						history.push({pathname:"/mypage/AddressPage/EditConsignee",search:datas})
					}					
				}
			})
			$('#add_Address').click(function(){
				sessionStorage.setItem('AdressURL',location.pathname+location.hash)
				history.push({pathname:"/mypage/AddressPage/AddConsignee"})
			})
		}
	}
	return <OrderAddress/>
}
export default connect(({ PlaceOrderData }) => ({
    PlaceOrderData,
  }))(OrderAddress);
