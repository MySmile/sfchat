/**
 * sfchat/api/v1/resources/chat.js: SFChat Api Chat Resource
 */

"use strict";

// check namespace
var SFChat;
if (!SFChat.api || !SFChat.api.client) {
    throw new Error('One of required modules was not loaded.');
} else if (!SFChat.api.resources) {
    SFChat.api.resources = {};
}
    
if (SFChat.api.resources.chat) {
    throw new Error('Module with name SFChat.api.resources.chat has already exist.');
}

/**
 * SFChat Chat Resource
 * 
 * @type {Function}
 * @param {SFChat.api.client} client
 */
SFChat.api.resources.chat = function(client) {
    this.client     = client;
    this.msgError   = {};
    this._name      = 'chat';
};

/**
 * Delete chat
 * 
 * @param {Object}  eventOptions
 * @param {jQuery}  eventOptions.manager
 * @param {String}  eventOptions.event
 */
SFChat.api.resources.chat.prototype.deleteChat = function(eventOptions) {
    var _this = this;
    
    this.client.sendRequest('DELETE', _this._name, undefined, eventOptions);
};
