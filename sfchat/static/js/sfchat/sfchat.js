/**
 * sfchat.js: Main SFChat module
 */

"use strict";

// check namespace
var SFChat;
if (SFChat) {
    throw new Error('Module with name SFChat.api has already exist.');
}

/**
 * SFChat
 * 
 * @type {Object}
 */
var SFChat = {    
    /**
     * Extends objects
     * 
     * @param {Function} child
     * @param {Function} parent
     */
    extend: function (child, parent) {
        if (typeof(child) !== 'function' || typeof(parent) !== 'function') {
            throw new TypeError('Invalid parameters type.');
        }
        
        child.prototype             = Object.create(parent.prototype);
        child.prototype.constructor = child; 
    }
};
