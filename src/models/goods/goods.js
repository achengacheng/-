
import { routerRedux } from 'dva/router';
import {  Add , Query } from '../../services/requestType';
import { wxShare } from '../../services/weixinPay'
var Swiper=require('../../../node_modules/swiper/dist/js/swiper.js')

export default {
	namespace:'goodsData',
	state:{
		res_goods_datas:false,
		res_special_datas:false,
		res_eva_data:false,
		userMsg:false,
		hasGoods:true,
		res_imageText_datas:false,
		goodsShareMsg:false
	},
	reducers: {
		/*刚进入的时候重新赋值hasGoods*/
		veryStart(state,{}){
			return {
				...state,
				res_goods_datas:false,
				res_special_datas:false,
				res_eva_data:false,
				userMsg:false,
				hasGoods:true,
				res_imageText_datas:false
			}
		},
		/*调用失败时*/
		hasGoods(state,{ data }){
			return {
				...state,
				hasGoods:data
			}
		},
		/*接受初始获取数据给goods-state*/
		goodsInitData(state,{ data,shareMsg }){
			return {
				...state,
				res_goods_datas:data,
				userMsg:data.userMsg,
				goodsShareMsg:shareMsg
			}
		},
		/*接受初始获取数据给special-state*/
		specialInitData(state,{ data }){
			return {
				...state,
				res_special_datas:data,
			}
		},
		/*接受初始获取数据给eva-state*/
		evaInitData(state,{ data }){
			return {
				...state,
				res_eva_data:data,
			}
		},
		/*获取评价等级*/
		levelEvaInitData(state,{ data }){
			return {
				...state,
				levelEva:data,
			}
		},
		/*获取有图评价*/
		picEvaInitData(state,{ data }){
			return {
				...state,
				picEva:data,
			}
		},
		/*获取独立图文详情*/
		imgTextInitData(state,{ data }){
			return {
				...state,
				res_imageText_datas:data,
			}
		}
	},
	effects: {
		/*商品介绍-进入后获取原始数据*/
		*getGoodsData( { payload },{ put }){
			console.log(payload,1234561)
			let reqData = {"goodsId":payload.goodsId,"userId":payload.userId}
			const response = yield Query('/goods/getGoodsDetailV1',reqData);
			console.log('返回',response)
			if (response.data && response.data.success) {
				yield put({
					type: 'goodsInitData',
					data: response.data.data,
					shareMsg:response.data.shareMsg
				})
			}else{
				console.log('调用失败',response.data)
				yield put({
					type: 'hasGoods',
					data:response.data.success
				})
			}
		},
		/*相关专题-进入后获取原始数据*/
		*getSpecialData( { payload },{ put }){
			let reqData={"goodsId":payload.goodsId,"page":payload.page,"max":payload.max}
			const response = yield Query('/goods/getGoodsThemes',reqData);
			if (response.data && response.data.success) {
				// console.log('专题',response.data)
				if(payload.fsxz){
					yield put({
						type: 'specialInitData',
						data: response.data.data
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
		/*商品评论-进入后获取全部评论*/
		*getEvaData( { payload },{ put }){

			let reqData
			if(payload.userId){
				reqData={"goodsId":payload.goodsId,"userId":payload.userId,"page":payload.page,"max":payload.max}
			}else{
				reqData={"goodsId":payload.goodsId,"page":payload.page,"max":payload.max}
			}

			const response = yield Query('/comment/getAllListByGoods',reqData);
			if (response.data && response.data.success) {
				// console.log('评价',response.data)
				if(payload.fsxz){
					yield put({
						type: 'evaInitData',
						data: response.data.data
					})
				}else{
					let getPages=payload._this.getPage
					if(response.data.data.length<payload.max){
						getPages(false,response.data.data.dataList,payload.page);
					}else{
						getPages(true,response.data.data.dataList,payload.page);
					}
				}
			}else{
				console.log('调用失败')
			}
		},
		/*商品评论-进入后获取等级评论*/
		*levelEvaData( { payload,callBack } ){
			let reqData
			if(payload.userId){
				reqData={"goodsId":payload.goodsId,"userId":payload.userId,"page":payload.page,"max":payload.max,"level":payload.level}
			}else{
				reqData={"goodsId":payload.goodsId,"page":payload.page,"max":payload.max,"level":payload.level}
			}
			const response = yield Query('/comment/getListByGoods',reqData);
			if (response.data && response.data.success) {
				console.log('等级评价',response.data)
				if(payload.fsxz){
					callBack(response.data)
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
		/*商品评论-进入后获取有图评价*/
		*picEvaData( { payload,callBack } ){
			let reqData
			if(payload.userId){
				reqData={"goodsId":payload.goodsId,"userId":payload.userId,"page":payload.page,"max":payload.max,"level":payload.level}
			}else{
				reqData={"goodsId":payload.goodsId,"page":payload.page,"max":payload.max,"level":payload.level}
			}
			const response = yield Query('/comment/getExistPicListByGoods',reqData);
			if (response.data && response.data.success) {
				// console.log('有图评价',response.data)
				if(payload.fsxz){
					callBack(response.data)
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
		*goodsCarousel(){ //商品展示图滑动;
			var mySwiper = new Swiper('.swiper-container', {
				autoplay: {
           disableOnInteraction:false,
        },
				loop: true,
				pagination: {
				    el: '.swiper-pagination',
				}
			})
		},
		*goodsSimilar(){//同类推荐滑动
			var mySwiper = new Swiper('.swiper-goodsSimilar', {
				slidesPerView: 3.4,
		    spaceBetween: 20,
			})
		},
		/*商品是否收藏*/
		*loveGoods( { payload,love,callBack }){
			let reqData={"userId":payload.userId,"collection_id":payload.goodsId,"type":1}
			const response = yield Query('/userCollection/collection',reqData);
			if (response.data && response.data.success) {
				callBack(love,response.data.success)
			}else{
				callBack(love,response.data.success)
			}
		},
		/*加入购物车方法*/
		*addCart({payload,callBack}){
			let reqData={"goodsId":payload.goodsId,"goodsNumber":payload.goodsNumber,"skuId":payload.skuId,"userId":payload.userId}
			const response = yield Add('/shoppingCart/insert',reqData);
			if (response.data && response.data.success) {
				callBack(response.data.success)
			}else{
				callBack(response.data.success,response.data.alertMsg.msg)
			}
		},
		*goToLogin({ payload },{put}) {//跳转登录页面
			yield put(routerRedux.push('/Login?'+payload))
		},
		*goToAd({ payload },{put}) {//跳转广告费排行页面/其他页面
			yield put(routerRedux.push(payload))
		},
		/*接入app-独立商品图文*/
		*getImageTextData( { payload },{ put }){
			let reqData = {"goodsId":payload.goodsId}
			const response = yield Query('/goods/getImageTextDetail',reqData);
			console.log('独立图文',response);
			if (response.data && response.data.success) {
				yield put({
					type: 'imgTextInitData',
					data: response.data.data
				})
			}else{
				console.log('调用失败',response.data)
			}
		},
		*wxShareFun({data,fxFun},{put}){ //分享
			yield wxShare(data,fxFun)
		}	
	},
	subscriptions:{
		setup({ dispatch, history }) {
			history.listen(location => {
				if(location.pathname.includes('GoodsPage')){
					sessionStorage.removeItem("goodsEvaType");
					sessionStorage.removeItem("goodsType");
					dispatch({
			        	type: 'veryStart'
			        });
					if(!location.pathname.slice(location.pathname.lastIndexOf('/')+1)){
						location.pathname = location.pathname + 0
					}
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
					let goodsId = location.pathname.slice(location.pathname.lastIndexOf('/')+1);
					let specialData = {
						goodsId:goodsId,
						fsxz:true,
						page:1,
						max:10
					};
					let goodsData = {
						goodsId:goodsId,
						userId:sessionStorage.getItem("id")
					};
					let evaData = {
						goodsId:goodsId,
						userId:sessionStorage.getItem("id"),
						fsxz:true,
						page:1,
						max:10
					};
					document.title = '商品信息';
					dispatch({//详情/图文
	        	type: 'getGoodsData',
	        	payload:goodsData
	        });
	        dispatch({//专题
	        	type: 'getSpecialData',
	        	payload:specialData
	        });
	        dispatch({//评价
	        	type: 'getEvaData',
	        	payload:evaData
	        });
	        window.scrollTo(0,0)
				}else if(location.pathname.includes('GoodsImageTextPage/')){
					let imgGoodsId = location.pathname.slice(location.pathname.lastIndexOf('/')+1);
					let imgTextData = {
						goodsId:imgGoodsId
					};
					dispatch({//独立图文
	        	type: 'getImageTextData',
	        	payload:imgTextData
	        });
				}
			})
		}
	}
}
