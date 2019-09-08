import {  Add , Delete , Query , Change } from '../../services/requestType.js'
import { routerRedux } from 'dva/router';
import {wxShare} from '../../services/weixinPay'
export default{
	namespace:"SpecialPageData",
	state:{
		typeAllList:false,		//专题分类
		allDetailList:false,	//专题列表
		DetailId:false,			//专题Id
		DetailData:false,		//专题详情
		shareMsg:false,			//分享规则
		DetailComment:false,	//详情精选评论
		RelateTheme:false,  	//推荐专题
		CommentALLData:false,	//全部评论
		userData:false,			//用户信息
		ComDetail:false,		//评论详情
		Nindex:0,				//分类选中
		ThemePage:false
	},
	reducers:{
		ThemeClass(state,{data}){
			return {
				...state,
				typeAllList:data.typeAllList,
				allDetailList:data.allDetailList
			}
		},
		ThemeList(state,{data}){
			return {
				...state,
				allDetailList:data
			}
		},
		SpecialDetail(state,{id,data}){
			return {
				...state,
				DetailId:id,
				DetailData:data.data,
				shareMsg:data.shareMsg
			}
		},
		getDetailComment(state,{data}){
			return {
				...state,
				DetailComment:data
			}
		},
		getRelateTheme(state,{data}){
			return {
				...state,
				RelateTheme:data,
				ThemePage:1
			}
		},
		getCommentALLData(state,{data}){
			return {
				...state,
				CommentALLData:data
			}
		},
		getuserData(state,{data}){
			return {
				...state,
				userData:data
			}
		},
		getComDetail(state,{data}){
			return {
				...state,
				ComDetail:data
			}
		}
	},
	effects:{
		*getThemeClass({},{call,put}){//获取所有专题分类
			let response= yield Query('/theme/index')
			if(response){
				if(response.data.success){
					yield put({type:'ThemeClass',data:response.data.data[0]})
				}
			}

		},
		*getDetailByTypeId({data,d_this},{call,put}){//以分类查专题
			let response,padFun=d_this.changeData
			if(data==0){
				response= yield Query('/theme/getDetailByTypeId')//全部专题
			}else{
				response= yield Query('/theme/getDetailByTypeId?id='+data) //分类专题
			}
			try{
				if(response.data.success){
					padFun(response.data.data)
				}
			}catch(err){
				console.log(err)
			}
			// if(response.data.success){
			// 	if(response.data.data.length>0){
			// 		let datas={list:response.data.data}
			// 		yield put({type:'ThemeList',data:datas})
			// 	}else{
			// 		yield put({type:'ThemeList',data:false})
			// 	}
			// }else{
			// 	yield put({type:'ThemeList',data:false})
			// }
		},
		*goSpecialDetail({data},{put}){//跳转专题详情
			if(data!==""&&data!==undefined&&data!==null){
				yield put(routerRedux.push({pathname:'/SpecialPage/SpecialDetail/'+data}))
			}
		},
		*goToSomeWhere({ data },{put}){//根据路由跳转
			yield put(routerRedux.push(data))
		},
		*putSpecialDetail({u_id,datas},{call,put}){ //专题详情
			if(datas!=""&&datas!=undefined&&datas!=null){
				let response=yield Query('/theme/getDetailById?userId='+u_id+"&themeDetailId="+datas)
				if(response.data.success){
					yield put({
						type:'SpecialDetail',
						id:datas,
						data:response.data,
					})
					yield put({type:'commentFun',datas:datas})
				}
			}
		},
		*commentFun({datas},{put}){//获取专题详情精选评论
			let response=yield  Query('/theme/getWonderfulCommentById?id='+datas)
			if(response){
				if(response.data.success){
					yield put({type:'getDetailComment',data:response.data.data})
					yield put({type:'RelateTheme',datas:datas,page:1})
				}
			}
		},
		*RelateTheme({datas,page,reDataFun},{put,select}){//获取专题详情推荐专题
			let SpecialPageData = yield select(state => state.SpecialPageData);
			if(page!==SpecialPageData.ThemePage){
				let response=yield  Query('/theme/getRelateTheme?themeDetailId='+datas+'&page='+page+"&max=4")
				if(response){
					if(response.data.success){
						if(SpecialPageData.RelateTheme){
							let NewData=SpecialPageData.RelateTheme.relate_themes.concat(response.data.data.relate_themes)
							let newtotal=SpecialPageData.RelateTheme.total+response.data.data.total
							response.data.data.relate_themes=NewData
							response.data.data.total=newtotal
							yield put({type:'getRelateTheme',data:response.data.data})
						}else{
							yield put({type:'getRelateTheme',data:response.data.data})
						}
						if(reDataFun){
							if(response.data.data.length<4){
								reDataFun(true)
							}else{
								reDataFun(false)
							}
						}
					}
				}
			}
			
		},
		*allcomment({datas},{put}){//全部评论
			let reqData={
				method: "POST",
	            mode: "cors",
	            headers: {
	                "Content-Type": "application/x-www-form-urlencoded"
	            },
				 body:"id="+datas+"&page=1&max=10"
			}
			let response= yield Query('/theme/getCommentById',reqData)

			if(response){
				if(response.data.success){
					yield put({type:"getCommentALLData",data:response.data.data})
				}
			}
		},
		*loveFunrep({data,loca,popFun,loveType},{put}){//收藏
			let usersId=sessionStorage.getItem('id')
			if(usersId){
				let reqData={
					method: "POST",
		            mode: "cors",
		            headers: {
		                "Content-Type": "application/x-www-form-urlencoded"
		            },
					 body:"userId="+usersId+"&collection_id="+data+"&type=2"
				}
				let response= yield Query('/userCollection/collection',reqData)
				if (response) {
					if (response.data.success){
						popFun(true,loveType)
					}else{
						popFun(false,loveType)
					}
				}
			}else{
				let geloca=loca.pathname+loca.search
				yield put(routerRedux.push({pathname:'/Login',search:geloca}))
			}
		},
		*putFillCommet({data,loca,d_this},{put}){ //发表评论/comment/commentTheme
			let usersId=sessionStorage.getItem('id')
			let fillFalush=d_this.fillFalush
			if(usersId){
				let reqData={
					method: "POST",
		            mode: "cors",
		            headers: {
		                "Content-Type": "application/x-www-form-urlencoded"
		            },
					 body:"userId="+usersId+"&id="+data.id+"&content="+data.content+"&audit="+data.audit
				}
				let response= yield Query('/comment/commentTheme',reqData)
				if(response){
					if(response.data.success){
						fillFalush(true,data.id)
					}else{
						fillFalush(false)
					}
				}
			}else{
				let geloca=loca.pathname+loca.search
				yield put(routerRedux.push({pathname:'/Login',search:geloca}))
			}
		},
		*getUserText({data},{put}){ //获取用户昵称
			let response= yield Query('/myCenter/index?userId='+data)
			try{
				if(response.data.success){
					yield put({type:'getuserData',data:response.data.data.userInfo})
				}
			}catch(err){
				console.log(err)
			}
		},
		*backSpecial({},{put}){ //无id 返回专题列表
			yield put(routerRedux.push({pathname:'/SpecialPage',search:'back'}))
			let response= yield Query('/theme/index')
			if(response){
				if(response.data.success){
					yield put({type:'ThemeClass',data:response.data.data[0]})
				}
			}
		},
		*goLogin({loca},{put}){
			let geloca=loca.pathname+loca.search
			yield put(routerRedux.push({pathname:'/Login',search:geloca}))
		},
		*CommentdDetail({data,usersId},{put}){//评论详情
			let reqData={
					method: "POST",
		            mode: "cors",
		            headers: {
		                "Content-Type": "application/x-www-form-urlencoded"
		            },
					 body:"userId="+usersId+"&commentId="+data
				}
			let response= yield Query('/comment/getDetailById',reqData)
			try{
				if(response.data.success){
					yield put({type:'getComDetail',data:response.data.data})
				}
			}catch(err){
				console.log(err)
			}
		},
		*hFcomment({comId,userId,val,loca,hfID},{put}){//回复评论
			let bodydata
			if(hfID){
				bodydata="userId="+userId+"&commentId="+comId+"&replyContent="+val+"&parentId="+hfID
			}else{
				bodydata="userId="+userId+"&commentId="+comId+"&replyContent="+val
			}
			let reqData={
					method: "POST",
		            mode: "cors",
		            headers: {
		                "Content-Type": "application/x-www-form-urlencoded"
		            },
					body:bodydata
				}
			let response= yield Query('/comment/saveReply',reqData)
			try{
				if(response.data.success){
					let CommentID=loca.search.substring(1)
					let usersId=sessionStorage.getItem('id')
					yield put({type:'CommentdDetail',data:CommentID,usersId:usersId})
				}
			}catch(err){
				console.log(err)
			}
		},
		*wxShareFun({data,fxFun},{put}){ //分享
			yield wxShare(data,fxFun)
		}
	},
	subscriptions:{
		setup({dispatch, history}) {
			history.listen(location => {
				if(location.pathname==='/SpecialPage'){
					document.title = '专题';
					let speID=location.search.substring(1)
					if(speID!==''&&speID!==undefined&&speID!==null){
						dispatch({
							type:"getThemeClass"
						})
						dispatch({
							type:'getDetailByTypeId',
							data:speID
						})
					}else{
						dispatch({
							type:"getThemeClass"
						})
					}
					window.scrollTo(0,0)
				}else if(location.pathname.includes('SpecialDetail')){
					document.title = '专题详情';
					let usersId=sessionStorage.getItem('id')
					let spadID=location.pathname.split('/')[location.pathname.split('/').length-1]
					/*父级id 商家id 存储*/
					if(location.search){
						let parentId=location.search.split('&')[0].split('=')[1]
						let boundCompanyId=location.search.split('&')[1].split('=')[1]
						if(parentId){
							sessionStorage.setItem('parentId',parentId)
						}
						if(boundCompanyId){
							sessionStorage.setItem('boundCompanyId',boundCompanyId)
						}
					}
					/*end*/
					dispatch({
						type:"putSpecialDetail",
						datas:spadID,
						u_id:usersId
					})

					window.scrollTo(0,0)
				}else if(location.pathname.includes('SpecialAllComment')){
					document.title = '全部评论';
					let spadID=location.search.substring(1)
					dispatch({
						type:"allcomment",
						datas:spadID
					})
					window.scrollTo(0,0)
				}else if(location.pathname.includes('SpecialFillComment')){
					document.title = '填写评论';
					let usersId=sessionStorage.getItem('id')
					if(usersId){
						dispatch({
							type:'getUserText',
							data:usersId
						})
					}else{
						dispatch({
							type:"goLogin",
							loca:location
						})
					}

					window.scrollTo(0,0)
				}else if(location.pathname.includes('SpecialCommentDetail')){
					document.title = '评论详情';
					let CommentID=location.search.substring(1)
					let usersId=sessionStorage.getItem('id')
					if(CommentID){
						if(usersId){
							dispatch({
								type:'CommentdDetail',
								data:CommentID,
								usersId:usersId
							})
						}else{
							dispatch({
							type:"goLogin",
							loca:location
						})
						}
					}
				}
			})
		}
	}
}
