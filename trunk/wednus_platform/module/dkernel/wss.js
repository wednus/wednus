/**
 * @defgroup wss stylers
 * @ingroup dkernel
 * The group of methods of the WSS, Wednus Styling System
 * @todo    need to write an article about WSS
 * @{
 */

/**
 * Apply styling
 *
 * @warning If you have registered an object on WPS changing top/left/width/height
 * will not give any effect, since WPS manages those property of the object once
 * it become registered.
 * @param {Object} obj the target object
 * @param {String} wss    WSS(Wednus Styling System) valid string value
 * @return {Object} object after style application
 * @note apply property/style change
 * \code
 * obj.style.top = '10px';
 * obj.style.left = '12px';
 * obj.style.width = '100%';
 * obj.style.height = '100%';
 * obj.style.position = 'absolute';
 * \endcode
 * This block of code can be written in one line.
 * \code
 * W.style(obj, 'top:10px;left:12px;width:100%;height;position:absolute');
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
 * W.style(obj, 'top:100px;left;width;height');
 * \endcode
 * @todo    maybe just set the style text?
 * @see http://www.irt.org/xref/style.htm
 */
W.style = function(obj, wss){
  // if the argument is a string, treat as a HTML-tag and create an object
  if(typeof obj == 'string')
    obj = document.createElement(obj);
  var s = obj.style;
  var tmp, latestProp;
  if(!wss) return obj;
  wss = wss.split(';');
  for(var i = 0; i < wss.length; ++i){
    tmp = wss[i].split(':');
    if(typeof tmp[1] == 'undefined'){
      s[tmp[0]] = latestProp;
    }else s[tmp[0]] = latestProp = tmp[1];
  }
  return obj;
};

/**
 * @}  // end of wss
 */
