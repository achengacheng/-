import React from 'react';
import { connect } from 'dva';
import $ from 'jquery'
import styles from '../../style/login.css'
import { Link } from 'dva/router';
import RegisterForm from '../../components/Login/RegisterForm'
import ChaPop from '../../components/PublicComponents/ChaPop'


const Register=({dispatch,LoginData,location,history})=>{
	let form_this,Regon_type=false; //1.存储子组件this,2.判断可登录状态按钮样式
	function getValidCode(datas){//获取验证码
		dispatch({
			type:'LoginData/getValidCode',
			data:datas
		})
	}
	function RegisterReq(datas){//注册
		dispatch({
			type:'LoginData/RegisterReq',
			data:datas
		})
	}		
	function passage(data){//子组件通道
		form_this=data;
	}
	function canRegister(ip){//判断可登录
		if(ip){
			Regon_type=true
			$('.'+styles.login_btn).css('background-color','#ff0f0f')
		}else{
			Regon_type=false
			$('.'+styles.login_btn).css('background-color','#fc817c')
		}
	}
	let Popfun  //弹窗调用通道
	function HintWords(popDom){
		Popfun=popDom.Popfun
	}
	function LoginReq(data1){//密码登录
		dispatch({
			type:'LoginData/loginReq',
			data:data1
		})
	}
	function getCode(data){//传入子组件弹窗使用
		Popfun(data)
	}

	class Register extends React.Component{
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
								<div className={styles.login_new}>注册账号</div>				
							</div>
							<div id={styles.login_From_box} className={styles.register_box}>
								<RegisterForm passage={passage}  canRegister={canRegister} getCode={getCode} getValidCode={getValidCode}/>								
								<div id="Register_Btn" className={styles.login_btn}><i className={styles.logining_icon}></i>同意协议并注册</div>
								<div className={styles.register_text}>
									已阅读并同意协议<Link to={{pathname:`/mypage/ServePage/HelpContent/5b319dfca8a9260e3c86ea46`,query:'',state:''}}>《艾家用户服务协议》</Link>									
								</div>
							</div>
						</div>
						<ChaPop HintWords={HintWords}/>						
					</div>)
		}
		componentDidMount(){
			//有无注册返回值			
			if(LoginData.Register_data){
				if(LoginData.res_datas){
					if(LoginData.res_datas.data.success){//登录返回值成功判断
						Popfun("登录成功")	
						setTimeout(function(){
							sessionStorage.setItem('id',LoginData.res_datas.data.data.id)
							sessionStorage.setItem('scNO',LoginData.res_datas.data.data.scNO)
							localStorage.setItem('token',LoginData.res_datas.data.data.token)
							if(sessionStorage.getItem('id')){
								window.location.href="#/"	    					
							}						
						},500)							
					}else{					
						Popfun(LoginData.res_datas.data.alertMsg.msg)
					}
				}else{
					if(LoginData.Register_data.data.success){//注册返回值成功判断
						Popfun("注册成功")
						setTimeout(function(){
							if(LoginData.Register_login){
									LoginReq(LoginData.Register_login)
								}						
							},1500)			
						}else{					
							Popfun(LoginData.Register_data.data.alertMsg.msg)
						}
					}	
				
			}	
			$('.'+styles.login_box).css('height',function(){
				return $(window).height()+'px'
			})
			$('#Register_Btn').click(function(){
				if(Regon_type){
					let data=form_this.getInput()
					RegisterReq(data)
				}
			})
		}
	}
	return <Register/>
}

export default connect(({ LoginData }) => ({
    LoginData,
  }))(Register);