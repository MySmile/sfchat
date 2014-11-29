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
     * Debug mode
     * 
     * @property {Boolean}
     */
    debugmode: false,
    
    /**
     * Previous error
     * 
     * @type {String}
     */
    _prevError: undefined,
    
    /**
     * Error hadler
     * 
     * @param {String}  msg
     * @param {String}  url
     * @param {Integer} line
     * @TODO sent to GA if debugmode === false
     */
    errorHandler: function(msg, url, line) {
        var _this = SFChat,
            error = JSON.stringify({
                msg: msg,
                url: url,
                line: line
            });
        
        if(_this.debugmode === false && _this._prevError !== error) {
            _this._prevError = error;
            // @TODO add sending log here
            
            return true;
        }
    },
    
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
