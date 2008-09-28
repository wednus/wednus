/**
 * @defgroup    wed    WED, Wednus Extreme Debugger
 * @ingroup dkernel
 * These are various loaders with different purposes.
 * @{
 */


/**
 * (nothing fancy) alert error message
 * @param    where    indicate the place it occurred
 * @param    what    error message
 */
W.error = function(where, what){
    alert(what +'\n'+ where);
};



/**
 * Dump categories and members in a easy-to-understand string
 *
 * It designed for check the sanity of W.modules, the module library.
 */
W.modules.toString = function(){
    var str = '';
    for(var i in this){
        if(i != 'toString'){
            str += i +': ';
            for(var j = 0; j < this[i].length; ++j){
                str += this[i][j] +',';
            }
            str += ' | ';
        }
    }
    return str;
};


/**
 * Halt platform
 *
 * @param    isBroadcast    flag for enable displaying halting message
 */
W.halt = function(isBroadcast){
    var undefined;
    W = undefined;
    if(isBroadcast){
        document.write('Wednus Platform has halted.');
        document.write('<br><br>');
       	for(var i in window)
    		document.write(i +', ');
        document.close();
    }
};


/**
 * Returns HTML code representation of Wednus object tree
 * @return    html HTML code
 */
W.toString = function(){
    return document.body.innerHTML;
};

//! @}