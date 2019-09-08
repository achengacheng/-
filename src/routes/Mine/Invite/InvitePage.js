import React from 'react';
import styles from '../../../style/mine/Invite/AwardDetails.css'
import $ from 'jquery';
import { Link } from 'dva/router'
import { connect } from 'dva';
import FxPop from '../../../components/PublicComponents/FxPop'
import ChaPop from  '../../../components/PublicComponents/ChaPop'

const AwardDetails = ({InvitePageData,dispatch}) => {
    let fxPopfun,standardTab
    function FxDomFun(fxDom) {//分享指引
        fxPopfun=fxDom.fxPopfun
    }
    function resFxFun(msg,typs) {//分享完成回调
        standardTab(msg)
        fxPopfun(false)
    }
    function wxShareFun(datas) {//分享
        dispatch({
            type:'InvitePageData/wxShareFun',
            data:datas,
            fxFun:resFxFun
        })
    }
    function HintWords(popDom){ //提示语
        standardTab = popDom.Popfun
    }
	class AwardDetails extends React.Component{
        constructor(props){
            super(props);
            this.state={
                inviteList:InvitePageData.msg_datas
            }
        }
        goBack(){
            window.history.go(-1)
        }		
		render () {
            if(InvitePageData.loading==false){
                dispatch({
                    type:'InvitePageData/getConFeeData',
                    max:10
                })
            }
            if(InvitePageData.loading==true){
                return (
                    <div>
                        <div className={styles.inviteHeadBg}>
                            <img src="/src/assets/Mine-invite-back.png" alt="" onClick={()=>this.goBack()}/>
                            <div className={styles.inviteBalance}>
                                <p>邀请即得</p>
                                <p><span>{this.state.inviteList.inviteMoney}</span>现金奖励</p>
                                <div className={styles.inviteBtn} id="inviteBtn"><img src="/src/assets/Mine-invite-btn.png" alt=""/></div>
                                <Link to='/mypage/ServePage/HelpContent/5b38f360a8a9261e28d64c41'><div className={styles.inviteAbso2}> 活动规则</div></Link>
                            </div>
                        </div>
                        <div className={styles.inviteBanner}>
                            <div className={styles.inviteHeads}>我的邀请战绩</div>
                            <div className={styles.invitesBox}>
                                <div>
                                    <p>成功邀请</p>
                                    <p className={styles.invitesP}>{this.state.inviteList.childrens}<span>人</span></p>
                                </div>
                                <div>
                                    <p>已获得奖励</p>
                                    <p className={styles.invitesP}>{this.state.inviteList.totalMoney}<span>元</span></p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.invitePaihang}>
                            <div className={styles.inviteBtn2}>
                                <Link to="/mypage/Invite/AwardDetails">
                                    <img src="/src/assets/Mine-invite-detail.png" alt=""/>
                                </Link>    
                            </div>
                            <div className={styles.inviteHeads1}>分享排行榜</div>
                            <div className={styles.inviteListBox}>
                                <div>
                                    {
                                        this.state.inviteList.data.map(function(item,index){
                                            return(
                                                <div className={styles.shareList} key={index}>
                                                    {
                                                        (function(){
                                                            if(index>=3){
                                                                return(
                                                                    <i>{index+1}</i>
                                                                )
                                                            }else{
                                                                return(
                                                                    <i></i>
                                                                )
                                                            }
                                                        })()
                                                    }
                                                    <img src={item.userPic} alt="" className={styles.shareLeft}/>
                                                    <p className={styles.shareLeft}>{item.telephone}</p>
                                                    <p className={styles.shareSelfRi}>￥{item.money}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <ChaPop HintWords={ HintWords }/>
                        <FxPop FxDomFun={FxDomFun}/>
                    </div>
                )
            }else{
                return(
                    <div></div>
                )
            }
			
        }
        componentWillUnmount(){
            InvitePageData.loading=false;
        }
        componentDidMount(){
            $('#inviteBtn').click(function(){
                if(InvitePageData.InviteshareMsg){
                    wxShareFun(InvitePageData.InviteshareMsg)
                    fxPopfun(true)
                }else{
                    standardTab("分享失败")
                }
            })
        }
	}	
	return <AwardDetails />
};
export default connect(({ InvitePageData }) => ({
    InvitePageData
  }))(AwardDetails);

