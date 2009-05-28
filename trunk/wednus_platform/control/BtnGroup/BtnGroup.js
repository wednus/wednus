/**
 * \file BtnGroup.js
 * This file defines the BtnGroup class.
 *
 * This class defines a prototype of any button groups.
 * @author Sundew H. Shin
 */


/**
 * BtnGroup Constructor
 *
 * (longer description of this function)
 * @param    args    argument object
 */
W.BtnGroup = function(_args){var args = _args?_args:{}; var self = this;
  // control info.
  this.version = '0.0.1';
  this.name = 'BtnGroup';

  // handle arguments
  this.wps = '80%,80%,xcenter:0,ycenter:0';

  //this.core = {};
  //this.core = W.style('div', 'green');
  this.body = W.style('div');

  // the pool of buttons
  this.buttons = [];
  this.buttons_selected = [];

  /**
   * add a button
   * @param button a button object
   */
  this.add = function(button){
    self.buttons[this.buttons.length] = button;
    self.body.appendChild(button.body);
  };

  // mode: multiple selection
  this.isMultipleSelectionEnabled = false;

  /**
   * select a button
   * @param button a button object
   */
  this.select = function(button){
    /*
    if(!this.isMultipleSelectionEnabled){
      for(var i = 0; i < this.buttons_selected.length; ++i){
        this.buttons_selected[i].selected = false;
        this.buttons_selected[i].body.style.background = 'url('+ this.buttons_selected[i].img +')';
      }
      this.buttons_selected = [];
    }
    //this.buttons_selected[this.buttons_selected.length] = button;
    */
    this.buttons_selected[0].selected = false;
    this.buttons_selected[0].body.style.background = 'url('+ this.buttons_selected[0].img +')';
    this.buttons_selected[0].target.body.style.display = 'none';
    this.buttons_selected[0] = button;
  };

  // a button prototype
  this.Button = function(img, img_hover, img_clicked, top, left, width, height, target){var self2 = this;
    this.img = img;
    this.img_hover = img_hover;
    this.img_clicked = img_clicked;
    this.target = target;
    this.selected = false;
    this.body = W.style('div', 'top:'+ top +'px;left:'+ left +'px;width:'
      + width +'px;height:'+ height +'px;position:absolute;background:url('
      + img +');');
    this.body.onclick = function(){
      if(!self2.selected){
        this.style.background = 'url('+ img_clicked +')';
        self2.selected = true;
        self.select(self2);
        target.body.style.display = 'block';
      }
    };
    this.body.onmouseout = function(){
      if(!self2.selected)
        this.style.background = 'url('+ img +')';
    };
    this.body.onmouseover = function(){
      if(!self2.selected)
        this.style.background = 'url('+ img_hover +')';
    };
    self.add(this);
  };

  // extend/override constructor w/ passed args object
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
W.module('scavenger');
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