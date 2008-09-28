W.dxul.script = function(node){
    this.tagName = 'script';
    
    var code = '';
    for(var i = 0; i < node.children.length; ++i){
        code = trim(node.children[i].content, true, true);
        if(code.length != 0)
            break;
    }
   
    this.core = document._createElement('script');
    this.core.type = 'text/javascript';
    this.core.text = code;
    document.getElementsByTagName('head').item(0).appendChild(this.core);
    this.body = W.style('div');
};
//W.dxul.window.prototype = new W.dxul.XULElement();