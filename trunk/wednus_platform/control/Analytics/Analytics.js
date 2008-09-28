/**
 * \file Analytics.js
 * This file contains the class definition of the Analytics control.
 *
 * @author Sundew H. Shin
 * @see http://www.google.com/analytics/
 */


/**
 * Analytics Constructor
 *
 * @param acct_no Google Analytics profile ID (e.g. 'UA-103181-8')
 * @param isPending (optional) true for pending tracking. otherwise,
 * auto-start tracking
 * @param mode service mode (0=local, 1=remote, 2=both)
 */
W.Analytics = function(acct_no, isPending, mode){
    // control info.
    this.version = '0.0.1';
    this.name = 'Analytics';
    // set profile ID
    _uacct = acct_no?acct_no:'UA-103181-8';
    // set service mode
    _userv = mode?mode:1;
    // start tracking
    this.start = function(){
        urchinTracker();
    };

    // auto-start if there's no pending requested
    if(!isPending) this.start();
};

//! \cond   loadModules
// load urchin script
W.js('http://www.google-analytics.com/urchin.js');
//! \endcond

// add sample codes (one for each comment block)
/**
 * @example Analytics.html <a href='../../test/Analytics.html'>Run this code</a>
 */

/**
 * @example CodeExample.html <a href='../../test/CodeExample.html'>Run this code</a>
 */


/**
 * \mainpage
 * \section intro_sec Introduction
 * This control wraps Google Analytics code inclusion and provides script-level
 * dynamic control over the Urchin script.
 * @test <a href='../../test/Analytics.html'>Analytics.html</a> (unit tests)
 *
 *<hr>
 *
 * \section req Requirement
 * - wednus.js
 * - <a href='http://www.google.com/analytics'>Google Analytics</a> account
 *
 * <hr>
 *
 *
 * \section structure Structure
 * Analytics is a type3 control.
 * \image   html    diagram.jpg
 * <hr>
 *
 * \section usage   Usage
 * \subsection    include    1. Including
 * Add following line of code in script block.
 * \code
 * W.control('Analytics');
 * \endcode
 * <br>
 * \subsection  instant 2. Instantiate a control object
 * Now we can create an Analytics object as follow:
 * \code
 * var myAnalytics = new W.Analytics([acct_no], [isPending], [mode]);
 * \endcode
 * @param acct_no Google Analytics profile ID (e.g. 'UA-103181-8')
 * @param isPending (optional) true for pending tracking. otherwise, auto-start tracking
 * @param mode service mode (0=local, 1=remote, 2=both)
 *
 * <br>
 * \subsection  use 3. Using object
 * After the object creation, now we can access public member properties and methods as
 * below:
 * \code
 * myAnalytics.start();  // start tracking
 * \endcode
 *<hr>
 *
 * \section code    Code Example
 * This example will include Google Analytics code.
 * \code
 * <script type='text/javascript'>
 * W.control('Analytics');
 * </script>
 *
 * <script type='text/javascript'>
 * var myAnalytics = new W.Analytics('UA-103181-8', true);
 * myAnalytics.start();
 *
 * // or, to start tracking immediatly:
 * //var myAnalytics = new W.Analytics('UA-103181-8');
 * </script>
 * \endcode
 *
 * @test    <a href='../../test/CodeExample.html'>CodeExample.html</a>
 * @warning Do NOT merge script blocks into one because each block is
 * closure.
 *
 * <hr>
 *
 * \section author  Author
 * Sundew H. Shin<br>
 * http://wednus.com
 *<hr>
 *
 * \section license License
 * <a href='http://opensource.org/licenses/gpl-license.php'>GNU GPL</a>
 */
 
/**
 * \page release Release Note
 * \section v0_0_1 v0.0.1
 * - constructor argument for the tracking mode changing
 */