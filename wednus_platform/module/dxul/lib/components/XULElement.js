/**
 * XULElement
 *
 * A XUL element. The following lists attribute and properties common to all
 * XUL elements. Some only have any meaning in particular situations such as
 * when placed inside a template or overlay.
 * @see http://www.xulplanet.com/references/elemref/ref_XULElement.html
 */
W.dxul.XULElement = function(){var self = this;
    // inherit Element methods
    // @ref _lab/function/6_prototype_super_class_fix.html
    var element = new W.dxul.Element();
    for(var i in element)
        self[i] = element[i];

    // http://www.xulplanet.com/references/elemref/ref_XULElement.html#attr_allowevents
    this.init = function(args, parent){var props = args.getAttributeNames();
        // implement box model
        var s = self.body.style;
	    for(var i in props){
	        var prop = args.getAttribute(props[i]);
		    switch(props[i]){
		        case 'align': self.body.align = prop; break;
		        case 'allowevents':
		        case 'allownegativeassertions':
		        case 'class':
		        case 'coalesceduplicatearcs':
		        case 'collapsed':
		        case 'container':
		        case 'containment':
		        case 'context':
		        case 'contextmenu':
		        case 'datasources':
		        case 'dir':
		        case 'empty':
		        case 'equalsize':
		        case 'flags':
		        case 'flex':
		        case 'height': s.height = prop +'px'; break;
		        case 'hidden': if(!prop) s.display = 'none'; break;
		        case 'id': self.id = prop; break;
		        case 'insertafter':
		        case 'insertbefore':
		        case 'left': s.left = prop +'px'; break;
		        case 'maxheight': s.maxHeight = prop; break;
		        case 'maxwidth': s.maxWidth = prop; break;
		        case 'menu':
		        case 'minheight': s.minHeight = prop; break;
		        case 'minwidth': s.minWidth = prop; break;
		        case 'mousethrough':
		        case 'observes':
		        case 'ordinal':
		        case 'orient':
		        case 'pack': self.body.align = prop; break;
		        case 'persist':
		        case 'popup':
		        case 'position':
		        case 'preference-editable':
		        case 'ref':
		        case 'removeelement':
		        case 'sortDirection':
		        case 'sortResource':
		        case 'sortResource2':
		        case 'statustext': window.status = prop; break;
		        case 'style':
		        case 'template':
		        case 'tooltip':
		        case 'tooltiptext': self.title = prop; break;
		        case 'top': s.top = prop +'px'; break;
		        case 'uri':
		        case 'wait-cursor': if(prop) s.cursor = 'wait'; break;
		        case 'width': s.width = prop +'px'; break;
		    }
	    }
    };    
};