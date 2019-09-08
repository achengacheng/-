import React from 'react';
import styles from '../../../style/mine/MyOrder/MyOrder.css';
import { Link } from 'dva/router'
import { connect } from 'dva';
import ChaPop from '../../../components/PublicComponents/ChaPop'
import ButtonPop from '../../../components/PublicComponents/ButtonPop'
import DefaultPage from '../../../components/PublicComponents/DefaultPage'
import Loading from '../../PublicComponents/LoadingCom';

const OrderCard = ({choiceIndex,myPageData,listData,cancelOrders,popBtnsFn,popTypeD,loading,getDetail}) => {
    let Popfun  //弹窗调用通道
    function HintWords(popDom){
        Popfun=popDom.Popfun
    }
    function getCode(data){//弹窗使用
        Popfun(data)
    }
    const ButtonHint ={
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
    const ButtonHint3 = {
        title:"温馨提示",//标题
        explain:"是否确定取消订单？",
        type:2,//按钮数1/2
        hide:false//是否展示
    }
	class OrderCard extends React.Component{
        constructor(props){
            super(props);
            this.state={
                orderList:listData,
                index:'',
                loading:loading
            }
        }
        //取消订单
        cancelOrder(orderId,index){
            this.setState({
                index:index
            })
            cancelOrders(orderId)
        }
        //弹出确定按钮
        alertOrder(orderId,index,type){
            popTypeD(type)
            this.setState({
                index:index
            })
            if(type===1){
                popBtnsFn(orderId,index,ButtonHint)
            }else if(type===2){
                popBtnsFn(orderId,index,ButtonHint2)
            }else if(type===3){
                popBtnsFn(orderId,index,ButtonHint3)
            }
        }
        //切换评价tab按钮
        tabChange(index){
            sessionStorage.setItem('EvaIndex',index)  
        }
        //立即付款
        // buyaAgain(orderNo,price,id){
        //     getDetail(id,orderNo,price)
        // }
		render () {
            console.log(this.state.orderList,111,loading)
            let that=this;
                if(this.state.loading){
                    if(this.state.orderList.length){
                        return (
                            <div>
                                <ChaPop HintWords={HintWords}/>
                                {this.state.orderList.map(function(item,index){
                                    let choiceindexs=false;
                                    return(
                                        <div className={styles.orderCard} key={index}>
                                            <div className={styles.orderNum}>
                                                <Link to={'/mypage/MyOrder/OrderDetails?id='+item.id}>
                                                    <div>
                                                        订单编号:{item.orderNo}
                                                    </div>
                                                </Link>
                                                <div>
                                                    {
                                                        (function(){
                                                            if(item.orderStatus.code==5){
                                                                return('交易关闭')
                                                            }else if(item.orderStatus.code==1){
                                                                return('待付款')
                                                            }else if(item.orderStatus.code==2){
                                                                return('待发货')
                                                            }else if(item.orderStatus.code==3){
                                                                return('待收货')
                                                            }else if(item.orderStatus.code==4){
                                                                return('交易完成')
                                                            }
                                                        })()
                                                    }
                                                </div>
                                            </div>
                                                {
                                                    item.goodsList.map(function(items,index){
                                                        if(!items.hasComment){
                                                            //如果有商品未评价，则为true
                                                            choiceindexs=true;
                                                        }
                                                        return(
                                                            <Link to={'/mypage/MyOrder/OrderDetails?id='+item.id} key={index}>
                                                                <div className={styles.orderBox} key={index}>
                                                                    <img src={items.picture} alt=""/>
                                                                    <div className={styles.orderBoxRi}>
                                                                        {/* <Link to={'/GoodsPage/'+item.goodsId}> */}
                                                                            <div className={styles.orderTitles}>{items.goodsName}</div>
                                                                            <div className={styles.orderBoxRid}>
                                                                                <div>
                                                                                    {items.sku}
                                                                                </div>
                                                                                <div><span>X</span>{items.count}</div>
                                                                            </div>
                                                                            <div>
                                                                                ￥{items.totalPrice}
                                                                            </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                            
                                                        )
                                                    })   
                                                }
                                            {
                                                (function(){
                                                    let i=parseInt(item.orderStatus.code,10)
                                                    switch(i){
                                                        case 1:
                                                        return(<div className={styles.orderBtn}>
                                                                    <div>
                                                                        应付金额:￥{item.realPay}
                                                                    </div>
                                                                    <div className={styles.orderBtnBox}>
                                                                        <div onClick={()=>that.cancelOrder(item.id,index)} onClick={()=>that.alertOrder(item.id,index,3)}>取消订单</div>
                                                                        <div><Link to='/PaymentOrder' onClick={()=>getDetail(item.id,item.orderNo,item.realPay)}>立即付款</Link></div>
                                                                    </div>
                                                                </div>);
                                                        case 2:
                                                        return(<div className={styles.orderBtn}>
                                                                    <div>
                                                                        已付金额:￥{item.realPay}
                                                                    </div>
                                                                    <div className={styles.orderBtnBox}>
                                                                        {/* <Link to={'/mypage/AfterSaleServicePage/AfterRefund?id='+item.id+'&name='+''+'&phone='+''}>
                                                                            <div className={styles.redBtn}>申请退款</div>
                                                                        </Link> */}
                                                                    </div>
                                                                </div>);
                                                        case 3:
                                                        return(<div className={styles.orderBtn}>
                                                                    <div>
                                                                        已付金额:￥{item.realPay}
                                                                    </div>
                                                                    <div className={styles.orderBtnBox}>
                                                                        <Link to={'/mypage/MyOrder/OrderTail?id='+item.id}>
                                                                            <div>查看物流</div>
                                                                        </Link>
                                                                        <div onClick={()=>that.alertOrder(item.id,index,2)}>确认收货</div>
                                                                    </div>
                                                                    
                                                                </div>);
                                                        case 4:
                                                        return(<div className={styles.orderBtn}>
                                                                    <div>
                                                                        已付金额:￥{item.realPay}
                                                                    </div>
                                                                    <div className={styles.orderBtnBox}>
                                                                    {
                                                                        (function(){
                                                                            if(choiceindexs){
                                                                                return(
                                                                                    <div><Link to='/mypage/EvaPage' onClick={()=>that.tabChange(2)}>查看评价</Link></div>
                                                                                )
                                                                            }else{
                                                                                return(
                                                                                    <div><Link to='/mypage/EvaPage' onClick={()=>that.tabChange(1)}>评价商品</Link></div>
                                                                                )
                                                                            }
                                                                        })()
                                                                    }
                                                                        {/* <div><Link to={'/GoodsPage/'+item.goodsList[0].goodsId}>再次购买</Link></div> */}
                                                                    </div>
                                                                </div>);
                                                        case 5:
                                                        return(<div className={styles.orderBtn}>
                                                                    <div>
                                                                        应付金额:￥{item.realPay}
                                                                    </div>
                                                                    <div className={styles.orderBtnBox}>
                                                                        {/* <div><Link to={'/GoodsPage/'+item.goodsList[0].goodsId}>重新购买</Link></div> */}
                                                                        <div onClick={()=>that.alertOrder(item.id,index,1)}>删除订单</div>
                                                                    </div>
                                                                </div>);        
                                                        default:
                                                            return(<div></div>);        
                                                    }
                                                })()
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }else{
                        return(
                            <div>
                                <DefaultPage default_ids='3' showDefault={true}/>
                            </div>
                        )
                    }
                }else{
                    return(
                        <div></div>
                    )
                }
        }
	}	
	return <OrderCard />
};
export default OrderCard