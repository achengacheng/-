import React from 'react';
import styles from '../../style/login.css'
import $ from 'jquery'

const LoginFrom=({keyway,onRef,Logon,getValidCode,getCode,datasphone})=>{
	let lo_time=60;
	class LoginFrom extends React.Component{
		constructor(props) {
	        super(props);	       
	        this.getInput = this.getInput.bind(this);
	        this.ValidCoderRes=this.ValidCoderRes.bind(this)
	    }
	    getInput(){
	    	let datas={};
	    	if(this.props.keyway){
	    		datas.telephone=$('#username').val()
	    		datas.password=$('#psd').val()

	    	}else{
	    		datas.telephone=$('#username').val()
	    		datas.password=$('#yzm').val()
	    	}
	    	return datas
	    }
	    ValidCoderRes(data){
	    	if(data.data.success){
	    		let setTime, thisdom=$('.'+styles.getyam_btn);
	    		getCode('发送成功')	    		
		    	setInterval(function(){										
					if(lo_time<=0){
						thisdom.text('重发')
						thisdom.css('color','#0090ff')
						clearInterval(setTime)
						lo_time=60;
					}else{
						lo_time--;				
						thisdom.text(lo_time+'s后重发')
						thisdom.css('color','#999999')
					}
				},1000)	
	    	}else{
	    		getCode('发送失败')
	    	}	
	    }
		render(){
			if(this.props.keyway){
				return(	<ul className={styles.loginFrom_box}>
							<li>
								<input type="number" placeholder="请输入您的手机号" id='username' maxLength='11' defaultValue={datasphone?datasphone:''}/>
								<div>
									<i className={styles.loginFrom_icon_x}></i>
								</div>							
							</li>
							<li>
								<input type="password" placeholder="请输入您的登录密码" id="psd"/>
								<div>
									<i className={styles.loginFrom_icon_yan1} id='look_psd'></i>
									<i className={styles.loginFrom_icon_x}></i>
								</div>
							</li>
						</ul>)
			}else{
				return(	<ul className={styles.loginFrom_box}>
							<li>
								<input type="number" placeholder="请输入您的手机号" id='username' maxLength='11' defaultValue={datasphone?datasphone:''}/>
								<div>
									<i className={styles.loginFrom_icon_x}></i>
								</div>							
							</li>
							<li>
								<input type="number" placeholder="请输入您的验证码" id="yzm"/>
								<div className={styles.getyam_btn}>
									发送验证码
								</div>
							</li>
						</ul>)
			}
			
		}
		componentWillMount(){	
			this.props.onRef(this)
		}
		componentDidMount(){
			//删除输入
			$('.'+styles.loginFrom_icon_x).click(function(){
				$(this).parent('div').siblings('input').val('')
				$(this).hide()
				Logon(false,0)
			})
			//输入监听
			$('#username').on('input propertychange',function(){
				if($(this).val().length>0){
					$(this).siblings('div').children('i').show()
					if($('#psd').val()!==''&&$('#psd').val()!==undefined&&$('#psd').val()!==null){						
						Logon(true)
					}else{
						Logon(false,1)
					}					
				}else{
					$(this).siblings('div').children('i').hide()
					Logon(false,0)
				}
			})
			$('#psd,#yzm').on('input propertychange',function(){
				if($(this).val().length>0){
					$(this).siblings('div').children('i').show()
					if($('#username').val()!==''&&$('#username').val()!==undefined&&$('#username').val()!==null){
						Logon(true)
					}else{
						Logon(false,0)
					}
				}else{
					$(this).siblings('div').children('i').hide();
					Logon(false,1)
				}
			})
			//获得验证码
			let _this=this;
			$('.'+styles.getyam_btn).click(function(){
				let telephone=$('#username').val()				
				if(telephone!==undefined&&telephone!==''&&telephone!==null){
					if(lo_time===60){						
						getValidCode({telephone:telephone,this:_this})
					}else{
						getCode('需要等待60s后才能重发')
					}
										
				}else{
					getCode('请输入您的手机号')
				}															
			})
			//密码可视	
			$('#look_psd').click(function(){
				if($(this).attr('class')===styles.loginFrom_icon_yan1){					
					$(this).addClass(styles.loginFrom_icon_yan2)
					$('#psd').attr('type','text')
				}else{					
					$(this).removeClass(styles.loginFrom_icon_yan2)
					$('#psd').attr('type','password')
				}
			})
		}
	}
	return <LoginFrom keyway={keyway} onRef={onRef}/>
}
export default LoginFrom
