import React from 'react';
import $ from 'jquery';
import { connect } from 'dva';
import styles from '../../style/goods/goodsDetails.css';
import Header from '../../components/PublicComponents/HeaderReturn';
import GoodsDetailsPage from '../../components/Goods/GoodsDetails/GoodsDetailsPage';//商品详情介绍
import GoodsImageText from '../../components/Goods/GoodsImageText';//商品图文
import GoodsAllEva from '../../components/Goods/GoodsAllEva';//商品评价
import GoodsSpecial from '../../components/Goods/GoodsSpecial';//商品专题
import MaskLayer from '../../components/PublicComponents/MaskLayer';//蒙版
import GoodsServiceTab from '../../components/Goods/GoodsTab/GoodsServiceTab';//服务说明/参数说明
import GoodsStandardTab from '../../components/Goods/GoodsTab/GoodsStandardTab';//规格选项卡
import ChaPop from '../../components/PublicComponents/ChaPop';//提示框
import DefaultPage from '../../components/PublicComponents/DefaultPage';//缺省页面
// import BigPicture from '../PublicComponents/BigPicture';//展示大图组件
import FxPop from '../../components/PublicComponents/FxPop'

var isScoll,saveHeight;
var tabId;
var useGoodsDatas,ChangeID,detailFun,standardTab;
var cartNo,isLove;
const GoodsPage = ({ dispatch,goodsData,location }) => {
	let skuIdmoe=''
	if(goodsData.res_goods_datas){
		for(var i=0;i<goodsData.res_goods_datas.goodsMsg.length;i++){
			if(goodsData.res_goods_datas.goodsMsg[i].isSeckill){
				skuIdmoe=goodsData.res_goods_datas.goodsMsg[i].skuId
				break;
			}else if(goodsData.res_goods_datas.goodsMsg[i].isDefault){
				skuIdmoe=goodsData.res_goods_datas.goodsMsg[i].skuId
			}
			
		}
	}
	let page = 1;
	/*有用户信息*/
	if(goodsData.userMsg){
		isLove = goodsData.userMsg.isCollection
	}else{
		isLove = false
	}
	if(sessionStorage.getItem("scNO")){
		if(Number(sessionStorage.getItem("scNO"))>=9){
			cartNo = '9+';
		}else{
			cartNo = Number(sessionStorage.getItem("scNO"));
		}
	}else{
		cartNo = 0;
	}
	let goodsId = location.pathname.slice(location.pathname.lastIndexOf('/')+1);
	let _this,allDatas,hasAd,allType=true;
	/*商品介绍绑定方法*/
	function getGoodsDom(dom){
		detailFun=dom.changeData
	}
	/*加入购物车方法*/
	function addCart(data,fun) {
		dispatch({
			type:'goodsData/addCart',
			payload:data,
			callBack:fun
		})
	}
	/*未登录跳转至登录页面*/
	function goToLogin() {
		dispatch({
			type:'goodsData/goToLogin',
			payload:location.pathname
		})
	}
	/*商品详情页跳转至广告费排行页面/跳转至某页面*/
	function goToAd(data) {
		dispatch({
			type:'goodsData/goToAd',
			payload:data
		})
	}
	/*收藏商品方法*/
	function toggleLove(data,love,fun) {
		dispatch({
			type:'goodsData/loveGoods',
			payload:data,
			love:love,
			callBack:fun
		})
	}
	/*根据评价等级获取数据*/
	function levelEvaData(level,fun) {
		let data = {
			goodsId:goodsId,
			userId:sessionStorage.getItem("id"),
			fsxz:true,
			page:1,
			max:10,
			level:level
		}
		dispatch({
			type:'goodsData/levelEvaData',
			payload:data,
			callBack:fun
		})
	}
	/*获取有图数据*/
	function picEvaData(fun) {
		let data = {
			goodsId:goodsId,
			userId:sessionStorage.getItem("id"),
			fsxz:true,
			page:1,
			max:10
		}
		dispatch({
			type:'goodsData/picEvaData',
			payload:data,
			callBack:fun
		})
	}
	/*专题-上拉加载更多的方法*/
	function addGoodsSpecial(page,d_this){//page传递新页数 这里没用,d_this请求成功后回调到loading
		let num = 10;//每页条数
		let data = {
			goodsId:goodsId,
			fsxz:false,
			_this:d_this,
			page:page,
			max:num
		}
		dispatch({
			type:'goodsData/getSpecialData',
			payload:data
		})
	}
	/*全部评价-上拉加载更多的方法*/
	function addGoodsEva(page,d_this){
		let num = 10;//每页条数
		let data = {
			goodsId:goodsId,
			userId:sessionStorage.getItem("id"),
			fsxz:false,
			_this:d_this,
			page:page,
			max:num
		}
		dispatch({
			type:'goodsData/getEvaData',
			payload:data
		})
	}
	/*评价等级-上拉加载更多的方法*/
	function addEvaLevel(page,d_this,level){
		let num = 10;//每页条数
		let data = {
			goodsId:goodsId,
			userId:sessionStorage.getItem("id"),
			fsxz:false,
			_this:d_this,
			page:page,
			max:num,
			level:level
		}
		dispatch({
			type:'goodsData/levelEvaData',
			payload:data
		})
	}
	/*有图评价-上拉加载更多的方法*/
	function addEvaPic(page,d_this){
		let num = 10;//每页条数
		let data = {
			goodsId:goodsId,
			userId:sessionStorage.getItem("id"),
			fsxz:false,
			_this:d_this,
			page:page,
			max:num
		}
		dispatch({
			type:'goodsData/picEvaData',
			payload:data
		})
	}
	let fxPopfun
	function FxDomFun(fxDom) {//分享指引
		fxPopfun=fxDom.fxPopfun
	}
	function resFxFun(msg,typs) {//分享完成回调
		standardTab(msg)
		console.log(msg,typs)
		fxPopfun(false)		
	}
	function wxShareFun(datas) {//分享
		dispatch({
			type:'seckillPageData/wxShareFun',
			data:datas,
			fxFun:resFxFun
		})
	}
	/*加入收藏是否成功后回调*/
  function isSuccess(love,msg){
    	if(msg){
    		if(love){
    			standardTab('收藏成功')
    			isLove = true
    		}else{
    			standardTab('取消收藏成功')
    			isLove = false
    		}
    	}else{
    		if(love){
    			standardTab('收藏失败');
    			$('#love').css('display','block');
	    		$('#love2').css('display','none');
    		}else{
    			standardTab('取消收藏失败');
    			$('#love').css('display','none');
	    		$('#love2').css('display','block');
    		}
    	}
    }
	class GoodsPage extends React.Component {
		constructor(props){
			super(props);
			this.state={
				type:0,
				tab:0,
				service:[],
				standard:{},
				skuId:skuIdmoe,
				allDataup:false,
				allEva:false,
				allSpecial:false
			}
			this.changeAllData=this.changeAllData.bind(this)
			this.changeEvaData=this.changeEvaData.bind(this)
			this.changeSpecialData=this.changeSpecialData.bind(this)
		}
		render(){
			allDatas = this.state.allDataup?this.state.allDataup.goodsMsg:false;
			hasAd = this.state.allDataup?this.state.allDataup.adMsg:false;
			if(allDatas){	
				for(let i=0;i<allDatas.length;i++){
					if(allDatas[i].isSeckill){
						useGoodsDatas = allDatas[i]
						break;
					}else if(allDatas[i].isDefault){
						useGoodsDatas = allDatas[i]
					}
				}
				if(!useGoodsDatas){
					useGoodsDatas=allDatas[0]
				}
			}
			const ThisType = ( {whichType} ) => {
				switch(whichType){
				case 0:
					if(allDatas){
					  	return (
							<GoodsDetailsPage goodsId = { goodsId } evaAllData = { this.state.allEva } getGoodsDom = { getGoodsDom } goodsMsg = { useGoodsDatas } goodsCarousel={ goodsCarousel } goodsSimilar={ goodsSimilar } pullUp = {type => this.typeChange(type)} checkTab = { (tab,data,_id) => this.checkTab(tab,data,_id) } isLove = { isLove } goToAd = { goToAd } hasAd = { hasAd } />
						)
					}else{
						return <div></div>
					}
				  	//break;
				case 1:
				  	return (
						<GoodsImageText isLove = { isLove } details = { useGoodsDatas.detail }/>
					)
				  	//break;
				case 2:
				  	return (
											<GoodsAllEva chooseToGo = { goToAd } evaAllData = { this.state.allEva } isLove = { isLove } levelEvaData = { levelEvaData } picEvaData = { picEvaData } getAllFun={ addGoodsEva } getLevelFun={ addEvaLevel } getPicFun={ addEvaPic } page={ page } hintFun = { standardTab }/>
					);
				  	//break;
				case 3:
				  	return (
						<GoodsSpecial chooseToGo = { goToAd } specialDatas = { this.state.allSpecial } isLove = { isLove } come = {'goods'} getFun={ addGoodsSpecial } page={ page }/>
					);
				  	//break;
				default:
					if(allDatas){
					  	return (
							<GoodsDetailsPage goodsId = { goodsId } getGoodsDom={getGoodsDom} goodsMsg = { useGoodsDatas } goodsCarousel={ goodsCarousel } goodsSimilar={ goodsSimilar } pullUp = {type => this.typeChange(type)} checkTab = { (tab,data,_id) => this.checkTab(tab,data,_id) } allDatas={allDatas} isLove = { isLove } goToAd = { goToAd } hasAd = { hasAd }/>
						)
					}else{
						return <div></div>
					}
				 	//break;
				}
			}
			/*轮播方法*/
			function goodsCarousel() {
				dispatch({
					type:'goodsData/goodsCarousel',
				})
			}
			/*同类推荐滑动*/
			function goodsSimilar(){
				dispatch({
					type:'goodsData/goodsSimilar',
				})
			}
			if(!goodsData.hasGoods){
				let showDefault = true;
				let default_id = 5;
				return(
					<div className={ styles.goodsDetailsContainer }>
						<Header	left_show='1' head_title='' header_ids='6'/>
						<DefaultPage showDefault={showDefault} default_ids={default_id} />
					</div>
				)
			}else if(allDatas){
				return(
					<div className={ styles.goodsDetailsContainer }>
						<Header	left_show='1' head_title='' header_ids='6' right_fun = { this.checkLove } custom={{id:3,val:location.back}}/>
						<div className={ styles.goodsDetailsType } id="secNav">
							<p onClick={() => this.typeChange(0)} className={ this.state.type===0?styles.goodsTypeCheck:'' }>商品</p>
							<p onClick={() => this.typeChange(1)} className={ this.state.type===1?styles.goodsTypeCheck:'' }>图文</p>
							<p onClick={() => this.typeChange(2)} className={ this.state.type===2?styles.goodsTypeCheck:'' }>评价</p>
							<p onClick={() => this.typeChange(3)} className={ this.state.type===3?styles.goodsTypeCheck:'' }>专题</p>
						</div>
						<div id="thisType">
							<ThisType whichType={ this.state.type }/>
						</div>
						<footer id="goodsFooter">
							<div className={ styles.goodsFooterIcon }>
								<div>
									<i className={ styles.goodsServiceIcon }></i>
									<p>客服</p>
								</div>
								<div className={ styles.goodsToCart } onClick={() => this.goToCart()}>
									<i className={ styles.goodsCartIcon }></i>
									<p>购物车</p>
									<span className={ `${styles.goodsCartNum} ${cartNo===0?styles.hiddenThis:''}` } id="addCartNo">{ cartNo }</span>
								</div>
							</div>
							<p className={ styles.goodsCart } onClick={() => this.checkTab(3,allDatas,useGoodsDatas.skuId)}>加入购物车</p>
							<p className={ styles.goodsBuy } onClick={() => this.checkTab(4,allDatas,useGoodsDatas.skuId)}>立即购买</p>
						</footer>
						<ChaPop HintWords={ this.HintWords }/>
						<MaskLayer disappear = { this.disappear }/>
						<GoodsServiceTab 
							tabId={ this.state.tab } 
							disappear = { this.disappear } 
							serviceData = { this.state.service}
						/>
						<GoodsStandardTab 
							history={this.props.history} 
							tabId={ this.state.tab } 
							skuId = { this.state.skuId } 
							standard = { allDatas } 
							disappear = { this.disappear } 
							standardTab={ standardTab } 
							goodsId = { goodsId } 
							addCart = { addCart } 
							goToLogin = { goToLogin }
						 />
						<FxPop FxDomFun={FxDomFun}/>
					</div>
				)
			}else{
				return(
					<div className={ styles.goodsDetailsContainer }>
						<Header	left_show='1' head_title='' header_ids='6'/>
						<div className={ styles.goodsDetailsType } id="secNav">
							<p onClick={() => this.typeChange(0)} className={ this.state.type===0?styles.goodsTypeCheck:'' }>商品</p>
							<p onClick={() => this.typeChange(1)} className={ this.state.type===1?styles.goodsTypeCheck:'' }>图文</p>
							<p onClick={() => this.typeChange(2)} className={ this.state.type===2?styles.goodsTypeCheck:'' }>评价</p>
							<p onClick={() => this.typeChange(3)} className={ this.state.type===3?styles.goodsTypeCheck:'' }>专题</p>
						</div>
					</div>
				)
			}
		}
		/*商品*/
		changeAllData(){
			if(goodsData.res_goods_datas!==''){
	    		this.setState({
	    			allDataup:goodsData.res_goods_datas
	    		})
	    		allType=false
			}
		}
		/*评价*/
		changeEvaData(){
			if(goodsData.res_eva_data){
	    		this.setState({
	    			allEva:goodsData.res_eva_data,
	    		})
			}
		}
		/*专题*/
		changeSpecialData(){
			if(goodsData.res_special_datas){
	    		this.setState({
	    			allSpecial:goodsData.res_special_datas,
	    		})
			}
		}
		/*点击变换二级导航*/
		typeChange(i){
			$(window).scrollTop(0)
      this.setState({
          type:i
      })
      sessionStorage.setItem("goodsType",i);
    }


	  /*简单提示框*/
	  HintWords(popDom){
			standardTab = popDom.Popfun
		}
		/*点击跳转至购物车*/
		goToCart(){
			if(sessionStorage.getItem("id")){
				goToAd('/ShoppingCart')
			}else{
				goToAd('/Login?'+location.pathname)
			}
		}
		/*点击出现选项卡方法*/
		checkTab(id,data,skuId){
			let skuIds
			if(ChangeID){
				skuIds=ChangeID
			}else{
				skuIds=skuId
			}
			saveHeight = $(window).scrollTop();
			this.setState({
          		tab:id
      		});
     		tabId = id;
			/*0：服务说明；1：商品参数；2：选择规格；3：加入购物车；4：立即购买*/
			switch(id){
				case 0:case 1:					
						/*蒙版出现*/
			    	$('#maskbox').css({
			    		'display':'block'
			    	})
			    	$('body,html').css({
			    		'height':'100%',
						'overflow':'hidden'
					})
					$('#goodsFooter').css({
						'display':'none'
					});
				  	this.setState({
			            service:data
			        });
			        setTimeout(function(argument) {
			        	$('#serviceTab').slideDown();
			        },100)
			        
				  	break;
				case 2:case 3:case 4:
						if(sessionStorage.getItem("id")){
							/*蒙版出现*/
				    	$('#maskbox').css({
				    		'display':'block'
				    	})
				    	$('body,html').css({
				    		'height':'100%',
								'overflow':'hidden'
							})
							$('#goodsFooter').css({
								'display':'none'
							});
							this.setState({
				            standard:data,
				            skuId:skuIds
				        });
					  	$('#standardTab').slideDown()
						}else{
							goToAd('/Login?'+location.pathname)
						}
				  	break;
				default:
				  break;
				}
		}
		/*点击蒙版消失的方法*/
    disappear(id){
    	if(id===0){
    		return false
    	}
			$('#maskbox').css({
				'display':'none'
			});
			$('body,html').css({
				'overflow':'',
				'height':''
			})
			$('#goodsFooter').css({
				'display':''
			})
			switch(tabId){
				case 0:case 1:
					$('#serviceTab').slideUp()
				  	break;
				case 2:case 3:case 4:
					if(id){
		    		ChangeID=id;
		    		let datas;
		    		allDatas.map(function(i,k){
							if(i.skuId===id){
								datas = i
							}
							return false
						})
		    		if(_this.state.type==0){
		    			detailFun(datas)
		    		}
		    	}
			  	$('#standardTab').slideUp()
			  	break;
				default:
				  break;
			}
			$(window).scrollTop(saveHeight)
			saveHeight = ""
		}
		/*点击收藏/取消*/
		checkLove(data){
			if(sessionStorage.getItem("id")){
				let loveMsg = {
					goodsId:goodsId,
					userId:sessionStorage.getItem("id")
				}
				if(data==='no'){//没有收藏
					$('#love').css('display','none');
		    		$('#love2').css('display','block');
		    		toggleLove(loveMsg,true,isSuccess)
				}else{//收藏
					$('#love').css('display','block');
		    		$('#love2').css('display','none');
		    		toggleLove(loveMsg,false,isSuccess)
				}
			}else{
				goToAd('/Login?'+location.pathname)
			}
		}
	  /*滚动/固定二级导航*/
    isScoll(){
			var top=$(window).scrollTop()
	    	if(top>87){
				$('#secNav').css({
					"top":"0px"
				})
				$('#headerReturn').slideUp()
			}else{
				$('#secNav').css({
					"top":"0.88rem"
				})
				$('#headerReturn').slideDown()
			}
		}
    /*监听滚动方法*/
    scroll_fun(){
    	window.addEventListener('scroll',isScoll,false)
    }
    componentWillMount(){
    	if(sessionStorage.getItem("goodsType")==='2'){
    		this.setState({
	            type:2
	        })
    	}
    	if(goodsData.res_goods_datas){
    		if(!this.state.allDataup){
    			this.changeAllData()
    		}
    	}
    	if(goodsData.res_eva_data){
    		if(!this.state.allEva){
    			this.changeEvaData()
    		}
    	}
			if(goodsData.res_special_datas){
    		if(!this.state.allSpecial){
    			this.changeSpecialData()
    		}
    	}
    	_this=this
    }
	  componentDidMount(){
			//右上方是否收藏展示
    	if(isLove){
    		$('#love').css('display','none');
    		$('#love2').css('display','block');
    	}
    	$('#wxShare').click(function(){
    		console.log()
    		if(goodsData.goodsShareMsg){
    			fxPopfun(true)
				wxShareFun(goodsData.goodsShareMsg)			
    		}else{
    			console.log('分享失败,请稍后再试!')
    		}
    	})
		isScoll = this.isScoll;
    	this.scroll_fun();
	  }
	  componentWillUnmount(){
	  		ChangeID=''
			window.removeEventListener('scroll',isScoll,false)
			$('body,html').css({'height':'','overflow':''})

		}
	}
	return <GoodsPage />
}

export default connect(({ goodsData }) => ({
  goodsData
}))(GoodsPage);
