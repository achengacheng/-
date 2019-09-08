import React from 'react';
import { connect } from 'dva';
import styles from '../../../style/mine/CenterPerson/CenterPerson.css';
import HeaderReturn from '../../../components/PublicComponents/HeaderReturn'
import ChaPop from '../../../components/PublicComponents/ChaPop'
import $ from 'jquery'

const ChangePhone=({dispatch,centerPersonData,location})=>{
	console.log(1,centerPersonData)
	let userTelephone,change_button,showPhone;
	let reqValid=true
	if(centerPersonData.userAllData){
		userTelephone=centerPersonData.userAllData.telephone
		showPhone=userTelephone.toString().replace(reg, "$1****$3");
	}
	var reg = new RegExp("(\\d{3})(\\d{4})(\\d{4})")
	let Popfun,_this,lo_time=60//弹窗调用通道
	function change_fun(kol){
		change_button()
	}
	function HintWords(popDom){//弹窗
		Popfun=popDom.Popfun
	}
	function getValidCode(datas) {//获取验证码
		dispatch({
			type:"centerPersonData/getValidCode",
			data:datas
		})
	}
	function provingValidCode(datas){
		dispatch({
			type:'centerPersonData/provingValidCode',
			data:datas
		})
	}
	class ChangePhone extends React.Component{
		constructor(props) {
	        super(props);
	        this.ValidCoderRes=this.ValidCoderRes.bind(this)
	        this.proving=this.proving.bind(this)
	    }
		ValidCoderRes(data){
	    	if(data.data.success){
	    		let setTime, thisdom=$('#ChangePhoneCode');
	    		Popfun('发送成功')
	    		reqValid=false
		    	setTime=setInterval(function(){
					if(lo_time<=0){
						thisdom.text('重发验证码')
						thisdom.css('color','#0090ff')
						clearInterval(setTime)
						lo_time=60;
						reqValid=true
					}else{
						lo_time--;
						thisdom.text(lo_time+'s后重发')
						thisdom.css('color','#999999')
					}
				},1000)
	    	}else{
	    		Popfun('发送失败')
	    	}
	    }
	    proving(data){
	    	Popfun(data)
	    }
		render(){
			return(
				<div className={styles.changePhone_box} id="changePhones">
					<form action="">
						<HeaderReturn head_title="修改手机" left_show='1'/>
						<div className={styles.changePhone_Map}>
							<div>验证原号码</div>
							<div>绑定新手机</div>
						</div>
						<ul className={styles.changePhone_Form}>
							<li><div>{showPhone}</div><button type="button" id="ChangePhoneCode">发送验证码</button></li>
							<li><input type="text" placeholder="请输入验证码" maxLength='6' onChange={change_fun} id='changePhone_yzm'/></li>
						</ul>
						<div className={styles.changePhone_Next} id="changePhone_buttons">
							<div>下一步</div>
						</div>
						<div className={styles.changePhone_Text}>
							<h3>温馨提示</h3>
							<p>手机号码修改成功后需要使用新的手机号码进行登录。</p>
						</div>
					</form>
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
			$('#changePhones').css({
				'background':'#ffffff',
				'height':function(){
					return ($(window).height()-$('#headerReturn').height())+"px"
				}
			})
			//获取验证码
			$('#ChangePhoneCode').click(function() {
				let req_data={}
				req_data.telephone=userTelephone;
				req_data.this=_this
				if(reqValid){
					getValidCode(req_data)
				}else{
					Popfun("您的操作太频繁,请稍后再试")
				}

			});
			//监听输入,控制按钮样式
			let bnt_type=false
			change_button=()=>{
				var val=$('#changePhone_yzm').val()
				if(val.length>3){
					bnt_type=true
					$('#changePhone_buttons div').css('background','#ff5e57')
				}else{
					bnt_type=false
					$('#changePhone_buttons div').css('background','#fc817c')
				}
			}
			$('#changePhone_buttons div').click(function(){//修改密码下一步
				if(bnt_type){
					let reqV={}
					reqV.validCode=$('#changePhone_yzm').val()
					reqV.telephone=userTelephone
					reqV.this=_this
					provingValidCode(reqV)
				}else{
					Popfun('请填写正确的验证码')
				}
			})

		}
	}
	return <ChangePhone/>
}

export default connect(({ centerPersonData }) => ({
    centerPersonData,
  }))(ChangePhone)
