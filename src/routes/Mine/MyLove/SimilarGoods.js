import React from 'react';
import { connect } from 'dva';
import styles from '../../../style/mine/lovePage.css';
import Header from '../../../components/PublicComponents/HeaderReturn';
import SimilarGoods from '../../../components/Mine/MyLove/LoveGoods';
import RecommendGoods from '../../../components/Home/HomePage/HomeGuessLike';
import DefaultPage from '../../../components/PublicComponents/DefaultPage';//缺省页面

class SimilarGoodsPage extends React.Component{
	render(){
		const loveGoodsData = this.props.loveData.loveGoodsData;
		const dispatch = this.props.dispatch;
		function chooseToGo(type){
			dispatch({
				type:'loveData/chooseToGo',
				payload:type
			})
		}
		if(loveGoodsData){
			return(
				<div className={ styles.similarGoodsContainer }>
					<Header left_show='1' head_title="相似商品"/>
					<SimilarGoods loveGoodsData = { loveGoodsData } chooseToGo = { chooseToGo }/>
					<div className={ styles.similarGoodsMain }>
						<div>
							<p> <span>为你推荐</span></p>
						</div>
					</div>
					<RecommendGoods />
				</div>
			)
		}else{
			let showDefault = true;
			let default_id = 3;
			return(
				<div className={ styles.similarGoodsContainer }>
					<Header left_show='1' head_title="相似商品"/>
					<DefaultPage showDefault={showDefault} default_ids={default_id} />
				</div>
			)
		}
	}
}

export default connect(({ loveData }) => ({
  loveData
}))(SimilarGoodsPage);
