import React from 'react';
import styles from '../../../style/mine/SystemSet/SystemPage.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import { Link } from 'dva/router'
import { connect } from 'dva';
const HelpContent = ({myPageData,dispatch}) => {
	//推出登录
	function unlogin(){
		sessionStorage.removeItem('id');
		sessionStorage.removeItem('scNO');
		goWhere();
		window.location.reload();
	}
	function goWhere(){
		dispatch({
			type:'myPageData/goSomeWhere',
			payload:'/Login?/myPage'
		})
	}
	class HelpContent extends React.Component{		
		render () {
			return (
				<div className={styles.MsgDetailsHeight}>
                    <Header head_title='系统设置' left_show='1' right_icon='2'/>
                    <div className={styles.sysWrap}>
						{/* <div className={styles.sysLi}>
							<p>清除缓存</p>
							<p className={styles.sysSpan}>
								<span>0.00MB</span>
								<img src="/src/assets/myPageLeftArr.png" alt=""/>
							</p>
						</div> */}
						<Link to="/mypage/SystemPage/Feedback">
							<div className={styles.sysLi}>
								<p>意见反馈</p>
								<p className={styles.sysSpan}>
									<img src="/src/assets/myPageLeftArr.png" alt=""/>
								</p>
							</div>
						</Link>
						<Link to="/mypage/SystemPage/AboutUs">
							<div className={styles.sysLi}>
								<p>关于我们</p>
								<p className={styles.sysSpan}>
									<img src="/src/assets/myPageLeftArr.png" alt=""/>
								</p>
							</div>
						</Link>
						<Link to="/mypage/SystemPage/Imprint">
							<div className={styles.sysLi}>
								<p>版本说明</p>
								<p className={styles.sysSpan}>
									<img src="/src/assets/myPageLeftArr.png" alt=""/>
								</p>
							</div>
						</Link>
						{/* <div className={styles.sysLi}>
							<p>好评鼓励</p>
							<p className={styles.sysSpan}>
								<img src="/src/assets/myPageLeftArr.png" alt=""/>
							</p>
						</div> */}
                    </div> 
				
                </div>
			)
		}
		componentWillUnmount(){
            clearTimeout()
     	//        	<div className={styles.sysBtn} onClick={()=>unlogin()}>
					// 	退出登录
					// </div>   
        }
	}	
	return <HelpContent />
};
export default connect(({ myPageData }) => ({
    myPageData,
}))(HelpContent);