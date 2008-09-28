W.a.wrpg.init = function(world){
  // define creatures
  var human = new W.MyCreature();
  human.act = 'walk';
  human.uwidth = 2;
  human.uheight = 2;
  human.control = true;
  human.power = 10;
  human.energy = 30;
  // add skills
  human.add({name: 'walk', img: 'module/darwin/test/image/walk.gif',
    north: '0:0,0:48,0:96',
    east:  '48:0,48:48,48:96',
    south: '96:0,96:48,96:96',
    west:  '144:0,144:48,144:96'
  });
  world.insert(human);
};
W.background('black');