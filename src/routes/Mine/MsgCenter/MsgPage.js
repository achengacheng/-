import React from 'react';
import styles from '../../../style/mine/MsgCenter/MsgPage.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import { Link } from 'dva/router'
import { connect } from 'dva';

const MsgPage = ({dispatch,msgPageData}) => {
    let actMsg={
        mesgTitle:'暂无新消息。',
        unReadNum:''
    };
    let sysMsg={
        mesgTitle:'暂无新消息。',
        unReadNum:''
    };
    let serMsg={
        mesgTitle:'暂无新消息。',
        unReadNum:''
    };
	class MsgPage extends React.Component{
        constructor(props){
            super(props);
            if(msgPageData.msg_datas.length){
                for(let i=0;i<msgPageData.msg_datas.length;i++){
                    if(msgPageData.msg_datas[i].mesgType=='SYSTEM_MESSAGE'){
                        sysMsg.unReadNum=msgPageData.msg_datas[i].unReadNum;
                        sysMsg.mesgTitle=msgPageData.msg_datas[i].mesgTitle
                    }else if(msgPageData.msg_datas[i].mesgType=='ACTIVITY_MESSAGE'){
                        actMsg.unReadNum=msgPageData.msg_datas[i].unReadNum;
                        actMsg.mesgTitle=msgPageData.msg_datas[i].mesgTitle
                    }else if(msgPageData.msg_datas[i].mesgType=='SERVICE_MESSAGE'){
                        serMsg.unReadNum=msgPageData.msg_datas[i].unReadNum;
                        serMsg.mesgTitle=msgPageData.msg_datas[i].mesgTitle
                    }
                    console.log(1)
                }
            }
            this.state={
                msgData:{
                    actMsg:actMsg,
                    sysMsg:sysMsg,
                    serMsg:serMsg
                }
            }
        }		
		render () {
			return (
				<div>
                    <Header head_title='消息中心' left_show='1' right_icon='2'/>
                    <ul className={styles.MsgPageBox}>
                        <li>
                            <a href="http://hb358.udesk.cn/im_client?web_plugin_id=23078">
                                <div className={styles.MsgPageBoxLf}>
                                    <img src="/src/assets/Mine-msg-kf.png" alt=""/>
                                    <div>
                                        <p>在线客服</p>
                                        <p className={styles.MsgPageBoxLfp}>查看与客服的沟通记录</p>
                                    </div>
                                </div> 
                                <div className={styles.MsgPageNumbers}>
                                    {/* <span className={styles.MsgPageBorder}>1</span> */}
                                    <img src="/src/assets/myPageLeftArr.png" alt=""/>
                                </div>
                            </a>
                        </li>
                        <li>
                            <Link to="/mypage/MsgPage/ActivityMsg">
                                <div className={styles.MsgPageBoxLf}>
                                    <img src="/src/assets/Mine-msg-act.png" alt=""/>
                                    <div>
                                        <p>活动消息</p>
                                        <p className={styles.MsgPageBoxLfp}>{this.state.msgData.actMsg.mesgTitle}</p>
                                    </div>
                                </div>
                                <div className={styles.MsgPageNumbers}>
                                    {
                                        this.state.msgData.actMsg.unReadNum?<span className={styles.MsgPageBorder}>{this.state.msgData.actMsg.unReadNum}</span>:null
                                    }
                                    <img src="/src/assets/myPageLeftArr.png" alt=""/>
                                </div>
                            </Link>   
                        </li>
                        <li>
                            <Link to="/mypage/MsgPage/ServiceMsg">
                                <div className={styles.MsgPageBoxLf}>
                                    <img src="/src/assets/Mine-msg-ol.png" alt=""/>
                                    <div>
                                        <p>服务消息</p>
                                        <p className={styles.MsgPageBoxLfp}>{this.state.msgData.serMsg.mesgTitle}</p>
                                    </div>
                                </div>
                                <div className={styles.MsgPageNumbers}>
                                    {
                                        this.state.msgData.serMsg.unReadNum?<span className={styles.MsgPageBorder}>{this.state.msgData.serMsg.unReadNum}</span>:null
                                    }
                                    <img src="/src/assets/myPageLeftArr.png" alt=""/>
                                </div>
                            </Link>  
                        </li>
                        <li>
                            <Link to="/mypage/MsgPage/SystemMsg">
                                <div className={styles.MsgPageBoxLf}>
                                    <img  className={styles.MsgPageImg} src="/src/assets/Mine-msg-sys.png" alt=""/>
                                    <div>
                                        <p>系统消息</p>
                                        <p className={styles.MsgPageBoxLfp}>{this.state.msgData.sysMsg.mesgTitle}</p>
                                    </div>
                                </div>
                                <div className={styles.MsgPageNumbers}>
                                    {
                                        this.state.msgData.sysMsg.unReadNum?<span className={styles.MsgPageBorder}>{this.state.msgData.sysMsg.unReadNum}</span>:null
                                    }
                                    <img src="/src/assets/myPageLeftArr.png" alt=""/>
                                </div>
                            </Link>  
                        </li>
                    </ul>    
                </div>
			)
        }
        componentDidMount  (){
            if(msgPageData.loading==false){
                dispatch({
                    type:'msgPageData/getConFeeData'
                })
            }
        }
        componentWillUnmount(){
            msgPageData.loading=false
        }
	}	
	return <MsgPage />
};
export default connect(({ msgPageData }) => ({
    msgPageData
  }))(MsgPage);