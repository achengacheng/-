import React from 'react';
import $ from 'jquery';
import styles from '../../style/AJ/AJDetails.css';
import BigPicture from '../PublicComponents/BigPicture';//展示大图组件
import constant from '../../constant';//处理评价时间函数

const EvaDetailsIntro = ({ introMsg,commentId,hintFun }) => {
	let bigPictures;
	// 大图组件函数
	function getImgdom(dom){
		bigPictures=dom.bigImg
	}
	class EvaDetailsIntro extends React.Component{
		render(){
			const msgData = introMsg
			return (
				<div className={ styles.evaDetailsMain }>
					<div className={ styles.singeEvaTitle }>
						<div className={ styles.singeEvaUserPic }>
							<img src={ msgData.userPic?msgData.userPic:"./src/assets/myPageDefaultHead1.png" } alt="user"/>
						</div>
						<div className={ styles.singeEvaUserMsg }>
							<h5>{ msgData.userName }</h5>
							<p className={ msgData.showMsg?styles.singeEvaUserMsg:styles.hiddenArr }>{ msgData.showMsg }</p>
						</div>
						<i className={ styles.evaEllipsis } onClick={() => this.informMark()}></i>
						<div className={ styles.evaInform } id="commentInform" onClick={() => this.informEva()}>
							<i className={ styles.evaInformMark }></i>
							<p>举报</p>
						</div>
					</div>
					<p className={styles.singeEvaContent}>{ msgData.content }</p>
					<div className={ `${msgData.proPic.length===0?styles.hiddenArr:''} ${styles.singeEvaPic} ${styles.evaPicMain}` } id="detailPicBox">
						{msgData.proPic.map(function(k,i){
									return  <div className={ styles.goodsPic } key={i}>
														<img src={k} alt='goodsPic' onClick={() => this.letsBigPic()}/>
													</div>
							},this)
						}
					</div>
					<div className={ styles.evaBottomMsg } >
						<p>{ constant.showTime(msgData.date) }</p>
						<div>
							<p><i className={ styles.AJIntroduce_love }></i>收藏 { msgData.collectionNO }</p>
							<p><i className={ styles.AJIntroduce_read }></i>阅读 { msgData.readNO>10000?'1万+':msgData.readNO }</p>
						</div>
					</div>
					<BigPicture getImgdom={getImgdom}/>
				</div>
			)
		}
		/*点击出现举报按钮*/
		informMark(){
			if($('#commentInform').css('display')==='none'){
				$('#commentInform').css({
					'display':'flex'
				})
			}else{
				$('#commentInform').css({
					'display':'none'
				})
			}
		}
		/*举报按钮点击*/
		informEva(){
			$('#commentInform').css({
				'display':'none'
			})
			hintFun('举报成功','success')
		}
		/*点击后传出图片，再传至大图组件处*/
		letsBigPic(){
			let picBox = []
			introMsg.proPic.map(function(item,index){
				picBox.push(item)
				return false
			})
			bigPictures(true,picBox)
		}
		componentWillMount(){
			/*地址取用*/
			if(introMsg){
				if(introMsg.userAddress==='null'||introMsg.userAddress===""||!introMsg.userAddress){
					if(introMsg.userJob==='null'||introMsg.userJob===""||!introMsg.userJob){
						introMsg.showMsg = false
					}else{
						introMsg.showMsg = introMsg.userJob
					}
				}else if(!introMsg.userAddress.province&&!introMsg.userAddress.city){
					if(introMsg.userJob==='null'||introMsg.userJob===""||!introMsg.userJob){
						introMsg.showMsg = false
					}else{
						introMsg.showMsg = introMsg.userJob
					}
				}else{
					if(introMsg.userJob==='null'||introMsg.userJob===""||!introMsg.userJob){
						if(introMsg.userAddress.province&&introMsg.userAddress.city){
							introMsg.showMsg = introMsg.userAddress.province+introMsg.userAddress.city
						}else if(introMsg.userAddress.province&&!introMsg.userAddress.city){
							introMsg.showMsg = introMsg.userAddress.province
						}else if(!introMsg.userAddress.province&&introMsg.userAddress.city){
							introMsg.showMsg = introMsg.userAddress.city
						}
					}else{
						if(introMsg.userAddress.province&&introMsg.userAddress.city){
							introMsg.showMsg = introMsg.userJob + '/' + introMsg.userAddress.province+introMsg.userAddress.city
						}else if(introMsg.userAddress.province&&!introMsg.userAddress.city){
							introMsg.showMsg = introMsg.userJob + '/' + introMsg.userAddress.province
						}else if(!introMsg.userAddress.province&&introMsg.userAddress.city){
							introMsg.showMsg = introMsg.userJob + '/' + introMsg.userAddress.city
						}
					}
				}
			}
		}
		componentDidMount(){
			$('#detailPicBox div').height(Number($('#detailPicBox').width())*0.32)//图片高度同宽度
		}
	}
	return <EvaDetailsIntro />
}

export default EvaDetailsIntro;
