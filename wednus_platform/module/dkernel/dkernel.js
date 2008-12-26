/**
 * \file dkernel.js
 * This file contains the methods for preparing the browser workspace for any
 * visual tasks.
 *
 * @note  Wednus Control: An object with three essential properties: .body, .core, and .wps.
 * .body is the shell (visible) of the presentation layer.
 * .core is the core (abstract: non-visible) of the control
 * .wps is the WPS set value.
 * @author    Sundew H. Shin
 * @todo check samples on IE
 */


W.dkernel = {version: '0.0.3'};


/**
 * Refresh the browser workarea size properties
 *
 * @see	http://www.softcomplex.com/docs/get_window_size_and_scrollbar_position.html
 */
W.refresh = function(){
  var db = document.body;
  if(window.innerWidth != null){
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }else if(window.opera != null){
    this.width = db.clientWidth;
    this.height = db.clientHeight;
  }else if(document.documentE1lement != null){  // IE or others
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;
  }
  // store in Int-type
  this.width = parseInt(this.width);
  this.height = parseInt(this.height);
  // inherit the browser workspace size onto the W.body
  this.body.style.width = this.width +'px';
  this.body.style.height = this.height +'px';
};


/**
 * Browser scrollbar setting
 *
 * IE doesn't understand document.body.style.overflow = 'hidden'
 * @param   value   true for 'auto', false for 'hidden'
 * @see	http://www.noscope.com/journal/2004/02/horizontal_scrollbar_bug
 * @see  http://www.jslint.com/lint.html
 * @note Opera doesn't support overflow-x and overflow-y yet.
 */
W.scroll = function(isAuto){
  if(isAuto){
    document.write('<style>html {overflow: auto;}<\/style>');
    //document.write('<style>html {overflow-x: auto;overflow-y: auto;}<\/style>');
  }else document.write('<style>html {overflow: hidden;}<\/style>');
    //}else document.write('<style>html {overflow-x: hidden;overflow-y: hidden; '
    //      +'overflow: hidden;}<\/style>');
  document.close();
};


W.background = function(bg){
  if(!bg) return;
  document.body.style.background = bg;
};


/**
 * Init. platform as performing:
 * - Build the available namespace name library,
 * - Prepare the presentation base,
 * - Prepare the code holder (textarea),
 * - Refresh screen info., and
 * - Get the W.path if it's from wednus_compact.js.
 */
W.init = function(){
  // build initial namespace library
  for(var i in window) W.names += i +',';

  // append the mother of all presentation layers
  this.body = document.createElement('div');
  // has no footprint
  this.body.style.display = 'inline';
  // trick: get document.body ready
  if(!document.body){
    document.write('<div id="_wednus_platform_" style="display:none;'
    +'position:absolute;">.</div>');
  }
  document.body.appendChild(this.body);

  // code holder: handles issue eval backslash contains string
  this.code = document.createElement('textarea');
  this.code.style.display = 'none';
  document.body.appendChild(this.code);
  // auto scrollbars
  this.scroll(false);
  // update workspace size
  this.refresh();

  // get path if it's from wednus_compact.js loading
  if(this.path == '') this.autopath();
};

//!\cond    init_system
// by doing this, we can block 'i' being exposed to the global namespace
(function(){
  // width of workspace
  W.width = 0;
  // height of workspace
  W.height = 0;
  // script confliction checker place holder
  W.check_namespace = function(){};
  // initialize system
  W.init();
  W.load('module/dkernel', 'wes,wml,wss,wrs,serialize,Oracle', 'module');
})();
//!\endcond


/**
 * \mainpage
 * \section intro  Introduction
 * Wednus DKernel(DHTML Kernel) encapsulates the complexity of supporting
 * various web browsers and establishes browser-neutral web application platform.
 * - <b>WML</b> - Loads an arbitrary script file on the platform installation.
 * - <b>WED</b> - Includes functions for debugging
 * - <b>WES</b> - Add an event to the corresponding event library.
 * - <b>WRS</b> - Load remote JS.
 * - <b>Oracle</b> - The Oracle introduces the concept of time to the objects
 * with the receptor method.: .tick()
 * <hr>
 * \section diagram Architecture
 * \image   html    dkernel.jpg
 * <hr>
 *  \section usage	Usage
 * \code
 * <head> .....
 * <script src='<installation path>/wednus/wednus.js' type='text/javascript'></script>
 * ..... </head>
 * \endcode
 * @todo    http://www-128.ibm.com/developerworks/library/os-ecov/
 */