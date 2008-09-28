document._createElement = document.createElement;
document.createElement = function(tag){
    return W.dxul.isXULTag(tag)?new W.dxul[tag]():document._createElement(tag);
};


// override the default document.getElementById to handle XUL elements
document._getElementById = document.getElementById;
document.getElementById = function(id){
    var xul = W.dxul.getXULElementById(id);
    return xul?xul:document._getElementById(id);
};

/*
document._getElementById = document.getElementById;
document.getElementById = function(id){
    var xul = W.dxul.getXULElementById(id);
    return xul?xul:document._getElementById(id);
};
*/

// check XUL tag
W.dxul.isXULTag = function(tag){
    for(var i = 0; i < this.tags.length; ++i)
        if(this.tags[i] == tag)
            return true;
    return false;
};


// search registered XUL elements
W.dxul.getXULElementById = function(id){
    var elms = W.dxul.elements;
    for(var i = 0; i < elms.length; ++i)
        if(elms[i].id == id){
            // handle special cases
            if(elms[i].tagName == 'textbox'){
                return elms[i].core;
            }else return elms[i];
        }
};
