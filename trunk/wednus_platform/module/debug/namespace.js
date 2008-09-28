
/**
 * List of the default namespaces  under 'window' (comma splited)
 */
W.names = '';


/**
 * Pool for backuped namespaces
 */
W.namespaces = {};


/**
 * It checks namespace confliction.
 */
W.checkNS = function(isDebug){
    var newNames = '';
    // BUG: THis thing doesn't work in IE
    for(var i in window){
        // search W.names string
        if(!this.names.match(i +',')){  // mask out default namespaces under 'window'
            if(this.namespaces[i]){
                if(!isSame(this.namespaces[i], window[i])){
                    mesg('namespace confliction detected.', 'namespace: '+ i);
                    break;
                }//else alert('namespace, '+ i +' has conflicted.\nregistered:'+ this.namespaces[i] +'\nnew:'+ window[i]);
            }else{
                newNames += i;
                newNames += ',';
                this.namespaces[i] = window[i];
            }
        }//else alert(i +' - exist');
    }
    if(newNames != '')
        mesg('namespace introduced', 'new namespaces: '+ newNames);

    function mesg(title, message){if(!isDebug) return; alert('[WEDNUS] '+ title +':\n\n'+ message);};
    function isSame(source, target){
    	if(typeof source != typeof target){
    	    _alert(source, target);
    		return false;
    	}
    	// base case
    	if(typeof source != 'object'){
    	    if(source +'' != target +'')
    	       _alert(source, target, 'defferent value');
    		return source +'' == target +'';
    	}
    	// n-cases
    	// fix http://wednus.com/imod/viewtopic.php?p=2926
        try{
	        for(var i in source){
	        	if(typeof source[i] == 'object')
	        		return isSame(source[i], target[i]);
	        	if(source[i] +'' != target[i] +''){
	        	    _alert(source[i], target[i], 'defferent value');
	        		return false;
	        	}
	        }
        }catch(e){};
        return true;

        // for debugging
        function _alert(a, b, mesg){
            alert('[WEDNUS] namespace confliction detected.');
            alert('reason: '+ mesg +'\n\n[source]\n'+ a +'\n\n[target]\n'+ b);
        };
    };
};