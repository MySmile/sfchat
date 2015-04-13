/**
 * sfchat/api/v1/client.js: SFChat Api Client module
 */
define(['jquery', 'api/auth'], function($, auth) {

    "use strict";

    /**
     * SFChat API Client
     *
     * @param {Object} options
     */
    var client = function (options) {
        /**
         * Default options
         *
         * @property {Object}   options
         * @property {String}   options.endPoint
         * @property {String}   options.format
         * @property {Object}   options.auth
         * @property {String}   options.auth.userHeader
         * @property {String}   options.auth.chatHeader
         */
        this.options = {
            endPoint:   undefined,
            format:     'json',
            auth: {
                userHeader: 'X-SFC-USERTOKEN',
                chatHeader: 'X-SFC-CHATTOKEN'
            }
        };

        this.setOptions(options);
    };

    /**
     * Sets options
     *
     * @param {Object} options
     * @throws {TypeError}
     */
    client.prototype.setOptions = function(options) {
        if (!options && typeof(options) !== 'object') {
            throw new TypeError('Invalid Options type. Object is expected.');
        }

        this.options = $.extend(this.options, options);
    };

    /**
     * Send Request
     *
     * @param {String}  type
     * @param {String}  resource
     * @param {Object}  data
     * @param {Object}  eventOptions
     * @param {jQuery}  eventOptions.manager
     * @param {String}  eventOptions.event
     * @return {jqXHR}
     * @throws {TypeError}
     */
    client.prototype.sendRequest = function(type, resource, data, eventOptions) {
        var _this       = this,
            currentUser = _this._getAuth().authenticate(),
            jqxhr,
            url;

            if (typeof(eventOptions.manager) !== 'object' || typeof(eventOptions.event) !== 'string') {
                throw new TypeError('EventOptions is not valid.');
            }
            url     = _this._getUrl(resource);
            jqxhr   = $.ajax({
                type:           type,
                url:            url,
                processData:    false,
                cache:          false,
                contentType:    'application/json',
                data:           JSON.stringify(data),

                beforeSend: function(xhr) {
                    xhr.setRequestHeader(_this.options.auth.chatHeader, currentUser.chatToken);
                    xhr.setRequestHeader(_this.options.auth.userHeader, currentUser.userToken);
                }
            });

            jqxhr.done(function(response, textStatus, jqXHR) {
                _this._checkResponse(response);
                eventOptions.manager.trigger(eventOptions.event, [data, response]);
            });

            jqxhr.fail(function(jqXHR, textStatus, error) {
                _this._checkResponse(jqXHR.responseJSON);
                eventOptions.manager.trigger(eventOptions.event, [data, jqXHR.responseJSON]);
            });

        return jqxhr;
    };

    /**
     * Gets Auth
     *
     * @private
     * @returns {Object}
     * @throws {ReferenceError}
     */
    client.prototype._getAuth = function() {
        if (typeof(auth) !== 'object'
            || typeof(auth.authenticate) !== 'function'
        ) {
            throw new ReferenceError('Auth object is not available.');
        }

        return auth;
    };

    /**
     * Get url
     *
     * @param {String} resource
     * @returns {String}
     * @throws {TypeError}
     */
    client.prototype._getUrl = function(resource) {
        var _this = this,
            url;

        if (typeof(resource) !== 'string' || resource.length <= 2) {
            throw new TypeError('Resource is not valid.');
        }
        url = _this.options.endPoint + '/v1/' + resource + '.' + _this.options.format;

        return url;
    };

    /**
     * Check response format
     *
     * @param {Object} data
     * @throws TypeError
     */
    client.prototype._checkResponse = function(data) {
        if (typeof(data) === 'undefined' || typeof(data['results']) !== 'object') {
            throw new TypeError('Response has invalid format.');
        }
    };

    // api
    return client;
});
