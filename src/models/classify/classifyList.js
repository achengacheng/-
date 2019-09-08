import { routerRedux } from 'dva/router';
import {  Query } from '../../services/requestType';

export default {
	namespace:'ClassifyListData',
	state:{
		res_list_datas:false,
		res_filt_datas:false,
		classshareMsg:false,
		classifyName:false,
		isHome:true,
	},

	subscriptions:{
		setup({ dispatch,history }) {
			history.listen(location => {
				if(location.pathname.includes('ClassifyList')){
					sessionStorage.removeItem("filtParams");
					sessionStorage.removeItem("filtMenuIds");
					sessionStorage.removeItem("filtDeliveries");
					sessionStorage.removeItem("filtSkus");
					sessionStorage.removeItem("type");
					sessionStorage.removeItem("price");
					dispatch({
	        			type: 'veryStart'
	        		});
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
					let menuId = location.pathname.slice(location.pathname.lastIndexOf('/')+1);
					if(location.hash ==='#home'){
						let data = {
							menuId:menuId,
							page:1,
							max:10,
							ishome:false,
							fsxz:true,
						};
						dispatch({
							type:'cuxiaoData',
							datas:data,
							ishome:false
						})
					}else{
						let data = {
							menuId:menuId,
							fsxz:true,
							page:1,
							max:10,
							ishome:true
						};
						dispatch({
				        	type: 'getListData',
				        	payload:data,
				        	ishome:true
				        });
				        dispatch({
				        	type: 'getFiltData',
				        	payload:menuId,
				        	ishome:true
				        });
					}
					window.scrollTo(0,0)//回到顶部
				}
			})
		}
	},

	effects: {
		*cuxiaoData({datas,ishome},{put}){
			let response = yield Query('/promotion/getPromotionGoods',{id:datas.menuId,page:datas.page,max:datas.max,up:datas.up?datas.up:''});
			try{
				if(response.data.success){
					if(datas.fsxz){						
						yield put({
								type: 'listInitData',
								data:response.data.data.goodsList,
								shareMsg: response.data.shareMsg,
								classifyName:response.data.data.promotionName?response.data.data.promotionName:'艾家促销',
								ishome:ishome
							})
					}else{
						let getPages=datas._this.getPage
						if(response.data.data.goodsList.length<datas.max){
							getPages(false,response.data.data.goodsList,datas.page);
						}else{
							getPages(true,response.data.data.goodsList,datas.page);
						}
					}

				}
			}catch(err){
				console.log(err)
			}
		},
		/*进入后获取列表原始数据*/
		*getListData({ payload,ishome},{ put }){
			let reqData={"menuIds":payload.menuId,"page":payload.page,"max":payload.max}
			if(payload.up){
				reqData["up"]=payload.up
			}
			if(payload.deliveries){
				reqData["deliveries"]=payload.deliveries
			}
			if(payload.skus){
				let daarray='',puts=''
				for(var i=0;i<payload.skus.length;i++){
					if(i===payload.skus.length-1){
						daarray=daarray+JSON.stringify(payload.skus)
					}else{
						daarray=daarray+JSON.stringify(payload.skus)+','
					}
					puts='['+daarray+']'
				}
				reqData["skus"]=puts
			}
			const response = yield Query('/menu/filterGoodsV1',reqData);
			if (response.data && response.data.success) {
				if(payload.fsxz){
					yield put({
						type: 'listInitData',
						data: response.data.data,
						shareMsg: response.data.shareMsg,
						classifyName:response.data.menuName,
						ishome:ishome
					})
				}else{
					let getPages=payload._this.getPage
					if(response.data.data.length<payload.max){
						getPages(false,response.data.data,payload.page);
					}else{
						getPages(true,response.data.data,payload.page);
					}
				}
			}else{
				console.log('调用失败')
			}
		},
		/*进入后获取筛选原始数据*/
		*getFiltData({ payload ,ishome},{ put }){
			let reqData={"menuId":payload}
			const response = yield Query('/menu/filterData',reqData);
			if (response.data && response.data.success) {
				yield put({
					type: 'filtInitData',
					data: response.data.data,
					ishome:ishome
				})
			}else{
				console.log('调用失败')
			}
		},
	   *goToGoodsDetails({ payload },{put}) {
			console.log(payload)
			yield put(routerRedux.push(payload))
		}
	},

	reducers: {
		/*接受初始获取数据给list-state*/
		listInitData(state,{ data ,shareMsg,classifyName,ishome }){
			return {
				...state,
				res_list_datas:data,
				classshareMsg:shareMsg,
				classifyName:classifyName,
				isHome:ishome
			}
		},
		/*接受初始获取数据给filt-state*/
		filtInitData(state,{ data,ishome}){
			return {
				...state,
				res_filt_datas:data,
				isHome:ishome
			}
		},
		/*刚进入的时候重新赋值*/
		veryStart(state,{}){
			return {
				...state,
				res_list_datas:false,
				res_filt_datas:false,
				classshareMsg:false,
				classifyName:false
			}
		}
	}
}
