import React from 'react';
import { connect } from 'dva';
import $ from 'jquery'
import styles from '../../style/Special/special.css'
import Header from '../../components/PublicComponents/HeaderReturn';
import DefaultPage from '../../components/PublicComponents/DefaultPage';
import ChaPop from  '../../components/PublicComponents/ChaPop'

const SpecialAllComment=({dispatch,SpecialPageData,history,location})=>{
	let standardTab
	function HintWords(popDom){//提示语
		standardTab = popDom.Popfun
	}
	function goToSomeWhere(data){//跳转至data路由
		dispatch({
			type:"SpecialPageData/goToSomeWhere",
			data:data+location.search
		})
	}
	class SpecialAllComment extends React.Component{
		render(){
			if(SpecialPageData.CommentALLData){
				if(SpecialPageData.CommentALLData[0].length){
					return(<div>
						<Header head_title="全部评论" left_show='1' header_ids='18' right_fun={ goToSomeWhere }/>
						<div className={styles.SpecialAllC_box}>
							{SpecialPageData.CommentALLData[0].map(function(elem,index){
								return (<div className={styles.SpecialDetailC_list}  key={index} commentid={elem.id}>
											<img src={elem.pictureUrl} alt="" />
											<div>
												<div className={styles.SpecialDetailC_h}>
													<p>{elem.audit?"匿名用户":elem.userName}</p>
													<i className='jubao' zy='0'></i>
													<div className={styles.commentQb}>
														<i className={ styles.evaInformMark }></i>
														<p>举报</p>
													</div>
												</div>
												<p className={styles.SpecialDetailC_text}>
													{elem.content}
												</p>
												<div className={styles.SpecialDetailC_bottom}>
													<p>{elem.date}</p>
													<div>
														<div>
															<i className={styles.SpecialList_dialogue}></i>
															<span>{elem.readNO}</span>
														</div>
													</div>
												</div>
											</div>

										</div>)
							})}
						</div>
						<ChaPop HintWords={ HintWords }/>
					</div>)
				}else{
					return(	<div>
								<Header head_title="全部评论" left_show='1' header_ids='18' right_fun={ goToSomeWhere }/>
								<DefaultPage showDefault={true} default_ids='3'/>
							</div>)
				}
			}else{
				return(	<div>
							<Header head_title="全部评论" left_show='1' header_ids='18' right_fun={ goToSomeWhere }/>
							<DefaultPage showDefault={true} default_ids='3'/>
						</div>)
			}
		}
		componentWillMount(){
			// <div className="zan">
			// 												<i className={styles.SpecialList_zan2}></i>
			// 												<span>{elem.replySize}</span>
			// 											</div>
		}
		componentDidMount(){
			$('#headerReturn').css('background','#f9f9f9')
			$('.zan').click(function(){
				var zans=$(this).children('i')
				var zan_num=$(this).children('span')
				if(zans.attr('class')===styles.SpecialList_zan1){
					zans.removeClass(styles.SpecialList_zan1).addClass(styles.SpecialList_zan2)
					zan_num.text(parseInt(zan_num.text())-1)
				}else{
					zans.removeClass(styles.SpecialList_zan2).addClass(styles.SpecialList_zan1)
					zan_num.text(parseInt(zan_num.text())+1)
				}
			})

			$('.'+styles.SpecialDetailC_list+' img,.'+styles.SpecialDetailC_text+',.'+styles.SpecialDetailC_bottom).click(function(){
				let conID = $(this).parents('.'+styles.SpecialDetailC_list).attr('commentid')
				history.push({pathname:"/SpecialPage/SpecialCommentDetail",search:conID})
			})
			$('.jubao').click(function(){
				if ($(this).siblings('div').css('display')==='none') {
					$('.'+styles.commentQb).css('display','none')
					$(this).siblings('div').css('display','flex')
				}else{
					$(this).siblings('div').css('display','none')
				}

			})
			$('.jubao').siblings('div').click(function(){
				standardTab('举报成功')
				$('.'+styles.commentQb).css('display','none')
			})
		}

	}
	return <SpecialAllComment/>
}
export default connect(({ SpecialPageData}) => ({
  SpecialPageData
}))(SpecialAllComment)
