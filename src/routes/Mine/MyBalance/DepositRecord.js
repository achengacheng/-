import React from 'react';
import styles from '../../../style/mine/MyBalance/MyBalance.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import DepositRecordLi from '../../../components/Mine/MyBalance/DepositRecordLi'
import { connect } from 'dva'; 
import Loading from '../../../components/PublicComponents/LoadingCom';
import DefaultPage from '../../../components/PublicComponents/DefaultPage';//缺省页面
const DepositRecord = ({balanceData,dispatch}) => {
	let _this,PtDatas,typePt,page=balanceData.recordPage;
	function laodfun(dom){
        PtDatas=dom.ptData
	} 
	//获取提现记录 
    function getList(){
		dispatch({ 
			type:'balanceData/withRecord',
			page:1,
			rows:8
		})
	}
	//下拉回调函数
	function reqFun(pages){
        balanceData.recordPage++
        dispatch({ 
            type:'balanceData/withRecord',
            page:pages,
            rows:8
        })
	}
	class DepositRecord extends React.Component{	
		constructor(props){
            super(props)
            this.state={
                recprdList:balanceData.with_data
            }
        }
		render () {
			let that=this;
			console.log(this.state.recprdList,444)
			if(this.state.recprdList.length){
				return (
					<div>
						<Header head_title='提现记录' left_show='1' right_icon='2' header_ids="23"/>
						<div className={styles.DepositWrap}>
							<div>
								{
									this.state.recprdList.map(function(item,index){
										return(
											<div key={index}>
												<div className={styles.RecordLi}>
													{
														item.name=='支付宝'?<img src="/src/assets/Mine-depos-alipay.png" alt=""/>:<img src="/src/assets/Mine-depos-bank.png" alt=""/>
													}
													<div className={styles.RecordLiBox}>
														<div>
															<p className={styles.RecordAlipay}>提现到{item.name}</p>
															<p>{item.date}</p>
														</div>
														<div>
															
															{
																(function(){
																	if(item.status==='提现失败'){
																		return(
																			<div>
																				<p className={styles.RecordMoneyDe}>{item.money}</p>
																				<div className={styles.RecordFail} onClick={()=>that.changeIsSu(index)}>
																					<p>提现失败</p>&nbsp;
																					<i className={item.show==true?styles.IUp:styles.Idown}></i>
																				</div>
																			</div>
																		)
																	}else if(item.status==='提现成功'){
																		return(
																			<div>
																				<p className={styles.RecordMoney}>{item.money}</p>
																				<p>提现成功</p>
																			</div>
																		)
																	}else if(item.status==='等待审核'){
																		return(
																			<div>
																				<p className={styles.RecordMoney2}>{item.money}</p>
																				<p>等待审核</p>
																			</div>
																		)
																	}else if(item.status==='等待打款'){
																		return(
																			<div>
																				<p className={styles.RecordMoney2}>{item.money}</p>
																				<p>等待打款</p>
																			</div>
																		)
																	}      
																})()
															}
														</div>
													</div>
												</div>
												{
													(function(){
														if(item.show==true){
															return(
																<div className={styles.FailMsg}> 
																	原因：{item.remark}！
																</div>
															)
														}
													})()
												}
											</div>
										)
									})
								}
								<Loading getLoadFun={laodfun} reqFun={reqFun} page={page}/>
							</div>
						</div>
					</div>
				)
			}else{
				return(
					<div>
						<Header head_title='提现记录' left_show='1' right_icon='2' header_ids="23"/>
						<DefaultPage showDefault={true} default_ids={3} />
					</div>
				)
			}
		}
		//下拉结果回调函数
		cb(){
			PtDatas(false)
		}
		changeIsSu(index){
            this.state.recprdList[index].show=!this.state.recprdList[index].show
            this.setState({
                recprdList:this.state.recprdList
            })
        }	
		componentDidMount(){
            _this=this       
            // if(balanceData.with_loading==false){
            //     getList()
			// }
			if(balanceData.with_data){
				for(let i=0;i<balanceData.with_data.length;i++){
					if(balanceData.with_data[i].status=='已拒绝'){
						balanceData.with_data[i].show=false;
					}
				}
			}
			if(PtDatas&&!balanceData.newWith.length){
                PtDatas(false)
            }
            // this.setState({
            //     recprdList:balanceData.with_data
            // })
        }
        componentWillUnmount(){
            // balanceData.with_loading=false;
            balanceData.with_data=''
        }
        componentDidUpdate (){
			console.log(111)
           
        }
	}	
	return <DepositRecord />
};
export default connect(({ balanceData }) => ({
    balanceData
}))(DepositRecord);