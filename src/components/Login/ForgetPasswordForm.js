import React from 'react';
import styles from '../../style/login.css'
import $ from 'jquery'

const ForgetPasswordForm=({passage,getCode,getValidCode,canRegister})=>{
	let lo_time=60;
	class ForgetPasswordForm extends React.Component{
		constructor(props) {
	        super(props);
	        this.ValidCoderRes=this.ValidCoderRes.bind(this)
	        this.getInput=this.getInput.bind(this)	        
	    }
	    getInput(){
	    	let datas={};
	    	datas.telephone=$('#username').val()
	    	datas.newPWD=$('#psd').val()
			datas.validCode =$('#yzm').val()
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
				return(	<ul className={styles.loginFrom_box}>
							<li>
								<input type="number" placeholder="请输入您的手机号" id='username' maxLength='11'/>
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
							<li>
								<input type="password" placeholder="请输入您的新密码" id="psd"/>
								<div>
									<i className={styles.loginFrom_icon_yan1} id='look_psd'></i>
									<i className={styles.loginFrom_icon_x}></i>
								</div>
							</li>
						</ul>)				
			
		}
		componentWillMount(){	
			passage(this)
		}
		componentDidMount(){
			//删除
			$('.'+styles.loginFrom_icon_x).click(function(){
				$(this).parent('div').siblings('input').val('')
			})
			//输入监听
			$('#username,#psd,#yzm').on('input propertychange',function(){
				if($(this).val().length>0){
					$(this).siblings('div').children('i').show()
					if($('#username').val()===''){
						canRegister(false)
					}else if($('#yzm').val()===''){
						canRegister(false)
					}else if($('#psd').val()===''){
						canRegister(false)
					}else{
						canRegister(true)
					}
				}else{
					$(this).siblings('div').children('i').hide()
				}				
			})		
			//获得验证码
			let _this=this;
			$('.'+styles.getyam_btn).click(function(){
				let telephone=$('#username').val()
				if(telephone!=undefined&&telephone!=''){
					if(lo_time==60){						
						getValidCode({telephone:telephone,this:_this})
					}else{
						getCode('需要等待60s后才能重发')
					}
										
				}else{
					getCode('请输入您的手机号')
				}		 			
			})
			$('#look_psd').click(function(){
				if($(this).attr('class')==styles.loginFrom_icon_yan1){					
					$(this).addClass(styles.loginFrom_icon_yan2)
					$('#psd').attr('type','text')
				}else{					
					$(this).removeClass(styles.loginFrom_icon_yan2)
					$('#psd').attr('type','password')
				}
			})						
		}
	}
	return <ForgetPasswordForm/>
}
export default ForgetPasswordForm
