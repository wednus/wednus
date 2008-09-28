W.dxul.groupbox = function(node){
    this.tagName = 'groupbox';
    // set Attributes and Properties common to all XUL elements
    this.init(node);
    this.core = W.style('fieldset');
};
W.dxul.groupbox.prototype = new W.dxul.XULElement();