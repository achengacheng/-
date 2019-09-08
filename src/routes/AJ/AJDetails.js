import React from 'react';
import { connect } from 'dva';
import $ from 'jquery';
import styles from '../../style/AJ/AJDetails.css';
import AJIntroduce from '../../components/AJDetails/AJIntroduce';
import ChaPop from '../../components/PublicComponents/ChaPop';//提示语
import FxPop from'../../components/PublicComponents/FxPop'

const AJDetails = ({ dispatch,AJIntroduceData,location }) => {
	//console.log(AJIntroduceData.res_msg_datas,AJIntroduceData.res_goods_datas,AJIntroduceData.res_eva_datas)
  let merchantId = location.pathname.slice(location.pathname.lastIndexOf('/')+1);//艾家Id
  let hintFunAJ,fxPopfun;
	function chooseToGo(type){
		dispatch({
			type:'AJIntroduceData/chooseToGo',
			payload:type
		})
	}
  function HintWords(popDom){
			hintFunAJ = popDom.Popfun;
		}
	/*关注艾家的方法*/
	function toggleLove(data,love,fun) {
		dispatch({
			type:'AJIntroduceData/loveComment',
			payload:data,
			love:love,
			callBack:fun
		})
	}
	function goBack(){
		if(sessionStorage.getItem('boundCompanyId')){
			window.location.href="#/"
		}else{
			window.history.go(-1)
		}
	}
  /*相关商品-上拉加载更多的方法*/
	function addGoodsDatas(page,d_this){//page传递新页数 这里没用,d_this请求成功后回调到loading
		let num = 10;//每页条数
		let data = {
			merchantId:merchantId,
			fsxz:false,
			_this:d_this,
			page:page,
			max:num
		}
		dispatch({
			type:'AJIntroduceData/getGoodsData',
			payload:data
		})
	}
  /*评价报告-上拉加载更多的方法*/
	function addEvaDatas(page,d_this){//page传递新页数 这里没用,d_this请求成功后回调到loading
		let num = 10;//每页条数
		let data = {
			merchantId:merchantId,
      userId:sessionStorage.getItem("id"),
			fsxz:false,
			_this:d_this,
			page:page,
			max:num
		}
		dispatch({
			type:'AJIntroduceData/getEvaData',
			payload:data
		})
	}
	function FxDomFun(fxDom) {//分享引导
		fxPopfun=fxDom.fxPopfun
	}
	function resFxFun(msg,typs) {//分享回调
		hintFunAJ(msg)
		fxPopfun(false)
	}
	function wxShareFun(datas){ //分享
		dispatch({
			type:'AJIntroduceData/wxShareFun',
			data:datas,
			fxFun:resFxFun
		})
	}
	class AJDetails extends React.Component{
    constructor(props){
			super(props);
			this.hintFunAJs = this.hintFunAJs.bind(this)
		}
    /*简单信息提示框*/
    hintFunAJs(msg){
      hintFunAJ(msg)
    }
	render(){
			if(AJIntroduceData.res_msg_datas&&AJIntroduceData.res_goods_datas){
				return (
					<div className={styles.AJDetailsContainer} >
						<div className={styles.AJDetailsHeader} >
							<i className={styles.headerArr} onClick={()=>goBack()} ></i>
							<i id="wxShare" className={styles.headerShare}></i>
						</div>
						<div className={styles.AJDetailsBg} >
							<img src={ AJIntroduceData.res_msg_datas.pic } alt='bgImg'/>
						</div>
            			<ChaPop HintWords={ HintWords }/>
            			<FxPop FxDomFun={FxDomFun}/>
						<AJIntroduce IntroduceData = { AJIntroduceData } chooseToGo = { chooseToGo } toggleLove = { toggleLove } hintFunAJ = { this.hintFunAJs } merchantId={ merchantId } getGoodsFun = { addGoodsDatas } getEvaFun = { addEvaDatas } location = { location.pathname }/>
					</div>
				)
			}else{
				return (
					<div className={styles.AJDetailsContainer} >
						<div className={styles.AJDetailsHeader} >
							<i className={styles.headerArr} onClick={()=>goBack()} ></i>
							<i className={styles.headerShare}></i>
						</div>
					</div>
				)
			}
		}
		componentDidMount() {
			$(window).scrollTop(0);
			$('#wxShare').click(function(){
				if(AJIntroduceData.AJshareMsg){
					// console.log(AJIntroduceData.AJshareMsg)
					wxShareFun(AJIntroduceData.AJshareMsg)
					fxPopfun(true)
				}else{
					hintFunAJ("暂时不能分享")
				}
			})	
		}
	}
	return <AJDetails />
};

export default connect(({ AJIntroduceData }) => ({
  AJIntroduceData
}))(AJDetails);
