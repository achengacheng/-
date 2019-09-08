import React from 'react';
import { connect } from 'dva';
// import styles from '../../../style/mine/MyBalance/MyBalance.css';
import ConsumeHead from '../../../components/Mine/MyConsume/ConsumeHead';
import ConsumeLi from '../../../components/Mine/MyConsume/ConsumeLi';
import Loading from '../../../components/PublicComponents/LoadingCom';
import Header from '../../../components/PublicComponents/Header';// 公共头部
const BalancePage = ({consumeData,dispatch}) => {
	let _this,PtDatas,typePt,page=consumeData.res_page;
	function laodfun(dom){
        PtDatas=dom.ptData
    }  
	function reqFun(pages){
        consumeData.res_page++
        getData()
	}
	//下拉加载回调函数
    function getData(){
        dispatch({ 
            type:'consumeData/upLoad',
            page:consumeData.res_page,
            rows:8,
            cb:()=>PtDatas(false)
        })
    }
	class BalancePage extends React.Component{
		constructor(props){
            super(props);
            this.state={
                conDate:[]
            }
        }	
		render () {
				return (
					<div>
						<Header  left_icon='1' right_icon='2' header_title="我的消费记录" left_fun={()=>this.goBack()}/>
						<ConsumeHead />
						<ConsumeLi listData={this.state.conDate}/>
						<Loading getLoadFun={laodfun} reqFun={reqFun} page={page}/>
					</div>
				)
			
		}
		goBack(){
            window.history.go(-1)
		}
		//下拉数据处理
		dataGroup(){
			let arr=[];
			for(let i=0;i<consumeData.res_group.length;i++){
				let obj={};
				let newArr=[];
				obj.date=consumeData.res_group[i].date;
				obj.total=consumeData.res_group[i].price;
				for(let n=0;n<consumeData.res_datas.length;n++){
					if(consumeData.res_datas[n].date.indexOf(consumeData.res_group[i].date)!=-1){
						let str=consumeData.res_datas[n].date.split('月');
						consumeData.res_datas[n].dates=str[1]
						newArr.push(consumeData.res_datas[n])
					}
				}
				obj.data=newArr;
				if(obj.data!=''){
					arr.push(obj)
				}
			}
			this.setState({
				conDate:arr
			})
			
		   return arr;
		}	
		componentDidMount(){
			 if(consumeData.loading==true){
				this.dataGroup()
			 }
            // if(consumeData.loading==false){
            //     dispatch({
            //         type:'consumeData/getConFeeData'
            //     })
			// }
			// if(consumeData.moreLoading==false){
            //     dispatch({
			// 		type:'consumeData/upLoad',
			// 		page:1,
			// 		rows:8
            //     })
			// }
        }
        // componentWillUnmount(){
            
        // }
	}	
	return <BalancePage />
};
export default connect(({ consumeData }) => ({
    consumeData
}))(BalancePage);