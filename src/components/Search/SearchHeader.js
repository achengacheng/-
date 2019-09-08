import React from 'react';
import styles from '../../style/Search/Search.css';

const SearchHerader =({msg,transferMsg,transSearch})=>{
    class SearchHerader extends React.Component{
        saveSearch(){
            let value=this.refs.a.value;
            if(value!=''){
                if(localStorage.getItem('history')){
                    if(localStorage.getItem('history').indexOf(',')!=-1){
                        var arrs=localStorage.getItem('history').split(',')
                        arrs.unshift(value)
                        localStorage.setItem('history', arrs);
                    }else{
                        var arr=[localStorage.getItem('history')];
                        arr.push(value);
                        localStorage.setItem('history', arr);
                    }
                }else{
                    localStorage.setItem('history', value);
                }
                transferMsg(2)
            }
        }
        onKeyup (e) {
            if(e.keyCode === 13){
                this.saveSearch();
            }
        }
        
        inputChange(){
            let value=this.refs.a.value;
            this.setState({
                values: value
            });
        }
        goBack(){
            window.history.go(-1)
        }
        clearSearch(){
            this.refs.a.value='';
            this.setState({
                values: ''
            });
        }
        constructor(props) {
            super(props); 
            this.state = {
                values:''
            }
        }
        render(){
            const that=this;
            var value=this.state.values;
            return (
                <div className="header">
                    <div className={styles.headerReturn_box}>
                        <i className={styles.headerReturn_back} onClick={()=>this.goBack()}></i>
                        <p className={styles.headerReturn_text}>
                            <img src="/src/assets/Search-search.png" alt=""/>
                            <input type="text" placeholder='输入商品关键字或用户名' ref="a" className={styles.searchIpu} onChange={()=>that.inputChange()} onKeyUp={(e)=>that.onKeyup(e)}/>
                            <img src="/src/assets/Search-del.png" alt="" onClick={()=>that.clearSearch()} />
                        </p>	
                        <div className={styles.headerReturn_rightbox} onClick={()=>that.saveSearch()} >
                            搜索
                        </div>
                    </div>
                    {
                        (function(){
                            if(value){
                                return(
                                    <div className={styles.searchLists}>
                                        <div>油1222</div>
                                        <div>油1222</div>
                                        <div>油1222</div>
                                        <div>油1222</div>
                                        <div>油1222</div>
                                    </div>
                                )
                            }else{
                                return null;
                            }
                        })()
                    }
                </div>
            )
        }
    }
   return <SearchHerader/>
    
}

export default SearchHerader;