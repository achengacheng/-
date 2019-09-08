import React from 'react';
import $ from 'jquery';
import styles from '../../style/goods/otherGoods.css';
import EvaType from '../AJDetails/EvaReport';

const GoodsAllEva = ({ chooseToGo,evaAllData,isLove,levelEvaData,picEvaData,getAllFun,getLevelFun,getPicFun,page,hintFun}) => {
	class GoodsAllEva extends React.Component{
		constructor(props){
			super(props);
			this.state={
				type:false,
				dataList:false
			}
			this.changeDataList=this.changeDataList.bind(this)
		}
		changeDataList(data){
			console.log('评价中间页',data)
			if(!data){
				if(!sessionStorage.getItem("goodsEvaType")||sessionStorage.getItem("goodsEvaType")==='0'){
					if(evaAllData){
			    		this.setState({
			    			dataList:evaAllData.dataList,
			    		})
					}
				}else{
					sessionStorage.setItem("goodsEvaType","0")
					if(evaAllData){
			    		this.setState({
			    			dataList:evaAllData.dataList,
			    		})
					}
				}
			}else{
				this.setState({
					dataList:data.data,
				})
			}
		}
		render(){
			if(evaAllData){
				if(evaAllData.count.allNO>=100){
					evaAllData.count.allNO = "99+"
				};
				return(
					<div className={ styles.goodsAllEvaContainer }>
						<div className={ styles.goodsAllEvaType } id="goodsEvaType">
							<span className={ this.state.type==='0'?styles.evaCheck:'' } onClick={() => this.typeChange(0)}>全部({evaAllData.count.allNO})</span>
							<span className={ this.state.type==='1'?styles.evaCheck:'' } onClick={() => this.typeChange(1)}>好评({evaAllData.count.goodNO})</span>
							<span className={ this.state.type==='2'?styles.evaCheck:'' } onClick={() => this.typeChange(2)}>中评({evaAllData.count.mediumNO})</span>
							<span className={ this.state.type==='3'?styles.evaCheck:'' } onClick={() => this.typeChange(3)}>差评({evaAllData.count.badNO})</span>
							<span className={ this.state.type==='4'?styles.evaCheck:'' } onClick={() => this.typeChange(4)}>有图({evaAllData.count.picNO})</span>
						</div>
						<EvaType chooseToGo = { chooseToGo } dataList = { this.state.dataList } come = {'goods'} getFun={ getAllFun } getLevelFun={ getLevelFun } getPicFun={ getPicFun } page={ page } type = { this.state.type } hintFun = { hintFun }/>
					</div>
				)
			}else{
				return <div></div>
			}
		}
		/*点击变换二级导航*/
		typeChange(i){
	        sessionStorage.setItem("goodsEvaType",i);
	        switch(i){
				case 0:
					this.setState({
						type:'0'
					})
					this.changeDataList()
					break;
				case 1:
					this.setState({
						type:'1'
					})
					levelEvaData('good',this.changeDataList)
					break;
				case 2:
					this.setState({
						type:'2'
					})
					levelEvaData('medium',this.changeDataList)
					break;
				case 3:
					this.setState({
						type:'3'
					})
					levelEvaData('bad',this.changeDataList)
					break;
				case 4:
					this.setState({
						type:'4'
					})
					picEvaData(this.changeDataList)
					break;
				default:
					this.setState({
						type:'0'
					})
					this.changeDataList()
					break;
			}
	  }
	  componentWillMount(){
				if(evaAllData&&!this.state.dataList){
	    			this.changeDataList()
	    	}
	    	if(!sessionStorage.getItem("goodsEvaType")){
	    		this.setState({
	    			type:'0'
	    		})
	    	}else{
	    		this.setState({
	    			type:sessionStorage.getItem("goodsEvaType")
	    		})
	    	}
	    }
	  componentDidMount(){
	  	if(isLove){
	  		$('#love').css('display','none');
	  		$('#love2').css('display','block');
	  	}
	  }
	}
	return <GoodsAllEva />
}

export default GoodsAllEva
