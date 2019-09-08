import React from 'react';
import $ from 'jquery';
import styles from '../../../style/goods/goodsDetails.css';
import evaStyles from '../../../style/AJ/AJDetails.css';

const GoodsEva=({ evaData,pullUp,goToAd })=>{
	class GoodsEva extends React.Component{
		constructor(props){
			super(props);
			this.state={
				isHidden: false,
				arrHidden:false,
			}
		}
		render(){
			if(!evaData){
				return <div></div>
			}else if(evaData.dataList.length===0){
				return <div></div>
			}else{
				return (
					<div className={ styles.goodsEvaContainer }>
						<div className={ styles.goodsIntroduceTitle }>
							<p>商品评论</p>
						</div>
						<div className={ styles.goodsEvaUserHead }>
							<div className={ styles.goodsEvaUserPic }>
								{evaData.dataList.map(function(item,index){
									if(index>3){
										{evaData.dataList.slice(0,3).map(function(a,b){
										return 	<div key={b}>
															<img src={ a.userPic?a.userPic:"./src/assets/myPageDefaultHead1.png" } alt="user"/>
														</div>
										})}
									}else{
										return  <div key={index}>
															<img src={ item.userPic?item.userPic:"./src/assets/myPageDefaultHead1.png" } alt="user"/>
														</div>
									}
									return false
								})}
							</div>
							<i className={ styles.goodsRightArr } onClick={() => this.goToEva()}></i>
						</div>
						<p className={`${evaStyles.singeEvaContent} ${ !this.state.isHidden?'':styles.hiddenContent }`} id='evaContent'>
							{ evaData.dataList[0].content }
							<span className={ !this.state.isHidden?evaStyles.hiddenArr:'' }>...</span>
						</p>
						<div className={ JSON.stringify(evaData.dataList[0].proPic) === '[]'?styles.hiddenThis:styles.singeEvaPic } id="goodsPicBox" onClick={() => goToAd('/AJPage/AJEva/'+evaData.dataList[0].commentId)}>
							{evaData.dataList[0].proPic.map(function(k,i){
								if(i>2){
									evaData.dataList[0].proPic.slice(0,2).map(function(a,b){
										return  <div className={ evaStyles.goodsPic } key={i}>
															<img src={a} alt='goodsPic'/>
														</div>
									})
								}else{
									return  <div className={ evaStyles.goodsPic } key={i}>
														<img src={k} alt='goodsPic'/>
													</div>
								}
								return false
								})
							}
						</div>
						<div className={ styles.allEvaLength } onClick={() => this.goToEva()} >
							<p>共有{ evaData.count.allNO }条评论</p>
						</div>
					</div>
				)
			}
		}
		goToEva(){//跳转至商品评价标签
			pullUp(2)
		}
		componentDidMount(){
			$('#goodsPicBox div').height(Number($('#goodsPicBox').width())*0.32)//图片高度同宽度
			let str = String($('#evaContent').css('lineHeight'));
			let strNum = str.substr(str.Length-2,2);
			let line = ($('#evaContent').innerHeight())/strNum;
			if(line>2){
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
		}
	}
	return <GoodsEva />
}

export default GoodsEva
