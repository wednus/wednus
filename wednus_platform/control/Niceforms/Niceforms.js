/**
 * \file Niceforms.js
 * \brief This is the template of a control definition.
 *
 * (longer description goes here)
 * @author    (your name)
 * @todo    please make me a real control.
 * @see http://plugins.yme.music.yahoo.com/plugins/docs/webquickstart_page.html
 */


/**
 * \brief    Niceforms Constructor
 *
 * (longer description of this function)
 * @param    fst    (describe what this parameter is for)
 * @param    snd    (describe what this parameter is for)
 */
W.Niceforms = function(){var self = this;
    this.core = {};
    this.body = document.createElement('div');
    this.wps = '80%,80%,xcenter:0,ycenter:0';
    // name of this control
    this.name = 'Niceforms';
};


//! \cond   loadModules
// load external modules
W.include_css('control/Niceforms/lib', 'niceforms-default');
W.include('control/Niceforms/lib', 'niceforms');
//W.module('scavenger');
//W.module('');
//W.control('');
//! \endcond

//! \cond   namespace
// open a namespace for control variables
//W.c.Niceforms = {};
//W.c.Niceforms.id = 0;
//! \endcond

// add sample codes (one for each comment block)
/**
 * @example Niceforms.html
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
 * @test    <a href='../../test/Niceforms.html'>testing constructor & member methods</a>
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
 * W.control('Niceforms');
 * \endcode
 *
 * \subsection  instant 2. Instantiate a control object
 * In either case, Wednus Platform will loadup the control, and now we can use the
 * control like this:
 * \code
 * var myTemp = new W.Niceforms();
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
 * This example will print 'control name: Niceforms', the name of this control.
 * \code
 * <script type='text/javascript'>
 * W.control('Niceforms');
 * </script>
 *
 * <script type='text/javascript'>
 * var myTemp = new W.Niceforms();
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