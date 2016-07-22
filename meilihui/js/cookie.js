// JavaScript Document
$(function(){
	(function(){
		var regist = $('#regist')
		var regists =$('#regists')
		var tc = $('.dl2')
		var kais = true;
		if(document.cookie){
			var as = document.cookie;
			var arry1 = as.split(';')
			$.each(arry1,function(index,val){
				var aas = val.split('=');
				var temp = JSON.parse(aas[1]);
				 return status = temp.status;
				
			})
			if(status){
				$('.zc').html('欢迎');
				$('.dl').html('退出').attr({"class":"dl2"})
			}else{
				$('.zc').html('注册');
				$('.dl').html('登录').attr({"class":""})
			}
		}
		tc.on('click',function(){
			var value={};
			value.status = false;
			var name = "_cookie";
			var names = name +"="+JSON.stringify(value);
			document.cookie = names
			window.location.href="../loginin.html"
		})
		
		
		regists.on('click',function(){
			var user = $('#userAccount').val();
			var password = $('#passWordtext').val();
			var _cookie =document.cookie;
			var arry = _cookie.split(';')
			$.each(arry,function(inx,val){
				var temp = val.split('=');
				var temp1 = JSON.parse(temp[1]);
				var users = temp1.users;
				var pass = temp1.pass;
				if(users!=user || user ==0 || password ==0 ){
					alert("该用户不存在")
				}else{
					var value={};
					value.status = true;
					var name = "_cookie";
					var names = name+"=" + JSON.stringify(value);
					document.cookie = names
					alert("登录成功")
					window.location.href="../index.html"
				}
			})
		
		})
		regist.on('click',function(){
			var user = $('#userAccount').val();
			var password = $('#passWordtext').val();
			if(document.cookie){
				var _cookies = document.cookie;
				var arry = _cookies.split(';');
				var regist = $('#regist')
				$.each(arry,function(index,val){
					var temp = val.split('=')
					var aa = JSON.parse(temp[1])
					if(aa.users == user){
						alert("帐号已经被注册")
						kais = false;
					}else{
						kais = true;
					}
					return kais
				})
			}
			if(kais){
				var value = {};
				value.users = user;
				value.pass = password;
				var num =parseInt(Math.random()*9)
				var num1 =parseInt(Math.random()*9)
				var name = "cookie"+num+num1
				var _cookie = name +"="+ JSON.stringify(value)
				document.cookie = _cookie;	
			}
		})
	})()
})
