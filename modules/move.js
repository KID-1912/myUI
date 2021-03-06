(function($){

  $.fn.extend({
    move(x,y){
      return $(this).each(function(i,ele){
        let $ele = $(ele);
        let p = $ele.position();
        x = typeof x === 'number' ? x : p.left;
        y = typeof y === 'number' ? y : p.top;
        if(x === p.left && y === p.top) return $ele;

        return $ele.trigger('move')
        .animate({
          left: x,
          top: y,
        },function(){
          $(this).trigger('moved')
        });
      })
    },
    moveX(x){
      return this.move(x);
    },
    moveY(y){
      return this.move(null,y);
    }
  })

})(jQuery)