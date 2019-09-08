import React from 'react';
import styles from '../../../style/mine/AfterSaleService.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import Pick from '../../../components/PublicComponents/bottomPick'
import PicUp from '../../../components/PublicComponents/PictureUpload'
import { Link } from 'dva/router'
import $ from 'jquery'
import { connect } from 'dva';
import ChaPop from '../../../components/PublicComponents/ChaPop'

const CheckProgress = ({dispatch,afterData}) => {
    let Popfun  //弹窗调用通道
    function HintWords(popDom){
        Popfun=popDom.Popfun
    }
    function getCode(data){//弹窗使用
        Popfun(data)
    }
    let lingkshow_fun,cityaDta,citytypes=true;
    function LinkShow(dom){//三级联动显示
    lingkshow_fun=dom.showLink
    }
	class CheckProgress extends React.Component{
        constructor(props){
            super(props);
            this.state={
                reasons:'',
                fontNum:0,
                afterPayType:1,
                arr:afterData.returnReasonData
            }
        }
        getCity(data){//获取三级联动值
            this.setState({
                reasons:data
            })
            console.log(data)
        }
        choiceType(type){
            this.setState({
                afterPayType:type
            })
        }
        cb(msg){
            Popfun(msg)
        }
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
        cb(msg){
            Popfun(msg)
        }
        fontChange(){
            let num=this.refs.returnText.value.length;
            this.setState({
                fontNum:num
            })
        }
        putData(){
            let data='userId='+sessionStorage.getItem('id')+'&orderId='+this.getUrl('id').id+'&reason='+this.state.reasons+'&description='+this.refs.returnText.value+'&afterPayType='+this.state.afterPayType+'&link='+JSON.stringify({'name':this.refs.name.value,'phone':this.refs.phone.value});
            dispatch({
                type:'afterData/returnMoney',
                data:data,
                cb:(msg)=>this.cb(msg)
            })
            // console.log(this.refs.returnText)
        }	
		render () {
            if(this.state.arr){
                return (
                    <div>
                        <Header head_title='申请退款' left_show='1' header_ids='12'/>
                        <ChaPop HintWords={HintWords}/>
                        <Pick headName="反馈类型" JsonDatd={this.state.arr} LinkShow={LinkShow} getCity={data => this.getCity(data)}/>
                        <div className={styles.ReturnReson1}>
                            <div>
                                退款原因
                            </div>
                            <div className={styles.ReturnChoice} id='xuanCity'>
                                <p>{!!this.state.reasons==false?'请选择':this.state.reasons}</p>
                                <img src="/src/assets/Mine-back.png" alt=""/>
                            </div>
                        </div>
                        <div className={styles.ReturnText}> 
                            <p>问题描述</p>
                            <div>
                                <textarea name="" id="" placeholder="请输入退款申请描述" ref="returnText" onChange={()=>this.fontChange()}></textarea>
                                <span>{this.state.fontNum}/500</span>
                            </div>
                        </div>
                       
                        <div className={styles.ReturnPerson}>
                            <div className={styles.ReturnPersonHead}>联系方式</div>
                            <div className={styles.ReturnPersonInput}><span>联系人: </span><input type="text" defaultValue={this.getUrl('name').name} ref="name" /></div>
                        <div className={styles.ReturnPersonInput}><span>联系电话: </span><input type="text" defaultValue={this.getUrl('phone').phone} ref="phone" /></div>
                            {/* <Link to="/mypage/AfterSaleServicePage/SubmitSuccess"> */}
                                <div className={styles.ReturnBtn} onClick={()=>this.putData()}>提交</div>
                            {/* </Link> */}
                            <div className={styles.ReturnTips}>
                                <p className={styles.ReturnTipsTitle}>温馨提示</p>
                                <p>• 商品寄回地址将在审核通过后以短信形式告知，或在申请记录中查询。</p>
                                <p>• 提交服务单后，售后专员可能与您电话沟通，请保持手机畅通。</p>
                                <p>• 退货处理成功后退款金额将原路返回到您的支持账户中。</p>
                            </div>
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
            $('#xuanCity').click(function(){//城市选择
				lingkshow_fun(citytypes)
            })
            if(afterData.return_loading==true){
                console.log(2222)
                dispatch({
                    type:'afterData/goBack',
                    addr:'/mypage/AfterSaleServicePage/SubmitSuccess?time='+afterData.return_data.applyTime+'&type='+afterData.return_data.type.msg+'&id='+afterData.return_data.applyId
                })
            }
        }
        componentWillUnmount(){
            afterData.return_loading=false;
        }	
	}	
	return <CheckProgress />
};
export default connect(({ afterData }) => ({
    afterData
  }))(CheckProgress);