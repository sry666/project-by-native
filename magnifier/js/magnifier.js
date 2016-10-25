var Magnifier = Magnifier || {
    mask: document.createElement("div"),
    float: document.createElement("div"),
    big: document.createElement("div")
}

Magnifier.init = function (elem, src, times) {
    this.elem = elem;
    this.src = src;
    this.times = times;
    document.body.appendChild(this.float);
    //为每个元素先添加类
    $(this.mask).addClass("mask");
    $(this.big).addClass("big");
    $(this.float).addClass("float");

    //计算并设置Mask的宽高、坐标、zIndex
    $(this.mask).css({
        left: $(this.elem).offset().left,
        top: $(this.elem).offset().top,
        width: $(this.elem).width(),
        height: $(this.elem).height(),
        zIndex: 999
    })

    //计算并设置big的宽高、背景图，背景图的大小
    $(this.big).css({
        top: $(this.elem).offset().top,
        left: $(this.elem).offset().left + $(this.elem).width(),
        width: $(this.float).width() * this.times,
        height: $(this.float).height() * this.times,
        background: "url(" + this.src + ") no-repeat 0 0",
        backgroundSize: $(this.elem).width() * this.times + "px " +
        $(this.elem).height() * this.times + "px"

    })

    //把每个元素添加到body上
    document.body.appendChild(this.big);
    document.body.appendChild(this.mask);

    //绑定事件
    this.bindEvent();

}
Magnifier.bindEvent = function () {
    var that = this;
    //mask的hover事件：显示和消失
    $(this.mask).hover(function () {
        $(that.big).show();
        $(that.float).show();
    }, function () {
        $(that.big).hide();
        $(that.float).hide();
    })
    //mask的mousemove事件：设置float的位置和big的背景位置
    $(this.mask).mousemove(function (event) {
        //计算float的坐标
        var left = event.pageX - $(that.float).width() / 2;
        var top = event.pageY - $(that.float).height() / 2;
        //判断边界值
        if (left <= $(that.mask).offset().left) {
            left = $(that.mask).offset().left;
        }
        if (left >= $(that.mask).offset().left + $(that.mask).width() - $(that.float).width()) {
            left = $(that.mask).offset().left + $(that.mask).width() - $(that.float).width();
        }
        if (top <= $(that.mask).offset().top) {
            top = $(that.mask).offset().top;
        }
        if (top >= $(that.mask).offset().top + $(that.mask).height() - $(that.float).height()) {
            top = $(that.mask).offset().top + $(that.mask).height() - $(that.float).height();
        }
        //设置float的坐标
        $(that.float).css({
            left: left,
            top: top
        })

        //计算big的背景坐标
        var bgLeft = -((left - $(that.mask).offset().left)) * that.times;
        var bgtop = -((top - $(that.mask).offset().top)) * that.times;
        //设置背景坐标
        $(that.big).css(
            "background-position", bgLeft + "px " + bgtop + "px"
        )
    })
}