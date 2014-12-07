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
     * @property {String} options.targetError
     * @property {String} options.targetHeader
     * @property {String} options.hideClass
     * @property {String} options.errorHeaderClass
     * @TODO add localization
     */
    options: {
        targetError:        '',
        targetHeader:       '', 
        hideClass:          '',
        errorHeaderClass:   ''
    },
    
    /**
     * Error messages
     * 
     * @property {Object} msgError
     * @property {Number} msgError[].code HTTPCode/10
     * @property {String} msgError[].msg
     */
    msgError: {
        general: JSON.stringify({code: 50, msg: 'Unexpected error was detected. {0} Please refresh page and try again.'})
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
        
        _this.showError(msg);
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
     * @param {Strimg} error
     */
    showError: function(error) {
        var _this       = SFChat.errorHandler,
            errorDom    = $(_this.options.targetError),
            headerDom   = $(_this.options.targetHeader),
            msgSource   = _this._parseJSON(error.replace('Uncaught Error: ', '')),
            msgBody,
            msg;
    
        if (!errorDom || msgSource === false) {
            return;
        }
        
        // filter messages
        msgBody = (msgSource.code === 403 
            || msgSource.code < 100)? msgSource.msg: '';
        msg     = jQuery.parseJSON(_this.msgError.general).msg.replace('{0}', msgBody);
        
        errorDom.text(msg).removeClass(_this.options.hideClass);
        if(headerDom) {
            headerDom.addClass(_this.options.errorHeaderClass);
        }
    },
    
    /**
     * Parse JSON
     * 
     * @param {String} msg
     * @returns {result|Array|Object|Boolean}
     */
    _parseJSON: function(msg) {
        var result;
        
        try {
            result = jQuery.parseJSON(msg);
        } catch (e) {
            result = false;
        }
        
        return result;
    }
};
