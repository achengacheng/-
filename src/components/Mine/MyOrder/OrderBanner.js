import React from 'react';
import styles from '../../../style/mine/MyOrder/MyOrder.css';
import $ from 'jquery';

const OrderBanner = ({banner,limitTime,limitWat}) => {
    let hour=0,minute=0,second=0,_this;
    function getTime(){ //订单支付倒计时
		if(limitTime){
			let zTime=limitTime;
			var setTime=setInterval(function(){
				if(zTime>0){
					zTime--
					hour = Math.floor(zTime/3600);
	            	minute = Math.floor(zTime/60) % 60;
	            	second = zTime % 60;
	            	$('#odTimes').text('剩余：'+hour+'小时'+minute+'分'+second+'秒')
				}else{
					clearInterval(setTime)
				}
			},1000)
		}
	}
     const OrderBanner=({banner})=>{
         console.log(banner)
        let i=parseInt(banner,10);
        switch(i){
            case 1:
                return( <div>
                            <div className={styles.msgBanner1}>
                                <img src="/src/assets/Mine-clock-f.png" alt=""/>
                                <div>
                                    <p>等待付款</p>
                                    <p id='odTimes'>剩余：{limitWat(limitTime)}</p>
                                </div>
                            </div>
                        </div>);		
            case 4:
                return( <div>
                            <div className={styles.msgBanner1}>
                                <img src="/src/assets/Mine-right.png" alt=""/>
                                <div>
                                    <p>交易完成</p>
                                </div>
                            </div>
                        </div>);		
            case 3:
            return( <div>
                        <div className={styles.msgBanner}>
                            <div className={styles.msgBanners}>
								<img src="/src/assets/Mine-clock-f.png" alt=""/>
								<div>
									<p>卖家已发货</p>
									<p>等待买家收货</p>
								</div>
							</div>
							<div>普通快递</div>
                        </div>
                    </div>);
            case 2:
            return( <div>
                        <div className={styles.msgBanner}>
                            <div className={styles.msgBanners}>
								<img src="/src/assets/Mine-clock-f.png" alt=""/>
								<div>
									<p>买家已付款</p>
									<p>等待卖家发货</p>
								</div>
							</div>
							<div>普通快递</div>
                        </div>
                    </div>);
             case 5:
             return( <div>
                         <div className={styles.msgBanner1}>
                             <img src="/src/assets/Mine-msg-f.png" alt=""/>
                             <div>
                                 <p>交易已关闭</p>
                                 <p>可重新下单购买</p>
                             </div>
                         </div>
                     </div>);		
            default:
                 return(<div></div>);
         }
     }
	class OrderBanners extends React.Component{
        render(){
            return(
                <OrderBanner banner={banner} />
            )
        }
        componentDidMount (){
            getTime()
        }
        componentWillUnmount(){
            for(var i = 0; i < 9999; i++) {
                clearInterval(i)
            }
        }
    }
	// 	render () {
    //         let that=this;
	// 		return (
	// 			<OrderBanner/>
	// 		)
	// 	}
	// }	
	return <OrderBanners />
};
export default OrderBanner;