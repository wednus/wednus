<script language='JavaScript' type='text/javascript' src='wednus_proj/wednus.js'></script>
<script language='JavaScript' type='text/javascript' src='wednus_proj/modules/wwin/wwin.js'></script>
<script language="Javascript">
var wwindow = new Wednus.WIN.Window({
  url: 'hello.php',
  title: 'WW Baek-Ho (White Tiger: v0.3.6)',
  top: 210,
  left: 290,
  width: 210,
  height: 280,
  resizable: 'yes',
  scrollbars: 'yes',
  status: 'yes'
});
wwindow.menu.add('File', 'Contains the commands working with the selected items.');
wwindow.menu.add('Edit', 'Contains edit commands.');
wwindow.menu.add('View', 'Contains the commands manipulating the view.');
wwindow.menu.add('Tools', 'Contains tools commands.');
wwindow.menu.add('Help', 'Contains commands for displaying Help.');

wwindow.menu['File'].add('New Window', function(){wwindow.open()}, 'Opens another window.');
wwindow.menu['File'].add('Clone Window', function(){wwindow.manager.add(wwindow.clone())}, 'Clones this window.');
wwindow.menu['File'].add('Close Window', wwindow.close, 'Closes the window.');
wwindow.menu['File'].add('divider');
wwindow.menu['File'].add('Exit', wwindow.kill, 'Exits Wednus Window system.');

wwindow.menu['Edit'].add('Altavista', 'http://altavista.com');
wwindow.menu['Edit'].add('Yahoo', 'http://yahoo.com');
wwindow.menu['Edit'].add('Altavista', 'http://altavista.com');
wwindow.menu['Edit'].add('Yahoo', 'http://yahoo.com');

wwindow.menu['View'].add('Shade Window', wwindow.shade, 'Makes window shaded.');
wwindow.menu['View'].add('Full Screen', wwindow.full, 'Maximizes window to full screen.');
wwindow.menu['View'].add('divider');
wwindow.menu['View'].add('Popup Window', wwindow.popup, 'Opens popup.');
wwindow.menu['View'].add('Full Popup Window', 'Opens fullsized popup.');
wwindow.menu['View'].add('divider');
wwindow.menu['View'].add('Resizable Window', new Function('wwindow.resizeOn(1)'), 'Makes window resizable.');
wwindow.menu['View'].add('Non-resizable Window', new Function('wwindow.resizeOn(0)'), 'Makes window not resizable.');
wwindow.menu['View'].add('divider');
wwindow.menu['View'].add('Center Window', new Function("wwindow.move('xcenter:0,ycenter:0')"), 'Moves window to the center.');

wwindow.menu['Tools'].add('Altavista', 'http://altavista.com');
wwindow.menu['Tools'].add('Yahoo', 'http://yahoo.com');
wwindow.menu['Tools'].add('Altavista', 'http://altavista.com');
wwindow.menu['Tools'].add('divider');
wwindow.menu['Tools'].add('Window Options...', 'http://yahoo.com', 'Opens control panel.');

wwindow.menu['Help'].add('Documentations', 'http://wednus.com/imod/index.php?c=27', 'Opens online help system.');
wwindow.menu['Help'].add('Check Updates', 'http://wednus.com/imod/viewforum.php?f=29', 'Checks available updates of this program.');
wwindow.menu['Help'].add('divider');
wwindow.menu['Help'].add('Vote for us', 'http://www.hotscripts.com/Detailed/42288.html', 'Opens Wednus Window voting booth at hotscripts.com.');
wwindow.menu['Help'].add('Make Donation', 'https://sourceforge.net/donate/index.php?group_id=127029', 'Opens interface for donation.');
wwindow.menu['Help'].add('Send Feedback', 'http://groups.google.com/group/wednus', 'Opens a Web page where you can provide feedback about this program.');
wwindow.menu['Help'].add('divider');
wwindow.menu['Help'].add('About Wednus Window', wwindow.help, 'Displays program information, version number, and copyright.');

/*
wwindow.tool.add('basic');
wwindow.tool['basic'].add('image/path', function(){wwindow.add(wwindow.clone())}, 'Opens another window.');
wwindow.tool['basic'].add('image/path', wwindow.close, 'Closes the window.');
wwindow.tool['basic'].add('divider');
wwindow.tool['basic'].add('image/path', wwindow.close, 'Exits this program.');
*/
</script>
<!--
<script src="http://www.google-analytics.com/urchin.js" type="text/javascript"></script><script type="text/javascript">_uacct = "UA-103181-4";urchinTracker();</script>
-->
