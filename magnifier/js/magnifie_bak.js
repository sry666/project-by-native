/////**
//// * Created by Administrator on 2016/8/11.
//// */
//
//function Magnifier(elem,src,times){
//
//    this.elem=elem;
//    this.src=src;
//    this.times=times;
//
//    this.big=document.createElement("div");
//    this.float=document.createElement("div");
//    this.mask=document.createElement("div");
//
//    //初始化
//    this.init();
//    //绑定事件
//    this.bindEvent();
//}
//
//Magnifier.prototype.init=function(){
//    document.body.appendChild(this.float);
//    //设置每个元素的样式：添加类
//    $(this.float).addClass("float");
//    $(this.big).addClass("big");
//    $(this.mask).addClass("mask");
//    //设置膜的宽高坐标 zIndex
//    $(this.mask).css({
//        left:$(this.elem).offset().left,
//        top:$(this.elem).offset().top,
//        width:$(this.elem).width(),
//        height:$(this.elem).height(),
//        zIndex:999
//    })
//    //设置big的宽高坐标，背景图片，背景的大小
//    $(this.big).css({
//        left:$(this.elem).offset().left+$(this.elem).width(),
//        top:$(this.elem).offset().top,
//        width:$(this.float).width()*this.times,
//        height:$(this.float).height()*this.times,
//        background:"url("+this.src+") no-repeat 0 0",
//        backgroundSize:$(this.elem).width()*this.times+"px "+$(this.elem).height()*this.times+"px"
//    })
//    //添加到body上
//
//    document.body.appendChild(this.mask);
//    document.body.appendChild(this.big);
//}
//
//Magnifier.prototype.bindEvent=function(){
//    var that=this;
//    //绑定mask的hover事件
//    $(this.mask).hover(function(){
//        $(that.float).show();
//        $(that.big).show();
//    },function(){
//        $(that.big).hide();
//        $(that.float).hide();
//    })
//    //绑定mask的mousemove事件
//    $(this.mask).mousemove(function(event){
//        //首先计算float的出现的坐标
//        var left=event.clientX-$(that.float).width()/2;
//        var top=event.clientY-$(that.float).height()/2;
//        //判断边界值
//        if(left<=$(that.mask).offset().left)
//        {
//            left=$(that.mask).offset().left;
//        }
//        if(left>=$(that.mask).offset().left+$(that.mask).width()-$(that.float).width())
//        {
//            left=$(that.mask).offset().left+$(that.mask).width()-$(that.float).width();
//        }
//        if(top<=$(that.mask).offset().top)
//        {
//            top=$(that.mask).offset().top;
//        }
//        if(top>=$(that.mask).offset().top+$(that.mask).height()-$(that.float).height())
//        {
//            top=$(that.mask).offset().top+$(that.mask).height()-$(that.float).height();
//        }
//        //设置float的坐标
//        $(that.float).css({
//            left:left,
//            top:top
//        })
//
//        //计算big的背景坐标
//        var bgleft=-($(that.float).offset().left-$(that.mask).offset().left)*that.times;
//        var bgtop=-($(that.float).offset().top-$(that.mask).offset().top)*that.times;
//        //设置big的背景坐标
//        $(that.big).css(
//            "background-position",bgleft+"px "+bgtop+"px"
//        )
//    })
//}

var Magnifier={

    big:document.createElement("div"),
    float:document.createElement("div"),
    mask:document.createElement("div")

}

Magnifier.init=function(elem,src,times){
    this.elem=elem;
    this.src=src;
    this.times=times;

    document.body.appendChild(this.float);
    //设置每个元素的样式：添加类
    $(this.float).addClass("float");
    $(this.big).addClass("big");
    $(this.mask).addClass("mask");
    //设置膜的宽高坐标 zIndex
    $(this.mask).css({
        left:$(this.elem).offset().left,
        top:$(this.elem).offset().top,
        width:$(this.elem).width(),
        height:$(this.elem).height(),
        zIndex:999
    })
    //设置big的宽高坐标，背景图片，背景的大小
    $(this.big).css({
        left:$(this.elem).offset().left+$(this.elem).width(),
        top:$(this.elem).offset().top,
        width:$(this.float).width()*this.times,
        height:$(this.float).height()*this.times,
        background:"url("+this.src+") no-repeat 0 0",
        backgroundSize:$(this.elem).width()*this.times+"px "+$(this.elem).height()*this.times+"px"
    })
    //添加到body上

    document.body.appendChild(this.mask);
    document.body.appendChild(this.big);
    this.bindEvent();
}

Magnifier.bindEvent=function(){
    var that=this;
    //绑定mask的hover事件
    $(this.mask).hover(function(){
        $(that.float).show();
        $(that.big).show();
    },function(){
        $(that.big).hide();
        $(that.float).hide();
    })
    //绑定mask的mousemove事件
    $(this.mask).mousemove(function(event){
        //首先计算float的出现的坐标
        var left=event.clientX-$(that.float).width()/2;
        var top=event.clientY-$(that.float).height()/2;
        //判断边界值
        if(left<=$(that.mask).offset().left)
        {
            left=$(that.mask).offset().left;
        }
        if(left>=$(that.mask).offset().left+$(that.mask).width()-$(that.float).width())
        {
            left=$(that.mask).offset().left+$(that.mask).width()-$(that.float).width();
        }
        if(top<=$(that.mask).offset().top)
        {
            top=$(that.mask).offset().top;
        }
        if(top>=$(that.mask).offset().top+$(that.mask).height()-$(that.float).height())
        {
            top=$(that.mask).offset().top+$(that.mask).height()-$(that.float).height();
        }
        //设置float的坐标
        $(that.float).css({
            left:left,
            top:top
        })

        //计算big的背景坐标
        var bgleft=-($(that.float).offset().left-$(that.mask).offset().left)*that.times;
        var bgtop=-($(that.float).offset().top-$(that.mask).offset().top)*that.times;
        //设置big的背景坐标
        $(that.big).css(
            "background-position",bgleft+"px "+bgtop+"px"
        )
    })
}


//初始化
//设置样式，添加类，
//设置mask的宽高，坐标，zIndex
//设置big的宽高，坐标，背景，背景大小
//添加到body上


//绑定事件
//mask的hover事件：消失和隐藏

//mask的mousemove事件：
//计算float的坐标
//判断边界值
//设置float的坐标

//计算背景图片的坐标
//设置背景图片的坐标

