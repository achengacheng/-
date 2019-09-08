import React from 'react';
import styles from '../../../style/mine/MyEva/EvaPage.css';
import { Link } from 'dva/router'
import { connect } from 'dva';
import Loading from '../../PublicComponents/LoadingCom';
import DefaultPage from '../../../components/PublicComponents/DefaultPage';//缺省页面

const NewNoEvaCard = ({listData,loading}) => {
	class NewNoEvaCard extends React.Component{
        constructor(props){
            super(props)
            this.state={
                watiList:listData
            }
        }		
		render () {
            let that=this;
            console.log(1111222,loading)
            if(loading){
                if(this.state.watiList.length){
                    return (
                        <div>
                            {
                                (function(){
                                        return(
                                            that.state.watiList.map(function(item,index){
                                                return(
                                                    <div className={styles.NewEvaLi} key={index}>
                                                        <img src={item.picture} alt=""/>
                                                        <div className={styles.NewEvaContent}>
                                                        <Link to={"/GoodsPage/"+item.goodsId} >
                                                            <p className={styles.NewEvaTitle}>{item.goodsName}</p>
                                                        </Link>
                                                            <p className={styles.NewEvaPcolor}>{item.sku}</p>
                                                            <div className={styles.NewEvaSp}>
                                                                <p className={styles.NewEvaPrice}>￥{item.price}</p>
                                                                <Link to={"/mypage/NewEva?id="+item.odId}>
                                                                    <p className={styles.NewEvaBtn}>发布评价</p>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                })()
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
        componentDidMount(){
        }
	}	
	return <NewNoEvaCard />
};
export default NewNoEvaCard