import React from 'react';
import styles from '../../../style/mine/MsgCenter/ActivityMsg.css';
import { connect } from 'dva';

const ActivityMsgCard = ({dispatch,msgPageData}) => {
	class ActivityMsgCard extends React.Component{
        constructor(props){
            super(props);
            this.state={
                
            }
        }
		render () {
			return (
				<div>
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
        }
        componentDidMount(){
            // if(msgPageData.act_loading==false){
            //     dispatch({
            //         type:'msgPageData/actMsgData'
            //     })
            // }
        }    
    }
    	
	return <ActivityMsgCard />
};
export default connect(({ msgPageData }) => ({
    msgPageData
  }))(ActivityMsgCard);