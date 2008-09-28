W.dxul.button = function(node){var props = node?node.getAttributeNames():null;
    this.tagName = 'button';
    // set Attributes and Properties common to all XUL elements
    this.init(node);

    this.core = W.style('input');
    
    var width = '100%';    
    if(node.parent.tagName == 'hbox' || node.parent.tagName == 'box'){
        width = '';
    }
    this.core.style.width = width;
    this.core.type = 'button';
    var onclick = '';
    var command = '';
    
    for(var i in props){
        var prop = node.getAttribute(props[i]);
	    switch(props[i]){
	        case 'label':
	            this.core.value = prop;
	            break;
	        case 'onclick':
	        case 'oncommand':
	            onclick = prop;
	            this.core.onclick = function(){eval(onclick);};
	            break;
	        case 'command':
	            command = document.getElementById(prop).value;
	            this.core.onclick = function(){eval(command);};
	            break;
	    }
	}
	
    this.setAttribute = function(prop, value){
        switch(prop){
            case 'label':
                self.core.value = value;
                break;
            case 'oncommand':
                self.core.onclick = value;
                break;
        }
    };
};
W.dxul.button.prototype = new W.dxul.XULElement();