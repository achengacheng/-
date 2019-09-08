import React from 'react';
import styles from '../../../style/mine/MyEva/EvaPage.css';
import DefaultPage from '../../../components/PublicComponents/DefaultPage';//缺省页面
import { Link } from 'dva/router'
import BigPicture from '../../PublicComponents/BigPicture';//展示大图组件
import constant from '../../../constant';//处理评价时间函数
const NewNoEvaCard = ({listData}) => {
    let _this,bigPictures,bigImg2;
	// 大图组件函数
	function getImgdom(dom){
		console.log(dom,23)
		bigPictures=dom.bigImg
	}
	class NewNoEvaCard extends React.Component{
        constructor(props){
            super(props)
            this.state={
                commentedList:listData
            }
        }				
		render () {
            let that=this;
            console.log(that.state.commentedList,333)
            if(this.state.commentedList.length){
                return (
                    <div>
                        {
                            that.state.commentedList.map(function(item,wrapindex){
                                return(
                                    <div className={styles.EvaPageLi} key={wrapindex}>
                                        <div className={styles.EvaPageHead}>
                                            <div className={styles.EvaPageHead}>
                                                <img src={item.head} alt=""/>
                                                <div>
                                                    <p className={styles.EvaPagIconName}>{item.name}</p>
                                                    <p className={styles.EvaPageAddr}>{item.address?item.address.city:'未知地区'}</p>
                                                </div>
                                            </div>
                                            <div>• • •</div>
                                        </div>
                                        <div className={styles.EvaPageImgBox}>
                                            {item.pictures.map(function(item,index){
                                                return(
                                                    <img src={item} alt="" key={index} onClick={() =>that.letsBigPic(wrapindex)}/>
                                                )
                                            })}
                                        </div>
                                        <div className={styles.EvaPageText}>
                                            {item.content}
                                        </div>
                                        <Link to={"/GoodsPage/"+item.goodsId}>
                                            <div className={styles.NewEvaLi+' '+styles.addBg}>
                                                <img src={item.picture} alt=""/>
                                                <div className={styles.NewEvaContent}>
                                                    <p>{item.goodsName}</p>
                                                    <p className={styles.NewEvaPcolor}>{item.sku}</p>
                                                    <div className={styles.NewEvaSp}>
                                                        <p className={styles.NewEvaPrice}>￥{item.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to={"/AJPage/AJEva/"+item.id}>
                                            <div className={styles.EvaPageFoot}>
                                                <p>{constant.showTime(item.date)}</p>
                                                <div className={styles.EvaPageFootBox}>
                                                    <p>
                                                        <img src="/src/assets/Mine-red-heart.png" alt=""/>&nbsp;
                                                        <span>{item.like}</span>
                                                    </p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <p>
                                                        <img src="/src/assets/Mine-callback.png" alt=""/> &nbsp;
                                                        <span>{item.reply}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                        <BigPicture getImgdom={getImgdom}/>
                    </div>
                )
            }else{
                return(
                    <div>
                        <DefaultPage showDefault={true} default_ids={3}/>
                    </div>
                )
            }
			
        }
        /*点击后传出图片，再传至大图组件处*/
		letsBigPic(data){
            let picBox = []
            console.log(data,3333)
			this.state.commentedList.map(function(item,index){
				if(data === index){
						item.pictures.map(function(i,j){
							picBox.push(i)
						});
				}
			})
			bigPictures(true,picBox)
		}
	}	
	return <NewNoEvaCard />
};
export default NewNoEvaCard