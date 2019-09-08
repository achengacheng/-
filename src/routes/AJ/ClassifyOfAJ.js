import React from 'react';
import { connect } from 'dva';
import $ from 'jquery';
import styles from '../../style/AJ/AJ.css';
import Header from '../../components/PublicComponents/HeaderReturn';
import Footer from '../../components/PublicComponents/footerNav';
import DefaultPage from '../../components/PublicComponents/DefaultPage';//缺省页面
import Loading from '../../components/PublicComponents/LoadingCom';//缺省页面

const ClassifyAJ = ({ dispatch,AJPageData,location }) => {
	console.log(AJPageData.res_type_datas)
	let page = 1;
	let classifyId = location.pathname.slice(location.pathname.lastIndexOf('/')+1);
	let title =AJPageData.res_type_datas?AJPageData.res_type_datas.type.name:'艾家分类' //分类艾家名
	if(AJPageData.res_type_datas){
		document.title=AJPageData.res_type_datas.type.name
	}
	let _this,PtData,typePt,d_page=page;
	function laodfun(dom){
		PtData=dom.ptData
	}
	function reqFun(NewPages){
		addClassifyDatas(NewPages,_this)
	}
	function chooseToGo(type){
		dispatch({
			type:'AJPageData/chooseToGo',
			payload:type
		})
	}
	/*跳转至搜索页面*/
	function goSearch(){
		dispatch({
			type:'AJPageData/goSearch'
		})
	}
	/*上拉加载更多的方法*/
	function addClassifyDatas(page,d_this){//page传递新页数 这里没用,d_this请求成功后回调到loading
		let num = 10;//每页条数
		let data = {
			merTypeId:classifyId,
			fsxz:false,
			_this:d_this,
			page:page,
			max:num
		}
		dispatch({
			type:'AJPageData/getTypeData',
			payload:data
		})
	}
	class ClassifyAJ extends React.Component{
		constructor(props) {
        super(props);
        this.state={
        	listData:AJPageData.res_type_datas.allMer
        }
        this.getPage=this.getPage.bind(this)
    }
    getPage(types,data,page){//有无更多数据
    	let newData=this.state.listData.concat(data)
			console.log('2',newData)
    	d_page=page
    	typePt=types
    	this.setState({
				listData:newData
    	})
    }
		render (){
			console.log('1',this.state.listData);
			let showDefault = true;
			let default_id = 3;
			if(AJPageData.res_type_datas){
				if(AJPageData.res_type_datas.allMer.length!==0){
					return (
						<div className={styles.classifyAJContainer}>
							<Header	left_show='1' head_title={title} header_ids='3' right_fun={goSearch}/>
							{this.state.listData.map(function(item,index){
								return 	<div className={styles.classifyAJ} key={index} onClick={() => chooseToGo("AJDetails/"+item.id)}>
													<div>
														<img src={item.pictureUrl} alt={item.name} />
													</div>
													<p>{item.name}</p>
												</div>
								})
							}
							<Loading getLoadFun={laodfun} reqFun={reqFun} page={page}/>
							<Footer NewLocation='3'/>
						</div>
					)
				}else{
					return (
						<div className={styles.classifyAJContainer}>
							<Header	left_show='1' head_title={title} />
							<DefaultPage showDefault={showDefault} default_ids={default_id} />
							<Footer NewLocation='3'/>
						</div>
					)
				}
			}else{
				return (
					<div className={styles.classifyAJContainer}>
						<Header	left_show='1' head_title={title} />
						<Footer NewLocation='3'/>
					</div>
				)
			}
		}
		componentDidMount() {
			$(window).scrollTop(0)
		}
		componentWillMount(){
			_this=this
		}
		componentDidUpdate(){
			PtData(typePt)
		}
	}
	return <ClassifyAJ />
}

export default connect(({ AJPageData }) => ({
  AJPageData
}))(ClassifyAJ);
