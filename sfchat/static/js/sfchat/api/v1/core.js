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
    // start long-polling
    this.getMessage();
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
 * Post Message
 * 
 * @TODO catch exeptions
 */
SFChat.api.core.prototype.postMessage = function() {
    var _this = this; 
    
    _this.messages.postMessage(_this.chatTypeDom.val(), {
        method: _this._postMessageCallback,
        obj: _this
    });
};

/**
 * Get Message, long-polling
 * It runs long-polling
 * 
 * @TODO catch exeptions
 */
SFChat.api.core.prototype.getMessage = function() {
    var _this = this; 
    
    _this.messages.getMessage({
        method: _this._getMessageCallback,
        obj: _this
    });
};

/**
 * Get Message Callback
 * Handle long-polling response
 * 
 * @param {Object}  data
 * @param {Object}  data.results
 * @param {Integer} data.results.code
 * @param {String}  data.results.msg
 * @param {Integer} data.results.count
 * @param {String}  data.results.status
 * @param {Array}   data.results.messages
 * @param {Object}  data.results.messages[0]
 * @param {String}  data.results.messages[0]._id
 * @param {String}  data.results.messages[0].msg
 * @param {String}  data.results.messages[0].created
 * @param {Boolean} data.results.messages[0].system
 * @throws {TypeError}
 */
SFChat.api.core.prototype._getMessageCallback = function(data) {
    var _this = this,
        deleteMessages = [],
        msgDom;
    
    // check response format
    _this._checkResponseFormat(data);
    if (data.results.code === 200) {
        $.each(data.results.messages, function(key, item) {
            msgDom = _this._renderMessage(item);
            _this._displayMessage(msgDom);
            
            deleteMessages.push(item._id);       
        });
    }
    
    // run long polling
    if (data.results.code !== 403) {
        _this._deleteMessage(deleteMessages);
    }
};

/**
 * Delete message
 * run long-polling
 * 
 * @param {Array} data
 * @throws {Error}
 * @TODO catch exceptions
 */
SFChat.api.core.prototype._deleteMessage = function(data) {
    var _this       = this,
        dataRequest = { data:{ messages:[] }};

    $.each(data, function(key, item) {
        dataRequest.data.messages.push({
            _id: item
        });
    });    
    
    if (dataRequest.data.messages.length !== 0) {
        // run delete
        _this.messages.deleteMessage(dataRequest, {
            method: _this._deleteMessageCallback,
            obj: _this
        });
    } else {
        // restart long-polling
        _this.getMessage();
    }
};

/**
 * Delete Message Callback
 * 
 * @param {Object}  data
 * @param {Object}  data.results
 * @param {Integer} data.results.code
 * @param {String}  data.results.msg
 * @throws {Error}
 */
SFChat.api.core.prototype._deleteMessageCallback = function(data) {
    var _this = this;
    
    // check response format
    _this._checkResponseFormat(data);
    if (data.results.code !== 200) {
        throw new Error(data.results.msg);
    }
    
    // restart long-polling
    _this.getMessage();
};

/**
 * Post Message Callback
 * 
 * @param {Object}  data
 * @param {Object}  data.results
 * @param {Integer} data.results.code
 * @param {String}  data.results.msg
 * @throws {Error}
 * @TODO catch exceptions
 */
SFChat.api.core.prototype._postMessageCallback = function(data) {
    var _this = this,
        msgDom;
    
    // check response format
    _this._checkResponseFormat(data);
    if (data.results.code !== 200) {
        throw new Error(data.results.msg);
    }
    
    // success
    msgDom = _this.renderMessages.render(_this.chatTypeDom.val());        
    // clear
    _this.chatTypeDom.val('');  
    // display
    _this._displayMessage(msgDom);
};


/**
 * Render response message
 * 
 * @param {Object}  data
 * @param {String}  data._id
 * @param {String}  data.msg
 * @param {String}  data.created
 * @param {Boolean} data.system
 */
SFChat.api.core.prototype._renderMessage = function(data) {
    var _this = this,
        result;
    
    result = (data.system) ? _this.renderSystemMessages.render(data.msg):
        _this.renderMessages.render(data.msg, data.created, 'talker');
      
    return result;
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
        _this.postMessage.apply(_this);
    });
    
    // hotkey
    _this.chatTypeDom.keydown(function(e) {
        if (e.ctrlKey && (e.keyCode === 10 || e.keyCode === 13)) {
            _this.postMessage();
        }
    });
};

/**
 * Check response format
 * 
 * @param {Object} data
 * @throws TypeError
 */
SFChat.api.core.prototype._checkResponseFormat = function(data) {
    if (typeof(data['results']) !== 'object') {
        throw new TypeError('Data has invalid format.');
    }
};
