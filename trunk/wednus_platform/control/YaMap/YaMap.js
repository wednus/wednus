/**
 * \file YaMap.js
 * \brief   This is a wednusified Yahoo map API.
 *
 * @author   Sundew H. Shin
 * @see	http://com2.devnet.scd.yahoo.com/maps/ajax/v2start.html
 * @see	http://com2.devnet.scd.yahoo.com/maps/ajax/V2/reference.htm
 * @see   http://developer.yahoo.com/maps/ajax/index.html
 * @see	http://developer.yahoo.com/javascript/howto-proxy.html
 */


/**
 * \brief    YaMap Constructor
 *
 * prepare '.body', the presentation layer Wednus can recognize and construct
 * a Yahoo map object.
 * @todo   support map.addPanControl(), map.addZoomLong()
 * @see	http://developer.yahoo.com/common/json.html
 */
W.YaMap = function(location, callback){var self = this;
	this.location = location;
    // it will be assigned at runtime
    this.core = {};
    this.body = document.createElement('div');	
    // zoom level: 1-16
    this.zoom = 3;
    W.event(window, 'onload', addMap);

    function addMap(){
        if(!YMap || !YGeoPoint){
            alert('Sorry,\nYou either have no Internet connection now or the URL for the Yahoo Map API has changed.');
            return;
        }
        W.add(self);
        // create a map object
        self.core = new  YMap(self.body);
        //add controls
		self.core.addPanControl();
		self.core.addZoomShort();
		//alert(self.core.convertXYLatLon(new YCoordPoint(10,10)));
	    //self.core.addMarker(new YMarker(), 0);
	    // display the map centered on a latitude and longitude
	    self.core.drawZoomAndCenter(self.location, self.zoom);

    	// sync map size
    	W.event(window, 'onresize', function(){self.core.resizeTo(new YSize(parseInt(self.body.style.width), parseInt(self.body.style.height)))});
    };
};


//! \cond    loadModules
// Load the Yahoo map AJAX API engine(remote)
W.c.YaMap = {};

// Change this value with your 'appid' registered to Yahoo.
W.c.YaMap.appId = 'wednus_platform';

W.js('http://api.maps.yahoo.com/ajaxymap?v=2.0&appid='+ W.c.YaMap.appId);
W.module('scavenger');
//! \endcond


// add sample codes (one for each comment block)
/**
 * @example YaMap.html
 */

/**
 * @example CodeExample.html
 */


/**
 * \mainpage
 * \section req Requirement
 *  - wednus.js
 *  - wps.js
 *  - wom.js
 *  - <a href='http://www.google.com/apis/maps/signup.html'>GMap API key</a>
 *
 *<hr>
 *
 * \section intro_sec Introduction
 * This control is a simple wednusified version of GMap API.  To use this control on
 * your domain, you need to get a GMap API key and set the value of the variable
 * 'W.c.YaMap.key' in YaMap.js as:
 * \code
 * W.c.YaMap.key = 'ABQIAAAA03ZOZ6fLoh0uVJ65IOW3xRT2yXp_ZAY8_ufC3CFXhHIE1NvwkxRTZd5iunEbnfpa6qZ4XBVkQbg72Q';
 * \endcode
 * @note    For testing using a local webserver, you may use the following key for
 * 'http://localhost':
 * ABQIAAAA03ZOZ6fLoh0uVJ65IOW3xRT2yXp_ZAY8_ufC3CFXhHIE1NvwkxRTZd5iunEbnfpa6qZ4XBVkQbg72Q
 * @see    To claim a GMap API key, you need to go http://www.google.com/apis/maps/signup.html
 * @test    <a href='../../test/YaMap.html'>testing constructor & member methods</a>
 *<hr>
 *
 * \section diagram Diagram
 * \image   html    diagram.jpg
 * <hr>
 *
 * \section usage   Usage
 * \subsection    include    1. Including
 * Add following line of code in script block.
 * \code
 * W.control('YaMap');
 * \endcode
 *
 * \subsection  instant 2. Instantiate a control object
 * In either case, Wednus Platform will loadup the control, and now we can use the
 * control like this:
 * \code
 * var myTemp = new W.YaMap();
 * \endcode
 *
 * \subsection  use 3. Using object
 * After the object creation, you can access public member properties and methods as
 * below.
 * \code
 * alert(myTemp.name);
 * \endcode
 *<hr>
 *
 * \section code    Code Example
 * This example will add a fullsized('100%,100%') map.
 * \code
 * <script type='text/javascript'>
 * W.control('YaMap');
 * </script>
*
 * <script type='text/javascript'>
 * var map = new W.YaMap();
 * map.wps = '100%,100%,left:0,top:0';
 * </script>
 * \endcode
 *
 * @test    <a href='../../test/CodeExample.html'>CodeExample.html</a>
 * @warning Do not merge the two script blocks into one because the control
 * should need to be fully loaded before any use.
 *
 * <hr>
 *
 * \section author  Author
 * Sundew H. Shin<br>
 * Manager/Developer, <a href='http://wednus.com'>Wednus Project</a>
 *<hr>
 *
 * \section license License
 * <a href='http://opensource.org/licenses/gpl-license.php'>GNU GPL</a>
 */