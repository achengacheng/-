import React from 'react';
import styles from '../../../style/mine/myPage.css';
import constant from '../../../constant';

const ConsumeEarnings = ({ go,money }) => {
	let showMoney = constant.convertCurrency;
	let balance = showMoney(money.balance);
	// let profitOfPay = showMoney(money.profitOfPay);
	let profitOfRedPacket = showMoney(money.profitOfRedPacket);
	//console.log(balance,profitOfPay,profitOfRedPacket)
	return (
		<div className={ styles.consumeEarningsMain }>
			<div onClick={() => go('/myPage/MyBalance')}>
				<span>{ balance }</span>
				<p>我的余额(元)</p>
			</div>
			{/* <div onClick={() => go('/mypage/ConsumePage')}>
				<span>{ profitOfPay }</span>
				<p>消费收益(元)</p>
			</div> */}
			<div onClick={() => go('/mypage/AdPage')}>
				<span>{ profitOfRedPacket }</span>
				<p>粮票收益(元)</p>
			</div>
		</div>
	)
}

export default ConsumeEarnings;
