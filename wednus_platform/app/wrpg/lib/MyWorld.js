// MyWorld class
W.MyWorld = function(args){var self = this;
  this.wps = '80%,80%,left:10%,top:10%';
  // implement feature creature follows mouse click on the body area
  this.body.onmousedown = function(evt){var e = evt || event;
    if(self.me == null)
      return;
    var row = Math.round((e.clientY - self.top) / self.unit) - 1;
    var col = Math.round((e.clientX - self.left) / self.unit) - 1;
    var me = self.me;  // need to get 'me' at runtime or me equals null
    me.reserved = false;
    me.alert = true;
    me.idleMax = 3;
    me.go(row, col);
  };

  // define messaging methodology
  this.message = function(msg){
    alert(msg);
  };

  this.full();
  // make sensitive for WPS workspace resizing
  this.onresize = function(){
    this.full();
  };

  // extend/override constructor w/ passed args object
  for(var i in args)
    eval('this.'+ i +' = args["'+ i +'"];');

  // add to the WPS
  W.add(this);
};
W.MyWorld.prototype = new W.World();