import React from 'react';
import { connect } from 'dva';
import styles from '../../../style/mine/MyBalance/MyBalance.css';
// import DefaultPage from "../../../components/Mine/MyBalance/BalanceBlank"
import { Link } from 'dva/router'

const BalanceRecord = ({listDatas}) => {
	class BalanceRecord extends React.Component{
        constructor(props){
            super(props);
            this.state={
                recordData:listDatas
            }
        }		
		render () {
                return (
                    <div>
                        <div className={styles.recordHead}>
                            <div>近30天的收支记录</div>
                            <Link to="/mypage/MyBalance/BalanceRecord">
                                <div>更多</div>
                            </Link>
                        </div>
                        <div className={styles.recordList}>
                        {
                            this.state.recordData.recordList.map(function(item,index){
                                return(
                                    <div className={styles.recordListLi} key={index}>
                                        <div>
                                            <p>{item.name}</p>
                                            <p>{item.date}</p>
                                        </div>
                                        <div  className={item.money<0?styles.payColor:styles.getMoney}>{item.money}</div>
                                    </div>
                                )
                            })
                        }
                            {/* <div className={styles.recordListLi}>
                                <div>
                                    <p>购物广告费</p>
                                    <p>2017-10-22 10:00</p>
                                </div>
                                <div>+100.11</div>
                            </div> */}
                            
                        </div>
                        {/* <DefaultPage  default_ids="3"/> */}
                    </div>
                )
		}
	}	
	return <BalanceRecord />
};
export default BalanceRecord