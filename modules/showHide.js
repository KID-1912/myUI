(function($){
  //初始化showHide功能时，
  //初始化元素的初始状态，即显示/隐藏状态
  function init($ele,callback){
    let status = $ele.is(":hidden") ? 'hiden' : 'shown';
    $ele.data('status',status);  //移除transiton属性对js动画的影响
    callback && callback();
  };

  // 公共函数，复用函数减少重复代码
  function show($ele,callback){
    if($ele.data('status') === 'shown' || $ele.data('status') === 'show') return;
    $ele.data('status','show').trigger('show');
    callback();
  }
  function hide($ele,callback){
    if($ele.data('status') === 'hiden' || $ele.data('status') === 'hide') return;
    $ele.data('status','hide').trigger('hide');
    callback();
  }

  // 自定义animate的显示隐藏公共代码
  function animateInit($ele){//hideState为元素隐藏状态的样式对象
    init($ele,() => {
      let style = {};    // 用于保存元素原样式，即show状态
      for(let k in this.hideState){  
        style[k] = $ele.css(k);
      };
      $ele.data('style',style); // 保存元素原样式
      if($ele.data('status') === 'hiden') // 元素display初始值为none,则初始化为隐藏状态
        return $ele.css(this.hideState);
    })
  }
  function animateShow($ele){
    show($ele,() => $ele.stop().show().animate($ele.data('style'),() => $ele.data('status','shown').trigger('shown')));
  }
  function animateHide($ele){
    hide($ele,() => $ele.stop().animate(this.hideState,() => $ele.hide().data('status','hiden').trigger('hiden')));
  }

  // 不同动画类型处理
  let showHide = {
    slient: {
      init,
      show($ele){
        show($ele,() => {
          $ele.show();
          setTimeout(() => {$ele.data('status','shown').trigger('shown')},50);
        });
      },
      hide($ele){
        hide($ele,() => {
          $ele.hide();
          setTimeout(() => {$ele.data('status','hiden').trigger('hiden')},50);
        });
      }
    },

    fade: {
      init,
      show($ele){
        show($ele,() => {
          $ele.stop().fadeIn();
          setTimeout(() => {$ele.data('status','shown').trigger('shown')},50);
        });
      },
      hide($ele){
        hide($ele,() => {
          $ele.stop().fadeOut();
          setTimeout(() => {$ele.data('status','hiden').trigger('hiden')},50);
        });
      }
    },

    slide: {
      y: {
        init,
        show($ele){
          show($ele,() => {
            $ele.stop().slideDown();
            setTimeout(() => {$ele.data('status','shown').trigger('shown')},50);
          });
        },
        hide($ele){
          hide($ele,() => {
            $ele.stop().slideUp();
            setTimeout(() => {$ele.data('status','hiden').trigger('hiden')},50);
          });
        }
      },
      x: {
        hideState: {
          'width': 0,
          'padding-left': 0,
          'padding-right': 0,
          'margin-left': 0,
          'margin-right': 0,
        },
        init: animateInit,
        show: animateShow,
        hide: animateHide
      }
    },

    fadeSlide: {
      y: {
        hideState: {
          'height': 0,
          'padding-top': 0,
          'padding-bottom': 0,
          'margin-top': 0,
          'margin-bottom': 0,
          'opacity': 0
        },
        init: animateInit,
        show: animateShow,
        hide: animateHide
      },
      x: {
        hideState: {
          'width': 0,
          'padding-left': 0,
          'padding-right': 0,
          'margin-left': 0,
          'margin-right': 0,
          'opacity': 0
        },
        init: animateInit,
        show: animateShow,
        hide: animateHide
      }
    },
  }


  $.fn.extend({ // 插件添加至jQuery.prototype

    showHide(options){
      $(this).each(function(i,ele){
        let $ele = $(ele);
        let model = $ele.data('showHide');// 保存动画模式对应的单例对象
        // 包含初始化参数的对象 或 元素的showHide方法未初始化 则为jquery元素初始化showHide方法
        if(!model){
          options = typeof options === 'object' ? options : {animation: 'silent'};

          // animate值为slide时需判断direction参数
          if(options.animation === 'slide' || options.animation === 'fadeSlide'){
            model = options.direction === 'x' ? showHide[options.animation].x : showHide[options.animation].y;
          }else{
            model = showHide[options.animation];
          }

          $ele.data('showHide',model).data('showHide').init($ele)
        }
        // 显示/隐藏
        model[options] && model[options]($ele);
      })
      return $(this);
    }


  })
})($)