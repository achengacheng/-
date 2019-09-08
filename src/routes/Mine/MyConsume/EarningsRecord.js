import React from 'react';
import styles from '../../../style/mine/MyConsume/EarningsRecord.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import RecordList from '../../../components/Mine/MyConsume/EarningsRecordList'
import BalanceBlank from '../../../components/Mine/MyBalance/BalanceBlank'

const EarningsRecord = () => {
	class EarningsRecord extends React.Component{		
		render () {
			return (
				<div>
                    <Header head_title='收益记录' left_show='1' right_icon='2' header_ids="5"/>
                    <div className={styles.recordWrap}>
                        <RecordList/>
                        <RecordList/>
                    </div>
                    {/* <div className={styles.ReBlank}>
						<BalanceBlank/>
					</div> */}
				</div>
			)
		}
	}	
	return <EarningsRecord />
};
export default EarningsRecord;