import React from 'react';
import styles from '../../../style/mine/MyAdRate/AdPage.css';
import { Link } from 'dva/router'
import Loading from '../../PublicComponents/LoadingCom';
import DefaultPage from '../../../components/PublicComponents/DefaultPage';//缺省页面

const AdCaedOne = ({isNew,id,type,index,listData,loading}) => {
    const ReturnCard=({id,isNew})=>{
        switch(id){
            case('待晒单'):
                return(<img src="/src/assets/Mine-ad-new.png" alt="" className={id==='待晒单'?styles.AdCardImgShow:styles.AdCardImgHide}/>);
            case('冻结中'):
                return(<img src="/src/assets/Mine-ad-dj.png" alt="" className={styles.AdCardImgDj}/>);
            case('已入账'):
                return(<img src="/src/assets/Mine-ad-get.png" alt="" className={styles.AdCardImgDj}/>);
            default:
                return(null);
        }
    }
    // const ReturnType=({id})=>{
    //     switch(id){
    //         case('待晒单'):
    //             return(<span className={styles.AdCardSpan1}>待晒单</span>);
    //         case('冻结中'):
    //             return(<span className={styles.AdCardSpan1}>订单待收货</span>);
    //         case('已入账'):
    //             return(<span className={styles.AdCardSpan2}>已入账</span>);
    //         default:
    //             return(null);
    //     } 
    // }
	class AdCaedOne extends React.Component{
        constructor(props){
            super(props);
            this.state={
                index:id,
                typeData:listData
            }
        }
        changeTime(time){
            let times=time.split(' ');
            return(times[0])
        }
		render () {
            let that=this;
            if(loading){
                if(this.state.typeData.length){
                    return (
                        <div>
                            {
                                this.state.typeData.map(function(item,index){
                                    return(
                                        <Link to={"/mypage/AdPage/AdRateDetails?id="+item.id} key={index}>
                                            <div className={styles.AdCardLi}>
                                                <div>
                                                    <span className={styles.AdSmal}>￥</span><span>{item.money}</span>
                                                </div>
                                                <div className={styles.AdCardRight}>
                                                    <p className={styles.AdCardRightP1}>{item.name}</p>
                                                    <p>当前状态：<span className={item.status==='已入账'?styles.AdCardSpan2:styles.AdCardSpan1}>{item.status}</span></p>
                                                    <div className={styles.AdCardtime}>
                                                            <p>获取时间：{that.changeTime(item.obtainTime)}</p>
                                                            <p>查看详情</p>
                                                    </div>
                                                </div>
                                                <ReturnCard id={item.status} isNew={isNew}/>
                                                {/* <img src="/src/assets/Mine-ad-new.png" alt="" className={styles.imgRight}/> */}
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                       
                    )
                }else{
                    return(
                        <DefaultPage showDefault={true} default_ids={3} />
                    )
                }
            }else{
                return(
                    <div></div>
                )
            }
        }
	}	
	return <AdCaedOne />
};
export default AdCaedOne