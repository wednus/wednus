/**
 * \file PP.js
 * \brief This is the PP (Power Presentation) control definition.
 *
 * (longer description goes here)
 * @author    (your name)
 * @todo    NEED TO UPDATE
 * @see http://plugins.yme.music.yahoo.com/plugins/docs/webquickstart_page.html
 */


/**
 * \brief    PP Constructor
 *
 * (longer description of this function)
 * @param    urls	  string of media url(s)
 */
W.PP = function(url){var self = this;
  this.wps = '80%,80%,xcenter:0,ycenter:0';
  this.body = document.createElement('div');
  this.core = document.createElement('img');
  this.core = new Image();
  this.core.src = url;
  this.width = this.core.width;
  this.height = this.core.height;
  W.event(window, 'onload', addWidget);

  function addWidget(){
    W.add(self);
  };
};


//! \cond   loadModules
// load external modules
//W.css();
//W.load();
//W.module();
W.module('scavenger');
//W.control('');
//! \endcond

//! \cond   namespace
// open a namespace for control variables
//W.c.ImageBox = {};
//W.c.ImageBox.id = 0;
//! \endcond

// add sample codes (one for each comment block)
/**
 * @example ImageBox.html
 */

/**
 * @example CodeExample.html
 */


/**
 * \mainpage
 * \section req Requirement
 *  - wednus.js
 *
 *<hr>
 *
 * \section intro_sec Introduction
 * (give an introduce and purpose of this control here)
 * @test    <a href='../../test/ImageBox.html'>testing constructor & member methods</a>
 *<hr>
 *
 * \section diagram Diagram
 * We highly recommend you to use <a href='http://www.umlet.com/'>UMLet</a> under <a href='http://eclipse.org'>Eclipse</a> environment.
 * \image   html    diagram.jpg
 * <hr>
 *
 * \section usage   Usage
 * \subsection    include    1. Including
 * Add following line of code in script block.
 * \code
 * W.control('ImageBox');
 * \endcode
 *
 * \subsection  instant 2. Instantiate a control object
 * In either case, Wednus Platform will loadup the control, and now we can use the
 * control like this:
 * \code
 * var myTemp = new W.ImageBox();
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
 * This example will print 'control name: ImageBox', the name of this control.
 * \code
 * <script type='text/javascript'>
 * W.control('ImageBox');
 * </script>
 *
 * <script type='text/javascript'>
 * var myTemp = new W.ImageBox();
 * document.write('control name: '+ myTemp.name);
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
 * (your name & profile)
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