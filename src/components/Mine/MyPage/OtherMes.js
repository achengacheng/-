import React from 'react';
import styles from '../../../style/mine/myPage.css';
import ChaPop from '../../../components/PublicComponents/ChaPop';//单行/多行提示语

const OtherMsg = ({ go,ConsEarnData,ServiceData,redPacketBubble }) => {
	let hintFun;
	/*粮票气泡提示数*/
	if(Number(redPacketBubble).toString().length>=3){
		ConsEarnData[1].hint = "···"
	}else{
		ConsEarnData[1].hint = Number(redPacketBubble)
	};
	class OtherMsg extends React.Component{
		render(){
			return (
				<div className={ styles.myPageOtherMes } >					
					<p></p>
					{ConsEarnData.map(function(item, index) {
					    return 	<div className={ styles.myPageSingeMsg } key={index} onClick={() => go(item.to)}>
									<div>
										<img src={item.src} alt={item.type}/>
										<p>{item.type}</p>
									</div>
									<div>
										<span></span>
										<i className={ styles.myPageLeftArr }></i>
										<i className={ `${styles.msgHintOther} ${item.hint!==0?styles.hasMsgHint:''}` }>{item.hint>9?'9+':item.hint}</i>
									</div>
									<span></span>
								</div>
						})
					}
					{ServiceData.map(function(item, index) {
					    return 	<div className={ styles.myPageSingeMsg } key={index} onClick={() => go(item.to)}>
									<div>
										<img src={item.src} alt={item.type}/>
										<p>{item.type}</p>
									</div>
									<div>
										<span>{item.msg}</span>
										<i className={ styles.myPageLeftArr }></i>
									</div>
									<span></span>
								</div>
						})
					}
					<ChaPop HintWords={ this.HintWords }/>
				</div>
			)
		}
		/*简单信息提示框*/
		HintWords(popDom){
			hintFun = popDom.Popfun
		}
		/*点击跳转方法*/
		// <div className={ styles.myPageSingeMsg } onClick={() => this.checkIcon()}>
		// 				<div>
		// 					<img src='src/assets/myPageJoinShare.png' alt="加盟共享"/>
		// 					<p>加盟共享</p>
		// 				</div>
		// 				<div>
		// 					<span>推荐好友入驻奖励积分！</span>
		// 					<i className={ styles.myPageLeftArr }></i>
		// 				</div>
		// 			</div>
		// <p></p>
		checkIcon(){
			hintFun('该功能正在开发中')
		}
	}
	return <OtherMsg />
}

export default OtherMsg;
