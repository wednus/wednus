/**
 * \file dkernel.js   Wednus DKernel
 *
 * A Wednus control is a object with three property in minimum. .body, .core and .wps.
 * .body is the shell of the presentation layer.
 * .core is the core of the control
 * .wps is the WPS set value.
 * @author    Sundew H. Shin
 */


W.load('module/dkernel', 'wes,wml,wrs', 'module');


 /**
  * \mainpage
  * \section intro  Introduction
  * Wednus DKernel(DHTML Kernel) encapsulates the complexity of supporting
  * various web browsers and establishes browser-neutral web application platform.
  * - <b>WML</b> - Loads an arbitrary script file on the platform installation.
  * - <b>WED</b> - Includes functions for debugging
  * - <b>WES</b> - Add an event to the corresponding event library.
  * - <b>WRS</b> - Load remote JS.
  *
  * <hr>
  * \section diagram Architecture
  * \image   html    dkernel.jpg
  * <hr>
  *  \section usage	Usage
  * \code
  * <head> .....
  * <script src='<installation path>/wednus/wednus.js' type='text/javascript'></script>
  * ..... </head>
  * \endcode
  * @todo    http://www-128.ibm.com/developerworks/library/os-ecov/
  */