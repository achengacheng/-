import {  Add , Delete , Query , Change } from '../services/requestType';

var Swiper=require('../../node_modules/swiper/dist/js/swiper.js')

export default {
	namespace:'searchPageData',
	state:{
		scollTop:0,
		hot_datas:[],
		key_datas:{},
		key_loading:'',
		goods_datas:'',
		res_page:1,
		loading: false, // 控制加载状态
	},
	reducers: {
		// 'delete'(state, { payload: id }) {
	 //    	return state.filter(item => item.id !== id);
	 //    },
	 	'isScoll'(state,{top:value}) {	 		
            var scollTop
	    	return {	    
	    		scollTop:value
			};
		},
		requstHot(state,{ data }){
			return {
				...state,
				hot_datas:data.data,
				loading: data.success
			}
		},
		goodsSearchData(state,{ data }){
			return {
				...state,
				goods_datas:data.data
			}
		},
		keyDatas(state,{ data }){
			return {
				...state,
				key_datas:data.data,
				key_loading: data.success
			}
		}
	},
	subscriptions:{
		setup({ dispatch,history }) {
			history.listen(location => {
				if(location.pathname.includes('SearchPage')){
					document.title = '搜索';
					dispatch({
						type:'getHotData'
					})
					window.scrollTo(0,0)
				}
			})
		}
	},
	effects: {	
		*searchhotbuy(){//热卖滑动
			var mySwiper = new Swiper('.swiper-container', {				
				slidesPerView: 3.5,
		      	spaceBetween: 25,			   
			})	
		},
		*goodsSearchMore({keyWords,page,max,id,_this},{ put }){
			let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
				},
				body:'keyWords='+keyWords+'&page='+page+'&max='+max+'&id='+id
            }
			const response = yield Query('/search/search',reqData);
			let getPage=_this.getPage				
			if(response.data.success){
				if(response.data.data.length){
					let arr=[]
					for(let i=0;i<response.data.data.length;i++){
						let obj={};
						obj.currentPrice=response.data.data[i].currentPrice;
						obj.id=response.data.data[i].goodsId;
						obj.markPrice=response.data.data[i].markPrice;
						obj.name=response.data.data[i].goodsName;
						obj.goodsPic=response.data.data[i].mainPic;
						arr.push(obj)
					}
					getPage(true,arr,page);
				}else{
					getPage(false,response.data.data,page);
				}
			}
		},
		/*加载热门关键词*/
        *getHotData({},{ put }){
            let reqData={
                method:"GET",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
			const response = yield Query('/search/hotWords',reqData);
            yield put({ 
                type: 'requstHot',
                data: response.data
            })		
		},
		/*商品搜索*/
        *goodsSearch({keyWords,page,max,id,cb,set},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
				},
				body:'keyWords='+keyWords+'&page='+page+'&max='+max+'&id='+id
            }
			const response = yield Query('/search/search',reqData);
			if(response.data.success){
				cb(response.data.data,keyWords)
				let arr=[]
				for(let i=0;i<response.data.data.length;i++){
					let obj={};
					obj.currentPrice=response.data.data[i].currentPrice;
					obj.id=response.data.data[i].goodsId;
					obj.markPrice=response.data.data[i].markPrice;
					obj.name=response.data.data[i].goodsName;
					obj.goodsPic=response.data.data[i].mainPic;
					arr.push(obj)
				}
				console.log(arr,111);
				if(set){
					set(arr)
				}
			}
		},
		/*艾家搜索*/
        *AJSearch({keyWords,page,max,id,cb,set},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
				},
				body:'keyWords='+keyWords+'&page='+page+'&max='+max+'&id='+id
            }
			const response = yield Query('/search/searchMerchant',reqData);
			if(response.data.success){
				cb(response.data.data,keyWords)
				if(set){
					set(response.data.data)
				}
			}
		},
		*keyData({key,cb},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
				},
				body:'searchWords='+key
            }
			const response = yield Query('/search/recommendKeys',reqData);
			if(response.data.success){
				cb(response.data.data)
			}
            // yield put({ 
            //     type: 'keyDatas',
            //     data: response.data
            // })		
		},
		*cons(){
			this.setState({
                statu: 1
            });
		}
	}
}