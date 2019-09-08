import React from 'react';
import styles from '../../../style/mine/MyAdRate/AdRateExplain.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部

const AdRateExplain = () => {
	class AdRateExplain extends React.Component{		
		render () {
			return (
				<div>
                    <Header head_title='粮票说明' left_show='1' right_icon='2' header_ids="5"/>
                    <div className={styles.AdRateDeWrap}>
                        <div className={styles.AdRateDetailsLi}>
							<div>1.什么是消费</div>
							<p>通过支付订单并分享所购买商品获取</p>
						</div>
						<div className={styles.AdRateDetailsLi}>
							<div>2.如何获得余额</div>
							<p>通过支付订单并分享所购买商品获取</p>
						</div>
						<div className={styles.AdRateDetailsLi}>
							<div>3.余额适用范围</div>
							<p>通过支付订单并分享所购买商品获取</p>
						</div>
						<div className={styles.AdRateDetailsLi}>
							<div>4.余额有效期说明</div>
							<p>通过支付订单并分享所购买商品获取</p>
						</div>
						<div className={styles.AdRateDetailsLi}>
							<div>5.下单时使用</div>
							<p>通过支付订单并分享所购买商品获取</p>
						</div>
						<div className={styles.AdRateDetailsLi}>
							<div>6.购物中广告费</div>
							<p>通过支付订单并分享所购买商品获取</p>
						</div>
						<div className={styles.AdRateDetailsLi}>
							<div>7.消费返利</div>
							<p>通过支付订单并分享所购买商品获取</p>
						</div>
						<div className={styles.AdRateDetailsLi}>
							<div>8.哪些情况会扣除余额</div>
							<p>通过支付订单并分享所购买商品获取</p>
						</div>
                    </div>    
                </div>
			)
		}
	}	
	return <AdRateExplain />
};
export default AdRateExplain;