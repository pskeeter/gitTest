$(function(){
            // 2）用jquery选择器获取页面元素
            var $focus = $('#focus');	//盒子的id
            var $bigpic = $('#bigpic');	//大图的id
            var $smallpic = $('#smallpic');	//小图的节点

            var index = 0;//显示图片索引
            var len = $bigpic.children('li').length;	//获得大图的匹配的li子元素的长度

            // 初始化
            show();

            // 3）使用jquery事件与动画
            var timer = setInterval(animation,3000);

            // 鼠标移入停止，移除继续
            $focus.on('mouseenter',function(){
                clearInterval(timer);
            }).on('mouseleave',function(){
                timer = setInterval(animation,3000);
            });

            // 点击小图切换效果
            $smallpic.on('click','li',function(){
                index = $(this).index();
                show();
            });

            //前后按钮
            $focus.on('click','a.prev',function(){
                index--;
                show();
            }).on('click','a.next',function(){
                index++;
                show();
            });

            // 图片切换
            function animation(){
                index++;
                show();
            }

            // 显示图片
            // 当前大图透明度为1，其他为0
            // 当前小兔透明度为1，其他为0.5
            function show(){
                if(index==len){
                    index=0;
                }else if(index < 0){
                    index = len - 1;
                }
                $bigpic.children('li').eq(index).animate({opacity:1}).siblings().animate({opacity:0});
                $smallpic.children('li').eq(index).animate({opacity:1}).siblings().animate({opacity:0.5});
            }
});