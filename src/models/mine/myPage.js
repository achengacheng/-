import { routerRedux } from 'dva/router';
import {  Query } from '../../services/requestType';

export default {
	namespace:'myPageData',
	state:{
		goodsMesIcons:[
			{src:'src/assets/myPageOrder.png',type:'我的订单',hint:0,to:"/myPage/MyOrder",index:0},
			{src:'src/assets/myPagePayFor.png',type:'待付款',hint:0,to:"/myPage/MyOrder",index:1},
			{src:'src/assets/myPageReceipt.png',type:'待收货',hint:0,to:"/myPage/MyOrder",index:2},
			{src:'src/assets/myPageWillEva.png',type:'待评价',hint:0,to:"/myPage/MyOrder",index:3},
			{src:'src/assets/myPageAfterSale.png',type:'售后服务',hint:0,to:"/mypage/AfterSaleServicePage/AfterIndex"},
			{src:'src/assets/myPageAddress.png',type:'地址管理',hint:0,to:"/myPage/AddressPage"},
			{src:'src/assets/myPageMyLove.png',type:'我的收藏',hint:0,to:"/myPage/LovePage"},
			{src:'src/assets/myPageFootprint.png',type:'我的足迹',hint:0,to:""},
			{src:'src/assets/myPageMyEva.png',type:'我的评价',hint:0,to:"/mypage/EvaPage"},
			{src:'src/assets/myPageCart.png',type:'购物车',hint:0,to:"/ShoppingCart"},
		],
		otherAboutConsEarn:[
			{src:'src/assets/myPageBalance.png',type:'我的余额',msg:'￥9000000.00',hint:0,to:"/myPage/MyBalance"},
			{src:'src/assets/myPageAD.png',type:'我的粮票',msg:'',hint:0,to:"/mypage/AdPage"},
			// {src:'src/assets/myPageConsume.png',type:'我的消费',msg:'',hint:0,to:"/mypage/ConsumePage" },
			{src:'src/assets/myPageDeposit.png',type:'提现账号管理',msg:'',hint:0,to:"/mypage/ConsumePages"},
		],
		otherAboutService:[
			{src:'src/assets/myPageFriends.png',type:'邀请好友',msg:'把艾家公社分享给您的朋友!',to:"/mypage/Invite"},
			{src:'src/assets/myPageService.png',type:'服务中心',msg:'联系客服获取帮助!',to:"/mypage/ServePage"},
			//{src:'src/assets/myPagePhone.png',type:'舌舌网络电话',msg:'点击下载免费打电话!'},
			{src:'src/assets/myPageSetting.png',type:'系统设置',msg:'',to:"/mypage/SystemPage"},
		],
		typeOrder:'',
		userInfo:false,
		money:false,
		orderBubble:false,
		redPacketBubble:0,
		shoppingCartBubble:0,
		errData:false,
		loading:false,
		clientData:false,
	},

	subscriptions:{
		setup({ dispatch,history }) {
			history.listen(location => {
				if(location.pathname.includes('myPage')){
					window.scrollTo(0,0)//回到顶部
					document.title = '我的';
					if(sessionStorage.getItem("id")){
						dispatch({
				        	type: 'getMyData',
				        	payload:sessionStorage.getItem("id")
				        });
					}else{
						dispatch({
		        	type: 'goToLogin'
		        });
					}
				}
				if(location.pathname.includes('Imprint')){
					window.scrollTo(0,0)//回到顶部
					document.title = '我的';
					dispatch({
						type: 'client',
						page:1,
						rows:5
					});
				}
			})
		}
	},

	effects: {
		/*我的主页-进入后获取原始数据*/
		*getMyData( { payload },{ put }){
			sessionStorage.setItem('EvaIndex',1)
			let reqData={"userId":payload}
			const response = yield Query('/myCenter/index',reqData);
			try{
				if (response.data && response.data.success) {
					if(response.data.data.userInfo){
						sessionStorage.setItem('sendTel',response.data.data.userInfo.telephone)
					}
					yield put({
						type: 'myInitData',
						data: response.data.data
					})
				}else if(response.data.alertMsg.code==="300003"){
					yield put({
						type: 'geterrData',
						data: response.data
					})
				}
			}catch(err){
				console.log(err)
			}
		},
		/*系统设置-版本说明*/
		*client( { page,rows },{ put }){
			let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'page='+page+'&rows='+rows+'&client='+'WEIXIN'
            }
			const response = yield Query('/myCenter/versionHistory',reqData);
			if(response){
				yield put({
					type: 'clients',
					data: response.data
				})
				console.log(response.data,22)
			}
		},
	  *goSomeWhere({ payload,index },{call, put}) {
		  if(index||index===0){
			localStorage.setItem('OrderIndex', index)
		  }
		yield put({
			type: 'getDetail',
			data: index
		})
		yield put(routerRedux.push(payload))
		},
		*goToLogin({payload={}},{put}) {//跳转登录页面
			yield put(routerRedux.push('/Login?/myPage'))
		},
		*leftGo({ payload={} },{put}) {//跳转消息
			yield put(routerRedux.push('/mypage/MsgPage'))
		},
		*rightGo({ payload={} },{put}) {//跳转设置
			yield put(routerRedux.push('/mypage/SystemPage'))
		}
	},

	reducers: {
		/*接受初始获取数据给my-state*/
		myInitData(state,{ data }){
			return {
				...state,
				userInfo:data.userInfo,
				money:data.money,
				orderBubble:data.orderBubble,
				redPacketBubble:data.redPacketBubble,
				shoppingCartBubble:data.shoppingCartBubble,
				loading:true
			}
		},
		geterrData(state,{ data }){
			return {
				...state,
				errData:data
			}
		},
		//版本数据
		clients(state,{ data }){
			return {
				...state,
				clientData:data.data
			}
    	},
		getDetail(state,{ data }){
			return {
				...state,
				typeOrder:data
			}
    	}
	},
}
