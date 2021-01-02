(function($) {
  // 私有方法
  function _init($ele,options){
    let toggle = $ele.find('.drop-toggle');
    let layer = this.layer;
    let {trigger,animation,direction} = options;

    // 初始化layer下拉动画
    layer.showHide({animation,direction});
    // 转发事件
    layer.on('show',function(e){
      $ele.trigger('dropdown');
    })

    // toggle绑定事件
    if(trigger === 'click')
      return toggle.on('click',() => {
        if(layer.data('status') === 'hiden') return this.show();
        this.hide();
      });
    $ele.hover((e) => this.show(), (e) => this.hide());
  };

  // 构造函数
  function Dropdown($ele,options){
    this.layer = $ele.find('.drop-layer');
    this.delay = options.delay;
    _init.call(this,$ele,options);
  };

  Dropdown.prototype = {
    constructor: 'Dropdown',
    show(){
      if(this.delay){
        if(this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.layer.showHide('show');
        },this.delay);
      }else{
        this.layer.showHide('show');
      }
    },
    hide(){
      this.timer && clearTimeout(this.timer);
      this.layer.showHide('hide');
    }
  }

  // 创建实例默认参数
  let defaults = {
    trigger: 'hover',
    animation: 'fade',
    delay: 150
  }

  $.fn.extend({

    drop(options){
      return $(this).each((i,ele) => {
        let $ele = $(ele);
        let model = $ele.data('drop');
        if(!model){
          options = $.extend(defaults,typeof options === 'object' && options);
          $ele.data('drop',model = new Dropdown($ele,options));
        }
        model[options] && model[options]();
      });
    }

  })


})(jQuery)


