import React from 'react';
import styles from '../../../style/mine/DepositWay/BankCard.css';
import Header from '../../../components/PublicComponents/HeaderReturn';// 公共头部
import { connect } from 'dva';
import ChaPop from '../../../components/PublicComponents/ChaPop'
import Pick from '../../../components/PublicComponents/bottomPick'
import Linkage from '../../../components/PublicComponents/Linkage'
import $ from 'jquery'
const BankCard = ({dispatch,getUserData}) => {
	let arr=['国家开发银行','中国进出口银行','中国农业发展银行','中国银行','中国农业银行','中国工商银行','中国建设银行','成都银行','交通银行','中信银行','招商银行','浦发银行','中国光大银行','华夏银行','中国民生银行','广发银行','兴业银行','平安银行','恒丰银行','浙商银行','渤海银行','贵阳银行','重庆农村商业银行','成都农商银行','北京农商银行','上海农村银行','广州农商银行','前海微众银行','天津金城银行','温州民商银行','浙江网商银行','上海华瑞银行']
	let lingkshow_fun,bankshow_fun,cityaDta,banktypes=true,citytypes=true;
	let province,city,area;
	function LinkShow(dom){//三级联动显示
		console.log(dom.showLink)
		bankshow_fun=dom.showLink
		}
	function LinkShowCity(dom){//三级联动显示
			lingkshow_fun=dom.showLink
		}
	function getCity(data){//获取三级联动值
			$('#getCityVal').text(data.province+'-'+data.city+'-'+data.area)
			province=data.province;
			city=data.city;
			area=data.area;
		}
	let Popfun  //弹窗调用通道
		function HintWords(popDom){
			Popfun=popDom.Popfun
		}
	function getCode(data){//弹窗使用
			Popfun(data)
		}
	class BankCard extends React.Component{
		constructor(props){
			super(props);
			this.state={
				reasons:this.getUrl('bank').bank,
				address:false,
				defaultData:this.getUrl('isDefault').isDefault=='true'?true:false
			}
		}
		getBank(data){//获取三级联动值
            this.setState({
                reasons:data
            })
            console.log(data)
        }	
		textareac(){
            let text=document.getElementById('textare2');
            console.log(text.scrollHeight)
                text.style.height=text.scrollHeight+'px';
                // if(text.scrollHeight>50){
                //     text.style.textAlign='left';
                // }
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
		changeDefault(){
			let str=!this.state.defaultData
			this.setState({
				defaultData:str
			})
		}
		cb(msg,isRight){
			Popfun(msg)
			if(isRight){
				setTimeout(() => {
					window.history.go(-1)
				}, 1000);
			}
		}
		changeBank(){
			let isDe;
			if(this.state.defaultData==true){
				isDe=1
			}else{
				isDe=0
			}
			let obj={
				cardNO:this.refs.cardNO.value,
				cartName:this.refs.cartName.value,
				isDefault:isDe,
				bank:this.state.reasons,
				province:province,
				city:city,
				area:area,
				bankName:this.refs.bankName.value,
				id:this.getUrl('id').id
			}
			dispatch({
				type:'getUserData/changeBank',
				data:obj,
				cb:(msg,isRight)=>this.cb(msg,isRight)
			})
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
		render () {
            let that=this;
			return (
				<div>
                    <Header head_title='修改银行卡' left_show='1' />
					<Pick headName="选择银行" JsonDatd={arr} LinkShow={LinkShow} getCity={data => this.getBank(data)}/>
					<Linkage headName="选择地址" JsonDatd={this.state.address} LinkShow={LinkShowCity} getCity={getCity}/>
					<ChaPop HintWords={HintWords}/>
                    <div className={styles.EditBox}>
						<ul className={styles.EditUl}>
							<li>
								<span>银行卡账户姓名</span>
								<input type="text" defaultValue={this.getUrl('cartName').cartName} placeholder="请输入您的银行卡账户姓名" ref='cartName'/>
							</li>
							<li>
								<span>银行卡账号</span>
								<input type="number" defaultValue={this.getUrl('cardNO').cardNO} placeholder="请输入您的银行卡账户" ref='cardNO'/>
							</li> 
							<li>
								<span>请选择银行</span>
								<div className={styles.choiceBank} id='xuanBank'>
									<p>{!!this.state.reasons==false?this.getUrl('bank').bank:this.state.reasons}</p>
									&nbsp;&nbsp;
									<img src="/src/assets/Mine-back.png" alt=""/>
								</div>
							</li>
							<li>
								<span>开户地区</span>
								<div className={styles.choiceBank} id='xuanCity'>
									<p id='getCityVal'>{this.getUrl('province').province+'-'+this.getUrl('city').city+'-'+this.getUrl('area').area}</p>
									&nbsp;&nbsp;
									<img src="/src/assets/Mine-back.png" alt=""/>
								</div>
							</li>  
							<li>
								<span>开户行名称</span>
								<textarea name="" id="textare2" onChange={this.textareac} defaultValue={this.getUrl('bankName').bankName} placeholder="请输入您的银行卡开户行名称" ref='bankName'></textarea>
							</li>
						</ul>  
					</div>
					<div className={styles.AlipayDefault} onClick={()=>this.changeDefault()}>
							{
								this.state.defaultData==true?<img src="/src/assets/Mine-check-red.png" alt=""/>:<img src="/src/assets/Mine-pay-nocheck.png" alt=""/>
							}
							<p>设置为默认提现方式</p>
						</div>
						<div className={styles.AlipayBtn} onClick={()=>this.changeBank()}>
							确定
						</div>
						<div className={styles.ConsumeContent}>
                            <div>温馨提示</div>
                            <p>1.请填写真实有效的银行卡帐号信息，如因填写帐号信息不正确导致提现失败，艾家公社概不负责。 </p>
                            {/* <p>2.帐号信息一经绑定不可修改，如绑定帐号信息填写错误请联系客服。 </p> */}
                            <p>2.客服电话：028-9669999</p>
                        </div>
				</div>
			)
		}
		componentDidMount(){
			this.getaddress()
			province=this.getUrl('province').province;
			city=this.getUrl('city').city;
			area=this.getUrl('area').area;
			this.textareac()
			$('#xuanBank').click(function(){//银行选择
				bankshow_fun(banktypes)
			})
			$('#xuanCity').click(function(){//地址选择
				lingkshow_fun(citytypes)
            })
		}
		componentWillUnmount(){ 
			//重写组件的setState方法，直接返回空
			this.setState = (state,callback)=>{
			  return;
			};  
		} 
	}	
	return <BankCard />
};
export default connect(({ getUserData }) => ({
    getUserData
  }))(BankCard);   