<!-- <head> -->
<script type='text/javascript' src='wednus_platform/wednus.js'></script>
<script type='text/javascript'>
W.module('debug');
W.module('scavenger');
W.control('AnyBox');
</script>

<script type='text/javascript'>
W.open('./index_noframe.php');
var msg = new W.AnyBox('iframe');
msg.wps = '180,16,left:0,bottom:0';
W.style(msg.core, 'scrolling:no|border:0px');
msg.core.name = '_test_';
msg.core.src = 'about:blank';
msg.core.allowtransparency = "true";
W.fwrite(msg.core, '<font style="color:white;font-size:7pt;" face="verdana">'
    +'platform(v'+ W.version +') on testing..</font>', 'silver');
</script>
<!-- </head> -->
