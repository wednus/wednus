/**
 * DXUL Render
 *
 * The function renders XUL code or an URL of XUL file on to the provided canvas.
 * @note  if the 'url' and 'code' have provided at the same time, it renders the 'url.'
 */
W.dxul.render = function(args){
  // handle arguments
  var def = {
    url: '',
    code: '',
    canvas: null
  };
  if(args){
      for(var i in def) args[i] = args[i]?args[i]:def[i];
  }else args = def;

  if(args.url){
  var xulObj = new W.URL2DOM(args.url, function(dom, xml){
    W.dxul.interpreter(new W.X2doc(xml).core, args.canvas);
  });
  return;
  }

  var xulObj = new W.X2doc(args.code);
  W.dxul.interpreter(xulObj.core, args.canvas);
}