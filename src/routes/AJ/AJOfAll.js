import React from 'react';
import { connect } from 'dva';
import $ from 'jquery';
import styles from '../../style/AJ/AJ.css';
import Header from '../../components/PublicComponents/HeaderReturn';
import Footer from '../../components/PublicComponents/footerNav';

var isScoll,allAJDatas,firstIndex;
const AllAJ = ({ dispatch,AJPageData }) => {
	function chooseToGo(type){
		dispatch({
			type:'AJPageData/chooseToGo',
			payload:type
		})
	}
	function choiceToGo(){
		sessionStorage.setItem('searchSt',2)
		dispatch({
			type:'AJPageData/goSearch'
		})
	}
	/*锚点滑动到位*/
	function scrollToAnchor(anchorName){
		let anchorElement = document.getElementById(anchorName);
		let height = $(anchorElement).parent().children().eq(0).height();/*固定头部高度*/
		$("html,body").animate({
	      scrollTop: (($(anchorElement).offset().top)-height) + "px"
	    },1000, "swing",function(){
	    	let distance = ($(anchorElement).offset().top)-($("html").scrollTop());
	    	if(distance===height){
					if(anchorName==='0'){
						$(anchorElement).parent().children().eq(1).text('#')
					}else{
						$(anchorElement).parent().children().eq(1).text(anchorName)
					}
	    	}
	    });
	}
	
	if(AJPageData.res_all_datas){
		allAJDatas = AJPageData.res_all_datas;
		firstIndex = allAJDatas[0].firstKey;
	}else{
		allAJDatas = false;
	}
	class AllAJ extends React.Component{
		render (){
			if(allAJDatas){
				return (
					<div className={styles.allAJContainer}>
						<Header	left_show='1' head_title='全部艾家' header_ids='3' right_fun={()=>choiceToGo()}/>
						<p>{firstIndex}</p>
						{allAJDatas.map(function(k,i){
								return  <div className={styles.allAJMain} key={i}  id={k.firstKey==='#'?'0':k.firstKey} ref={k.firstKey}>
											<p><a>{k.firstKey}</a></p>
											{k.merchantData.map(function(item,index){
												return 	<div className={styles.classifyAJ} key={index} onClick={() => chooseToGo('AJDetails/'+item.id)}>
															<div>
																<img src={item.logoPicture[0]} alt={item.name} />
															</div>
															<p>{item.name}</p>
														</div>
												})
											}
										</div>
							})
						}
						<div className={styles.allAJTarget}>
							{allAJDatas.map(function(item,index){
									if(item.firstKey==='#'){
										return 	<a onClick={()=>scrollToAnchor('0')} key={index}>{item.firstKey}</a>
									}else{
										return 	<a onClick={()=>scrollToAnchor(item.firstKey)} key={index}>{item.firstKey}</a>
									}
								})
							}
						</div>
						<Footer NewLocation='3'/>
					</div>
				)
			}else{
				return <div></div>
			}
		}
		/*滚动/固定二级导航*/
		isScoll(){
			let top=$(window).scrollTop();
			var arr = [];
			let height;
			allAJDatas.map(function(k,i){
				if(k.firstKey==='#'){
					height = $('#0').parent().children().eq(0).height();
					return  arr.push({
										firstKey:'0',
										top:($('#0').offset().top)-height,
									})
				}else{
					height = $('#'+k.firstKey).parent().children().eq(0).height();
					return  arr.push({
										firstKey:k.firstKey,
										top:($('#'+k.firstKey).offset().top)-height,
									})
				}
			})
			arr.map(function(k,i){
				if(top>=k.top){
					if(k.firstKey==='0'){
						return  $('#0').parent().children().eq(1).text('#')
					}else{
						return  $('#'+k.firstKey).parent().children().eq(1).text(k.firstKey)
					}
				}
				return false
			})
		}
		/*监听滚动方法*/
		scroll_fun(){
			window.addEventListener('scroll',isScoll,false)
		}
		componentDidMount(){
			isScoll = this.isScoll;
			this.scroll_fun();
			$(window).scrollTop(0)
		}
		componentWillUnmount(){
			// sessionStorage.setItem('searchSt',1)
			window.removeEventListener('scroll',isScoll,false);
		}
	}
	return <AllAJ />
}

export default connect(({ AJPageData }) => ({
  AJPageData
}))(AllAJ);
