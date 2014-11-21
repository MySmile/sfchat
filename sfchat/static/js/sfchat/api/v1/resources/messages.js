/**
 * sfchat/api/v1/resources/message.js: SFChat Api Message Resource
 */

"use strict";

// check namespace
var SFChat;
if (!SFChat.api || !SFChat.api.client) {
    throw new Error('One of required modules was not loaded.');
} else if (!SFChat.api.resources) {
    SFChat.api.resources = {};
}
    
if (SFChat.api.resources.messages) {
    throw new Error('Module with name SFChat.api.resources.messages has already exist.');
}

/**
 * SFChat API Client
 * 
 * @type {Function}
 * @param {SFChat.api.client} client
 */
SFChat.api.resources.messages = function(client) {
    this.client = {};
    this._name  = 'messages';
    this._setClient(client);
};

/**
 * Send message
 * 
 * @param {String} msg
 */
SFChat.api.resources.messages.prototype.sendMessage = function(msg) {
    var _this = this,
        msgData;
  
    if (_this._validateMessage(msg) === true) {
        msgData = _this._prepareMessageForSend(msg);
        this.client.sendRequest('POST', _this._name, msgData, _this._handleResponse);
    } else {
        console.log('Message has invalid format.');
    }
};

/**
 * Sets Api Client
 * 
 * @param {SFChat.api.client} client
 */
SFChat.api.resources.messages.prototype._setClient = function(client) {
    if (typeof(client) !== 'object' 
        || typeof(client.sendRequest) !== 'function'
    ) {
        throw new TypeError('Client is not valid API Client.');
    }
    
    this.client = client;
};

/**
 * Validate message
 * 
 * @param {String} msg
 * @return {Boolean} true if ok or false otherwise
 */
SFChat.api.resources.messages.prototype._validateMessage = function(msg) {
    var msg_length = msg.length;
    
    return msg_length !== 0 && msg_length <= 144;
};

/**
 * Handle response result
 * 
 * @param {Mix} data
 */
SFChat.api.resources.messages.prototype._handleResponse = function(data) {
    console.log(data);
};

/**
 * Prepare message for send
 * 
 * @param {String} msg
 * @return {Object}
 */
SFChat.api.resources.messages.prototype._prepareMessageForSend = function(msg) {
    return {
        data: {messages: [{msg: msg}]}
    };
};
