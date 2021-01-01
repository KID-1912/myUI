(function($){
  //初始化 私有函数
  function _init($ele,options){
    let {slideX,$container} = this;
    // 前后克隆
    $ele.find('.carousel-item:last').clone().prependTo($container);
    $ele.find('.carousel-item:eq(1)').clone().appendTo($container);
    // 初始化.container，.carousel-item宽度
    this.len = $container.children().size();
    $container.width(this.len+'00%');
    $ele.find('.carousel-item').width((100/this.len)+'%');
    // 初始化轮播位置
    $container.css({left: -1*(this.index+=1)*slideX});
    // 图片加载完成初始化.carousel高度,显示轮播图
    let firstImage = this.$slideItem.first().children('.carousel-pic');
    firstImage.on('load',function(){
      setTimeout(function(){
        $ele.height(firstImage.height())
      },1000)
    });
    $ele.height(firstImage.height());
    // 初始化自动轮播
    if(options.inter) this.autoSlide();
    
    // 监听轮播
    $container.on('move',() => {  // 转发slideIn
      let index = this.index;
      if(index === 0 || index === this.len-1){
        index = index === 0 ? this.len - 1 : 1;
      }
      $ele.trigger('slideIn',[index-1,this.$slideItem[index-1]]);
    })
    // 监听slide结束，判断是否调整位置
    .on('moved',() => {
      if(this.index === 0 || this.index === this.len-1){
        this.index = this.index === 0 ? this.len - 2 : 1;
        $container.css({left: -1*this.index*slideX});
        this.$indicator.removeClass('active').eq(this.index-1).addClass('active');
      };
    })
    // 初始化indicator
    this.$indicator.removeClass('active').eq(this.index-1).addClass('active');
    this.$indicator.on('click',(e) => { //控制事件
      let index = $(e.currentTarget).index();
      this.slide(index+=1);
      if(this.inter){
        clearTimeout(this.auto);
        this.autoSlide();
      }
    })
  }

  function Carousel($ele,options){
    this.index = options.index;
    this.inter = options.inter;
    this.$container = $ele.children('.container');
    this.$slideItem = $ele.find('.carousel-item');
    this.$indicator = $ele.find('.indicator').children();
    this.slideX = $ele.width();   //滑动距离
    _init.call(this,$ele,options);
  }

  Carousel.prototype = {
    constructor: 'Carousel',
    // 自动轮播
    autoSlide(){
      this.auto = setInterval(() => {
        this.next();
      },this.inter)
    },
    slide(index){
      if(index === this.index) return;
      this.index = index;
      this.$container.move(-1*index*this.slideX);
      this.$indicator.removeClass('active').eq(this.index-1).addClass('active');
    },
    // 上一项
    prev(){
      this.slide(this.index-1);
    },
    // 下一项
    next(){
      this.slide(this.index+1);
    }
  };

  let defaults = {
    index: 0,
    inter: 4000,
    auto: true
  }

  $.fn.extend({
    carousel(options){
      return $(this).each(function(i,ele){
        let $ele = $(ele);
        let model = $ele.data('carousel');
        if(!model){
          options = $.extend(defaults,typeof options === 'object' && options);
          $ele.data('carousel',model = new Carousel($ele,options));
        }
        model[options] && model[options]();
      })
    }
  })

})(jQuery)