/**
 * \file darwin.js Wednus Darwin module
 *
 * This file loads a series of Wednus Darwin member classes; Oracle, World, and Creature.
 * @author Sundew H. Shin
 */

/**
 * open module namespace
 * @test <a href='../../test/darwin.html'>base setup</a>
 */
W.darwin = {
  version: '0.0.1',
  oracles: []
};


//!\cond    startup_batch
W.load('module/darwin', 'Oracle,World,Creature,instructions', 'module');
//!\endcond

/**
\mainpage
\section version Version
0.1.0
\section intro  Introduction
Wednus Darwin is the set of implementations of the Darwinian revolution
workspace components; time, place, and creaures.
Wednus Darwin is a mothod kit loads up followings classes and class extensions:
- <b>W.Oracle class</b> - The Oracle introduces the concept of time to the objects with
the receptor method.: .tick()
- <b>W.World class</b> - The World provides a creatures' workspace where they
interact each other.
- <b>W.Creature class</b> - The Creature defines a prototype of common creature
residing in a world.
- <b>instructions.js</b> - It contains the set of instructions defines the behavior
of the Creature reacting given stimuli. (e.g. meet other creature)

<hr>
\section diagram Architecture
\image html darwin.jpg
<hr>
\section usage Usage
\code
<head> .....
<script type='text/javascript' src='<installation path>/wednus.js'></script>
<script type='text/javascript'>
W.module('darwin');
</script>
..... </head>
\endcode
*/