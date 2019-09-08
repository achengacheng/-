import React from 'react';
import $ from 'jquery';
import { connect } from 'dva';
import styles from '../../../style/mine/lovePage.css';
import goodsStyles from '../../../style/goods/otherGoods.css';
import Header from '../../../components/PublicComponents/HeaderReturn';
import LoveGoods from '../../../components/Mine/MyLove/LoveGoods';//收藏的商品
import LoveSpecial from '../../../components/Goods/GoodsSpecial';//收藏的专题
import LoveEva from '../../../components/AJDetails/EvaReport';//收藏的评价
import ChaPop from '../../../components/PublicComponents/ChaPop';//提示语

var isScoll,hintFun,timer;
const LovePage = ({ dispatch,loveData }) => {
	let page = 1;
	/*跳转方法*/
	function chooseToGo(type){
		dispatch({
			type:'loveData/chooseToGo',
			payload:type
		})
	}
	/*获取收藏数据方法*/
	function getLoveData(data){
		dispatch({
			type:'loveData/getLoveData',
			payload:data
		})
	}
	/*取消收藏的方法*/
	function loveDelete(data,fun){
		dispatch({
			type:'loveData/loveCancel',
			payload:data,
			callBack:fun
		})
	}
	/*上拉加载更多的方法*/
	function addGuessLike(page,d_this,type){//page传递新页数 这里没用,d_this请求成功后回调到loading
		let num = 10;//每页条数
		let data = {
			userId:sessionStorage.getItem("id"),
			type:type,
			fsxz:false,
			_this:d_this,
			page:page,
			rows:num
		}
		dispatch({
			type:'loveData/getLoveData',
			payload:data
		})
	}
	class LovePage extends React.Component {
		constructor(props){
			super(props);
			this.state={
				edit:false,
				type:false,
				dataGoodsList:false,
				dataThemeList:false,
				dataCommentList:false,
			}
			this.goodsList=this.goodsList.bind(this)
			this.themeList=this.themeList.bind(this)
			this.commentList=this.commentList.bind(this)
		}
		render(){
			console.log(this.state.dataGoodsList,this.state.dataThemeList,this.state.dataCommentList)
			let head_val={id:14,val:this.state.edit};
			const ThisType = ( { typeId } ) => {
				switch(typeId){
				case '0':
						return <LoveGoods edit={ this.state.edit } chooseToGo = { chooseToGo } goodsData = { this.state.dataGoodsList } getFun={ addGuessLike } page={ page }/>;
				  	//break;
				case '1':
						if(this.state.dataThemeList){
							return <LoveSpecial chooseToGo = { chooseToGo } edit={ this.state.edit } specialDatas = { this.state.dataThemeList } come = {'love'} getFun={ addGuessLike } page={ page }/>;
						}else{
							return <div></div>
						}
				  	//break;
				case '2':
						if(this.state.dataCommentList){
							return <LoveEva chooseToGo = { chooseToGo } edit={ this.state.edit } dataList = { this.state.dataCommentList } come = {'love'} getFun={ addGuessLike } page={ page } hintFun = { hintFun }/>;
						}else{
							return <div></div>
						}
				  	//break;
				default:
						return <LoveGoods edit={ this.state.edit } chooseToGo = { chooseToGo } goodsData = { this.state.dataGoodsList }/>;
				    //break;
				}
			}
			if(loveData.res_love_datas){
				return(
					<div className={styles.lovePageContainer} id="loveBox">
						<Header left_show='1' head_title="我的收藏" header_ids='14' right_fun={(edit) => this.edit(edit)} custom = { head_val }/>
						<div className={ styles.loveType } id="loveSecNav">
							<p onClick={() => this.typeChange(0)} className={ this.state.type==='0'?styles.loveTypeCheck:'' }>
								商品
								<span>{loveData.res_love_datas.total.goods}</span>
							</p>
							<p onClick={() => this.typeChange(1)} className={ this.state.type==='1'?styles.loveTypeCheck:'' }>
								专题
								<span>{loveData.res_love_datas.total.theme}</span>
							</p>
							<p onClick={() => this.typeChange(2)} className={ this.state.type==='2'?styles.loveTypeCheck:'' }>
								评价
								<span>{loveData.res_love_datas.total.comment}</span>
							</p>
						</div>
						<div>
							<ThisType typeId={ this.state.type }/>
						</div>
						<footer className={ this.state.edit?'':styles.loveHidden }>
							<p><i className={ goodsStyles.loveNoEdit } onClick={()=>this.checkAll()} id="chooseAll"></i>全选</p>
							<span onClick={ () => this.deleteLove() }>删除</span>
						</footer>
						<ChaPop HintWords={ this.HintWords }/>
					</div>
				)
			}else{
				return(
					<div className={styles.lovePageContainer} id="loveBox">
						<Header left_show='1' head_title="我的收藏" header_ids='14' right_fun={(edit) => this.edit(edit)} custom = { head_val }/>
					</div>
				)
			}
		}
		/*收藏的商品*/
		goodsList(){
			if(loveData.res_love_datas){
				this.setState({
					dataGoodsList:loveData.res_love_datas.data,
				})
			}
		}
		/*收藏的专题*/
		themeList(){
			if(loveData.res_love_datas){
				this.setState({
					dataThemeList:loveData.res_love_datas.data,
				})
			}
		}
		/*收藏的评论*/
		commentList(){
			if(loveData.res_love_datas){
				this.setState({
					dataCommentList:loveData.res_love_datas.data,
				})
			}
		}
		/*简单信息提示框*/
		HintWords(popDom){
			hintFun = popDom.Popfun
		}
		/*切换完成/编辑*/
		edit(isEdit){
				this.setState({
            edit:!isEdit
        })
	      if(isEdit){
	    		$('#loveBox').css('padding-bottom','')
	    	}else{
	    		$('#loveBox').css('padding-bottom','1.2rem')
	    	}
		}
		/*点击变换二级导航*/
		typeChange(i){
			sessionStorage.setItem("loveType",i);
			switch(i){
				case 0:
					let goodsData = {
						userId:sessionStorage.getItem("id"),
						fsxz:true,
						type:'GOODS',
						page:1,
						rows:10
					};
					getLoveData(goodsData);
					break;
				case 1:
					let themeData = {
						userId:sessionStorage.getItem("id"),
						fsxz:true,
						type:'THEME',
						page:1,
						rows:10
					};
					getLoveData(themeData);
					break;
				case 2:
					let commentData = {
						userId:sessionStorage.getItem("id"),
						fsxz:true,
						type:'COMMENT',
						page:1,
						rows:10
					};
					getLoveData(commentData);
					break;
				default:
					break;
			}
    }
    /*点击全选*/
		checkAll(){
        if($('#chooseAll').attr('class').includes('No')){
        	$('#chooseAll').attr('class',goodsStyles.loveEdit)
        	switch(this.state.type){
						case '0':
						  	this.state.dataGoodsList.map(function(item,index){
									return $(`#checkGoods${index}`).children('i').attr('class',goodsStyles.loveEdit)
								})
						  	break;
						case '1':
						  	this.state.dataThemeList.map(function(item,index){
								return $(`#checkSpecial${index}`).children('i').attr('class',goodsStyles.loveEdit)
							})
						  	break;
						case '2':
						  	this.state.dataCommentList.map(function(item,index){
								return $(`#checkEva${index}`).children('i').attr('class',goodsStyles.loveEdit)
							})
						  	break;
						default:
						  break;
						}
			   }else{
	        	$('#chooseAll').attr('class',goodsStyles.loveNoEdit)
	        	switch(this.state.type){
							case '0':
							  	this.state.dataGoodsList.map(function(item,index){
									return $(`#checkGoods${index}`).children('i').attr('class',goodsStyles.loveNoEdit)
								})
							  	break;
							case '1':
							  	this.state.dataThemeList.map(function(item,index){
									return $(`#checkSpecial${index}`).children('i').attr('class',goodsStyles.loveNoEdit)
								})
							  	break;
							case '2':
							  	this.state.dataCommentList.map(function(item,index){
									return $(`#checkEva${index}`).children('i').attr('class',goodsStyles.loveNoEdit)
								})
					  			break;
							default:
							  break;
						}
        }
    }
		/*点击取消收藏是否成功后回调*/
	  isSuccess(msg){
	  	if(msg){
	  		hintFun('取消收藏成功');
				let sendData;
				if(sessionStorage.getItem("loveType")==='0'){
					sendData = {
						userId:sessionStorage.getItem("id"),
						fsxz:true,
						type:'GOODS',
						page:1,
						rows:10
					}
				}else if(sessionStorage.getItem("loveType")==='1'){
					sendData = {
						userId:sessionStorage.getItem("id"),
						fsxz:true,
						type:'THEME',
						page:1,
						rows:10
					}
				}else if(sessionStorage.getItem("loveType")==='2'){
					sendData = {
						userId:sessionStorage.getItem("id"),
						fsxz:true,
						type:'COMMENT',
						page:1,
						rows:10
					}
				}else{
					sendData = {
						userId:sessionStorage.getItem("id"),
						fsxz:true,
						type:'GOODS',
						page:1,
						rows:10
					}
				}
				timer = setTimeout(()=>{
					//console.log(sendData)
					getLoveData(sendData);
				},1500);
	  	}else{
	  		hintFun('取消收藏失败')
	  	}
	  }
		/*点击取消收藏*/
		deleteLove(){
			let delData = [];
			if($('#chooseAll').attr('class').includes('No')){
				switch(this.state.type){
					case '0':
							this.state.dataGoodsList.map(function(item,index){
								if($(`#checkGoods${index}`).children('i').attr('class').includes('loveEdit')){
									delData.push(item.id)
								}else{
									return false
								}
								return false
							})
							break;
					case '1':
							this.state.dataThemeList.map(function(item,index){
								if($(`#checkSpecial${index}`).children('i').attr('class').includes('loveEdit')){
									delData.push(item.id)
								}else{
									return false
								}
								return false
							})
							break;
					case '2':
							this.state.dataCommentList.map(function(item,index){
								if($(`#checkEva${index}`).children('i').attr('class').includes('loveEdit')){
									delData.push(item.id)
								}else{
									return false
								}
								return false
							})
							break;
					default:
						break;
					}
			 }else{
					switch(this.state.type){
						case '0':
								this.state.dataGoodsList.map(function(item,index){
									delData.push(item.id);
									return false
								})
								break;
						case '1':
								this.state.dataThemeList.map(function(item,index){
									delData.push(item.id);
									return false
								})
								break;
						case '2':
								this.state.dataCommentList.map(function(item,index){
									delData.push(item.id);
									return false
								})
								break;
						default:
							break;
					}
			};
			let fid = delData.join(",");
			loveDelete(fid,this.isSuccess)
		}
    /*滚动/固定二级导航*/
    isScoll(){
    	var top=$(window).scrollTop()
    	if(top>87){
				$('#loveSecNav').css({
					"top":"0px"
				})
				$('#headerReturn').slideUp()
			}else{
				$('#loveSecNav').css({
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
			//if(loveData.res_love_datas){
				if(!sessionStorage.getItem("loveType")){
					this.setState({
						type:'0'
					})
					this.goodsList()
				}else{
					this.setState({
						type:sessionStorage.getItem("loveType")
					})
					if(sessionStorage.getItem("loveType")==='1'){
						this.themeList()
					}else if(sessionStorage.getItem("loveType")==='2'){
						this.commentList()
					}else{
						this.goodsList()
					}
				}
			//}
		}
    componentDidMount(){
			isScoll = this.isScoll;
    	this.scroll_fun();
    }
    componentWillUnmount(){
			window.removeEventListener('scroll',isScoll,false);
			clearTimeout(timer);
			//sessionStorage.removeItem("loveType")
		}
	}
	return <LovePage />
}

export default connect(({ loveData }) => ({
  loveData
}))(LovePage);
