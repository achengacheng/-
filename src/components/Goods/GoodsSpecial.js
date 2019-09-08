import React from 'react';
import $ from 'jquery';
import goodsStyles from '../../style/goods/otherGoods.css';
import styles from '../../style/Special/special.css';
import DefaultPage from '../PublicComponents/DefaultPage';//缺省页面
import Loading from '../PublicComponents/LoadingCom';//加载更多

const GoodsSpecial = ({ edit,specialDatas,come,isLove,getFun,page,chooseToGo }) => {
	/*getFun 滑动加载请求方法 参数(页数,this),page当前页*/
	let _this,PtData,typePt,d_page=page;
	function laodfun(dom){
		PtData=dom.ptData
	}
	function reqFun(NewPages){
		if(come==='love'){
			getFun(NewPages,_this,'THEME')
		}else{
			getFun(NewPages,_this)
		}
	}
	class GoodsSpecial extends React.Component{
		constructor(props) {
        super(props);
        this.state={
        	specialData:specialDatas
        }
        this.getPage=this.getPage.bind(this)
    }
    getPage(types,data,page){//有无更多数据
    	let newData=this.state.specialData.concat(data)
    	d_page=page
    	typePt=types
    	this.setState({
				specialData:newData
    	})
    }
		render(){
			let showDefault = true;
			let default_id = 3;
			if(specialDatas.length===0||!specialDatas){
				return (
					<DefaultPage showDefault={showDefault} default_ids={default_id} />
				)
			}else if(come==='goods'){//来自商品专题接口
				return(
					<div className={ goodsStyles.goodsSpecialContainer } id="loveSpecial">
						<ul>
							{this.state.specialData?this.state.specialData.map(function(item,index){
								return 	<div id={`checkSpecial${index}`} key={index}>
													<i className={ goodsStyles.hidden } onClick={ () => this.loveCheckThing(index,item.id)}></i>
													<li className={styles.SpecialList_li} onClick={() => chooseToGo('/SpecialPage/SpecialDetail/'+item.id)}>
														<img src={item.defaultPic} alt="pic"/>
														<div className={styles.SpecialList_text}>
															<div className={styles.SpecialList_head}>
																<span>{item.name}</span>
																<span>¥{item.money}</span>
															</div>
															<p className={ goodsStyles.goodsSpecialText }>{item.describe}</p>
														</div>
													</li>
												</div>
								},this):''}
						</ul>
						<Loading getLoadFun={laodfun} reqFun={reqFun} page={d_page}/>
					</div>
				)
			}else if(come==='love'){//来自收藏专题接口
				return(
					<div className={ goodsStyles.goodsSpecialContainer } id="loveSpecial">
						<ul>
							{this.state.specialData?this.state.specialData.map(function(item,index){
								return 	<div id={`checkSpecial${index}`} key={index}>
													<i className={ goodsStyles.hidden } onClick={ () => this.loveCheckThing(index,item.id)}></i>
													<li className={styles.SpecialList_li} onClick={() => chooseToGo('/SpecialPage/SpecialDetail/'+item.id)}>
														<img src={item.picture} alt="pic"/>
														<div className={styles.SpecialList_text}>
															<div className={styles.SpecialList_head}>
																<span>{item.name}</span>
																<span>¥{item.price}</span>
															</div>
															<p className={ `${goodsStyles.goodsSpecialText} ${'goodsSpecialP'}` }></p>
														</div>
													</li>
												</div>
								},this):''}
						</ul>
						<Loading getLoadFun={laodfun} reqFun={reqFun} page={d_page}/>
					</div>
				)
			}
		}
		/*点击勾选*/
		loveCheckThing(index,loveId){
			if($(`#checkSpecial${index}`).children('i').attr('class').includes('No')){
				let isAll=[];
				$(`#checkSpecial${index}`).children('i').attr('class',goodsStyles.loveEdit);
				$(`#checkSpecial${index}`).siblings().children('i').map(function(i,k){
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
				$(`#checkSpecial${index}`).children('i').attr('class',goodsStyles.loveNoEdit);
				$(`#checkSpecial${index}`).siblings().children('i').map(function(i,k){
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
		componentWillMount(){
			_this=this
		}
		componentDidMount(){		
			if(_this.state.specialData){
					for(var i=0;i<_this.state.specialData.length;i++){
						$('.goodsSpecialP').eq(i).html(function(argument) {
							return _this.state.specialData[i].describe
						})
					}	
			}	
			if(isLove){//来自'商品详情',展示是否收藏此商品
	    		$('#love').css('display','none');
	    		$('#love2').css('display','block');
	    	}
			$('#chooseAll').attr('class',goodsStyles.loveNoEdit)
			// 出现勾选框
			if(edit){
				specialDatas.map(function(item,index){
					return $(`#checkSpecial${index}`).children('i').attr('class',goodsStyles.loveNoEdit)
				})
			}else{
				specialDatas.map(function(item,index){
					return $(`#checkSpecial${index}`).children('i').attr('class',goodsStyles.hidden)
				})
			}
	    }
		componentDidUpdate(){
				PtData(typePt)
			}
	}
	return <GoodsSpecial />
}

export default GoodsSpecial
