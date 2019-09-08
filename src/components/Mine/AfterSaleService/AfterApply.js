import React from 'react';
import styles from '../../../style/mine/AfterSaleService.css';
import { connect } from 'dva';
import { Link } from 'dva/router'
import Loading from '../../PublicComponents/LoadingCom';
import DefaultPage from '../../../components/PublicComponents/DefaultPage';//缺省页面
import ChaPop from '../../../components/PublicComponents/ChaPop'
import ButtonPop from '../../../components/PublicComponents/ButtonPop'

const AfterApply = ({id,dispatch,afterData,listData,cancel,popData,bloading}) => {
    let Popfun  //弹窗调用通道
    function HintWords(popDom){
        Popfun=popDom.Popfun
    }
    function getCode(data){//弹窗使用
        Popfun(data)
    }
    const FootBox=({index})=>{
		switch(index){
			case 0:
				return( 
                        <div className={styles.orderBtn}>
                            <div className={styles.AfterIcon2}>
                                <img src="/src/assets/Mine-todo.png" alt=""/> &nbsp;<span>处理中</span>
                            </div>
                            <div className={styles.orderBtnBox}>
                                <img src="/src/assets/myPageLeftArr.png" alt=""/>
                            </div>
                        </div>
                    );		
            case 1:
                return(
                    <div className={styles.orderBtn}>
                        <div className={styles.AfterIcon}>
                            <img src="/src/assets/Mine-tips.png" alt=""/> &nbsp;&nbsp;<span>该商品已超过售后期</span>
                        </div>
                        <div className={styles.afterBtn}>申请退货</div>
                    </div>
                )
            case 2:
				return(
                        <div className={styles.orderBtn}>
                            <div className={styles.AfterIcon1}>
                                <img src="/src/assets/Mine-done.png" alt=""/> &nbsp;<span>已完成</span>
                            </div>
                            <div className={styles.orderBtnBox}>
                                <img src="/src/assets/myPageLeftArr.png" alt=""/>
                            </div>
                        </div>
                    );		
            case 3:
				return(
                        <div className={styles.orderBtn}>
                            <div className={styles.AfterIcon}>
                            </div>
                            <Link to="/mypage/AfterSaleServicePage/ApplyForReturn">
                                <div className={styles.afterBtn1}>申请退货</div>
                            </Link>
                        </div>
                    );		
            default:
				return(
                    <DefaultPage showDefault={true} default_ids={3} />
                );
        }
    }    
	class AfterApply extends React.Component{
        popAlert(id,index,e){
            e.preventDefault();
            this.setState({
                ButtonHint:{//弹窗
                    title:"温馨提示",//标题
                    explain:'是否确定取消？',
                    type:2,//按钮数1/2
                    hide:false//是否展示
                },
                id:id,
                index:index
            })
        }
        cancelWay(){
            this.setState({
                ButtonHint:{//弹窗
                    title:"温馨提示",//标题
                    explain:'是否确定取消？',
                    type:2,//按钮数1/2
                    hide:true//是否展示
                }
            })
        }
        constructor(props){
            super(props);
            this.state={
                afterDatas:listData,
                id:'',
                index:'',
                ButtonHint:{//弹窗
                    title:"温馨提示",//标题
                    explain:'是否确定取消？',
                    type:2,//按钮数1/2
                    hide:true//是否展示
                }
            }
        }
		render () {
            let that=this;
            if(bloading){
                if(this.state.afterDatas.length){
                    return (
                        <div className={styles.wrapTop}>
                            <ChaPop HintWords={HintWords}/>
                            <ButtonPop ButtonHint={this.state.ButtonHint} confirm={()=>cancel(this.state.id,this.state.index)} cancel={()=>this.cancelWay()}/>
                            {
                                this.state.afterDatas.map(function(item,index){
                                    return(
                                        <div className={styles.orderCard} key={index}>
                                            <div className={styles.orderNum}>
                                                    <div>
                                                        服务单号:{item.servNo}
                                                    </div>
                                                    <div>申请时间:{item.applyTime}</div>
                                            </div>
                                            {
                                                item.goods.map(function(item,index){
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
                                                        </div>
                                                    )
                                                })
                                            }
                                            {
                                                (function(){
                                                    if(item.status.code==3){
                                                        return(
                                                            <Link to={"/mypage/AfterSaleServicePage/RecordDetails?id="+item.id}>
                                                                <div className={styles.orderBtns}>
                                                                    <div className={styles.AfterIcon1}>
                                                                        <img src="/src/assets/Mine-done.png" alt=""/> &nbsp;<span>{item.type.msg+'成功'}</span>
                                                                    </div>
                                                                    <div className={styles.orderBtnBox}>
                                                                        <img src="/src/assets/myPageLeftArr.png" alt=""/>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        )
                                                    }else if(item.status.code==1){
                                                        return(
                                                            <Link to={"/mypage/AfterSaleServicePage/RecordDetails?id="+item.id}>
                                                            <div className={styles.orderBtns}>
                                                                    <div className={styles.AfterIcon2}>
                                                                        <img src="/src/assets/Mine-todo.png" alt=""/> &nbsp;<span>{item.type.msg+'中'}</span>
                                                                    </div>
                                                                <div className={styles.afterBtn1} onClick={(e)=>that.popAlert(item.id,index,e)}>{'取消'+item.type.msg}</div>
                                                            </div>
                                                            </Link>
                                                        )
                                                    }else if(item.status.code==2){
                                                        return(
                                                            <Link to={"/mypage/AfterSaleServicePage/RecordDetails?id="+item.id}>
                                                                <div className={styles.orderBtns}>
                                                                        <div className={styles.AfterIcon2}>
                                                                            <img src="/src/assets/Mine-todo.png" alt=""/> &nbsp;<span>{item.type.msg+'中'}</span>
                                                                        </div>
                                                                    <div className={styles.afterBtn1} onClick={(e)=>that.popAlert(item.id,index,e)}>{'取消'+item.type.msg}</div>
                                                                </div>
                                                            </Link>
                                                        )
                                                    }else if(item.status.code==4){
                                                        return(
                                                            <Link to={"/mypage/AfterSaleServicePage/RecordDetails?id="+item.id}>
                                                                <div className={styles.orderBtns}>
                                                                        <div className={styles.AfterIcon2}>
                                                                            <img src="/src/assets/Mine-fail.png" alt=""/> &nbsp;<span>{item.type.msg+'失败'}</span>
                                                                        </div>
                                                                        <div className={styles.orderBtnBox}>
                                                                            <img src="/src/assets/myPageLeftArr.png" alt=""/>
                                                                        </div>
                                                                    {/* <Link to={"/mypage/AfterSaleServicePage/ApplyForReturn?id="+item.goods[0].odId}>
                                                                        <div className={styles.afterBtn1}>再次申请</div>
                                                                    </Link> */}
                                                                </div>
                                                            </Link>
                                                        )
                                                    }else if(item.status.code==5){
                                                        return(
                                                            <Link to={"/mypage/AfterSaleServicePage/RecordDetails?id="+item.id}>
                                                                <div className={styles.orderBtns}>
                                                                    <div className={styles.AfterIcon2}>
                                                                        <img src="/src/assets/Mine-fail.png" alt=""/> &nbsp;<span>{item.type.msg+'中'}</span>
                                                                    </div>
                                                                    <div className={styles.orderBtnBox}>
                                                                        <img src="/src/assets/myPageLeftArr.png" alt=""/>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        )
                                                    }else if(item.status.code==6){
                                                        return(
                                                            <Link to={"/mypage/AfterSaleServicePage/RecordDetails?id="+item.id}>
                                                                <div className={styles.orderBtns}>
                                                                    <div className={styles.AfterIcon2}>
                                                                        <img src="/src/assets/Mine-todo.png" alt=""/> &nbsp;<span>{item.type.msg+'中'}</span>
                                                                    </div>
                                                                    <div className={styles.orderBtnBox}>
                                                                        <img src="/src/assets/myPageLeftArr.png" alt=""/>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        )
                                                    }else if(item.status.code==7){
                                                        return(
                                                            <Link to={"/mypage/AfterSaleServicePage/RecordDetails?id="+item.id}>
                                                                <div className={styles.orderBtns}>
                                                                    <div className={styles.AfterIcon2}>
                                                                        <img src="/src/assets/Mine-todo.png" alt=""/> &nbsp;<span>{item.type.msg+'关闭'}</span>
                                                                    </div>
                                                                    <div className={styles.orderBtnBox}>
                                                                        <img src="/src/assets/myPageLeftArr.png" alt=""/>
                                                                    </div>
                                                                    {/* <Link to={"/mypage/AfterSaleServicePage/ApplyForReturn?id="+item.goods[0].odId}>
                                                                        <div className={styles.afterBtn1}>再次申请</div>
                                                                    </Link> */}
                                                                </div>
                                                            </Link>
                                                        )
                                                    }else if(item.status.code==8){
                                                        return(
                                                            <Link to={"/mypage/AfterSaleServicePage/RecordDetails?id="+item.id}>
                                                                <div className={styles.orderBtns}>
                                                                    <div className={styles.AfterIcon2}>
                                                                        <img src="/src/assets/Mine-fail.png" alt=""/> &nbsp;<span>{item.type.msg+'失败'}</span>
                                                                    </div>
                                                                    <div className={styles.orderBtnBox}>
                                                                        <img src="/src/assets/myPageLeftArr.png" alt=""/>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        )
                                                    }
                                                })()
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
	return <AfterApply />
};
export default AfterApply