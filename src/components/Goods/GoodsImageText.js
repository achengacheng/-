import React from 'react';
import $ from 'jquery';
import styles from '../../style/goods/otherGoods.css';

const GoodsImageText = ({ isLove,details }) => {
	class GoodsImageText extends React.Component{
		render(){
			if(details){
				return (
					<div className={ styles.goodsImageTextContainer } >
						<div className={ styles.goodsImageTextMain } dangerouslySetInnerHTML={{__html: details}}></div>
					</div>
				)
			}else{
				return(
					<div className={ styles.goodsImageTextContainer }>
						{/* <div className={ styles.goodsImageTextMain }>
							<p>钢化玻璃手机贴膜是2012年美国新推出的一种手机保护膜，是目前对保护屏幕最具强化保护的高端新产品。这款运动内衣大多以红色山峦印花拼黑色，引人注目</p>
							<p>稳固胸型的同时更弹力透气前胸的V字网眼搭配背部层叠设计，增强运动稳定性的同时，手机贴膜是2012年美国新推出的一种手机保护膜，是目前对保护屏幕最具强化保护的高端新产品。</p>
							<p>稳固胸型的同时更弹力透气前胸的V字网眼搭配背部层叠设计，增强运动稳定性的同时，手机贴膜是2012年美国新推出的一种手机保护膜，是目前对保护屏幕最具强化保护的高端新产品。</p>
							<div>
								<img src='src/assets/goods_imageText1.png' alt='userHead'/>
							</div>
							<div>
								<img src='src/assets/goods_imageText2.png' alt='userHead'/>
							</div>
						</div>
						<ul className={ styles.goodsServiceText }>
							<p>服务说明</p>
							<li>
								<h6>&bull; 购买运费如何收取</h6>
								<p>单笔订单金额(不含运费)满88元免邮费；不满88元，每单收取10元运费。（港澳台地区需满500元免邮费；不满500元，每单收取30元运费）</p>
							</li>
							<li>
								<h6>&bull; 使用什么快递发货</h6>
								<p>默认使用顺丰快递发货(个别商品使用其他快递)</p>
								<p>配送范围覆盖全国大部分地区(港澳台地区除外)</p>
							</li>
						</ul> */}
					</div>
				)
			}
		}
		componentDidMount(){
	    	if(isLove){
	    		$('#love').css('display','none');
	    		$('#love2').css('display','block');
	    	}
	    }
	}
	return <GoodsImageText />
}

export default GoodsImageText
