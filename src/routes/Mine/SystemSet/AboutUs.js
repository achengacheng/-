import React from 'react';
import styles from '../../../style/mine/SystemSet/AboutUs.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部

const HelpContent = () => {
	class HelpContent extends React.Component{		
		render () {
			return (
				<div className={styles.AboutUsHeight}>
                    <Header head_title='关于我们' left_show='1' right_icon='2'/>
                    <div className={styles.AboutUsCeng}>
						<div className={styles.AboutUsWrap}>
							<img src="/src/assets/Mine-sys-banner.png" alt=""/>
							<div className={styles.AboutUscontent}>
								<p>客服热线：028-966-9999</p>
								<p>客服邮箱：service@ajgs.cn</p>
								<p>当前版本：v 2.0.0</p>
							</div>
						</div>
                    </div>
					<div className={styles.AboutUsFoot}>
						<p>《艾家公社用户协议》</p>
						<p>CopyRight @ 艾家公社 2015-2018</p>
					</div>    
                </div>
			)
		}
	}	
	return <HelpContent />
};
export default HelpContent;