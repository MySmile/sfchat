/**
 * sfchat/api/v1/storage.js: SFChat Api Session Storage
 * 
 * Save history on Session Machine
 * When capacity of storage reached to limit then chat history data will be cleared automaticly
 */

"use strict";

// check namespace
var SFChat;
if (!SFChat.api) {
    throw new Error('One of required modules was not loaded.');
} else if (SFChat.api.storage) {
    throw new Error('Module with name SFChat.api.storage has already exist.');
}

/**
 * SFChat API Storage
 * 
 * @type {Function}
 */
SFChat.api.storage = new function () {
    /**
     * Max lenth of data in the Storage
     * 144*20 - 20 messages with length 144
     * 
     * @type {Integer}
     */
    var storageItemLimit = 2880;
    
    /**
     * Max limit of items in the Storage
     * 
     * @type {Integer}
     */
    var storageNumberLimit = 40;
    
    /**
     * Chat Token
     * 
     * @type {String}
     */
    var chatToken;
    
    /**
     * Clear Storage exept userToken
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
     * Prepear Storage key
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
    this.removeData = function(key) {
        key = prepareKey(key);
        sessionStorage.removeItem(key);
    };
    
    /**
     * Remove all data related to chat
     */
    this.removeAllData = function() {
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
    this.addData = function(key, data)
    {        
        var prepearedKey = prepareKey(key);    
        
        data = (sessionStorage[prepearedKey] || '') + data;
        this.setData(key, data);
    };
    
    /**
     * Sets data to Storage
     * 
     * @param {String} key
     * @param {Mix} data
     */
    this.setData = function(key, data) {
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
     * @return {Mix|Null} Null if no data were stored in key
     */
    this.getData = function(key) {
        key = prepareKey(key);
        return sessionStorage.getItem(key);
    };
    
    /**
     * Gets Chat Token
     * 
     * @return {String|False} chat token if ok or false otherwise
     */
     this.getChatToken = function() {
        var urlPath = window.location.pathname;
    
        return urlPath.substr(urlPath.lastIndexOf('/') + 1);
    };
    
    // check weather browser support LocalStorage or not 
    checkSupportStorage();
    
    // set chat token
    chatToken = this.getChatToken();
};
