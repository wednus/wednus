/**
 * \file ICanvas.js
 * \brief ICanvas control
 *
 * (longer description goes here)
 * @author    Sundew H. Shin
 * @todo    please make me a real control.
 * @see http://plugins.yme.music.yahoo.com/plugins/docs/webquickstart_page.html
 */



/*
// http://www.thescripts.com/forum/thread160118.html
W.fwrite = function(frame, msg, bground){
    frame.src = 'data:application/xhtml+xml,' + '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en"><head>'
        +'</head>'
        +'<body style="margin:0px;padding:0px;background:'+ (bground?bground:'') +';">'
        + msg + frame.id +'</body></html>';
};
*/

/**
 * ICanvas Constructor
 *
 * @param    args    argument object
 * @see http://juicystudio.com/article/choosing-doctype.php
 * @see http://jszen.blogspot.com/2005/03/dynamic-old-school-iframes.html
 * @see opera: http://www.thescripts.com/forum/thread480795.html
 * @see IE border: http://forums.devshed.com/css-help-116/iframe-border-problems-css-ie-122093.html
 */
W.ICanvas = function(args){var self = this;
    // control info.
    this.version = '0.1.2';
    this.name = 'ICanvas';

    // handle arguments
    args = args?args:{};
    this.wps = args.wps?args.wps:'80%,80%,xcenter:0,ycenter:0';
    this.src = args.src?args.src:false;
    this.name = args.name?args.name:'ICanvas_'+ W.c.ICanvas.id;
    this.target = args.target?args.target:'_self';
    this.scroll = args.scroll?args.scroll:false;
    this.border = args.border?args.border:false;
    this.background = args.background?args.background:'white';
    this.args = {};
    //this.args.doctype = args.doctype?args.doctype:'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">';
    this.args.doctype = args.doctype?args.doctype:'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">';
    //this.args.doctype = args.doctype?args.doctype:'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd$
    //this.args.doctype = args.doctype?args.doctype:'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transiti$
    this.args.meta = args.meta?args.meta:'<meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
    this.args.head = args.head?args.head:'<head>';
    if(this.target != '_self'){
        this.args.head += '<base target="'+ this.target +'">';
    }
    this.args.body = args.body?args.body:'<body style="margin:0px;padding:0px;background-color:'+ this.background +';">';
    this.args.content = args.content?args.content:'Wednus Platform - ICanvas control';

    this.core = document.createElement('iframe');
    this.core.id = 'ICanvas_'+ W.c.ICanvas.id;
    this.core.style.zIndex = W.c.ICanvas.id;

    if(!this.scroll)
        this.core.scrolling = 'no';
    if(!this.border)
        this.core.frameBorder = '0';
    // for opera on Windows
    if(this.src){
        this.core.src = this.src;
    }else this.core.src = W.path +'control/ICanvas/lib/dummy.html';
    this.core.marginwidth = 0;
    this.core.marginheight = 0;
    this.core.name = this.name;
    this.document = null;

    this.onload = function(){
        self.document = self.core.contentDocument?self.core.contentDocument:self.core.contentWindow?self.core.contentWindow.document:self.core.document;
        if(self.background){
            self.args.header += '<style>body{background-color:'+ self.background +';}</style>';
        }
        self.write(self.args);
    };

    // when src has passed, it works as a plain iframe.
    if(this.src)
        this.onload = function(){};
    
    this.body = document.createElement('div');
    // register to WPS
    W.add(this);

    // solve IE targeting problem
    if(top[this.core.id])
        top[this.core.id].name = this.name;
    
    //window.onerror = function(){alert('error')};
    // same args struct as the constructor
    this.write = function(args){
        // container
        var c = {};
        c.doctype = args.doctype?args.doctype:self.args.doctype;
        c.meta = args.meta?args.meta:self.args.meta;
        c.head = args.head?args.head:self.args.head;
        c.body = args.body?args.body:self.args.body;
        c.content = args.content?args.content:self.args.content;
        var data = c.doctype +'\n<html>'+ c.meta +'\n'+ c.head +'</head>\n'
            + c.body +'\n'+ c.content +'\n</body></html>';
        // write document
        self.document.write(data);
        self.document.close();
    };

    ++W.c.ICanvas.id;
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
W.c.ICanvas = {};              
W.c.ICanvas.id = 0;
//! \endcond

// add sample codes (one for each comment block)
/**
 * @example ICanvas.html
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
 * @test    <a href='../../test/ICanvas.html'>testing constructor & member methods</a>
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
 * W.control('ICanvas');
 * \endcode
 *
 * \subsection  instant 2. Instantiate a control object
 * In either case, Wednus Platform will loadup the control, and now we can use the
 * control like this:
 * \code
 * var myTemp = new W.ICanvas();
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
 * This example will print 'control name: ICanvas', the name of this control.
 * \code
 * <script type='text/javascript'>
 * W.control('ICanvas');
 * </script>
 *
 * <script type='text/javascript'>
 * var myTemp = new W.ICanvas();
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