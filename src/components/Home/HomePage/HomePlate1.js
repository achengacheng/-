import React from 'react';
import styles from '../../../style/home/homePage.css'
import { Link } from  'dva/router';

const HomePlate=({datas,Callback})=>{
	class HomePlate extends React.Component{
		render(){		
			return(				
					<div>
						<div className={styles.homeplateBox}>
							<div onClick={()=>Callback(datas[0].insideJumpFormat,datas[0].insideJumpFormatVal.id,datas[0].name)} className={styles.homeplate_bdiv}>
								<img src={datas[0]?datas[0].menuPicUrl?datas[0].menuPicUrl:'./src/assets/laoding-1.1(344).png':'./src/assets/laoding-1.1(344).png'}/>
							</div>	
							<div className={styles.homeplate_sdivbox}>
								<div onClick={()=>Callback(datas[1].insideJumpFormat,datas[1].insideJumpFormatVal.id,datas[1].name)} className={styles.homeplate_sdiv}>
									<img src={datas[1]?datas[1].menuPicUrl?datas[1].menuPicUrl:'./src/assets/laoding-1.2(345).png':''}/>
								</div>
								<div onClick={()=>Callback(datas[2].insideJumpFormat,datas[2].insideJumpFormatVal.id,datas[2].name)} className={styles.homeplate_sdiv}>
									<img src={datas[2]?datas[2].menuPicUrl?datas[2].menuPicUrl:'./src/assets/laoding-1.2(345).png':''}/>
								</div>
							</div>
						</div>
						<div className={styles.homeplateBox}>
							<div onClick={()=>Callback(datas[3].insideJumpFormat,datas[3].insideJumpFormatVal.id,datas[3].name)} className={styles.homeplate_bdiv1}>
								<img src={datas[3]?datas[3].menuPicUrl?datas[3].menuPicUrl:'./src/assets/laoding-1.1(344).png':''}/>
							</div>	
							<div className={styles.homeplate_sdivbox1}>
								<div onClick={()=>Callback(datas[4].insideJumpFormat,datas[4].insideJumpFormatVal.id,datas[4].name)} className={styles.homeplate_sdiv}>
									<img src={datas[4]?datas[4].menuPicUrl?datas[4].menuPicUrl:'./src/assets/laoding-1.2(345).png':''}/>
								</div>
								<div onClick={()=>Callback(datas[5].insideJumpFormat,datas[5].insideJumpFormatVal.id,datas[5].name)} className={styles.homeplate_sdiv}>
									<img src={datas[5]?datas[5].menuPicUrl?datas[5].menuPicUrl:'./src/assets/laoding-1.2(345).png':''}/>
								</div>
							</div>
						</div>
					</div>				
								
			)
		}
	}
	return <HomePlate/>			   
}
export default HomePlate