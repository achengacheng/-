import React from 'react';
import styles from '../../../style/mine/DepositWay/Withdrawals.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import { connect } from 'dva';
import { Link } from 'dva/router'
import ChaPop from '../../../components/PublicComponents/ChaPop'
const Withdrawals = ({dispatch,getUserData}) => {
    sessionStorage.setItem('txID',1)
    let Popfun  //弹窗调用通道
    function HintWords(popDom){
        Popfun=popDom.Popfun
    }
    function getCode(data){//弹窗使用
        Popfun(data)
    }
    let cardName="支付宝";
    let isBindA=false;
    let isBindB=false;
    let cardBox={};
	class Withdrawals extends React.Component{
        transferMsg(cur) {
            if(cur==0){
                cardName="银行卡"
            }else{
                cardName="支付宝";
            }
            this.setState({
              cur:cur
            });
          }
        cb(msg,isSucc){
            Popfun(msg);
            if(isSucc===1){
                let that=this;
                setTimeout(function(){
                    that.setState({
                        confirm:false
                    })
                    window.history.go(-1);
                },1000)
            }else if(isSucc===2){
                let that=this;
                setTimeout(function(){
                    that.setState({
                        confirm:true
                    })
                },1000)
            }
        }
        getMoney(){
            if(this.state.confirm){
                dispatch({
                    type:'getUserData/moneyApply',
                    types:this.state.cur,
                    money:this.refs.getm.value,
                    cb:(msg,isSucc)=>this.cb(msg,isSucc)
                })
            }
            this.setState({
                confirm:false
            })
            // this.state.confirm=false;
        }
        constructor(props){
            super(props);
            // if(getUserData.res_datas.length===0){
            //     sessionStorage.setItem('txID',3)
            // }
            for(let i=0;i<getUserData.res_datas.length;i++){
                if(getUserData.res_datas[i].bank){
                    isBindB=true;
                    cardBox.bank=getUserData.res_datas[i];
                    if(getUserData.res_datas[i].isDefault){
                        sessionStorage.setItem('txID',0)
                    }
                }else{
                    isBindA=true
                    cardBox.alipay=getUserData.res_datas[i];
                    if(getUserData.res_datas[i].isDefault){
                        sessionStorage.setItem('txID',1)
                    }
                }
                
            } 
            this.state = {
                cur:sessionStorage.getItem('txID'),
                payData:cardBox,
                money:getUserData.getBalanceData,
                confirm:true
            }
        }
		render () {
            let that=this;
            let alipayId;
            let bankId;
            if(that.state.payData.alipay){
                alipayId=that.state.payData.alipay.cardNO.substring(0,4)+'****'+that.state.payData.alipay.cardNO.substring(that.state.payData.alipay.cardNO.length-4,that.state.payData.alipay.cardNO.length)
            }
            if(that.state.payData.bank){
                bankId=that.state.payData.bank.cardNO.substring(0,4)+'****'+that.state.payData.bank.cardNO.substring(that.state.payData.bank.cardNO.length-4,that.state.payData.bank.cardNO.length)
                console.log(bankId,4414)
            }
			return(
				<div>
                    <Header head_title='申请提现' left_show='1' />
                    <ChaPop HintWords={HintWords}/>
                    <div className={styles.WidthBox}>
                    {/* {this.state.cur==='3'?<div className={styles.WidthCardBox}><img src="/src/assets/Mine-widthr-ali.png" alt=""/><img src="/src/assets/Mine-width-bank.png" alt=""/></div>:null} */}
                    {
                        (function(){
                                return(
                                    <div className={styles.WidthCardBox}>
                                        <div onClick={()=>that.transferMsg(1)}>
                                        {
                                            that.state.cur==1?<img src="/src/assets/Mine-width-alired.png" alt=""/>:<img src="/src/assets/Mine-widthr-ali.png" alt=""/>
                                        }
                                            
                                        </div>
                                        <div onClick={()=>that.transferMsg(0)}>
                                        {
                                            that.state.cur==0?<img src="/src/assets/Mine-width-bankred.png" alt=""/>:<img src="/src/assets/Mine-width-bank.png" alt=""/>
                                        }
                                        </div>
                                    </div>
                                )
                        })()
                    }
                        {
                            (function(){
                                if(that.state.cur==1&&isBindA){
                                    return(
                                        <div className={styles.AlipayMsg}>
                                            <div>
                                                <p className={styles.AlipayMsgp}><img src="/src/assets/Mine-Alipay-icon.png" alt=""/>&nbsp;<div>支付宝账号({alipayId})</div></p>
                                                <p>{that.state.payData.alipay.cartName.length>3?that.state.payData.alipay.cartName.substring(0,3)+'...':that.state.payData.alipay.cartName}</p>
                                            </div>
                                            <div>
                                                <p>余额:￥{that.state.money}
                                                 {/* (可提现额度:￥{that.state.money}) */}
                                                 </p>
                                                <p>￥ <input type="number" placeholder="请输入提现金额" ref='getm'/></p>
                                            </div>
                                        </div>
                                    )
                                }else if(that.state.cur==1&&!isBindA){
                                    return(
                                        <div className={styles.WidthMsg}>
                                            <p>您还没有绑定{cardName}账号，请先绑</p>
                                            <p>定账号再来提现!</p>
                                        </div>
                                    )
                                }else if(that.state.cur==0&&isBindB){
                                    return(
                                        <div className={styles.AlipayMsg}>
                                            <div>
                                                <p className={styles.AlipayMsgp}><img src="/src/assets/Mine-bankCard-icon.png" alt=""  alt="" className={styles.AlipayCard}/>&nbsp;<span>银行卡账号 ({bankId})</span></p>
                                                <p>{that.state.payData.bank.cartName.length>3?that.state.payData.bank.cartName.substring(0,3)+'...':that.state.payData.bank.cartName}</p>
                                            </div>
                                            <div>
                                                <p>余额:￥{that.state.money}
                                                {/* (可提现额度:￥{that.state.money}) */}
                                                </p>
                                                <p>￥ <input type="number" placeholder="请输入提现金额" ref='getm'/></p>
                                            </div>
                                        </div>
                                    )
                                }else if(that.state.cur==0&&!isBindB){
                                    return(
                                        <div className={styles.WidthMsg}>
                                            <p>您还没有绑定{cardName}账号，请先绑</p>
                                            <p>定账号再来提现!</p>
                                        </div>
                                    )
                                }
                            })()
                        }
					</div>
                    {
                        (function(){
                            if(that.state.cur==1&&!isBindA){
                                return(
                                    <Link to='/mypage/ConsumePages/AddAliPay'>
                                        <div className={styles.AlipayBtn}>
                                            去绑定
                                        </div>
                                    </Link>
                                )
                            }else if(that.state.cur==1&&isBindA){
                                return(
                                    <div className={styles.AlipayBtn} onClick={()=>that.getMoney()}>
                                        提交申请
                                    </div>
                                )
                            }else if(that.state.cur==0&&!isBindB){
                                return(
                                    <Link to='/mypage/ConsumePages/AddBankCard'>
                                        <div className={styles.AlipayBtn}>
                                            去绑定
                                        </div>
                                    </Link>
                                )
                            }else if(that.state.cur==0&&isBindB){
                                return(
                                    <div className={styles.AlipayBtn} onClick={()=>that.getMoney()}>
                                        提交申请
                                    </div>
                                )
                            }
                        })()
                    }
                    <div className={styles.ConsumeContent}>
                        <div>温馨提示</div>
                        <p>1.如因用户填写个人账户信息有误导致提现失败，我方概不负责，请认真填写。</p>
                        <p>2.提现金额不得少于100元，当提现金额少于500元（含500元）可以使用支付宝或银行卡提现，超过500元只能选择银行卡提现。</p>
                        <p>3.提现信息经我方审核成功后，在15个工作日内到账。</p>
                        <p>4.如有疑问请拨打电话028-9669999。</p>
                    </div>
				</div>
			)
        }
        componentDidMount  (){
            // if(getUserData.loading==false){
            //     dispatch({
            //         type:'getUserData/getUserCard'
            //     })
            //     dispatch({
            //         type:'getUserData/getBalance'
            //     })
            // }
        }
        componentWillUnmount(){
            getUserData.loading=false;
        }
	}	
	return <Withdrawals />
};
export default connect(({ getUserData }) => ({
    getUserData
  }))(Withdrawals); 