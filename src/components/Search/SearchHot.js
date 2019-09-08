import React from 'react';
import style from '../../style/Search/Search.css';
import { connect } from 'dva';
const SearchHot =({searchhotbuy,cb,searchWay,hotList,cbs})=>{
    class SearchHot extends React.Component{
        constructor(props) {
            super(props); 
            this.state = {
                cur: -1,
                arr:hotList
            }
        }
        render(){
            var that=this;
            if(this.state.arr.length){
                return (
                    <div className={style.hot_hid}>
                        <div className={style.hot_search}>
                            <img src="/src/assets/Search-hot.png" alt=""/>
                            热门产品
                        </div>
                       <div className={style.hotDiv+" swiper-container"}>
                            <ul className={style.hot_box + " swiper-wrapper"}>
                                {that.state.arr.map(function(item,index){
                                    return  <li className={index===that.state.cur?style.hotCbtn + " swiper-slide":style.hotBtn + " swiper-slide"} key={index} onClick={()=>that.choiceTag(index,item)}>
                                                {item}
                                            </li>
                                    })
                                }
                            </ul>
                       </div>
                    </div>
                )
            }else{
                return(
                    <div></div>
                )
            }
        }
        //TAG按钮选择
        choiceTag(index,value){  
            this.setState({
                cur:index
            })
            if(sessionStorage.getItem('searchSt')==1){
                console.log(111)
                searchWay(cb,value,1)
            }else{
                console.log(111222)
                searchWay(cbs,value,1)
            }
        }
        componentDidMount(){
            searchhotbuy()
		} 
    }
    return <SearchHot/>
}

export default SearchHot