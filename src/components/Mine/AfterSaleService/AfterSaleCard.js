import React from 'react';
import styles from '../../../style/mine/AfterSaleService.css';
import { Link } from 'dva/router'
import { connect } from 'dva';
import Loading from '../../PublicComponents/LoadingCom';
import DefaultPage from '../../../components/PublicComponents/DefaultPage';//缺省页面

const OrderCard = ({dispatch,afterData,listData,aloading}) => {
	class OrderCard extends React.Component{
        constructor(props){
            super(props);
            this.state={
                afterDatas:listData
            }
        }		
		render () {
            if(aloading){
                if(this.state.afterDatas.length){
                    return (
                        <div className={styles.wrapTop}>
                            {
                                this.state.afterDatas.map(function(items,index){
                                    return(
                                        <div className={styles.orderCard} key={index}>
                                            <div className={styles.orderNum}>
                                                <div>
                                                    服务单号:{items.orderNo}
                                                </div>
                                                <div>下单时间:{items.orderTime}</div>
                                            </div>
                                            {
                                                items.goods.map(function(item,index){
                                                    if(!(item.isBeyond.leftText==='FINISH')){
                                                        return(
                                                            <div key={index}>
                                                                <div className={styles.orderGoodsList}>
                                                                    <img src={item.picture} alt=""/>
                                                                    <div className={styles.orderGoodsContent}>
                                                                        <div>
                                                                            <p className={styles.AfterName}>{item.goodsName}</p>
                                                                        </div>
                                                                        <div className={styles.aferColor}>
                                                                            <div className={styles.Aftertype}>
                                                                                <div>{item.sku}</div>
                                                                                <div className={styles.ordertext}><span className={styles.orderSpan}>X</span><span>{item.count}</span></div>
                                                                            </div>
                                                                            <div>￥{item.price}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {
                                                                    (function(){
                                                                        if(item.isBeyond.leftText==='BEYONGTIME'){
                                                                            return(
                                                                                <div className={styles.orderBtn}>
                                                                                    <div className={styles.AfterIcon}>
                                                                                        <img src="/src/assets/Mine-tips.png" alt=""/> &nbsp;&nbsp;<span>该商品已超过售后期</span>
                                                                                    </div>
                                                                                    <div className={styles.afterBtn}>申请售后</div>
                                                                                </div>
                                                                            )
                                                                        }else if(item.isBeyond.leftText==='NONE'){
                                                                            return(
                                                                                <div className={styles.orderBtn}>
                                                                                    <div className={styles.AfterIcon}>
                                                                                    </div>
                                                                                    <Link to={"/mypage/AfterSaleServicePage/ApplyForReturn?id="+items.id+'&gid='+item.odId}>
                                                                                        <div className={styles.afterBtn1}>申请售后</div>
                                                                                    </Link>
                                                                                </div>
                                                                            )
                                                                        }else if(item.isBeyond.leftText==='FINISH'){
                                                                            return(
                                                                                <div className={styles.orderBtn}>
                                                                                    <div className={styles.AfterIcon1}>
                                                                                        <img src="/src/assets/Mine-done.png" alt=""/> &nbsp;<span>售后完成</span>
                                                                                    </div>
                                                                                    <div className={styles.orderBtnBox}>
                                                                                        <img src="/src/assets/myPageLeftArr.png" alt=""/>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        }else if(item.isBeyond.leftText==='APPLYING'){
                                                                            return(
                                                                                <div className={styles.orderBtn}>
                                                                                    <div className={styles.AfterIcon1}>
                                                                                        <img src="/src/assets/Mine-done.png" alt=""/> &nbsp;<span>申请中</span>
                                                                                    </div>
                                                                                   
                                                                                </div>
                                                                            )
                                                                        }
                                                                    })()
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }else{
                    return(
                        <div>
                            <DefaultPage showDefault={true} default_ids={3} />
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