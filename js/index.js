/*index*/

/*头部购物车*/
(function(){
	var $cart = $('.topbar .bopbar-cart');
	var $cartA = $cart.find('a');
	var $cartMenu = $cart.find('div.cart-menu');
	$cart.hover(function(){
		$cartA.addClass('no');
		$cartMenu.stop().slideDown(300);
	},function(){
		$cartMenu.stop().slideUp(300,function(){
			$cartA.removeClass('no');
		});
	});
})();

/*导航下拉显示*/
(function(){
	var $li = $('.header .header-nav ul li.product');
	var $navHide = $('#nav-hide');
	var $ul = $navHide.find('ul');
	$li.hover(function(){
		$navHide.stop().slideDown();
		$ul.eq( $(this).index() ).show().siblings().hide();
	},function(){
		$navHide.stop().slideUp();
	});
	
	$navHide.hover(function(){
		$(this).stop().slideDown();
	},function(){
		$(this).stop().slideUp();
	});
})();

/*搜索框*/
(function(){
	var $text = $('.header .header-search form .search-text');//输入框
	var $sea = $('.header .header-search form .search-btn');//搜索按钮
	var $hide = $('#search-hide');//下拉
	var $hidea= $hide.find('a');//下拉里的a
	var $defaultA = $('.default-a');//默认的a
	/*获取焦点时*/
	$text.focus(function(){
		$(this).addClass('no');
		$sea.addClass('no');
		$defaultA.fadeOut();
		$hide.fadeIn();
	});
	/*点击下拉的内容*/
	$hidea.click(function(){
		$text.val($(this).find('span.key').html());//把关键字传到val里
		$hide.fadeOut(0);
	});
	/*失去焦点*/
	$text.blur(function(){
		$(this).removeClass('no');
		$sea.removeClass('no');
		setTimeout(function(){
			$hide.fadeOut(0);
			if($text.val()=='')$defaultA.fadeIn();//判断val里没有值才显示
		},150);
	});
})();

/*banner 轮播*/
(function(){
	var $banner = $('.adver .banner');//盒子
	var $li = $banner.find('ul.banner-box li');//图片li
	var $btn = $banner.find('.lrbtn a');//左右按钮
	var $tab = $banner.find('.tab a');//选项点
	var $index = 0;
	var timer = null;
	//默认
	$li.eq(0).show();
	$tab.eq(0).addClass('no');
	//点击小点
	$tab.click(function(){
		$index = $(this).index();
		fn();
	});
	//点击左右
	$btn.click(function(){
		if($(this).index()){
			$index++;
			$index %= $tab.length;
		}else{
			$index--;
			if($index < 0){
			$index = $tab.length-1;
			};
		}
		fn();
	});
	//轮播
	$banner.hover(function(){
		clearInterval( timer );
	},function(){
		auto();
	});
	auto();
	function auto(){
		timer = setInterval(function(){
		$index++;
		$index %= $tab.length;
		fn();
		},3000);
	};
	//封装
	function fn(){
		$tab.eq($index).addClass('no').siblings().removeClass('no');
		$li.eq($index).stop().fadeIn(600).siblings().stop().fadeOut(600);
	}
})();

/*二级导航*/
(function(){
	var $firstliA = $('.adver .catalog ul.catalog-nav li');//导航
	var $info = $('.adver .catalog .catalog-list .info');
	//遍历每个li
	$info.each(function(){
		var $li = $(this).find('li');//每个li
		var width = $li.width();//li的宽
		var height = $li.height();//li的高
		var length = $li.length;//li的个数
		var col = Math.ceil( length / 6 );//列数，向上取整
		$(this).width(col*width);//info的宽等于列*li的宽
		$li.each(function(i){
		var x = Math.floor( i / 6);
		var y = i % 6;
		$(this).css({
			left : x*width + 'px',
			top : y*height + 'px'
			});
		});
	});
	//导航
	$firstliA.hover(function(){
		$info.eq( $(this).index() ).show().siblings().hide();
	});
	$('.adver .catalog').hover(function(){},function(){
		$info.hide();
	});
})();

/*小米明星单品 选项卡*/
(function(){
	var $btn = $('.product .hd .btn a');//左右切换按钮
	var $ul = $('.product .dd ul.dd-box');
	var index = false;
	var timer = null;
	$btn.eq(1).addClass('no');
	$btn.click(function(){
		clearInterval(timer);
		auto();
		var i = $(this).index();
		if( !!i != index ){
			index = !!i;
			$(this).removeClass('no').siblings().addClass('no');
			$ul.stop().animate({
				marginLeft : -i*1240 + 'px'
			},500);
		}
	});
	auto()
	function auto(){
		timer = setInterval(function(){
			index = !index;
			var x = index-0;
			$btn.eq(x).removeClass('no').siblings().addClass('no');
			$ul.stop().animate({
				marginLeft : -x*1240 + 'px'
			},500);
		},6000);
	};
})();
	
/*商品*/
(function(){
	var $li = $('.bd .brick-list li');
	var $theme = $('.bd .theme');
	$li.hover(function(){
		$(this).addClass('brick-item-hover');
		$(this).find('.hide').stop().animate({
			height : 75 + 'px',
			opacity : 1
		},300);
	},function(){
		$(this).removeClass('brick-item-hover');
		$(this).find('.hide').stop().animate({
			height : 0
		},300);
	});
	$theme.hover(function(){
		$(this).addClass('theme-hover');
	},function(){
		$(this).removeClass('theme-hover');
	});
})();
/*选项卡*/
(function(){
	var $tab = $('#with .hd ul.tab li');/*选项卡*/
	var $ul = $('#with .brick-list');/*选项卡*/
	$tab.eq(0).addClass('no');
	$ul.eq(0).show();
	$tab.hover(function(){
		$(this).addClass('no').siblings().removeClass('no');
		$ul.eq($(this).index()).show().siblings('.brick-list').hide();
	});
})();