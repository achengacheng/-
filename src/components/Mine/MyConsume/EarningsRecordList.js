import React from 'react';
import styles from '../../../style/mine/MyConsume/ConsumePage.css';
const RecordList = () => {
	class BalanceRecord extends React.Component{		
		render () {
			return (
				<div>
                    <div className={styles.recordListHeader}>
                        <div className={styles.recordListTime}>
                            <img src="/src/assets/Mine-time.png" alt=""/> &nbsp;
                            <p> 2017年10月</p>
                        </div>
                        <div className={styles.recordTag}>
                            <div>
                                <p>收入(元)</p>
                                <p>420.00</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.recordList}>
                        <div className={styles.recordListLi}>
                            <p>30日 10:00</p>
                            <p>获得收益</p>
                            <div>+100.11</div>
                        </div>
                        <div className={styles.recordListLi}>
                            <p>30日 10:00</p>
                            <p>获得收益</p>
                            <div>+100.11</div>
                        </div>
                        <div className={styles.recordListLi}>
                            <p>30日 10:00</p>
                            <p>获得收益</p>
                            <div>+100.11</div>
                        </div>
                        <div className={styles.recordListLi}>
                            <p>30日 10:00</p>
                            <p>获得收益</p>
                            <div>+100.11</div>
                        </div>
                        <div className={styles.recordListLi}>
                            <p>30日 10:00</p>
                            <p>获得收益</p>
                            <div>+100.11</div>
                        </div>
                    </div>
				</div>
			)
		}
	}	
	return <BalanceRecord />
};
export default RecordList;