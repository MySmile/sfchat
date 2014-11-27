/**
 * sfchat/api/v1/core.js: SFChat Api Core
 * @TODO split to smaller files
 */

"use strict";

// check namespace
var SFChat;
if (!SFChat.api || !SFChat.api.auth  || !SFChat.api.storage 
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
     * @property {Object} options.chat
     * @property {String} options.chat.targetBody
     * @property {String} options.chat.targetType
     * @property {String} options.chat.targetSend
     * @property {String} options.chat.targetClose
     * @property {String} options.btnDesibleClass
     */
    this.options = {
        endPoint:   undefined,
        userToken:  undefined,
        chat: {
            targetBody:     '#chat-body',
            targetType:     '#chat-type textarea',
            targetSend:     '#chat-type .btn',
            targetClose:    '#chat-close'
        },
        btnDesibleClass: 'btn-grey'
    };
    
    /**
     * Key for Chat History in the storage
     * 
     * @property {String}
     */
    this.chatHistoryKey = 'chatHistory';
     
    /**
     * Messages Resource
     * 
     * @property {SFChat.api.resources.messages}
     */
    this.messages = undefined;
    
    /**
     * Chat Resource
     * 
     * @property {SFChat.api.resources.chat}
     */
    this.chat = undefined;
    
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

    /**
     * Storage
     * 
     * @property {SFChat.api.storage}
     */ 
    this.storage = SFChat.api.storage;

    // set options
    this._setOptions(options);
    
    /**
     * Chat DOM
     * 
     * @property {jQuery}
     */
    this.chatDom = $(this.options.chat.targetBody);
    
    /**
     * Type DOM
     * 
     * @property {jQuery}
     */
    this.chatTypeDom = $(this.options.chat.targetType);
    
    // init resources
    this._initResources();
    // init message handler
    this._initMessageHandler();
    // init chat history
    this._initChatHistory();
    // init chat close
    this._initChatHandler();
    // start long-polling
    this.getMessage();
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
 * Delete Chat
 * 
 * @TODO catch exeptions
 */
SFChat.api.core.prototype.deleteChat = function() {
    var _this = this; 
    
    _this.chat.deleteChat({
        method: _this._deleteChatCallback,
        obj: _this
    });
};

/**
 * Sets options
 * 
 * @param {Object} options
 * @throws {TypeError}
 */
SFChat.api.core.prototype._setOptions = function(options) {
    if (!options && typeof(options) !== 'object') {
        throw new TypeError('Invalid Options type. Object is expected.');
    } 

    this.options = $.extend(this.options, options);
};

/**
 * Initiate resources
 */
SFChat.api.core.prototype._initResources = function() {
    var _this = this,
        client;
    
    // init client
    SFChat.api.auth.setUserToken(_this.options.userToken);
    client = new SFChat.api.client({
        endPoint: _this.options.endPoint
    });
        
    // set resources
    _this.messages  = new SFChat.api.resources.messages(client);
    _this.chat      = new SFChat.api.resources.chat(client);
};

/**
 * Initiate handler send message
 * Message can be send by button or ctrl + enter hot key
 * 
 * @TODO button should be desibled until chat will be ready
 */
SFChat.api.core.prototype._initMessageHandler = function() {
    var _this = this;
    
    // click on send button
    $(_this.options.chat.targetSend).click(function(){
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
 * Initiate handler for chat close
 */
SFChat.api.core.prototype._initChatHandler = function() {
    var _this = this;
    
    // click on close
    $(_this.options.chat.targetClose).click(function(){
        _this.deleteChat.apply(_this);
    });
};

/**
 * Gets data from chat history and display them
 */
SFChat.api.core.prototype._initChatHistory = function() {
    var _this   = this,
        data    = _this.storage.getData(this.chatHistoryKey);
    
    if (typeof(data) !== 'undefined') {
        _this._displayMessage(data);
    }
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
 * @throws {Error}
 */
SFChat.api.core.prototype._getMessageCallback = function(data) {
    var _this = this,
        msgDom;
    
    if (data.results.code === 200) {
        // display messages
        $.each(data.results.messages, function(key, item) {
            msgDom = _this._renderMessage(item, 'talker');
            _this._displayMessage(msgDom);   
        });
        
        // delete messages and run long-polling
        if(data.results.count !== 0) {
            _this._deleteMessage(data.results.messages);
        }
    } else {
        // run long-polling
        _this.getMessage();
    }
    
    // close chat
    if(data.results.status === 'closed') {
        _this._renderCloseChat();
    }
};

/**
 * Delete message
 * run long-polling
 * 
 * @param {Array}  data
 * @param {String}  data[0]._id
 * @param {String}  data[0].msg
 * @param {String}  data[0].created
 * @param {Boolean} data[0].system
 * @throws {Error}
 * @TODO catch exceptions
 */
SFChat.api.core.prototype._deleteMessage = function(data) {
    var _this       = this,
        dataRequest = { data:{ messages:[] }};
    
    // prepare data
    $.each(data, function(key, item) {
        dataRequest.data.messages.push({
            _id: item._id
        });
    });    
    
    // run delete
    _this.messages.deleteMessage(dataRequest, {
        method: _this._deleteMessageCallback,
        obj: _this
    });
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
    var _this       = this,
        msg         = {},
        date        = new Date(),
        msgDom;
    
    if (data.results.code !== 200) {
        throw new Error(data.results.msg);
    }
    
    // display
    msg = {
       msg:     _this.chatTypeDom.val(),
       created: date.toGMTString(),
       system:  false
    };
    msgDom = _this._renderMessage(msg, 'you');        
    _this._displayMessage(msgDom);
    
    // clear
    _this.chatTypeDom.val('');  
};

/**
 * Delete Chat Callback
 * 
 * @param {Object}  data
 * @param {Object}  data.results
 * @param {Integer} data.results.code
 * @param {String}  data.results.msg
 * @throws {Error}
 * @TODO catch exceptions
 */
SFChat.api.core.prototype._deleteChatCallback = function(data) {    
    if (data.results.code !== 200) {
        throw new Error(data.results.msg);
    }
};

/**
 * Render delete chat
 */
SFChat.api.core.prototype._renderCloseChat = function() {
    var _this = this;
    
    // unbind events
    $(_this.options.chat.targetSend).addClass(_this.options.btnDesibleClass).unbind();
    _this.chatTypeDom.prop('disabled', true ).unbind();
    $(_this.options.chat.targetClose).unbind();
    
    // clear message storage
    _this.storage.removeAllData();
};


/**
 * Render response message
 * Save data to history
 * 
 * @param {Object}  data
 * @param {String}  data._id
 * @param {String}  data.msg
 * @param {String}  data.created
 * @param {Boolean} data.system
 * @param {String}  msgSource
 * @return {jQuery}
 */
SFChat.api.core.prototype._renderMessage = function(data, msgSource) {
    var _this = this,
        result;
    
    result = (data.system) ? _this.renderSystemMessages.render(data.msg):
        _this.renderMessages.render(data.msg, data.created, msgSource);
    
    // save to history
    _this.storage.addData(_this.chatHistoryKey, result.get(0).outerHTML);
    
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
