/**
 * sfchat/api/v1/auth.js: SFChat Authentication module
 */
define(['jquery', 'api/storage'], function($, storage) {

    "use strict";

    /**
     * Token pattern
     *
     * @type {RegExp}
     */
    var tokenPattern = /^[a-z0-9]{24}$/;

    /**
     * Key for User Token in the storage
     *
     * @type {String}
     */
    var userTokenKey = 'userToken';

    /**
     * Error messages
     *
     * @type {Object} msgError
     * @type {Number} msgError[].code HTTPCode/10
     * @type {String} msgError[].msg
     */
    var msgError = {
        authFailed: JSON.stringify({code: 40.3, msg: 'Authentication failed.'})
    };

    /**
     * Gets Chat Token
     *
     * @return {String|False} chat token if ok or false otherwise
     */
    var getChatToken = function() {
       var chatToken;

       chatToken = storage.getChatToken();
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
       var userToken = storage.getData(userTokenKey);

       return userToken !== null ? userToken: false;
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
    var authenticate = function() {
       var chatToken   = getChatToken(),
           userToken   = getUserToken();

       if (chatToken === false || userToken === false) {
           throw new Error(msgError.authFailed);
       }

       return {'chatToken': chatToken, 'userToken': userToken};
    };

   /**
    * Sets User Token
    *
    * @param {String} userToken
    * @return {Object} this
    */
    var setUserToken = function(userToken) {
        if (userToken !== 'False' && validateToken(userToken) === true) {
            storage.setData(userTokenKey, userToken);
        }
    };

    /**
     * Remove User Token
     */
    var removeUserToken = function() {
        storage.removeData(userTokenKey);
    };

    // api
    return {
        authenticate:       authenticate,
        setUserToken:       setUserToken,
        removeUserToken:    removeUserToken
    }
});
