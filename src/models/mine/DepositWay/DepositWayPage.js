import { routerRedux } from 'dva/router';
import {  Add , Delete , Query , Change } from '../../../services/requestType';

export default{
	namespace:"getUserData",
	state:{
		res_datas:[],
		getBalanceData:'',
		loading:false, // 控制加载状态
    },
	reducers:{
        /*接受初始获取数据给state*/
		getUserCardDatas(state,{ data }){
			return {
				...state,
				res_datas:data.data,
				loading:data.success
			}
		},
		getBalanceData(state,{ data }){
			return {
				...state,
				getBalanceData:data.data,
			}
		},
		setDefaultData(state,{ data }){
			return {
				...state,
				loading: data.success
			}
		}
	},
	effects:{
        /*加载支付方式*/
        *getUserCard({},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'user='+sessionStorage.getItem('id')
            }
			const response = yield Query('/userCards/getUserCardsByUser',reqData)
            yield put({ 
                type: 'getUserCardDatas',
                data: response.data
            })		
		},
		/*提现*/
        *moneyApply({types,money,cb},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'userId='+sessionStorage.getItem('id')+'&type='+types+'&money='+money
            }
			const response = yield Query('/myCenter/withdrawalsApply',reqData)
			if(response.data.success==true){
				cb(response.data.alertMsg.msg,1)
			}else{
				cb(response.data.alertMsg.msg,2)
			}
            // yield put({ 
            //     type: 'getUserCardDatas',
            //     data: response.data
            // })		
		},
		 /*获取余额*/
		 *getBalance({},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'userId='+sessionStorage.getItem('id')
            }
			const response = yield Query('/myCenter/loadBalance',reqData)
            yield put({ 
                type: 'getBalanceData',
                data: response.data
            })		
		},
		/*修改支付宝*/
        *changeAliPay({data,cb},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'id='+data.id+'&cardNO='+data.cardNO+'&cartName='+data.cartName+'&isDefault='+data.isDefault
            }
			const response = yield Query('/userCards/modifyThirdCard',reqData)
			if(response.data.success==true,response.data.success){
				cb('修改成功!',true)
				// setTimeout(function(){
				// 	window.history.go(-1)
				// },1000)
			}else{
				cb(response.data.alertMsg.msg)
			}
		},
		/*新增支付宝*/
        *addAliPay({data,cb},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'user='+sessionStorage.getItem('id')+'&cardNO='+data.cardNO+'&cartName='+data.cartName+'&isDefault='+data.isDefault
            }
			const response = yield Query('/userCards/addThirdCard',reqData)
			if(response.data.success==true){
				cb('绑定成功!',response.data.success)
			}else{
				cb(response.data.alertMsg.msg)
			}
		},
		/*修改银行卡*/
        *changeBank({data,cb},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'id='+data.id+'&cardNO='+data.cardNO+'&cartName='+data.cartName+'&isDefault='+data.isDefault+'&bank='+data.bank+'&bankName='+data.bankName+'&province='+data.province+'&area='+data.area+'&city='+data.city
            }
			const response = yield Query('/userCards/modifyBank',reqData)
			if(response.data.success==true,response.data.success){
				cb('修改成功!',response.data.success)
				// setTimeout(function(){
				// 	window.history.go(-1)
				// },1000)
			}else{
				cb(response.data.alertMsg.msg)
			}
		},
		/*新增银行卡*/
        *addBank({data,cb},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'user='+sessionStorage.getItem('id')+'&cardNO='+data.cardNO+'&cartName='+data.cartName+'&isDefault='+data.isDefault+'&bank='+data.bank+'&bankName='+data.bankName+'&province='+data.province+'&area='+data.area+'&city='+data.city
            }
			const response = yield Query('/userCards/addBankCard',reqData)
			if(response.data.success==true){
				cb('绑定成功!',response.data.success)
			}else{
				cb(response.data.alertMsg.msg)
			}
		},
		 /*修改默认*/
		 *setDefaults({id,cb,index,next},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'id='+id
            }
			const response = yield Query('/userCards/setDefault',reqData)
			
			if(response.data.success==true){
				cb(index,next);
			}
            yield put({ 
                type: 'setDefaultData',
                data: response.data
            })		
		},
		// 跳转到成功页面
		*goBack({addr},{put}) {
			yield put(routerRedux.push(addr))
		}
	},
	subscriptions:{
		setup({ dispatch,history }) {
			history.listen(location => {
				if(location.pathname.includes('ConsumePages')){
					dispatch({
						type:'getUserCard'
					})
					document.title ='提现账号管理';
					window.scrollTo(0,0)
				}
				if(location.pathname.includes('Withdrawals')){
					dispatch({
						type:'getBalance'
					})
					document.title ='申请提现';
					window.scrollTo(0,0)
				}
			})
		}
	}
}