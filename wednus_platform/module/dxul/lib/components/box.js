/**
 * Implement box object
 *
 * @see http://www.xulplanet.com/tutorials/xultu/boxobject.html
 */
W.dxul.box = function(node){
    this.tagName = 'box';
    // set Attributes and Properties common to all XUL elements
    this.init(node);
};
W.dxul.box.prototype = new W.dxul.XULElement();