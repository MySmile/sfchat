/**
 * sfchat/events/gatracking.js: SFChat Google Analytics
 */

"use strict";

// check namespace
var SFChat;
if (!SFChat) {
    throw new Error('One of required modules was not loaded.');
} 

if (!SFChat.events) {
    SFChat.events = {};
}

if (SFChat.events.gatracking) {
    throw new Error('Module with name SFChat.events.gatracking has already exist.');
}

/**
 * SFChat Google analytics
 * 
 * @type {Object}
 */
SFChat.events.gatracking = {        
    /**
     * Previous error
     * 
     * @type {String}
     */
    _prevError: undefined,
    
    /**
     * Event error
     * 
     * @param {String}  error
     */
    eventError: function(error) {
        var _this = SFChat.events.gatracking;
        
        if(SFChat.debugmode === 'True' || _this._prevError === error) {
            return;
        }
        
        _this._prevError = error;
        ga('send', 'event', 'error', error); 
    },
    
    /**
     * Event button click
     * 
     * @param {type} target
     * @param {type} label
     * @returns {undefined}
     */
    eventBtnClick: function(target, label) {
        var _this = SFChat.events.gatracking;
        
        // skip for debug mode
        if (SFChat.debugmode === 'True') {
            return;
        }
        
        _this.addListener($(target).get(0), 'click', function() {
            ga('send', 'event', 'button', 'click', label);
        });
    },
    
    /**
     * Utility to wrap the different behaviors between W3C-compliant browsers
     * and IE when adding event handlers.
     *
     * @param {Object} element Object on which to attach the event listener.
     * @param {string} type A string representing the event type to listen for
     *     (e.g. load, click, etc.).
     * @param {function()} callback The function that receives the notification.
     */
    addListener: function(element, type, callback) {                
        if (element.addEventListener) { 
            element.addEventListener(type, callback);
        } else if (element.attachEvent) { 
            element.attachEvent('on' + type, callback);
        }
    }
};
