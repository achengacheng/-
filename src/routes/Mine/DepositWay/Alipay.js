import React from 'react';
import styles from '../../../style/mine/DepositWay/Alipay.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import { connect } from 'dva';
import ChaPop from '../../../components/PublicComponents/ChaPop'
const Alipay = ({dispatch,getUserData}) => {
	let Popfun  //弹窗调用通道
      function HintWords(popDom){
          Popfun=popDom.Popfun
      }
      function getCode(data){//弹窗使用
          Popfun(data)
      }
	class Alipay extends React.Component{
		constructor(props){
			super(props);
			this.state={
				defaultData:this.getUrl('isDefault').isDefault=='true'?true:false
			}
		}
		cb(msg,isRight){
			Popfun(msg)
			if(isRight){
				setTimeout(() => {
					window.history.go(-1)
				}, 1000);
			}
        }
		getUrl() {  
			var qs = window.location.href.split("?")[1];
			var  args = {}, 
				items = qs.length ? qs.split("&") : [], 
				item = null,
				len = items.length;
			for(var i = 0; i < len; i++) {
			  item = items[i].split("=");
			  var name = decodeURIComponent(item[0]),
				value = decodeURIComponent(item[1]);
			  if(name) {
				args[name] = value;
			  }
			}
			return args;
		}
		changeDefault(){
			let str=!this.state.defaultData
			this.setState({
				defaultData:str
			})
		}
		changeAliPay(){
			let isDe;
			if(this.state.defaultData==true){
				isDe=1
			}else{
				isDe=0
			}
			let obj={
				cardNO:this.refs.cardNO.value,
				cartName:this.refs.cartName.value,
				isDefault:isDe,
				id:this.getUrl('id').id
			}
			dispatch({
				type:'getUserData/changeAliPay',
				data:obj,
				cb:(msg,isRight)=>this.cb(msg,isRight)
			})
		}	
		render () {
			return (
				<div>
                    <Header head_title='修改支付宝' left_show='1'/>
					<ChaPop HintWords={HintWords}/>
                    <div className={styles.AlipayWrap}>
						<div className={styles.AlipayBox}>
							<p>
								<span>真实姓名</span>
								<input type="text" defaultValue={this.getUrl('name').name} placeholder="请输入您的支付宝真实姓名" ref='cartName'/>
							</p>
							<p>
								<span>支付宝账号</span>
								<input type="text" defaultValue={this.getUrl('cardNO').cardNO} placeholder="请输入您的支付宝真实姓名" ref='cardNO'/>
							</p>
						</div>
						<div className={styles.AlipayDefault} onClick={()=>this.changeDefault()}>
							{
								this.state.defaultData==true?<img src="/src/assets/Mine-check-red.png" alt=""/>:<img src="/src/assets/Mine-pay-nocheck.png" alt=""/>
							}
							<p>设置为默认提现方式</p>
						</div>
						<div className={styles.AlipayBtn} onClick={()=>this.changeAliPay()}>
							确定
						</div>
						<div className={styles.ConsumeContent}>
                            <div>温馨提示</div>
                            <p>1.如因填写帐号信息不正确导致提现失败，艾家公社概不负责。 </p>
                            {/* <p>2.帐号信息一经绑定不可修改，如绑定帐号信息填写错误请联系客服。 </p> */}
                            <p>2.客服电话：028-9669999</p>
                        </div>
					</div>
				</div>
			)
		}
		componentDidMount(){
        }
	}	
	return <Alipay />
};
export default connect(({ getUserData }) => ({
    getUserData
  }))(Alipay);   