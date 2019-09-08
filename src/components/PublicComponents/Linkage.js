import React from 'react';
import styles from '../../style/PublicStyle/Linkage.css';
import $ from 'jquery'
var Swiper=require('../../../node_modules/swiper/dist/js/swiper.js')

const Linkage=({headName,JsonDatd,LinkShow,getCity})=>{
	// console.log(JsonDatd)
	let province_type,city_type;//判断state的更新改变状态
	let _this,Trlin  //存储this
	var mySwiper1,mySwiper2,mySwiper3;
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
        	$('.Linkage_Pop').slideToggle(300);
        	if(ip){
        		Trlin()
        	}
        	
        }
        colorFun(index,addressId){//更新state 存储当前选择数据			
			if(addressId===0){
				province_type=this.state.province
				this.setState({province:index,city:0,area:0})				  
			}else if(addressId===1){
				city_type=this.state.city
				this.setState({city:index,area:0})				
			}else{
				this.setState({area:index})
			}
		}
		render(){
			return( <div className={styles.Linkage_Pop+" Linkage_Pop"} >
						<div className={styles.Linkage_box}>
							<div className={styles.Linkage_head}>
									<p id="Nobtn">取消</p>
									<span>{headName}</span>
									<p id="Yesbtn">确认</p>
							</div>
							<div className={styles.Linkage_list_box}>
								<div className={styles.Linkage_show}>									
									<div className="swiper-list1">
										<ul className="swiper-wrapper">
										{JsonDatd?JsonDatd.map(function(elem,index){
												return (<li key={index} className={`${styles.Linkage_li} ${"swiper-slide"} ${_this.state.province===index?styles.Linkage_li_color:''}`}><span>{elem.province}</span></li>);
											}):''											
										}												
										</ul>
									</div>									
									<div className="swiper-list2">
										<ul className="swiper-wrapper">
											{JsonDatd?JsonDatd[this.state.province].city.map(function(elem,index){
													return (<li key={index} className={`${styles.Linkage_li} ${"swiper-slide"} ${_this.state.city===index?styles.Linkage_li_color:''}`}><span>{elem.name}</span></li>);
												}):''											
											}	
										</ul>
									</div>
									<div className="swiper-list3">
										<ul className="swiper-wrapper">
											{JsonDatd?JsonDatd[this.state.province].city[this.state.city].area.map(function(elem,index){
													return (<li key={index} className={`${styles.Linkage_li} ${"swiper-slide"} ${_this.state.area===index?styles.Linkage_li_color:''}`}><span>{elem}</span></li>);
												}):''											
											}	
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
		        $(".Linkage_Pop").on('touchmove',function(e){
		            e.stopPropagation();
		            e.preventDefault();
		        })
		    }
		    $('#Yesbtn').click(function(){
		    	let data={}
		    	data.province=JsonDatd[_this.state.province].province
		    	data.city=JsonDatd[_this.state.province].city[_this.state.city].name
		    	data.area=JsonDatd[_this.state.province].city[_this.state.city].area[_this.state.area]

		    	$('.Linkage_Pop').slideToggle(300);
		    	getCity(data)
		    })
		    $('#Nobtn').click(function() {
		    	$('.Linkage_Pop').slideToggle(300);
		    })	
		    //三级联动 滑动初始化	
		    Trlin=()=>{
		    	mySwiper1=new Swiper('.swiper-list1', {
					loop : false,
					direction : 'vertical',
					on: {
					    slideChangeTransitionEnd: function(event){				     				      
					      _this.colorFun(this.activeIndex,0)				      
					  	}				  	
					}, 
				})
				mySwiper2=new Swiper('.swiper-list2', {
					loop : false,
					direction : 'vertical',
					on: {
					    slideChangeTransitionEnd: function(e){
						    _this.colorFun(this.activeIndex,1)					  		    
						}
					}, 
				})
				mySwiper3=new Swiper('.swiper-list3', {
					loop : false,
					direction : 'vertical',
					on: {
					    slideChangeTransitionEnd: function(e){
					      //Swiper初始化了	
					     	 _this.colorFun(this.activeIndex,2)
						}
					}, 
				})		
		    }						
		}
		componentDidUpdate(){
			//滑动更新state  重置滑动事件
			if(province_type!==this.state.province){
				mySwiper2.destroy(false)			
				province_type=this.state.province
				mySwiper2=new Swiper('.swiper-list2', {
					loop : false,
					direction : 'vertical',
					on: {
					    slideChangeTransitionEnd: function(e){
					     	_this.colorFun(this.activeIndex,1)						     		    
					  	}
					}, 
				})
				mySwiper3.destroy(false)
				city_type=this.state.city
				mySwiper3=new Swiper('.swiper-list3', {
					loop : false,
					direction : 'vertical',
					on: {
					    slideChangeTransitionEnd: function(e){
					     	_this.colorFun(this.activeIndex,2)

					  	}
					}, 
				})					
			}else if(city_type!==this.state.city){
				mySwiper3.destroy(false)
				city_type=this.state.city
				mySwiper3=new Swiper('.swiper-list3', {
					loop : false,
					direction : 'vertical',
					on: {
					    slideChangeTransitionEnd: function(e){
					      	_this.colorFun(this.activeIndex,2)
					  	}
					}, 
				})	
			}
			
			
		} 
	}
	return <Linkage/>
}

export default Linkage;
