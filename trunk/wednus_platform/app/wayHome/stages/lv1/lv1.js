var worlds = W.USER.wayHome.worlds;
worlds[0].add(me);


/* stage 0 */
me.dir = 'north';
var mae = blondgirl.clone();
mae.says('hey Haru, I have something to tell you...');
mae.says('do you know what is that strange creature crawling all around here??');
mae.says('sorry to bring you a trouble.. but it snicked into your roon when I was entering');
mae.says('they are all over the place!!');
mae.dir = 'west';
worlds[0].add(mae, 8, 9);
var weirdy = mudMonster.clone();
weirdy.says('(..ggree,,e,,,)');
worlds[0].add(weirdy);


/* stage 1 */
b00.says('HAHA. it is time! we will all die!! HAHAHA.');
b00.says('What are you looking at!!  HA?');
b00.says('PUHAHA~  you said you don\'t wanna hurt me??');
b00.says('Don\'t worry.  you can\'t.');
b00.says('We will all die soon, but I think, you will die sooner!  Take this~!!');
worlds[1].add(b00);
var friend = W.USER.wayHome.friend(108);
friend.says('I \'m looking for Haru..');
friend.says('oh!, you are!.');
friend.says('hey, Haru. I\'ve heard you are the one who took down Zaron last year.');
worlds[1].add(friend);
friend = W.USER.wayHome.friend(20);
friend.says('people say someone openned the door of Azu, the forbidden cave.');
friend.says('Azu cave, weird things are keep happening..');
friend.says('gosh..  what kind of absent minded opened the cave we threw dead Zaron.');
worlds[1].add(friend);
friend = W.USER.wayHome.friend(101);
friend.says('I didn\t do it!  It was Boru!.');
friend.says('eh..   Boru is..  my pet..  a blue sea dog..');
friend.says('We did\'nt know what was in there!!');
friend.says('Help me!, Haru.  Boru is still there!  It\'s fighting against those monsters!!');
worlds[1].add(friend);
for(var i = 1; i < 1; ++i){
  worlds[1].add(friend);
  friend = W.USER.wayHome.friend(4);  // lamb
  worlds[1].add(friend);
  friend = W.USER.wayHome.friend(9);  // cow
  worlds[1].add(friend);
}
for(var i = 0; i < 10; ++i)
  worlds[1].add(mudMonster.clone());


/* stage 2 */
for(var i = 0; i < 10; ++i)
  worlds[2].add(greenMon.clone());

/* stage 3 */
var mae2 = blondgirl.clone();
mae2.says('wow, Haru. I saw you fighting all the monsters through the window.');
mae2.says('how could you do that?..  I just thought you are just an ordinary boy..');
mae2.says('btw, I have one of them in my storage room, so I can\'t get in there.');
mae2.says('what?.. did you just say \'Azu\'?');
mae2.says('well....');
mae2.says('hmmm....');
mae2.says('difficult to say.. but, grandpa told me not to talk about it to anybody..');
mae2.says('Azzim did what???  He openned it?!!?!');
mae2.says('gosh.. why he always makes trouble?..');
mae2.says('now I can see how could that monster came down to the storage room.');
mae2.says('that room is connected to Azu..   I can show you the way,');
mae2.says('but remember, Haru...  there was reason why grandpa sealed the cave.');
worlds[3].add(mae2);

/* stage 4 */
worlds[4].add(blondgirl.clone());
for(var i = 0; i < 1; ++i)
  worlds[4].add(mudMonster.clone());

/* stage 5 */
for(var i = 0; i < 10; ++i)
  worlds[5].add(bigcrow.clone());

/* stage 6 */
worlds[6].add(baron);
worlds[6].add(baron.clone());
worlds[6].add(baron.clone());
for(var i = 0; i < 15; ++i)
  worlds[6].add(croco.clone());
