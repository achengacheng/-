import React from 'react';
import $ from 'jquery';
import GoodsType from '../Home/HomePage/HomeGuessLike';
import EvaType from './EvaReport';
import styles from '../../style/AJ/AJDetails.css';

var titleFixed,secLevel,threeLev,isScoll,address,thisHeight,isAJLove;
var a = true,b = true;//ture在top为0,且第一次进入滚动事件
const AJIntroduce = ({ IntroduceData,chooseToGo,toggleLove,hintFunAJ,merchantId,getGoodsFun,getEvaFun,location}) => {
	let timer;
	let page = 1;
	class AJIntroduce extends React.Component{
		constructor(props){
			super(props);
			this.state={
				isHidden: false,
				arrHidden:false,
				type:0
			}
		}
		render(){
			const msgData = IntroduceData.res_msg_datas;
			//console.log(msgData)
			if(!msgData.addressDetail||(!msgData.addressDetail.country&&!msgData.addressDetail.province)){
				address = false
			}else{
				address = msgData.addressDetail.country + msgData.addressDetail.province;
			};
			if(msgData.goodsCount>=10000){
				msgData.goodsCount = "1万+"
			}else if(msgData.commentCount>=10000){
				msgData.commentCount = "1万+"
			}
			//是否关注
			isAJLove = msgData.isCollection;
			const ThisType = ({id}) => {
				if(id===0){
					if(IntroduceData.res_goods_datas){
						return (
							<GoodsType goodsData = { IntroduceData.res_goods_datas } Callback = { chooseToGo } come="aj" getFun = { getGoodsFun } page = { page }/>
						)
					}else {
						return <div></div>
					}
				}else if(id===1){
					if(IntroduceData.res_eva_datas){
						return (
							<EvaType dataList={ IntroduceData.res_eva_datas } chooseToGo = { chooseToGo } come = {'aj'} getFun = { getEvaFun } page = { page }/>
						)
					}else {
						return <div></div>
					}
				}
			}
			return (
				<div className={ styles.AJDetails_introduce } >
					<div className={ styles.introduceAJTails } id="ajPicHeight">
						<div className={ styles.AJHeadPic }>
							<img src={msgData.logo} alt='headImg'/>
						</div>
						<div className={ styles.AJIntroduce_title }>
							<h5>{msgData.merchantName}</h5>
							<p>{msgData.keyWord}</p>
							<div>
								<p><i className={ styles.AJIntroduce_love }></i>{msgData.collectNum}</p>
								<p><i className={ address?styles.AJIntroduce_address:styles.hiddenArr }></i>{address}</p>
							</div>
						</div>
						<p className={ styles.AJ_attention } onClick = { () => this.checkLove('no')} id="collection1">已关注</p>
						<p className={ styles.AJ_noAttention } onClick = { () => this.checkLove('has')} id="collection2">+关注</p>
					</div>
					<div className={ styles.introduceMain } id="ajMsgHeight">
						<p className={ !this.state.isHidden?'':styles.hiddenContent }  id='article'>
							{ msgData.merchantDesc }
							<span className={ !this.state.isHidden?styles.hiddenArr:'' }>...</span>
						</p>
						<span className={ !this.state.arrHidden?styles.hiddenArr:'' } onClick={() => this.unfold(this.state.isHidden)} ref='arr'>
							<i className={ !this.state.isHidden?styles.arrUp:styles.arrDown }></i>
						</span>
					</div>
					<div className={ styles.aboutAJMain } ref="level">
						<div className={ styles.aboutAJType } ref="typeThing">
							<p onClick={() => this.typeChange(0)} className={ this.state.type===0?styles.chooseColor:'' }>相关商品<span>{ msgData.goodsCount }</span></p>
							<p onClick={() => this.typeChange(1)} className={ this.state.type===1?styles.chooseColor:'' }>评价报告<span>{ msgData.commentCount }</span></p>
						</div>
						<div ref="threeLev">
							<ThisType id={ this.state.type }/>
						</div>
					</div>
				</div>
			)
		}
		/*关注艾家是否成功后回调*/
	  isSuccess(love,msg){
	  	if(msg){
	  		if(love){
	  			hintFunAJ('关注成功')
	  			isAJLove = true
	  		}else{
	  			hintFunAJ('取消关注成功')
	  			isAJLove = false
	  		}
	  	}else{
	  		if(love){
	  			hintFunAJ('关注失败')
					$('#collection1').hide()
		    	$('#collection2').show()
	  		}else{
	  			hintFunAJ('取消关注失败')
					$('#collection1').show()
		    	$('#collection2').hide()
	  		}
	  	}
	  }
		/*点击关注/取消*/
		checkLove(data){
			if(sessionStorage.getItem("id")){
				let loveMsg = {
					commentId:merchantId,
					userId:sessionStorage.getItem("id"),
					type:"4"
				}
				if(data==='no'){//关注——不关注
					$('#collection1').hide();
		    	$('#collection2').show();
		    	toggleLove(loveMsg,false,this.isSuccess)
				}else{//不关注——关注
					$('#collection1').show();
		    	$('#collection2').hide();
		    	toggleLove(loveMsg,true,this.isSuccess)
				}
			}else{
				hintFunAJ('请登录后操作');
				timer = setTimeout(()=>{
          chooseToGo('/Login?'+location)
        },2000);
			}
		}
		/*展开文字说明*/
		unfold(value) {
			this.setState({
				isHidden: !value,
			})
		}
		/*点击变换二级导航*/
		typeChange(i){
	        this.setState({
	            type:i
	        })
	    }
	    /*二级导航固定*/
	    titleFixed(value){
	    	if(value===0){
	    		secLevel.css({
	    			"position":''
	    		})
	    		threeLev.css({
	    			"padding-top":''
	    		})
	    	}else{
	    		secLevel.css({
	    			"position":'fixed',
	    			"left":0,
	    			"top":0,
	    			"z-index":999
	    		})
	    		threeLev.css({
	    			"padding-top":secLevel.height()
	    		})
	    	}
	    }
	    /*滚动函数*/
	    isScoll(){
	    	if(b){
	    		thisHeight = secLevel.offset().top;
	    		b = false
	    	}
			if($(window).scrollTop()>=thisHeight){
				if(a){
					titleFixed(thisHeight);
		    		a = false
				}
			}else if($(window).scrollTop()<thisHeight){
				if(!a){
					secLevel.css({
	    			"position":''
	    		})
	    		threeLev.css({
	    			"padding-top":''
	    		})
					titleFixed(0);
		    		a = true
				}
			}
		}
		/*监听滚动方法*/
	  scroll_fun(){
	    	window.addEventListener('scroll',isScoll,false)
	    }
		componentDidMount(){
			//是否关注
			if(!isAJLove){
				$('#collection1').hide();
				$('#collection2').show();
			}else{
				$('#collection1').show();
				$('#collection2').hide();
			}
			secLevel = $(this.refs.typeThing);
			threeLev = $(this.refs.threeLev);
			titleFixed = this.titleFixed;
			isScoll = this.isScoll;
			/*二级组件高度*/
			let str = String($('#article').css('lineHeight'));
			let strNum = str.substr(str.Length-2,2);
			let line = ($('#article').innerHeight())/strNum;
			if(line>3){
				this.setState({
					isHidden: true,
					arrHidden:true
				})
			}else{
				this.setState({
					isHidden: false,
					arrHidden:false
				})
			};
			this.scroll_fun()
		}
		componentWillUnmount(){
			window.removeEventListener('scroll',isScoll,false)
			clearTimeout(timer)
		}
	}
	return <AJIntroduce />
}

export default AJIntroduce;
