/**
 * sfchat/events/gatracking.js: SFChat Google Analytics
 */
define(['jquery', 'ga'], function($, ga) {
    "use strict";

    /**
     * SFChat Google analytics
     *
     * @type {Object}
     */
    var eventGatracking = {

        /**
         * Options
         *
         * @property {String} options.trackingId
         * @property {String} options.debugMode
         */
        options: {
            trackingId: '',
            debugMode: 'False'
        },

        /**
         * Previous error
         *
         * @type {String|undefined}
         * @private
         */
        _prevError: undefined,

        /**
         * Init
         *
         * @param {Object} options
         * @codeCoverageIgnore
         */
        init: function (options) {
            var _this = eventGatracking;

            _this.options = $.extend(_this.options, options);
            _this._initGa();
        },

        /**
         * Event button click.
         * Tracking clicking on buttons
         *
         * @param {String} target
         * @param {String} label
         */
        eventBtnClick: function(target, label) {
            var _this       = eventGatracking,
                targetDom   = $(target);

            // skip for debug mode
            if (_this.options.debugMode === 'True' || targetDom.length === 0) {
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
        },

        /**
         * Initiate GA
         *
         * @private
         */
        _initGa: function() {
            var _this = eventGatracking;

            if(_this.options.trackingId === '' || _this.options.debugMode === 'True') {
                return;
            }

            ga('create', _this.options.trackingId, 'auto');
            ga('send', 'pageview', { 'anonymizeIp': true });
        }
    };

    // api
    return eventGatracking;
});
