import React from 'react';
import { connect } from 'dva';
import $ from 'jquery';
import styles from '../../style/Special/special.css'
import  Header from '../../components/PublicComponents/HeaderReturn'
import SpecialNav from '../../components/Special/SpecialNav'
import SpecialList from '../../components/Special/SpecialList'
import FooterNav from '../../components/PublicComponents/footerNav'
const SpecialPage=({dispatch,SpecialPageData,history})=>{
	let _this
	function getDetailByTypeId(datas){//以分类查专题,
		dispatch({
			type:"SpecialPageData/getDetailByTypeId",
			data:datas,
			d_this:_this
		})
	}
	function goSpecialDetail(datas,val){//专题详情
		dispatch({
			type:"SpecialPageData/goSpecialDetail",
			data:datas,
			types:val
		})
	}
	function left_fun(){
		let useID=sessionStorage.getItem('id')
		if(useID===""||useID===undefined||useID===null){
			history.push({pathname:'/Login',search:'/mypage/MsgPage'})
		}else{
			history.push({pathname:'/mypage/MsgPage'})
		}
	}
	function goToSomeWhere(data){//跳转至data路由
		sessionStorage.setItem('searchSt',1)
		dispatch({
			type:"SpecialPageData/goToSomeWhere",
			data:data,
		})
	}
	function getSpecialFun(d_this){
		_this=d_this
	}
	class SpecialPage extends React.Component{
		render(){
			return(
					<div className={styles.specialBox}>
						<Header head_title='专题' header_ids='15' left_show='2' right_fun={ goToSomeWhere }/>
						<SpecialNav typeAllList={SpecialPageData.typeAllList} Nindex={SpecialPageData.Nindex} getDetailByTypeId={getDetailByTypeId}/>
						<SpecialList allDetailList={SpecialPageData.allDetailList} goSpecialDetail={goSpecialDetail} getSpecialFun={getSpecialFun}/>
						<FooterNav NewLocation='2'/>
					</div>
				)
		}
		componentWillMount(){
		}
		componentDidMount(){
			$('#iop').css('background','#ffffff')
			$('#specialNav').show()
		}
	}

	return <SpecialPage/>
}

export default connect(({ SpecialPageData}) => ({
  SpecialPageData
}))(SpecialPage);
