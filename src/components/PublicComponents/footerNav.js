import React from 'react';
import { withRouter } from "react-router-dom";
import styles from '../../style/PublicStyle/footerNav.css';

class Footer extends React.Component{	
	render(){
		const NewLocation = this.props.NewLocation;
		const footer_icon=[ {src:'src/assets/footer_icon_h0.png',
					r_src:'src/assets/footer_icon_r0.png',
					footer_name:'首页',
					footer_to:'/'},

					{src:'src/assets/footer_icon_h1.png',r_src:'src/assets/footer_icon_r1.png',footer_name:'分类',footer_to:'/ClassifyPage'},
					{src:'src/assets/footer_icon_h2.png',r_src:'src/assets/footer_icon_r2.png',footer_name:'专题',footer_to:'/SpecialPage'},
					{	src:sessionStorage.getItem('ajData')?JSON.parse(sessionStorage.getItem('ajData')).imgurl:'',
						r_src:sessionStorage.getItem('ajData')?JSON.parse(sessionStorage.getItem('ajData')).imgurl:'',
						footer_name:sessionStorage.getItem('ajData')?JSON.parse(sessionStorage.getItem('ajData')).storeName:'艾家',footer_to:'/AJPage'},
					{src:'src/assets/footer_icon_h4.png',r_src:'src/assets/footer_icon_r4.png',footer_name:'我的',footer_to:'/myPage'}]

		return (
			<div className={ styles.footer_box } id='footerbox'>
				<ul className={ styles.footer_ul } >
				{footer_icon.map(function(item, index) {
				    	return  <li key={ index } onClick={ ()=> this.myFunction(item.footer_to)}>
				    				<img src={ parseInt(NewLocation)===index?item.r_src:item.src }/>
				    				<p className={ parseInt(NewLocation)===index?styles.footernew_p:'' }>{ item.footer_name }</p>	
				    			</li>				    			
					},this)
				}
				</ul>
			</div>
		)
	}
	myFunction(loc) {
		this.props.history.push(loc);
	}
} 

export default withRouter(Footer);