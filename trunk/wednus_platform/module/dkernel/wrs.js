/**
 * \file wrs.js
 * This file contains the methods for remote scripting.
 *
 * 'Remote Scripting' is the technique that machine A remotely fetches and uses
 * script files on machine B. This module empowers the Wednus platform to be able
 * to load extension packs remotely.
 * @note    supports IE5+
 * @see http://ajaxpatterns.org/On-Demand_Javascript
 * @see	http://developer.yahoo.com/javascript/howto-proxy.html
 * @see	http://ajaxpatterns.org/On-Demand_Javascript
 * @see	http://ajaxpatterns.org/IFrame_Call
 * @see	http://www.theurer.cc/blog/2005/12/15/web-services-json-dump-your-proxy/
 * @author    Sundew H. Shin
 * \example rscript.html
 */

/**
 * @defgroup wrs remote scriptors
 * @ingroup dkernel
 * The group of methods of the WRS, Wednus Remote Script.
 * @todo compare with 'jump.onreadystatechange = function(){if(this.readyState == 'complete') run();}; '
 * @{
 */
W.loader = document.createElement('iframe');


/**
 * Text resource loader
 */
W.request = function(url, callback){
  var jump = this.loader;
  //jump.src = 'http://api.local.yahoo.com/MapsService/V1/geocode?appid=YahooDemo&street=701+First+Street&city=Sunnyvale&state=CA';
  jump.src = url;
    jump.onload = function(){
      var data = jump.contentDocument?jump.contentDocument.body.innerHTML:
      jump.contentWindow.document.body.innerHTML;
      // strip off '<pre>' tag
      data = data.replace(/(<([^>]+)>)/ig,"");
      // return to callback
      if(callback != null)
        callback(data);
    };
};


W.proxy_url = 'http://wednus.com/wednus_platform/module/dkernel/test/wrs/wrs.php';
W.proxy = function(url, callback){
  if(!callback)
    callback = '';
  W.js(W.proxy_url +'?callback='+ callback +'&url='+ escape(url));
};


W.opener = document.createElement('iframe');
/**
 * Open a document
 */
W.open = function(url){
  if(!this.opener.isStarted){
  W.style(W.opener, 'width:100%;height:'+ W.height +'px;display:block');
  // IE iframe height issue: no 100%
    W.event(window, 'onresize', function(){
      W.refresh();
      W.opener.style.height = W.height +'px';
    });
    this.opener.isStarted = true;
  }

  var isLoaded = false;
  W.opener.src = W.path +'module/dkernel/lib/loading.html';
  W.opener.onload = function(){load();};
  // forgot what was this for
  W.opener.onreadystatechange = function(){
    if(this.readyState == 'complete')
      load();
  };

  function load(){
    if(!isLoaded){
      W.opener.src = url;
      isLoaded=true;
    }
  };
};


W.close = function(){
  W.opener.style.display = 'none';
  W.opener.isStarted = false;
};


W.wrap = function(obj){
  var wrapper = document.createElement('div');
  wrapper.id = '_wednus_wrapper_';
  W.style(wrapper, 'position:absolute;width:100%;height:100%;display:block;overflow:auto;');
  wrapper.appendChild(obj);
  document.body.appendChild(wrapper);
};


W.write = function(str){
  W.style(W.body, 'width:100%;height:100%;position:absolute;overflow:auto;');
  W.body.innerHTML = str;
};
//! @}


//! \cond    attachDum
// prepare Wednus object root and attach queued objects
// @todo    compare to http://developer.apple.com/internet/webcontent/iframe.html
// @todo    when there is no file, 'Not Found' returns which is not valid javascript
// @todo    better tag stripper
(function(){
  //document.getElementById('_wednus_platform_').appendChild(W.loader);
  W.loader.style.display = 'none';

  W.loader.id = W.loader.name = '_wednus_platform_loader_';
  W.body.appendChild(W.loader);
  // solve IE targeting problem
  if(top[W.loader.id])
    top[W.loader.id].name = W.loader.name;

  // prepare opener
  W.opener.frameBorder = '0';
  W.opener.isStarted = false;
  W.style(W.opener, 'position:absolute;top:0px;left:0px;width:0px;height:0px;display:none');
  W.body.appendChild(W.opener);
})();
//! \endcond