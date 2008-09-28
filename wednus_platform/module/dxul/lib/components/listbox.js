/**
 * listbox
 *
 * considered using 'select', but that that HTML element showed inconsistent
 * layout over different browsers.
 */
W.dxul.listbox = function(node){var self = this;
    this.tagName = 'listbox';
    // set Attributes and Properties common to all XUL elements
    this.init(node);
    // construct presentation objects
    W.style(this.body, 'height:200px;overflow:auto;border:2px;borderStyle:inset;');
    this.core = W.style('table', 'width:100%;');
    // pool of row entries
    this.trs = [];
    // add item
    this.appendItem = function(caption, id){
        var tr = self.core.insertRow(-1);
        W.style(tr, 'width:100%;cursor:default');
        self.trs[self.trs.length] = tr;
        tr.onmousedown = function(){
            for(var i = 0; i < self.trs.length; ++i)
                W.style(self.trs[i], 'color:black;background:;');
            this.style.color = 'white';
            this.style.background = 'navy';
        };
        var td = tr.insertCell(-1);
        td.appendChild(document.createTextNode(caption));
    };
};
W.dxul.listbox.prototype = new W.dxul.XULElement();