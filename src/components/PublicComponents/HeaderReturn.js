import React from 'react';
import styles from '../../style/PublicStyle/HeaderReturn.css'
import $ from 'jquery';
import { Link } from 'dva/router'

const HeaderReturn=({left_show,head_title,header_ids,right_fun,custom,isMove})=>{
	//后退键0隐藏,1显示,头部文字,右边样式id,右边需要的方法
	//custom 自定义值,传入json对象,例:{id:0,val:'自定义值'}id为标识值
	//standardTab 弹窗提示
	var shoppingCartEdit_id,love_id,storage,isLove,leaveEva,bank,ordersuccess;
	function shoppingCartEdit(e) {//购物车样式
		if(shoppingCartEdit_id){
			right_fun(0)
		}else{
			right_fun(1)
		}
	}
	function ordersuccess(){
		window.location.href=+'#/'
	}
	if(custom){
		switch(parseInt(custom.id)){
			case 0:
				shoppingCartEdit_id=custom.val.cart_edit_id
				break;
			case 14:
				love_id=custom.val;
				break;
			case 2:
				storage=custom.val;
				break;
			case 6:
				leaveEva=custom.val;
				break;
			case 1:
				shoppingCartEdit_id=custom.val;
				break;
			case 3:
				bank=custom.val;
				break;
			case 4:
				ordersuccess=custom.val;
				break;		
			default:
				break;
		}
	}
	function ifLoginOrshpping(){
		let usersId=sessionStorage.getItem('id')
		if (usersId===""||usersId===undefined||usersId===null) {
			window.location.href='#/Login?/ShoppingCart'
		}else{
			window.location.href='#/ShoppingCart'
		}
	}
	function left_click(){
		let useID=sessionStorage.getItem('id')
		if(useID===""||useID===undefined||useID===null){
			window.location.href='#/Login?/mypage/MsgPage'
		}else{
			window.location.href='#/mypage/MsgPage'
		}
	}
	function goBack(){
		if(leaveEva){
			sessionStorage.removeItem("commentDetailsHeight");
			window.history.go(-1)
		}else if(bank===0){
			window.location.href="#/"
		}else if(sessionStorage.getItem('boundCompanyId')){
			if(window.location.href.indexOf("boundCompanyId") != -1 ){
				window.location.href="#/"
			}else{
				window.history.go(-1)
			}
		}else{
			window.history.go(-1)
		}
	}
	const Right_head=({right_id})=>{
		let i=parseInt(right_id)
		switch(i){
			case 0:/*红色文字*/
				return(<p className={styles.headerReturn_right_bc} onClick={storage}>完成</p>);
				break;
			case 1:
				return(<p>确认</p>);
				break;
			case 2:/*艾家首页点击进入全部艾家*/
				return(<p className={styles.headerReturn_right_bc} onClick={()=>right_fun('AllAJ')}>全部</p>);
				break;
			case 3:/*搜索图标*/
				return(<i className={styles.headerReturn_right_search} onClick={()=>right_fun()}></i>) ;
				break;
			case 4:/*购物车图标*/
				return(<i className={styles.headerReturn_right_car} onClick={ifLoginOrshpping}>
							<span className={ `${styles.hasGoodsInCart} ${sessionStorage.getItem('scNO')?'':styles.headerReturn_back1} ${sessionStorage.getItem('scNO')==='0'?styles.headerReturn_back1:''}` }>{sessionStorage.getItem('scNO')>=9?'9+':sessionStorage.getItem('scNO')}</span>
						</i>);
				break;
			case 5:/*圆圈+？的说明图标*/
				return(<i className={styles.headerReturn_right_explain}></i>);
				break;
			case 6:/*分享和收藏图标*/
				return(
					<div>
						<i id='wxShare' className={styles.headerReturn_right_share}></i>
						<i id="love" className={styles.headerReturn_right_love} onClick={()=>right_fun('no')}></i>
						<i id="love2" className={styles.headerReturn_right_love2} onClick={()=>right_fun('has')}></i>
					</div>
				);
				break;
			case 7:/*购物车编辑*/
				return(
					<p className={styles.shoppingCart} id='cart_edit' onClick={shoppingCartEdit}>{shoppingCartEdit_id?'完成':'编辑'}</p>
				);
				break;
			case 8:/*分享和购物车图标*/
				return(
					<div>
						<i id='wxShare' className={styles.headerReturn_right_share}></i>
						<i className={styles.headerReturn_right_car} onClick={ifLoginOrshpping}>
							<span className={ `${styles.hasGoodsInCart} ${sessionStorage.getItem('scNO')?'':styles.headerReturn_back1} ${sessionStorage.getItem('scNO')==='0'?styles.headerReturn_back1:''}` }>{sessionStorage.getItem('scNO')>=9?'9+':sessionStorage.getItem('scNO')}</span>
						</i>
					</div>
				);
				break;
			case 9:/*分享图标*/
				return(
						<i id='wxShare' className={styles.headerReturn_right_share2}></i>
				);
			case 10:/*购物车编辑*/
				return(
					<p className={styles.shoppingCart} onClick={ordersuccess}>完成</p>
				);
			case 11:/*红色文字*/
				return(<p className={styles.headerReturn_right_bc1} onClick={()=>right_fun()}>完成</p>);
				break;
			case 12:/*客服图标*/
				return(
					<a href="http://hb358.udesk.cn/im_client?web_plugin_id=23078" className={styles.headerReturn_right_service}>
					</a>
				);
			case 13:/*清空*/
				return(
						<p className={styles.shoppingCart}>清空</p>
				);
			case 14:/*我的收藏编辑*/
				return(
					<p className={styles.shoppingCart} onClick={() => right_fun(love_id)} id="loveHeader">{love_id?'完成':'编辑'}</p>
				);
				break;
			case 15:/*我的收藏编辑*/
				return(<div>
						<i className={`${styles.headerReturn_right_search} ${styles.classifyHeadIcon}`} onClick={()=>right_fun('/SearchPage')}></i>
						<i className={styles.headerReturn_right_car} onClick={ifLoginOrshpping}>
							<span className={ `${styles.hasGoodsInCart} ${sessionStorage.getItem('scNO')?'':styles.headerReturn_back1} ${sessionStorage.getItem('scNO')==='0'?styles.headerReturn_back1:''}` }>{sessionStorage.getItem('scNO')>=9?'9+':sessionStorage.getItem('scNO')}</span>
						</i>
					</div>
						)
				break;
			case 16:/*个人信息编辑*/
				return(
					<p className={styles.shoppingCart} id='cart_edit' onClick={shoppingCartEdit}>{shoppingCartEdit_id?'保存':'编辑'}</p>
				);
				break;
			case 17:/*收藏图标*/
				return(
					<div>
						<i id="love" className={styles.headerReturn_right_love} onClick={()=>right_fun('no')}></i>
						<i id="love2" className={styles.headerReturn_right_love2} onClick={()=>right_fun('has')}></i>
					</div>
				);
				break;
			case 18:/*专题评价处*/
				return(<p className={styles.headerReturn_right_bc1} onClick={()=>right_fun('/SpecialPage/SpecialFillComment')}>写评论</p>);
				break;
			case 19:/*旧版订单*/
				return(
						<a href={'http://www.ccajgs.com/order/index.php/Home/Index/index?tel='+sessionStorage.getItem('sendTel')} className={styles.historyOrder}>旧版订单</a>
				);
				break;
			case 20:/*旧版粮票*/
				return(
						<div className={styles.oldRat}>
							<a href={'http://www.ccajgs.com/order/index.php/Home/Index/myAdvertising?tel='+sessionStorage.getItem('sendTel')} className={styles.historyOrder}>旧版粮票</a> 
							<Link to='/mypage/ServePage/HelpContent/5b2b89f1a8a9262fbc9dddaa' className={styles.headerReturn_right_explain}>
							</Link>
						</div>
				);
				break;
			case 21:/*评价说明*/
				return(
						<Link to='/mypage/ServePage/HelpContent/5b2b89fba8a9262fbc9dddab' className={styles.headerReturn_right_explain}>
						</Link>
				);
				break;
			case 22:/*余额说明*/
				return(
						<Link to='/mypage/ServePage/HelpContent/5b2b89d7a8a9262fbc9ddda8' className={styles.headerReturn_right_explain}>
						</Link>
				);
				break;
			case 23:/*提现说明*/
				return(
						<Link to='/mypage/ServePage/HelpContent/5b2b89e7a8a9262fbc9ddda9' className={styles.headerReturn_right_explain}>
						</Link>
				);
				break;
			case 24:/*提现说明*/
				return(<div>
					<i className={`${styles.headerReturn_right_search} `} onClick={()=>right_fun('/SearchPage')}></i>
				</div>
					)
				break;
			default:
				return(<div></div>);
				break;
		}
	}
	const LeftIcon=({leftshow})=>{
		if(parseInt(leftshow)){
			if(parseInt(leftshow)===1){
				return(<i className={styles.headerReturn_back} onClick={()=>goBack()}></i>)
			}else{
				return(<i className={styles.myPageMesIcon1} onClick={left_click}>
						{/* <span className={styles.myPageHasMes}></span> */}
						<span className={styles.myPageNoMes}></span>
					</i>)
			}

		}else{
			return(<i className={styles.headerReturn_back1}></i>)
		}
	}
	class HeaderReturn extends React.Component{
		render(){
			return(
					<header className={styles.headerReturn_box} id="headerReturn">
						<LeftIcon leftshow={left_show} />
						<p className={styles.headerReturn_text}>{head_title}</p>
						<div className={styles.headerReturn_rightbox}>
							<Right_head right_id={header_ids}/>
						</div>
					</header>
				)
		}
	}
	return <HeaderReturn/>
}

export default HeaderReturn;
