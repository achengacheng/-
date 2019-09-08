import React from 'react';
import styles from '../../../style/mine/MyAdRate/AdRateDetails.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import { connect } from 'dva';
import $ from 'jquery';
import { Link } from 'dva/router'
import ChaPop from  '../../../components/PublicComponents/ChaPop'
import FxPop from '../../../components/PublicComponents/FxPop'

const AdRateDetails = ({adPageData,dispatch}) => {
	console.log(adPageData.aDshareMsg)
	// 获取URL参数方法
	function aaa() {  
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

    let standardTab,fxPopfun
	function HintWords(popDom){//提示语
		standardTab = popDom.Popfun
	} 
	function FxDomFun(fxDom) {//分享引导
		fxPopfun=fxDom.fxPopfun
	}
	function resFxFun(msg,typs) {//分享回调
		standardTab(msg)
		fxPopfun(false)
		if(typs){
			dispatch({
				type:'adPageData/shareOrders',
				id:sessionStorage.getItem('shareOrder')
			})
		}
	}
	function wxShareFun(datas){ //分享
		dispatch({
			type:'adPageData/wxShareFun',
			data:datas,
			fxFun:resFxFun
		})
	}
	class AdRateDetails extends React.Component{
		constructor(props){
			super(props);
			this.state={
				detailData:adPageData.detail_datas.data,
				detailGoods:adPageData.detail_datas.goods
			}
		}
		render () {
			let that=this;
		if(adPageData.detail_load==true){
			return (
				<div>
                    <Header head_title='粮票详情' left_show='1' right_icon='2' header_ids="5"/>
                    <div className={styles.LpWrap}>
                        <div>
							<div className={styles.AbDiv}>
								<div>
									<p>购物粮票</p>
									<p  className={styles.AbP}>{this.state.detailData.status}</p>
								</div>
								<p><span>￥</span>{this.state.detailData.money}</p>
							</div>
						</div>
                    </div> 
					{/* {
						this.state.detailGoods.map(function(item,index){
							return(
								<div className={styles.DeGoodsHead}>
									<img src={item.picture} alt=""/>
									<div>
										<p>雀巢 NESCAFE DOLCE GUSTO 德龙 胶囊咖啡机EDG250</p>
										<p className={styles.DeGoodsSize}>颜色/规格</p>
										<p className={styles.DeGoodsPirce}>单价:￥200.3</p>
									</div>
								</div>
							)
						})
						
					} */}
					<div className={styles.DeGoodsHead}>
						<img src={this.state.detailData.goods.picture} alt=""/>
						<div>
							<p>{this.state.detailData.goods.goodsName}</p>
							<p className={styles.DeGoodsSize}>{this.state.detailData.goods.sku}</p>
							<p className={styles.DeGoodsPirce}>单价:￥{this.state.detailData.goods.price}</p>
						</div>
					</div>
					<Link to={"/mypage/MyOrder/OrderDetails?id="+this.state.detailData.orderId}>
						<div className={styles.DeGoodsOrder}>
							<div>
								<p className={styles.DeGoodsOrderp}>关联订单：{this.state.detailData.orderNo}</p>
								<p>订单状态：{this.state.detailData.orderStatus}</p>
							</div>
							<img src="/src/assets/Mine-back.png" alt=""/>
						</div>
					</Link> 
					<div className={styles.DeGoodsContent}>
						<div>
							<p>获取时间：{this.state.detailData.obtainTime?this.state.detailData.obtainTime:'无'}</p>
							<p>晒单时间：{this.state.detailData.shareTime?this.state.detailData.shareTime:'无'}</p>
							<p>收货时间：{this.state.detailData.receiveTime?this.state.detailData.receiveTime:'无'}</p>
							<p>入账时间：{this.state.detailData.accountTime?this.state.detailData.accountTime:'无'}</p>
						</div>
						
					</div> 
					<p className={styles.DeGoodsExplain}>
						粮票说明：下单付款后即可获取商品粮票，晒单后粮票进入冻结期，相关订单确认收货后7天内无售后申请则粮票入账到余额。
					</p>
					<div className={styles.DeGoodsBtn}>
					{
						(function(){
							if(that.state.detailData.status==='已入账'){
								return(
									<div id='goAdrate'>再次晒单</div>
								)
							}else if(that.state.detailData.status==='待晒单'){
								return(
									<div id='goAdrate'>去晒单</div>
								)
								that.state.detailData.status==='待晒单'?<div id='goAdrate'>去晒单</div> :<div id='goAdrate'>再次晒单</div>
							}else if(that.state.detailData.status==='冻结中'&&that.state.detailData.orderStatus==='待收货'){
								return(
									<Link to={"/mypage/MyOrder/OrderDetails?id="+that.state.detailData.orderId}>
										<div>去确认收货</div>
									</Link>
								)
							}else{
								return(
									<Link to={"/mypage/MyOrder/OrderDetails?id="+that.state.detailData.orderId}>
										<div>查看订单</div>
									</Link>
								)
							}
						})()
					}
						{/* {this.state.detailData.status==='待晒单'?<div id='goAdrate'>去晒单</div> :<div id='goAdrate'>再次晒单</div>} */}
					</div> 
					<FxPop FxDomFun={FxDomFun}/>
					<ChaPop HintWords={ HintWords }/>
                </div>
			)
		}else{
			return(
				<div></div>
			)
		}		
			
		}
		componentDidMount  (){
   //          if(adPageData.detail_load==false){
   //              dispatch({
   //                  type:'adPageData/getAdDetail',
   //                  id:aaa().id
   //              })
			// }
			$('#goAdrate').click(function(event) {
				fxPopfun(true)
				if(adPageData.aDshareMsg){
					wxShareFun(adPageData.aDshareMsg)
				}				
			});
		}
		componentWillUnmount(){
			adPageData.res_datas=[];
            adPageData.detailData=[];
            adPageData.res_page=1;
        }
	}	
	return <AdRateDetails />
};
export default connect(({ adPageData }) => ({
    adPageData
  }))(AdRateDetails);