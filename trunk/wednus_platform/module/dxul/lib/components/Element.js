/**
 * Element
 * 
 * abstract super class
 * @see http://www.xulplanet.com/references/elemref/ref_bbox.html
 */
W.dxul.Element = function(){var self = this;
    this.body = W.style('div', 'width:100%;');
	this.addEventListener = function(type , listener , useCapture){self.body.addEventListener(type , listener , useCapture);};
	this.appendChild = function(child){return self.body.appendChild(child.body);};
	this.attributes = this.body.attributes;
	this.childNodes = this.body.childNodes;
	this.cloneNode = function(deep){return self.body.cloneNode(deep);};
	this.dispatchEvent = function(evt){return self.body.dispatchEvent(evt);};
	this.firstChild = this.body.firstChild;
	this.getAttribute = function(name){return self.body.getAttribute(name);};
	this.getAttributeNS = function(namespaceURI, localName){return self.body.getAttributeNS(namespaceURI, localName);};
	this.getAttributeNode = function(name){return self.body.getAttributeNode(name);};
	this.getAttributeNodeNS = function(namespaceURI, localName){return self.body.getAttributeNodeNS(namespaceURI, localName);};
	this.getElementsByTagName = function(name){return self.body.getElementByTagName(name);};
	this.getElementsByTagNameNS = function(namespaceURI, localName){return self.body.getElementsByTagNameNS(namespaceURI, localName);};
	this.hasAttribute = function(name){return self.body.hasAttribute(name);};
	this.hasAttributeNS = function(namespaceURI, localName){return self.body.hasAttributeNS(namespaceURI, localName);};
	this.hasAttributes = function(){return self.body.hasAttributes();};
	this.hasChildNodes = function(){return self.body.hasChildNodes();};
	this.insertBefore = function(newChild, refChild){return self.body.insertBefore(newChild, refChild);};
	this.isSupported = function(feature, version){return false;};
	this.lastChild = this.body.lastChild;
	this.localName = '';
	this.namespaceURI = this.body.namespaceURI;
	this.nextSibling = this.body.nextSibling;
	this.nodeName = this.body.nodeName;
	this.nodeType = this.body.nodeType;
	this.nodeValue = this.body.nodeValue;
	this.normalize = function(){this.body.normalize();};
	this.ownerDocument = this.body.ownerDocument;
	this.parentNode = this.body.parentNode;
	this.prefix = this.body.prefix;
	this.previousSibling = this.body.previousSibling;
	this.removeAttribute = function(name){return self.body.removeAttribute(name);};
	this.removeAttributeNS = function(namespaceURI, localName){return self.body.removeAttributeNS(namespaceURI, localName);};
	this.removeAttributeNode = function(oldAttr){return self.body.removeAttributeNode(oldAttr);};
	this.removeChild = function(oldChild){return self.body.removeChild(oldChild);};
	this.removeEventListener = function(type , listener , useCapture){self.body.removeEventListener(type , listener , useCapture);};
	this.replaceChild = function(newChild, oldChild){return self.body.replaceChild(newChild, oldChild)};
	this.setAttribute = function(name, value){self.body.setAttribute(name, value);};
	this.setAttributeNS = function(namespaceURI, localName){return self.body.setAttributeNS(namespaceURI, localName);};
	this.setAttributeNode = function(newAttr){return self.body.setAttributeNode(newAttr);};
	this.setAttributeNodeNS = function(type , listener , useCapture){return self.body.setAttributeNodeNS(type , listener , useCapture);};
	this.tagName = 'a';
};