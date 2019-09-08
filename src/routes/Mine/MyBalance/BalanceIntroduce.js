import React from 'react';
import styles from '../../../style/mine/MyBalance/MyBalance.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部

const BalanceRecord = () => {
	class BalanceRecord extends React.Component{		
		render () {
			return (
				<div>
                    <Header head_title='余额介绍' left_show='1' right_icon='2'/>
                    <div className={styles.BalanceIntrBox}>
                        <div>
                            <div>1.什么是余额</div>
                            <div>余额是艾家公社商城内使用的现金抵用币余额是艾家公社商城内使用的现金抵用币余额是艾家公社商城内使用的现金抵用币余额是艾家公社商城内使用的现金抵用币余额是艾家公社商城内使用的现金抵用币</div>
                        </div>
                        <div>
                            <div>1.什么是余额</div>
                            <div>余额是艾家公社商城内使用的现金抵用币</div>
                        </div>
                        <div>
                            <div>1.什么是余额</div>
                            <div>余额是艾家公社商城内使用的现金抵用币</div>
                        </div>
                        <div>
                            <div>1.什么是余额</div>
                            <div>余额是艾家公社商城内使用的现金抵用币</div>
                        </div>
                    </div>
                </div>
			)
		}
	}	
	return <BalanceRecord />
};
export default BalanceRecord;