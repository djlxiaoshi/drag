		var _window={
			w_index:1,
		};
		
		_window.add=function(args,arr){
			var wrap=document.getElementById("wrap");//必须要有一个id为wrap的外层容器
			var container=document.createElement("div");
			container.innerHTML=args.template;
			container.setAttribute("class","container");
			wrap.appendChild(container);
			
			
			if(args.container){
				container.style.width=args.container.width+"px";
				container.style.height=args.container.height+"px";
			}
			
			if(args.header.title){
				container.querySelector("header .left").innerHTML=args.header.title;
				container.querySelector("header .left").style.lineHeight=args.header.h_height+"px";
				
			}
			arr.push(container);
			return arr;	
		}
		
		
		
		_window.operation={
			
			//最大化
			max_size:function(obj){
				EventUtil.addHandler(obj.querySelector(".change"),"click",function(){
					if(classOperate.hasClass(this,"max_size")){
						var viewHeight=window.innerHeight;
						var viewWidth=window.innerWidth;
						//移除.max_size的class
						classOperate.removeClass(this,"max_size");
						//添加.resize class
						classOperate.addClass(this,"resize");
						
						//设置窗口大小
						obj.style.width=viewWidth+"px";
						obj.style.height=viewHeight+"px";
						//位置还原为坐标原点
						obj.style.top=0;
						obj.style.left=0;
					}else{
						//移除.max_size的class
						classOperate.removeClass(this,"resize");
						//添加.resize class
						classOperate.addClass(this,"max_size");
						//最小化应该是只留下right部分
						obj.style.width="400px";
						obj.style.height="250px";
						
					}
					
				});
			},
			//最小化
			min_size:function(obj){
				EventUtil.addHandler(obj.querySelector(".min_size"),"click",function(){
					//最小化应该是只留下right部分
					obj.querySelector(".left").style.display="none";
					obj.style.width="120px";
					obj.style.height="30px";
				});
			},
			
			//关闭
			close:function(obj){
				EventUtil.addHandler(obj.querySelector(".close"),"click",function(){
					var parrentDom=obj.parentElement;
					
					//判断是否还有孩子
					parrentDom.removeChild(obj);
				});
			},
			
			//拖拽
			drag:function(obj){
				/*
				 1 要得到初始位置及定位的top和left坐标
				 2 得到鼠标点击按下时的坐标
				 3 得到鼠标放下时的坐标
				 4 换算得到放下时，窗口的left和top坐标
				 
				 所用事件  mousedown  mouseup  mousemove
				 * */
				var start_pageX;//鼠标按下时，x的坐标
				var start_pageY;//鼠标按下时，Y的坐标
				var start_left;//鼠标按下时，拖拽元素的clientLeft值
				var start_top;//鼠标按下时，拖拽元素的clientHeight值
				var stop_left;//鼠标松开时，拖拽元素的left值
				var stop_top;//鼠标松开时，拖拽元素的height值
				var isDown=true; //鼠标是否处于按下状态的标志。
				
				EventUtil.addHandler(obj,"mousedown",function(){
					_window.w_index++;
					obj.style.zIndex=_window.w_index;
				},false);
				
				EventUtil.addHandler(obj.querySelector("header"),"mousedown",function(event){
					isDown=true;
					start_left=obj.offsetLeft;
					start_top=obj.offsetTop;
					start_pageX=EventUtil.getEvent(event).pageX;
					start_pageY=EventUtil.getEvent(event).pageY;
				})
				
				EventUtil.addHandler(document,"mousemove",function(event){
					if(isDown){
						var pHeight=window.innerHeight-obj.offsetHeight;//得到最大height值
						var pWidth=window.innerWidth-obj.offsetWidth;//得到最大width值
						stop_left=EventUtil.getEvent(event).pageX-start_pageX+start_left;
						stop_top=EventUtil.getEvent(event).pageY-start_pageY+start_top;
						//最小边界判断
						if(stop_left<=0)stop_left=0;
						if(stop_top<=0)stop_top=0;
						//最大边界判断
						if(stop_top>=pHeight)stop_top=pHeight;
						if(stop_left>=pWidth)stop_left=pWidth;
	
						obj.style.left=stop_left+"px";
						obj.style.top=stop_top+"px";
					}
				},false)
				
				EventUtil.addHandler(document,"mouseup",function(event){
						isDown=false;
						obj.removeEventListener("mousemove",false);
					
				},false);
					
			}
		}
