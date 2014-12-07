/**
 * sfchat/api/v1/api.js: Main SFChat API version 1 Object
 * 
 * @dependency Query
 */

"use strict";

// check namespace
var SFChat;
if (SFChat.api) {
    throw new Error('Module with name SFChat.api has already exist.');
}

/**
 * SFChat API version 1
 * 
 * @type {Object}
 */
SFChat.api = {     
    /**
     * Gets version number
     * 
     * @return {String}
     */
    getVersion: function() {
        return 'v1';
    },
    
    /**
     * Gets module name
     * 
     * @return {String}
     */
    getName: function() {
        return 'SFChat api client';
    }
};
