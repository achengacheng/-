import React from 'react';
import { connect } from 'dva';
import $ from 'jquery';
import styles from '../../../style/mine/ServeCenter/HelpContent.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
const HelpContent = ({dispatch,serverData}) => {
	console.log(serverData.isApp)
	class HelpContent extends React.Component{		
		render () {
			return (
				<div className={styles.MsgDetailsHeight}>
                    {serverData.isApp?'':<Header head_title={serverData.Textdetail[0]?serverData.Textdetail[0].title:'消息详情'} left_show='1' right_icon='2'/>} 
                    <div className={styles.helpsWrap}>
						<div className={styles.helpsDiv} id="textData">
							
						</div>						
                    </div>    
                </div>
			)
		}
		componentDidMount(){
			if(serverData.isApp){
				$('.'+styles.helpsWrap).css({'margin':'0px'})
			}
			if(serverData.Textdetail){
				if(serverData.Textdetail.length>0){
					$('#textData').html(serverData.Textdetail[0].content)
				}
				
			}		
		}
	}	
	return <HelpContent />
};
export default connect(({ serverData}) => ({
	serverData
}))(HelpContent);