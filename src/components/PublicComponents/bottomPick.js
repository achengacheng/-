import React from 'react';
import styles from '../../style/PublicStyle/bottomPick.css';
import $ from 'jquery'
var Swiper=require('../../../node_modules/swiper/dist/js/swiper.js')

const Linkage=({headName,JsonDatd,LinkShow,getCity})=>{
	// console.log(JsonDatd)
	let _this,Trlins  //存储this
	var mySwiper2;
	class Linkage extends React.Component{
		constructor(props) {
            super(props); 
            this.state = {
                province:0,
                city:0,
                area:0
            } 
            this.colorFun=this.colorFun.bind(this)
            this.showLink=this.showLink.bind(this)         
        }
        showLink(ip){
			console.log(1)
        	$('.'+styles.Linkage_Pick).slideToggle(300);
        	if(ip){
        		Trlins()
        	}
        }
        colorFun(index,addressId){//更新state 存储当前选择数据					 			
				console.log(index)
				this.setState({city:index})							
		}
		render(){
			return( <div className={styles.Linkage_Pick}>
						<div className={styles.Linkage_box}>
							<div className={styles.Linkage_head}>
									<p id="Nobtnn">取消</p>
									<span>{headName}</span>
									<p id="Yesbtnn">确认</p>
							</div>
							<div className={styles.Linkage_list_box}>
								<div className={styles.Linkage_show}>									
									<div className="swiper-list1b">
											<ul className="swiper-wrapper">
											</ul>
										</div>									
										<div className="swiper-list2b">
											<ul className="swiper-wrapper">
												{JsonDatd?JsonDatd.map(function(elem,index){
													return (<li key={index} className={`${styles.Linkage_li} ${"swiper-slide"} ${_this.state.city===index?styles.Linkage_li_color:''}`}><span>{elem}</span></li>);
													}):''											
												}		
											</ul>
										</div>
										<div className="swiper-list3b">
											<ul className="swiper-wrapper">
											</ul>
										</div>								
								</div>
							</div>	
						</div>
					</div>)
		}
		componentWillMount(){
			_this=this
			LinkShow(this)
			if(!JsonDatd){
				return true;
			}else{
				return false;
			}
		}
		componentDidMount(){
			//阻止滑动穿透
		 	if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
		    //移动端
		        $("."+styles.Linkage_Pop).on('touchmove',function(e){
		            e.stopPropagation();
		            e.preventDefault();
		        })
		    }
		    $('#Yesbtnn').click(function(){
				var data=JsonDatd[_this.state.city]	
		    	$('.'+styles.Linkage_Pop).slideToggle(300);
		    	getCity(data,_this)
		    })
		    $('#Nobtnn').click(function() {
		    	$('.'+styles.Linkage_Pick).slideToggle(300);
		    })	
		    //三级联动 滑动初始化	
		    Trlins=()=>{		    	
				mySwiper2=new Swiper('.swiper-list2b', {
					loop : false,
					direction : 'vertical',
					on: {
					    slideChangeTransitionEnd: function(e){
							console.log(this.activeIndex)
						    _this.colorFun(this.activeIndex)					  		    
						}
					}, 
				})			
		    }						
		}
		componentDidUpdate(){				
		}
	}
	return <Linkage/>
}

export default Linkage;
