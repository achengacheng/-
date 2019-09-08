import React from 'react';
import { connect } from 'dva';
import $ from 'jquery';
import styles from '../../style/AJ/AJDetails.css';
import Header from '../../components/PublicComponents/HeaderReturn';
import EvaDetailsIntro from '../../components/AJDetails/EvaDetailsIntro';
import EvaOfAll from '../../components/AJDetails/EvaOfAll';
import ChaPop from '../../components/PublicComponents/ChaPop';//提示语

const AJEva = ({ dispatch,AJIntroduceData,location }) => {
	let isLove,hintFun;
	let commentId = location.pathname.slice(location.pathname.lastIndexOf('/')+1);
	/*获取评价详情的方法*/
	function getEvaDetailsData(data) {
		dispatch({
			type:'AJIntroduceData/getEvaDetailsData',
			payload:data
		})
	}
	/*收藏商品方法*/
	function toggleLove(data,love,fun) {
		dispatch({
			type:'AJIntroduceData/loveComment',
			payload:data,
			love:love,
			callBack:fun
		})
	}
	/*加入收藏是否成功后回调*/
  function isSuccess(love,msg){
  	if(msg){
  		if(love){
  			hintFun('收藏成功')
  			isLove = true
  		}else{
  			hintFun('取消收藏成功')
  			isLove = false
  		}
  	}else{
  		if(love){
  			hintFun('收藏失败');
  			$('#love').css('display','block');
    		$('#love2').css('display','none');
  		}else{
  			hintFun('取消收藏失败');
  			$('#love').css('display','none');
    		$('#love2').css('display','block');
  		}
  	}
  }
	/*发布评论回复的方法*/
	function replyComment(data,fun) {
		dispatch({
			type:'AJIntroduceData/replyComment',
			payload:data,
			callBack:fun
		})
	}
	/*跳转的方法*/
  function chooseToGo(data){
		dispatch({
			type:'AJIntroduceData/chooseToGo',
			payload:data
		})
  }
	class AJEva extends React.Component{
		constructor(props){
			super(props);
			this.state={
				nameHidden: false,
				msgHidden:false
			}
		}
		render (){
			if(AJIntroduceData.res_evaDetails_datas){
				//是否收藏
				if(AJIntroduceData.res_evaDetails_datas.userMsg!==""){
					isLove = AJIntroduceData.res_evaDetails_datas.userMsg.isCollection
				}else{
					isLove = false
				}
				//展示商品sku
				let goodsShowSku = ""
				for(let i in AJIntroduceData.res_evaDetails_datas.data.goodsSku){
					goodsShowSku += AJIntroduceData.res_evaDetails_datas.data.goodsSku[i] + '/'
				}
				let thisLevel = Number(AJIntroduceData.res_evaDetails_datas.data.level)
				let custom = {//用于传递至头部后退时清空sessionStorage
					id:6,
					val:true
				}
				return (
					<div className={styles.AJEvaContainer} id="allHeight">
						<Header	left_show='1' head_title='评价详情' header_ids='17' custom = {custom} right_fun = { this.checkLove }/>
						<EvaDetailsIntro introMsg = { AJIntroduceData.res_evaDetails_datas.data } commentId = {commentId} hintFun = { hintFun }/>
						<div className={ styles.evaGoodsMsg }>
							<div className={ styles.evaGoodsPic } onClick={ () => chooseToGo('/GoodsPage/'+AJIntroduceData.res_evaDetails_datas.data.goodsId)} >
								<img src={AJIntroduceData.res_evaDetails_datas.data.goodsPic?AJIntroduceData.res_evaDetails_datas.data.goodsPic:"./src/assets/AJ_evaGoodsPic.png"} alt="i"/>
							</div>
							<div className={ styles.eva_goodsDetails }>
								<p className={ !this.state.nameHidden?'':styles.goodsNameHidden } id="name" onClick={ () => chooseToGo('/GoodsPage/'+AJIntroduceData.res_evaDetails_datas.data.goodsId)}>
									{AJIntroduceData.res_evaDetails_datas.data.goodsName}
									<span className={ `${styles.goodsNameElli} ${!this.state.nameHidden?styles.hiddenArr:''}` }>...</span>
								</p>
								<span className={ !this.state.msgHidden?'':styles.goodsMsgHidden } id="msg">
									{ goodsShowSku.slice(0,-1) }
									<span className={ `${styles.goodsMsgElli} ${!this.state.msgHidden?styles.hiddenArr:''}` }>...</span>
								</span>
								<div className={ styles.eva_goodsOtherMsg }>
									<span>￥{ AJIntroduceData.res_evaDetails_datas.data.goodsPrice }</span>
									<div className={ styles.eva_goodsStar }>
										<span>评价</span>
										<ul className={ styles.eva_star }>
											<li className={ thisLevel>=1 ?styles.evaRedStar:styles.evaNullStar }></li>
											<li className={ thisLevel>=2 ?styles.evaRedStar:styles.evaNullStar }></li>
											<li className={ thisLevel>=3 ?styles.evaRedStar:styles.evaNullStar }></li>
											<li className={ thisLevel>=4 ?styles.evaRedStar:styles.evaNullStar }></li>
											<li className={ thisLevel>=5 ?styles.evaRedStar:styles.evaNullStar }></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<ChaPop HintWords={ this.HintWords }/>
						<EvaOfAll evaData = { AJIntroduceData.res_evaDetails_datas.data.reply } hintFun = { hintFun } replyComment = {replyComment} commentId = {commentId} getEvaDetailsData = {getEvaDetailsData} name = { location.pathname } chooseToGo = { chooseToGo }/>
					</div>
				)
			}else{
				return (
					<div className={styles.AJEvaContainer}>
						<Header	left_show='1' head_title='评价详情' header_ids='6' />
					</div>
				)
			}
		}
		/*简单信息提示框*/
		HintWords(popDom){
			hintFun = popDom.Popfun
		}
		/*点击收藏/取消*/
		checkLove(data){
			if(sessionStorage.getItem("id")){
				let loveMsg = {
					commentId:commentId,
					userId:sessionStorage.getItem("id"),
					type:"3"
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
				chooseToGo('/Login?'+location.pathname)
			}
		}
		componentDidMount(){
			$(window).scrollTop(0);
			/*商品名称省略*/
			let str = String($('#name').css('lineHeight'));
			let strNum = str.substr(str.Length-2,2);
			let nameLine = ($('#name').innerHeight())/strNum;
			if(nameLine>2){
				this.setState({
					nameHidden: true,
				})
			}else{
				this.setState({
					nameHidden: false,
				})
			};
			/*商品规格/型号信息省略*/
			let strMsg = String($('#msg').css('lineHeight'));
			let strNumMsg = strMsg.substr(strMsg.Length-2,2);
			let msgLine = ($('#msg').innerHeight())/strNumMsg;
			if(msgLine>1){
				this.setState({
					msgHidden: true,
				})
			}else{
				this.setState({
					msgHidden: false,
				})
			};
		}
		componentDidUpdate(){
			//右上方是否收藏展示
			if(isLove){
				$('#love').hide();
				$('#love2').show();
			}else{
				$('#love').show();
				$('#love2').hide();
			}
		}
	}
	return <AJEva />
}

export default connect(({ AJIntroduceData }) => ({
  AJIntroduceData
}))(AJEva);
