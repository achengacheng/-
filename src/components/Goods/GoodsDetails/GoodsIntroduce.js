import React from 'react';
import $ from 'jquery';
import goodsStyles from '../../../style/goods/goodsDetails.css';
import styles from '../../../style/AJ/AJDetails.css';

class GoodsIntroduce extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isHidden: false,
			arrHidden:false,
		}
	}
	render(){
		return (
			<div className={ goodsStyles.goodsIntroduceContainer }>
				<div className={ goodsStyles.goodsIntroduceTitle }>
					<p>商品介绍</p>
				</div>
				<div className={ styles.introduceMain }>
					<p className={ !this.state.isHidden?'':styles.hiddenContent }  id='article'>
						{ this.props.contentData }
						<span className={ !this.state.isHidden?styles.hiddenArr:'' }>...</span>
					</p>
					<span className={ !this.state.arrHidden?styles.hiddenArr:'' } onClick={() => this.unfold(this.state.isHidden)} ref='arr'>
						<i className={ !this.state.isHidden?styles.arrUp:styles.arrDown }></i>
					</span>
				</div>
			</div>
		)
	}
	/*展开文字说明*/
	unfold(value) {
		this.setState({
			isHidden: !value,	
		})
	}
	componentDidMount(){
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
	}
}

export default GoodsIntroduce