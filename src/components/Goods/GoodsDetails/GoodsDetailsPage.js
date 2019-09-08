import React from 'react';
import $ from 'jquery';
import styles from '../../../style/goods/goodsDetails.css';
import GoodsCarousel from './GoodsCarousel';//商品滑动展示图
import GoodsBasicMsg from './GoodsBasicMsg';//商品基本信息
import GoodsParameter from './GoodsParameter';//商品参数信息
import GoodsAdDetails from './GoodsAdDetails';//商品广告费详情
import GoodsIntroduce from './GoodsIntroduce';//商品文字介绍
import GoodsEva from './GoodsEva';//商品评价内容
import GoodsSimilar from './GoodsSimilar';//商品同类相似推荐

var isScoll,_this;
const GoodsDetailsPage=({getGoodsDom,goodsMsg,checkTab,pullUp,allSkus,goodsCarousel,goodsSimilar,isLove,goToAd,hasAd,evaAllData,goodsId })=>{
	class GoodsDetailsPage extends React.Component {
		constructor(props){
			super(props);
			this.state={
				goodsData:goodsMsg
			}
			this.changeData=this.changeData.bind(this)
		}
		changeData(data){
			this.setState({
				goodsData:data
			})
		}
		render(){
			return(
				<div className={ styles.goodsDetailsMain }>
					<GoodsCarousel goodsCarousel = {goodsCarousel } picData = {this.state.goodsData?this.state.goodsData.pictures:'' }/>
					<GoodsBasicMsg basicData = { this.state.goodsData?this.state.goodsData:''}/>
					<GoodsParameter checkTab = { checkTab } parameterData = { this.state.goodsData?this.state.goodsData:'' } allSkus={ allSkus }/>
					<GoodsAdDetails goToAd = { goToAd } hasAd = { hasAd } goodsId={ goodsId }/>
					<GoodsIntroduce contentData = { this.state.goodsData?this.state.goodsData.goodsDesc:'' }/>
					<GoodsEva evaData = { evaAllData } pullUp = { pullUp } goToAd = { goToAd }/>
					<GoodsSimilar goodsSimilar={goodsSimilar } similarData = { this.state.goodsData?this.state.goodsData:'' } goToAd = { goToAd }/>
					<div className={ styles.goodsPullupContainer }>
						<i className={ styles.goodsPullupArr }></i>
						<p>上拉查看图文详情</p>
					</div>
				</div>
			)
		}
		/*上拉切换到图文*/
	  isScoll(){
    	var scrolls=$(document).height()-$(window).height()-$(window).scrollTop();
    	var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端:true
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端:true
			// 如果是ios设备距离值可以大点
			if(isiOS){
				if($(window).scrollTop()>($(window).height()+200)){
					pullUp(1);
	    			window.removeEventListener('scroll',isScoll,false)
				}
			}else if(isAndroid){
				if($(document).height()!==$(window).height()){
			    	if(scrolls<=5){
			    		setTimeout(function(){
						    pullUp(1);
			    			window.removeEventListener('scroll',isScoll,false)
						},1000);
			    }
				}
			}
		}
		/*监听滚动方法*/
    scroll_fun(){
    	window.addEventListener('scroll',isScoll,false)
    }
    componentWillMount(){
    	_this=this
    	getGoodsDom(this)

    }
    componentDidMount(){
	    if(isLove){
    		$('#love').css('display','none');
    		$('#love2').css('display','block');
    	}
			isScoll = this.isScoll;
    	this.scroll_fun()
    }
    componentWillUpdate(){
    }
    componentWillUnmount(){
			window.removeEventListener('scroll',isScoll,false)
			this.setState({
				goodsData:""
			})
		}
	}
	return <GoodsDetailsPage/>
}


export default GoodsDetailsPage
