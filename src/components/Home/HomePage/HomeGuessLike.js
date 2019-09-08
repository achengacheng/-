import React from 'react';
import styles from '../../../style/home/homePage.css';
import ajStyles from '../../../style/AJ/AJDetails.css';
import Loading from '../../PublicComponents/LoadingCom';
import Goods_Icon from '../../PublicComponents/Goods_Icon';
import DefaultPage from '../../PublicComponents/DefaultPage';//缺省页面
import $ from 'jquery'

const HomeGuessLike=({ Callback,goodsData,come,guessData,getFun,page})=>{
	/*getFun 滑动加载请求方法 参数(页数,this),page当前页*/
	let _this,PtData,typePt;
	function laodfun(dom){
		PtData=dom.ptData
	}
	function reqFun(NewPages){
		getFun(NewPages,_this)
	}
	class HomeGuessLike extends React.Component{
		constructor(props) {
	        super(props);
	        this.state={
	        	guesslikeData:guessData?guessData:goodsData,
	        	d_page:page
	        }
	        this.getPage=this.getPage.bind(this)
	    }
	    getPage(types,data,page){//有无更多数据
	    	let newData=this.state.guesslikeData.concat(data)	    	
	    	typePt=types
	    	this.setState({
					guesslikeData:newData,
					d_page:page
	    	})
	    }
		render(){
			let showDefault = true;
			let default_id = 3;
			if(!goodsData){
				return(
					<div className={styles.homeGuessLike_box}>
						<ul className={styles.homeGuessLike_goods}>
							{this.state.guesslikeData?this.state.guesslikeData.map(function(elem,index){
								return (<li key={index} onClick={()=>Callback('goodsDetails',elem.id)}>
											<div className={styles.homeGuessLike_img}>
												<img className='homeGuessLike_img' src={elem.goodsPic?elem.goodsPic:'./src/assets/goodsDefaultpic_ing.png'}/>
												{elem.isAdFee?<Goods_Icon num='1' icon1='1'/>:""}
											</div>
											<p>{elem.name}</p>
											<div className={styles.homeGuessLike_preli}>
												<span>¥{elem.currentPrice}</span>
												<s>¥{elem.markPrice}</s>
											</div>
										</li>)
							}):''}
						</ul>
						<Loading getLoadFun={laodfun} reqFun={reqFun} page={this.state.d_page}/>
					</div>
				)
			}else if((goodsData.length===0)&&!come){
				return (
					<DefaultPage showDefault={showDefault} default_ids={default_id} />
				)
			}else if((goodsData.length===0)&&come){
				return(
					<div className={ajStyles.defaultPageContainer}>
						<div className={ajStyles.defaultPic} >
							<img src="src/assets/default_withoutData.png" alt="pic" />
						</div>
						<p>暂无数据!</p>
						<span className={ajStyles.defaultHint}>页面暂无数据，去商城首页看看吧</span>
					</div>
				)
			}else{
				return(
					<div className={styles.homeGuessLike_box}>
						<ul className={styles.homeGuessLike_goods}>
							{this.state.guesslikeData?this.state.guesslikeData.map(function(item,index){
								return  <li key={index} onClick={()=>Callback('/GoodsPage/'+item.goodsId)}>
											<div className={styles.homeGuessLike_img}>
												<img className='homeGuessLike_img' src={item.mainPic?item.mainPic:'./src/assets/goodsDefaultpic_ing.png'}/>
												{item.isAdFee?<Goods_Icon num='1' icon1='1'/>:""}
											</div>
											<p>{item.goodsName}</p>
											<div className={styles.homeGuessLike_preli}>
												<span>¥{item.currentPrice}</span>
												<s>¥{item.markPrice}</s>
											</div>
										</li>
							}):''}
						</ul>
						<Loading getLoadFun={laodfun} reqFun={reqFun} page={this.state.d_page}/>
					</div>
				)
			}
		}
		componentWillMount(){
			_this=this
		}
		componentDidMount(){
			$('.homeGuessLike_img,.homeGuessLike_img img').css('height',function(){
				return $('.homeGuessLike_img').width()+'px'
			})
		}
		componentDidUpdate(){
			$('.homeGuessLike_img,.homeGuessLike_img img').css('height',function(){
				return $('.homeGuessLike_img').width()+'px'
			})
			PtData(typePt)
		}
	}
	return <HomeGuessLike/>
}

export default HomeGuessLike
