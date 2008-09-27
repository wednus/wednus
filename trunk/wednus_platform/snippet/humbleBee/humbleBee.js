Object.prototype.clone = function(deep) {
  var objectClone = new this.constructor();
  for (var property in this)
    if (!deep)
      objectClone[property] = this[property];
    else if (typeof this[property] == 'object')
      objectClone[property] = this[property].clone(deep);
    else
      objectClone[property] = this[property];
  return objectClone;
}


var W = {};
function humbleBee(w){
  w.clone = function(deep) {
    var objectClone = new this.constructor();
    for (var property in this)
      if (!deep)
        objectClone[property] = this[property];
      else if (typeof this[property] == 'object')
        objectClone[property] = this[property].clone(deep);
      else
        objectClone[property] = this[property];
    return objectClone;
  }

  W = w.clone();

    W.body = document.createElement('div');
    document.body.appendChild(W.body);

    var msg = new W.ICanvas({
      content: 'Test',
      wps: '200,400,xcenter:0,ycenter:0',
      background: 'red'
    });

  document.body.appendChild(msg.body);
};