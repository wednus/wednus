/**
 * @defgroup    wps    WPS, Wednus Positioning System
 * @ingroup scavenger
 * It is the implementation of WPS, Wednus Positioning System.
 * This is the implementation of the idea of relating each window component in an
 * organic manner so the windows can react (reposition/resize) by themselves for
 * a certain event (i.e. resize) by calling each other recursively.
 * \image    html    wps.jpg
 * All the coordinate settings in the Wednus System follows this positioning system.
 * As you see from the simplified web browser layout above, the vertical(v) range
 * has three markers, 'left', 'xcenter' and 'right', and the horizontal(h) range also
 * has three markers of 'top','ycenter' and 'bottom'. The left and up directions from
 * v and h markers are negative and vice versa. Example coordinate data will help
 * you understand:
 * - the middle (of browser): 'xcenter:0,ycenter:0'
 * - the 100(pixel)-left from the middle: 'xcenter:-100,ycenter:0'
 * - the top-left corner: 'right:0,top:0'
 * - the bottom-left: 'left:0,bottom:0'
 *
 * @see    http://wednus2.blogspot.com/2004/09/wps-wednus-positioning-system.html
 * @{
 */

/**
 * Y-coordinate of workspace position
 * @see    W.wps
 */
W.top = 0;


/**
 * X-coordinate of workspace position
 * @see    W.wps
 */
W.left = 0;


/**
 * Width of workspace
 * @see    W.wps
 */
W.width = 0;


/**
 * Height of workspace
 * @see    W.wps
 */
W.height = 0;


/**
 * Object pool for children objects
 * @see    W.add
 */
W.children = [];


/**
 * The root of all Wednus objects
 */
W.body = document.createElement('div');

/**
 * Refresh the workarea size properties
 *
 * @ref	http://www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html
 */
W.refresh = function(){
    var db = this.root;
    if(window.innerWidth != null) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }else if(window.opera != null){
        this.width = db.clientWidth;
        this.height = db.clientHeight;
    }else if(document.documentElement != null){  // IE or others
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;
    }
    this.width = parseInt(this.width);
    this.height = parseInt(this.height);
    this.body.style.width = this.width +'px';
    this.body.style.height = this.height +'px';
};


/**
 * Wednusification
 *
 * If the parent is a WPS object, then it does establishing the hierarchy thing.
 * It it is not, then it's gonna be just one time smart attachment.
 * @todo    which is the better?  (a != null), (!a.name)
 */
W.wednusify = function(obj){
    // minimal WPS object
    var tmp = {wps:'', core:{}, body:document.createElement('div')};
    // check missing elements
    // 1. check core
    if(obj.core == null){
        tmp.core = obj;
    }else tmp.core = obj.core;
    // 2. check body
    if(obj.body == null)
        tmp.body = document.createElement('div');
    // 3. check wps
    if(obj.wps != null){
        tmp.wps = obj.wps;
    }else{
        var coreStyle = tmp.core.style;
        tmp.wps = parseInt(coreStyle.width?coreStyle.width:100)
            +','+ parseInt(coreStyle.height?coreStyle.height:100)
            +',left:'+parseInt(coreStyle.left?coreStyle.left:100)
            +',top:'+ parseInt(coreStyle.top?coreStyle.top:100);
    }
    return tmp;
};


/**
 * Check obj
 */
W.is_wednusified = function(obj){
    return (typeof obj.body == 'object') && (typeof obj.core == 'object')
        && (typeof obj.wps == 'string');
};


/**
 * Append object to the WPS
 *
 * note: abs useful for relatively sizing/positioning independent objects
 * warning: parent doesn't appendChild child.  use 'Container' control for this
 * purpose.
 * @param obj object to register to the parent
 *    - (object) child object to register (WPS object)
 *    - (array) array of children for batch addition
 * @param parent  parent object
 *    - (object) parent object itself (WPS object)
 *    - (undefined) default: document.body
 * @return  original obj
 * @note	parent doesn't need to be an WPS object
 * @warning    it would be better to get WPS values by checking object properties
 * rather than just set an initial value.
 * @todo    !! add WOM junction point
 * @todo    need to be more strict for valid argument
 * @todo    do not rePos when each object is added.  not efficient
 * @todo	'100%,100%' doesn't need position data
 */
