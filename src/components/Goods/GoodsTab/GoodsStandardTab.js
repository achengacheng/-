import React from 'react';
import $ from 'jquery';
import styles from '../../../style/goods/otherGoods.css';

let num;
let max_num;  //库存
let goodsId;  //商品唯一标识
let skuDatas; //现用展示数组
let allDatas; //所有数据
let skuId;    //默认id
let changeId; //如关闭更新需重新赋值的skuId
let standardTab;//弹窗提示方法
let closeTab;//关闭选项卡方法
let timer;//延时执行函数
class GoodsStandardTab extends React.Component{
	constructor(props){
			super(props);
			this.state={
				tyslo:true,
				inital:true
			}
			this.initializa=this.initializa.bind(this)
		}
	initializa(){
		changeId=''
		max_num=this.props.standard[0].sumStock
		$('#changeStock').text('库存：'+max_num)
		closeTab()
	}
	render(){
		skuDatas=''
		num=this.props.goodsNum?this.props.goodsNum:1
		standardTab = this.props.standardTab
		goodsId = this.props.goodsId
		allDatas = this.props.standard
		skuId = this.props.skuId

		for (let i in allDatas){
			if(allDatas[i].skuId === this.props.skuId){
				skuDatas = allDatas[i];
				max_num = skuDatas.sumStock;
			}
		}
		closeTab = this.props.disappear;
		if(skuDatas){
			return(
				<div className={ styles.goodsTabContainer } id="standardTab">
					<header className={ styles.standardHead }>
						<div>
							<div className={ styles.standardPic }>
								<img src={skuDatas.skuPic}  id='changePic' />
							</div>
							<div className={ styles.standardContent }>
								<h6 id='changeName'>{skuDatas.goodsName}</h6>
								<span id='changePrice'>￥{skuDatas.currentPrice}</span>
								<p id='changeStock'>库存：{max_num}</p>
							</div>
						</div>
						<i className={ styles.goodsTabClose } onClick={ () =>this.initializa() }></i>
					</header>
					<div className={ styles.standardMain } id="tabClick">
						{skuDatas.skuList.map(function(k,i){
							return  <div className={ styles.singleTab } key={i}>
										<p>{k.title}</p>
										<div className={ styles.allTab }>
											{k.params.map(function(a,b){
												return  <span key={b} className="tabThing">{a}</span>
												},this)
											}
										</div>
									</div>
							},this)
						}
						<div className={ styles.goodsNum }>
							<p>数量</p>
							<div className={styles.goodsTab_num}>
								<div className='num_down' jia_key='1'>-</div>
								<input type='text' defaultValue={this.props.goodsNum?this.props.goodsNum:1} className="num_input" onChange={()=>this.inputChange()} onKeyUp={(e)=>this.onKeyup(e)}/>
								<div className='num_up' jia_key='1'>+</div>
							</div>
						</div>
					</div>
					<footer className={ styles.standardFoot }>
						<span className={ `${styles.standardCart} ${this.props.tabId===2?'':styles.hidden}` } onClick={()=>this.addCart()}>加入购物车</span>
						<span className={ `${styles.standardBuy} ${this.props.tabId===2?'':styles.hidden}` } onClick={()=>this.payFor()}>立即购买</span>
						<div className={ this.props.tabId===3?'':styles.hidden } onClick={()=>this.addCart()}>加入购物车</div>
						<div className={ this.props.tabId===4?'':styles.hidden } onClick={()=>this.payFor()}>立即购买</div>
						<div className={ this.props.tabId===5?'':styles.hidden} onClick={()=>this.addCart()}>确定</div>
					</footer>
				</div>
			)
		}else{
			return(
				<div className={ styles.goodsTabContainer } id="standardTab"></div>
			)
		}
	}
	/*软键盘确认数量*/
	onKeyup (e) {
    if(e.keyCode === 13){
      if(isNaN(Number(String($('.num_input').val())))){
    		num = 1;
				$('.num_input').val(num);
				$('.num_down').css('color','#cacaca')
    	}else{
    		let tempNum = Number(String($('.num_input').val()));
	    	if(tempNum >= max_num){
					num = max_num;
					$('.num_input').val(num);
					$('.num_up').css('color','#cacaca')
				}else if(tempNum<=0){
					num = 1;
					$('.num_input').val(num);
					$('.num_down').css('color','#cacaca')
				}else{
					num = tempNum;
					$('.num_input').val(num);
					$('.num_down').css('color','#262626');
					$('.num_up').css('color','#262626')
				}
    	}
    }
  }
  /*数量框input变化*/
  inputChange(){
      if(isNaN(Number(String($('.num_input').val())))){
  		num = 1;
		$('.num_input').val(num);
		$('.num_down').css('color','#cacaca')
  	}else{
  		let tempNum = Number(String($('.num_input').val()));
    	if(tempNum > max_num){
				num = max_num;
				$('.num_input').val(num);
				$('.num_up').css('color','#cacaca')
			}else if(tempNum<=0){
					num = 1;
					$('.num_input').val(num);
					$('.num_down').css('color','#cacaca')
			}else{
				num = tempNum;
				$('.num_input').val(num);
				$('.num_down').css('color','#262626');
				$('.num_up').css('color','#262626')
			}
  	}
  }
  /*加入购物车是否成功后回调*/
  isSuccess(msg,msgtext){
  	if(msg){
  		standardTab('添加成功')
			/*购物车添加成功，手动增加展示*/
			if(!$("#addCartNo").text().includes('+')){
				if($("#addCartNo").text()==='0'){
					$("#addCartNo").css('display','flex')
				}
				let cartNumber = Number(Number($("#addCartNo").text())+Number(num))
				if(cartNumber>=9){
					$("#addCartNo").text('9+')
				}else{
					$("#addCartNo").text(cartNumber)
				}
			}
			sessionStorage.setItem("scNO",Number(sessionStorage.getItem("scNO"))+Number(num))
  		closeTab(changeId)
  	}else{
  		if(msgtext){
			standardTab(msgtext)
  		}else{
  			standardTab('添加失败')
  		}

  	}
  }
  /*加入购物车方法*/
  addCart(){
    	let titleName = [];
    	let hasThisTitle = [];
    	for (let i=0;i<$('#tabClick').children('div').children('p').length-1;i++) {
    		titleName.push($('#tabClick').children('div').children('p').eq(i).text())
    		$('#tabClick').children('div').children('p').siblings('div').eq(i).children('.tabThing').map(function(index,item){
    			if($(item).css('color')==='rgb(255, 255, 255)'){
    				hasThisTitle.push($(item).parent().siblings('p').text())
    			}
					return false
    		})
    	}
    	if(titleName.length===hasThisTitle.length){
    		if(sessionStorage.getItem("id")){
					if(num>Number(max_num)||Number(max_num)===0){
						this.props.standardTab('库存不足')
					}else{
						if(changeId){
		    			let addCartData1 = {
		    				goodsNumber:num,
		    				userId:sessionStorage.getItem("id"),
		    				goodsId:goodsId,
		    				skuId:changeId
		    			}
		    			this.props.addCart(addCartData1,this.isSuccess)
		    		}else{
		    			let addCartData2 = {
		    				goodsNumber:num,
		    				userId:sessionStorage.getItem("id"),
		    				goodsId:goodsId,
		    				skuId:skuId
		    			}
		    			this.props.addCart(addCartData2,this.isSuccess)
		    		}
						max_num=this.props.standard[0].sumStock
						$('#changeStock').text('库存：'+max_num)
					}
    		}else{
					this.props.standardTab('请登录后操作')
					timer = setTimeout(()=>{
	          this.props.goToLogin()
	        },2000);
    		}
    	}else{
	    	for (let i=0;i<titleName.length;i++){
	    		for (let k=0;k<hasThisTitle.length;k++){
	    			if(titleName[i]===hasThisTitle[k]){
	    				titleName.splice(i,1)
	    			}
	    		}
	    	}
	    	this.props.standardTab('请选择'+titleName[0])
    	}
    }
	/*立即购买方法*/
	payFor(){
		let titleName = [];
		let hasThisTitle = [];
		for (let i=0;i<$('#tabClick').children('div').children('p').length-1;i++) {
			titleName.push($('#tabClick').children('div').children('p').eq(i).text())
			$('#tabClick').children('div').children('p').siblings('div').eq(i).children('.tabThing').map(function(index,item){
				if($(item).css('color')==='rgb(255, 255, 255)'){
					hasThisTitle.push($(item).parent().siblings('p').text())
				}
				return false
			})
		}
		if(titleName.length===hasThisTitle.length){
			if(sessionStorage.getItem("id")){
				if(num>Number(max_num)||Number(max_num)===0){
					this.props.standardTab('库存不足')
				}else{
					let addCartData;
					if(changeId){
						addCartData = {
							goodsNumber:num,
							userId:sessionStorage.getItem("id"),
							goodsId:goodsId,
							skuId:changeId
						}
					}else{
						addCartData = {
							goodsNumber:num,
							userId:sessionStorage.getItem("id"),
							goodsId:goodsId,
							skuId:skuId
						}
					}
					let goodsArray=[]
					let pushData=JSON.stringify({'goodsId':addCartData.goodsId,'goodsSku':addCartData.skuId,'count':addCartData.goodsNumber})
					goodsArray.push(pushData)
					let p_Data={}
					p_Data.data=goodsArray
					sessionStorage.setItem('cartData',JSON.stringify(p_Data))
					let mors=0
					if (allDatas) {
						allDatas.map(function(item,index){
							if(item.skuId===addCartData.skuId){
								mors=item.deliveryMethods
							}
						})
					}
					window.location.href='#/PlaceOrder#'+mors
				}
			}else{
				this.props.standardTab('请登录后操作')
				timer = setTimeout(()=>{
					this.props.goToLogin()
				},2000);
			}
		}else{
			for (let i=0;i<titleName.length;i++){
				for (let k=0;k<hasThisTitle.length;k++){
					if(titleName[i]===hasThisTitle[k]){
						titleName.splice(i,1)
					}
				}
			}
			this.props.standardTab('请选择'+titleName[0])
		}
	}
	componentDidMount (){
		$('#standardTab').height($(window).height()*(0.7));

	}componentWillUpdate (){
		$('#tabClick').unbind('click')
	}
	componentDidUpdate (){
		//深克隆
		function deepClone(initalObj) {
	    	var obj = {};
	       	 	obj = JSON.parse(JSON.stringify(initalObj));
	    	return obj;
		}
		let cans=[]//改变数据结构,存储goods所有sku
		let tempSku=[] //进入默认展示的那一条goodsSku
		if(skuDatas){
				/*默认标签*/
			for (let k in skuDatas.goodsSkus){
				// cans.push({
				// 	[k]:skuDatas.goodsSkus[k]
				// })
				tempSku.push({
					[k]:skuDatas.goodsSkus[k]
				})
				// for (var i=0;i<$('.tabThing').length;i++) {
				//  	if($('.tabThing').eq(i).text()===skuDatas.goodsSkus[k]){
				// 		$('.tabThing').eq(i).css({
				// 			"color":"#fff",
				// 			"background-color": '#ffae00'
				// 		})
				// 	}
				// }
			}
		}
		let skuKey=[] //存储所有sku名称
		allDatas[0].skuList.map(function(key,index){
			skuKey.push(key.title)
			return false
		})
		function key1(data){
			// console.log('进入了key1',data,tempSku)
			let num=0
			if(data.length===tempSku.length){
				for(var i=0;i<data.length;i++){
					for (let k in data[i]){
						for(var a=0;a<data.length;a++){
							for (let b in tempSku[a]){
								if(data[i][k]===tempSku[a][b]){
									num++
								}
							}
						}
					}
				}
				// console.log('这是进key1后的',num)
				if(num!==data.length){
					let tempSku=[].concat(data)//更新对比数组
					let allSkuDatas = []
					for( var i = 0;i < allDatas.length; i++ ){
						allSkuDatas.push({
							'id':allDatas[i].skuId,
							'goodsSku':allDatas[i].goodsSkus,
							'num':0
						})
					}
					for( var i = 0;i < allSkuDatas.length; i++ ){
						if(allSkuDatas[i].id === skuId){
							allSkuDatas.splice(i,1)
						}
					}
					for(var i=0;i<data.length;i++){
						for (let k in data[i]){
							for(var a=0;a<allSkuDatas.length;a++){
								for (let b in allSkuDatas[a].goodsSku){
									if(data[i][k]===allSkuDatas[a].goodsSku[b]){
										allSkuDatas[a].num++
									}
								}
							}
						}
					}
					for(var a=0;a<allSkuDatas.length;a++){
						if(allSkuDatas[a].num===data.length){
							for (let i in allDatas){
								if(allDatas[i].skuId === allSkuDatas[a].id){
									max_num = allDatas[i].stock;
									$('#changePic').attr({
										src:allDatas[i].skuPic
									});
									$('#changeName').text(allDatas[i].goodsName);
									$('#changePrice').text('￥'+allDatas[i].currentPrice);
									$('#changeStock').text('库存：'+max_num);
									changeId = allDatas[i].skuId;
								}
							}
						}
					}
				}else{
					// console.log('进入了没变',data,skuDatas)
					if(data.length !== 0){
						$('#changePic').attr({
							src:skuDatas.skuPic
						});
						$('#changeName').text(skuDatas.goodsName);
						$('#changePrice').text('￥'+skuDatas.currentPrice);
						$('#changeStock').text('库存：'+skuDatas.stock);
						changeId = skuId;
					}
				}
			}
			let skulist=deepClone(allDatas[0].skuList),haveSku=[];
			for (var i=0;i<$('.tabThing').length;i++) {
			 	if($('.tabThing').eq(i).css('color')==='rgb(183, 183, 183)'){
					$('.tabThing').eq(i).css({
						"color":"",
						"background-color": '#f8f9fb'
					})
				}
			}
			if(data.length===0){
				for (var i=0;i<$('.tabThing').length;i++) {
					$('.tabThing').eq(i).css({
						"color":"",
						"background-color": '#f8f9fb'
					})
				}
			}

			allDatas.map(function(elem,index){
				let datas=elem.goodsSkus
				haveSku.push(datas)
				return false
			})
			for(let i=0;i<data.length;i++){//计算可选择的sku数据
				haveSku=key2(data[i],haveSku)
			}
			for(var i=0;i<haveSku.length;i++){ //计算不可选择的sku
				for(var j=0;j<skuKey.length;j++){
					for(var z=0;z<skulist.length;z++){
						if(skulist[z].title===skuKey[j]){
							for(var p=0 ;p<skulist[z].params.length;p++){
								if(skulist[z].params[p]===haveSku[i][skuKey[j]]){
									skulist[z].params.splice(p,1)
								}
							}
						}
					}
				}
			}

			let ns=0,keyones
			for(var i=0;i<skulist.length;i++){
				if(skulist[i].params.length>0){
					ns+=1;
					keyones=i
				}
			}
			if(ns===1){
				skulist[keyones].params.splice(0,skulist[keyones].params.length)
			}
			for(var k=0;k<skulist.length;k++){
				for(var j=0;j<skulist[k].params.length;j++){
					for (var i=0;i<$('.tabThing').length;i++) {
					 	if($('.tabThing').eq(i).text()===skulist[k].params[j]){
							$('.tabThing').eq(i).css({
								"color":"rgb(183, 183, 183)",
								"background-color": '#f8f9fb'
							})
						}
					}
				}
			}
		}
		function key2(datas,haveSku){
			let canSku=[]
			$.each(datas,function(key,val){
				for(var j=0; j<haveSku.length;j++){
					if(haveSku[j][key]===val){
						canSku.push(haveSku[j])
					}
				}
			})

			return canSku
		}
		// 取消选中
		function key3(deletes,cans1,dom){
			for (var i=0;i<dom.length;i++) {
				for (var j=0;j<$('.tabThing').length;j++) {
					if($('.tabThing').eq(j).text()===$(dom[i]).text()){
						$('.tabThing').eq(j).css({
							"color":"",
							"background-color": '#f8f9fb'
						})
					}
				}
			}
			key1(cans1)
		}
		key1(cans)
		let deleteSku=[]
		/*标签点击变换颜色*/
		$('#tabClick').on('click','span',function(){
			if($(this).css('color')==='rgb(183, 183, 183)'){//不可点击#b7b7b7
				return false
			}else if($(this).css('color')==='rgb(0, 0, 0)'){//选中#000
				$(this).css({
					"color":"#fff",//白字
					"background-color": '#ffae00'//橙色底
				})
				if($(this).siblings().length>1){
					for(var i =0; i<$(this).siblings().length; i++) {
						if($($(this).siblings()[i]).css('color')==='rgb(255, 255, 255)'){
							$($(this).siblings()[i]).css({
								"color":"",
								"background-color": "#f8f9fb"
							})
						}
					}
				}else{
					if($(this).siblings().css('color')==='rgb(255, 255, 255)'){//取消选中#fff
						$(this).siblings().css({
							"color":"",
							"background-color": "#f8f9fb"
						})
					}
				}
				let isCheck = {[$(this).parent().siblings().text()]:$(this).text()}
				for(var i =0; i<cans.length; i++) {
					if(Object.keys(cans[i])[0]===Object.keys(isCheck)[0]){
						cans.splice(i,1)
					}
				}
				cans.push(isCheck)
				key1(cans)
			}else{//取消选中
				let notCheck={[$(this).parent().siblings().text()]:$(this).text()}
				let domData=[]
				if($(this).siblings().length>1){
					for(var i =0; i<$(this).siblings().length; i++) {
						domData.push($(this).siblings()[i])
					}
				}else{
					domData.push($(this).siblings())
				}
				for(var i =0; i<cans.length; i++) {
					if(Object.keys(cans[i])[0]===Object.keys(notCheck)[0]){
						deleteSku.push(cans[i])
						cans.splice(i,1)
						key3(deleteSku,cans,domData)
					}
				}
				$(this).css({
					"color":"",
					"background-color": "#f8f9fb"
				})
			}
		})
		//减号样式
		for (var i=0;i<$('.num_input').length;i++) {
			if($('.num_input').eq(i).val()<2){
				$('.num_input').eq(i).siblings('.num_down').css('color','#cacaca')
			}else{
				$('.num_input').eq(i).siblings('.num_down').css('color','#262626')
			}
		}
		/*长按增加*/
		$('.num_up').unbind('touchstart')
		$('.num_up').unbind('touchend')
		$('.num_down').unbind('touchstart')
		$('.num_down').unbind('touchend')
		var num_time,Time_out=false,time_click=true;
		$('.num_up').bind('touchstart',function(event) {
			event.preventDefault();
			setTimeout(function(){
				Time_out=true
			},1000)
			num_time=setInterval(function(){
				event.preventDefault();
				if(Time_out){
					num=parseInt($(event.currentTarget).siblings('input').val())
					if(num<parseInt(max_num)){
						num++
						$(event.currentTarget).siblings('input').val(num)
					}
					time_click=false
				}else{
					time_click=true
				}
			},200)
		}).bind('touchend',function(event) {
			clearInterval(num_time)
			if(time_click){
				num=parseInt($(event.currentTarget).siblings('input').val())
				if(num<parseInt(max_num)){
					num++
					$(event.currentTarget).siblings('input').val(num)
				}
			}
			time_click=true;
			Time_out=false;
			if(num<2){
				$(event.currentTarget).siblings('.num_down').css('color','#cacaca')
			}else{
				$(event.currentTarget).siblings('.num_down').css('color','#262626')
			}
			if(num===parseInt(max_num)){
				$(event.currentTarget).css('color','#cacaca')
			}else{
				$(event.currentTarget).css('color','#262626')
			}
		})
		/*长按减少*/
		$('.num_down').bind('touchstart',function(event) {
			event.preventDefault();
			setTimeout(function(){
				Time_out=true
			},1000)
			num_time=setInterval(function(){
				if(Time_out){
					num=parseInt($(event.currentTarget).siblings('input').val())
					if(num>1){
						num--
						$(event.currentTarget).siblings('input').val(num)
					}
					time_click=false
				}else{
					time_click=true
				}
			},200)
		}).bind('touchend',function(event) {
			clearInterval(num_time)
			if(time_click){
				num=parseInt($(event.currentTarget).siblings('input').val())
				if(num>1){
					num--
					$(event.currentTarget).siblings('input').val(num)
				}
			}
			time_click=true;
			Time_out=false;
			if(num<2){
				$(event.currentTarget).css('color','#cacaca')
			}else{
				$(event.currentTarget).css('color','#262626')
			}
			if(num===parseInt(max_num)){
				$(event.currentTarget).siblings('.num_up').css('color','#cacaca')
			}else{
				$(event.currentTarget).siblings('.num_up').css('color','#262626')
			}
		})
	}
	componentWillUnmount(){
		clearTimeout(timer)
		// num=''
		// max_num='';  //库存
		// goodsId='';  //商品唯一标识
		// skuDatas=''; //现用展示数组
		// allDatas=''; //所有数据
		// skuId='';    //默认id
		// changeId=''; //如关闭更新需重新赋值的skuId
		// standardTab='';//弹窗提示方法
		// closeTab='';//关闭选项卡方法
		// timer='';//延时执行函数
	}
}

export default GoodsStandardTab
