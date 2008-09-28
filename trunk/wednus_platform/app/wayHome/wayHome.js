// open a custom namespace
if(!W.USER) W.USER = new Object();
if(!W.USER.wayHome) W.USER.wayHome = new Object();

// world
W.USER.wayHome.worlds = new Array();
W.USER.wayHome.creature = function(name){
  var creature = new W.Creature();
  // add skills
  creature.add({name: 'walk', img: 'image/creatures/'+ name +'/walk.gif',
    north: '0:0,0:48,0:96',
    east:  '48:0,48:48,48:96',
    south: '96:0,96:48,96:96',
    west:  '144:0,144:48,144:96'
  });
  this.creatures[name] = this.creatures[name].split(',')
  for(var i in this.creatures[name])
    creature.add({name: this.creatures[name][i], img: 'image/creatures/'+ name +'/'
                  + this.creatures[name][i]+'.gif'});
  return creature;
}

W.USER.wayHome.creature2 = function(name){
  var creature = new W.Creature();
  // add skills
  creature.add({name: 'walk', img: 'image/creatures/'+ name +'/walk.gif',
    north: '0:0,0:96,0:192',
    east:  '96:0,96:96,96:192',
    south: '192:0,192:96,192:192',
    west:  '288:0,288:96,288:192'
  });
  this.creatures[name] = this.creatures[name].split(',')
  for(var i in this.creatures[name])
    creature.add({name: this.creatures[name][i], img: 'image/creatures/'+ name +'/'
                  + this.creatures[name][i]+'.gif'});
  return creature;
}

W.USER.wayHome.creature3 = function(name){
  var friend = new W.sCreature();
  // add skills
  friend.add({name: 'walk', img: 'image/creatures/wonderers/creature_'+ name +'.gif',
    north: '0:0,0:48,0:96',
    east:  '48:0,48:48,48:96',
    south: '96:0,96:48,96:96',
    west:  '144:0,144:48,144:96'
  });
  return friend;
}

W.USER.wayHome.creatures = new Array();
with(W.USER.wayHome){
  creatures.me = 'attack,atkar,atksw,damage,die,fedm,magi,poison,scre,sndm,thdm,win,walk';
}

// main character
var me = W.USER.wayHome.creature('me');
with(me){
  power = 8;
  speed = 6;
  energy = 500;
  does('attack');
  team = 'haru';
}
me.control = true;
me.windex = 0;

me.win = function(){
  ++me.windex;
  if(!W.USER.wayHome.worlds[me.windex]){
    alert('finally won');
    me.reserveAct('still');
    me.world.stop = true;
    return;
  }else{
    me.world.div.style.display = 'none';
    me.world.back.style.display = 'none';
    me.world.stop = true;
    W.USER.wayHome.worlds[me.windex].add(me);
    // add boru
    if(me.windex == W.USER.wayHome.worlds.length - 1)
      worlds[me.windex].add(boru);
  }
};

W.message = function(msg){
  alert(msg);
};
