import React from 'react';
import styles from '../../../style/mine/SystemSet/Feedback.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import Pick from '../../../components/PublicComponents/bottomPick'
import PicUp from '../../../components/PublicComponents/PictureUpload'
import ChaPop from '../../../components/PublicComponents/ChaPop'
import $ from 'jquery'
const CheckProgress = () => {
    let arr=['商品相关','物流状况','客户服务','优惠活动','产品体验','产品功能','其他'];
    let lingkshow_fun,cityaDta,citytypes=true;
    let Popfun //弹窗调用通道
    function HintWords(popDom){
        Popfun=popDom.Popfun
    }
    function LinkShow(dom){//三级联动显示
    lingkshow_fun=dom.showLink
    }
    function getImg(base,name){
        console.log(base,name)
    }
	class CheckProgress extends React.Component{
        constructor(props){
            super(props);
            this.state={
                reasons:'',
                fontNum:0,
            }
        }	
		render () {
			return (
				<div>
                    <Header head_title='意见反馈' left_show='1'/>
                    <Pick headName="反馈类型" JsonDatd={arr} LinkShow={LinkShow} getCity={data => this.getCity(data)}/>
                    <ChaPop HintWords={HintWords}/>
                    <div className={styles.ReturnWrap}>
                        <div className={styles.ReturnReson} id='xuanCity'>
                            <div id='text'>
                                {!!this.state.reasons==false?'请选择反馈类型':this.state.reasons}
                            </div>
                            <div className={styles.ReturnChoice}>
                                {/* <i id='text'>{this.state.reasons}</i> &nbsp; */}
                                <img src="/src/assets/Mine-back.png" alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.ReturnText}>
                        <div>
                            <textarea name="" id="" placeholder="请写下您对艾家公社的感受，我们将认真听取您的意见，努力提供更优质的服务" ref="returnText" onChange={()=>this.fontChange()} maxLength="100"></textarea>
                            <span>{this.state.fontNum}/100</span>
                        </div>
                    </div>
					<div className={styles.ReturnQq}>
						<p>手机/邮箱/QQ</p>
						<input type="text" placeholder="请输入您的手机号/邮箱/QQ(选填)"/>
					</div>
                    <div className={styles.ReturnImgBox}>
                        <PicUp num='6' getImg={getImg}/>
                    </div>
                    <div className={styles.ReturnPerson}>
                        <div className={styles.ReturnBtn} onClick={()=>this.upData()}>提交</div>
                    </div>
				</div>
			)
        }
        //提交
        upData(){
            if(this.state.fontNum===0){
                Popfun('请输入提交内容!')
            }else{
                Popfun('提交成功!')
                setTimeout(() => {
                    window.history.go(-1)
                }, 1000);
            }
        }
        fontChange(){
            let num=this.refs.returnText.value.length;
            this.setState({
                fontNum:num
            })
        }
        getCity(data){//获取三级联动值
            this.setState({
                reasons:data
            })
            $('#text').val(data)
            console.log(data)
        }
        componentDidMount(){
            $('#xuanCity').click(function(){//城市选择
				lingkshow_fun(citytypes)
            })
        }
	}	
	return <CheckProgress />
};
export default CheckProgress;