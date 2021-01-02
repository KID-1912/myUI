(function($){
  
  function _init($ele,options){
    let that = this;
    let {animation,trigger} = options;
    let $tabItem = $ele.find('.tab-item');
    //初始化panel显示隐藏动画
    // 转发tab消息
    this.$panel
    .on('show',() => {
      $ele.trigger('tab',[this.index,this.$panel.eq(this.index)])
    }).showHide({animation})
    // 初始化panel默认项显示
    this.$item.eq(this.index).addClass('active');
    this.$panel.eq(this.index).showHide('show');
    // 绑定事件实现切换tab
    if(trigger == 'mouse') trigger += 'enter';
    $tabItem.on(trigger,function(){
      let index = $(this).index()
      that.tab(index);
    })
  }

  function _tab(index){
    this.$item.eq(this.index).removeClass('active')
    this.$panel.eq(this.index).showHide('hide');
    this.index = index;
    this.$item.eq(index).addClass('active');
    this.$panel.eq(index).showHide('show');
  };
  
  function Tab($ele,options){
    this.index = options.index;
    this.delay = options.delay;
    this.$item = $ele.find('.tab-item');
    this.$panel = $ele.find('.tab-panel');
    _init.call(this,$ele,options);
  }

  Tab.prototype = {
    constructor: 'Tab',
    tab(index){
      if(index === this.index) return;
      if(this.delay){
        this.timer && clearTimeout(this.timer);
        return this.timer = setTimeout(() => {
          _tab.call(this,index);
        },this.delay);
      }
      _tab.call(this,index);
    }
  }



  let defaults = {
    index: 0,
    trigger: 'click',
    animation: 'slient',
    delay: 150
  };


  $.fn.extend({
    tab(options){
      return $(this).each(function(i,ele){
        let $ele = $(ele);
        let model =$ele.data('tab');
        if(typeof options === 'object' || !model){
          model = new Tab($(ele),$.extend(defaults,typeof options === 'object' && options));
          $ele.data('tab',model);
        }
        (model && typeof options === 'number') && model.tab(options);
        
      })
    }
  })



})(jQuery)