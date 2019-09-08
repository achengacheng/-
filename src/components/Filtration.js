import React from 'react';
import $ from 'jquery';
import styles from '../style/classify.css';

var menuIds=[],deliveries=[],skus=[],saveParams=[]
class Filtration extends React.Component{
	render(){
		if(this.props.filtData){
			return (
				<div className={ styles.filtContainer } id="filtContainer">
					{this.props.filtData.map(function(k,i){
							return  <div className={ styles.filtMain } key={i}>
										<p>{k.title}</p>
										<div className={ styles.filtType }>
											{k.subTitle.map(function(item,index){
												return 	<span key={index} onClick={()=>this.checkedType(item.params,k.title,k.sign,item.menuId)} id={`filt${item.params}`} data_id = {k.sign}>{item.params}</span>
												},this)
											}
										</div>
									</div>
						},this)
					}
					<footer>
						<p className={ styles.filtFootLeft } onClick={()=>this.reset()}>重置</p>
						<p className={ styles.filtFootRight } onClick={()=>this.ensure()}>确定</p>
					</footer>
				</div>
			)
		}else{
			return <div className={ styles.filtContainer }></div>
		}
	}
	/*对jq取id中的特殊字符进行转义*/
	escapeJquery(srcString){
    // 转义之后的结果
    var escapseResult = srcString;
    // javascript正则表达式中的特殊字符
    var jsSpecialChars = ["\\", "^", "$", "*", "?", ".", "+", "(", ")", "[", "]", "|", "{", "}"];
    // jquery中的特殊字符,不是正则表达式中的特殊字符
    var jquerySpecialChars = ["~", "`", "@", "#", "%", "&", "=", "'", "\"", ":", ";", "<", ">", ",", "/"];
    for (var i = 0; i < jsSpecialChars.length; i++) {
        escapseResult = escapseResult.replace(new RegExp("\\" + jsSpecialChars[i], "g"), "\\" + jsSpecialChars[i]);
    }
    for (var j = 0; j < jquerySpecialChars.length; j++) {
        escapseResult = escapseResult.replace(new RegExp(jquerySpecialChars[j],"g"), "\\" + jquerySpecialChars[j]);
    }
    return escapseResult;
	}
	/*标签点击变换颜色*/
	checkedType(params,title,sign,menuId){
		params = this.escapeJquery(params)
		if($(`#filt${params}`).css('color')==='rgb(0, 0, 0)'){//选中
			saveParams.push(params)
			$(`#filt${params}`).css({
				"color":"#fff",
				"background-color": '#ff6666'
			})
			if(sign===1){
				menuIds.push(menuId)
			}else if(sign===2){
				if(skus.length===0){
					skus.push({
						title:title,
						params:[params]
					})
				}else{
					let temp = true
					skus.map(function(i,k){
						if(i.title===title){
							i.params.push(params)
							temp = false
						}
						return false
					})
					if(temp){
						skus.push({
							title:title,
							params:[params]
						})
					}
				}
			}else if(sign===3){
				if(params==='物流配送'){
					deliveries.push('0')
				}else{
					deliveries.push('1')
				}
			}
		}else{//取消选中
			for (let k=0;k<saveParams.length;k++){
				if(saveParams[k]===params){
					saveParams.splice(k,1)
				}
			}
			$(`#filt${params}`).css({
				"color":"",
				"background-color": ""
			})
			if(sign===1){
				menuIds.map(function(i,k){
					if(i===menuId){
						menuIds.splice(k,1)
					}
					return false
				})
			}else if(sign===2){
				skus.map(function(i,k){
					if(i.title===title){
						if(i.params.length===1){
							skus.splice(k,1)
						}else{
							i.params.map(function(a,b){
								if(a===params){
									i.params.splice(b,1)
								}
								return false
							})
						}
					}
					return false
				})
			}else if(sign===3){
				if(params==='物流配送'){
					if(deliveries.length===1){
						deliveries = []
					}else{
						deliveries = [1]
					}
				}else{
					if(deliveries.length===1){
						deliveries = []
					}else{
						deliveries = [0]
					}
				}
			}
		}
	}
	/*重置按钮*/
	reset(){
		$('#filtContainer span').css({
			"color":"",
			"background-color": ""
		})
		menuIds=[]
		deliveries=[]
		skus=[]
		saveParams=[]
	}
	/*确定按钮*/
	ensure(){
		sessionStorage.removeItem("filtParams")
		sessionStorage.removeItem("filtMenuIds")
		sessionStorage.removeItem("filtDeliveries")
		sessionStorage.removeItem("filtSkus")
		sessionStorage.setItem("filtParams",JSON.stringify(saveParams))
		if(menuIds.length!==0){
			sessionStorage.setItem("filtMenuIds",JSON.stringify(menuIds))
		}
		if(deliveries.length!==0){
			sessionStorage.setItem("filtDeliveries",JSON.stringify(deliveries))
		}
		if(skus.length!==0){
			sessionStorage.setItem("filtSkus",JSON.stringify(skus))
		}
		this.props.disappear(1,menuIds,deliveries,skus)
	}
	componentDidMount(){
		$("#filtContainer").height(document.documentElement.clientHeight)
		$("#filtContainer").css({
  		'right':-$("#filtContainer").width()+'px'
  	})
		$("#filtContainer footer").css({
  		'right':-$("#filtContainer").width()+'px'
  	})
		console.log('是否有筛选值啊',sessionStorage.getItem("filtParams"))
		if(sessionStorage.getItem("filtParams")){
			for (let i=0;i<JSON.parse(sessionStorage.getItem("filtParams")).length;i++){
				let startParams = this.escapeJquery(JSON.parse(sessionStorage.getItem("filtParams"))[i])
				$(`#filt${startParams}`).css({
					"color":"#fff",
					"background-color": '#ff6666'
				})
			}
		}
  }
}

export default Filtration
