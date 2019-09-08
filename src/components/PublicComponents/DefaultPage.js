import React from 'react';
import $ from 'jquery';
import { withRouter } from "react-router-dom";
import styles from '../../style/PublicStyle/defaultPage.css';

/*
props传递两个值：
showDefault:布尔值，false为不展示，ture为展示缺省页面；
default_ids：
	0：连不上服务器
	1：维护中
	2：页面丢失
	3：暂无数据
	4：无购买数据
	5：商品已下架
*/
class DefaultPage extends React.Component{
	constructor(props){
		super(props);
		this.state={
			picSrc:'',
			Hint1:'',
			Hint2:''
		}
	}
	render(){
		return(
			<div className={styles.defaultPageContainer} id="defaultPage" onClick={ ()=>this.refresh() }>
				<div className={styles.defaultPic} >
					<img src={this.state.picSrc} alt="pic" />
				</div>
				<p>{this.state.Hint1}</p>
				<span className={this.props.default_ids===2?styles.defaultButton:styles.defaultHint} onClick={ ()=>this.toHome() }>{this.state.Hint2}</span>
				<span className={this.props.default_ids===4||5?styles.defaultCartButton:styles.defaultHidden} onClick={ ()=>this.cartToHome() }>商城首页</span>
			</div>
		)
	}
	/*展示哪一个缺省页面*/
	show(){
		switch(this.props.default_ids){
			case 0:
				this.setState({
		      picSrc:'src/assets/default_breakServer.png',
					Hint1:'服务器开小差了请重新加载',
					Hint2:'可点击空白处刷新'
        });
        break;
		    case 1:
				this.setState({
		      picSrc:'src/assets/default_maintain.png',
					Hint1:'维护中!',
					Hint2:'页面正在维护中，去商城首页看看吧'
        });
        break;
		    case 2:
				this.setState({
		      picSrc:'src/assets/default_lose.png',
					Hint1:'页面已丢失!',
					Hint2:'返回首页'
        });
        break;
		    case 3:
				this.setState({
		      picSrc:'src/assets/default_withoutData.png',
					Hint1:'暂无数据!',
					Hint2:'页面暂无数据，去商城首页看看吧'
        });
        break;
		    case 4:
				this.setState({
		      picSrc:'src/assets/default_withoutCart.png',
					Hint1:'购物车竟然是空的!',
					Hint2:'再忙，也要记得买点什么犒劳自己~'
	      });
	      break;
				case 5:
				this.setState({
		      picSrc:'src/assets/default_goodsNotIn.png',
					Hint1:'商品下架',
					Hint2:'很抱歉，你查看的商品找不到了'
	      });
	      break;
			default:
				this.setState({
					picSrc:'src/assets/default_withoutData.png',
					Hint1:'暂无数据!',
					Hint2:'页面暂无数据，去商城首页看看吧'
				});
		}
	}
	refresh(){
		if(this.props.default_ids===0){
			window.location.reload()
		}else{
			return false
		}
	}
	toHome(){
		if(this.props.default_ids===2){
			this.props.history.push('/');
		}else{
			return false
		}
	}
	cartToHome(){
		if(this.props.default_ids===4||5){
			this.props.history.push('/');
		}else{
			return false
		}
	}
	componentDidMount(){
		this.show()
		if(this.props.showDefault){
			let height =  document.documentElement.clientHeight || document.body.clientHeight;
			$('#defaultPage').height(height);
			$('#defaultPage').siblings().not("#headerReturn,#goodsEvaType,#classifySec,#specialNav,#footerbox").css({//#goodsEvaType为商品评价处二级展示导航；#classifySec为分类处二级导航
	    		'display':'none'
	    	})
		}else{
			$('#defaultPage').css({
				'display':'none'
			})
		}
    }
}

export default withRouter(DefaultPage)
