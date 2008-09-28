with(W.USER.wayHome){
  creatures.b00 = 'attack,walk,dm,damage,die,thdm';
  creatures.b01 = 'attack,brea,damage,magi,die,thdm,walk';
  creatures.b02 = 'atk,chac,chwk,dm,fedm,sndm,thdm,walk';
  creatures.b03 = 'attack,crht,dm,damage,magi,die,thdm,walk';
  creatures.b04 = 'attack,dm,damage,magi,die,thdm,walk';
  creatures.b05 = 'attack,crht,dm,damage,die,thdm,walk';
  creatures.m43 = 'attack,break,dm,damage,die,thdm,walk';
  creatures.m02 = 'attack,damage,die,dm,thdm,walk';
  creatures.m08 = 'attack,damage,die,dm,thdm,walk';
  creatures.m18 = 'attack,damage,die,dm,thdm,walk';
}

var baron = W.USER.wayHome.creature2('b03');
with(baron){
  name = 'Baron';
  power = 4;
  speed = 4;
  exp = 30;
  energy = 80;
  does('walk');
  row = 3;
  col = 5;
  dir = 'west';
  team = 'enemy';
  uwidth = 4;
  uheight = 4;
  udepth = 1;
}

W.USER.wayHome.enemy = function(name){
  var enemy = this.creature(name);
  with(enemy){
  power = 1;
  speed = 4;
  energy = 40;
  does('walk');
  team = 'enemy';
  row = 4;
  col = 4;
  }
  return enemy;
};

W.USER.wayHome.friend = function(name){
  var friend = this.creature3(name);
  with(friend){
  power = 1;
  speed = 3;
  energy = 40;
  does('walk');
  team = 0;
  row = 6;
  col = 6;
  }
  return friend;
};

var b00 = W.USER.wayHome.enemy('b00');
var croco = W.USER.wayHome.enemy('b01');
var mudMonster = W.USER.wayHome.enemy('m43');
var b04 = W.USER.wayHome.enemy('b04');
var b05 = W.USER.wayHome.enemy('b05');
var greenMon = W.USER.wayHome.enemy('m02');
var boru = W.USER.wayHome.enemy('m18');
var bigcrow = W.USER.wayHome.enemy('m08');
var boy = W.USER.wayHome.friend('006');  // max:120
var blondgirl = W.USER.wayHome.friend('29');  // max:120
mudMonster.name = 'Mud Monster'
greenMon.name = 'Cave penquin';
boru.name = 'Boru';
bigcrow.name = 'Cave crow';
bigcrow.power = 2;
croco.power = 4;
croco.name = 'Earth Dragon';
boru.energy = 200;
boru.power = 1;
boru.team = 'haru';
blondgirl.name = 'Mae';
