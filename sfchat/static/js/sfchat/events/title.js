/**
 * sfchat/events/title.js: SFChat Title Events
 */

"use strict";

// check namespace
var SFChat;
if (!SFChat || !SFChat.api || !SFChat.api.renders 
    || !SFChat.api.storage || !SFChat.api.resources) {
    throw new Error('One of required modules was not loaded.');
} 

if (!SFChat.events) {
    SFChat.events = {};
}
    
if (SFChat.events.title) {
    throw new Error('Module with name SFChat.events.title has already exist.');
}

/**
 * SFChat API Message Events
 * 
 * @type {Object}
 */
SFChat.events.title =  {
    /**
     * Title pattern
     *
     * @property {Regex}
     */
    _titlePattern: /^\(\d+\)\s/,

    /**
     * Title template
     *
     * @property {String}
     */
    _titleTemplate: '(0) ',

    /**
     * Show count of messages on a title
     *
     * @param {Event} e
     * @param {Number} msgCount
     */
    showTitle: function(e, msgCount) {
        var _this             = SFChat.events.title,
            title             = document.title,
            msgCountPattern   = /(\d+)/,
            msgCountTitle     = msgCountPattern.exec(title);

        // add message count indicator to a title
        if (!msgCountTitle) {
            title = _this._titleTemplate + title;
        }

        // update title
        msgCount        += (msgCountTitle) ? parseInt(msgCountTitle[0]): 0;
        document.title  = title.replace(msgCountPattern,  msgCount);
    },

    /**
     * Clear message count in the document title
     *
     * @param {Event} e
     */
    clearTitle: function(e) {
        var _this = SFChat.events.title;

        if (_this._titlePattern.test(document.title) === true) {
            document.title = document.title.replace(_this._titlePattern, '');
        }
    }
};
