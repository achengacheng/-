import React from 'react';
import styles from '../../style/PublicStyle/popUp.css';
import $ from 'jquery';
var Swiper=require('../../../node_modules/swiper/dist/js/swiper.js');

const BigPicture = ({getImgdom}) => {
	let _this,bigSwiper;
	/*使用规则:
		1.使用页使用这段代码
		<BigPicture getImgdom={getImgdom}/>

		let bigPictures;
		function getImgdom(dom){
			bigPictures=dom.bigImg
		}
		点击图片上时调用bigPictures(op1,op2) //第一个参数 true显示组件  第二个 图片数组;
		op2格式要求['imgurl1','imgurl2','imgurl3','imgurl4]
	*/

	class BigPictures extends React.Component{
		constructor(props) {
	        super(props);
	        this.state={
	        	imgType:false,
	        	imgArray:false
	        }
	        this.bigImg = this.bigImg.bind(this);
	    }
	    bigImg(types,data){
				console.log('大图组件',data)
	    	this.setState({
	    		imgType:types,
	        	imgArray:data
	    	})
	    }
		render(){
			return(	<div className={styles.bigImgBox} id='bigImgBox'>
						<div className={`${'bigImg'} ${styles.imgbox}`}>
				            <div className="swiper-wrapper">
				             	{this.state.imgArray?this.state.imgArray.map(function(item,index){
				             		return(<div className={`${'swiper-slide'} ${styles.slide}`} key={index}>
									            <img src={item} className={styles.swiper_img}/>
								            </div>	)
				             	}):''}

				            </div>
				            <div className="swiper-pagination"></div>
				        </div>
				        <i className={styles.clearImg} id="clearImg"></i>
					</div>)
		}
		componentWillMount(){
			_this=this
			getImgdom(_this)
			console.log(1,bigSwiper)
		}
		componentDidMount(){
			if(this.state.imgType){
				$('#bigImgBox').show()
			}else{
				$('#bigImgBox').hide()
			}

			bigSwiper=new Swiper('.bigImg', {
				loop : true,
				pagination: {
				    el: '.swiper-pagination',
				    type:'fraction',
				    bulletClass : styles.mybullet,
				    bulletActiveClass: styles.mybulletActive,
				},
			})
			console.log(3,bigSwiper)
			$('#clearImg').click(function(event) {
				$('#bigImgBox').hide()
			});
			$('.swiper-pagination').css({
				'color': '#fff',
				'font-size':' 0.25rem'
			})
			$('#bigImgBox').height(document.documentElement.clientHeight);
			// 阻止蒙版后页面滑动
		    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
		    //移动端
		        $("#maskbox").on('touchmove',function(e){
		            e.stopPropagation();
		            e.preventDefault();
		        })
		    }
		}
		componentWillUpdate(){
		}
		componentDidUpdate(){
			if(this.state.imgType){
				$('#bigImgBox').show()
			}else{
				$('#bigImgBox').hide()
			}

			console.log(36,bigSwiper)
			bigSwiper.destroy(true,false);
			bigSwiper=new Swiper('.bigImg', {
				loop : true,
				pagination: {
				    el: '.swiper-pagination',
				    type:'fraction',
				    bulletClass : styles.mybullet,
				    bulletActiveClass: styles.mybulletActive,
				},
			})
		}
		componentWillUnmount(){
				bigSwiper.destroy(true,false);
		}
	}
	return <BigPictures/>
}

export default BigPicture
