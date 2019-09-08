import React from 'react';
import styles from '../../../style/mine/MyBalance/MyBalance.css';
import Header from '../../../components/PublicComponents/Header';// 公共头部
import { Link } from 'dva/router'
import { connect } from 'dva';
import constant from '../../../constant.js'
const BalanceHead = ({listDatas}) => {
	class BalanceHead extends React.Component{
        constructor(props){
            super(props);
            this.state={
                detailData:listDatas
            }
        }
		render () {
               if(this.state.detailData){
                return (
                    <div className={styles.headBox}>
                        <div className={styles.headBg}>
                            {/* <header className={styles.headerReturn_box} >
                                <i className={styles.headerReturn_back}></i>
                                <p className={styles.headerReturn_text}>我的余额</p>	
                                <div className={styles.headerReturn_rightbox}>
                                <Link to="/mypage/MyBalance/BalanceIntroduce">
                                    <i className={styles.headerReturn_right_explain}></i>
                                </Link>
                                </div>
                            </header> */}
                            <Header  left_icon='1' right_icon='2' header_title="我的余额" left_fun={()=>this.goBack()}/>
                            <div className={styles.moneyBox}>
                                <div className={styles.moneyMsg}>
                                    <p>当前余额(元)</p>
                                    <p>{constant.convertCurrency(this.state.detailData.balance)}</p>
                                    {/* <p>可提现额度：3000.00</p> */}
                                </div>
                                <div className={styles.balanceBtn}>
                                    
                                        <div className={styles.balanceDiv1}>
                                            <Link to="/mypage/MyBalance/DepositRecord">
                                                提现记录
                                            </Link> 
                                        </div>
                                        <div className={styles.balanceDiv2}>
                                            <Link to="/mypage/ConsumePages/Withdrawals">   
                                                    立即提现
                                            </Link>     
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.balanceTip}>
                            该余额可用于提现或消费
                        </div>
                        <div className={styles.numberBox}>
                            <div className={styles.moneyBtn}>
                                <Link to="/mypage/MyBalance/DepositRecord">
                                    <p>提现总额(元)</p>
                                    <p>{this.state.detailData.withdrawalsTotal}</p>
                                </Link>    
                            </div>
                            <div className={styles.block}></div>
                            <div className={styles.moneyBtn}>
                                <Link to="/mypage/AdPage">
                                    <p>粮票收益(元)</p>
                                    <p>{this.state.detailData.profitOfRedPacket}</p>
                                </Link>   
                            </div>
                            {/* <div>
                                <div className={styles.moneyBoxTxt}>
                                    <img src="/src/assets/Mine-lp1.png" alt=""/>
                                    <div>
                                        <Link to="/mypage/ConsumePage">
                                            <p>消费收益(元)</p>
                                            <p className={styles.moneyColor}>{this.state.detailData.profitOfPay}</p>
                                        </Link>
                                    </div>
                                </div>
                                <div className={styles.moneyBoxTxt}>
                                    <img src="/src/assets/Mine-lp3.png" alt=""/>
                                    <div>
                                        <Link to="/mypage/AdPage">
                                            <p>粮票收益(元)</p>
                                            <p className={styles.moneyColor}>{this.state.detailData.profitOfRedPacket}</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.block}></div>
                            <div>
                                <div className={styles.moneyBoxTxt}>
                                        <img src="/src/assets/Mine-lp2.png" alt=""/>
                                        <div>
                                            <Link to="/mypage/MyBalance/DepositRecord">
                                                <p>提现总额(元)</p>
                                                <p className={styles.moneyColor}>{this.state.detailData.withdrawalsTotal}</p>
                                            </Link>
                                        </div>
                                    
                                </div>
                                <div className={styles.moneyBoxTxt}>
                                    <img src="/src/assets/Mine-lp4.png" alt=""/>
                                    <div>
                                        <p>余额消费(元)</p>
                                        <p className={styles.moneyColor}>0.00</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                )
            }else{
                return(
                    <div></div>
                )
            }
        }
        goBack(){
            window.history.go(-1)
        }	
	}	
	return <BalanceHead />
};
export default BalanceHead