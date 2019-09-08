import React from 'react';
import styles from '../../style/PublicStyle/MaskLayer.css';
import $ from 'jquery'

/*此模块仅用于遮罩，引用时包含于页面根div中，点击后消失。
某次点击事件后出现遮罩，在页面中引入$,事件中添加以下两段代码：
$('#maskbox').css({
	'display':'block'
})
$('body,html').css({
	'overflow':'hidden'
})
遮罩层的z-index：100，在遮罩下的z-index请设置<100,遮罩上的内容z-index请设置>100
*/
/*disappear是在页面中传过来的，在点击遮罩层后需要关闭遮罩层还有其他动作的方法，此方法中对应添加以下两段代码：
$('#maskbox').css({
	'display':'none'
});
$('body,html').css({
	'overflow':''
})
然后添加自己想要的其他方法
*/

var disappear;
class MaskLayer extends React.Component{
	render(){
		disappear = this.props.disappear
		return(
			<div id="maskbox" className={ styles.MaskLayer_box } onClick={ () => disappear(0) }>

			</div>	
		)
	}
	componentDidMount(){
		$('#maskbox').height(document.documentElement.clientHeight);
		// 阻止蒙版后页面滑动
	    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
	    //移动端
	        $("#maskbox").on('touchmove',function(e){
	            e.stopPropagation();
	            e.preventDefault();
	        })
	    }
	}
}

export default MaskLayer