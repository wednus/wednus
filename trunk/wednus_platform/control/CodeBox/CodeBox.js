/**
 * \file CodeBox.js
 * \brief This is the template of a control definition.
 *
 * (longer description goes here)
 * @author    (your name)
 * @todo    please make me a real control.
 * @see http://plugins.yme.music.yahoo.com/plugins/docs/webquickstart_page.html
 */


/**
 * \brief    CodeBox Constructor
 *
 * (longer description of this function)
 * @param    args    argument object
 */
W.CodeBox = function(args){var self = this;
    // control info.
    this.name = 'CodeBox';
    this.version = '0.1.0';
    
    // handle arguments
	args = args?args:{};
    this.lang = args.lang?args.lang:'javascript';
    this.code = args.code?args.code:'';
    this.wps = args.wps?args.wps:'80%,80%,xcenter:0,ycenter:0';

    this.core = document.createElement('textarea');
    this.core.name = 'code';
    this.core.className = this.lang;
    this.core.value = this.code;
    this.core.style.width = '100%';
    this.core.style.height = '100%';
    this.body = document.createElement('div');
    
    // *will be called once when window.onload fires
    // cond: it needs to be added to WPS by 'W.add'
    this.onload = function(){};
    W.add(this);
    dp.SyntaxHighlighter.HighlightAll('code');
};


//! \cond   loadModules
// load external modules
W.include_css('control/CodeBox/lib/SyntaxHighlighter_1.3.0', 'SyntaxHighlighter');
W.include('control/CodeBox/lib/SyntaxHighlighter_1.3.0', 'shCore,shBrushJScript,'
    +'shBrushXml,shBrushCSharp,shBrushDelphi,shBrushPhp,shBrushPython,'
    +'shBrushSql,shBrushVb');
//W.load();
//W.module();
W.module('scavenger');
//W.control('');
//! \endcond

//! \cond   namespace
// open a namespace for control variables
//W.c.CodeBox = {};
//W.c.CodeBox.id = 0;
//! \endcond

// add sample codes (one for each comment block)
/**
 * @example CodeBox.html
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
 * @test    <a href='../../test/CodeBox.html'>testing constructor & member methods</a>
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
 * W.control('CodeBox');
 * \endcode
 *
 * \subsection  instant 2. Instantiate a control object
 * In either case, Wednus Platform will loadup the control, and now we can use the
 * control like this:
 * \code
 * var myTemp = new W.CodeBox();
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
 * This example will print 'control name: CodeBox', the name of this control.
 * \code
 * <script type='text/javascript'>
 * W.control('CodeBox');
 * </script>
 *
 * <script type='text/javascript'>
 * var myTemp = new W.CodeBox();
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