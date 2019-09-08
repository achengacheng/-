import { routerRedux } from 'dva/router';
import {  Add , Delete , Query , Change } from '../../../services/requestType';

export default{
	namespace:"msgPageData",
	state:{
		msg_datas:[],
		res_all:'',
        res_page:1,
        act_datas:[],
        ser_datas:[],
        ser_loading:false,
        sys_datas:[],
        sys_loading:false,
        act_loading:false,
        msgDetailDatas:false,
		loading: false, // 控制加载状态
    },
	reducers:{
        /*接受初始获取数据给state*/
		requstCon(state,{ data }){
			return {
				...state,
				msg_datas:data.data,
				loading:data.success
			}
        },
        requstSerMsg(state,{ data }){
			return {
				...state,
				ser_datas:data.data,
				ser_loading:data.success
			}
        },
        requstSysMsg(state,{ data }){
			return {
				...state,
				sys_datas:data.data,
				sys_loading:data.success
			}
        },
        requstActMsg(state,{ data }){
			return {
				...state,
				act_datas:data.data,
				act_loading:data.success
			}
        },
        msgDetailData(state,{ data }){
			return {
				...state,
				msgDetailDatas:data.data
			}
		}
	},
	effects:{
        /*消息中心主页信息*/
        *getConFeeData({},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'userId='+sessionStorage.getItem('id')
            }
			const response = yield Query('/messageCenter/getMessageIndex',reqData);
			console.log(response.data.data)
            yield put({ 
                type: 'requstCon',
                data: response.data
            })		
        },
        /*活动消息*/
        *actMsgData({page,max},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'userId='+sessionStorage.getItem('id')+'&page='+page+'&max='+max
            }
			const response = yield Query('/messageCenter/getActivityMessage',reqData);
			console.log(response.data.data)
            yield put({ 
                type: 'requstActMsg',
                data: response.data
            })		
        },
         /*服务消息*/
         *serMsgData({page,max},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'userId='+sessionStorage.getItem('id')+'&page='+page+'&max='+max
            }
			const response = yield Query('/messageCenter/getServiceMessage',reqData);
			console.log(response.data.data)
            yield put({ 
                type: 'requstSerMsg',
                data: response.data
            })		
        },
         /*系统消息*/
         *sysMsgData({page,max},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'userId='+sessionStorage.getItem('id')+'&page='+page+'&max='+max
            }
			const response = yield Query('/messageCenter/getSystemMessage',reqData);
			console.log(response.data.data)
            yield put({ 
                type: 'requstSysMsg',
                data: response.data
            })		
        },
        /*消息详情*/
        *msgDetail({},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'mesgId='+sessionStorage.getItem('MsgId')
            }
			const response = yield Query('/messageCenter/getSystemMessageDetail',reqData);
            yield put({ 
                type: 'msgDetailData',
                data: response.data
            })		
        }
	},
	subscriptions:{
		setup({ dispatch,history }) {
			history.listen(location => {
				if(location.pathname.includes('MsgPage')){
					document.title = '消息中心';
					window.scrollTo(0,0)
                }
                if(location.pathname.includes('ActivityMsg')){
                    dispatch({
                        type:'actMsgData',
                        page:1,
                        max:4
                    })
					document.title = '活动消息';
					window.scrollTo(0,0)
                }
                if(location.pathname.includes('ServiceMsg')){
                    dispatch({
                        type:'serMsgData',
                        page:1,
                        max:4
                    })
					document.title = '服务消息';
					window.scrollTo(0,0)
                }
                if(location.pathname.includes('SystemMsg')){
                    dispatch({
                        type:'sysMsgData',
                        page:1,
                        max:4
                    })
					document.title = '系统消息';
					window.scrollTo(0,0)
                }
                if(location.pathname.includes('MsgDetails')){
                    dispatch({
                        type:'msgDetail',
                    })
					document.title = '消息详情';
					window.scrollTo(0,0)
				}
			})
		}
	}
}