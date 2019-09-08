import React from 'react';
import styles from '../../../style/mine/MyOrder/MyOrder.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import OrderCard from '../../../components/Mine/MyOrder/OrderCard';
import { connect } from 'dva';
import $ from 'jquery'
import ChaPop from '../../../components/PublicComponents/ChaPop'
import ButtonPop from '../../../components/PublicComponents/ButtonPop'
import DefaultPage from '../../../components/PublicComponents/DefaultPage';//缺省页面
import Loading from '../../../components/PublicComponents/LoadingCom';

const MyOrder = ({MyOrderData,dispatch,myPageData,EvaPageData}) => {
    let arr=['全部','待付款','待收货','已完成','已取消'];
    let num='';
    let Popfun  //弹窗调用通道
    function HintWords(popDom){
        Popfun=popDom.Popfun
    }
    function getCode(data){//弹窗使用
        Popfun(data)
    }
    //上拉加载信息
    let _this,PtDatas,typePt,page=MyOrderData.listPage,copy;
	function laodfun(dom){
        PtDatas=dom.ptData
    }
    //上拉执行函数  
	function reqFun(pages){
        MyOrderData.listPage++
        geiOrderData(localStorage.getItem('OrderIndex'),1)
    }
    const ButtonHint3 = {
        title:"温馨提示",//标题
        explain:"是否确定删除？",
        type:2,//按钮数1/2
        hide:true//是否展示
    }
    function cancelOrder(orderId){
        dispatch({
            type:'MyOrderData/cancelOrder',
            orderId:orderId
        })
    }
    //设置弹出窗口执行函数识别码
    function popType(type){
        MyOrderData.alertType=type;
    }
    //获取订单详情数据
    function getDetail(orderId,orderNo,price){
        dispatch({
            type:'MyOrderData/getOrderDetail',
            id:orderId,
            orderNo:orderNo,
            price:price,
            types:true
        })
    }
    //弹出窗口类型选择
    function popBtns(orderId,index,ButtonHint){
        dispatch({
            type:'MyOrderData/popBtn',
            orderId:orderId,
            index:index,
            ButtonHint:ButtonHint
        })
    }
    function geiOrderData(typeNum,num){
        localStorage.setItem('OrderIndex', typeNum);
        copy='';
        if(typeNum==1){
            copy=1
        }else if(typeNum==2){
            copy='2,3'
        }else if(typeNum==3){
            copy=4
        }else if(typeNum==4){
            copy=5
        }
        //获取刷新数据
        dispatch({
            type:'MyOrderData/getOrderData',
            index:copy,
            rows:4,
            page:MyOrderData.listPage,
            cb:()=>PtDatas(false),
            scene:num
        })
        
    }
	class MyOrder extends React.Component{
        constructor(props) {
            super(props); 
            this.state = {
                cur:'',
                listData:MyOrderData.res_datas
            }
        }
		render () {
            let that=this;
			return (
				<div>
                    <Header head_title='我的订单' left_show='1' right_icon='2' header_ids='19'/>
                    <ChaPop HintWords={HintWords}/>
                    <ButtonPop ButtonHint={MyOrderData.ButtonHint} confirm={()=>this.consoles(MyOrderData.deleteId,MyOrderData.deleteIndex)} cancel={()=>this.cancelWay()}/>
                    <div className={styles.orderNav} id="moveHeader" id='specialNav'>
                        {
                            arr.map(function(item,index){
                                return <div className={that.state.cur==index?styles.orderCur:null} onClick={()=>that.choiceTag(index)} key={index}>{item}</div>
                            })
                        } 
                    </div>
                    <div className={styles.orderWrap}>
                        <OrderCard getDetail={getDetail}  listData={this.state.listData} cancelOrders={cancelOrder} popBtnsFn={popBtns} popTypeD={popType} loading={MyOrderData.loadingstate}/>
                    </div>
                    <Loading getLoadFun={laodfun} reqFun={reqFun} page={page}/>
				</div>
			)
        }
         //导航栏按钮
        choiceTag(index) {
            window.scrollTo(0,0)
            MyOrderData.listPage=1;
            MyOrderData.res_datas=[];
            if(MyOrderData.loading){
                this.setState({
                    cur:index
                },()=>geiOrderData(this.state.cur))
                if(index==1){
                    myPageData.typeOrder=1
                }else if(index==2){
                    myPageData.typeOrder=2
                }else if(index==3){
                    myPageData.typeOrder=3
                }else if(index==0){
                    myPageData.typeOrder=''
                }else if(index==4){
                    myPageData.typeOrder=4
                }
            }
        }
        //确认弹窗确定函数
        consoles(orderId,index){
            if(MyOrderData.alertType==1){
                dispatch({
                    type:'MyOrderData/deleteOrder',
                    orderId:orderId,
                    index:index
                }).then(function(){
                    console.log('这里是回调函数1111')
                })
            }else if(MyOrderData.alertType==2){
                dispatch({
                    type:'MyOrderData/confirmOrder',
                    orderId:orderId,
                    index:index
                }).then(function(){
                    console.log('这里是回调函数2222')
                })
            }else if(MyOrderData.alertType==3){
                cancelOrder(orderId)
            }
        }
        //取消方式
        cancelWay(){
            dispatch({
                type:'MyOrderData/popBtn',
                ButtonHint:ButtonHint3
            })
        }
        componentWillMount(){
            _this=this
            this.setState({
                cur:localStorage.getItem('OrderIndex')
            })
        }	
        componentWillUnmount(){
            MyOrderData.loadingstate=false;
            myPageData.typeOrder=1;
        }
        componentDidMount(){
            $(window).scroll(function() {
                var top=$(window).scrollTop()
                console.log(top)
				if(top>88){
                    // sessionStorage.setItem('heightStatus',1)
					$('#specialNav').css({						
						"top":"0px",
					})
					$('#headerReturn').slideUp()
				}else{
                    // dispatch({
                    //     type:'EvaPageData/changeStatus'
                    // })
                    // sessionStorage.setItem('heightStatus',2)
					$('#specialNav').css({					
						"top":"0.88rem",
					})
					$('#headerReturn').slideDown()
				}
			});
            if(MyOrderData.cancelOrder==true){
                if(Popfun){
                    Popfun("取消成功!");
                }
                MyOrderData.listPage=1;
                MyOrderData.res_datas=[]
                setTimeout(() => {
                    window.scrollTo(0,0)
                    geiOrderData(this.state.cur)
                }, 1000);
                MyOrderData.cancelOrder=false
            }
            if(MyOrderData.deleteOrder==true){
                Popfun("删除成功!");
                MyOrderData.listPage=1;
                MyOrderData.res_datas=[]
                setTimeout(() => {
                    window.scrollTo(0,0)
                    geiOrderData(this.state.cur)
                }, 1000);
                MyOrderData.deleteOrder=false
            }
            if(MyOrderData.confirmOrder==true){
                Popfun("确认成功!");
                MyOrderData.listPage=1;
                MyOrderData.res_datas=[]
                setTimeout(() => {
                    window.scrollTo(0,0)
                    geiOrderData(this.state.cur)
                }, 1000);
                MyOrderData.deleteOrder=false
                MyOrderData.confirmOrder=false
            }
        }
    }
	return <MyOrder />
};
export default connect(({ MyOrderData,myPageData,EvaPageData }) => ({
    MyOrderData,myPageData,EvaPageData
  }))(MyOrder);