"use strict";

(function ($) {
  $.fn.extend({
    move: function move(x, y) {
      return $(this).each(function (i, ele) {
        var $ele = $(ele);
        var p = $ele.position();
        x = typeof x === 'number' ? x : p.left;
        y = typeof y === 'number' ? y : p.top;
        if (x === p.left && y === p.top) return $ele;
        return $ele.trigger('move').animate({
          left: x,
          top: y
        }, function () {
          $(this).trigger('moved');
        });
      });
    },
    moveX: function moveX(x) {
      return this.move(x);
    },
    moveY: function moveY(y) {
      return this.move(null, y);
    }
  });
})(jQuery);;"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function ($) {
  //初始化showHide功能时，
  //初始化元素的初始状态，即显示/隐藏状态
  function init($ele, callback) {
    var status = $ele.is(":hidden") ? 'hiden' : 'shown';
    $ele.data('status', status); //移除transiton属性对js动画的影响

    callback && callback();
  }

  ; // 公共函数，复用函数减少重复代码

  function _show($ele, callback) {
    if ($ele.data('status') === 'shown' || $ele.data('status') === 'show') return;
    $ele.data('status', 'show').trigger('show');
    callback();
  }

  function _hide($ele, callback) {
    if ($ele.data('status') === 'hiden' || $ele.data('status') === 'hide') return;
    $ele.data('status', 'hide').trigger('hide');
    callback();
  } // 自定义animate的显示隐藏公共代码


  function animateInit($ele) {
    var _this = this;

    //hideState为元素隐藏状态的样式对象
    init($ele, function () {
      var style = {}; // 用于保存元素原样式，即show状态

      for (var k in _this.hideState) {
        style[k] = $ele.css(k);
      }

      ;
      $ele.data('style', style); // 保存元素原样式

      if ($ele.data('status') === 'hiden') // 元素display初始值为none,则初始化为隐藏状态
        return $ele.css(_this.hideState);
    });
  }

  function animateShow($ele) {
    _show($ele, function () {
      return $ele.stop().show().animate($ele.data('style'), function () {
        return $ele.data('status', 'shown').trigger('shown');
      });
    });
  }

  function animateHide($ele) {
    var _this2 = this;

    _hide($ele, function () {
      return $ele.stop().animate(_this2.hideState, function () {
        return $ele.hide().data('status', 'hiden').trigger('hiden');
      });
    });
  } // 不同动画类型处理


  var _showHide = {
    slient: {
      init: init,
      show: function show($ele) {
        _show($ele, function () {
          $ele.show();
          setTimeout(function () {
            $ele.data('status', 'shown').trigger('shown');
          }, 50);
        });
      },
      hide: function hide($ele) {
        _hide($ele, function () {
          $ele.hide();
          setTimeout(function () {
            $ele.data('status', 'hiden').trigger('hiden');
          }, 50);
        });
      }
    },
    fade: {
      init: init,
      show: function show($ele) {
        _show($ele, function () {
          $ele.stop().fadeIn();
          setTimeout(function () {
            $ele.data('status', 'shown').trigger('shown');
          }, 50);
        });
      },
      hide: function hide($ele) {
        _hide($ele, function () {
          $ele.stop().fadeOut();
          setTimeout(function () {
            $ele.data('status', 'hiden').trigger('hiden');
          }, 50);
        });
      }
    },
    slide: {
      y: {
        init: init,
        show: function show($ele) {
          _show($ele, function () {
            $ele.stop().slideDown();
            setTimeout(function () {
              $ele.data('status', 'shown').trigger('shown');
            }, 50);
          });
        },
        hide: function hide($ele) {
          _hide($ele, function () {
            $ele.stop().slideUp();
            setTimeout(function () {
              $ele.data('status', 'hiden').trigger('hiden');
            }, 50);
          });
        }
      },
      x: {
        hideState: {
          'width': 0,
          'padding-left': 0,
          'padding-right': 0,
          'margin-left': 0,
          'margin-right': 0
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
    }
  };
  $.fn.extend({
    // 插件添加至jQuery.prototype
    showHide: function showHide(options) {
      $(this).each(function (i, ele) {
        var $ele = $(ele);
        var model = $ele.data('showHide'); // 保存动画模式对应的单例对象
        // 包含初始化参数的对象 或 元素的showHide方法未初始化 则为jquery元素初始化showHide方法

        if (!model) {
          options = _typeof(options) === 'object' ? options : {
            animation: 'silent'
          }; // animate值为slide时需判断direction参数

          if (options.animation === 'slide' || options.animation === 'fadeSlide') {
            model = options.direction === 'x' ? _showHide[options.animation].x : _showHide[options.animation].y;
          } else {
            model = _showHide[options.animation];
          }

          $ele.data('showHide', model).data('showHide').init($ele);
        } // 显示/隐藏


        model[options] && model[options]($ele);
      });
      return $(this);
    }
  });
})($);;"use strict";

