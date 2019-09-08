import React from 'react';
import { connect } from 'dva';
import $ from 'jquery';
import Header from '../../components/PublicComponents/HeaderReturn'
import styles from '../../style/shopping/PlaceOrder.css'
import { Link } from 'dva/router';
import FxPop from '../../components/PublicComponents/FxPop'
import ChaPop from  '../../components/PublicComponents/ChaPop'
import ButtonPop from '../../components/PublicComponents/ButtonPop'
const PaySuccess=({dispatch,PlaceOrderData,location})=>{
	let ThisData=PlaceOrderData.paySuccessData.data
	let orderid,fxPopfun,standardTab
	console.log(PlaceOrderData)
	if(ThisData){
		orderid=ThisData.shareMsg.link.split('=')[1]
	}

	function shareOrder(datas) {
		dispatch({
			type:'PlaceOrderData/shareOrder',
			data:datas,
			funs:standardTab
		})			
	}	
	function FxDomFun(fxDom) {//分享指引
		fxPopfun=fxDom.fxPopfun
	}
	function resFxFun(msg,typs) {//分享完成回调
		standardTab(msg)
		fxPopfun(false)
		if(typs){
			shareOrder(ThisData.redPacket.redPackets)
		}
	}
	function wxShareFun(datas) {//分享
		dispatch({
			type:'PlaceOrderData/wxShareFun',
			data:datas,
			fxFun:resFxFun
		})
	}
	function HintWords(popDom){ //提示语
		standardTab = popDom.Popfun
	}
	function paySuccess(){
		let orderId=location.hash.substring(1)
		dispatch({
			type:"PlaceOrderData/PaySuccessFun",
			data:orderId
		})
	}
	function bupop(){
		if(ThisData.shareMsg){
			wxShareFun(ThisData.shareMsg)
			fxPopfun(true)
		}else{
			standardTab('晒单失败,您可以打开我的粮票进行晒单操作!')
		}		
	}
	function changepupText() {
		if(PlaceOrderData.paySuccessData){
			if(PlaceOrderData.paySuccessData.success){
				if(PlaceOrderData.paySuccessData.data.redPacket.num>0){
					if(PlaceOrderData.shandanType){
						window.location.href='#/'
					}else{
						dispatch({
							type:'PlaceOrderData/changepupText',
							data:PlaceOrderData.paySuccessData.data.redPacket.num
						})
					}					
				}else{
					window.location.href='#/'
				}
			}
		}

	}
	function levePop() {
		window.location.href='/'
	}
	class PaySuccess extends React.Component{
		render(){
			if(PlaceOrderData.paySuccessData){
				if(PlaceOrderData.paySuccessData.success){
					return(	<div className={styles.PaySuccess_box}>	
								<Header left_show='1' head_title='支付完成' header_ids='10' custom={{id:4,val:changepupText}}/>
								<div className={styles.payorderhead_box}>
									<img src="./src/assets/PaySuccess.png" alt=""/>
									<p>订单支付成功</p>						
								</div>
								<div className={styles.PaySuccesstext_box}>							
									<div>支付方式 : <span>{ThisData?ThisData.payType.msg:''}</span></div>
									<div>支付金额 : <span>¥ {ThisData?ThisData.shouldPay:''}</span></div>
								</div>
								<div className={styles.PaySuccesshb_box}>
									{ThisData?ThisData.redPacket.num?
										<div className={styles.PaySuccesshb_bg}>
											<div className={styles.PaySuccesshb_text}>
												<p>恭喜你获得了{ThisData.redPacket.num}笔广告费</p>
												<div><span>¥ </span>{ThisData.redPacket.total.toFixed(2)}</div>
											</div>
											{PlaceOrderData.shandanType?<div className={styles.PaySuccesshb_btn}>已晒单</div>:<div id="fenxBtn" className={styles.PaySuccesshb_btn}>晒单领取</div>}
												
										</div> :"":""}							
										<div  className={styles.PaySuccessbtn_box}>
											<Link to={'/myPage/MyOrder'}><div>查看订单</div></Link>
											<Link to='/'><div>回到首页</div></Link>
										</div>
								</div>
								<div className={styles.PaySuccessTs_box}>
									<h3>温馨提示</h3> 
									<p>艾家公社不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作</p>
								</div>
								<ChaPop HintWords={ HintWords }/>
								<FxPop FxDomFun={FxDomFun}/>
								<ButtonPop ButtonHint={PlaceOrderData.pupText} confirm={bupop} cancel={levePop} TrueText={{one:'继续晒单',two:'确认离开'}}/>
							</div>)
				}else{
					return(	<div className={styles.PaySuccess_box}>	
								<Header left_show='1' head_title='支付失败' header_ids='10'/>
								<div className={styles.payorderhead_box}>
									<img src="./src/assets/payFile.png" alt=""/>
									<p style={{"color":'#ff0f0f'}}>暂未获得支付结果</p>						
								</div>					
								<div className={styles.PaySuccesshb_box}>
									<p>·请点击下方按钮重试,或者稍后查看订单详情。<br/><span>·如果支付一直未成功请联系客服。</span></p>
									<div  className={styles.PaySuccessbtn_box}>
										<Link to={'/mypage/MyOrder'}><div>查看订单</div></Link>
										<Link to='/PaySuccess'><div>重新试试</div></Link>
									</div>
								</div>
								<ChaPop HintWords={ HintWords }/>
								<FxPop FxDomFun={FxDomFun}/>					
						</div>)
				}
			}else{
				return (<div></div>)
			}
			
		}
		componentDidMount(){
			localStorage.setItem('OrderIndex',2)		
			$('.'+styles.PaySuccess_box).css({'height':function(){
				return $(window).height()-150+'px'
			},'background':'#fff'})

			$('#fenxBtn').click(function(event) {//点击晒单				
				if(ThisData){
					wxShareFun(ThisData.shareMsg)
					fxPopfun(true)
				}
				
			});

		}
		componentWillUnmount(){
			$('body,html').css({
				'overflow':'',
				'height':''
			})
		}
	}
	return <PaySuccess/>
}
export default connect(({ PlaceOrderData }) => ({
    PlaceOrderData,
  }))(PaySuccess);