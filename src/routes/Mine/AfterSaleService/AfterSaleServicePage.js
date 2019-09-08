import React from 'react';
import styles from '../../../style/mine/AfterSaleService.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import AfterSaleCard from '../../../components/Mine/AfterSaleService/AfterSaleCard';
import AfterApply from '../../../components/Mine/AfterSaleService/AfterApply';
import { connect } from 'dva';
import $ from 'jquery'
import ChaPop from '../../../components/PublicComponents/ChaPop'
import Loading from '../../../components/PublicComponents/LoadingCom';
const AfterSaleServicePage = ({dispatch,afterData}) => {
    let Popfun  //弹窗调用通道
    function HintWords(popDom){
        Popfun=popDom.Popfun
    }
    function getCode(data){//弹窗使用
        Popfun(data)
    }
    let PtDatas,page=afterData.res_page;
    //下拉加载传递函数
	function laodfun(dom){
        PtDatas=dom.ptData
    }  
	function reqFun(pages){
        afterData.res_page++ 
        getData()
    }
    //未评价下拉获取的函数
    function getData(){
        if(sessionStorage.getItem('afterIndex')==1){
            dispatch({
                type:'afterData/getAfterData',
                page:afterData.res_page,
                rows:4,
                cb:()=>PtDatas(false)
            })
        }else if(sessionStorage.getItem('afterIndex')==2){
            dispatch({
                type:'afterData/getApply',
                rows:4,
                page:afterData.res_page,
                cb:()=>PtDatas(false)
            })
        }
    }
    //取消退款函数
    function cancelReturn(id,indexs){
        dispatch({ 
            type:'afterData/cancelReturn',
            servId:id,
            cb:(msg,index)=>cb(msg,index),
            indexs:indexs
        })
    }
    //取消退款函数回调
    function cb(msg,index){
        Popfun(msg);
        afterData.detail_datas=[];
        setTimeout(function(){
            getApply()
        },1000)
    }		
    //获取售后申请列表
    function getAfter(){
        dispatch({
            type:'afterData/getAfterData',
            page:1,
            rows:4
        })
    }
    //获取已提交申请列表
    function getApply(){
        dispatch({
            type:'afterData/getApply',
            rows:4,
            page:1
        })
    }
	class AfterSaleServicePage extends React.Component{
        constructor(props) {
            super(props); 
            this.state = {
                cur:sessionStorage.getItem('afterIndex'),
                listData:afterData.res_box,
                afterDatas:afterData.detail_datas,
                aloading:afterData.loading,
                bloading:afterData.detail_load
            }
        }		
		render () {
            let that=this;
            console.log(this.state.listData)
			return (
				<div>
                    <Header head_title='售后服务' left_show='1' header_ids='12'/>
                    <ChaPop HintWords={HintWords}/>
                    <div className={styles.saleNav} id="moveHeader" id='specialNav'>
                        <div className={that.state.cur==1?styles.saleCur:null} onClick={()=>that.choiceTag(1)}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;售后申请</div>
                        <div className={that.state.cur==2?styles.saleCur:null} onClick={()=>that.choiceTag(2)}>申请记录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    </div>
                    {
                        this.state.cur==1?<AfterSaleCard listData={this.state.listData} aloading={this.state.aloading}/>:<AfterApply listData={this.state.afterDatas} cancel={(id,indexs)=>cancelReturn(id,indexs)} bloading={this.state.bloading}/>
                    }
                    <Loading getLoadFun={laodfun} reqFun={reqFun} page={page}/>
				</div>
			)
        } 
        //导航栏切换函数
        choiceTag(index) {
            sessionStorage.setItem('afterIndex',index)
            afterData.res_page=1;
            afterData.res_box=[];
            afterData.detail_datas=[]
            if(afterData.loading){
                if(index==1){
                    getAfter()
                }else if(index==2){
                    getApply()
                }
            }
        }
        componentDidMount(){
			$(window).scroll(function() {
                var top=$(window).scrollTop()
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
            afterData.res_page=1;
            afterData.res_box=[];
            afterData.detail_datas=[];
            afterData.loading=false;
        }
	}
	return <AfterSaleServicePage />
};
export default connect(({ afterData }) => ({
    afterData
  }))(AfterSaleServicePage);