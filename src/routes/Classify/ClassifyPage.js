import React from 'react';
import { connect } from 'dva';
import headStyles from '../../style/PublicStyle/HeaderReturn.css';
import styles from '../../style/classify.css';
import ClassifyOfAll from '../../components/AJDetails/AJOfAll';
import Footer from '../../components/PublicComponents/footerNav';
import ChaPop from '../../components/PublicComponents/ChaPop';//提示框

const ClassifyPage = ({ dispatch,ClassifyPageData,location }) => {
	let standardTab,cartNo;
	/*顶部购物车*/
	if(sessionStorage.getItem("scNO")){
		if(Number(sessionStorage.getItem("scNO"))>=9){
			cartNo = '9+'
		}else{
			cartNo = sessionStorage.getItem("scNO")
		}
	}else{
		cartNo = '0'
	}
	function chooseToGo(path,name,id){
		dispatch({
			type:'ClassifyPageData/chooseToGo',
			path:path,
			name:name,
			id:id
		})
	}
	function goToSearch(data){
		sessionStorage.setItem('searchSt',1)
		dispatch({
			type:'ClassifyPageData/goToSearch',
			payload:data
		})
	}
	class ClassifyPage extends React.Component{
		render(){
			if(!ClassifyPageData.loading){
				return (
					<div className={ styles.classifyPageContainer }>
						<header className={ headStyles.headerReturn_box }>
							<i className={ headStyles.myPageMesIcon1 } onClick={() => this.goToMsg()}>
								{/* <span className={ headStyles.myPageHasMes }></span> */}
								<span className={ headStyles.myPageNoMes }></span>
							</i>
							<p className={ headStyles.headerReturn_text }>分类</p>
							<div className={ headStyles.headerReturn_rightbox }>
								<i className={ `${headStyles.headerReturn_right_search} ${styles.classifyHeadIcon}` } onClick={() => goToSearch('/SearchPage')}></i>
								<i className={ `${headStyles.headerReturn_right_car} ${styles.classifyHeadCar}` } onClick={() => this.goToCart()}>
									<span className={ cartNo==='0'?styles.noGoodsInCart:styles.hasGoodsInCart }>{ cartNo }</span>
								</i>
							</div>
						</header>
						<ClassifyOfAll pageData = { ClassifyPageData.res_datas.data } chooseToGo = { chooseToGo } type="Classify"/>
						<Footer NewLocation='1'/>
						<ChaPop HintWords={ this.HintWords }/>
					</div>
				)
			}else{
				return (
					<div></div>
				)
			}
		}
		/*简单提示框*/
	  HintWords(popDom){
			standardTab = popDom.Popfun
		}
		/*点击跳转至购物车*/
		goToCart(){
			if(sessionStorage.getItem("id")){
				goToSearch('/ShoppingCart')
			}else{
				goToSearch('/Login?'+location.pathname)
			}
		}
		/*点击跳转至消息中心*/
		goToMsg(){
			if(sessionStorage.getItem("id")){
				goToSearch('/mypage/MsgPage')
			}else{
				goToSearch('/Login?'+location.pathname)
			}
		}
	}
	return <ClassifyPage />
}

export default connect(({ ClassifyPageData }) => ({
  ClassifyPageData
}))(ClassifyPage);
