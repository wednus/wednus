/* stage 0 */
var world = new W.World({
  top: 34,
  left: 36,
  width: 24 * 11,
  height: 24 * 15,
  delay: 10,
  begin: '8,0,west'
});
world.set('0:0,1,6,7,8,9,10');
world.set('1:0,1');
world.set('4:8,9,10');
world.set('5:8,9,10');
world.set('5:0,1,2');
world.set('6:0,1,2,8,9,10');
world.set('7:0,1,2');
world.set('12:0,1,2,3,6,7,8,9,10');
world.set('13:0,1,2,3,6,7,8,9,10');
world.set('14:0,1,2,3,6,7,8,9,10');
world.background(0, 0, 336, 384, 'app/wayHome/stages/lv1/image/myroom.jpg');

/* stage 1 */
world = new W.World({
  top: 136,
  left: 52,
  width: 24 * 24,
  height: 24 * 14,
  grid: false,
  delay: 10,
  begin: '0,4,south'
});
world.background(0, 0, 640, 572, 'app/wayHome/stages/lv1/image/frontyard.jpg');

/* stage 2 */
world = new W.World({
  top: 34,
  left: 36,
  width: 24 * 19,
  height: 24 * 17,
  grid: false,
  delay: 10,
  begin: '4,4,south'
});
world.set('0:0,1,7,8');
world.set('1:0');
world.set('12:17,18');
world.set('13:16,17,18');
world.set('14:0,1,2,3,4,5,6,7,10,11,12,13,14,15,16,17,18');
world.set('15:0,1,2,3,4,5,6,7,10,11,12,13,14,15,16,17,18');
world.background(0, 0, 528, 432, 'app/wayHome/stages/lv1/image/backyard.jpg');


/* stage 3 */
world = new W.World({
  top: 34,
  left: 60,
  width: 24 * 15,
  height: 24 * 14,
  grid: false,
  delay: 10,
  begin: '2,2,south'
});
world.set('0:0');
world.set('1:5,6');
world.set('2:5,6');
world.set('3:5,6,7,8,9,10,11,12,13,14');
world.set('4:5,6,7,8,9,10,11,12,13,14');
world.set('7:0,1,2');
world.set('8:0,1,2');
world.set('9:0,1,2');
world.set('10:0,1');
world.set('11:13,14');
world.set('12:0,1,2,3,4,5,6,7,8,9,11,12,13,14');
world.background(0, 0, 440, 370, 'app/wayHome/stages/lv1/image/bar.jpg');


/* stage 4 */
world = new W.World({
  top: 34,
  left: 50,
  width: 24 * 10,
  height: 24 * 14,
  grid: false,
  delay: 10
});
world.set('0:0,1,2,3,7,8');
world.set('1:0,1');
world.set('4:8');
world.set('5:7,8');
world.set('7:8');
world.set('8:0,7,8');
world.set('9:0,1,7,8');
world.set('10:0,1,7,8');
world.set('11:0,1,5,6,7,8');
world.set('12:0,1,2,3,5,6,7,8');
world.background(0, 0, 300, 370, 'app/wayHome/stages/lv1/image/warehouse.jpg');


/* stage 5 */
world = new W.World({
  top: 28,
  left: 10,
  width: 24 * 9,
  height: 24 * 11,
  grid: false,
  delay: 10,
  begin: '0,2,south'
});
world.set('0:0,1,4,5,6,7');
world.set('1:0,1,4,5,6,7');
world.set('2:0,1,4,5,6,7');
world.set('3:0,1,4,5,6,7');
world.set('8:7');
world.set('9:6,7');
world.background(0, 0, 240, 300, 'app/wayHome/stages/lv1/image/smallroom.jpg');


/* stage 6 */
world = new W.World({
  top: 10,
  left: 12,
  width: 24 * 11,
  height: 24 * 13,
  grid: false,
  delay: 10
});
world.background(0, 0, 300, 370, 'app/wayHome/stages/lv1/image/underground.jpg');