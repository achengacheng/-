import React from 'react';
import styles from '../../../style/home/homePage.css';
import $ from 'jquery';
var type
const Header=()=>{
	var color_up=0;	
	let gaib_State;
	class Header extends React.Component {
		constructor(props){
			super(props);
			this.state={
				scollCount: 0 
			}
		}
		render() {
			return (
				<div id='iop' className={this.state.scollCount?styles.header1+" "+styles.header:styles.header2+" "+styles.header} >
					<i className={ this.state.scollCount!== 0?styles.myPageMesIcon1:styles.myPageMesIcon2 }>
						<span className={ styles.myPageNoMes }></span>
					</i>
					<p className={ this.state.scollCount!== 0?styles.typeface:'' }>首页</p>
					<i className={ this.state.scollCount !== 0?styles.myPageSetIcon1:styles.myPageSetIcon2 }></i>
				</div>
			)
		}		
		componentWillMount(){
			gaib_State=(i)=>{
				this.setState({scollCount: i})
			}						
		}
		componentDidMount(){
			$(window).scroll(function(){
				var top=$(window).scrollTop()
				if(top>100){					
					gaib_State(1)
				}else{					
					gaib_State(0)
				}
				
			})
		}
	}
	return <Header/>
}


export default Header;