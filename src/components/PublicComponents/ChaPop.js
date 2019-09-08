import React from 'react';
import styles from '../../style/PublicStyle/popUp.css';
import $ from 'jquery'
// 外部调用定义该方法 传入这个组件使用,
// function HintWords(popDom){
// 		console.log(popDom)
// 		自定义名=popDom.Popfun  这是一个方法
//		自定义名(data,hasIcon)
//    data是提示文字；hasIcon是是否需要√/×小图标，需要√则传入字符串'success'，需要×则传入字符串'fall',不需要就不传
// 	}
const ChaPop = ({HintWords}) => {
	class ChaPop extends React.Component{
		constructor(props) {
	        super(props);
	        this.Popfun = this.Popfun.bind(this);
	    }
	    Popfun(data,hasIcon){
			if(hasIcon){
				if(hasIcon === 'success'){
					$('.'+styles.successIcon).show()
					$('.'+styles.fallIcon).hide()
				}else{
					$('.'+styles.successIcon).hide()
					$('.'+styles.fallIcon).show()
				}
			}else{
				$('.'+styles.successIcon).hide()
				$('.'+styles.fallIcon).hide()
			}
			if (data.length>10){
				$('.popText').parent('div').css('width','82%')		
			}	
	    	$('.popText').text(data)
	    	$('.'+styles.cha_PopContainer).fadeIn(300).delay(3000).fadeOut(300)
	    }
		render(){
			return (
				<div className={ `${styles.cha_PopContainer} ${styles.hide}` }>
					<div className={ styles.successIcon }></div>
					<div className={ styles.fallIcon }></div>
					<p className='popText'></p>
				</div>
			)
		}
		componentWillMount(){
			HintWords(this)
		}
	}
	return <ChaPop/>
}

export default ChaPop;
