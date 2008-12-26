/**
 * \file wes.js
 * This file contains the methods of the WES.
 */

/**
 * @defgroup  wes event managers
 * @ingroup dkernel
 *  The group of methods of the WES, Wednus Event System.
 * @{
 */

/**
 * Pool for registered event listeners
 */
W.events = {};


/**
 * WES implementation
 *
 * This function adds an event to the corresponding event library queue and
 * sequentially executes registered event handlers when the target event fires.
 * For example, the following line of code will add an event listener named
 * 'myFunc' to the window.onload with its args, the argument set.
 * \code
 * W.event(window, 'onload', myFunc, args);
 * \endcode
 * @param   source  the source object of this event
 * @param   event   the target event
 * @param   func    the function object to be added
 * @param   arg1    the first argument
 * @todo    more than one argument?  -> object argument
 * @todo    isOneTimeOnly flag
 * @todo    compare w/ http://www.openjsan.org/doc/a/au/autarch/DOM/Ready/0.13/lib/DOM/Ready.html
 * @todo    check the possibility of running functions in 'body' tag area
 * @note  more straight forward then using either window.addEventListener or
 * window.attachEvent
 */
W.event = function(source, evt, func, arg1){
  var task;
  // create a new library for this object if there no exist yet.
  if(!W.events[source])
    W.events[source] = {};
  if(!W.events[source][evt]){
    // create a new library for this event if there no exist yet.
    W.events[source][evt] = [];
    // extend the original event handler
    source[evt] = function(e){
      // execute reserved tasks
      for(var i = 0; i < W.events[source][evt].length; ++i){
        task = W.events[source][evt][i];
        // BUG: Error on firefox, onresize
				if(typeof task[1] != 'undefined'){
          task[0](task[1]);
			  }else if (typeof e != 'undefined'){ // handle document.onkeydown
					task[0](e);
				}
      }
    };
  }
  W.events[source][evt][W.events[source][evt].length] = [func, arg1];
};
/**
 * @}  // end of wes
 */