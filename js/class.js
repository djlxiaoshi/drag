	var classOperate={
	
		hasClass:function( elements,cName ){
	    	return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); 
		},
		
		addClass:function( elements,cName ){  
		    if( !this.hasClass( elements,cName ) ){  
		        elements.className += " " + cName;  
		    };  
		},
		
		removeClass:function ( elements,cName ){  
		    if( this.hasClass( elements,cName ) ){  
		        elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" ), " " );
		    };  
		}
	}



 
 
