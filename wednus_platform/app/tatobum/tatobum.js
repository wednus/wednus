/**
 * \file tatobum.js
 * \brief TatoBum, album for the lazy person.
 *
 * For the lazy person sluggish about using photo-sharing services.
 * @author    Sundew H. Shin
 */


/**
 * \brief    TatoBum application function
 *
 * This application will help you create photo albums with minimum effort.
 * @param    args   argument object
 */

W.a.tatobum = function(args){
  args.prefix = (args.prefix == null)?'':args.prefix;
  var image, index, core;
  var cols = args.cols;
  var rows = args.rows;
  var border = parseInt(args.border);
  var width = 100 / cols;
  var height = 100 / rows;
  var fullsized = false;
  var images = [];
  document.title = 'TatoBum: '+ args.title;

  for(var i = 0; i < rows; ++i){
    for(var j = 0; j < cols; ++j){
      index = images.length;
      images[index] = new W.ImageBox('albums/'+ args.album +'/'+ args.prefix
        + ((i * cols) + j) +'.'+ args.ext);
      images[index].wps = (width - ((border + 1) / border)) +'%,'
        + (height - ((border + 1) / border)) +'%,left:'
        + ((width * j) + border) +'%,top:'+ ((height *  i) + border) +'%';
      core = images[index].core;
      // filename for image title
      if(args.caption)
        core.title = args.prefix+ ((i * cols) + j) +'.'+ args.ext;
      // forwarding object info for later reference at 'onclick'
      core.parent = images[index];
      core.top = height * i;
      core.left = width * j;
      var xRatio, yRatio;
    }
  }

  W.event(window, 'onload', addEvent);

  // register onclick event after window.body.load prevents script error for user
  // input on page loading
  function addEvent(){
    for(var i = 0; i < images.length; ++i){
        var core = images[i].core;
      // add image clicking feature
      core.onclick = function(){
        if(!fullsized){
               W.refresh();
          // prevent squeezing images on top. before it fully loaded
          xRatio = this.parent.width / this.parent.height;
          yRatio = this.parent.height / this.parent.width;
          if(xRatio >= yRatio){
            this.parent.wps = (100 - (border * 2)) +'%,'+ (100 * yRatio)
              +'%,left:'+ border +'%,top:'+ (100 -  (100 * yRatio)) / 2 +'%';
          }else this.parent.wps = (100 * xRatio) +'%,'+ (100 - (border * 2))
            +'%,left:'+ (100 - (100 * xRatio)) / 2 +'%,top:'+ border +'%';
          // hide all others
          for(var i = 0; i < images.length; ++i)
            images[i].body.style.display = 'none';
          this.parent.body.style.display = 'block';
          fullsized = true;
          args.prefix = (args.prefix == null)?'':args.prefix;
        }else{
          this.parent.wps = (width - ((border + 1) / border)) +'%,'
            + (height - ((border + 1) / border))
            +'%,left:'+ (this.left + border) +'%,top:'
            + (this.top + border) +'%';
          // show all
          for(var i = 0; i < images.length; ++i)
            images[i].body.style.display = 'block';
          fullsized = false;
        }
        W.repos();
      };
    }
  }
};


//! \cond   loadModules
// load external modules
W.control('ImageBox');
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