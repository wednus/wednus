// MyCreature class
W.MyCreature = function(args){var self = this;
  this.name = 'no name';
  this.power = 0;  // 0: harmless to others
  this.energy = 0;  // 0: immortal
  this.exp = 1;
  this.team = 0;  // 0: neutral
  this.alive = true;
  // reveals shadow
  this.shadow = false;

  this.control = false; // keyboard control creature
  this.attack = false;
  this.evil = false;
  this.handicap = 2;  // '2' relatively fair handicap for enemies
  // class vars
  this.handiCounter = 0;
  this.alert = false;
  this.idleMax = 100;  // idle term
  this.idleCounter = 0;
  this.idleLongMax = 50;  // long idle term
  this.idleCounterLong = 0;

  // message que for control creature
  this.msgQueue =[];
  // extend class
  // invokes when there is no more enemy
  this.win = function(){
    self.world.stop = true;
    self.world.message('I won!');
  };

  this.mbox = document.createElement('div');  // message box
  this.mbox.style.textAlign = 'center';
  this.mbox.innerHTML = '<font style="color:lime;font-family:verdana,tahoma;'
                      + 'font-size:9px;text-align:right;">'+ this.name +'</font>';
  this.mbox.style.position = 'absolute';
  this.mbox.style.display = 'block';
  this.body.appendChild(this.mbox);

  // construct status panel
  this.panel = document.createElement('div');
  this.panel.style.display = 'none';
  var bar = statusBar(this.energy, 'blue', 0);
  this.panel.appendChild(bar);
  this.panel.energybar = bar;
  bar = statusBar(this.exp, 'black', 1);
  this.panel.appendChild(bar);
  this.panel.expbar = bar;
  bar = statusBar(this.power, 'red', 2);
  this.panel.appendChild(bar);
  this.panel.powerbar = bar;

  // status monitor facilities
  this.img.onclick = function(){
    //if(self.world.control) self.control(true);
    if(self.panel.style.display == 'none'){
      self.showPanel(true);
    }else self.showPanel(false);
    if(!self.control && self.world.me)
      self.world.me.meet(self);
  };
  this.img.ondblclick = function(){
    self.status(self);
  };

  this.showPanel = function(isOn){
    if(isOn){
      self.panel.style.display = 'block';
      self.panel.expbar.style.width = self.exp +'px';
      self.panel.powerbar.style.width = self.power +'px';
      self.panel.energybar.style.width = self.energy +'px';
    }else{
      self.panel.style.display = 'none';
    }
  };

  // extend/override constructor w/ passed args object
  for(var i in args)
    eval('this.'+ i +' = args["'+ i +'"];');

  // attach it shadow
  // TODO shadow size auto-adjustment
  if(this.shadow){
    this.shadowImg = document.createElement('img');
    this.shadowImg.style.position = 'absolute';
    this.shadowImg.style.zIndex = -10;
    this.shadowImg.src  = 'image/shadow.gif';
    this.body.appendChild(this.shadowImg);
  }

  function statusBar(value, color, index){
    var div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.display = 'block';
    div.style.top = (3 * index) +'px';
    div.style.width = value +'px';
    div.style.height = '2px';
    div.style.fontSize = '2px';
    div.style.background = color;
    return div;
  };
  this.body.appendChild(this.panel);
};
W.MyCreature.prototype = new W.Creature();


