import React from 'react';
import styles from '../../style/seckillPage.css'
import $ from 'jquery'
var Swiper=require('../../../node_modules/swiper/dist/js/swiper.js')

const SeckillTime=({timeData,getGoodFun,goodsData})=>{
	let InlervalTime,Timetype=true
	function jsTime(datas) {
		let TimeDiffer={time:0,types:0} //time:时间差(秒),types:当前状态(0:已结束 1:未开始 2:进行中 )
		if(datas){
				let Stime=datas.startStamp
				let Ntime=datas.nowStamp?datas.nowStamp:Date.parse(new Date())
				let Etime=datas.endStamp
				if(Ntime<Stime){//未开始
					TimeDiffer['time']=(Stime-Ntime)/1000;
					TimeDiffer['types']=1
					Timetype=false
				}else if(Ntime>Stime&&Ntime<Etime){//进行中
					TimeDiffer['time']=(Etime-Ntime)/1000
					TimeDiffer['types']=2	
					Timetype=true		
				}else{//已结束
					Timetype=false
				}
			}	
		return TimeDiffer
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
	class SeckillTime extends React.Component{
		render(){
		  	return (
			  		<div className="seckilltime_boxs">
			  			<div id="seckilltime_top">
				  			<div className={'swiper-seckilltime ' + styles.seckilltime_box} >
				  				<ul className='swiper-wrapper' >
				  					{timeData.length?timeData.map(function(item,index){
				  						let wps,newTime=item.nowStamp?item.nowStamp:Date.parse(new Date())
				  						if(newTime<item.startStamp){
				  							wps='即将开始'
				  						}else if(newTime<item.endStamp){
				  							wps='抢购中'
				  						}else{
				  							wps='已开抢'
				  						}
				  						let tiemS=item.startDate.split(':')[0]+":"+item.startDate.split(':')[1]
				  						return(<li key={index} className={'swiper-slide seckilltime_li '+ styles.seckilltime_li1} stimeid={item._id} hid={item.dateId}>
							  						<p>{tiemS}</p>
							  						<div>{wps}</div>
							  						<i></i>
							  					</li>)
				  					}):''}				  									  					
				  				</ul>
				  			</div>
				  			<div className={styles.seckilltime_up} id="timeDiv">
				  				
				  			</div>
			  			</div>	
		  			</div>
		  		)
		}	
		componentDidMount(){
			//可滑动
			let new_index=1,newData=timeData[0],TimeDiffer=0;
			if(timeData.length>0){//时间段定位
				daojiTime(newData)
				let nTime=timeData[0].nowStamp?timeData[0].nowStamp:Date.parse(new Date())
				for(var i=0;i<timeData.length;i++){
					if(nTime>timeData[i].startStamp&&nTime<timeData[i].endStamp){					
						new_index=i
						newData=timeData[i]
						break;
					}else if(nTime<timeData[i].startStamp){
						new_index=i
						newData=timeData[i]
						break;
					}else{
						new_index=i
						newData=timeData[i]
					}	
				}
				if(!goodsData){
					 getGoodFun(newData._id,newData.dateId,Timetype)
				}
			}else{
				getGoodFun(false)
			}
			new Swiper('.swiper-seckilltime', {				
				slidesPerView: 4.5,
		      	spaceBetween: 0,
		      	initialSlide :new_index-1	   
			})			
			function daojiTime(canData){
				let tiemBfuer=jsTime(canData);
				InlervalTime=setInterval(function(){
					if(tiemBfuer.time>0){
						tiemBfuer.time--;
						let showTime=formatSeconds(tiemBfuer.time)
						$('#timeDiv').html(function(){
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
							if(tiemBfuer.types===2){
								return ('据本场结束剩余<span>'+h+':'+m+':'+s+'</span>')
							}else if(tiemBfuer.types===1){								
								return ('据本场开始剩余<span>'+h+':'+m+':'+s+'</span>')
							}else{
								return ('限时限量 先抢先得')
							}							
						})
						if(tiemBfuer.time<1){
							clearInterval(InlervalTime)
							getGoodFun(canData._id,canData.dateId,Timetype)
						}
					}else{
						clearInterval(InlervalTime)
						$('#timeDiv').html('限时限量 先抢先得')
					}
				},1000)
			}
			 //默认计算显示
			//点击
			$('.seckilltime_li').eq(new_index).addClass(styles.seckilltime_li2)
			$('.seckilltime_li').click(function(){
				let SelectData
				var time_class=$(this)[0].classList[2]
				$('.seckilltime_li').removeClass(styles.seckilltime_li2)
				$(this).addClass(styles.seckilltime_li2)
				clearInterval(InlervalTime)
				for(var i=0;i<timeData.length;i++){
					if(timeData[i]._id===$(this).attr('stimeid')){
						SelectData=timeData[i]
					}
				} 
				daojiTime(SelectData)
				getGoodFun(SelectData._id,SelectData.dateId,Timetype)
			})
			//导航定位		
			var img_h
			setTimeout(function(){
				img_h=$('#seckill_banner').height()
			},1)
			var time_h=$('.seckilltime_boxs').height()
			$(window).scroll(function() {				
				var top=$(window).scrollTop()
				if(top>(img_h+85)){
					$('#seckilltime_top').css({
						'position':'fixed',						
						"top":"0px",
						'width':'100%',
						'z-index':'999',
												
					})		
					$('.seckilltime_boxs').css('height',time_h+'px')						
	
					$('#headerReturn').slideUp(150)				
				}else if(top<350){
					$('#seckilltime_top').css({
						'position':'',				
						"top":"0.88rem"
					})
					$('.seckilltime_boxs').css('height','')
					$('#headerReturn').slideDown(150)
				}
			});	
		}
		componentWillUnmount(){
			clearInterval(InlervalTime)
			$(window).unbind('scroll')
		} 
	}
	return <SeckillTime/>
}
export default SeckillTime