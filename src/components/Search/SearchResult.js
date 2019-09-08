import React from 'react';
import style from '../../style/Search/Search.css';
import HomeGuessLike from '../../components/Home/HomePage/HomeGuessLike';
import { connect } from 'dva';
import { Link } from 'dva/router'
import styles from '../../style/home/homePage.css';
import ajStyles from '../../style/AJ/AJDetails.css';
import Goods_Icon from '../PublicComponents/Goods_Icon';
import DefaultPage from '../PublicComponents/DefaultPage';//缺省页面
import Loading from '../PublicComponents/LoadingCom';

const SearchResult=({msg,cb,value,searchWay,searchAJWay,more,history,searchSt})=>{
    function Callback(site,id,p_name){//点击回调app值
        history.push({pathname:"/GoodsPage/"+id})
	}
    let page=1;
    // let PtDatas,page=searchPageData.res_page;
	// function laodfun(dom){
    //     PtDatas=dom.ptData
    // }  
    // 搜索结果列表
    
    class SearchResult extends React.Component{
        addGuessLike(page,d_this){//page传递新页数 这里没用,d_this请求成功后回调到loading		
            // let num=8;//每页条数
            // dispatch({
            //     type:'homePageData/GuessLike',
            //     fsxz:false,
            //     _this:d_this,
            //     pages:page,
            //     nums:num
            // })
            more(value,page,d_this)
            
        }
        reqFun(pages){
            // searchPageData.res_page++
            let i=this.state.tab;
            if(i==1){
                // dispatch({
                //     type:'searchPageData/goodsSearch',
                //     keyWords:value,
                //     page:1,
                //     max:10,
                //     id:8004132085981,
                //     cb:cb,
                //     set:(msg)=>this.setMsg(msg)
                // })
                searchWay(cb,value,this.setMsg(msg))
            }else if(i==2){
                searchAJWay(cb,value,this.setMsg(msg))
            }
        }
        tabChange(i){
            sessionStorage.setItem('searchSt',i)
            this.setState({
                tab:sessionStorage.getItem('searchSt')
            })
            if(i==1){
                searchWay(cb,value,page,(msg,i)=>this.setMsg(msg,i))
            }else if(i==2){
                searchAJWay(cb,value,page,(msg,i)=>this.setMsg(msg,i))
            }
        }
        //页面内请求数据刷新函数
        setMsg(msg,i){
            this.setState({
                msg:msg
            })
        }
        // this.state.tab 1.商品列 2.艾家列 this.state.datas true 有搜索结果 false无搜索结果
        constructor(props) {
            super(props);
            this.state = {
                tab:sessionStorage.getItem('searchSt'),
                msg:msg,
                datas:true
            }
        }
        render(){
            if(this.state.msg.length){
                let that=this;
                console.log(this.state.msg,555)
                return(
                    <div>
                        <div className={style.resultTitle}>
                            <div>
                                <p className={this.state.tab==='1'?style.resultCur:null} onClick={()=>this.tabChange(1)}>商品</p>
                                <div className={this.state.tab==='1'?style.resultDiv:null}></div>
                            </div>
                            <div>
                                <p className={this.state.tab==='2'?style.resultCur:null} onClick={()=>this.tabChange(2)}>艾家</p>
                                <div className={this.state.tab==='2'?style.resultDiv:null}></div>
                            </div>
                        </div>
                        <div className={style.gussBox}>
                            {
                                (function(){
                                    if(that.state.tab==1){
                                        return(
                                            <div>
                                                <HomeGuessLike  guessData={that.state.msg} Callback={Callback} getFun={that.addGuessLike} page={page}/>
                                            </div>
                                        )
                                    }else{
                                        return(
                                            <div className={style.resultAj}>
                                                {
                                                    that.state.msg.map(function(item,index){
                                                        return(
                                                            <div key={index}>
                                                                <img src={item.logoPic} alt=""/>
                                                                <Link to={"/AJPage/AJDetails/"+item.merchantId }>
                                                                    <p>{item.storeName}</p>
                                                                </Link>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    }
                                })()
                            }
                            
                        </div>
                    </div>
                )
            }else{
                return(
                    <div>
                        <div className={style.resultTitle}>
                            <div>
                                <p className={this.state.tab==='1'?style.resultCur:null} onClick={()=>this.tabChange(1)}>商品</p>
                                <div className={this.state.tab==='1'?style.resultDiv:null}></div>
                            </div>
                            <div>
                                <p className={this.state.tab==='2'?style.resultCur:null} onClick={()=>this.tabChange(2)}>艾家</p>
                                <div className={this.state.tab==='2'?style.resultDiv:null}></div>
                            </div>
                        </div>
                        <div>
                            <DefaultPage showDefault={true} default_ids={3} />
                        </div>
                    </div>
                )
            }
        }
    }
    return <SearchResult/>
}
export default SearchResult