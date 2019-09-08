import React from 'react';
import styles from '../../../style/mine/myPage.css';

const PersonMesHeader = ({ go,userInfo }) => {
	var reg = new RegExp("(\\d{3})(\\d{4})(\\d{4})");
	let telephone = userInfo.telephone.replace(reg, "$1****$3");
	return (
		<div className={ styles.myPagePersonMes }>
			<div className={ styles.myPageUserHead } onClick={()=>go('/myPage/CenterPerson')}>
				<img src={ userInfo.picture?userInfo.picture:"./src/assets/myPageDefaultHead1.png" } />
			</div>
			<div className={ styles.myPageUserMes} onClick={()=>go('/myPage/CenterPerson')}>
				<p>{ userInfo.name }</p>
				<p>{ telephone }</p>
			</div>
			<aside>
				<p>{ userInfo.merchant }</p>
			</aside>
		</div>
	)
}

export default PersonMesHeader;
