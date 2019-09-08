import React from 'react';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import styles from '../../../style/mine/MyConsume/CheckRecord.css';
import CheckRecordCard from '../../../components/Mine/MyConsume/CheckRecordCard'
const CheckRecord = () => {
	class CheckRecord extends React.Component{		
		render () {
			return (
				<div>
                    <Header head_title='考核记录' left_show='1' right_icon='2' header_ids="5"/>
                    <div className={styles.checkBoxHeader}>
                        <CheckRecordCard type={true}/>
                        <CheckRecordCard type={false}/>
                    </div>
				</div>
			)
		}
	}	
	return <CheckRecord />
};
export default CheckRecord;