W.MyCreature.prototype.other = function(other){
  var debug = W.errort;
  // reset idle counter
  this.idleCounter = other.idleCounter = 0;
  this.idleCounterLong = other.idleCounterLong = 0;
  if(other.id == -2){
    this.wall();
    return;
  }
  // fire contact event
  other.contact(this);
  // encounter control creature
  if(other.control){
    this.toControl();
  }
  // same team
  if(other.team == this.team){
    if(!this.alive)
      this.reserveAct(this.ifDeadAlly);
    else this.reserveAct(this.ifAlly);
    return;
  }
  // handle neutral creatures
  if(this.team == 0){
    if(!(other.control && this.msgQueue.length != 0))
      this.reserveAct(this.ifNeutral);
    return;  // no harm to others
  }
  if(other.team == 0){
    if(!this.evil){
      this.reserveAct(this.ifNeutral);
      return;
    }
  }

  // other creature
  //debug('encounter', 'an enemy.');
  if(!other.alive){
    this.reserveAct(this.ifDeadEnemy);
    return;
  }
  // other will know its here too
  this.reserveAct(this.ifEnemy);
  // handle main creature
  if(this == this.world.me){
    if(!this.attack) return;
    else this.attack = false;  // reset the attack flag
  }
  // apply handicap
  if(this.handiCounter != this.handicap){
    ++this.handiCounter;
    return;
  }else this.handiCounter = 0;
  // mark the damage
  other.energy -= this.power;
  if(other.energy > 0){
    other.showPanel(true);
    other.reserveAct(other.ifAttacked);
    return;
  }
  // dead then take the exp(erience) or it could be items later
  this.exp += other.exp;
  if(this.exp >=  48){  // when exp reached the max, power up.
    this.exp -= 48 + 1;
    ++this.power;
  }
  this.showPanel(true);
  // dead creature handle
  other.alive = false;
  other.showPanel(false);
  other.reserveAct(other.ifDead);
};

// invokes when creature become idle
W.MyCreature.prototype.findEnemy = function(){var temp;
  var enemy = -1;
  var minPath = this.world.rows + this.world.cols;
  for(var i = 0; i < this.world.creatures.length; ++i){
    var that = this.world.creatures[i];
    if(that != -1 && this.team != that.team && that.team != 0){
      temp = that.row + that.col;
      if(temp < minPath){
        enemy = i;
        minPath = that;
      }
    }
  }
  if(enemy != -1)
    return this.world.creatures[enemy];
  return 0;
};

W.MyCreature.prototype.search = function(){
  this.that = this.findEnemy();
  if(this.that == 0){
    if(this.control){
      this.win();
      return;
    }
    this.reserveAct(this.ifFinished);
    return;
  }
};


/**
 * override the original W.Creature.action() with more instructions
 */
