import React from 'react';
import $ from 'jquery';
import { connect } from 'dva';
import styles from '../../style/goods/goodsAdList.css';
import AdList from '../../components/Goods/AdList';

const AdListPage = ({ dispatch,adListData,location }) => {
  let page = 1;
  let adId = location.pathname.slice(location.pathname.lastIndexOf('/')+1);
  /*上拉加载更多的方法*/
	function addListDatas(page,d_this){//page传递新页数 这里没用,d_this请求成功后回调到loading
		let num = 10;//每页条数
    let listData = {
      id:adId,
      fsxz:false,
      _this:d_this,
      page:page,
      max:num
    }
		dispatch({
			type:'adListData/getNewData',
			payload:listData
		})
	}
  class AdListPage extends React.Component {
      constructor(props){
  			super(props);
  			this.state={
  				type:false,
          listDatas:false
  			}
        this.topList=this.topList.bind(this)
  			this.newList=this.newList.bind(this)
  		}
      render(){
          return (
            <div className={ styles.adListContainer } id="adList">
              <i className={ styles.adListPic } id="adPic"></i>
              <header>
                <div className={ styles.adListHeaderReturn }>
                  <i className={ styles.adListHeaderArr } onClick={() => this.goBack()}></i>
                </div>
                <div className={ styles.adListType }>
                  <span onClick={() => this.typeChange("0")} className={ this.state.type === "0"?styles.chooseListType:'' }>领取排行</span>
                  <span onClick={() => this.typeChange("1")} className={ this.state.type === "1"?styles.chooseListType:'' }>最新发放</span>
                </div>
              </header>
              <AdList listDatas = { this.state.listDatas } getFun={ addListDatas } page={ page }/>
            </div>
        )
      }
      /*排行榜*/
  		topList(){
  			if(adListData.res_top_data){
  				this.setState({
  					listDatas:adListData.res_top_data,
  				})
  			}
  		}
      /*最新发放*/
  		newList(){
  			if(adListData.res_new_data){
  				this.setState({
  					listDatas:adListData.res_new_data,
  				})
  			}
  		}
      /*切换排行榜*/
      typeChange(i){
        sessionStorage.setItem("adList",i)
        if(i==='0'){
          this.topList()
        }else{
          this.newList()
        }
        this.setState({
    			type:i
    		})
      }
      /*返回上一页*/
      goBack(){
        window.history.go(-1)
      }
      componentWillMount(){
				if(!sessionStorage.getItem("adList")){
					this.setState({
						type:'0'
					})
					this.topList()
				}else{
					this.setState({
						type:sessionStorage.getItem("adList")
					})
					if(sessionStorage.getItem("adList")==='1'){
						this.newList()
					}else{
						this.topList()
					}
				}
  		}
      componentDidMount(){
        $('#adList').height(document.documentElement.clientHeight)
        $('#adPic').height(document.documentElement.clientHeight)
      }
  }
  return <AdListPage />
}

export default connect(({ adListData }) => ({
  adListData
}))(AdListPage);
