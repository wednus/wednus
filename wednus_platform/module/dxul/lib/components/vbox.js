/**
 * vbox implementation
 *
 * @see http://www.xulplanet.com/tutorials/xultu/boxobject.html
 */
W.dxul.vbox = function(node){
    this.tagName = 'vbox';
    // set Attributes and Properties common to all XUL elements
    this.init(node);

    this.core = W.style('table', 'width:100%;');
    // pool of row entries
    this.trs = [];
    // add item - not standard
    this.add = function(child){
        var tr = self.core.insertRow(-1);
        W.style(tr, 'width:100%;cursor:default');
        self.trs[self.trs.length] = tr;
        tr.appendChild(child);
        //var td = tr.insertCell(-1);
        //td.appendChild(document.createTextNode(caption));
    };
};
W.dxul.box.prototype = new W.dxul.XULElement();