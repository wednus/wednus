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


// event hanlder for window.error
W.onerror = function (msg, url, linenumber, sysMsg){
  var message = '[WEDNUS] ';
  if(typeof sysMsg == 'undefined') message += 'An Internal Error Detected.\n\n\n';
  else message = sysMsg +'\n\n\n';
  message += 'Error: '+ msg +'\n\nLocation: '+url+' (Line:'+linenumber+')\n\n';
  alert(message);
  return true;
};
//window.onerror = W.onerror;


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
        /*
        document.write('<br><br>');
        for(var i in window)
          document.write(i +', ');
        document.close();
        */
    }
};


/**
 * Return HTML code representation of Wednus object tree
 * @return    html HTML code
 */
W.html = function(){
    return this.root.innerHTML;
};

//! @}