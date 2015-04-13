/**
 * sfchat/events/chat.js: SFChat Chat Events
 */
define(['jquery','api/storage', 'api/resources/chat'], function($, storage, resourceChat) {
    "use strict";

    /**
     * SFChat API Chat Events
     *
     * @type {Object}
     */
    var eventChat = {
        /**
         * Options
         *
         * @property {Object}       options
         * @property {jQuery}       options.chatBodyDom
         * @property {jQuery}       options.chatTypeDom
         * @property {jQuery}       options.chatSendDom
         * @property {api/client}   options.client
         * @property {String}       options.draftClass
         */
        options: {
            chatBodyDom: undefined,
            chatTypeDom: undefined,
            chatSendDom: undefined,
            client:      undefined,
            draftClass:  undefined
        },

        /**
         * Storage
         *
         * @property {Object}
         */
        _storage: storage,

        /**
         * Chat resource
         *
         * @property {Object}
         */
        _chat: undefined,

        /**
         * Init
         *
         * @param {Object} options
         */
        init: function(options) {
            var _this = eventChat;

            _this.options   = $.extend(_this.options, options);
            _this._chat     = new resourceChat(_this.options.client);
        },

        /**
         * Delete Chat
         *
         * @param {Event} e
         */
        deleteChat: function(e) {
            var _this = eventChat;

            _this._chat.deleteChat({
                manager: _this.options.chatBodyDom,
                event:    'setChatClosed'
            });
        },

        /**
         * Sets chat closed
         * It does not remove data from chat history
         *
         * @param {Event}            e
         * @param {Undefined}        request
         * @param {Object|Undefined} response
         * @param {Object}   response.results
         * @param {Number}  response.results.code
         * @param {String}   response.results.msg
         * @throws {Error}
         */
        setChatClosed: function(e, request, response) {
            var _this = eventChat;

            if (typeof(response) !== 'undefined' && response.results.code !== 200) {
                throw new Error(JSON.stringify(response.results));
            }

            // unbind events
            _this.options.chatSendDom.addClass(_this.options.draftClass).off();
            _this.options.chatTypeDom.prop('disabled', true ).off();
            _this.options.chatBodyDom.off('deleteChat');
            _this.options.chatBodyDom.off('deleteMessage');

            // clear
            _this.options.chatBodyDom.trigger('clearTitle');
        },

       /**
        * Initiate type message
        * Message can be send by button or enter
        *
        * @param {Event} e
        */
        setChatReady: function(e) {
            var _this = eventChat;

            // event has been already added
            if(_this.options.chatSendDom.hasClass(_this.options.draftClass) === false) {
                return;
            }

            // click on send button
            _this.options.chatSendDom.click(function(){
                _this.options.chatBodyDom.trigger('postMessage');
            });

            // hotkeys
            _this.options.chatTypeDom.keydown(function(e) {
                if ((e.ctrlKey || e.shiftKey) && e.keyCode === 13) {
                    return true;
                }

                if (e.keyCode === 13) {
                    _this.options.chatBodyDom.trigger('postMessage');
                }
            });

            // get ready
            _this.options.chatSendDom.removeClass(_this.options.draftClass);
            _this.options.chatTypeDom.prop('disabled', false);
            _this.options.chatTypeDom.focus();
        },

        /**
         * Handle chat status:
         * - ready: bind events
         * - closed: unbind events and remove chat history data
         *
         * @param {Event}   e
         * @param {String}  status
         */
        setChatStatus: function(e, status) {
            var _this = eventChat;

            switch (status) {
                case 'ready':
                    _this.options.chatBodyDom.trigger('setChatReady');
                    break;

                case 'closed':
                    _this.options.chatBodyDom.trigger('setChatClosed');
                    _this._storage.removeAllData();
                    break;
            }
        }
    };

    // api
    return eventChat;
});
