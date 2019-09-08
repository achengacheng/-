import React from 'react';
import { connect } from 'dva';
import $ from 'jquery'
import styles       from '../../style/home/homePage.css';
import Header   	from '../../components/PublicComponents/Header';// 公共头部
import Footer       from '../../components/PublicComponents/footerNav';//公共底部导航
import HomeCarousel from '../../components/Home/HomePage/HomeCarousel';//banner轮播
import HomeNav      from '../../components/Home/HomePage/HomeNav';//首页导航
import HomeMessage  from '../../components/Home/HomePage/HomeMessage';//首页消息
import HomePlate    from '../../components/Home/HomePage/HomePlate1';//广告位
import HomeAjArea   from '../../components/Home/HomePage/HomeAjArea';	//艾家专区
import HomeAjList   from '../../components/Home/HomePage/HomeAjList'; //艾家列表
import HomeTimeBuy  from '../../components/Home/HomePage/HomeTimeBuy'; //限时抢购
import HomeGuessLike from '../../components/Home/HomePage/HomeGuessLike' //猜你喜欢
import HomeSpecial  from '../../components/Home/HomePage/HomeSpecial' //专题板块3
import HomeSpecialP1 from '../../components/Home/HomePage/HomeSpecialP1'//专题板块1
import HomeSpecialP2 from '../../components/Home/HomePage/HomeSpecialP2'//专题板块2
import HomeGoodsP1 from '../../components/Home/HomePage/HomeGoodsP1'  //商品板块1
import HomeRecommend from '../../components/Home/HomePage/HomeRecommend';//商品板块2
import HomeHotBuy   from '../../components/Home/HomePage/HomeHotBuy'; //商品板块3
import HomeAdvertsement from '../../components/Home/HomePage/HomeAdvertisement'//广告位
import ChaPop from  '../../components/PublicComponents/ChaPop'

