<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<?include('./index_meta.php');?>
<title>Wednus Project</title>
<style>
<?
//include('./index_css.php');
?>
</style>

<script>
/*
var W;
function a(w){
  W = w;

W.root = document.body;
W.root.appendChild(W.body);

W.refresh = function(){
    var db = this.root;
    if(window.innerWidth != null) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }else if(window.opera != null){
        this.width = db.clientWidth;
        this.height = db.clientHeight;
    }else if(document.documentElement != null){  // IE or others
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;
    }
    this.width = parseInt(this.width);
    this.height = parseInt(this.height);
    this.body.style.width = this.width +'px';
    this.body.style.height = this.height +'px';
};

W.refresh();

W.event(window, 'onresize', W.repos);


var msg = new W.AnyBox('iframe');
msg.wps = '180,16,left:0,bottom:0';
W.style(msg.core, 'scrolling:no|border:0px');
msg.core.allowtransparency = "true";

W.fwrite(msg.core, '<font style="color:white;font-size:7pt;" face="verdana">'
    +'platform(v'+ W.width +')</font>', 'silver');

};
*/

</script>
</head>
<body height='100%' margin='0px'>
  <?include('./index_body.php');?>

<!--
<iframe src='./wp_launch.html' id='test'></iframe>
-->
</body>
</html>
