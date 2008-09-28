W.dxul = {
    version: '0.0.1',
    // set border
    border: '1px solid silver',
    // set the default 'window' background
    background:  '',
    // registered XUL elements
    elements: []
};

// include required modules/controls
W.control('URL2DOM');
W.control('X2doc');
W.load('module/dxul', 'boot,interpreter,interface', 'module');

W.dxul.tags = 'Element,XULElement,window,groupbox,caption,textbox,hbox,'
    +'button,script,box,radiogroup,radio,browser,description,label,command,'
    +'checkbox,listbox,listitem';
W.dxul.tags = W.dxul.tags.split(',');
for(var i in W.dxul.tags)
    W.load('module/dxul/lib/components', W.dxul.tags[i]);