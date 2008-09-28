W.dxul.command = function(node){var props = node.getAttributeNames();
    this.tagName = 'command';
    // set Attributes and Properties common to all XUL elements
    this.init(node);
    this.core = W.style('input');
    this.core.type = 'hidden';
    
    for(var i in props){
        var prop = node.getAttribute(props[i]);
	    switch(props[i]){
	        case 'oncommand':
	        	this.core.value = prop;
	        	break;
	    }
	}    
};
W.dxul.command.prototype = new W.dxul.XULElement();