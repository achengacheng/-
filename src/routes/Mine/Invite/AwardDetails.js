import React from 'react';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import styles from '../../../style/mine/Invite/InvitePage.css'
import InviteNumber from '../../../components/Mine/Invite/InviteNumber'
import Loading from '../../../components/PublicComponents/LoadingCom';
import { connect } from 'dva';
const InvitePage = ({InvitePageData,dispatch}) => {
    let PtDatas,page=InvitePageData.res_page;
	function laodfun(dom){
        PtDatas=dom.ptData
    }  
	function reqFun(pages){
        InvitePageData.res_page++
        getData()
    }
    function getData(){
        console.log(341321)
        dispatch({ 
            type:'InvitePageData/inviteData',
            page:InvitePageData.res_page,
            max:1,
            cb:()=>PtDatas(false)
        })
    }
	class InvitePage extends React.Component{
        constructor(props){
            super(props);
            this.state={
                listData:InvitePageData.list_data,
                allData:InvitePageData.allData
            }
        }		
		render () {
            if(InvitePageData.lisg_loading==true){
                console.log(this.state.listData,2222)
                return (
                    <div>
                        <Header head_title='邀请明细' left_show='1' right_icon='2'/>
                        <div className={styles.InviteWrap}>
                            <div className={styles.InviteHead}>
                                <div>
                                    <p>已邀请人数(人)</p>
                                    <p>{this.state.allData.childrens}</p>
                                </div>
                                <p></p>
                                <div>
                                    <p>已获得奖励(元)</p>
                                    <p>{this.state.allData.totalMoney}</p>
                                </div>
                            </div>
                            <ul className={styles.InviteBox}>
                                {
                                    this.state.listData.map(function(item,index){
                                        return(
                                            <li key={index}>
                                                <div className={styles.InviteIcon}>
                                                    <img src={item.userPic} alt=""/>
                                                    <div>
                                                        <p className={styles.InviteNewName}>{item.memo}</p>
                                                        <p>{item.telephone}</p>
                                                    </div>
                                                </div>
                                                <div className={styles.InviteLineTime}>
                                                    <p className={styles.InviteNewMoney}>+{item.money}</p>
                                                    <p>2017-10-12 10:00</p>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <Loading getLoadFun={laodfun} reqFun={reqFun} page={page}/>
                    </div>
                )
            }else{
                return(
                    <div></div>
                )
            }
        }
        componentDidMount(){
            if(InvitePageData.lisg_loading==false){
                console.log(21)
                dispatch({
                    type:'InvitePageData/inviteData',
                    max:1,
                    page:InvitePageData.res_page
                })
            }
        }
        componentWillUnmount(){
            InvitePageData.lisg_loading=false;
            InvitePageData.res_page=1;
            console.log(InvitePageData.loading)
            InvitePageData.list_data=[];
        }
	}	
	return <InvitePage />
};
export default connect(({ InvitePageData }) => ({
    InvitePageData
  }))(InvitePage);