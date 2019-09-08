import React from 'react';
import styles from '../../../style/mine/MsgCenter/ServiceMsg.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import TextMsgCard from '../../../components/Mine/MsgCenter/TextMsgCard'
import { connect } from 'dva';
import { Link } from 'dva/router'
const ServiceMsg = ({dispatch,msgPageData}) => {
	class ServiceMsg extends React.Component{
		constructor(props){
            super(props);
            this.state={
                serMsgData:msgPageData.ser_datas
            }
        }
		render () {
			let that=this
			return (
				<div>
                    <Header head_title='服务消息' left_show='1' right_icon='2' header_ids="13"/>
                    <div className={styles.serviceMsgHead}>
						{

                            this.state.serMsgData.map(function(item,index){
                                return(
                                    // <div className={styles.serviceMsgLi}>
                                    //     <div className={styles.serviceMsgTime}>{item.showDateTime}</div>
                                    //     <div className={styles.ActivityTimeDiv}>
                                    //         <p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
                                    //         <p className={styles.ActivityTimep2}>{item.content}</p>
                                    //     </div>
									// </div>
									<div key={index}>
										{(function(){
											if(item.insideJumpFormat==='web'){
												return(
													<div className={styles.serviceMsgLi} index={index}>
														<a href={item.insideJumpFormatVal.id}>
															<div className={styles.serviceMsgTime}>{item.showDateTime}</div>
															<div className={styles.ActivityTimeDiv}>
																<p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
																<p className={styles.ActivityTimep2}>{item.content}</p>
															</div>
														</a>
													</div>
												)
											}else if(item.insideJumpFormat==='no'){
												return(
													<div className={styles.serviceMsgLi} onClick={()=>that.setId(item.id)} index={index}>
														<Link to='/mypage/MsgPage/MsgDetails'>
															<div className={styles.serviceMsgTime}>{item.showDateTime}</div>
															<div className={styles.ActivityTimeDiv}>
																<p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
																<p className={styles.ActivityTimep2}>{item.content}</p>
															</div>
														</Link>
													</div>
												)
											}else if(item.insideJumpFormat==='goods'){
												return(
													<div className={styles.serviceMsgLi} onClick={()=>that.setId(item.id)} index={index}>
														<Link to={'/GoodsPage/'+item.insideJumpFormatVal.id}>
															<div className={styles.serviceMsgTime}>{item.showDateTime}</div>
															<div className={styles.ActivityTimeDiv}>
																<p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
																<p className={styles.ActivityTimep2}>{item.content}</p>
															</div>
														</Link>
													</div>
												)
											}else if(item.insideJumpFormat==='theme'){
												return(
													<div className={styles.serviceMsgLi} onClick={()=>that.setId(item.id)} index={index}>
														<Link to={'/SpecialPage/SpecialDetail?'+item.insideJumpFormatVal.id}>
															<div className={styles.serviceMsgTime}>{item.showDateTime}</div>
															<div className={styles.ActivityTimeDiv}>
																<p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
																<p className={styles.ActivityTimep2}>{item.content}</p>
															</div>
														</Link>
													</div>
												)
											}else if(item.insideJumpFormat==='merchant'){
												return(
													<div className={styles.serviceMsgLi} onClick={()=>that.setId(item.id)} index={index}>
														<Link to={'/AJPage/AJDetails/'+item.insideJumpFormatVal.id}>
															<div className={styles.serviceMsgTime}>{item.showDateTime}</div>
															<div className={styles.ActivityTimeDiv}>
																<p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
																<p className={styles.ActivityTimep2}>{item.content}</p>
															</div>
														</Link>
													</div>
												)
											}else if(item.insideJumpFormat==='goodsClassify'){
												return(
													<div className={styles.serviceMsgLi} onClick={()=>that.setId(item.id)} index={index}>
														<Link to={'/ClassifyList/'+item.insideJumpFormatVal.id}>
															<div className={styles.serviceMsgTime}>{item.showDateTime}</div>
															<div className={styles.ActivityTimeDiv}>
																<p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
																<p className={styles.ActivityTimep2}>{item.content}</p>
															</div>
														</Link>
													</div>
												)
											}else if(item.insideJumpFormat==='themeClassify'){
												return(
													<div className={styles.serviceMsgLi} onClick={()=>that.setId(item.id)} index={index}>
														<Link to={'/SpecialPage?'+item.insideJumpFormatVal.id}>
															<div className={styles.serviceMsgTime}>{item.showDateTime}</div>
															<div className={styles.ActivityTimeDiv}>
																<p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
																<p className={styles.ActivityTimep2}>{item.content}</p>
															</div>
														</Link>
													</div>
												)
											}else if(item.insideJumpFormat==='themeClassify'){
												return(
													<div className={styles.serviceMsgLi} onClick={()=>that.setId(item.id)} index={index}>
														<Link to={'/SpecialPage?'+item.insideJumpFormatVal.id}>
															<div className={styles.serviceMsgTime}>{item.showDateTime}</div>
															<div className={styles.ActivityTimeDiv}>
																<p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
																<p className={styles.ActivityTimep2}>{item.content}</p>
															</div>
														</Link>
													</div>
												)
											}else if(item.insideJumpFormat==='merchantClassify'){
												return(
													<div className={styles.serviceMsgLi} onClick={()=>that.setId(item.id)} index={index}>
														<Link to={'/AJPage/ClassifyAJ/艾家分类/'+item.insideJumpFormatVal.id}>
															<div className={styles.serviceMsgTime}>{item.showDateTime}</div>
															<div className={styles.ActivityTimeDiv}>
																<p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
																<p className={styles.ActivityTimep2}>{item.content}</p>
															</div>
														</Link>
													</div>
												)
											}else if(item.insideJumpFormat==='flashSale'){
												return(
													<div className={styles.serviceMsgLi} onClick={()=>that.setId(item.id)} index={index}>
														<Link to='/SeckillPage'>
															<div className={styles.serviceMsgTime}>{item.showDateTime}</div>
															<div className={styles.ActivityTimeDiv}>
																<p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
																<p className={styles.ActivityTimep2}>{item.content}</p>
															</div>
														</Link>
													</div>
												)
											}else if(item.insideJumpFormat==='fresh'){
												return(
													<div className={styles.serviceMsgLi} onClick={()=>that.setId(item.id)} index={index}>
														<Link to={'/ClassifyList/'+item.insideJumpFormatVal.id+'?home'}>
															<div className={styles.serviceMsgTime}>{item.showDateTime}</div>
															<div className={styles.ActivityTimeDiv}>
																<p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
																<p className={styles.ActivityTimep2}>{item.content}</p>
															</div>
														</Link>
													</div>
												)
											}
											else if(item.insideJumpFormat==='themeList'){
												return(
													<div className={styles.serviceMsgLi} onClick={()=>that.setId(item.id)} index={index}>
														<Link to={'/SpecialPage'}>
															<div className={styles.serviceMsgTime}>{item.showDateTime}</div>
															<div className={styles.ActivityTimeDiv}>
																<p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
																<p className={styles.ActivityTimep2}>{item.content}</p>
															</div>
														</Link>
													</div>
												)
											}else if(item.insideJumpFormat==='Invitation'){
												return(
													<div className={styles.serviceMsgLi} onClick={()=>that.setId(item.id)} index={index}>
														<Link to={'/mypage/Invite'}>
															<div className={styles.serviceMsgTime}>{item.showDateTime}</div>
															<div className={styles.ActivityTimeDiv}>
																<p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
																<p className={styles.ActivityTimep2}>{item.content}</p>
															</div>
														</Link>
													</div>
												)
											}else if(item.insideJumpFormat==='classifyCatalog'){
												return(
													<div className={styles.serviceMsgLi} onClick={()=>that.setId(item.id)} index={index}>
														<Link to={'/ClassifyPage'}>
															<div className={styles.serviceMsgTime}>{item.showDateTime}</div>
															<div className={styles.ActivityTimeDiv}>
																<p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
																<p className={styles.ActivityTimep2}>{item.content}</p>
															</div>
														</Link>
													</div>
												)
											}else if(item.insideJumpFormat==='serviceCentre'){
												return(
													<div className={styles.serviceMsgLi} onClick={()=>that.setId(item.id)} index={index}>
														<Link to={'/mypage/ServePage'}>
															<div className={styles.serviceMsgTime}>{item.showDateTime}</div>
															<div className={styles.ActivityTimeDiv}>
																<p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
																<p className={styles.ActivityTimep2}>{item.content}</p>
															</div>
														</Link>
													</div>
												)
											}else if(item.insideJumpFormat==='message'){
												return(
													<div className={styles.serviceMsgLi} onClick={()=>that.setId(item.id)}index={index} >
														<Link to={'/mypage/MsgPage'}>
															<div className={styles.serviceMsgTime}>{item.showDateTime}</div>
															<div className={styles.ActivityTimeDiv}>
																<p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
																<p className={styles.ActivityTimep2}>{item.content}</p>
															</div>
														</Link>
													</div>
												)
											}else if(item.insideJumpFormat==='myOrderList'){
												return(
													<div className={styles.serviceMsgLi} onClick={()=>that.setId(item.id)} index={index}>
														<Link to={'/myPage/MyOrder'}>
															<div className={styles.serviceMsgTime}>{item.showDateTime}</div>
															<div className={styles.ActivityTimeDiv}>
																<p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
																<p className={styles.ActivityTimep2}>{item.content}</p>
															</div>
														</Link>
													</div>
												)
											}else if(item.insideJumpFormat==='address'){
												return(
													<div className={styles.serviceMsgLi} onClick={()=>that.setId(item.id)} index={index}>
														<Link to={'/myPage/AddressPage'}>
															<div className={styles.serviceMsgTime}>{item.showDateTime}</div>
															<div className={styles.ActivityTimeDiv}>
																<p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
																<p className={styles.ActivityTimep2}>{item.content}</p>
															</div>
														</Link>
													</div>
												)
											}else if(item.insideJumpFormat==='themeDetailComment'){
												return(
													<div className={styles.serviceMsgLi} onClick={()=>that.setId(item.id)} index={index}>
														<Link to={'/SpecialPage/SpecialAllComment/'+item.insideJumpFormatVal.id}>
															<div className={styles.serviceMsgTime}>{item.showDateTime}</div>
															<div className={styles.ActivityTimeDiv}>
																<p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
																<p className={styles.ActivityTimep2}>{item.content}</p>
															</div>
														</Link>
													</div>
												)
											}else if(item.insideJumpFormat==='order'){
												return(
													<div className={styles.serviceMsgLi} onClick={()=>that.setId(item.id)} index={index}>
														<Link to={'/mypage/MyOrder/OrderDetails?id='+item.insideJumpFormatVal.id}>
															<div className={styles.serviceMsgTime}>{item.showDateTime}</div>
															<div className={styles.ActivityTimeDiv}>
																<p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
																<p className={styles.ActivityTimep2}>{item.content}</p>
															</div>
														</Link>
													</div>
												)
											}
											//文章跳转
											// else if(item.insideJumpFormat==='article'){
											// 	return(
											// 		<div className={styles.serviceMsgLi} onClick={()=>that.setId(item.id)}>
											// 			<Link to={'/SpecialPage/SpecialAllComment?'+item.insideJumpFormatVal.id}>
											// 				<div className={styles.serviceMsgTime}>{item.showDateTime}</div>
											// 				<div className={styles.ActivityTimeDiv}>
											// 					<p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
											// 					<p className={styles.ActivityTimep2}>{item.content}</p>
											// 				</div>
											// 			</Link>
											// 		</div>
											// 	)
											// }
											//文章分类
											// else if(item.insideJumpFormat==='articleClassify'){
											// 	return(
											// 		<div className={styles.serviceMsgLi} onClick={()=>that.setId(item.id)}>
											// 			<Link to={'/SpecialPage/SpecialAllComment?'+item.insideJumpFormatVal.id}>
											// 				<div className={styles.serviceMsgTime}>{item.showDateTime}</div>
											// 				<div className={styles.ActivityTimeDiv}>
											// 					<p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
											// 					<p className={styles.ActivityTimep2}>{item.content}</p>
											// 				</div>
											// 			</Link>
											// 		</div>
											// 	)
											// }

										})()}
									</div>
                                )
                            })
                        }
                    </div>
                </div>
			)
		}
		setId(id){
			sessionStorage.setItem('MsgId',id)
		}
	}
	return <ServiceMsg />
};
export default connect(({ msgPageData }) => ({
    msgPageData
  }))(ServiceMsg);
