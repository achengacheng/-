import React from 'react';
import styles from '../../../style/mine/myPage.css';
import ChaPop from '../../../components/PublicComponents/ChaPop';//单行/多行提示语

const GoodsMes = ({ GoodsMesData,go,orderBubble,shoppingCartBubble }) => {
	let hintFun;
	/*待付款气泡提示数*/
	if(Number(orderBubble.waitPay).toString().length>=3){
		GoodsMesData[1].hint = "···"
	}else{
		GoodsMesData[1].hint = Number(orderBubble.waitPay);
	}
	/*待收货气泡提示数*/
	if(Number(orderBubble.waitReceive).toString().length>=3){
		GoodsMesData[2].hint = "···"
	}else{
		GoodsMesData[2].hint = Number(orderBubble.waitReceive);
	}
	/*待评价气泡提示数*/
	if(Number(orderBubble.waitComment).toString().length>=3){
		GoodsMesData[3].hint = "···"
	}else{
		GoodsMesData[3].hint = Number(orderBubble.waitComment);
	}
	/*购物车气泡提示数*/
	if(Number(shoppingCartBubble).toString().length>=3){
		GoodsMesData[9].hint = "···"
	}else{
		GoodsMesData[9].hint = Number(shoppingCartBubble);
	}
	class GoodsMes extends React.Component {
		render(){
			return (
				<div className={ styles.GoodsMesMain }>
					<ul className={ styles.GoodsMesContainer }>
						<span></span>
						{GoodsMesData.map(function(item, index) {
						    return 	<li key={index} onClick={() => this.checkIcon(item.to,item.index)}>
								    			<div>
								    				<img src={item.src} alt={item.type}/>
								    				<i className={ `${styles.msgHint} ${item.hint!==0?styles.hasMsgHint:''}` }>{item.hint>9?'9+':item.hint}</i>
								    			</div>
								    			<p>{item.type}</p>
								    		</li>
							},this)
						}
					</ul>
					<ChaPop HintWords={ this.HintWords }/>
				</div>
			)
		}
		/*简单信息提示框*/
		HintWords(popDom){
			hintFun = popDom.Popfun
		}
		/*点击跳转方法*/
		checkIcon(to,index){
			if(to===""){
				hintFun('该功能正在开发中')
			}else{
				go(to,index)
			}
		}
	}
	return <GoodsMes />
}

export default GoodsMes;
