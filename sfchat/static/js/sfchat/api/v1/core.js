/**
 * sfchat/api/v1/core.js: SFChat Api Core
 */

"use strict";

// check namespace
var SFChat;
if (!SFChat.api || !SFChat.api.auth  
    || !SFChat.api.resources || !SFChat.api.renders
) {
    throw new Error('One of required modules was not loaded.');
} else if (SFChat.api.core) {
    throw new Error('Module with name SFChat.api.core has already exist.');
}

/**
 * SFChat API Core
 * 
 * @type {Function}
 */
SFChat.api.core = function (options) {
    /**
     * Default options
     * 
     * @property {Object} options
     * @property {String} options.endPoint
     * @property {String} options.userToken
     * @property {Object} options.messages
     * @property {String} options.messages.targetChat
     * @property {String} options.messages.targetType
     * @property {String} options.messages.targetSend
     */
    this.options = {
        endPoint:   undefined,
        userToken:  undefined,
        messages: {
            targetChat:     '#chat-body',
            targetType:     '#chat-type textarea',
            targetSend:     '#chat-type .btn'
        }        
    };
    
    /**
     * Api Client
     * 
     * @property {SFChat.api.client}
     */
    this.client = undefined;
    
    /**
     * Messages Resources
     * 
     * @property {SFChat.api.resources.messages}
     */
    this.messages = undefined;
    
    /**
     * Render Messages
     * 
     * @property {SFChat.api.renders.systemMessages}
     */
    this.renderMessages = SFChat.api.renders.messages;
    
    /**
     * Render System Messages
     * 
     * @property {SFChat.api.renders.messages}
     */
    this.renderSystemMessages = SFChat.api.renders.systemMessages;

    // set options
    this.setOptions(options);
    
    /**
     * Chat DOM
     * 
     * @property {jQuery}
     */
    this.chatDom = $(this.options.messages.targetChat);
    
    /**
     * Type DOM
     * 
     * @property {jQuery}
     */
    this.chatTypeDom = $(this.options.messages.targetType);
    
    // init
    this._init();
    // init message handler
    this._initMessageHandler(); 
};

/**
 * Sets options
 * 
 * @param {Object} options
 * @throws {TypeError}
 */
SFChat.api.core.prototype.setOptions = function(options) {
    if (!options && typeof(options) !== 'object') {
        throw new TypeError('Invalid Options type. Object is expected.');
    } 

    this.options = $.extend(this.options, options);
};

/**
 * Initiate properties
 */
SFChat.api.core.prototype._init = function() {
    var _this = this;
    
    // set userToken
    SFChat.api.auth.setUserToken(_this.options.userToken);
    
    // init client
    _this.client = new SFChat.api.client({
        endPoint: _this.options.endPoint
    });
        
    // init messages
    _this.messages = new SFChat.api.resources.messages(_this.client);
};

/**
 * Send Message
 * 
 * @TODO catch exeptions
 */
SFChat.api.core.prototype.sendMessage = function() {
    var _this = this; 
    _this.messages.sendMessage(_this.chatTypeDom.val(), {
        method: _this._sendMessageCallback,
        obj: _this
    });
};

/**
 * Send Message Callback
 * 
 * @param {Object}  data
 * @param {Object}  data.results
 * @param {Integer} data.results.code
 * @param {String}  data.results.msg
 * @throws {TypeError}
 */
SFChat.api.core.prototype._sendMessageCallback = function(data) {
    var _this = this,
        msgDom;
    
    if (typeof(data['results']) !== 'object') {
        throw new TypeError('Data has invalid format.');
    }
    
    // get message
    if (data.results.code === 200) {
        // success
        msgDom = _this.renderMessages.render(_this.chatTypeDom.val());        
        // clear
        _this.chatTypeDom.val('');
    } else {
        // error
        msgDom = _this.renderSystemMessages.render(data.results.msg);
    }
    
    // display
    _this._displayMessage(msgDom);
};

/**
 * Display Message
 * 
 * @param {jQuery} msgDom
 */
SFChat.api.core.prototype._displayMessage = function(msgDom) {
    var _this = this,
        scrollHeight;
    
    _this.chatDom.append(msgDom);   
    // autoscroll
    scrollHeight = _this.chatDom[0].scrollHeight;
    _this.chatDom.scrollTop(scrollHeight);
};

/**
 * Initiate handler send message
 * Message can be send by button or ctrl + enter hot key
 * 
 * @TODO button should be desibled untill chat will be ready
 */
SFChat.api.core.prototype._initMessageHandler = function() {
    var _this = this;
    
    // click on send button
    $(_this.options.messages.targetSend).click(function(){
        _this.sendMessage.apply(_this);
    });
    
    // hotkey
    _this.chatTypeDom.keydown(function(e) {
        if (e.ctrlKey && (e.keyCode === 10 || e.keyCode === 13)) {
            _this.sendMessage();
        }
    });
};
