/**
 * sfchat/events/chat.js: SFChat Chat Events
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
    
if (SFChat.events.chat) {
    throw new Error('Module with name SFChat.events.chat has already exist.');
}

/**
 * SFChat API Chat Events
 * 
 * @type {Object}
 */
SFChat.events.chat =  {
    /**
     * Options
     * 
     * @property {Object}   options
     * @property {jQuery}   options.chatBodyDom
     * @property {jQuery}   options.chatTypeDom
     * @property {jQuery}   options.chatSendDom
     * @property {SFChat.api.client}    options.client
     * @property {String}               options.draftClass
     */
    options: {
        chatBodyDom: undefined,
        chatTypeDom: undefined,
        chatSendDom: undefined,
        client:      undefined,
        draftClass:  undefined
    },

    /**
     * Storage
     * 
     * @property {SFChat.api.storage}
     */ 
    _storage: SFChat.api.storage,
    
    /**
     * Chat resource
     * 
     * @property {SFChat.api.resources.messages}
     */
    _chat: undefined,
    
    /**
     * Init
     * 
     * @param {Object} options
     */
    init: function(options) {
        var _this = SFChat.events.chat;
        
        _this.options   = $.extend(_this.options, options);
        _this._chat     =  new SFChat.api.resources.chat(_this.options.client);
    },
    
    /**
     * Delete Chat
     * 
     * @param {Event} e
     * @TODO catch exeptions
     */
    deleteChat: function(e) {
        var _this = SFChat.events.chat;

        _this._chat.deleteChat({
            manager: _this.options.chatBodyDom,
            event:    'setChatClosed'
        });
    },
    
    /**
     * Sets chat closed
     * 
     * @param {Event}            e
     * @paran {Undefined}        request
     * @param {Object|Undefined} response
     * @param {Object}   response.results
     * @param {Integer}  response.results.code
     * @param {String}   response.results.msg
     * @throws {Error}
     */
    setChatClosed: function(e, request, response) {
        var _this = SFChat.events.chat;
        
        if (typeof(response) !== 'undefined' && response.results.code !== 200) {
            throw new Error(response.results.msg);
        }
        
        // unbind events
        _this.options.chatSendDom.addClass(_this.options.draftClass).off();
        _this.options.chatTypeDom.prop('disabled', true ).off();
        _this.options.chatBodyDom.off('deleteChat');
        _this.options.chatBodyDom.off('deleteMessage');
        
        // remove history
        _this._storage.removeAllData();
    },
    
   /**
    * Initiate type message
    * Message can be send by button or enter
    * 
    * @param {Event} e
    */
    setChatReady: function(e) {
        var _this = SFChat.events.chat;
        
        // event has been already added
        if(_this.options.chatSendDom.hasClass(_this.options.draftClass) === false) {
            return;
        }

        // click on send button
        _this.options.chatSendDom.click(function(){
            _this.options.chatBodyDom.trigger('postMessage');
        });

        // hotkey block
        _this.options.chatTypeDom.keydown(function(e) {
            if ((e.ctrlKey || e.shiftKey) && e.keyCode === 13) {
                return true;
            }
            
            if (e.keyCode === 13) {
                _this.options.chatBodyDom.trigger('postMessage');
            }
        });
        
        // get ready
        _this.options.chatSendDom.removeClass(_this.options.draftClass);
        _this.options.chatTypeDom.prop('disabled', false);
        _this.options.chatTypeDom.focus();
    },
    
    /**
     * Handle chat status
     * 
     * @param {Event}   e
     * @param {String}  status
     */
    setChatStatus: function(e, status) {
        var _this  = SFChat.events.chat;
                
        switch (status) {
            case 'ready':
                _this.options.chatBodyDom.trigger('setChatReady');
                break;
                
            case 'closed':
                _this.options.chatBodyDom.trigger('setChatClosed');
                break;
        }
    }
};
