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
 * SFChat Message Resource
 * 
 * @type {Function}
 * @param {SFChat.api.client} client
 */
SFChat.api.resources.messages = function(client) {
    this.client = client;
    this._name  = 'messages';
};

/**
 * Post message
 * 
 * @param {String}  msg
 * @param {Object}  eventOptions
 * @param {jQuery}  eventOptions.manager
 * @param {String}  eventOptions.event
 * @throws {Error}
 */
SFChat.api.resources.messages.prototype.postMessage = function(msg, eventOptions) {
    var _this = this,
        data;
    
    msg = _this._sanitizeMessage(msg);
    if (_this._validateMessage(msg) === true) {
        data = _this._prepareMessageForSend(msg);
        this.client.sendRequest('POST', _this._name, data, eventOptions);
    } else {
        throw new Error('Message has invalid format.');
    }
};

/**
 * Gets message
 * 
 * @param {Object}  eventOptions
 * @param {jQuery}  eventOptions.manager
 * @param {String}  eventOptions.event
 */
SFChat.api.resources.messages.prototype.getMessage = function(eventOptions) {
    var _this = this;
    
    this.client.sendRequest('GET', _this._name, undefined, eventOptions);
};

/**
 * Delete message
 * 
 * @param {Object}      data
 * @param {Object}      data.messages
 * @param {Array}       data.messages
 * @param {Object}      data.messages[0]
 * @param {String}      data.messages[0]._id
 * @param {Object}      eventOptions
 * @param {jQuery}      eventOptions.manager
 * @param {String}      eventOptions.event
 */
SFChat.api.resources.messages.prototype.deleteMessage = function(data, eventOptions) {
    var _this = this;
    
    this.client.sendRequest('DELETE', _this._name, data, eventOptions);
};

/**
 * Sanitize message
 * 
 * @param {String} msg
 * @return {String}
 */
SFChat.api.resources.messages.prototype._sanitizeMessage= function(msg) {   
    return msg.trim();
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
