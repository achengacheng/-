import React from 'react';
import { connect } from 'dva';
import styles from '../../../style/mine/MyBalance/MyBalance.css';
import BalanceHead from '../../../components/Mine/MyBalance/BalanceHead';
import BalanceRecord from '../../../components/Mine/MyBalance/BalanceRecord';
import BalanceBlank from '../../../components/Mine/MyBalance/BalanceBlank'
import constant from '../../../constant.js'
const BalancePage = ({balanceData,dispatch}) => {
	//获取余额信息
	class BalancePage extends React.Component{
		constructor(props){
			super(props)
			this.state={
				listData:balanceData.res_datas
			}
		}		
		render () {
			return (
				<div>
                    <BalanceHead listDatas={this.state.listData} />
					{balanceData.loading==true&&!!balanceData.res_datas.recordList.length?<BalanceRecord listDatas={this.state.listData}/>:<BalanceBlank/>}
				</div>
			) 
		}
	}
	return <BalancePage />
};
export default connect(({ balanceData }) => ({
    balanceData
}))(BalancePage);