import React from 'react';
import styles from '../../../style/mine/MyBalance/MyBalance.css';

const BalanceBlank = () => {
	class BalanceBlank extends React.Component{		
		render () {
			return (
				<div className={styles.balanceBlank}>
                    <div>
                        <img src="/src/assets/default_withoutData.png" alt=""/>
                        <p>暂无数据!</p>
                        <div>
                            页面暂无数据，去商城首页看看吧
                        </div>
                        {/* <div className={styles.balanceBtns}>快去购物吧</div> */}
                    </div>
                </div>
			)
		}
	}
	return <BalanceBlank />
};
export default BalanceBlank;