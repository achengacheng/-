import React from 'react';
import styles from '../../../style/mine/SystemSet/Imprint.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import ImprintCard from '../../../components/Mine/SystemSet/ImprintCard'
import { connect } from 'dva';

const Imprint = ({myPageData}) => {
	class Imprint extends React.Component{
		constructor(props){
			super(props);
			this.state={
				listData:myPageData.clientData
			}
		}		
		render () {
			console.log(myPageData.clientData,444)
			if(myPageData.clientData){
				return (
					<div>
						<Header head_title='版本说明' left_show='1' right_icon='2'/>
						<div className={styles.helpsWrap}>
							<ImprintCard listData={this.state.listData}/>
						</div>    
					</div>
				)
			}else{
				return(
					<div></div>
				)
			}
		}
	}	
	return <Imprint />
};
export default connect(({ myPageData }) => ({
    myPageData
  }))(Imprint);