(function () {
  window.Utils = {
    // 函数防抖
    debounce: function debounce(func, delay) {
      var timer = null;
      return function () {
        var _this = this;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
          func.apply(_this, args);
        }, delay);
      };
    },
    // 按需加载
    lazyload: function lazyload(options) {
      var items = {},
          loadedItemNum = 0,
          totalItemNum = options.totalItemNum,
          $container = options.$container,
          id = options.id;
      $container.on(id + "-show", $container.load = function (e, index, elem) {
        if (items[index] !== "loaded") {
          $container.trigger(id + "-loadItem", [index, elem, function () {
            items[index] = "loaded";
            loadedItemNum++;

            if (loadedItemNum === totalItemNum) {
              $container.trigger(id + "-loaded");
            }

            ;
          }]);
        }
      });
      $container.on(id + "-loaded", function (e, index, $ele) {
        $container.off(id + '-show', $container.load);
      });
    },
    // 多个图片加载
    loadImgs: function loadImgs(imgs, fail) {
      imgs.each(function (_, ele) {
        var $img = $(ele);
        lazyLoad.loadImg($img.attr("load-src")).then(function (url) {
          $img.attr("src", url);
        }, fail);
      });
    },
    //单个图片加载
    loadImg: function loadImg(url) {
      return new Promise(function (resolve, reject) {
        var img = document.createElement('img');

        img.onload = function () {
          resolve(url);
          img = null;
        };

        img.onerror = function () {
          reject();
          img = null;
        };

        img.setAttribute("src", url);
      });
    }
  };
})();;"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function ($) {
  //初始化 私有函数
  function _init($ele, options) {
    var _this = this;

    var slideX = this.slideX,
        $container = this.$container; // 前后克隆

    $ele.find('.carousel-item:last').clone().prependTo($container);
    $ele.find('.carousel-item:eq(1)').clone().appendTo($container); // 初始化.container，.carousel-item宽度

    this.len = $container.children().length;
    $container.width(this.len + '00%');
    $ele.find('.carousel-item').width(100 / this.len + '%'); // 初始化轮播位置

    $container.css({
      left: -1 * (this.index += 1) * slideX
    }); // 图片加载完成初始化.carousel高度,显示轮播图

    var firstImage = this.$slideItem.first().children('.carousel-pic');
    firstImage.on('load', function () {
      setTimeout(function () {
        $ele.height(firstImage.height());
      }, 1000);
    });
    $ele.height(firstImage.height()); // 初始化自动轮播

    if (options.inter) this.autoSlide(); // 监听轮播

    $container.on('move', function () {
      // 转发slideIn
      var index = _this.index;

      if (index === 0 || index === _this.len - 1) {
        index = index === 0 ? _this.len - 1 : 1;
      }

      $ele.trigger('slideIn', [index - 1, _this.$slideItem[index - 1]]);
    }) // 监听slide结束，判断是否调整位置
    .on('moved', function () {
      if (_this.index === 0 || _this.index === _this.len - 1) {
        _this.index = _this.index === 0 ? _this.len - 2 : 1;
        $container.css({
          left: -1 * _this.index * slideX
        });

        _this.$indicator.removeClass('active').eq(_this.index - 1).addClass('active');
      }

      ;
    }); // 初始化indicator

    this.$indicator.removeClass('active').eq(this.index - 1).addClass('active');
    this.$indicator.on('click', function (e) {
      //控制事件
      var index = $(e.currentTarget).index();

      _this.slide(index += 1);

      if (_this.inter) {
        clearTimeout(_this.auto);

        _this.autoSlide();
      }
    });
  }

  function Carousel($ele, options) {
    this.index = options.index;
    this.inter = options.inter;
    this.$container = $ele.children('.container');
    this.$slideItem = $ele.find('.carousel-item');
    this.$indicator = $ele.find('.indicator').children();
    this.slideX = $ele.width(); //滑动距离

    _init.call(this, $ele, options);
  }

  Carousel.prototype = {
    constructor: 'Carousel',
    // 自动轮播
    autoSlide: function autoSlide() {
      var _this2 = this;

      this.auto = setInterval(function () {
        _this2.next();
      }, this.inter);
    },
    slide: function slide(index) {
      if (index === this.index) return;
      this.index = index;
      this.$container.move(-1 * index * this.slideX);
      this.$indicator.removeClass('active').eq(this.index - 1).addClass('active');
    },
    // 上一项
    prev: function prev() {
      this.slide(this.index - 1);
    },
    // 下一项
    next: function next() {
      this.slide(this.index + 1);
    }
  };
  var defaults = {
    index: 0,
    inter: 4000,
    auto: true
  };
  $.fn.extend({
    carousel: function carousel(options) {
      return $(this).each(function (i, ele) {
        var $ele = $(ele);
        var model = $ele.data('carousel');

        if (!model) {
          options = $.extend(defaults, _typeof(options) === 'object' && options);
          $ele.data('carousel', model = new Carousel($ele, options));
        }

        model[options] && model[options]();
      });
    },
    slide: function slide(index) {
      return $(this).each(function (i, ele) {
        $(ele).data('carousel').slide(index);
      });
    }
  });
})(jQuery);;"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function ($) {
  function _init($ele, options) {
    var _this = this;

    var that = this;
    var animation = options.animation,
        trigger = options.trigger;
    var $tabItem = $ele.find('.tab-item'); //初始化panel显示隐藏动画
    // 转发tab消息

    this.$panel.on('show', function () {
      $ele.trigger('tab', [_this.index, _this.$panel.eq(_this.index)]);
    }).showHide({
      animation: animation
    }); // 初始化panel默认项显示

    this.$item.eq(this.index).addClass('active');
    this.$panel.eq(this.index).showHide('show'); // 绑定事件实现切换tab

    if (trigger == 'mouse') trigger += 'enter';
    $tabItem.on(trigger, function () {
      var index = $(this).index();
      that.tab(index);
    });
  }

  function _tab(index) {
    this.$item.eq(this.index).removeClass('active');
    this.$panel.eq(this.index).showHide('hide');
    this.index = index;
    this.$item.eq(index).addClass('active');
    this.$panel.eq(index).showHide('show');
  }

  ;

  function Tab($ele, options) {
    this.index = options.index;
    this.delay = options.delay;
    this.$item = $ele.find('.tab-item');
    this.$panel = $ele.find('.tab-panel');

    _init.call(this, $ele, options);
  }

  Tab.prototype = {
    constructor: 'Tab',
    tab: function tab(index) {
      var _this2 = this;

      if (index === this.index) return;

      if (this.delay) {
        this.timer && clearTimeout(this.timer);
        return this.timer = setTimeout(function () {
          _tab.call(_this2, index);
        }, this.delay);
      }

      _tab.call(this, index);
    }
  };
  var defaults = {
    index: 0,
    trigger: 'click',
    animation: 'slient',
    delay: 150
  };
  $.fn.extend({
    tab: function tab(options) {
      return $(this).each(function (i, ele) {
        var $ele = $(ele);
        var model = $ele.data('tab');

        if (_typeof(options) === 'object' || !model) {
          model = new Tab($(ele), $.extend(defaults, _typeof(options) === 'object' && options));
          $ele.data('tab', model);
        }

        model && typeof options === 'number' && model.tab(options);
      });
    }
  });
})(jQuery);;"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function ($) {
  // 私有方法
  function _init($ele, options) {
    var _this = this;

    var toggle = $ele.find('.drop-toggle');
    var layer = this.layer;
    var trigger = options.trigger,
        animation = options.animation,
        direction = options.direction; // 初始化layer下拉动画

    layer.showHide({
      animation: animation,
      direction: direction
    }); // 转发事件

    layer.on('show', function (e) {
      $ele.trigger('dropdown');
    }); // toggle绑定事件

    if (trigger === 'click') return toggle.on('click', function () {
      if (layer.data('status') === 'hiden') return _this.show();

      _this.hide();
    });
    $ele.hover(function (e) {
      return _this.show();
    }, function (e) {
      return _this.hide();
    });
  }

  ; // 构造函数

  function Dropdown($ele, options) {
    this.layer = $ele.find('.drop-layer');
    this.delay = options.delay;

    _init.call(this, $ele, options);
  }

  ;
  Dropdown.prototype = {
    constructor: 'Dropdown',
    show: function show() {
      var _this2 = this;

      if (this.delay) {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(function () {
          _this2.layer.showHide('show');
        }, this.delay);
      } else {
        this.layer.showHide('show');
      }
    },
    hide: function hide() {
      this.timer && clearTimeout(this.timer);
      this.layer.showHide('hide');
    }
  }; // 创建实例默认参数

  var defaults = {
    trigger: 'hover',
    animation: 'fade',
    delay: 150
  };
  $.fn.extend({
    drop: function drop(options) {
      return $(this).each(function (i, ele) {
        var $ele = $(ele);
        var model = $ele.data('drop');

        if (!model) {
          options = $.extend(defaults, _typeof(options) === 'object' && options);
          $ele.data('drop', model = new Dropdown($ele, options));
        }

        model[options] && model[options]();
      });
    }
  });
})(jQuery);