import request from '../utils/request';
import constant from '../constant.js'
	
	//token验证
	const tokenFun=(data)=>{
		let resdatas=''
		if(data){
			if(data.hasOwnProperty('body')){
				 resdatas=data.body
			}else{
				let lengths=Object.getOwnPropertyNames(data).length
				Object.getOwnPropertyNames(data).forEach(function(key,index){
					if (index===lengths-1) {
						resdatas=resdatas+key+"="+data[key]
					}else{
						resdatas+=key+"="+data[key]+"&"
					}
				})			
			}
		}else{

		}			
 		let reqdata={
			method: "POST",  
            headers: {  
                "Content-Type": "application/x-www-form-urlencoded",
                'Authorization': localStorage.getItem('token')?localStorage.getItem('token'):'',
                'parentId':sessionStorage.getItem('id')?sessionStorage.getItem('id'):'',
                'boundCompanyId':sessionStorage.getItem('boundCompanyId')?sessionStorage.getItem('boundCompanyId'):8000
            },  
			body:resdatas
		}	
 		return reqdata;
	}
	//增
 	 const Add=(url,datas)=>{
 		let tokenYes=tokenFun(datas)
		let response=request(constant.baseUrl+url,tokenYes).then(function(reqdata){			
			if(reqdata.data.success){
				return reqdata;
			}else if(reqdata.data.alertMsg.code==='300002'){
				localStorage.setItem('token',reqdata.data.data)
				Add(url,datas)
			}else if(reqdata.data.alertMsg.code==='300003'){
				localStorage.setItem('token',reqdata.data.data)				
				window.sessionStorage.clear();
				alert(reqdata.data.alertMsg.msg)
			}else if(reqdata.data.alertMsg.code==='300001'){ //无权访问
				window.sessionStorage.clear();
				window.location.href='#/Login'
			}else{
				return reqdata;
			}
		})		
		return response;	
	}
	//删
 	const Delete=(url,datas)=>{
 		let tokenYes=tokenFun(datas)
		let response=request(constant.baseUrl+url,tokenYes).then(function(reqdata){			
			if(reqdata.data.success){
				return reqdata;
			}else if(reqdata.data.alertMsg.code==='300002'){
				localStorage.setItem('token',reqdata.data.data)
				Delete(url,datas)
			}else if(reqdata.data.alertMsg.code==='300003'){ //异地登录
				localStorage.setItem('token',reqdata.data.data)
				window.sessionStorage.clear();
				alert(reqdata.data.alertMsg.msg)
			}else if(reqdata.data.alertMsg.code==='300001'){ //无权访问
				window.sessionStorage.clear();
				window.location.href='#/Login'
			}else{
				return reqdata;
			}
		})		
		return response;
	}
	//查
 	const Query=(url,datas)=>{
 		let tokenYes=tokenFun(datas)
		let response=request(constant.baseUrl+url,tokenYes).then(function(reqdata){			
			if(reqdata.data.success){
				return reqdata;
			}else if(reqdata.data.alertMsg.code==='300002'){
				localStorage.setItem('token',reqdata.data.data)
				Query(url,datas)
			}else if(reqdata.data.alertMsg.code==='300003'){
				localStorage.setItem('token',reqdata.data.data)
				window.sessionStorage.clear();
				alert(reqdata.data.alertMsg.msg)
			}else if(reqdata.data.alertMsg.code==='300001'){ //无权访问
				window.sessionStorage.clear();
				window.location.href='#/Login'
			}else{
				return reqdata;
			}
		})		
		return response;		
	}
	//改
 	const Change=(url,datas)=>{
 		let tokenYes=tokenFun(datas)
		let response=request(constant.baseUrl+url,tokenYes).then(function(reqdata){			
			if(reqdata.data.success){
				return reqdata;
			}else if(reqdata.data.alertMsg.code==='300002'){
				localStorage.setItem('token',reqdata.data.data)
				Change(url,datas)
			}else if(reqdata.data.alertMsg.code==='300003'){
				localStorage.setItem('token',reqdata.data.data)
				window.sessionStorage.clear();
				alert(reqdata.data.alertMsg.msg)
			}else if(reqdata.data.alertMsg.code==='300001'){ //无权访问
				window.sessionStorage.clear();
				window.location.href='#/Login'
			}else{
				return reqdata;
			}
		})		
		return response;	
	}
	//图片上传
	var OSS = require('ali-oss');
	var co = require('co');
	const FileImg=(data)=>{
		
		let result
		var client = new OSS({
		  accessKeyId:'LTAIPpVsvsrWzJIL',
		  accessKeySecret: 'FCB4Exd3c7t8Bxe7iYSIwQzBRr72k1',
		  endpoint: data.pathInfo.ossPathName,
		  bucket: 'ajgsimg',
		  cname: true
		});
		function dataURLtoBlob(dataurl) {
		  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
		    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		  while(n--){
		    u8arr[n] = bstr.charCodeAt(n);
		  }
		  return new Blob([u8arr], {type:mime});
		}

		return co(function* () {
			result = yield client.put(data.pathInfo.fileName+"/"+Date.parse(new Date())+Math.floor(Math.random()*10000)+'.'+data.filename.split('.')[1],dataURLtoBlob(data.file));				
  			 return result
			}).catch(function (err) {
		   		return err 
			});

	}
	
	
export { Add , Delete , Query , Change , FileImg}