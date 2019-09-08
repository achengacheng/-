import React from 'react';
import styles from '../../../style/mine/MyOrder/MyOrder.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import OrderBanner from '../../../components/Mine/MyOrder/OrderBanner';
import { Link } from 'dva/router'
import { connect } from 'dva';
import ChaPop from '../../../components/PublicComponents/ChaPop'
import ButtonPop from '../../../components/PublicComponents/ButtonPop'
import {CopyToClipboard} from 'react-copy-to-clipboard';

const OrderDetails = ({MyOrderData,dispatch}) => {
		const ButtonHint3 = {
			title:"温馨提示",//标题
        	explain:"是否确定删除？",
			type:2,//按钮数1/2
			hide:true//是否展示
		}
		let Popfun  //弹窗调用通道
			function HintWords(popDom){
				Popfun=popDom.Popfun
			}
			function getCode(data){//弹窗使用
				Popfun(data)
			}
		//URL 参数获取

		function aaa(){  
			var qs = window.location.href.split("?")[1];
			var  args = {};
			if(qs){
				var items = qs.length ? qs.split("&") : []
				var item = null
				var len = items.length;
			}
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
		//时间格式转换
		function secondToDate(result) {
            var h = Math.floor(result / 3600);
            var m = Math.floor((result / 60 % 60));
			var s = Math.floor((result % 60));
            return result = h + "小时" + m + "分" + s + "秒";
		}
		const ButtonHint1 = {
			title:"温馨提示",//标题
        	explain:"是否确定删除？",
			type:2,//按钮数1/2
			hide:false//是否展示
		}
		const ButtonHint2 = {
			title:"温馨提示",//标题
        	explain:"是否确认收货？",
			type:2,//按钮数1/2
			hide:false//是否展示
		}
	class OrderDetails extends React.Component{
		constructor(props){
			super(props);
			this.state={
				detailData:MyOrderData.detail_datas,
				copied:false
			}
		}
		render () {
			let that=this;
			console.log(this.state.detailData.goods,222)
			if(MyOrderData.loadingDetail==true){
				return (
					<div>
						<Header head_title='订单详情' left_show='1' right_icon='2'/>
						<ChaPop HintWords={HintWords}/>
						<ButtonPop ButtonHint={MyOrderData.ButtonHint} confirm={()=>this.consoles(this.state.detailData.id)} cancel={()=>this.cancelWay()}/>
						<OrderBanner banner={this.state.detailData.status.code} limitTime={this.state.detailData.limitSecond} limitWat={secondToDate}/>
						{
							(function(){
								if(that.state.detailData.expressTrace){
									return(
										<Link to={'/mypage/MyOrder/OrderTail?id='+aaa().id}>
											<div className={styles.orderLogistics}>
												<div className={styles.orderLogs}>
													<img src="/src/assets/Mine-had-send.png" alt=""/>
													<div>
														<div>{that.state.detailData.expressTrace.description}</div>
														<div>{that.state.detailData.expressTrace.time}</div>
													</div>
												</div>
												<img src="/src/assets/Mine-back.png" alt=""/>
											</div>
										</Link>	
									)
								}
							})()
						}
						<div className={styles.orderGoodsBox}>
							<div className={styles.orderGoodsName}>商品信息</div>
							<div>
								{
									this.state.detailData.goods.map(function(item,index){
										if(!item.hasComment){
											//有商品还没有评价
											sessionStorage.setItem('EvaCIndex','ok');
										}
										return(
											<Link to={'/GoodsPage/'+item.goodsId} key={index}>
												<div className={styles.orderGoodsList}>
													<img src={item.picture} alt=""/>
													<div className={styles.orderGoodsContent}>
														<div>
															<p>{item.goodsName}</p>
														</div>
														<div className={styles.orderGoodsColorG}>
															<div>{item.sku}</div>
															<div className={styles.ordertext}><span className={styles.orderSpan}>X</span><span>{item.count}</span></div>
														</div>
														<div className={styles.orderGoodsColorG}>￥{item.goodsTotal}</div>
													</div>
												</div>
												{
													item.leaveWord?<div className={styles.tipsWords}><span>留言:</span>{item.leaveWord}</div>:null
												}
											</Link>	
										)
									})
								}
							</div>
						</div>
						<div className={styles.orderName}>
						{
							(function(){
								if(that.state.detailData.dispatchType===0){
									return(
										<div>
											<div>
												<i>收货人:{that.state.detailData.receiveInfo.name}</i>
												<i className={styles.orderTel}>{that.state.detailData.receiveInfo.phone}</i>
											</div>
											<div>地址:{that.state.detailData.receiveInfo.location}</div>
										</div>
									)
								}else{
									return(
										<div className={styles.sendWay}>
											配送方式:线下自提
										</div>
									)
								}
							})()
						}
						</div>
						{
							(function(){
								if(that.state.detailData.redPocket){
									return(
										<Link to='/mypage/AdPage'>
											<div className={styles.orderAd}>
												<div>
													<p>本单共获取{that.state.detailData.redPocket.num}张粮票</p>
													<p>粮票总额:<span className={styles.orderPrice}>￥{that.state.detailData.redPocket.total}</span></p>
												</div>
												<img src="/src/assets/Mine-back.png" alt=""/>
											</div>
										</Link>
									)
								}
							})()
						}
						
						<div className={styles.orderPriceMsg}>
							<div>订单信息</div>
							<div className={styles.orderPriceAll}>
								<div>
									<div>商品合计:</div>
									<div>￥{this.state.detailData.totalPrice}</div>
								</div>
								<div>
									<div>运费:</div>
									<div>￥{this.state.detailData.transPrice}</div>
								</div>
								{/* <div>
									<div>配送方式:</div>
									<div>快递配送/线下自提</div>
								</div> */}
							</div>
						</div>
						{
							(function(){
								if(that.state.detailData.status.code==1){
									return(
										<div className={styles.orderNumCard}>
											<p>
												<i>订单编号:{that.state.detailData.orderNo}</i>
												<CopyToClipboard text={that.state.detailData.orderNo}
													onCopy={() => that.fuzhi()}>
													<i className={styles.orderFz}>复制</i>
												</CopyToClipboard>
											</p>
											<p>提交时间:{that.state.detailData.orderTime}</p>
											{/* <p>支付方式:{that.state.detailData.payType}</p> */}
										</div>
									)
								}else if(that.state.detailData.status.code==2||that.state.detailData.status.code==3||that.state.detailData.status.code==4){
									return(
										<div className={styles.orderNumCard}>
											<p>
												<i>订单编号:{that.state.detailData.orderNo}</i>
												<CopyToClipboard text={that.state.detailData.orderNo}
													onCopy={() => that.fuzhi()}>
													<i className={styles.orderFz}>复制</i>
												</CopyToClipboard>
											</p>
											<p>提交时间:{that.state.detailData.orderTime}</p>
											<p>支付方式:{that.state.detailData.payType}</p>
											<p>实付金额:<span>￥{that.state.detailData.realPay}</span></p>
											<p>付款时间:{that.state.detailData.payTime}</p>
											<p>发货时间:{that.state.detailData.sendTime?that.state.detailData.sendTime:'无'}</p>
											<p>收货时间:{that.state.detailData.finishTime?that.state.detailData.finishTime:'无'}</p> 
										</div>
									)
								}else if(that.state.detailData.status.code==5){
									return(
										<div className={styles.orderNumCard}>
											<p>
												<i>订单编号:{that.state.detailData.orderNo}</i>
												<CopyToClipboard text={that.state.detailData.orderNo}
													onCopy={() => that.fuzhi()}>
													<i className={styles.orderFz}>复制</i>
												</CopyToClipboard>
											</p>
											<p>提交时间:{that.state.detailData.orderTime}</p>
										</div>
									)
								}
							})()
						}
						{
							(function(){
								if(that.state.detailData.status.code==1){
									return(
										<div className={styles.orderBtnsPay}>
											<p>应付金额:<i  className={styles.orderPrice}>￥{that.state.detailData.realPay}</i></p>
											<div>
												<div onClick={()=>that.cancelOrder(that.state.detailData.id)}>取消订单</div>
												<div className={styles.orderCurBtn}><Link to='/PaymentOrder' onClick={()=>that.buyaAgain(that.state.detailData.orderNo,that.state.detailData.totalPrice,that.state.detailData.limitSecond,that.state.detailData.redPocket)}>立即付款</Link></div>
											</div>
										</div>
									)
								}else if(that.state.detailData.status.code==2){
									if(that.state.detailData.returnBtn==='apply'){
										return(
											<Link to={'/mypage/AfterSaleServicePage/AfterRefund?id='+that.state.detailData.id+'&name='+that.state.detailData.receiveInfo.name+'&phone='+that.state.detailData.receiveInfo.phone}>
												<div className={styles.orderBtns}>
													<div className={styles.orderCurBtn}>申请退款</div>
												</div>
											</Link>
										)
									}else{
										return(
											<div className={styles.orderBtns}>
												<div className={styles.orderCurBtn1}>申请退款</div>
											</div>
										)
									}
									
								}else if(that.state.detailData.status.code==2||that.state.detailData.status.code==3){
									return(
										
											<div className={styles.orderBtns}>
												{/* <Link to={'/mypage/AfterSaleServicePage/AfterRefund?id='+that.state.detailData.id+'&name='+that.state.detailData.receiveInfo.name+'&phone='+that.state.detailData.receiveInfo.phone}>
													<div>申请退款</div>
												</Link> */}
												<Link to={'/mypage/MyOrder/OrderTail?id='+aaa().id}>
													<div>查看物流</div>
												</Link>
												<div className={styles.orderCurBtn} onClick={()=>that.alertOrder(2)}>确认收货</div> 
											</div>
									)
								}
								else if(that.state.detailData.status.code==4){
									return(
										<div className={styles.orderBtns}>
											<div onClick={()=>that.alertOrder(1)}>删除订单</div>
											{/* <Link to={'/mypage/AfterSaleServicePage/AfterRefund?id='+that.state.detailData.id}> */}
											<Link to='/mypage/AfterSaleServicePage/AfterIndex'>
											<div>申请售后</div>
											</Link>
											<Link to='/mypage/EvaPage'>
											{
												(function(){
													if(sessionStorage.getItem('EvaCIndex')==='ok'){
														console.log(11111)
														sessionStorage.setItem('EvaIndex',1)  
														return(
															<div>评价商品</div>
														)
													}else{
														console.log(2222)
														sessionStorage.setItem('EvaIndex',2)
														return(
															<div>查看评价</div>
														)
													}
												})()
											}
												
											</Link>
											{/* <Link to={'/GoodsPage/'+that.state.detailData.id}>
												<div className={styles.orderCurBtn}>再次购买</div>
											</Link> */}
										</div>
									)
								}else if(that.state.detailData.status.code==5){
									return(
										<div className={styles.orderBtns}>
											<div onClick={()=>that.alertOrder(1)}>删除订单</div>
											{/* <div className={styles.orderCurBtn}>重新购买</div> */}
										</div>
									)
								}
							})()
						}
						{/* <div className={styles.orderBtns}>
							<div>删除订单</div>
							<div>申请售后</div>
							<div>评价商品</div>
							<div className={styles.orderCurBtn}>再次购买</div>
						</div> */}
					</div>
				)
			}else{
				return(
					<div></div>
				)
			}
		}
		//复制提示语
		fuzhi(){
			Popfun("复制成功!");
		}
		//获取订单详情
		geiOrderDetail(){
            dispatch({
                type:'MyOrderData/getOrderDetail',
                id:aaa().id
            })
		}
		//选择弹窗类型
		alertOrder(type){
			MyOrderData.alertType=type;
			if(type==1){
				dispatch({
					type:'MyOrderData/popBtn',
					ButtonHint:ButtonHint1
				})
			}else if(type==2){
				dispatch({
					type:'MyOrderData/popBtn',
					ButtonHint:ButtonHint2
				})
			}
		}
		//取消订单
		cancelOrder(orderId,index){
            dispatch({
                type:'MyOrderData/cancelOrder',
                orderId:orderId
            })
		}
		//弹窗确认函数
		consoles(orderId){
			// 1删除订单，2确认订单
			if(MyOrderData.alertType==1){
				dispatch({
					type:'MyOrderData/deleteOrder',
					orderId:orderId
				})
			}else if(MyOrderData.alertType==2){
				dispatch({
					type:'MyOrderData/confirmOrder',
					orderId:orderId
				})
			}
		}
		//确认弹窗取消函数
		cancelWay(){
            dispatch({
                type:'MyOrderData/popBtn',
                ButtonHint:ButtonHint3
            })
		}
		//立即付款跳转函数
		buyaAgain(orderNo,price,time,redPocket){
            sessionStorage.setItem('OrderData',JSON.stringify({"orderNo":orderNo,"shouldPay":price,"limitSecond":time,"redPacketNum":redPocket}))
        }
		componentDidMount (){
			if(MyOrderData.cancelOrder==true){
                if(Popfun){
                    Popfun("取消成功!");
                }
                setTimeout(() => {
					window.history.go(-1); 
                    window.scrollTo(0,0)
                }, 1000);
                // this.state.orderList.splice(this.state.index,1);
                MyOrderData.cancelOrder=false
            }
            if(MyOrderData.deleteOrder==true){
				Popfun("删除成功!");
				setTimeout(() => {
					window.history.go(-1); 
				}, 1000);
                MyOrderData.deleteOrder=false
            }
            if(MyOrderData.confirmOrder==true){
				Popfun("确认成功!");
				// setTimeout(() => {
				// 	window.history.go(-1); 
				// }, 1000);
                MyOrderData.confirmOrder=false
            }
                
        }
		// componentWillMount(){
        //     if(MyOrderData.loadingDetail==false){
        //         this.geiOrderDetail(); 
		// 	} 
		// }
		componentWillUnmount(){
			MyOrderData.loadingDetail=false
			MyOrderData.loading=false
			MyOrderData.res_datas=[]
        }
	}	
	return <OrderDetails />
};
export default connect(({ MyOrderData }) => ({
    MyOrderData
  }))(OrderDetails);