/**
 * sfchat.js: Main SFChat module
 */
define(['jquery'], function($) {

    "use strict";

    /**
     * SFChat
     *
     * @type {Object}
     */
    var sfChat = {
        /**
         * Debug mode
         *
         * @property {String} False or True
         */
        debugmode: 'False',

        /**
         * Gets onload options
         *
         * @param {String}  target
         * @param {Array}   options list of options keys
         * @return {Object}
         * @throws {TypeError}
         */
        getOnloadOptions: function(target, options) {
            var optionsDom   = $(target),
                result      = {},
                itemKey,
                itemDom;

            if (optionsDom.length === 0) {
                throw new TypeError('Invalid parameter target.');
            }
            $.each(options, function(key, item) {
                itemKey = item.split('.');
                if (itemKey.length !== 2) {
                    throw new TypeError('Invalid option`s key [' + item + '].');
                }

                itemDom = $('#' + itemKey[0] + ' option[value=' + itemKey[1] + ']', optionsDom);
                if (itemDom.length === 0) {
                    throw new TypeError('Option [' + item + '] was not found.');
                }

                result[itemKey[0]]              = result[itemKey[0]] || {};
                result[itemKey[0]][itemKey[1]]  = itemDom.text();
            });

            return result;
        },

        /**
         * Extends objects
         *
         * @param {Function} child
         * @param {Function} parent
         * @throws {TypeError}
         */
        extend: function (child, parent) {
            if (typeof(child) !== 'function' || typeof(parent) !== 'function') {
                throw new TypeError('Invalid parameters type.');
            }

            child.prototype             = Object.create(parent.prototype);
            child.prototype.constructor = child;
        }
    };

    // api
    return sfChat;
});
