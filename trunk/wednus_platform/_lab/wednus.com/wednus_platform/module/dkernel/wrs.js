/**
 * \file   wrs.js
 * This equips the platform remote scripting
 *
 * 'Remote Scripting' is the technique that machine A remotely fetches and uses
 * script files on machine B. This module empowers the Wednus platform to be able
 * to load extension packs remotely.
 * @note    supports IE5+
 * @todo    check http://ajaxpatterns.org/On-Demand_Javascript
 * @author    Sundew H. Shin
 * \example rscript.html
 */

/**
 * @defgroup    wrs    WRS, Wednus Remote Scripter
 * @ingroup dkernel
 * These are various loaders with different purposes.
 * @todo compare with 'jump.onreadystatechange = function(){if(this.readyState == 'complete') run();}; '
 * @{
 */
W.loader = document.createElement('iframe');

W.request = function(url, callback){
	var jump = this.loader;
	jump.src = url;
        jump.onload = function(){
        var data = jump.contentDocument?jump.contentDocument.body.innerHTML:
        jump.contentWindow.document.body.innerHTML;
        // strip off '<pre>' tag
        data = data.replace(/(<([^>]+)>)/ig,"");
        // return to callback
        callback(data);
    };
};


// http://www.thescripts.com/forum/thread160118.html
W.fwrite = function(frame, msg, bground){

    frame.src = 'data:application/xhtml+xml,' + '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en"><head>'
        +'</head>'
        +'<body style="margin:0px;padding:0px;background:'+ (bground?bground:'') +';">'
        + msg + frame.id +'</body></html>';

};
//! @}


//! \cond    attachDum
// prepare Wednus object root and attach queued objects
// @todo    compare to http://developer.apple.com/internet/webcontent/iframe.html
// @todo    when there is no file, 'Not Found' returns which is not valid javascript
// @todo    better tag stripper
(function(){
    //W.loader.style.display = 'none';
    document.getElementById('_wednus_platform_').appendChild(W.loader);
})();
//! \endcond
