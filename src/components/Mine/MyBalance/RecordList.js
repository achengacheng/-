import React from 'react';
import styles from '../../../style/mine/MyBalance/MyBalance.css';
import { connect } from 'dva';
import Loading from '../../PublicComponents/LoadingCom';
import DefaultPage from '../../../components/PublicComponents/DefaultPage';//缺省页面

const RecordList = ({balanceData,dispatch}) => {
    let _this,PtDatas,typePt,page=balanceData.ExPage;
	function laodfun(dom){
        PtDatas=dom.ptData
    }  
	class RecordList extends React.Component{
        constructor(props){
            super(props);
            this.state={
                recordDate:''
            }
        }
        reqFun(pages){
            balanceData.ExPage++
            dispatch({ 
                type:'balanceData/recordData',
                page:pages,
                rows:10,
                cb:()=>PtDatas(false),
            })
        }
        //处理月份和每月的收支记录
        dataGroup(){
            let arr=[];
            for(let i=0;i<balanceData.record_group.length;i++){
                let obj={};
                let newArr=[];
                obj.date=balanceData.record_group[i].date;
                obj.income=balanceData.record_group[i].income;
                obj.expenses=balanceData.record_group[i].expenses;
                for(let n=0;n<balanceData.record_data.length;n++){
                    if(balanceData.record_data[n].date.indexOf(balanceData.record_group[i].date)!=-1){
                        newArr.push(balanceData.record_data[n])
                    }
                }
                obj.data=newArr;
                if(obj.data!=''){
                    arr.push(obj)
                }
            }
            this.setState({
                recordDate:arr
            })
           return arr;
        }		
		render () {
            // console.log(this.state.recordDate)
            if(balanceData.record_loading==true&&this.state.recordDate!=''){
                return (
                        <div>
                             {
                                this.state.recordDate.map(function(item,index){
                                    return(
                                        <div className={styles.recordFoot} key={index}>
                                            <div className={styles.recordListHeader}>
                                                <div className={styles.recordListTime}>
                                                    <img src="/src/assets/Mine-time.png" alt=""/> &nbsp;
                                                    <p>{item.date}</p>
                                                </div>
                                                <div className={styles.recordTag}>
                                                    <div>
                                                        <p>收入(元)</p>
                                                        <p>{item.income}</p>
                                                    </div>
                                                    <div>
                                                        <p>支出(元)</p>
                                                        <p>{item.expenses}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.recordList}>
                                                {
                                                    item.data.map(function(item,index){
                                                        return(
                                                            <div className={styles.recordListLi} key={index}>
                                                                <div>
                                                                    <p>{item.name}</p>
                                                                    <p>{item.date}</p>
                                                                </div>
                                                                <div className={item.money.indexOf('-')==-1?styles.getMoney:styles.costMoney}>{item.money}</div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <Loading getLoadFun={laodfun} reqFun={this.reqFun} page={page}/>
                        </div>
                )
            }else{
                return(
                    <DefaultPage showDefault={true} default_ids={3} />
                )
            }
			
        }
        componentDidMount(){
           if(balanceData.record_loading==true){
                this.dataGroup();
            }
        }
        componentWillUnmount(){
            balanceData.record_loading=false;
            balanceData.record_data=[]
        }
	}	
	return <RecordList />
};
export default connect(({ balanceData }) => ({
    balanceData
}))(RecordList);