import React from 'react';
import { connect } from 'dva';
import styles from '../../style/AJ/AJ.css';
import Header from '../../components/PublicComponents/HeaderReturn';
import AJOfAll from '../../components/AJDetails/AJOfAll';
import Footer from '../../components/PublicComponents/footerNav';

const AJPage = ({ dispatch,AJPageData }) => {
	console.log(AJPageData.res_partition_datas)
	function chooseToGo(type){
		dispatch({
			type:'AJPageData/chooseToGo',
			payload:type
		})
	}
	if(AJPageData.res_partition_datas){
		return (
			<div className={styles.AJContainer}>
				<Header	left_show='0' head_title='艾家专区' header_ids='2' right_fun={ chooseToGo }/>
				<AJOfAll pageData = { AJPageData.res_partition_datas } chooseToGo = { chooseToGo } type="AJ" />
				<Footer NewLocation='3'/>
			</div>
		)
	}else{
		return (
			<div className={styles.AJContainer}>
				<Header	left_show='0' head_title='艾家专区' header_ids='2' right_fun={ chooseToGo }/>
				<Footer NewLocation='3'/>
			</div>
		)
	}
};

export default connect(({ AJPageData}) => ({
  AJPageData
}))(AJPage);
