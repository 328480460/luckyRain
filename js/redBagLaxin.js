//随机函数
function rnd(m,n){
	return Math.floor(Math.random()*(n-m)+m);
}
//补零函数
function tuDou(num){
	return num < 10 ? "0" + num : num;
}
var Timerr=null;
var Timerr22=null;
//倒计时开始
//声明次数的全局变量count，用于判断开始次数及后续结束弹窗的样式
function countDown1(t){
	var countdown = new Countdown();
	countdown.init(t,{
		renderCb:function(){
			document.addEventListener('touchmove touchend touchstart',hidden,false);
			document.addEventListener('touchmove',stopBubble,false);
			//$('.count_time').html(countdown.pTimer);
			$('.count_time').html(tuDou(countdown.pTimer));
			if(countdown.pTimer==0){
				$('.rb_mb').hide();
				//清空红包雨的创建
				clearInterval(Timerr);
				clearInterval(Timerr22);
				$('.page_rain .bg_1').html('');
				$('.page_rain .bg_2').html('');
				if($('.red_money').html()<=0){
					$('.red_null_mb').show();
				}else{
					//gif弹窗出现
					$('#open_redbag').show();
					//已抢金额
					var num2=$('.red_money').html();
					$('.red_money_all').html(num2);
					clearTimeout(time3);
					var time3=setTimeout(function(){
						$('#open_redbag img').attr('src','images/redBag_lx/lx_red1.png');
					},1250);
					clearTimeout(time4);
					var time4=setTimeout(function(){
						$('#open_redbag').hide();
						$('#open_redbag img').attr('src','images/redBag_lx/lx_red.gif');
						$('.lx_register_mb').show();
					},3000);
				}
			}
		}
	});		
}
//倒计时12秒
function countDown2(t){
	var countdown = new Countdown();
	countdown.init(t,{
		renderCb:function(){
			//阻止默认事件和事件冒泡
			document.addEventListener('touchmove',hidden,false);
			document.addEventListener('touchmove',stopBubble,false);
			if(countdown.pTimer<=3&&countdown.pTimer>=1){
				$('.count_tt').attr('src','images/redBag_lx/'+(countdown.pTimer)+'.png');
			}
			if(countdown.pTimer==0){
				$('.count_time_t').hide();
				$('.rb_mb').show();
				//红吧雨开始
				redBagRain();
				//倒计时开始
				countDown1(12);
			}
		}
	});		
}
//阻止默认样式
function hidden(e){
	e.preventDefault();
}
//阻止冒泡
function stopBubble(e){
  if(e&&e.stopPropagation){//非IE
   e.stopPropagation();
  }
  else{//IE
   window.event.cancelBubble=true;
  }
} 
//红包雨调用
function redBagRain(money,t){
	//定时生成红包，控制每多长时间生成一次
	clearInterval(Timerr);
    Timerr = setInterval(createBag,400);
    //定时生成红包2，控制每多长时间生成一次
	clearInterval(Timerr22);
	Timerr22 = setInterval(createBag2,1200);
	//红包雨1添加点击事件
	$(document).on('touchend','.bag', function(e){
		if( $(this).attr('checked') === 'checked' ){
			return;
		}else{
			$(this).attr('checked','checked')
			var money2=rnd(0,300)/100;
			//var money2=0;
			if(!!money2){
				$(this).css({
					'animation-play-state':'paused',
					'background-image':'none',
					'position':'relative'
				});
				//创建红包内金额
				$(this).prepend('<div class="bag_money">'+money2+'</div>');
				//红包金额样式
				$('.bag_money').css({
					'position':'absolute',
					'width':'178@fs',
					'height':'174/@fs',
					'color':'#fff',
					'text-align':'center',
					'left':'0',
					'top':'0',
					'right':'0',
					'bottom':'0',
					'background':'rgba(0,0,0,0)',
					'zIndex':'100',
					'animation':'mymove2 0.5s  linear'
				});
				$('.bag_money').on('tap',function(){
					return false;
				});
				//金额赋值
				var num=Number($('.red_money').html());
				num+=Number(money2);
				num=num.toFixed(2);
				//右上角金额赋值
				$('.red_money').html(num);
				clearTimeout(timee2);
				var timee2=setTimeout(function(){
					e.target.remove();
				},500);	
			}else{
				$(this).css({
					'animation-play-state':'paused',
					'background-image':'none',
					'position':'relative'
				});
				$(this).prepend('<div class="bag_money2"></div>');
				$('.bag_money2').css({
					'position':'absolute',
					'width':'178@fs',
					'height':'174/@fs',
					'background-image':'url(images/redBag_lx/red_boom.png)',
					'background-size':'100%',
					'left':'0',
					'top':'0',
					'right':'0',
					'bottom':'0',
					'zIndex':'100',
					'animation':'mymove3 0.2s linear'
				});
				clearTimeout(timee2);
				var timee2=setTimeout(function(){
					e.target.remove();
				},200);	
			}
		}
	});
	//红包雨2添加点击事件
	$(document).on('touchend','.bag2', function(e){
		if( $(this).attr('checked') === 'checked' ){
			return;
		}else{
			$(this).attr('checked','checked');
			$(this).css({
				'animation-play-state':'paused',
				'background-image':'none',
				'position':'relative'
			});
			$(this).prepend('<div class="bag_money3"></div>');
			$('.bag_money3').css({
				'position':'absolute',
				'width':'178@fs',
				'height':'174/@fs',
				'background-image':'url(images/redBag_lx/red_boom.png)',
				'background-size':'100%',
				'left':'0',
				'top':'0',
				'right':'0',
				'bottom':'0',
				'zIndex':'100',
				'animation':'mymove3 0.2s linear'
			});
			clearTimeout(timee3);
			var timee3=setTimeout(function(){
				e.target.remove();
			},200);	
		}
	});
}

