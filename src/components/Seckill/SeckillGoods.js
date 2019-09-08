import React from 'react';
import styles from '../../style/seckillPage.css'
import $ from 'jquery'
import DefaultPage from '../../components/PublicComponents/DefaultPage'
const SeckillGoods=({Callback,goodsData})=>{
	let  _this;
	class SeckillGoods extends React.Component{
		constructor(props) {  
	        super(props);  
	        this.state = {
	        	goodsData:false,
	        	typeOpen:3
	        };  
	        this.changeData=this.changeData.bind(this)
	    } 
	    changeData(data,types){
	    	if(data===123){
	    		this.setState({goodsData:data})	 
	    	}else{
	    		this.setState({goodsData:data,typeOpen:types})	 
	    	}
	    	   	
	    }
		render(){
			console.log(_this.state.typeOpen)
			if(_this.state.goodsData===123){
				return (<DefaultPage showDefault='true' default_ids='3'/>)
			}else{
				return (
					<div className={styles.seckillgoods_box}>
						<ul>
							{_this.state.goodsData?_this.state.goodsData.map(function(item,index){
								if(_this.state.goodsData.length){
									return (<li key={index} className={styles.seckillgoods_li} goodsids={item.goodsId} onClick={()=>Callback('goodsDetails',item.goodsId)}>
												<img src={item.mainPic?item.mainPic:'./src/assets/laoding1.1(210).png'} className='seckill_img' />
												<div className={styles.seckillgoods_text}>
													<h2>{item.goodsName}</h2>
													<p>¥{item.goodsPrice}<s>¥{item.goodsMarkPrice}</s></p>
													<div className={styles.seckillgoods_num} max_num={item.totalStock} new_num={item.remainStock}>
														<div></div>
														<p>仅剩{item.remainStock}件</p>
													</div>
													{_this.state.typeOpen===3?"":_this.state.typeOpen?<button className={styles.seckillgoods_btnColor}>马上抢</button>:<button className={styles.seckillgoods_btn}>去看看</button>}
												</div>
											</li>)
								}else{
									return (<div></div>)
								}
							}):''}															
						</ul>
					</div>
				)
			}
			
		}
		componentWillMount (){
			_this=this
			goodsData(_this)
		}
		componentDidMount(){
			var lengths=$('.'+styles.seckillgoods_li).length;			
			for(var i=0;i<lengths;i++){
				var max_num=$('.'+styles.seckillgoods_num).eq(i).attr('max_num');
				var new_num=$('.'+styles.seckillgoods_num).eq(i).attr('new_num');
				var egd=new_num/max_num*1.8				
				$('.'+styles.seckillgoods_num).eq(i).children('div').css('left',"-"+egd+"rem")		
			}
			
			$('.seckill_img').css({
				'width':function(){
					return $('.seckill_img').height()+'px'
				},
			})
		}
		componentDidUpdate(){
			$('.seckill_img').css({
				'width':function(){
					return $('.seckill_img').height()+'px'
				},
					
			})
		}
	}

	return <SeckillGoods/>
}
export default SeckillGoods