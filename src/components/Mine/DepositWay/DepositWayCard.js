import React from 'react';
import styles from '../../../style/mine/DepositWay/ConsumePage.css';
import { Link } from 'dva/router'
import { connect } from 'dva';

const  DepositWayCard = ({listData,changeDe,cb}) => {
	class DepositWayCard extends React.Component{
        constructor(props){
            super(props);
            this.state={
                defaultPay:listData
            }
        }
        // changeDefaultCb(index,next){
        //     this.state.defaultPay[index].isDefault=true;
        //     this.state.defaultPay[next].isDefault=false;
        //     this.setState({
        //         defaultPay:this.state.defaultPay
        //     })
        // }
        // changeDefault(id,index,next){
        //     dispatch({
        //         type:'getUserData/setDefaults',
        //         id:id,
        //         cb:(index,next)=>this.changeDefaultCb(index,next),
        //         index:index,
        //         next:next
        //     })
        // }	
		render () {
            let that=this;
                return (
                    <div>   {   
                                (function(){
                                    if(that.state.defaultPay.length==0){
                                        return(
                                            <div>
                                                <Link to="/mypage/ConsumePages/AddAlipay">
                                                    <img src="/src/assets/Mine-Alipay.png" alt=""/>
                                                </Link>
                                                <Link to="/mypage/ConsumePages/AddBankCard">
                                                    <img src="/src/assets/Mine-BankCard.png" alt=""/>
                                                </Link>
                                            </div>
                                        )
                                    }else if(that.state.defaultPay.length==1){                                  
                                        if(!!that.state.defaultPay[0].bank==false){                                  
                                            return(
                                                <div>
                                                    <div className={styles.ConsumeAcard}>
                                                        <p>支付宝姓名：{that.state.defaultPay[0].cartName}</p>
                                                        <p>支付宝账号：{that.state.defaultPay[0].cardNO}</p>
                                                        <div className={styles.ConsumeCheck}>
                                                            <div>
                                                                <span className={styles.ConsumeChecked}></span>
                                                                <p>设为默认提现方式</p>
                                                            </div>
                                                            <Link to={"/mypage/ConsumePages/Alipay?name="+that.state.defaultPay[0].cartName+'&cardNO='+that.state.defaultPay[0].cardNO+'&isDefault='+that.state.defaultPay[0].isDefault+'&id='+that.state.defaultPay[0].id}>
                                                                <div className={styles.ConsumeDiv}>编辑</div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <Link to="/mypage/ConsumePages/AddBankCard">
                                                        <img src="/src/assets/Mine-BankCard.png" alt=""/>
                                                    </Link>
                                                </div>
                                            )
                                        }else{
                                            return(
                                                <div>
                                                    <Link to="/mypage/ConsumePages/AddAlipay">
                                                        <img src="/src/assets/Mine-Alipay.png" alt=""/>
                                                    </Link>
                                                    <div className={styles.ConsumeBankcard}>
                                                        <p>{that.state.defaultPay[0].bank}</p>
                                                        <p>姓名：{that.state.defaultPay[0].cartName}</p>
                                                        <p>卡号：{that.state.defaultPay[0].cardNO}</p>
                                                        <div className={styles.ConsumeCheckB}>
                                                            <div>
                                                                <span className={styles.ConsumeNoChecked}></span>
                                                                <p>设为默认提现方式</p>
                                                            </div>
                                                                <div className={styles.ConsumeDiv}><Link to={"/mypage/ConsumePages/BankCard?cartName="+that.state.defaultPay[0].cartName+'&id='+that.state.defaultPay[0].id+'&cardNO='+that.state.defaultPay[0].cardNO+'&bank='+that.state.defaultPay[0].bank+'&bankName='+that.state.defaultPay[0].bankName+'&isDefault='+that.state.defaultPay[0].isDefault+'&area='+that.state.defaultPay[0].address.area+'&province='+that.state.defaultPay[0].address.province+'&city='+that.state.defaultPay[0].address.city}>编辑</Link></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                    if(that.state.defaultPay.length==2){
                                        
                                        if(!!that.state.defaultPay[0].bank==false){
                                            return(
                                                <div>
                                                    <div className={styles.ConsumeAcard}>
                                                        <p>支付宝姓名：{that.state.defaultPay[0].cartName}</p>
                                                        <p>支付宝账号：{that.state.defaultPay[0].cardNO}</p>
                                                        <div className={styles.ConsumeCheck}>
                                                            <div>
                                                                <span className={that.state.defaultPay[0].isDefault==true?styles.ConsumeChecked:styles.ConsumeNoChecked} onClick={()=>changeDe(that.state.defaultPay[0].id,0,1,cb)}></span>
                                                                <p>设为默认提现方式</p>
                                                            </div>
                                                            <Link to={"/mypage/ConsumePages/Alipay?name="+that.state.defaultPay[0].cartName+'&cardNO='+that.state.defaultPay[0].cardNO+'&isDefault='+that.state.defaultPay[0].isDefault+'&id='+that.state.defaultPay[0].id}>
                                                                <div className={styles.ConsumeDiv}>编辑</div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className={styles.ConsumeBankcard}>
                                                        <p>{that.state.defaultPay[1].bank}</p>
                                                        <p>姓名：{that.state.defaultPay[1].cartName}</p>
                                                        <p>卡号：{that.state.defaultPay[1].cardNO}</p>
                                                        <div className={styles.ConsumeCheckB}>
                                                            <div>
                                                                <span className={that.state.defaultPay[1].isDefault==true?styles.ConsumeChecked:styles.ConsumeNoChecked} onClick={()=>changeDe(that.state.defaultPay[1].id,1,0,cb)}></span>
                                                                <p>设为默认提现方式</p>
                                                            </div>
                                                            <div className={styles.ConsumeDiv}>
                                                                <Link to={"/mypage/ConsumePages/BankCard?cartName="+that.state.defaultPay[1].cartName+'&id='+that.state.defaultPay[1].id+'&cardNO='+that.state.defaultPay[1].cardNO+'&bank='+that.state.defaultPay[1].bank+'&bankName='+that.state.defaultPay[1].bankName+'&isDefault='+that.state.defaultPay[1].isDefault+'&area='+that.state.defaultPay[1].address.area+'&province='+that.state.defaultPay[1].address.province+'&city='+that.state.defaultPay[1].address.city} >编辑</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }else{
                                            return(
                                                <div>
                                                    <div className={styles.ConsumeAcard}>
                                                        <p>支付宝姓名：{that.state.defaultPay[1].cartName}</p>
                                                        <p>支付宝账号：{that.state.defaultPay[1].cardNO}</p>
                                                        <div className={styles.ConsumeCheck}>
                                                            <div>
                                                                <span className={that.state.defaultPay[1].isDefault==true?styles.ConsumeChecked:styles.ConsumeNoChecked} onClick={()=>changeDe(that.state.defaultPay[1].id,1,0,cb)}></span>
                                                                <p>设为默认提现方式</p>
                                                            </div>
                                                            <Link to={"/mypage/ConsumePages/Alipay?name="+that.state.defaultPay[1].cartName+'&cardNO='+that.state.defaultPay[1].cardNO+'&isDefault='+that.state.defaultPay[1].isDefault+'&id='+that.state.defaultPay[1].id}>
                                                                <div className={styles.ConsumeDiv}>编辑</div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className={styles.ConsumeBankcard}>
                                                        <p>{that.state.defaultPay[0].bank}</p>
                                                        <p>姓名：{that.state.defaultPay[0].cartName}</p>
                                                        <p>卡号：{that.state.defaultPay[0].cardNO}</p>
                                                        <div className={styles.ConsumeCheckB}>
                                                            <div>
                                                                <span className={that.state.defaultPay[0].isDefault==true?styles.ConsumeChecked:styles.ConsumeNoChecked} onClick={()=>changeDe(that.state.defaultPay[0].id,0,1,cb)}></span>
                                                                <p>设为默认提现方式</p>
                                                            </div>
                                                                <div className={styles.ConsumeDiv}>
                                                                    <Link to={"/mypage/ConsumePages/BankCard?cartName="+that.state.defaultPay[0].cartName+'&id='+that.state.defaultPay[0].id+'&cardNO='+that.state.defaultPay[0].cardNO+'&bank='+that.state.defaultPay[0].bank+'&bankName='+that.state.defaultPay[0].bankName+'&isDefault='+that.state.defaultPay[0].isDefault+'&area='+that.state.defaultPay[0].address.area+'&province='+that.state.defaultPay[0].address.province+'&city='+that.state.defaultPay[0].address.city}>编辑</Link>
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                       
                                    }
                                })()
                            }
                            <div className={styles.ConsumeContent}>
                                <div>温馨提示</div>
                                <p>1.如因填写帐号信息不正确导致提现失败，艾家公社概不负责。 </p>
                                <p>2.客服电话：028-9669999</p>
                            </div>
                    </div>
                )
        }
	}	
	return <DepositWayCard />
};
export default connect(({ getUserData }) => ({
    getUserData
  }))(DepositWayCard);