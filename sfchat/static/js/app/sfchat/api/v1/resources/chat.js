/**
 * sfchat/api/v1/resources/chat.js: SFChat Api Chat Resource
 */
define(['jquery','api/client'], function($, client) {

    "use strict";

    /**
     * SFChat Chat Resource
     *
     * @type {Function}
     * @param {Object} client
     */
    var resource = function (client) {
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
    resource.prototype.deleteChat = function(eventOptions) {
        var _this = this;

        this.client.sendRequest('DELETE', _this._name, undefined, eventOptions);
    };

    // api
    return resource;
});
