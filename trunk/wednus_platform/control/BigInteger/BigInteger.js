/**
 * \file BigInteger.js
 * \brief    Java BigInteger substitution.
 *
 * @note    Javascript Number: IEEE-754 double precission floating point
 *                     max: 2^53, Math.pow(2,53)
 * @author    Sundew H. Shin
 */

/**
 * \brief    BigInteger Constructor
 *
 * @note    an example of the type-2 Wednus Control.
 * @param    number    the initial value
 * @todo    finish up implementing other features
 */
W.BigInteger = function(number){var self = this;
  var MAX = 999999999999999;  // 15-9
  // elements: 15-digit numbers
  this.lostPrecision = false;
  this.sign = true; // plus
  this.data = new Array;
  // argument precondition check
  if(typeof number == 'number' && number > MAX){
    number += '';  // type conversion
    this.lostPrecision = true;
  }

  // constructors
  switch(typeof number){
    // constructor w/ integer(number) argument
    case 'number':
      this.data[0] = number;
      break;
    // constructor w/ string argument
    case 'string':
      while(number.length > 15){
        this.data[this.data.length] = parseInt(number.substr(number.length
            - 16, number.length - 1));
        number = number.substr(0, number.length - 16);
      }
      this.data[this.data.length] = parseInt(number);
      break;
    // default constructor
    default:
      this.data[0] = 0;
  }

  // set/get current value
  this.value = function(setValue){
    if(typeof setValue != 'undefined'){
      var temp = new W.BigInteger(setValue);
      this.data = temp.data;
      return temp.value;
    }
    if(this.data.length == 1 && this.data[0] == 0) return '0';
    var result = '';
    for(var i = this.data.length - 1; i >= 0 ; --i){
      // print place holding '0'
      if(this.data[i] == 0)
        result += '000000000000000';
      else result += this.data[i] + '';
    }
    return result;
  };

  this.add = function(source){
    if(typeof source == 'number') source += '';
    var source = new W.BigInteger(source);
    var result = new W.BigInteger;
    result.data.pop();  // empty data holder
    var bigger = this.data;
    var numElements = this.data.length;
    if(source.data.length < numElements)
      numElements = source.data.length;
    else bigger = source.data;

    var carry = 0;
    for(var i = 0; i < numElements; ++i){
      var value = this.data[i] + source.data[i] + carry;
      // compute the carry
      if(value > MAX){
        carry = Math.floor(value / ((MAX + 1) * 10));
        //alert('orig_value:'+ value +', value:'+ (value % ((MAX + 1) * 10)) +', carry:'+ carry);
        value %= (MAX + 1) * 10;
      }else carry = 0;
      result.data.push(Math.floor(value));
    }

    // handle left-over carry
    if(numElements == bigger.length){
      if(carry != 0)
        result.data.push(carry);
    }else{
      // handle upper elements
      for(var i = numElements; i < bigger.length; ++i){
        value = parseInt(bigger[i]);
        // handle left-over carry
        if(i == numElements)
          value += carry;
        result.data.push(value);
      }
    }

    this.data = result.data;
    return result;
  }

  this.mul = function(times){
    var temp = this.value();
    for(var i = 1; i < times; ++i)
      this.add(temp);
    return this;
  };

  this.pow = function(num){
    for(var i = 0; i < num; ++i){
      var temp = this.value();
      this.mul(temp);
    }
    return this;
  };
  this.toString = function(){return this.value();};
};


// add sample codes (one for each comment block)
/**
 * @example BigInteger.html
 */

/**
 * @example CodeExample.html
 */


/**
 * \mainpage
 * \section intro_sec Introduction
 * It implements the popular 'BigInteger' class in Java. Why I made it?  well. I was
 * working on WebPCS project and needed a calculation intensive sample task for
 * testing parallelizibility of my system.  so I implemented a 'dot product' sample
 * and needed a JS module can handle huge numbers.  The common digit length of
 * calculation was 2000.
 * @test    <a href='../../test/BigInteger.html'>testing constructor & member methods</a>
 *<hr>
 *
 * \section diagram Diagram
 * \image   html    diagram.jpg
 * <hr>
 *
 * \section usage   Usage
 * \subsection    include    1. Including
 * Add following line of code in script block.
 * \code
 * W.control('BigInteger');
 * \endcode
 *
 * \subsection  instant 2. Instantiate a control object
 * In either case, Wednus Platform will loadup the control, and now we can use the
 * control like this:
 * \code
 * var myTemp = new W.BigInteger();
 * \endcode
 *
 * \subsection  use 3. Using object
 * In either case, Wednus Platform will loadup the control, and now we can use the
 * control like this:
 * \code
 * alert(myTemp.name);
 * \endcode
 *<hr>
 *
 * \section code    Code Example
 * This example will print "246913578246913578246913578246913578", the result
 * of BigInteger addition.
 * \code
 * <script type='text/javascript'>
 * W.control('BigInteger');
 * </script>
 *
 * <script type='text/javascript'>
 * var BIG = '123456789123456789123456789123456790';
 * var a = new W.BigInteger(BIG);
 * var b = new W.BigInteger(BIG);
 * alert(a.add(b));
 * </script>
 * \endcode
 *
 * @test    <a href='../../test/CodeExample.html'>CodeExample.html</a>
 * @warning Do not merge the two script blocks into one because the control
 * should need to be fully loaded before any use.
 *
 * <hr>
 *
 * \section author  Author
 * Sundew H. Shin<br>
 * Manager/Developer, <a href='http://wednus.com'>Wednus Project</a>
 *<hr>
 *
 * \section license License
 * <a href='http://opensource.org/licenses/gpl-license.php'>GNU GPL</a>
 */