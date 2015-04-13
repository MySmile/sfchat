/**
 * sfchat/api/v1/storage.js: SFChat Api Session Storage
 * 
 * Save history on Session Machine
 * When capacity of storage reached to limit then chat history data will be cleared automaticly
 */
define(['jquery'], function($) {

    "use strict";

    /**
     * Max length of data in the Storage
     * 144*20 - 20 messages with length 144
     *
     * @type {Number}
     */
    var storageItemLimit = 2880;

    /**
     * Max limit of items in the Storage
     *
     * @type {Number}
     */
    var storageNumberLimit = 40;

    /**
     * Chat Token
     *
     * @type {String}
     */
    var chatToken;

    /**
     * Clear Storage except userToken
     *
     * @throws {Error}
     */
    var clearStorage = function() {
        $.each(sessionStorage, function(key, item) {
            if (item.length > storageItemLimit) {
                sessionStorage.removeItem(key);
            }
        });

        if (sessionStorage.length > storageNumberLimit) {
            throw new Error('Limit of number data in SessionStrorage reach to Limit. Please close all chat tabs and start new one again.');
        }
    };

    /**
     * Prepare Storage key
     *
     * @param {String} key
     * @return {String}
     */
    var prepareKey = function(key) {
        return key + chatToken;
    };

    /** Check does browser support localStorage
     *
     * @throws {Error}
     */
    var checkSupportStorage = function() {
        if(typeof(sessionStorage) === 'undefined') {
            throw new Error('Browser does not support sessionStorage.');
        }
    };

    /**
     * Remove Storage
     *
     * @param {String} key
     */
    var removeData = function(key) {
        key = prepareKey(key);
        sessionStorage.removeItem(key);
    };

    /**
     * Remove all data related to chat
     */
    var removeAllData = function() {
        $.each(sessionStorage, function(key, item) {
           if (key.indexOf(chatToken) >= 0) {
               sessionStorage.removeItem(key);
           }
       });
    };

    /**
     * Add item to Storage
     *
     * @param {String} key
     * @param {String} data
     */
    var addData = function(key, data) {
        var preparedKey = prepareKey(key);

        data = (sessionStorage[preparedKey] || '') + data;
        this.setData(key, data);
    };

    //noinspection JSValidateJSDoc
    /**
     * Sets data to Storage
     *
     * @param {String} key
     * @param {String} data
     */
    var setData = function(key, data) {
        try {
            key = prepareKey(key);
            sessionStorage.setItem(key, data);
        } catch (e) {
            clearStorage();
            sessionStorage.setItem(key, data);
        }
    };

    /**
     * Gets data from Storage
     *
     * @param {String} key
     * @return {String|Null} Null if no data were stored in key
     */
    var getData = function(key) {
        key = prepareKey(key);
        return sessionStorage.getItem(key);
    };

    /**
     * Gets Chat Token
     *
     * @return {String|False} chat token if ok or false otherwise
     */
    var getChatToken = function() {
        var urlPath = '';

        if(!chatToken) {
            urlPath     = window.location.pathname;
            chatToken   = urlPath.substr(urlPath.lastIndexOf('/') + 1);
        }

        return chatToken;
    };

    // @TODO refactor inline function run
    // validate storage support
    checkSupportStorage();

    // set chat token
    getChatToken();

    // api
    return {
        removeData:             removeData,
        removeAllData:          removeAllData,
        addData:                addData,
        setData:                setData,
        getData:                getData,
        getChatToken:           getChatToken
    };
});
