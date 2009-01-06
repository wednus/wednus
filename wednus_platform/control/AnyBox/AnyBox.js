/**
 * \file AnyBox.js
 * \brief Creates HTML elements
 *
 * It creates any HTML elements in the WPS way.
 * @author    Sundew H. Shin
 * @see WSS
 * @todo    need to be revised
 */


/**
 * \brief    AnyBox Constructor
 *
 * This control will help you to create any HTML element very easily and quickly.
 * @param    tag    tag for a HTML Element
 * @param    wss    WSS(Wednus Styling System) valid string value
 * @todo    need to write an article about WSS
 * @bug applying style before WPS reveals the transition. object reveal at the original
 * place first and it moves to the position it supposed to be.  check CodeExample.html
 */
W.AnyBox = function(tag){var self = this;
  // control info.
  this.version = '0.0.2';
  this.name = 'AnyBox';

  this.tag = 'textbox';
  this.wps = '80%,80%,xcenter:0,ycenter:0';
  this.body = document.createElement('div');
  // construct the core element
  this.core = document.createElement(tag);

  // if the core itself is a visible widget, we need to append it to the body
  this.body.appendChild(this.core);
  //W.style(this.core, 'width:100%;height:100%');
  W.event(window, 'onload', addWidget);

  function addWidget(){
      // register this instance to WPS
      W.add(self);
  };
};


//! \cond   loadModules
// load external modules
W.module('scavenger');
//W.control('');
//! \endcond

//! \cond   namespace
// open a namespace for control variables
//W.c.AnyBox = {};
//W.c.AnyBox.id = '';
//! \endcond

// add sample codes (one for each comment block)
/**
 * @example AnyBox.html
 */

/**
 * @example CodeExample.html
 */

/**
 * @example rainbow.html
 */

/**
 * \mainpage
 * \section req Requirement
 *  - wednus_platform.js
 *  - wps.js
 *
 *<hr>
 *
 * \section intro_sec Introduction
 * This control will help you to create any HTML element very easily and quickly.
 * @test    <a href='../../test/AnyBox.html'>testing constructor & member methods</a>
 * @test    <a href='../../test/rainbow.html'>rainbow.html</a>
 *<hr>
 *
 * \section diagram Diagram
 * The core is an HTMLElement created by 'document.createElement' method with
 * the specified tag.
 * \image   html    diagram.jpg
 * <hr>
 *
 * \section usage   Usage
 * \subsection    include    1. Including
 * Add following line of code in script block.
 * \code
 * W.control('AnyBox');
 * \endcode
 *
 * \subsection  instant 2. Instantiate a control object
 * In either case, Wednus Platform will loadup the control, and now we can use the
 * control like this:
 * \code
 * var myTemp = new W.AnyBox([HTMLElement tag]);
 * \endcode
 *
 * \subsection  use 3. Using object
 * After the object creation, you can access public member properties and methods as
 * below.
 * \code
 * a.core.style.background = 'red';
 * \endcode
 *<hr>
 *
 * \section code    Code Example
 * This example will create red squire box(width:200, height:200, top:200, left:200).
 * \code
 * <script type='text/javascript'>
 * W.control('AnyBox');
 * </script>
 *
 * <script type='text/javascript'>
 * var a = new W.AnyBox('div');
 * a.wps = '200,200,left:200,top:200';
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