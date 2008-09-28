/**
 * \file Creature.js Wednus Creature class
 *
 * This file contains the class definition of the W.Creature.
 * @author Sundew H. Shin
 */

/**
 * Creature class
 *
 * This class implements a prototype of simulated organic objects. (creature)
 * @param {Object} args extend/override constructor w/ this passed args object
 * @test <a href='../../test/Creature.html'>default construction</a>
 */
W.Creature = function(args){var self = this;
  this.id = 0;
  // position coordinate on a world
  this.col = 0;
  this.row = 0;
  this.act = 'hide';
  this.dir = 'south';
  // u(nit) size; 1 unit = 1 * world.unit
  this.uwidth = 1;
  this.uheight = 1;
  this.udepth = 1;
  // internal reference only (need to be private)
  this.frame = 0;
  this.maxTop = 0;
  this.maxLeft = 0;
  // sprite animation speed - the smaller, the smoother animation (more CPU time)
  this.speed = 6;
  // internal reference only (need to be private)
  this.actQueue = [];
  this.skills = [];
  this.add({name: 'hide', img: 'module/oracle/image/blank.gif',
    north: '0:0', east: '0:0', south: '0:0', west: '0:0'});
  // visual components
  this.img = document.createElement('img');
  this.img.title = this.id + ' : '+ this.name;
  this.img = W.style('img', 'position:absolute;left:-1000px');
  this.body = W.style('div', 'position:absolute;top:0px;left:0px;overflow:hidden');
  this.body.appendChild(this.img);

  /**
   * resize the creature
   *
   * @param {Number} uwidth unit width; 1 unit = 1 * world.unit
   * @param {Number} uheight unit height; 1 unit = 1 * world.unit
   */
  this.resize = function(unit){
    this.width = this.uwidth * unit;
    this.height = this.uheight * unit;
    this.depth = this.udepth * unit;
    this.body.style.width = this.width +'px';
    this.body.style.height = this.height +'px';
  };

  this.turn = function(){
    var offset = this.width;
    switch(this.dir){  // still image set based on the direction
      case 'north': this.img.style.top = '0px'; break;
      case 'east': this.img.style.top = (-offset) +'px'; break;
      case 'south': this.img.style.top = (-offset * 2) +'px'; break;
      case 'west': this.img.style.top = (-offset * 3) +'px'; break;
    };
    this.img.style.left = '-48px';
  };

  // extend/override constructor w/ passed args object
  for(var i in args)
    eval('this.'+ i +' = args["'+ i +'"];');
};


/**
 * clone this creature and return the clone
 * @return {Creature} creature the product of cloning
 * @test <a href='../../test/walkaround_lemmings.html'>add creature with cloning</a>
 */
W.Creature.prototype.clone = function(){
  var clone = new W.Creature();
  for(var i in this){
    if(i != 'body' && i != 'img' && i != 'panel')
      eval('clone.'+ i +' = this["'+ i +'"];');
  }
  clone.msgQueue = [];
  this.ifWall = 'rturn';
  this.ifEnemy = 'attack,walk';
  return clone;
};


/**
 * add a skill, an animation
 *
 * @param {Skill} skill object with animation information; e.g. W.Skill
 * @requires W.Skill
 * @note 'a skill' is an object with definitions of an animation
 * @test <a href='../../test/walkaround_reymond.html'>add creature (1-frame: animation gif)</a>
 * @test <a href='../../test/walkaround_chocobo.html'>add creature (4-frame)</a>
 * @test <a href='../../test/walkaround_villager.html'>add creature (4-frame)</a>
 * @test <a href='../../test/walkaround_rock_cn_sprites.html'>add creature (6-frame)</a>
 * @test <a href='../../test/walkaround_lemming.html'>add creature (8-frame)</a>
 * @test <a href='../../test/walkaround_gorgon.html'>add creature (4 uwidth/uheight sprite)</a>
 */
/*
W.Creature.prototype.add = function(skill){
  // allow skill to refer creature it added
  skill.creature = this;
  this.skills[skill.name] = skill;
};
*/

/**
 * add a skill, an animation
 * @param {Object} args object with animation information
 * @note 'a skill' is an object with definitions of an animation
 * @test <a href='../../test/walkaround_reymond.html'>add creature (1-frame: animation gif)</a>
 * @test <a href='../../test/walkaround_chocobo.html'>add creature (4-frame)</a>
 * @test <a href='../../test/walkaround_villager.html'>add creature (4-frame)</a>
 * @test <a href='../../test/walkaround_rock_cn_sprites.html'>add creature (6-frame)</a>
 * @test <a href='../../test/walkaround_lemming.html'>add creature (8-frame)</a>
 * @test <a href='../../test/walkaround_gorgon.html'>add creature (4 uwidth/uheight sprite)</a>
 * @test <a href='../../test/walkaround_with_debug.html'>add creature with debug enable</a>
 */
