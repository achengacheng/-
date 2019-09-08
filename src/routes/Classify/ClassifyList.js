import React from 'react';
import $ from 'jquery';
import { connect } from 'dva';
import styles from '../../style/classify.css';
import Header from '../../components/PublicComponents/HeaderReturn';
import GoodsType from '../../components/Home/HomePage/HomeGuessLike';
import MaskLayer from '../../components/PublicComponents/MaskLayer';
import Filtration from '../../components/Filtration';
import DefaultPage from '../../components/PublicComponents/DefaultPage';//缺省页面
import ChaPop from  '../../components/PublicComponents/ChaPop'
import FxPop from '../../components/PublicComponents/FxPop'

var isScoll,saveScollHeight,type,price;

const ClassifyList = ({ dispatch,ClassifyListData,location}) => {
	let page = 1,title;
	let menuId = location.pathname.slice(location.pathname.lastIndexOf('/')+1);//id
	if(typeof ClassifyListData.classifyName === 'string'){
		title=ClassifyListData.classifyName
	}else{
		for(var key in ClassifyListData.classifyName){
			if(menuId === String(key)){
				if(ClassifyListData.classifyName[key]===undefined){
					title = '分类列表'
				}else{
					title = ClassifyListData.classifyName[key]
				}
			}else{
				title = '分类列表'
			}
		}
	}

	if(title===undefined||title==='undefined'||title===null||title===''){
		document.title = '分类列表'
	}else{
		document.title = title
	}
	/*获取数据*/
	function getListData(data) {
		if(ClassifyListData.isHome){
			dispatch({
				type:'ClassifyListData/getListData',
				payload:data,
				ishome:ClassifyListData.isHome
			})
		}else{
			dispatch({
				type:'ClassifyListData/cuxiaoData',
				datas:data,
				ishome:ClassifyListData.isHome
			})
		}
	}
	/*跳转商品详情页*/
	function goToGoodsDetails(data) {
		dispatch({
			type:'ClassifyListData/goToGoodsDetails',
			payload:data
		})
	}
	/*上拉加载更多的方法*/
	function addGuessLike(page,d_this){//page传递新页数 这里没用,d_this请求成功后回调到loading
		let num = 10;//每页条数
		let listData;
		if(location.hash==='#home'){
			console.log(page)
			let data = {
				menuId:menuId,
				page:page,
				max:num,
				fsxz:false,
				_this:d_this
			};
			dispatch({
				type:'ClassifyListData/cuxiaoData',
				datas:data,
				ishome:false
			})
		}else{
			if(sessionStorage.getItem("price")){
				listData = {
					menuId:menuId,
					fsxz:false,
					_this:d_this,
					page:page,
					max:num,
					up:sessionStorage.getItem("price")
				}
			}else{
				listData = {
					menuId:menuId,
					fsxz:false,
					_this:d_this,
					page:page,
					max:num
				}
			}
			dispatch({
				type:'ClassifyListData/getListData',
				payload:listData
			})
		}

	}
	let standardTab,fxPopfun
	function HintWords(popDom){//提示语
		standardTab = popDom.Popfun
	}
	function FxDomFun(fxDom) {//分享引导
		fxPopfun=fxDom.fxPopfun
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
	class ClassifyList extends React.Component{
		constructor(props){
			super(props);
			this.state={
				type:false,
				price:false
			}
		}
		render(){
			let showDefault = true;
			let default_id = 3;
			if(ClassifyListData.res_list_datas){
				if(ClassifyListData.res_list_datas.length===0){
					return (
						<div className={ styles.classifyListContainer }>
							<Header	left_show='1' head_title={title} header_ids='8' />
							<div className={ styles.classifyListType } id="classifySec">
								<p onClick={() => this.typeChange(0)} className={ this.state.type==='0'?styles.chooseThisType:'' }>综合排序</p>
								<div onClick={() => this.typeChange(1)} className={ this.state.type==='1'?styles.chooseThisType:'' }>
									<p>价格排序</p>
									<div className={ !this.state.price?styles.noGoodsInCart:styles.goodsPrice }>
										<i className={ this.state.price === '0'?styles.priceUp1:styles.priceUp2 }></i>
										<i className={ this.state.price === '0'?styles.priceDown2:styles.priceDown1 }></i>
									</div>
									<div className={ !this.state.price?styles.goodsPrice:styles.noGoodsInCart }>
										<i className={ styles.priceUp1 }></i>
										<i className={ styles.priceDown1 }></i>
									</div>
								</div>
								<p onClick={() => this.typeChange(2)} className={ `${this.state.type==='2'?styles.chooseThisType:''} ${location.hash==='#home'?styles.noGoodsInCart:''}` }>筛选商品</p>
							</div>
							<DefaultPage showDefault={showDefault} default_ids={default_id} />
							<MaskLayer disappear = { this.disappear }/>
							<Filtration disappear = { this.disappear } filtData = { ClassifyListData.res_filt_datas }/>
						</div>
					)
				}else if(ClassifyListData.res_list_datas.length!==0){
					return (
						<div className={ styles.classifyListContainer }>
							<Header	left_show='1' head_title={title} header_ids='8' />
							<div className={ styles.classifyListType } id="classifySecNav">
								<p onClick={() => this.typeChange(0)} className={ this.state.type==='0'?styles.chooseThisType:'' }>综合排序</p>
								<div onClick={() => this.typeChange(1)} className={ this.state.type==='1'?styles.chooseThisType:'' }>
									<p>价格排序</p>
									<div className={ !this.state.price?styles.noGoodsInCart:styles.goodsPrice }>
										<i className={ this.state.price === '0'?styles.priceUp1:styles.priceUp2 }></i>
										<i className={ this.state.price === '0'?styles.priceDown2:styles.priceDown1 }></i>
									</div>
									<div className={ !this.state.price?styles.goodsPrice:styles.noGoodsInCart }>
										<i className={ styles.priceUp1 }></i>
										<i className={ styles.priceDown1 }></i>
									</div>
								</div>
								<p onClick={() => this.typeChange(2)} className={ `${this.state.type==='2'?styles.chooseThisType:''} ${location.hash==='#home'?styles.noGoodsInCart:''}` }>筛选商品</p>
							</div>
							<GoodsType goodsData = { ClassifyListData.res_list_datas } Callback = { goToGoodsDetails } getFun={ addGuessLike } page={ page }/>
							<MaskLayer disappear = { this.disappear }/>
							<Filtration disappear = { this.disappear } filtData = { ClassifyListData.res_filt_datas }/>
							<ChaPop HintWords={ HintWords }/>
							<FxPop FxDomFun={FxDomFun}/>
						</div>
					)
				}
			}else{
				return (
					<div className={ styles.classifyListContainer }>
						<Header	left_show='1' head_title={title} header_ids='8' />
					</div>
				)
			}
		}
		/*点击变换二级导航*/
		typeChange(i){
			sessionStorage.setItem("type",i);
        	if(i===1){//价格排序
	        	if(this.state.price==='0'){
	        		let data = {
	        			menuId:menuId,
								fsxz:true,
	        			up:'1',
	        			page:1,
								max:20
	        		}
	        		sessionStorage.setItem("price",'1')
							if(sessionStorage.getItem("filtParams")){
								if(sessionStorage.getItem("filtMenuIds")){
									data.menuId = JSON.parse(sessionStorage.getItem("filtMenuIds")).join(",");
								};
								if(sessionStorage.getItem("filtDeliveries")){
									data.deliveries = JSON.parse(sessionStorage.getItem("filtDeliveries")).join(",");
								};
								if(sessionStorage.getItem("filtSkus")){
									data.skus = JSON.parse(sessionStorage.getItem("filtSkus"));
								};
								getListData(data)
							}else{
		        		getListData(data)
							}
	        	}else{
	        		let data = {
	        			menuId:menuId,
								fsxz:true,
	        			up:'0',
	        			page:1,
								max:20
	        		}
	        		sessionStorage.setItem("price",'0')
							if(sessionStorage.getItem("filtParams")){
								if(sessionStorage.getItem("filtMenuIds")){
									data.menuId = JSON.parse(sessionStorage.getItem("filtMenuIds")).join(",");
								};
								if(sessionStorage.getItem("filtDeliveries")){
									data.deliveries = JSON.parse(sessionStorage.getItem("filtDeliveries")).join(",");
								};
								if(sessionStorage.getItem("filtSkus")){
									data.skus = JSON.parse(sessionStorage.getItem("filtSkus"));
								};
								getListData(data)
							}else{
		        		getListData(data)
							}
	        	}
        	}else if(i===2){//出现筛选框

					this.setState({
						type:'2',
						price:false
					})
        	saveScollHeight = $(window).scrollTop();
        	/*蒙版出现*/
        	$('#maskbox').css({
        		'display':'block'
        	})
        	$('body,html').css({
        		'height':'100%',
						'overflow':'hidden'
					})
					/*模块--Filtration--出现*/
					$("#filtContainer").css({
						'display':'block'
					})
					setTimeout(function(){
						$("#filtContainer,#filtContainer footer").css({
							'right':'0px'
						})
					},10)
        }else{
					this.setState({
						price:false
					})
					if(sessionStorage.getItem("filtParams")){
						let filtData = {
							menuId:menuId,
							fsxz:true,
	      					page:1,
							max:10
						}
						if(sessionStorage.getItem("filtMenuIds")){
							filtData.menuId = JSON.parse(sessionStorage.getItem("filtMenuIds")).join(",");
						};
						if(sessionStorage.getItem("filtDeliveries")){
							filtData.deliveries = JSON.parse(sessionStorage.getItem("filtDeliveries")).join(",");
						};
						if(sessionStorage.getItem("filtSkus")){
							filtData.skus = JSON.parse(sessionStorage.getItem("filtSkus"));
						};
						getListData(filtData)
					}else{
						let data = {
	      			menuId:menuId,
							fsxz:true,
	      			page:1,
							max:10
	      		}
	        	getListData(data)
					}
        }
    	}
	    /*点击蒙版消失的方法*/
	    disappear(type,menuIds,deliveries,skus){
				$('#maskbox').css({
					'display':'none'
				});
				$('body,html').css({
					'height':'',
					'overflow':''
				})
				$("#filtContainer,#filtContainer footer").css({
					'right':-$("#filtContainer").width()+'px'
				})
				setTimeout(function(){
					$("#filtContainer").css({
						'display':'none'
					})
				},550)
				$(window).scrollTop(saveScollHeight);
				saveScollHeight = "";
				if(type===1){
					let data = {
	    			menuId:menuId,
						fsxz:true,
	    			page:1,
						max:10
	    		}
	    		if(menuIds.length!==0){
						menuIds = menuIds.join(",");
						data.menuId = menuIds
					};
					if(deliveries.length!==0){
						deliveries = deliveries.join(",");
						data.deliveries = deliveries
					};
					if(skus.length!==0){
						data.skus =skus
					}
					if(menuIds.length===0&&deliveries.length===0&&skus.length===0){//未选择任何标签
						sessionStorage.setItem("type","0");
						// data.menuId = null
						getListData(data)
					}else{
						getListData(data)
					}
				}
			}
	    /*滚动/固定二级导航*/
	    isScoll(){
	    	var top=$(window).scrollTop()
	    	if(top>87){
				$('#classifySecNav').css({
					"top":"0px"
				})
				$('#headerReturn').slideUp()
			}else{
				$('#classifySecNav').css({
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
    	//getListData(data)
    	if(!sessionStorage.getItem("type")){
    		this.setState({
    			type:'0',
    			price:false
    		})
    	}else if(sessionStorage.getItem("type")!=='1'){
    		this.setState({
    			type:sessionStorage.getItem("type"),
    			price:false
    		})
    	}else{
    		this.setState({
    			type:sessionStorage.getItem("type"),
    			price:sessionStorage.getItem("price")
    		})
    	}
    }
    componentDidMount(){
			isScoll = this.isScoll;
    	this.scroll_fun();
    	$('#wxShare').click(function() {
    		fxPopfun(true)
    		if (ClassifyListData.classshareMsg) {
    			wxShareFun(ClassifyListData.classshareMsg)
    		}

    	});
    }
	  componentWillUnmount(){
			window.removeEventListener('scroll',isScoll,false);
			// sessionStorage.removeItem("classifyListName")
		}
	}
	return <ClassifyList />
}

export default connect(({ ClassifyListData }) => ({
  ClassifyListData
}))(ClassifyList);
