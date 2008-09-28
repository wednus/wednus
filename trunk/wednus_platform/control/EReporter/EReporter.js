/**
 * \file EReporter.js
 * \brief This is the template of a control definition.
 *
 * (longer description goes here)
 * @author    (your name)
 * @todo    please make me a real control.
 * @see http://plugins.yme.music.yahoo.com/plugins/docs/webquickstart_page.html
 */


/**
 * \brief    EReporter Constructor
 *
 * (longer description of this function)
 * @param    args    argument object
 */
W.EReporter = function(args){var self = this;
    // control info.
    this.name = 'EReporter';
    this.version = '0.0.1';

    // handle arguments
  args = args?args:{};
    this.verbose = args.verbose?args.verbose:false;
    this.server = args.server?args.server:'http://wednus.com/imod/posting.php?f=112';
    this.target = args.target?args.target:'_blank';
    this.ignore = args.ignore?args.ignore:'Generated_Error';

    this.core = document.createElement('form');
  this.core.method = 'post';
  this.core.action = this.server;
  // construct body
  //this.body = W.style('div');
  ///this.body.appendChild(this.core);
  //document.body.appendChild(this.body);
  document.body.appendChild(this.core);
  // field pool
    this.fields = {};
    // append form fields
    var fields = 'message,username,subject,topic_desc,post,mode'.split(',');
    var tmp;
    for(var i = 0; i < fields.length; ++i){
        this.fields[fields[i]] = document.createElement('input');
        tmp = this.fields[fields[i]];
      tmp.name =fields[i];
      tmp.type = 'hidden';
      this.core.appendChild(tmp);
    }
    // set fixed values
    this.fields['post'].value = 'Submit';
    this.fields['mode'].value = 'newtopic';

    // message to listener
    this.info = '';
    // message to visitor (verbose mode)
    this.message = '';
    // set reporter as patch-level info by default
    this.reporter = W.version.split('_');
    this.reporter = this.reporter[1];

    this.onerror = function(msg, url, linenumber){
        // handle test reporting
        if(msg.indexOf(self.ignore) != -1 || url.indexOf(self.ignore) != -1){
            self.report_test();
            return;
        }
        // compose info
      composeInfo(msg, url, linenumber);
        // handle verbose
        if(self.verbose){
            if(isOK()){
                // get more info
                moreInfo();
                // dispatch event listener
          if(self.target != '_blank'){
                  self.core.target = self.target;
              W.loader.onload = function(){
                  alert('Thanks for submission.\n\n'+ W.loader.src);
              };
          }
            }else return;
        }
      // fillup fields with error info.
      fillupFields(msg);
      // do submit
      self.onreport(this.message);
      // init. message queues
      //this.message = '';
      //this.info = '';
      return true;
    };

    this.report = function(moreInfo){
        if(moreInfo)
            this.info += moreInfo;
        self.core.submit();
    };

    this.onreport = function(message){
        self.report();
    };

    this.report_test = function(){
      var message = '[WEDNUS] EReporter control\n\n\n';
      message += 'This testing report will not be sent to the listener.\n\nThanks.';
      alert(message);
    };

  function addbb(entry){
      if(!this.message) this.message = '';
      this.message += entry +'\n\n';
      return '[list][*]'+ entry + '[/list]';
  };

    function composeInfo(msg, url, linenumber){
        this.info = addbb('Version: '+ W.version);
      this.info += addbb('Error: '+ msg);
      this.info += addbb('Location: '+ url +' (Line:'+linenumber+')');
      this.info += addbb('Agent: '+ navigator.userAgent);
    };

    function fillupFields(msg){
      self.fields['message'].value = this.info;
      self.fields['username'].value = this.reporter;
      self.fields['subject'].value = msg;
      self.fields['topic_desc'].value = navigator.userAgent;
    };

    function isOK(){
      var message = '[WEDNUS] ';
        message += 'An Internal Error Detected.\n\n\n\n';
      message += this.message;
      message += '\n\n\n\nThis error could be either from the Wednus System or other scripts in the host page.\n\n';
      message += 'In either case, I hope you to report this error to the Wednus community for future development.\n\n';
      message += 'During the reporting process, only the information above will be sent to server.\n\n\n\n\n\n';
      message += 'Would you kindly continue to report this error?';
      return confirm(message);
    };

    function moreInfo(){
      var situation = prompt('Would you please describe this situation?\n\nWithout this info, we cannot help you efficiently.');
      if(!situation) situation = '?';
      this.info += addbb('Situation: '+ situation);
      var reporter = prompt('Email and/or Name please, so that I can direct my support to you.\n\n(after this dialog, please wait 3~5 seconds to finish reporting)');
      if(reporter != '')
          this.reporter = reporter;
    };
};

//! \cond   loadModules
// load external modules
//W.css();
//W.load();
//W.module();
//W.control('');
//! \endcond

//! \cond   namespace
// open a namespace for control variables
//W.c.EReporter = {};
//W.c.EReporter.id = 0;
//! \endcond

// add sample codes (one for each comment block)
/**
 * @example EReporter.html
 */

/**
 * @example CodeExample.html
 */


/**
 * \mainpage
 * \section req Requirement
 *  - wednus.js
 *
 *<hr>
 *
 * \section intro_sec Introduction
 * (give an introduce and purpose of this control here)
 * @test    <a href='../../test/EReporter.html'>testing constructor & member methods</a>
 *<hr>
 *
 * \section diagram Diagram
 * We highly recommend you to use <a href='http://www.umlet.com/'>UMLet</a> under <a href='http://eclipse.org'>Eclipse</a> environment.
 * \image   html    diagram.jpg
 * <hr>
 *
 * \section usage   Usage
 * \subsection    include    1. Including
 * Add following line of code in script block.
 * \code
 * W.control('EReporter');
 * \endcode
 *
 * \subsection  instant 2. Instantiate a control object
 * In either case, Wednus Platform will loadup the control, and now we can use the
 * control like this:
 * \code
 * var myTemp = new W.EReporter();
 * \endcode
 *
 * \subsection  use 3. Using object
 * After the object creation, you can access public member properties and methods as
 * below.
 * \code
 * alert(myTemp.name);
 * \endcode
 *<hr>
 *
 * \section code    Code Example
 * This example will print 'control name: EReporter', the name of this control.
 * \code
 * <script type='text/javascript'>
 * W.control('EReporter');
 * </script>
 *
 * <script type='text/javascript'>
 * var myTemp = new W.EReporter();
 * document.write('control name: '+ myTemp.name);
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
 * (your name & profile)
 *<hr>
 *
 * \section license License
 * This section describes the license this destribution is destributed under. You
 * may choose an <a href='http://opensource.org/licenses/'>OSI Approved License</a>.
 * The most common option in Open Source today is the <a href='http://opensource.org/licenses/gpl-license.php'>GNU GPL</a>,
 * however, one of the most flexible is the <a href='http://opensource.org/licenses/artistic-license.php'>Artistic License</a>.
 * The Perl programming language is distributed under both licenses, which is
 * perfectly optional.
 */