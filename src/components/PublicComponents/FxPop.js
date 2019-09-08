import React from 'react';
import styles from '../../style/PublicStyle/MaskLayer.css';
import $ from 'jquery'

const FxPop=({FxDomFun})=>{
	class FxPop extends React.Component{
		constructor(props) {
	        super(props);
	        this.fxPopfun = this.fxPopfun.bind(this);
	    }
	    fxPopfun(op){
	    	if(op){
	    		$('#fxpopBox').show()	
	    	}else{
	    		$('#fxpopBox').hide()
	    	}
	    }
		render(){
			return (<div id="fxpopBox" className={styles.MaskLayer_box1}>
						<div className={styles.fxpopsBox}>
							<img src="./src/assets/wxFxicon.png"/>
							<div className={styles.fxpopsBg}>
								<p>点击右上角<br/>发送到 好友 或 分享到朋友圈 </p>
								<div>								
									<img src="./src/assets/wxFxicon2.png"/>
									<img src="./src/assets/wxFxicon1.png"/>
								</div>
							</div>	
						</div>	
					</div>)
		}
		componentWillMount(){
			FxDomFun(this)
		}
		componentDidMount(){
			$('#fxpopBox').click(function(){
				$(this).hide()
			})
			$('#fxpopBox').height(document.documentElement.clientHeight);
			// 阻止蒙版后页面滑动
		    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
		    //移动端
		        $("#fxpopBox").on('touchmove',function(e){
		            e.stopPropagation();
		            e.preventDefault();
		        })
		    }
		}
	}
	return <FxPop/>
}
export default FxPop