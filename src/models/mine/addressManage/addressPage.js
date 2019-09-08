import { routerRedux } from 'dva/router';
import {  Add , Delete , Query , Change } from '../../../services/requestType';

export default {
	namespace:'AddressPageData',
	state:{
		res_datas:{},
		addrJson:'',
		loading: false, // 控制加载状态
		default:'',
		upLoading:false,
		change:{},
		deleteId:'',
		deleteIndex:'',
		ButtonHint:{
			title:"是否确定删除？",//标题
			type:2,//按钮数1/2
			hide:true//是否展示
		}
	},

	subscriptions:{
		setup({ dispatch,history }) {
			history.listen(location => {
				if(location.pathname.includes('AddressPage')){
					document.title = '地址管理';
					dispatch({
			        	type: 'getAddressData',
			        });
					window.scrollTo(0,0)
				}
			})
		}
	},

	effects: {	
		/*进入后获取原始数据*/
		*getAddressData({},{ put }){
			let reqData={
				method:"POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body:'userId='+sessionStorage.getItem('id')
			}
			const response = yield Query('/address/list',reqData)	
			yield put({ 
				type: 'AddressData',
				data: response.data
			})		
		},
		/*获取地址信息*/
		*getaddrJson({},{ put }){
			let reqData={
				method:"GET"
			}
			const response = yield Query('/src/adress.json',reqData)	
			yield put({
				type: 'AddressJson',
				data: response.data
			})			
		},
		/*修改地址信息*/
		*changeData({data,cb,failCb},{ put }){
			let reqData={
				method:"POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body:'consignee='+data.consignee+'&receivingPhone='+data.receivingPhone+'&postalCode='+data.postalCode+'&province='+data.province+'&city='+data.city+'&area='+data.area+'&detail='+data.detail+'&adrId='+data.adrId+'&defaults='+data.defaults
			}
			const response = yield Query('/address/resetAddress',reqData)
			if(response.data.success==true){
				cb();
			}else{
				failCb(response.data.alertMsg.msg);
			}
		},
		/*新增地址*/
		*addData({data,cb,failCb},{ put }){
			let reqData={
				method:"POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body:'consignee='+data.consignee+'&receivingPhone='+data.receivingPhone+'&postalCode='+data.postalCode+'&province='+data.province+'&city='+data.city+'&area='+data.area+'&detail='+data.detail+'&userId='+data.userId+'&defaults='+data.defaults
			}
			const response = yield Query('/address/addAddress',reqData)	
			if(response.data.success==true){
				cb();
			}else{
				failCb(response.data.alertMsg.msg);
			}
		},
		/*删除地址*/
		*deleteData({data,cb},{ put }){
			let reqData={
				method:"POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body:'adrId='+data
			}
			const response = yield Query('/address/delete',reqData)
			if(response.data.success){
				cb("删除成功")
			}
			// setTimeout(() => {
			// 	window.location.reload()
			// }, 1000);	
		},
		// 修改默认地址
		*changeDefaultAddress({data},{ put }){
			let reqData={
				method:"POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body:'adrId='+data
			}
			const response = yield Query('/address/setDefaults',reqData)	
			// yield put({
			// 	type: 'default',
			// 	data: response.success
			// })
		},
		*goBack({},{put}) {
			if(!!sessionStorage.getItem('AdressURL')){
				yield put(routerRedux.push(sessionStorage.getItem('AdressURL')))
			}else{
				yield put(routerRedux.push('/myPage/AddressPage'))
			}
		}
	},

	reducers: {
		/*接受初始获取数据给state*/
		AddressData(state,{ data }){
			return {
				...state,
				res_datas:data,
				loading: true
			}
		},
		AddressJson(state,{ data }){
			return {
				...state,
				addrJson:data
			}
		},
		changeAddrs(state,{ data }){
			return {
				...state,
				change:data
			}
		}
	}
}