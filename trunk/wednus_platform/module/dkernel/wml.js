/**
 * \file wml.js
 * This file contains the methods implementing the WML.
 */

/**
 * @defgroup wml loaders
 * @ingroup dkernel
 * The group of methods of the WML, Wednus Module Loaders.
 * @{
 */

/**
 * Reserved namespace for c (control) specific variables
 */
 W.c = {};


/**
 * Reserved namespace for wednus a (applications)
 */
 W.a = {};


/**
 * Reserved namespace for user variables
 */
 W.u = {};


/**
 * JS loader interface - user library loader.
 *
 * It loads user JS library. It loads up one of multiple controls to the platform.
 * @param   subpath relative path after platform installation path(W.path)
 * @param   name    name(s) of the library(s)
 * @note    It supports batch processing
 * @see    W.load
 */
W.include = function(subpath, name){
    this.load(subpath, name, 'include');
};


/**
 * CSS loader interface
 *
 * This function loads a CSS resource existing under the platform root.
 * @param    subpath    path on top of W.path
 * @param    name    CSS filename
 * @warning It doesn't check any duplicated loadings.
 */
W.include_css = function(subpath, name){
    this.css(this.path + subpath + '/'+ name +'.css');
};


/**
 * JS loader interface - control(user module) loader.
 *
 * This is the user module(control) loader. It loads up one of multiple controls to
 * the platform.
 * @note    it supports batch processing
 * @param    name    name(s) of the control(s)
 * @see    W.load
 * @todo    mutiple modules loading from a control folder
 * @todo    remote loading version.  W.control('XParser', 'http://wednus.com/WServer/XParser');
 */
W.control = function(name){
    this.load('control/'+ name, name, 'control');
};


/**
 * JS loader interface - system module loader.
 *
 * This is the system module loader. As you can see from the example below,  It
 * can load multiple modules of the same library category and register the names
 * to 'W.modules', the loaded module library. For user module(control) loading,
 * please use 'W.control' method instead.
 * @code    W.module('DOM', 'Element,elements');
 * @endcode
 * This will load up the 'Element' and 'elements' modules of the 'DOM' library
 * category on the platform.
 * @code    W.module('wednus_wom,wednus_debug');
 * @endcode
 * This will load up the 'wednus_wom' and 'wednus_debug' modules from the root
 * 'include/' directory.
 * @note    W.include and W.require functions are virtually similar in their function
 * except for the way they handle an irretrievable resource. W.include and provide
 * a warning if the resource cannot be retrieved and try to continue execution of
 * the program if possible. W.require provide stop processing the page if it cannot
 * retrieve the resource.
 * @param    lib    library name (or 'wednus_*' module name when 'mNames' is not passed)
 * @param    mNames    list of module names
 * @see    W.modules, W.load
 */
W.module = function(name){
    this.load('module/'+ name, name, 'module');
};


/**
 * Load snippet
 *
 *@param  name name of snippet
 */
W.snippet = function(name){
    this.load('snippet/'+ name, name, 'snippet');
};


/**
 * JS loader interface - wednus application loader.
 *
 * It loads user JS library. It loads up one of multiple controls to the platform.
 * @param   subpath relative path after platform installation path(W.path)
 * @param   name    name(s) of the library(s)
 * @note    It supports batch processing
 * @see    W.load
 */
W.app = function(name, args){
    this.load('app/'+ name, name, 'app');
    this.event(window, 'onload', function(){W.a[name](args);});
};

/**
 * @}    // end of loader group
 */