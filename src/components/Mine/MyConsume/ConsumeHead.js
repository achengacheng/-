import React from 'react';
import styles from '../../../style/mine/MyConsume/ConsumePage.css';
import { connect } from 'dva';
import { Link } from 'dva/router'
import ChaPop from '../../../components/PublicComponents/ChaPop'

const ConsumeHead = ({consumeData,dispatch}) => {
    let Popfun  //弹窗调用通道
        function HintWords(popDom){
            Popfun=popDom.Popfun
        }
        function getCode(data){//弹窗使用
            Popfun(data)
        }
	class ConsumeHead extends React.Component{
        noDone(){
            Popfun("该功能正在开发中");
        }
		render () {
			return (
                <div className={styles.headBox}>
                    <div className={styles.headBg}>
                        {/* <header className={styles.headerReturn_box} >
                            <i className={styles.headerReturn_back}></i>
                            <p className={styles.headerReturn_text}>我的消费记录</p>
                            <div className={styles.headerReturn_rightbox}>
                            <Link to="/mypage/ConsumePage/ConsumeIntroduce">
                                <i className={styles.headerReturn_right_explain}></i>
                            </Link>
                            </div>
                        </header> */}
                        <div className={styles.moneyBox}>
                            <div className={styles.moneyMsg}>
                                <p>我的消费总额(元)</p>
                                <p>{consumeData.res_all.total}</p>
                            </div>
                            <div className={styles.balanceBtn} onClick={()=>this.noDone()}>
                                <div>
                                    考核记录
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className={styles.balanceTip}>
                        下次收益时间：2017-03-21 23:00:00
                    </div> */}
                    <div className={styles.numberBox}>
                        {/* <Link to="/mypage/ConsumePage/EarningsRecord"> */}
                            <div className={styles.moneyBtn}>
                                <p>上次收益(元)</p>
                                <p>0.00</p>
                            </div>
                        {/* </Link> */}
                        <div className={styles.block}></div>
                        {/* <Link to="/mypage/ConsumePage/EarningsRecord"> */}
                            <div className={styles.moneyBtn}>
                                <p>累计消费收益(元)</p>
                                <p>0.00</p>
                            </div>
                        {/* </Link> */}
                    </div>
                    <ChaPop HintWords={HintWords}/>
                </div>
			)
        }
        componentDidMount (){

        }
	}
	return <ConsumeHead />
};
export default connect(({ consumeData }) => ({
    consumeData
}))(ConsumeHead);
