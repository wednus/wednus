/**
 * window
 * 
 * Constructor for the window, the root node of a DXUL document.
 * @see http://www.xulplanet.com/references/elemref/ref_window.html
 */
W.dxul.window = function(node){var props = node.getAttributeNames();
    this.tagName = 'window';
    // set Attributes and Properties common to all XUL elements
    this.init(node);
    // mark workarea
    W.style(this.body, 'border:'+ W.dxul.border +';background:'
        + W.dxul.background +';position:absolute;top:0px;left;0px');
    
    for(var i in props){
        var prop = node.getAttribute(props[i]);
	    switch(props[i]){
	        case 'title':
	        	this.body.title = prop;
	        	break;
	        case 'screenX':
	            this.body.style.left = parseInt(prop) +'px';
	            break;
	        case 'screenY':
	            this.body.style.top = parseInt(prop) +'px';
	            break;
	    }
    }
};
W.dxul.window.prototype = new W.dxul.XULElement();