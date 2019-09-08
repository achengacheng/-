import React from 'react';
import $ from 'jquery';
import { connect } from 'dva';
import styles from '../../style/mine/myFootprint.css';
import goodsStyles from '../../style/goods/otherGoods.css';
import loveStyles from '../../style/mine/lovePage.css';
import Header from '../../components/PublicComponents/HeaderReturn';

class FootprintPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			edit:false,
		}
	}
	render(){
		let head_val={id:14,val:this.state.edit};
		const footprintData = this.props.footprintData.footprintData;
		const dispatch = this.props.dispatch;
		function chooseToGo(type){
			dispatch({
				type:'footprintData/chooseToGo',
				payload:type
			})
		}
		return(
			<div className={styles.footPrintContainer} id="footBox">
				<Header left_show='1' head_title="我的足迹" header_ids='14' right_fun={(edit) => this.edit(edit)} custom = { head_val }/>
				{footprintData.map(function(k,i){
					return 	<div className={styles.footPrintMain} key={i}>
								<div className={styles.footPrintTime} id={`timeCheck${i}`}>
									<i className={ this.state.edit?goodsStyles.loveNoEdit:goodsStyles.hidden } onClick={ () => this.timeCheckThing(i) }></i>
									<p>{k.time}</p>
								</div>
								<div className={ loveStyles.loveGoodsContainer } id="loveGoods">
									<ul>
										{k.footGoods.map(function(item,index){
											return 	<div id={`${i}checkGoods${index}`} key={index}>	
														<i className={ this.state.edit?goodsStyles.loveNoEdit:goodsStyles.hidden } onClick={ () => this.footCheckThing(i,index)}></i>					
														<li className={loveStyles.loveGoods_li}>
															<img src={item.picSrc} alt="pic"/>
															<div className={loveStyles.loveGoods_text}>
																<h6>{item.name}</h6>
																<p>￥{item.price1}<del>￥{item.price2}</del></p>
																<span onClick={ ()=>chooseToGo('/mypage/LovePage/SimilarGoodsPage') }>找相似</span>
															</div>
														</li>
													</div>
											},this)
										}
									</ul>
								</div>
							</div>
					},this)
				}
				<footer className={ this.state.edit?'':styles.footHidden }>
					<p><i className={ goodsStyles.loveNoEdit } onClick={()=>this.checkAll()} id="chooseAll_foot"></i>全选</p>
					<span>删除</span>
				</footer>
			</div>
		)
	}
	/*切换完成/编辑*/
	edit(isEdit){
		this.setState({
            edit:!isEdit
        })
        if(isEdit){
    		$('#footBox').css('padding-bottom','')
    	}else{
    		$('#footBox').css('padding-bottom','1.2rem')
    	}
	}
	/*单个点击勾选*/
	footCheckThing(a,index){		
		if($(`#${a}checkGoods${index}`).children('i').attr('class').includes('No')){
			let isAll=[];
			let allTime = [];
			$(`#${a}checkGoods${index}`).children('i').attr('class',goodsStyles.loveEdit)
			$(`#${a}checkGoods${index}`).siblings().children('i').map(function(i,k){
				if($(k).attr('class').includes('No')){
					return isAll.push(k)
				}
				return false				
			})
			if(isAll.length===0){
				$(`#timeCheck${a}`).children('i').attr('class',goodsStyles.loveEdit)
			}			
			this.props.footprintData.footprintData.map(function(item,index){
				if($(`#timeCheck${index}`).children('i').attr('class').includes('loveEdit')){
					return allTime.push(item)
				}
				return false
			})
			if(allTime.length===this.props.footprintData.footprintData.length){
				$('#chooseAll_foot').attr('class',goodsStyles.loveEdit)
			}
		}else{
			let isAll=[];
			let allTime = [];
			$(`#${a}checkGoods${index}`).children('i').attr('class',goodsStyles.loveNoEdit)
			$(`#${a}checkGoods${index}`).siblings().children('i').map(function(i,k){
				if($(k).attr('class').includes('No')){
					return isAll.push(k)
				}	
				return false			
			})
			if(isAll.length===0){
				$(`#timeCheck${a}`).children('i').attr('class',goodsStyles.loveNoEdit)				
			}
			this.props.footprintData.footprintData.map(function(item,index){
				if($(`#timeCheck${index}`).children('i').attr('class').includes('No')){
					return allTime.push(item)
				}
				return false
			})
			if(allTime.length!==0){
				$('#chooseAll_foot').attr('class',goodsStyles.loveNoEdit)
			}
		}
		
	}
	/*时间块勾选*/
	timeCheckThing(a){
		if($(`#timeCheck${a}`).children('i').attr('class').includes('No')){
			let allTime = []; 
			$(`#timeCheck${a}`).children('i').attr('class',goodsStyles.loveEdit)
			this.props.footprintData.footprintData[a].footGoods.map(function(item,index){
				return $(`#${a}checkGoods${index}`).children('i').attr('class',goodsStyles.loveEdit)
			})
			this.props.footprintData.footprintData.map(function(item,index){
				if($(`#timeCheck${index}`).children('i').attr('class').includes('loveEdit')){
					return allTime.push(item)
				}
				return false
			})
			if(allTime.length===this.props.footprintData.footprintData.length){
				$('#chooseAll_foot').attr('class',goodsStyles.loveEdit)
			}
		}else{
			let allTime = [];
			$(`#timeCheck${a}`).children('i').attr('class',goodsStyles.loveNoEdit)
			this.props.footprintData.footprintData[a].footGoods.map(function(item,index){
				return $(`#${a}checkGoods${index}`).children('i').attr('class',goodsStyles.loveNoEdit)
			})
			this.props.footprintData.footprintData.map(function(item,index){
				if($(`#timeCheck${index}`).children('i').attr('class').includes('No')){
					return allTime.push(item)
				}
				return false
			})
			if(allTime.length!==0){
				$('#chooseAll_foot').attr('class',goodsStyles.loveNoEdit)
			}
		}
	}
	/*点击全选*/
	checkAll(){
        if($('#chooseAll_foot').attr('class').includes('No')){
        	$('#chooseAll_foot').attr('class',goodsStyles.loveEdit)
        	this.props.footprintData.footprintData.map(function(item,index){				
				item.footGoods.map(function(a,b){
					return $(`#${index}checkGoods${b}`).children('i').attr('class',goodsStyles.loveEdit)
				})
				return $(`#timeCheck${index}`).children('i').attr('class',goodsStyles.loveEdit)
			})
        }else{
        	$('#chooseAll_foot').attr('class',goodsStyles.loveNoEdit)
        	this.props.footprintData.footprintData.map(function(item,index){				
				item.footGoods.map(function(a,b){
					return $(`#${index}checkGoods${b}`).children('i').attr('class',goodsStyles.loveNoEdit)
				})
				return $(`#timeCheck${index}`).children('i').attr('class',goodsStyles.loveNoEdit)
			})
        }
    }
}

export default connect(({ footprintData }) => ({
  footprintData
}))(FootprintPage);