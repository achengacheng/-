import React from 'react';
import { connect } from 'dva';
import styles from '../../../style/mine/CenterPerson/CenterPerson.css';
import HeaderReturn from '../../../components/PublicComponents/HeaderReturn'
import ChaPop from '../../../components/PublicComponents/ChaPop'
import $ from 'jquery'

const ModifyPassword=({dispatch,centerPersonData,location,history})=>{
	console.log(location)
	function changePsd(datas,d_thiss){
		dispatch({
			type:"centerPersonData/changePsd",
			data:datas,
			d_this:d_thiss
		})
	}

	let Popfun,_this  //弹窗调用通道
	function modify(){
		let reqData={}
		if($('#oldPsd').val()===""||$('#oldPsd').val()===undefined){
			Popfun("请输入原密码")
		}else if($('#newPsd').val()===""||$('#newPsd').val()===undefined){
			Popfun("请输入新密码")
		}else if($('#newPsd2').val()===""||$('#newPsd2').val()===undefined){
			Popfun("请确认新密码")
		}else if($('#newPsd').val().length<6){
			Popfun("密码不得少于6位")
		}else if($('#newPsd').val()!==$('#newPsd2').val()){
			Popfun("两次输入的密码不同,请重新确认")
		}else{
			reqData.telephone=location.search.substring(1);
			reqData.newPWD=$('#newPsd').val();
			reqData.oldPWD=$('#oldPsd').val()
			changePsd(reqData,_this)
		}
	}
	function HintWords(popDom){
		Popfun=popDom.Popfun
	}
	class ModifyPassword extends React.Component{
		constructor(props) {
        	super(props);
        	this.changeFe=this.changeFe.bind(this)
        } 
        changeFe(alerts,types,io){
			Popfun(alerts,types)
			if(io){
				setTimeout(function(){
					 history.push({pathname:"/mypage/CenterPerson"})
				},1500)
	    	}		
        }
        
	 	render(){
	 		return(	<div>
	 					<HeaderReturn head_title="修改密码" header_ids='0' left_show='1' custom={{id:2,val:modify}}/>
	 					<div className={styles.modifyPassword}>
		 					<ul className={styles.modifyPassword_ul}>
		 						<li>
		 							<p>旧密码</p>
		 							<input type="text" placeholder="请输入旧密码" id="oldPsd"/>	
		 						</li>
		 						<li>
		 							<p>新密码</p>
		 							<input type="password" id="newPsd" placeholder="请输入新密码(6至20位数字或字母)"/>	
		 						</li>
		 						<li>
		 							<p>确认密码</p>
		 							<input type="password" id="newPsd2"  placeholder="请再输入新密码"/>	
		 						</li>
		 					</ul>
		 				</div>
		 				<ChaPop HintWords={HintWords}/>
	 				</div>	 				
	 			)
	 	}
	 	componentWillMount(){
	 		_this=this
	 	}
	 	componentDidMount(){
	 		$('.'+styles.modifyPassword).css('height',function(){
	 			return $(window).height()-108+"px"
	 		})
	 	}
	 }
	 return <ModifyPassword/>
}

export default connect(({ centerPersonData }) => ({
    centerPersonData,
  }))(ModifyPassword)