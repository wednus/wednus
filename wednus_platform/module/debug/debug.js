/**
 * \file    debug.js
 * This adds debugging features onto the platform.
 *
 * It attaches debugging features onto the engine.
 * @author    Sundew H. Shin
 * @todo    implement error reporting tool
 * @todo    Wednus code base specific error detection
 * \example debug.html
 */

W.debug = {version: '0.0.1'}; 
W.load('module/debug', 'assert,dump,namespace,system,Timer', 'module');