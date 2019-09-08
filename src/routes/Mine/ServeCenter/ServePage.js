import React from 'react';
import { connect } from 'dva';
import styles from '../../../style/mine/ServeCenter/ServePage.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import $ from 'jquery';

const MsgDetails = ({dispatch,serverData}) => {
	class MsgDetails extends React.Component{		
		render () {
			return (
				<div className={styles.MsgDetailsHeight}>
                    <Header head_title='服务中心' left_show='1' right_icon='2'/>
                    <div className={styles.ServePageWrap}>
						<div className={styles.ServePageHeader}>
							<a href="http://hb358.udesk.cn/im_client?web_plugin_id=23078">
								<div>
									<img src="/src/assets/Mine-service-kf.png" alt=""/>
									<p>在线客服</p>
								</div>
							</a>
							<p></p>
							<a href="tel:0289669999">
								<div>
									<img src="/src/assets/Mine-service-tel.png" alt=""/>
									<p>客服热线</p>
								</div>
							</a>
						</div>
						<div className={styles.ServePageQuset}>问题分类</div>
						<div className={styles.ServePageQusetBox}>
							{serverData.serverList?serverData.serverList.map(function(item,index){
								return(<div key={index}  quseid={item.id} className='severLi'>
											<p>{item.title}</p>
											<img src="/src/assets/myPageLeftArr.png" alt=""/>
										</div>)
							}):''}							
						</div>
                    </div>    
                </div>
			)
		}
		componentDidMount(){
			$('.severLi').click(function(event) {
				window.location.href='#/mypage/ServePage/HelpContent/'+$(this).attr('quseid')
			});
		}
	}	
	return <MsgDetails />
	// <div>
	// 	<p>配送问题</p>
	// 	<img src="/src/assets/myPageLeftArr.png" alt=""/>
	// </div>
	// <div>
	// 	<p>售后问题</p>
	// 	<img src="/src/assets/myPageLeftArr.png" alt=""/>
	// </div>
	// <div>
	// 	<p>优惠问题</p>
	// 	<img src="/src/assets/myPageLeftArr.png" alt=""/>
	// </div>
	// <div>
	// 	<p>秒杀问题</p>
	// 	<img src="/src/assets/myPageLeftArr.png" alt=""/>
	// </div>
	// <div>
	// 	<p>支付问题</p>
	// 	<img src="/src/assets/myPageLeftArr.png" alt=""/>
	// </div>
	// <div>
	// 	<p>余额问题</p>
	// 	<img src="/src/assets/myPageLeftArr.png" alt=""/>
	// </div>
	// <div>
	// 	<p>会员问题</p>
	// 	<img src="/src/assets/myPageLeftArr.png" alt=""/>
	// </div>
	// <div>
	// 	<p>活动问题</p>
	// 	<img src="/src/assets/myPageLeftArr.png" alt=""/>
	// </div>
	// <div>
	// 	<p>其他问题</p>
	// 	<img src="/src/assets/myPageLeftArr.png" alt=""/>
	// </div>
};
export default connect(({ serverData}) => ({
	serverData
}))(MsgDetails)
