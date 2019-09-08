import React from 'react';
import styles from '../../../style/mine/MyConsume/ConsumePage.css';
import { connect } from 'dva';
import { Link } from 'dva/router'
import BalanceBlank from '../../../components/Mine/MyBalance/BalanceBlank'
const ConsumeLi = ({listData}) => {
	class ConsumeLi extends React.Component{
        constructor(props){
            super(props);
            this.state={
                conDate:listData
            }
        }				
		render () {
            let that=this;
            if(this.state.conDate!=''){
                return (
                    <div>
                        <div className={styles.recordHead}>
                            <div>消费详情</div>
                        </div>
                        {
                            this.state.conDate.map(function(item,index){
                                return(
                                    <div key={index}>
                                        <div className={styles.recordListLiTitle}>
                                            <div className={styles.recordListLiHdiv}>
                                                <img src="/src/assets/Mine-xf-date.png" alt=""/>
                                                <p>{item.date}</p>
                                            </div>
                                            <div>消费(元)：<span className={styles.recordListSpanColor}>{item.total}</span></div>
                                        </div>
                                        <div className={styles.recordList}>
                                            {
                                                item.data.map(function(item,index){
                                                    return(
                                                        <div className={styles.recordListLi} key={index}>
                                                            <p>{item.dates}</p>
                                                            <Link to={"/mypage/MyOrder/OrderDetails?id="+item.orderId}>
                                                                <p>{item.text}</p>
                                                            </Link>
                                                            <p>{item.money}</p>
                                                        </div>
                                                    )
                                                }) 
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }else{
                return(
                    <BalanceBlank/>
                )
            }
        }
	}	
	return <ConsumeLi />
};
export default ConsumeLi