W.add = function(obj, parent){
    // support batch addition
    if(obj.constructor == Array){
        for(var i = 0; i < obj.length; ++i)
        this.add(obj[i], parent);
        return;
    }
  // check whether it is an WPS object
    if(!this.is_wednusified(obj))
        obj = this.wednusify(obj);
    // expand (HTML element) core
    if(obj.core.style != null){
        if(obj.core.style.width == '')
            obj.core.style.width = '100%';
        if(obj.core.style.height == '')
            obj.core.style.height = '100%';
    }
    // append core to body if it's appendable
    if(obj.core.appendChild != null && obj.body !== obj.core){
        obj.body.appendChild(obj.core);
    }
    // it's all about positioning.
    obj.body.style.position = 'absolute';
    // check whether it is an WPS object
    if(typeof parent != 'undefined'){
        if(!this.is_wednusified(parent)){
            parent  = this.add(parent);
        }
        parent.children = [];
        //parent.onresize = function(){W.repos(parent);};
        parent.onresize = function(){W.repos(this);};
    }else parent = W;
    // build hierarchy
    obj.parent = parent;
    parent.children[parent.children.length] = obj;
    // add wom
    if(this.wom != null)
        this.wom(obj);
    this.repos(parent);
    // put the core into the body
    parent.body.appendChild(obj.body);
    return obj;
};


/**
 * Implementation of WPS, Wednus Positioning System
 *
 * It recursively traverses child nodes and send repositioning signal.
 * @param    parent    parent object
 * @todo    need to be perf. optimized
 * @todo	add testcase for onresize event relaying
 * @todo	with scrollbar on, placing 'right:0,bottom:0' should not bring
 * a scrollbar unless contents are overflowed.
 */
W.repos = function(parent){var self = this;
    // update workspace size props
    W.refresh();	// have to be 'W'
    if(typeof parent == 'undefined')
        parent = W;	// have to be 'W'
    var children = parent.children;
    for(var i = 0; i < children.length; ++i){
        wps(children[i]);
    }

    function wps(obj){
        var wps = obj.wps.split(',');
        var os = obj.body.style;
        var ps = obj.parent.body.style;

        // get width
        var tmp = wps[0].split('%');
        if(tmp.length == 2){
            os.width = getAbsSize(ps.width, tmp[0]) +'px';
        }else os.width = parseInt(tmp[0]) +'px';
        // get height
        tmp = wps[1].split('%');
        if(tmp.length == 2){
            os.height = getAbsSize(ps.height, tmp[0]) +'px';
        }else os.height = parseInt(tmp[0]) +'px';

    var tmp2;
        // get left
        tmp = wps[2].split(':');
        tmp2 = tmp[1].split('%');
        if(tmp2.length == 2){
            os.left = (getAbsSize(ps.width, tmp2[0]) + 1) +'px';
        }else os.left = getpos(obj, wps[2])+ 'px';

        // get top
        tmp = wps[3].split(':');
        tmp2 = tmp[1].split('%');
        if(tmp2.length == 2){
            os.top = (getAbsSize(ps.height, tmp2[0]) + 1) +'px';
        }else os.top = getpos(obj, wps[3])+ 'px';

        // relay wps event to children of this obj.
        if(obj.onresize != null)  obj.onresize();

    // return absolute size
        function getAbsSize(px, perc){
          return Math.floor(parseInt(px) * (perc / 100));
        };
        // return absolute distance relative to the parent
        function getpos(child, pos){
            if(typeof pos == 'undefined') return;
            var pWidth = parseInt(child.parent.body.style.width);
            var pHeight = parseInt(child.parent.body.style.height);
            var offset = 0;
            var s = child.body.style;
            pos = pos.split(':');
            // get offset
            switch(pos[0]){
                case 'top':
                    offset = parseInt(pos[1]);
                    break;
                case 'ycenter':
                    offset = (pHeight / 2) - (parseInt(s.height) / 2) + parseInt(pos[1]);
                    break;
                case 'bottom':
                    offset = (pHeight - parseInt(s.height)) + parseInt(pos[1]);
                    break;
                case 'left':
                    offset = parseInt(pos[1]);
                    break;
                case 'xcenter':
                    offset = (pWidth / 2) - (parseInt(s.width) / 2) + parseInt(pos[1]);
                    break;
                case 'right':
                    offset = pWidth - parseInt(s.width) + parseInt(pos[1]);
                    break;
            };
            return Math.floor(offset);
        };
    };
};


/**
 * Browser scrollbar setting
 *
 * @note    The value could be either 'auto' or 'hidden'.
 * @param   value   style.overflow value
 * @see	http://www.noscope.com/journal/2004/02/horizontal_scrollbar_bug
 * @note '<style>html {	overflow-x: hidden;	overflow-y: hidden;} </style>'
 */
W.scroll = function(isAuto){
  if(isAuto){
        W.root.style.overflow = 'auto';
         W.include_css('module/scavenger', 'wps_ie_scroll_on');  // fix IE scrollbar problem
     }else{
         W.root.style.overflow = 'hidden';
         W.include_css('module/scavenger', 'wps_ie_scroll_off');  // fix IE scrollbar problem
     }
};


//! \cond    attach
// auto scrollbars
W.scroll(false);
// update workspace size
W.refresh();
// prepare the wednus  root
W.root.appendChild(W.body);
W.body.style.display = 'inline';
// add WPS event listener
W.event(window, 'onresize', W.repos);
//! \endcond
//! @}
