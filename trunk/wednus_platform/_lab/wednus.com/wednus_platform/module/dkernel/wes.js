/**
 * @defgroup    wes    WES, Wednus Event System
 * @ingroup dkernel
 *  The implementation of the WES, Wednus Event System.
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
 * For example, the following line of code will add an event listener named 'myFunc'
 * to window.onload with its argument set, args.
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
 */
W.event = function(source, event, func, arg1){
    var task;
    // create a new library for this object if there no exist yet.
    if(!W.events[source])
        W.events[source] = {};
    if(!W.events[source][event]){
        // create a new library for this event if there no exist yet.
        W.events[source][event] = [];
        // extend the original event handler
        source[event] = function(){
            // execute reserved tasks
            for(var i = 0; i < W.events[source][event].length; ++i){
                task = W.events[source][event][i];
                // BUG: Error on firefox, onresize
                task[0](task[1]);
            }
        };
    }
    W.events[source][event][W.events[source][event].length] = [func, arg1];
};
/**
 * @}  // end of wes
 */