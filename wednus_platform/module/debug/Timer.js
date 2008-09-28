/**
 * @defgroup    timer    Timer
 * @ingroup debug
 * @{
 */

/**
 * Message for dubugging
 * @warning    one time use. need to be initialized after use.
 */
W.mesg = '';


/**
 * Number of test cases
 * @warning    one time use. need to be initialized after use.
 */
W.numCases = 0;


/**
 * Number of errors
 * @warning    one time use. need to be initialized after use.
 */
W.numErrors = 0;


/**
 * Delay
 *
 * wait until the delay amount in millisecond passed
 * @param    millis    delay amount in millisecond
 */
W.delay = function(millis){
    date = new Date();
    var curDate = null;
    do{
        var curDate = new Date();
    }while(curDate-date < millis);
};


/**
 * Check a predicate
 *
 * examine the predicate and  write 'passed.' or 'failed.' along with the test title.
 * If the type of 'pred' the first argument is string, it shows a confirm alert and the
 * result(true/false) become the pred input.<br>
 * @note    The reason we are queuing output messages and document.write it at
 * the last is because document.write sometimes erases contents exists already.  I
 * couldn't find the cause of this yet.
 * @param    pred    predicate
 * @param    title    the title of this test
 */
W.test = function(pred, title){
    ++this.numCases;
    if(typeof pred == 'string')
        pred = confirm(pred);
  this.mesg += '<li>Testing "'+ title +'" . . . . . . . . . . . . . . . . . ';
  if(!pred){
      ++this.numErrors;
    this.mesg += '<font color="red"><b>[failed]</b></font></li>';
  }else this.mesg +='<font color="navy"><b>[passed]</b></font></li>';
};


/**
 * A timer
 *
 * It can be used along with W.test command.
 * @see http://www.howtocreate.co.uk/tutorials/javascript/writing
 * @todo    JSAN has a nice assertion feature using AJAX
 * @bug W.ready has deprecated
 */
W.Timer = function(){var self = this;
  var startDate, pauseDate;
  this.pausedTime = 0;
  this.start = function(){
    W.mesg += '<font style="font-size:11px;font-family:verdana;">Test started'
        +' on '+ (new Date) +'<ul>';
    this.startDate = new Date;
  };
  this.finish = function(){
    var elapsedTime = (new Date) - self.startDate - self.pausedTime;
    W.mesg += '</ul>';
        if(W.numCases != 0)
    if(!W.numErrors){
        W.mesg += '<font color="navy"><b>Congratulations!  It passed all '
                     + W.numCases +' test case(s).</b></font><br>';
    }else W.mesg += '<font color="red"><b>Sorry.  It failed at '+ W.numErrors
                          +' test case(s).</b></font><br>';
    W.mesg += 'Finished in '+ (elapsedTime / 1000) +' second(s).<br><br>';
    W.mesg += '<a href = "javascript:history.back()">Go back </a><br><br>'
        +'</font>';

        var mbox = document.createElement('div');
        mbox.innerHTML = W.mesg;
        document.body.appendChild(mbox);
    // flush out
    W.mesg = '';
  };
  this.pause = function(){
      this.pauseDate = new Date;
  };
  this.resume = function(){
      self.pausedTime += (new Date) - this.pauseDate;
  };
};

/**
 * @}  // end of timer
 */
