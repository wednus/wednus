function include(url){
    document.write('<script type="text/javascript" src="'+ url +'"><\/script>');
};

function include2(url){
    var js = document.createElement('script');
    js.src = url;
    js.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(js);
};


function include3(url){
    if(document.getElementsByTagName('head').length != 0){
        include2(url);
        return true;
    }else include(url);
    return false;
};