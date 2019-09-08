import React from 'react';
import styles from '../../../style/mine/AfterSaleService.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import { Link } from 'dva/router'

const SubmitSuccess = () => {
    //后退
    function goback(){
        window.history.go(-1)
    }
	class SubmitSuccess extends React.Component{
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
			return (
				<div>
                    <Header head_title='提交成功' header_ids='11' right_fun={goback}/>
                    <div className={styles.successIcon}>
                        <div className={styles.successTop}>
                            <img src="/src/assets/Mine-success.png" alt=""/>
                            <p>售后申请提交成功</p>
                        </div>
                        <div  className={styles.successTime}>
                            <p>申请时间：{this.getUrl('time').time}</p>
                            <p>申请类型：{this.getUrl('type').type}</p>
                        </div>
                        <div className={styles.successBtnBox}>
                            <div>
                                <Link to={"/mypage/AfterSaleServicePage/RecordDetails?id="+this.getUrl('id').id}>  
                                    查看记录
                                </Link>
                            </div>
                                <div>
                                    <Link to={'/'}>      
                                        回到首页
                                    </Link>
                                </div>
                        </div>
                        <div className={styles.successTipsBox}>
                            <div className={styles.ReturnTips}>
                                <p>温馨提示：</p>
                                <p>• 商品寄回地址将在审核通过后以短信形式告知，或在申请记录中查询。</p>
                                <p>• 提交服务单后，售后专员可能与您电话沟通，请保持手机畅通。</p>
                                <p>• 退货处理成功后退款金额将原路返回到您的支持账户中。</p>
                            </div>
                        </div>
                    </div>
				</div>
			)
		}
	}	
	return <SubmitSuccess />
};

export default SubmitSuccess;