W.dev.rpanel = function(){
    var footerHeight = '100px';
    var textStyle = 'fontSize:11px;fontFamily:verdana;';
    // add form fields
     addFields();
     // add Analytics control
     addAnalytics();

    // compose footer
    var footer = W.style('div', 'top:'+ (W.height - parseInt(footerHeight))
        +'px;left:0px;width:'+ W.width +'px;height:'+ footerHeight
        +';position:absolute;background:#f5f5f5;display:none;');
    document.body.appendChild(footer);

    var tbox = W.style('textarea', 'width:100%;height:'+ footerHeight
        +';border:1px solid silver;'+ textStyle);
    footer.appendChild(tbox);

    W.event(window, 'onresize', function(){
        W.refresh();
        footer.style.top = (W.height - parseInt(footerHeight)) +'px';
        footer.style.width = W.width +'px';
    });

    // lookup server id
    var forum = 0;
    switch(this.team){
        case 'dxul': forum = 107; break;
        case 'oracle': forum = 110; break;
        default: forum = 111;
    }

  var ereport = new W.EReporter({
      server: 'http://wednus.com/imod/posting.php?f='+ forum,
      ignore: W.dev.plus,
      verbose: false
  });
    ereport.report_test = function(){};
  window.onerror = ereport.onerror;

    // override onreport method
  ereport.onreport = function(message){
      tbox.value = message;
      var e = W.$('error');
      e.value = message;
      e.style.color = 'red';
      e.style.height = '220px';
      footer.style.display = 'block';
  };

  function addFields(){
    var props = new W.FormGen({
      action: 'http://wednus.com/index.php',
      labelColumeWidth: '50px',
      color: 'silver',
      wss: 'fontSize:11px;fontFamily:Tahoma,Verdana;color:navy',
      wps: W.dev.wps
    });
    // make it draggable
      new W.DragMe(props);
    props.body.style.zIndex = 3000;
    props.body.style.opacity = W.dev.opacity;
    props.body.style.filter = 'alpha(opacity='+ (W.dev.opacity * 100) +')';
        // add close button
        var close = new Image();
        close.src = W.path +'module/dev/lib/image/close.gif';
        close.title = 'close';
        close.style.cursor = 'default';
        close.onclick = function(){props.body.style.display = 'none';};
        W.style(close, 'position:absolute;top:0px;left:0px;');
        props.body.appendChild(close);

    // override the default submission method
    props.submit = function(fields){
        ereport.fields['username'].value = W.$('dev.id').value;
        ereport.fields['subject'].value = W.$('title').value;
        var m = ereport.fields['message'];
        var c = W.$('comment').value;
        if(c != '')
            m.value += '[hr]' + c;
      ereport.report();
    }

    var fields = 'team,dev.id,title'.split(',');
    for(var i = 0; i < fields.length; ++i){
      props.add({
        id: fields[i],
        caption: fields[i] +':',
        width: '136px'
      });
    }

    var fields = 'error,comment'.split(',');
    for(var i = 0; i < fields.length; ++i){
      props.add({
        id: fields[i],
        tag: 'textarea',
        caption: fields[i] +':',
        width: '136px'
      });
        }

    W.$('dev.id').value = W.dev.id;
    var t = W.$('team');
    var e = W.$('error')
    e.value = 'no error detected.';
    t.value = W.dev.team;
    t.style.color = e.style.color = 'gray';
    t.readOnly = e.readOnly = true;
    t.style.background = e.style.background = '#F5F5F5';
    t.onclick = e.onclick = function(){};
  };

  function addAnalytics(){
        var myAnalytics = new W.Analytics(false, false, 2);
  };
};

W.dev.version = '0.0.1';
if(W.dev.enabled) W.dev.rpanel();