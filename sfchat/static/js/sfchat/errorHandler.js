/**
 * sfchat/errorHandler.js: SFChat Global Error Handler
 */

"use strict";

// check namespace
var SFChat;
if (!SFChat || !SFChat.events.gatracking) {
    throw new Error('One of required modules was not loaded.');
}
    
if (SFChat.errorHandler) {
    throw new Error('Module with name SFChat.errorHandler has already exist.');
}

/**
 * SFChat Erro Handler
 * 
 * @type {Object}
 */
SFChat.errorHandler = { 
    /**
     * Options
     * 
     * @property {Object} options
     * @property {String} options.hideClass
     * @property {String} options.targetError
     * @property {String} options.generalMsg
     * @TODO add localization
     */
    options: {
        targetError:    '',
        hideClass:      '',
        generalMsg:     'Unexpected error was detected. Please refresh page or start new chat.'
    },
    
    /**
     * Init
     * 
     * @param {Object} options
     */
    init: function(options) {
        var _this = SFChat.errorHandler;
        
        _this.options = $.extend(_this.options, options);
    },
    
    /**
     * Error handler
     * 
     * @param {String}  msg
     * @param {String}  url
     * @param {Integer} line
     */
    onError: function(msg, url, line) {
        var _this = SFChat.errorHandler,
            error;
        
        _this.showError();
        // skip if debug turned on
        if (SFChat.debugmode === 'True') {
            // run default handler
            return false;
        }
        
        error = JSON.stringify({msg: msg, url: url, line: line});
        SFChat.events.gatracking.eventError(error);
        
        return true;
    },
    
    /**
     * Show error
     * 
     * @param {Strimg} msg
     */
    showError: function(msg) {
        var _this       = SFChat.errorHandler,
            errorDom    = $(_this.options.targetError);
    
        msg = msg || _this.options.generalMsg;
        if (!errorDom || typeof(msg) === 'undefined') {
            return;
        }
        
        errorDom.text(msg).removeClass(_this.options.hideClass);
    }
};
