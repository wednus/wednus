W.dxul.caption = function(node){
    this.tagName = 'caption';
    // set Attributes and Properties common to all XUL elements
    this.init(node);

    this.core = W.style('legend');
    this.core.appendChild(document.createTextNode(node.getAttribute('label')));

    // If a caption element is placed inside the groupbox, it will be used as a
    // caption which appears along the top of the groupbox.
    if(node.parent.tagName == 'groupbox')
        node.parent.core.appendChild(this.core);
};
W.dxul.caption.prototype = new W.dxul.XULElement();