
import React from 'react';
import styles from '../../../style/mine/MyEva/EvaPage.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import NoCard from '../../../components/Mine/MyEva/NewNoEvaCard'
import HadCard from '../../../components/Mine/MyEva/NewHadEvaCard'
import Loading from '../../../components/PublicComponents/LoadingCom';
import $ from 'jquery'
import { connect } from 'dva';
var Swiper=require('../../../../node_modules/swiper/dist/js/swiper.js')
const NewEva = ({EvaPageData,dispatch}) => {
    //下拉加载数据
    let PtDatas,page=EvaPageData.res_page;
    //下拉加载传递函数
	function laodfun(dom){
        PtDatas=dom.ptData
    }  
	function reqFun(pages){
        EvaPageData.res_page++
        getData()
    }
    //未评价下拉获取的函数
    function getData(){
        if(sessionStorage.getItem('EvaIndex')==1){
            dispatch({ 
                type:'EvaPageData/getWaitData',
                page:EvaPageData.res_page,
                rows:6,
                cb:()=>PtDatas(false)
            })
        }else if(sessionStorage.getItem('EvaIndex')==2){
            dispatch({ 
                type:'EvaPageData/getCommentedData',
                page:EvaPageData.res_page,
                rows:2,
                cb:()=>PtDatas(false)
            })
        }
    }
    //获取未评论数据
    function getWaitData(){
        dispatch({
            type:'EvaPageData/getWaitData',
            rows:6,
            page:1
        })
    }
    //获取已评论数据
    function getHadData(){
        dispatch({
            type:'EvaPageData/getCommentedData',
            rows:2,
            page:1
        })
    }
    class NewEva extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                listData:EvaPageData.res_datas,
                commented_data:EvaPageData.commented_data,
                scollCount: 0,
                cur:sessionStorage.getItem('EvaIndex'),
                waitEva:'',
                eva:'',
                headData:EvaPageData.headData
            }
        }
		render () {
            const that=this;
            console.log(1111,EvaPageData.loading)
			return (
	        <div>
                <Header head_title='我的评价' left_show='1' right_icon='2' header_ids='21'/>
                <div className={styles.NewEvaHeadCopy} id="moveHeader" id='specialNav'>
                    <p className={this.state.cur==1?styles.NewEvaCur:null} onClick={()=>that.changeTab(1)}>待评价 <span>{this.state.headData.waitComment}</span></p>
                    <p className={this.state.cur==2?styles.NewEvaCur:null} onClick={()=>that.changeTab(2)}>已评价 <span>{this.state.headData.commented}</span></p>
                </div>
                <div className={styles.NewEvaWrap}>
                    {
                        this.state.cur==1?<div><NoCard listData={this.state.listData} loading={EvaPageData.loading}/></div>:<div><HadCard listData={this.state.commented_data} loading={EvaPageData.isComment}/></div>
                    }
                    <Loading getLoadFun={laodfun} reqFun={reqFun} page={page}/>
                </div>
            </div>
			)
        }
        //导航栏切换卡
        changeTab(index){
            EvaPageData.res_page=1;
            EvaPageData.res_datas=[];
            EvaPageData.commented_data=[];
            sessionStorage.setItem('EvaIndex',index)
            window.scrollTo(0,0)
            if(index==1){
                getWaitData()
            }
            if(index==2){
                getHadData()
            }
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
            // sessionStorage.setItem('heightStatus',2)
            EvaPageData.loading=false;
            EvaPageData.isComment=false;
            sessionStorage.setItem('EvaCIndex',false);
            EvaPageData.res_page=1;
            EvaPageData.res_datas=[];
            EvaPageData.commented_data=[];
        }
	}
	return <NewEva />
};
export default connect(({ EvaPageData }) => ({
    EvaPageData
  }))(NewEva);
