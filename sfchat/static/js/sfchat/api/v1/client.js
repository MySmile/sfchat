/**
 * sfchat/api/v1/client.js: SFChat Api Client module
 */

"use strict";

// check namespace
var SFChat;
if (!SFChat.api) {
    throw new Error('Module SFChat.api was not loaded.');
} else if (SFChat.api.client) {
    throw new Error('Module with name SFChat.api.client has already exist.');
}

/**
 * SFChat API Client
 * 
 * @type {Function}
 */
SFChat.api.client = function (options) {
    /**
     * Default options
     * 
     * @property {Object} options
     * @property {String} options.endPoint
     * @property {String} options.format
     * @property {Object} options.auth
     * @property {String} options.auth.userHeader
     * @property {String} options.auth.chatParam
     */
    this.options = {
        endPoint:   undefined,
        format:     'json',
        auth: {
            userHeader: 'X_SFC_USERTOKEN',
            chatParam:  'chatToken'
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
SFChat.api.client.prototype.setOptions = function(options) {
    if (!options && typeof(options) !== 'object') {
        throw new TypeError('Invalid Options type. Object is expected.');
    } 

    this.options = $.extend(this.options, options);
};

/**
 * Send Request
 * 
 * @param {String} type
 * @param {String} resource
 * @param {Object} data
 * @param {Object} callback
 * @param {Function} callback.method
 * @param {Object} callback.obj
 * @return {jqXHR}
 * @throws {TypeError}
 */
SFChat.api.client.prototype.sendRequest = function(type, resource, data, callback) {
    var _this       = this,
        currentUser = _this._getAuth().authenticate(),
        jqxhr,
        url;          
        
        if (typeof(callback.method) !== 'function' 
            || typeof(callback.obj) !== 'object'
        ) {
            throw new TypeError('Callback is not valid.');
        }
        
        url = _this._getUrl(resource, currentUser['chatToken']);
        jqxhr = $.ajax({
            type:           type,
            url:            url,
            processData:    false,
            contentType:    'application/json',
            data:           JSON.stringify(data),
            
            beforeSend: function(xhr) {
                xhr.setRequestHeader(_this.options.auth.userHeader, currentUser.userToken);
            }
        }); 
        
        jqxhr.done(function(response, textStatus, jqXHR) {
            _this._checkResponse(response);
            callback.method.apply(callback.obj, [response]);
        });
        
        jqxhr.fail(function(jqXHR, textStatus, error) {
            _this._checkResponse(jqXHR.responseJSON);
            callback.method.apply(callback.obj, [jqXHR.responseJSON]);
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
SFChat.api.client.prototype._getAuth = function() {
    if (typeof(SFChat.api.auth) !== 'object' 
        || typeof(SFChat.api.auth.authenticate) !== 'function'
    ) {
        throw new ReferenceError('Auth object is not avalable.');
    }
    
    return SFChat.api.auth;
};

/**
 * Get url
 * 
 * @param {String} resource
 * @param {String} chatToken
 * @returns {String}
 * @throws {TypeError}
 */
SFChat.api.client.prototype._getUrl = function(resource, chatToken) {
    var _this   = this,
        params  = {},
        url;
    
    if (typeof(resource) !== 'string' || resource.length <= 2) {
        throw new TypeError('Resource is not valid.');
    }
    
    url = _this.options.endPoint + '/v1/' + resource + '.' + _this.options.format; 
    params[_this.options.auth.chatParam] = chatToken;
    url += '?' + $.param(params);
    
    return url;
};

/**
 * Check response format
 * 
 * @param {Object} data
 * @throws TypeError
 */
SFChat.api.client.prototype._checkResponse = function(data) {
    if (typeof(data['results']) !== 'object') {
        throw new TypeError('Data has invalid format.');
    }
};
