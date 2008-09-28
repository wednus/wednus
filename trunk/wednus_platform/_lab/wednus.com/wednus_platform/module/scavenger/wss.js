/**
 * @defgroup    wss    WSS, Wednus Styling System
 * @ingroup scavenger
 * The implementation of the WSS, Wednus Styling System
 * @todo    need to write an article about WSS
 * @{
 */

/**
 * Apply styling
 *
 * apply property/style change
 * \code
 * obj.id = 'myObj';
 * obj.border = '3px';
 * obj.style.top = '10px';
 * obj.style.left = '12px';
 * obj.style.width = '100%';
 * obj.style.height = '100%';
 * obj.style.position = 'absolute';
 * \endcode
 * This block of code can be written in one line.
 * \code
 * W.style(obj, 'id:myObj;border:3px|top:10px;left:12px;width:100%;height;position:absolute');
 * \endcode
 * notice the part 'height;'. When there is no value specified, WSS uses the latest
 * value used.
 * for example,
 * \code
 * obj.style.top = '100px';
 * obj.style.left = '100px';
 * obj.style.width = '100px';
 * obj.style.height = '100px';
 * \endcode
 * can be reduced as:
 * \code
 * W.style(obj, '|top:100px;left;width;height');
 * \endcode
 * @warning If you have registered an object on WPS changing top/left/width/height
 * will not give any effect, since WPS manages those property of the object once
 * it become registered.
 * @param    obj    the target object
 * @param    wss    WSS(Wednus Styling System) valid string value
 * @return  object after style application
 * @todo    maybe just set the style text?
 */
W.style = function(obj, wss){
    if(typeof wss == 'undefined') return -1;
    // apply WSS setting
    wss = wss.split('|');
    if(wss[0] != '')
        applyChange(wss[0], false);
    if(typeof wss[1] != 'undefined')
        applyChange(wss[1], true);

    function applyChange(wss, isStyle){
        var tmp, latestProp, target;
        if(isStyle){
            target = obj.style;
        }else target = obj;

        var styles = wss.split(';');
        for(var i = 0; i < styles.length; ++i){
            tmp = styles[i].split(':');
            if(typeof tmp[1] == 'undefined'){
                //alert('property missing for '+ wss);
                target[tmp[0]] = latestProp;
            }else target[tmp[0]] = latestProp = tmp[1];
        }
    };

    return obj;
};
/**
 * @}  // end of wss
 */
