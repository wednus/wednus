W.dxul.description = function(node){var props = node.getAttributeNames();
    this.tagName = 'description';
    // set Attributes and Properties common to all XUL elements
    this.init(node);

    this.body.innerHTML = node.children[0].content;
    
    for(var i in props){
        var prop = node.getAttribute(props[i]);
	    switch(props[i]){
	        case 'value':
	        	this.body.innerHTML = prop;
	        	break;
	    }
	}
};
W.dxul.description.prototype = new W.dxul.XULElement();
