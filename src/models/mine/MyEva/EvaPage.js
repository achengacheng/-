import { routerRedux } from 'dva/router';
import {  Add , Delete , Query , Change ,FileImg} from '../../../services/requestType';

export default {
	namespace:'EvaPageData',
		state:{
		res_datas:[],
		commented_data:[],
		loading: false, // 控制加载状态
		isComment:false,
		res_page:1,
		headData:'',
		isPut:false,
		ossData:false,
		changeStatusDatas:false
	},
	subscriptions:{
		setup({ dispatch,history }) {
			history.listen(location => {
				if(location.pathname.includes('NewEva')){
					dispatch({
						type:'getOss'
					})
					window.scrollTo(0,0)
				}
				if(location.pathname.includes('EvaPage')){
					// sessionStorage.setItem('EvaIndex',1)
					if(sessionStorage.getItem('EvaIndex')==1){
						dispatch({
							type:'getWaitData',
							rows:6,
							page:1
						})
					}else{
						dispatch({
							type:'getCommentedData',
							rows:2,
							page:1
						})
					}
					document.title = '我的评价';
					window.scrollTo(0,0)
				}
			})
		}
	},
	effects: {
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
					type: 'putData',
					picBox:arr.join(','),
					data:dataBox,
					cb:cb
				})	
			}					
		},
		/*未评论数据*/
		*getWaitData({page,rows,cb},{ put }){
			let reqData={
				method:"POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body:'userId='+sessionStorage.getItem('id')+'&page='+page+'&rows='+rows
			}
			const response = yield Query('/myCenter/loadWaitComment',reqData)
			if(!response.data.data.length&&page!=1){
				cb()
			}else{
				yield put({
					type: 'getWait',
					data: response.data
				})
			}
		},
		/*上传评论数据*/
		*putData({data,cb,picBox},{ put }){
			let reqData={
				method:"POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body:data+'&proPicIds='+picBox
			}
			const response = yield Query('/comment/commentGoods',reqData)
			if(response.data.success){
				cb('评论成功!',1)
			}else{
				cb(response.data.alertMsg.msg,0)
			}
			// yield put({
			// 	type: 'isPut',
			// 	data: response.data
			// })
        },
        /*已评论数据*/
		*getCommentedData({page,rows,cb},{ put }){
			let reqData={
				method:"POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body:'userId='+sessionStorage.getItem('id')+'&page='+page+'&rows='+rows
			}
			const response = yield Query('/myCenter/loadCommented',reqData)
			if(!response.data.data.length&&page!=1){
				cb()
			}else{
				yield put({
					type: 'getCommented',
					data: response.data
				})
			}
		},
		*goBack({},{put}) {
			yield put(routerRedux.push('/myPage/AddressPage'))
		},
		//c修改状态
		*changeStatus({},{ put }){
			yield put({
				type: 'changeStatusData',
			})
        },
	},

	reducers: {
		/*接受初始获取数据给state*/
		getWait(state,{ data }){
			return {
				...state,
				res_datas:state.res_datas.length?state.res_datas.concat(data.data):data.data,
				headData:data.total,
				loading:data.success
			}
        },
        getCommented(state,{ data }){
			return {
				...state,
				commented_data:state.commented_data.length?state.commented_data.concat(data.data):data.data,
				headData:data.total,
                isComment:data.success
			}
		},
		isPut(state,{ data }){
			return {
				...state,
				res_datas:data,
				isPut:data.success
			}
		},
		changeStatusData(state,{ data }){
			return {
				...state,
				changeStatusDatas:!state.changeStatusDatas,
			}
		},
		ossApply(state,{ data }){
			return {
				...state,
				ossData:data
			}
		},
	}
}
