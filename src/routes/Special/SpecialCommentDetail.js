import React from 'react';
import { connect } from 'dva';
import $ from 'jquery';
import Header from '../../components/PublicComponents/HeaderReturn'
import styles from '../../style/Special/special.css'
import styles2 from '../../style/AJ/AJDetails.css';
import ChaPop from '../../components/PublicComponents/ChaPop'


const SpecialCommentDetail=({dispatch,SpecialPageData,location})=>{
	let replyName=false,_this;
	let hfcost=SpecialPageData.ComDetail?SpecialPageData.ComDetail.data.reply.length?SpecialPageData.ComDetail.data.reply:false:false
	function hFcomment(comId,userId,val,hfID) {
		dispatch({
			type:"SpecialPageData/hFcomment",
			comId:comId,
			userId:userId,
			val:val,
			hfID:hfID,
			loca:location
		})
	}
	let Popfun  //弹窗调用通道
	function HintWords(popDom){
		Popfun=popDom.Popfun
	}
	class SpecialCommentDetail extends React.Component{
		render(){
			return(<div>
					<Header left_show='1' head_title="评论详情"/>
					<div className={styles.SpecialCD_box}>
						<div className={styles.SpecialCD_list}>
							<img src={SpecialPageData.ComDetail?SpecialPageData.ComDetail.data.userPic?SpecialPageData.ComDetail.data.userPic:"./src/assets/special_nav-icon1.png":""} alt="" />
							<div>
								<div className={styles.SpecialDetailC_h}>
									<p>{SpecialPageData.ComDetail?SpecialPageData.ComDetail.data.userName:""}</p>									
								</div>
								<p className={styles.SpecialDetailC_text}>
									{SpecialPageData.ComDetail?SpecialPageData.ComDetail.data.content:""}
								</p>
								<div className={styles.SpecialDetailC_bottom}>
									<p>{SpecialPageData.ComDetail?SpecialPageData.ComDetail.data.date:""}</p>
									<div>							
										<div>	
											<i className={styles.SpecialList_dialogue}></i>
											<span>{SpecialPageData.ComDetail?SpecialPageData.ComDetail.data.replyNO:""}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>	
					<div className={styles.hufucome}>
					{hfcost?hfcost.map(function(elem,index){
						return(<div className={`${styles2.evaChat} ${'hfList'}`  } usernames={elem.userName} hfuserid={elem.userId} hufu_id={elem.replyId} key={index}>
									<div className={ styles2.evaChatUserPic }>
										<img src={elem.userPic?elem.userPic:"src/assets/AJ_evaChatUserPic1.png"} alt='userPic'/>
									</div>
									<div className={ styles2.evaChatContent }>
										<div className={ styles2.evaChatTitle }>
											<p>{elem.userName}</p>
											<span>{elem.date}</span>
										</div>
										<p>
											{elem.parentName?<span>回复{elem.parentName?elem.parentName:''}:</span>:''}{elem.replyContent}
										</p>
									</div>
								</div>)
					}):''}																		
					</div>
					<div className={ styles2.evaChatInput } id="name">
						<i className={ styles2.evaInputPic }></i>
						<input type="text" placeholder='输入评论内容' ref="inputEva" className={styles2.AJInputEva} onChange={()=>this.inputChange()} onFocus={()=>this.inputFocus()} onBlur={()=>this.inputBlur()} onKeyUp={(e)=>this.onKeyup(e)}/>
						<span >发布</span>
					</div>
					<ChaPop HintWords={HintWords}/>
				</div>)
		}
		componentWillMount(){
		  _this=this					
		}
		componentDidMount(){
			let hufu_ids
			$('#name span').click(function(){
				let commentId=location.search.substring(1);
				let usersId=sessionStorage.getItem('id')
				let vals=$(this).siblings('input').val()
				if(hufu_ids){
					hFcomment(commentId,usersId,vals,hufu_ids)
				}else{
					hFcomment(commentId,usersId,vals)
				}							
			})
			$('.hfList').click(function(){
				let userId=$(this).attr('hfuserid')
				if(userId===sessionStorage.getItem("id")){
					Popfun('不能回复自己')
				}else{
					replyName=$(this).attr('usernames')
					hufu_ids=$(this).attr('hufu_id')
					_this.refs.inputEva.focus()
				}
			})
		}
		 /*获取焦点*/
		inputFocus(){
			if(!replyName){
				this.refs.inputEva.placeholder = '';
			}else{
				this.refs.inputEva.placeholder = '回复'+replyName;
			}
		}
		 	/*失去焦点*/
		inputBlur(){
		  	if(!this.refs.inputEva.value){
				if(!replyName){
					this.refs.inputEva.placeholder = '输入评论内容'
				}else{
					this.refs.inputEva.placeholder = '回复'+replyName;
				}
			}
		}
		/*input输入*/
		inputChange(){
		    let value = this.refs.inputEva.value;
		    this.setState({
		          value: value
		    });
		} 
		/*虚拟键盘确定*/
		onKeyup (e) {
		    if(e.keyCode === 13){
				this.submitEva()
		    }
		}
	}
	return <SpecialCommentDetail/>
	// <div className="zan">
	// 										<i className={styles.SpecialList_zan2}></i>
	// 										<span>1000</span>
	// 									</div>
}
export default connect(({ SpecialPageData}) => ({
  SpecialPageData
}))(SpecialCommentDetail)