W.dxul.radiogroup = function(node){
    this.tagName = 'radiogroup';
    // set Attributes and Properties common to all XUL elements
    this.init(node);
    this.core = W.style('form');

    if(node.parent.tagName == 'groupbox'){
        node.parent.core.appendChild(this.core);
    }
};
W.dxul.radiogroup.prototype = new W.dxul.XULElement();