import React from 'react';
import styles from '../../style/PublicStyle/Linkage.css';
import $ from 'jquery'
var Swiper=require('../../../node_modules/swiper/dist/js/swiper.js')

const Linkage=({headName,JsonDatd,LinkShow,getCity})=>{
	// console.log(JsonDatd)
	let years_type,month_type;//判断state的更新改变状态
	let _this,Trlin  //存储this
	var mySwipers2,mySwipers3;
	var nstr = new Date();
	var ynow = nstr.getFullYear();
	var mnow = nstr.getMonth();
	var dnow = nstr.getDate();
	let year=[]
	let month=[]

	for(var i=1899;i<=ynow ;i++) {
		year.push(i)
	}
	for(var i=1;i<=12 ;i++) {
		month.push(i)
	}
	function is_leap(year) {  //判断是否为闰年
		let res
		return (year%100==0?res=(year%400==0?1:0):res=(year%4==0?1:0));
	}	
	function jsDay(monthD,yearsD){
		let o=[]
		let m_days=new Array(31,28+is_leap(yearsD),31,30,31,30,31,31,30,31,30,31);
		for(var i=1;i<=m_days[monthD] ;i++) {
			o.push(i)
		} 
		return o
	}
	let days=jsDay(0,1970)
	console.log(month)
	class Linkage extends React.Component{
		constructor(props) {
            super(props); 
            this.state = {
                years:71,
                month:0,
                days:0,
                mDays:days
            } 
            this.colorFun=this.colorFun.bind(this)
            this.showLink=this.showLink.bind(this)         
        }
        showLink(ip){
        	$('.Linkage_Pops').slideToggle(300);
        	if(ip){
        		Trlin()
        	}
        	
        }
        colorFun(index,addressId){//更新state 存储当前选择数据	
			if(addressId===0){
				years_type=this.state.years
				days=jsDay(this.state.month,year[this.state.years])
				this.setState({years:index,month:0,days:0,mDays:days})	
			}else if(addressId===1){
				month_type=this.state.month
				days=jsDay(index,year[this.state.years])		
				this.setState({month:index,days:0,mDays:days})				
			}else{
				this.setState({days:index})
			}
		}
		render(){
			return( <div className={styles.Linkage_Pop +" Linkage_Pops"}>
						<div className={styles.Linkage_box}>
							<div className={styles.Linkage_head}>
									<p id="Nobtns">取消</p>
									<span>{headName}</span>
									<p id="Yesbtns">确认</p>
							</div>
							<div className={styles.Linkage_list_box}>
								<div className={styles.Linkage_show}>									
									<div className="date-swiper-list1">
										<ul className="swiper-wrapper">
										{year.length?year.map(function(elem,index){
												return (<li key={index} className={`${styles.Linkage_li} ${"swiper-slide"} ${_this.state.years===index?styles.Linkage_li_color:''}`}><span>{elem}</span></li>);
											}):''											
										}												
										</ul>
									</div>									
									<div className="date-swiper-list2">
										<ul className="swiper-wrapper">
											{month.length?month.map(function(elem,index){
													return (<li key={index} className={`${styles.Linkage_li} ${"swiper-slide"} ${_this.state.month===index?styles.Linkage_li_color:''}`}><span>{elem}</span></li>);
												}):''											
											}	
										</ul>
									</div>
									<div className="date-swiper-list3">
										<ul className="swiper-wrapper">
											{this.state.mDays.length?this.state.mDays.map(function(elem,index){
													return (<li key={index} className={`${styles.Linkage_li} ${"swiper-slide"} ${_this.state.days===index?styles.Linkage_li_color:''}`}><span>{elem}</span></li>);
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
		        $(".Linkage_Pops").on('touchmove',function(e){
		            e.stopPropagation();
		            e.preventDefault();
		        })
		    }
		    $('#Yesbtns').click(function(){		    		    	
		    	$('.Linkage_Pops').slideToggle(300);
		    	let birthday={}
		    	birthday.year=year[_this.state.years]
		    	birthday.month=month[_this.state.month]
		    	birthday.days=_this.state.mDays[_this.state.days]
		    	getCity(birthday)
		    })
		    $('#Nobtns').click(function() {
		    	$('.Linkage_Pops').slideToggle(300);
		    })	
		    //三级联动 滑动初始化	
		    Trlin=()=>{
		    	new Swiper('.date-swiper-list1', {
					loop : false,
					direction : 'vertical',
					initialSlide :71,
					on: {
					    slideChangeTransitionEnd: function(event){				     				      
					      _this.colorFun(this.activeIndex,0)				      
					  	}				  	
					}, 
				})
				mySwipers2=new Swiper('.date-swiper-list2', {
					loop : false,
					direction : 'vertical',
					on: {
					    slideChangeTransitionEnd: function(e){
						    _this.colorFun(this.activeIndex,1)					  		    
						}
					}, 
				})
				mySwipers3=new Swiper('.date-swiper-list3', {
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
			if(mySwipers2){
				if(years_type!==this.state.years){
					mySwipers2.destroy(false)			
					years_type=this.state.years
					mySwipers2=new Swiper('.date-swiper-list2', {
						loop : false,
						direction : 'vertical',
						initialSlide :0,
						on: {
						    slideChangeTransitionEnd: function(e){
						     	_this.colorFun(this.activeIndex,1)						     		    
						  	}
						}, 
					})
					mySwipers3.destroy(false)
					month_type=this.state.month
					mySwipers3=new Swiper('.date-swiper-list3', {
						loop : false,
						direction : 'vertical',
						initialSlide :0,
						on: {
						    slideChangeTransitionEnd: function(e){
						     	_this.colorFun(this.activeIndex,2)

						  	}
						}, 
					})					
				}else if(month_type!==this.state.month){
					mySwipers3.destroy(false)
					month_type=this.state.month
					mySwipers3=new Swiper('.date-swiper-list3', {
						loop : false,
						direction : 'vertical',
						initialSlide :0,
						on: {
						    slideChangeTransitionEnd: function(e){
						      	_this.colorFun(this.activeIndex,2)
						  	}
						}, 
					})	
				}			
			}
			
		} 
	}
	return <Linkage/>
}

export default Linkage;
