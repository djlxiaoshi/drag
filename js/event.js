
/*事件处理兼容写法*/
var EventUtil = {
		// 给对象element注册事件 type：事件类型 handle：事件处理函数
	    addHandler: function(element,type,handler) {
	        if(element.addEventListener) {
	            element.addEventListener(type,handler,false);
	        }else if(element.attachEvent) {
	            element.attachEvent("on"+type,handler);
	        }else {
	            element["on" +type] = handler;//静态注册
	        }
	    },
	    // 给element对象移除事件  事件冒泡
	    removeHandler: function(element,type,handler){
	        if(element.removeEventListener) {
	            element.removeEventListener(type,handler,false);
	        }else if(element.detachEvent) {
	            element.detachEvent("on"+type,handler);
	        }else {
	            element["on" +type] = null;
	        }
	    },
	    // 获取事件:currentTarget是指当前被触发或者说正在处理事件的那个元素
	    getEvent: function(event) {
	        return event ? event : window.event;
	    },
	    // 获取e.target
	    getTarget: function(event) {
	        return event.target || event.srcElement;
	    },
	    // 阻止默认事件
	    preventDefault: function(event){
	        if(event.preventDefault) {
	            event.preventDefault();
	        }else {
	            event.returnValue = false;
	        }
	    },
	    // 阻止事件继续执行，不论是冒泡还是捕捉
	    stopPropagation: function(event) {
	        if(event.stopPropagation) {
	            event.stopPropagation();
	        }else {
	            event.cancelBubble = true;
	        }
	    },
	    getRelatedTarget: function(event){
	        if (event.relatedTarget){
	            return event.relatedTarget;
	        } else if (event.toElement){
	            return event.toElement;
	        } else if (event.fromElement){
	            return event.fromElement;
	        } else {
	            return null;
	        }
	    },
	    getWheelDelta: function(event) {
	        if(event.wheelDelta) {
	            return event.wheelDelta;
	        }else {
	            return -event.detail * 40
	        }
	    },
	    // 获取按键的值
	    getCharCode: function(event) {
	        if(typeof event.charCode == 'number') {
	            return event.charCode;
	        }else {
	            return event.keyCode;
	        }
	    }
	};