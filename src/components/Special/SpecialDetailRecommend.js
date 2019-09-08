import React from 'react';
import styles from '../../style/Special/special.css'
import Loading from '../../components/PublicComponents/LoadingCom'
import $ from 'jquery'

const SpecialDetailRecommend=({datas,RelateTheme,history})=>{
	let returnData
	function getLoadFun(daom) {
		returnData=daom.ptData
	}
	let page=1
	function reqFun(newPage) {
		page=newPage
		RelateTheme(newPage,returnData)
	}
	class SpecialDetailRecommend extends React.Component{
		constructor(props) {
	        super(props);
	        this.state={
				ThemeData:datas
	        }	        
	    }
		render(){
			if(this.state.ThemeData){
				if(this.state.ThemeData.total>0){
					return (<div className={styles.SpecialDetailR_box}>
								<h3>专题推荐</h3>
								<ul>
									{this.state.ThemeData.relate_themes.map(function(elem,index){
										return (<li className={styles.homeSpecial_li+' swiper-slide recomSpecial'} key={index} spid={elem.id}>
													<img src={elem.picture} className='ajlist_imgb'/>
													<div>
														<h3>{elem.name}</h3>
														<span>¥ {elem.money} 起</span>
													</div>
													<p>{elem.describe}</p>
												</li>)
									})}												
								</ul>
								<Loading getLoadFun={getLoadFun} page={page} reqFun={reqFun}/>
							</div>)
				}else{
					return(<div></div>)
				}
				
			}else{
				return(<div></div>)
			}			
		}
		componentDidMount(){
			$('.ajlist_imgb').css('height',function(){
				return $('.recomSpecial').width()*0.5+'px'
			})

			$('.recomSpecial').click(function(){
			history.push({pathname:"/SpecialPage/SpecialDetail/"+$(this).attr('spid')})
			})
		}
		componentDidUpdate(){
			$('.ajlist_imgb').css('height',function(){
				return $('.recomSpecial').width()*0.5+'px'
			})
		}
	}
	return <SpecialDetailRecommend/>
}
export default SpecialDetailRecommend
