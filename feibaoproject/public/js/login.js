/*----------------login------------*/
//$('.topRight>h3 a').html('亲,请登录');
//	$('#login').click(function loginRight() {
//		var user = $('#user').val();
//		var pw = $('#password').val();
//		if($('#checkbox')[0].checked){
//			setCookie("userName",user,15);
//			setCookie("password",pw,15);
//		}
//		if( getCookieValueByName('userName') != null ){
//			$('.topRight>h3 a').html('登陆成功!');	
//		}
//		
//		$.ajax({
//			type: 'post',
//			url: '/api/login',
//			data: {
//				user: user,
//				password: pw
//			},
//			success: function(data) {
//				if(data.ret) {
//					location.href = "home.html";
//				} else {
//					$('.error-info').css('visibility', 'visible');
//				}
//			},
//			error: function() {
//				$('.error-info').html('用户名不存在').css('visibility', 'visible');
//			}
//		});
//		
//		
//	});
//	$('#exist').click(function del(){
//		delCookie('userName');
//		delCookie('password');
//		if( getCookieValueByName('userName') != null ){
//			$('.topRight>h3 a').html('亲,请登录');	
//		}
//		location.href = "login.html";
//	});
//	//cookies存取
//	function setCookie(name,value,days,path){
//		var now = new Date();
//		now.setDate(now.getDate() + days);
//		var str = name + "=" + value;
//		if(days != undefined){
//			str = str + ";expires=" + now.toGMTString();
//		}
//		if(path != undefined){
//			str = str + ";path";
//		}
//		document.cookie = str;
//	}
////	根据cookieName获取cookieValue
//	function getCookieValueByName(name){
//		var value = '';
////		获取到所有的cookie
//		var cookies = document.cookie.split('; ');
//		for(var i = 0; i < cookies.length;i++){
////			遍历查找响应的value值
//			var arr = cookies[i].split('=');
//			if(arr[0]==name){
//				value = arr[1];
//				break;
//			}
//		}
//		return value;
//	}
//	//删除某个cookie
//	//将这个cookie的过期时间设置为已经过去的时间
//	function delCookie(name){
//		setCookie(name,1,-1);
//	}

//	if( getCookieValueByName('userName') != null ){
//		$('.topRight>h3 a').html('登陆成功');	
//	}
//	if( getCookieValueByName('userName') == null ){
//		$('.topRight>h3 a').html('亲,请登录');	
//	}
	$('.user-message,.pw-message').focus(function() {
		$('.error-info').css('visibility', 'hidden');
	});
	
	/*----------------login------------*/