/**
 * listbox
 *
 * considered using 'select', but that that HTML element showed inconsistent
 * layout over different browsers.
 */
W.dxul.listitem = function(node){var self = this;
    this.tagName = 'listitem';
    // set Attributes and Properties common to all XUL elements
    this.init(node);
    this.caption = node.getAttribute('label');

    // append if it's in a listbox
    if(node.parent.tagName == 'listbox'){
        node.parent.appendItem(this.caption);
        return;
    }
    
    this.core = W.style('table');    
    var tr = this.core.insertRow(-1);
    tr.style.cursor = 'default';
    var td = tr.insertCell(-1);
    td.appendChild(document.createTextNode(this.caption));
};
W.dxul.listitem.prototype = new W.dxul.XULElement();