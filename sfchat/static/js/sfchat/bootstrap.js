/**
 * sfchat/bootstrap.js: SFChat Bootstrap
 */

"use strict";

// check namespace
var SFChat;
if (!SFChat || !SFChat.events || !SFChat.api 
    || !SFChat.api.auth || !SFChat.api.resources) {
    throw new Error('One of required modules was not loaded.');
}
    
if (SFChat.bootstrap) {
    throw new Error('Module with name SFChat.bootstrap has already exist.');
}

/**
 * SFChat bootstrap
 * 
 * @type {Function}
 * @param {Object} options
 */
SFChat.bootstrap = function (options) {
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
     * @property {String} options.draftClass
     * @property {String} options.chatStatus
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
        draftClass: 'btn-grey',
        chatStatus: undefined
    };
    
    /**
     * Events
     * 
     * @property {Object}
     */
    this.events = {
        // message's events
        postMessage:            SFChat.events.messages.postMessage,
        showPostedMessage:      SFChat.events.messages.showPostedMessage,
        showHistoryMessage:     SFChat.events.messages.showHistoryMessage,
        
        getMessage:             SFChat.events.messages.getMessage,
        showReceivedMessage:    SFChat.events.messages.showReceivedMessage,
        deleteMessage:          SFChat.events.messages.deleteMessage,
        showDeletedMessage:     SFChat.events.messages.showDeletedMessage,

        // chat's events
        deleteChat:             SFChat.events.chat.deleteChat,
        setChatReady:           SFChat.events.chat.setChatReady,
        setChatClosed:          SFChat.events.chat.setChatClosed,
        setChatStatus:          SFChat.events.chat.setChatStatus,

        // title's events
        showTitle:              SFChat.events.title.showTitle,
        clearTitle:             SFChat.events.title.clearTitle,
        click:                  SFChat.events.title.clearTitle
    };
    
    this._setOptions(options);
    
    /**
     * Chat Body DOM
     * 
     * @property {jQuery}
     */
    this.chatBodyDom = $(this.options.chat.targetBody);
    
    /**
     * Type DOM
     * 
     * @property {jQuery}
     */
    this.chatTypeDom = $(this.options.chat.targetType);
    
    /**
     * Send DOM
     * 
     * @property {jQuery}
     */
    this.chatSendDom = $(this.options.chat.targetSend);
   
    /**
     * Api Client
     * 
     * @property {SFChat.api.client}
     */
    this.client = undefined;
    
    // set client
    this._setClient();
    // init event
    this._initEvents();
    
    // show history messages, set chat status, get messages, long-polling
    this.chatBodyDom
        .trigger('showHistoryMessage')
        .trigger('setChatStatus', [this.options.chatStatus])
        .trigger('getMessage');
};

/**
 * Sets options
 * 
 * @param {Object} options
 * @throws {TypeError}
 */
SFChat.bootstrap.prototype._setOptions = function(options) {
    if (!options && typeof(options) !== 'object') {
        throw new TypeError('Invalid Options type. Object is expected.');
    } 

    this.options = $.extend(this.options, options);
};

/**
 * Initiate resources
 */
SFChat.bootstrap.prototype._setClient = function() {
    var _this = this;
    
    SFChat.api.auth.setUserToken(_this.options.userToken);
    _this.client = new SFChat.api.client({
        endPoint: _this.options.endPoint
    });
};

/**
 * Init Events
 */
SFChat.bootstrap.prototype._initEvents = function() {
    var _this = this;
    
    // init event options
    SFChat.events.messages.init({
        chatBodyDom: _this.chatBodyDom,
        chatTypeDom: _this.chatTypeDom,
        client:      _this.client   
    });
    
    // init event options
    SFChat.events.chat.init({
        chatBodyDom: _this.chatBodyDom,
        chatTypeDom: _this.chatTypeDom,
        chatSendDom: _this.chatSendDom,
        client:      _this.client,
        draftClass:  _this.options.draftClass
    });
    
    // init events
    $.each(_this.events, function(key, item){
        _this.chatBodyDom.on(key, item);
    });
      
    // init chat close
    _this._initChatClose();
};

/**
 * Initiate handler for chat close
 */
SFChat.bootstrap.prototype._initChatClose = function() {
    var _this = this;
    
    // click on close
    $(_this.options.chat.targetClose).click(function(){
        _this.chatBodyDom.trigger('deleteChat');
    });
};
