import React from 'react';
import styles from '../../../style/mine/MsgCenter/ActivityMsg.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import MsgCard from '../../../components/Mine/MsgCenter/ActivityMsgCard'
import DefaultPage from '../../../components/PublicComponents/DefaultPage';//缺省页面
import { connect } from 'dva';
const ActivityMsg = ({dispatch,msgPageData}) => {
	class ActivityMsg extends React.Component{
		constructor(props){
            super(props);
            this.state={
                actData:msgPageData.act_datas
            }
        }		 
		render () {
			if(this.state.actData.length){
				return (
					<div>
						<Header head_title='活动消息' left_show='1' right_icon='2'/>
						<div className={styles.ActivityWrap}>
						
						{
								this.state.actData.map(function(item,index){
									return(
										<div key={index}>
											<div className={styles.ActivityLi}>
												<span className={styles.ActivityTime}>2018年10月35日 10:00</span>
												<div className={styles.Activitys}>
													<div>
														<img src="/src/assets/Mine-msg-banner1.png" alt=""/>
													</div>
													<div className={styles.ActivityTimeDiv}>
														<p className={styles.ActivityTimep1}>你的地球日优惠福利来啦</p>
														<p className={styles.ActivityTimep2}>学习用具日用品零食小吃应有尽有吃应有尽有。</p>
													</div>
												</div>
											</div>
										</div>
									)
								})
							}
						</div>    
					</div>
				)
			}else{
				return(
					<div>
						<Header head_title='活动消息' left_show='1' right_icon='2'/>
						<div><DefaultPage showDefault={true} default_ids={3} /></div>
					</div>
				)
			}
		}
	}	
	return <ActivityMsg />
};
export default connect(({ msgPageData }) => ({
    msgPageData
  }))(ActivityMsg);