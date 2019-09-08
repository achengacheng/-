import React from 'react';
import styles from '../../../style/mine/MsgCenter/ServiceMsg.css';
import { connect } from 'dva';
import { Link } from 'dva/router'
const TextMsgCard = ({dispatch,msgPageData}) => {
	class TextMsgCard extends React.Component{
        constructor(props){
            super(props);
            this.state={
                serMsgData:msgPageData.sys_datas
            }
        }		
		render () {
            if(msgPageData.sys_loading==true){
                return (
                    <div>
                        {
                            this.state.serMsgData.map(function(item,index){
                                return(
                                    <div className={styles.serviceMsgLi}>
                                        <div className={styles.serviceMsgTime}>{item.showDateTime}</div>
                                        <div className={styles.ActivityTimeDiv}>
                                            <p className={!item.isRead?styles.ActivityTimep1:styles.readClass}><span>{item.title}</span><i></i></p>
                                            <p className={styles.ActivityTimep2}>{item.content}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                )
            }else{
                return(
                    <div></div>
                )
            }
			
        }
        // componentDidMount(){
        //     if(msgPageData.ser_loading==false){
        //         dispatch({
        //             type:'msgPageData/serMsgData'
        //         })
        //     }
        // }    
	}	
	return <TextMsgCard />
};
export default connect(({ msgPageData }) => ({
    msgPageData
  }))(TextMsgCard);