import React from 'react';
import styles from '../../style/PublicStyle/HeaderReturn.css';
import $ from 'jquery';
import { Link } from 'dva/router'
const Header=({header_title,left_icon,left_fun,right_icon,right_fun})=>{
	//头部文字 //左边图标传数值(0,1,2...),新样式自己定义 不传则没有//左边图标点击方法

	let gaib_State,//滑动方法声明
		left_switch,//左边图标样式,在css中自己定义,且有的两种状态 例://{one:styles.header1,two:styles.header2}
		//right_switch,//右边图标样式,在css中自己定义,且有的两种状态
		scroll_fun
	switch(parseInt(left_icon)){
		case 0:
			left_switch = {one:styles.myPageMesIcon1,two:styles.myPageMesIcon2}//消息图标
			break;
		case 1:
			left_switch = {one:styles.balanceBlack,two:styles.balancewrite}//返回
			break;
		default:
			left_switch = {one:styles.display_none,two:styles.display_none}
	}
	/* 左侧点击方法 */
	function left_click(){
		if(left_fun){
			left_fun()
		}else{
			console.log("没有方法")
		}
	}
	/* 右侧点击方法 */
	function right_click(){
		sessionStorage.setItem('searchSt',1)
		if(right_fun){
			right_fun()
		}else{
			console.log("没有方法")
		}
	}
	function ifLoginOrshpping(){
		let usersId=sessionStorage.getItem('id')
		if (usersId===""||usersId===undefined||usersId===null) {
			window.location.href='#/Login?/ShoppingCart'
		}else{
			window.location.href='#/ShoppingCart'
		}
	}
	const RightIcon=({right_icon,state_id})=>{//返回右边图标的组件,请自己写新的样式组件
		switch(parseInt(right_icon)){
			case 0:
				return(<i className={state_id!==0?styles.myPageSetIcon1:styles.myPageSetIcon2 } onClick={ right_click }></i>)
				break;
			case 1:
				return(	<div className={styles.headerReturn_rightbox}>
							<Link to='/SearchPage'>
								<i className={state_id!==0?styles.headerReturn_right_search+" "+styles.classifyHeadIcon:styles.headerReturn_right_search2+" "+styles.classifyHeadIcon } onClick={ right_click }></i>
							</Link>
							<i className={state_id!==0?styles.headerReturn_right_car+" "+styles.classifyHeadCar:styles.headerReturn_right_car2+" "+styles.classifyHeadCar } onClick={ifLoginOrshpping}>
								<span className={ `${styles.hasGoodsInCart} ${sessionStorage.getItem('scNO')?'':styles.headerReturn_back1} ${sessionStorage.getItem('scNO')==='0'?styles.headerReturn_back1:''}` }>{sessionStorage.getItem('scNO')>=9?'9+':sessionStorage.getItem('scNO')}</span>
							</i>
						</div>)
				break;
			case 2:
				return(
					<Link to='/mypage/ServePage/HelpContent/5b2b89d7a8a9262fbc9ddda8'>
						<i className={state_id!==0?styles.question:styles.question1 }></i>
					</Link>
				)
				break;
			default:
				return(<div></div>)
				break;
		}
	}

	class Header extends React.Component {
		constructor(props){
			super(props);
			this.state={
				scollCount: 0,
				hasMes:false
			}
		}
		render() {
			return (
				<div id='iop' className={this.state.scollCount?styles.header1+" "+styles.header:styles.header2+" "+styles.header+' ' } >
					<i className={ this.state.scollCount!==0?left_switch.one:left_switch.two} onClick={left_click}>
						<span className={this.state.hasMes?styles.myPageHasMes:styles.myPageNoMes}></span>
					</i>
					<p className={ this.state.scollCount!==0?styles.typeface:'' }>{header_title}</p>
					<RightIcon right_icon={right_icon} state_id={this.state.scollCount} />
				</div>
			)
		}
		componentWillMount(){
			gaib_State=(i)=>{
				this.setState({scollCount: i})
			}
		}
		componentDidMount(){
			scroll_fun=()=>{
				 var top=$(window).scrollTop();
					if(top>30){
						gaib_State(1)
					}else{
						gaib_State(0)
					}
			}
			window.addEventListener('scroll',scroll_fun)
		}
		componentWillUnmount(){
			window.removeEventListener('scroll',scroll_fun)
		}
	}
	return <Header/>
}


export default Header;
