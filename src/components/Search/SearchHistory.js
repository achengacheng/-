import React from 'react';
import style from '../../style/Search/Search.css';
import { connect } from 'dva';

const SearchHistory =({isShow,cb,searchWay,focus,cbs})=>{
    class SearchHistory extends React.Component{
        delHistory(index,e){
            e.cancelBubble = true;
            e.stopPropagation()
            if(localStorage.getItem('history')){
                this.state.history.splice(index,1)
            }
            this.setState({
                history:this.state.history
            })
            localStorage.setItem('history',this.state.history)
        }
        deleteHist(){
            localStorage.removeItem('history');
            this.setState({
                history:''
            })
        }
        constructor(props) {
            super(props);
            let history; 
            if(localStorage.getItem('history')){
                history=localStorage.getItem('history').split(',');
            }
            this.state = {
                history:history,
                msgData:''
            }
        }
        render(){
            var that=this;
            if(this.state.history){
                return (
                    <div>
                        <div className={style.history_search}>
                            <img src="/src/assets/Search-history.png" alt=""/>
                            历史记录
                        </div>
                        <div className={style.history_box}>
                            {this.state.history.map(function(item,index){
                                return  <div key={index} onClick={(e)=>that.search(item,e)}>
                                            <div>
                                                {item}
                                            </div>
                                            <img src="/src/assets/Search-hdel.png" alt="删除" onClick={(e)=>that.delHistory(index,e)} />
                                        </div>
                                })
                            }
                        </div>
                        <div className={style.goBlank} onClick={()=>this.deleteHist()}>{focus?'清空历史记录':''}</div>
                    </div>
                )
            }
            return(
                <div>
                <div className={style.history_search}>
                    <img src="/src/assets/Search-history.png" alt=""/>
                    历史记录
                </div>
                <div className={style.goBlank} onClick={()=>this.deleteHist()}>{focus?'清空历史记录':''}</div>
            </div>
            )
        }
         //历史记录点击搜索
         search(value,e){
            console.log(value)
            e.cancelBubble = true;
            e.stopPropagation()
            if(sessionStorage.getItem('searchSt')==1){
                console.log(111)
                searchWay(cb,value,1)
            }else{
                console.log(111222)
                searchWay(cbs,value,1)
            }
        }
    }
    return <SearchHistory/>
}

export default SearchHistory