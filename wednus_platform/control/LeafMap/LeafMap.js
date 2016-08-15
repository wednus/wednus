/**
 * \file LeafMap.js
 * This file defines the LeafMap class.
 *
 * Leaflet map app porting
 * @author Sundew Shin
 * @todo add more built-in features
 * @note recommed using Mapbox service for prettier custom map layers
 * @see http://leafletjs.com/
 */


/**
 * LeafMap Constructor
 *
 * (longer description of this function)
 * @param    args    argument object
 */
W.LeafMap = function(args){args = args?args:{}; var self = this;
  // control info.
  this.name = 'LeafMap';
  this.version = '0.0.1';

  // handle arguments
  this.wps = '80%,80%,xcenter:0,ycenter:0';

  this.body = W.style('div');
  
  // prepare instantial chart-container for multiple charts on screen
  var containerName = 'chart-container_'+ Date.now();
  this.body.id = containerName;
  //this.body.setAttribute('id', containerName);
  this.core = W.style('div', 'green');
    
  // [Event Forwarding]
  // forward events for construction-time overriding
  this.events = 'onclick,onmouseout,onmouseover'.split(',');
  for(var i = 0; i < this.events.length; ++i){
    // 'this.on*' run 'this.on*_default' by default
    this.body[this.events[i]] = this[this.events[i]];
    // forward 'this.body.on*' to 'this.on*'
    this[this.events[i]] = this['default_'+ this.events[i]];
  }
  // [Property Injection on Construction-time]
  // property injection: extend/override constructor w/ passed args object
  for(var i in args)
    eval('this.'+ i +' = args["'+ i +'"];');

  this.markers = [];


  // *will be called once when window.onload fires
  // cond: it needs to be added to WPS by 'W.add'
  this.onload = function(){
    self.core = L.map(containerName).setView(args.center, args.zoom);
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
			maxZoom: args.maxZoom,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'mapbox.streets'
		}).addTo(self.core);
    // add marker(s)
    for(var i = 0; i < args.marker.length; ++i) self.markers.push(addMarker(args.marker[i]));

    //marker=[longitude, latitude, (message), (visible), (class icon)], where () is optional 
    function addMarker(marker){
      var tmp;
      // check custom icon
  		if(marker.length < 5){
  		  tmp = L.marker([marker[0],marker[1]]);
  		}else{
        tmp = L.marker([marker[0],marker[1]], {icon: marker[4]});
  		};
  		tmp.addTo(self.core);
      if(marker.length == 2) tmp.bindPopup(marker.toString());
      if(marker.length >= 3) tmp.bindPopup(marker[2]);
  		if(marker.length >= 4 && marker[3]) tmp.openPopup();
  		return tmp;
    };

		function onMapClick(e) {
			L.popup()
				.setLatLng(e.latlng)
				.setContent("You clicked the map at " + e.latlng.toString())
				.openOn(self.core);
		}

		self.core.on('click', onMapClick);
		
  };
  W.add(this);
};


//! \cond   loadModules
// load external modules
//W.js();
W.include_css('control/LeafMap/lib', 'leaflet');
//W.load();
W.module('scavenger');
W.include('control/LeafMap/lib', 'leaflet');
//W.control('');
//! \endcond

//! \cond   namespace
// open a namespace for control variables
//W.c.LeafMap = {};
//W.c.LeafMap.id = 0;
//! \endcond

// add sample codes (one for each comment block)
/**
 * @example LeafMap.html <a href='../../test/LeafMap.html'>Run this code</a>
 */

/**
 * @example CodeExample.html <a href='../../test/CodeExample.html'>Run this code</a>
 */


/**
 * \mainpage
 *
 * \section intro_sec Introduction
 * (give an introduce and purpose of this control here)
 * @test <a href='../../test/LeafMap.html'>LeafMap.html</a> (unit tests)
 *<hr>
 *
 * \section req Requirement
 * - wednus.js
 *
 *<hr>
 *
 * \section structure Structure
 * LeafMap is a type1 control.
 * <br>(we highly recommend you to use <a href='http://www.umlet.com/'>UMLet</a> for <a href='http://eclipse.org'>Eclipse</a> env.)
 * \image   html    diagram.jpg
 * <hr>
 *
 * \section usage   Usage
 * \subsection    include    1. Including
 * Add following line of code in script block.
 * \code
 * W.control('LeafMap');
 * \endcode
 * <br>
 * \subsection  instant 2. Instantiate a control object
 * In either case, Wednus Platform will loadup the control, and now we can use the
 * control like this:
 * \code
 * var myLeafMap = new W.LeafMap();
 * \endcode
 * @param args (param desc. goes here)
 *
 * <br>
 * \subsection  use 3. Using object
 * After the object creation, you can access public member properties and methods as
 * below.
 * \code
 * alert(myLeafMap.name);
 * \endcode
 *<hr>
 *
 * \section code    Code Example
 * This example will print 'control name: LeafMap', the name of this control.
 * \code
 * <script type='text/javascript'>
 * W.control('LeafMap');
 * </script>
 *
 * <script type='text/javascript'>
 * var myLeafMap = new W.LeafMap();
 * document.write('control name: '+ myLeafMap.name);
 * </script>
 * \endcode
 *
 * @test    <a href='../../test/CodeExample.html'>CodeExample.html</a>
 * @warning Do NOT merge script blocks into one because each block is
 * closure.
 *
 * <hr>
 *
 * \section author Author
 * (your name & contact info)
 *<hr>
 *
 * \section license License
 * This section describes the license this destribution is destributed under. You
 * may choose an <a href='http://opensource.org/licenses/'>OSI Approved License</a>.
 * The most common option in Open Source today is the <a href='http://opensource.org/licenses/gpl-license.php'>GNU GPL</a>,
 * however, one of the most flexible is the <a href='http://opensource.org/licenses/artistic-license.php'>Artistic License</a>.
 * The Perl programming language is distributed under both licenses, which is
 * perfectly optional.
 */

  /**
 * \page release Release Note
 * \section v0_0_1 v0.0.1
 * - (please list version info here)
 */