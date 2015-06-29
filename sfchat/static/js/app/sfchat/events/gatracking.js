/**
 * sfchat/events/gatracking.js: SFChat Google Analytics
 */
define(['jquery', 'sfchat/sfchat'], function($, sfChat) {
    "use strict";

    /**
     * SFChat Google analytics
     *
     * @type {Object}
     */
    var eventGatracking = {
        /**
         * Previous error
         *
         * @type {String|undefined}
         */
        _prevError: undefined,

        /**
         * Event error
         *
         * @param {String}  error
         */
        eventError: function(error) {
            var _this = eventGatracking;

            if(sfChat.debugmode === 'True' || _this._prevError === error || typeof(ga) === 'undefined') {
                return;
            }

            _this._prevError = error;
            ga('send', 'event', 'error', error);
        },

        /**
         * Event button click
         *
         * @param {String} target
         * @param {String} label
         */
        eventBtnClick: function(target, label) {
            var _this       = eventGatracking,
                targetDom   = $(target);

            // skip for debug mode
            if (sfChat.debugmode === 'True' || targetDom.length === 0) {
                return;
            }

            _this.addListener(targetDom.get(0), 'click', function() {
                ga('send', 'event', 'button', 'click', label);
            });
        },

        /**
         * Utility to wrap the different behaviors between W3C-compliant browsers
         * and IE when adding event handlers.
         *
         * @param {Object} element Object on which to attach the event listener.
         * @param {string} type A string representing the event type to listen for
         *     (e.g. load, click, etc.).
         * @param {function()} callback The function that receives the notification.
         */
        addListener: function(element, type, callback) {
            if (element.addEventListener) {
                element.addEventListener(type, callback);
            } else if (element.attachEvent) {
                element.attachEvent('on' + type, callback);
            }
        }
    };

    // api
    return eventGatracking;
});
