import React from 'react';
import styles from '../../../style/mine/AfterSaleService.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import { Link } from 'dva/router'
import { connect } from 'dva';

const ApplyForReturn = ({dispatch,afterData}) => {
    let arr=['提交申请','申请审核','售后收货','进行退款','处理完成']
	class ApplyForReturn extends React.Component{
        getUrl() { 
            var qs = window.location.href.split("?")[1];
            var  args = {}, 
                items = qs.length ? qs.split("&") : [], 
                item = null,
                len = items.length;
            for(var i = 0; i < len; i++) {
              item = items[i].split("=");
              var name = decodeURIComponent(item[0]),
                value = decodeURIComponent(item[1]);
              if(name) {
                args[name] = value;
              }
            }
            return args;
          }	
		render () {
            if(afterData.step_load==true&&afterData.step_datas!=''){
                return (
                    <div>
                        <Header head_title='记录详情' left_show='1' header_ids='12'/>
                        <div className={styles.checkHead}>
                            <div>服务单号:{afterData.step_datas.servNo}</div>
                            <div>申请时间:{afterData.step_datas.applyTime}</div>
                        </div>
                        <Link to={"/mypage/AfterSaleServicePage/CheckProgress?id="+this.getUrl('id').id}>
                            <div className={styles.checkDeMsg}>
                                <div>
                                    <p>审核进度：{!!afterData.step_datas.historyList==false?'暂无消息':afterData.step_datas.historyList[0].memo}</p>
                                    <img src="/src/assets/myPageLeftArr.png" alt=""/>
                                </div>
                            </div>
                        </Link>    
                        <div className={styles.checkLine}>
                            
                            <div className={styles.checkLineBox}>
                                <div className={arr.indexOf(afterData.step_datas.statusList[afterData.step_datas.statusList.length-1].point)>=0?styles.checkLineBoxDiv:styles.checkLineBoxGray}>
                                    {
                                        afterData.step_datas.statusList[afterData.step_datas.statusList.length-1].point=='提交申请'?<div className={styles.checkMoveLine}>{afterData.step_datas.statusList[afterData.step_datas.statusList.length-1].status}</div>:null
                                    }
                                </div>
                                <p className={styles.checkLineBoxP}></p>
                                <div className={arr.indexOf(afterData.step_datas.statusList[afterData.step_datas.statusList.length-1].point)>=1?styles.checkLineBoxDiv:styles.checkLineBoxGray}>
                                    {
                                        afterData.step_datas.statusList[afterData.step_datas.statusList.length-1].point=='申请审核'?<div className={styles.checkMoveLine}>{afterData.step_datas.statusList[afterData.step_datas.statusList.length-1].status}</div>:null
                                    }  
                                </div>
                                <p className={styles.checkLineBoxP}></p>
                                <div className={arr.indexOf(afterData.step_datas.statusList[afterData.step_datas.statusList.length-1].point)>=2?styles.checkLineBoxDiv:styles.checkLineBoxGray}>
                                    {
                                        afterData.step_datas.statusList[afterData.step_datas.statusList.length-1].point=='售后收货'?<div className={styles.checkMoveLine}>{afterData.step_datas.statusList[afterData.step_datas.statusList.length-1].status}</div>:null
                                    }
                                </div>
                                <p className={styles.checkLineBoxP}></p>
                                <div className={arr.indexOf(afterData.step_datas.statusList[afterData.step_datas.statusList.length-1].point)>=3?styles.checkLineBoxDiv:styles.checkLineBoxGray}>
                                    {
                                        afterData.step_datas.statusList[afterData.step_datas.statusList.length-1].point=='进行退款'?<div className={styles.checkMoveLine}>{afterData.step_datas.statusList[afterData.step_datas.statusList.length-1].status}</div>:null
                                    }
                                </div>
                                <p className={styles.checkLineBoxP}></p>
                                <div className={arr.indexOf(afterData.step_datas.statusList[afterData.step_datas.statusList.length-1].point)>=4?styles.checkLineBoxDiv:styles.checkLineBoxGray}>
                                    {
                                        afterData.step_datas.statusList[afterData.step_datas.statusList.length-1].point=='处理完成'?<div className={styles.checkMoveLine}>{afterData.step_datas.statusList[afterData.step_datas.statusList.length-1].status}</div>:null
                                    }
                                </div>
                            </div>
                            <ul>
                                <li>提交申请</li>
                                <li>申请审核</li>
                                <li>售后收货</li>
                                <li>进行退款</li>
                                <li>处理完成</li>
                            </ul>
                        </div>
                        <div className={styles.checkQst}>
                            <p>问题描述</p>
                            <div>{afterData.step_datas.description}</div>
                        </div>
                        <div className={styles.checkQst}>
                            <p>审核留言</p>
                            <div>{afterData.step_datas.checkMessage}</div>
                        </div>
                        <div className={styles.checkFoot}>
                            <div>• 收货地址：{!!afterData.step_datas.receiveInfo==false?'无':afterData.step_datas.receiveInfo.location}</div>
                            <div>• 联系姓名：{!!afterData.step_datas.receiveInfo==false?'无':afterData.step_datas.receiveInfo.name}</div>
                            <div>• 邮政编码：{!!afterData.step_datas.receiveInfo==false?'无':afterData.step_datas.receiveInfo.zipCode}</div>
                        </div>
                    </div>
                )
            }else{
                return(
                    <div></div>
                )
            }
			
        }
        componentDidMount(){
            // sessionStorage.setItem('afterIndex',2)
            console.log(afterData.step_load)
           if(afterData.step_load==false){
            dispatch({
                type:'afterData/getDetail',
                id:this.getUrl('id').id
            })
           }
        }
        componentWillUnmount(){
            afterData.step_load=false 
        }
	}	
	return <ApplyForReturn />
};
export default connect(({ afterData }) => ({
    afterData
  }))(ApplyForReturn);