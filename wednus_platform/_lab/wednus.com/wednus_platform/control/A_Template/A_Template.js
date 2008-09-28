/**
 * \file A_Template.js
 * \brief This is the template of a control definition.
 *
 * (longer description goes here)
 * @author    (your name)
 * @todo    please make me a real control.
 * @see http://plugins.yme.music.yahoo.com/plugins/docs/webquickstart_page.html
 */


/**
 * \brief    A_Template Constructor
 *
 * (longer description of this function)
 * @param    fst    (describe what this parameter is for)
 * @param    snd    (describe what this parameter is for)
 */
W.A_Template = function(fst, snd){var self = this;
    // name of this control
    this.name = 'A_Template';
    this.fst = fst;
    this.snd = snd;

    this.core = {};
    //this.core = document.createElement('div');
    //this.core.style.background = 'green';
    this.body = document.createElement('div');
    this.wps = '80%,80%,xcenter:0,ycenter:0';
    W.add(this);
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
//W.c.A_Template = {};
//W.c.A_Template.id = 0;
//! \endcond

// add sample codes (one for each comment block)
/**
 * @example A_Template.html
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
 * @test    <a href='../../test/A_Template.html'>testing constructor & member methods</a>
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
 * W.control('A_Template');
 * \endcode
 *
 * \subsection  instant 2. Instantiate a control object
 * In either case, Wednus Platform will loadup the control, and now we can use the
 * control like this:
 * \code
 * var myTemp = new W.A_Template();
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
 * This example will print 'control name: A_Template', the name of this control.
 * \code
 * <script type='text/javascript'>
 * W.control('A_Template');
 * </script>
 *
 * <script type='text/javascript'>
 * var myTemp = new W.A_Template();
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