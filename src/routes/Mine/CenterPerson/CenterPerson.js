import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router'
import styles from '../../../style/mine/CenterPerson/CenterPerson.css';
import HeaderReturn from '../../../components/PublicComponents/HeaderReturn'

const CenterPerson =({dispatch,centerPersonData})=>{
	console.log(1,centerPersonData)	
	class CenterPerson extends React.Component{
		render(){			
		 	return( <div>
			 			<HeaderReturn head_title="个人中心" left_show='1'/>
			 			<div className={styles.centerPerson_box}>
			 				<ul className={styles.centerPerson_ul}>
			 					<Link to='/mypage/CenterPerson/PersonalInformation'>
			 						<li>
				 						<p>个人信息</p>
				 						<i></i>
				 					</li>
			 					</Link>
			 					<Link to={'/mypage/CenterPerson/ModifyPassword?'+centerPersonData.userTele}>
			 						<li>
				 						<p>修改密码</p>
				 						<i></i>
				 					</li>
			 					</Link>
			 					<Link to='/mypage/CenterPerson/ChangePhone'>
			 						<li>
				 						<p>修改手机</p>			 						
				 						<i></i>
				 						<span>{centerPersonData.useDataPhone?centerPersonData.useDataPhone:''}</span>
				 					</li>
			 					</Link>
			 				</ul>
			 			</div>
		 			</div>
		 		)
		}
		componentWillUpdate(){
			
		}
	}
	return <CenterPerson />
}

export default connect(({ centerPersonData }) => ({
    centerPersonData,
  }))(CenterPerson)