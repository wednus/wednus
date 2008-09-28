/**
 * \file    URL2DOM.js
 * \brief    URL to DOM
 *
 * It creates a DOM object after pasing data from URL.
 * @author Sundew Shin
 */

/**
 * \brief    URL2DOM Constructor
 *
 * @param    url    the URL of the target resource
 * @see http://www.w3schools.com/xml/xml_parser.asp
 * @see http://groups.google.com/group/comp.lang.javascript/browse_thread/thread/d83065fb600b9945/d0194af94a87aa5e?q=document.implementation&rnum=9#d0194af94a87aa5e
 * @todo You may want to create just one instance of this class and reuse it
 * over and over again by calling '.load()' method.
 * @todo object reuse not working
 */
W.URL2DOM = function(url, callback){var self = this;
    // control info.
    this.version = '0.0.1';
    this.name = 'URL2DOM';
    this.url = url?url:W.path +'control/URL2DOM/lib/index.html';
    this.value = '';
    
    this.core = null;
    this.onerror = function(e){alert(e);};
    // event dispatcher
    this.onload = function(){
        self.value = toXML(self.core);
        if(callback)
            callback(self.core, self.value);
    };
    
    // IE
    if(window.ActiveXObject) {
    	this.core = new ActiveXObject('Microsoft.XMLDOM');
    	// make sure that the parser will not continue execution of the script before the
    	// document is fully loaded.
    	this.core.async = false;
    	while(this.core.readyState != 4) this.debug('Loading...');
    	try{
            this.core.load(this.url);
            this.onload();
        }catch(e){
            this.onerror(e);
        };
    // for Mozilla & Konqueror 3.2+
    }else if(document.implementation && document.implementation.createDocument){
    	this.core = document.implementation.createDocument('', '', null);
    	try{
            this.core.load(this.url);
	    	this.core.onload = this.onload;
        }catch(e){
            this.onerror(e);
        };
    }
    
    function toXML(dom){
	    if(dom.xml){
	        return dom.xml;
	    }else if(XMLSerializer){
	        return new XMLSerializer().serializeToString(dom);
	    }
    };    
};


//! \cond   loadModules
// load external modules
//W.module('');
//W.control('');
//! \endcond

//! \cond   namespace
// open a namespace for control variables
//W.c.URL2DOM = {};
//W.c.URL2DOM.id = '';
//! \endcond

// add sample codes (one for each comment block)
/**
 * @example URL2DOM.html
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
 * @test    <a href='../../test/URL2DOM.html'>testing constructor & member methods</a>
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
 * W.control('URL2DOM');
 * \endcode
 *
 * \subsection  instant 2. Instantiate a control object
 * In either case, Wednus Platform will loadup the control, and now we can use the
 * control like this:
 * \code
 * var myTemp = new W.URL2DOM();
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
 * This example will print 'control name: URL2DOM', the name of this control.
 * \code
 * <script type='text/javascript'>
 * W.control('URL2DOM');
 * </script>
 *
 * <script type='text/javascript'>
 * var myTemp = new W.URL2DOM();
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
 * Sundew H. Shin<br>
 * Manager/Developer, <a href='http://wednus.com'>Wednus Project</a>
 *<hr>
 *
 * \section license License
 * <a href='http://opensource.org/licenses/gpl-license.php'>GNU GPL</a>
 */