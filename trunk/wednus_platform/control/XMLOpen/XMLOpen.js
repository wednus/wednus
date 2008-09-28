/**
 * \file    XMLOpen.js
 * \brief    This function defines a class create a DOM object using XML source.
 *
 * This function defines a class create a DOM object using XML source.
 * @author Sundew Shin
 */

/**
 * \brief    XMLOpen Constructor
 *
 * @param    method    form parsing method
 * @param url The URL of the XML source
 * @param toSend
 * @param callback The callback function
 */
W.XMLOpen = function(method, url, toSend, callback){
  var req;
  if(window.XMLHttpRequest){
    // browser has native support for XMLHttpRequest object
    req = new XMLHttpRequest();
  }
  else if(window.ActiveXObject){
    // try XMLHTTP ActiveX (Internet Explorer) version
    req = new ActiveXObject("Microsoft.XMLHTTP");
  }

  if(req){
    req.onreadystatechange = function(){callback(req)};
    req.open(method, url, true);
    req.setRequestHeader("content-type","application/x-www-form-urlencoded");
    req.send(toSend);
  }else{
    alert('Your browser does not seem to support XMLHttpRequest.');
  }
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