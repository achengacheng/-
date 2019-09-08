import React from 'react';
import { connect } from 'dva';
import $ from 'jquery';
import styles from '../../style/Special/special.css'
import Header from '../../components/PublicComponents/HeaderReturn'
import SpecialDetailBanner from '../../components/Special/SpecialDetailBanner'
import SpecialDetailText from '../../components/Special/SpecialDetailText'
import SpecialDetailGoods from '../../components/Special/SpecialDetailGoods'
import SpecialDetailRecommend from '../../components/Special/SpecialDetailRecommend'
import SpecialDetailComment from '../../components/Special/SpecialDetailComment'
import ChaPop from  '../../components/PublicComponents/ChaPop'
import FxPop from '../../components/PublicComponents/FxPop'
const SpecialDetail=({dispatch,SpecialPageData,location,history})=>{
	let standardTab,fxPopfun;
	function loveFuns(req,lol){ //收藏提醒
		if(req){
			if(lol===0){
				$('#love').hide();
				$('#love2').show();
				standardTab('收藏成功')
			}else{
				$('#love').show();
				$('#love2').hide();				
				standardTab('取消收藏')
			}	
		}else{
			if(lol===0){
				standardTab('收藏失败!')
			}else{
				standardTab('取消失败')
			}
		}
		
	}
	function loveFun(op){ //收藏
		let loveType
		if(op==="no"){			
			loveType=0
		}else{			
			loveType=1
		}	
		dispatch({
			type:'SpecialPageData/loveFunrep',
			data:SpecialPageData.DetailId,
			loca:location,
			popFun:loveFuns,
			loveType:loveType
		})
	}
	function resFxFun(msg,typs) {//分享回调
		standardTab(msg)
		fxPopfun(false)
	}
	function wxShareFun(datas){ //分享
		dispatch({
			type:'SpecialPageData/wxShareFun',
			data:datas,
			fxFun:resFxFun
		})
	}
	function RelateTheme(pages,reDataFun){ 
		dispatch({
			type:'SpecialPageData/RelateTheme',
			datas:SpecialPageData.DetailId,
			page:pages,
			reDataFun:reDataFun
		})
	}
	function HintWords(popDom){//提示语
		standardTab = popDom.Popfun
	}
	function FxDomFun(fxDom) {//分享引导
		fxPopfun=fxDom.fxPopfun
	}
	class SpecialDetail extends React.Component{
		render(){
			if(SpecialPageData.DetailData){
				return(
					<div style={{'paddingTop':'0.88rem'}}>
						<Header left_show='1' header_ids='6' right_fun={loveFun}/>
						<SpecialDetailBanner DetailData={SpecialPageData.DetailData}/>	
						<SpecialDetailText DetailData={SpecialPageData.DetailData}/>
						{<SpecialDetailGoods DetailData={SpecialPageData.DetailData}/>}
						<SpecialDetailComment datas={SpecialPageData.DetailComment} specialId={SpecialPageData.DetailId} history={history}/>
						<SpecialDetailRecommend datas={SpecialPageData.RelateTheme} RelateTheme={RelateTheme} history={history}/>	
						<ChaPop HintWords={ HintWords }/>
						<FxPop FxDomFun={FxDomFun}/>					
					</div>
				)
			}else{
				return(
					<div></div>
				)
			}
			
		}
		componentDidMount(){
			if(SpecialPageData.DetailData){				
				if(SpecialPageData.DetailData.userIsCollect){
					$('#love').hide();
					$('#love2').show()
				}else{
					$('#love').show();
					$('#love2').hide()
				}
			}
			$('#wxShare').click(function(){
				if(SpecialPageData.shareMsg){
					wxShareFun(SpecialPageData.shareMsg)
					fxPopfun(true)
				}else{
					standardTab("分享失败")
				}
			})	
		}	
		componentDidUpdate(){
			
		}
	}
	return 	<SpecialDetail/>
}
export default connect(({ SpecialPageData}) => ({
  SpecialPageData
}))(SpecialDetail);
