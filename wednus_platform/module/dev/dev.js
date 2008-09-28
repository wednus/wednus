/**
 * @defgroup    dev    dev, Wednus Event System
 * @ingroup dev
 *  The implementation of the dev, Wednus Dev. System.
 * @{
 */

W.dev = {
  version: '0.0.1',
  id: '[type your forum ID]',
  team: 'platform'
};


// module info
W.dev.opacity = 0.75;
W.dev.wps = '200,,right:0,top:0';
W.dev.enabled = true;

// load additional modules
W.load('control/EReporter', 'EReporter', 'control');

// solve timing issue on IE: FormGen refers W.add before 'scavenger' being loaded.
W.load('module/scavenger', 'wps', 'module');
W.load('control/FormGen', 'FormGen', 'control');

// solve timing issue on IE: Analytics loads urchin
W.js('http://www.google-analytics.com/urchin.js');
W.load('control/Analytics', 'Analytics', 'control');

W.load('control/DragMe', 'DragMe', 'control');
W.load('module/dev', 'rpanel', 'module');

// get dev+
W.dev.plus = 'http://wednus.googlepages.com/dev_plus.js';
W.js(W.dev.plus);

/**
 * @}  // end of dev
 */