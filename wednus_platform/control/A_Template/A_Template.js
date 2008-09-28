/**
 * \file A_Template.js
 * This file defines the A_Template class.
 *
 * (longer description goes here)
 * @author (your name)
 * @todo please make me a real control.
 * @note change name through 'Find/Replace'
 * @see http://wednus.com
 */


/**
 * A_Template Constructor
 *
 * (longer description of this function)
 * @param    args    argument object
 */
W.A_Template = function(args){args = args?args:{}; var self = this;
  // control info.
  this.version = '0.0.1';
  this.name = 'A_Template';

  // handle arguments
  this.wps = '80%,80%,xcenter:0,ycenter:0';

  this.core = {};
  //this.core = W.style('div', 'green');
  this.body = W.style('div');

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

  // *will be called once when window.onload fires
  // cond: it needs to be added to WPS by 'W.add'
  this.onload = function(){};
  W.add(this);
};


//! \cond   loadModules
// load external modules
//W.js();
//W.css();
//W.load();
//W.module('scavenger');
//W.include('control/A_Template/lib', 'dummy');
//W.control('');
//! \endcond

//! \cond   namespace
// open a namespace for control variables
//W.c.A_Template = {};
//W.c.A_Template.id = 0;
//! \endcond

// add sample codes (one for each comment block)
/**
 * @example A_Template.html <a href='../../test/A_Template.html'>Run this code</a>
 */

/**
 * @example CodeExample.html <a href='../../test/CodeExample.html'>Run this code</a>
 */


/**
 * \mainpage
 *
 * \section intro_sec Introduction
 * (give an introduce and purpose of this control here)
 * @test <a href='../../test/A_Template.html'>A_Template.html</a> (unit tests)
 *<hr>
 *
 * \section req Requirement
 * - wednus.js
 *
 *<hr>
 *
 * \section structure Structure
 * A_Template is a type1 control.
 * <br>(we highly recommend you to use <a href='http://www.umlet.com/'>UMLet</a> for <a href='http://eclipse.org'>Eclipse</a> env.)
 * \image   html    diagram.jpg
 * <hr>
 *
 * \section usage   Usage
 * \subsection    include    1. Including
 * Add following line of code in script block.
 * \code
 * W.control('A_Template');
 * \endcode
 * <br>
 * \subsection  instant 2. Instantiate a control object
 * In either case, Wednus Platform will loadup the control, and now we can use the
 * control like this:
 * \code
 * var myA_Template = new W.A_Template();
 * \endcode
 * @param args (param desc. goes here)
 *
 * <br>
 * \subsection  use 3. Using object
 * After the object creation, you can access public member properties and methods as
 * below.
 * \code
 * alert(myA_Template.name);
 * \endcode
 *<hr>
 *
 * \section code    Code Example
 * This example will print 'control name: A_Template', the name of this control.
 * \code
 * <script type='text/javascript'>
 * W.control('A_Template');
 * </script>
 *
 * <script type='text/javascript'>
 * var myA_Template = new W.A_Template();
 * document.write('control name: '+ myA_Template.name);
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