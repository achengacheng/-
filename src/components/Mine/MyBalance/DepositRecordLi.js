import React from 'react';
import styles from '../../../style/mine/MyBalance/MyBalance.css';
import { connect } from 'dva'; 
import Loading from '../../PublicComponents/LoadingCom';
import DefaultPage from '../../../components/PublicComponents/DefaultPage';//缺省页面

const DepositRecordLi = ({balanceData,dispatch}) => {
    let _this,PtDatas,typePt,page=balanceData.recordPage;
	function laodfun(dom){
        PtDatas=dom.ptData
    }  
    
	function reqFun(pages){
        balanceData.recordPage++
        dispatch({ 
            type:'balanceData/withRecord',
            page:pages,
            rows:8
        })
	}
	class DepositRecordLi extends React.Component{
        constructor(props){
            super(props)
            this.state={
                recprdList:''
            }
        }
        changeIsSu(index){
            this.state.recprdList[index].show=!this.state.recprdList[index].show
            this.setState({
                recprdList:this.state.recprdList
            })
        }		
		render () {            
            if(balanceData.with_loading==true&&this.state.recprdList!=''){
                let that=this;
                return (
                    <div>
                        {
                            balanceData.with_data.map(function(item,index){
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
                                                            if(item.status=='已拒绝'){
                                                                return(
                                                                    <div>
                                                                        <p className={styles.RecordMoneyDe}>{item.money}</p>
                                                                        <div className={styles.RecordFail} onClick={()=>that.changeIsSu(index)}>
                                                                            <p>提现失败</p>&nbsp;
                                                                            <i className={item.show==true?styles.IUp:styles.Idown}></i>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }else if(item.status=='已打款'){
                                                                return(
                                                                    <div>
                                                                        <p className={styles.RecordMoney}>{item.money}</p>
                                                                        <p>提现成功</p>
                                                                    </div>
                                                                )
                                                            }else if(item.status=='待审核'){
                                                                return(
                                                                    <div>
                                                                        <p className={styles.RecordMoney2}>{item.money}</p>
                                                                        <p>等待审核</p>
                                                                    </div>
                                                                )
                                                            }else if(item.status=='待打款'){
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
                                                            原因：账号错误，请重新提交！
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
                )
            }else{
                return(
                    <DefaultPage showDefault={true} default_ids={3} />
                )
            }
			
        }
        componentDidMount  (){
            _this=this       
            
            if(balanceData.with_loading==false){
                dispatch({ 
                    type:'balanceData/withRecord',
                    page:1,
                    rows:8
                })
            }
            for(let i=0;i<balanceData.with_data.length;i++){
                if(balanceData.with_data[i].status=='已拒绝'){
                    balanceData.with_data[i].show=false;
                }
            }
            this.setState({
                recprdList:balanceData.with_data
            })
        }
        componentWillUnmount(){
            balanceData.with_loading=false;
            balanceData.with_data=''
        }
        componentDidUpdate (){
            if(PtDatas&&!balanceData.newWith.length){
                PtDatas(false)
            }
        }
	}	
	return <DepositRecordLi />
};
export default connect(({ balanceData }) => ({
    balanceData
}))(DepositRecordLi);