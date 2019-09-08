import React from 'react';
import styles from '../../../style/mine/AfterSaleService.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import OrderTail from '../../../components/Mine/MyOrder/OrderTail'
import { Link } from 'dva/router'
import { connect } from 'dva';
const CheckProgress = ({dispatch,afterData}) => {
	class CheckProgress extends React.Component{
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
			if(afterData.step_load==true){
				return (
					<div>
						<Header head_title='审核进度' left_show='1' header_ids='12'/>
						<div className={styles.checkHead}>
							<div>服务单号:{afterData.step_datas.servNo}</div>
							<div>申请时间:{afterData.step_datas.applyTime}</div>
						</div>
						<div className={styles.checkMsg}>审核进度：{afterData.step_datas.historyList[0].memo}</div>
						<OrderTail id="0" data={afterData.step_datas.historyList}/>
					</div>
				)
			}else{
				return(
					<div></div>
				)
			}
			
		}
		componentDidMount(){
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
	return <CheckProgress />
};
export default connect(({ afterData }) => ({
    afterData
  }))(CheckProgress);