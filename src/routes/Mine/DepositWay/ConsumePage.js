import React from 'react';
import styles from '../../../style/mine/DepositWay/ConsumePage.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import DepositWayCard from '../../../components/Mine/DepositWay/DepositWayCard'
import { connect } from 'dva';

const ConsumePage = ({dispatch,getUserData}) => {
	function getData(id,index,next,fn){
		dispatch({
			type:'getUserData/setDefaults',
			id:id,
			cb:fn,
			index:index,
			next:next
		})
	}
	class ConsumePage extends React.Component{
		constructor(props){
			super(props);
			this.state={
				listData:getUserData.res_datas
			}
		}	
		render () {
			return (
				<div>
                    <Header head_title='提现账号管理' left_show='1' />
                    <div className={styles.ConsumeWrap}>
                        <DepositWayCard listData={this.state.listData} changeDe={this.changeDefault} cb={this.changeDefaultCb}/>
                    </div>
				</div>
			) 
		} 
		changeDefaultCb(index,next){
            getUserData.res_datas[index].isDefault=true;
            getUserData.res_datas[next].isDefault=false;
        }
		changeDefault(id,index,next,fn){
            getData(id,index,next,fn)
        }	
	}	
	return <ConsumePage />
};
export default connect(({ getUserData }) => ({
    getUserData
  }))(ConsumePage);