import React from 'react';
import { connect } from 'dva';
import styles from '../../style/mine/myPage.css';
import Header from '../../components/PublicComponents/Header';
import UserMsgHeader from '../../components/Mine/MyPage/UserMes';
import ConsumeEarnings from '../../components/Mine/MyPage/ConsumeEarnings';
import GoodsMsg from '../../components/Mine/MyPage/GoodsMes';
import OtherMsg from '../../components/Mine/MyPage/OtherMes';
import Footer from '../../components/PublicComponents/footerNav';
import ButtonPop from '../../components/PublicComponents/ButtonPop';//有按钮提示语
import ChaPop from  '../../components/PublicComponents/ChaPop'

const MyPage = ({ dispatch,myPageData }) => {
	function goSomeWhere(site,index){
		dispatch({
			type:'myPageData/goSomeWhere',
			payload:site,
			index:index
		})
	}
	/* 头部左侧跳转 */
	function leftGo(){
		dispatch({
			type:'myPageData/leftGo'
		})
	}
	/* 头部右侧跳转 */
	function rightGo(){
		dispatch({
			type:'myPageData/rightGo'
		})
	}
	const ButtonHint = {
		title:"这是一个标题",
		explain:"这是个有按钮文字提示框的样式这是个有按钮文字提示框的样式",
		type:2,
		hide:true
	}
	/*提示弹窗*/
	let standardTab;
	function HintWords(popDom){
		standardTab = popDom.Popfun
	}
	class MyPageIndex extends React.Component{
		render () {
			if(myPageData.loading){
				console.log(myPageData)
				return (
					<div className={styles.myPageContainer} >
						<div className={styles.myPageBg} >
							<img src='./src/assets/myPage-bg.png' alt='bgImg'/>
						</div>
						<Header header_title='我的' left_icon='0' right_icon='0' left_fun = { leftGo } right_fun = { rightGo }/>
						<UserMsgHeader go = { goSomeWhere } userInfo = { myPageData.userInfo }/>
						<ConsumeEarnings go = { goSomeWhere } money = { myPageData.money } />
						<GoodsMsg GoodsMesData = { myPageData.goodsMesIcons } go = { goSomeWhere } orderBubble = { myPageData.orderBubble } shoppingCartBubble = { myPageData.shoppingCartBubble }/>
						<OtherMsg ConsEarnData = { myPageData.otherAboutConsEarn } ServiceData = {myPageData.otherAboutService} go = { goSomeWhere } redPacketBubble = {  myPageData.redPacketBubble }/>
						<Footer NewLocation='4'/>
						<ButtonPop ButtonHint = { ButtonHint }/>
					</div>
				)
			}else{
				return (
					<div className={styles.myPageContainer} >
						<div className={styles.myPageBg} >
							<img src='./src/assets/myPage-bg.png' alt='bgImg'/>
						</div>
						<Header header_title='我的' left_icon='0' right_icon='0'/>
					</div>
				)
			}
		}
		componentDidMount(){
			if(myPageData.errData){
				console.log(myPageData.errData)
				standardTab(myPageData.errData.alertMsg.msg)
				setTimeout(function(){
					window.sessionStorage.clear();
					window.location.href='#/Login?/myPage'
				},3000)
			}
		}
	}
	return <MyPageIndex />
};

export default connect(({ myPageData}) => ({
  myPageData
}))(MyPage);
