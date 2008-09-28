W.dxul.mapElements = function(current){
    // check implementation
    if(!W.dxul[current.tagName]) return;
    // instantiate a xul element
    var xul = new W.dxul[current.tagName](current);
    // append core to body if exist (not yet appended to any object)
    if(xul.core && !xul.core.parentNode)
        xul.body.appendChild(xul.core);
    // register element
    this.elements[this.elements.length] = xul;
    // check children
    var children = current.children;
    if(children){
        if(!current.parent){
            document.body.appendChild(xul.body);
        }else if(!xul.body.parentNode) current.parent.appendChild(xul);
        return xul;
    }else if(!xul.body.parentNode) current.parent.appendChild(xul);
    return false;
};


/**
 * XUL interpreter
 *
 * @see http://www.devguru.com/technologies/xmldom/QuickRef/obj_node.html#types
 */
W.dxul.interpreter = function(current){
    switch(current.nodeType){
        case 'ELEMENT':
            var parent = this.mapElements(current);
            if(!parent) break;
        // traverse children - recursive
        for(var i = 0; i < current.children.length; ++i){
            current.children[i].parent = parent;
            this.interpreter(current.children[i]);
        }
            break;
        case 'CDATA':
        case 'TEXT':
    };
};