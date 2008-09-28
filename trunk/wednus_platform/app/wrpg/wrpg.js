/**
 * \file wrpg.js
 * \brief Wednus RPG, DHTML graphic RPG engine.
 *
 * For the people want to create RPG from scratch.
 * @author    Sundew H. Shin
 */


/**
 * \brief    Wednus RPG application function
 *
 * This application will help you create a Wednus RPG game.
 * @param    args   argument object
 */

W.a.wrpg = function(args){
  args = args?args:{};
  document.title = 'Wednus RPG: '+ args.title;
  var oracle = new W.Oracle();
  var world = new W.MyWorld({
    left: 4,
    cols: 13,
    rows: 20,
    wps: '320,480,left:10,top:10',
    image: 'module/darwin/test/image/320x480/spirals.jpg'
  });
  world.showGrid(true);
  oracle.add(world);
  oracle.showClock(true);

  world.wps = args.wps?args.wps:'80%,80%,left:10%,top:10%';

  W.event(window, 'onload', init);
  // register onclick event after window.body.load prevents script error for user
  // input on page loading
  function init(){
    W.a.wrpg.init(world);
  };
};


//! \cond   loadModules
// load external modules
W.module('scavenger');
W.module('darwin');
W.load('app/wrpg/lib', 'MyWorld,MyCreature', 'lib');
W.load('app/wrpg/lib/levels', 'level1', 'lib');
//! \endcond
/**
 * \mainpage
 * \section req Requirement
 *  - Scavenger module
 *  - ImageBox control
 *
 *<hr>
 *
 * \section intro_sec Introduction
 * TatoBum will enhance the photo album needs of every couch potato.
 *<hr>
 *
 * \section diagram Screenshot
 * \image   html    tatobum.jpg
 * <hr>
 *
 * \section usage   Usage
 * \subsection    include    1. Including
 * Add following line of code in script block.
 * \code
 * W.app('tatobum', {
 * 	title: string,
 * 	cols: number,
 * 	rows: number,
 * 	album: string,
 * 	prefix: string,
 * 	ext: string,
 * 	border: string,
 * 	caption: boolean
 * });
 * \endcode
 *
 * \subsection  instant 2. Arguments
 * - <b>title</b>: title of the album (will be displayed in the browser title)
 * - <b>cols</b>: number of columns
 * - <b>rows</b>: number of rows
 * - <b>album</b>: name of the directory that holds the images
 * - <b>prefix</b>: filename prefix
 * - <b>ext</b>: extension of the image files
 * - <b>border</b>: size of the border in percentage(%)
 * - <b>caption</b>: shows filename tooltip when mouse is over
 *
 * \subsection  use 3. Preparation
 * Create an album(directory) in 'albums' directory and change the filename
 * and specify the order of appearance.<br>
 * e.g.) my_image.jpg, me_mine.jpg, you_yours.jpg --> image0.jpg, image1.jpg, image2.jpg
 *<hr>
 *
 * \section code    Code Example
 * \code
 * <script type='text/javascript'>
 * W.app('tatobum', {
 * 	title: 'Animals',
 * 	cols: 2,
 * 	rows: 3,
 * 	album: 'animals',
 * 	prefix: 'animal_',
 * 	ext: 'jpg',
 * 	border: '1%',
 * 	caption: true
 * });
 * </script>
 * \endcode
 *
 * @test    <a href='../../index.html'>index.html</a>
 *
 * <hr>
 *
 * \section author  Author
 * - Sundew H. Shin
 *
 *<hr>
 *
 * \section license License
 * <a href='http://opensource.org/licenses/gpl-license.php'>GNU GPL</a>
 */