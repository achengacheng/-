import React from 'react';
import { connect } from 'dva';
import $ from 'jquery';
import styles from '../../style/seckillPage.css'
import Header from '../../components/PublicComponents/HeaderReturn'
import SeckillTime from '../../components/Seckill/SeckillTime'
import SeckillGoods from '../../components/Seckill/SeckillGoods'
import FxPop from '../../components/PublicComponents/FxPop'
import ChaPop from  '../../components/PublicComponents/ChaPop'
import HomeAdvertsement from '../../components/Home/HomePage/HomeAdvertisement'//广告位
const SeckillPage=({dispatch,seckillPageData,location,history})=>{
	console.log(seckillPageData,1412)
	let _this
	function getGoodFun(Id,dateId,Ttype) {
		dispatch({
			type:'seckillPageData/getGoodFun',
			Id:Id,
			dateId:dateId,
			d_this:_this,
			Ttype:Ttype
		})
	}
	function goodsDatas(d_this) {
		_this=d_this
	}

	function Callback(site,id){
		var data
		if(id!==''||id!==undefined||id!==null){
			data=JSON.stringify({site:site,id:id});
		}else{
			data=JSON.stringify({site:site});
		}
		var u = navigator.userAgent;
		if(seckillPageData.isApp){
	  		if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
		         //安卓手机
		         window.android.get(data)
		    } else if (u.indexOf('iPhone') > -1) {
		         //苹果手机
		         window.location.href='/#/?'+site+'&'+id
		    }
		}else{
			history.push({pathname:'/GoodsPage/'+id})
		}
	  
	}
	let fxPopfun,standardTab
	function FxDomFun(fxDom) {//分享指引
		fxPopfun=fxDom.fxPopfun
	}
	function resFxFun(msg,typs) {//分享完成回调
		standardTab(msg)
		fxPopfun(false)
	}
	function wxShareFun(datas) {//分享
		dispatch({
			type:'seckillPageData/wxShareFun',
			data:datas,
			fxFun:resFxFun
		})
	}
	function nofun(){
		console.log('无操作')
	}
	function HintWords(popDom){ //提示语
		standardTab = popDom.Popfun
	}
	class SeckillPage extends React.Component{
		render(){
			return(	<div className={styles.seckill_box}>	
						{seckillPageData.isApp?'':<Header left_show='1' head_title='限时抢购' header_ids='9'/>}
						{/*<img src="./src/assets/seckill_banner.png" alt="" className={styles.seckill_banner} id="seckill_banner"/>*/}
						{seckillPageData.BannarData?seckillPageData.BannarData.length>0?<HomeAdvertsement CarouselData={seckillPageData.BannarData}  Callback={nofun}/>:'':''}
						<SeckillTime timeData={seckillPageData.timeData} getGoodFun={getGoodFun} goodsData={seckillPageData.pageData}/>
						<SeckillGoods Callback={Callback} goodsData={goodsDatas} typeOpen={seckillPageData.typeOpen}/>
						<ChaPop HintWords={ HintWords }/>
						<FxPop FxDomFun={FxDomFun}/>	
					</div>)
		}
		componentWillMount (){	
			_this=this		
		}
		componentDidMount(){
			$(window).scrollTop('0px')
			$('#wxShare').click(function(){
				if(seckillPageData.timeshareMsg){
					wxShareFun(seckillPageData.shareMsg)
					fxPopfun(true)
				}else{
					standardTab("分享失败")
				}
			})	
			var u = navigator.userAgent;
			if(seckillPageData.isApp){
		  		if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
			        $('.'+styles.seckill_box).css('padding-top','0px')
			    }
			}
		}
		componentWillUnmount(){
			//window.removeEventListener('popstate',AppJian)
		}
		
	}
	return <SeckillPage/>
}
export default connect(({ seckillPageData }) => ({
    seckillPageData,
  }))(SeckillPage);