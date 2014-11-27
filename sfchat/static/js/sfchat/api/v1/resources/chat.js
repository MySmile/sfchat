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
    this.client = client;
    this._name  = 'chat';
};

/**
 * Delete chat
 * 
 * @param {Function}    callback.method
 * @param {Object}      callback.obj
 */
SFChat.api.resources.chat.prototype.deleteChat = function(callback) {
    var _this = this;
    
    this.client.sendRequest('DELETE', _this._name, undefined, callback);
};
