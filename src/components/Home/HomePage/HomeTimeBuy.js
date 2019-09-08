import React from 'react';
import $ from 'jquery';
import styles from '../../../style/home/homePage.css';
import Goods_Icon from '../../PublicComponents/Goods_Icon'
import { Link } from  'dva/router'
var Swiper=require('../../../../node_modules/swiper/dist/js/swiper.js')

const HomeTimeBuy=({Callback,isApp,TimeData})=>{
	console.log(12,isApp)	
	let goodsData,Stime,Ntime,Etime,TimeDiffer=0,InlervalTime
	if(TimeData){
		goodsData=TimeData[0].flashGoodsData
		Stime=TimeData[0].startDate
		Ntime=TimeData[0].nowTime
		Etime=TimeData[0].endDate
		if(Ntime<Stime){//未开始
			TimeDiffer=(Stime-Ntime)/1000	
		}else if(Ntime<Etime){//进行中
			TimeDiffer=(Etime-Ntime)/1000	
		}else{
		}
	}
	function formatSeconds(value) {
        var secondTime = parseInt(value);// 秒
        var minuteTime = 0;// 分
        var hourTime = 0;// 小时
        if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
            //获取分钟，除以60取整数，得到整数分钟
            minuteTime = parseInt(secondTime / 60);
            //获取秒数，秒数取佘，得到整数秒数
            secondTime = parseInt(secondTime % 60);
            //如果分钟大于60，将分钟转换成小时
            if(minuteTime > 60) {
                //获取小时，获取分钟除以60，得到整数小时
                hourTime = parseInt(minuteTime / 60);
                //获取小时后取佘的分，获取分钟除以60取佘的分
                minuteTime = parseInt(minuteTime % 60);
            }
        }
        let result={}
        	result.hourTime=parseInt(hourTime); 
        	result.minuteTime=parseInt(minuteTime);
        	result.secondTime=parseInt(secondTime);       
        return result;
    }
	class HomeTimeBuy extends React.Component{
		render(){
			return(
					<div className={styles.home_timebuy_box}> 
						<div className={styles.home_timebuy_head}>
							<div>
								<h2 id='ok'>限时抢购</h2>
								<div className={styles.home_time}>
									<div>{TimeData?TimeData[0].timeName.substring(0,5):""}</div>
									<p id='timeP'>
										<span>00</span>:
										<span>00</span>:
										<span>00</span>
									</p>
								</div>	
							</div>
							<p><a onClick={()=>Callback('second','#/SeckillPage')}>下一场</a></p>
						</div>
						<div className={styles.home_timebuy_goods}>
							<div className='swiper-hometTimebuy'>
								<ul className="swiper-wrapper">
									{goodsData?goodsData.map(function(item,index){
											return (<li key={index} className={styles.home_timebuy_one + " swiper-slide"} onClick={()=>Callback('goodsDetails',item.goodId)}>
									                	<div>
									                		<img src={item.pictureUrl?item.pictureUrl:'./src/assets/laoding1.1(210).png'} className='TimeBuy_img'/>	                		
									                		{item.isAdFee?<Goods_Icon num='1' icon1='1'/>:""}
									                	</div>
									                	<p>¥ {item.goodCurrentPrice}</p>
									                	<s>¥ {item. goodMarkPrice}</s>
									                </li>)
									}):''}					            		                		                
				            	</ul>
			            	</div>
						</div>						
					</div>
				)
		}
		componentDidMount(){
			new Swiper('.swiper-hometTimebuy', {				
				slidesPerView: 3.4,
		      	spaceBetween: 20,			   
			})
			$('.TimeBuy_img').css('height',function(){
				return $('.TimeBuy_img').width()+'px'
			})
			InlervalTime=setInterval(function(){
				if(TimeDiffer>0){
					TimeDiffer--;
					let showTime=formatSeconds(TimeDiffer)
					$('#timeP').html(function(){
						let h,m,s;
						if(showTime.hourTime>9){
							h=showTime.hourTime
						}else{
							h="0"+showTime.hourTime
						}
						if(showTime.minuteTime>9){
							m=showTime.minuteTime
						}else{
							m="0"+showTime.minuteTime
						}
						if(showTime.secondTime>9){
							s=showTime.secondTime
						}else{
							s="0"+showTime.secondTime
						}
						return ('<span>'+h+'</span>:<span>'+m+'</span>:<span>'+s+'</span>')
					})
					if(TimeDiffer<=0){
						if(isApp){
							window.location.href='#/?isApp=1'
						}else{
							window.location.href='#/'
						}
						
					}
				}else{
					clearInterval(InlervalTime)
				}				
			},1000)
			
		} 
		componentDidUpdate(){
			$('.TimeBuy_img').css('height',function(){
				return $('.TimeBuy_img').width()+'px'
			})
		}
		componentWillUnmount(){
			clearInterval(InlervalTime)
		}
	}
	return <HomeTimeBuy/>
}

export default HomeTimeBuy