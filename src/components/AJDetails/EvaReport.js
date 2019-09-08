import React from 'react';
import $ from 'jquery';
import styles from '../../style/AJ/AJDetails.css';
import goodsStyles from '../../style/goods/otherGoods.css';
import DefaultPage from '../PublicComponents/DefaultPage';//缺省页面
import Loading from '../PublicComponents/LoadingCom';//上拉加载
import BigPicture from '../PublicComponents/BigPicture';//展示大图组件
import constant from '../../constant';//处理评价时间函数

const EvaReport = ({ edit,chooseToGo,dataList,come,getFun,page,getLevelFun,getPicFun,type,hintFun }) => {
	/*
		getFun: 滑动加载请求方法/商品页全部评价滑动加载请求方法 ,
		getLevelFun: 商品页评价等级滑动加载请求方法 ,
		getPicFun: 商品页有图评价滑动加载请求方法 ,
		参数(页数,this),
		page:当前页,
		type:商品页评价位于哪个位置0：全部，1：好评，2：中评；3：差评；4：有图评价
	*/
	let _this,PtData,typePt,d_page=page,bigPictures;
	// 大图组件函数
	function getImgdom(dom){
		bigPictures=dom.bigImg
	}
	// 多页加载函数
	function laodfun(dom){
		PtData=dom.ptData
	}
	function reqFun(NewPages){
		if(come==='goods'){
			if(type==='0'){
				getFun(NewPages,_this)
			}else if(type==='4'){
				getPicFun(NewPages,_this)
			}else{
				let level;
				if(type==='1'){
					level = 'good'
				}else if(type==='2'){
					level = 'medium'
				}else{
					level = 'bad'
				};
				getLevelFun(NewPages,_this,level)
			}
		}else if(come==='love'){
			getFun(NewPages,_this,'COMMENT')
		}else{
			getFun(NewPages,_this)
		}
	}
	class EvaReport extends React.Component{
		constructor(props) {
        super(props);
        this.state={
        	evaData:dataList
        }
        this.getPage=this.getPage.bind(this)
    }
    getPage(types,data,page){//有无更多数据
    	let newData=this.state.evaData.concat(data)
    	d_page=page
    	typePt=types
    	this.setState({
				evaData:newData
    	})
    }
		render(){
			let showDefault = true;
			let default_id = 3;
			if((dataList.length===0||!dataList)&&come!=='aj'){
				return (
					<DefaultPage showDefault={showDefault} default_ids={default_id} />
				)
			}else if((dataList.length===0||!dataList)&&come==='aj'){
				return(
					<div className={styles.defaultPageContainer}>
						<div className={styles.defaultPic} >
							<img src="src/assets/default_withoutData.png" alt="pic" />
						</div>
						<p>暂无数据!</p>
						<span className={styles.defaultHint}>页面暂无数据，去商城首页看看吧</span>
					</div>
				)
			}else if(come==='goods'||come==='aj'){//来自商品评价接口or艾家详情商品接口
				return (
					<div className={ styles.AJDetails_evaReport } id="evaReport">
						{this.state.evaData.map(function(item,index){
							return  <div id={`checkEva${index}`} key={index}>
										<i className={ goodsStyles.hidden } onClick={ () => this.loveCheckThing(index,item.id)}></i>
										<div className={ styles.singeEvaReport } >
											<div className={ styles.singeEvaTitle }>
												<div className={ styles.singeEvaUserPic }>
													<img src={item.userPic?item.userPic:"src/assets/myPageDefaultHead1.png"} alt="i"/>
												</div>
												<div className={ styles.singeEvaUserMsg } onClick={() => chooseToGo('/AJPage/AJEva/'+item.commentId)}>
													<h5>{item.userName}</h5>
													<p className={ item.showMsg?'':goodsStyles.hidden }>{item.showMsg}</p>
												</div>
												<i className={ styles.evaEllipsis } onClick={() => this.informMark(index)}></i>
												<div className={ styles.evaInform } id={`inform${index}`} onClick={() => this.informEva(index)}>
													<i className={ styles.evaInformMark }></i>
													<p>举报</p>
												</div>
											</div>
											<div className={ JSON.stringify(item.proPic) === '[]'?goodsStyles.hidden:styles.singeEvaPic } id = "picBox">
												{item.proPic.map(function(k,i){
														if(i>2){
															item.proPic.slice(0,2).map(function(a,b){
																return  <div className={ styles.goodsPic } key={i}>
																					<img src={a} alt='goodsPic' onClick={() => this.letsBigPic(index)}/>
																				</div>
															})
														}else{
															return  <div className={ styles.goodsPic } key={i}>
																				<img src={k} alt='goodsPic' onClick={() => this.letsBigPic(index)}/>
																			</div>
														}
														return false
													},this)
												}
											</div>
											<p className={styles.singeEvaContent}  id={`evaContent${index}`} onClick={() => chooseToGo('/AJPage/AJEva/'+item.commentId)}>
												{item.content}
												{/* <span id={`evaEll${index}`}>...</span> */}
											</p>
											<div className={ styles.evaBottomMsg } onClick={() => chooseToGo('/AJPage/AJEva/'+item.commentId)}>
												<p>{constant.showTime(item.date)}</p>
												<div>
													<p><i className={ styles.AJIntroduce_love }></i>{item.collectionNO}</p>
													<p><i className={ styles.AJIntroduce_eva }></i>{item.replyNO}</p>
												</div>
											</div>
										</div>
									</div>
							},this)
						}
						<Loading getLoadFun={laodfun} reqFun={reqFun} page={page}/>
						<BigPicture getImgdom={getImgdom}/>
					</div>
				)
			}else if(come==='love'){//来自收藏评价接口
				return (
					<div className={ styles.AJDetails_evaReport } id="evaReport">
						{this.state.evaData.map(function(item,index){
							return  <div id={`checkEva${index}`} key={index}>
										<i className={ goodsStyles.hidden } onClick={ () => this.loveCheckThing(index,item.id)}></i>
										<div className={ styles.singeEvaReport } >
											<div className={ styles.singeEvaTitle }>
												<div className={ styles.singeEvaUserPic }>
													<img src={item.head?item.head:"src/assets/myPageDefaultHead1.png"} alt="i"/>
												</div>
												<div className={ styles.singeEvaUserMsg } onClick={() => chooseToGo('/AJPage/AJEva/'+item.commentId)}>
													<h5>{item.name}</h5>
													<p className={ item.showMsg?'':goodsStyles.hidden }>{item.showMsg}</p>
												</div>
												<div className={ styles.evaInform } id={`inform${index}`} onClick={() => this.informEva(index)}>
													<i className={ styles.evaInformMark }></i>
													<p>举报</p>
												</div>
											</div>
											<div className={ JSON.stringify(item.pictures) === '[]'?goodsStyles.hidden:styles.singeEvaPic } id = "picBox">
												{item.pictures.map(function(k,i){
														if(i>2){
															item.pictures.slice(0,2).map(function(a,b){
																return  <div className={ styles.goodsPic } key={i}>
																					<img src={a} alt='goodsPic' onClick={() => this.letsBigPic(index)}/>
																				</div>
															})
														}else{
															return  <div className={ styles.goodsPic } key={i}>
																				<img src={k} alt='goodsPic' onClick={() => this.letsBigPic(index)}/>
																			</div>
														}
														return false
													},this)
												}
											</div>
											<p className={styles.singeEvaContent}  id={`evaContent${index}`} onClick={() => chooseToGo('/AJPage/AJEva/'+item.commentId)}>
												{item.content}
												{/* <span id={`evaEll${index}`}>...</span> */}
											</p>
											<div className={ styles.evaBottomMsg } onClick={() => chooseToGo('/AJPage/AJEva/'+item.commentId)}>
												<p>{constant.showTime(item.date)}</p>
												<div>
													<p><i className={ styles.AJIntroduce_love }></i>{item.like}</p>
													<p><i className={ styles.AJIntroduce_eva }></i>{item.reply}</p>
												</div>
											</div>
										</div>
									</div>
							},this)
						}
						<Loading getLoadFun={laodfun} reqFun={reqFun} page={page}/>
						<BigPicture getImgdom={getImgdom}/>
					</div>
				)
			}
		}
		/*简单提示框*/
	  HintWords(popDom){
			hintFun = popDom.Popfun
		}
		/*点击出现举报按钮*/
		informMark(index){
			let isHidden = $(`#inform${index}`).css('display')
			if(isHidden==='none'){
				$(`#inform${index}`).css({
		        	'display':'flex'
		        })
			}else{
				$(`#inform${index}`).css({
		        	'display':'none'
		        })
			}
	  }
    /*举报按钮点击*/
  	informEva(index){
    	$(`#inform${index}`).css({
    		'display':'none'
    	})
			hintFun('举报成功','success')
    }
	    /*点击勾选*/
		/*收藏页面可选择方法*/
		loveCheckThing(index,loveId){
			if($(`#checkEva${index}`).children('i').attr('class').includes('No')){
				let isAll=[];
				$(`#checkEva${index}`).children('i').attr('class',goodsStyles.loveEdit);
				$(`#checkEva${index}`).siblings().children('i').map(function(i,k){
					if($(k).attr('class').includes('No')){
						return isAll.push(k)
					}
					return false
				})
				if(isAll.length===0){
					$('#chooseAll').attr('class',goodsStyles.loveEdit)
				}
			}else{
				let isAll=[];
				$(`#checkEva${index}`).children('i').attr('class',goodsStyles.loveNoEdit);
				$(`#checkEva${index}`).siblings().children('i').map(function(i,k){
					if($(k).attr('class').includes('No')){
						return isAll.push(k)
					}
					return false
				})
				if(isAll.length===0){
					$('#chooseAll').attr('class',goodsStyles.loveNoEdit)
				}
			}
		}
		/*点击后传出图片，再传至大图组件处*/
		letsBigPic(data){
			let picBox = []
			this.state.evaData.map(function(item,index){
				if(data === index){
					if(come==='love'){
						item.pictures.map(function(i,j){
							return picBox.push(i)
						});
					}else{
						item.proPic.map(function(k,g){
							return picBox.push(k)
						});
					}
				}
				return false
			})
			bigPictures(true,picBox)
		}
		componentWillMount(){
			_this=this;
			if(dataList){
				if(come==='goods'){
					dataList.map(function(i,k){
						if(i.userAddress==='null'||i.userAddress===""||!i.userAddress){
							if(i.userJob==='null'||i.userJob===""||!i.userJob){
								i.showMsg = false
							}else{
								i.showMsg = i.userJob
							}
						}else{
							if(i.userJob==='null'||i.userJob===""||!i.userJob){
								i.showMsg = i.userAddress
							}else{
								i.showMsg = i.userJob + '/' + i.userAddress
							}
						}
						return false
					})
				}else if(come==='love')	{
					dataList.map(function(i,k){
						if(i.address==='null'||i.address===""||!i.address){
							if(i.professional==='null'||i.professional===""||!i.professional){
								i.showMsg = false
							}else{
								i.showMsg = i.professional
							}
						}else{
							if(i.professional==='null'||i.professional===""||!i.professional){
								i.showMsg = i.address
								if(i.address.province&&i.address.city){
									i.showMsg = i.address.province+i.address.city
								}else if(i.address.province&&!i.address.city){
									i.showMsg = i.address.province
								}else if(!i.address.province&&i.address.city){
									i.showMsg = i.address.city
								}
							}else{
								if(i.address.province&&i.address.city){
									i.showMsg = i.professional + '/' + i.address.province+i.address.city
								}else if(i.address.province&&!i.address.city){
									i.showMsg = i.professional + '/' + i.address.province
								}else if(!i.address.province&&i.address.city){
									i.showMsg = i.professional + '/' + i.address.city
								}
							}
						}
						return false
					})
				}
			}
		}
		componentDidMount(){
			if(dataList){
				/*两行文字省略*/
				let str = [];
				dataList.map(function(item,index){
					return str.push(`#evaContent${index}`)
				})
				let line = []
				str.map(function(k,i){
					return line.push(Math.round(($(k).innerHeight())/(String($(k).css('lineHeight'))).substr(0,(String($(k).css('lineHeight'))).length-2)))
				})
				line.map(function(k,i){
					console.log('评价处',k,i)
					if(k>2){
						$(`#evaContent${i}`).css({
			    			"max-height":'1rem',
			    			"overflow":'hidden',
			    		})
					}else{
						$(`#evaEll${i}`).css({
			    			'display':'none'
			    		})
					}
					return false
				})
				$('#chooseAll').attr('class',goodsStyles.loveNoEdit)
				/* 出现勾选框 */
				if(edit){
					dataList.map(function(item,index){
						return $(`#checkEva${index}`).children('i').attr('class',goodsStyles.loveNoEdit)
					})
				}else{
					dataList.map(function(item,index){
						return $(`#checkEva${index}`).children('i').attr('class',goodsStyles.hidden)
					})
				}
			}
			$('#picBox div').height(Number($('#picBox').width())*0.32)//图片高度同宽度
		}
		componentDidUpdate(){
			PtData(typePt)
		}
	}
	return <EvaReport />
}

export default EvaReport;
