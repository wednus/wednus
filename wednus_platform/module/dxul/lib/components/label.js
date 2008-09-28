W.dxul.label = function(node){
    this.tagName = 'label';
    // set Attributes and Properties common to all XUL elements
    this.init(node);
    
    var c = '<label';
    if(typeof node.getAttribute('control') != 'undefined')
        c += 'for="'+ node.getAttribute('control') +'"';
    c += '>';
    if(typeof node.getAttribute('value') != 'undefined')
        c += node.getAttribute('value');
    c += '</label>';
    this.body.innerHTML = c;
};
W.dxul.label.prototype = new W.dxul.XULElement();