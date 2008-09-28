W.dxul.textbox = function(node){var props = node.getAttributeNames();
    this.tagName = 'textbox';
    // set Attributes and Properties common to all XUL elements
    this.init(node);

    this.core = W.style('input', 'width:100%');
    for(var i in props){
        if(props[i] == 'multiline' && node.getAttribute(props[i]) == 'true'){
            this.core = W.style('textarea');
            this.core.rows = 3;
        }
    }
    
    for(var i in props){
        var prop = node.getAttribute(props[i]);
	    switch(props[i]){
	         case 'readonly':
	              if(prop == 'yes')
	                   this.core.readOnly = true;
	              break;
	         case 'value':
	              this.core.value = prop;
	              break;
	    }
	}
	
    if(node.parent.tagName == 'groupbox'){
        node.parent.core.appendChild(this.core);
    }
};
W.dxul.textbox.prototype = new W.dxul.XULElement();