W.MyCreature.prototype.action = function(){var self = this;
  // hide means being invisible and no acting at all
  if(this.act == 'hide') return;
  var debug = W.error;
  // manage actionQueue
  if(this.actQueue.length != 0)  // check any reserved act
    this.act = this.actQueue.shift();  // check out next action
  if(this == this.world.me && this.alive)
    keyControl(this);  // keyscan for main creature
  // check alert mode / idle counters
  if(this.alert){
    if(this.idleCounter == this.idleMax){
      if(this.idleCounterLong == this.idleLongMax){
        this.idleCounterLong = 0;
        this.reserveAct(this.ifLongIdle);
        //debug('idleCounterLong', this.idleCounterLong);
        return;
      }else ++ this.idleCounterLong;
      this.idleCounter = 0;
      this.showPanel(false);
      this.reserveAct(this.ifIdle);
    }else ++this.idleCounter;
  }

  switch(this.act){
    // change direction
    case 'left': this.turnTo('left'); break;
    case 'right': this.turnTo('right'); break;
    case 'backward': this.turnTo('backward'); break;
    case 'rturn': this.turnTo('rturn'); break;
    // change absolute compass
    case 'north': this.turnTo('north'); break;
    case 'east': this.turnTo('east'); break;
    case 'south': this.turnTo('south'); break;
    case 'west': this.turnTo('west'); break;
    // command operations
    case 'alert': this.inAlert(true); break;
    case 'relax': this.inAlert(false); break;
    case 'search': this.search(); break;
    case 'approach': this.search(); this.meet(this.that); break;
    case 'avoid': this.search(); this.avoid(); break;
    case 'go': this.go(); break;
    // non-movemental actions
    case 'vanish':
    this.body.style.display = 'none';
    this.world.erase(this.id);
    return;
    case 'remain':
    this.body.style.zIndex = 1;
    this.world.erase(this.id);
    return;
    case 'still': return;
    case 'win': this.win(); return;
    // other instructions: do nothing
    case 'die':
      this.img.src = this.skills['die']['img'];
      return;
    case 'damage':
    case 'walk':
    // otherwise, change animation film
    default:
      this.img.src = this.skills[this.act]['img'];
  }
  this.act = 'walk';

  // manage frame
  if(this.frame == this.skills[this.act][this.dir].length - 1){
    this.frame = 0;
  }else ++this.frame;

  // move creature
  var bodyPos = 0;
  if(this.dir == 'north' || this.dir == 'south')
    bodyPos = parseInt(this.body.style.top);
  else bodyPos = parseInt(this.body.style.left);
  var isWall = false;
  var act = this.skills[this.act];

  switch(this.dir){
    case 'north':
      this.img.style.top = -act.north[this.frame].top +'px';
      this.img.style.left = -act.north[this.frame].left +'px';
      if(this.act != 'walk') return;
      bodyPos -= this.speed;
      //window.status = bodyPos +', speed:'+ this.speed;
      this.body.style.zIndex = bodyPos + 10;
      if(bodyPos >  -this.speed) changeRow(bodyPos);
      else isWall = true;
      break;
    case 'east':
      this.img.style.top = -act.east[this.frame].top +'px';
      this.img.style.left = -act.east[this.frame].left +'px';
      if(this.act != 'walk') return;
      bodyPos += this.speed;
      if(bodyPos < this.maxLeft + this.speed) changeCol(bodyPos);
      else isWall = true;
      break;
    case 'south':
      this.img.style.top = -act.south[this.frame].top +'px';
      this.img.style.left = -act.south[this.frame].left +'px';
      if(this.act != 'walk') return;
      bodyPos += this.speed;
      this.body.style.zIndex = bodyPos + 10;
      if(bodyPos < this.maxTop + this.speed) changeRow(bodyPos);
      else isWall = true;
      break;
    case 'west':
      this.img.style.top = -act.west[this.frame].top +'px';
      this.img.style.left = -act.west[this.frame].left +'px';
      if(this.act != 'walk') return;
      bodyPos -= this.speed;
      if(bodyPos > -this.speed) changeCol(bodyPos);
      else isWall = true;
      break;
    default:
  }
  if(isWall) this.wall();

  function keyControl(creature){
    var debug = W.error;
    switch(W.key){
      case 32:  // spacebar
        creature.act = 'attack';
      creature.attack = true;
      creature.frame = 0;
      W.key = -1;
      return;
      case 37:  // left
        creature.dir = 'west'; break;
      case 38:  // up
        creature.dir = 'north'; break;
      case 39:  // right
        creature.dir = 'east'; break;
      case 40:  // down
        creature.dir = 'south'; break;
      default:
        W.key = -1;
    };
    if(this.act != 'still')
      creature.act = 'walk';
  };

  // TODO handle multi-unit creatures
  function changeCol(left){var value = 0;
    if(self.dir == 'east'){
      value = Math.ceil(left / self.world.unit);
    }else if(self.dir == 'west') value = Math.floor(left / self.world.unit);

    if(value != self.col){
      var other = self.world.at(self.row, value);
      if(other){
        self.other(other);  // other creature detected
        return;
      }else{
        // following two lines of code should be as atomic as possible
        self.world.matrix[self.row][value] = self.id;
        self.world.matrix[self.row][self.col] = -1;
        self.col = value;  // change col prop.
      }
    }
    self.body.style.left = left +'px';  // move body
    self.attack = false;
  };

  function changeRow(top){
    var value = 0;
    if(self.dir == 'south'){
      value = Math.ceil(top / self.world.unit);
    }else if(self.dir == 'north') value = Math.floor(top / self.world.unit);

    if(value != self.row){
      var other = self.world.at(value, self.col);
      if(other){
        self.other(other);  // other creature detected
        return;
      }else{
        self.world.matrix[value][self.col] = self.id;
        self.world.matrix[self.row][self.col] = -1;
        self.row = value;  // change row prop.
      }
    }
    self.body.style.top = top +'px';  // move body
    self.attack = false;
  };
};


