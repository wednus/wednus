/**
 * \file scavenger.js   Wednus Scavenger
 *
 * A Wednus control is a object with three property in minimum. .body, .core and .wps.
 * .body is the shell of the presentation layer.
 * .core is the core of the control
 * .wps is the WPS set value.
 * @author    Sundew H. Shin
 */


W.include('module/scavenger', 'wom,wps,wss');

/**
\mainpage
\section intro  Introduction
Wednus Scavenger is a method kit encapsulates colorful user web controls and
outputs Wednus Control.
- <b>WPS</b> - Loads an arbitrary script file on the platform installation.
- <b>WOM</b> -
- <b>WSS</b> - Add an event to the corresponding event library.
\section diagram Architecture
\image   html    scavenger.jpg
<hr>
\section usage   Usage
\subsection    include    1. Including
Add following line of code in script block.
\code
W.control('A_Template');
\endcode
\subsection  instant 2. Instantiate a control object
In either case, Wednus Platform will loadup the control, and now we can use the
control like this:
\code
var myTemp = new W.A_Template();
\endcode

\subsection  use 3. Using object
After the object creation, you can access public member properties and methods as
below.
\code
alert(myTemp.name);
\endcode
<hr>

\section code    Code Example
This example will print the installation path of platform.
\code
<script type='text/javascript'>
document.write('path: '+ W.path);
</script>
\endcode

@test    <a href='../../module/test/CodeExample.html'>CodeExample.html</a>
@warning Do not merge the two script blocks into one because the control
should need to be fully loaded before any use.
 */