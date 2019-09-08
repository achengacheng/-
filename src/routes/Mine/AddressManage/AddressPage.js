import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router'
import styles from '../../../style/mine/AddressManage.css';
import HeaderReturn from '../../../components/PublicComponents/HeaderReturn'
import ButtonPop from '../../../components/PublicComponents/ButtonPop'
import ChaPop from '../../../components/PublicComponents/ChaPop'
const AddressPage =({dispatch,AddressPageData})=>{
    let Popfun  //弹窗调用通道
    function HintWords(popDom){
        Popfun=popDom.Popfun
    }
    function getCode(data){//弹窗使用
        Popfun(data)
    }
    class AddressPage extends React.Component{
        constructor(props){
            super(props)
            this.state={
                addressData:AddressPageData.res_datas.data,
                load:AddressPageData.loading,
                ButtonHint:{
                    title:"是否确定删除？",//标题
                    type:2,//按钮数1/2
                    hide:true//是否展示
                }
            }
        }
        changeDefault(id,index){
            dispatch({
                type:'AddressPageData/changeDefaultAddress',
                data:id
            })
            for(let i=0;i<this.state.addressData.length;i++){
                this.state.addressData[i].defaults=0;
            }
            this.state.addressData[index].defaults=1;
            this.setState({
                addressData:this.state.addressData
            })
            // dispatch({
            // 	type:'AddressPageData/getAddressData'
            // })
        }
        consoles(id,index){
            dispatch({
                type:'AddressPageData/deleteData',
                data:id,
                cb:Popfun
            })
            this.setState({
                ButtonHint:{
                    title:"是否确定删除？",//标题
                    type:2,//按钮数1/2
                    hide:true//是否展示
                }
            })
            this.state.addressData.splice(index,1);
            this.setState({
                addressData:this.state.addressData
            })
        }
        cancelWay(){
            this.setState({
                ButtonHint:{
                    title:"是否确定删除？",//标题
                    type:2,//按钮数1/2
                    hide:true//是否展示
                }
            })
        }
        deletes(id,index,cb){
            this.setState({
                ButtonHint:{
                    title:"是否确定删除？",//标题
                    type:2,//按钮数1/2
                    hide:false//是否展示
                }
            })
            AddressPageData.deleteId=id;
            AddressPageData.deleteIndex=index;
        }
		render(){
            let that=this;
		 	return( <div>
			 			<HeaderReturn head_title="地址管理" left_show='1'/>
                        <ButtonPop ButtonHint={this.state.ButtonHint} confirm={()=>this.consoles(AddressPageData.deleteId,AddressPageData.deleteIndex)} cancel={()=>this.cancelWay()}/>
                        <ChaPop HintWords={HintWords}/>
			 			<div className={styles.AddressPerson}>
                            {
                                    (function(){
                                        if(that.state.load){
                                            return(
                                                that.state.addressData.map(function(item,index){
                                                    return(
                                                        <div className={styles.AddressBox} key={index}>
                                                            {
                                                                item.defaults?<img src="/src/assets/Mine-def.png" alt=""/>:null
                                                            }
                                                            <div className={styles.AddressName}>
                                                                <p><span>{item.consignee}</span> &nbsp; {item.receivingPhone}</p>
                                                                <p>{item.province+item.city+item.area+item.detail}</p>
                                                            </div>
                                                            <div className={styles.AddressSet}>
                                                                <div>
                                                                    <i className={item.defaults?styles.AddressDefult:styles.AddressDefultNo}></i>&nbsp;
                                                                    <p onClick={()=>that.changeDefault(item.id,index)}>设为默认</p>
                                                                </div>
                                                                <div className={styles.AddressBtns}>
                                                                    <div>
                                                                        <img src="/src/assets/Mine-rite.png" alt=""/>&nbsp;
                                                                        <Link to={"/mypage/AddressPage/EditConsignee?name="+item.consignee+'&phone='+item.receivingPhone+'&area='+item.province+'-'+item.city+'-'+item.area+'&mail='+ item.postalCode +'&detail='+item.detail+'&defaults='+item.defaults+'&id='+item.id}>
                                                                            <p>编辑</p>
                                                                        </Link>
                                                                    </div>&nbsp;&nbsp;&nbsp;
                                                                    <div>
                                                                        <img src="/src/assets/Mine-del.png" alt=""/>&nbsp;
                                                                        <p onClick={()=>that.deletes(item.id,index)}>删除</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            )
                                        }
                                    })()
                                    
                            }
			 			</div>
                        <Link to="/mypage/AddressPage/AddConsignee">
                            <div className={styles.AddressBottom}>
                                +添加新收货人
                            </div> 
                        </Link>
		 			</div>
		 		)
        }
	}
	return <AddressPage />
}
export default connect(({ AddressPageData }) => ({
    AddressPageData
  }))(AddressPage);