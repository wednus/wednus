/**
 * Implement browser object
 */
 W.dxul.browser = function(node){
    this.tagName = 'browser';
    // set Attributes and Properties common to all XUL elements
    this.init(node);
    this.core = W.style('iframe', 'border:0px;width:100%;height:'+ node.getAttribute('height') +'px');
    this.core.src = node.getAttribute('src');
};
W.dxul.browser.prototype = new W.dxul.XULElement();