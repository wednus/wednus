/**
 * \file WGMap.js
 * \brief   This is a wednusified GMap API.
 *
 * @author   Sundew H. Shin
 * @see    http://www.google.com/apis/maps/
 */


/**
 * \brief    WGMap Constructor
 *
 * prepare '.body', the presentation layer Wednus can recognize and construct
 * a GMap object.
 */
W.WGMap = function(){var self = this;
 	if(!GBrowserIsCompatible()){
 	    alert('Sorry,\nYou either have no valid GMap key or Google Map does not support this browser though Wednus Platform does.');
 	    return;
 	}
    this.core = {}; // it will be assigned when W.ready
    this.body = document.createElement('div');
    W.event(window, 'onload', addMap);

    function addMap(){
        W.add(self);
   		self.core = new GMap(self.body);
   		self.core.centerAndZoom(new GPoint(-122.1419, 37.4419), 4);
    }
};


//! \cond    loadModules
// Load the GMap engine(remote)
W.c.WGMap = {};
W.c.WGMap.key = 'ABQIAAAA03ZOZ6fLoh0uVJ65IOW3xRT2yXp_ZAY8_ufC3CFXhHIE1NvwkxRTZd5iunEbnfpa6qZ4XBVkQbg72Q';
W.js('http://maps.google.com/maps?file=api&v=1&key='+ W.c.WGMap.key);
W.module('scavenger');
//! \endcond


// add sample codes (one for each comment block)
/**
 * @example WGMap.html
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
 * 'W.c.WGMap.key' in WGMap.js as:
 * \code
 * W.c.WGMap.key = 'ABQIAAAA03ZOZ6fLoh0uVJ65IOW3xRT2yXp_ZAY8_ufC3CFXhHIE1NvwkxRTZd5iunEbnfpa6qZ4XBVkQbg72Q';
 * \endcode
 * @note    For testing using a local webserver, you may use the following key for
 * 'http://localhost':
 * ABQIAAAA03ZOZ6fLoh0uVJ65IOW3xRT2yXp_ZAY8_ufC3CFXhHIE1NvwkxRTZd5iunEbnfpa6qZ4XBVkQbg72Q
 * @see    To claim a GMap API key, you need to go http://www.google.com/apis/maps/signup.html
 * @test    <a href='../../test/WGMap.html'>testing constructor & member methods</a>
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
 * W.control('WGMap');
 * \endcode
 *
 * \subsection  instant 2. Instantiate a control object
 * In either case, Wednus Platform will loadup the control, and now we can use the
 * control like this:
 * \code
 * var myTemp = new W.WGMap();
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
 * W.control('WGMap');
 * </script>
*
 * <script type='text/javascript'>
 * var map = new W.WGMap();
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