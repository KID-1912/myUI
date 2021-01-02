## myUI
基于jQuery开发的$.fn.extend插件，快速实现页面交互设计

### 目录
- demos
    + 各UI组件
- lib
    + jQuery.js资源
- modules
    + 核心模块，UI组件基于的模块功能
- src
    + myUI.js 未压缩版
    + myUI.min.js 压缩版
    + muUI.css UI基础css样式

## 使用
1. myUI基于jQuery的$.fn.extend开发插件，使用前引入'/lib/jquery.js'兼容版本
2. 引入myUI.min.js，初始化插件方法
3. 引入muUI.css初始化UI所需样式
```
<link rel="stylesheet" href="src/myUI.css">
<script src="lib/jquery-3.4.1.min.js"></script>
<script src="src/muUI.min.js"></script>
```

## 核心模块
核心模块为开发页面交互提供基础方法，如显示隐藏，运动，相关Utils工具包


### $ele.showHide({options})
控制元素的显示隐藏

1. 参数：要求options为对象类型，options属性如下：

|  参数  |  描述  |  默认 |  其它可选  |
|  ----  | ----  |  ----  | ----  |
| animation | 设置元素显示隐藏动画效果 | slient（无动画效果） | slide展开，fade渐进，fadeSlide渐进展开 |
| direction | 仅在animation为slide或fadeSlide有效，设置slide展开方向 | y（垂直展开 ）| x（水平展开）|

2. 方法

|  方法  |  描述  | 参数  |
|  ----  | ----  |  ----  |
| $ele.showHide() | 控制元素显示隐藏 | 'show','hide'（String） |

3. 事件

对jQuery元素showHide初始化完成后，使用showHide()方法控制元素显示隐藏，可监听元素show/shown/hide/hiden状态的事件

4. demo
```
$('.shade').showHide({animation: 'fade'})
.on({
    show: () => console.log('shade准备显示'),
    shown: () => console.log('shade显示完成'),
    hide: () => console.log('shade准备隐藏'),
    hiden: () => console.log('shade隐藏完成'),
})
```

### $ele.move({options})
控制元素animate移动至指定位置（要求css定位元素）

1. 方法
    - $ele.moveX(num) 水平移动至num
    - $ele.moveY(num) 垂直移动至num
    - $ele.move(num,num) 指定坐标移动至num,num
2. 参数：要求options为对象类型，options属性如下：

|  参数  |  描述  |  默认  |
|  ----  | ----  |  ----  |
| x | 设置终点position的left值 | 移动前left值，即移动中不改变 |
| y | 设置终点position的top值 | 移动前top值，即移动中不改变 |

3. 事件
支持监听元素移动开始/结束状态的响应事件

4. demo
```
$('.ele').on({
    move: (e) => console.log('move位移开始'),
    moved: (e) => console.log('move位移结束')
}).move(200,400)
```

### Utils工具模块
1. Utils.debounce(fnc,delay)
防抖函数处理

2. Utils.lazyload({options})
按需加载代理

- 参数：要求options为对象类型，options属性如下：

|  参数  |  描述  |
|  ----  | ----  |
| id | 按需加载事件id名 |
| $container | 按需加载元素的父元素 |
| totalItemNum | 按需加载元素个数 |

- demo
```
1. 按需加载事件绑定
$('.tab').on('tab-loadItem',function(event,index,$ele){// 事件对象,元素索引，元素
    ...加载图片，渲染数据
});
2. 父元素初始化按需加载代理
Utils.lazyload({
    id: 'tab',
    $container: $('.tab'),
    totalItemNum: $('.tab .tab-item').length
})
3. 触发按需加载代理事件
$('.tab').on('tab',function(e,index,$ele){
    // 按需加载根据实际开发触发，如滚动到可视区，元素初次显示...
    $(this).trigger('tab-show',[index,$ele]);
})
```

3. Utils.loadImg/Imgs(url,fail)
图片懒加载

## UI插件

### $ele.drop({options})
下拉展开组件

1. 参数：要求options为对象类型，options属性如下：

|  参数  |  描述  |  默认 |  其它可选  |
|  ----  | ----  |  ----  | ----  |
| trigger | 元素下拉展开触发事件 | hover（触摸） | click点击触发|
| animation | 元素展开/折叠动画 | fade（渐进） | slide下拉，fadeSlide渐进下拉，slient无动画|
| direction | 仅在animation为slide或fadeSlide有效，设置slide展开方向 | y（垂直展开 ）| x（水平展开）|
| delay | 防抖的延迟时间 | 150 | Number |


