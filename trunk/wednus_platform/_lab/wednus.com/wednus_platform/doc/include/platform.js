// Wednus Platform Documentation
/**
\mainpage
\section intro_sec Introduction
Wednus Platform encapsulates the complexity of cross-browser support and
provides a robust browser-neutral web application platform. On top of the
Wednus kernel layer, the implementation of the Wednus Object Model, WOM,
provides standardized interface for Web(Web2.0) API controls such as Google's
GMap control and Amazon.com's book search API to end-users.
@test    <a href='../../module/test/wednus.html'>testing constructor & member methods</a>
<hr>

\section support Supporting Browsers
<table border='0'><tr valign='bottom'>
<td align='center'><img src='../image/browser_logo/logo_ie.jpg'><b>IE</b> 5+</td>
<td align='center'><img src='../image/browser_logo/logo_firefox.jpg'><b>Firefox</b> 1+</td>
<td align='center'><img src='../image/browser_logo/logo_mozilla.gif'><b>Mozilla</b> 1+</td>
<td align='center'><img src='../image/browser_logo/logo_netscape.jpg'><b>Netscape</b> 6+</td>
<td align='center'><img src='../image/browser_logo/logo_opera.jpg'><b>Opera</b> 4+</td>
<td align='center'><img src='../image/browser_logo/logo_konqueror.gif'><b>Konqueror</b> 3+</td>
<td align='center'><img   src='../image/browser_logo/logo_safari.jpg'><b>Safari</b></td>
<td align='center'><img src='../image/browser_logo/logo_ice.jpg'><b>IceBrowser</b></td>
</tr></table>
- Wednus Platform uses following version constraint DOM methods.

<table border="1" cellspacing="0"><tr>
<th align="left" valign="top" width="30%">document Method</th><th align="left" valign="top" width="50%">Description</th>
<th align="left" valign="top" width="5%">IE</th>
<th align="left" valign="top" width="4%">Firefox</th>
<th align="left" valign="top" width="4%">Netscape</th>
<th align="left" valign="top" width="7%">W3C</th></tr>
<tr><td valign="top">createElement("tag")</td>
<td valign="top">Creates an element</td>
<td valign="top">5</td><td valign="top">1</td><td valign="top">6</td>
<td valign="top">Yes</td></tr>
<tr><td valign="top">getElementById()</td>
<td valign="top">Returns a reference to the first object with the specified ID</td>
<td valign="top">5</td><td valign="top">1</td><td valign="top">6</td>
<td valign="top">Yes</td></tr>
<tr><td valign="top">getElementsByTagName("tag")</td>
<td valign="top">Returns a collection of objects with the specified TAGNAME</td>
<td valign="top">5</td><td valign="top">1</td><td valign="top">6</td>
<td valign="top">No</td></tr></table>
@see http://www.w3schools.com/htmldom/dom_obj_document.asp

<hr>

\section install	Installation
Like all other Wednus Project products, installing Wednus Platform is quite an
easy task. Just follow these simple steps:

   - 1. Download the latest version of the editor at the following url:<br>
       http://sourceforge.net/project/showfiles.php?group_id=127029

   - 2. Uncompress the file, and you will see a directory named "wednus."

   - 3. Wednus Scavenger is now ready to use. To see it immediately at work browse:<br>
       <installation path>/wednus/doc/sample/index.html

<hr>

\section diagram	Architecture
Wednus Platform comprises two parts; Wednus DKernel and Wednus Scavenger.
Wednus DKernel encapsulates the complexity of cross-browser support and
provides a robust browser-neutral web application foundation. On top of the that,
Wednus Scavenger contains the implementation of the Wednus Object Model, WOM,
provides standardized interface for Web(Web2.0) API controls such as Google's
GMap control and Amazon.com's book search API to end-users.
\image	html	platform.jpg
<hr>

\section author  Author
Sundew H. Shin<br>
Manager/Developer, <a href='http://wednus.com'>Wednus Project</a>
<hr>

\section license License
This section describes the license this destribution is destributed under. You
may choose an <a href='http://opensource.org/licenses/'>OSI Approved License</a>.
The most common option in Open Source today is the <a href='http://opensource.org/licenses/gpl-license.php'>GNU GPL</a>,
however, one of the most flexible is the <a href='http://opensource.org/licenses/artistic-license.php'>Artistic License</a>.
The Perl programming language is distributed under both licenses, which is
perfectly optional.
 */


 /**
 *@defgroup    dkernel    Wednus DKernel
 *Browser-neutral DHTML Kernel Implementation
 */

/**
 *@defgroup    scavenger    Wednus Scavenger
 * Wednus Scavenger
 */

 /**
 *@defgroup    debug    Wednus Debug
 * Wednus Debug
 */