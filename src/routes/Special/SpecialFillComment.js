import React from 'react';
import { connect } from 'dva';
import $ from 'jquery';
import styles from '../../style/Special/special.css'
import Header from '../../components/PublicComponents/HeaderReturn'
import ChaPop from '../../components/PublicComponents/ChaPop'

const SpecialFillComment=({dispatch,SpecialPageData,location,history})=>{
	console.log(SpecialPageData.userData)
	let _this,Popfun;
	function putFillCommet(datas,locas,thiss){//发表评论
		dispatch({
			type:"SpecialPageData/putFillCommet",
			data:datas,
			loca:locas,
			d_this:thiss
		})
	}
	function HintWords(popDom){
		Popfun=popDom.Popfun
	}
	let noName_State;
	class SpecialFillComment extends React.Component{
		constructor(props){
			super(props);
			this.state={
				no_name:1
			}
			this.fillFalush=this.fillFalush.bind(this)
		}
		fillFalush(types,ids){		
			if(types){
				Popfun('发表成功')
				setTimeout(function(){
					history.push({pathname:'/SpecialPage/SpecialDetail/'+ids})
				},1500)
			}else{
				Popfun("发表失败")
			}
			
		}
		render(){
			return(
					<div className={styles.specialFill_box} id="specialFill_box">
						<Header head_title="填写评论" left_show='1'/>
						<div className={styles.specialFill_head}>
							<p>{SpecialPageData.userData?SpecialPageData.userData.name:''}</p>
							<div>
								<p>匿名评论</p>
								<span onClick={noName_State} className={this.state.no_name?styles.specialFill_noName2:styles.specialFill_noName1}>
									<span className={this.state.no_name?styles.specialFill_yuan2:styles.specialFill_yuan1}></span>
								</span>	
							</div>
						</div>
						<div className={styles.specialFill_textareabBox}>
							<textarea placeholder="请输入评论内容" maxLength="100" className={styles.specialFill_textbox} id="Fill_text"></textarea>	
							<span className={styles.specialFill_textnum} id="textnum">0/100</span>
						</div>
						<div className={styles.specialFill_Button} id="fillComment">
							发表评论
						</div>
						<ChaPop HintWords={HintWords}/>					
					</div>
				)	
		}
		componentWillMount(){
			_this=this
			noName_State=()=>{
				if(this.state.no_name){
					this.setState({no_name: 0})
				}else{
					this.setState({no_name: 1})					
				}				
			}						
		}
		componentDidMount(){
			$('#specialFill_box').css('height',function(){
				return $(window).height()-$('#specialFill_box header').height()+"px"
			})

			$('#Fill_text').bind('input propertychange',function(){
				var lengths=$(this).val().length
				if(lengths<=100){				
					$('#textnum').text(function(){
						return lengths+"/100"
					})
				} 				
			})
			$('#fillComment').click(function(){
				let p_data={}
				if($('#Fill_text').val()!==""&&$('#Fill_text').val()!==undefined){
					p_data.content=$('#Fill_text').val()
					p_data.audit=_this.state.no_name
					p_data.id=location.search.substring(1)
					putFillCommet(p_data,location,_this)
				}else{
					Popfun("请填写评论!")
				}
				
			})
		}
	}
	return 	<SpecialFillComment/>
}
export default connect(({ SpecialPageData}) => ({
  SpecialPageData
}))(SpecialFillComment);