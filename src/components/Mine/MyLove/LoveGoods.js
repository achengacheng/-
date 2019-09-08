import React from 'react';
import $ from 'jquery';
import goodsStyles from '../../../style/goods/otherGoods.css';
import styles from '../../../style/mine/lovePage.css';
import DefaultPage from '../../PublicComponents/DefaultPage';//缺省页面
import Loading from '../../PublicComponents/LoadingCom';//加载更多

const LoveGoods = ({ edit,goodsData,chooseToGo,getFun,page}) => {
	/*getFun 滑动加载请求方法 参数(页数,this),page当前页*/
	let _this,PtData,typePt,d_page=page;
	function laodfun(dom){
		PtData=dom.ptData
	}
	function reqFun(NewPages){
		getFun(NewPages,_this,'GOODS')
	}
	class LoveGoods extends React.Component{
		constructor(props) {
        super(props);
        this.state={
        	goodsData:goodsData
        }
        this.getPage=this.getPage.bind(this)
    }
    getPage(types,data,page){//有无更多数据
    	let newData=this.state.goodsData.concat(data)
    	d_page=page
    	typePt=types
    	this.setState({
				goodsData:newData
    	})
    }
		render(){
			if(goodsData.length===0||!goodsData){
				let showDefault = true;
				let default_id = 3;
				return (
					<DefaultPage showDefault={showDefault} default_ids={default_id} />
				)
			}else{
				console.log(this.state.goodsData)
				return(

					<div className={ styles.loveGoodsContainer } id="loveGoods">
						<ul>
							{this.state.goodsData.map(function(item,index){
								return 	<div id={`checkGoods${index}`} key={index}>
													<i className={ edit?goodsStyles.loveNoEdit:goodsStyles.hidden } onClick={ () => this.loveCheckThing(index,item.id)}></i>
													<li className={styles.loveGoods_li}>
														<img src={item.picture} alt="pic" onClick={ ()=>chooseToGo('/GoodsPage/'+item.goodsId) }/>
														<div className={styles.loveGoods_text}>
															<h6>{item.goodsName}</h6>
															<p>￥{item.salePrice}<del>￥{item.markPrice}</del></p>
															{/* <span onClick={ ()=>chooseToGo('/mypage/LovePage/SimilarGoodsPage') }>找相似</span> */}
														</div>
													</li>
												</div>
								},this)
							}
						</ul>
						<Loading getLoadFun={laodfun} reqFun={reqFun} page={d_page}/>
					</div>
				)
			}
		}
		/*点击勾选*/
		loveCheckThing(index,loveId){
			if($(`#checkGoods${index}`).children('i').attr('class').includes('No')){
				let isAll=[];
				$(`#checkGoods${index}`).children('i').attr('class',goodsStyles.loveEdit)
				$(`#checkGoods${index}`).siblings().children('i').map(function(i,k){
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
				$(`#checkGoods${index}`).children('i').attr('class',goodsStyles.loveNoEdit)
				$(`#checkGoods${index}`).siblings().children('i').map(function(i,k){
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
			$('#chooseAll').attr('class',goodsStyles.loveNoEdit)
			// 出现勾选框
			if(edit){
				this.state.goodsData.map(function(item,index){
					$(`#checkGoods${index}`).children('i').attr('class',goodsStyles.loveNoEdit)
					return false
				})
			}else{
				this.state.goodsData.map(function(item,index){
					$(`#checkGoods${index}`).children('i').attr('class',goodsStyles.hidden)
					return false
				})
			}
	  }
		componentDidUpdate(){
			PtData(typePt)
		}
	}
	return <LoveGoods />
}

export default LoveGoods;
