import React from 'react';
import styles from '../../style/Special/special.css'
import {Link} from 'dva/router'
const SpecialDetailGoods=({DetailData})=>{
	class SpecialDetailGoods extends React.Component{
		render(){
			if(DetailData.goods.length){
				return(
					<div className={styles.home_recommend_box}>
						<div className={styles.home_recommend_head}>
							 相关商品
						</div>
						<ul className={styles.home_recommend_goodsbox}>
							{DetailData.goods?DetailData.goods.map(function(elem,index){
								return (<Link to={'/GoodsPage/'+elem.id} key={index}><li>
											<div className={styles.home_recommend_goodsimg}>
												<img src={elem.goodPic}/>
											</div>
											<div className={styles.home_recommend_goodstext}>
												<p>{elem.name}</p>
												<div className={styles.home_recommend_price}>
													<p>¥{elem.currentPrice}</p>
													<s>¥{elem.markPrice}</s>
												</div>
												<div className={styles.home_recommend_button}>
													<span>立即购买</span>
												</div>
											</div>
										</li></Link>)
							}):""}																
						</ul>
						<div className={styles.SpecialDetailGoods_box}>					
							<ul className={styles.SpecialDetailGoods_zan}>
								<li><i className={styles.SpecialList_love}></i><span>收藏{DetailData.themeCollect?DetailData.themeCollect:0}</span></li>
								<li><i className={styles.SpecialList_eye}></i><span>阅读{DetailData.readNum?DetailData.readNum:0}</span></li>
								<li><i className={styles.SpecialList_zf}></i><span>转发{DetailData.forwarding?DetailData.forwarding:0}</span></li>
								<li><i className={styles.SpecialList_dialogue}></i><span>回复0</span></li>
							</ul>
						</div>						
					</div>
				)
			}else{
				return(
					<div className={styles.home_recommend_box}>						
						<div className={styles.SpecialDetailGoods_box}>					
							<ul className={styles.SpecialDetailGoods_zan}>
								<li><i className={styles.SpecialList_love}></i><span>收藏{DetailData.themeCollect?DetailData.themeCollect:0}</span></li>
								<li><i className={styles.SpecialList_eye}></i><span>阅读{DetailData.readNum?DetailData.readNum:0}</span></li>
								<li><i className={styles.SpecialList_zf}></i><span>转发{DetailData.forwarding?DetailData.forwarding:0}</span></li>
								<li><i className={styles.SpecialList_dialogue}></i><span>回复{DetailData.comments?DetailData.comments:0}</span></li>
							</ul>
						</div>						
					</div>
				)
			}
			
		}
		componentDidUpdate(){
			// <div className={styles.SpecialDetailGoods_box}>
			// 	<div className={styles.SpecialDetailGoods_button}>
			// 		分享有惊喜
			// 	</div>
			// 	<div className={styles.SpecialDetailGoods_text}>
			// 		<p>每个专题每天首次分享即可参加抽奖</p>
			// 		<p>最高100元优惠价</p>
			// 		<p>（分享后,返回艾家公社才能抽哦）</p>
			// 	</div>
			// 	<ul className={styles.SpecialDetailGoods_zan}>
			// 		<li><i className={styles.SpecialList_love}></i><span>收藏{DetailData.themeCollect?DetailData.themeCollect:0}</span></li>
			// 		<li><i className={styles.SpecialList_eye}></i><span>阅读{DetailData.readNum?DetailData.readNum:0}</span></li>
			// 		<li><i className={styles.SpecialList_zf}></i><span>转发{DetailData.forwarding?DetailData.forwarding:0}</span></li>
			// 		<li><i className={styles.SpecialList_dialogue}></i><span>回复0</span></li>
			// 	</ul>
			// </div>
		}
	}	
	return <SpecialDetailGoods/>
}
export default SpecialDetailGoods
