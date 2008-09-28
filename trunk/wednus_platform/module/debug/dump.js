/**
 * Dump all the properties of an object
 *
 * It traverses the given object properties and prints nice prop.name-value table.
 * @param    obj    target object
 * @return    serialized string of the object in pretty table
 */
W.dump = function(obj){
    var c = '<table style="color:#000000;background-color:#F5F5F5;font-size:10px;';
    c += 'font-family:Tahoma,verdana,arial" cellspacing="0" border="1" width="100%" ';
    c += 'cellpadding="3"><tr style="background:white;"><th align="center">Property</th>';
    c += '<th align="center">Value</th></tr>';
    for(var i in obj){
        try{
            c += '<tr><td>'+ i +'</td><td>'+obj[i] + '&nbsp;</td>';
        }catch(e){
            c += '<tr><td>'+ i +'</td><td>error: '+ e + '&nbsp;</td>';
        };
    }
    c += '</table>';
    document.write(c);
    document.close();
    return c;
};


/**
 * Dump property/value list
 *
 * @return  string of data dump 
 */
W.dumpProp = function(obj){
    var str = '';
    for(var i in obj){
        try{
	        str += '['+ i +']<br>'+ obj[i] +'<br><br>';
	    }catch(e){};
    }
    document.write(str);
    document.close();
    return str;
};