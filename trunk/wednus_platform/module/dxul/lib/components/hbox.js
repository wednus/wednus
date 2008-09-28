W.dxul.hbox = function(node){var props = node.getAttributeNames();
    this.tagName = 'hbox';
    // set Attributes and Properties common to all XUL elements
    this.init(node);

    if(node.parent.tagName == 'groupbox'){
        node.parent.core.appendChild(this.body);
    }
};
W.dxul.hbox.prototype = new W.dxul.XULElement();