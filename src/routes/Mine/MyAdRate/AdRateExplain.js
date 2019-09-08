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
							<div>1.广告费的获取</div>
							<p>通过支付订单并分享所购买商品获取</p>
						</div>
						<div className={styles.AdRateDetailsLi}>
							<div>1.广告费的获取</div>
							<p>通过支付订单并分享所购买商品获取</p>
						</div>
						<div className={styles.AdRateDetailsLi}>
							<div>1.广告费的获取</div>
							<p>通过支付订单并分享所购买商品获取</p>
						</div>
						<div className={styles.AdRateDetailsLi}>
							<div>1.广告费的获取</div>
							<p>通过支付订单并分享所购买商品获取</p>
						</div>
						<div className={styles.AdRateDetailsLi}>
							<div>1.广告费的获取</div>
							<p>通过支付订单并分享所购买商品获取</p>
						</div>
						<div className={styles.AdRateDetailsLi}>
							<div>1.广告费的获取</div>
							<p>通过支付订单并分享所购买商品获取</p>
						</div>
						<div className={styles.AdRateDetailsLi}>
							<div>1.广告费的获取</div>
							<p>通过支付订单并分享所购买商品获取</p>
						</div>
						<div className={styles.AdRateDetailsLi}>
							<div>1.广告费的获取</div>
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