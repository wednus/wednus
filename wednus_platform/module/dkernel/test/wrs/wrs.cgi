#!/lusr/bin/php
# UTCS policy: 
$url = gettext($_GET['url']);
$callback = gettext($_GET['callback']);
header("Content-type: text/javascript\n\n");
$fd = fopen($url, 'r');
$result = fread($fd, 8192);
$result = str_replace(chr(10), '', $result);
echo $callback ."('". $result ."');";
