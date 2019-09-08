import React from 'react';
import { connect } from 'dva';
import $ from 'jquery';
import Header from '../../components/PublicComponents/HeaderReturn';// 公共头部
import styles from '../../style/home/Recommend.css';
import MaskLayer from '../../components/PublicComponents/MaskLayer';
import HomeGuessLike from '../../components/Home/HomePage/HomeGuessLike'

const Recommend = () => {
    // const TypeView=()=>{
    //     return(
    //         <div className={styles.typeWrap}>
    //             <div className={styles.typeList}>
    //                 <div>
    //                     <img src="/src/assets/homeType1.png" alt=""/>
    //                     <p>全部产品</p>
    //                 </div>
    //                 <div>
    //                     <img src="/src/assets/homeType2.png" alt=""/>
    //                     <p>家具</p>
    //                 </div>
    //                 <div>
    //                     <img src="/src/assets/homeType3.png" alt=""/>
    //                     <p>餐厨</p>
    //                 </div>
    //                 <div>
    //                     <img src="/src/assets/homeType4.png" alt=""/>
    //                     <p>服饰</p>
    //                 </div>
    //                 <div>
    //                     <img src="/src/assets/homeType5.png" alt=""/>
    //                     <p>水果</p>
    //                 </div>
    //                 <div>
    //                     <img src="/src/assets/homeType6.png" alt=""/>
    //                     <p>坚果</p>
    //                 </div>
    //                 <div>
    //                     <img src="/src/assets/homeType7.png" alt=""/>
    //                     <p>自行车</p>
    //                 </div>
    //                 <div>
    //                     <img src="/src/assets/homeType8.png" alt=""/>
    //                     <p>饮品</p>
    //                 </div>
    //                 <div>
    //                     <img src="/src/assets/homeType9.png" alt=""/>
    //                     <p>全部产品</p>
    //                 </div>
    //                 <div>
    //                     <img src="/src/assets/homeType10.png" alt=""/>
    //                     <p>全部产品</p>
    //                 </div>
    //                 <div>
    //                     <img src="/src/assets/homeType11.png" alt=""/>
    //                     <p>全部产品</p>
    //                 </div>
    //                 <div>
    //                     <img src="/src/assets/homeType12.png" alt=""/>
    //                     <p>全部产品</p>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }
    class Recommend extends React.Component{
        typeChange(i){
            this.setState({
                type:i
            })
            if(i===1){
                $('body,html').css({
                    'overflow':'',
                    'height':''
                })
                if(this.state.price==='down'){
                    this.setState({
                        price:'up'
                    })
                }else{
                    this.setState({
                        price:'down'
                    })
                }
            }else if(i===2){
                /*蒙版出现*/
                $('body,html').css({
                    'height':'100%',
                    'overflow':'hidden'
                })
                /*模块--Filtration--出现*/
                $("#filtContainer").slideDown();
            }else if(i===0){
                $('body,html').css({
                    'overflow':'',
                    'height':''
                })
            }
        }
        disappear(){
            $('#maskbox').css({
                'display':'none'
            });
            $('body,html').css({
                'overflow':'',
                'height':''
            })
            $('#filtContainer').slideUp();
        }
        constructor(props){
            super(props);
            this.state={
                type:0,
                price:'down',
            }
        }
        render(){
            return (
                <div>
                    <Header head_title='人气推荐' left_show='1' right_icon='2' header_ids="4"/>
                    <div className={styles.classifyListType}>
                        <p onClick={() => this.typeChange(0)} className={ this.state.type===0?styles.chooseThisType:'' }>综合排序</p>
                        <div onClick={() => this.typeChange(1)} className={ this.state.type===1?styles.chooseThisType:'' }>
                            <p>价格排序</p>
                            <div className={ styles.goodsPrice }>
                                <i className={ this.state.price==='down'?styles.priceUp1:styles.priceUp2 }></i>
                                <i className={ this.state.price==='down'?styles.priceDown2:styles.priceDown1 }></i>
                            </div>
                        </div>
                        {/* <p onClick={() => this.typeChange(2)} className={ this.state.type===2?styles.chooseThisType:'' }>筛选商品</p> */}
                    </div>
                    {/* {this.state.type==2?<TypeView/>:null} */}
                    <HomeGuessLike/>
                </div>
            )	
        }
    }
	return 	<Recommend/>
};

export default connect(({ recommendPageData }) => ({
    recommendPageData,
}))(Recommend);