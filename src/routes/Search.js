import React from 'react';
import { connect } from 'dva';
import SearchHerader from '../components/Search/SearchHeader';
import SearchHot from '../components/Search/SearchHot';
import SearchHistory from '../components/Search/SearchHistory';
import SearchResult from '../components/Search/SearchResult';
import styles from '../style/Search/Search.css';
const SearchPage =({dispatch,searchPageData,history})=>{
    let searchSt=2;
    //搜索函数
    function searchData(cb,value,page,set,d_this){
        if(sessionStorage.getItem('searchSt')==1){
            dispatch({
                type:'searchPageData/goodsSearch',
                keyWords:value,
                page:page,
                max:10,
                id:sessionStorage.getItem('id'),
                cb:cb,
                set:set,
                _this:d_this
            })
        }else if(sessionStorage.getItem('searchSt')==2){
            dispatch({
                type:'searchPageData/AJSearch',
                keyWords:value,
                page:page,
                max:10,
                id:sessionStorage.getItem('id'),
                cb:cb,
                set:set
            })
        }
        
    }
    //
    function searchMoreData(value,page,d_this){
        dispatch({
            type:'searchPageData/goodsSearchMore',
            keyWords:value,
            page:page,
            max:10,
            id:sessionStorage.getItem('id'),
            _this:d_this
        })
    }
    function searcAJhData(cb,value,page,set){
        dispatch({
            type:'searchPageData/AJSearch',
            keyWords:value,
            page:page,
            max:10,
            id:sessionStorage.getItem('id'),
            cb:cb,
            set:set
        })
    }
    //热卖按钮滑动调节
    function searchhotbuy(){
        dispatch({
            type:'searchPageData/searchhotbuy'
        })
    }
    let value;
    class SearchPage extends React.Component{
        constructor(props) {
            super(props); 
            this.state = {
                msg:-1,
                search:false,
                values:'',
                arrList:'',
                msgData:'',
                arr:searchPageData.hot_datas,
                focus:true
            }
        }
        transferMsg(msg) {
            this.setState({
              msg:msg
            });
        }
        transferSearch(msg) {
        this.setState({
            search:msg
        });
        }
        cb(msg){
            if(msg){
                this.setState({
                    arrList:msg
                })
            }
        }
        //历史记录存储并且搜索
        saveSearch(){
            let value=this.refs.a.value;
            if(value!=''){
                // dispatch({
                //     type:'searchPageData/goodsSearch',
                //     keyWords:value,
                //     page:1,
                //     max:10,
                //     id:800413208598,
                //     cb:(msg,values)=>this.goodsCb(msg,values)
                // })
                if(sessionStorage.getItem('searchSt')==='1'){
                    searchData((msg,values)=>this.goodsCb(msg,values),value,1)
                }else{
                    searchData((msg,values)=>this.goodsCb3(msg,values),value,1)
                }
                if(localStorage.getItem('history')){
                    if(localStorage.getItem('history').indexOf(',')!==-1){
                        var arrs=localStorage.getItem('history').split(',')
                        arrs.unshift(value)
                        if(arrs.length>=8){
                            arrs.pop()
                        }
                        localStorage.setItem('history', arrs);
                    }else{
                        var arr=[localStorage.getItem('history')];
                        arr.push(value);
                        localStorage.setItem('history', arr);
                    }
                }else{
                    localStorage.setItem('history', value);
                }
            }
        }
        onKeyup (e) {
            if(e.keyCode === 13){
                this.saveSearch();
            }
        }
        //返回
        goBack(){
            window.history.go(-1)
        }
        //搜索后的回调
        goodsCb(msg,value){
            let arr=[]
            console.log(msg,333)
				for(let i=0;i<msg.length;i++){
					let obj={};
					obj.currentPrice=msg[i].currentPrice;
					obj.id=msg[i].goodsId;
					obj.markPrice=msg[i].markPrice;
                    obj.name=msg[i].goodsName;
                    obj.isAdFee=msg[i].isAdFee;
					obj.goodsPic=msg[i].mainPic;
					arr.push(obj)
				}
            this.refs.a.value=value;
            this.setState({
                msgData:arr,
                msg:2,
                values:value,
                arrList:'',
            })
        }
        goodsCb2(msg,value){
            this.refs.a.value=value;
        }
        goodsCb3(msg,value){
            this.refs.a.value=value;
            this.setState({
                msgData:msg,
                msg:2,
                values:value,
                arrList:'',
            })
        }
        clearSearch(){
            // sessionStorage.setItem('searchSt',1)
            this.refs.a.value='';
            this.setState({
                values: '',
                arrList:''
            });
            this.transferMsg(-1)
        }
        inputChange(){
            value=this.refs.a.value;
            this.setState({
                values:value
            });
            this.transferMsg(3)
            if(value==''){
                this.transferMsg(-1)
            }else{
                dispatch({
                    type:'searchPageData/keyData',
                    key:value,
                    cb:msg=>this.cb(msg)
                })
            }
        }
        //input获得焦点
        focus(){
            this.setState({
                focus:false
            })
        }
        //失去焦点
        onBlur(){
            this.setState({
                focus:true
            })
        }
        render(){
            const that=this;
            var value=this.state.values;
            return (
                <div>
                    {/* <SearchHerader msg={this.state.msg} transferMsg = {msg => this.transferMsg(msg)} msg={this.state.msg}/> */}
                    <div className="header">
                        <div className={styles.headerReturn_box}>
                            <i className={styles.headerReturn_back} onClick={()=>this.goBack()}></i>
                            <p className={styles.headerReturn_text}>
                                <img src="/src/assets/Search-search.png" alt=""/>
                                <input type="text" placeholder='请输入商品关键词' ref="a" className={styles.searchIpu} onChange={()=>that.inputChange()} onKeyUp={(e)=>that.onKeyup(e)} onFocus={()=>this.focus()} onBlur={()=>this.onBlur()}/>
                                <img src="/src/assets/Search-del.png" alt="" onClick={()=>that.clearSearch()} />
                            </p>	
                            <div className={styles.headerReturn_rightbox} onClick={()=>that.saveSearch()} >
                                搜索
                            </div>
                        </div>
                        {
                            (function(){
                                if(that.state.arrList.length!=0){
                                    return(
                                        <div className={styles.searchLists}>
                                            {
                                                that.state.arrList.map(function(item,index){
                                                    return(
                                                        <div key={index} className={styles.remandList}>
                                                            {
                                                                sessionStorage.getItem('searchSt')==='1'?<div  onClick={()=>searchData((msg,value)=>that.goodsCb(msg,value),item.str,1)}>{item.str}</div>:<div  onClick={()=>searchData((msg,value)=>that.goodsCb3(msg,value),item.str,1)}>{item.str}</div>
                                                            }
                                                            <p className={styles.typeTag}>{item.des}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }else{
                                    return <div></div>;
                                }
                            })()
                        }
                    </div>
                    {
                        this.state.msg===-1?<SearchHot searchhotbuy={searchhotbuy} cb={(msg,value)=>this.goodsCb(msg,value)}  cbs={(msg,value)=>this.goodsCb3(msg,value)} searchWay={searchData} hotList={this.state.arr}/>:null
                    }
                    {
                        this.state.msg===-1?<SearchHistory isShow={(msg)=>this.transferMsg(msg)} cb={(msg,value)=>this.goodsCb(msg,value)} cbs={(msg,value)=>this.goodsCb3(msg,value)} searchWay={searchData} focus={this.state.focus}/>:null
                    }
                    {
                        this.state.msg===2?<SearchResult searchSt={searchSt} more={searchMoreData} history={history} msg={this.state.msgData} cb={(msg,value)=>this.goodsCb2(msg,value)} value={this.refs.a.value} searchWay={searchData} searchAJWay={searcAJhData}/>:null
                    }
                </div>
            )
        }
        componentWillMount(){
			// if(sessionStorage.getItem('searchSt')==2){
            //     searchSt=2
            // }else{
            //     searchSt=1
            // }			
        }
        componentWillUnmount(){
			// sessionStorage.setItem('searchSt',1)
		}
    }
    return <SearchPage/>
}

export default connect(({ searchPageData }) => ({
    searchPageData,
  }))(SearchPage);