//红包雨创建
function createBag(){	
	var w=document.documentElement.clientWidth;
	//红包出来的width值范围
	var j=rnd(0,w-100);
	//红包出来的top值范围
	var n=rnd(-100,50);
	$('.bg_box').prepend('<div class="bag"></div>');
	//动态创建随机红包大小
	var scale=rnd(50,70)/100;
	var w1=177*scale/70+'rem';
	var h1=175*scale/70+'rem';
	//控制生成红包的大小
	$('.bg_box').children('div').eq(0).css({'width':w1,'height':h1});
	//控制生成红包的位置
	$('.bg_box').children('div').eq(0).css({'left':j,'top':n});
	//控制红包降落速度:更改，当运动结束时，删除当前红包
	var oBox=$('.bag')[0];
	oBox.addEventListener('webkitAnimationEnd',function(){
		oBox.remove();
	});
	oBox.addEventListener('animationEnd',function(){
		oBox.remove();
	});
}
//红包雨创建2
function createBag2(){	
	var w=document.documentElement.clientWidth;
	//红包出来的width值范围
	var j=rnd(0,w-100);
	//红包出来的top值范围
	var n=rnd(-100,50);
	$('.bg_box2').prepend('<div class="bag2"></div>');
	//动态创建随机红包大小
	var scale=rnd(50,70)/100;
	var w1=177*scale/70+'rem';
	var h1=175*scale/70+'rem';
	//控制生成红包的大小
	$('.bg_box2').children('div').eq(0).css({'width':w1,'height':h1});
	//控制生成红包的位置
	$('.bg_box2').children('div').eq(0).css({'left':j,'top':n});
	//控制红包降落速度:更改，当运动结束时，删除当前红包
	var oBox=$('.bag2')[0];
	oBox.addEventListener('webkitAnimationEnd',function(){
		oBox.remove();
	});
	oBox.addEventListener('animationEnd',function(){
		oBox.remove();
	});
}
//window.onload
$(function(){
	var loader = new resLoader({
	    resources : [
	    	'images/redBag_lx/lx_rain_tc.png', 
	    	'images/redBag_lx/bag-min.png', 
	    	'images/redBag_lx/3.png',  
	    	'images/redBag_lx/2.png',  
	        'images/redBag_lx/1.png',  
	        'images/redBag_lx/lx_rain_tc2.png',
			'images/redBag_lx/lx_red.gif?t='+Math.random()+'',
			'images/redBag_lx/lx_red1.png'
	    ],
	    onStart : function(total){},
	    onProgress : function(current, total){},
      	onComplete : function(total){}
	});
	loader.start();
    //点击确认开始3秒倒计时
	$('.red_btn').on('tap',function(){
		if($('.red_btn').html()=='再来一次'){
			$('.red_btn').hide();
			$('.count_time_t').show();
			countDown2(3);
		}else{
			$('.red_btn').hide();
			$('.count_time_t').show();
			countDown2(3);
		}
	});
	//关闭弹窗
	$('.red_tc_close').on('tap',function(){
		$('.lx_register_mb').hide();
		$('.count_time').html('12');
		$('.red_btn').show();
		$('.red_btn').html('再来一次');
		$('.red_money').html('0');
		var loader2 = new resLoader({
		    resources : [
				'images/redBag_lx/lx_red1.png',
				'images/redBag_lx/lx_red.gif?t='+Math.random()+''
		    ],
		    onStart : function(total){},
		    onProgress : function(current, total){},
	      	onComplete : function(total){}
		});
		loader2.start();

		
	});
	//点击关闭红包金额为0
	$('.replay').on('click',function(){
		$('.red_null_mb').hide();
		$('.count_time').html('12');
		$('.red_btn').show();
		$('.red_money').html('0');
		$('.red_btn').html('再来一次');

	});
	//点击开始红包雨
	$('.begin_alert_btn').on('tap',function(){
		$('.begin_alert').hide();
		document.documentElement.style.overflow='hidden';
		document.addEventListener('touchmove',hidden,false);
		document.addEventListener('touchmove',stopBubble,false);
	});
});