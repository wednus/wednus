
W.dump = function(obj){
    for(var i in obj){
	   document.write('['+ i +']<br>'+ obj[i]);
	   document.write('<br><br>');
    }
    document.close();
};


/**
 * Dump all the properties of an object
 *
 * It traverses the given object properties and prints nice prop.name-value table.
 * @param    obj    target object
 * @return    serialized string of the object in pretty table
 */
W.dumpobj = function(obj){
    var c = '<table style="color:#000000;background-color:#f1f1f1;font-size:10px;';
    c += 'font-family:Tahoma,verdana,arial" cellspacing="0" border="1" width="100%" ';
    c += 'cellpadding="3"><tr><th align="left" valign="top">Property</th>';
    c += '<th align="left" valign="top">Value</th></tr>';
    for(var i in obj)
        if(i != 'innerHTML' && i != 'outerHTML' && i != 'filters'){
            c += '<tr><td>'+ i +'</td><td>'+ obj[i] + '&nbsp;</td>';
        }
    c += '</table>';
    return c;
};