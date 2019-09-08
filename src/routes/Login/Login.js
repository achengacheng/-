import React from 'react';
import { connect } from 'dva';
import $ from 'jquery'
import styles from '../../style/login.css'
import LoginFrom from '../../components/Login/LoginFrom'
import ChaPop from '../../components/PublicComponents/ChaPop'
import { Link } from 'dva/router';

const Login=({dispatch,LoginData,location,history})=>{
	let _this,datas_fun,Logon_type=false,Logon_input=0;
	function LoginReq(data1,d_this){//密码登录
		dispatch({
			type:'LoginData/loginReq',
			data:data1,
			_this:d_this
		})
	}
	function getValidCode(datas,d_this){//获取验证码
		dispatch({
			type:'LoginData/getValidCode',
			data:datas,
			_this:d_this
		})
	}
	function validLogin(datas,d_this){//验证码登录
		dispatch({
			type:'LoginData/validLogin',
			data:datas,
			_this:d_this
		})
	}
	function choice_loginWay(){//登录方式切换
		console.log(123)
		let das=!LoginData.login_Choice
		dispatch({
			type:'LoginData/choice_loginWay',
			data:das
		})
	}
	function onRef(obj){  //登录输入组件通道					
		 datas_fun=obj.getInput
	}
	function Logon(type,input){ //判断输入正确
		if(type){
			$('#LoginReq_btn').css('background-color','#ff0f0f')
			Logon_type=true;
		}else{
			$('#LoginReq_btn').css('background-color','#fc817c')
			Logon_type=false;
			if(input==0){
				Logon_input=0								
			}else{
				Logon_input=1
			}			
		}
	}

	let Popfun  //弹窗调用通道
	function HintWords(popDom){
		Popfun=popDom.Popfun
	}
	function getCode(data){//弹窗使用
		Popfun(data)
	}
    
	class Login extends React.Component{
		constructor(props) {  
	        super(props);  
	        this.state = {
				login_Choice:true				
	    	}; 
	    	this.thisPop=this.thisPop.bind(this)
	    } 	 
		thisPop(data){
			Popfun(data)
		}
		render(){
			return(<div className={styles.login_box}>						
						<div className={styles.login_Bg}>
							<Link to='/'><i className={styles.icon_back}></i></Link>
							<img src="./src/assets/Login_logo.png" alt=""/>
							<div className={styles.login_Choice}>
								<div onClick={choice_loginWay} className={`${LoginData.login_Choice?styles.login_new:''} ${styles.login_new_wi}`}>账号登录</div>
								<span></span>
								<div onClick={choice_loginWay} className={`${LoginData.login_Choice?'':styles.login_new} ${styles.login_new_wi}`}>验证码登录</div>
							</div>
							<div id={styles.login_From_box} className={LoginData.login_Choice?styles.login_From_box1:styles.login_From_box2}>
								<LoginFrom keyway={LoginData.login_Choice} datasphone={LoginData.Register_Phone} onRef={onRef} Logon={Logon} getValidCode={getValidCode} getCode={getCode}/>
								<div id="LoginReq_btn" className={styles.login_btn}><i className={styles.logining_icon}></i>立即登录</div>
								<div className={styles.login_a_box}>
									<Link to={{pathname:`/ForgetPassword`}}><span>忘记密码</span></Link>
									<Link to={{pathname:`/Register`}}><span>快速注册</span></Link>
								</div>
							</div>
						</div>						
						<ChaPop HintWords={HintWords}/>

				</div>)
		}
		componentWillMount(){
		    _this=this;
		  	//<div className={styles.wx_btn}><img src='./src/assets/weixin_icon.png'/>微信账号登录</div>					
		}
		componentDidMount(){			
			//有无登录返回值
			if(LoginData.res_datas){
				if(LoginData.res_datas.data.success){//登录返回值成功判断
					Popfun("登录成功")	
					setTimeout(function(){
						sessionStorage.setItem('id',LoginData.res_datas.data.data.id)
						sessionStorage.setItem('scNO',LoginData.res_datas.data.data.scNO)
						sessionStorage.setItem('boundCompanyId',LoginData.res_datas.data.data.boundCompanyId)
						sessionStorage.setItem('ajData',JSON.stringify({imgurl:LoginData.res_datas.data.data.logo,storeName:LoginData.res_datas.data.data.ajName}))				
						localStorage.setItem('token',LoginData.res_datas.data.data.token)
						if(sessionStorage.getItem('id')){
							window.location.href="#"+location.search.substring(1)
	    					// history.push({pathname:"/"+})
						}						
					},500)							
				}else{					
					Popfun(LoginData.res_datas.data.alertMsg.msg)
				}
			}	
			//样式初始化
			$('.'+styles.login_box).css('height',function(){
				 return $(window).height()+'px'
			})
			//登录点击
			$()
			$('#LoginReq_btn').click(function() {
				let rer_data=datas_fun()
				if(Logon_type){
					if(LoginData.login_Choice){
						// console.log(_this.state.login_Choice)
						sessionStorage.setItem('sendTel',rer_data.telephone)
						LoginReq(rer_data,_this)
					}else{
						sessionStorage.setItem('sendTel',rer_data.telephone)
						validLogin(rer_data,_this)
					}
										
				}else{
					if(Logon_input){
						Popfun('请输入您的密码')
					}else{
						Popfun('请输入您的手机号')
					}					
				}				
			})
			$(window).keyup(function(event){
				if(event.keyCode===13){
					let rer_data=datas_fun()
					if(Logon_type){
						if(LoginData.login_Choice){
							// console.log(_this.state.login_Choice)
							LoginReq(rer_data,_this)
						}else{
							validLogin(rer_data,_this)
						}
					}else{
						if(Logon_input){
							Popfun('请输入您的密码')
						}else{
							Popfun('请输入您的手机号')
						}					
					}	
				}
			});
		}
		componentDidUpdate(){

		}
	}
	return <Login/>
}

export default connect(({ LoginData }) => ({
    LoginData,
  }))(Login);