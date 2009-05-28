/**
 * Check an assertion
 *
 * It mimicks the classic 'assert' model.
 * @param    a    the source
 * @param    b    the target
 * @param    comment    assertion comment
 * @return    send false and dubugging message when the assertion failed, otherwise return true.
 * @todo    need to be improved
 */
W.assert = function(a, b, comment){
  // helper(s)
  debug = function(title, message){
    alert('[WEDNUS] '+ title +':\n\n'+ message);
  };

  if(typeof b == 'string')
    b = b.toLowerCase();
  var msg = '';
  if(typeof comment != 'undefined')
    msg += '- '+ comment +'\n';
  if(a != b){
    debug('Assertion Failed', msg +'expects :\t\''+ a +'\'\ngot:\t\''
      + b +'\'');
    return 0;
  }
  return 1;
};
