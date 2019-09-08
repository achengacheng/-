import React from 'react';
import styles from '../../style/Special/special.css'
import $ from 'jquery'
import ChaPop from  '../../components/PublicComponents/ChaPop'

const SpecialDetailComment=({datas,specialId,history})=>{
	let standardTab
	function HintWords(popDom){//提示语
		standardTab = popDom.Popfun
	}
	class SpecialDetailComment extends React.Component{
		render(){
			// console.log('精选评论',JSON.stringify(datas[0])==='[]')
			return(
				// <div className={`${styles.SpecialDetailC_box} ${JSON.stringify(datas[0])==='[]'?styles.hidden:''}`}>
				<div className={ styles.SpecialDetailC_box }>
					<div className={styles.SpecialDetailC_head}>
						<span></span>
						<p>精选评论</p>
						<div id="fillComment">
							<i className={styles.SpecialDetailC_fill}></i>写评论
						</div>
					</div>
					{datas?datas.length?datas[0].map(function(elem,index){
						return(<div className={styles.SpecialDetailC_list} key={index} comid={elem._id}>
									<img src={elem.pictureUrl?elem.pictureUrl:"./src/assets/special_nav-icon1.png"} alt="" />
									<div>
										<div className={styles.SpecialDetailC_h}>
											<p>{elem.userName}</p>
											<i className="jubao"></i>
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
													<span>{elem.replySize?elem.replySize:'0'}</span>
												</div>
											</div>
										</div>
									</div>
								</div>)
					}):'':''}
					<div className={styles.SpecialDetailC_All} id="allcomment">
						全部评论
					</div>
					<ChaPop HintWords={ HintWords }/>
				</div>
				)
		}
		componentDidMount(){
			//<div className="detailzan">
				//<i className={styles.SpecialList_zan2}></i>
				//<span>{elem.replySize?elem.replySize:'0'}</span>
			//</div>
			// $('.detailzan').click(function(){//点赞评论
			// 	var zans=$(this).children('i')
			// 	var zan_num=$(this).children('span')
			// 	if(zans.attr('class')===styles.SpecialList_zan1){
			// 		zans.removeClass(styles.SpecialList_zan1).addClass(styles.SpecialList_zan2)
			// 		zan_num.text(parseInt(zan_num.text())-1)
			// 	}else{
			// 		zans.removeClass(styles.SpecialList_zan2).addClass(styles.SpecialList_zan1)
			// 		zan_num.text(parseInt(zan_num.text())+1)
			// 	}
			// })

			$('.'+styles.SpecialDetailC_list+' img,.'+styles.SpecialDetailC_text+',.'+styles.SpecialDetailC_bottom).click(function(){
				let conID = $(this).parents('.'+styles.SpecialDetailC_list).attr('comid')
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
			$('#allcomment').click(function(){
				history.push({pathname:"/SpecialPage/SpecialAllComment",search:specialId})
			})
			$('#fillComment').click(function(){
				history.push({pathname:"/SpecialPage/SpecialFillComment",search:specialId})

			})
		}
	}
	return <SpecialDetailComment/>
}

export default SpecialDetailComment
