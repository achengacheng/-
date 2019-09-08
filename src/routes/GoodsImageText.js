import React from 'react';
import { connect } from 'dva';
import GoodsImageText from '../components/Goods/GoodsImageText';

const GoodsImageTextPage=({ dispatch,goodsData })=>{
	const data = goodsData.res_imageText_datas;
	class GoodsImageTextPage extends React.Component {
		render(){
			console.log(data.detail)
			if(data.detail){
				return(
					<GoodsImageText details = { data.detail }/>
				)
			}else{
				return(
					<div></div>
				)
			}
		}
	}
	return <GoodsImageTextPage />
}

export default connect(({ goodsData }) => ({
    goodsData,
}))(GoodsImageTextPage)
