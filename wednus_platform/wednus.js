/**
 * \file wednus.js
 * This opens the root namespace for Wednus platform, 'W'.
 *
 * In this file, we:
 * - open 'W', the *root* namespace for the platform
 * - define basic module loaders
 * - implement system/user module libraries
 * - prepare the platform ready
 *
 * @author Sundew H. Shin
 */

/**
 * Wednus platform namespace
 *
 * @note    I considered making it a class and prototyping member methods
 * for the class, but I soon realized that establishing a super object and
 * attaching members as its properties is closer to the 'namespace' concept.
 * @note to support browsers with premature DOM, set 'path:' value manually
 * @todo http://www.litotes.demon.co.uk/example_scripts/finalizer.html
 */
var W = {
  // the absolute path where platform installed; manually specify the installed
  // URI to bypass the W.autopath() function running on initialization
  path: '',
  // version info
  version: '0.1.1',
  // document.getElementById() shortcut
  $: function(id){return document.getElementById(id);},
  /**
   * JS loader
   *
   * This function loads a JavaScript file of the given URL.
   * @param {String} url URL of the JS resource
   * @todo add feature checking the existance of the target file
   * @todo removing the trick preparing the document.body w/ force
   * @see http://groups.google.com/group/comp.lang.javascript/browse_thread/thread/ca33838f463c0e5f/12edae0a1c321151?q=existence+of+file&rnum=27#12edae0a1c321151
   * @see this.root.style.margin = '0px'; this.root.style.padding = '0px';
   * @note it will get the document.body available if it's not yet.
   */
  js: function(url){
    if(!document.body)
      document.write('<div id="_wednus_platform_" style="display:none;'
      +'position:absolute;">.</div>');
    document.write('<script type="text/javascript" src="'+ url +'"><\/script>');
    document.close();
  },
  /**
   * Auto set path
   *
   * This function detects the URI that platform installed and set W.path
   * @return {Boolean} true if it detects manually set path or successfully
   * detect the path.
   * otherwise, false.
   * @note check 'wednus.js?only' keyword: w/ this minimal loading marker, we
   * only load up 'wednus.js' but nothing else.
   * @note this local function used to be the W.autopath(), but I made it local
   * because I no longer think it would be useful to users.
   * @todo change the regEx to check the tailed keyword (e.g. 'only') after the
   * detection of 'wednus.js' or 'wednus_compact.js' headings.
   */
  autopath: function(){
    // path has manually set
    if(this.path != '')
      return true;
    // get installation path
    if(document.getElementsByTagName){
      var scripts = document.getElementsByTagName('script');
      for(var i = 0; i < scripts.length; ++i){
        if(scripts[i].src.match(/\bwednus\.js$/i) || scripts[i].src.match(/\bwednus_compact\.js$/i)){
          this.path = scripts[i].src.substring(0, scripts[i].src.lastIndexOf('/') + 1);
          // terminate the search at the first match
          return true;
        // check the 'wednus.js?only' keyword
        }else if(scripts[i].src.match(/\bwednus\.js\?only$/i)){
          this.path = scripts[i].src.substring(0, scripts[i].src.lastIndexOf('/') + 1);
          // properly detected the path, but since we use the return value of this
          // function as the marker for further module loading, we set this as
          // 'false' to stop at this point.
          return false;
        }
      }
    }
    // not able to get the path info.
    document.write('This browser does not support the basic DOM level1.\nTo '
      +'support this browser, the author of this page needs to set "W.path" to the '
      +'installation path(URL) of Wednus Platform manually. Meanwhile, the '
      +'platform will be unloaded. \nWe are sorry for this.\n\nWednus team.');
    document.close();
    // unregister the 'W' namespace
    W = null;
    return false;
  }
};


/**
 * JS loader interface
 *
 * This function loads a JS resource existing under the platform root. It
 * introduces the target module to the platform. It also prevents a module's
 * duplicated loading.
 * @param {String} subpath path below W.path
 * @param {String} name module name
 * @param {String} lib libary category name
 * @see W.include, W.module, W.control
 * @todo need to implement the feature checking finish loading
 * @todo add feature checking the target resource availability
 */
W.load = function(subpath, name, lib){  // script loader
  lib = lib?lib:'include';
  // pool for loaded modules(includes module/control/app/snippet
  this.modules = {};
  // create lib if it's not added already
  if(!this.modules[lib])
    this.modules[lib] = [];
  // do batch load when name is a comma seperated list
  name = name.split(',');
  if(name.length != 1){
    for(var i = 0; i < name.length; ++i)
        this.load(subpath, name[i], lib);
    return;
  }
  // maintain the module library: register only when it's not loaded yet
  if(getIndex(lib, name) != -1){
    return;
  }else this.modules[lib][this.modules[lib].length] = name +'';
  // load module
  this.js(this.path + subpath + '/'+ name +'.js');

  // search any previous loading
  function getIndex(lib, name){
    for(var i = 0; i < W.modules[lib].length; ++i)
      if(W.modules[lib][i] == name)
        return i;
    return -1;
  };
};


