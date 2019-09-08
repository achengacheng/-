import React from 'react';
import styles from '../../../style/goods/goodsDetails.css';

const GoodsParameter = ({ checkTab,parameterData,allSkus }) => {
	let defaultShow=[];
	class GoodsParameter extends React.Component{
		render(){
			//规格型号默认展示第一个
			for (let i in parameterData.goodsSkus){
				defaultShow.push(i + '/' +parameterData.goodsSkus[i])
			}
			return (
				<div className={ styles.goodsParameterContainer }>
					<div onClick={() => checkTab(0,parameterData.serviceGuarantee)}>
						<p>服务说明</p>
						<p className={ styles.parameterIcon }>
							{parameterData.serviceGuarantee?parameterData.serviceGuarantee.map(function(item,index){
								if(index>2){
									if(item.length>2){
										item.slice(0,2).map(function(a,b){
											return 	<span key={b}>
														<img src={ a.pic } alt="icon"/>
														<span>{ a.name }</span>
													</span>
										})
									}
								}else{
									return 	<span key={index}>
														<img src={ item.pic } alt="icon"/>
														<span>{ item.name }</span>
													</span>
								}
								return false
							}):''}
							<i className={ styles.goodsRightArr }></i>
						</p>
					</div>
					<div onClick={() => checkTab(1,parameterData.paramsSkuList)}>
						<p>商品参数</p>
						<p>
							<span>查看</span>
							<i className={ styles.goodsRightArr }></i>
						</p>
					</div>
					<div onClick={() => checkTab(2,allSkus,parameterData.skuId)}>
						<p>选择规格</p>
						<p>
							<span>{defaultShow[0]}</span>
							<i className={ styles.goodsRightArr }></i>
						</p>
					</div>
				</div>
			)
		}
	}
	return <GoodsParameter />
}

export default GoodsParameter
