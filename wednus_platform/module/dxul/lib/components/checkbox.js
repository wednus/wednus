W.dxul.checkbox = function(node){
    this.tagName = 'checkbox';
    // set Attributes and Properties common to all XUL elements
    this.init(node);

    this.core = W.style('input');
    this.core.type = 'checkbox';
    this.core.value = node.getAttribute('value');
    //this.body.name = W.dxul.radioGroupId;
    if(typeof node.getAttribute('selected') != "undefined")
        this.core.checked = prop.getAttribute('selected');

/*
  pobj.appendChild(r);
  var label = document.createTextNode(prop.getAttribute('label'));
  pobj.appendChild(label);
  var br = document.createElement('br');
*/
};
W.dxul.checkbox.prototype = new W.dxul.XULElement();