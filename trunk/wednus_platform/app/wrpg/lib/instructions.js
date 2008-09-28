/**
 * \file instructions.js   Instructions for Creature class
 *
 * This file extends the Creature class with more instructions.
 * Performs followings:
 */


/* built-in commands
attack:		attack enemy
still: 		be still
rturn/left/right/backward: turns
hide:		invisible
vanish: 	vanish away
remain:		not vanish after death
// AI
alert:		be alert(AI on)
relax:		be relaxed
search:	    search enemy
approach:	approach to the nearest enemy
avoid: 		run away from the closest enemy
// system
win:		finish the world
*/
// encounter creatures
W.Creature.prototype.ifAlly  = 'rturn';
W.Creature.prototype.ifDeadAlly = 'alert,rturn';
W.Creature.prototype.ifEnemy = 'attack,alert';
W.Creature.prototype.ifEnemyAtBack = 'backward';
W.Creature.prototype.ifDeadEnemy = 'rturn';
W.Creature.prototype.ifNeutral = 'rturn';
// creature contact event
W.Creature.prototype.ifAttacked  = 'damage,alert';
W.Creature.prototype.ifDead  = 'die,still,still,still,still,still,still,still,still,vanish';
// other objects
W.Creature.prototype.ifWall  = 'rturn';
// status event
W.Creature.prototype.ifIdle  = 'approach';
W.Creature.prototype.ifLongIdle  = 'relax';
// system event
W.Creature.prototype.ifFinished  = 'relax';



/*
  var instructions = new Array();
  instructions['walk'] 		= 'walk';
  instructions['attack'] 	= 'atk';
  instructions['down'] 		= 'dm';
  instructions['faint'] 	= 'fedm';
  instructions['stone']		= 'sndm';
  instructions['thunder'] 	= 'thdm';
  instructions['march'] 	= 'crht';
  instructions['magic'] 	= 'magi';
  instructions['powerup'] 	= 'miwp';
  instructions['vanish'] 	= 'crht';

  instructions['still'] 	= 'chac';
  instructions['see'] 		= 'chak';
  instructions['shake'] 	= 'chwk';
  instructions['stand'] 	= 'scpr';
  instructions['angry'] 	= 'brea';

  instructions['arrow'] 	= 'atkar';
  instructions['sward'] 	= 'atksw';
  instructions['damage'] 	= 'damage';
  instructions['die'] 		= 'die';
  instructions['poison'] 	= 'poison';
  instructions['win'] 		= 'win';
  instructions['scream'] 	= 'scre';

  this.instructions = instructions;
*/