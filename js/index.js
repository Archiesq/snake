$(function(){
	var s='';
	for(var i=0;i<20;i++){
		for(j=0;j<20;j++){
			var id=i+'_'+j;
			s+='<div id="'+id+'" class="block"></div>'
		}
	}
	$('#sence').html(s);

	var snake = [{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	var data = {'0_0':true,'0_1':true,'0_2':true};
	var huashe =function(){
		$.each(snake,function(index,value){
			$('#'+value.x+'_'+value.y).css({backgroundSize:'29px 29px',backgroundImage:'url(image/4.jpg)'});
		})
	}
	huashe();
	//蛇头
   $("#0_2").css({backgroundSize:'29px 29px',backgroundImage:'url(./image/5.png)'})
   var shiwu = ['six','pink','star','yellow','yellow','pink','six','star','pink','yellow']
	var dropFood = function(){
		var x=Math.floor(Math.random()*20);
		var y=Math.floor(Math.random()*20);
		while(data[x+'_'+y]){
			x=Math.floor(Math.random()*20);
			y=Math.floor(Math.random()*20);
		}
		$('#'+x+'_'+y).css({width:'29px',height:'29px',backgroundSize:'29px 29px',backgroundImage:'url(./image/'+shiwu[Math.floor(Math.random()*10)]+'.png)'});
		return {x:x,y:y};
	}
	var food=dropFood();
	var fangxiang=39;
	var move=function(){
		var oldtou=snake[snake.length-1];
		$("#"+oldtou.x+"_"+oldtou.y).css({backgroundSize:"29px 29px",backgroundImage:"url(./image/4.jpg)"});

		if(fangxiang ==39){
			var newtou={x:oldtou.x,y:oldtou.y+1};
			$("#"+newtou.x+"_"+newtou.y).css({backgroundSize:"29px 29px",backgroundImage:"url(./image/5.png)"});
		}
		if(fangxiang==40){
			var newtou={x:oldtou.x+1,y:oldtou.y};
			$("#"+newtou.x+"_"+newtou.y).css({backgroundSize:"29px 29px",backgroundImage:"url(./image/5x.png)"});

		}
		if(fangxiang ==37){
			var newtou={x:oldtou.x,y:oldtou.y-1}
			$("#"+newtou.x+"_"+newtou.y).css({backgroundSize:"29px 29px",backgroundImage:"url(./image/5z.png)"});

		}
		if(fangxiang ==38){
			var newtou={x:oldtou.x-1,y:oldtou.y}
			$("#"+newtou.x+"_"+newtou.y).css({backgroundSize:"29px 29px",backgroundImage:"url(./image/5s.png)"});

		}
		if(newtou.x<0||newtou.y<0||newtou.x>19||newtou.y>19||data[newtou.x+'_'+newtou.y]){
			$('.lose').css('display','block');
			var re=confirm('再来一次！！！')
				if(re){
				location.reload();
			}else{
				
			}
			clearInterval(timeId);
			return;
		}

		if(newtou.x==food.x && newtou.y==food.y){
			food=dropFood();
		}
		else{
			var weiba=snake.shift();
			delete data[weiba.x+'_'+weiba.y];
			$('#'+weiba.x+'_'+weiba.y).css({background:"none"});
		}
		snake.push(newtou);
		data[newtou.x + '_' + newtou.y] = true;
	}
	var timeId;
	$('.start').click(function(){
		timeId=setInterval(move,200);
    	$(this).css('display','none');
    	$('.wai').css('display','block');
    	// $('.block').css({background:'white'})
    	// snake = [ {x:0,y:0},{x:0,y:1},{x:0,y:2} ];
	    // data =  {'0_0':true,'0_1':true,'0_2':true};
	    // huashe();
	    // food = dropFood();
	    // $('.lose').css('display','none');
    	// timeId=setInterval(move,200);
    })
	$(document).keydown(function(e){
		if(Math.abs(e.keyCode-fangxiang)==2){
			return;
		}
		if( !(e.keyCode>=37 && e.keyCode<=40) ){
			return;
		}
	fangxiang=e.keyCode;
	})
})