2. 方法

|  方法  |  描述  | 参数  |
|  ----  | ----  |  ----  |
| $ele.drop() | 控制元素展开/折叠 | 'show','hide'（String） |

3. 事件

对jQuery元素drop初始化完成后，使用drop()方法控制元素展开/折叠，可监听元素dropdown（展开）状态的事件

4. 组件HTML结构
```
<div id="yourIdOrClassName">
    <div class="drop-toggle">折叠项</div>
    <div class="drop-layer">折叠内容</div>
</div>
```

5. demo
```
$('.yourIdOrClassName').drop({animation: 'slide',trigger: 'click'})
.on('dropdown',() => console.log('元素准备展开'))
```

### $ele.tab({options})
tab切换组件

1. 参数：要求options为对象类型，options属性如下：

|  参数  |  描述  |  默认 |  其它可选  |
|  ----  | ----  |  ----  | ----  |
| index | 默认激活的tab索引值 | 0 | Number |
| trigger | tab切换触发事件 | click（点击） | mouse（触摸） |
| animation | tab切换动画 | slient无动画 | fade（渐进），slide下拉，fadeSlide渐进下拉，|
| direction | 仅在animation为slide或fadeSlide有效，设置slide展开方向 | y（垂直展开 ）| x（水平展开）|
| delay | 防抖的延迟时间 | 150 | Number |


2. 方法

|  方法  |  描述  | 参数  |
|  ----  | ----  |  ----  |
| $ele.tab() | 激活指定index的tab | Number |

3. 事件

对jQuery元素tab初始化完成后，可监听元素tab（激活显示）事件

4. 组件HTML结构
```
<div id="yourIdOrClassName" class="tabs">
    <ul class='tab-header'>
        <li class="tab-item">0</li>
        <li class="tab-item">1</li>
        <li class="tab-item">2</li>
    </ul>
    <div class="tab-body">
        <div class="tab-panel">0000000</div>
        <div class="tab-panel">111111</div>
        <div class="tab-panel">222222</div>
    </div>
</div>
```

5. demo
```
$('#yourIdOrClassName').tab()
.on('tab',(e,i,$ele) => console.log('索引',i,'元素',$ele,'即将激活'));
```

### $ele.carousel(options)
轮播图组件

1. 参数：要求options为对象类型，options属性如下：

|  参数  |  描述  |  默认 |  其它可选  |
|  ----  | ----  |  ----  | ----  |
| index | 视口默认展示轮播项的索引 | 0 | Number |
| inter | 自动轮播间隔 | 4000 | Number |
| auto | 是否开启自动轮播 | true | Boolean |

2. 方法

|  方法  |  描述  | 参数  |
|  ----  | ----  |  ----  |
| $ele.data('carousel').prev() | 控制轮播图回到上一项 | 无 |
| $ele.data('carousel').next() | 控制轮播图切至下一项 | 无 |
| $ele.slide() | 控制轮播图切至指定索引项 | Number |

3. 事件

对jQuery元素carousel初始化完成后，可监听元素'slideIn'（轮播项切入）状态的事件

4. 组件HTML结构
```
    <div id="yourIdOrClassName" class="carousel">
      <div class="container">
        <div class="carousel-item">
          <img class="carousel-pic" src="img/1.png">
        </div>
        <div class="carousel-item">
          <img class="carousel-pic" src="img/2.png">
        </div>
        <div class="carousel-item">
          <img class="carousel-pic" src="img/3.png">
        </div>
      </div>
      <ul class="indicator">
        <li class="yourClassname"></li>
        <li class="yourClassname"></li>
        <li class="yourClassname"></li>
      </ul>
    </div>
```
    - 你仅需设置.carousel大小，内部元素会自动占满;
    - 如果轮播内容为图片，请加上.carousel-pic，你只需要设置.carousel的宽度，img会自适应.carousel宽度；并且你可以不设置.crousel高度，让其适应轮播图片高
4. demo
```
$('#yourIdOrClassName').carousel()
.on('slideIn',(e,i,$ele) => console.log('索引',i,'元素',$ele,'即将进入轮播视口'));
```






