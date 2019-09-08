import React from 'react';
import $ from 'jquery';
import styles from '../../../style/goods/goodsDetails.css';

const GoodsBasicMsg=({basicData})=>{
	let Ftime,Ltime,InlervalTime,TimeDiffer=0
	if(basicData.isSeckill){
    	Ftime= new Date(basicData.endtime).getTime();
    	Ltime=	Date.parse(new Date());
    	if(Ltime<Ftime){
    		TimeDiffer=(Ftime-Ltime)/1000
    	}else{
    		TimeDiffer=0
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
	class GoodsBasicMsg extends React.Component{
		render(){
			return (
				<div className={ styles.goodsBasicMsgContainer }>
					<div className={ styles.goodsName }>
						<h5>{basicData.goodsName}</h5>
						<p><span>￥{basicData.currentPrice}</span><del>￥{basicData.markPrice}</del></p>
					</div>
					<div className={ styles.goodsAmount }>
						<p>销量:{basicData.sumSaleNum}</p>
						<p>库存:{basicData.sumStock}</p>
						<p>{basicData.transPrice}</p>
					</div>
					<div className={ basicData.isSeckill?styles.goodsSeckill:styles.hiddenThis} id='goseckill'>
						<p>秒杀抢购中</p>
						<div>
							<p>本场结束剩余</p>
							<div id='timeP'>
								<span></span> : <span></span> : <span></span>
							</div>
						</div>
					</div>
				</div>
			)
		}
		componentDidMount(){
			$('#goseckill').click(function(event) {
				window.location.href='#/SeckillPage'
			});

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
						return ('<span>'+h+'</span> : <span>'+m+'</span> : <span>'+s+'</span>')
					})
				}else{
					clearInterval(InlervalTime)
				}

			},1000)
		}
		componentWillUnmount(){
			clearInterval(InlervalTime)
		}
	}
	return <GoodsBasicMsg/>
}


export default GoodsBasicMsg
