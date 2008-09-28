/**
 * \file FormGen.js
 * \brief This is the template of a control definition.
 *
 * Roadmap:
 * v0.1.1: add 'remove' member method
 * @author    Sundew Shin
 * @see http://www.w3.org/TR/html4/interact/forms.html
 */


/**
 * \brief    FormGen Constructor
 *
 * core: form field
 * @param    args    argument object
 * @note we keep using 'length' var for managing 'fields', the internal data structure
 * in consistent manner rather than directly refering 'fields.length' property.
 * @todo add form checking feature for essential fields
 */
W.FormGen = function(args){var self = this;
    // control info.
    this.name = 'FormGen';
    this.version = '0.1.0';
    
    // handle arguments
    var def = {
	    scroll: false,
        target: '_self',
        method: 'post',
	    action: '#',
	    defTag: 'input',
	    defType: 'text',
	    caption: 'submit',
	    color: 'white',
	    background: '',
	    labelColumeWidth: '80px',
	    showSubmitButton: true,
	    wss: 'fontSize:11px;fontFamily:Tahoma,Verdana',
	    wps: '80%,80%,xcenter:0,ycenter:0'
    };
	if(args){
	    for(var i in def) args[i] = args[i]?args[i]:def[i];
	}else args = def;
    // add member props and override 
    for(var i in def) self[i] = self[i]?self[i]:args[i];

    this.fields = [];
    var fieldNodes = [];
	this.length = 0;  // number of fields
	
	// remove a field item
	this.remove = function(id){
		var id = getIndex(id);
		self.fields[id] = self.fields[self.length - 1];
		self.table.removeChild(fieldNodes[id]);
		fieldNodes[id] = fieldNodes[self.length - 1];
		--self.length;
	};
	
	// set value
	this.set = function(id, value){
		var id = getIndex(id);
		self.fields[id].value = value;
		return self.fields[id].value;
	};
	
	// get field value
	this.get = function(id){
		var id = getIndex(id);
		if(id == -1)
			return null;
		return self.fields[id].value;
	};
	
	// provide pragmatic  method of submission
    this.submit = function(){
    	self.core.submit();
    };

	// return the index for an field in fields data structure
	function getIndex(id){
		for(var i = 0; i < self.length; ++i)
			if(self.fields[i].id == id)
				return i;
		return -1;
	};
	
	// build core
	this.core = document.createElement('form');
	this.core.method = this.method;
	this.core.action = this.action;
	this.core.target = this.target;
    // build body
    this.body = W.style('div', 'background:'+ this.background);
    this.table = W.style('table', 'width:100%;'+ this.wss);
    this.table.style.background = this.color;
	// apply WSS
	W.style(this.table, this.wss);
    this.tbody=document.createElement('tbody')
    this.table.appendChild(this.tbody);
    this.core.appendChild(this.table);
    if(!this.scroll){
    	this.body.style.overflow = 'hidden';
    }else this.body.style.overflow = 'auto';
        
    /**
     * add field
     */
	this.add = function(args){
	    var def = {
		    id: self.length,
		    name: self.length,
		    className: self.length,
		    tag: self.defTag,
		    type: self.defType,
		    value: '',
		    caption: self.length,
		    width: '100%',
		    labelBorder: '0px',
		    fieldBorder: '1px',
		    color: 'white',
		    tooltip: 'please enter '+ self.caption +' here.'
	    };
	    if(args){
	        for(var i in def) args[i] = args[i]?args[i]:def[i];
	    }else args = def;

		var field = W.style(args.tag, 'width:'+ args.width +';borderWidth:'
		    + args.fieldBorder +';background:'+ args.color);
		field.id = args.id;
		field.name = args.name;
		field.className = args.className;
		//field.tabIndex = self.length;
		field.tooltip = args.tooltip;
		field.value = args.value;
		// highlight contents
		field.onclick = function(){
			this.focus();
			if(this.select)
				this.select();
		};
		// apply WSS
		W.style(field, self.wss);
		
		// prepare tr entry
		var tr = document.createElement('tr');
		var td_caption = document.createElement('td');
		// adjust label colume width
		td_caption.style.width = '1px';
		// add label
		var label = document.createElement('input');
		label.value = ' '+ args.caption;
		label.readOnly = true;
		label.style.cursor = 'default';
		label.style.width = self.labelColumeWidth;
		// adjust tab order
		label.onfocus = function(){
		    field.focus();
		};
		W.style(label, self.wss +';borderWidth:'+ args.labelBorder +';background:'
		    + self.color);
		td_caption.appendChild(label);
		// apply WSS
		W.style(td_caption, self.wss);
		tr.appendChild(td_caption);
		var td_field = document.createElement('td');
		td_field.appendChild(field);
		// compose entry
		tr.appendChild(td_field);
		// append to the layout table
		self.tbody.appendChild(tr);
		// add to the internal data structures
		self.fields[self.length] = field;
		fieldNodes[self.length] = tr;
		++self.length;
		return field;
	};

	this.sbutton = W.style('input', this.wss);
	this.sbutton.type = 'button';
	this.sbutton.value = this.caption;
    this.sbutton.onclick = function(){
    	self.submit();
    };

	// add submission button
    if(this.showSubmitButton){
    	this.core.appendChild(this.sbutton);
    }

    // *will be called once when window.onload fires
    // cond: it needs to be added to WPS by 'W.add'
    this.onload = function(){};
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
//W.c.FormGen = {};
//W.c.FormGen.id = 0;
//! \endcond

// add sample codes (one for each comment block)
/**
 * @example FormGen.html
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
 * @test    <a href='../../test/FormGen.html'>testing constructor & member methods</a>
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
 * W.control('FormGen');
 * \endcode
 *
 * \subsection  instant 2. Instantiate a control object
 * In either case, Wednus Platform will loadup the control, and now we can use the
 * control like this:
 * \code
 * var myTemp = new W.FormGen();
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
 * This example will print 'control name: FormGen', the name of this control.
 * \code
 * <script type='text/javascript'>
 * W.control('FormGen');
 * </script>
 *
 * <script type='text/javascript'>
 * var myTemp = new W.FormGen();
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