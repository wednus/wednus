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

W.a.maplog = function(args){
  document.title = 'MapLog: '+ args.title;
  var map = new W.YaMap3('1905 Nueces St. Austin TX');
  map.wps = '70%,100%,left:-8,ycenter:-8';
  map.zoom = 2;

  var from = document.createElement('input');
  from.type = 'text';
  from.value = '1905 Nueces St. Austin TX';
  from.style.position = 'absolute';
  from.style.top = '0px';
  from.style.left = '0px';
  from.style.width = '160px';
  from.style.fontSize = '12px';
  document.body.appendChild(from);

  var menuId = 'MapLog';
  var menuParent = document.createElement('div');
  menuParent.id = menuId;
  document.body.appendChild(menuParent);

  var numPanels = 1;
  var panel = document.createElement('div');
  menuParent.appendChild(panel);
  addTab(panel, 'test', 'content', true);
  addTab(panel, 'test2', 'content2', false);
  addTab(panel, 'test2', 'content2', false);

  var menu = new W.InRico('Accordion', menuId);
  // Rico accordion doesn't support dynamic height resizing
  // 88 = 22 * (numOfTabs)
  menu.wps = '30%,100%,left:70%,top:0';

    function addTab(panel, name, content, isSelected){
    var panelHeader = document.createElement('div');
    panelHeader.innerHTML = name;
    panelHeader.style.verticalAlign = 'middle';
    panel.appendChild(panelHeader);
    var panelContent = document.createElement('div');
    panelContent.className = 'panelContent';
    panelContent.innerHTML = content;
    panel.appendChild(panelContent);
    if(isSelected){
      panelHeader.className = 'panelSelected';
    }else{
      panelHeader.className = 'panelheader';
      panelContent.style.display = 'none';
    }
  };
};


//! \cond   loadModules
// load external modules
W.control('YaMap3');
W.control('InRico');
W.include_css('application/maplog/lib', 'rico');
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