import {  Query } from '../../services/requestType';

export default {
    namespace:'adListData',
    state:{
      res_top_data:false,
      res_new_data:false
    },
    reducers:{
      /*刚进入的时候重新赋值*/
  		veryStart(state,{}){
  			return {
  				...state,
          res_top_data:false,
          res_new_data:false
  			}
  		},
      /*接受初始获取数据给top-state*/
  		topInitData(state,{ data }){
  			return {
  				...state,
  				res_top_data:data
  			}
  		},
      /*接受初始获取数据给new-state*/
  		newInitData(state,{ data }){
  			return {
  				...state,
  				res_new_data:data
  			}
  		}
    },
    effects:{
      /*排行榜-进入后获取原始数据*/
  		*getTopData( { payload },{ put }){
  			let reqData={"id":payload}
  			const response = yield Query('/goods/getRedPackedTopById',reqData);
  			if (response.data && response.data.success) {
  				console.log('排行榜',response.data)
  				yield put({
  					type: 'topInitData',
  					data: response.data.data
  				})
  			}else{
  				console.log('调用失败')
  			}
  		},
      /*最新发放-进入后获取原始数据*/
  		*getNewData( { payload },{ put }){
  			let reqData={"id":payload.id,"page":payload.page,"max":payload.max}
  			const response = yield Query('/goods/getRedPackedById',reqData);
        if (response.data && response.data.success) {
  				console.log('最新发放',response.data)
  				if(payload.fsxz){
  					yield put({
  						type: 'newInitData',
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
  				console.log('调用失败',response.data)
  			}
  		}
    },
    subscriptions:{
      setup({ dispatch,history }) {
  			history.listen(location => {
  				if(location.pathname.includes('AdListPage')){
            dispatch({
		        	type: 'veryStart'
		        });
            if(sessionStorage.getItem("adList")&&sessionStorage.getItem("adList")!=='0'){
              sessionStorage.setItem("adList","0")
            };
  					document.title = '粮票排行';
  					window.scrollTo(0,0)
            let adId = location.pathname.slice(location.pathname.lastIndexOf('/')+1);
            let newData = {
              id:adId,
  						fsxz:true,
  						page:1,
  						max:50
            };
            dispatch({//排行榜
  	        	type: 'getTopData',
  	        	payload:adId
  	        });
            dispatch({//最新发放
  	        	type: 'getNewData',
  	        	payload:newData
  	        })
  				}
  			})
  		}
    }
}
