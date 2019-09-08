import React from 'react';
import { connect } from 'dva';
import styles from '../../../style/mine/CenterPerson/CenterPerson.css';
import HeaderReturn from '../../../components/PublicComponents/HeaderReturn'
import ChaPop from '../../../components/PublicComponents/ChaPop'
import $ from 'jquery'

const ChangePhone_Next=({dispatch,centerPersonData,location,history})=>{
	console.log(1,centerPersonData)
	let Popfun,reqTpye=false,lo_time=60,_this;
	let reqValid=true
	function HintWords(popDom){
		Popfun=popDom.Popfun
	}
	function getValidCode(datas) {//获取验证码
		dispatch({
			type:"centerPersonData/getValidCode",
			data:datas
		})
	}
	function changeTelephone(datas){
		dispatch({
			type:'centerPersonData/changeTelephone',
			data:datas
		})
	}
	class ChangePhone_Next extends React.Component{
		constructor(props) {
	        super(props);
	        this.shuru=this.shuru.bind(this)
	        this.ValidCoderRes=this.ValidCoderRes.bind(this)
	        this.thisPopfun=this.thisPopfun.bind(this)
	    }
		shuru(){
			let yzm_length=$('#changenext_yzm').val().length;
			let phone_length=$('#changenext_phone').val().length;
			if(yzm_length>3&&phone_length>10){
				reqTpye=true
				$('#changePhone_true div').css('background','#ff5e57')
			}else{
				reqTpye=false
				$('#changePhone_true div').css('background','#fc817c')
			}
		}
		ValidCoderRes(data){
	    	if(data.data.success){
	    		let setTime, thisdom=$('#getValid');
	    		Popfun('发送成功','success')
	    		reqValid=false
		    	setTime=setInterval(function(){
					if(lo_time<=0){
						thisdom.text('重发验证码')
						thisdom.css('color','#0090ff')
						clearInterval(setTime)
						reqValid=true
						lo_time=60;
					}else{
						lo_time--;
						thisdom.text(lo_time+'s后重发')
						thisdom.css('color','#999999')
					}
				},1000)
	    	}else{
	    		Popfun('发送失败',"fall")
	    	}
	    }
	    thisPopfun(data,oicl,io){
	    	Popfun(data,oicl)
	    	if(io){
				setTimeout(function(){
					history.push({pathname:"/mypage/CenterPerson"})
				},1500)
	    	}
	    }
		render(){
			return(
				<div className={styles.changePhone_box} id="changePhone">
					<HeaderReturn head_title="修改手机"  left_show='1'/>
					<div className={styles.changePhone_next_Map}>
						<div>验证原号码</div>
						<div>绑定新手机</div>
					</div>
					<ul className={styles.changePhone_next_Form}>
						<li>
							<input type="text" placeholder="请输入新手机号码" maxLength="11" id="changenext_phone" onChange={this.shuru}/>
							<button type="button" id="getValid">发送验证码</button>
						</li>
						<li><input type="text" placeholder="请输入验证码" maxLength="6" id="changenext_yzm" onChange={this.shuru}/></li>
					</ul>
					<div className={styles.changePhone_Next} id="changePhone_true">
						<div id="changePhoneBtn">确认</div>
					</div>
					<div className={styles.changePhone_Text}>
						<h3>温馨提示</h3>
						<p>手机号码修改成功后需要使用新的手机号码进行登录。</p>
					</div>
					<ChaPop HintWords={HintWords}/>
				</div>
				)
		}

		componentWillMount(){
			_this=this
		}
		componentDidMount(){
			//初始化样式
			$('#root').css('padding','0px');
			$('#changePhone').css({
				'background':'#ffffff',
				'height':function(){
					return ($(window).height()-$('#headerReturn').height())+"px"
				}
			})
			//
			$('#getValid').click(function() {
				if($('#changenext_phone').val()===''||$('#changenext_phone').val()===undefined){
					Popfun("请输入新的手机号码")
				}else if($('#changenext_phone').val().length<11){
					Popfun("请输入正确的手机格式")
				}else{
					let reqData={}
					reqData.telephone=$('#changenext_phone').val();
					reqData.this=_this
					if(reqValid){
						getValidCode(reqData)
					}else{
						Popfun("您的操作太频繁,请稍后再试")
					}

				}
			});
			$('#changePhoneBtn').click(function(){
				let yzm=$('#changenext_yzm').val();
				let phone=$('#changenext_phone').val();
				if(phone===""||phone===undefined){
					Popfun("请输入新的手机号码")
				}else if(yzm===""||yzm===undefined){
					Popfun("请输入短信验证码")
				}else{
					let changeData={}
					changeData.telephone=$('#changenext_phone').val()
					changeData.validCode=$('#changenext_yzm').val()
					changeData.oldTel=sessionStorage.getItem('oldTele')
					changeData.id=sessionStorage.getItem('id')
					changeData.this=_this
					changeTelephone(changeData)
				}
			})

		}
	}
	return <ChangePhone_Next/>
}

export default connect(({ centerPersonData }) => ({
    centerPersonData,
  }))(ChangePhone_Next)