const HomePage = ({dispatch,homePageData,location,history}) => {
	let page=0;//默认第一页
	function Callback(site,id,p_name){//点击回调app值
		console.log(site,id)		
		var data,u=navigator.userAgent;
		if(id!=''||id!=undefined||id!=null){
			data=JSON.stringify({site:site,id:id});
		}else{
			data=JSON.stringify({site:site});
		}
		if(homePageData.isApp){
			if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
	         //安卓手机
		         if(site==='flashSale'){
			         window.android.get({site:'second',id:'#/SeckillPage'})
		         }else{
		         	 window.android.get(data)
		         }
		    }else if (u.indexOf('iPhone') > -1) {
		         //苹果手机
		          if(site==='flashSale'){
		          	window.location.href='/#/?second&#/SeckillPage'	
		          }else{
		          	window.location.href='/#/?'+site+'&'+id	
		          }
		         		
		    }
	    }else{
	    	switch(site){
	    		case "fresh"://促销
	    	 		history.push({pathname:"/ClassifyList/"+id,hash:'home'})
	    	 		break;
	    	 	case "web"://商品详情
	    	 		window.location.href=id
	    	 		break;
	    	 	case "Invitation"://邀请好友
	    	 		if(sessionStorage.getItem('id')){
	    	 			history.push({pathname:'/mypage/Invite'})
	    	 		}else{
	    	 			history.push({pathname:'/Login',search:'/mypage/Invite'})
	    	 		}	    	 		
	    	 		break;		
	    		case "goodsDetails"||"goods"://商品详情
	    			history.push({pathname:'/GoodsPage/'+id})
	    			break;
    			case "goods"://商品详情
	    			history.push({pathname:'/GoodsPage/'+id})
	    			break;
	    		case 'massage'://全部消息
	    			history.push({pathname:'/mypage/MsgPage'})
	    			break;
	    		case 'massageDetails'://消息详情
	    			history.push({pathname:'mypage/ServePage/HelpContent/'+id})
	    			break;
	    		case 'AJArea'://艾家专题
	    			history.push({pathname:"/AJPage/AJDetails/"+id})
	    			break;
	    		case 'AJAreaMoer'://更多艾家
	    			history.push({pathname:"/AJPage"})
	    			break;
	    		case 'merchant'://品牌艾家
	    			history.push({pathname:"/AJPage/AJDetails/"+id})
	    			break;
	    		case 'BbrandAJ'://品牌艾家
	    			history.push({pathname:"/AJPage/AJDetails/"+id})
	    			break;
	    		case 'BbrandAJMoer': //更多艾家
	    			history.push({pathname:"/BrandPage"})
	    			break;
	    		case 'special': //专题详情
	    			history.push({pathname:"/SpecialPage/SpecialDetail/"+id})
	    			break;
	    		case 'theme': //专题详情
	    			history.push({pathname:"/SpecialPage/SpecialDetail/"+id})
	    			break
	    		case 'specialMoer': //专题列表
	    			history.push({pathname:"/SpecialPage"})
	    			break;
	    		case 'myOrderList': //全部订单
	    			history.push({pathname:"/mypage/MyOrder"})
	    			break;
	    		case 'goodsClassify'://分类
	    			history.push({pathname:"/ClassifyList/"+id})
	    			break;
	    		case 'goodsMoer': 			
	    			history.push({pathname:"/ClassifyList/"+id,hash:'home'})
	    			break;
	    		case 'themeClassify':
	    			history.push({pathname:"/SpecialPage",search:id})
	    			break;
	    		case 'flashSale':
	    			window.location.href='#/SeckillPage'
	    			break;
	    		case 'merchantClassify':
	    			window.location.href='#/AJPage/ClassifyAJ/'+id
	    			break;
	    		case 'article':
	    			history.push({pathname:"/mypage/ServePage/HelpContent/"+id})
	    			break;
	    		case 'articleClassify':
	    			history.push({pathname:"/mypage/ServePage"})
	    			break;	    						
	    		case 'second':
	    			window.location.href=id
	    			break;
	    		case 'myOrderList':
	    			history.push({pathname:"/myPage/MyOrder"})
	    			break;		    			
	    	 }
	    }

	}
	let standardTab
	function HintWords(popDom){//提示语
		standardTab = popDom.Popfun
	}
	function color_click(op){
		dispatch({
		 	type: 'homePageData/isScoll',
		  	top:op
		})
	}
	function resFxFun(msg,typs) {//分享回调
		if(typs){
			standardTab(msg)
		}

	}
	function wxShareFun(datas) {//分享
		dispatch({
			type:"homePageData/wxShareFun",
			data:datas,
			fxFun:resFxFun
		})
	}
	function addGuessLike(page,d_this){//page传递新页数 这里没用,d_this请求成功后回调到loading
		let num=8;//每页条数
		dispatch({
			type:'homePageData/GuessLike',
			fsxz:false,
			_this:d_this,
			pages:page,
			nums:num
		})
	}
	function GuessLike(){
		dispatch({
			type:'homePageData/GuessLike',
			fsxz:true,		
		})
	}
	function left_fun(){
		let useID=sessionStorage.getItem('id')
		if(useID===""||useID===undefined||useID===null){
			window.location.href='#/Login?/mypage/MsgPage'
		}else{
			window.location.href='#/mypage/MsgPage'
		}
	}
	const Changeable=({datas,Callback})=>{//自定义模块
		
		return (<div>
					{datas.map(function(item,index){
							if(item.promotionType==="GOODS_TYPE"){
								if(item.renderType==="SLIDE_SHOW"){
									if(item.promotionDetail.length!==0){
										return (<div key={index}><HomeHotBuy  Callback={Callback} Delitdata={item}/>
													{item.advertise.length?<HomeAdvertsement CarouselData={item.advertise} ifoneImg='1' Callback={Callback}/>:''}
												</div>)
									}
								}else if(item.renderType==="VERTICAL_SHOW"){
									if(item.promotionDetail.length!==0){
										return (<div key={index}><HomeRecommend key={index} Callback={Callback} Delitdata={item}/>
													{item.advertise.length?<HomeAdvertsement CarouselData={item.advertise} ifoneImg='1' Callback={Callback}/>:''}
												</div>)
									}
								}else if(item.renderType==="HORIZONTAL_SHOW"){
									if(item.promotionDetail.length!==0){
										return (<div key={index}> <HomeGoodsP1 key={index} Callback={Callback} Delitdata={item}/>
													{item.advertise.length?<HomeAdvertsement CarouselData={item.advertise} ifoneImg='1' Callback={Callback}/>:''}
												</div>)
									}
								}
							}else if(item.promotionType==="THEMATIC_TYPE"){								
								if(item.renderType==="SLIDE_SHOW"){
									if(item.promotionDetail.length!==0){
										return (<div key={index}> <HomeSpecial key={index} Callback={Callback} Delitdata={item}/>
													{item.advertise.length?<HomeAdvertsement CarouselData={item.advertise} ifoneImg='1' Callback={Callback}/>:''}
												</div>)

									}
								}else if(item.renderType==="HORIZONTAL_SHOW"){

									if(item.promotionDetail.length!==0){
										return (<div key={index}> <HomeSpecialP1  key={index} Callback={Callback} Delitdata={item}/>
													{item.advertise.length?<HomeAdvertsement CarouselData={item.advertise} ifoneImg='1' Callback={Callback}/>:''}
												</div>)
									}
								}else if(item.renderType==="VERTICAL_SHOW"){
									if(item.promotionDetail.length!==0){
										return (<div key={index}>  <HomeSpecialP2  key={index} Callback={Callback} Delitdata={item}/>
													{item.advertise.length?<HomeAdvertsement CarouselData={item.advertise} ifoneImg='1' Callback={Callback}/>:''}
												</div>)
									}
								}
							}
						})
					}
				</div>)
	}
	class HomePage extends React.Component{
		render(){
			let boundId=sessionStorage.getItem('boundCompanyId')
			return (
				<div className={homePageData.isApp?'':styles.homePageBox}>
					{homePageData.isApp?'':<Header left_fun={left_fun} left_icon='0' right_icon='1'/>}
					{homePageData.HomeAllData?homePageData.HomeAllData.AStep.length>0?<HomeCarousel Callback={Callback} CarouselData={homePageData.HomeAllData.AStep}/>:'':''}
					{homePageData.HomeAllData?homePageData.HomeAllData.BStep.length?<HomeNav datas={homePageData.HomeAllData.BStep} Callback={Callback}/>:'':''}
					{homePageData.HomeAllData?homePageData.HomeAllData.articleDataStep?<HomeMessage datas={homePageData.HomeAllData.articleDataStep} Callback={Callback}/>:'':''}
					{homePageData.HomeAllData?homePageData.HomeAllData.JStep.length?homePageData.HomeAllData.JStep[0].data.length?<HomeTimeBuy Callback={Callback} isApp={homePageData.isApp} TimeData={homePageData.HomeAllData.JStep[0].data}/>:'':'':''}
					
					{homePageData.HomeAllData?homePageData.HomeAllData.CStep.length?<HomeAdvertsement CarouselData={homePageData.HomeAllData.CStep} ifoneImg='1' Callback={Callback}/>:'':''}
					{homePageData.HomeAllData?homePageData.HomeAllData.DStep.length?<HomePlate datas={homePageData.HomeAllData.DStep} Callback={Callback}/>:'':''}
					{homePageData.HomeAllData?homePageData.HomeAllData.EStep.length?<HomeAdvertsement CarouselData={homePageData.HomeAllData.EStep} ifoneImg='1' Callback={Callback}/>:'':''}
					{boundId==8000?"":homePageData.HomeAllData?homePageData.HomeAllData.FStep.length?<HomeAjArea Callback={Callback} datas={homePageData.HomeAllData.FStep[0]}/>:'':''}
					{homePageData.HomeAllData?homePageData.HomeAllData.GStep.length?<HomeAdvertsement CarouselData={homePageData.HomeAllData.GStep} ifoneImg='1' Callback={Callback}/>:'':''}
					{homePageData.HomeAllData?homePageData.HomeAllData.HStep.length?<HomeAjList datas={homePageData.HomeAllData.HStep[0]} Callback={Callback}/>:'':''}
					{homePageData.HomeAllData?homePageData.HomeAllData.IStep.length?<HomeAdvertsement CarouselData={homePageData.HomeAllData.IStep} ifoneImg='1' Callback={Callback}/>:'':''}


					{homePageData.HomeAllData?homePageData.HomeAllData.LStep?<Changeable Callback={Callback} datas={homePageData.HomeAllData.LStep}/>:'':''}

					{homePageData.GuessLikeData?<div className={styles.homeGuessLike_head}>
						<div>
							<p> <span>猜你喜欢</span></p>
						</div>
					</div>:""}
					{homePageData.GuessLikeData?<HomeGuessLike Callback={Callback} guessData={homePageData.GuessLikeData} getFun={addGuessLike} page={page}/>:""}
					{homePageData.isApp?'':<Footer NewLocation='0'/>}
					{homePageData.isApp?'':
						<div className={styles.goTopbox}>
							<i className={styles.kefu} id='kefu'></i>
							<i className={styles.goTop}></i>
						</div>}
					<ChaPop HintWords={ HintWords }/>
				</div>
			)
		}
		componentWillMount(){
			
		}
		componentDidMount(){
			$('#kefu').click(function(){
				window.location.href='#/Customerservice'
			})
			$('.'+styles.goTop).click(function(){
				 $("html,body").animate({scrollTop:0}, 1000);
			})
			if($(window).scrollTop()<=5){
				$('.'+styles.goTop).hide()
			}
			$(window).scroll(function(){//滑动头部样式
				if($(window).scrollTop()<=5){
					$('.'+styles.goTop).fadeOut()
				}else{
					$('.'+styles.goTop).fadeIn()
				}

			})
			if(homePageData.homeshareMsg){
				wxShareFun(homePageData.homeshareMsg)
			}
			if(homePageData.HomeAllData){
				if(!homePageData.GuessLikeData){
					GuessLike()
				}
				
			}
		}
		componentDidUpdate(){
			if(homePageData.HomeAllData){
				if(!homePageData.GuessLikeData){
					GuessLike()
				}
				
			}
		}
		componentWillUnmount(){
			$(window).unbind('scroll')
		}
	}
	return <HomePage/>

};

export default connect(({ homePageData }) => ({
  homePageData,
}))(HomePage);
