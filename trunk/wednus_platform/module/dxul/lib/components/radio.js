W.dxul.radio = function(node){
    this.tagName = 'radio';
    // set Attributes and Properties common to all XUL elements
    this.init(node);

    var c = '<input type="radio" ';
    c += 'value="'+ node.getAttribute('value') +'" ';
    c += 'name="radioGroup_'+ W.dxul.elements.length +'" ';
    if(typeof node.getAttribute('selected') != "undefined")
        if(node.getAttribute('selected') == 'true')
            c += 'checked';
    c += '>'+ node.getAttribute('label');
    
    if(node.parent.tagName == 'radiogroup'){
        node.parent.core.innerHTML += c +'<br>';
        c = '';
    }

    this.body.innerHTML = c;    
    //if(pobj.getAttribute('name') != 'hbox' && pobj.getAttribute('name') != 'box')
    //  this.style.width = '100%';
};
W.dxul.radio.prototype = new W.dxul.XULElement();