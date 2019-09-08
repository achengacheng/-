import React from 'react';
import styles from '../../style/PublicStyle/popUp.css';

const ButtonPop = ({ ButtonHint,confirm,cancel,TrueText}) => {
	/*ButtonHint数据结构
	const ButtonHint = {
		title:"这是一个标题",//标题
		explain:"这是个有按钮文字提示框的样式",//说明文字-单行/多行
		type:1,//按钮数1/2
		hide:false/true//是否展示
	}*/
	// confirm为确定执行的方法，自己按需传入
	return (
		<div className={`${styles.wrap} ${ButtonHint.hide?styles.hide:''}`}>
			<div className={ `${styles.btn_PopContainer} ` }>
				<h5 className={styles.htitle}>{ ButtonHint.title }</h5>
				<p>{ ButtonHint.explain }</p>
				<div className={ ButtonHint.type===1?styles.center:'' }>
					<button className={styles.btnLeft} onClick={confirm}>{TrueText?TrueText.one:'确定'}</button>
					<button className={ `${styles.btnRight} ${ButtonHint.type===1?styles.hide:''}` } onClick={cancel}>{TrueText?TrueText.two:'取消'}</button>
				</div>
			</div>
		</div>
		
	)
}

export default ButtonPop;