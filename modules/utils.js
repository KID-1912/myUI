
(function(){
  window.Utils = {
  // 函数防抖
    debounce(func,delay){
      let timer = null;
      return function(...args){
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this,args);
        },delay);
      }
    },
  // 按需加载
    lazyload(options){
      var items = {},
        loadedItemNum = 0,
        totalItemNum = options.totalItemNum,
        $container = options.$container,
        id = options.id;
      $container.on(id +　"-show",$container.load = function(e,index,elem) {
        if (items[index] !== "loaded"){
          $container.trigger(id + "-loadItem",[index,elem,function(){
            items[index] = "loaded";
              loadedItemNum++;
            if(loadedItemNum === totalItemNum){
              $container.trigger(id + "-loaded");
            };
          }]);
        }
      });
      $container.on(id + "-loaded",function(e,index,$ele){
        $container.off(id + '-show', $container.load);
      });
    },
    // 多个图片加载
    loadImgs(imgs,fail){
      imgs.each(function(_,ele){
        var $img = $(ele);
        lazyLoad.loadImg($img.attr("load-src")).then(function(url){
            $img.attr("src",url);
          },fail);
      });
    },
    //单个图片加载
    loadImg(url){
      return new Promise(function(resolve,reject){
        var img = document.createElement('img');
        img.onload = function(){
          resolve(url);
          img = null;
        };
        img.onerror = function(){
          reject();
          img = null;   
        };
        img.setAttribute("src",url);
      })
    }














  };
})()