/**
 * CSS loader
 *
 * This function loads a CSS resource existing under the platform root.
 * @param {String} url URL of the CSS resource
 */
W.css = function(url){
  document.write('<link href="'+ url +'" rel="stylesheet" type="text/css">');
  document.close();
};


//!\cond    startup_batch
(function(){
  // if the path has detected, we proceed loading other modules.
  if(W.autopath()){
    // dkernel module provides the methods for visual tasks
    W.load('module/dkernel', 'dkernel', 'module');
    //W.load('module/dev', 'dev', 'module');
  }
  /**
   * redirect document.onkeydown event
   */
  document.onkeydown = function(e){
    if(!e) e = window.event;
    W.key = e.keyCode;
  };
})();
//!\endcond

//! add sample codes (one for each comment block)
/**
 * @example wednus.html
 */


/**
\mainpage
\section version Version
0.1.1
\section intro_sec Introduction
Wednus Platform encapsulates the complexity of cross-browser support and
provides a robust browser-neutral web application platform. On top of the
Wednus kernel layer, the implementation of the Wednus Object Model, WOM,
provides standardized interface for Web(Web2.0) API controls such as Google's
GMap control and Amazon.com's book search API to end-users.
<hr>

\section support Supporting Browsers
<table border='0'><tr valign='bottom'>
<td align='center'><img src='../image/browser_logo/logo_ie.jpg'><b>IE</b> 5+</td>
<td align='center'><img src='../image/browser_logo/logo_firefox.jpg'><b>Firefox</b> 1+</td>
<td align='center'><img src='../image/browser_logo/logo_mozilla.gif'><b>Mozilla</b> 1+</td>
<td align='center'><img src='../image/browser_logo/logo_netscape.jpg'><b>Netscape</b> 6+</td>
<td align='center'><img src='../image/browser_logo/logo_opera.jpg'><b>Opera</b> 4+</td>
<td align='center'><img src='../image/browser_logo/logo_konqueror.gif'><b>Konqueror</b> 3+</td>
<td align='center'><img   src='../image/browser_logo/logo_safari.jpg'><b>Safari</b>312.0+</td>
<td align='center'><img src='../image/browser_logo/logo_ice.jpg'><b>IceBrowser</b></td>
</tr></table>

Wednus Platform requires following DOM methods:

<table border="1" cellspacing="0"><tr>
<th align="left" valign="top" width="30%">document Method</th><th align="left" valign="top" width="50%">Description</th>
<th align="left" valign="top" width="5%">IE</th>
<th align="left" valign="top" width="4%">Firefox</th>
<th align="left" valign="top" width="4%">Netscape</th>
<th align="left" valign="top" width="7%">W3C</th></tr>
<tr><td valign="top">createElement("tag")</td>
<td valign="top">Creates an element</td>
<td valign="top">5</td><td valign="top">1</td><td valign="top">6</td>
<td valign="top">Yes</td></tr>
<tr><td valign="top">getElementById()</td>
<td valign="top">Returns a reference to the first object with the specified ID</td>
<td valign="top">5</td><td valign="top">1</td><td valign="top">6</td>
<td valign="top">Yes</td></tr>
<tr><td valign="top">getElementsByTagName("tag")</td>
<td valign="top">Returns a collection of objects with the specified TAGNAME</td>
<td valign="top">5</td><td valign="top">1</td><td valign="top">6</td>
<td valign="top">No</td></tr></table>
@see http://www.w3schools.com/htmldom/dom_obj_document.asp

<hr>

\section install	Installation
Like all other Wednus Project products, installing Wednus Platform is quite an
easy task. Just follow these simple steps:

   - 1. Download the latest version at the following url:<br>
       http://sourceforge.net/project/showfiles.php?group_id=166745

   - 2. Uncompress the file, and you will see a directory named 'wednus_platform'

   - 3. Go into the 'wednus_platform/test' and run few samples<br>

@test    <a href='../../test/wednus.html'>testing constructor & member methods</a>
<hr>

\section diagram	Architecture
Wednus Platform comprises two parts; Wednus DKernel and Wednus Scavenger.
Wednus DKernel encapsulates the complexity of cross-browser support and provides
a robust browser-neutral web application foundation. On top of the that, Wednus
Scavenger contains the implementation of the Wednus Object Model, WOM, provides
standardized interface for Web(Web2.0) API controls such as Google's GMap
control and Amazon.com's book search API to end-users.
\image	html	platform.jpg
<hr>

\section author  Author
Sundew H. Shin<br>
Manager/Developer, <a href='http://wednus.com'>Wednus Project</a>
<hr>

\section license License
This section describes the license this destribution is destributed under. You
may choose an <a href='http://opensource.org/licenses/'>OSI Approved License</a>.
The most common option in Open Source today is the <a href='http://opensource.org/licenses/gpl-license.php'>GNU GPL</a>,
however, one of the most flexible is the <a href='http://opensource.org/licenses/artistic-license.php'>Artistic License</a>.
The Perl programming language is distributed under both licenses, which is
perfectly optional.
*/


/**
 *@defgroup dkernel Wednus DKernel
 *Browser-neutral DHTML Kernel Implementation
 */