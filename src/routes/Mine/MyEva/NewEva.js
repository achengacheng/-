import React from 'react';
import styles from '../../../style/mine/MyEva/NewEva.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import PictureUpload from "../../../components/PublicComponents/PictureUpload"
import { connect } from 'dva';
import ChaPop from '../../../components/PublicComponents/ChaPop'
import MsgDetails from '../MsgCenter/MsgDetails';
const CheckProgress = ({EvaPageData,dispatch}) => {
    let imgBase64;let imgNames;
    function getImg(base,name){
        console.log(base,name)
        imgBase64=base;
        imgNames=name;
    }
    let Popfun  //弹窗调用通道
		function HintWords(popDom){
			Popfun=popDom.Popfun
		}
	function getCode(data){//弹窗使用
			Popfun(data)
        }
    //上传图片函数
    function pushOssfun(datas,data,cb){
		dispatch({
			type:'EvaPageData/pushOssfun',
            data:datas,
            dataBox:data,
            cb:cb
		})
    }
	class CheckProgress extends React.Component{
        constructor(props){
            super(props);
            this.state={
                starts:[1,1,1,1,1],
                nums:5,
                audit:0,
                fontNum:0
            }
        }
		render () {
            let that=this;
			return (
				<div>
                    <Header head_title='发布评价' left_show='1'/>
                    <ChaPop HintWords={HintWords}/>
                    <div className={styles.EvaPageWrap}>
                        <div className={styles.ReturnReson}>
                            <div>
                                商品评分
                            </div>
                            <div className={styles.ReturnChoice}>
                                {
                                    this.state.starts.map(function(item,index){
                                        return(
                                            <img src={item==0?"/src/assets/Mine-star-blank.png":"/src/assets/Mine-star-red.png"} alt="" onClick={()=>that.setStart(index)} key={index}/>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={styles.ReturnText}>
                            <div>
                                <textarea name="" id="textArea" className={styles.textArea} placeholder="宝贝是否满足了您的期待？说说您使用的心得分享给其他/她想购买的朋友吧!"  ref="eva" onChange={()=>this.fontChange()} onFocus={()=>this.inputFocus()} onBlur={()=>this.inputBlur()}></textarea>
                                <span>{this.state.fontNum}/100</span>
                            </div>
                        </div>
                        <div className={styles.ReturnQq}>
                            <p>匿名评论</p>
                            <i className={this.state.audit==0?styles.defaultIcon:styles.defaultIcon2} onClick={()=>this.hidePut()}></i>
                        </div>
                        <div className={styles.ReturnImgBox}>
                            <PictureUpload num="9" getImg={getImg}/>
                        </div>
                        <div className={styles.ReturnPerson}>
                            <div className={styles.ReturnBtn} onClick={()=>this.putData()}>提交</div>
                        </div>
                    </div>
				</div>
			)
        }
        /*获取焦点*/
	    inputFocus(){
            if(!this.refs.eva.value){
                this.refs.eva.placeholder ='';
            }
        }
        /*失去焦点*/
        inputBlur(){
            if(!this.refs.eva.value){
                this.refs.eva.placeholder = '宝贝是否满足了您的期待？说说您使用的心得分享给其他/她想购买的朋友吧!'
            }
        }
        //设置评分星星
        setStart(index){
            let arr=[0,0,0,0,0];
            if(index==0&&this.state.starts[0]===1){
                this.setState({
                    starts:arr,
                    nums:0
                })
            }else{
                for(let i=0;i<=index;i++){
                    arr[i]=1 
                }
                this.setState({
                    starts:arr,
                    nums:index+1
                })
            }
        }
        hidePut(){
            if(this.state.audit==0){
                this.setState({
                    audit:1
                })
            }else{
                this.setState({
                    audit:0
                })
            }
        }
        fontChange(){
            let num=this.refs.eva.value.length;
            this.setState({
                fontNum:num
            })
        }
        //提交的回调函数
        cb(msg,type){
            Popfun(msg);
            if(type==1){
                console.log(2)
                setTimeout(function(){
                    window.history.go(-1);
                },1000)
            }
        }
        //提交评论
        putData(){
            // let box=afterData.imgBox.join('')
            let data='userId='+sessionStorage.getItem('id')+'&id='+this.getUrl('id').id+'&level='+this.state.nums+'&content='+this.refs.eva.value+'&type=Goods'+'&audit='+this.state.audit;
            let imgBox={
                Credential:EvaPageData.ossData.Credential,
                pathInfo:EvaPageData.ossData.pathInfo,
                file:imgBase64,
                filename:imgNames
            }
            if(imgBox.file){
                pushOssfun(imgBox,data,this.cb)
            }else{
                dispatch({
                    type:'EvaPageData/putData',
                    data:data,
                    picBox:'',
                    cb:(msg,type)=>this.cb(msg,type)
                })
            }
        }
        // putData(){
        //     let data='userId='+sessionStorage.getItem('id')+'&id='+this.getUrl('id').id+'&level='+this.state.nums+'&content='+this.refs.eva.value+'&type=Goods'+'&audit='+this.state.audit;
        //     dispatch({
        //         type:'EvaPageData/putData',
        //         data:data,
        //         cb:(msg,type)=>this.cb(msg,type)
        //     })
        // }	
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
	}	
	return <CheckProgress />
};
export default connect(({ EvaPageData }) => ({
    EvaPageData
  }))(CheckProgress);