W.Creature.prototype.add = function(args){
  // memory the latest sprite coordinate data
  if(this.northRule && this.northRule != '0:0')
    args.north = args.north?args.north:this.northRule;
  else this.northRule = args.north;
  if(this.eastRule && this.eastRule != '0:0')
    args.east = args.east?args.east:this.eastRule;
  else this.eastRule = args.east;
  if(this.southRule && this.southRule != '0:0')
    args.south = args.south?args.south:this.southRule;
  else this.southRule = args.south;
  if(this.westRule && this.westRule != '0:0')
    args.west = args.west?args.west:this.westRule;
  else this.westRule = args.west;

  this.skills[args.name] = [];
  var skill = this.skills[args.name];  // get reference
  skill['img'] = W.path + (args.img?args.img:'module/oracle/image/blank.gif');
  skill['speed'] = this.speed;
  if(args.north)
    skill['north'] = splitter(args.north);
  if(args.south)
    skill['south'] = splitter(args.south);
  if(args.east)
    skill['east'] = splitter(args.east);
  if(args.west)
    skill['west'] = splitter(args.west);
  // split by comma
  function splitter(str){
    var tmp = str.split(',');
    var arr = [];
    for(var i = 0; i < tmp.length; ++i){
      tmp[i] = tmp[i].split(':');
      arr[i] = {};
      arr[i].top = tmp[i][0];
      arr[i].left = tmp[i][1];
    }
    return arr;
  };
};

/**
 * perform the current action
 * @test <a href='../../test/place_occupying_hori.html'>test changeCol</a>
 * @test <a href='../../test/place_occupying_vert.html'>test changeRow</a>
 * @test <a href='../../test/place_occupying.html'>test changeCol/changeRow</a>
 * @test <a href='../../test/animation_reymond.html'>animate creature (1-frame: animation gif)</a>
 * @test <a href='../../test/animation.html'>animate creature (3-frame)</a>
 * @test <a href='../../test/animation_villager.html'>animate creature (4-frame)</a>
 * @test <a href='../../test/animation_rock_cn_sprites.html'>animate creature (6-frame)</a>
 * @test <a href='../../test/animation_lemming.html'>animate creature (8-frame)</a>
 */
W.Creature.prototype.action = function(){var self = this;
  // hide means being invisible and no acting at all
  if(this.act == 'hide') return;
  // manage actionQueue
  if(this.actQueue.length != 0)  // check any reserved act
    this.act = this.actQueue.shift();  // check out next action

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
    case 'walk':
    // otherwise, change animation film
    default:
      this.img.src = this.skills[this.act]['img'];
  }
  // this.act = 'walk';

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

  function changeRow(top){var value = 0;
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


/**
 * turn to the specified direction
 *
 * @param {String} dir the direction to turn to
 */
W.Creature.prototype.turnTo = function(dir){
  switch(dir){
    case 'rturn':
      var direction  = ['north', 'south', 'east', 'west'];
      this.dir = direction[Math.floor(Math.random() * 4)];
      break;
    case 'left':
      switch(this.dir){
        case 'north': this.dir = 'west';  break;
        case 'south': this.dir = 'east';  break;
        case 'east':  this.dir = 'north'; break;
        case 'west':  this.dir = 'south'; break;
      }; break;
    case 'right':
      switch(this.dir){
        case 'north': this.dir = 'east';  break;
        case 'south': this.dir = 'west';  break;
        case 'east':  this.dir = 'south'; break;
        case 'west':  this.dir = 'north'; break;
      }; break;
    case 'backward':
      switch(this.dir){
        case 'north': this.dir = 'south'; break;
        case 'south': this.dir = 'north'; break;
        case 'east':  this.dir = 'west';  break;
        case 'west':  this.dir = 'east';  break;
      }; break;
    case 'north':
      this.dir = 'north'; break;
    case 'east':
      this.dir = 'east'; break;
    case 'south':
      this.dir = 'south'; break;
    case 'west':
      this.dir = 'west'; break;
  };
  this.turn();
  this.act = 'walk';
};

/**
 * meet other creature
 *
 * @param {Creature} other the creature this creature encountered
 * @note current implementation: turn back and walk away
 */
W.Creature.prototype.contact = function(other){
  switch(this.dir){
    case 'north':
      switch(other.dir){
        case 'north': this.dir = 'south';  break;
        case 'east':  this.dir = 'west'; break;
        case 'west':  this.dir = 'east'; break;
      }; break;
    case 'south':
      switch(other.dir){
        case 'south': this.dir = 'north';  break;
        case 'east':  this.dir = 'west';  break;
        case 'west':  this.dir = 'east'; break;
      }; break;
    case 'east':
      switch(other.dir){
        case 'east': this.dir = 'west'; break;
        case 'north': this.dir = 'south'; break;
        case 'south':  this.dir = 'north';  break;
      }; break;
    case 'west':
      switch(other.dir){
        case 'west': this.dir = 'east'; break;
        case 'north': this.dir = 'south'; break;
        case 'south':  this.dir = 'north';  break;
      }; break;
  }
};


/**
 * meet other creature - 2
 *
 * @param {Creature} other the creature this creature encountered
 * @note current implementation: treat as wall
 */
W.Creature.prototype.other = function(other){
  this.wall();
  return;
};


/**
 * face the wall
 */
W.Creature.prototype.wall = function(){
  this.reserveAct(this.ifWall);
};


/**
 * reserve an action
 *
 * @param {String} str action name
 */
W.Creature.prototype.reserveAct = function(str){
  str = str?str:'walk';
  this.actQueue = str.split(',');
};


/**
 * do something
 * @param {String} op the name of operation
 */
W.Creature.prototype.does = function(op){
  this.act = op;
};


/**
 * play series of actions
 *
 * @param {String} scenario comma-splited series of actions
 */
W.Creature.prototype.play = function(scenario){
  scenario += '';
  this.actQueue = scenario.split(',');
};


/**
 * researve series of actions
 *
 * @param {String} scenario comma-splited series of actions
 * @note merging_two_arrays.html
 */
W.Creature.prototype.reserve = function(scenario){
  scenario += '';
  this.actQueue = this.actQueue.concat(scenario.split(','));
};