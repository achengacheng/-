import React from 'react';
import $ from 'jquery';
import styles from '../../style/AJ/AJDetails.css';
import constant from '../../constant';//处理评价时间函数

const EvaOfAll = ({ evaData,hintFun,replyComment,commentId,getEvaDetailsData,chooseToGo,name }) => {
	let replyName = false,replyId = false,timer;
	//replyComment：发布评论回复的方法
	//getEvaDetailsData：再次获取评价详情的方法
	class EvaOfAll extends React.Component{
		constructor(props) {
	        super(props);
	        this.state = {
	            value:''
	        }
	    }
		render(){
			return (
				<div className={ styles.evaOfAllMain }>
					<p className={ styles.evaOfAllHeader }>
						全部评论
						<span></span>
					</p>
					{evaData.map(function(item,index){
						return <div className={ styles.evaChat } key={index}>
										<div className={ styles.evaChatUserPic }>
											<img src={ item.userPic? item.userPic:"./src/assets/myPageDefaultHead1.png"} alt="user"/>
										</div>
										<div className={ styles.evaChatContent }>
											<div className={ styles.evaChatTitle }>
												<p onClick = {()=>this.replyEva(item.userName,item.replyId,item.userId)}>{ item.userName }</p>
												<span>{ constant.showTime(item.date) }</span>
											</div>
											<p><span>回复<span>{ item.parentName===""?"匿名用户":item.parentName }</span>：</span>{ item.replyContent }</p>
										</div>
									</div>
					},this)}
					<div className={ styles.evaChatInput } id="name">
						<i className={ styles.evaInputPic }></i>
						<input type="text" placeholder='输入评论内容' ref="inputEva" className={ styles.AJInputEva } onChange={()=>this.inputChange()} onFocus={()=>this.inputFocus()} onBlur={()=>this.inputBlur()} onKeyUp={(e)=>this.onKeyup(e)}/>
						<span onClick={()=>this.submitEva()}>发布</span>
					</div>
				</div>
			)
		}
		/*点击名字回复*/
	  replyEva(name,id,userId){
			if(userId===sessionStorage.getItem("id")){
				hintFun('不能回复自己')
			}else{
		  	replyName = name;
				replyId = id;
				this.refs.inputEva.focus()
			}
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
	  /*发布按钮*/
	  submitEva(){
	  	if(this.state.value===""){
				hintFun("请填写评价内容")
			}else if(!sessionStorage.getItem("id")){
				// hintFun("请登录后填写")
				chooseToGo('/Login?' + name)
			}else{
				//let saveHeight = $('.'+styles.evaChat).height() + $(window).scrollTop();
				sessionStorage.setItem("autoHeight","toThis");
				let replyData = {
					commentId:commentId,
					userId:sessionStorage.getItem("id"),
					replyContent:this.state.value,
					parentId:replyId
				}
				replyComment(replyData,this.commentIsReply)
			}
	  }
		/*虚拟键盘确定*/
		onKeyup (e) {
		    if(e.keyCode === 13){
				this.submitEva()
		    }
		}
		clear(){
			this.setState({
					value: ""
			});
			this.refs.inputEva.value = "";
			this.refs.inputEva.placeholder = '输入评论内容';
		}
		/*评论发布是否成功的回调*/
	  commentIsReply(msg){
			if(msg){
				hintFun("评论发表成功","success");
				let detailsData = {
					commentId:commentId,
					userId:sessionStorage.getItem("id")
				};
				timer = setTimeout(()=>{
          getEvaDetailsData(detailsData)
        },2000);
			}else{
				hintFun("评论未成功","fall")
			}
	  }
		componentDidMount(){
			if(sessionStorage.getItem("autoHeight")){
				$(window).scrollTop($('#allHeight').height())
			}
		}
		componentWillUnmount(){
			clearTimeout(timer)
		}
	}
	return <EvaOfAll />
}

export default EvaOfAll
