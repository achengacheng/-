import { routerRedux } from 'dva/router';

export default {
	namespace:'footprintData',
	state:{
		/*看过的商品*/
		footprintData:[{
			time:"今天",
			footGoods:  [{
							picSrc:'src/assets/home_recommend_img.png',
							name:'雀巢NESCAFE DOLCE GUSTO 德龙胶囊咖啡机EDG250',
							price1:99.90,
							price2:200.00,
						},{
							picSrc:'src/assets/home_recommend_img.png',
							name:'雀巢NESCAFE DOLCE GUSTO 德龙胶囊咖啡机EDG250',
							price1:99.90,
							price2:200.00,
						},{
							picSrc:'src/assets/home_recommend_img.png',
							name:'雀巢NESCAFE DOLCE GUSTO 德龙胶囊咖啡机EDG250',
							price1:99.90,
							price2:200.00,
						},{
							picSrc:'src/assets/home_recommend_img.png',
							name:'雀巢NESCAFE DOLCE GUSTO 德龙胶囊咖啡机EDG250',
							price1:99.90,
							price2:200.00,
						}]
		},{
			time:"2018-03-21",
			footGoods:  [{
							picSrc:'src/assets/home_recommend_img.png',
							name:'雀巢NESCAFE DOLCE GUSTO 德龙胶囊咖啡机EDG250',
							price1:99.90,
							price2:200.00,
						},{
							picSrc:'src/assets/home_recommend_img.png',
							name:'雀巢NESCAFE DOLCE GUSTO 德龙胶囊咖啡机EDG250',
							price1:99.90,
							price2:200.00,
						},{
							picSrc:'src/assets/home_recommend_img.png',
							name:'雀巢NESCAFE DOLCE GUSTO 德龙胶囊咖啡机EDG250',
							price1:99.90,
							price2:200.00,
						}]
		},{
			time:"2018-03-28",
			footGoods:  [{
							picSrc:'src/assets/home_recommend_img.png',
							name:'雀巢NESCAFE DOLCE GUSTO 德龙胶囊咖啡机EDG250',
							price1:99.90,
							price2:200.00,
						},{
							picSrc:'src/assets/home_recommend_img.png',
							name:'雀巢NESCAFE DOLCE GUSTO 德龙胶囊咖啡机EDG250',
							price1:99.90,
							price2:200.00,
						},{
							picSrc:'src/assets/home_recommend_img.png',
							name:'雀巢NESCAFE DOLCE GUSTO 德龙胶囊咖啡机EDG250',
							price1:99.90,
							price2:200.00,
						},{
							picSrc:'src/assets/home_recommend_img.png',
							name:'雀巢NESCAFE DOLCE GUSTO 德龙胶囊咖啡机EDG250',
							price1:99.90,
							price2:200.00,
						}]
		}]
	},

	subscriptions:{
		setup({ history }) {
			history.listen(location => {
				if(location.pathname.includes('Footprint')){
					document.title = '我的足迹';
				}
			})
		}
	},

	effects: {
	    *chooseToGo({ payload },{put}) {
	    	console.log(payload)
			yield put(routerRedux.push(payload))
		}
	},

	reducers: {},	
}