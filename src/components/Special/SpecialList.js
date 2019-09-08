import React from 'react';
import styles from '../../style/Special/special.css'
import DefaultPage from '../../components/PublicComponents/DefaultPage'
import $ from 'jquery'


const SpecialList=({allDetailList,goSpecialDetail,getSpecialFun})=>{
	let _this,ysData=allDetailList?allDetailList.list:false
	class SpecialList extends React.Component{
		constructor(props) {  
	        super(props);  
	        this.state = {
	        	SpecialData:ysData
	        };  
	        this.changeData=this.changeData.bind(this)
	    } 
	    changeData(data){
	    	this.setState({SpecialData:data})	    	
	    }
		render(){
			if(this.state.SpecialData&&this.state.SpecialData.length>0){
				return	(<div className={styles.SpecialList}>
							<ul>
								{this.state.SpecialData.map(function(elem,index ) {
									return (<li className={ `${styles.SpecialList_li} ${'ajlist_img'}`} key={index} special_id={elem.id}>
												<img className='ajlist_imgb' src={elem.picture?elem.picture.length?elem.picture[0]:'./src/assets/laoding-1.2(645).png':'./src/assets/laoding-1.2(645).png'} alt=""/>
												<div className={styles.SpecialList_text}>
													<div className={styles.SpecialList_head}>
														<span>{elem.name}</span>
														<span>¥ {elem.money.toFixed(2)} 起</span>
													</div>
													<p className="List_p">{elem.describe}</p>
													<div className={styles.SpecialList_foot}>
														<div className={styles.SpecialList_user}>
															<div>
																<img src={elem.themeTypePicture}  alt=""/>
															</div>
															<span>{elem.themeTypeName}</span>
														</div>
														<ul className={styles.SpecialList_zan}>
															<li><i className={styles.SpecialList_love}></i><span>{elem.collectionNum}</span></li>
															<li><i className={styles.SpecialList_eye}></i><span>{elem.readNum}</span></li>
															<li><i className={styles.SpecialList_dialogue}></i><span>{elem.comments}</span></li>
														</ul>
													</div>
												</div>
											</li>);
								})}
							</ul>
						</div>)
			}else{
				return (<DefaultPage showDefault='true' default_ids='3'/>)
			}				
		}
		componentWillMount(){
			_this=this
			getSpecialFun(_this)
		}
		componentDidMount(){
			$('.ajlist_imgb').css('height',function(){
				return $('.ajlist_img').width()*0.5+'px'
			})

			$('.'+styles.SpecialList_li+" img , ."+styles.SpecialList_head+", .List_p").click(function(){
				goSpecialDetail($(this).parents('li').attr('special_id'))
			})	
			$('#specialNav').show()
		}
		componentDidUpdate(){
			$('.ajlist_imgb').css('height',function(){
				return $('.ajlist_img').width()*0.5+'px'
			})
		}
	}
	return <SpecialList/>
}

export default SpecialList