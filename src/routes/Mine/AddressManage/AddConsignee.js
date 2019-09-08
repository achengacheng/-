import React from 'react';
import { connect } from 'dva';
import { Link,routerRedux} from 'dva/router'
import styles from '../../../style/mine/AddressManage.css';
import HeaderReturn from '../../../components/PublicComponents/HeaderReturn'
import Linkage from '../../../components/PublicComponents/Linkage'
import ChaPop from '../../../components/PublicComponents/ChaPop'
import $ from 'jquery'
// 截取URL传输数据
const EditConsignee =({dispatch,AddressPageData})=>{
    let excludeSpecial = function(str) {
        var str1 = str.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');// 去掉转义字符 
        var str2= str.replace(/[\-\_\,\!\|\~\`\(\)\#\$\%\^\&\*\{\}\:\;\"\L\<\>\?]/g, '');// 去掉特殊字符
        return str2;
    }
    let lingkshow_fun,cityaDta,citytypes=true;
        function LinkShow(dom){//三级联动显示
            lingkshow_fun=dom.showLink
        }
        function getCity(data){//获取三级联动值
            $('#getCityVal').text(data.province+'-'+data.city+'-'+data.area)
        }
      let Popfun  //弹窗调用通道
      function HintWords(popDom){
          Popfun=popDom.Popfun
      }
      function getCode(data){//弹窗使用
          Popfun(data)
      }
	class EditConsignee extends React.Component{
        textareac(){
            let text=document.getElementById('textare2');
                text.style.height=text.scrollHeight+'px';
                // if(text.scrollHeight>50){
                //     text.style.textAlign='left';
                // }
        }
        //修改默认地址
        changeDefault(id){
            dispatch({
                type:'AddressPageData/changeDefaultAddress',
                data:id
            })
            if(this.state.defaults==0){
                this.setState({
                    defaults:1
                })
            }else{
                this.setState({
                    defaults:0
                })
            }
        }
        cb(){
            Popfun("新增成功!")
            setTimeout(function(){
                // dispatch({
                //     type:'AddressPageData/goBack'
                // })
                window.history.go(-1);
            },1000)
        }
        defaultCb(msg){
            AddressPageData.upLoading=false;
            Popfun(msg)
        }
        getaddress(){//获取地址JSON文件
        	let data,_this=this
        	if(!this.state.address){
        		$.getJSON('./src/adress.json', function(json, textStatus) {
					 data=json;
					 _this.setState({address:data})
				});		
        	}
        }
        postData(){
            let changeAdress=$('#getCityVal').text().split('-')
            let  re = /^1\d{10}$/;
            if(!re.test(this.refs.tel.value)){
                Popfun('请输入正确的手机号。')
            }else if(changeAdress[0]==='请选择区域'){
                Popfun('请输入正确的区域。')
            }
            else{
                let data={
                    consignee :this.refs.name.value,
                    receivingPhone :this.refs.tel.value,
                    postalCode:this.refs.mailNum.value,
                    province:changeAdress[0],
                    city:changeAdress[1],
                    area:changeAdress[2],
                    detail:this.refs.detail.value,
                    userId:sessionStorage.getItem('id'),
                    defaults:this.state.defaults
                }
                if(!AddressPageData.upLoading){
                    AddressPageData.upLoading=true;
                    dispatch({
                        type:'AddressPageData/addData',
                        data:data,
                        cb:()=>this.cb(),
                        failCb:(msg)=>this.defaultCb(msg)
                    })
                }
            }
        }
        //修改地址信息
        // postData(){
        //     let changeAdress=$('#getCityVal').text().split('-')
        //     let data={
        //         consignee :this.refs.name.value,
        //         receivingPhone :this.refs.tel.value,
        //         postalCode:this.refs.mailNum.value,
        //         province:changeAdress[0],
        //         city:changeAdress[1],
        //         area:changeAdress[2],
        //         detail:this.refs.detail.value,
        //         userId:sessionStorage.getItem('id'),
        //         defaults:this.state.defaults
        //     }
        //     if(!AddressPageData.upLoading){
        //         AddressPageData.upLoading=true;
        //         dispatch({
        //             type:'AddressPageData/addData',
        //             data:data,
        //             cb:()=>this.cb(),
        //             failCb:(msg)=>this.defaultCb(msg)
        //         })
        //     }
        // }
        constructor(props){
            super(props)
            this.state={
                defaults:0,
                addrBox:'',
                change:false
            }
        }
		render(){
		 	return( <div>
			 			<HeaderReturn head_title="新增收货人" left_show='1'/>
                         <Linkage headName="选择地址" JsonDatd={this.state.address} LinkShow={LinkShow} getCity={getCity}/>
			 			<div className={styles.EditBox}>
                            <ul className={styles.EditUl}>
                                <li>
                                    <span>姓名</span>
                                    <input type="text"  ref="name" placeholder="请输入收货人姓名"/>
                                </li>
                                <li>
                                    <span>手机号码</span>
                                    <input type="text" ref="tel" placeholder="请输入手机号码"/>
                                </li> 
                                <li>
                                    <span>邮编</span>
                                    <input type="text"  ref="mailNum" placeholder="请输入邮政编码"/>
                                </li>
                                <li>
                                    <span>所在区域</span>
                                    <div className={styles.addrBox} id='xuanCity'>
                                        <div id='getCityVal'>请选择区域</div> &nbsp;
                                        <img src="/src/assets/Mine-back.png" alt=""/>
                                    </div>
                                </li>  
                                <li>
                                    <span>详细地址</span>
                                    <textarea name="" id="textare2" onChange={this.textareac}  ref="detail" placeholder="街道、楼牌号等详细地址"></textarea>
                                </li>
                                <li className={styles.EditLiBtn}>
                                    <span>设为默认</span>
                                    <i className={this.state.defaults==0?styles.EditLiDefaultBtn1:styles.EditLiDefaultBtn2} onClick={()=>this.changeDefault(1)}></i>
                                </li>   
                            </ul>  
                            <div className={styles.EditBoxBtn} onClick={()=>this.postData()}>
                                保存
                            </div>
                        </div>
                        <ChaPop HintWords={HintWords}/>
		 			</div>
		 		)
        }
        componentDidMount(){
            this.textareac()
            $('#xuanCity').click(function(){//城市选择
				lingkshow_fun(citytypes)
				citytypes=false
			})
            this.getaddress();
            if(AddressPageData.change.success==true){ 
                Popfun("新增成功!")
                setTimeout(function(){
                    dispatch({
                        type:'AddressPageData/goBack'
                    })
                },1000)
             }else if(AddressPageData.change.success==false){
                Popfun(AddressPageData.change.alertMsg.msg)
             }
        }
        componentWillUnmount(){
            AddressPageData.upLoading=false;
            AddressPageData.change.success='test';
            this.setState = (state,callback)=>{
                return;
              };  
        }
	}
	return <EditConsignee />
}
export default connect(({ AddressPageData }) => ({
    AddressPageData
  }))(EditConsignee);