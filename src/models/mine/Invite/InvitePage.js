import { routerRedux } from 'dva/router';
import {  Add , Delete , Query , Change } from '../../../services/requestType';
import {wxShare} from '../../../services/weixinPay'
export default{
	namespace:"InvitePageData",
	state:{
        msg_datas:[],
        list_data:[],
        allData:'',
        res_page:1,
        lisg_loading:false,
		loading: false, // 控制加载状态
        InviteshareMsg:false
    },
	reducers:{
        /*接受初始获取数据给state*/
		requstCon(state,{ data }){
			return {
				...state,
                msg_datas:data.data,
				loading:data.success,
                InviteshareMsg:data.shareMsg
			}
        },
        inviteDatas(state,{ data }){
			return {
				...state,
                list_data:state.list_data.length?state.list_data.concat(data.data.data):data.data.data,
                lisg_loading:data.success,
                allData:data.data
			}
        }
        
	},
	effects:{
        /*消息中心主页信息*/
        *getConFeeData({max},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'userId='+sessionStorage.getItem('id')+'&max='+max
            }
            const response = yield Query('/user/inviteTop',reqData);
            console.log(response)
            yield put({ 
                type: 'requstCon',
                data: response.data
            })		
        },
        *inviteData({max,page,cb},{ put }){
            let reqData={
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:'userId='+sessionStorage.getItem('id')+'&max='+max+'&page='+page
            }
            const response = yield Query('/user/inviteData',reqData);
            console.log(response.data.data)
            if(!response.data.data.data.length&&page!=1){
                cb()
            }else{
                yield put({ 
                    type: 'inviteDatas',
                    data: response.data
                })		
            }
        },
        *wxShareFun({data,fxFun},{put}){ //分享
            yield wxShare(data,fxFun)
        }   
	},
	subscriptions:{
		setup({ dispatch,history }) {
			history.listen(location => {
				if(location.pathname.includes('Invite')){
					document.title = '邀请好友';
					window.scrollTo(0,0)
				}
			})
		}
	}
}