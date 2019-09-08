import { routerRedux } from 'dva/router';
import {  Add , Delete , Query , Change ,FileImg} from '../../../services/requestType';

export default{
	namespace:"afterData",
	state:{
		res_box:[],
		detail_datas:[],
		step_datas:'',
		detail_load:false,
		step_load:false,
		return_data:'',
		res_page:1,
		return_loading:false,
		ossData:'',
		imgBox:[],
		returnReasonData:false,
		loading: false, // 控制加载状态
    },
	reducers:{
        /*接受初始获取数据给state*/
		requstAfter(state,{ data }){
			return {
				...state,
				res_box:state.res_box.length?state.res_box.concat(data.data):data.data,
				loading: data.success
			}
		},
		returnApplys(state,{ data }){
			return {
				...state,
				return_data:data.data,
				return_loading:data.success
			}
		},
		ossApply(state,{ data }){
			return {
				...state,
				ossData:data
			}
		},
		imgBoxs(state,{ data }){
			return {
				...state,
				imgBox:data
			}
		},
		LoadReturnReasonData(state,{ data }){
			return {
				...state,
				returnReasonData:data.data
			}
		},
		getDetailData(state,{ data }){
			return {
				...state,
				step_load:data.success,
				step_datas:data.data
			}
		},
		getApplyData(state,{ data }){
			return {
				...state,
				detail_datas:state.detail_datas.length?state.detail_datas.concat(data.data):data.data,
				detail_load:data.success
			}
		}
	},
	effects:{
		//获取oss密钥
		// *getOss({},{put,}){
		// 	let response= yield Query('/oss/getOssInfo')
		// 	console.log(response.data.data[0],111)
		// 	yield put({ 
		// 		type: 'ossApply',
		// 		data: response.data.data[0]
		// 	})	
		// },
		*getOss({data},{put,call}){//获取oss密钥,地址
			let ossData={}
			let response= yield Query('/oss/getOssCredential')
			try{
				if(response.data.success){
					ossData.Credential=response.data.data
					let responses=yield Query('/oss/getPathInfo')
					if(responses.data.success){
						ossData.pathInfo=responses.data.data
					}
					yield put({ 
						type: 'ossApply',
						data: ossData
					})
					console.log(ossData)
				}
			}catch(err){
				console.log(err)
			}	
		},
		//上传图片
		*pushOssfun({data,dataBox,cb},{put}){	
			let arr=[];
			let response
			if(data){
				for(let i=0;i<data.file.length;i++){
					let obj={};
					obj.Credential=data.Credential;
					obj.pathInfo=data.pathInfo;
					obj.file=data.file[i];
					obj.filename=data.filename[i];
					console.log(obj,444)
					let response= yield FileImg(obj)
					if(response.hasOwnProperty("url")){
						arr.push(response.url)
					}
					console.log(arr,2222)
				}
				// yield put({ 
				// 	type: 'imgBoxs',
				// 	data: arr.join('')
				// })	
				yield put({ 
					type: 'returnApply',
					picBox:arr.join(','),
					data:dataBox,
					cb:cb
				})	
			}					
		},
        /*加载售后服务*/
        *getAfterData({page,rows,cb},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'userId='+sessionStorage.getItem('id')+'&page='+page+'&rows='+rows
            }
			const response = yield Query('/myCenter/loadReturnApply',reqData)
			if(!response.data.data.length&&cb){
				cb()
			}else{
				yield put({ 
					type: 'requstAfter',
					data: response.data
				})	
			}
		},
		/*加载申请记录*/
		*getApply({page,rows,cb},{ put }){
			let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'userId='+sessionStorage.getItem('id')+'&page='+page+'&rows='+rows
            }
			const response = yield Query('/order/loadApply',reqData)
			if(!response.data.data.length&&cb){
				cb()
			}else{
				yield put({ 
					type: 'getApplyData',
					data: response.data
				})	
			}
            
		},
		/*取消退款*/
		*cancelReturn({servId,cb,indexs},{ put }){
			let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'servId='+servId 
            }
			const response = yield Query('/order/cancelReturnApply',reqData)
			if(response.data.success){
				cb('取消成功！',indexs)
			}else{
				cb(response.data.alertMsg.msg)
			}
		},
		/*记录详情*/
		*getDetail({id},{ put }){
			let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'applyId='+id
            }
			const response = yield Query('/order/loadReturnRecord',reqData)
			console.log(response.data)
            yield put({ 
                type: 'getDetailData',
                data: response.data
            })	
		},
		/*退款退货原因*/
		*LoadReturnReason({id},{ put }){
			let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:''
            }
			const response = yield Query('/order/loadReturnReason',reqData)
			if(response){
				yield put({ 
					type: 'LoadReturnReasonData',
					data: response.data
				})	
			}
		},
		/*售后用户信息*/
		*LoadReturnLink({id},{ put }){
			let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'orderId='+id
            }
			const response = yield Query('/order/loadDefaultLink',reqData)
			if(response){
				sessionStorage.setItem('loadDefaultLinkName',response.data.data.consignee)
				sessionStorage.setItem('loadDefaultLinkTel',response.data.data.receivingPhone)
			}
		},
		/*申请退款*/
        *returnMoney({data,cb},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:data
            }
			const response = yield Query('/order/returnMoneyApply',reqData)
			console.log(response.data)
			if(response.data.success==false){
				cb(response.data.alertMsg.msg)
			}else{
				cb(response.data.alertMsg.msg)
				yield put({ 
					type: 'returnApplys',
					data: response.data
				})
			}
		},
		/*申请退货*/
        *returnApply({picBox,data,cb},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:data+'&pictures='+picBox
            }
			const response = yield Query('/order/returnGoodsApply',reqData)
			// console.log(response.data)
			if(response.data.success===false){
				cb(response.data.alertMsg.msg)
			}else{
				cb(response.data.alertMsg.msg)
				// setTimeout(function(){
				// 	window.history.go(-1)
				// },1000)
				yield put({ 
					type: 'returnApplys',
					data: response.data
				})
			}
		},
		
		// 跳转到成功页面
		*goBack({addr},{put}){
			yield put(routerRedux.push(addr))
		}
	},
	subscriptions:{
		setup({ dispatch,history }) {
			history.listen(location => {
				if(location.pathname.includes('AfterIndex')){
					// if(sessionStorage.getItem('afterIndex')==='1'){
						dispatch({
							type:'getAfterData',
							page:1,
							rows:4
						})
					// }else{
						dispatch({
							type:'getApply',
							page:1,
							rows:4
						})
					// }
					// sessionStorage.setItem('afterIndex',1)
					document.title = '售后服务';
					window.scrollTo(0,0)
				}
				if(!location.pathname.includes('AfterIndex')&&!location.pathname.includes('RecordDetails')){
					sessionStorage.setItem('afterIndex',1)
				}
				if(location.pathname.includes('ApplyForReturn')){
					dispatch({
						type:'LoadReturnReason'
					})
					dispatch({
						type:'getOss'
					})
					window.scrollTo(0,0)
				}
				if(location.pathname.includes('AfterRefund')){
					dispatch({
						type:'LoadReturnReason'
					})
					window.scrollTo(0,0)
				}
			})
		}
	}
}