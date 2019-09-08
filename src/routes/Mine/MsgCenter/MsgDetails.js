import React from 'react';
import styles from '../../../style/mine/MsgCenter/MsgDetails.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import { connect } from 'dva';
const MsgDetails = ({dispatch,msgPageData}) => {
	class MsgDetails extends React.Component{		
		render () {
			if(msgPageData.msgDetailDatas){
					return (
						<div className={styles.MsgDetailsHeight}>
							<Header head_title='消息详情' left_show='1' right_icon='2'/>
							<div className={styles.MsgDetailsWrap}>
								{msgPageData.msgDetailDatas.map(function(item,index){
									return(
										<div>
											<div className={styles.MsgDetailsHead}>
												{item.title}
											</div>
											<div className={styles.MsgDetailsTime}>
												{item.showDateTime}
											</div>
											<div className={styles.MsgDetailsContent}>
												{item.content}
											</div>
										</div>    
									)
								})}
							</div>
							{/* <div className={styles.MsgDetailsWrap}>
								<div className={styles.MsgDetailsHead}>
									{msgPageData.msgDetailDatas[0].title}
								</div>
								<div className={styles.MsgDetailsTime}>
									{msgPageData.msgDetailDatas[0].showDateTime}
								</div>
								<div className={styles.MsgDetailsContent}>
									{msgPageData.msgDetailDatas[0].MsgDetailsContent}
								</div>
							</div>     */}
						</div>
					)
				}else{
					return(
						<div></div>
					)
				}
			}
	}	
	return <MsgDetails />
};
export default connect(({ msgPageData }) => ({
    msgPageData
  }))(MsgDetails);