W.MyCreature.prototype.avoid = function(){
  // search the closest enemy
  // be alert
  this.idleMax = 5;

  if(this.searchToggle){
    if(this.row > this.that.row)
      this.dir = 'south';
    else if(this.row < this.that.row)
      this.dir = 'north';
    this.searchToggle = false;
  }else{
    if(this.col > this.that.col)
      this.dir = 'east';
    else if(this.col < this.that.col)
      this.dir = 'west';
    this.searchToggle = true;
  }
};


W.MyCreature.prototype.go = function(row, col){
  if(typeof row != 'undefined') this.goRow = row;
  if(typeof col != 'undefined') this.goCol = col;
  if(this.row == this.goRow && this.col == this.goCol){
    this.alert = false;
    this.reserveAct('still');
    return;
  }

  if(this.row > this.goRow){
    this.dir = 'north';
    return;
  }else if(this.row < this.goRow){
    this.dir = 'south';
    return;
  }

  if(this.col > this.goCol){
    this.dir = 'west';
    return;
  }else if(this.col < this.goCol){
    this.dir = 'east';
    return;
  }
};



// invokes when creature become alert mode
W.MyCreature.prototype.inAlert = function(isAlert){
  if(isAlert){
    this.alert = true;
    this.idleCounter = this.idleMax;
  }else this.alert = false;
};


W.MyCreature.prototype.says = function(msg){
  this.msgQueue.push(msg);
};


W.MyCreature.prototype.toControl = function(){
  if(this.msgQueue.length == 0) return;
  var msg = this.msgQueue[0];
  // maintain message queue
  for(var i = 0; i < this.msgQueue.length - 1; ++i)
    this.msgQueue[i] = this.msgQueue[i + 1];
  this.msgQueue.pop();
  this.say(msg);
};


W.MyCreature.prototype.makeControl = function(isControl){
    if(isControl){
      this.alert = true;
      this.world.control = true;
      this.world.me = this;
      this.ifWall = 'still';
      this.ifEnemy = '';
      this.ifAlly  = '';
      this.ifDeadAlly = '';
      this.ifEnemy = '';
      this.ifDeadEnemy = 'search';
      this.ifNeutral = '';
      this.ifDead = 'damage,die,remain';
      this.ifIdle  = 'go';
      this.ifLongIdle  = 'go';
      this.ifAttacked = 'damage';
      this.ifFinished = 'win';
      this.handicap = 0;
    }else this.world.me = -1;
};


W.MyCreature.prototype.meet = function(creature){
  this.idleMax = 5;  // be alert
  this.alert = true;
  this.that = creature;
  this.go(this.that.row, this.that.col);
};


W.MyCreature.prototype.status = function(){
  var var_val = function(prop, val){return '['+ prop+']: '+ val +'\n'};
  var c = '\n\n- creature properties -\n';
  c += var_val('name', this.name);
  c += var_val('species', this.species);
  c += var_val('team', this.team);
  c += var_val('act', this.act);
  c += var_val('alive', this.alive);
  c += var_val('dir', this.dir);
  c += var_val('row', this.row);
  c += var_val('col', this.col);
  c += var_val('alert', this.alert);
  c += var_val('energy', this.energy);
  c += var_val('power', this.power);
  c += var_val('exp', this.exp);
  c += var_val('speed', this.speed);
  c += var_val('handicap', this.handicap);

  c += var_val('ifIdle', this.ifIdle);
  c += var_val('ifDead', this.ifDead);
  c += var_val('ifEnemy', this.ifEnemy);
  c += var_val('ifFinished', this.ifFinished);

  c += '\n\n- world status -\n';
  c += '\t';
  for(var j = 0; j < this.world.matrix[0].length; ++j)
    c += j + '\t';
  for(var i = 0; i < this.world.matrix[0].length; ++i){
    for(var i = 0; i < this.world.matrix.length; ++i){
      c += '\n'+ i +':\t';
      for(var j = 0; j < this.world.matrix[0].length; ++j){
        c += this.world.matrix[i][j] + '\t';
      }
    }
    c += '\n\n';
  }
  c += var_val('num creatures', this.world.creatures.length);
  alert(c);
};