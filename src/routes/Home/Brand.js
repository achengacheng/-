import React from 'react';
import { connect } from 'dva';
import Header from '../../components/PublicComponents/HeaderReturn';// 公共头部
import style from '../../style/home/brand.css'
import DefaultPage from '../../components/PublicComponents/DefaultPage'
import Loading from '../../components/PublicComponents/LoadingCom';
const Brand = ({brandPage,dispatch,SpecialPageData}) => {
    let _this,PtDatas,typePt,page=brandPage.listPage;
	function laodfun(dom){
        PtDatas=dom.ptData
    }
    //上拉执行函数  
	function reqFun(pages){
        brandPage.listPage++
        getList()
    }
    function getList(){
        dispatch({
            type:'brandPage/getBrandData',
            page:brandPage.listPage,
            cb:()=>PtDatas(false),
            max:4
        })
    }
    function goToSomeWhere(data){//跳转至data路由
		dispatch({
			type:"SpecialPageData/goToSomeWhere",
			data:data,
		})
	}
    class Brand extends React.Component{
        constructor(props){
            super(props);
            this.state={
                listData:brandPage.res_datas
            }
        }
        render(){
            if(this.state.listData.length){
                return(
                    <div>
                        <Header head_title='品牌艾家' left_show='1' right_icon='2' header_ids="24" right_fun={ goToSomeWhere } />
                        <div className={style.brandbox}>
                            {
                                this.state.listData.map(function(item,index){
                                    return(
                                        <div className={style.brandCard} key={index}>
                                            <img className={style.brandBackg} src={item.picture[0]} alt=""/>
                                            <div className={style.brandText}>
                                                <p>共{item.goodNum}商品</p>
                                                <div className={style.brandMsg}>
                                                    <div>
                                                        <img src="/src/assets/Home-brand-red.png" alt=""/> {item.collectNum}
                                                    </div>
                                                    <div>
                                                        <img src={"/src/assets/Home-brand-good.png"} alt=""/> 好评率{item.goodCommentPercent}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <Loading getLoadFun={laodfun} reqFun={reqFun} page={page}/>
                    </div>
                )
            }else{
                return(
                    <div>
                         <DefaultPage default_ids='3' showDefault={true}/>
                    </div>
                )
            }
        }
    }
    return <Brand/>
	// return (
	// 	<div>
	// 		<Header head_title='品牌艾家' left_show='1' right_icon='2' header_ids="3"/>
    //         <div className={style.brandbox}>
    //             {
    //                 arr.map(function(item,index){
    //                     return(
    //                         <div className={style.brandCard} key={index}>
    //                             <img className={style.brandBackg} src={item.src} alt=""/>
    //                             <div className={style.brandText}>
    //                                 <p>共{item.num}商品</p>
    //                                 <div className={style.brandMsg}>
    //                                     <div>
    //                                         <img src="/src/assets/Home-brand-red.png" alt=""/> {item.red}
    //                                     </div>
    //                                     <div>
    //                                         <img src="/src/assets/Home-brand-good.png" alt=""/> 好评率{item.good}%
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     )
    //                 })
    //             }
                
    //         </div>
	// 	</div>
	// )		
};

export default connect(({ brandPage }) => ({
    brandPage
}))(Brand);