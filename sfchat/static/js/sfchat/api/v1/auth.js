/**
 * sfchat/api/v1/auth.js: SFChat Authentication module
 */

"use strict";

// check namespace
var SFChat;
if (!SFChat.api) {
    throw new Error('Module SFChat.api was not loaded.');
} else if (SFChat.api.auth) {
    throw new Error('Module with name SFChat.api.auth has already exist.');
}

/**
 * SFChat API Authentication Singleton
 * 
 * @type {Object}
 */
SFChat.api.auth = new function () {
    /**
     * Token patter
     * 
     * @type {Regex}
     */
    var tokenPattern = /^[a-z0-9]{24}$/;
    
    /**
     * Key for User Token in LocalStorage
     * 
     * @type{String}
     */
    var userTokenKey = 'userToken';
     
    /**
     * Gets Chat Token
     * 
     * @return {String|False} chat token if ok or false otherwise
     */
    var getChatToken = function() {
        var urlPath = window.location.pathname,
            chatToken;
    
        chatToken = urlPath.substr(urlPath.lastIndexOf('/') + 1);
        if(validateToken(chatToken) === false) {
            return false;
        } 
    
        return chatToken;
    };
    
    /**
     * Gets User Token
     * 
     * @return {String|False} user token if ok or false otherwise
     */
    var getUserToken = function() {
        var userToken = localStorage.getItem(userTokenKey);
        
        return userToken !== null ? userToken: false;
    };
    
    /**
     * Check does browser support localStorage
     * 
     * @throws {Error}
     */
    var checkSupportStorage = function() {
        if(typeof(localStorage) === 'undefined') {
            throw new Error('Browser does not support LocalStorage');
        }
    };
    
    /**
     * Validate Token
     * 
     * @param {String} token
     * @return {Boolean}
     */
    var validateToken = function(token) {
        return tokenPattern.test(token);
    }; 
             
    /**
     * Authenticate
     * 
     * @return {Object} {'chatToken': '...', 'userToken': '...'}
     */
    this.authenticate = function() {
        var chatToken   = getChatToken(),
            userToken   = getUserToken();
        
        if (chatToken === false || userToken === false) {
            throw new Error('Authentication failed.');
        }
        
        return {'chatToken': chatToken, 'userToken': userToken};
    }; 
        
    /**
     * Sets User Token
     * 
     * @param {String} userToken
     * @return {Object} this
     */
    this.setUserToken = function(userToken) {        
        if (userToken !== 'False' && validateToken(userToken) === true) {
            localStorage.setItem(userTokenKey, userToken);
        }
    };
    
    /**
     * Remove User Token
     */
    this.removeUserToken = function() {        
        localStorage.removeItem(userTokenKey);
    };
    
    // check weather browser support LocalStorage or not    
    checkSupportStorage();
};
