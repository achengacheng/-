import React from 'react';
import styles from '../../style/goods/goodsAdList.css';
import Loading from '../PublicComponents/LoadingCom';

const AdList=({ listDatas,getFun,page})=>{
	/*getFun 滑动加载请求方法 参数(页数,this),page当前页*/
	let _this,PtData,typePt,d_page=page;
	function laodfun(dom){
		PtData=dom.ptData
	}
	function reqFun(NewPages){
		getFun(NewPages,_this)
	}
	class AdList extends React.Component{
		constructor(props) {
        super(props);
        this.state={
        	listDatas:listDatas
        }
        this.getPage=this.getPage.bind(this)
    }
    getPage(types,data,page){//有无更多数据
    	let newData=this.state.listDatas.concat(data)
    	d_page=page
    	typePt=types
    	this.setState({
				listDatas:newData
    	})
    }
		render(){
	    if(!sessionStorage.getItem("adList")||sessionStorage.getItem("adList")==='0'){
				if(!listDatas||listDatas.length===0){
					return(
						<div className={ styles.adListMain }>
							<header>
								<div className={ styles.box2 }>
									<div className={ styles.adListLevel_2 }></div>
								</div>
								<div className={ styles.box1 }>
									<div className={ styles.adListLevel_1 }></div>
								</div>
								<div className={ styles.box3 }>
									<div className={ styles.adListLevel_3 }></div>
								</div>
							</header>
						</div>
					)
				}else if(listDatas.length===1){
					return(
		  			<div className={ styles.adListMain }>
		          <header>
								<div className={ styles.box2 }>
		              <div className={ styles.adListLevel_2 }></div>
		            </div>
		            <div className={ styles.box1 }>
		              <div className={ styles.adListLevel_1 }>
		                <img src={ listDatas[0].url?listDatas[0].url:"src/assets/myPageDefaultHead1.png" } alt='num1'/>
		              </div>
		              <p>{ listDatas[0].telephone }</p>
		              <span className={ styles.adListLevelPrice }>￥{ listDatas[0].money }</span>
		            </div>
								<div className={ styles.box3 }>
		              <div className={ styles.adListLevel_3 }></div>
		            </div>
		          </header>
		  			</div>
		  		)
				}else if(listDatas.length===2){
					return(
		  			<div className={ styles.adListMain }>
		          <header>
		            <div className={ styles.box2 }>
		              <div className={ styles.adListLevel_2 }>
		                <img src={ listDatas[1].url?listDatas[1].url:"src/assets/myPageDefaultHead1.png" } alt='num2'/>
		              </div>
		              <p>{ listDatas[1].telephone }</p>
		              <span>￥{ listDatas[1].money }</span>
		            </div>
		            <div className={ styles.box1 }>
		              <div className={ styles.adListLevel_1 }>
		                <img src={ listDatas[0].url?listDatas[0].url:"src/assets/myPageDefaultHead1.png" } alt='num1'/>
		              </div>
		              <p>{ listDatas[0].telephone }</p>
		              <span className={ styles.adListLevelPrice }>￥{ listDatas[0].money }</span>
		            </div>
								<div className={ styles.box3 }>
									<div className={ styles.adListLevel_3 }></div>
								</div>
		          </header>
		  			</div>
		  		)
				}else if(listDatas.length===3){
					return(
		  			<div className={ styles.adListMain }>
		          <header>
		            <div className={ styles.box2 }>
		              <div className={ styles.adListLevel_2 }>
		                <img src={ listDatas[1].url?listDatas[1].url:"src/assets/myPageDefaultHead1.png" } alt='num2'/>
		              </div>
		              <p>{ listDatas[1].telephone }</p>
		              <span>￥{ listDatas[1].money }</span>
		            </div>
		            <div className={ styles.box1 }>
		              <div className={ styles.adListLevel_1 }>
		                <img src={ listDatas[0].url?listDatas[0].url:"src/assets/myPageDefaultHead1.png" } alt='num1'/>
		              </div>
		              <p>{ listDatas[0].telephone }</p>
		              <span className={ styles.adListLevelPrice }>￥{ listDatas[0].money }</span>
		            </div>
		            <div className={ styles.box3 }>
		              <div className={ styles.adListLevel_3 }>
		                <img src={ listDatas[2].url?listDatas[2].url:"src/assets/myPageDefaultHead1.png" } alt='num3'/>
		              </div>
		              <p>{ listDatas[2].telephone }</p>
		              <span>￥{ listDatas[2].money }</span>
		            </div>
		          </header>
		  			</div>
		  		)
				}else if(listDatas.length>3){
					return(
		  			<div className={ styles.adListMain }>
		          <header>
		            <div className={ listDatas.length>1?styles.box2:styles.hidden }>
		              <div className={ styles.adListLevel_2 }>
		                <img src={ listDatas[1].url?listDatas[1].url:"src/assets/myPageDefaultHead1.png" } alt='num2'/>
		              </div>
		              <p>{ listDatas[1].telephone }</p>
		              <span>￥{ listDatas[1].money }</span>
		            </div>
		            <div className={ listDatas.length>0?styles.box1:styles.hidden }>
		              <div className={ styles.adListLevel_1 }>
		                <img src={ listDatas[0].url?listDatas[0].url:"src/assets/myPageDefaultHead1.png" } alt='num1'/>
		              </div>
		              <p>{ listDatas[0].telephone }</p>
		              <span className={ styles.adListLevelPrice }>￥{ listDatas[0].money }</span>
		            </div>
		            <div className={ listDatas.length>2?styles.box3:styles.hidden }>
		              <div className={ styles.adListLevel_3 }>
		                <img src={ listDatas[2].url?listDatas[2].url:"src/assets/myPageDefaultHead1.png" } alt='num3'/>
		              </div>
		              <p>{ listDatas[2].telephone }</p>
		              <span>￥{ listDatas[2].money }</span>
		            </div>
		          </header>
		          <div className={ listDatas.length>3?styles.moneyList:styles.hidden }>
		            <ul>
									{listDatas.slice(3).map(function(item,index){
										return <li key={ index }>
						                <div className={ styles.listLeft }>
						                  <i>{index+4}</i>
						                  <img src={item.url?item.url:"src/assets/myPageDefaultHead1.png"} alt='head'/>
						                  <div className={ styles.userListMsg }>
						                    <p>{item.telephone}</p>
						                    <span>{item.obtainTime}</span>
						                  </div>
						                </div>
						                <div className={ styles.moneyListMsg }>
						                  <p>￥{item.money}</p>
						                  <span>获得{item.count}张粮票</span>
						                </div>
						              </li>
										})
									}
		            </ul>
		            <div>&mdash;我是有底线的&mdash;</div>
		          </div>
		  			</div>
		  		)
				}
	    }else{
				if(!this.state.listDatas||this.state.listDatas.length===0){
					return (
						<div className={ styles.adListMain }>
		          <div className={ styles.moneyList }>
								<p>--- 暂无数据 --</p>
							</div>
						</div>
					)
				}else{
					return(
		  			<div className={ styles.adListMain }>
		          <div className={ styles.moneyList }>
		            <ul>
									{this.state.listDatas.map(function(item,index){
										return <li key={ index }>
						                <div className={ styles.listLeft }>
						                  <img src={item.url?item.url:"src/assets/myPageDefaultHead1.png"} alt='head'/>
						                  <div className={ `${styles.userListMsg} ${styles.moreListMsg}` }>
						                    <p>{item.telephone}</p>
						                    <span>{item.obtainTime}</span>
						                  </div>
						                </div>
						                <div className={ styles.moneyListMsg }>
						                  <p>￥{item.money}</p>
						                  <span>获得{item.count}笔广告费</span>
						                </div>
						              </li>
										})
									}
		            </ul>
								<Loading getLoadFun={laodfun} reqFun={reqFun} page={d_page}/>
		          </div>
		  			</div>
		  		)
				}
	    }
		}
		componentWillMount(){
			_this=this
		}
		componentDidUpdate(){
			PtData(typePt)
		}
	}
	return <AdList />
}

export default AdList
