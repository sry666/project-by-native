
$(document).ready(function() {
	
	var name = getCookieValueByName('userName');
	
	 if( getCookieValueByName('userName') != '' ){
	 	$('.topRight>h3 a').html(name);	
	 }
	if(getCookieValueByName("userName")!=''){
		$("#user").val(getCookieValueByName("userName"));
    	$("#password").val(getCookieValueByName("password"));
	}
	
		
//	存取购物车
	$('.pay').click(function(){
		$.ajax({
			type:'post',
			url:'/api/addcart',
			data:{
				user:name,
				id:$('.product-info-title h1').attr('id'),
				name:$('.product-info-title h1').html(),
				src:$('.small-img').prop('src'),
				price:$('.pre-sale em').html(),
				count:5
				
			},
			success:function(data){
				
			}
		});
	});
	$.ajax({
		type:'get',
			url:'/api/readcart',
			data:null,
			success:function(data){
				for(var i = 0; i < data.length; i++) {
					if(name == data[i].user) {
						var proTpl = $('#car-product-list').html();
						proTpl = proTpl.replace("{{src}}", data[i].src)
							.replace("{{product-name}}", data[i].name)
							.replace("{{id}}", data[i].id)
							.replace("{{per-price}}", data[i].price)
							.replace("{{count}}", data[i].count);
						$('.car-container').append(proTpl);
					}
				}
			}
	});
	
	//cookies存取
	function setCookie(name,value,days,path){
		var now = new Date();
		now.setDate(now.getDate() + days);
		var str = name + "=" + value;
		if(days != undefined){
			str = str + ";expires=" + now.toGMTString();
		}
		if(path != undefined){
			str = str + ";path";
		}
		document.cookie = str;
	}
	
//	根据cookieName获取cookieValue
	function getCookieValueByName(name){
		var value = '';
//		获取到所有的cookie
		var cookies = document.cookie.split('; ');
		for(var i = 0; i < cookies.length;i++){
//			遍历查找响应的value值
			var arr = cookies[i].split('=');
			if(arr[0]==name){
				value = arr[1];
				break;
			}
		}
		return value;
	}
	//删除某个cookie
	//将这个cookie的过期时间设置为已经过去的时间
	function delCookie(name){
		setCookie(name,1,-1);
	}
	
	$('.submit #login').click(function () {
		var user = $('#user').val();
		var pw = $('#password').val();
		if($('#checkbox')[0].checked){
			setCookie("userName",user,15);
			setCookie("password",pw,15);
		}
		$.ajax({
			type: 'post',
			url: '/api/login',
			data: {
				user: user,
				password: pw
			},
			success: function(data) {
				if(data.ret) {
					location.href = "home.html";
				} else {
					$('.error-info').css('visibility', 'visible');
				}
			},
			error: function() {
				$('.error-info').html('用户名不存在').css('visibility', 'visible');
			}
		});
	});
	
	$('#exist').click(function (){
		delCookie('userName');
		delCookie('password');
		$('.topRight>h3 a').html('亲,请登录');

	});
	

	function slideToTarget(tag){
		$('body,html').animate(function(){
			scrollTop:$(tag).offset().top
		},3000);
	}
	
	
	/*-----------------fixed search------------------*/
	$('.fixed-search').hide();
			$('.slide-bar').hide();
	$(window).scroll(function(){
		if($(window).scrollTop() / $(window).height()>1){
			$('.fixed-search').show();
		/*------------楼层悬浮显示-------------*/
			$('.bar-show').show().animate({
				'top':$(window).height()/2
			},1000);
			$('.slide-bar').show();
		}else{
			$('.fixed-search').hide();
			$('.bar-show').hide();
			$('.slide-bar').hide();
		}
	})
	/*------------悬浮右侧导航栏------------*/
	$('.slide-bar-contain').css('height',$(window).height()+'px');
	$('.slide-bar-contain>ul>li').mouseenter(function(){
			$(this).find('span').animate({
				// width:'60px',
				left:'-30px',
				// height:'25px',
				// display:'block'
			},1000);
	});
		
	$('.slide-bar-contain>ul>li').mouseleave(function(){
			$(this).find('span').animate({
				// width:'0',
				left:'35px',
				// height:'0',
				// 'z-index':'0'
			},500);
	});
//		gouwuche
	$('.me').mouseenter(function(){
		$('.me').css('background','#C70034');
		$('.car-count').css({
			'background-image':"url('../../imgs/b-bg.jpg')",
			color:'red'
		});
		
	});
	$('.me').mouseleave(function(){
		$('.me').css('background','#333');
		$('.car-count').css({
			'background-image':"url('../../imgs/a-bg.jpg')",
			color:'#fff'
		});
	});


	/*-----------回到顶部------------*/
	$('.back').click(function(){
		$('body,html').stop().animate({
			scrollTop:$('#header').offset().top
		},3000);
	});
	/*------------侧边二级菜单-------------*/
	
	/*nav-left-bar*/
	$('.nav-list-ul').on('mouseenter', 'li', function() {
		$('.nav-list-ul>li').css('background-color', 'black');
		$(this).css('background-color', '#grey');
		var index = $(this).index();
		$('.nav-contain').hide();
		$('.nav-contain').eq(index).show();
	});
	$('.nav-list-ul').on('mouseleave', 'li', function() {
		var index = $(this).index();
		var that = this;
		$('.nav-contain').eq(index).on('mouseenter', function() {
			$(this).show();
		});

		$('.nav-contain').eq(index).on('mouseleave', function() {
			$('.nav-contain').eq(index).hide();
			$(that).css('background-color', 'black');
		});

	});
	$('.nav-list-ul').on('mouseleave',function() {
		$('.nav-contain').hide();
	});
	
		
	
//	购物车页面二级菜单改动
	$('.er-nav-list').hide();
	$('.nav-title').mouseenter(function(){
		$('.er-nav-list').show();
	});
	$('.er-nav-list').mouseleave(function(){
		$('.er-nav-list').hide();
	});
	
//	商品详情页面二级菜单改动
//	$('.detail-nav-list').hide();
//	$('.nav-title').mouseenter(function(){
//		$('.detail-nav-list').show();
//	});
//	$('.detail-nav-list').mouseleave(function(){
//		$('.detail-nav-list').hide();
//	});
	
	
	/*nav-right-bar*/
	$('.img-ball01').on('mouseenter', function() {
		$(this).animate({
			right: '30px'
		});
	});
	$('.img-ball01').on('mouseleave', function() {
		$(this).animate({
			right: '20px'
		});
	});
	$('.img-ball02').on('mouseenter', function() {
		$(this).animate({
			right: '30px'
		});
	});
	$('.img-ball02').on('mouseleave', function() {
		$(this).animate({
			right: '20px'
		});
	});

	/*switchImgs*/
	
	
	
	var prevIndex = 0;
	var currentIndex = 0;
	
	$('.nav-switchChangeImgs>ul>li>a>img').eq(0).css('opacity', '1');
	//bullet翻页
	var timer = setTimeout(function() {
		slideNext();
	}, 1000);

	$('.bullet').click(function() {
		$('.bullet').removeClass('focus');
		$('.nav-switchChangeImgs>ul>li>a>img').eq($(this).index()).animate({
			opacity: '1'
		}, 1000);
		prevIndex = currentIndex;
		currentIndex = $(this).index();
		slideTo(currentIndex);
		$(this).addClass('focus');
	});

	$('.nav-switchChangeImgs>ul').mouseenter(function() {
		clearTimeout(timer);
	});
	$('.nav-switchChangeImgs>ul').mouseleave(function() {
		var timer = setTimeout(function() {
			slideNext();
		}, 1000);
	});

	function slideNext() {
		prevIndex = currentIndex;
		if(currentIndex == $('.bullet').length - 1) {
			currentIndex = 0;
		} else {
			currentIndex++;
		}
		slideTo(currentIndex);
	}

	function slidePrev() {
		prevIndex = currentIndex;
		if(currentIndex == 0) {
			currentIndex = $('.bullet').length - 1;
		} else {
			currentIndex--;
		}
		slideTo(currentIndex);
	}

	function slideTo(index) {
		$('.focus').removeClass('focus');
		$('.bullet').eq(currentIndex).addClass('focus');
		clearTimeout(timer);
		$('.nav-switchChangeImgs>ul>li>a>img').eq(prevIndex).animate({
			opacity: '0'
		}, 1000);
		$('.nav-switchChangeImgs>ul>li>a>img').eq(index).animate({
			opacity: '1'
		}, 1000);

	}

	//todayRightImg轮播
	var move = $('.todayRight>ul>li').eq(0).width() * 4 + 1; 
	var lisLength = $('.todayRight>ul>li').length;
	var ulWidth = lisLength * $('.todayRight>ul>li').eq(0).width();
	var ulLeft = $('.todayRight>ul').css('left');
	$('.todayRight>ul').css('width',ulWidth);
	$('.next').hide();
	$('.prev').hide();
	
	$('.todayRight').mouseenter(function() {
		$('.prev').mouseenter(function() {
			$(this).css({
				'background-color': 'gray',
				cursor: 'pointer'
			});
			$('.prev').click(function(){
				if(ulLeft === 1001){
					ulLeft = -1001;
				}
				$('.todayRight>ul').animate({
					left:-move
				},1000);
			});
		}).show();
		$('.prev').mouseleave(function() {
			$(this).css({
				'background-color': '#ddd'
			});
		}).show();


		$('.next').show().mouseenter(function() {
			$(this).css({
				'background-color': 'gray',
				cursor: 'pointer'
			});
			
			$('.next').click(function(){
				$('.todayRight>ul').animate({
					left:move-1001
				},1000);
				if(ulLeft === 0){
					ulLeft = 1001;
				}
				
			});
			
		}).show();
		$('.next').show().mouseleave(function() {
			$(this).css({
				'background-color': '#ddd'
			});
		}).show();

	});
	
	
	$('.todayRight').mouseleave(function() {
		$('.next').hide();
		$('.prev').hide();
	});



	//主页模板引擎
	
	$.get('../json/prod.json', function(data) {
		var len = data.length;
		for(var i = 0; i < len; i++) {
			createProd(data[i], i);
		}
	});

	function createProd(data, index) {
		var tpl = $('#prod-tpl').html();
		var strHtml = tpl.replace('{{href}}', data.href).replace('{{href}}', data.href).replace('{{src}}', data.src).replace('{{title}}', data.title).replace('{{price}}', data.price);
		var $prod = $(strHtml);
		$('.box').append($prod);
	}
	//1F
	$('.f1-right').hide();
	$('.f1-right').eq(0).show();
	$('.fl-1').on('mouseenter', 'li', function() {
		$('.f1-right').hide();
		$('.select').removeClass('select');
		$(this).children().addClass('select');
		//将span|隐藏
		$('.separator').eq($(this).index()).hide();
		if($(this).index() >= 1) {
			$('.separator').eq($(this).index() - 1).hide();
		}
		$('.f1-right').eq($(this).index()).show();
	});
	$('.fl-1').on('mouseleave', 'li', function() {
		$('.separator').eq($(this).index() - 1).show();
		$('.separator').eq($(this).index()).show();
	});
	//2F
	$('.f2-right').hide();
	$('.f2-right').eq(0).show();
	$('.fl-2').on('mouseenter', 'li', function() {
		$('.f2-right').hide();
		$('.select').removeClass('select');
		$(this).children().addClass('select');
		//将span|隐藏
		$('.separator').eq($(this).index()).hide();
		if($(this).index() >= 1) {
			$('.separator').eq($(this).index() - 1).hide();
		}
		$('.f2-right').eq($(this).index()).show();
	});
	//3F
	$('.f3-right').hide();
	$('.f3-right').eq(0).show();
	$('.fl-3').on('mouseenter', 'li', function() {
		$('.f3-right').hide();
		$('.select').removeClass('select');
		$(this).children().addClass('select');
		//将span|隐藏
		$('.separator').eq($(this).index()).hide();
		if($(this).index() >= 1) {
			$('.separator').eq($(this).index() - 1).hide();
		}
		$('.f3-right').eq($(this).index()).show();
	});
	//4F
	$('.f4-right').hide();
	$('.f4-right').eq(0).show();
	$('.fl-4').on('mouseenter', 'li', function() {
		$('.f4-right').hide();
		$('.select').removeClass('select');
		$(this).children().addClass('select');
		//将span|隐藏
		$('.separator').eq($(this).index()).hide();
		if($(this).index() >= 1) {
			$('.separator').eq($(this).index() - 1).hide();
		}
		$('.f4-right').eq($(this).index()).show();
	});
	//5F
	$('.f5-right').hide();
	$('.f5-right').eq(0).show();
	$('.fl-5').on('mouseenter', 'li', function() {
		$('.f5-right').hide();
		$('.select').removeClass('select');
		$(this).children().addClass('select');
		//将span|隐藏
		$('.separator').eq($(this).index()).hide();
		if($(this).index() >= 1) {
			$('.separator').eq($(this).index() - 1).hide();
		}
		$('.f5-right').eq($(this).index()).show();
	});
	//楼层导航
	
	$('.navBar-list').on('mouseenter', 'li', function() {
		$(this).children().eq(0).css('display', 'none');
		$(this).children().eq(1).css('display', 'block');
	});
	$('.navBar-list').on('mouseleave', 'li', function() {
		$(this).children().eq(0).css('display', 'block');
		$(this).children().eq(1).css('display', 'none');
	});
	//dayday抢
	//图片晃动
	$('.left-or-right').mouseenter(function() {
		$(this).animate({
			'margin-left': '-10px'
		});
	});
	$('.left-or-right').mouseleave(function() {
		$(this).animate({
			'margin-left': '0'
		});
	});
	
	//图片向上滚动
	var height = $('.hot-menu-list>li').eq(0).height() * $('.hot-menu-list>li').length;
	$('.hot-menu-list').css('height',height);
	var liHeight = $('.hot-menu-list>li').eq(0).height();
	var i = 0;
	function scrollTop(index){
		$('.hot-menu-list').animate({
			top: liHeight * index
		},1000);
	}
	setInterval(function(){
		i--;
		if( i === -7){
			$('.hot-menu-list').css('top',0);
			i=-1;
		}
		scrollTop(i);
	},2000);
	
	
	/*----------------register------------*/
	var result = false;
	var pswComfirm = false;
	var emailReg = false;
	var check = false;
	$('#register').click(function() {
		var user = $('#user').val();
		var psw = $('#password').val();
		if(result && check && pswComfirm && emailReg){
			$.ajax({
				type: "post",
				url: '/api/register',
				data: {
					user: user,
					password: psw
				},
				success: function(data) {
					if(data.ret) {
						location.href = "login.html";
					}
				},
				error: function() {
					console.log('error occured');
				}
			});
		}
	});
	

	$('#user').focus(function() {
		$('#user-error-info').hide();
	});
	
	$('#user').keyup(function() {
		if(checkUserReg()) {
			checkUserExsited();
		}
	});
	$('#password').keyup(function() {
		checkPasswordReg();
	});

	$('#password-confirm').keyup(function() {
		checkPasswordConfirm();
	});
	$('#email').keyup(function() {
		checkEmailReg();
	});
	$('#checkbox').mousedown(function(){
		check = !check;
	});

	function checkUserReg() {
		var regExp = /^[a-zA-Z@]\w{5,11}$/;
		if(regExp.test($('#user').val())) {
			return true;
		}
		$('#user-error-info').html('请输入合法用户名').show();
		return false;
	}
	function checkUserExsited() {
		$.ajax({
			type: "get",
			url: "/api/checkUser",
			data: {
				user: $('#user').val()
			},
			success: function(data) {
				if(!data.ret) {
					$('#user-error-info').html('用户名已经存在').show();
					
				} else {
					$('#user-error-info').html('√').show();
					result = true;
				}
			},
			error: function() {

			}
		})
	}

	function checkPasswordReg() {
		var level = 0;
		var value = $('#password').val();
		if(value.length >= 6) {
			if(null !== value.match(/\d/)) {
				level++;
			}

			if(null !== value.match(/[a-zA-Z]/)) {
				level++;
			}

			if(null !== value.match(/[^a-zA-Z0-9]/)) {
				level++;
			}
			result = true;
		}
		var levelArr = ['请输入6位以上密码', '弱', '中', '强'];

		$('#pw-error-info').html(levelArr[level]);

	}

	function checkPasswordConfirm() {
		var confirmV = $('#password-confirm').val();
		var pwV = $('#password').val();
		if(pwV !== confirmV) {
			$('#pwc-error-info').html('两次密码不一致').show();
			
		}else{
			$('#pwc-error-info').html('两次密码不一致').hide();
			pswComfirm = true;
		}
	}
	function checkEmailReg(){
		var email = $('#email').val();
		var regExp = /^[a-zA-Z1-9]\w{4,16}@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
		if(regExp.test(email)){
			emailReg = true;
			$('#email-error-info').html('请输入有效的邮箱').hide();
		}else{
			$('#email-error-info').html('请输入有效的邮箱').show();
		}
	}
	/*--------------------购物车页面---------------------*/
	

//	增加商品数量
$('.car-container').on('click','.cut',function(){
	$(this).css({
			background:"blue",
			opacity:"0.3",
			padding:'1px'
		});
		var number = $('.num').val();
		if(number > 1){
			number--;
			$(this).next().val(number);
		}
		caculatorTotalPrice(number);
})
	
	
	$('.cut').mouseleave(function(){
		$('.cut').css({
			background:'',
			padding:'0'
		});
	});
	$(window).dblclick(function(ev){
		ev.preventDefault();
	});
	
	$('.car-container').on('click','.add',function(){
		$(this).css({
			background:'blue',
			opacity:"0.3",
			padding:'1px'
		});
		var number = $('.num').val();
			number++;
			$(this).prev().val(number);
		caculatorTotalPrice(number)
	}).on('click', '#num', function() {
			var $that = $(this);
			$(this).parent().parent().parent().remove();
			$.ajax({
				type: "post",
				url: "/api/deletecart",
				async: true,
				data: {
					user: name,
					id: $that.attr('id')
				},
				success: function(data) {
				
					
				},
				error: function(err) {
					console.log('error');
				}
			});
});
	
	$('.add').mouseleave(function(){
		$('.add').css({
			background:'',
			padding:'0'
		});
	});
	
	
	//	计算价格
	function caculatorTotalPrice(num){
		var price = parseInt($('.per-price>b').html());
		var count = $('.num').val();
		var total = count * price;
		$('.total-price').html('￥' + total+'.00');
		$('.total').find('i').html(total+'.00');
		$('.list-total').find('span').html('￥' + total+'.00');
	}

	
});