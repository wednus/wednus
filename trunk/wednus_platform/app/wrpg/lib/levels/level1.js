// define world
// iphone dimension: 320 x 480

W.a.wrpg.init = function(world){
  // define creatures
  var human = new W.MyCreature();
  human.team = 2;
  human.name = 'sundew';
  human.species = 'human';
  human.dir = 'south';
  human.power = 1;
  human.speed = 8;
  human.uwidth = 2;
  human.uheight = 2;
  human.energy = 30;
  human.act = 'walk';
  // add skills
  human.add({name: 'walk', img: 'module/darwin/test/image/walk.gif',
    north: '0:0,0:48,0:96',
    east:  '48:0,48:48,48:96',
    south: '96:0,96:48,96:96',
    west:  '144:0,144:48,144:96'
  });
  human.add({name: 'attack', img: 'module/darwin/test/image/attack.gif'});
  human.add({name: 'damage', img: 'module/darwin/test/image/damage.gif'});
  human.add({name: 'die', img: 'module/darwin/test/image/die.gif'});

  var turtlex = new W.MyCreature();
  turtlex.team = 1;
  turtlex.name = 'turtlex';
  turtlex.species = 'evil';
  turtlex.dir = 'south';
  turtlex.power = 1;
  turtlex.speed = 3;
  turtlex.uwidth = 2;
  turtlex.uheight = 2;
  turtlex.energy = 30;
  turtlex.act = 'walk';
  turtlex.add({name: 'walk', img: 'module/darwin/test/image/kileen/walk.gif',
    north: '0:0,0:48,0:96',
    east:  '48:0,48:48,48:96',
    south: '96:0,96:48,96:96',
    west:  '144:0,144:48,144:96'
  });
  turtlex.add({name: 'attack', img: 'module/darwin/test/image/kileen/atk.gif'});
  turtlex.add({name: 'damage', img: 'module/darwin/test/image/kileen/fedm.gif'});
  turtlex.add({name: 'die', img: 'module/darwin/test/image/kileen/sndm.gif'});

  for(var i = 0; i < 10; ++i){
    world.add(turtlex.clone());
    world.add(human.clone(), 18, 11);
  }
};
W.background('black');
