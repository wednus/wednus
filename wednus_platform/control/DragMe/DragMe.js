/**
 * \file DragMe.js
 * \brief Creates a drag handle
 *
 * It convert a regular object to a draggable object.
 * @author    Sundew H. Shin
 * @see WPS
 * @todo    need to be revised
 * @todo change DragMe.html
 */

/**
 * \brief   Mover constructor
 *
 * @param	target	target to move
 * 					      (number, string) ID of the target object
 *     				    (object) 	target object
 * @note It doesn't have own presentation layer, so it uses its target
 */
W.DragMe = function(target, args){var self = this;
  // control info.
  this.version = '0.0.1';
  this.name = 'DragMe';
  var handle = -1;
  this.xoffset = this.yoffset = 0;

  // handle arguments
  args = args?args:{};
  this.wps = args.wps?args.wps:'80%,80%,xcenter:0,ycenter:0';

  this.core = target.body?target.body:target;
  // check the validity for the target
  if(!this.core.appendChild) return;
  W.style(this.core, 'position:absolute;top:0px;left:0px;cursor:move;')
  this.core.title = 'move';
  this.core.onmousedown = function(evt){var e = evt || event;
    document.onmousemove = transform;
    self.xoffset = parseInt(this.style.left) - e.clientX;
    self.yoffset = parseInt(this.style.top) - e.clientY;
    handle = this;
  };

  W.event(this.core, 'onmouseup', function(){
    document.onmousemove = new Function();
    //W.event(document, 'onmousemove', function(){});
    handle = -1;
  });


  // extend/override constructor w/ passed args object
  for(var i in args)
    eval('this.'+ i +' = args["'+ i +'"];');

  // *will be called once when window.onload fires
  // cond: it needs to be added to WPS by 'W.add'
  this.onload = function(){};
  W.add(this);


  // helper functions
  function transform(evt){var e = evt || event;
    if(!handle) return;
    var top = e.clientY + self.yoffset;
    var left = e.clientX + self.xoffset;
    self.ondrag(top, left);
    self.core.style.top = top +'px';
    self.core.style.left = left +'px';
  };

  this.ondrag = function(top, left){};
  this.ondrop = function(top, left){};
};


W.module('scavenger');

// add sample codes (one for each comment block)
/**
 * @example DragMe.html
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
 *  - wednus.js
 *
 *<hr>
 *
 * \section intro_sec Introduction
 * (give an introduce and purpose of this control here)
 * @test    <a href='../../test/DragMe.html'>testing constructor & member methods</a>
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
 * W.control('DragMe');
 * \endcode
 *
 * \subsection  instant 2. Instantiate a control object
 * In either case, Wednus Platform will loadup the control, and now we can use the
 * control like this:
 * \code
 * var myTemp = new W.DragMe([HTMLElement tag], [WSS string]);
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
 * This example will create red squire box.
 * \code
 * <script type='text/javascript'>
 * W.control('DragMe');
 * </script>
 *
 * <script type='text/javascript'>
 * var a = new W.DragMe('div', 'top:200px;left;width;height;background:red');
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