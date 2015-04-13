/**
 * sfchat/errorHandler.js: SFChat Global Error Handler
 */
define(['jquery', 'sfchat/sfchat', 'events/gatracking'], function($, sfChat, eventGaTracking) {

    "use strict";

    /**
     * SFChat Error Handler
     *
     * @type {Object}
     */
    var errorHandler = {
        /**
         * Options
         *
         * @property {Object} options
         * @property {String} options.targetError
         * @property {String} options.targetHeader
         * @property {String} options.hideClass
         * @property {String} options.errorHeaderClass
         * @TODO add localization
         */
        options: {
            targetError: '',
            targetHeader: '',
            hideClass: '',
            errorHeaderClass: ''
        },

        /**
         * Error messages
         *
         * @property {Object} msgError
         * @property {Number} msgError[].code HTTPCode/10
         * @property {String} msgError[].msg
         */
        msgError: {
            general: JSON.stringify({
                code: 50,
                msg: 'Unexpected error was detected. {0} Please refresh page and try again later.'
            })
        },

        /**
         * Init
         *
         * @param {Object} options
         */
        init: function (options) {
            var _this = errorHandler;

            _this.options = $.extend(_this.options, options);
        },

        /**
         * Error handler
         *
         * @param {String}  msg
         * @param {String}  url
         * @param {Number} line
         */
        onError: function (msg, url, line) {
            var _this = errorHandler,
                error;

            _this.showError(msg);
            // skip if debug turned on
            if (sfChat.debugmode === 'True') {
                // run default handler
                return false;
            }

            error = JSON.stringify({msg: msg, url: url, line: line});
            eventGaTracking.eventError(error);

            return true;
        },

        /**
         * Show error
         *
         * @param {String} error
         */
        showError: function (error) {
            var _this = errorHandler,
                errorDom = $(_this.options.targetError),
                headerDom = $(_this.options.targetHeader),
                msgSource = _this._parseJSON(error.replace('Uncaught Error: ', '').replace('Error: ', '')),
                msgBody,
                msg;

            if (!errorDom || msgSource === false) {
                return;
            }

            // filter messages
            msgBody = (msgSource !== false || msgSource.code === 403 || msgSource.code < 100) ? msgSource.msg : '';
            msg = $.parseJSON(_this.msgError.general).msg.replace('{0}', msgBody);

            errorDom.text(msg).removeClass(_this.options.hideClass);
            if (headerDom) {
                headerDom.addClass(_this.options.errorHeaderClass);
            }
        },

        /**
         * Parse JSON
         *
         * @param {String} msg
         * @returns {result|Array|Object|Boolean}
         */
        _parseJSON: function (msg) {
            var result;

            try {
                result = $.parseJSON(msg);
            } catch (e) {
                result = false;
            }

            return result;
        }
    };

    // api
    return errorHandler;
});
