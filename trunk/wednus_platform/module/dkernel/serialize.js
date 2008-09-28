/**
 * \file serialize.js
 * Thie file contains serializers and helper functions.
 */

/**
 * @defgroup serialize serializers
 * @ingroup dkernel
 * The group of methods of serializers.
 * @{
 */

/**
 * Return textified 'W' object
 */
W.clone = function(){
    this.code.value = this;
    return this.code.value;
};


/**
 * Return codebase of W
 * @return  serialized W object
 * @todo W.json -> JSON (to exclude JSON code in the compact version)
 */
W.toString = function(isDebug){
    return this.serialize(this, false);
};


W.serialize = function(obj, isDebug){
  if(!isDebug) isDebug = false;
  var lineBreak = '';
  var tab = '';
  if(isDebug){
    lineBreak = '\n';
    tab = '    ';
  }
  var str = '{'+ lineBreak;
  var first = true;
  for(var i in obj){
    if(first){
      first = false;
    }else str += ','+ lineBreak;
    str += tab + i +':';
    switch(typeof obj[i]){
      case 'string':
        str += '"'+ obj[i] +'"';
        break;
      case 'function':
        // special treatment for backslash writing
        if(i == 'js'){
            //str += 'function(url){document.write("<script type=\"text/javascript\" src=\""+ url +"\"><\\/script>");}';
            str += 'function(url){document.write("<script type=\'text/javascript\' src=\'"+ url +"\'><\\/script>");}';
            break;
        }
        var s = '';
        s += obj[i];
        s = s.replace(/\s+/g, " ");
        s = s.replace(/^\s(.*)/, "$1");
        s = s.replace(/(.*)\s$/, "$1");
        s = s.replace(/\s([\x21\x25\x26\x28\x29\x2a\x2b\x2c\x2d\x2f\x3a\x3b\x3c\x3d\x3e\x3f\x5b\x5d\x5c\x7b\x7c\x7d\x7e])/g, "$1");
        str += s.replace(/([\x21\x25\x26\x28\x29\x2a\x2b\x2c\x2d\x2f\x3a\x3b\x3c\x3d\x3e\x3f\x5b\x5d\x5c\x7b\x7c\x7d\x7e])\s/g, "$1");
        break;
      case 'object':
        str += W.json.stringify(obj[i]);
        break;
      default:
        str += obj[i];
    }
  }
  return str + lineBreak +'}';
};


W.removeComments = function(s) {
  var lines, i, t;
  // Remove '//' comments from each line.
  lines = s.split("\n");
  t = "";
  for (i = 0; i < lines.length; i++)
    t += lines[i].replace(/([^\x2f]*)\x2f\x2f.*$/, "$1");
  // Replace newline characters with spaces.
  t = t.replace(/(.*)\n(.*)/g, "$1 $2");
  // Remove '/* ... */' comments.
  lines = t.split("*/");
  t = "";
  for (i = 0; i < lines.length; i++)
    t += lines[i].replace(/(.*)\x2f\x2a(.*)$/g, "$1 ");
  return t;
};


/*
Copyright (c) 2005 JSON.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The Software shall be used for Good, not Evil.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/*
    The global object JSON contains two methods.

    JSON.stringify(value) takes a JavaScript value and produces a JSON text.
    The value must not be cyclical.

    JSON.parse(text) takes a JSON text and produces a JavaScript value. It will
    return false if there is an error.
*/
W.json = function () {
    var m = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        s = {
            'boolean': function (x) {
                return String(x);
            },
            number: function (x) {
                return isFinite(x) ? String(x) : 'null';
            },
            string: function (x) {
                if (/["\\\x00-\x1f]/.test(x)) {
                    x = x.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                        var c = m[b];
                        if (c) {
                            return c;
                        }
                        c = b.charCodeAt();
                        return '\\u00' +
                            Math.floor(c / 16).toString(16) +
                            (c % 16).toString(16);
                    });
                }
                return '"' + x + '"';
            },
            object: function (x) {
                if (x) {
                    var a = [], b, f, i, l, v;
                    if (x instanceof Array) {
                        a[0] = '[';
                        l = x.length;
                        for (i = 0; i < l; i += 1) {
                            v = x[i];
                            f = s[typeof v];
                            if (f) {
                                v = f(v);
                                if (typeof v == 'string') {
                                    if (b) {
                                        a[a.length] = ',';
                                    }
                                    a[a.length] = v;
                                    b = true;
                                }
                            }
                        }
                        a[a.length] = ']';
                    } else if (typeof x.hasOwnProperty === 'function') {
                        a[0] = '{';
                        for (i in x) {
                        /*
                            if (x.hasOwnProperty(i)) {
                                v = x[i];
                                f = s[typeof v];
                                if (f) {
                                    v = f(v);
                                    if (typeof v == 'string') {
                                        if (b) {
                                            a[a.length] = ',';
                                        }
                                        a.push(s.string(i), ':', v);
                                        b = true;
                                    }
                                }
                            }
                            */
                        }
                        a[a.length] = '}';
                    } else if(typeof x == 'object') {
                        a[a.length] = W.json.stringify(x);
                    } else {
                        return;
                    }
                    return a.join('');
                }
                return 'null';
            }
        };
    return {
        copyright: '(c)2005 JSON.org',
        license: 'http://www.JSON.org/license.html',
/*
    Stringify a JavaScript value, producing a JSON text.
*/
        stringify: function (v) {
            var f = s[typeof v];
            if (f) {
                v = f(v);
                if (typeof v == 'string') {
                    return v;
                }
            }
            return null;
        },
/*
    Parse a JSON text, producing a JavaScript value.
    It returns false if there is a syntax error.
*/
        parse: function (text) {
            try {
                return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
                        text.replace(/"(\\.|[^"\\])*"/g, ''))) &&
                    eval('(' + text + ')');
            } catch (e) {
                return false;
            }
        }
    };
}();

/**
 * @}  // end of serializer
 */