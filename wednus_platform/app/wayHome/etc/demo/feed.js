var world = new Wednus.RPG.World(6, 8, 10, 124);
world.background(0, 0, 262, 309, 'map/smallroom.jpg');
//world.setGrid(true);

/*
data = 'walk,magic,walk,poison,walk,attack,walk,stone,walk,scream,walk';//,walk,damage,still'
a = world.insert('you', 0, 0, 'south', 'walk', 'team2');
a.reserveAct(data);
*/

//var acts = 'magic:poison:attack:scream:die,still:faint:damage:win,still:stone'.split(':');
//var acts = 'atk:dm:fedm:scpr:scre:sndm:thdm:walk:walk'.split(':');
//var acts = 'atk:dm:fedm:scpr:scre:sndm:thdm'.split(':');
var acts = 'walk:attack:down:faint:stone:thunder'.split(':');

for(var i = 0; i < 3; ++i){
  for(var j = 0; j < 3; ++j){
    if((i * 3 + j) <= acts.length - 1){
      data = acts[i * 3 + j];
      a = world.insert('b01', i * 2, (j + 1) * 2, 'south', 'walk', 'team1');
      a.reserveAct(data);
    }
  }
}