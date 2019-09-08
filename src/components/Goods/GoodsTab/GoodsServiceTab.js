import React from 'react';
import $ from 'jquery';
import styles from '../../../style/goods/otherGoods.css';

class GoodsServiceTab extends React.Component{
	render(){
		const closeTab = this.props.disappear;
		if(this.props.serviceData.length===0){
			return(
				<div className={ styles.goodsTabContainer } id="serviceTab">
					<header className={ styles.serviceHead }>
						<p className={ this.props.tabId===0?'':styles.hidden }>服务说明</p>
						<p className={ this.props.tabId===1?'':styles.hidden }>商品参数</p>
						<i className={ styles.goodsTabClose } onClick={ () => closeTab() }></i>
					</header>
				</div>
			)
		}else if(this.props.tabId===0){
			return(
				<div className={ styles.goodsTabContainer } id="serviceTab">
					<header className={ styles.serviceHead }>
						<p className={ this.props.tabId===0?'':styles.hidden }>服务说明</p>
						<p className={ this.props.tabId===1?'':styles.hidden }>商品参数</p>
						<i className={ styles.goodsTabClose } onClick={ () => closeTab() }></i>
					</header>
					<ul className={ `${styles.goodsServiceTab} ${this.props.tabId===0?'':styles.hidden}` }>
						{JSON.stringify(this.props.serviceData) !== '[]'?this.props.serviceData.map(function(item,index){
							return 	<li key={ index }>
												<h6>&bull; { item.name }</h6>
												<p>{ item.explain}</p>
											</li>
						}):''}
					</ul>
				</div>
			)
		}else if(this.props.tabId===1){
			return(
				<div className={ styles.goodsTabContainer } id="serviceTab">
					<header className={ styles.serviceHead }>
						<p className={ this.props.tabId===0?'':styles.hidden }>服务说明</p>
						<p className={ this.props.tabId===1?'':styles.hidden }>商品参数</p>
						<i className={ styles.goodsTabClose } onClick={ () => closeTab() }></i>
					</header>
					<div className={ `${styles.goodsParameterTab} ${this.props.tabId===1?'':styles.hidden}` }>
						{this.props.serviceData.map(function(item,index){
		            		return  <div className={ styles.parameterTabBox } key={index}>
										<p className={ styles.parameterTabLeft }>{item.title}</p>
										<p className={ styles.parameterTabRight }>{item.params.join("/")}</p>
									</div>
		            	})}
					</div>
				</div>
			)
		}else{
			return <div></div>
		}
	}
	componentDidMount(){
		$('#serviceTab').height($(window).height()*(0.7));
	}
}

export default GoodsServiceTab
