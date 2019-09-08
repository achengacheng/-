import React from 'react';
import styles from '../../../style/mine/MyOrder/MyOrder.css';

const OrderTail = ({data}) => {
    const TailCard=({index})=>{
        switch(parseInt(index,10)){
            case(0):
                return(
                    <div className={styles.tailBox}>
                        <div className={styles.tailBoxHead}>物流详情</div>
                        <div className={styles.tailBoxDe}>
                            <div>
                                <div>
                                    <div className={styles.tailDotCur}></div>
                                    <div className={styles.tailDotSaw}></div>
                                </div>
                                <div className={styles.tailheight}>
                                    <p>订单以签收，期待再次为您服务</p>
                                    <p>2017-10-12 10:00</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div className={styles.tailDotRed}></div>
                                    <div className={styles.tailDotSaw}></div>
                                </div>
                                <div className={styles.tailheight}>
                                    <p>订单以签收，期待再次为您服务订单以签收，期待再次为您服务</p>
                                    <p>2017-10-12 10:00</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div className={styles.tailDotRed}></div>
                                    <div className={styles.tailDotSaw}></div>
                                </div>
                                <div className={styles.tailheight}>
                                    <p>订单以签收，期待再次为您服务</p>
                                    <p>2017-10-12 10:00</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div className={styles.tailDotRed}></div>
                                    <div className={styles.tailDotSaw}></div>
                                </div>
                                <div className={styles.tailheight}>
                                    <p>订单以签收，期待再次为您服务</p>
                                    <p>2017-10-12 10:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case(1):
            return(
                <div className={styles.tailBox}>
                    <div className={styles.tailBoxHead1}>进度跟踪</div>
                    <div className={styles.tailBoxDe1}>
                        <div>
                            <div>
                                <div className={styles.tailDotCur}></div>
                                <div className={styles.tailDotSaw}></div>
                            </div>
                            <div className={styles.tailheight1}>
                                <p>订单以签收，期待再次为您服务</p>
                                <p>经办人：laijiarong</p>
                                <p>2017-10-12 10:00</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className={styles.tailDotRed}></div>
                                <div className={styles.tailDotSaw}></div>
                            </div>
                            <div className={styles.tailheight1}>
                                <p>订单以签收，期待再次为您服务订单以签收，期待再次为您服务</p>
                                <p>经办人：laijiarong</p>
                                <p>2017-10-12 10:00</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className={styles.tailDotRed}></div>
                                <div className={styles.tailDotSaw}></div>
                            </div>
                            <div className={styles.tailheight1}>
                                <p>订单以签收，期待再次为您服务</p>
                                <p>经办人：laijiarong</p>
                                <p>2017-10-12 10:00</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className={styles.tailDotRed}></div>
                                <div className={styles.tailDotSaw}></div>
                            </div>
                            <div className={styles.tailheight1}>
                                <p>订单以签收，期待再次为您服务</p>
                                <p>经办人：laijiarong</p>
                                <p>2017-10-12 10:00</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
            default:
                return(<div>222</div>);
        }
    }
	class OrderTail extends React.Component{		
		render() {
			return (
				<div className={styles.tailBox}>
                        <div className={styles.tailBoxHead1}>进度跟踪</div>
                        <div className={styles.tailBoxDe1}>
                            {
                                data.map(function(item,index){
                                    return(
                                        <div key={index}>
                                            <div>
                                                <div className={styles.tailDotRed}></div>
                                                <div className={styles.tailDotSaw}></div>
                                            </div>
                                            <div className={styles.tailheight}>
                                                <p>{item.memo}</p>
                                                <p>经办人：{item.name}</p>
                                                <p>{item.time}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
			)
		}
	}	
	return <OrderTail />
};
export default OrderTail;