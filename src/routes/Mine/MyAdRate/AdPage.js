import React from 'react';
import styles from '../../../style/mine/MyAdRate/AdPage.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import AdCardOne from '../../../components/Mine/MyAdRate/AdCardOne'
import { connect } from 'dva';
import Loading from '../../../components/PublicComponents/LoadingCom';
import $ from 'jquery'
const ActivityMsg = ({adPageData,dispatch,index}) => {
    let _this,PtDatas,typePt,page=adPageData.res_page;
	function laodfun(dom){
        PtDatas=dom.ptData
    }  
	function reqFun(pages){
        adPageData.res_page++
        getDatas()
    }
    //上拉加载触发函数
    function getDatas(index){
        dispatch({ 
            type:'adPageData/getAdFeeData',
            page:adPageData.res_page,
            rows:8,
            status:localStorage.getItem('adIndex'),
            cb:()=>PtDatas(false)
        })
    }
    //获取粮票数据
    function getData(index){
         dispatch({
                type:'adPageData/getAdFeeData',
                status:index,
                page:1,
                rows:8
            })
    }
	class ActivityMsg extends React.Component{
        constructor(props){
            super(props); 
            this.state = {
                cur:localStorage.getItem('adIndex'),
                listData:adPageData.res_datas
            }
        }
        Choice(index){
            adPageData.res_datas=[];
            adPageData.res_page=1;
            if(adPageData.loading){
                localStorage.setItem('adIndex', index);
                this.setState({
                    cur:index
                })
                getData(index);
            }
            adPageData.loading=false;
        }
		render () {
            var that=this;
            console.log(this.state.listData,1111)
			return (
				<div>
                    <Header head_title='我的粮票' left_show='1' right_icon='2' header_ids="20"/>
                    <div className={styles.AdPageWrap} >
                        <div className={styles.AdPageNav} id="moveHeader" id='specialNav'>
                            <p className={this.state.cur==1?styles.curCss:null} onClick={()=>this.Choice(1)}>待晒单</p>
                            <p className={this.state.cur==2?styles.curCss:null} onClick={()=>this.Choice(2)}>冻结中</p>
                            <p className={this.state.cur==3?styles.curCss:null} onClick={()=>this.Choice(3)}>已入账</p>
                        </div>
                        <div className={styles.AdPageBox}>
                                <AdCardOne index={this.state.cur} listData={this.state.listData} loading={adPageData.loading}/>
                        </div>
                    </div>
                    <Loading getLoadFun={laodfun} reqFun={reqFun} page={page}/>    
                </div>
			)
        }
        componentDidMount(){
			$(window).scroll(function() {
                var top=$(window).scrollTop()
                console.log(top)
				if(top>88){
					$('#specialNav').css({						
						"top":"0px",
					})
					$('#headerReturn').slideUp()
				}else{
                    // dispatch({
                    //     type:'EvaPageData/changeStatus'
                    // })
					$('#specialNav').css({					
						"top":"0.88rem",
					})
					$('#headerReturn').slideDown() 
				}
			});
		}
        componentWillUnmount(){
            adPageData.loading=false; 
            adPageData.res_datas=[];
            console.log(adPageData.res_datas,321321)
            adPageData.res_page=1;
        }
	}	
	return <ActivityMsg />
};
export default connect(({ adPageData }) => ({
    adPageData
  }))(ActivityMsg);