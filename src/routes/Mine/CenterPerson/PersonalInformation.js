import React from 'react';
import { connect } from 'dva';
import $ from 'jquery'
import styles from '../../../style/mine/CenterPerson/CenterPerson.css';
import HeaderReturn from '../../../components/PublicComponents/HeaderReturn'
import MaskLayer from '../../../components/PublicComponents/MaskLayer'
import Linkage from '../../../components/PublicComponents/Linkage'
import DateLinkage from'../../../components/PublicComponents/DateLinkage'
import ChaPop from  '../../../components/PublicComponents/ChaPop'

const PersonalInformation=({dispatch,centerPersonData,location})=>{	
	console.log(centerPersonData.userAllData)
	let userData=centerPersonData.userAllData;//h获取到的个人信息
	let userSex,professional,birthday,province,city,area,individualitySignature,tags,names,imgUrl//个人信息存储
	let all_this,imgBase64,imgNames,imgFiles
	if (typeof userData ==='object') {
		if(userData.hasOwnProperty("url")){//头像地址
			imgUrl=centerPersonData.userAllData.url.pictureUrl
		}else{
			imgUrl='./src/assets/myPageDefaultHead2.png'
		}
		if(userData.hasOwnProperty("name")){//性别
			names=centerPersonData.userAllData.name
		}else{
			names=''
		}
		if(userData.hasOwnProperty("sex")){//性别
			userSex=centerPersonData.userAllData.sex
		}else{
			userSex=0
		}
		if(userData.hasOwnProperty('professional')){//职业
			professional=centerPersonData.userAllData.professional
		}else{
			professional=''
		}
		if(userData.hasOwnProperty("birthday")){//生日
			let birth=centerPersonData.userAllData.birthday.split(' ')
			birthday=birth[0]
		}else{
			birthday=''
		}
		if(userData.hasOwnProperty("city")){//城市
			province=centerPersonData.userAllData.city.province
			city=centerPersonData.userAllData.city.city
			area=centerPersonData.userAllData.city.area
		}else{
			province=''
			city=''
			area=''
		}
		if(userData.hasOwnProperty("individualitySignature")){ //个性签名
			individualitySignature=centerPersonData.userAllData.individualitySignature
		}else{
			individualitySignature=''
		}	
		if(userData.hasOwnProperty("tags")){ //标签
			tags=centerPersonData.userAllData.tags
		}else{
			tags=[]
		}	
	}else{
		
	}
	function getUserData() {
		let usersId=sessionStorage.getItem('id')
		dispatch({
			type:'centerPersonData/getUserData',
			data:usersId,
		  	keys:0
		})
	}
	let Popfun;
	function HintWords(popDom){//提示信息
		Popfun = popDom.Popfun
	}
	function getOss(datas,userData){//获取oss账户
		dispatch({
			type:'centerPersonData/getOss',
			data:datas,
			userdata:userData
		})
	}
	function pushOssfun(datas,dthis,uData){
		dispatch({
			type:'centerPersonData/pushOssfun',
			data:datas,
			uData:uData,
			dthis:dthis
		})
	}
	function child_state_fun(){//模态窗
		$('#maskLayer').hide()
	}
	let lingkshow_fun,citytypes=true;
	function LinkShow(dom){//三级联动显示
		lingkshow_fun=dom.showLink
	}
	let dateshow_fun,Datetypes=true;
	function DateShow(dom){
		dateshow_fun=dom.showLink
	}	
	function getCity(data){//获取城市值
		province=data.province;
		city=data.city;
		area=data.area;
		$('#getCityVal').text(data.province+'-'+data.city+'-'+data.area)		
	}
	function getBirthday(data) {//获取生日值 
		birthday=data.year+"-"+data.month+"-"+data.days
		$('#birthday').text(data.year+"-"+data.month+"-"+data.days)
	}
	function changesetType(datas){
		dispatch({
			type:'centerPersonData/changesetType',
			data:datas
		})
	}

	function storage(){
		if(centerPersonData.setType){
			getOss(all_this)
		}else{
			changesetType(true)
		}
	 	
	}		
	class PersonalInformation extends React.Component{
		constructor(props) {
            super(props); 
            this.state = {
                address:false
            }
            this.getaddress=this.getaddress.bind(this)
            this.pushOss=this.pushOss.bind(this)
            this.postPersonall=this.postPersonall.bind(this)
            this.Popfuns=this.Popfuns.bind(this)          
        }
        Popfuns(data){
        	if(data.success){
        		Popfun("修改成功")
        		setTimeout(function(){
        			getUserData()
        			changesetType(false)
        		},1500)
        	}else{
        		Popfun("修改失败")
        		changesetType(false)
        	}       	
        }
        pushOss(ossDatas){//上传到oss
        	let pushOssData
        	if(imgBase64){
        		pushOssData={
	        		Credential:ossDatas.Credential, 
	        		pathInfo:ossDatas.pathInfo,     		
	        		file:imgBase64,
	        		filename:imgNames
        		} 
        	}
    		let userData={}
    		if ($('#nameid').val()) {
    			names=$('#nameid').val()
    		}
			userData.name=names
			userData.sex=userSex
			userData.birthday=birthday
			if(province){
				if(province!==''&&city!==''&&area!==''){
					userData.province=province
					userData.city=city
					userData.area=area
				}
				
			}			
			if($('#professional').val()){
				professional=$('#professional').val()
			}
			userData.professional=professional
			if($('#personalIn_textarea').val()){
				individualitySignature=$('#personalIn_textarea').val()
			}
			userData.individualitySignature=individualitySignature
			let d_tags=''
			for(var i=0;i<$('.tag').length;i++){
				if(i===0){
					d_tags=$('.tag').eq(i).text()    
				}else{
					d_tags=d_tags+","+$('.tag').eq(i).text() 
				}
				    				
			}
			userData.tags=d_tags
			userData.url=imgUrl
        	pushOssfun(pushOssData,all_this,userData)        	   	
        }
        postPersonall(imgurl){
        }
        getaddress(){//获取地址JSON文件
        	let data,_this=this
        	if(!this.state.address){
        		$.getJSON('./src/adress.json', function(json, textStatus) {
					 data=json;
					 _this.setState({address:data})
				});		
        	}
		}
		render(){
			return(
				<div>
			 		<HeaderReturn left_show='1' head_title="个人信息" header_ids='16' right_fun={storage} custom={{id:1,val:centerPersonData.setType}}/>
			 		<div className={styles.personalIn_box}>
						<ul className={styles.personalIn_ul}>
							<li>
								<p>头像</p>
								<input type="file" accept="image/*" id="personalIn_head" className={styles.personalIn_headimg} disabled={centerPersonData.setType?false:"disabled"}/>						
								<label htmlFor="personalIn_head">
								 	<img src={imgUrl?imgUrl:'./src/assets/AJ_evaUserPic.png'} alt='' id='personalIn_headImg' className={styles.personalIn_img}/>
								</label>
							</li>
							<li>
								<p>用户ID</p>								
								<p className={styles.personalIn_useId}>{userData?userData.id:''}</p>
							</li>
							<li>
								<p>昵称</p>								
								<input type="text" id='nameid' className={styles.personalIn_text} placeholder="请输入您的昵称" defaultValue={names} disabled={centerPersonData.setType?false:"disabled"}/>
							</li>
							<li>
								<p>性别</p>								
								<div className={styles.personalIn_sex}>									
									<div className="setSex" sexs='0' setsex='0'>
										<i className={userSex?styles.personalIn_sex_del1:styles.personalIn_sex_del2}></i>女
									</div>									
									<div className="setSex" sexs='1' setsex='0'>
										<i className={userSex?styles.personalIn_sex_del2:styles.personalIn_sex_del1}></i>男
									</div>									
								</div>
							</li>
							<li>
								<p>生日</p>								
								<div className={styles.personalIn_year} id='xuanDate'>									
									<span id="birthday">{birthday?birthday:"选择生日"}</span><i className={styles.personalIn_year_icon}></i>
								</div>
							</li>
							<li>
								<p>城市</p>								
								<div className={styles.personalIn_year} id='xuanCity'>									
									<span id='getCityVal'>{province?province+"-"+city+"-"+area:'选择城市'}</span><i className={styles.personalIn_year_icon}></i>
								</div>
							</li>
							<li>
								<p>职业</p>								
								<input type="text" id='professional' className={styles.personalIn_text} placeholder="请输入您的职业" defaultValue={professional} disabled={centerPersonData.setType?false:"disabled"}/>
							</li>

							<li className={styles.personalIn_autograph}>
								<p>个性签名</p>	
								<textarea id="personalIn_textarea" maxLength='100' defaultValue={individualitySignature} className={styles.personalIn_textarea} placeholder="填写您的个性签名" disabled={centerPersonData.setType?false:"disabled"}></textarea>						
							</li>
						</ul>						
					</div>
					<div className={styles.personalTag_box}>
						<div className={styles.personalTag_head}>
							<p>喜欢的标签</p>
							<p></p>
						</div>
						<ul className={styles.personalTag_ul} id='personalTag_clear'>
							{tags?tags.map(function(elem,index){

								return(<li className="tag" key={index}>{elem}<i style={{'display':centerPersonData.setType?'inline':'none'}}></i></li>)

							}):''}
							
							{centerPersonData.setType?<li className={styles.personalTag_add} id='add_Tag'>添加</li>:''}
						</ul>
					</div>
					<div id="maskLayer" style={{display:'none'}}>
						<MaskLayer disappear={child_state_fun}/>
						<div id="Label_Box" className={styles.Label_Box}>
							<h3>添加标签</h3>
							<input type="text" placeholder="输入标签内容"/>
							<p className={styles.Label_text}>确定删除该标签吗?</p>
							<div className={styles.Label_Boxdiv}>
								<div id="Label_Boxconfirm">确认</div>
								<div id="Label_Boxclear">取消</div>
							</div>
						</div>		
					</div>
								
					<Linkage headName="选择地址" JsonDatd={this.state.address} LinkShow={LinkShow} getCity={getCity}/>
					<DateLinkage headName="选择生日" JsonDatd={this.state.address} LinkShow={DateShow} getCity={getBirthday}/>
					<ChaPop HintWords={ HintWords }/>
				</div>					
				)
		}
		componentWillMount(){
			all_this=this
		  	this.getaddress()	 		
		}
		componentDidMount(){	
			$('#personalIn_head').change(function(e){//上传图片input			
				var file = e.target.files[0];
			    var type = file.type.split('/')[0];
			    var size = Math.round(file.size / 1024 / 1024);
			    let v_this=$(this)
			    if (window.FileReader) {    		      
				    if (type !='image') {
				        alert('请上传图片');			        
				    }else{
				    	if (size > 3) {
				        	alert('图片大小不得超过3M');			  	
				    	}else{
				    		var reader = new FileReader();    
				            reader.readAsDataURL(file);    
				            //监听文件读取结束后事件    
				          	reader.onloadend = function (e) {
				          		imgBase64=e.target.result;
				          		imgFiles=v_this.val()
				          		imgNames=v_this.get(0).files[0].name		          		
				          		$('#personalIn_headImg').attr('src',e.target.result)
				            // $(".img").attr("src",e.target.result);    //e.target.result就是最后的路径地址
				            };    								    		
				    	} 
				    }
				} 		   			   
			})

			let personalTag_type=false,tagType=true,claerTag;							
			$('#personalTag_clear li i').click(function(){//删除标签
				if(centerPersonData.setType){
					tagType=false;
					claerTag=$(this)
					$('#Label_Box p').css('display','block')	
					$('#maskLayer').show()
					$('#maskbox').css({
						'display':'block'
					})
					$('body,html').css({
						'overflow':'hidden'
					})	
				}
			})
			$(".setSex").click(function(event) {//性别
				if(centerPersonData.setType){
					$(this).children('i').attr('class',styles.personalIn_sex_del2)			
					$(this).siblings('div').children('i').attr('class',styles.personalIn_sex_del1)
					$('.setSex').attr('setsex','0')
					$(this).attr('setsex','1')
					userSex=$(this).attr('sexs')	
				}
							
			});
			$('#xuanCity').click(function(){//城市选择
				if(centerPersonData.setType){
					lingkshow_fun(citytypes)
					citytypes=false
				}
				
			})
			$('#xuanDate').click(function(){//生日选择
				if(centerPersonData.setType){
					dateshow_fun(Datetypes)
					Datetypes=false
				}				
			})
			$('#add_Tag').click(function(){	//添加标签	
				tagType=true	
				$('#Label_Box input').css('display','block')	
				$('#maskLayer').show()
				$('#maskbox').css({
					'display':'block'
				})
				$('body,html').css({
					'overflow':'hidden'
				})					
			})

			$('#Label_Boxclear').click(function() {//标签弹窗取消按钮
				$('#maskLayer').hide()
				$('#Label_Box input').css('display','none')	
				$('#Label_Box p').css('display','none')
			});	
			$('#Label_Boxconfirm').click(function(){//标签弹窗确认按钮
				if(tagType){
					let tagVal=$('#Label_Box input').val()
					if (tagVal!=''&&tagVal!=undefined){
						$('#personalTag_clear').prepend(`<li class="tag">`+tagVal+`<i></i></li>`)
						$('#Label_Box input').val('')
						if(centerPersonData.setType){
							$('#personalTag_clear li i').show()
							$('#personalTag_clear li i').click(function(){//删除标签
								if(centerPersonData.setType){
									tagType=false;
									claerTag=$(this)
									$('#Label_Box p').css('display','block')	
									$('#maskLayer').show()
									$('#maskbox').css({
										'display':'block'
									})
									$('body,html').css({
										'overflow':'hidden'
									})	
								}
							})
						}
					}
				}else{
					claerTag.parent('li').remove()
				}
				$('#maskLayer').hide()
				$('#Label_Box input').css('display','none')	
				$('#Label_Box p').css('display','none')
			})

			$('#personalIn_textarea').focus(function(){//个性签名
				$(this).css('text-align','left')
			}).blur(function(){
				if($(this).val()===""||$(this).val()===undefined){
					$(this).css('text-align','right')
				}				
			})	
			
			$('#personalIn_textarea').on('input propertychange',function(){//个性签名
				let valLength=$(this).val();
				if(valLength.length>26){
					if(valLength.length<39){
						$(this).attr('rows','3')
					}else if(valLength.length<52){
						$(this).attr('rows','4')
					}else if(valLength.length<65){
						$(this).attr('rows','5')
					}else if(valLength.length<78){
						$(this).attr('rows','6')
					}else if(valLength.length<91){
						$(this).attr('rows','7')
					}else{
						$(this).attr('rows','8')
					}					
				}else{
					$(this).attr('rows','2')
				}
			})	
		}
		componentWillUnmount(){
			// $('#Preservation').unbind('click')
		}
	}
	return <PersonalInformation/>

}	
export default connect(({ centerPersonData }) => ({
    centerPersonData,
  }))(PersonalInformation)
