/**
 * @defgroup    wom    WOM, Wednus Object Model
 * @ingroup scavenger
 * @image    html    control.jpg
 * @see    http://wednus2.blogspot.com/2004/09/wps-wednus-positioning-system.html
 * @todo    need to write an article about WSS
 * @{
 */
W.wom = function(obj){
    obj.moveTo = function(x, y){
        obj.body.style.left = parseInt(x) +'px';
        obj.body.style.top = parseInt(y) +'px';
        this.onmove();
    };
    obj.moveBy = function(x, y){
        obj.body.style.left = (parseInt(obj.body.style.left) + parseInt(x)) +'px';
        obj.body.style.top = (parseInt(obj.body.style.top) + parseInt(y)) +'px';
        this.onmove();
    };
    obj.resizeTo = function(width, height){
        obj.body.style.width = parseInt(width) +'px';
        obj.body.style.height = parseInt(height) +'px';
        this.onresize();
    };
    obj.resizeBy = function(width, height){
        obj.body.style.width = (parseInt(obj.body.style.width) + parseInt(width)) +'px';
        obj.body.style.height = (parseInt(obj.body.style.height) + parseInt(height)) +'px';
        this.onresize();
    };
    obj.open = function(){
        obj.body.style.display = 'block';
    };
    obj.close = function(){
        obj.body.style.display = 'none';
    };
    obj.hide = function(){
        obj.body.style.visibility = 'hidden';
    };
    obj.show = function(){
        obj.body.style.visibility = 'visible';
    };
    // wps related functions
    obj.move = function(wps){
        obj.wps = wps;
        W.repos(obj.parent);
        this.onmove();
    };

    // forward events
    obj.body.onclick = function(){obj.onclick();};
    obj.body.ondblclick = function(){obj.ondblclick();};
    obj.body.onmouseup = function(){obj.onmouseup();};
    obj.body.onmouseout = function(){obj.onmouseout();};
    obj.body.onmouseover = function(){obj.onmouseover();};
    obj.body.onmousemove = function(){obj.onmousemove();};
    obj.body.onblur = function(){obj.onblur();};
    obj.body.onfocus = function(){obj.onfocus();};
    obj.body.onunload = function(){obj.onunload();};
    obj.body.ondragdrop = function(){obj.ondragdrop();};

    // event handler placeholder : will be overriden by user
    obj.onclick = function(){};
    obj.ondblclick = function(){};
    obj.onmouseup = function(){};
    obj.onmouseout = function(){};
    obj.onmouseover = function(){};
    obj.onmousemove = function(){};
    obj.onblur = function(){};
    obj.onfocus = function(){};
    obj.onmove = function(){};
    obj.onresize = function(){};
    obj.onunload = function(){};
    obj.ondragdrop = function(){};
};
/**
 * @}  // end of wom
 */