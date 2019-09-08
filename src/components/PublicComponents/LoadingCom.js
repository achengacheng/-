import React from 'react';
import styles from '../../style/PublicStyle/loading.css'
import $ from 'jquery'
var volde=true
const Loading = ({getLoadFun,page,reqFun})=>{
	//getLoadFun 父级通道指向当前this,page 当前页数,reqFun 触发请求
	let _this;volde=true
	class Loading extends React.Component{
		constructor(props) {
	        super(props);
	        this.ptData=this.ptData.bind(this)
	    }
	    ptData(Ydatas){
	    	if(Ydatas){//有无更多数据
	    		//"有数据"
					console.log('有数据')
					volde=true
	    	}else{
				//"无数据"
				volde=false
	    		$('#loading_id').css('opacity','1')
	    		$('#loading_id img').hide()
	    		$('#loading_id p').text('没有更多了')
	    		setTimeout(function(){
	    			$('#loading_id').hide()
	    		},3000)
	    	}
	    }
		render(){
			return(
					<div id='loading_id' className={styles.loading_box}>
						<img src="./src/assets/loading.gif" alt=""/>
						<p>正在加载</p>
					</div>
				)
		}
		componentWillMount(){
			_this=this
			getLoadFun(_this)
		}
		componentDidMount(){
			$(window).scroll(function(){
				var scrolls=$(document).height()-$(window).height()-$(window).scrollTop()
				if(volde){
					if(scrolls<=0){
						volde=false;
						$('#loading_id').css('opacity','1')
						setTimeout(function(){
							let NextPage=page+1
							reqFun(NextPage)
						},100)
					}
				}
			})
		}
		componentWillUnmount(){
			$(window).unbind('scroll');
		}
	}
	return <Loading/>
}
export default Loading
