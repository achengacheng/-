import React from 'react';
import { connect } from 'dva';
import $ from 'jquery';
import { Link } from 'dva/router';
import Header from '../../components/PublicComponents/HeaderReturn'
import styles from '../../style/shopping/PlaceOrder.css'
import MaskLayer from '../../components/PublicComponents/MaskLayer'
import ChaPop from '../../components/PublicComponents/ChaPop'

const PaymentOrder=({dispatch,PlaceOrderData,location})=>{
	console.log(123123,PlaceOrderData)
	let hour=0,minute=0,second=0,_this;
	function walletPay(datas,d_this) { //支付
		dispatch({
			type:'PlaceOrderData/walletPay',
			data:datas,
			d_this:d_this
		})
	}
	function goPayfinish(datas) {//支付完成跳转
		dispatch({
			type:'PlaceOrderData/goPayfinish',
			data:datas
		})
	}
	function child_state_fun(){//模态窗
		$('#maskLayer').hide()
	}
	let Popfun  //弹窗调用通道
	function HintWords(popDom){
		Popfun=popDom.Popfun
	}
	function payresFun(msg,typs){//支付回调
		console.log(msg,typs)
		Popfun(msg)
		setTimeout(function(){
			if(typs){
				sessionStorage.removeItem("OrderData")				
				$('#maskLayer').hide()
				$('#waitPay').show()
				setTimeout(function(){
					 window.location.href='#/PaySuccess?WXPAY#'+PlaceOrderData.payOrder.orderNo
				},3000)					
			}
		},1000)
		
	}
	function WeixinPay(data){ //微信支付前获取权限		
		dispatch({
			type:'PlaceOrderData/WeixinPay',
			datas:data,
			payresFun:payresFun
		})
	}
	
	function getTime(){ //订单支付倒计时
		if(PlaceOrderData.payOrder){
			let zTime=PlaceOrderData.payOrder.limitSecond;
			var setTime=setInterval(function(){
				if(zTime>0){
					zTime--
					hour = Math.floor(zTime/3600);
	            	minute = Math.floor(zTime/60) % 60;
	            	second = zTime % 60;
	            	$('#odTime').text('请在'+hour+'小时'+minute+'分'+second+'秒内完成支付')
				}else{
					clearInterval(setTime)
				}
				
			},1000)
		}
	}
	
	class PaymentOrder extends React.Component{
		constructor(props){
			super(props);
			this.waitPayFun=this.waitPayFun.bind(this)
		}
		waitPayFun(iop){//支付等待
			if (iop===0) {
				$('#maskLayer').hide()
				$('#waitPay').show()
				setTimeout(function(){
					$('#waitPay').hide()
					goPayfinish(PlaceOrderData.payOrder.orderNo)
				},3000)
			}else{
				Popfun(iop)
				$('#maskLayer').hide()
			}
		}
		render(){
			return(	<div className={styles.payorder_box}>
						<Header left_show='1' head_title='支付订单'/>
						<div className={styles.payorderhead_box}>
							<img src="./src/assets/PaySuccess.png" alt=""/>
							<p>订单提交成功</p>
							<div id="odTime"></div>
						</div>
						<div className={styles.payordertext_box}>
							<div>订单编号 : {PlaceOrderData.payOrder?PlaceOrderData.payOrder.orderNo:""}</div>
							<div>订单状态 : <span>待付款</span></div>
							<div>应付金额 : <span>¥ {PlaceOrderData.payOrder?PlaceOrderData.payOrder.shouldPay.toFixed(2):""}</span></div>
						</div>
						<div className={styles.payorderway_box}>
							<div>请选择支付方式</div>
							<ul className={styles.payorderway}>
								
								<li className={styles.payorderway_wx} id="weixinPay">
									<div>
										<img src="./src/assets/payway_wx.png" alt=""/>
										<span>微信支付</span>
									</div>
									<i></i>
								</li>
								
								<li className={styles.payorderway_wx} id="walletPay">
									<div>
										<img src="./src/assets/payway_lq.png" alt=""/>
										<span>余额支付</span>
									</div>
									<i></i>
								</li>							
							</ul>
						</div>
						<div id="maskLayer" style={{'display':'none'}}>
							<MaskLayer disappear={child_state_fun}/>
							<div id="Label_Box" className={styles.Label_Box}>
								<h3>验证登录密码</h3>
								<input type="password" placeholder="请输入登录密码"/>
								<div className={styles.Label_Boxdiv}>
									<div id="Label_Boxconfirm">确认</div>
									<div id="Label_Boxclear">取消</div>
								</div>
							</div>		
						</div>
						<ChaPop HintWords={HintWords}/>
						<div id="waitPay" className={styles.waitPayBox}>
							<img src='./src/assets/waitPay.gif'/>
							<p>正在获取支付结果,请稍后...</p>
						</div>													
					</div>)
		}
		componentWillMount(){
			_this=this
		}
		componentDidMount(){
			$('#odTime').text('请在'+hour+'小时'+minute+'分'+second+'秒内完成支付')
			getTime()//订单倒计时
			$('#walletPay').click(function(){ //钱包支付验证密码
				$('#Label_Box input').val('')
				$('#maskLayer').show()
				$('#maskbox').css({
					'display':'block'
				})
				$('body,html').css({
					'overflow':'hidden'
				})	
			}) 
			$('#weixinPay').click(function() { //微信支付
				let data={}
				data.orderNo=PlaceOrderData.payOrder.orderNo 
				data.IP='192.168.0.1'
				if(data.orderNo){
					WeixinPay(data)
				}else{
					alert("没有orderNo")
				}
				
			});
			$('#Label_Boxclear').click(function() {//验证密码弹窗取消按钮
				$('#maskLayer').hide()
			});	
			$('#Label_Boxconfirm').click(function(){//验证密码弹窗确认按钮
				if($('#Label_Box input').val()===''||$('#Label_Box input').val()===undefined||$('#Label_Box input').val()===null){
					Popfun("请输入登录密码!")
				}else{
					let p_data={}
					p_data.orderNo=PlaceOrderData.payOrder.orderNo;
					p_data.userId=sessionStorage.getItem('id');
					p_data.password=$('#Label_Box input').val()
					walletPay(p_data,_this)
					if(false){
						$('#maskLayer').hide()
						$('#Label_Box input').css('display','none')	
					}
				}
				
				
			})
		}
		// <li className={styles.payorderway_zfb}>
		// 							<div>
		// 								<img src="./src/assets/payway_zfb.png" alt=""/>
		// 								<span>支付宝支付</span>
		// 							</div>
		// 							<i></i>
		// 						</li>
		// <li className={styles.payorderway_yhk}>
		// 							<div>
		// 								<img src="./src/assets/payway_yhk.png" alt=""/>
		// 								<span>银行卡支付</span>
		// 							</div>
		// 							<i></i>
		// 						</li>
	}
	return <PaymentOrder/>
}
export default connect(({ PlaceOrderData }) => ({
    PlaceOrderData,
  }))(PaymentOrder);