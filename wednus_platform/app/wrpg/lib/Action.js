 /**
  *  Action constructor
  */
W.Action = function(args){var self = this;
  var def = {
    name: 'walk',
    north: {
      src: W.path +'module/oracle/image/nikki.gif',
      top: 0,
      left: 0,
      width: 48,
      height: 48,
      background: 'black',
      frames: 3,
      sequence: '0,1,2',
      delay: 120,
      x_step: -48,
      y_step: 0
    },
    east: {top: -48},
    south: {top: -96},
    west: {top: -144}
  };
  if(args) for(var i in def) def[i] = args[i]?args[i]:def[i];
  for(var i in def) self[i] = def[i];

  this.dir = function(dir){
    switch(dir){
      case 'north':
        break;
      case 'east':
        break;
      case 'south':
        break;
      case 'west':
        break;
    }
  };

  this.delay = function(delay){
    self.north.delay = self.east.delay = self.south.delay = self.west.delay = delay;
  };

  this.act = function(){
  };
};