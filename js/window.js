/*
		 
		 * 利用工厂模式，每次新建一个窗口就把这个窗口添加到一个数组中
		 * 
		 * */
		//将所有创建的窗口都保存在这个数组里面，用来遍历
		var windowArray=[];
		//窗口样式
		var windowStyles={
			container:{
				width:500,
				height:250,
				other_css:null
			},
			header:{
				h_height:30,//header高度
				title:'<h4 style="width: 100%;height: 100%;text-align: center;margin:0">这是一个标题</h4>',
				other_css:null
			},
			article:{},
			template:
					 '<header>'+
					 '	<div class="left"></div>'+
					 '	<div class="right">'+
					 '		<a class="min_size"></a>'+
					 '		<a class="max_size change"></a>'+
					 '		<a class="close"></a>'+
					 '	</div>'+
					 '</header>'+
					 '<article></article>'
			    
		}
		
		var buttonDom=document.querySelector("button");
		
		buttonDom.addEventListener("click",function(){
			//多层窗口的层级关系
			_window.add(windowStyles,windowArray);
			
			windowArray.forEach(function(item,index){
				var _width=getOuterStyles(item,"width");
				var _height=getOuterStyles(item,"height");
				//最大化
				_window.operation.max_size(item);
				//最小化
				_window.operation.min_size(item);
				//关闭
				_window.operation.close(item);
				//拖拽
				_window.operation.drag(item);
			});
		},false);
		
		function getOuterStyles(dom,attr){
			if(dom.currentStyle) {
			  return dom.currentStyle[attr];
			} else if(window.getComputedStyle) {
			 	return window.getComputedStyle(dom , null)[attr];
			}
		}
		
		