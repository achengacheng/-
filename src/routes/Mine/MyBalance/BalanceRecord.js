import React from 'react';
import styles from '../../../style/mine/MyBalance/MyBalance.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import RecordList from '../../../components/Mine/MyBalance/RecordList'
import { connect } from 'dva';


const BalanceRecord = ({balanceData,dispatch}) => {
	class BalanceRecord extends React.Component{		
		render () {
			return (
				<div>
                    <Header head_title='收支记录' left_show='1' right_icon='2' header_ids="5"/>
                    <div className={styles.recordWrap}>
                        <RecordList/> 
                    </div>
				</div>
			)
		} 
	}	
	return <BalanceRecord />
};
export default connect(({ balanceData }) => ({
    balanceData
}))(BalanceRecord);