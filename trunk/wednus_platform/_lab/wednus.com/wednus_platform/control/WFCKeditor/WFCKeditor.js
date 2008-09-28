/**
 * \file WFCKeditor.js
 * \brief    It overrides default methods/properties of 'fckeditor.js' and wednusify the
 * class.
 * @author    Sundew H. Shin
 * @see http://www.fckeditor.net/
 */


/**
 * \brief    wednusify FCKeditor
 *
 * prepare '.body', the presentation layer Wednus can recognize
 */
W.WFCKeditor = function(){var self = this;
    // apply modification
    applyModification()
    // initiate an object
    this.core = new FCKeditor('fckeditor_'+ W.c.WFCKeditor.id) ;
    this.core.BasePath = W.path +'control/WFCKeditor/lib/FCKeditor/';
    this.core.Value = '<a href="http://wednus.com">Wednus Project<\/a>' ;
    this.core.Create();
    this.body = this.core.body;
    this.wps = '80%,80%,xcenter:0,ycenter:0';
    // add it to WPS
    W.add(this);

    function applyModification(){
        FCKeditor.prototype.body = document.createElement('div');
        FCKeditor.prototype.wps = '';
        FCKeditor.prototype.parent = {};
        FCKeditor.prototype.Create = function()
        {
        	// Check for errors
        	if ( !this.InstanceName || this.InstanceName.length == 0 )
        	{
        		this._ThrowError( 701, 'You must specify an instance name.' ) ;
        		return ;
        	}
            this.Width = '100%';
            this.Height = '100%';
            var str = '';
        	if ( !this.CheckBrowser || this._IsCompatibleBrowser() )
        	{
        		str += '<input type="hidden" id="' + this.InstanceName + '" name="' + this.InstanceName + '" value="' + this._HTMLEncode( this.Value ) + '" style="display:none" />'  ;
        		str += this._GetConfigHtml();
        		str += this._GetIFrameHtml() ;
        	}
        	else
        	{
        		var sWidth  = this.Width.toString().indexOf('%')  > 0 ? this.Width  : this.Width  + 'px' ;
        		var sHeight = this.Height.toString().indexOf('%') > 0 ? this.Height : this.Height + 'px' ;
        		str += '<textarea name="' + this.InstanceName + '" rows="4" cols="40" style="WIDTH: ' + sWidth + '; HEIGHT: ' + sHeight + '">' + this._HTMLEncode( this.Value ) + '<\/textarea>';
        	}
            this.body.innerHTML = str;
        }
    };
    ++W.c.WFCKeditor.id;
};


//! \cond    loadModules
// load FCKeditor engine
W.include('control/WFCKeditor/lib/FCKeditor', 'fckeditor');
W.include_css('control/WFCKeditor/lib/FCKeditor/_samples', 'sample');
// load modules
W.module('scavenger');
//! \endcond

//! \cond   namespace
// open a namespace for control variables
W.c.WFCKeditor = {};
W.c.WFCKeditor.id = 0;
//! \endcond


// add sample codes (one for each comment block)
/**
 * @example WFCKeditor.html
 */

/**
 * @example CodeExample.html
 */


/**
 * \mainpage
 * \section req Requirement
 *  - wednus.js
 *  - wps.js
 *  - wom.js
 *  - <a href='http://www.fckeditor.net/'>FCKeditor package</a>
 *
 *<hr>
 *
 * \section intro_sec Introduction
 * This control is a simple wednusified version of GMap API.
 * @test    <a href='../../test/WFCKeditor.html'>testing constructor & member methods</a>
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
 * W.control('WFCKeditor');
 * \endcode
 *
 * \subsection  instant 2. Instantiate a control object
 * In either case, Wednus Platform will loadup the control, and now we can use the
 * control like this:map
 * \code
 * var myTemp = new W.WFCKeditor();
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
 * This example will add a fullsized('100%,100%') FCKeditor.
 * \code
 * <script type='text/javascript'>
 * W.control('WFCKeditor');
 * </script>
 *
 * <script type='text/javascript'>
 * var BasePath = '/workspace_framework/wednus_proj/control/WFCKeditor/FCKeditor/';
 * var Value = '<a href="http://wednus.com">Wednus Project<\/a>' ;
 * var fck = new W.WFCKeditor('FCKeditor1', BasePath, Value);
 * fck.wps = '100%,100%,left:0,top:0';
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