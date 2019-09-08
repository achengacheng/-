import React from 'react';
import styles from '../../style/PublicStyle/PictureUpload.css'
import $ from 'jquery'

const PictureUpload=({num,getImg})=>{
	let arrBox=[];
	let baseBox=[];
	class PictureUpload extends React.Component{
		constructor(props){
		super(props);
		this.state={
			picSrc:[],
			picArr:'',
			Hint2:''
			}
		}
		delImg(index,arrs,bases){
			arrs.splice(index,1);
			bases.splice(index,1);
			getImg(arrs,bases)
			let arr=this.state.picArr;
			this.state.picSrc.splice(index,1)
			let arrBox=arr.getAll('imgBoxs');
			arrBox.splice(index,1)
			arr.delete('imgBoxs');
			for(let i=0;i<arrBox.length;i++){
				arr.append('imgBoxs',arrBox[i])
			}
			this.setState({
				picSrc:this.state.picSrc,
				picArr:arr
			})
		}
		render(){
			var that=this;
			return(<div className={styles.PU_box}>
						<p className={styles.ReturnImg}>上传图片(最多{num}张)</p>
						<div className={styles.container}>
							<div className={styles.imgbox}>
								{/* <div  className={this.state.picSrc.length?null:styles.imggone}>
									<img src={this.state.picSrc[0]} alt=""/>
									<img src="/src/assets/Mine-upimg-dele.png" alt="" className={styles.abImg}/>
								</div> */}
								{
									this.state.picSrc.map(function(item,index){
										return(
											<div  className={item?null:styles.imggone} key={index}>
												<img src={item} alt=""/>
												<img src="/src/assets/Mine-upimg-dele.png" alt="" className={styles.abImg} onClick={()=>that.delImg(index,arrBox,baseBox)}/>
											</div>
										)
									})
								}
								{
									(function(){
										if(that.state.picSrc.length<num){
											return(
												<label htmlFor="pic1" className={that.state.picSrc?styles.labels:null}>
													<div className={styles.AddImg}>
														<img src="/src/assets/Mine-uppic.png" alt="" id="aaa"/>
													</div>
												</label>
											)
										}
										
									})()
								}
							</div>
							
							<form action="#" method="POST" className={styles.inputs}>
								<input type="file" name="pic1" id="pic1"  multiple="multiple"  accept="image/x-png, image/jpg, image/jpeg, image/gif"/>
							</form>	
						</div>
					</div>)
		}
		componentDidMount(){
			let imgbox=[];
			var that=this;
			var formData = new FormData();
			$("#pic1").on("change",function(){
				var file = this.files;
				// var reader = new FileReader();
				function readFileAsync(file){
					const reader = new FileReader();
					reader.onload=function(){
						if(imgbox.length<num){
							formData.append('imgBoxs', file);
							imgbox.push(reader.result)
							arrBox.push(reader.result);
							baseBox.push(file.name)
							that.setState({
								picSrc:imgbox,
								picArr:formData
							})
						}else{
							console.log("超过数量限制")
						}
					}
					reader.readAsDataURL(file);
				}
				for (let i = 0; i < file.length; i++) {
					readFileAsync(file[i])
				}
				getImg(arrBox,baseBox)
				console.log(arrBox,333)
			});
		}
	}
	return <PictureUpload/>
}

export default PictureUpload