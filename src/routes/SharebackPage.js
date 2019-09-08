import React from 'react';
import { connect } from 'dva';
import $ from 'jquery'
import styles from '../style/Shareback.css'
var Swiper=require('../../node_modules/swiper/dist/js/swiper.js')
const SharebackPage=({dispatch,shareData,location,history})=>{
	function goshopping(id) {
		
	}
	class SharebackPage extends React.Component {
		render(){
			let goodsData,redPocket
			if (shareData.orderData){
				if(shareData.orderData.goodsSkus){
					goodsData=shareData.orderData.goodsSkus
				}
				if(shareData.orderData.redPacketMoney){
					redPocket=shareData.orderData.redPacketMoney
				}else{
					redPocket=0
				}
			}
			return(<div className={styles.sharebox}> 
						<div className={styles.haedBg}>
							<p>恭喜<span>{shareData.orderData?shareData.orderData.userName:'艾家用户'}</span>在艾家公社购物</p>
							<p>获得了<span>{redPocket}</span>元粮票</p>
						</div>
						<div className={styles.shareHidden}></div>
						<div className={styles.shareHtext}></div>	
						<div className={styles.shareGoodsBox}>
							<div className="swiper-container">
					            <ul className="swiper-wrapper">
					            	{goodsData?goodsData.map(function(item,index){
					            		return (<li key={index} className="swiper-slide" >
							                		<img src={item.pic?item.pic:'./src/assets/laoding-1.1(344).png'} className={styles.shareGoodsImg}/>	
							                		<div className={styles.goodsbox}>
							                			<div>
							                				<p className={styles.goodsText}>{item.goodsName}</p>
							                				<span className={styles.goodsper}>¥{item.price%1===0?item.price+".00":item.price}</span>
							                			</div>
							                			<div className={`${styles.sharebackbutton} ${'goGoods'}`} goodsid={item.goodsId} >立即购买</div>
							                		</div>
						                		</li>)
					            	}):''}					            				                						                			                
					            </ul>
					            <div className={`${'swiper-pagination'} ${styles.dian}`}></div>			            
					        </div>		
						</div>
						<div className={styles.goindexBtn} id='goindexBtn'>进入艾家商城</div>
						<div className={styles.shareHidden1}></div>	
					</div>)

		}
		componentDidMount(){
			new Swiper('.swiper-container', {
				loop : true,
				pagination: {
				    el: '.swiper-pagination',
				},	
			})
			$('.swiper-pagination').children(' span').css('background','#f03e1a')
			$('#goindexBtn').click(function(event) {
				window.location.href="#/"
			});		

			$('.goGoods').click(function(){
				history.push({'pathname':'/GoodsPage/'+$(this).attr('goodsid'),back:0})
			})
		}
	}
	return <SharebackPage/>
}

export default connect(({shareData})=>({
	shareData
}))(SharebackPage)