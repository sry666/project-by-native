/*-----------------slide Down Or Up-----------------*/
$(function(){

	$('.look-contain').on('mouseenter','img',function(){
		$(this).css({
			'box-shadow':  '0px 0px 10px 0px #888888'
		});
	});
	$('.look-contain').on('mouseleave','img',function(){
		$(this).css({
			'box-shadow':  'none'
		});
	});
	
	$('.paiHang').on('mouseenter','img',function(){
		$(this).css({
			'box-shadow':  '0px 0px 10px 0px #888888'
		});
	});
	$('.paiHang').on('mouseleave','img',function(){
		$(this).css({
			 'box-shadow':  'none'
		});
	});
//	内容简介
	$('.audio-p').hide();
	$('.audio-info-title').click(function(){
//		slideToggle
		$('.audio-p').slideToggle('slow');
		$('.height-change').slideToggle('slow');
	});
//	选择搭配
	$('.ok').hide();
	$('.ok1').show();
	$('.daPei>dd>ul>li').click(function(){
		var index = $(this).index();
		$('.ok').hide();
		$('.ok').eq(index).show();
	});
	
/*--------------------------	magnifier -----------------*/
	$('.mask').hide();
	$('.magnifier-hideImg').hide();
	$('.magnifier-main').hover(function(){
		$('.mask').show();
		$('.magnifier-hideImg').show();	
	});
	
	$('.magnifier-main').mouseleave(function(){
		$('.mask').hide();
		$('.magnifier-hideImg').hide();
	});
	
	$('.magnifier-main').mousemove(function(event){
//		pageX,pageY相对于文档,滑动scroll
//clientX,clientY相对于当前页面
		var left =event.pageX - $('.mask').width() / 2 -$('.magnifier-main').offset().left;
		var top = event.pageY - $('.mask').height() / 2 - $('.magnifier-main').offset().top;
		if(top <= 0){
			top = 0;
		}
		if(top >= $('.magnifier-main').height()-$('.mask').height()){
			top = $('.magnifier-main').height()-$('.mask').height();
		}
		if(left <= 0){
			left = 0;
		}
		if(left >= $('.magnifier-main').width()-$('.mask').width()){
			left = $('.magnifier-main').width()-$('.mask').width();
		}
//		放大倍数为2
		var moveWidth = (-2) * left + "px";
		var moveTop = (-2) * top + "px";
//		top = top + "px";
//		left = left + "px";
		$('.mask').css({
			top:top,
			left:left,
			cursor:'pointer'
		});
		$('.magnifier-hideImg').css({
			"background-position":moveWidth + " " + moveTop
		})
	});
	
	$('.product-small-imgs>ul>li').mouseenter(function(){
		$(this).css({
			border:'1px solid #C70034'
		});
	});
	$('.product-small-imgs>ul>li').mouseleave(function(){
		$(this).css({
			border:'none'
		});
	});
	$('.magnifier-hideImg').css('background',"url('../../imgs/product-detail-hideImg0.jpg')");
	$('.product-small-imgs>ul>li').click(function(){
		$('.magnifier-main>img').attr('src',"../imgs/product-detail-bigImg"+ $(this).index() +".jpg");
		var index = $(this).index();
		
		if(index === 0){
			$('.magnifier-hideImg').css('background',"url('../../imgs/product-detail-hideImg0.jpg')");
		}
		if(index === 1){
			$('.magnifier-hideImg').css('background',"url('../../imgs/product-detail-hideImg1.jpg')");
		}
		if(index === 2){
			$('.magnifier-hideImg').css('background',"url('../../imgs/product-detail-hideImg2.jpg')");
		}
		if(index === 3){
			$('.magnifier-hideImg').css('background',"url('../../imgs/product-detail-hideImg3.jpg')");
		}
		
	});
	
	
	/*-------------------------------nav-tab---------------------*/
	
	$('.product-nav-tab>ul>li').eq(0).css({
		'background':'#D70C65',
	});
	$('.xuanfu-nav-tab>ul>li').eq(0).css({
		'background':'#D70C65',
	});
	$('.xuanfu-nav-tab>ul>li').eq(0).find('a').css({
		'color':'#fff'
	});
	$('.product-nav-tab>ul>li').eq(0).find('a').css({
		'color':'#fff'
	});
	
	$('.xuanfu-nav-tab').hide();
	$(window).scroll(function(){
		if($(window).scrollTop() > $('.product-nav-tab').offset().top){
			$('.xuanfu-nav-tab').show();
		}else{
			$('.xuanfu-nav-tab').hide();
		}
	});
});

