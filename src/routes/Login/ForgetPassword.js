import React from 'react';
import { connect } from 'dva';
import $ from 'jquery'
import styles from '../../style/login.css'
import ForgetPasswordForm from '../../components/Login/ForgetPasswordForm'
import { Link } from 'dva/router';
import ChaPop from '../../components/PublicComponents/ChaPop';

const ForgetPassword=({dispatch,LoginData,location})=>{
	let form_this,forPsd_type=false;//1.存储子组件this,2.判断可登录状态按钮样式
	function getValidCode(datas){//获取验证码
		dispatch({
			type:'LoginData/getValidCode',
			data:datas
		})
	}
	function resetPwd(datas){//注册
		dispatch({
			type:'LoginData/resetPwd',
			data:datas
		})
	}
	function passage(data){//子组件通道
		form_this=data;
	}
	function canRegister(ip){//判断可登录
		if(ip){
			forPsd_type=true
			$('.'+styles.login_btn).css('background-color','#ff0f0f')
		}else{
			forPsd_type=false
			$('.'+styles.login_btn).css('background-color','#fc817c')
		}
	}
	let Popfun  //弹窗调用通道
	function HintWords(popDom){
		Popfun=popDom.Popfun
	}
	function getCode(data){//传入子组件弹窗使用
		Popfun(data)
	}	
	class ForgetPassword extends React.Component{
		constructor(props) {  
	        super(props);  
	        this.state = {							
	    	};  
	    } 
		render(){
			return(	<div className={styles.login_box}>
						<div className={styles.login_Bg}>
							<Link to='/Login'><i className={styles.icon_back}></i></Link>
							<img src="./src/assets/Login_logo.png" alt=""/>
							<div className={styles.login_Choice}>
								<div className={styles.login_new}>找回密码</div>				
							</div>
							<div id={styles.login_From_box} className={styles.register_box}>
								<ForgetPasswordForm passage={passage} getCode={getCode} getValidCode={getValidCode} canRegister={canRegister}/>								
								<div id="ForgetPassword_Btn" className={styles.login_btn}><i className={styles.logining_icon}></i>找回密码</div>								
							</div>
						</div>	
						<ChaPop HintWords={HintWords}/>					
					</div>)
		}
		componentDidMount(){
			//有无注册返回值
			if(LoginData.resetPwd_data){
				if(LoginData.resetPwd_data.data.success){//注册返回值成功判断
					Popfun("修改成功")			
				}else{					
					Popfun(LoginData.resetPwd_data.data.alertMsg.msg)
				}
			}	
			$('#ForgetPassword_Btn').click(function(){
				if(forPsd_type){
					let data=form_this.getInput()
					resetPwd(data)
				}
			})
			$('.'+styles.login_box).css('height',function(){
				return $(window).height()+'px'
			})
		}
	}
	return <ForgetPassword/>
}

export default connect(({ LoginData }) => ({
    LoginData,
  }))(ForgetPassword);
