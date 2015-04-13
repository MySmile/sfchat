/**
 * sfchat/api/v1/resources/message.js: SFChat Api Message Resource
 */
define(['jquery'], function($) {

    "use strict";

    /**
     * SFChat Message Resource
     *
     * @type {Function}
     * @param {Object} client
     */
    var resource = function(client) {
        this.client     = client;
        this.msgError   = {
            wrongFormat: JSON.stringify({code: 50, msg: 'Message has invalid format.'})
        };
        this._name      = 'messages';
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
    resource.prototype.postMessage = function(msg, eventOptions) {
        var _this = this,
            data;

        msg = _this._sanitizeMessage(msg);
        if (_this._validateMessage(msg) === false) {
            throw new Error(_this.msgError.wrongFormat);
        }

        data = _this._prepareMessageForSend(msg);
        _this.client.sendRequest('POST', _this._name, data, eventOptions);
    };

    /**
     * Gets message
     *
     * @param {Object}  eventOptions
     * @param {jQuery}  eventOptions.manager
     * @param {String}  eventOptions.event
     */
    resource.prototype.getMessage = function(eventOptions) {
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
    resource.prototype.deleteMessage = function(data, eventOptions) {
        var _this = this;

        this.client.sendRequest('DELETE', _this._name, data, eventOptions);
    };

    /**
     * Sanitize message
     *
     * @param {String} msg
     * @return {String}
     */
    resource.prototype._sanitizeMessage= function(msg) {
        return msg.trim();
    };

    /**
     * Validate message
     *
     * @param {String} msg
     * @return {Boolean} true if ok or false otherwise
     */
    resource.prototype._validateMessage = function(msg) {
        var msgLength = msg.length;

        return msgLength !== 0 && msgLength <= 144;
    };

    /**
     * Prepare message for send
     *
     * @param {String} msg
     * @return {Object}
     */
    resource.prototype._prepareMessageForSend = function(msg) {
        return {
            data: {messages: [{msg: msg}]}
        };
    };

    // api
    return resource;
});
